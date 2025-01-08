---
title: 🪙 Digital Asset (Token)
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LSP7 Digital Asset

:::danger Deprecation of `LSP7CompatibleERC20`

The `LSP7CompatibleERC20` contracts have been deprecated and deleted from the [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts) package since version `0.15.0`, because of their [unsafe nature and security considerations](https://github.com/lukso-network/lsp-smart-contracts/pull/845#issuecomment-1888671461). They are not recommended to be used. However, if you want to still use them, they remain available up to the version [`0.14.0`](https://github.com/lukso-network/lsp-smart-contracts/releases/tag/lsp-smart-contracts-v0.14.0).

:::

The **LSP7 Digital Asset** contract is the newest advanced version of the existing ERC token standards, such as ERC20 and ERC1155. It comes with many features that enhance the security and the overall user experience and compatibility with [ERC725Accounts](/standards/accounts/lsp0-erc725account.md) and [Universal Receivers](/standards/accounts/lsp1-universal-receiver.md).

The **LSP7DigitalAsset** contract represents digital assets for fungible tokens where minting and transferring are specified with an amount of tokens. Their functions were inspired from **[ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)** and **[ERC1155](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol)** with more upgraded features.

## Installation & Usage

The LSP7 smart contracts and their ABIs are available are available in their own individual package. To use them, install `@lukso/lsp7-contracts` as a dependency in your project.

<Tabs groupId="provider-lib">
  <TabItem value="npm" label="npm" default>

```
npm install @lukso/lsp7-contracts
```

  </TabItem>
  <TabItem value="yarn" label="yarn" default>

```
yarn add @lukso/lsp7-contracts
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm" default>

```
pnpm add @lukso/lsp7-contracts
```

  </TabItem>
</Tabs>

`LSP7DigitalAsset.sol` is an `abstract` contract that is not deployable as is, because it does not contain any public functions by default to manage token supply (_e.g: no public `mint(...)` or `burn(...)` functions_). You can either:

- the `LSP7Mintable` preset contract that contains a public `mint(...)` function callable only by the contract's owner.
- or extend the `LSP7DigitalAsset` contract (_see below_) and create your own supply mechanism by defining public methods that use the internal `_mint(...)` and `_burn(...)` functions.

## Token Metadata

LSP7 uses the **LSP4DigitalAssetMetadata** standard under the hood. Since LSP4 uses an **[ERC725Y General Data Key/Value Store](https://eips.ethereum.org/EIPS/eip-725)**, it allows any form of metadata to be defined and set. This could include things such as **list of creators, JSON files, exchanges where the token is listed, etc...**

It is within this contract that the **Token-Metadata** (name and symbol) is set for the **LSP7DigitalAsset** on deployment / initialization.

## Example use cases

An LSP7 can serves as:

- a **Divisible Token Contract** when `isNonDivisible` bool is set to `false` in the [`constructor(...)`](#constructor)
- otherwise serves as a **Non-Divisible Token Contract**.

This can be useful to set `isNonDivisible` to `true`, rather than deploying a LSP8 contract to achieve the same goal.

## Comparisons with ERC20

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
</table>

In ERC20 the following functions can be used to transfer tokens from the token holder:

- `transfer(address,uint256)` can only be used by the token holder. Therefore, the caller must be token holder.
- `transferFrom(address,address,uint256)` can be used by operator to transfer tokens on behalf of a token holder (as long as this token holder has been approved and given an allowance).

In comparison in LSP7, a single function `transfer(address,address,uint256,bool,bytes)` can be used by both operator and token owner.

- if a token holder want to transfer its own token, it can call directly the function (be the caller) and specify its address for the first parameter `from`.
- if an operator want to transfer tokens for a token holder that it has been approved for (via the `authorizeOperator(...)` function), it can call the function and specify the address of the token holder as the `from` address as well.

Therefore as you can see from the table above, the only thing that changes when transferring token as a token owner or an operator is **the caller** of the function. **The parameters remain the same**.
