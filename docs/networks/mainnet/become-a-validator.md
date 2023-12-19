---
title: Become a Validator
sidebar_position: 3
---

# Become a validator

![Deposit Launchpad](/img/network/mainnet-launchpad.png)

To become a validator, you will need to use [LUKSO Deposit Launchpad](https://deposit.mainnet.lukso.network/) to deposit 32 LYX per validator. Once you have generated your keystore files (`keystore-xxx-[timestamp].json`) and deposited the LYX, you can adjust your node to run as a validator.

:::caution Validator Keys

As a validator, you need to import your validator deposit key files (`keystore-xxx-[timestamp].json`) that you have generated using the [LUKSO Wagyu](https://github.com/lukso-network/tools-wagyu-key-gen) or [LUKSO CLI Keygen](https://github.com/lukso-network/tools-key-gen-cli) tools. Ensure you safely copy them to your node before starting the validator node.

:::

## Node Setup

Similar to running a regular node, you have multiple options to start your validator. Please refer to the regular [Node Guide](./running-a-node.md) that explains the differences between those setups and how to get the correct network configurations.

### 📦 With Dappnode

The [Dappnode Tutorial](https://docs.dappnode.io/docs/user/staking/lukso/solo#2-creating-validator-keys-for-lukso) explains the process.

### 📟 With LUKSO CLI

Set up your regular node using the LUKSO CLI as described in the [Node Guide](./running-a-node.md).

#### Import the Validator Keys

:::tip

The name of the directory `myLUKSOnode` in the example below can be changed according to your preferences.

:::

If the node is set up correctly and all clients are running fine, you can continue importing your validator keys into the validator wallet. You will be asked to set a new wallet password to store the imported deposit keys safely. Further, you will have to input your password for the deposit keys you want to import so that they can be encrypted and added to the wallet. The new keystore files will be stored under the `./myLUKSOnode/mainnet-keystore` directory.

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

After importing your keys, you can start the node with the validator functionality. If the node is already synchronized and running, the `lukso start` command will restart all clients automatically.

To start the validator, you have to pass a minimum of 2 flags:

- `--validator`: Will start the installed and configured clients, including the validator
- `--transaction-fee-recipient`: Specifies your transaction fee recipient address, which will receive all block rewards and tips from transactions. The address can be any EOA address you have control over on a wallet like MetaMask, Ledger, or any other wallet with the functionality to connect with LUKSO or custom networks.

> If you want to set custom flags to the start command, like the graffiti or a custom stat page connection, you can find more information in the official [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli).

:::info

If you are starting your node in a fresh working directory or after being offline for a while, make sure to [add checkpoint synchronization](../mainnet/running-a-node.md#start-the-clients) to significantly speed up the synchronization during the startup.

:::

:::note

The recipient fee address can also be different than the withdrawal credential you added to your validator key when you generated them. The withdrawal address is used to withdraw rewards and staked amounts connected to the consensus mechanism.

:::

```bash
lukso start --validator --transaction-fee-recipient "0x1234..."
```

#### Checking Validator Logs

To check that everything is running correctly, you can see the status of all your clients using the status command.

```bash
lukso status

# INFO[0000] PID 39424 - Execution (geth): Running 🟢
# INFO[0000] PID 39430 - Consensus (prysm): Running 🟢
# INFO[0000] PID 39432 - Validator (validator): Running 🟢
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
