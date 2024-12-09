---
sidebar_label: '🏎️ Developer Quickstart'
description: Introduction to the LUKSO Ecosystem - why choose LUKSO? Who is LUKSO intended for?
title: 'Quick Start'
---

import CallToActionButton from '@site/src/components/CallToActionButton';
import CardWithImage from '@site/src/components/CardWithImage';
import Chip from '@site/src/components/Chip';

import discoverContent from './discover-content.json';
import developerContent from './developer-content.json';

# Developer Quickstart

<CardWithImage CardData={developerContent}/>

## Building dApps with Universal Profiles

When building dApps on LUKSO, you are interacting with [Universal Profiles 🆙](../standards/accounts/introduction.md) through the [Universal Profile Browser Extension](https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn). This page guides you on the first step to get started building on LUKSO with the 🆙 Browser Extension.

<div style={{
  display: 'flex',
  flexDirection: 'column',
  margin: '3rem 0',
  gap: "1rem",
}}>

<div style={{ width: '100%' }}>

<CallToActionButton
    icon="material-symbols:counter-1"
    color="white"
    target="_blank"
    link="/install-up-browser-extension"
    text="Install the UP Browser Extension🧩"
  />

</div>

<div style={{ width: '100%' }}>

<CallToActionButton
    icon="material-symbols:counter-2"
    color="white"
    target="_blank"
    link="https://my.universalprofile.cloud"
    text="Create your Universal Profile 🆙 on universalprofile.cloud"
  />

</div>

<div style={{ width: '100%' }}>

<CallToActionButton
    icon="material-symbols:counter-3"
    color="white"
    link="/learn/universal-profile/connect-profile/connect-up"
    text="Start building dApps on LUKSO! 🫡"
  />

</div>

</div>

:::note Manual Deployment

You can also create new [Universal Profiles](../standards/accounts/introduction.md) by ⚒️ [deploying it programmatically](./universal-profile/advanced-guides/deploy-up-with-lsp23.md). However, please keep in mind that you would also have to deploy your own [Transaction Relay Service](../standards/accounts/lsp15-transaction-relayer-api.md) to allow gasless onboarding. Customly deployed profiles will not receive free monthly transaction quota through the LUKSO Transaction Relay Service.

:::

:::tip Relayer API

If you want to deploy Universal Profiles for your users, please check out our [Relayer API](../tools/services/relayer-developer.md).

:::

## Resources for Builders

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/kJ5_6LN6mZc?si=7NWn-odkk8KmSDLz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

LUKSO is an L1 EVM-based Blockchain. All tools and tutorials for Ethereum also work for LUKSO by default.

Developers building on LUKSO can write smart contracts in any EVM-based smart contract languages (Solidity, Vyper, etc...), and use existing standards already developed for other Ethereum networks.

- [Awesome LUKSO, a comprehensive list of awesome LUKSO resources!](https://github.com/lukso-network/awesome-lukso)
- [What are the main features of LUKSO standards?](../faq/onboarding/lukso-standards.md#what-are-the-main-features-of-lsps)
- [Learning Tools of the Ethereum Foundation](https://ethereum.org/en/developers/learning-tools/)

## Code Repositories

Want to dive into the code directly? Check the following repos 😉

### Next.js Boilerplate

The [`tools-dapp-boilerplate`](https://github.com/lukso-network/tools-dapp-boilerplate) is a Next.js repository that gives you a fully working dApp with lot of ready to use components and features:

<div style={{textAlign: 'center'}}>

<img
  src="https://github.com/lukso-network/tools-dapp-boilerplate/raw/main/img/front_page.png"
  alt="LUKSO Boilerplate"
/>

</div>

### Playground

The [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository is a great place to start playing around with dApps. It includes:

- ready-to-go network configurations with LUKSO [Mainnet](../networks/mainnet/parameters.md) and [Testnet](../networks/testnet/parameters.md).
- a full Hardhat setup to work with smart contracts.
- example scripts to fetch profile and asset metadata, update them, and even more code examples!
- sample contracts for Tokens, NFTs and Universal Receivers to build smart contracts based on the [LSP standards](./benefits-lukso-standards.md).
- scripts to deploy and verify contracts on the network.

<div style={{textAlign: 'center'}}>

<img src="/img/guides/playground_dapp.png" alt="LUKSO Playground dApp" />

</div>
