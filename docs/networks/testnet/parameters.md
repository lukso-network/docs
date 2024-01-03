---
title: 'Network parameters'
sidebar_position: 1
description: 'Network Parameters for LUKSO Testnet: Execution Block Explorer, RPC providers, Chain ID, LUKSO Testnet faucet.'
---

import AddNetworkButton from '../../../src/components/AddNetworkButton'

# Testnet

The Public Testnet runs alongside the LUKSO mainnet for developers to test dApps and forks before they move to the mainnet.

## Network Parameters

| Setting                  | Value                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Network Name             | Testnet                                                                                                      |
| Fork Version             | 0x42010001                                                                                                   |
| Chain ID / Network ID    | 4201                                                                                                         |
| Currency Symbol          | LYXt                                                                                                         |
| RPC URL                  | [https://rpc.testnet.lukso.network](https://rpc.testnet.lukso.network)                                       |
| Websocket RPC URL        | [wss://ws-rpc.testnet.lukso.network](wss://ws-rpc.testnet.lukso.network)                                     |
| Execution Block Explorer | [https://explorer.execution.testnet.lukso.network](https://explorer.execution.testnet.lukso.network)         |
| Blockscout API           | [https://explorer.execution.testnet.lukso.network/api](https://explorer.execution.testnet.lukso.network/api) |
| Execution Status Page    | [https://stats.execution.testnet.lukso.network](https://stats.execution.testnet.lukso.network)               |
| Consensus Block Explorer | [https://explorer.consensus.testnet.lukso.network](https://explorer.consensus.testnet.lukso.network)         |
| Consensus Status Page    | [https://stats.consensus.testnet.lukso.network](https://stats.consensus.testnet.lukso.network)               |
| Faucet                   | [https://faucet.testnet.lukso.network](https://faucet.testnet.lukso.network)                                 |
| Launchpad                | [https://deposit.testnet.lukso.network](https://deposit.testnet.lukso.network)                               |
| Checkpoints              | [https://checkpoints.testnet.lukso.network](https://checkpoints.testnet.lukso.network)                       |

The testnet network configs are defined or the [`lukso-network/network-configs`](https://github.com/lukso-network/network-configs/tree/main/testnet/shared) repo.

### 3rd party RPC providers

Developers can use the services of the following 3rd party providers:

- [Gateway.fm](https://gateway.fm/) RPC URL: `https://rpc.testnet.lukso.gateway.fm`
- [NowNodes](https://nownodes.io/) RPC URL: `https://lukso-testnet.nownodes.io`
- [Thirdweb](https://thirdweb.com/) RPC URL: `https://lukso-testnet.rpc.thirdweb.com`

We recommend developers to use these RPC providers over our public RPC URL as they provide better performance and stability.

## IPFS Storage

Developers can use the following RPC in order to fetch and store profile or asset data:

- IPFS Download: `https://api.universalprofile.cloud/ipfs`
- IPFS Upload: `api.2eff.lukso.dev`
- Gateway Port: `443`

## Add LUKSO Testnet (MetaMask...)

<AddNetworkButton networkName="testnet"/>
