---
title: Running a Node
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Running a Node

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

## Network Start

After the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) was frozen on the 9th of May ([read the article](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc)), LUKSO mainnet started as a PoS Blockchain on the 23rd of May 2023. The genesis deposit contract received 10.336 deposits from 223 unique addresses, as fetched from the contract's [Dune Analytics Board](https://dune.com/hmc/lukso-genesis-validators)). The network started with about 170 nodes.

## Supported Clients

LUKSO runs the Ethereum protocol, meaning most Ethereum clients will run the LUKSO Blockchain. The currently tested and supported clients are the following:

- **Execution Clients**: [Geth](https://geth.ethereum.org/), [Erigon](https://github.com/ledgerwatch/erigon)
- **Consensus Clients**: [Prysm](https://github.com/prysmaticlabs/prysm), [Lighthouse](https://github.com/sigp/lighthouse)
- **Validator Clients**: [Prysm](https://docs.prylabs.network/docs/how-prysm-works/prysm-validator-client), [Lighthouse](https://github.com/sigp/lighthouse)

:::info CLI Development

You can follow the latest development process on the official [LUKSO CLI repository](https://github.com/lukso-network/tools-lukso-cli/).

:::

## Starting a Node

To start your clients and contribute to the blockchain network, you have 4 options:

- **Install the LUKSO CLI**: The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) is a command line tool to install, manage and set up nodes and validators of different clients for the LUKSO blockchain. It provides simple and unified commands to interact with your node and runs natively on your operating system. We recommend this as default for anyone beginning to get into the topic of running a node himself. The LUKSO CLI is officially supported for Ubuntu, Debian, and Mac running on either x86 Intel and AMD Processors or Single Board ARM Computers.
- **Use LUKSO Docker Wizard**: [Docker Wizard](https://docker-factory.lukso.tech) is a perfect way to configure your own docker-compose file. With an easy-to-use user interface, running a fully configured LUKSO node is a matter of only few clicks. Editing the contents with a user interface makes it especially easy to configure a docker-compose file for any non-technical users, as every option will automatically be saved in the right place.
- **Use Docker Compose**: The official [Docker Containers](https://github.com/lukso-network/network-docker-containers) can make it easy for you if you're already experienced with the Docker ecosystem. Different configurations can be started in the blink of an eye and work in encapsulated containers. The versatility makes it especially useful if you want to run multiple networks on your node at once. The repository features extended documentation. By default, the Docker setup will run as a validator.
- **Configure a LUKSO Compatible Client**: You are in no way limited to the tools we provide for easy onboarding. If you are a pro user, you can download and run the Erigon, Geth, Lighthouse, or Prysm clients in your preferred setup. You can either [download](https://deposit.mainnet.lukso.network/) or [generate](https://github.com/lukso-network/tools-lodestar-genesis-ssz-generator/blob/spike/pos-from-the-start/packages/beacon-node/test/utils/README.md) the genesis files of the LUKSO network and configure your clients manually. Please refer to the respective [clients installation instructions](https://github.com/lukso-network/network-configs#binary-applications) and use the LUKSO [network configuration](https://github.com/lukso-network/network-configs/) repository to start your node.

### LUKSO CLI Node Setup

You can use the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) to prepare and run your LUKSO mainnet node. For further information, you can check out the official [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli/). It is not limiting yourself to running any supported clients, as all configurations and flags can be passed down. The guide will give you a brief introduction.

#### Install the LUKSO CLI

First, install the `lukso` command globally on your node machine.

```bash
curl https://install.lukso.network | sh
```

#### Create a Working Directory

:::tip

The name of the directory `myLUKSOnode/` in the commands below can be changed according to your preferences.

:::

Next, create a working directory for your node's data and move into it. The directory is where everything regarding your blockchain node will be stored. Make sure to choose a proper name for your node folder. If you plan on running a validator later, this folder will also contain your validator key files by default.

```bash
mkdir myLUKSOnode && cd myLUKSOnode
```

Initialize the working folder, which will download the LUKSO network configuration and genesis files needed to sync with the LUKSO network.

```bash
lukso init
```

#### Install the Clients

After the initialization is successful, we must download the blockchain clients, which will be managed from the CLI under the hood. They will install globally, need superuser permissions, and are set as default clients within your working directories configuration file. You will be asked which clients you want to download and install during the setup.

```bash
sudo lukso install
```

#### Setting your Public IP Address

Your public IP address is a unique identifier assigned to your internet connection by your service provider. Every device connected to the public internet is set as an IP address for communication with other devices.

To find other nodes in the network, your public IP should be exposed to build solid peer connections and download data more quickly. This Public IP value must be set within the consensus client configuration file that the CLI downloads from the [LUKSO Network Configuration](https://github.com/lukso-network/network-configs) repository.

<Tabs>
  <TabItem value="prysm-config" label="Prysm">

Within the node's working directory, open up the related configuration file with an editor of your choice:

:::info

If you are setting up a node for the testnet, make sure to modify the configuration file within the testnet folder `[PATH_TO_NODE_WORKING_DIRECTORY]/configs/testnet/prysm/prysm.yaml` instead.

:::

```text
[PATH_TO_NODE_WORKING_DIRECTORY]/configs/mainnet/prysm/prysm.yaml
```

There are two ways the IP can be configured within Prysm: Regular Host IPs or by using a Dynamic DNS address. Choose what address you are going to use within your setup. If you need further information, please have a look at the [Further Reads](#further-reads) section.

<Tabs>
<TabItem value="host-ip" label="Host IP">

Exchange the following sample IP address:

```text
p2p-host-ip: '0.0.0.0'
```

With your public IP address:

```text
p2p-host-ip: '<your-public-ip-address>'
```

</TabItem>
<TabItem value="host-dns" label="Host DNS">

Exchange the following sample IP address:

```text
p2p-host-ip: '0.0.0.0'
```

With the hostname property and address:

```text
p2p-host-dns: '<your-hostname-address>'
```

</TabItem>
</Tabs>

  </TabItem>
  <TabItem value="lighthouse-config" label="Lighthouse">

Within the node's working directory, open up the related configuration file with an editor of your choice:

:::info

If you are setting up a node for the testnet, make sure to modify the configuration file within the testnet folder `[PATH_TO_NODE_WORKING_DIRECTORY]/configs/testnet/prysm/prysm.yaml` instead.

:::

```text
[PATH_TO_NODE_WORKING_DIRECTORY]/configs/mainnet/lighthouse/lighthouse.toml
```

Exchange the following sample addresses:

```text
listen-address = "0.0.0.0"
enr-address = "0.0.0.0"
```

With your own public IP addresses:

```text
listen-address = "<your-public-ip-address>"
enr-address = "<your-public-ip-address>"
```

  </TabItem>
</Tabs>

#### Start the Clients

The following command will spin up your execution and consensus client and connect to the mainnet.

Without specifying any flags, the node starts its normal synchronization process.

If you want more convenience and your validator to operate quickly, you can also use checkpoints. Checkpoint synchronization is a feature that significantly speeds up the initial sync time of the consensus client. If enabled, your node will begin syncing from a recently finalized consensus checkpoint instead of genesis. It will then download the rest of the blockchain data while your consensus is already running.

> After the synchronization is finalized, you will end up with the equal blockchain data. You can use the flag on every startup. However, it shows the most significant effect when synchronizing from scratch or after an extended downtime. The shortcut is ideal for fresh installations, validator migration, or recovery.

<Tabs>
  <TabItem value="regular-sync" label="Regular Synchronization">

:::info

The synchronization process will take multiple hours for the node to finalize.

:::

```sh
lukso start
```

  </TabItem>  
  <TabItem value="checkpoint-sync" label="Checkpoint Synchronization">

:::tip

The shortcut is ideal for making installation, validator migration, or recovery much faster.

:::

:::info

If you are setting up a node for the testnet, add the `--testnet` flag to the start command.

:::

:::note

You will need the LUKSO CLI Version 0.8.0 or above in order to use the `--checkpoint-sync` command. If you are using an older version, please pass down the checkpoint flag as described in the [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli/tree/main#using-checkpoint-syncing).

:::

```sh
lukso start --checkpoint-sync
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

If you want to check any of the running clients in more detail, you can use the built-in logging command of the CLI. It will print out the current log messages of one client to the terminal screen.

```bash
# Viewing the logs of the execution client
lukso logs execution

# Viewing the logs of the consensus client
lukso logs consensus
```

For more options, please check the [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli).

To enable more advanced monitoring for your node, you can check the official [`network-docker-monitoring`](https://github.com/lukso-network/network-docker-monitoring) repository with a step-by-step guide.

## Need Help?

Check the [Network FAQ](../../faq/network/validators.md) section.

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/lukso).

## Further Reads

You can check out the following links for extended help or advice for setting up your node beyond the LUKSO CLI.

- [Extended Wiki and LUKSO Node Guide](https://github.com/fhildeb/lukso-node-guide) by Felix Hildebrandt
- [LUKSO Community Guides](https://docs.luksoverse.io/) by Luksoverse
- [ETHStaker Community Discord](https://discord.com/invite/ucsTcA2wTq) for running EVM Clients

## Further Network Information

- [LUKSO Mainnet Start Process Update #1](https://medium.com/lukso/the-puzzle-comes-together-milestone-update-2022-7b69571f63a2)
- [LUKSO Mainnet Start Process Update #2](https://medium.com/lukso/lukso-mainnet-timeline-and-process-dd997fe811c8)
- [LUKSO Mainnet Start Process Update #3](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6)
- [Genesis Validators Deposit and Testnet Launch](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc)
- [Genesis Validators, start your clients!](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba)
