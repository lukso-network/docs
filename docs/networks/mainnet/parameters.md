---
title: 'Network parameters'
sidebar_position: 1
---

# Network Parameters

:::info

The Mainnet of LUKSO will start on Tuesday, 23rd May 2023 15:40:00 GMT (+ Genesis Delay -> 4:20pm GMT)

:::

| Setting                  | Value                                    |
| ------------------------ | ---------------------------------------- |
| Network Name             | Mainnet                                  |
| New RPC URL              | -                                        |
| Websocket URL            | -                                        |
| Fork Version             | -                                        |
| Chain ID / Network ID    | 42                                       |
| Currency Symbol          | LYX                                      |
| Execution Block Explorer | -                                        |
| Execution Node list      | -                                        |
| Consensus Block Explorer | -                                        |
| Consensus Node list      | -                                        |
| Launchpad                | <https://deposit.mainnet.lukso.network/> |

## Network Architecture

LUKSO's Blockchain Architecture runs the Ethereum protocol and consists of 2 to 4 clients:

- The consensus client running Casper the Friendly Finality Gadget (Casper FFG) plus LMD-GHOST fork choice algorithm ([More on the Gasper Consensus](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/))
- The execution client, [running the Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/ethereum-stack/)

If you are running a validating node, you will also run:

- The validator client, if you want to run a validating node
- The slasher client, if you want to run a validating node
