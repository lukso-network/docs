---
title: Digital Assets (Token & NFT)
sidebar_position: 4
---

# Digital Assets

The **Digital Asset (Token and NFT 2.0)** contracts are the newest advanced version of the existing token standards. They come with many features that enhance the security and the overall user experience and compatibility with [ERC725Accounts](../../standards/universal-profile/lsp0-erc725account.md) and [Universal Receivers](../../standards/generic-standards/lsp1-universal-receiver.md).

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

## LSP8 Identifiable Digital Asset

The **LSP8IdentifiableDigitalAsset** contract represents identifiable digital assets (NFTs) that can be uniquely traded and given metadata using the **[ERC725Y Standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y)**.
Each NFT is identified with a tokenId, based on **[ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)**.

A **bytes32** value is used for tokenId to allow many uses of token identification, including numbers, contract addresses, and hashed values (i.e., serial numbers).

### Checking if the Metadata of a `tokenId` changed

Because LSP8 uses [ERC725Y](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store) under the hood, the URI pointing to the metadata of a specific tokenId can be changed inside the ERC725Y storage.

This can be done via the functions [`setData(bytes32,bytes)`](../contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#setdata) or [`setDataBatch(bytes32[],bytes[])`](../contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#setdata). 

Since this function emits the [`DataChanged`](../contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#datachanged) event, you can listen for this event in the LSP8 contract to check if the URI pointing of the tokenId metadata has changed. You can do so by filtering the first parameter `dataKey` with:

```
LSP8MetadataTokenURI:<first 20 bytes of tokenId>
``` 

If your LSP8 contract uses a specific URI for each tokenId.

<details>
    <summary>Example of filtering with <code>LSP8MetadataTokenURI:tokenId</code></summary>

Using the following `tokenId` as an example: `0x1111222233334444555566667777888899990000aaaabbbbccccddddeeeeffff`

`LSP8MetadataTokenURI` data key prefix = `0x0x4690256ef7e93288012f0000`

You can filter the `DataChanged` event with the following `dataKey`:

```
  | LSP8MetadataTokenURI |      first 20 bytes of tokenId        |
0x4690256ef7e93288012f00001111222233334444555566667777888899990000
```

</details>


## Note on LSP7 and LSP8 implementations

`LSP7DigitalAsset.sol` and `LSP8IdentifiableDigitalAsset.sol` are `abstract` contracts that are not deployable as they are, because they do not contain any public functions by default to manage token supply (_e.g: no public `mint(...)` or `burn(...)` functions_). You can either:

- use `LSP7Mintable` or `LSP8Mintable`, a preset contract that contains a public `mint(...)` function callable only by the contract's owner.
- or extend the `LSP7DigitalAsset` / `LSP8IdentifiableDigitalAsset` contract and create your own supply mechanism by defining public methods that use the internal `_mint(...)` and `_burn(...)` functions.
