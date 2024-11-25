---
title: Running a Node
sidebar_position: 2
description: 'Run a Testnet LUKSO node with one of the three options: Dappnode, LUKSO CLI, or Docker.'
---

# Running a testnet node

:::info

Running a testnet node is very similar to running a mainnet node. Therefore, we recommend you to read the [mainnet version](../mainnet/running-a-node.md) first and to adjust the commands with the instructions provided here.

:::

:::info

In preparation for the [upcoming Dencun fork](https://luksovalidators.substack.com/p/preparing-for-the-dencun-fork) on LUKSO, we **highly recommend** node operators to [update their clients and network configurations](../advanced-guides/update-clients.md) based on the [latest supported clients](../mainnet/running-a-node.md#supported-clients-versions).

:::

## Starting a Node

To start your clients and contribute to the LUKSO testnet network, you have 3 options.

### 📟 With the LUKSO CLI

> **Difficulty:** Medium 🌶️🌶️

For the main information, please refer to the [mainnet version](../mainnet/running-a-node.md#-with-the-lukso-cli) of this article. The only difference to run a testnet node with the CLI is to append the `--testnet` flag to the commands:

:::info

If you are starting your node in a fresh working directory or after being offline for a while, make sure to [add the checkpoint synchronization flag](../mainnet/running-a-node.md#start-the-clients) to significantly speed up the synchronization during the startup.

:::

```sh
lukso start --testnet
```

For the logs:

```bash
# Viewing the logs of the execution client
lukso logs execution --testnet

# Viewing the logs of the consensus client
lukso logs consensus --testnet
```

For more options, check the [LUKSO CLI documentation](https://github.com/lukso-network/tools-lukso-cli).

### 🚢 With Docker

> **Difficulty:** Hard 🌶️🌶️🌶️

The process is similar to the [mainnet version](../mainnet/running-a-node.md#-with-docker). You will simply need to use the [testnet genesis files](https://github.com/lukso-network/network-configs/tree/main/testnet/shared) instead of the mainnet ones.

So, when fetching the genesis files, the command should look like this (`main` is replaced by `testnet`):

```bash
mkdir configs
wget -O ./configs/genesis.ssz https://raw.githubusercontent.com/lukso-network/network-configs/main/testnet/shared/genesis.ssz
wget -O ./configs/genesis.json https://raw.githubusercontent.com/lukso-network/network-configs/main/testnet/shared/genesis.json
wget -O ./configs/config.yaml https://raw.githubusercontent.com/lukso-network/network-configs/main/testnet/shared/config.yaml
```

### 📄 With your own clients

> **Difficulty:** Advanced 🌶️🌶️🌶️🌶️

The process is similar to the [mainnet version](../mainnet/running-a-node.md#-with-your-own-clients). You will have to use the files in the `testnet` folder instead of the `mainnet` folder.

:::info LUKSO Network configuration

👉 [https://github.com/lukso-network/network-configs/tree/main/testnet](https://github.com/lukso-network/network-configs/tree/main/testnet)

:::

## Need Help?

Check the [Network FAQ](../../faq/network/validators.md) section.

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/lukso).

## Further Reads

- [Genesis Validators Deposit and Testnet Launch](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc)
- [Genesis Validators, start your clients!](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba)
