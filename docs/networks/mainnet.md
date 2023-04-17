---
sidebar_position: 1
---

# Mainnet

:::info

The Mainnet of LUKSO has not started yet!

:::

:::tip

Get notified when genesis validator deposits are active: <https://deposit.mainnet.lukso.network>

:::

## Network Architecture

LUKSO's Blockchain Architecture runs the Ethereum protocol and consists of 2 to 4 clients:

- The consensus client running Casper the Friendly Finality Gadget (Casper FFG) plus LMD-GHOST fork choice algorithm ([More on the Gasper Consensus](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/))
- The execution client, [running the Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/ethereum-stack/)

If you are running a validating node, you will also run:

- The validator client, if you want to run a validating node
- The slasher client, if you want to run a validating node

## The Network start process

LUKSO will start as a PoS Blockchain with an Initial Genesis Validator Set that anyone can join.

Once deployed on Ethereum, the Genesis Validator Smart contract will allow users to deposit LYXe and become Genesis Validators for LUKSO Mainnet. For each validator, you run, you must generate a validator key and deposit 32 LYXe. There will be no limit on the number of validators you can run.

Only become a Genesis Validator if you know how to run a node continuously 24/7. This is not delegated Proof of Stake!

### Becoming a Genesis Validator

The window for becoming a Genesis Validator will be around 3 weeks before launch (or longer if needed). At least **4,096 genesis validators** are ideal for the mainnet start. The Genesis Validator Deposit Smart Contract will be frozen once enough validator keys are registered. The freeze function of the Genesis Validator Contract has a 1-week delay to allow anyone a fair chance to participate.

:::note

### The staking deposit website

### 👉 <https://deposit.mainnet.lukso.network>

:::

:::note

### Genesis Validator Smart Contract Address on Ethereum

### 👉 [0x...](https://etherscan.io/address/0x)

:::

:::danger
Make sure to always double check the address and that the URL is hosted under **lukso.network**!  
👉 deposit.mainnet.**lukso.network**
:::

### Starting the network

Once the Genesis Validator Contract is frozen, participants can choose and download the two genesis files: `genesis.ssz` and `genesis.json` from the [deposit website](https://deposit.mainnet.lukso.network). These files will be the network’s starting point and determine the initial network state. The `genesis.ssz` will contain all Genesis Validator keys and the network start time, estimated to be 1 week after the Genesis Validator Contract freeze.

The second file, `genesis.json` contains the initial balances of the network. It will include the initial balances and total supply of LYX. The community will choose to set the initial supply at 35M, 42M (the LUKSO team's suggestion), or 100M.

As a Genesis Validator, must run the network clients ahead of time with the downloaded genesis files. The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) will make this process easy and will be provided ahead of time.

## Further Information

- [LUKSO Mainnet Start Process Update #1](https://medium.com/lukso/the-puzzle-comes-together-milestone-update-2022-7b69571f63a2)
- [LUKSO Mainnet Start Process Update #2](https://medium.com/lukso/lukso-mainnet-timeline-and-process-dd997fe811c8)
- **[LUKSO Mainnet Start Process Update #3](http://lukso.network)**
