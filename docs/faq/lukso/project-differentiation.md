---
sidebar_label: 'Project Differentiation'
sidebar_position: 2
description: How does LUKSO differentiate from other projects?
---

# Project Differentiation

## How do Universal Profiles differ from ENS?

The [Ethereum Name Service](https://docs.ens.domains/) (ENS) and Universal Profiles serve different purposes but can complement each other in the blockchain ecosystem. While they might look similar from the outside, they **differ in their tech stack and target**.

ENS is a **naming system** for accounts on the Ethereum blockchain. It functions similarly to the internet's domain name system (DNS), enabling users to replace long, complex blockchain addresses with verifiable human-friendly names. Name services make it easier for users to send transactions and interact with smart contracts without remembering their account addresses. Users can even add additional information, such as social media links, email addresses, keywords, or profile pictures.

Universal Profiles, on the other hand, are **accounts acting as the center for your user profile, persona and blockchain interactions**. They can have extensive and editable information directly embedded on them (on the smart contract that represents the Universal Profile) while also being able to interact with on-chain applications, just as regular wallets. In comparison, information associated to an ENS name is stored and maintained within a global ENS registry service.

While name services are convenient for transferring assets, they are **not as fitting to maintain an on-chain persona**. The domains can not be secured with multiple keys, have limited attachable information, and require payments to keep your domain names. If the subscription expires, all historical transactions no longer bear this name, meaning **users would lose their** verifiable information and **reputation** connected to the name. Anyone else could rebuy the domain and assume the identity associated with it. Universal Profiles can tackle such concerns, as they have convenience features such as **permission management and rotatable keys**. However, Universal Profiles are accounts and have regular blockchain addresses.

In this regard, name services and Universal Profiles could work together to enable the ultimate convenience: having both extensive account features and a connected domain to them.

## How do Universal Profiles differ from LENS Profiles?

LENS is a **governed social media protocol** within which profiles are managed as NFTs. Where these NFTs can be used underneath many social applications, the asset-bound approach inherently ties them to the protocol, leveraging the functionality specific to the underlying EOA wallet. Basic blockchain accounts only have one static seed phrase and can’t store information, limiting their overall functionality.

Universal Profiles, conversely, are **generic smart contract accounts** not tied to any use case that can have public data natively. They can be used to interact directly with on-chain applications the same way as you use regular wallets like Metamask, Argent or Trust Wallet. They features permission and asset management, updatable profile information, and let you interact as one persona using even different private keys (EOAs) associated for specific purpose (_e.g: different EOA / private keys stored on different devices)_.

Here, the operational approach differs from LUKSO. If the idea of LENS is drawn further, many protocols or applications would have **separated profile data** like we currently have with Web 2.0 accounts. LUKSO approaches a **universal framework** where a profile is a standalone account to open up the capabilities of blockchains and move beyond the current limitations.

## How do Universal Profiles differ from ERC4337?

Account Abstraction, outlined in [ERC4337](https://eips.ethereum.org/EIPS/eip-4337), standardizes how the **body of future blockchain accounts** should be set up and what **transaction flow** they follow to improve security and scalability. With the standardization, not only is the account itself decoupled from the signing, making keys exchangeable, but an attempt is made to integrate these accounts natively into the EVM protocol, making EOAs obsolete. The standard features a new transaction type and pool, bundling of network interactions, key rotation, and the payment of transaction fees using tokens. However, it mainly defines **how the core account manages the execution of transaction calls**, not a fully-fledged-out account system! Beyond that frame, extended identity or persona schemes could be created on top.

LUKSO is coming from the opposite, user-focused perspective. Universal Profiles already are **extensible accounts** that can be full of information, have a permission control system, can be notified on transfers to create consent, and even come with many features for assets and vaults. LUKSO achieves the functionality by having **state-of-the-art contract-based accounts**, using EOAs as controller keys on their back.

While Account Abstraction might be a proper fundament for future EVM blockchain accounts, Universal Profiles **already define the full-on account ecosystem**. LUKSO ensured that Universal Profiles will be compatible with Account Abstraction under the hood. After the standard is finalized or integrated within the protocol, LUKSO **could adopt its functionality** into Universal Profiles for further optimization. Because of their modular and upgradable nature, these updates could even be done after the profiles were deployed.

Both projects relieve each other by finding new standardizations on different ends. Nevertheless, they could go hand-in-hand.

## How could Universal Profiles relate on DIDs and VCs?

Decentralized Identifiers ([DIDs](https://www.w3.org/TR/did-core/#abstract)) and Verifiable Credentials ([VCs](https://www.w3.org/TR/vc-data-model/)) are game-changers for identity and account management in Web3 for managing claims about an entity or persona. DIDs and VCs offer flexibility in implementation. They can be applied in various ways, including Web2, private companies, and service providers. Blockchain is just one potential application of this tech stack. For it to work, claims only need some address with a corresponding encryption key.

The DID and VC tech stack can be **connected to the storage** of a Universal Profile, with its **global addresses potentially serving as identifiers** of the certificate or role. What's different to using a regular wallet is that the Universal Profile can directly house the descriptions and metadata, not just the unique reference address. In addition, their controller keys can change using on-chain security without modifying the persona's address.

The main goal of DIDs and VCs is to **enable more distributed, secure, and equal relationships** in the digital world. This potential is maximized when combined with open blockchain ledgers. The implementation details are up to individual projects, allowing diverse solutions tailored to specific use cases. Some are heading toward bundling claims and making them portable across different services, and some are further focusing on zero-knowledge-proofs to maintain proper privacy.

Claims and UPs are not inherently linked, but combining the technologies could unlock their full potential for **creating decentralized, secure, and verifiable digital identities or profiles**. We are expecting projects to explore different ways of implementing identity claims, pushing the boundaries of what's possible regarding privacy, security, and interoperability. However, by default, Universal Profiles are about showing public account data.

## How does LUKSO differ from DISCO?

DISCO is building on DIDs and VCs, and the project is about keeping your identity claims together so you can take them across apps conveniently.

LUKSO, on the other hand, is building the **next generation of accounts** called Universal Profiles, where **claims can be incorporated** or held with lots of extended functionality about its core management.
