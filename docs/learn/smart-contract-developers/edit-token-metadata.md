---
sidebar_label: '💽 Edit Token Metadata'
sidebar_position: 3
description: Learn how to set and update LSP4 Metadata of digital assets on LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Edit Token Metadata

In this guide, you will learn how to edit the [metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) of an [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) by updating its LSP2 data key. If you want to learn more about the contract deployment itself, please have a look at the [Getting Started](./getting-started.md) or [Create LSP7 Token](./create-lsp7-token.md) guides before you continue.

You have two options to edit metadata:

- **[Updating the data key after the deployment](#update-metadata-after-contract-deployment)** transaction (using an EOA or a Universal Profile)
- **[Setting the data key within the initial deployment](#set-metadata-during-contract-deployment)** transaction (using a Universal Profile)

:::tip Code repository

You can find all the contracts, sample metadata, and scripts of the guide within our [`lukso-playground`](https://github.com/lukso-network/lukso-playground/tree/main/smart-contracts-hardhat) repository.

:::

## Update metadata after contract deployment

### Setup the deployment script

In the first step, you will have to set up a new deployment script in Hardhat. We will create a new function for setting the [LSP4 metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) key, which will take the address of your [previously deployed token](./create-lsp7-token.md). If you do not have the deployed token set up within your Hardhat repository, please adjust the `getContractAt()` function and create a new token based on a contract artifact from the [`@lukso/lsp-smart-contracts`](../../tools/lsp-smart-contracts/getting-started.md) library.

<Tabs groupId="deployment">
  <TabItem value="up" label="Update metadata with a Universal Profile">

```ts title="scripts/attachAssetMetadataAsUP.ts"
import { ethers, network } from 'hardhat';
import * as dotenv from 'dotenv';

import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import UniversalProfileArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

import { ERC725 } from '@erc725/erc725.js';
import LSP4DigitalAssetSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

import { lsp4SampleMetadata } from '../consts/LSP4SampleMetadata';

interface CustomNetworkConfig {
  url?: string;
}

// Load the environment variables
dotenv.config();

async function attachAssetMetadata(myAssetAddress: string) {
  // UP controller used for deployment
  const [signer] = await ethers.getSigners();
  console.log(
    'Updating metadata with Universal Profile Controller: ',
    signer.address,
  );

  // Load the Universal Profile
  const universalProfile = await ethers.getContractAtFromArtifact(
    UniversalProfileArtifact,
    process.env.UP_ADDR as string,
  );

  // Set up the token contract at an existing address
  const token = await ethers.getContractAt('MyCustomToken', myAssetAddress);
}

attachAssetMetadata('0x...' /* Your custom asset address */)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

  </TabItem>

  <TabItem value="eoa" label="Update metadata with an EOA">

```ts title="scripts/attachAssetMetadataAsEOA.ts"
import { ethers, network } from 'hardhat';
import * as dotenv from 'dotenv';

import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import { ERC725 } from '@erc725/erc725.js';
import LSP4DigitalAssetSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

import { lsp4SampleMetadata } from '../consts/LSP4SampleMetadata';

interface CustomNetworkConfig {
  url?: string;
}

// Load the environment variables
dotenv.config();

async function attachAssetMetadata(myAssetAddress: string) {
  // Signer used for deployment
  const [signer] = await ethers.getSigners();
  console.log('Updating metadata with EOA: ', signer.address);

  // Set up the token contract
  const token = await ethers.getContractAt('MyCustomToken', myAssetAddress);
}

attachAssetMetadata('0x...' /* Your custom asset address */)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

  </TabItem>

</Tabs>

### Read the current metadata entry

After setting up the structure of the script, you can use the [`erc725.js`](../../tools/erc725js/getting-started.md) library to read the current metadata of your contract using [`getData()`](../../tools/erc725js/classes/ERC725.md#getdata). This can be used to compare or check the previous contents before proceeding with the deployment. The `erc725.js` object will later be used to encode the new contents of the [ERC725Y storage](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store).

<Tabs groupId="deployment">
  <TabItem value="up" label="Update metadata with a Universal Profile">

```ts title="scripts/attachAssetMetadataAsUP.ts"
async function attachAssetMetadata(myAssetAddress: string) {
  // Previous code ...

  // Get the ERC725Y data key of LSP4
  const metadataKey = ERC725YDataKeys.LSP4['LSP4Metadata'];

  // Read the current token metadata
  const customNetworkConfig = network.config as CustomNetworkConfig;
  const networkUrl = customNetworkConfig.url;

  if (!networkUrl) {
    throw new Error('Network URL is not defined in the Hardhat configuration.');
  }

  const erc725js = new ERC725(
    LSP4DigitalAssetSchema,
    myAssetAddress,
    networkUrl,
  );

  // Read the current token metadata
  const currentMetadata = await erc725js.getData(metadataKey);
  console.log('Current token metadata:', currentMetadata);
}
```

  </TabItem>

  <TabItem value="eoa" label="Update metadata with an EOA">

```ts title="scripts/attachAssetMetadataAsEOA.ts"
async function attachAssetMetadata(myAssetAddress: string) {
  // Previous code ...

  // Get the ERC725Y data key of LSP4
  const metadataKey = ERC725YDataKeys.LSP4['LSP4Metadata'];

  // Setup network parameters for ERC725
  const customNetworkConfig = network.config as CustomNetworkConfig;
  const networkUrl = customNetworkConfig.url;

  if (!networkUrl) {
    throw new Error('Network URL is not defined in the Hardhat configuration.');
  }

  const erc725js = new ERC725(
    LSP4DigitalAssetSchema,
    myAssetAddress,
    networkUrl,
  );

  // Read the current token metadata
  const currentMetadata = await erc725js.getData(metadataKey);
  console.log('Current token metadata:', currentMetadata);
}
```

  </TabItem>

</Tabs>

### Create the metadata transaction

After you successfully tested the contract call by calling the [ERC725Y data key](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store), you can prepare the content by encoding the metadata. that will be passed into the [`setData()`](../../contracts/contracts/ERC725/ERC725.md#setdata) function of the [ERC725](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store)-based contract.

<Tabs groupId="deployment">
  <TabItem value="up" label="Update metadata with a Universal Profile">

In order to update the metadata using your Universal Profile, the [`setData()`](../../contracts/contracts/ERC725/ERC725.md#setdata) function of the contract can not be called directly. Instead, you have to generate the payload of the transaction and execute it by calling the [`execute()`](../../contracts/contracts/ERC725/ERC725.md#execute) function of the Universal Profile.

```ts title="scripts/attachAssetMetadataAsUP.ts"
async function attachAssetMetadata(myAssetAddress: string) {
  // Previous code ...

  // Encode the new metadata
  const encodedLSP4Metadata = ERC725.encodeData(
    lsp4SampleMetadata,
    LSP4DigitalAssetSchema,
  );

  // Create the transaction payload for the contract call
  const setDataPayload = token.interface.encodeFunctionData('setData', [
    metadataKey,
    encodedLSP4Metadata.values[0],
  ]);

  // Update the ERC725Y storage of the LSP4 metadata
  const tx = await universalProfile.execute(
    0, // Operation type: CALL
    myAssetAddress, // Target: asset address
    0, // Value is empty
    setDataPayload, // bytecode to be executed
  );

  // Wait for the transaction to be included in a block
  const receipt = await tx.wait();
  console.log('Token metadata updated: ', receipt);
}
```

Afterwards, the script is ready to be deployed:

```bash
npx hardhat --network luksoTestnet run scripts/attachAssetMetadataAsUP.ts
```

  </TabItem>

  <TabItem value="eoa" label="Update metadata with an EOA">

In order to update the metadata using your EOA, you can call the [`setDataBatch()`](../../contracts/contracts/ERC725/ERC725.md#setdatabatch) function directly on the asset contract.

```ts title="scripts/attachAssetMetadataAsEOA.ts"
async function attachAssetMetadata(myAssetAddress: string) {
  // Previous code ...

  // Encode the new metadata
  const encodedLSP4Metadata = erc725js.encodeData(lsp4SampleMetadata);

  // Update the ERC725Y storage of the LSP4 metadata
  const tx = await token.setDataBatch(
    encodedLSP4Metadata.keys,
    encodedLSP4Metadata.values,
  );

  // Wait for the transaction to be included in a block
  const receipt = await tx.wait();
  console.log('Token metadata updated: ', receipt);
}
```

Afterwards, the script is ready to be deployed:

```bash
npx hardhat --network luksoTestnet run scripts/attachAssetMetadataAsEOA.ts
```

  </TabItem>

</Tabs>

:::caution Contract Compilation

Make sure that you [successfully compiled your contract](./getting-started.md) before executing the deployment script.

:::

:::info

You can only set **one file link** as `VerifiableURI` for a token. This file will include all the data and media references. If you want to update individual properties, you must:

1. Get the latest contents of a contract's storage key
2. Encode the content of the VerifiableURI
3. Modify specific properties
4. Re-upload the file with all properties

The newly generated `VerifiableURI` can then be encoded and used to edit the ERC725Y storage of the contract by calling the `setData()` function or using the `CALL` operation on the `target` contract address as shown above.

:::

## Set metadata during contract deployment

:::info

If you want to set the metadata of a contract right during the deployment transaction, you will have to [deploy the transaction using a Universal Profile](./getting-started.md#create-a-env-file), as an EOA can not execute batch calls.

:::

The example will use the previous contract from the [Create LSP7 Token](./create-lsp7-token.md) guide. However, the process of deploying contracts with metadata is almost equivalent across LSPs. You just have to adjust the contract parameters, schemas, and artifacts according to your standards.

### Setup deployment script

First, set up the deployment script and load the Universal Profile:

```ts title="scripts/deployTokenWithMetadataAsUP.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import LSP0Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';

import { ERC725 } from '@erc725/erc725.js';
import LSP4DigitalAssetSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

import { lsp4SampleMetadata } from '../consts/LSP4SampleMetadata';

// Load environment variables
dotenv.config();

async function deployTokenWithMetadata() {
  // UP controller used for deployment
  const [deployer] = await ethers.getSigners();
  console.log(
    'Deploying contract with Universal Profile controller: ',
    deployer.address,
  );

  // Load the Universal Profile
  const universalProfile = await ethers.getContractAtFromArtifact(
    LSP0Artifact,
    process.env.UP_ADDR as string,
  );
}

deployTokenWithMetadata()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Prepare the transaction payloads

Next, you have to prepare the payload of the different contract calls so the batch transaction can be executed:

1. Encode the constructor parameters
2. Generate the full bytecode for the contract deployment
3. Encode the LSP4 metadata
4. Generate the full bytecode for the storage update

:::tip Encoding

The [`erc725.js`](../../tools/erc725js/getting-started.md) library can be used to easily encode the data of the [LSP4 Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) and other data keys following the [LSP2 ERC725YJSON Schema](../../standards/generic-standards/lsp2-json-schema.md). The encoded value will then be passed into the [`setData()`](../../contracts/contracts/ERC725/ERC725.md#setdata) function call of the contract.

:::

:::info Address Generation

Generating the full bytecode for the storage update requires the contract address to be called. As the contract is not yet deployed, you have to mimic calling the [`execute()`](../../contracts/contracts/ERC725/ERC725.md#execute) function on the Universal Profile using `staticCall`. This address then matches the contract that will later be deployed using the same parameters.

:::

```ts title="scripts/deployTokenWithMetadataAsUP.ts"
async function deployTokenWithMetadata() {
  // Previous code ...

  // Create custom bytecode for the token deployment
  const tokenBytecode = (await ethers.getContractFactory('MyCustomToken'))
    .bytecode;
  const abiEncoder = new ethers.AbiCoder();

  // Encode constructor parameters
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

  // Add the constructor parameters to the token bytecode
  const tokenBytecodeWithConstructor = ethers.concat([
    tokenBytecode,
    encodedConstructorParams,
  ]);

  // Get the address of the custom token contract that will be created
  const customTokenAddress = await universalProfile.execute.staticCall(
    1, // Operation type: CREATE
    ethers.ZeroAddress, // Target: 0x0 as contract will be initialized
    0, // Value is empty
    tokenBytecodeWithConstructor, // Payload of the contract
  );

  // Encode the metadata for deployment
  const encodedLSP4Metadata = ERC725.encodeData(
    lsp4SampleMetadata,
    LSP4DigitalAssetSchema,
  );

  // Set up the token contract
  const token = await ethers.getContractAt('MyCustomToken', customTokenAddress);

  // Get the ERC725Y data key of LSP4
  const metadataKey = ERC725YDataKeys.LSP4['LSP4Metadata'];

  // Create the transaction payload for setting storage data
  const lsp4StorageBytecode = token.interface.encodeFunctionData('setData', [
    metadataKey,
    encodedLSP4Metadata.values[0],
  ]);
}
```

### Create the batch transaction

After the payloads are prepared correctly, you can execute the [`executeBatch()`](../../contracts/contracts/ERC725/ERC725.md#executebatch) function on the Universal Profile. On the first call, you have to set the transaction target to `0x0`, as the token contract will be initialized. The second call will then use the [previously generated contract address](#prepare-the-transaction-payloads) from the `staticCall` in order to set the metadata.

```ts title="scripts/deployTokenWithMetadataAsUP.ts"
async function deployTokenWithMetadata() {
  // Previous code ...

  // Deploy the contract by the Universal Profile
  const tx = await universalProfile.executeBatch(
    [
      // Array of Operation types
      1, // Operation type: CREATE (Contract deployment)
      0, // Operation type: CALL (Set storage key on contract)
    ],
    [
      ethers.ZeroAddress, // 0x0 as contract will be initialized
      customTokenAddress, // Contract address after deployment
    ],
    [0, 0], // Value is empty for both operations
    [
      tokenBytecodeWithConstructor, // Payload for contract deployment
      lsp4StorageBytecode, // Payload for setting a data key on the deployed contract
    ],
  );

  // Wait for the transaction to be included in a block
  await tx.wait();
  console.log('Token deployed at: ', customTokenAddress);
}
```

Afterwards, the script is ready to be deployed:

```bash
npx hardhat --network luksoTestnet run scripts/deployTokenWithMetadataAsUP.ts
```

:::caution Contract Compilation

Make sure that you [successfully compiled your contract](./getting-started.md) before executing the deployment script.

:::

The transaction will be signed using the configured controller key. After the deployment, you will be able to check the contract on the [Execution Explorer](https://explorer.execution.testnet.lukso.network/).
