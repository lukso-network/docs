---
title: Universal Profile
description: Universal Profile Frequently Asked Questions
sidebar_position: 2
---

# Frequently Asked Questions

## Where are my keys? Can I use MetaMask or a hardware wallet?

When you create a Universal Profile from [UniversalProfile.cloud](https://universalprofile.cloud) or [The Dematerialised](https://thedematerialised.com/), a wallet is created in your browser `localStorage` and a login link containing an encrypted private key is emailed to you.
This is a temporary method to manage your keys while the LUKSO team is working on custom tools to manage your Universal Profile account. These websites do not support MetaMask nor hardware wallets yet.

If you are a Dapp developer, you can connect your Dapp to MetaMask and sign/send transactions from the EOA provided by MetaMask. You will need to connect MetaMask to the [L14 Testnet](../networks/l14-testnet.md) and probably to send the transaction through the [Key Manager](../standards/universal-profile/04-lsp6-key-manager.md) which owns the Universal Profile. You will also need to know with which Universal Profile smart contract address the EOA provided by MetaMask can interact with.

## Can I send ethereum ETH/Token/NFTs to my Universal Profile address?

Your Universal Profile smart contract is deployed on the [LUKSO L14](../networks/l14-testnet.md) network, which is a different network than the Ethereum mainnet. It is therefore not possible to send ETH to your Universal Profile address. If you send ETH, tokens or NFTs from the Ethereum mainnet to your Universal Profile smart contract address, your assets will be lost.

## Will my Universal Profile and assets be migrated to mainnet?

LUKSO will migrate to mainnet all the Universal Profiles created on:

- [The Dematerialised](https://thedematerialised.com)
- [Universal Profile](https://universalprofile.cloud)

and all the NFTs issued by LUKSO and [The Dematerialised](https://thedematerialised.com).

If your app deploys its own contracts and Universal Profiles, you will be responsible for migrating them to the mainnet.
