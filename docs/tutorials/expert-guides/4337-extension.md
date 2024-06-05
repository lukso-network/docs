---
sidebar_label: ' 🛠️ Integrating EIP-4337'
description: 'Learn how to integrate the EIP-4337 extension into your Universal Profile.'
sidebar_position: 9
---

# Integrating EIP-4337 into your Universal Profile

:::info
This guide assumes that you are already familiar with the [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337) standard and [Universal Profiles](../../standards/introduction.md).
:::

## Prerequisites for Integration

### Key Manager

The Universal Profile contract must be owned by a [KeyManager](../../standards/universal-profile/lsp6-key-manager.md) contract.

### Bundlers

Bundlers are the key component of the EIP-4337 protocol. They are responsible for bundling [`UserOperations`](https://www.alchemy.com/overviews/user-operations) into transactions and submitting them to the EVM blockchain. You will need to run your own bundler or use a third-party service on your behalf. See the Ethereum implementation of their [bundler](https://github.com/eth-infinitism/bundler?tab=readme-ov-file#bundler).

### Deposit on the EntryPoint contract

The [`EntryPoint`](https://eips.ethereum.org/EIPS/eip-4337#required-entry-point-contract-functionality) contract is the entry point for the EIP-4337 protocol. It is responsible for receiving `UserOperations` and forwarding them to the appropriate account. In order to use the `EntryPoint` contract, you must first deposit a certain amount of native token on the contract. This deposit is used to pay the bundlers for their services.

### Have a controller with the 4337 Extension Permission

The controller of the Universal Profile that will use the 4337 extension must have the [`_4337_PERMISSION`](https://github.com/lukso-network/lsp-smart-contracts/blob/0a951df15f282840ef89499da94e6ab47380d5dd/contracts/LSP17Extensions/Extension4337.sol#L33) permission in order to use it. To learn more about permissions, refer to the [LSP6 standard](../../standards/universal-profile/lsp6-key-manager#permissions).

### Deployment of the 4337 Extension

In order to integrate the 4337 extension, you must first deploy the [`Extension4337.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP17Extensions/Extension4337.sol) or have the address of an already deployed instance of the 4337 extension contract.

### Extend your Universal Profile with the 4337 Extension

Once you have deployed the 4337 extension, you can extend your Universal Profile with the 4337 extension by adding support to the `validateUserOp` (selector `0xfff35b72`) function in your Universal Profile contract. You can follow the following [tutorial](https://www.youtube.com/watch?v=0KxkLZHFa0E) to add an extension to your Universal Profile.

## Using the 4337 Extension

Once you have extended your Universal Profile with the 4337 extension and followed all the prerequisites above, bundlers can call the `handleOps` function of the [`EntryPoint`](https://docs.stackup.sh/docs/erc-4337-overview#entrypoint) contract to execute `UserOperations` on your Universal Profile.
