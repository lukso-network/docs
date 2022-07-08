---
title: Troubleshooting
sidebar_position: 6
---

# Troubleshooting L16 Testnet

## Permission denied

If you get an error that the permission is denied use `sudo` in front of your command.

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