---
title: Digital Assets (Token & NFT)
sidebar_position: 4
---

# Digital Assets

The **Digital Asset (Token and NFT 2.0)** contracts are the newest advanced version of the existing token standards. They come with many features that enhance the security and the overall user experience and compatibility with [ERC725Accounts](../standards/universal-profile/lsp0-erc725account.md) and [Universal Receivers](../standards/generic-standards/lsp1-universal-receiver.md).

## Comparisons with ERC20 / ERC721

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

## LSP4 Digital Asset Metadata

The **LSP4DigitalAssetMetadata** is a contract that sets the **Token-Metadata** (name and symbol) for the **LSP7DigitalAsset** and **LSP8IdentifiableDigitalAsset** token contracts.

Since it uses **[ERC725Y General Data Key/Value Store](https://eips.ethereum.org/EIPS/eip-725)** to set the metadata, any information can be added (_e.g: **list of creators, JSON files**, etc_).

## LSP7 Digital Asset

The **LSP7DigitalAsset** contract represents digital assets for either divisible or non-divisible tokens where minting and transferring are specified with an amount of tokens. Their functions were inspired from **[ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)** and **[ERC1155](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol)** with more upgraded features.

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

## LSP8 Identifiable Digital Asset

The **LSP8IdentifiableDigitalAsset** contract represents identifiable digital assets (NFTs) that can be uniquely traded and given metadata using the **[ERC725Y Standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y)**.
Each NFT is identified with a tokenId, based on **[ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)**.

A **bytes32** value is used for tokenId to allow many uses of token identification, including numbers, contract addresses, and hashed values (i.e., serial numbers).

## Note on LSP7 and LSP8 implementations

`LSP7DigitalAsset.sol` and `LSP8IdentifiableDigitalAsset.sol` are `abstract` contracts that are not deployable as they are, because they do not contain any public functions by default to manage token supply (_e.g: no public `mint(...)` or `burn(...)` functions_). You can either:

- use `LSP7Mintable` or `LSP8Mintable`, a preset contract that contains a public `mint(...)` function callable only by the contract's owner.
- or extend the `LSP7DigitalAsset` / `LSP8IdentifiableDigitalAsset` contract and create your own supply mechanism by defining public methods that use the internal `_mint(...)` and `_burn(...)` functions.
