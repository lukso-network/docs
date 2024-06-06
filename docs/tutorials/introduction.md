---
sidebar_label: 'Building on LUKSO'
description: Introduction to the LUKSO Ecosystem - why choose LUKSO? Who is LUKSO intended for?
---

# Building on LUKSO

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/kJ5_6LN6mZc?si=7NWn-odkk8KmSDLz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## What can be built on LUKSO?

The following list contains several potential use cases. Please bear in mind that those represent only the tip of the iceberg.

- social media applications
- content publishing platforms
- identity and reputation systems
- tokenized communities for creatives
- marketplaces and outlets
- ... 🪄

## Developer Resources

LUKSO is an L1 EVM-based Blockchain. All tools and tutorials for Ethereum also work for LUKSO by default.

Developers building on LUKSO can write smart contracts in an EVM-based smart contract language like (Solidity, Vyper, etc...), and use existing standards already developed for other Ethereum networks.

- [Awesome LUKSO, a comprehensive list of awesome LUKSO resources!](https://github.com/lukso-network/awesome-lukso)
- [What are the main features of LUKSO standards?](../faq/onboarding/lukso-standards.md#what-are-the-main-features-of-lsps)
- [Learning Tools of the Ethereum Foundation](https://ethereum.org/en/developers/learning-tools/)

## LSP Features

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
