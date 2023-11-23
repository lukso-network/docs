---
sidebar_label: '📖 Read LSP7/8 Tokens'
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read LSP7/8 Tokens

## Background

[LSP7](../../standards/tokens/LSP7-Digital-Asset.md) and [LSP8](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) can be both used as NFTs. LSP7 is useful for mass-digital NFTs, where individual items are not unique, whereas LSP8 is mainly used for phygitals, or NFTs with unique properties per item.

To detect the fungibility of an asset, the 📄 [LSP4 Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) standard defines the `LSP4TokenType`. This data key can be retrieved from the smart contracts 🗂️ [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage.

```js
{
  "name": "LSP4TokenType",
  "key": "0xe0261fa95db2eb3b5439bd033cda66d56b96f92f243a8228fd87550ed7bdfdb3", // kecca256 hash of the word « LSP4TokenType »
  "keyType": "Singleton",
  "valueType": "uint256",
  "valueContent": "Number"
}
```

The `LSP4TokenType` is not changeable and it is set during the token's initialization.

| Value |     Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---: | :----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  `0`  |   `Token`    | Only valid for LSP7, meaning its a generic token, where the `LSP4Metadata` represents the token information.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|  `1`  |    `NFT`     | If the contract is LSP7 or LSP8, then the `LSP4Metadata` represents the information of a **single** NFT, that has multiple ownable amounts or IDs. If it's an LSP8, each individual token ID can have its own custom metadata specific for that toekn, but is not a different NFT. It is still the the same NFT but just has different metadata. Metadata can be set using `LSP8TokenIdType` and `LSP8MetadataTokenURI`. [See LSP8 for details](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md). If its an LSP7 contract, the `decimals` function MUST return `0`. |
|  `2`  | `Collection` | Only valid for LSP8. The `LSP4Metadata` represents the information of a the collection, and each individual token ID represents its own NFT and MUST have its own metadata set using `LSP8TokenIdType` and `LSP8MetadataTokenURI`. [See LSP8 for details](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md).                                                                                                                                                                                                                                                         |

## Implementation

When creating digital assets using [LSP7](../../standards/tokens/LSP7-Digital-Asset.md) or [LSP8](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md), the type and data keys of the 📄 [LSP4 Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) have to be defined within the smart contract like the following:

```solidity title="contracts/TokenTypes.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

bytes32 constant _LSP4_TOKEN_TYPE_DATA_KEY = 0xe0261fa95db2eb3b5439bd033cda66d56b96f92f243a8228fd87550ed7bdfdb3; // kecca256 hash of the word `LSP4TokenType`

enum TokenType {
    TOKEN,     // `0` = Token
    NFT,       // `1` = NFT
    COLLECTION // `2` = Collection
}
```

After defining the token type of the asset, you can create a custom [LSP7 Digital Asset Collection](../../standards/tokens/LSP7-Digital-Asset.md) or [LSP8 Identifiable Digital Asset Collection](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md). During deployment, the token type is then written to the 🗂️ [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage of the smart contract.
