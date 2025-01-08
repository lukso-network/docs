---
sidebar_label: 'Blockchain Architecture'
sidebar_position: 1
description: LUKSO blockchain architecture overview.
---

# Blockchain Architecture

## What is the Network Architecture of LUKSO?

LUKSO's network architecture is based on the **Proof of Stake** consensus protocol, which relies on validators to secure the network and maintain consensus. The protocol is combined with two fundamental necessities to allow a secure and efficient network.

The first necessity is **achieving the finality** of changes made to the network. This ensures that once a block is added to the blockchain, its information is immutable and cannot be changed. Finality is managed by Casper the Friendly Finality Gadget (**Casper FFG**), a consensus mechanism designed to achieve this finality.

The second necessity is having a defined **ruleset to determine block arrangement**. This is particularly crucial when multiple blocks require simultaneous validation. In such cases, disputes can lead to splits of the linear chain at the latest common block, requiring validators to choose which of them they want to validate. LUKSO tackles this problem with the Latest Message Driven Greediest Heaviest Observed Subtree (**LMD GHOST**) protocol. The algorithm provides the additional ruleset necessary to ensure unified computing on one branch, thereby resolving the problem of blockchain splits.

## What is Proof of Stake?

PoS is a consensus mechanism many blockchain networks use to **validate and add new transactions**. Unlike Proof of Work, which requires miners to solve complex mathematical problems to add new blocks to the blockchain, PoS relies on the amount of native tokens a person holds and is willing to stake as collateral.

In a PoS blockchain, validators are chosen to create a new block based on their **stake in the network**. The more cryptocurrency a person holds, the more validators can be instantiated, increasing the potential of proposing blocks. Once chosen, validators validate transactions and add them to the blockchain. For their service, validators are rewarded with transaction fees and potentially new coins on the blockchain.

One of the main advantages of PoS over PoW is its **energy efficiency**. While PoW requires massive computational resources and energy consumption, PoS achieves consensus with minimal energy use. The efficiency makes PoS more sustainable and environmentally friendly for blockchain networks.

Another advantage of PoS is the security it provides. Since **validators have a significant investment** in the networks coin, they are incentivized to act honestly. If a validator tries to manipulate the system or validate fraudulent transactions, they risk losing their stake, making attacks on the network costly and, therefore, less likely.

## Why did LUKSO choose Proof of Stake?

LUKSO wanted to start as a **completely decentralized chain without delegating votes**. Proof of Stake makes it easy to allow everyone to participate, even without special hardware. It's the latest and most energy-efficient consensus mechanism for EVM blockchains and is seen as state-of-the-art. It aligns very well with the goals we set for the project.

## Are transactions cheaper than on other blockchains?

Despite the type of network, transactions are usually cheaper on new blockchain networks due to the **reduced competition for block space**. Essentially, every block on a blockchain has a finite capacity for transactions. If the demand for transactions surpasses this capacity, users must compete for the limited space. This competition often manifests as transaction fees. On established networks like Ethereum, transaction fees can be pretty steep.

On newer networks, like LUKSO, fewer users equate to **less competition and lower transaction fees**. Nevertheless, transaction fees are likely to increase as a network attracts more users and demand for block space rises over time.

## What EVM Protocol Upgrades are live on LUKSO?

