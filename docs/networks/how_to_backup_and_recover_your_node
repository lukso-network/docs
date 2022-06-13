# How To Backup And Recover Your Node

It is pretty straight forward to setup a node when your old node when your old setup doesn't work anymore. You can simply
run

```bash
lukso network init --chain l16
```

in another instance and the setup is done in no time.

The problem starts with the keystore. How do you copy and move the keystore to another instance.

The keystore is determinstic derivative of 4 values

* **ValidatorMnemonic** - the seed for your validator keys
* **WithdrawalMnemonic** - which is needed to withdraw your stakes
* **KeystoreIndexFrom** and **KeyStoreIndexTo** - the key positions that you chose to create a keystore with x amount of validator keys.

If you now these 4 values you can recover your validator setup.

The LUKSO CLI offers 2 commands to deal with the recovery.

```bash
lukso network validator backup
```

This will produce a recovery file **node_recovery.json** with exactly these four values. Copy the content once you have setup a node and store it somewhere
safe.

If you want to recover the node you can simply do


```bash
lukso network init --chain l16
echo CONTENT_OF_RECOVERY_JSON_FILE > node_recovery.json
lukso network validator recover --path ./node_recovery.json
```

This will recreate your setup and recover your node.

NOTE

* The recovery can only work if no validator setup was executed. It should happen immed. after you initilialsied the node.
* NEVER run the 2 nodes at the same time - you will be prone to slashing. Make sure that one node is not running before you recover.

