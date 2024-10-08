---
title: 🪙 Digital Asset (Token)
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Digital Assets

The **Digital Asset (Token and NFT 2.0)** contracts are the newest advanced version of the existing token standards. They come with many features that enhance the security and the overall user experience and compatibility with [ERC725Accounts](/standards/accounts/lsp0-erc725account.md) and [Universal Receivers](/standards/accounts/lsp1-universal-receiver.md).

## Comparisons with ERC20 / ERC721

:::danger beware

The LSP7 compatible with ERC20 contracts and LSP8 compatible with ERC721 contracts are being deprecated and will be deleted from [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts) repository. However if you want to still use/maintain them, they will remain available in the version [`0.14.0`](https://github.com/lukso-network/lsp-smart-contracts/releases/tag/lsp-smart-contracts-v0.14.0).

:::

The interfaces of LSP7 and LSP8 have some differences compared to ERC20 and ERC721. Their functions are simpler, more straight forward and unified.

**Similar function names**

Both functions in LSP7 and LSP8 have the same name (`transfer`) to transfer assets. This is easier compared to ERC20 and ERC721 that use different naming (`transfer` for ERC20 vs `transferFrom` in ERC721 to transfer tokens as the token owner).

The table below highlights these differences:

<table>
  <tr>
    <th>Description</th>
    <th>ERC20</th>
    <th>LSP7</th>
  </tr>
  <tr>
    <td>Transferring tokens as an owner.</td>
    <td><code>transfer(address,uint256)</code></td>
    <td rowspan="2"><code>transfer(address,address,uint256,bool,bytes)</code></td>
  </tr>
  <tr>
    <td>Transferring tokens as an operator.</td>
    <td><code>transferFrom(address,address,uint256)</code></td>
  </tr>
  <tr>
    <td>Approving an operator to spend tokens on behalf of the owner.</td>
    <td><code>approve(address,uint256)</code></td>
    <td><code>authorizeOperator(address,uint256)</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <th>ERC721</th>
    <th>LSP8</th>
  </tr>
  <tr>
    <td>Transferring tokens as an owner.</td>
    <td rowspan="2">
        <code>transferFrom(address,address,uint256)</code><br/>
        <code>safeTransferFrom(address,address,uint256)</code><br/>
        <code>safeTransferFrom(address,address,uint256,bytes)</code>
    </td>
    <td rowspan="2"><code>transfer(address,address,bytes32,bool,bytes)</code></td>
  </tr>
  <tr>
    <td>Transferring tokens as an operator.</td>
  </tr>
  <tr>
    <td>Approving an operator to spend tokens on behalf of the owner.</td>
    <td><code>approve(address,uint256)</code></td>
    <td><code>authorizeOperator(address,bytes32)</code></td>
  </tr>
</table>

In ERC20 the function `transfer(address,uint256)` is used to transfer ERC20 tokens from the caller, this can only be used by the holder of the ERC20 tokens. There is also `transferFrom(address,address,uint256)` which can also be used by the ERC20 tokens operator.

In comparison ERC721 has:

- `safeTransferFrom(address,address,uint256,bytes)`
- `safeTransferFrom(address,address,uint256)`
- `transferFrom(address,address,uint256)`

All of the above functions can be used by both the owner of the token id or by the operator of the token id in order to transfer the ERC721 token. To be mentioned, both functions `safeTransferFrom(...)` have a hook that calls the recipient contract.

Looking at LSP7 & LSP8 we have unified `transfer(...)` & `transferBatch(...)` functions in both contracts. Those functions contain a hook which is executed conditionally and can be used in any of the above cases.

## LSP4 Digital Asset Metadata

The **LSP4DigitalAssetMetadata** is a contract that sets the **Token-Metadata** (name and symbol) for the **LSP7DigitalAsset** and **LSP8IdentifiableDigitalAsset** token contracts.

Since it uses **[ERC725Y General Data Key/Value Store](https://eips.ethereum.org/EIPS/eip-725)** to set the metadata, any information can be added (_e.g: **list of creators, JSON files**, etc_).

## LSP7 Digital Asset

The **LSP7DigitalAsset** contract represents digital assets for fungible tokens where minting and transferring are specified with an amount of tokens. Their functions were inspired from **[ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)** and **[ERC1155](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol)** with more upgraded features.

An LSP7 can serves as:

- a **Divisible Token Contract** when `isNonDivisible` bool is set to `false` in the [`constructor(...)`](#constructor)
- otherwise serves as a **Non-Divisible Token Contract**.

This can be useful to set `isNonDivisible` to `true`, rather than deploying a LSP8 contract to achieve the same goal.

### Create a Fungible Token

```solidity
// MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";

contract MyToken is LSP7DigitalAsset {
    // 4th argument (false) marks that this contract serves as a Fungible Token and not as a NFT.
    constructor() LSP7DigitalAsset("MyToken","MTKN",msg.sender,false) {
        // ..
    }

    function mint() public {
        _mint(...);
    }
}
```

## Extensions

The smart contracts packages for `@lukso/lsp7-contracts` and `@lukso/lsp8-contracts` include token extensions (similarly to OpenZeppelin contracts) that enables to include functionalities for building your token through inheritance.

**LSP7 Tokens extensions:**

- [`LSP7Burnable.sol`](../contracts/LSP7DigitalAsset/extensions/LSP7Burnable.md): exposes a public `burn(...)` function that allows any token holder or operator to burn any amount of tokens.
- [`LSP7CappedSupply.sol`](../contracts/LSP7DigitalAsset/extensions/LSP7CappedSupply.md): enable to specify a maximum supply on deployment / initialization, which cap the maximum amount of tokens that can be minted.

**LSP8 NFTs extensions:**

- [`LSP8Burnable.sol](../contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.md)`: exposes a public `burn(...)` function that allows any NFT holder or operator to burn a specific NFT tokenId.
- [`LSP8CappedSupply.sol](../contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupply.md)`: enable to specify a maximum supply on deployment / initialization, which cap the maximum amount of NFT that can be minted in the collection.
- [`LSP8Enumerable.sol](../contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.md)`: functionality to enumerate the list of NFTs in a collection.

If your token contract uses the proxy pattern with initialize functions, use the `InitAbstract` version of these extension contracts (\_e.g: `LSP7Burnable` -> `LSP7BurnableInitAbstract`).

## Custom logic for transfers

The LSP7 and LSP8 implementations provide the `_beforeTokenTransfer` and `_afterTokenTransfer` function that offer the ability to specify custom logic that can run before or after the token transfer has happen (= before or after the balances in the contract state have been updated).

## Note on LSP7 and LSP8 implementations

`LSP7DigitalAsset.sol` and `LSP8IdentifiableDigitalAsset.sol` are `abstract` contracts that are not deployable as they are, because they do not contain any public functions by default to manage token supply (_e.g: no public `mint(...)` or `burn(...)` functions_). You can either:

- use `LSP7Mintable` or `LSP8Mintable`, a preset contract that contains a public `mint(...)` function callable only by the contract's owner.
- or extend the `LSP7DigitalAsset` / `LSP8IdentifiableDigitalAsset` contract and create your own supply mechanism by defining public methods that use the internal `_mint(...)` and `_burn(...)` functions.
