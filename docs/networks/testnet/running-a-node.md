---
title: Running a node
sidebar_position: 2
---

:::info

This is a non working draft!
The Testnet of LUKSO has not started yet!

:::

# Run a node

LUKSO runs the Ethereum protocol, meaning most Ethereum clients will run the LUKSO Blockchain.

Currently tested execution clients are:

- [Ergion](https://github.com/ledgerwatch/erigon)
- [Geth](https://github.com/ethereum/go-ethereum)

Currently tested consensus clients are:

- [Lighthouse](https://github.com/sigp/lighthouse)
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

## Using the CLI

The LUKSO CLI allows you to install, run and manage clients that run the LUKSO network.
It also allows you to run clients as a validator.

### Installing

This will install the LUKSO CLI globally.

:::info

This is a non working draft!
The latest release of the CLI does not have our latest changes. [[PR 32](https://github.com/lukso-network/tools-lukso-cli/pull/32)]

:::

```bash
$ curl https://install.lukso.network | sh
```

### Initializing a working directory

Before installing the clients, you need to create and initialize a working folder to store configs, optional validator keys, and data of your clients.

```bash
# Change [folder_name] with the folder name you want
$ mkdir [folder_name]

# Change to the folder
$ cd ./[folder_name]

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
