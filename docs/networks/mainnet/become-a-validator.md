---
title: Become a Validator
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Become a validator

![Deposit Launchpad](/img/network/mainnet-launchpad.png)

To become a validator, you will need to use [LUKSO Deposit Launchpad](https://deposit.mainnet.lukso.network/) to deposit 32 LYX per validator. Once you have generated your keystore files (`keystore-xxx-[timestamp].json`) and deposited the LYX, you can adjust your node to run as a validator.

:::caution Validator Keys

As a validator, you need to import your validator deposit key files (`keystore-xxx-[timestamp].json`) that you have generated using the [LUKSO Wagyu](https://github.com/lukso-network/tools-wagyu-key-gen) or [LUKSO CLI Keygen](https://github.com/lukso-network/tools-key-gen-cli) tools. Ensure you safely copy them to your node before starting the validator node.

:::

## Starting a validator

Similar to running a regular node, you have multiple options to start your validator. Please refer to the regular [Node Guide](./running-a-node.md) that explains the differences between those setups and how to get the correct network configurations.

### 📦 With Dappnode

The [Dappnode tutorial](https://docs.dappnode.io/docs/user/staking/lukso/solo#2-creating-validator-keys-for-lukso) explains the process.

### 📟 With LUKSO CLI

Set up your regular node using the LUKSO CLI as described in the [Node Guide](./running-a-node.md).

#### Importing Validator Keys

:::tip

The name of the directory `myLUKSOnode/` in the example below can be changed according to your preferences.4

:::

If it is set up correctly and all clients are working, you can continue importing your validator keys into the validator wallet. You will be asked to set a new wallet password to store the imported deposit keys safely. Further, you will have to input your password for the deposit keys you want to import so that they can be encrypted and added to the wallet. The new keystore files will be stored under the `./myLUKSOnode/mainnet-keystore` directory.

```bash
lukso validator import --validator-keys "./path/to/your/keys/folder"
```

#### Checking Validator Keys

After importing one or multiple folders, you can check your imported keys.

```bash
lukso validator list
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

If you want more convenience and your validator to operate quickly, you can also use checkpoints. Checkpoint synchronization is a feature that significantly speeds up the initial sync time of the consensus client. If enabled, your node will begin syncing from a recently finalized consensus checkpoint instead of genesis. It will then download the rest of the blockchain data while your consensus is already running.

> After the synchronization is finalized, you will end up with the equal blockchain data. You can use the flag on every startup. However, it shows the most significant effect when synchronizing from scratch or after an extended downtime. The shortcut is ideal for fresh installations, validator migration, or recovery.

<Tabs>
  <TabItem value="regular-sync" label="Regular Synchronization">

:::info

The synchronization process will take multiple hours for the validator to participate in the consensus.

:::

```bash
lukso start --validator --transaction-fee-recipient "0x1234..."
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
# Starting the Mainnet Validator
lukso start --validator --transaction-fee-recipient "0x1234" --checkpoint-sync
```

  </TabItem>
</Tabs>

#### Checking Validator Logs

To check that everything is running correctly, you can see the status of all your clients using the status command.

```bash
lukso status

# INFO[0000] PID 39424 - Execution (geth): Running 🟢
# INFO[0000] PID 39430 - Consensus (prysm): Running 🟢
# INFO[0000] PID 39432 - Validator (validator): Running 🟢
```

In addition to the _consensus_ and _execution_ clients, you can now further check the validator logs using the LUKSO CLI:

```bash
# Viewing the logs of the validator client
lukso logs validator
```

For more options, please check the [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli).

To enable more advanced monitoring for your node, you can check the official [`network-docker-monitoring`](https://github.com/lukso-network/network-docker-monitoring) repository with a step-by-step guide.

### 🚢 With Docker

If you are using Docker images in your setup, you need to make sure you have activated the validator related options.

## Need Help?

Check the [Network FAQ](../../faq/network/validators.md) section.

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/lukso).

## Further Reads

You can check out the following links for extended help or advice for setting up your node beyond the LUKSO CLI.

- [Extended Wiki and LUKSO Node Guide](https://github.com/fhildeb/lukso-node-guide) by Felix Hildebrandt
- [LUKSO Community Guides](https://docs.luksoverse.io/) by Luksoverse
- [ETHStaker Community Discord](https://discord.com/invite/ucsTcA2wTq) for running EVM Clients
- [ETH Validator Watcher](https://github.com/kilnfi/eth-validator-watcher) potential alternative for monitoring
