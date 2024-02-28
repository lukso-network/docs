---
sidebar_label: '💽 Set Token Metadata on deployment'
description: How to set LSP4 Metadata of digital assets on LUKSO on contract deployment.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Edit Token Metadata

In this guide, you will learn how to set the [metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) of an [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) by updating its LSP2 data key when you deploy it.

:::tip Code repository

You can find all the contracts, sample metadata, and scripts of the guide within our [`lukso-playground`](https://github.com/lukso-network/lukso-playground/tree/main/smart-contracts-hardhat) repository.

:::

## Set metadata during contract deployment

:::info

If you want to set the metadata of a contract right during the deployment transaction, you will have to [deploy the transaction using a Universal Profile](../smart-contract-developers/getting-started.md#create-a-env-file), as an EOA can not execute batch calls.

:::

The example will use the previous contract from the [Create LSP7 Token](../smart-contract-developers/create-lsp7-token.md) guide. However, the process of deploying contracts with metadata is almost equivalent across LSPs. You just have to adjust the contract parameters, schemas, and artifacts according to your standards.

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

As the contract is not yet deployed, you have to mimic calling the [`execute()`](../../contracts/contracts/ERC725/ERC725.md#execute) function on the Universal Profile using `staticCall` to obtain its future address. To do so, you must pass the contract's bytecode (including the deployment parameters) as the 4th parameter to the `execute(...)` function.

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

Make sure that you [successfully compiled your contract](../smart-contract-developers/getting-started.md) before executing the deployment script.

:::

The transaction will be signed using the configured controller key. After the deployment, you will be able to check the contract on the [Execution Explorer](https://explorer.execution.testnet.lukso.network/).
