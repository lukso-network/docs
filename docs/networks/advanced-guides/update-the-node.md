---
sidebar_label: 'Update the Node'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update the Node

Updating your node and blockchain clients is of utmost importance. It is not just about having access to the latest features of the LUKSO CLI, but an essential aspect of maintaining your node's security, performance, and reliability, directly affecting the network.

## Check your LUKSO CLI Version

:::caution Breaking Changes

Since the mainnet launch occurred, the LUKSO CLI had breaking changes. Please check your current LUKSO CLI version to determine your update process.

:::

```bash
lukso version
```

This guide will lead you through updating the LUKSO CLI to the **latest version**.

## Update the LUKSO CLI

Updating your node is similar to the installing process, while keeping your previous keystore data. If you already have the **latest LUKSO CLI version** and **network configs**, you can just [Update the Blockchain Clients](./update-clients.md).

#### Stop your Node

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

<details>
    <summary>Show how to force client shutdowns.</summary>

If you have problems stopping the node processes, you can force their shutdowns using the `pkill` command.

```bash
# Stop the Geth client
sudo pkill geth

# Stop the Erigon client
sudo pkill erigon

# Stop the Prysm client
sudo pkill prysm

# Stop the Prysm Validator client
sudo pkill validator

# Stop the Lighthouse and Lighthouse Validator clients
sudo pkill lighthouse

# Stop the Teku and Teku Validator clients
sudo pkill teku
```

</details>

<Tabs>
  <TabItem value="update-v08" label="Update from Version 0.8 or above">

#### Update the LUKSO CLI

Re-install the LUKSO CLI to your system. You will be asked to overwrite the current version.

```bash
curl https://install.lukso.network | sh
```

Make sure to check the downloaded version again to ensure that the update was successful.

```bash
lukso version
```

Then continue to download the latest network configurations.

:::info

The `lukso init` command will not overwrite any personal configurations.

:::

```bash
lukso init
```

  </TabItem>
    <TabItem value="update-v07" label="Update from Version 0.7 or below">

#### Create a new Working Directory

Move out of your current node's working directory.

```bash
cd ..
```

Next, create a new working directory for your updated node. Your old folder will act as a backup for your configuration and keystore files.

```bash
mkdir myNewLUKSOnode && cd myNewLUKSOnode
```

#### Update the LUKSO CLI

Re-install the LUKSO CLI to your system. You will be asked to overwrite the current version.

```bash
curl https://install.lukso.network | sh
```

Make sure to check the downloaded version again, ensuring that the update was successful.

```bash
lukso version
```

#### Initialize the new Working Directory

Next, you can initialize your new working folder. The command will download the latest network configurations and genesis files to synchronize with the LUKSO blockchain.

```bash
lukso init
```

#### Install the Latest Clients

After the initialization is successful, we must install the updated blockchain clients.

```bash
lukso install
```

#### Copy the Validator Keys

In case you are running a validator, you are able to copy your keystore files to the new folder. The keystore data in your old folder will act as a backup.

> Make sure to adjust the commands using the actual name of the previous folder instead of the placeholder.

:::caution

Only copy over your keystore data if you want to use the same consensus client as before the update. Otherwise, you would have to import your validator keys from scratch.

:::

```bash
# Copy Mainnet Node Data
cp -r ../myOldLUKSOnode/mainnet-keystore .

# Copy Testnet Node Data
cp -r ../myOldLUKSOnode/testnet-keystore .
```

#### Apply Configurations

In case you did any modifications to your configuration files, such as:

- configuring a Dynamic DNS
- connecting the blockchain explorer page
- adding a node name or graffiti
- adjusting your peer count

Please add them once again and make sure that these are in the correct format before starting your node.

You can follow the [extended node guide](https://github.com/fhildeb/lukso-node-guide/blob/main/6-blockchain-clients/README.md) or list of [further reads](../mainnet/running-a-node.md#further-reads) for more information.

:::caution

Wait 10 minutes after stopping your node so the network does not accuse you of slashing while using updated configurations.

:::

:::danger Backup

Keep your old working directory on your system until the new node setup fully synchronizes within the next step. It will reference your previous configuration in case something goes wrong.

:::

  </TabItem>
</Tabs>

#### Restart your Node

You can [start your node as regular](../mainnet/running-a-node.md#start-the-clients).

:::info

If you are starting your node in a fresh working directory or after being offline for a while, make sure to [add checkpoint synchronization](../mainnet/running-a-node.md#start-the-clients) to significantly speed up the synchronization during the startup.

:::
