---
title: Universal Profile
description: Universal Profile Frequently Asked Questions
sidebar_position: 2
---

# Frequently Asked Questions

## Where are my keys? Can I use MetaMask or a hardware wallet?

When you create a Universal Profile from [UniversalProfile.cloud](https://universalprofile.cloud) or [The Dematerialised](https://thedematerialised.com/), a wallet is made in your browser's `localStorage`. A login link containing an encrypted private key is emailed to you.
The email backup is a temporary method to manage your keys while the LUKSO team is working on custom tools to manage your Universal Profile account. These websites do not support MetaMask or hardware wallets yet.

If you are a Dapp developer, you can connect your Dapp to MetaMask and sign/send transactions from the EOA provided by MetaMask. You will need to connect MetaMask to the [L14 Testnet](../networks/l14-testnet.md) and probably send the transaction through the [Key Manager](../standards/universal-profile/04-lsp6-key-manager.md) that owns the Universal Profile. You will also need to know with which Universal Profile smart contract address the EOA provided by MetaMask can interact.

## Can I send ethereum ETH/Token/NFTs to my Universal Profile address?

Your Universal Profile smart contract is deployed on the [LUKSO L14](../networks/l14-testnet.md) network, a different network than the Ethereum mainnet. Therefore, it is not possible to send ETH to your Universal Profile address. Users will lose their assets if you send ETH, tokens, or NFTs from the Ethereum mainnet to your Universal Profile smart contract address.

## Will my Universal Profile and assets be migrated to the mainnet?

LUKSO will migrate to mainnet all the Universal Profiles created on:

- [The Dematerialised](https://thedematerialised.com)
- [Universal Profile](https://universalprofile.cloud)

The migration includes all the NFTs issued by [LUKSO](https://lukso.network/) and [The Dematerialised](https://thedematerialised.com).

If your app deploys its contracts and Universal Profiles, you will be responsible for migrating them to the mainnet.
