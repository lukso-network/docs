---
sidebar_label: 'Update the Node'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update the Node

Updating your node and blockchain clients is of utmost importance. It is not just about having access to the latest features of the LUKSO CLI, but an essential aspect of maintaining your node's security, performance, and reliability, directly affecting the network.

## Check your LUKSO CLI Version

:::info Breaking Changes

Since the mainnet launch occurred, the LUKSO CLI had breaking changes from version `0.6` to `0.7`.

:::

Please check your current LUKSO CLI version to determine your update process.

```bash
$ lukso version
```

## Update the LUKSO CLI

Updating your node is similar to the installing process, while keeping your previous keystore data. If you already have the **latest LUKSO CLI version** and **network configs**, you can also just update your [blockchain clients](#updating-the-blockchain-clients).

<Tabs>
  <TabItem value="update-v6" label="Update from Version 0.6">

#### Stop your Node

:::caution

If you configured custom services on top of the LUKSO CLI, please use your service commands to stop your node.

:::

Move into your node's working directory.

```bash
$ cd myLUKSOnode
```

Make sure to stop all processes of the blockchain node.

```bash
$ lukso stop
```

Afterward, you can check if your node stopped correctly.

```bash
$ lukso status
```

If you have problems stopping the processes, please use the `pkill` command to force their shutdowns.

```bash
# Stop the Geth client
$ sudo pkill geth

# Stop the Erigon client
$ sudo pkill erigon

# Stop the Prysm client
$ sudo pkill prysm

# Stop the Prysm Validator client
$ sudo pkill validator

# Stop the Lighthouse and Lighthouse Validator clients
$ sudo pkill lighthouse
```

#### Create a new Working Directory

Move out of your current node's working directory.

```bash
$ cd ..
```

Next, create a new working directory for your updated node. Your old folder will act as a backup for your configuration and keystore files.

```bash
$ mkdir myNewLUKSOnode && cd myNewLUKSOnode
```

#### Update the LUKSO CLI

Re-install the LUKSO CLI to your system. You will be asked to overwrite the current version.

```bash
$ curl https://install.lukso.network | sh
```

Make sure to check the downloaded version again, ensuring that the update was successful.

```bash
$ lukso version
```

#### Initialize the new Working Directory

Next, you can initialize your new working folder. The command will download the latest network configurations and genesis files to synchronize with the LUKSO blockchain.

```bash
$ lukso init
```

#### Install the Latest Clients

After the initialization is successful, we must install the updated blockchain clients.

```bash
$ lukso install
```

#### Copy the Validator Keys

In case you are running a validator, you are able to copy your keystore files to the new folder. The keystore data in your old folder will act as a backup.

> Make sure to adjust the commands using the actual name of the previous folder instead of the placeholder.

:::caution

Only copy over your keystore data if you want to use the same consensus client as before the update. Otherwise, you would have to import your validator keys from scratch.

:::

```bash
# Copy Mainnet Node Data
$ cp -r ../myOldLUKSOnode/mainnet-keystore .

# Copy Testnet Node Data
$ cp -r ../myOldLUKSOnode/testnet-keystore .
```

#### Restart your Node

You can start your node as regular. Please adjust your flags or the recipient address in case you are running a validator.

:::info

In case you did any modifications to your configuration files, such as:

- configuring a Dynamic DNS
- connecting the blockchain explorer page
- adding a node name or graffiti
- adjusting your peer count

Please add them once again and make sure that these are in the correct format before starting your node.

:::

:::caution

Wait 10 minutes after stopping your node so the network does not accuse you of slashing while using updated configurations.

:::

Start up your node using checkpoint synchronization to reduce your downtime while synchronizing with the network significantly. Fast synchronization speeds are essential if you run a validator node to avoid losing stake.

<Tabs>
<TabItem value="checkpoint-sync" label="Checkpoint Synchronization">

:::info

If you are setting up a node for the testnet, add the `--testnet` flag to the start command.

:::

```sh
# Starting the Mainnet Node
$ lukso start --checkpoint-sync

# Starting the Mainnet Validator
$ lukso start --validator --transaction-fee-recipient "0x1234" --checkpoint-sync
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
$ lukso start

# Starting the Mainnet Validator
$ lukso start --validator --transaction-fee-recipient "0x1234"
```

  </TabItem>  
</Tabs>

:::info

After your node has finalized the synchronization with the network, you can remove the old working directory from your system.

:::

  </TabItem>
  <TabItem value="update-v7" label="Update from Version 0.7">

#### Stop your Node

:::caution

If you configured custom services on top of the LUKSO CLI, please use your service commands to stop your node.

:::

Move into your node's working directory.

```bash
$ cd myLUKSOnode
```

Make sure to stop all processes of the blockchain node.

```bash
$ lukso stop
```

Afterward, you can check if your node stopped correctly.

```bash
$ lukso status
```

#### Remove outdated Blockchain Data

If the processes have been stopped successfully, you can continue to remove the old network data.

```bash
# Remove Mainnet Data
$ rm -rf mainnet-data

# Remove Testnet Data
$ rm -rf testnet-data
```

#### Backup outdated Configuration

Next, you can rename your configuration folder to reload the latest network files later on.

```bash
$ mv configs/ configs-backup
```

#### Update the LUKSO CLI

Re-install the LUKSO CLI to your system. You will be asked to overwrite the current version.

```bash
$ curl https://install.lukso.network | sh
```

Make sure to check the downloaded version again to ensure that the update was successful.

```bash
$ lukso version
```

#### Re-initialize the Working Directory

Next, you can re-download the latest network configurations and genesis files.

```bash
$ lukso init
```

#### Install the Latest Clients

After updating the LUKSO CLI, we must install the updated blockchain clients.

```bash
$ lukso install
```

#### Restart your Node

You can start your node as regular. If you run a validator, please adjust your flags or the recipient address.

:::info

In case you did any modifications to your configuration files, such as:

- configuring a Dynamic DNS
- connecting the blockchain explorer page
- adding a node name or graffiti
- adjusting your peer count

Please add them again and ensure these are in the correct format before starting your node.

:::

:::caution

Wait 10 minutes after stopping your node so the network does not accuse you of slashing while using updated configurations.

:::

Start up your node using checkpoint synchronization to reduce your downtime while synchronizing with the network significantly. Fast synchronization speeds are essential if you run a validator node to avoid losing stake.

<Tabs>
<TabItem value="checkpoint-sync" label="Checkpoint Synchronization">

:::info

If you are setting up a node for the testnet, add the `--testnet` flag to the start command.

:::

```sh
# Starting the Mainnet Node
$ lukso start --checkpoint-sync

# Starting the Mainnet Validator
$ lukso start --validator --transaction-fee-recipient "0x1234" --checkpoint-sync
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
$ lukso start

# Starting the Mainnet Validator
$ lukso start --validator --transaction-fee-recipient "0x1234"
```

  </TabItem>  
</Tabs>

:::info

After your node has finalized the synchronization with the network, you can remove the `configs-backup` folder from your system.

:::

  </TabItem>
</Tabs>

## Update the Blockchain Clients

If you already use the **latest LUKSO CLI version** and **network configuration** but want to check for new blockchain client versions, you can update them separately.

### Stop your Node

:::caution

If you configured custom services on top of the LUKSO CLI, please use your service commands to stop your node.

:::

Move into your node's working directory.

```bash
$ cd myLUKSOnode
```

Stop all processes of the blockchain node.

```bash
$ lukso stop
```

Afterward, you can check if your node stopped correctly.

```bash
$ lukso status
```

### Download new Clients

Then continue to check and update your configured blockchain clients.

```bash
$ lukso update
```

#### Restart your Node

You can start your node as regular. If you run a validator, please adjust your flags or the recipient address.

Start up your node using checkpoint synchronization to reduce your downtime while synchronizing with the network significantly. Fast synchronization speeds are essential if you run a validator node to avoid losing stake.

<Tabs>
<TabItem value="checkpoint-sync" label="Checkpoint Synchronization">

:::info

If you are setting up a node for the testnet, add the `--testnet` flag to the start command.

:::

```sh
# Starting the Mainnet Node
$ lukso start --checkpoint-sync

# Starting the Mainnet Validator
$ lukso start --validator --transaction-fee-recipient "0x1234" --checkpoint-sync
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
$ lukso start

# Starting the Mainnet Validator
$ lukso start --validator --transaction-fee-recipient "0x1234"
```

  </TabItem>  
</Tabs>
