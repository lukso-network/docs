---
title: Troubleshooting
sidebar_position: 6
---

# Troubleshooting L16 Testnet

## Permission denied

If you get an error that the permission is denied use `sudo` in front of your command.

## Sync issues

When your node is not syncing use the following steps. All steps have to be executed in your node directory so first ```cd``` to the right directory.

Update the LUKSO CLI
```
sudo curl https://install.l16.lukso.network | sudo bash
```
Update your node files
```
sudo lukso network update
```
Restart you node
```
sudo lukso network restart
```
Start your validator
```
sudo lukso network validator start
```

It will take some time before you are fully synced and showing up on the stats pages. You can see the syncing progress in your [logs](./logs-stats-monitoring.md).

## Bootnodes

You can update Bootnodes with

```
lukso network update
```

You need to restart your node to make the changes effective

```
lukso network restart
```

#### Change your node name

If you want to change your node name you can do this in the file `node_config.yaml`

```sh
sudo nano node_config.yaml
```

Change your node name close it with `ctrl+X` and save it.


## More fixes will be added if necessary.