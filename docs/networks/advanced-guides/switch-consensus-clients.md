---
sidebar_label: 'Switch Consensus Clients'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Switching Consensus Clients

Having a variety of clients in a blockchain network and improving our client diversity is critically important.

Client diversity refers to utilizing different software clients in a blockchain network developed by various teams and in other programming languages.

- **Security and Resilience**: Client diversity increases the robustness of the network. If there's a bug in one client, it doesn't bring down the entire network because other clients can continue to operate. This decentralization and redundancy is a fundamental aspect of blockchain security and resilience.
- **Decentralization and Governance**: Client diversity promotes decentralization in the development and governance of the Ethereum network. It prevents any team or entity from having too much influence over the network's growth.

:::info

Most validator nodes on the LUKSO mainnet are running with Geth and Prysm. Node operators are responsible to ensure they split their client usage evenly to the extent of officially supported clients and validators.

:::

## Switching from Prysm to Lighthouse or Teku

:::caution Validator Keys

As a validator, you need to import your validator deposit key files (`keystore-xxx-[timestamp].json`) that you have generated using the [LUKSO Wagyu](https://github.com/lukso-network/tools-wagyu-key-gen) or [LUKSO CLI Keygen](https://github.com/lukso-network/tools-key-gen-cli) tools. Ensure you safely copy them to your node before switching to a new consensus client.

:::

#### Stop your Node

If you are currently running the Prysm consensus client, stop the clients before making any adjustments.

:::info Custom Setup

If you configured custom services on top of the LUKSO CLI, please use your service commands to stop your node.

:::

:::caution

In the examples below, the name `myLUKSOnode` has to be changed to your node directory's name.

:::

Move into your node's working directory.

```bash
cd myLUKSOnode
```

Make sure to stop all processes of the blockchain node.

```bash
lukso stop
```

Afterward, you can check if your node stopped correctly.

```bash
lukso status
```

#### Create a new Working Directory

Move out of your current node's working directory.

```bash
cd ..
```

Next, create a new working directory for your updated node. Your old folder will act as a backup for your previous configuration and keystore files.

```bash
mkdir myNewLUKSOnode && cd myNewLUKSOnode
```

#### Initialize the new Working Directory

Next, you can initialize your new working folder. The command will download the latest network configurations and genesis files to synchronize with the LUKSO blockchain.

```bash
lukso init
```

#### Install the Latest Clients

After the initialization is successful, we must install the new blockchain clients.

:::tip

To balance the network, it is recommended to use Erigon as execution and Lighthouse or Teku as consensus clients.

:::

```bash
lukso install
```

#### Importing Validator Keys

After the installation has been successful, you can continue importing your validator keys into the new validator wallet that will be used within the new consensus client. You will be asked to set a new wallet password to store the imported deposit keys safely. Further, you will have to input your password for the deposit keys, so that they can be encrypted and added to the wallet.

```bash
lukso validator import --validator-keys "./path/to/your/keys/folder"
```

#### Checking Validator Keys

After importing one or multiple folders, you can check your imported keys.

```bash
lukso validator list
```

If the imported deposit keys match the ones in the original folder, you can delete them from your node machine.

#### Start your new Node

You can start your node as regular. If you run your node as a validator, please adjust your flags or the recipient address.

:::info

In case you did any modifications to your configuration files, such as:

- configuring a Dynamic DNS
- connecting the blockchain explorer page
- adding a node name or graffiti
- adjusting your peer count

Please add them again and ensure these are in the correct format before starting your node.

You can follow the [extended node guide](https://github.com/fhildeb/lukso-node-guide/blob/main/6-blockchain-clients/README.md) or list of [further reads](../mainnet/running-a-node.md/#further-reads) for more information.

:::

:::caution

Wait 10 minutes after stopping your node so the network does not accuse you of slashing while using updated configurations.

:::

Start up your node using checkpoint synchronization to reduce your downtime while synchronizing with the network significantly. Fast synchronization speeds are essential if you run a validator node to avoid losing stake.

Your node will begin syncing from a recently finalized consensus checkpoint instead of genesis. It will then download the rest of the blockchain data while your consensus is already running. After the synchronization is finalized, you will end up with the equal blockchain data.

> You can use the flag on every startup. However, it shows the most significant effect when synchronizing from scratch or after an extended downtime.

<Tabs>
<TabItem value="checkpoint-sync" label="Checkpoint Synchronization">

:::info

If you are setting up a node for the testnet, add the `--testnet` flag to the start command.

:::

:::note

You will need the LUKSO CLI Version 0.8.0 or above in order to use the `--checkpoint-sync` command. If you are using an older version, please pass down the checkpoint flag as described in the [LUKSO CLI Documentation](https://github.com/lukso-network/tools-lukso-cli/tree/main#using-checkpoint-syncing).

:::

```sh
# Starting the Mainnet Node
lukso start --checkpoint-sync

# Starting the Mainnet Validator
lukso start --validator --transaction-fee-recipient "0x1234" --checkpoint-sync
```

  </TabItem>
  <TabItem value="regular-sync" label="Regular Synchronization">

:::caution

The normal synchronization process will take multiple hours for the node to finalize. It is not recommended if you are running a validator.

:::

:::info

If you are setting up a node for the testnet, add the `--testnet` flag to the start command.

:::

```bash
# Starting the Mainnet Node
lukso start

# Starting the Mainnet Validator
lukso start --validator --transaction-fee-recipient "0x1234"
```

  </TabItem>  
</Tabs>

:::info

After your node finalizes the synchronization with the network, you can remove the validator key folder and the old working directory.

:::
