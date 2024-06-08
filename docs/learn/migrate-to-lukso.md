---
sidebar_label: '🔀 Migrate to LUKSO'
sidebar_position: 6
description: What to consider when building on LUKSO with LSPs (LUKSO Standard Proposals)?
---

# Migrate to LUKSO

This page will overview the differences between building on the LSP ecosystem instead of regular wallets. You can find more information regarding the network and standards within the [Introduction](./introduction.md) and [Concepts & Glossary](./concepts.md) pages.

## Things to watch out for

- [Universal Profiles](../standards/universal-profile/introduction.md) are smart contract accounts. This means, that the signer of the transaction is decoupled from the address of the account. EOA signatures can be verified off-chain, but checking their [permissions](../standards/universal-profile/lsp6-key-manager#types-of-permissions) requires an on-chain call to the [Key Manager](../standards/universal-profile/lsp6-key-manager.md) of the Universal Profile.
- The [Universal Profile Browser Extension](/install-up-browser-extension) automatically handles permissions checks when interacting with dApps. If needed, signatures can be verified manually by [retrieving the controllers](../learn/key-manager/get-controller-permissions.md) of an account and checking their permissions.
- As developers interact with smart contracts with different or custom functionalities, verifying that certain conditions and methods are set before interacting with them is always recommended. Such checks can be done by [detecting interfaces and metadata](../learn/standard-detection.md) of the given address.
- When doing network interactions without a [Transaction Relay Service](../standards/relayer-api.md), the [controller](./concepts.md#controller) of the Universal Profile has to be funded to execute network transactions on behalf of the account.

## Deploying Ethereum Contracts to LUKSO

As LUKSO is EVM compatible, all smart contracts written for Ethereum can easily be ported over and redeployed. The main difference is that developers must connect to a [LUKSO node or RPC endpoint](../networks/mainnet/parameters) instead of an Ethereum node.
