---
title: Networks
description: LUKSO Networks Frequently Asked Questions
sidebar_position: 3
---

# Frequently Asked Questions

## GENERAL

### When will the LUKSO Mainnet be launched?

The current launch date is planned for 2022. You can find the latest update in our [Medium article](https://medium.com/lukso/an-update-on-the-road-to-mainnet-48d39ce411d7).

### I found a bug. Where can I report it?

You can create a GitHub issue in the related project's repository. If you can't do it, you can send us a message on our [Discord](https://discord.gg/lukso) server.

## NETWORK

### What are the expected block and epoch times?

L16 will run with 6s per slot. Each epoch contains 32 slots.
For Mainnet we didn't decide the values yet.

### What is the expected tx/second?

L16 will start with 60-80M GAS limit. hardware should still be fine with 8-16GB and 4 core CPU

### Are there any changes on the LUKSO network compared to Ethereum 2.0? What are those changes?

We would like to stay as compatible as possible with Eth2.0. Don't 
expect a lot of differences in the consensus engine for now. Our RnD 
in the future:

1. withdraw functionality
2. sharding
3. data availability

### Will other clients be supported besides geth (in the same way as Ethereum)?

One of the advantages of staying close to Eth2.0 is that we are compatible with
all clients. Currently we are running on beacon side a Lighthouse Client and will 
expand to Teku in the near future. Ideally we will be compatible with all clients.

### What is LUKSO’s vision regarding the network? Will LUKSO keep following the Ethereum network updates or eventually split and follow its own path again after mainnet with the Pandora/Vanguard/Orchestrator clients?

There could be changes in the future, but it is always a balance between 
having its own ideas executed and deviating from Eth2.0. 
Our efforts after mainnet launch will be decided based in the development direction of Eth2.0

### Can I stake my tokens without being a validator?

The staking is setup in a way that you need to run a validator node. 
There will likely be staking pools, pools though reduce decentralisation and are not ideal for a highly decentralised network.

### Is LUKSO going to implement the EIP-1559 standard?

[EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) is planned, but will be finally decided before mainnet launch.

## NODE

### Will lower latency positively influence my rewards?


When the appointed time for a validator 
comes to propose a block the validator has exactly 6s 
to vote. 2 scenarios are causing a validator to miss that 
slot: 

1. its chain is not synced up to the canonical head. 
2. the validator needed more than 6s to propose the block. 

There are no extra rewards for being very quick...

### How to setup my node to maximize my peers?

In the normal case a node will connect to max peers. 
But each peer has an evaluation step that will judge 
if the node is "worthy" otherwise it will say "goodbye". 
You can check the logs to see if you get many of the goodbye messages.

Max peers can be configured in the configuration of your node, but more peers
increase bandwidth and do not necessarily lead to benefits.

### Why is there a difference between my peers on the execution stats and consensus stats website?

With the Bellatrix fork Geth must follow the beacon chain. 
It will sync up by itself only to the final epoch. 

It means that once finality is reached it is not necessarily 
important how many peers the execution node has. 
The peers in execution and consensus are also not necessarily 
the same. There is no mechanism where the consensus is 
telling the execution node which peers it is connected to 
and vice versa.

### What ports must be open on a node?

It would be best if you opened the following ports and protocols in the network to run your node correctly.

```
tcp:30303
tcp:13000
udp:12000
udp:30303
```
### How can I open my ports on my node machine? Can you describe it for Mac and Linux
```
# Linux
Using the lukso-cli will open the ports for you automatically.
This is due to the underlying docker-compose configuration running 
in "host" mode. If you have a firewall configured, please allow
traffic for the above mentioned ports.
```

:::info
NOTE: Make sure you also forward those ports in your router.
:::

## VALIDATOR

### Can we confirm 1 validator = 32 LYX on mainnet?

The final staking amount will be based in LYXe price and likely shortly before
mainnet. It will very likely not be 32 LYX. As the amount must be high enough
to incentivise good validator behaviour. If it cost too little the network 
becomes insecure.

### When will it be possible to withdraw your LYX from your validator and how?

Eth2.0 planned the withdraw functionality with phase 1. 
We are observing this topic very closely. Ideally
we are satisfied with the solution. But as already 
stated we might propose our own one.

### Is there a minimum of validators you need to run?

No, you can run as many as you want and you can run only just one validator.

### Is there a maximum limit on how many validators one node can run, regarding decentralization?

It is not given exactly. We were running a node with 60 
validators. Next to block proposals the validator node has 
additional duties like voting on a block. It might get quite 
crowded on one slot. But it also depends on the size of 
the validators in total. If there are many validators out 
there the duties might be very low for a node.

### Is there an advantage to splitting validators across multiple nodes instead of running all validators on one node?

Example: One node with 200 validators or two nodes with 100 validators each.

This is an optimisation problem which goes against 
a lot of factors: Price per node. Total Validator Density. 
It can be reasonable to run 200 validators in one node but 
we don't recommend it.

### Do you receive higher returns If you deposit more than 32 LYX in a validator?

No. 

### Can I start extra validators with the rewards I'm getting on my validator balance?

This goes back to the question if withdraw is implemented.

### Can you explain the process for withdrawing and selling rewards, while still keeping the validator running?

Right now this is not available.

### How should the logs look in each case to have certainty everything runs smoothly?

We developed a sense for beautiful logs over the years and would 
recommend either to get used to them first by trying to understand 
and eventually asking questions. Also, we will provide explanations 
for different warnings and errors in the future. But ideally the
logs can be omitted - other tools should provide visibility 
(Grafana,Explorers,...)

### Is it possible to check if your validator is running correctly and what the rewards are without using Grafana/Prometheus?

You can use the CLI. We are improving the command:

```
lukso network validator describe
```

## SECURITY

### Can my node location be tracked?

Yes, as you expose your IP.
