---
title: Running a node
sidebar_position: 2
---

# Running a node

:::info

⚠️ The LUKSO mainnet will start on Tuesday, 23rd May 2023 15:40:00 GMT (+ Genesis Delay -> 4:20pm GMT).

:::

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

## The Network start process

After the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) was frozen on the 9th of May ([read the article](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc)), LUKSO mainnet will start as a PoS Blockchain with the validators who deposited in the genesis contract. The genesis deposit contract received 10.336 deposits from 223 unique addresses ([source](https://dune.com/hmc/lukso-genesis-validators)).

## Become a validator

:::info

It is currently not possible to become a validator until the discovery month is over and the LYXe to LYX migration is live (more info in this [article](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc)).

:::

To become a validator, you can use the LUKSO launchpad: <https://deposit.mainnet.lukso.network/>.

### Starting the network

If you deposited in the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) you will need to set up your node before the network start date (Tuesday the 23rd of May - 4:20PM GMT). You have multiple options to start your node:

#### 😊 Option 1 [easy]: Using the LUKSO CLI

You can use the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) to prepare and run your LUKSO mainnet node. The [`README.md`](https://github.com/lukso-network/tools-lukso-cli/blob/main/README.md) has all the documentation related to the CLI, you are encouraged to check it to see all the available options.

##### Install the LUKSO Command Line Interface.

This will install the `lukso` command globally on your machine.

```bash
$ curl https://install.lukso.network | sh
```

##### Create a working folder.

This folder will later contain your chain data and validator keystore files (you can always change the location in the config files later).

```bash
$ mkdir myLUKSOnode && cd myLUKSOnode
```

Initialize the working folder, which will download the LUKSO network configuration and genesis files.

```bash
$ lukso init
```

##### Install the clients to run your node.

This will need to be run from within your working folder, so the `cli-config.yaml` can store your client preference for this folder. This needs to be run as a super user, as it will install the clients globally on your machine.

```bash
$ sudo lukso install
```

:::caution Genesis validators

As a Genesis Validator you need to import your Genesis Keys (`keystore-xxx-[timestamp].json` files) before starting your clients.

:::

This will decrypt the keys with the password you chose when generating them, and re-encrypt them with a new password you have to choose. These new keystore files will then be stored under `./myLUKSOnode/mainnet-keystore`

```bash
$ lukso validator import --validator-keys "./path/to/your/keys/folder"
```

To start as a validator you need to provide a transaction fee recipient address, which will receive all transaction fees that your validator will generate.

:::note

This can be a different address, than the withdrawal credential you added to your validator key when you generated them. It can be an EOA (not a Universal Profile smart contract address).

:::

The withdrawal credential receives the block reward for your validator. After running the command, you will be asked to enter your newly chosen validator password. You will also need to select the initial supply for the LUKSO mainnet (more information in [this article](https://medium.com/lukso/lukso-mainnet-timeline-and-process-dd997fe811c8)). Make sure to set your address where you will receive validator fees on startup.

```bash
$ lukso start --validator --transaction-fee-recipient "0x1234..."
```

To check that everything is running correctly, you can see the status of all your clients using:

```bash
$ lukso status

# INFO[0000] PID 39424 - Execution (geth): Running 🟢
# INFO[0000] PID 39430 - Consensus (prysm): Running 🟢
# INFO[0000] PID 39432 - Validator (validator): Running 🟢
```

If you want to check the logs of any of the running client you can use the `lukso logs` command and chose ONE of the clients (`execution`, `consensus` or `validator`) e.g.:

```bash
$ lukso logs execution
```

For more options, please check the [LUKSO CLI repository](https://github.com/lukso-network/tools-lukso-cli).

To enable more advanced monitoring tools, you can check the [`lukso-network/network-docker-monitoring`](https://github.com/lukso-network/network-docker-monitoring) repository.

#### 🙂 Option 2 [intermediate]: Using docker and docker compose

:::info

This setup will be released as soon as possible.

:::

#### 🤯 Option 3 [expert]: Using the genesis files

If you run the clients yourself, using the [network configs](https://github.com/lukso-network/network-configs/tree/main/mainnet) and not the LUKSO CLI, you can download the genesis files directly and start your clients accordingly. Select the genesis files which match your initial supply choice.

#### Generate the genesis files yourself

If you are pro, or want to generate custom genesis files with a different option from 35M, 42M or 100M, you can follow the instructions in the below [GitHub Repository](https://github.com/lukso-network/tools-lodestar-genesis-ssz-generator/blob/spike/pos-from-the-start/packages/beacon-node/test/utils/README.md) to generate them yourself.

## Client Support

LUKSO runs the Ethereum protocol, meaning most Ethereum clients will run the LUKSO Blockchain.

Currently tested execution clients are:

- [Geth](https://github.com/ethereum/go-ethereum)

Currently tested consensus clients are:

- [Prysm](https://github.com/prysmaticlabs/prysm)

## Need help?

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/lukso).

## Further Information

- [LUKSO Mainnet Start Process Update #1](https://medium.com/lukso/the-puzzle-comes-together-milestone-update-2022-7b69571f63a2)
- [LUKSO Mainnet Start Process Update #2](https://medium.com/lukso/lukso-mainnet-timeline-and-process-dd997fe811c8)
- [LUKSO Mainnet Start Process Update #3](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6)
- [Genesis Validators Deposit Smart Contract Freeze and Testnet Launch](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc)
- [Genesis Validators, start your clients!](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba)
