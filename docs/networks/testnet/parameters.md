---
title: 'Network parameters'
sidebar_position: 1
description: 'Network Parameters for LUKSO Testnet: Execution Block Explorer, RPC providers, Chain ID, LUKSO Testnet faucet.'
---

import AddNetworkButton from '../../../src/components/AddNetworkButton'

# Testnet

The Public Testnet runs alongside the LUKSO mainnet for developers to test dApps and forks before they move to the mainnet.

## Network Parameters

| Setting                  | Value                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| Network Name             | LUKSO Testnet                                                                                        |
| Fork Version             | 0x42010001                                                                                           |
| Chain ID / Network ID    | 4201                                                                                                 |
| Currency Symbol          | LYXt                                                                                                 |
| RPC URL                  | [https://rpc.testnet.lukso.network](https://rpc.testnet.lukso.network)                               |
| Websocket RPC URL        | [wss://ws-rpc.testnet.lukso.network](wss://ws-rpc.testnet.lukso.network)                             |
| Execution Block Explorer | [https://explorer.execution.testnet.lukso.network](https://explorer.execution.testnet.lukso.network) |
| Execution Status Page    | [https://stats.execution.testnet.lukso.network](https://stats.execution.testnet.lukso.network)       |
| Consensus Block Explorer | [https://explorer.consensus.testnet.lukso.network](https://explorer.consensus.testnet.lukso.network) |
| Consensus Status Page    | [https://stats.consensus.testnet.lukso.network](https://stats.consensus.testnet.lukso.network)       |
| Faucet                   | [https://faucet.testnet.lukso.network](https://faucet.testnet.lukso.network)                         |
| Launchpad                | [https://deposit.testnet.lukso.network](https://deposit.testnet.lukso.network)                       |
| Checkpoints              | [https://checkpoints.testnet.lukso.network](https://checkpoints.testnet.lukso.network)               |
| Blockscout API           | `https://api.explorer.execution.testnet.lukso.network/api`                                           |

The testnet network configs are defined or the [`lukso-network/network-configs`](https://github.com/lukso-network/network-configs/tree/main/testnet/shared) repo.

### 3rd party RPC providers

Developers can use the services of the following 3rd party providers:

- [Thirdweb](https://thirdweb.com/) RPC URL: `https://4201.rpc.thirdweb.com`
- [NowNodes](https://nownodes.io/) RPC URL: `https://lukso-testnet.nownodes.io` (requires API key)

We recommend developers to use these RPC providers over our public RPC URL as they provide better performance and stability.

## IPFS Storage

We highly recommend that developers fetch and store profile or asset data using **their own IPFS gateway** solutions like [Pinata](https://docs.pinata.cloud/docs/welcome-to-pinata) or [Infura](https://docs.infura.io/networks/ipfs), ensuring distribution and availability across the IPFS network. We do not provide an official gateway for uploading asset data. For development purposes, you may use the following RPC to fetch data:

- IPFS Download (for development only): `https://api.universalprofile.cloud/ipfs`

:::caution Availability

This gateway is intended for development purposes. We do not guarantee any SLA, and rate limits may apply.

:::

## Add LUKSO Testnet to Wallets

You can add the LUKSO Mainnet to any of your existing wallets like [MetaMask](https://metamask.io/), [Rabby](https://rabby.io/), [Rainbow](https://rainbow.me/), [Coinbase Wallet](https://www.coinbase.com/de/wallet), [Trust Wallet](https://trustwallet.com/de), and others using the following parameters or button:

| Setting               | Value                                             |
| --------------------- | ------------------------------------------------- |
| Network Name          | LUKSO Testnet                                     |
| RPC URL               | https://rpc.testnet.lukso.network (rate limited)  |
| Chain ID / Network ID | 4201                                              |
| Currency Symbol       | LYXt                                              |
| Block explorer URL    | https://explorer.execution.testnet.lukso.network/ |

<AddNetworkButton networkName="testnet"/>
