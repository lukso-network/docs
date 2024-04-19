---
sidebar_label: '🔎 Retrieve Token Type'
sidebar_position: 2
description: Retrieve LUKSO LSP token types and detect if an asset is a Token, an NFT, or a collection.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Retrieve Token Type

To detect if an asset is a **Token**, an **NFT** or a **Collection**, the 📄 [LSP4 Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) standard defines a data key `LSP4TokenType` where this information is stored. The token type can be retrieved by querying this data key from the 🗂️ [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage of the digital asset contract.

```js
{
  "name": "LSP4TokenType",

  // The key is the keccak256 hash of the word « LSP4TokenType »
  "key": "0xe0261fa95db2eb3b5439bd033cda66d56b96f92f243a8228fd87550ed7bdfdb3",

  "keyType": "Singleton",
  "valueType": "uint256",
  "valueContent": "Number"
}
```

:::tip Type Declaration

You can find the different Token Types and their values within the [LSP4 Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#types-of-digital-assets) documentation.

:::

:::caution Setting Types

The `LSP4TokenType` is not changeable and it is set during the token's initialization.

:::

:::info Utilizing Types

Types are beneficial because of the wide range of asset use cases. The [LSP7](../../standards/tokens/LSP7-Digital-Asset.md) and [LSP8](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) can both be used as NFTs. LSP7 can be used for building NFTs where individual items are not unique, and users are allowed to mint larger quantities. In comparison, LSP8 is mainly used for Phygitals or NFTs with unique properties per item.

:::

## Smart Contract Implementation

When creating digital assets using [LSP7](../../standards/tokens/LSP7-Digital-Asset.md) or [LSP8](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md), the token type is defined under the `LSP4TokenType` data key.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// The keccak256 hash of the word `LSP4TokenType`
bytes32 constant _LSP4_TOKEN_TYPE_DATA_KEY = 0xe0261fa95db2eb3b5439bd033cda66d56b96f92f243a8228fd87550ed7bdfdb3;

enum TokenType {
    TOKEN,     // `0` = Token
    NFT,       // `1` = NFT
    COLLECTION // `2` = Collection
}
```

After defining the token type of the asset, you can create a custom [LSP7 Digital Asset Collection](../../standards/tokens/LSP7-Digital-Asset.md) or [LSP8 Identifiable Digital Asset Collection](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md). During deployment, the token type is then written to the 🗂️ [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage of the smart contract.

## Token Type Retrieval

You can retrieve the token type of a deployed contract by calling it's [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage.

### Installation

:::tip Convenience Tools

You can use the ⚒️ [`erc725.js`](../../tools/erc725js/getting-started.md) library, which automatically decodes [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage keys for you. If you are using a regular contract instance from Ethers or Web3, you can fetch the data keys from the [`lsp-smart-contracts`](../../tools/lsp-smart-contracts/getting-started.md) library.

:::

<Tabs groupId="provider-lib">
  <TabItem value="erc725.js" label="erc725.js" default>

```bash
npm install @erc725/erc725.js
```

  </TabItem>
  <TabItem value="ethers.js" label="ethers.js">

```bash
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="web3js" label="web3.js">

```bash
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

### Contract Calls

After setting up the contract, retrieving it's token type is as simple as one contract call.

<Tabs groupId="provider-lib">
  <TabItem value="erc725.js" label="erc725.js" default>

```js
import { ERC725 } from '@erc725/erc725.js';
import lsp4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

const myAsset = new ERC725(
  lsp4Schema,
  // Your Asset Address
  '<myAssetAddress>',
  // LUKSO Testnet RPC
  'https://4201.rpc.thirdweb.com',
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
  <TabItem value="ethers.js" label="ethers.js">

```js
import { ethers } from 'ethers';

// Import Token ABI (can be LSP7 or LSP8) & Data Keys
import lsp8Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// Connect provider to LUKSO Testnet
const provider = new ethers.JsonRpcProvider('https://4201.rpc.thirdweb.com');

// Create contract instance
const myAssetContract = new ethers.Contract(
  '<myAssetAddress>',
  lsp8Artifact.abi,
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

  <TabItem value="web3js" label="web3.js">

```js
import Web3 from 'web3';

// Import Token ABI (can be LSP7 or LSP8) & Data Keys
import lsp8Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// Connect provider to LUKSO Testnet
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://4201.rpc.thirdweb.com'),
);

// Create contract instance
const myAssetContract = new web3.eth.Contract(
  lsp8Artifact.abi,
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