The LUKSO Mainnet is up to date with [every Ethereum fork](https://ethereum.org/en/history/) until Shanghai and Capella. All upgrades, except for Shapella (Capella and Shanghai), were integrated within the mainnet launch on block `0`. Shapella got activated at block `1687969198` on 28th June 2023.

## Why is client diversity so important?

Having a variety of clients in a blockchain network and improving our client diversity is critically important. Client diversity refers to utilizing different software clients in a blockchain network developed by various teams and in other programming languages to improve the following:

- **Security and Resilience**: Client diversity increases the robustness of the network. If there's a bug in one client, it doesn't bring down the entire network because other clients can continue to operate. This decentralization and redundancy is a fundamental aspect of blockchain security and resilience.
- **Decentralization and Governance**: Client diversity promotes decentralization in the development and governance of the Ethereum network. It prevents any team or entity from having too much influence over the network's growth.

For Ethereum, **client diversity has proven essential** in maintaining the network's robustness during several incidents. One of the most notable incidents were the [Shanghai DoS Attacks in 2016](https://blog.ethereum.org/2016/09/22/ethereum-network-currently-undergoing-dos-attack), the [OpenEthereum Consensus Bug in 2020](https://www.coindesk.com/tech/2020/08/27/buggy-code-release-knocks-13-of-ethereum-nodes-offline/), and the [Prysm Client Incident in 2023](https://offchain.medium.com/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2). You can find an overview of these bugs within the [extended client section](https://docs.luksoverse.io/docs/mainnet/complete-node-guide/blockchain-clients/client-setups) by the community.

## How does Shapella enable validator withdrawals?

[Shanghai and Capella](https://ethereum.org/en/history/) (Shapella) are the names of two Ethereum forks, often combined to one term. Shanghai is the fork's name on the execution client side, and Capella is the upgrade name on the consensus layer client side. The included EIPs can be found [here](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md). The significant new features enable the **withdrawal of the validator's earnings and stake** from the network.

Validators participating in the network need to put down stakes. The withdrawal fork will **allow individuals to stop running their validators** to exit the blockchain with all their stakes or to **access their earned rewards** while keeping the node running.

## What is the London Update?

Each operation in the EVM requires a certain amount of gas, which is paid in the blockchain's native coin. The cost of gas is a **crucial part of the network's incentive structure**, deterring spam and incentivizing miners to confirm transactions.

With the London Update described in [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), the EVM network has a predictable fee system with two parts: a **base fee and a tip**. The base fee is burned and adjusted up or down depending on network congestion. When the network is **busy**, the **base fee increases**, and when the network is less active, the base fee decreases. The tip, also called the priority fee, is given to the miner as an incentive to include the transaction in the block. The London Update automatically went live at the LUKSO mainnet start.

## What is slashing?

In the Proof of Stake consensus context, the slasher functionality **discourages validators from behaving dishonestly or maliciously**. If a validator behaves in a way that could compromise the network's integrity—like trying to manipulate the transaction history or proposing conflicting blocks—they can be slashed. When a validator gets slashed, a portion of its staked LYX or LYXt is removed, e,g. burned. Additionally, validators are **ejected from the validator set** if they fall below 16 LYX. By being forcefully ejected, they lose the ability to participate in the consensus process and earn further rewards. You can read more in the [validator section](./validators.md) of this FAQ.

The slashing conditions include:

- **Double Proposals**: If a validator proposes two different blocks during the same time slot, he is slashed for running multiple instances.
- **Surround Vote**: If a validator makes attestations that surround each other, a later vote contradicts an earlier one in a way that isn't just an update.

Without the slasher, slashed validators that have committed offenses might not be promptly removed from the validator set, which could theoretically affect network operation in certain situations.

## What are network penalties?

In Proof of Stake, validators can be **penalized for being offline**, which is technically different from losing stake due to slashing. Instead, it's considered inactivity leakage or an inactivity penalty. The same penalties for an offline validator are dynamically adjusted based on the total amount of offline validators and their offline duration.

This mechanism **incentivizes validators to stay online** and actively participate in the network's consensus process. Validators are expected to be online to propose and attest to blocks. If a validator is offline, they're not fulfilling their role, so their balance slowly leaks over time.

The penalties for being offline are much **less severe than the penalties for malicious behavior** that would result in slashing. The inactivity penalty is proportional to the square of the time the validator has been offline, meaning the penalty accelerates the longer the validator is offline. It's important to note that these penalties are only applied when the network isn't finalizing blocks from someone that hasn't been online. If the network is finalizing blocks, offline validators don't receive inactivity penalties but miss out on potential rewards.

The design intention is to ensure that validators have a **solid incentive to remain online** and participate in the consensus process, but without making the penalties so severe that minor issues could result in significant losses. This balance aims to encourage a secure and decentralized network.

## What are epochs?

An epoch in PoS is a fixed period during which slots occur. It is a larger time frame that **helps to organize the work of validators who propose and attest** to blocks. An epoch is comprised of 32 slots, which means an epoch lasts for about 6.4 minutes, given that each slot is about 12 seconds.

Epochs provide several vital functions:

- **Validator Shuffling**: At the start of each epoch, a random selection process determines the active validators and assigns them to slots. This is done to ensure that the system remains decentralized and that no single validator can predict far in advance when they will be selected.
- **Rewards and Penalties**: At the end of each epoch, rewards and penalties are calculated for validators. Validators that correctly proposed and attested to blocks receive rewards, while those who behaved maliciously or were offline are penalized.
- **Finality**: An epoch also plays a role in achieving finality. Finality refers to the point at which a block cannot be changed or removed from the blockchain. The finality is achieved in every epoch.

## What are slots?

A slot in PoS is a period within an epoch where a **randomly chosen validator can propose a new block** to the blockchain during a slot. The role of a slot includes:

- **Block Proposal**: Each slot represents an opportunity for a validator to propose a new block. If the selected validator is online and behaves correctly, they will propose a block, which other validators will attest to.
- **Attestations**: During each slot, validators who are not chosen to propose a block are expected to attest to the validity of the proposed block. These attestations are important for determining consensus and helping the network agree on the state of the blockchain.
- **Missed Slots**: If a chosen validator is offline or fails to propose a block during their slot, the slot is skipped, and no new block is added to the chain for that slot.

A justified slot is a block that has been **voted on and is a candidate for finalization**. Essentially, justifying a block is the step before finalizing it. A block is justified when it receives 2/3 of the voting weight from the active validators. Justified blocks can still be overwritten if a conflicting block receives more votes. However, once a justified block is finalized, meaning the network has reached the consensus of the proposed block, it cannot be changed.

## What are the expected block and epoch times?

The LUKSO network will run with an expected block time of 12 seconds.
