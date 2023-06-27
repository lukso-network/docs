---
title: Running a Node
sidebar_position: 2
---

## System Requirements

| Settings            | Value          |
| ------------------- | -------------- |
| Operating System    | Linux or MacOS |
| Number of CPU cores | 4              |
| RAM                 | 16 GB          |
| SSD                 | 100 GB         |

## Ports

| Port  | Protocol | Client              | Description       |
| ----- | -------- | ------------------- | ----------------- |
| 30303 | TCP      | execution syncing   | port must be open |
| 30303 | UDP      | execution discovery | port must be open |
| 13000 | TCP      | consensus syncing   | port must be open |
| 12000 | UDP      | consensus discovery | port must be open |

## Supported Clients

LUKSO runs the Ethereum protocol, meaning most Ethereum clients will run the LUKSO Blockchain. The currently tested and supported clients are the following:

- **Execution Clients**: [Geth](https://geth.ethereum.org/), [Erigon](https://github.com/ledgerwatch/erigon)
- **Consensus Clients**: [Prysm](https://github.com/prysmaticlabs/prysm), [Lighthouse](https://github.com/sigp/lighthouse)
- **Validator Clients**: [Prysm](https://docs.prylabs.network/docs/how-prysm-works/prysm-validator-client), [Lighthouse](https://github.com/sigp/lighthouse)

:::info CLI Development

You can follow the latest development process on the official [LUKSO CLI repository](https://github.com/lukso-network/tools-lukso-cli/).

:::

## Starting Node

To start your clients and contribute to the LUKSO Testnet, you have 3 options:

- **Install the LUKSO CLI**: The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) is a command line tool to install, manage and set up nodes and validators of different clients for the LUKSO blockchain. It provides simple and unified commands to interact with your node and runs natively on your operating system. We recommend this as default for anyone beginning to get into the topic of running a node himself. The LUKSO CLI is officially supported for Ubuntu, Debian, and Mac running on either x86 Intel and AMD Processors or Single Board ARM Computers.
- **Use Docker Compose**: The official [Docker Containers](https://github.com/lukso-network/network-docker-containers) can make it easy for you if you're already experienced with the Docker ecosystem. Different configurations can be started in the blink of an eye and work in encapsulated containers. The versatility makes it especially useful if you want to run multiple networks on your node at once. The repository features extended documentation. By default, the Docker setup will run as a validator for the mainnet but can be modified.
- **Configure a LUKSO Compatible Client**: You are in no way limited to the tools we provide for easy onboarding. If you are a pro user, you can download and run the Erigon, Geth, Lighthouse, or Prysm clients in your preferred setup. You can either [download](https://deposit.mainnet.lukso.network/) or [generate](https://github.com/lukso-network/tools-lodestar-genesis-ssz-generator/blob/spike/pos-from-the-start/packages/beacon-node/test/utils/README.md) the genesis files of the LUKSO network and configure your clients manually. Please refer to the respective [clients installation instructions](https://github.com/lukso-network/network-configs#binary-applications) and use the LUKSO [network configuration](https://github.com/lukso-network/network-configs/) repository to start your node.

### LUKSO CLI Node Setup

For further information, you can check out the official [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli/). It is not limiting yourself to running any supported clients, as all configurations and flags can be passed down. The guide will give you a brief introduction.

#### Install the LUKSO CLI

First, install the `lukso` command globally on your node machine.

```bash
$ curl https://install.lukso.network | sh
```

#### Create a Working Directory

Next, create a working directory for your node's data and move into it. The directory is where everything regarding your blockchain node will be stored. Make sure to choose a proper name for your node folder. If you plan on running a validator later, this folder will also contain your validator key files by default.

```bash
$ mkdir myLUKSOnode && cd myLUKSOnode
```

Initialize the working folder, which will download the LUKSO network configuration and genesis files needed to sync with the LUKSO network.

```bash
$ lukso init
```

#### Install the Clients

After the initialization is successful, we have to download the blockchain clients, which will be managed from the CLI under the hood. They will install globally, need superuser permissions, and are set as default clients within your working directories configuration file. You will be asked which clients you want to download and install during the setup.

```bash
$ sudo lukso install
```

#### Setting your Public IP Address

Your public IP address is a unique identifier assigned to your internet connection by your service provider. Every device connected to the public internet is set as an IP address, used for communication to other devices.

In order to find other nodes in the network, your public IP should be exposed to build strong connections and download data more quickly. This Public IP value has to be set within the consensus client configuration file that the CLI is downloading from the [LUKSO Network Configuration](https://github.com/lukso-network/network-configs) repository.

The instructions for setting the Public IP Address are the same as for mainnet nodes. Please refer to the [Mainnet Node Guide](../mainnet/running-a-node.md).

#### Start the Clients

The following command will spin up your execution and consensus client and connect to the testnet.

Without specifying any further flags, the node is starting it's regular synchronization process.

If you want more convenience and your validator to operate quickly, you can also use checkpoints. The instructions are the same as for mainnet nodes. Please refer to the [Mainnet Node Guide](../mainnet/running-a-node.md).

```sh
lukso start --testnet
```

#### Checking Processes

To check that everything is running correctly, you can see the status of all your clients using the status command. By default, the validator is not enabled. If you want to run your validator node, please have a look at the [validator page](./become-a-validator.md).

```bash
$ lukso status

# INFO[0000] PID 39424 - Execution (geth): Running 🟢
# INFO[0000] PID 39430 - Consensus (prysm): Running 🟢
# INFO[0000] PID 39432 - Validator (validator): Stopped 🔘
```

If you want to check any of the running clients in more detail, you can use the built-in logging command of the CLI. It will print out the current log messages of one client to the terminal screen.

```bash
# Viewing the logs of the execution client
$ lukso logs execution --testnet

# Viewing the logs of the consensus client
$ lukso logs consensus --testnet
```

For more options, please check the [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli).

To enable more advanced monitoring for your node, you can check the official [`network-docker-monitoring`](https://github.com/lukso-network/network-docker-monitoring) repository with a step-by-step guide.

## Need Help?

Check the [Network FAQ](../faq/validator.md) section.

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/lukso).

## Further Reads

For extended help or advise for setting up your node beyond the LUKSO CLI, you can check out the following links.

- [Extended Wiki and LUKSO Node Guide](https://github.com/fhildeb/lukso-node-guide) by Felix Hildebrandt
- [LUKSO Community Guides](https://docs.luksoverse.io/) by Luksoverse
- [ETHStaker Community Discord](https://discord.com/invite/ucsTcA2wTq) for running EVM Clients

## Further Network Information

- [Genesis Validators Deposit and Testnet Launch](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc)
- [Genesis Validators, start your clients!](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba)
