---
sidebar_label: 'Introduction'
sidebar_position: 1
description: Introduction to the LUKSO Ecosystem - why choose LUKSO? Who is LUKSO intended for?
---

# Introduction

LUKSO is an L1 EVM-based Blockchain running on Proof of Stake. All tools and tutorials for Ethereum also work well for LUKSO, as the network has equal functionality and is up to date with the [Shanghai and Capella](https://ethereum.org/en/history/) update. To participate in the network, the Ethereum clients can be run with a [custom network configuration](https://github.com/lukso-network/network-configs). To [run a node](/networks/mainnet/running-a-node.md), operators can use the LUKSO CLI, Dappnode, Docker, or manual installation.

- [Why did LUKSO launch as Layer 1 blockchain?](../faq/lukso/general-information.md#why-did-lukso-launch-as-a-layer-1-blockchain)
- [What is the network architecture of LUKSO?](../faq/network/blockchain-architecture.md#what-is-the-network-architecture-of-lukso)

Developers building on LUKSO can write smart contracts in an EVM-based language like Solidity, deploy them using [Hardhat](https://hardhat.org/), and utilize standards already developed for other Ethereum networks.

- [Learning Tools of the Ethereum Foundation](https://ethereum.org/en/developers/learning-tools/).
- [What are the main features of LUKSO standards?](../faq/onboarding/lukso-standards.md#what-are-the-main-features-of-lsps)

## How did LUKSO start?

The story of LUKSO started with [ERC725](../standards/lsp-background/erc725.md), a standard proposed by Fabian Vogelsteller for blockchain-based identity. ERC725 allows for self-sovereign identity. Over the years we saw the negative effects of having a centralized identity with damaging leaks and unfair selling of user data and identity. An open, portable standard for identities enables decentralized reputation, governance, and more. Users can take their identity across different dApps and platforms that support this standard.

> LUKSO is the first blockchain that powers self-sovereign identities.

- [What are the project's origins?](/faq/lukso/project-origins.md)
- [LUKSO Mainnet Start Announcement](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba)
- [The LUKSO Migration Article](https://medium.com/lukso/the-lyxe-migration-process-374053e5ddf5)

## Who is LUKSO intended for?

LUKSO is intended for creative economies, where identities play a key role.
LUKSO allows brands, creatives, and developers to dictate the distribution of wealth and influence from lifestyle activities. They can do so by having Universal Profiles (UPs), creating Digital Identities and Certificates, and by building Tokenized Communities.

## Why choose LUKSO?

[LSPs](/standards/introduction.md) (LUKSO Standard Proposals) are the building blocks of LUKSO. They are used to to build blockchain-based applications that offer an enhanced user experience, and allow for more flexibility and interaction. LSPs are part of the more general LIPs used to discuss protocol specifications and client API improvements.

**LSPs introduce new concepts like [Universal Profiles](../standards/universal-profile/introduction.md), [Digital Assets & NFT 2.0](../standards/tokens/introduction.md), and [Vaults](../standards/universal-profile/lsp9-vault.md).**

By integrating different LSPs in unique ways, LUKSO solves fundamental blockchain problems:

- [🔓 Upgradeable security](../standards/universal-profile/lsp6-key-manager): UPs can be owned by an EOA or a custom contract such as a multisig. Therefore, users can have multiple devices and applications controlling their account, each of them with different permissions. Users can even have social recovery, such that you grant certain permissions to their account to their friends and family.
- [👩‍🎤 On-chain profile](../standards/universal-profile/lsp3-profile-metadata.md): users can build their profiles onchain, adding images, tags, descriptions and links to their accounts to shape their online persona.
- [📢 On-chain notifications](../standards/tokens/LSP7-Digital-Asset.md): users can be informed on token transfers and see which assets they own within their profile. They can even block transfers of certain assets by creating a list of allowed assets they want to accept.
- [📝 Updatable and flexible metadata](../standards/generic-standards/lsp2-json-schema.md): metadata can be updated, enabling dynamic NFTs that can change certain properties over time, while other properties remain immutable.
- [💫 Extend your account over time](../standards/generic-standards/lsp17-contract-extension.md): users can extend their account over time seamlessly, with no need to redeploy the associated smart contract.
- [⛽️ Gassless experience](./concepts.md#transaction-relay-service): UPs support Transaction Relay Services that cover the gas for users's transactions. Users won't have the burden of getting coins in order to use your application.

:::tip Seamless Onboarding

Currently, users are subsidized with the [Transaction Relay Service](./concepts.md#transaction-relay-service) from LUKSO.
:::

## What can be built on LUKSO?

The number of LSPs is constantly evolving. Even more, there are innumerable ways one can connect the LSPs and create innovative dApps. The following list contains several potential use cases. Please bear in mind that those represent only the tip of the iceberg.

- social media applications
- content publishing platforms
- identity and reputation systems
- tokenized communities for creatives
- marketplaces and outlets
- ... 🪄
