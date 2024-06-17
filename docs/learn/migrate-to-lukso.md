---
sidebar_label: '🔀 Migrate to LUKSO'
sidebar_position: 6
description: What to consider when building on LUKSO with LSPs (LUKSO Standard Proposals)?
---

# Migrate to LUKSO

:::info

For more information regarding the network and standards, see the [Introduction](./introduction.md) and [Concepts & Glossary](./concepts.md) pages.

:::

This page gives an overview the differences between building on the LSP ecosystem instead of regular wallets.

## Migrating from other EVM Chains

As LUKSO is EVM compatible (Ethereum twin), all smart contracts written for Ethereum can easily be ported over and redeployed. You only need to setup your application to connect to a [LUKSO RPC endpoint](../networks/mainnet/parameters).

As developers interact with smart contracts with different or custom functionalities, verifying that certain conditions and methods are set before interacting with them is always recommended. Such checks can be done by [detecting interfaces and metadata](../learn/standard-detection.md) of the given address.

## From Wallets -> to 🆙

[Universal Profiles](../standards/universal-profile/introduction.md) are smart contract accounts. This means, that the signer of the transaction is decoupled from the address of the account.

The benefit of using Universal Profiles is that you can benefit from gas-less transactions. The relayer will pay the gas fees for you and does not require you

However, when interacting with dApps without a [Transaction Relay Service](../standards/relayer-api.md), the [controller](./concepts.md#controller) of the Universal Profile has to be funded to execute network transactions on behalf of the account.

## From ERCs -> to LSPs

For more details on the different functions and features between ERC20 and LSP7, or ERC721 and LSP8, check the [**Contracts > Digital Assets**](../contracts/overview/DigitalAssets.md) section.

### Main differences

## To throw to the trash

EOA signatures can be verified off-chain, but checking their [permissions](../standards/universal-profile/lsp6-key-manager#types-of-permissions) requires an on-chain call to the [Key Manager](../standards/universal-profile/lsp6-key-manager.md) of the Universal Profile.

The [Universal Profile Browser Extension](/install-up-browser-extension) automatically handles permissions checks when interacting with dApps. If needed, signatures can be verified manually by [retrieving the controllers](../learn/key-manager/get-controller-permissions.md) of an account and checking their permissions.
