---
title: 'Network parameters'
sidebar_position: 1
description: 'Network Parameters for LUKSO: Execution Block Explorer, RPC providers, Chain ID.'
---

import AddNetworkButton from '@site/src/components/AddNetworkButton'

# Network Parameters

| Setting                  | Value                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| Network Name             | LUKSO                                                                                                |
| Genesis Fork Version     | 0x42000001                                                                                           |
| Chain ID / Network ID    | 42                                                                                                   |
| Currency Symbol          | LYX                                                                                                  |
| Execution Block Explorer | [https://explorer.execution.mainnet.lukso.network](https://explorer.execution.mainnet.lukso.network) |
| Execution Status Page    | [https://stats.execution.mainnet.lukso.network](https://stats.execution.mainnet.lukso.network)       |
| Consensus Block Explorer | [https://explorer.consensus.mainnet.lukso.network](https://explorer.consensus.mainnet.lukso.network) |
| Consensus Status Page    | [https://stats.consensus.mainnet.lukso.network](https://stats.consensus.mainnet.lukso.network)       |
| Launchpad                | [https://deposit.mainnet.lukso.network](https://deposit.mainnet.lukso.network)                       |
| Checkpoints              | [https://checkpoints.mainnet.lukso.network](https://checkpoints.mainnet.lukso.network)               |
| Blockscout API           | `https://explorer.execution.mainnet.lukso.network/api`                                               |

The mainnet network configs are defined or the [`lukso-network/network-configs`](https://github.com/lukso-network/network-configs/tree/main/mainnet/shared) repo.

## 3rd party RPC providers

Developers can use the services of the following 3rd party providers:

- [Thirdweb](https://thirdweb.com/) RPC URL: `https://42.rpc.thirdweb.com`
- [SigmaCore](https://sigmacore.io) RPC URL: `https://rpc.lukso.sigmacore.io` (increased-limit packages available)
- [NowNodes](https://nownodes.io/) RPC URL: `https://lukso.nownodes.io` (requires API key)
- [Envio](https://envio.dev/) RPC URL: `https://lukso.rpc.hypersync.xyz` (optimized read-only)

We recommend developers to use these RPC providers over our public RPC URL as they provide better performance and stability.

## IPFS Storage

We highly recommend that developers fetch and store profile or asset data using **their own IPFS gateway** solutions like [Pinata](https://docs.pinata.cloud/docs/welcome-to-pinata) or [Infura](https://docs.infura.io/networks/ipfs) for production needs, ensuring distribution and availability across the IPFS network. We do not provide an official gateway for uploading asset data. For development purposes, you may use the following RPC to fetch data:

- IPFS Download (for development only): `https://api.universalprofile.cloud/ipfs`

:::caution Availability

This gateway is intended for development purposes. We do not guarantee any SLA, and rate limits may apply.

:::

## Add LUKSO to Wallets

You can add the LUKSO to any of your existing wallets like [MetaMask](https://metamask.io/), [Rabby](https://rabby.io/), [Rainbow](https://rainbow.me/), [Coinbase Wallet](https://www.coinbase.com/de/wallet), [Trust Wallet](https://trustwallet.com/de), and others using the following parameters or button:

| Setting               | Value                                             |
| --------------------- | ------------------------------------------------- |
| Network Name          | LUKSO                                             |
| RPC URL               | https://42.rpc.thirdweb.com                       |
| Chain ID / Network ID | 42                                                |
| Currency Symbol       | LYX                                               |
| Block explorer URL    | https://explorer.execution.mainnet.lukso.network/ |

<AddNetworkButton networkName="mainnet"/>

:::tip Hardware wallets

You can use your hardware wallet with MetaMask. You will simply need to:

1. Connect your hardware wallet to MetaMask
2. Add LUKSO as a custom network (cf. settings above)
3. For Ledger users: Download the Ethereum app on your Ledger
4. Switch the network to "LUKSO"

:::

## Network Architecture

LUKSO's Blockchain Architecture runs the Ethereum protocol and consists of 2 to 4 clients:

- The consensus client running Casper the Friendly Finality Gadget (Casper FFG) plus LMD-GHOST fork choice algorithm ([More on the Gasper Consensus](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/))
- The execution client, [running the Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/ethereum-stack/)
