---
sidebar_label: 'Create a custom Forwarder URD (2/2)'
sidebar_position: 2
---

# Deploy and test our custom forwarder URD

In the [first part](./create-custom-urd-1.md), we setup our universal profile and created the custom URD contract. We will now deploy it and test it!

## Create a MockContract to generate the UniversalProfile type

In order to deploy this Custom URD contract, we will interact with a UniversalProfile. We can enhance the developer experience by generating the types for a `UniversalProfile` contract by creating a contract that will import it. Create a `MockContract.sol` file in the `contracts/` file with the following content:

```solidity title="contracts/MockContract.sol"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;
import {UniversalProfile} from '@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol';
```

## Deploy our custom URD

Now we can create the deploy scripts that will connect all the pieces together. This script will:

- Connect to our UP
- Deploy the custom URD as our UP
- Register it as a URD in our UP

Create a file called `deployLSP1.ts` in your `scripts/` folder with the following content:

```ts title="scripts/deployLSP1.ts"
import hre from 'hardhat';
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import {
  ERC725YDataKeys,
  LSP1_TYPE_IDS,
  PERMISSIONS,
} from '@lukso/lsp-smart-contracts';

// load env vars
dotenv.config();

// You can update the value of the allowed LSP7 token
const contractsAddr = ['0x63890ea231c6e966142288d805b9f9de7e0e5927'];

// Update those values in the .env file
const { UP_ADDR, PRIVATE_KEY, UP_RECEIVER, PERCENTAGE } = process.env;

/**
 * In this script, we will:
 * - deploy our URD implementation (LSP1URDForwarder.sol)
 * - setDataBatch on the UP to register URD implementation + permission for URD contract
 */
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

  // ----------
  // DEPLOY URD
  // ----------

  console.log('⏳ Deploying the custom URD');
  const CustomURDBytecode =
    hre.artifacts.readArtifactSync('LSP1URDForwarder').bytecode;

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
  const CustomURDAddress = await UP.connect(signer)
    .getFunction('execute')
    .staticCall(1, ethers.ZeroAddress, 0, fullBytecode);

  // deploy LSP1URDForwarder as the UP (signed by the browser extension controller)
  const tx1 = await UP.connect(signer).execute(
    1,
    ethers.ZeroAddress,
    0,
    fullBytecode,
  );
  await tx1.wait();

  console.log(
    '✅ Custom URD successfully deployed at address: ',
    CustomURDAddress,
  );

  // --------------
  // SET DATA BATCH
  // --------------

  // we need the key to store our custom URD contract address
  // {_LSP1_UNIVERSAL_RECEIVER_DELEGATE_PREFIX + <bytes32 typeId>}
  console.log('⏳ Registering custom URD on the UP');
  const URDdataKey =
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegatePrefix +
    LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification.slice(2).slice(0, 40);

  // we will update the keys for:
  // - the custom URD of specific TYPE_ID (with our custom URD contract address)
  // - the permission of this custom URD contract (this will create a new controller in the Browser Extension)
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

  // console.log('keys: ', dataKeys);
  // console.log('values: ', dataValues);

  // execute the tx
  const setDataBatchTx = await UP.connect(signer).getFunction('setDataBatch')(
    dataKeys,
    dataValues,
  );
  await setDataBatchTx.wait();
  console.log('✅ Custom URD has been correctly registered on the UP');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

We can now deploy our custom URD by running:

```bash
npx hardhat --network luksoTestnet run scripts/deployLSP1.ts
```

## Test our custom URD

Now that all the pieces are connected, we can try it out!

The expected behaviour is that **everytime the UP on which the custom URD has been set receives an allowed token (either through `transfer` or `mint`), it will automatically send a percentage to the specified receiver.**

Here are the test data:

- I set up the custom URD on a test UP (neo: `0xD62940E95A7A4a760c96B1Ec1434092Ac2C4855E`)
- I created a custom LSP7 token named "My USDC" with symbol "MUSDC" (LSP7: `0x63890ea231c6e966142288d805b9f9de7e0e5927` / owner neo / 20k pre-minted to neo)
- The custom URD will send 20% of the received (transfer or mint) MUSDC
- The recipient will be another test UP (karasu: `0xe5B9B2C3f72bA13fF43A6CfC6205b5147F0BEe84`)
- The custom URD is deployed at address `0x4f614ebd07b81b42373b136259915b74565fedf5`

Let's go to [the test dapp](https://up-test-dapp.lukso.tech/) and connect with neo's profile.

![TestConnectNeo](/img/guides/lsp1/TestConnectNeo.png)

Click on "Refresh tokens" to see our `MUSDC` balance.

![TestRefreshTokens](/img/guides/lsp1/TestRefreshTokens.png)
![TestPreMint](/img/guides/lsp1/TestPreMint.png)

Use the "Mint" box to mint an additional 10k `MUSDC` to ourself (to neo's UP). This should trigger the custom URD and send 20% of 10k (= 2k) to karasu.

![TestMintTx](/img/guides/lsp1/TestMintTx.png)

We will then disconnect neo's profile from the test dapp.

:::note

There is a bug currently on the test dapp where the `disconnect` button doesn't work properly. In order to disconnect from the dapp, we need to remove the connection from the "connections" tab by clicking the ❌ icon on the right.

:::

![TestDisconnectNeo](/img/guides/lsp1/TestDisconnectNeo.png)

We connect karasu's profile to the test dapp

![TestConnectKarasu](/img/guides/lsp1/TestConnectKarasu.png)

... click on "Refresh tokens" and ...

![TestSuccess](/img/guides/lsp1/TestSuccess.png)

... Success 🎉 ! Our custom Universal Receiver Delegate worked as expected !

## Congratulations 🥳

You now have a fully functional custom Universal Receiver Delegate contract that will automatically forward a certain amount of the allowed received tokens to another UP!
