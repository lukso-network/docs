---
sidebar_label: 'Set LSP7 Token Metadata'
sidebar_position: 3
description: Learn how to update LSP4 Metadata of digital assets on LUKSO using ethers.js, web3.js, or Hardhat.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set LSP7 Token Metadata

> 👇🏻 Hands on 📽️ _ethers.js_ workshop video for the [**Oxford Blockchain Society**](https://x.com/oxfordblocksoc) from March 2024.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/TZV_eOp77b8?si=iWMEWZ6mu30o-Bo5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

In this guide, you will learn how to edit the [`LSP4Metadata`](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) of an [LSP7 Digital Asset](../../../standards/tokens/LSP7-Digital-Asset.md). You will need to:

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

You can find all the contracts, sample metadata, and scripts of the guide within our [`lukso-playground`](https://github.com/lukso-network/lukso-playground/tree/main/smart-contracts) repository.

:::

:::info Contract Deployment

If you want to learn more about the contract deployment itself, please have a look at the [Create LSP7 Token](../../digital-assets/token/create-lsp7-token.md) guides before you continue.

:::

## Setup

First, prepare the encoded metadata and connect to your token contract.

<Tabs groupId="web3-lib">
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js title="set-token-metadata-ethers.js"
import { ethers } from 'ethers';
import LSP7Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';

// As generated in the Asset Preparation guide
const encodedLSP4Metadata = {
  keys: ['0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e'],
  values: [
    '0x00006f357c6a0020610be5a5ebf25a8323ed5a9d8735f78aaf97c7e3529da7249f17e1b4129636f3697066733a2f2f516d5154716865424c5a466e5155787535524473387441394a746b78665a714d42636d47643973756b587877526d',
  ],
};

// Connect via the UP Browser Extension
const provider = new ethers.BrowserProvider(window.lukso);
await provider.send('eth_requestAccounts', []);
const signer = await provider.getSigner();

const myAssetAddress = '0x...';

// Instantiate the token contract
const token = new ethers.Contract(myAssetAddress, LSP7Artifact.abi, signer);
```

</TabItem>
<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```js title="set-token-metadata-web3.js"
import Web3 from 'web3';
import LSP7Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';

// As generated in the Asset Preparation guide
const encodedLSP4Metadata = {
  keys: ['0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e'],
  values: [
    '0x00006f357c6a0020610be5a5ebf25a8323ed5a9d8735f78aaf97c7e3529da7249f17e1b4129636f3697066733a2f2f516d5154716865424c5a466e5155787535524473387441394a746b78665a714d42636d47643973756b587877526d',
  ],
};

// Connect via the UP Browser Extension
const web3 = new Web3(window.lukso);
await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();

const myAssetAddress = '0x...';

// Instantiate the token contract
const token = new web3.eth.Contract(LSP7Artifact.abi, myAssetAddress);
```

</TabItem>
<TabItem value="hardhat" label="Hardhat" attributes={{className: "tab_hardhat"}}>

```ts title="scripts/attachAssetMetadataAsEOA.ts"
import { ethers } from 'hardhat';
import LSP7Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import * as dotenv from 'dotenv';

// Load the environment variables
dotenv.config();

// As generated in the Asset Preparation guide
const encodedLSP4Metadata = {
  keys: ['0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e'],
  values: [
    '0x00006f357c6a0020610be5a5ebf25a8323ed5a9d8735f78aaf97c7e3529da7249f17e1b4129636f3697066733a2f2f516d5154716865424c5a466e5155787535524473387441394a746b78665a714d42636d47643973756b587877526d',
  ],
};

const [signer] = await ethers.getSigners();
const myAssetAddress = '0x...';

// Instantiate the token contract
const token = new ethers.Contract(myAssetAddress, LSP7Artifact.abi, signer);
```

</TabItem>
</Tabs>

## Set data on token

Once you have the data key and value (with the encoded VerifiableURI in it), call the [`setData(bytes32,bytes)`](/contracts/contracts/UniversalProfile/#setdata) function on the Token contract.

<Tabs groupId="web3-lib">
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js title="set-token-metadata-ethers.js"
// Update the ERC725Y storage of the LSP4 metadata
const tx = await token.setData(
  encodedLSP4Metadata.keys[0],
  encodedLSP4Metadata.values[0],
);

// Wait for the transaction to be included in a block
const receipt = await tx.wait();
console.log('✅ Token metadata updated:', receipt.hash);
```

</TabItem>
<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```js title="set-token-metadata-web3.js"
// Update the ERC725Y storage of the LSP4 metadata
const receipt = await token.methods
  .setData(encodedLSP4Metadata.keys[0], encodedLSP4Metadata.values[0])
  .send({ from: accounts[0] });

console.log('✅ Token metadata updated:', receipt.transactionHash);
```

</TabItem>
<TabItem value="hardhat" label="Hardhat" attributes={{className: "tab_hardhat"}}>

```ts title="scripts/attachAssetMetadataAsEOA.ts"
// Update the ERC725Y storage of the LSP4 metadata
const tx = await token.setData(
  encodedLSP4Metadata.keys[0],
  encodedLSP4Metadata.values[0],
);

// Wait for the transaction to be included in a block
const receipt = await tx.wait();
console.log('✅ Token metadata updated:', receipt);
```

Run the script:

```bash
npx hardhat --network luksoTestnet run scripts/attachAssetMetadataAsEOA.ts
```

</TabItem>
</Tabs>

### Setting multiple data keys at once

If you need to update multiple metadata keys simultaneously, use [`setDataBatch(bytes32[],bytes[])`](/contracts/contracts/UniversalProfile/#setdatabatch):

<Tabs groupId="web3-lib">
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
const tx = await token.setDataBatch(
  encodedLSP4Metadata.keys,
  encodedLSP4Metadata.values,
);
await tx.wait();
```

</TabItem>
<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```js
await token.methods
  .setDataBatch(encodedLSP4Metadata.keys, encodedLSP4Metadata.values)
  .send({ from: accounts[0] });
```

</TabItem>
<TabItem value="hardhat" label="Hardhat" attributes={{className: "tab_hardhat"}}>

```ts
const tx = await token.setDataBatch(
  encodedLSP4Metadata.keys,
  encodedLSP4Metadata.values,
);
await tx.wait();
```

</TabItem>
</Tabs>
