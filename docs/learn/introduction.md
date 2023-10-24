---
sidebar_label: 'Introduction'
sidebar_position: 1
---

# Introduction

## What is LUKSO?

LUKSO is L1 blockchain, EVM (Ethereum Virtual Machine) compatible, based on PoS (Proof of Stake), for creative economies.

## How LUKSO started?

The story of LUKSO started with ERC725, a standard proposed by Fabian Vogelsteller for blockchain-based identity. ERC725 allows for self-sovereign identity. Over the years we saw the negative effects of having a centralized identity with damaging leaks and unfair selling of user data and identity. An open, portable standard for identities enables decentralized reputation, governance, and more. Users can take their identity across different dApps and platforms that support this standard.
LUKSO is the first blockchain that powers self-sovereign identities.

## Why choose LUKSO?

[LSPs](/standards/introduction.md) (LUKSO Standard Proposals) are the building blocks of LUKSO. They are used to to build blockchain-based applications that offer an enhanced user experience, and allow for more flexibility and interaction. LSPs are part of the more general LIPs used to discuss protocol specifications and client API improvements.

**LSPs introduce new concepts like blockchain-based accounts, also known as Universal Profiles (UPs), Digital Assets, and NFT 2.0.**

By integrating different LSPs in unique ways, LUKSO solves fundamental problems that we currently face when it comes to blockchains such as:

- [Upgradeable security](../standards/universal-profile/lsp6-key-manager): UPs can be owned by an EOA or a custom contract such as a multisig. Therefore, users can have multiple devices and applications controlling their account, each of them with different permissions. Users can even have social recovery, such that you grant certain permissions to their account to their friends and family
- [On-chain profile](../standards/universal-profile/lsp3-profile-metadata.md): users can build their profiles onchain, adding images, tags, descriptions and links to their accounts to shape their online persona
- [senders and receivers are notified upon transfers (e.g.: tokens transfers)](../standards/tokens/LSP7-Digital-Asset.md): users can see which assets they own within their profile. They can even block transfers of certain assets by creating a list of allowed assets they want to accept.
- [Updatable and flexible metadata](../standards/generic-standards/lsp2-json-schema.md): metadata can be updated, enabling dynamic NFTs that can change certain properties over time, while other properties remain immutable
- [Extend your account over time](../standards/generic-standards/lsp17-contract-extension.md): users can extend their account over time seamlessly, with no need to redeploy the associated smart contract
- gassless experience: UPs support transaction relay services that cover the gas for users's transactions.

:::success
Currently, there is a relay service that subsidizes users' transactions maintained by the LUKSO team. In the future, various relay services will be offered by multiple third parties, evolving into a competitive relay ecosystem with various business models.
:::

Since LUKSO is EVM-compatible, Solidity developers can build on LUKSO's implementation of the EVM straight out-of-the box, using the same tools they are familiar with.

## Who is LUKSO intended for?

LUKSO is intended for creative economies, where identities play a key role.
LUKSO allows brands, creatives, and developers to dictate the distribution of wealth and influence from lifestyle activities. They can do so by having Universal Profiles (UPs), creating Digital Identities and Certificates, and by building Tokenized Communities.

## What can you build on LUKSO?

The number of LSPs is constantly evolving. Even more, there are innumerable ways one can connect the LSPs and create innovative dApps. The following list contains several potential use cases. Please bear in mind that those represent only the tip of the iceberg.

- social media applications
- content publishing platforms
- identity and reputation systems
- marketplaces
- news outlets
- tokenized communities for artists and creatives
