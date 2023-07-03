---
sidebar_label: 'Update the Node'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update the Node

Updating your node and blockchain clients is from upmost importance. It is not just about having access to the latest features of the LUKSO CLI, but an essential aspect of maintaining the security, performance, and reliability of your node, directly affecting the network.

## Check your LUKSO CLI Version

:::info Breaking Changes

Since the mainnet launch occured, the LUKSO CLI had breaking changes from version `0.6` to `0.7`.

:::

Please check your current LUKSO CLI version to determine your update process.

```bash
$ lukso version
```

## Update the LUKSO CLI

Updating your node is similar to the installing process, while keeping your previous keystore and blockchain data. If you already have the latest LUKSO CLI version, you can also only update your [blockchain clients](#updating-the-blockchain-clients).

<Tabs>
  <TabItem value="update-v6" label="Update from Version 0.6">

#### Stop your Node

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

Move out of your old node's working directory.

```bash
$ cd ..
```

Next, create a new working directory for your updated node. Your old folder will exist as a backup for your configurations.

```bash
$ mkdir myNewLUKSOnode && cd myNewLUKSOnode
```

#### Update the LUKSO CLI

Re-install the LUKSO CLI to your system. You will be asked to overwrite the current version.

```bash
$ curl https://install.lukso.network | sh
```

Make sure to check the downloaded version again, to assure that the update was successful.

```bash
$ lukso version
```

#### Initialize the new Working Directory

Initializing your working folder will download the latest LUKSO network configurations and genesis files needed to sync with the network.

```bash
$ lukso init
```

#### Install the Latest Clients

After the initialization is successful, we must update the blockchain clients, managed by the LUKSO CLI under the hood.

```bash
$ lukso install
```

#### Copy the Network Data

Next, you can copy your blockchain data to the new folder. The blockchain data in your old folder will stay intact as a backup.

Make sure to adjust the commands using the actual name of the previous folder.

:::caution

Only copy over your network data if you want to use the exact same blockchain clients as you did before the update!

:::

```bash
# Copy Mainnet Node Data
$ cp -r ../myOldLUKSOnode/mainnet-data .

# Copy Testnet Node Data
$ cp -r ../myOldLUKSOnode/testnet-data .
```

#### Copy the Validator Keys

In case you are running a validator, you can also copy your keystore files to the new folder. The keystore data in your old folder will stay intact as a backup.

Make sure to adjust the commands using the actual name of the previous folder.

:::caution

Only copy over your network data if you want to use the exact same consensus client as you did before the update!

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
- setting the explorer page link
- adding a node name or graffitti
- adjusting your peer count

Please add them once again and make sure that these are in the correct format before starting your node.

:::

:::tip

You can also add the [checkpoint synchronization](../../networks/mainnet/running-a-node.md) flag as outlaid in the node setup guide.

:::

```bash
# Starting the Mainnet Node
$ lukso start

# Starting the Testnet Node
$ lukso start --testnet

# Starting the Mainnet Validator
$ lukso start --validator --transaction-fee-recipient "0x1234"

# Starting the Testnet Validator
$ lukso start --testnet --validator --transaction-fee-recipient "0x1234"
```

:::caution

In case you've copied over your blockchain and are getting an error during startup, please remove your blockchain data folder and start your node again. This will synchronize the network from scratch.

```bash
# Remove Mainnet Node Data
$ sudo rm -rf mainnet-data

# Remove Testnet Node Data
$ sudo rm -rf testnet-data
```

:::

:::info

After your node has properly syncronized with the network, you can remove the old working directory from your system.

:::

  </TabItem>
  <TabItem value="update-v7" label="Update from Version 0.7">

#### Stop your Node

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

#### Update the LUKSO CLI

Re-install the LUKSO CLI to your system. You will be asked to overwrite the current version.

```bash
$ curl https://install.lukso.network | sh
```

Make sure to check the downloaded version again, to assure that the update was successful.

```bash
$ lukso version
```

#### Restart your Node

You can start your node as regular. Please adjust your flags or the recipient address in case you are running a validator.

:::tip

You can also add the [checkpoint synchronization](../../networks/mainnet/running-a-node.md) flag as outlaid in the node setup guide.

:::

```bash
# Starting the Mainnet Node
$ lukso start

# Starting the Testnet Node
$ lukso start --testnet

# Starting the Mainnet Validator
$ lukso start --validator --transaction-fee-recipient "0x1234"

# Starting the Testnet Validator
$ lukso start --testnet --validator --transaction-fee-recipient "0x1234"
```

  </TabItem>
</Tabs>

## Update the Blockchain Clients

In case you are already using the Latest LUKSO CLI version and want to check for new blockchain client versions you can update them separately.

### Stop your Node

:::caution

In case you configured custom services on top of the LUKSO CLI, please make sure to use your service commands to stop your node.

:::

Move into your node's working directory.

```bash
$ cd myLUKSOnode
```

Stop all processes of the blockchain node.

```bash
$ lukso stop
```

Afterwards, you can check if your node stopped correctly.

```bash
$ lukso status
```

### Download new Clients

Then continue to check and update your configured blockchain clients.

```bash
$ lukso update
```

### Restart your Node

After you sucessfully installed the newest client versions, you can start your node as regular.

Please adjust your flags or the recipient address in case you are running a validator.

```bash
# Starting the Mainnet Node
$ lukso start

# Starting the Testnet Node
$ lukso start --testnet

# Starting the Mainnet Validator
$ lukso start --validator --transaction-fee-recipient "0x1234"

# Starting the Testnet Validator
$ lukso start --testnet --validator --transaction-fee-recipient "0x1234"
```
