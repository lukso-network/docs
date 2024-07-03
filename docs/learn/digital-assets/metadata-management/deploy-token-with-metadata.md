---
sidebar_label: 'Deploy Token + Metadata with 🆙'
description: How to set LSP4 Metadata of digital assets on contract deployment.
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy Token + Metadata with 🆙

:::tip Code repository

All the contracts, sample metadata, and scripts of this guide are available in the [`lukso-playground`](https://github.com/lukso-network/lukso-playground/tree/main/smart-contracts-hardhat) repository.

:::

:::info Info

For demonstration purpose, the code in this guide deploys `LSP7Mintable`, a preset token contract available in the `@lukso/lsp-smart-contracts` package.

Feel free to use the bytecode of any custom or extended token contract you have created. You can then adjust any extra constructor parameters as per your needs in step 2.1.

:::

In this guide, you will learn how to:

1. Use your Universal Profile to deploy an [LSP7 Digital Asset](../../../standards/tokens/LSP7-Digital-Asset.md) contract.
2. Set the [metadata](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) of the token while deploying it.

We will achieve this in a single transaction using the [`executeBatch`](../../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#executebatch) function on the Universal Profile. The batch will contain the two actions defined above that will run successively.

## 1 - Connect to your Universal Profile

First, connect your script to the Universal Profile Browser Extension:

```ts title="scripts/deployTokenWithMetadataAsUP.ts"
import { ethers, Contract } from 'ethers';
import UniversalProfileArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// Connect to your Universal Profile from your dApp
const provider = new ethers.BrowserProvider(window.lukso);
const universalProfile = await provider.getSigner();
console.log('Connected to 🆙 at address: ', universalProfile.address);

// Create an instance of the Universal Profile
const universalProfile = new Contract(
  universalProfile,
  UniversalProfileArtifact.abi,
  signer,
);
```

## 2 - Prepare the transactions payloads

Next, we will prepare the payloads to:

1. deploy the token contract with some deployment parameters (token name, symbol, etc...).
2. set the metadata on the token contract.

Once we have ABI encoded these payloads, we will pass each of them to the `executeBatch` function below.

### 2.1 - Generate the bytecode of the Token contract to deploy

To achieve this, we will:

1. Encode the constructor parameters used when deploying the token contract.
2. Generate the bytecode for the contract deployment.

```ts title="scripts/deployTokenWithMetadataAsUP.ts"
import { ethers, Contract } from 'ethers';
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

// Create custom bytecode for the token deployment
const tokenBytecode = LSP7Mintable.bytecode;

// 1. Encode constructor parameters
const abiEncoder = new ethers.AbiCoder();

const encodedConstructorParams = abiEncoder.encode(
  ['string', 'string', 'address', 'uint256', 'bool'],
  [
    'My Custom Token', // token name
    'MCT', // token symbol
    universalProfile.address, // token owner (this variable is from the previous code snippet)
    0, // token type = TOKEN
    false, // isNonDivisible?
  ],
);

// 2. Generate the bytecode for the token contract deployment.
// This is done by appending the constructor parameters to the token bytecode.
const tokenBytecodeWithConstructor = ethers.concat([
  tokenBytecode,
  encodedConstructorParams,
]);
```

### 2.2 - Retrieve the future token address

The next step in the batch is to set metadata on the token contract. But you might be wondering:

> _"How can we set the token metadata since we don't know at which address the token contract has been deployed yet?"_

To know the future token contract address, we have to mimic deploying the contract from the UP but use `staticCall` to not dispatch the transaction and obtain the returned value: **this will be the future token contract address**.

Call the [`execute()`](../../../contracts/contracts/ERC725/ERC725.md#execute) function on the Universal Profile with `staticCall` to obtain the address the token contract will be deployed at. To do so, we will pass the contract's bytecode (including its deployment parameters) as the 4th parameter.

```ts
// Get the address of the custom token contract that will be created
const customTokenAddress = await universalProfile.execute.staticCall(
  1, // Operation type: CREATE
  ethers.ZeroAddress, // Target: use zero address for contract deployment
  0, // Value: used to fund any contract on deployment
  tokenBytecodeWithConstructor, // Payload: the creation bytecode of the contract to deploy
);
```

### 2.3 - Prepare the payload to set the token metadata

The next steps are:

1. Encode the token metadata.
2. Generate the payload to call `setData` on the token contract.

We will use the [`erc725.js`](../../../tools/erc725js/getting-started.md) library to encode easily the value we want to set for the `LSP4Metadata` on the token contract.

```ts
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import LSP4DigitalAssetSchema from '@erc725/erc725js/schemas/LSP4DigitalAssetMetadata.json';
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

import lsp4SampleMetadata from './lsp4SampleMetadata.json';

// Encode the metadata for deployment
const encodedLSP4Metadata = ERC725.encodeData([
  {
    keyName: 'LSP4Metadata',
    value: {
      json: lsp4SampleMetadata,
      url: 'ipfs://...',
    },
  },
]);

// Set up the token contract
const token = new ethers.Interface(LSP7Mintable.abi);

// Create the transaction payload for setting storage data
const setLSP4MetadataPayload = token.interface.encodeFunctionData('setData', [
  encodedLSP4Metadata.keys[0], // LSP4Metadata data key
  encodedLSP4Metadata.values[0], // value as an encoded VerifiableURI
]);
```

## 3 - Deploy + Set Metadata in one transaction with `executeBatch`

After having encoded both payloads, you can execute each of them through the [`executeBatch()`](../../../contracts/contracts/ERC725/ERC725.md#executebatch) function on the Universal Profile.

On the first call, you have to set the transaction target to the **zero address**, to deploy the token contract. The second call will then use the [previously generated contract address](#prepare-the-transaction-payloads) from the `staticCall` in order to set the metadata.

```ts title="scripts/deployTokenWithMetadataAsUP.ts"
// Previous code ...

// Deploy the contract by the Universal Profile
const tx = await universalProfile.executeBatch(
  [
    // Array of Operation types
    1, // Operation type: CREATE (Contract deployment)
    0, // Operation type: CALL (Set storage key on contract)
  ],
  [
    ethers.ZeroAddress, // 0x0000...0000 for contract deployment
    customTokenAddress, // (Step 2.2) Address of the token contract to call after it was deployed
  ],
  [0, 0], // Value is empty for both operations
  [
    tokenBytecodeWithConstructor, // (Step 2.1) Payload for contract deployment
    setLSP4MetadataPayload, // (Step 2.3) Payload for setting a data key on the deployed contract
  ],
);

// Wait for the transaction to be included in a block
await tx.wait();
console.log('Token deployed at: ', customTokenAddress);
```

You can then run the deployment script from your dApp interface. After the deployment, you will be able to check the contract on the [Execution Explorer](https://explorer.execution.testnet.lukso.network/).
