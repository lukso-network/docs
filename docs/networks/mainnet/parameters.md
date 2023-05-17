---
title: 'Network parameters'
sidebar_position: 1
---

# Network Parameters

:::info

The Mainnet of LUKSO will start on Tuesday, 23rd May 2023 15:40:00 GMT (+ Genesis Delay -> 4:20pm GMT)

:::

| Setting                  | Value                                              |
| ------------------------ | -------------------------------------------------- |
| Network Name             | Mainnet                                            |
| Fork Version             | 0x42000001                                         |
| Chain ID / Network ID    | 42                                                 |
| Currency Symbol          | LYX                                                |
| Execution Block Explorer | <https://explorer.execution.mainnet.lukso.network> |
| Execution Status Page    | <https://stats.execution.mainnet.lukso.network>    |
| Consensus Block Explorer | <https://explorer.consensus.mainnet.lukso.network> |
| Consensus Status Page    | <https://stats.consensus.mainnet.lukso.network/>   |
| Launchpad                | <https://deposit.mainnet.lukso.network/>           |

The mainnet network configs are defined or the [`lukso-network/network-configs`](https://github.com/lukso-network/network-configs/tree/main/mainnet/shared) repo.

## Network Architecture

LUKSO's Blockchain Architecture runs the Ethereum protocol and consists of 2 to 4 clients:

- The consensus client running Casper the Friendly Finality Gadget (Casper FFG) plus LMD-GHOST fork choice algorithm ([More on the Gasper Consensus](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/))
- The execution client, [running the Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/ethereum-stack/)
