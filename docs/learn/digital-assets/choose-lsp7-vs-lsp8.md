---
sidebar_label: '❓ Choose between LSP7 or LSP8'
sidebar_position: 2
description: Discover which standard is best suited for your token or NFT project between LSP7 or LSP8.
---

# Choose between LSP7 or LSP8

This page provides guidance on which standard and combination to choose for your project. Both LSP7 and LSP8 coupled with the `LSP4TokenType` data key allow to create NFT collections on LUKSO. From simple to more complex!

## Available Options

## Fungible Token

### Characteristics

- divisible (unless `decimals()` overwritten to `0`).
- 18 decimals by default (unless overwritten to have less decimals, like USDT for example which has 6 decimals).
- The `LSP4Metadata` represents the metadata of the fungible token.

### Example Use Cases

- a digital currency
- a meme coin
- a share in a com
- a voting token.
- a reward token.
- a utility token.

## Multiple Ownable Digital Items

### Characteristics

- Non divisible (decimals is `0`).
- Each items can't be uniquely identified by an ID in the collection. They are all the same.
- All items share the same metadata. There is no metadata specific per item.
- The `LSP4Metadata` represents the metadata of each item (they are all the same).

### Example Use Cases

- a contract with 500 x digital t-shirts.
- a contract with 1000 x digital tickets.

## Standard NFT Collection

### Characteristics

- The `LSP4Metadata` represents the metadata of the whole NFT Collection.
- All the NFTs live in the same smart contract.
- Each NFT can be uniquely identified by a `tokenId` in the collection.
- Each NFT can have its own custom metadata. This can be set via:
  - `setDataForTokenId(...)` for each NFT.
  - by setting the `LSP8MetadataBaseURI` and appending the `tokenId` to the base URI.

\_\_

### Example Use Cases

- a collection of unique watches with their serial number.
- a collection of unique digital art pieces.

## Collection of Sub-Collections

### Characteristics

### Example Use Cases
