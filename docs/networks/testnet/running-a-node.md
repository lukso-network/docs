---
title: Running a node
sidebar_position: 2
---

:::info

If you want to become a genesis validator on mainnet, prepare your validator keys and deposit LYXe using our [Validator Deposit Launchpad](https://deposit.mainnet.lukso.network).

:::

:::info

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

:::warning

The LUKSO CLI is running natively on the node's operating system. We are currently working on providing an additional container setup via Docker to support running multiple blockchain networks on one single node. Containers will also allow running the LUKSO testnet and mainnet on one device.

:::

### Installing

:::info

Right now, the CLI can run devnets and our official testnet. Mainnet functionality and the related genesis files will be provided after the [Validator Deposit Launchpad](https://deposit.mainnet.lukso.network) has been frozen. The unlock will happen with anoter version update that has to be downloaded, overwriting the current version.

The current development state can be followed in the repository of the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli/).

:::

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

```bash
# within the working folder run
$ lukso install
```

### Running the testnet

The following command will spin up your execution and consensus client and connect to the public testnet.
You can see the running clients' status and logs using the `lukso status` and `lukso log execution` or `lukso log consensus` commands.

```bash
$ lukso start --testnet

# Check the status of runningh clients
$ lukso status

# Check the logs of a running client
$ lukso logs execution
# Or
$ lukso logs consensus

# Stop all running clients
$ lukso stop

```

### Documentation

For more details to the commands look at the [README of the LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli/blob/main/README.md).

## Need help?

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/lukso).
