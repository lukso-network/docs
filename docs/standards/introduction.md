---
title: 'Introduction'
description: Introduction to LSPs (LUKSO Standard Proposals).
---

import StandardsGallery from '@site/src/components/StandardsGallery';

# The LUKSO Standard Proposals (LSPs)

Discover the LSPs, the standards that represent the foundation of **LUKSO's ecosystem**. They can be used as **building blocks** and combined to create new and innovative protocols or dApps on the LUKSO Blockchain.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/7Ds8rYyzJ5A?si=UQ4XYHDoyIoFbfnQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

:::info

**👉 📺 [Watch Fabian's Presentation from ETHCC6 2023](https://www.youtube.com/live/MKFB_pGse4A?si=Yuo_sYRrhrtAYycG&t=312) for a an high-level overview! 🦅**

:::

The LSPs introduce new concepts like **blockchain-based accounts** (_e.g: **Universal Profiles**_), **Digital Assets, NFT 2.0** and **Permissions Management**. This section describes the fundamentals of the standards, their technical aspects and their applications and use cases across the LUKSO ecosystem.

The **LUKSO Standards Proposals (LSPs)** represent the **main building blocks** of the LUKSO ecosystem. People, groups, and organizations can use them to build blockchain-based applications that aim to maximize the user experience, allow more flexibility and interaction, and open doors to innovation.

The use of smart contracts and standards like the LSPs can mitigate some centralization risks by allowing for decentralized ownership and control of accounts and assets.

<StandardsGallery />

:::note

LSPs are **not order-dependent**. They can be related to each other in a **backward or forward** order. Meaning a standard could use another one that comes after or before in order. For example **[LSP0 - ERC725Account](../standards/accounts/lsp0-erc725account.md)** uses **[LSP1 - UniversalReceiver](../standards/accounts/lsp1-universal-receiver-delegate.md)**, **[LSP2 - ERC725YJSONSchema](../standards/metadata/lsp2-json-schema.md)** and could use **[LSP3 - ProfileMetadata](../standards/metadata/lsp3-profile-metadata.md)**, etc.

:::

## Smart Contracts in Solidity

The **[default implementation of these standards in Solidity](../contracts/introduction.md)** is available as Open Source Software. They can be used as a base by developers to build their applications.

> See the [Contracts](../contracts/introduction.md) section for the Solidity implementation of these standards and their ABI docs.

:::info Questions? Want to learn more?

<div class="discord-logo">

![Discord logo](./discord-logo.png)

</div>

Feel free to join the [LUKSO **Discord server**](https://discord.com/channels/359064931246538762/620552532602912769), and ask your questions in the [#standards](https://discord.com/channels/359064931246538762/620552532602912769) channel.

Our team and community members look forward to helping you understand the standards.

:::

## LSP Standard Specifications

See [LUKSO Improvement Proposals - LIPs (GitHub)](https://github.com/lukso-network/LIPs) if you are looking for the design and formal specifications of each LSP Standards.

Developers wishing to understand the logic behind the standards and their tradeoffs within are well-advised to read these documents alongside the Solidity code itself.

## Further Resources

- [The New Standard for Blockchain Accounts and NFT 2.0 (YouTube)](https://www.youtube.com/watch?v=7u0WGAS1k_Q)
- [Tech Time with Fabian Ep.1 - LUKSO NFT's 2.0 Explained (YouTube)](https://www.youtube.com/watch?v=Nx5D9QWNIhI)
- [Fabian Vogelsteller talks at BLOCKCHANCE 2021 about LUKSO (YouTube)](https://www.youtube.com/watch?v=aoZE_0Ey1SQ)
- [Fabian Vogelsteller talks at NFT.NYC 2021 about the new Standards (YouTube)](https://www.youtube.com/watch?v=skA4Y-vvt5s)
- [Developer DAO - Dev & Tell | Yamen - LUKSO Network (YouTube)](https://www.youtube.com/watch?v=1OeBpJIstSQ)
- [LUKSO Build 🆙 #1 Hackathon (YouTube)](https://www.youtube.com/watch?v=veHqhpgGDr4)
- [ERC725 Alliance website](https://erc725alliance.org/)
