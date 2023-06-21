---
title: General
description: LUKSO General Network FAQ
sidebar_position: 2
---

# Frequently Asked Questions

## General

### What are the expected block and epoch times?

The LUKSO network will run with an expected block time of 12 seconds with 12 seconds per slot. An epoch contains 32 slots.

### Which cold storage wallets can be used with LUKSO network?

LUKSO is an EVM compatible network. Therefore, any Ethereum compatible wallet which allows adding custom networks can be used on the LUKSO network.

### Will LUKSO implement the EIP-1559 standard?

Yes, LUKSO will launch with EIP-1559 enabled.

### What will the LUKSO network token distribution voting process look like in practice?

When using our genesis validator deposit launchpad, validators can select their preferred token distribution from **35M, 42M or 100M LYX** tokens. The network will start with the option most voted for by genesis validators.

### Will the test network be open to community validators?

The LUKSO test network will be open to whitelisted validator addresses only. The main reason is to allow maximum stability and participation uptime. Each depositor will have a limited number of keys he is whitelisted for so that if his node goes down, it will be less likely genuinely impact the network.

The same applies to the execution and consensus dashboard of the testnet. Only long-term nodes from whitelisted partners will be listed to reduce spam and have a clear overview of the core infrastructure status. If you want to have monitoring and process visualization of your local node, we recommend using [Grafana](https://grafana.com/).

If you plan to become a validator for testnet, please contact [testnet-validators@lukso.network](mailto:testnet-validators@lukso.network).

### Will there be a guaranteed minimum amount of time that the discovery phase will last before non-genesis validators can be added?

The length of the discovery phase will depend on several factors including the number of genesis validators and the overall stability of the network. We will move on to the next phase once we are satisfied everything is running smoothly. It is expected to last around 1 month.

### How can I transfer my LYXe to LYX

Details about the LYXe to LYX migration process for those who do not participate as genesis validators will come later, after the genesis and discovery phase of the network have been completed.
