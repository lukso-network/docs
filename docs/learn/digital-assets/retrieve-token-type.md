---
sidebar_label: '🗃️ Retrieve Token Type'
sidebar_position: 5
description: Retrieve LUKSO LSP token types and detect if an asset is a Token, an NFT, or a collection.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🗃️ Retrieve Token Type

To detect if an asset is a **Token**, an **NFT** or a **Collection**, we can check the value stored in the [`LSP4TokenType`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#types-of-digital-assets) data key.

This guide show you how to retrieve the token type of a deployed token contract using the [`getData(...)`](../../contracts/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.md#getdata) function, passing the `LSP4TokenType` data key as a parameter.

We will show you example with 3 different libraries: _erc725.js_, _web3.js_ and _ethers.js_

## Introduction

Token Types are beneficial because of the wide range of asset use cases. The [LSP7](../../standards/tokens/LSP7-Digital-Asset.md) and [LSP8](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) can both be used as NFTs.

- LSP7 can be used for building NFTs where each individual items have the same metadata, and users are allowed to mint multiple NFTs at once.
- In comparison, LSP8 is mainly used for NFTs with unique properties per item (like phygitals, dynamic NFTs or unique collections like [Chillwhales](https://www.chillwhales.com/)).

:::tip Convenience Tools

You can use the ⚒️ [`erc725.js`](../../tools/erc725js/getting-started.md) library, which automatically decodes [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage keys for you.

If you are using a regular contract instance from Ethers or Web3, you can use the data keys from the [`lsp-smart-contracts`](../../tools/lsp-smart-contracts/getting-started.md) library by importing the `ERC725YDataKeys` constant.

:::

## Retrieve the Token Type

After setting up the contract, retrieving its token type is as simple as making one contract call to the `getData(...)` function.

<Tabs groupId="provider-lib">
  <TabItem value="erc725.js" label="erc725.js" default>

```js
import { ERC725 } from '@erc725/erc725.js';
import lsp4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

const myAsset = new ERC725(
  lsp4Schema,
  '<myAssetAddress>', // Your Asset Address
  'https://4201.rpc.thirdweb.com', // LUKSO Testnet RPC
  {},
);

// Retrieve the token type
const tokenType = await myAsset.getData('LSP4TokenType');
console.log(tokenType);
// 0 = Token
// 1 = NFT
// 2 = Collection
```

  </TabItem>
  <TabItem value="ethers" label="ethers">

```js
import { ethers } from 'ethers';

// Import LSP4 Token ABI. LSP4 is inherited by both LSP7 and LSP8.
// LSP4 represents the metadata storage of the token contract and contains the functions to get and set data.
// Since we are only using the `getData(...)` function, we only need the LSP4 ABI.
import LSP4Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// Connect provider to LUKSO Testnet
const provider = new ethers.JsonRpcProvider('https://4201.rpc.thirdweb.com');

// Create contract instance
const myAssetContract = new ethers.Contract(
  '<myAssetAddress>',
  LSP4Artifact.abi,
  provider,
);

// Retrieve the token type
const tokenType = await myAssetContract.getData(
  ERC725YDataKeys.LSP4.LSP4TokenType,
);
console.log(tokenType);
// 0 = Token
// 1 = NFT
// 2 = Collection
```

  </TabItem>

  <TabItem value="web3" label="web3">

```js
import Web3 from 'web3';

// Import LSP4 Token ABI. LSP4 is inherited by both LSP7 and LSP8.
// LSP4 represents the metadata storage of the token contract and contains the functions to get and set data.
// Since we are only using the `getData(...)` function, we only need the LSP4 ABI.
import LSP4Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// Connect provider to LUKSO Testnet
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://4201.rpc.thirdweb.com'),
);

// Create contract instance
const myAssetContract = new web3.eth.Contract(
  LSP4Artifact.abi,
  '<myAssetAddress>',
);

// Retrieve the token type
const tokenType = await myAssetContract.methods.getData(
  ERC725YDataKeys.LSP4.LSP4TokenType,
);
console.log(tokenType);
// 0 = Token
// 1 = NFT
// 2 = Collection
```

  </TabItem>

</Tabs>
