---
title: Universal Profile
description: Universal Profile Frequently Asked Questions
sidebar_position: 4
---

# Frequently Asked Questions

## Why use UniversalProfile over any other wallet?

The UniversalProfile offers several advantages over traditional wallet services like Metamask or Rainbow, which essentially manage cryptographic "keys". These keys, secured by private keys (passwords), once they are leaked, all your digital assets and reputation associated with the respective address will be gone. Additionally, these keys lack the functionality to attach information or support features like social recovery, transaction relay, automation, etc.

On the other hand, UniversalProfile is a smart contract-based account that delivers more robust and flexible services. It supports a wide array of features including, but not limited to, social recovery, relay transactions, access management, upgradeable security, and attachable information. Since UniversalProfiles are smart contracts, they are programmable, which allows for these enhanced functionalities. Therefore, using UniversalProfile not only provides a safer environment for managing your digital assets but also offers an array of features that make your blockchain experience more flexible and user-friendly.

## How safe is a UniversalProfile?

The safety of a Universal Profile (UP) depends on the security of its owner. If an EOA (Externally Owned Account) is used as the owner, the UniversalProfile's security level is equivalent to that of the EOA. On the other hand, if a more secure access control system, such as a multisig wallet, is used as the owner, then the security level of the UP would be as robust as the multisig. In essence, the security of a UP directly corresponds to the security measures put in place by the owner.

## Can people have a UP on other EVM chains?

Yes, a Universal Profile (UP) can be deployed and used on any EVM-compatible chain. However, for a richer user experience due to UP-to-UP interactions, it's recommended to use UP within the LUKSO ecosystem. On other chains, the experience might not be as optimized due to prevalent use of older standards and Externally Owned Accounts (EOAs). Once the LSPs are adopted on other EVM chains, the use of UP will be the same on other networks than LUKSO.

## What's the difference between UniversalProfile and EIP4337?

UniversalProfile and EIP4337 are both standards within the blockchain realm, but they differ significantly in their scope and functions.

EIP4337 is a standard that primarily focuses on the relay execution of calls to a smart contract account according to the logic specified within the standardized function. In simpler terms, it sets the rules for how a particular interaction should work - the relay of calls - and leave it for each implementing account to have a specific logic of how to allow the relay call.

UniversalProfile, on the other hand, goes beyond standardizing a single function. It outlines an entire account structure with multiple features, making it more versatile. UniversalProfile allows you to perform a variety of operations, attach information, hold and be notified about assets, and even expand the account with additional features.

So, while EIP4337 standardizes a specific functionality allowing for relay calls, UniversalProfile provides a comprehensive, modular account structure that can be extended with various features, including but not limited to the relay calls functionality of EIP4337.

Notably, since the UniversalProfile is designed to be flexible and extendable, it **can support the EIP4337 standard even after deployment**, given that the owner meet few requirements and conditions.

## What's the difference between UniversalProfile and ENS?

The Ethereum Name Service (ENS) and UniversalProfile serve different purposes but can complement each other in the blockchain ecosystem.

ENS is essentially a naming system on the Ethereum blockchain. It functions similar to the internet's domain name system (DNS), enabling users to replace long, complex blockchain addresses with human-friendly names. This makes it easier for users to send transactions, interact with smart contracts, and otherwise use the blockchain.

On the other hand, a UniversalProfile is a smart contract-based account, acting as an on-chain actor. It enables a range of features such as executing more operations, attaching information, and providing a more user-friendly experience.

Despite these differences, ENS and UniversalProfile can work together. For instance, you can link an ENS name to a UniversalProfile. This way, you could use an ENS name, such as 'universalprofile.eth', making it much easier to locate and interact with your UniversalProfile on the blockchain.

## Where are my keys? Can I use MetaMask or a hardware wallet?

When you create a Universal Profile from [UniversalProfile.cloud](https://universalprofile.cloud) or [The Dematerialised](https://thedematerialised.com/), a wallet is made in your browser's `localStorage`. A login link containing an encrypted private key is emailed to you.
The email backup is a temporary method to manage your keys while the LUKSO team is working on custom tools to manage your Universal Profile account. These websites do not support MetaMask or hardware wallets yet.

If you are a Dapp developer, you can connect your Dapp to MetaMask and sign/send transactions from the EOA provided by MetaMask. You will need to connect MetaMask to the [L14 Testnet](../networks/l14-testnet.md) and probably send the transaction through the [Key Manager](../standards/universal-profile/lsp6-key-manager.md) that owns the Universal Profile. You will also need to know with which Universal Profile smart contract address the EOA provided by MetaMask can interact.

## Can I send ethereum ETH/Token/NFTs to my Universal Profile address?

Your Universal Profile smart contract is deployed on the [LUKSO L14](../networks/l14-testnet.md) network, a different network than the Ethereum mainnet. Therefore, it is not possible to send ETH to your Universal Profile address. Users will lose their assets if you send ETH, tokens, or NFTs from the Ethereum mainnet to your Universal Profile smart contract address.

## Can I store other tokens like ETH on my UniversalProfile?

Yes, a Universal Profile can hold any assets that are native to the same network it's deployed on. While specific coins/tokens from other networks may not be held in the Universal Profile, many tokens have equivalent representations that can be bridged/transferred onto different networks. This can be done in the future on LUKSO.

## Will my Universal Profile and assets be migrated to the mainnet?

LUKSO will migrate to mainnet all the Universal Profiles created on:

- [The Dematerialised](https://thedematerialised.com)
- [Universal Profile](https://universalprofile.cloud)

The migration includes all the NFTs issued by [LUKSO](https://lukso.network/) and [The Dematerialised](https://thedematerialised.com).

If your app deploys its contracts and Universal Profiles, you will be responsible for migrating them to the mainnet.

## How is lens protocol different than Universal Profile?

Universal Profiles are fundamentally new accounts, acting as the center for all your blockchain interactions. They are generic for various use cases, such as regular wallets. They can interact directly with on-chain applications, but on top, feature permission and asset management, updatable profile information, and let you interact as one persona through different EOA keys.

Lens, on the other hand, is a governed Social Media protocol within which profiles are managed as NFTs. The protocol-bound asset inherently ties them to one protocol, leveraging the functionality specific to the underlying EOA wallet.

The operational approach differs from LUKSO, where a profile is a standalone account to open up the capabilities of blockchains.
