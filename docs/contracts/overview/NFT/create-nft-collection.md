---
title: Create a Non Fungible Token
sidebar_position: 1
---

# Create a Non Fungible Token

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// modules
import {
    LSP8IdentifiableDigitalAsset
} from "@lukso/lsp8-contracts/contracts/LSP8IdentifiableDigitalAsset.sol";

// constants
import {
    _LSP8_TOKENID_FORMAT_NUMBER
} from "@lukso/lsp8-contracts/contracts/LSP8Constants.sol";
import {
    _LSP4_TOKEN_TYPE_COLLECTION
} from "@lukso/lsp4-contracts/contracts/LSP4Constants.sol";

contract BasicNFTCollection is LSP8IdentifiableDigitalAsset {
    constructor(
        string memory nftCollectionName,
        string memory nftCollectionSymbol,
        address contractOwner
    )
        LSP8IdentifiableDigitalAsset(
            nftCollectionName,
            nftCollectionSymbol,
            contractOwner,
            _LSP4_TOKEN_TYPE_COLLECTION,
            _LSP8_TOKENID_FORMAT_NUMBER
        )
    {
        // contract logic goes here...
    }
}
```

## LSP8 NFT extensions

The `@lukso/lsp8-contracts` package includes token extensions (similarly to OpenZeppelin contracts) that can be added through inheritance. This enables to include specific functionalities for building your token.

| Extension contract                                                                                    | Description                                                                                                                                  |
| :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| [`LSP8Burnable.sol`](../../contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.md)         | exposes a public `burn(...)` function that allows any NFT holder or operator to burn a specific NFT tokenId.                                 |
| [`LSP8CappedSupply.sol`](../../contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupply.md) | enable to specify a maximum supply on deployment / initialization, which cap the maximum amount of NFT that can be minted in the collection. |
| [`LSP8Enumerable.sol`](../../contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.md)     | functionality to enumerate the list of NFTs in a collection.                                                                                 |
