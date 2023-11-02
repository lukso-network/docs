---
sidebar_label: 'Update the Clients'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update the Clients

If you already use the **latest LUKSO CLI version** and **network configuration** but want to check for new blockchain client versions, you can update them separately.

## Stop your Node

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

Stop all processes of the blockchain node.

```bash
lukso stop
```

Afterward, you can check if your node stopped correctly.

```bash
lukso status
```

## Download new Clients

Then continue to check and update your configured blockchain clients.

```bash
# Updates all clients to the latest version
lukso update
```

:::info Individual Installation

```bash
# Manually overwrite Geth Version
lukso install --geth-tag v1.12

# Manually overwrite Prysm Version
lukso install --prysm-tag v4.0.8

# Manually overwrite Lighthouse Version
lukso install --lighthouse-tag v4.1.0

# Manually overwrite Erigon Version
lukso install ---erigon-tag v2.52.1

# Manually overwrite Teku Version
lukso install ---teku-tag v23.10.0
```

:::

## Restart your Node

You can start your node as regular. If you run a validator, please adjust your flags or the recipient address.

Start up your node using checkpoint synchronization to reduce your downtime while synchronizing with the network significantly. Fast synchronization speeds are essential if you run a validator node to avoid losing stake.

Your node will begin syncing from a recently finalized consensus checkpoint instead of genesis. It will then download the rest of the blockchain data while your consensus is already running. After the synchronization is finalized, you will end up with the equal blockchain data.

> You can use the flag on every startup. However, it shows the most significant effect when synchronizing from scratch or after an extended downtime.

<Tabs>
<TabItem value="checkpoint-sync" label="Checkpoint Synchronization">

:::info

If you are setting up a node for the testnet, add the `--testnet` flag to the start command.

:::

:::info

You will need the LUKSO CLI Version 0.8.0 or above in order to use the `--checkpoint-sync` command. If you are using an older version or run into issues, please pass down the checkpoint flag manually, as described in the [LUKSO CLI Checkpoint Documentation](https://github.com/lukso-network/tools-lukso-cli/tree/main#using-checkpoint-syncing).

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
