---
title: Running a node
sidebar_position: 2
---

# Running a node

:::info

⚠️ The Mainnet of LUKSO has not started yet!

💡 If you want to become a genesis validator on mainnet, prepare your validator keys and deposit LYXe using our [Validator Deposit Launchpad](https://deposit.mainnet.lukso.network).

:::

## The Network start process

LUKSO will start as a PoS Blockchain with an Initial Genesis Validator Set that anyone can join.

Once deployed on Ethereum, the Genesis Validator Smart contract will allow users to deposit LYXe and become Genesis Validators for LUKSO Mainnet. For each validator, you run, you must generate a validator key and deposit 32 LYXe. There will be no limit on the number of validators you can run.

Only become a Genesis Validator if you know how to run a node continuously 24/7. This is not delegated Proof of Stake!

### Becoming a Genesis Validator

The window for becoming a Genesis Validator will be around 3 weeks before launch (or longer if needed). At least **4,096 genesis validators** are ideal for the mainnet start. The Genesis Validator Deposit Smart Contract will be frozen once enough validator keys are registered. The freeze function of the Genesis Validator Contract has a 1-week delay to allow anyone a fair chance to participate.

:::note

### The staking deposit website

### 👉 <https://deposit.mainnet.lukso.network>

:::

:::note

### Genesis Validator Smart Contract Address on Ethereum

### 👉 [0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC)

:::

:::danger

Make sure to always double check the address and that the URL is hosted under **lukso.network**!  
👉 deposit.mainnet.**lukso.network**

:::

### Starting the network

Once the Genesis Validator Contract is frozen, participants can choose and download the two genesis files: `genesis.ssz` and `genesis.json` from the [deposit website](https://deposit.mainnet.lukso.network). These files will be the network’s starting point and determine the initial network state. The `genesis.ssz` will contain all Genesis Validator keys and the network start time, estimated to be 1 week after the Genesis Validator Contract freeze.

The second file, `genesis.json` contains the initial balances of the network. It will include the initial balances and total supply of LYX. The community will choose to set the initial supply at 35M, 42M (the LUKSO team's suggestion), or 100M.

Genesis Validators must run the network clients with the downloaded genesis files before the network's starting time. The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) will make this process easy and will be provided beforehand.

## Network Architecture

LUKSO's Blockchain Architecture runs the Ethereum protocol and consists of 2 to 4 clients:

- The consensus client running Casper the Friendly Finality Gadget (Casper FFG) plus LMD-GHOST fork choice algorithm ([More on the Gasper Consensus](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/))
- The execution client, [running the Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/ethereum-stack/)

If you are running a validating node, you will also run:

- The validator client, if you want to run a validating node
- The slasher client, if you want to run a validating node

## Client Support

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

### Running the mainnet

The following command will spin up your execution and consensus client and connect to the public testnet.
You can see the running clients' status and logs using the `lukso status` and `lukso logs execution` or `lukso logs consensus` commands.

```bash
$ lukso start

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

## Further Information

- [LUKSO Mainnet Start Process Update #1](https://medium.com/lukso/the-puzzle-comes-together-milestone-update-2022-7b69571f63a2)
- [LUKSO Mainnet Start Process Update #2](https://medium.com/lukso/lukso-mainnet-timeline-and-process-dd997fe811c8)
- [LUKSO Mainnet Start Process Update #3](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6)
- [Genesis Validators Deposit Smart Contract Freeze and Testnet Launch](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc)
