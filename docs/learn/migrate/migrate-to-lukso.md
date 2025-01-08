---
sidebar_label: '🔧 Integration Guide'
sidebar_position: 1
description: What to consider when building on LUKSO with LSPs (LUKSO Standard Proposals)?
---

# Migrate to LUKSO

:::info

This page gives an overview of the differences between building on LUKSO vs other EVM chains.

For more information on specific topics, see the following pages:

- [Introduction to the LSPs](../../standards/introduction.md).
- [Concepts & Glossary](../concepts.md) if you are not understanding certain terms.
- [Features & Benefits of Universal Profiles](../benefits-lukso-standards.md#universal-profiles-vs-smart-wallets) compared to traditional wallets.
- [Features & Benefits of LSP7/8 Token standards over](../benefits-lukso-standards.md#features-of-lsp-token-standards-over-erc20-and-erc721) compared to traditional wallets.

:::

## Migrating from other EVM Chain

LUKSO is EVM-compatible. Any traditional web3 wallet (_e.g: Metamask_) can interact with LUKSO dApps.

1. Simply [add the LUKSO network in your wallet](../../networks/testnet/parameters.md) and switch to the LUKSO chain.
2. Any Ethereum smart contract can be redeployed on LUKSO by connecting to a [LUKSO RPC endpoint](../../networks/mainnet/parameters).
3. Allow Universal Profiles to log-in to your dApp is easy and not different than other web3 wallet. Check our dedicated guide [**Connect 🆙**](../../learn/universal-profile/connect-profile/connect-up.md)!

You can start holding assets (LYX, tokens, and NFTs), transfer them, and deploy and interact with smart contracts.

## From ERCs → to LSPs

:::info Why using the LSP standards?

Wondering what are the benefits and features of the LSPs and Universal Profiles compared to ERCs and traditional web3 wallets?

Learn more under our dedicated page [**Benefits of LUKSO Standards**](../benefits-lukso-standards.md) to see how your project can leverage the LUKSO standard and tech!

:::

:::success Useful guides

Interested to migrate your token or NFT collection? See our hands-on developer guides:

- [Migrate from ERC20 to LSP7](./migrate-erc20-to-lsp7.md)
- [Migrate from ERC721 to LSP8](./migrate-erc721-to-lsp8.md)

:::

:::note Solidity functions

For more details on the different functions and Solidity interface, see the following pages and sections:

- [**Digital Asset (Token) > Comparison with ERC20**](../../contracts/overview/Token/index.md#comparisons-with-erc20).
- [**Identifiable Digital Asset (NFT) > Comparison with ERC721**](../../contracts/overview/NFT/index.md#comparisons-with-erc721).

:::

Developers are encouraged to leverage the LSPs (**L**UKSO **S**tandards **P**roposals) to develop smart contracts, protocols and applications on LUKSO. The LSPs offer flexible functionalities that can:

- enable more complex and various features not available with ERCs.
- be tailored to suit different use cases.
- bring a better experience to end dApp users.

Some codebases may need adjustments to convert ERC interactions to LSP interactions. We provide guides above to help with such refactoring.
