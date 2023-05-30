---
title: Validators
description: LUKSO Validator FAQ
sidebar_position: 1
---

# Validators FAQ

:::info
Regarding questions about validator hardware and configuration: LUKSO uses the same technology as the Ethereum network. Therefore, guides and resources on how to run a solo Ethereum validator node also apply to the LUKSO network. Here are some handy resources we recommend:

- [https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet)
- [https://ethereum.org/en/staking/solo/](https://ethereum.org/en/staking/solo/)
- [https://www.reddit.com/r/ethstaker/](https://www.reddit.com/r/ethstaker/)

:::

## Becoming a validator

### How many LYX are needed to run a validator?

32 LYX per validator. A single node can run multiple validators.

### Is there a minimum number of validators required to run a node?

No, you can run as many or as few validators as you want and there is no set minimum or maximum. However, in the interest of decentralization we do not recommend running too many validators on one machine as it increases the likelihood of all of them being penalized if goes your machine goes offline.

### Can I withdraw my staked LYX?

LUKSO will not launch with the Shapella upgrade enabled so there will be some time when staked tokens cannot be withdrawn. After the team are happy with the stability of the network and the number of validators, we will support the upgrade Shapella to enable token withdrawals.

### What is the easiest way of participating as a validator if I have limited technical knowledge?

It should be noted that running a validator is a commitment and requires a degree of technical proficiency to maintain and set up correctly. People with limited technical knowledge may be more comfortable waiting for third-party staking services to come to LUKSO before running a validator node.

In the future we aim to work with third party services to make setting up solo validator nodes easier with minimal setup. However, this will not be available at genesis as the network will need to be running for some time before third-parties are able to integrate.

### How can I save gas when depositing funds for multiple validators.

Use the official LUKSO deposit launchpad to assist with generating validator credentials and sending validator deposit transactions. **Be careful of phishing websites. Make sure you are on a genuine LUKSO domain before connecting any wallet or sending tokens.**

### Can I still become a genesis validator?

The genesis validator smart contract on Ethereum has been frozen ([article](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc)). It is currently not possible to be a genesis validator anymore. After the discovery mode, it will be possible to become a validator on the LUKSO blockchain by using the [LUKSO launchpad](https://deposit.mainnet.lukso.network/).

## Running a validator node

### What penalties will I receive if my node goes offline?

A node going offline is usually not a slashable offense. However, your stake will be penalized by around the same amount as the rewards you would have gained were the node online.

### Are nodes operated through a CLI or will there also be a GUI option?

Running a validator node requires a degree of technical proficiency and as such those looking to run a validator should be comfortable using the terminal to use the LUKSO CLI. There will also be a launchpad website which will streamline the process of generating deposit data and transferring validator funds. However, the node setup and maintenance will require using the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) or [docker images](https://github.com/lukso-network/network-docker-containers).

### What will be the different validator clients?

At launch, the LUKSO CLI is able to install the following clients for running a validator node. More will become available in the future.

- Execution Clients: [Geth](https://geth.ethereum.org/)
- Consensus Clients: [Prysm](https://github.com/prysmaticlabs/prysm)

### How can I set my withdrawal address for my validators rewards after the Shapella upgrade?

For details on how to enable withdrawals after the Shapella upgrade see these guides:

- [https://notes.ethereum.org/@launchpad/withdrawals-guide](https://notes.ethereum.org/@launchpad/withdrawals-guide)
- [https://docs.prylabs.network/docs/wallet/withdraw-validator](https://docs.prylabs.network/docs/wallet/withdraw-validator)

### Will lower latency positively influence my rewards?

When the appointed time for a validator comes to propose a block, the validator has 12s to vote. 2 scenarios could cause a validator to miss that slot:

1. The node is not synced up to the canonical head of the network.
2. The validator needed more than 12s to propose the block.

There are no extra rewards for being very quick.

### How can I set up my node to maximize my peers?

Typically, a node will connect to the maximum number of peers. Each new peer connection goes through an evaluation step to judge if a node is suitable, otherwise, it will disconnect. You can check the logs to see disconnection from peers.

Max peers can be configured in the configuration of your node, however more peers increase bandwidth and do not necessarily lead to benefits.

If you just started your node, it might take some time to sync, give it 1h and see if the number of peers is increasing.

If the number stays low, make sure you opened your ports.

### Why is there a difference between my peers on the execution stats and consensus stats website?

The consensus client follows the beacon chain and will sync by itself only to the final epoch. This means that once finality is reached, it is not necessarily important how many peers the execution node has. The execution and consensus peers are also not necessarily the same. There is no mechanism where the consensus tells the execution node which peers it is connected to and vice versa.

### What ports must be open on a node?

The following ports will need to be opened to run your node correctly:

```sh
# Execution
tcp:30303
udp:30303

# Consensus
tcp:13000
udp:12000
```

Please refer to your clients docs: [prysm](https://docs.prylabs.network/docs/prysm-usage/p2p-host-ip), [geth](https://ethereum.org/se/developers/docs/nodes-and-clients/run-a-node/#starting-the-execution-client).

### Do I receive higher returns if I deposit more than 32 LYX in a validator?

No.

### Will LUKSO mainnet and testnet use different ports?

Mainnet and Testnet will run on the same client ports. If a validator wants to run two clients on the same machine, it is up to the validator operator to configure separate ports for the two clients. For example port **30303** for the first, port **30305** for the second, etc.

### I started my validator node as a genesis validator, how do I check if everything is working fine?

#### LUKSO CLI

If you use the LUKSO CLI, you can use `lukso status` and you should see "Running" for the 3 clients (execution, consensus, validator).

#### Docker

If you run `docker ps` you should see the containers running. It should look like this:

```
CONTAINER ID   IMAGE                                       COMMAND                  CREATED        STATUS          PORTS                                       NAMES
02af7d2dd8a1   prysmaticlabs/prysm-validator:v4.0.3        "/app/cmd/validator/…"   17 hours ago   Up 17 hours                                                 prysm_validator
634d194756f9   prysmaticlabs/prysm-beacon-chain:v4.0.3     "/app/cmd/beacon-cha…"   17 hours ago   Up 17 hours                                                 prysm_beacon
c67280643a1d   ethereum/client-go:v1.11.6                  "geth --datadir=/exe…"   17 hours ago   Up 50 minutes                                               geth
```

#### Logs

You are invited to check the logs of your clients to see if everything is running fine:

For Geth you should see:

```
geth  | INFO [05-18|16:53:55.172] Chain ID:  42 (unknown)
geth  | INFO [05-18|16:53:55.172] Consensus: unknown
```

For Prysm, you should see:

```
prysm_beacon  | time="2023-05-18 16:53:55" level=info msg="Genesis time has not arrived - not syncing" genesisTime=2023-05-23 16:20:00 +0000 UTC prefix=initial-sync

...

prysm_beacon  | time="2023-05-19 09:46:28" level=info msg="102h33m31s until chain genesis" genesisStateRoot=e2dbac288b1bea4d9d728b3e0ea72474c9f20cf2f26d4fcc0bcded2a9e46aa01 genesisTime="2023-05-23 16:20:00 +0000 UTC" genesisValidators=10336 prefix=slotutil
```

For Prysm validator, you should see:

```
prysm_validator  | time="2023-05-18 16:55:16" level=info msg="Validating for public key" prefix=validator publicKey=0x1234...

...

prysm_validator  | time="2023-05-18 16:55:16" level=info msg="Validator client started with provided proposer settings that sets options such as fee recipient and will periodically update the beacon node and custom builder (if --enable-builder)" prefix=validator
```

## Security

### Can my node location be tracked?

Yes, as the IP address of your node is exposed.

## Other

### How can I arrange my taxes if I receive validator rewards?

This is not something the LUKSO team can help with. You are responsible for researching your local tax jurisdiction and making sure you are compliant with your local tax regulations. Many were built for Ethereum validators that can also be helpful for LUKSO validators.
