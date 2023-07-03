---
sidebar_label: 'Switch Consensus Clients'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Switching Consensus Clients

Having a variety of clients in a blockchain network and improving our client diversity is critically important.

:::caution

Most majority of validator nodes on the LUKSO mainnet are running with Geth and Prysm. Let us tackle this together!

:::

## Client Diversity

Client diversity refers to utilizing different software clients in a blockchain network developed by various teams and in other programming languages.

- **Security and Resilience**: Client diversity increases the robustness of the network. If there's a bug in one client, it doesn't bring down the entire network because other clients can continue to operate. This decentralization and redundancy is a fundamental aspect of blockchain security and resilience.
- **Decentralization and Governance**: Client diversity promotes decentralization in the development and governance of the Ethereum network. It prevents any team or entity from having too much influence over the network's growth.

:::tip

Node operators need to ensure that we can split our client usage evenly to the extent of officially supported clients and validators.

:::

## Switching from Prysm to Lighthouse

:::caution Validator Keys

As a validator, you need to import your validator deposit key files (`keystore-xxx-[timestamp].json`) that you have generated using the [LUKSO Wagyu](https://github.com/lukso-network/tools-wagyu-key-gen) or [LUKSO CLI Keygen](https://github.com/lukso-network/tools-key-gen-cli) tools. Ensure you safely copied them to your node before starting to switch to a new consensus client.

:::

#### Stop your Node

If you are currently running the Prysm consensus client, make sure to stop the clients before doing any adjustments.

:::caution

In case you configured custom services on top of the LUKSO CLI, please make sure to use your service commands to stop your node.

:::

Move into your node's working directory.

```bash
$ cd myLUKSOnode
```

Make sure to stop all processes of the blockchain node.

```bash
$ lukso stop
```

Afterwards, you can check if your node stopped correctly.

```bash
$ lukso status
```

#### Create a new Working Directory

Move out of your current node's working directory.

```bash
$ cd ..
```

Next, create a new working directory for your updated node. Your old folder will exist as a backup for your previous configuration and keystore files.

```bash
$ mkdir myNewLUKSOnode && cd myNewLUKSOnode
```

#### Initialize the new Working Directory

Next, you can initialize your new working folder. The command will download the latest network configurations and genesis files needed to synchronize with the LUKSO blockchain.

```bash
$ lukso init
```

#### Install the Latest Clients

After the initialization is successful, we must install the new blockchain clients.

:::tip

Its recommended to use Erigon and Lighthouse, to directly address the two client majorities of Geth and Prysm.

:::

:::info

The previously installed blockchain clients will remain on your system. In case you want to use the same execution client as before, the LUKSO CLI will ask you to overwrite the software. Overwriting any clients with the latest version should not affect any previously created node folder.

:::

```bash
$ lukso install
```

#### Importing Validator Keys

After the installation has been successful, you can continue importing your validator keys into the new validator wallet that will be used within Lighthouse. You will be asked to set a new wallet password to store the imported deposit keys safely. Further, you will have to input your password for the deposit keys, so that they can be encrypted and added to the wallet.

```bash
$ lukso validator import --validator-keys "./path/to/your/keys/folder"
```

#### Checking Validator Keys

After importing one or multiple folders, you can check your imported keys.

```bash
$ lukso validator list
```

If the imported deposit keys match the ones in the original folder, you can delete them from your node machine.

#### Start your new Node

You can start your node as regular. Please adjust your flags or the recipient address in case you are running a validator.

:::info

In case you did any modifications to your configuration files, such as:

- configuring a Dynamic DNS
- setting the explorer page link
- adding a node name or graffitti
- adjusting your peer count

Please add them once again and make sure that these are in the correct format before starting your node.

:::

:::caution

Wait at least 10 minutes after having stopped your node, so the network does not accuse you of slashing, while using updated network configurations.

:::

Start up your node using checkpoint synchronization to reduce your downtime while synchronizing with the network significantly. Fast synchronization speeds are essential if you are running a validator node to avoid losing stake.

<Tabs>
<TabItem value="checkpoint-sync" label="Checkpoint Synchronization">

:::info

If you are updating your node for the testnet, make sure to exchange the mainnet checkpoint address with the testnet checkpoint address `https://checkpoints.testnet.lukso.network` and to add the `--testnet` flag to the start command.

:::

```sh
# Mainnet Node with Prysm Consensus Client
$ lukso start --prysm-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network

# Mainnet Node with Lighthouse Consensus Client
$ lukso start --lighthouse-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network

# Mainnet Validator with Prysm Consensus Client
$ lukso start --validator --transaction-fee-recipient "0x1234" --prysm-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network

# Mainnet Validator with Lighthouse Consensus Client
$ lukso start --transaction-fee-recipient "0x1234" --lighthouse-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network
```

  </TabItem>
  <TabItem value="regular-sync" label="Regular Synchronization">

:::caution

The regular synchronization process will take multiple hours for the node to finalize. It is not recommended if you are running a validator.

:::

:::info

If you are setting up a node for the testnet, make sure to add the `--testnet` flag to the start command.

:::

```bash
# Starting the Mainnet Node
$ lukso start

# Starting the Mainnet Validator
$ lukso start --validator --transaction-fee-recipient "0x1234"
```

  </TabItem>  
</Tabs>

:::info

After your node has properly syncronized with the network, you can remove the validator key folder, as well as the old working directory.

:::
