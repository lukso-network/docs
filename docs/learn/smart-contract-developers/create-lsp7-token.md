---
sidebar_label: '🌄 Create an LSP7 Token'
sidebar_position: 2
description: Learn how to create a custom Digital Asset (token) on LUKSO using LSP7 standard.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an LSP7 Token

This guide will walk you through the process of creating and deploying a custom [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) and pre-mint a certain amount of tokens to a the token owner. To build a smart contract using LSPs, you can **inherit functionality** from modular and standardized presets in the [`@lukso/lsp-smart-contracts`](../../tools/lsp-smart-contracts/getting-started.md) library. To learn more about the contract standards itself, please refer to the [Contracts section](../../contracts/introduction.md) of our documentation.

:::tip

You can learn about the project setup and Hardhat workflow by checking the [Getting Started](./getting-started.md) section.

:::

## Create the Token

:::info

For instructions on deploying a contract using the Universal Profile Browser Extension, please refer to the [Deploy Contracts Guide](../dapp-developer/deploy-contracts.md) for dApp developers.

:::

:::tip Code repository

You can find all the contracts and scripts of the guide within our [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository.

:::

For our sample deployment of the LSP7 token, will will use the following presets:

- [`LSP7Mintable`](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md): allow creating new assets on the smart contract.
- [`LSP7Burnable`](../../contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.md): allow tokens to be removed from the supply.

You can then import them within your Solidity contract file:

```solidity title="contracts/MyCustomToken.sol"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.sol";

contract CustomToken is LSP7Mintable, LSP7Burnable {
  // your custom token logic ...
}
```

After inheriting, the contract **expects the mandatory parameters** related to the imported standards. In case of [`LSP7`](../../standards/tokens/LSP7-Digital-Asset), you must define default token parameters in the constructor of the smart contract, that will be set during the deployment of the contract:

- the [token name and symbol](../../standards/tokens/LSP4-Digital-Asset-Metadata/#lsp4tokenname) (inherited from [LSP4](../../standards/tokens/LSP4-Digital-Asset-Metadata))
- the address of the initial token owner
- the [token type](../../standards/tokens/LSP4-Digital-Asset-Metadata#with-lsp7-digital-asset-token) of the asset
- the [divisibility](../../standards/tokens/LSP7-Digital-Asset/#divisible-vs-non-divisible) of token units (specific to [LSP7](../../standards/tokens/LSP7-Digital-Asset))

You can specify the parameters and the mint function as seen below.

```solidity title="contracts/MyCustomToken.sol"
// ...

contract CustomToken is LSP7Mintable, LSP7Burnable {
    constructor(
        string memory tokenName_,
        string memory tokenSymbol_,
        address tokenContractOwner_,
        uint256 lsp4TokenType_,
        bool isNonDivisible_
    )
        LSP7Mintable(
            tokenName_,
            tokenSymbol_,
            tokenContractOwner_,
            lsp4TokenType_,
            isNonDivisible_
        )
    {
        {
            // your custom smart contract logic ...

            mint(
              msg.sender, // deployer will receive initial tokens
              20_000 * 10 ** decimals(), // will mint 20k tokens
              true, // force parameter
              "0x"  // optional transaction data
            );
        }
    }
}
```

:::info

To adjust the parameters of the mint, please have a look at the related [LSP7 function documentation](../../contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.md#mint). You can find the **full documentation** for [LSP7](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable/#parameters-16) and other **presets** within the [Technical ABI Reference](https://docs.lukso.tech/contracts/contracts/ERC725/).

:::

## Compile the Token

After you've set all mandatory parameters or added custom functionality, you can test and compile the smart contract:

```bash
npx hardhat compile
```

:::tip

Add the `--verbose` and `--show-stack-traces` flags to get further debugging information and gas data.

This is especially important if a lot of functionality is inherited, as the bytecode might succeed the EVM limit of 24k bytes. You can find more information about optimization settings within the [Getting Started](./getting-started.md) section.

:::

## Deploy the Token

After the contract file has been successfully compiled, you are ready to create a script to deploy it's token on the [LUKSO Testnet network](../../networks/testnet/parameters). To deploy your token on chain we **recommend using a controller and address of a Universal Profile**, so your asset will be connected and fetchable from your on-chain persona. Optionally, you can also use a regular Externally Owned Account (EOA).

<Tabs groupId="deployment">
  <TabItem value="up" label="Deploy with Universal Profile">

```ts title="scripts/deployMyCustomToken.ts"
import hre from 'hardhat';
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import LSP0Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';

// Load the environment variables
dotenv.config();

async function deployToken() {
  // Setup the provider
  const provider = new ethers.JsonRpcProvider(
    'https://rpc.testnet.lukso.gateway.fm',
  );

  // Setup the controller used to sign the deployment
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
  console.log(
    'Deploying contracts with Universal Profile Controller: ',
    signer.address,
  );

  // Load the Universal Profile used for deployment
  const universalProfile = await ethers.getContractAtFromArtifact(
    LSP0Artifact,
    process.env.UP_ADDR as string,
  );

  // Create the plain bytecode of the contract
  const CustomTokenBytecode =
    hre.artifacts.readArtifactSync('MyCustomToken').bytecode;

  const abiEncoder = new ethers.AbiCoder();

  // Encode the constructor parameters
  const encodedConstructorParams = abiEncoder.encode(
    ['string', 'string', 'address', 'uint256', 'bool'],
    [
      'My Custom Token', // token name
      'MCT', // token symbol
      process.env.UP_ADDR, // token owner
      0, // token type = TOKEN
      false, // isNonDivisible?
    ],
  );

  // Generate the full bytecode of the token
  const CustomTokenBytecodeWithConstructor =
    CustomTokenBytecode + encodedConstructorParams.slice(2);

  // Get the address of the contract that will be created
  const CustomTokenAddress = await universalProfile
    .connect(signer)
    .getFunction('execute')
    .staticCall(
      1, // Operation type: CREATE
      ethers.ZeroAddress,
      0, // Value is empty
      CustomTokenBytecodeWithConstructor,
    );

  // Deploy the contract from the Universal Profile
  const tx = await universalProfile.connect(signer).getFunction('execute')(
    1, // Operation type: CREATE
    ethers.ZeroAddress,
    0, // Value is empty
    CustomTokenBytecodeWithConstructor,
  );

  // Wait for the transaction to be included in a block
  await tx.wait();
  console.log('Custom token address: ', CustomTokenAddress);
}

deployToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

  </TabItem>

  <TabItem value="eoa" label="Deploy with EOA">

```ts title="scripts/deployMyCustomToken.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

// Load the environment variables
dotenv.config();

async function deployToken() {
  // Get the signer key of the deployer
  const [deployer] = await ethers.getSigners();

  // Deploy the token with its parameters
  const customToken = await ethers.deployContract('MyCustomToken', [
    'My Custom Token', // token name
    'MCT', // token symbol
    deployer.address, // contract owner
    0, // token type = TOKEN
    false, // isNonDivisible?
  ]);

  // Wait for the transaction to be included in a block
  await customToken.waitForDeployment();
  const CustomTokenAddress = await customToken.getAddress();
  console.log(`Deployed token address: ${CustomTokenAddress}`);
}

deployToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

  </TabItem>

</Tabs>

If you have not yet setup the LUKSO networks and private keys in HardHat, please check out the previous [Getting Started](./getting-started.md) guide for smart contract developers. If you set up the Hardhat configuration, you can execute the deployment script using the following command:

```bash
npx hardhat --network luksoTestnet run scripts/deployMyCustomToken.ts
```

:::tip

You can check the deployed token address on the [Testnet Execution Explorer](https://explorer.execution.testnet.lukso.network/).

:::

## Attach Asset Metadata

After the token contract has been successfully deployed, you can fetch and set metadata to the [ERC725Y](../../standards/generic-standards/lsp2-json-schema/) contract storage using [LSP4](../../standards/tokens/LSP4-Digital-Asset-Metadata) schema:

<Tabs groupId="deployment">
  <TabItem value="up" label="Update metadata with Universal Profile">

```ts title="scripts/attachAssetMetadata.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import { LSP7MintableArtifact } from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

// Load the environment variables
dotenv.config();

async function attachAssetMetadata(
  myAssetAddress: string,
  myMetadataURI: string,
) {
  // Setup the provider
  const provider = new ethers.JsonRpcProvider(
    'https://rpc.testnet.lukso.gateway.fm',
  );

  // Setup the controller used to sign the deployment
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
  console.log(
    'Updating metadata with Universal Profile Controller: ',
    signer.address,
  );

  // Load the Universal Profile
  const universalProfile = await ethers.getContractAtFromArtifact(
    LSP0Artifact,
    process.env.UP_ADDR as string,
  );

  // Set up the token contract
  const token = new ethers.Contract(
    myAssetAddress,
    LSP7MintableArtifact.abi,
    signer,
  );

  const metadataKey = ERC725YDataKeys.LSP4['LSP4Metadata'];

  // Read the current token metadata
  const currentMetadata = await token.getData(metadataKey);
  console.log(
    'Current token metadata:',
    JSON.stringify(currentMetadata, undefined, 2),
  );

  // Create the transaction payload for the contract call
  const setDataPayload = token.interface.encodeFunctionData('setData', [
    metadataKey,
    ethers.utils.toUtf8Bytes(myMetadataURI),
  ]);

  // Update the token metadata
  const tx = await universalProfile.connect(signer).getFunction('execute')(
    0, // Operation type: CALL
    myAssetAddress,
    0, // Value is empty
    setDataPayload,
  );

  // Wait for the transaction to be included in a block
  const receipt = await tx.wait();
  console.log('Token metadata updated:', receipt);
}

attachAssetMetadata(CustomTokenAddress, 'https://link.to.my.metadata')
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

  </TabItem>

  <TabItem value="eoa" label="Update metadata with EOA">

```ts title="scripts/attachAssetMetadata.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import { LSP7MintableArtifact } from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

// Load the environment variables
dotenv.config();

async function attachAssetMetadata(
  myAssetAddress: string,
  myMetadataURI: string,
) {
  // Get the signer key
  [signer] = await ethers.getSigners();

  // Set up the token contract
  const token = new ethers.Contract(
    myAssetAddress,
    LSP7MintableArtifact.abi,
    signer,
  );

  const metadataKey = ERC725YDataKeys.LSP4['LSP4Metadata'];

  // Read the current token metadata
  const currentMetadata = await token.getData(metadataKey);
  console.log(
    'Current token metadata:',
    JSON.stringify(currentMetadata, undefined, 2),
  );

  // Update the token metadata
  const tx = await token.setData(
    metadataKey,
    ethers.utils.toUtf8Bytes(myMetadataURI),
  );

  // Wait for the transaction to be included in a block
  const receipt = await tx.wait();
  console.log('Token metadata updated:', receipt);
}

attachAssetMetadata(CustomTokenAddress, 'https://link.to.my.metadata')
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

  </TabItem>

</Tabs>

:::info

You can only set one file link as `VerifiableURI` for a token. This file will include all the data and media references. If you want to update individual properties, please get the latest contents of a contract's storage key, modify specific properties, and re-upload the full file. This can then be used to edit the storage by calling the `setData()` function.

:::

## Verify the Token

In order to verify a contract, you have to create a file with all the constructor arguments that you've set during deployment. The parameters and the compiled contract code are then compared with the payload of the deployed contract. First, create the file with all constructor parameters:

```ts title="verify/myTokenParameters.ts"
module.exports = [
  'My Custom Token', // token name
  'MCT', // token symbol
  '0x...', // deployer address
  0, // token type
  false, // divisibility
];
```

To verify the deployed token, you can use the **blockscout API properties** set up within the [Getting Started](./getting-started.md) section. If you configured the API, you will be able to run the verification by specifying the _token address_, _paramter file_, and _network_:

```bash
npx hardhat verify <myTokenAddress> --constructor-args ./verify/myTokenParameters.ts --network luksoTestnet
```
