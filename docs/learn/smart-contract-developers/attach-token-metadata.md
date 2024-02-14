---
sidebar_label: '💽 Attach Token Metadata'
sidebar_position: 3
description: Learn how to set and update LSP4 Metadata of digital assets on LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Attach Token Metadata

:::tip Contract Storage

To bring LSP contracts to life, you can use the 🗂️ [ERC725Y storage](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store) to set or modify certain data keys and values. Typically, these data keys reflect **any content** apart from the constructor parameters that have been initially set. All standardized storage keys follow the [LSP2 JSON Schema](../../standards/generic-standards/lsp2-json-schema/).

:::

There are two different variants of modifying ERC725Y storage:

- **[Updating the data key after the deployment](#update-metadata-after-deployment)** transaction (using an EOA or a Universal Profile)
- **[Setting the data key within the initial deployment](#set-metadata-during-deployment)** transaction (using a Universal Profile)

:::tip Code repository

You can find all the contracts, sample metadata, and scripts of the guide within our [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository.

:::

## Update metadata after deployment

In the following example, we will set the [LSP4 Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata) data key of an [LSP7 Contract](../../standards/tokens/LSP7-Digital-Asset). If you want to learn more about the contract deployment itself, please have a look at the [Getting Started](./getting-started.md) or [Create LSP7 Token](./create-lsp7-token.md) guides before you continue.

### Setup the deployment script

In the first step, you will have to set up a new deployment script in Hardhat. We will create a new function for setting the [LSP4 metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata/) key, which will take the address of your [previously deployed token](./create-lsp7-token.md). If you do not have the deployed token set up within your Hardhat repository, please adjust the `getContractAt()` function and create a new token based on a contract artifact from the 🛠️ [`@lukso/lsp-smart-contracts/`](../../tools/lsp-smart-contracts/getting-started) library.

<Tabs groupId="deployment">
  <TabItem value="up" label="Update metadata with a Universal Profile">

```ts title="scripts/attachAssetMetadataAsUP.ts"
import { ethers, network } from 'hardhat';
import * as dotenv from 'dotenv';

import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfileArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
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

```ts title="scripts/attachAssetMetadatAsEOAa.ts"
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

After setting up the structure of the script, you can use the 🛠️ [`erc725.js`](../../tools/erc725js/getting-started) library to read the current metadata of your contract. This can be used to compare or check the previous contents before proceeding with the deployment. The `erc725.js` object will later be used to encode the new contents of the [ERC725Y storage](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store).

<Tabs groupId="deployment">
  <TabItem value="up" label="Update metadata with a Universal Profile">

```ts title="scripts/attachAssetMetadataAsUP.ts"
// Imports ...

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

```ts title="scripts/attachAssetMetadatAsEOAa.ts"
// Imports ...

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

After you sucessfully tested the contract call by calling the [ERC725Y data key](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store), you can prepare the content by encoding the metadata and calling the `setData()` function on the contract.

<Tabs groupId="deployment">
  <TabItem value="up" label="Update metadata with a Universal Profile">

```ts title="scripts/attachAssetMetadataAsUP.ts"
// Imports ...

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

```ts title="scripts/attachAssetMetadatAsEOAa.ts"
// Imports ...

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
npx hardhat --network luksoTestnet run scripts/attachAssetMetadatAsEOAa.ts
```

  </TabItem>

</Tabs>

:::caution Contract Compilation

Make sure that you [sucessfully compiled your contract](./getting-started.md) before executing the deployment script.

:::

:::info

You can only set **one file link** as `VerifiableURI` for a token. This file will include all the data and media references. If you want to update individual properties, you must:

1. Get the latest contents of a contract's storage key
2. Encode the content of the VerifiableURI
3. Modify specific properties
4. Re-upload the file with all properties

The newly generated `VerifiableURI` can then be encoded and used to edit the ERC725Y storage of the contract by calling the `setData()` function or using the `CALL` operation on the `target` contract address as shown above.

:::

## Set metadata during deployment

:::tip Code repository

You can find all the contracts, sample metadata, and scripts of the guide within our [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository.

:::

If you want to set the metadata of a contract right during the deployment transaction, you will have to [deploy the transaction using a Universal Profile](./getting-started.md#create-a-env-file), as a plain EOA can not execute batch calls. This example will use the previous example contract from the [Create LSP7 Token](./create-lsp7-token.md) guide. However, you can also use your custom token contract. First, set up the deployment script and load the Universal Profile:

### Setup deployment script

```ts title="scripts/deployTokenWithMetadataAsUP.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import { ERC725 } from '@erc725/erc725.js';
import LSP0Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';
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

Next, you have to prepare the payload of the different contract calls so the batch transaction can be executed. You have to:

1. Encode the constructor parameters
2. Generate the full bytecode for the contract deployment
3. Encode the LSP4 metadata
4. Generate the full bytecode for the storage update

```ts title="scripts/deployTokenWithMetadataAsUP.ts"
// Imports ...

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
  const tokenBytecodeWithConstructor =
    tokenBytecode + encodedConstructorParams.slice(2);

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

After the payloads are prepared correctly, you can execute the `executeBatch()` function on the Universal Profile. First, you have to set the transaction target to `0x0`, as the token contract will be initialized. However, when setting the metadata, you can pass the previously generated `customTokenAddress` from the pregenerated `staticCall()` using the `CREATE` operation.

```ts title="scripts/deployTokenWithMetadataAsUP.ts"
// Imports ...

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

Make sure that you [sucessfully compiled your contract](./getting-started.md) before executing the deployment script.

:::

The transaction will be signed using the configured controller key. After the deployment, you will be able to check the contract on the [Execution Explorer](https://explorer.execution.testnet.lukso.network/)
