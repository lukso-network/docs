---
sidebar_label: 'Update the Clients'
sidebar_position: 2
---

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

:::info

If you are starting your node in a fresh working directory or after being offline for a while, make sure to [add checkpoint synchronization](../mainnet/running-a-node.md#start-the-clients) to significantly speed up the synchronization during the startup.

:::

:::note

If you are setting up a node for the testnet, add the `--testnet` flag to the start command.

:::

```bash
# Starting the Mainnet Node
lukso start

# Starting the Mainnet Validator
lukso start --validator --transaction-fee-recipient "0x1234"
```
