---
sidebar_label: 'Set LSP8 NFT Metadata'
sidebar_position: 3
description: Learn how to set the metadata of a NFT part of a LSP8 Identifiable Digital Asset Collection.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set LSP8 NFT Metadata

In this guide you will learn how to set the metadata of a specific NFT (represented by its `bytes32 tokenId`) part of a [LSP8 Identifiable Digital Asset](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) collection.

## Setup

You will need the address of an existing LSP8 NFT collection in order to follow this tutorial. This represent the LSP8 collection that includes the NFT you want to update metadata for. For instance [`0x37934A275EFd47DFce671CA3CBaE34d9138CF2D2.`](https://explorer.execution.testnet.lukso.network/address/0x37934A275EFd47DFce671CA3CBaE34d9138CF2D2?tab=read_contract)

## Imports and constants

Import `web3.js`/`ethers`, the [`LSP8IdentifiableDigitalAsset`](../../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md) ABI from [`@lukso/lsp-smart-contracts`](../../../contracts/introduction.md) and create an instance of this contract with the `lsp8ContractAddress`.

<Tabs groupId="web3-lib">
  <TabItem value="ethers" label="ethers">

```javascript
import { ethers } from 'ethers';

// import smart contract ABI
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

const provider = new ethers.BrowserProvider(window.lukso);

await provider.send('eth_requestAccounts', []);

const signer = await provider.getSigner();

const lsp8ContractAddress = '0x...';
```

  </TabItem>
  <TabItem value="web3" label="web3">

```javascript
import Web3 from 'web3';

// import smart contract ABI
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

const web3 = new Web3(window.lukso);

await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();

const lsp8ContractAddress = '0x...';
```

  </TabItem>

</Tabs>

## Instantiate the LSP8 contract

Create an instance of the LSP8 collection contract as shown below:

<Tabs groupId="web3-lib">
  <TabItem value="ethers" label="ethers">

```javascript
const lsp8Contract = new ethers.Contract(
  lsp8ContractAddress,
  LSP8IdentifiableDigitalAsset.abi,
);
```

  </TabItem>
  <TabItem value="web3" label="web3">

```javascript
const myToken = new web3.eth.Contract(
  LSP8IdentifiableDigitalAsset.abi,
  lsp8ContractAddress,
);
```

  </TabItem>
</Tabs>

## Encode the Metadata

The next step is to encode the metadata. To do so, we need:

- a JSON file that contains all the metadata of the specific NFT. This metadata has the same format as the `LSP4Metadata`.
- the IPFS url where this JSON file has been uploaded

The value will be encoded as a `VerifiableURI`. We will use the `encodeData` function from the [_erc725.js_](../../../tools/erc725js/methods.md#encodedata) library to encode a `VerifiableURI` easily.

```js title="encodeVerifiableURI.ts"
import { ERC725 } from '@erc725/erc725.js';

import NFTMetadataJSON from './NFTMetadata.json';

const schema = [
  {
    name: 'LSP4Metadata',
    key: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',
    keyType: 'Singleton',
    valueType: 'bytes',
    valueContent: 'VerifiableURI',
  },
];

const myErc725 = new ERC725(schema);

myErc725.encodeData([
  {
    keyName: 'LSP4Metadata',
    value: {
      json: NFTMetadataJSON,
      url: 'ipfs://QmQTqheBLZFnQUxu5RDs8tA9JtkxfZqMBcmGd9sukXxwRm',
    },
  },
]);
```

You can also check the code snippet example in the LSP2 specs to learn in details the [encoding of a `VerifiableURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#verifiableuri).

## Send the transaction to set metadata for a tokenId

The last step is to set the metadata for a specific [`tokenId`](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md#format-of-tokenids). You can then send the transaction to set the metadata for the given NFT represented by its `tokenId`.

Here we will use the following parameters as examples:

- `tokenId`: `0x0000000000000000000000000000000000000000000000000000000000000001`
- `dataKey`: [`LSP4Metadata`](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4metadata)
- `metadataValue`: some placeholder value as a [`VerifiableURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#verifiableuri).

> Note that the `tokenId` is a `bytes32` value (hex)

<Tabs groupId="web3-lib">

  <TabItem value="ethers" label="ethers">

```javascript
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// import and instantiate contract from previous steps

// change this with the actual tokenId to update metadata for
const tokenId =
  '0x0000000000000000000000000000000000000000000000000000000000000001';

// change this with the actual VerifiableURI of the metadata uploaded somewhere (S3, IPFS, etc...)
const metadataValue = '0x...';

await lsp8Contract.setDataForTokenId(
  tokenId,
  ERC725YDataKeys.LSP4['LSP4Metadata'],
  metadataValue,
);
```

  </TabItem>
  
  <TabItem value="web3" label="web3">

```javascript
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// import and instantiate contract from previous steps

// change this with the actual tokenId to update metadata for
const tokenId =
  '0x0000000000000000000000000000000000000000000000000000000000000001';

// change this with the actual VerifiableURI of the metadata uploaded somewhere (S3, IPFS, etc...)
const metadataValue = '0x...';

await lsp8Contract.methods
  .setDataForTokenId(
    tokenId,
    ERC725YDataKeys.LSP4['LSP4Metadata'],
    metadataValue,
  )
  .send({ from: accounts[0] });
```

  </TabItem>

</Tabs>
