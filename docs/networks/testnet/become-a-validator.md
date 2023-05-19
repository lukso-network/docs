---
title: Become a Validator
sidebar_position: 3
---

## Become a Validator

Testnet validators are core members and organizations wanting to run and maintain their LUKSO Testnet node in a stable environment over a long period to ensure healthy uptimes, stability, and quick response times from clients as demand from developers rises.

If you want to become a whitelisted validator on our testnet, prepare your validator keys, set up your node environment, and contact [testnet-validators@lukso.network](mailto:testnet-validators@lukso.network).

![Testnet Launchpad](/img/network/testnet-launchpad.png)

After you become whitelisted, visit the official [Testnet Deposit Launchpad](https://deposit.testnet.lukso.network/) and cautiously generate the specified number of keys you are allowed. Then continue depositing your LYXt to them.

:::caution Genesis validators

As a validator, you need to import your validator deposit key (`keystore-xxx-[timestamp].json` files that you have generated using the [LUKSO Wagyu](https://github.com/lukso-network/tools-wagyu-key-gen) or [LUKSO CLI Keygen](https://github.com/lukso-network/tools-key-gen-cli) tools. Ensure you safely copy them to your node before starting the validator node.

:::

## Starting a Validator

As while running a regular node, you have multiple options to start your validator:

- **LUKSO CLI Validator**
- **Docker Compose Setup**
- **Configure a LUKSO Compatible Client**

Please refer to the regular [Node Guide](./running-a-node.md) that explains the differences between those setups and how to get the correct network configurations.

### LUKSO CLI Validator Node

Set up your regular node using the LUKSO CLI as described in the [Node Guide](./running-a-node.md).

#### Importing Validator Keys

If it is set up correctly and all clients are working, you can continue importing your validator keys into the validator wallet. You will be asked to set a new wallet password to store the imported deposit keys safely. Further, you must input your password for the deposit keys you want to import so that they can be encrypted and added to the wallet. The new keystore files will be stored under the `./myLUKSOnode/mainnet-keystore` directory.

```bash
$ lukso validator import --validator-keys "./path/to/your/keys/folder" --testnet
```

#### Checking Validator Keys

After importing one or multiple folders, you can check your imported keys.

```bash
lukso validator list --testnet
```

If the imported deposit keys match the ones in the original folder, you can delete them from your node machine.

#### Starting the Validator

After importing your keys, you can start the node with the validator functionality. If the node is already synced and running, the `lukso start` command will restart all clients automatically.

To start the validator, you have to pass a minimum of 2 flags:

- `--validator`: Will start the installed and configured clients including the validator
- `transaction-fee-recipient`: Specifies your transaction fee recipient address, which will receive all block rewards and tips from transactions. The address can be any EOA address you have control over on a wallet like MetaMask, Ledger, or any other wallet with the functionality to connect with LUKSO or custom networks.

> If you want to set custom flags to the start command, like the graffiti or a custom stat page connection, make sure to add them. You can find more information about passing options to the client on the official [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli).

:::note

The recipient fee address can also be different than the withdrawal credential you added to your validator key when you generated them. The withdrawal address is used to withdraw rewards and staked amounts connected to the consensus mechanism after the [Shapella](https://ethereum.org/en/history/) upgrade is implemented on the LUKSO Testnet.

:::

```bash
$ lukso start --validator --transaction-fee-recipient "0x1234..." --testnet
```

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
$ lukso logs validator --testnet
```

For more options, please check the [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli).

To enable more advanced monitoring for your node, you can check the official [`network-docker-monitoring`](https://github.com/lukso-network/network-docker-monitoring) repository with a step-by-step guide.

### Docker Validator Node

Our official Docker container provides a base template for images to run the LUKSO validator nodes. Make sure you have Docker and Docker Compose installed on your system.

Head over to the [network-docker-containers](https://github.com/lukso-network/network-docker-containers) repository from LUKSO and follow the installation process. You will have to clone the repository to your node machine and configure various properties, including the genesis files, deposit keys, and node name.

:::info

As the Testnet is already running, instead of adjusting the genesis files, you will have to configure the network parameters as described within the [network configs](https://github.com/lukso-network/network-configs) for the testnet.

:::

```bash
cd network-docker-containers && docker-compose up
```

For more information, please check the [LUKSO Docker Documentation](https://github.com/lukso-network/network-docker-containers).

To enable more advanced monitoring for your node, you can check the official [`network-docker-monitoring`](https://github.com/lukso-network/network-docker-monitoring) repository with a step-by-step guide.

### Custom Validator Node

If you are a pro user or want to set up the testnet node in a cloud environment, you can follow the instructions in the following repositories to manually configure the Ethereum clients:

- [Network Configurations](https://github.com/lukso-network/network-configs/)
- [Client Specifications](https://github.com/lukso-network/network-configs#binary-applications)

## Need Help?

Check the [Network FAQ](../faq/validator.md) section.

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/lukso).
