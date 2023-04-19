---
title: Running a Validator
description: LUKSO Validator FAQ
sidebar_position: 2
---

:::info
Regarding questions about validator hardware and configuration: LUKSO uses the same technology as the Ethereum network. Therefore, guides and resources on how to run a solo Ethereum validator node also apply to the LUKSO network. Here are some handy resources we recommend:

- [https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet)
- [https://ethereum.org/en/staking/solo/](https://ethereum.org/en/staking/solo/)
- [https://www.reddit.com/r/ethstaker/](https://www.reddit.com/r/ethstaker/)

:::

### How many LYX are needed to run a validator?

32 LYX per validator. A single node can run multiple validators.

### Is there a minimum number of validators required to run a node?

No, you can run as many or as few validators as you want and there is no set minimum or maximum. However, in the interest of decentralization we do not recommend running too many validators on one machine as it increases the likelihood of all of them being penalized if goes your machine goes offline.

### Can I withdraw my staked LYX?

LUKSO will not launch with the Shapella upgrade enabled so there will be some time when staked tokens will be unable to be withdrawn. After the team are happy with the stability of the network and the number of validators, we will support the upgrade Shapella to enable token withdrawals.

### What is the easiest way of participating as a validator if I have limited technical knowledge?

It should be noted that running a validator is a commitment and requires a degree of technical proficiency to maintain and set up correctly. People with limited technical knowledge may be more comfortable waiting for third party staking services to come to LUKSO before running a validator node.

In the future we aim to work with third party services to make setting up solo validator nodes easier with minimal setup. However, this will not be available at genesis as the network will need to be running for some time before third parties are able to integrate.

### What penalties will I receive if my node goes offline?

A node going offline is usually not a slashable offense. However, your stake will be penalized by around the same amount as the rewards you would have gained were the node online.

### How can I arrange my taxes if I receive validator rewards?

This is not something the LUKSO team can help with. You are responsible for researching your local tax jurisdiction and making sure you are compliant with your local tax regulations. There are many tax tools and services that were built for Ethereum validators that can also be helpful for LUKSO validators.

### Are nodes operated through a CLI or will there also be a GUI option?

Running a validator node requires a degree of technical proficiency and as such those looking to run a validator should be comfortable using the terminal to use the LUKSO CLI. There will also be a launchpad website which will streamline the process of generating deposit data and transferring validator funds, though the node setup and maintenance will require using the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli).

### What will be the different validator clients?

At launch, the LUKSO CLI is able to install the following clients for running a validator node. More will become available in the future.

- Execution Clients: [Geth](https://geth.ethereum.org/)
- Consensus Clients: [Prysm](https://github.com/prysmaticlabs/prysm)

### How can I set my withdrawal address for my validators rewards after the Shapella upgrade?

For details on how to enable withdrawals after the Shapella upgrade see these guides:

- [https://notes.ethereum.org/@launchpad/withdrawals-guide](https://notes.ethereum.org/@launchpad/withdrawals-guide)
- [https://docs.prylabs.network/docs/wallet/withdraw-validator](https://docs.prylabs.network/docs/wallet/withdraw-validator)

### Will lower latency positively influence my rewards?

When the appointed time for a validator comes to propose a block the validator has 12s to vote. 2 scenarios could cause a validator to miss that slot:

1. The node is not synced up to the canonical head of the network.
2. The validator needed more than 12s to propose the block.

There are no extra rewards for being very quick.

### How can I set up my node to maximize my peers?

In the normal case a node will connect to the maximum peers. Each new peer connection goes through an evaluation step that will judge if a node is suitable, otherwise it will disconnect. You can check the logs to see disconnection from peers.

Max peers can be configured in the configuration of your node, however more peers increase bandwidth and do not necessarily lead to benefits.

### Why is there a difference between my peers on the execution stats and consensus stats website?

The consensus client follows the beacon chain and will sync by itself only to the final epoch. This means that once finality is reached it is not necessarily important how many peers the execution node has. The execution and consensus peers are also not necessarily the same. There is no mechanism where the consensus tells the execution node which peers it is connected to and vice versa.

### What ports must be open on a node?

The following ports will need to be opened to run your node correctly:

```
tcp:30303
tcp:13000
udp:12000
udp:30303
```

### How can I open my ports on my node machine?

The LUKSO CLI will automatically open the required ports for your node. This is due to the docker-compose configuration running in "host" mode. If you have a firewall configured, you should enable incoming traffic for the above mentioned ports. Ports will also need to be forwarded in your router.

### Do you receive higher returns If you deposit more than 32 LYX in a validator?

No.

### Will LUKSO mainnet and testnet use different ports?

Mainnet and Testnet will run on the same client ports. If a validator wants to run two clients on the same machine it is up to the validator operator to configure separate ports for the two client. For example port **30303** for the first, port **30305** for second etc.

### How can I save gas when depositing funds for multiple validators.

Use the official LUKSO deposit launchpad to assist with generating validator credentials and sending validator deposit transactions. **Be careful of phishing websites. Make sure you are on a genuine LUKSO domain before connecting any wallet or sending tokens.**

### Can I run a validator node without using Docker?

Currently the LUSKO CLI uses Docker for the client orchestration. If you would like you run a node without Docker you would have to set up the configuration yourself without using the LUKSO CLI.

## Security

### Can my node location be tracked?

Yes, as the IP address of your node is exposed.
