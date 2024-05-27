---
title: Running a Node
sidebar_position: 2
description: 'Run a Mainnet LUKSO node with one of the three options: Dappnode, LUKSO CLI, or Docker.'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::success Node operators mailing list

Join the [LUKSO node operators mailing list](https://luksovalidators.substack.com/) to stay up to date with important and critical updates.

:::

# Running a mainnet Node

Anyone is welcome to participate in the LUKSO network by running her/his own node. On this page, you will find the relevant information to configure and start your node. If you wish to [stake LYX](https://deposit.mainnet.lukso.network/en/) and run a validator node, you can check the [Become a Validator page](./become-a-validator.md).

<div style={{textAlign: 'center'}}>
<img
    width="600px"
    src="/img/lukso-mainnet-genesis-nodes.png"
    alt="A map fo the LUKSO mainnet network with genesis validators."
/><br/>
<i>Map of the LUKSO genesis validators from the <a href="https://stats.execution.mainnet.lukso.network/">execution stats website</a> - 19.09.23</i>.
</div>

## System Requirements

The system requirements will depend on the clients you are running. Please refer to the client specs for detailed information. Also, as the LUKSO blockchain is relatively new and small, you will be able to use a smaller SSD for storage as for other chains.

| Settings            | Value          |
| ------------------- | -------------- |
| Operating System    | Linux or macOS |
| Number of CPU cores | 4              |
| RAM                 | 16 GB          |
| SSD (NVMe)          | 100 GB         |

## Supported clients versions

The LUKSO network currently supports the following clients versions:

| Client     | Version  | Release                                                       |
| ---------- | -------- | ------------------------------------------------------------- |
| Geth       | v1.13.15 | https://github.com/ethereum/go-ethereum/releases/tag/v1.13.15 |
| Erigon     | v2.59.3  | https://github.com/ledgerwatch/erigon/releases/tag/v2.59.3    |
| Prysm      | v4.2.1   | https://github.com/prysmaticlabs/prysm/releases/tag/v4.2.1    |
| Lighthouse | v5.1.3   | https://github.com/sigp/lighthouse/releases/tag/v5.1.3        |
| Teku       | v24.4.0  | https://github.com/Consensys/teku/releases/tag/24.4.0         |

:::info

In preparation for the [upcoming Dencun fork](https://luksovalidators.substack.com/p/preparing-for-the-dencun-fork) on LUKSO, we **highly recommend** node operators to [update their clients and network configurations](../advanced-guides/update-clients.md).

:::

:::caution

Running newer versions of the clients can potentially lead to validation issues, loss of funds, or even a validator slash.

:::

## Starting a Node

To start your clients and contribute to the LUKSO network, you have 4 options.

### 📦 With Dappnode

Difficulty: Easy 🌶️

![dappnode screenshot](https://docs.dappnode.io/assets/images/lukso-staking-screenshot-605e7ed6329f5a73b11a6b8cc4015c9c.png)

LUKSO has partnered with [Dappnode](https://dappnode.com/) ([announcement](https://twitter.com/DAppNode/status/1696550569249218972)) to provide easy access for solo stakers/node runners.

👉 All the information are available in the [Dappnode docs](https://docs.dappnode.io/docs/user/staking/lukso/solo).

### 📟 With the LUKSO CLI

Difficulty: Medium 🌶️🌶️

The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) is a command line tool to install, manage and set up nodes and validators of different clients for the LUKSO blockchain. It provides simple and unified commands to interact with your node and runs natively on your operating system. The LUKSO CLI is officially supported for Ubuntu, Debian and macOS running on either x86 Intel and AMD Processors or Single Board ARM Computers.

For further information, you can check out the official [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli/). It does not stop you from running any supported clients, all configurations and flags can be passed down.

#### Install the LUKSO CLI

First, install the `lukso` command globally on your node machine.

```bash
curl https://install.lukso.network | sh
```

#### Create a working directory

:::tip

The name of the directory `myLUKSOnode` in the commands below can be changed according to your preferences.

:::

Next, create a working directory for your node's data and move into it. The directory is where everything regarding your blockchain node will be stored. Make sure to choose a proper name for your node folder. If you plan on running a validator later, this folder will also contain your validator key files by default.

```bash
mkdir myLUKSOnode && cd myLUKSOnode
```

Initialize the working folder, which will download the LUKSO network configuration and genesis files needed to sync with the LUKSO network.

```bash
lukso init
```

:::tip Sudo mode

Depending on your configuration and permissions, you might need to run the commands as super user with the `sudo` command.

:::

#### Install the clients

After the initialization is successful, you must download the blockchain clients, which will be managed from the CLI under the hood. They will be installed globally, need superuser permissions, and are set as default clients within your working directories configuration file. You will be asked which clients you want to download and install during the setup.

```bash
lukso install
```

#### Start the clients

The following command will spin up your execution and consensus client and connect to the mainnet.

Without specifying any flags, the node starts the regular synchronization process.

If you want more convenience and your validator to operate quickly, you can also use checkpoints. Checkpoint synchronization is a feature that significantly speeds up the initial sync time of the consensus client. If enabled, your node will begin syncing from a recently finalized consensus checkpoint instead of genesis. It will then download the rest of the blockchain data while your consensus is already running.

> After the synchronization is finalized, you will end up with the equal blockchain data. You can use the flag on every startup. However, it shows the most significant effect when synchronizing from scratch or after an extended downtime. The shortcut is ideal for fresh installations, validator migration, or recovery.

<Tabs>
  <TabItem value="checkpoint-sync" label="Checkpoint Synchronization">

:::tip

The shortcut is ideal for making installation, validator migration, or recovery much faster.

:::

:::info

You will need the LUKSO CLI Version 0.8.0 or above in order to use the `--checkpoint-sync` command. If you are using an older version or run into issues, please pass down the checkpoint flag manually, as described in the [LUKSO CLI Checkpoint Documentation](https://github.com/lukso-network/tools-lukso-cli/tree/main#using-checkpoint-syncing).

:::

```sh
lukso start --checkpoint-sync
```

  </TabItem>
  <TabItem value="regular-sync" label="Regular Synchronization">

:::caution Sync Delay

The synchronization process will take multiple hours for the node to finalize.

:::

```sh
lukso start
```

  </TabItem>  
</Tabs>

#### Checking Processes

To check that everything is running correctly, you can see the status of all your clients using the status command. By default, the validator is not enabled. If you want to run your validator node, please have a look at the [validator page](./become-a-validator.md).

```bash
lukso status

# INFO[0000] PID 39424 - Execution (geth): Running 🟢
# INFO[0000] PID 39430 - Consensus (prysm): Running 🟢
# INFO[0000] PID 39432 - Validator (validator): Stopped 🔘
```

The status command can also be used to check the connectivity to other node machines within the network, measuring active communication channels:

```bash
lukso status peers

# INFO[0000] Execution (Geth): Outbound: 28 | Inbound: 15 🟢
# INFO[0000] Consensus (Prysm): Outbound: 36 | Inbound: 21 🟢
```

:::info

Both _lukso status_ commands are fetching information from your node in real-time and can change any time. In order to monitor the peers of the execution client, you may need to [enable the API's admin namespace](https://github.com/lukso-network/tools-lukso-cli?tab=readme-ov-file#status-peers) within your client configuration.

:::

To check running clients in more detail, you can use the built-in logging command of the CLI. It will print out the current log messages of one client.

```bash
# Viewing the logs of the execution client
lukso logs execution

# Viewing the logs of the consensus client
lukso logs consensus
```

For more options, please check the [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli).

To enable more advanced monitoring for your node, you can check the official [`network-docker-monitoring`](https://github.com/lukso-network/network-docker-monitoring) repository with a step-by-step guide.

### 🚢 With Docker

Difficulty: Hard 🌶️🌶️🌶️

We provide a basic repository with examples of `docker-compose.yml` files to run the LUKSO network.

:::info

👉 [https://github.com/lukso-network/network-docker-containers](https://github.com/lukso-network/network-docker-containers)

:::

We also created a "docker factory" web interface which allows you to generate your own `docker-compose.yml` files.

:::tip LUKSO Docker Factory

👉 [https://docker-factory.lukso.tech](https://docker-factory.lukso.tech)

:::

### 📄 With your own clients

Difficulty: Advanced 🌶️🌶️🌶️🌶️

You are in no way limited to the tools we provide. If you are a pro user, you can download and run the Erigon, Geth, Lighthouse, Prysm or any other clients in your preferred setup. Please refer to the LUKSO [network configuration](https://github.com/lukso-network/network-configs/) repository to configure and start your node.

:::info LUKSO Network configuration

👉 [https://github.com/lukso-network/network-configs](https://github.com/lukso-network/network-configs)

:::

## Need Help?

Check the [Network FAQ](../../faq/network/validators.md) section.

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/lukso).

## Further Reads

- [LUKSO Mainnet Start Process Update #1](https://medium.com/lukso/the-puzzle-comes-together-milestone-update-2022-7b69571f63a2)
- [LUKSO Mainnet Start Process Update #2](https://medium.com/lukso/lukso-mainnet-timeline-and-process-dd997fe811c8)
- [LUKSO Mainnet Start Process Update #3](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6)
- [Genesis Validators Deposit and Testnet Launch](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc)
- [Genesis Validators, start your clients!](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba)

You can check out the following links for extended help or advice for setting up your node:

- [Extended Wiki and LUKSO Node Guide](https://github.com/fhildeb/lukso-node-guide) by Felix Hildebrandt
- [LUKSO Community Guides](https://docs.luksoverse.io/) by Luksoverse
- [ETHStaker Community Discord](https://discord.com/invite/ucsTcA2wTq) for running EVM Clients
