---
title: Troubleshooting
sidebar_position: 4
---

# Troubleshooting L16 Testnet

## Permission denied

If you get an error that the permission is denied use `sudo` in front of your command.

## Bootnodes

You can update Bootnodes with


```bash
lukso network update
```

You need to restart the chain to make the changes effective

```
lukso network restart
```
 
## Unmarshalling Error

:::info Context
Check your execution log by `lukso network log execution`. For Ubuntu 20.04 LTS you may get an unmarshal-related issue like:

```
log_execution: err="peer connected on snap without compatible eth support" log_consensus: level=error msg="Could not connect to powchain endpoint: could not dial eth1 nodes: json: cannot unmarshal string into Go struct field SyncProgress.CurrentBlock of type uint64" prefix=powchain
```

:::

**Proposed Solution:**

```sh
# stop docker container
lukso network stop
# reset data directory
lukso network clear
# remove previous images
docker system prune --all --force --volumes
# delete lukso testnet directory
cd .. && rm -rf ./lukso-l16-testnet
```

After trying out the proposed solution, re-run your node setup from the start.
