---
title: Backup and recovery
sidebar_position: 4
---

# Backup And Recover Your validator

We made it simple and straight forward to recover a node with its validators when your old node doesn't work anymore or you want to transfer everything to a new machine.

## The keystore

 the keystore is a derivative of these 4 values:

* **ValidatorMnemonic** - the seed for your validator keys
* **WithdrawalMnemonic** - which is needed to withdraw your stakes
* **KeystoreIndexFrom** and **KeyStoreIndexTo** - the key positions that you chose to create a keystore with x amount of validator keys.

If you backup those 4 values and store them safely you can always recover your validator setup.

## Keystore backup

First we explain how to backup and transfer the keystore files to another machine.

The LUKSO CLI offers 2 commands to make a backup and recover this backup on a new machine.

First we explain the backup command:

```bash
lukso network validator backup
```
This will produce a recovery file **"node_recovery.json with"** exactly these four values.

Use this backup command after you have succesfully setup your node and validators on your machine. Store this file somewhere safe and offline.

## Start up your new node

You always start on your new machine with installing the LUKSO CLI after that you need to initialize the network before you can recover your old validators:

```bash
lukso network init --chain l16
```

## Recover you validators with the backup file
```bash
echo CONTENT_OF_RECOVERY_JSON_FILE > node_recovery.json
```
```bash
lukso network validator recover --path ./node_recovery.json
```
**OR**

Tranfer **node_recovery.json** from the place where you stored it to your machine and add it to your path in the `lukso network validator recover` command:

Example:
```
lukso network validator recover --path /home/USER/lukso-node/node_recovery.json
```
Change **USER** to the username of your account.

This will recreate your setup and recover your validator.


:::danger
NOTE

* The recovery command will only work if you did **not** used the `lukso network validator setup` command before. So it should happen immediatelly after you initialized the node with `lukso network init --chain l16`.
* **NEVER** run the 2 nodes at the same time - you will get slashed. Make sure that you **stopped** your existing node before you install and recover your new node. Make also sure that your old Docker containers and images are deleted.
:::
