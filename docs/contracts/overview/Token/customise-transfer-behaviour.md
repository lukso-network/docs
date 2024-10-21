---
title: Customize transfer behaviour
sidebar_position: 2
---

# Customize transfer behaviour

## `_beforeTokenTransfer` and `_afterTokenTransfer` hooks

`The LSP7DigitalAsset contract` implementation includes two hooks to add custom behaviour to run logic before or after the total supply of tokens has been updated in the contract's storage. This can be done via the [`_beforeTokenTransfer(...)`](../../contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_beforetokentransfer) and [`_afterTokenTransfer(...)`](../../contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_aftertokentransfer) functions.

### Solidity example

Below is a simple pseudo-code example in Solidity where the `_afterTokenTransfer(...)` internal hook **registers the number of token transactions sent and received by any address**. Since a LSP7 token uses ERC725Y as storage under the hood, it provides a flexible way to add metadata.

This example leverages this feature and provides a way to get a simple count of token transactions performed by each user in terms of tokens sent and received. It uses the following functions and libraries:

- `_afterTokenTransfer(...)` hook to register the token transfer after it occurred.
- The [ERC725Y](../../../standards/erc725.md#erc725y-data-representation) storage of the token contract where the transfer count will be stored (reading via [`_getData(...)`](../../contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_getdata), updating it via [`_setData(...)`](../../contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_setdata)).
- We defined a specific data key where to store this info and used the [`LSP2Utils`](../../contracts/../libraries/LSP2Utils.md#generatemappingkey-2) library to encode this as a [`Mapping`](../../../standards/metadata/lsp2-json-schema.md#mapping) data key easily.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// tokens
import { _LSP4_TOKEN_TYPE_TOKEN } from "@lukso/lsp4-contracts/contracts/LSP4Constants.sol";
import { LSP7DigitalAsset } from "@lukso/lsp7-contracts/contracts/LSP7DigitalAsset.sol";

// libraries
import { LSP2Utils } from "@lukso/lsp2-contracts/contracts/LSP2Utils.sol";

contract MyToken is LSP7DigitalAsset {
    /// @dev Available options for 4th parameter token type (uint256)
    /// - 0 for Token
    /// - 1 for NFT
    /// - 2 for Collection
    constructor(
        string memory name_,
        string memory symbol_,
        address contractOwner_,
        bool isNonDivisible_
    )
        LSP7DigitalAsset(name_, symbol_, contractOwner_, _LSP4_TOKEN_TYPE_TOKEN, isNonDivisible_)
    {
        // constructor logic ...
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256, /* amount */
        bytes memory /* data */
    )
        internal
        virtual
        override
    {
        // TokensSentTx:<address>
        bytes32 tokensSentTxDataKey =
            LSP2Utils.generateMappingKey({ keyPrefix: bytes10(keccak256("TokensSentTx")), bytes20Value: bytes20(from) });

        // TokensReceivedTx:<address>
        bytes32 tokensReceivedTxDataKey = LSP2Utils.generateMappingKey({
            keyPrefix: bytes10(keccak256("TokensReceivedTx")),
            bytes20Value: bytes20(to)
        });

        bytes memory tokensSentTxValue = _getData(tokensSentTxDataKey);
        bytes memory tokensReceivedTxValue = _getData(tokensReceivedTxDataKey);

        // sanity check to ensure we can abi-decode correctly
        require(tokensSentTxValue.length == 32, "Invalid uint256 encoded value under `TokensSentTx:<address>` data key");
        require(
            tokensReceivedTxValue.length == 32,
            "Invalid uint256 encoded value under `TokensReceivedTx:<address> data key"
        );

        uint256 tokensSentTxCount = abi.decode(tokensSentTxValue, (uint256));
        uint256 tokensReceivedTxCount = abi.decode(tokensReceivedTxValue, (uint256));

        // increment the counter + set data in the storage
        tokensSentTxCount++;
        tokensReceivedTxCount++;

        _setData(tokensSentTxDataKey, abi.encode(tokensSentTxCount));
        _setData(tokensReceivedTxDataKey, abi.encode(tokensReceivedTxCount));
    }
}

```

This example is minimalist and only stores a counter as a number. Still, any info related to the token transfer could be stored during the transfer (_e.g: the amount, the data passed, the gas price, the balance before and after, etc..._). This way, the storage of the token contract can act, for instance, as:

- A _"mini explorer"_ for the token contract (without relying on a block explorer and reviewing the complete list of transactions).
- To query the transactions for a user and provide an analytical view of their balance changes, demonstrating its data analysis capabilities.
- Showcase which user, smart contract address or protocol are the most active users and traders for this token (being the ones with the higher count under the `TokensSentTx:<address>` data key).
