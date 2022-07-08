---
sidebar_position: 3
---

# Become a validator

:::info
Before running validators on your node, make sure your node is running and working correctly. For more information, check the [Run a node](./run-node) page.
:::

## Setup Validator

```sh
cd lukso-l16-testnet
lukso network validator setup
```
This will create a key store and a transaction wallet. The purpose of the transaction wallet is to call and pay for the deposit transaction.

:::info
Fill in a password and save it somewhere.
:::

:::danger
Never delete the following files if you have deposited your validators: keystore, transaction_wallet and deposit_data.json.
:::

## Amount of validators

Make a choice how many validators you want to run, for every validator you need to have 220 LYXt

## Mnemonic

If this is the first time you set up your validators, choose to not use an existing Mnemonic.

Choose to create a separate withdraw Mnemonic.

The Mnemonics will appear in your `node_config.yaml` file.

Open your `node_config.yaml`
```
nano node_config.yaml
```

Copy your Mnemonics and store them somewhere safe and offline.

## Check your balance
Check if the wallet has enough funds:

```sh
lukso network validator describe
```

Visit the [Faucet](https://faucet.l16.lukso.network) and paste the transaction wallet public address into the field and choose the amount of LYXt you want to receive.

:::info
Transfer **enough** (#validators x staking_amount **+ extra LYXt to pay deposit fees**) funds to the transaction wallet public's address.
:::


## Submit the transaction

### Make a dry run first

```
lukso network validator deposit --dry
```

This will give you the possibility to peek in what is going to happen without executing a transaction.

### Deposit your validators

:::danger
If you are 100% sure that everything is correct you can deposit your LYXt, you will lose all your LYXt if you made a mistake
:::

```
lukso network validator deposit
```

It can take up to eight hours before your validator becomes active, but you can already start your validator in the meantime.

Once you deposited LYXt make sure to create a backup.

```
lukso network validator backup
```

Store the file **node_recovery.json** somewhere safe and offline.

## Start your validator node

```
sudo lukso network start
```

```
sudo lukso network validator start
```

Check the status of your validator, it can take up to 8 hours before your validators become active

```
lukso network validator describe
```

Make sure everything is working correctly by checking the stats pages:

- [Execution stats](https://stats.execution.l16.lukso.network)
- [Consensus stats](https://stats.consensus.l16.lukso.network)

You can also check your [logs](./l16-logs.md).

## Terminology

### Validator Node

**Validator Node** is a combination of services and an underlying keystore that if run together are
syncing, validating and proposing blocks. In most cases it can be described as a directory that contains  
all necessary information to _run_ this node. At LUKSO the directory has the following structure:

- **configs**
  - **configs.yaml** // configuration of consensus service
  - **genesis.json** // configuration of execution service
- data
  - **execution_data** // db of execution service
  - **consensus_data** // db of consensus service
  - **validator_data** // db of validator service
- **keystore**
  - **prysm/direct/account/all-accounts.keystore.json** // keystore of valdiator keys
  - ...
  - **password.txt** // password of keystore
- **docker-compose.yaml** // describes how to run the docker images
- **node_config.yaml** // adjustable values on how to run the nodes
- **.env** // auto genrated file derived from **node_config.yaml**

### Validator Keystore

The **Validator Keystore** is a directory with private key in formats for the respective validator service
version (Teku, Lighthouse, Prysm,...). The keystore has a fixed number of keys. If you need to change
the number of keys you **must** create a new keystore. There is always **one** **Validator Keystore** for
one **Validator Node**

### Validator Key

The **Validator Key** is a private key that can have an active balance and is used to sign attestations
and proposed blocks. The key can have an arbitrary amount of staked LYX but it **won't** change the reward.
It is possible to deposit LYX multiple time to this validator key and that is important for the case the **Validator Key** missed duties and lost balance.

### Validator Key State

The **Validator Key State** is the state of one particular key. A **Validator Keystore** can have many
keys being in many states. When firstly created all the **Validator Keys** are in the state
NOT_DEPOSITED. (NOTE: If the keystore was recreated the state my differ for some keys)

| State         | Acitvated By                                      | Comment                                                                               |
| ------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| NOT_DEPOSITED | ...                                               | The keystore was created for the first time                                           |
| PENDING       | A deposit with _min staking amount_ was made      | There is a proven stake deposited in the Deposit Contract                             |
| ACTIVE        | The deposit was observed by the consensus network | The validator is eligible to be selected to propose and attest in the upcoming epochs |

## How Validator Keys are created

A **Validator Key** is always part of a **Validator Keystore** - as a single key or a combination of many. The keys
are being derived by a [Mnemonic](https://wolovim.medium.com/ethereum-201-mnemonics-bb01a9108c38).
A Mnemonic can potentially create an infinite amount of keys. It is important to understand that
these keys are indexed. There is a possibility to (theoretically) create a certain range.

Once a mnemonic is known the creation of **Validator Keystores** is **not** random but **deterministic**.

### An Example

Given a mnemonic _m_. We create a keystore from position 0 to 2. This could result into:

- **Keystore A**
  - Key0: 0x8154..12
  - Key1: 0x7361..45
  - Key2: 0x7481..fe

Now let's assume we deleted this keystore, and we create a new one from position 1 to 3. This results into:

- **Keystore B**
  - Key1: 0x7361..45
  - Key2: 0x7481..fe
  - Key3: 0x78ca..89

As you can see the Key1 and Key2 are the same in **Keystore A** and **Keystore B**. This mechanism
allows for great power to rearrange your node setup.

### Node Setup Example

Let's assume - given a mnemonic _m_ - we want to create 2 nodes with 30 keys in
**Node A** and 16 keys in the other **Node B**. Given our mnemonic _m_ we would
e.g. have the following setup:

**Node A** has a keystore with keys from position _0_ to position _29_
**Node B** has a keystore with keys from position _30_ to position _45_

Now let's assume we want to rearrange the **Validator Keys**'s by having an equal amount of keys on both nodes.

We should:

1. Stop the validator nodes
2. Delete the keystores
3. Recreate the keystores with the same mnemonic **m**
4. Start the nodes again

The setup could be

**Node A** has a keystore with keys from position _0_ to position _22_
**Node B** has a keystore with keys from position _23_ to position _45_

## Need help?

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/u7cmyUyw8F).
