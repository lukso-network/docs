---
sidebar_label: '📖 Read LSP7/8 Tokens'
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read LSP7/8 Tokens

## Background

Currently LSP7 and LSP8 can both be used as NFTs. LSP7 is useful for mass-digital NFTs, where individual items are not unique, whereas LSP8 is mainly used for phygitals, or NFTs with unique properties per item.

Previously, an interface could not differentiate between LSP7 being a token or an NFT. [LSP4TokenType data key](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md?plain=1) allows to define the type, in a smart contract readable form.

```js
{
  "name": "LSP4TokenType",
  "key": "0xe0261fa95db2eb3b5439bd033cda66d56b96f92f243a8228fd87550ed7bdfdb3", // kecca256 hash of the word « LSP4TokenType »
  "keyType": "Singleton",
  "valueType": "uint256",
  "valueContent": "Number"
}
```

This value is not changeable, and is set during the token's initialization.

| Value |     Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---: | :----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  `0`  |   `Token`    | Only valid for LSP7, meaning its a generic token, where the `LSP4Metadata` represents the token information.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|  `1`  |    `NFT`     | If the contract is LSP7 or LSP8, then the `LSP4Metadata` represents the information of a **single** NFT, that has multiple ownable amounts or IDs. If it's an LSP8, each individual token ID can have its own custom metadata specific for that toekn, but is not a different NFT. It is still the the same NFT but just has different metadata. Metadata can be set using `LSP8TokenIdType` and `LSP8MetadataTokenURI`. [See LSP8 for details](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md). If its an LSP7 contract, the `decimals` function MUST return `0`. |
|  `2`  | `Collection` | Only valid for LSP8. The `LSP4Metadata` represents the information of a the collection, and each individual token ID represents its own NFT and MUST have its own metadata set using `LSP8TokenIdType` and `LSP8MetadataTokenURI`. [See LSP8 for details](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md).                                                                                                                                                                                                                                                         |

## Implementation

When creating smart contracts representing digital assets on LUKSO, you will need to specify the token type and data keys for the 📄 [LSP4 Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata) that will be stored in the 🗂️ [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage of the Digital Asset. There are three different token types:

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

After defining the token type of the asset you can create a custom [LSP7 Digital Asset Collection](../../standards/tokens/LSP7-Digital-Asset.md) or [LSP8 Identfiable Digital Asset Collection](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md).
