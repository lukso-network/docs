---
title: Become a Validator
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Become a validator

:::info

The LUKSO Mainnet launched on Tuesday 23rd May, 4:20 PM GMT with validators that previously deposited to the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code). Becoming a validator is paused until the discovery month ends and the LYXe to LYX migration goes live. For more information, have a look into our Medium posts about the [LUKSO launch process](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6) and the [deposit contract freeze](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc).

:::

![Deposit Launchpad](/img/network/deposit-launchpad.png)

To become a validator, you can use the LUKSO Deposit Launchpad: <https://deposit.mainnet.lukso.network/>.

:::caution Validator Keys

As a validator, you need to import your validator deposit key (`keystore-xxx-[timestamp].json` files that you have generated using the [LUKSO Wagyu](https://github.com/lukso-network/tools-wagyu-key-gen) or [LUKSO CLI Keygen](https://github.com/lukso-network/tools-key-gen-cli) tools. Ensure you safely copy them to your node before starting the validator node.

:::

## Starting a validator

As while running a regular node, you have multiple options to start your validator:

- **LUKSO CLI Validator**
- **Docker Compose Setup**
- **Configure a LUKSO Compatible Client**

Please refer to the regular [Node Guide](./running-a-node.md) that explains the differences between those setups and how to get the correct network configurations.

### Using LUKSO CLI

Set up your regular node using the LUKSO CLI as described in the [Node Guide](./running-a-node.md).

#### Importing Validator Keys

If it is set up correctly and all clients are working, you can continue importing your validator keys into the validator wallet. You will be asked to set a new wallet password to store the imported deposit keys safely. Further, you will have to input your password for the deposit keys you want to import so that they can be encrypted and added to the wallet. The new keystore files will be stored under the `./myLUKSOnode/mainnet-keystore` directory.

```bash
$ lukso validator import --validator-keys "./path/to/your/keys/folder"
```

#### Checking Validator Keys

After importing one or multiple folders, you can check your imported keys.

```bash
$ lukso validator list
```

If the imported deposit keys match the ones in the original folder, you can delete them from your node machine.

#### Starting the Validator

After importing your keys, you can start the node with the validator functionality. If the node is already synced and running, the `lukso start` command will restart all clients automatically.

To start the validator, you have to pass a minimum of 2 flags:

- `--validator`: Will start the installed and configured clients, including the validator
- `--transaction-fee-recipient`: Specifies your transaction fee recipient address, which will receive all block rewards and tips from transactions. The address can be any EOA address you have control over on a wallet like MetaMask, Ledger, or any other wallet with the functionality to connect with LUKSO or custom networks.

> If you want to set custom flags to the start command, like the graffiti or a custom stat page connection, make sure to add them. You can find more information about passing options to the client on the official [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli).

:::note

The recipient fee address can also be different than the withdrawal credential you added to your validator key when you generated them. The withdrawal address is used to withdraw rewards and staked amounts connected to the consensus mechanism after the [Shapella](https://ethereum.org/en/history/) upgrade is implemented on the LUKSO blockchain. The feature is planned some months after the network launch.

:::

As only genesis validators can run the validator on a node, you must select your chosen initial supply for the LUKSO mainnet. More information can be found in the official [Mainnet Timeline](https://medium.com/lukso/lukso-mainnet-timeline-and-process-dd997fe811c8) article.

Without specifying any flags, the node starts its normal synchronization process.

If you want more convenience and your validator to operate quickly, you can also use checkpoints. Checkpoint synchronization is a feature that significantly speeds up the initial sync time of the consensus client. If enabled, your node will begin syncing from a recently finalized consensus checkpoint instead of genesis.

<Tabs>
  <TabItem value="regular-sync" label="Regular Synchronization">

:::info

The synchronization process will take multiple hours for the validator to participate in the consensus.

:::

```bash
$ lukso start --validator --transaction-fee-recipient "0x1234..."
```

  </TabItem>
    <TabItem value="checkpoint-sync" label="Checkpoint Synchronization">

:::info

The shortcut is ideal for making installation, validator migration, or recovery much faster.

:::

```sh
# Mainnet Checkpoint for Prysm Consensus Client
$ lukso start --validator --transaction-fee-recipient "0x1234..." --prysm-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network

# Mainnet Checkpoint for Lighthouse Consensus Client
$ lukso start --validator --transaction-fee-recipient "0x1234..." --lighthouse-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network
```

  </TabItem>
</Tabs>

#### Checking Validator Logs

To check that everything is running correctly, you can see the status of all your clients using the status command.

```bash
$ lukso status

# INFO[0000] PID 39424 - Execution (geth): Running 🟢
# INFO[0000] PID 39430 - Consensus (prysm): Running 🟢
# INFO[0000] PID 39432 - Validator (validator): Running 🟢
```

In addition to the _consensus_ and _execution_ clients, you can now further check the validator logs using the LUKSO CLI:

```bash
# Viewing the logs of the validator client
$ lukso logs validator
```

For more options, please check the [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli).

To enable more advanced monitoring for your node, you can check the official [`network-docker-monitoring`](https://github.com/lukso-network/network-docker-monitoring) repository with a step-by-step guide.

### Using Docker

Our official Docker container provides a base template for images to run the LUKSO validator nodes. Make sure you have Docker and Docker Compose installed on your system.

Head over to the [network-docker-containers](https://github.com/lukso-network/network-docker-containers) repository from LUKSO and follow the installation process. You will have to clone the repository to your node machine and configure various properties, including the genesis files, deposit keys, and node name.

After the configuration, you can automatically download, install, and start all node clients. Head into the repository and follow the instructions in the [README.md](https://github.com/lukso-network/network-docker-monitoring/blob/main/README.md)

To enable more advanced monitoring for your node, you can check the official [`network-docker-monitoring`](https://github.com/lukso-network/network-docker-monitoring) repository with a step-by-step guide.

### Using Custom configs

If you are a pro user or want to generate custom genesis files with a different genesis supply of the blockchain, you can follow the instructions in the following repositories:

- [Genesis File Generation Tool](https://github.com/lukso-network/tools-lodestar-genesis-ssz-generator/blob/spike/pos-from-the-start/packages/beacon-node/test/utils/README.md)
- [Network Configurations](https://github.com/lukso-network/network-configs/mainnet)
- [Client Specifications](https://github.com/lukso-network/network-configs#binary-applications)

## Need Help?

Check the [Network FAQ](../faq/validator.md) section.

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/lukso).

## Further Reads

You can check out the following links for extended help or advice for setting up your node beyond the LUKSO CLI.

- [Extended Wiki and LUKSO Node Guide](https://github.com/fhildeb/lukso-node-guide) by Felix Hildebrandt
- [LUKSO Community Guides](https://docs.luksoverse.io/) by Luksoverse
- [ETHStaker Community Discord](https://discord.com/invite/ucsTcA2wTq) for running EVM Clients
