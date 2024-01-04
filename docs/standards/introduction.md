---
title: 'Introduction'
sidebar_position: 1
description: Introduction to LSPs (LUKSO Standars Proposals).
---

import LegoGallery from '@site/src/components/LegoGallery';

# The LUKSO Standard Proposals (LSPs)

## High Level Overview of Universal Profiles

<div class="video-container">
<iframe src="https://www.youtube.com/embed/_qmkcGvx9Dg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</div>

**👉 📺 If you want to have a presentation that goes more in depth, [watch Fabian's Presentation from ETHCC6 2023](https://www.youtube.com/live/MKFB_pGse4A?si=Yuo_sYRrhrtAYycG&t=312).**

:::success Implementation

See the [Contracts Implementation](../contracts/introduction.md) section for the Solidity implementation of these standards.

:::

The **LUKSO Standards Proposals (LSPs)** represent the **main building blocks** of the LUKSO ecosystem. People, groups, and organizations can use them to build blockchain-based applications that aim to maximize the user experience, allow more flexibility and interaction, and open doors to innovation.

The use of smart contracts and standards like the LSPs can mitigate some centralization risks by allowing for decentralized ownership and control of accounts and assets.

:::info

The **[default implementation of these standards in Solidity](../contracts/introduction.md)** is available as Open Source Software. They can be used as a base by developers to build their applications.

Developers wishing to understand the logic behind the standards and their tradeoffs within are well-advised to read these documents alongside the Solidity code itself.

:::

:::info Questions? Want to learn more?

<div class="discord-logo">

![Discord logo](./discord-logo.png)

</div>

Feel free to join the [LUKSO **Discord server**](https://discord.com/channels/359064931246538762/620552532602912769), and ask your questions in the [#standards](https://discord.com/channels/359064931246538762/620552532602912769) channel.

Our team and community members look forward to helping you understand the standards.

:::

## Introduction

The current **blockchain experience** comes with many limitations, not necessarily because of the complexity but due to the broken infrastructure represented by the old underlying tools and standards used to operate on the network.

Change should start from the bottom to create a better user experience on the blockchain, from fundamental pieces to the top. Topics related to **identity**, **assets representation**, **relay execution** and **smart contract interaction** require standardization. Such standards should be flexible enough to support and allow more potential use cases in the future.

The following documentation describes the fundamentals of the standards and technical aspects of the LUKSO ecosystem.

## LUKSO Standard Proposals (LSPs)

:::note

The LSP standards are **not order-dependent**. They can be related to each other in a **backward or forward** order.

Meaning a LSP standard could use another one that comes after or before in order. For example **[LSP0 - ERC725Account](#)** uses **[LSP1 - UniversalReceiver](#)**, **[LSP2 - ERC725YJSONSchema](#)** and could use **[LSP3 - ProfileMetadata](#)**, etc.

:::

This section lists and describes the LSPs Standards representing the foundation of **LUKSO's ecosystem**. They can be used as **building blocks** and combined to create new and innovative protocols or dApps on the LUKSO Blockchain.

The LSPs introduce new concepts like **blockchain-based accounts** (_e.g: **Universal Profiles**_), **Digital Assets, and NFT 2.0**.

<LegoGallery />

## Further Information

- [The New Standard for Blockchain Accounts and NFT 2.0 (YouTube)](https://www.youtube.com/watch?v=7u0WGAS1k_Q)
- [Tech Time with Fabian Ep.1 - LUKSO NFT's 2.0 Explained (YouTube)](https://www.youtube.com/watch?v=Nx5D9QWNIhI)
- [Fabian Vogelsteller talks at BLOCKCHANCE 2021 about LUKSO (YouTube)](https://www.youtube.com/watch?v=aoZE_0Ey1SQ)
- [Fabian Vogelsteller talks at NFT.NYC 2021 about the new Standards (YouTube)](https://www.youtube.com/watch?v=skA4Y-vvt5s)
- [Developer DAO - Dev & Tell | Yamen - LUKSO Network (YouTube)](https://www.youtube.com/watch?v=1OeBpJIstSQ)
- [LUKSO Build 🆙 #1 Hackathon (YouTube)](https://www.youtube.com/watch?v=veHqhpgGDr4)

## References

- [LUKSO Improvement Proposals - LIPs (GitHub)](https://github.com/lukso-network/LIPs)
- [ERC-725 Alliance website](https://erc725alliance.org/)
