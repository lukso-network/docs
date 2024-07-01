---
sidebar_label: 'Edit Token Metadata'
sidebar_position: 3
description: Learn how to update LSP4 Metadata of digital assets on LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Edit Token Metadata

In this guide, you will learn how to edit the [`LSP4Metadata`](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) of an [LSP7 Digital Asset](../../../standards/tokens/LSP7-Digital-Asset.md).

To edit an LSP7 Digital Asset metadata, you will need to:

1. get your assets ready (images, videos, etc.) and create a metadata JSON file
2. upload these files using a preferred storage provider
3. generate an encoded value based on the URL to the metadata JSON file
4. write that value in the smart contract key-value store

For steps 1 to 3, there is a dedicated [Asset Preparation Guide](metadata-preparation.md). Once your assets are uploaded and the URL to your metadata JSON file is ready and encoded, come back here.

<details>
    <summary>Show encoded LSP4 Object</summary>

<!-- prettier-ignore-start -->

```js
const encodedLSP4Metadata = {
  keys: ['0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e'],
  values: [
    '0x00006f357c6a0020610be5a5ebf25a8323ed5a9d8735f78aaf97c7e3529da7249f17e1b4129636f3697066733a2f2f516d5154716865424c5a466e5155787535524473387441394a746b78665a714d42636d47643973756b587877526d',
  ],
};
```

<!-- prettier-ignore-end -->

</details>

:::tip Code repository

You can find all the contracts, sample metadata, and scripts of the guide within our [`lukso-playground`](https://github.com/lukso-network/lukso-playground/tree/main/smart-contracts-hardhat) repository.

:::

:::info Contract Deployment

If you want to learn more about the contract deployment itself, please have a look at the [Create LSP7 Token](../create-lsp7-token.md) guides before you continue.

:::

## Setup

First, you have to prepare all imports and constants to send the transaction.

```ts title="scripts/attachAssetMetadataAsEOA.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

// Load the environment variables
dotenv.config();

// As generated in the Asset guide
const encodedLSP4Metadata = {
  keys: ['0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e'],
  values: [
    '0x00006f357c6a0020610be5a5ebf25a8323ed5a9d8735f78aaf97c7e3529da7249f17e1b4129636f3697066733a2f2f516d5154716865424c5a466e5155787535524473387441394a746b78665a714d42636d47643973756b587877526d',
  ],
};

const [signer] = await ethers.getSigners();
const myAssetAddress = '0x...';

// Instantiate asset
const token = await ethers.Contract(myAssetAddress, LSP7Artifact.abi, signer);
```

## Set data on token

Once you have the data key and value (with the encoded VerifiableURI in it), simply call the [`setData()`](../../../contracts/contracts/ERC725/ERC725.md#setdata) function of the Token contract.

In order to update the metadata using your EOA, you can call the [`setDataBatch()`](../../../contracts/contracts/ERC725/ERC725.md#setdatabatch) function directly on the asset contract.

```ts title="scripts/attachAssetMetadataAsEOA.ts"
// Update the ERC725Y storage of the LSP4 metadata
const tx = await token.setData(
  encodedLSP4Metadata.keys[0],
  encodedLSP4Metadata.values[0],
);

// Wait for the transaction to be included in a block
const receipt = await tx.wait();
console.log('Token metadata updated:', receipt);
```

Afterwards, you are able to run the deployment script:

```bash
npx hardhat --network luksoTestnet run scripts/attachAssetMetadataAsEOA.ts
```
