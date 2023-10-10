---
sidebar_label: 'Create a custom LSP1 Delegate forwarder (2/2)'
sidebar_position: 2
---

# Deploy and test our custom LSP1 Delegate forwarder

In the [first part](./create-custom-urd-1.md), we setup our Universal Profile and created the custom LSP1 Delegate contract. We will now deploy and test it!

## Generate the UniversalProfile type

In order to deploy this Custom LSP1 Delegate contract, we will interact with a UniversalProfile. We can enhance the developer experience by generating the types for a `UniversalProfile` contract. To do that, we can either:

- Create a contract that will import it.

```solidity title="contracts/MockContract.sol"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;
import {UniversalProfile} from '@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol';
```

- Use this typechain command:

```bash
typechain --target ethers-v5 --out-dir types './node_modules/@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json'
```

## Deploy our custom LSP1 Delegate forwarder

As we have 2 different methods with specific requirements, we will provide both set of code. Comment the code that doesn't match your choice.

Now we can create the deploy scripts that will connect all the pieces together.

- We will connect to our UP using our "UP Extension" controller private key
- Then, we will use our connected UP to deploy the custom LSP1 Delegate contract
- Finally, we register it as a LSP1 Universal Receiver in our UP

and, depending on the method selected, we will also:

- grant permission to the custom LSP1 Delegate contract to call the UP (SUPER_CALL + REENTRANT) - Method 1
- or call [`authorizeOperator()`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#authorizeoperator) on the LSP7 token to authorize the custom LSP1 Delegate contract to spend token on the UP's behalf - Method 2

Create a file called `deployLSP1.ts` in your `scripts/` folder with the following content:

```ts title="scripts/deployLSP1.ts"
import hre from 'hardhat';
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import {
  ERC725YDataKeys,
  LSP1_TYPE_IDS,
  PERMISSIONS,
  OPERATION_TYPES,
} from '@lukso/lsp-smart-contracts';

// load env vars
dotenv.config();

// You can update the value of the allowed LSP7 token
const contractsAddr = ['0x63890ea231c6e966142288d805b9f9de7e0e5927'];

// Update those values in the .env file
const { UP_ADDR, PRIVATE_KEY, UP_RECEIVER, PERCENTAGE } = process.env;

async function main() {
  // ----------
  // BASE SETUP
  // ----------

  // setup provider
  const provider = new ethers.JsonRpcProvider(
    'https://rpc.testnet.lukso.network',
  );
  // setup signer (the browser extension controller)
  const signer = new ethers.Wallet(PRIVATE_KEY as string, provider);
  // load the associated UP
  const UP = await ethers.getContractAt('UniversalProfile', UP_ADDR as string);
  console.log('🔑 EOA: ', signer.address);
  console.log('🆙 Universal Profile: ', await UP.getAddress());

  // -----------------------------
  // DEPLOY LSP1 Delegate contract
  // -----------------------------

  console.log('⏳ Deploying the custom LSP1 Delegate forwarder');
  // COMMENT IF YOU USE METHOD 2
  const CustomURDBytecode = hre.artifacts.readArtifactSync(
    'LSP1URDForwarderMethod1',
  ).bytecode;
  // UNCOMMENT IF YOU USE METHOD 2
  // const CustomURDBytecode = hre.artifacts.readArtifactSync(
  //   'LSP1URDForwarderMethod2',
  // ).bytecode;

  // we need to encode the constructor parameters and add them to the contract bytecode
  const abiCoder = new ethers.AbiCoder();
  const params = abiCoder
    .encode(
      ['address', 'uint256', 'address[]'],
      [UP_RECEIVER as string, PERCENTAGE as string, contractsAddr],
    )
    .slice(2);
  const fullBytecode = CustomURDBytecode + params;

  // get the address of the contract that will be created
  const CustomURDAddress = await UP.connect(signer).execute.staticCall(
    OPERATION_TYPES.CREATE,
    ethers.ZeroAddress, // need to specify address zero for deploying contracts
    0, // the amount of native tokens to fund the contract with when deploying it
    fullBytecode,
  );

  // deploy LSP1URDForwarder as the UP (signed by the browser extension controller)
  const deployLSP1DelegateTx = await UP.connect(signer).execute(
    OPERATION_TYPES.CREATE,
    ethers.ZeroAddress, // need to specify address zero for deploying contracts
    0, // the amount of native tokens to fund the contract with when deploying it
    fullBytecode,
  );
  await deployLSP1DelegateTx.wait();

  console.log(
    '✅ Custom URD successfully deployed at address: ',
    CustomURDAddress,
  );

  // -------------------------
  // GRANT LSP1 Delegate contract PERM - METHOD 1
  // -------------------------
  // COMMENT IF YOU USE METHOD 2

  // we need the key to store our custom LSP1 Delegate contract address
  // {_LSP1_UNIVERSAL_RECEIVER_DELEGATE_PREFIX + <bytes32 typeId>}
  console.log('⏳ Registering custom URD on the UP');
  const URDdataKey =
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegatePrefix +
    LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification.slice(2).slice(0, 40);

  // we will update the keys for:
  // - the custom LSP1 Delegate with a specific TYPE_ID (with our custom LSP1 Delegate contract address)
  // - the permission of this custom LSP1 Delegate contract (this will create a new controller in the Browser Extension)
  const dataKeys = [
    URDdataKey,
    ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
      CustomURDAddress.slice(2),
  ];

  // Calculate the correct permission (SUPER_CALL + REENTRANCY)
  const permInt =
    parseInt(PERMISSIONS.SUPER_CALL, 16) ^ parseInt(PERMISSIONS.REENTRANCY, 16);
  const permHex = '0x' + permInt.toString(16).padStart(64, '0');
  const dataValues = [CustomURDAddress, permHex];

  // execute the tx
  const setDataBatchTx = await UP.connect(signer).setDataBatch(
    dataKeys,
    dataValues,
  );
  await setDataBatchTx.wait();
  console.log('✅ Custom URD has been correctly registered on the UP');

  // ----------------------------------------------------------------
  // REGISTER LSP1 UNIVERSAL RECEIVER + AUTHORIZE OPERATOR - METHOD 2
  // ----------------------------------------------------------------
  // COMMENT IF YOU USE METHOD 1

  // we need the key to store our custom LSP1 Delegate contract address
  // {_LSP1_UNIVERSAL_RECEIVER_DELEGATE_PREFIX + <bytes32 typeId>}
  console.log('⏳ Registering custom LSP1 Delegate on the UP');
  const URDdataKey =
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegatePrefix +
    LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification.slice(2).slice(0, 40);

  // execute the tx
  const setDataTx = await UP.connect(signer).setData(
    URDdataKey,
    CustomURDAddress,
  );
  await setDataTx.wait();
  console.log(
    '✅ Custom LSP1 Delegate has been correctly registered on the UP',
  );

  console.log('⏳ Authorizing Custom LSP1 Delegate contract on Custom Token');
  // we only authorize the first contract in the contractsAddr array, but feel free to add a loop :)
  const CustomToken = await ethers.getContractAt(
    'CustomToken',
    contractsAddr[0] as string,
  );

  // Create the function call by encoding the function to be called and the params
  const authBytes = CustomToken.interface.encodeFunctionData(
    'authorizeOperator',
    [CustomURDAddress, ethers.MaxUint256, '0x'], // we authorize CustomURDAddress to spend ethers.MaxUint256
  );
  // Execute the function call as the UP
  const authTxWithBytes = await UP.connect(signer).execute(
    OPERATION_TYPES.CALL,
    await CustomToken.getAddress(),
    0,
    authBytes,
  );
  await authTxWithBytes.wait();
  console.log(
    '✅ LSP1 Delegate contract authorized on Custom Token for UP ',
    await UP.getAddress(),
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

We can now deploy our custom LSP1 Delegate contract by running:

```bash
npx hardhat run scripts/deployLSP1.ts --network luksoTestnet
```

## Test our custom LSP1 Delegate forwarder

Now that all the pieces are connected, we can try it out!

The expected behaviour is that **everytime the UP on which the custom LSP1 Delegate contract has been set receives an allowed token (either through `transfer` or `mint`), it will automatically send a percentage to the specified receiver.**

Here are the test data:

- I set up the custom LSP1 Delegate contract on a test UP (neo: `0xD62940E95A7A4a760c96B1Ec1434092Ac2C4855E`)
- I created a custom LSP7 token named "My USDC" with symbol "MUSDC" (LSP7: `0x63890ea231c6e966142288d805b9f9de7e0e5927` / owner neo / 20k pre-minted to neo)
- The custom LSP1 Delegate contract will send 20% of the received (transfer or mint) MUSDC
- The recipient will be another test UP (karasu: `0xe5B9B2C3f72bA13fF43A6CfC6205b5147F0BEe84`)
- The custom LSP1 Delegate contract is deployed at address `0x4f614ebd07b81b42373b136259915b74565fedf5`

Let's go to [the test dapp](https://up-test-dapp.lukso.tech/) and connect with neo's profile.

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestConnectNeo.png"
    alt="TestConnectNeo"
/>
</div>

Click on "Refresh tokens" to see our `MUSDC` balance.

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestRefreshTokens.png"
    alt="TestRefreshTokens"
/>
<img
    src="/img/guides/lsp1/TestPreMint.png"
    alt="TestPreMint"
/>
</div>

Use the "Mint" box to mint an additional 10k `MUSDC` to ourself (to neo's UP). This should trigger the custom LSP1 Delegate forwarder and send 20% of 10k (= 2k) to karasu.

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestMintTx.png"
    alt="TestMintTx"
/>
</div>

We will then disconnect neo's profile from the test dapp.

:::note

There is a bug currently on the test dapp where the `disconnect` button doesn't work properly. In order to disconnect from the dapp, we need to remove the connection from the "connections" tab by clicking the ❌ icon on the right.

:::

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestDisconnectNeo.png"
    alt="TestDisconnectNeo"
/>
</div>

We connect karasu's profile to the test dapp

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestConnectKarasu.png"
    alt="TestConnectKarasu"
/>
</div>

... click on "Refresh tokens" and ...

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestSuccess.png"
    alt="TestSuccess"
/>
</div>

... Success 🎉 ! Our custom LSP1 Delegate forwarder worked as expected!

## Congratulations 🥳

You now have a fully functional custom LSP1 Delegate contract that will automatically forward a certain amount of the allowed received tokens to another UP!
