---
sidebar_label: 'Introduction'
description: Introduction to the LUKSO Ecosystem - why choose LUKSO? Who is LUKSO intended for?
---

# Introduction

LUKSO is an L1 EVM-based Blockchain. All tools and tutorials for Ethereum also work well for LUKSO.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/7Ds8rYyzJ5A?si=UQ4XYHDoyIoFbfnQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Who is LUKSO intended for?

LUKSO is intended for creative economies, where identities play a key role.
LUKSO allows brands, creatives and developers to dictate the distribution of wealth and influence from lifestyle activities. They can do so by having Universal Profiles (UPs), creating Digital Identities and Certificates, and building Tokenized Communities.

## Why choose LUKSO?

[LSPs](/standards/introduction.md) (LUKSO Standard Proposals) are the building blocks of LUKSO. They are used to to build blockchain-based applications that offer an enhanced user experience, and allow for more flexibility and interaction.

### Developer Resources

Developers building on LUKSO can write smart contracts in an EVM-based language like Solidity, deploy them using [Hardhat](https://hardhat.org/), and utilize standards already developed for other Ethereum networks.

- [Learning Tools of the Ethereum Foundation](https://ethereum.org/en/developers/learning-tools/)
- [What are the main features of LUKSO standards?](../faq/onboarding/lukso-standards.md#what-are-the-main-features-of-lsps)

### LSP Features

By integrating different LSPs in unique ways, LUKSO solves fundamental blockchain problems:

- [🔓 Upgradeable security](../standards/universal-profile/lsp6-key-manager): Universal Profiles can be owned by an EOA or a custom contract such as a multisig. Therefore, users can have multiple devices and applications controlling their account, each of them with different permissions. Users can even have social recovery, such that they grant certain permissions of their account to their friends and family.
- [👩‍🎤 On-chain profile](../standards/universal-profile/lsp3-profile-metadata.md): users can build their profiles onchain, adding images, tags, descriptions and links to their accounts to shape their online persona.
- [📢 On-chain notifications](../standards/generic-standards/lsp1-universal-receiver.md): users get notified upon token transfers and they can visualize the assets that they own within their profile. They can even block transfers of certain assets by creating allow lists or block lists.
- [📝 Updatable and flexible metadata](../standards/generic-standards/lsp2-json-schema.md): metadata can be updated, enabling dynamic NFTs that can change certain properties over time, while other properties remain immutable.
- [💫 Extend your account over time](../standards/generic-standards/lsp17-contract-extension.md): users can extend their account over time seamlessly, with no need to redeploy the associated smart contract.
- [⛽️ Gasless experience](./concepts.md#transaction-relay-service): Universal Profiles support Transaction Relay Services that cover the gas for users's transactions. Users won't have the burden of getting the native token of the chain to start interacting with your application.

:::tip Seamless Onboarding

Currently, users are subsidized with the [Transaction Relay Service](./concepts.md#transaction-relay-service) from LUKSO.

:::

## What can be built on LUKSO?

The following list contains several potential use cases. Please bear in mind that those represent only the tip of the iceberg.

- social media applications
- content publishing platforms
- identity and reputation systems
- tokenized communities for creatives
- marketplaces and outlets
- ... 🪄
