---
sidebar_label: 'Update the Clients'
sidebar_position: 2
description: Discover how to check for new blockchain client versions on LUKSO.
---

# Update the Clients

If you already use the **latest LUKSO CLI version** but want to check for new blockchain client versions, you can update them separately.

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

Then continue to update your blockchain clients to the [latest supported versions](../mainnet/running-a-node.md#supported-clients-versions).

```bash
# Updates all clients to the latest version
lukso update
```

<details>
  <summary>Show how to install custom client versions.</summary>

You can install custom client versions using the `lukso install` command by providing specific flags. The command will still function as usual, giving you the option to choose your execution and consensus client; however, it continues to download the version that was defined by the flags. You can also add multiple flags to download a consensus and execution version simultaneously. For Geth, you also have to provide the correct commit hash.

```bash
# Manually overwrite Geth Version
# https://github.com/ethereum/go-ethereum/releases
lukso install --geth-tag 1.12.2 --geth-commit-hash bed84606

# Manually overwrite Prysm Version
# https://github.com/prysmaticlabs/prysm/releases
lukso install --prysm-tag v4.0.8

# Manually overwrite Lighthouse Version
# https://github.com/sigp/lighthouse/releases
lukso install --lighthouse-tag v4.1.0

# Manually overwrite Erigon Version
# https://github.com/ledgerwatch/erigon/releases
lukso install ---erigon-tag v2.52.1

# Manually overwrite Teku Version
# https://github.com/ConsenSys/teku/releases
lukso install ---teku-tag v23.10.0
```

</details>

After updating your clients, ensure to get the latest network configurations so they match with your installed clients:

```bash
lukso update configs
```

:::caution Configuration Mismatch

Always ensure that you **download the network configuration files** when **installing the latest supported client versions**. If there are missing or wrong properties within the network configuration, your node may shut down after the start-up or create forks, resulting in the validator being excluded from the active chain branch.

:::

:::info

The `lukso update configs` command does not overwrite any personal configurations.

:::

<details>
  <summary>How to handle Prysm Configuration Errors</summary>

If you updated the network configuration files but are running a Prysm client **below** Version `4.0.8`, your client may not know configuration properties that were introduced in later stages:

```text
There were some issues parsing the config from a yaml file error=yaml: unmarshal errors:
field DENEB_FORK_VERSION not found in type params.BeaconChainConfig
field DENEB_FORK_EPOCH not found in type params.BeaconChainConfig
```

This won't affect your node in any way. If you are able to run newer Prysm versions, **we recommend updating** to the latest supported version.

</details>

## Restart your Node

You can [start your node as regular](../mainnet/running-a-node.md#start-the-clients).

:::info

If you are starting your node in a fresh working directory or after being offline for a while, make sure to [add checkpoint synchronization](../mainnet/running-a-node.md#start-the-clients) to significantly speed up the synchronization during the startup.

:::
