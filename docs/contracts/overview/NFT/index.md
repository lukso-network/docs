---
title: 🖼️ Identifiable Digital Asset (NFT)
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LSP8 Identifiable Digital Asset

:::danger Deprecation of `LSP8CompatibleERC721`

The `LSP8CompatibleERC721` contracts have been deprecated and deleted from the [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts) package since version `0.15.0`, because of their unsafe nature and [security considerations (See PR #845 for more details)](https://github.com/lukso-network/lsp-smart-contracts/pull/845#issuecomment-1888671461).

They are not recommended to be used. However, if you want to still use them, they remain available in the version [`0.14.0`](https://github.com/lukso-network/lsp-smart-contracts/releases/tag/lsp-smart-contracts-v0.14.0).

:::

The **LSP8 Identifiable Digital Asset** contract is the newest advanced version of the existing ERC NFT standards, such as ERC721. LSP8 identifiable digital assets represent **N**on **F**ungible **T**okens (NFTs) that can be uniquely traded. Each NFT is identified with a tokenId, based on **[ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)** and can also have its own metadata set using the **[`setDataForTokenId(...)`](../../contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#setdatafortokenid)** function.

A **bytes32** value is used for tokenId to allow many uses of token identification, including numbers, contract addresses, and hashed values (i.e., serial numbers).

## Installation & Usage

The LSP8 smart contracts and their ABIs are available are available in their own individual package. To use them, install `@lukso/lsp8-contracts` as a dependency in your project.

<Tabs groupId="provider-lib">
  <TabItem value="npm" label="npm" default>

```
npm install @lukso/lsp8-contracts
```

  </TabItem>
  <TabItem value="yarn" label="yarn" default>

```
yarn add @lukso/lsp8-contracts
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm" default>

```
pnpm add @lukso/lsp8-contracts
```

  </TabItem>
</Tabs>

`LSP8IdentifiableDigitalAsset.sol` is an `abstract` contract that is not deployable as is, because it does not contain any public functions by default to manage token supply (_e.g: no public `mint(...)` or `burn(...)` functions_). You can either:

- the `LSP8Mintable` preset contract that contains a public `mint(...)` function callable only by the contract's owner.
- or extend the `LSP8IdentifiableDigitalAsset` contract (_see below_) and create your own supply mechanism by defining public methods that use the internal `_mint(...)` and `_burn(...)` functions.

## Comparisons with ERC721

<table>
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

In comparison ERC721 has:

- `safeTransferFrom(address,address,uint256,bytes)`
- `safeTransferFrom(address,address,uint256)`
- `transferFrom(address,address,uint256)`

All of the above functions can be used by both the owner of the token id or by the operator of the token id in order to transfer the ERC721 token. To be mentioned, both functions `safeTransferFrom(...)` have a hook that calls the recipient contract.

Looking at LSP7 & LSP8 we have unified `transfer(...)` & `transferBatch(...)` functions in both contracts. Those functions contain a hook which is executed conditionally and can be used in any of the above cases.
