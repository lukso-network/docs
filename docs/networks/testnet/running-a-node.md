---
title: Running a node
sidebar_position: 2
---

:::info
Testnet validators are core members and organizations wanting to run and maintain their LUKSO Testnet node in a stable environment over a long period to ensure healthy uptimes, stability, and quick response times from clients as demand from developers rises.

If you want to become a whitelisted validator on our testnet, prepare your validator keys, set up your node environment, and contact [testnet-validators@lukso.network](mailto:testnet-validators@lukso.network).

:::

# Client Support

LUKSO runs the Ethereum protocol, meaning most Ethereum clients will run the LUKSO Blockchain.

Currently tested execution clients are:

- [Geth](https://github.com/ethereum/go-ethereum)

Currently tested consensus clients are:

- [Prysm](https://github.com/prysmaticlabs/prysm)

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

## Using the LUKSO CLI

The LUKSO CLI allows you to install, run and manage clients that run the LUKSO network.
It also allows you to run clients as a validator.

:::tip

The LUKSO CLI is running natively on the node's operating system. We are currently working on providing an additional container setup via Docker to support running multiple blockchain networks on one single node. Containers will also allow running the LUKSO testnet and mainnet on one device.

:::

### Installing

```bash
# Download the LUKSO CLI
$ curl https://install.lukso.network | sh
```

### Initializing a working directory

:::info

For extended documentation, please have a look at the [official LUKSO CLI documentation](https://github.com/lukso-network/tools-lukso-cli/#lukso-cli).

:::

Before installing the clients, you need to create and initialize a working directory to store configs, optional validator keys, and data of your clients.

```bash
# Change [directory_name] with the folder name you want
$ mkdir [directory_name]

# Change to the folder
$ cd ./[directory_name]

# Initialize the folder.
# Creates the necessary folder struture, and downloads all network configs from https://github.com/lukso-network/network-configs
$ lukso init
```

### Installing clients

Now you can install the clients that you wish to run. These clients will install globally but are set as default clients within your working directories config. So make sure to run it within the working folder.

:::info

If you want to run your node with validators, make sure to choose the `Prysm` consensus client as we do not support other validator clients right now.

:::

```bash
# within the working folder run
$ lukso install
```

### Running the testnet

The following command will spin up your execution and consensus client and connect to the public testnet.
You can see the running clients' status and logs using the `lukso status` and `lukso logs execution` or `lukso logs consensus` commands.

```bash
$ lukso start --testnet

# Check the status of running clients
$ lukso status

# Check the logs of the running testnet execution client
$ lukso logs execution --testnet

# Check the logs of the running testnet execution client
$ lukso logs consensus --testnet

# Stop all running clients
$ lukso stop

```

### Becoming a Testnet Validator

To become a validator, you need a whitelisted wallet address with a sufficient LYXt supply to set them up. Please have a look at the Testnet validator notice at the top of the page. After you became whitelisted, visit the official [Testnet Deposit Launchpad](https://deposit.testnet.lukso.network/) and cautiously go through the process of generating the specified amount of keys you are allowed. Then continue depositing your LYXt to them.

Within the LUKSO CLI, import your keys and start the node with the validator functionality. Make sure your working directory has been initialized and the blockchain clients installed.

```bash
# Import your key directory
$ lukso validator import

# Start the node as a validator
# Define your transaction fee wallet address
$ lukso start validator --validator --transaction-fee-recipient "0x1234..." --testnet
```

### Documentation

For more details to the commands look at the [README of the LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli/blob/main/README.md).

## Need help?

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/lukso).
