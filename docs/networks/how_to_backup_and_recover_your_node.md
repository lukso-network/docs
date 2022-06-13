# Backup And Recover Your validator

We made it simple and straight forward to recover a node with its validators when your old node doesn't work anymore or you want to transfer everything to a new machine.

## The keystore

The keystore consists the following 4 values:

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

This will produce a file named: **"node_recovery.json"** with the 4 values of the keystore. Make a backup of your validator keystore with this command after you have succesfully setup your node and validators on your machine. Store this file somewhere safe and offline.

## Start up your new node

You always start on your new machine with installing the CLI and initializing the network before you can recover your old validators:
```bash
sudo curl https://raw.githubusercontent.com/lukso-network/lukso-cli/main/install.sh | sudo bash
```
```bash
lukso network init --chain l16
```

## Recover you validators with the backup file
```bash
echo CONTENT_OF_RECOVERY_JSON_FILE > node_recovery.json
```
```bash
lukso network validator recover --recoveryFile ./node_recovery.json
```
**OR**

Tranfer **node_recovery.json** from the place where you stored it to your machine and add it to your path in the `lukso network validator recover` command:

Example:
```
lukso network validator recover --recoveryFile /home/USER/lukso-node/node_recovery.json
```
Change **USER** to the username of your account.

This will recreate your setup and recover your validator.


:::danger
NOTE

* The recovery command will only work if you did **not** used the `lukso network validator setup` command before. So it should happen immediatelly after you initialized the node with `lukso network init --chain l16`.
* **NEVER** run the 2 nodes at the same time - you will get slashed. Make sure that you **stopped** your existing node before you install and recover your new node. Make also sure that your old Docker containers and images are deleted.
:::
