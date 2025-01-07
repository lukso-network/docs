---
sidebar_label: 'Validators'
sidebar_position: 5
description: 'LUKSO validators overview: validator deposit key, validator mnemonic seed, validator fee recipient address.'
---

# Validators

:::info Ethereumverse

LUKSO uses the same technology as the Ethereum network. Therefore, guides and resources on how to run a validator node on Ethereum also apply to the LUKSO network. Here are some recommended resources from the Ethereum community:

- [ETH2 Validator Guide](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) from Coincashew
- [Solo Staking Board](https://ethereum.org/en/staking/solo/) from Ethereum
- [ETH Staker Reddit Forum](https://www.reddit.com/r/ethstaker/)

:::

## How many LYX are needed to run a validator?

Both the testnet and mainnet require 32 LYX per validator key. A single node can run multiple validators on one single node.

## How does a genesis validator differ from regular ones?

Genesis Validators were part of the genesis block of the LUKSO mainnet and could already stake to get LYX in the first weeks before the migration of LYXe to LYX was started. They are the core community that took off the blockchain.

After the discovery month of about five weeks, LUKSO opened up the migration of LYXe to LYX so that everyone could convert the Ethereum representation of LYX to the native coin. Since then, regular validators can deposit on the LUKSO blockchain directly.

## Can I import validator keys that are not funded?

Yes. The empty validator will spin up idle until you deposit the LYX/LYXt to them so they get activated. Set up Grafana and check the consensus explorer to see if the validator is started and running on your machine.

## Can I run a node without a validator?

Yes. You can run a node without importing any validator keys to it. You will participate in the network and help with stability. However, you won't earn staking rewards.

## What is the minimum validator number to run a validator node?

If you want to run a validator node, you can create and deposit one single validator key. After importing this key to your node, your node will earn rewards.

## How to become a Genesis Validator?

The Genesis Validator smart contract on Ethereum [has been frozen](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc). It is currently not possible to be a genesis validator anymore. However, you can become a regular validator on the LUKSO blockchain by using the [LUKSO Launchpad](https://deposit.mainnet.lukso.network/) after migrating your LYXe to LYX.

## How can I check if my validator is deposited and attesting?

You can check your validator keys on the [Mainnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/) or [Testnet Consensus Explorer](https://explorer.consensus.testnet.lukso.network/) by searching for them. The page will show you the status of the validator key and their last attestations and proposals. You can add multiple validator keys to the dashboard to check numerous validator keys simultaneously. For adding higher validator amounts to the dashboard, you can also check out the [script automation](https://docs.luksoverse.io/docs/mainnet/complete-node-guide/monitoring/explorers) by the community.

## Will the testnet be open to community validators?

The LUKSO testnet will be open to **whitelisted validator addresses only**. The main reason is to allow **maximum stability and participation uptime**. Each depositor will have a limited number of keys he is whitelisted for so that if his node goes down, it will be less likely genuinely impact the network.

The same applies to the execution and consensus dashboard of the testnet. Only **long-term nodes** from whitelisted partners will be listed to reduce spam and have a clear overview of the core infrastructure status. If you want to have monitoring and process visualization of your local node, we recommend using [Grafana](https://grafana.com/).

If you plan to become a validator for testnet, please contact `testnet-validators@lukso.network`.

## What happens when my validator is offline?

In Proof of Stake, validators can be penalized for being offline. The **penalties for an offline validator are dynamically adjusted** based on the total amount of offline validators and their offline duration. You can find rough estimates within the [staking section](./staking.md) of the FAQ.

This mechanism **incentivizes validators to stay online** and actively participate in the network's consensus process. Validators are expected to be online to propose and attest to blocks. If a validator is offline, they're not fulfilling their role, so their balance slowly leaks over time. The inactivity penalty is proportional to the square of the time the validator has been offline, meaning the penalty accelerates the longer the validator is offline.

It's important to note that these penalties are **only applied when the network isn't finalizing blocks** from someone that hasn't been online. If the network is finalizing blocks, offline validators don't receive inactivity penalties but miss out on potential rewards.

The design intention is to ensure that validators have a **solid incentive to remain online** and participate in the consensus process, but without making the penalties so severe that minor issues could result in significant losses. This balance aims to encourage a secure and decentralized network.

## What is the validator mnemonic seed?

The validator seed is a phrase used to generate your Validator Deposit Keys and your Deposit Data. The mnemonic seed is a series of words that act as a seed to generate your keys and addresses.

## How to store the validator mnemonic seed?

The validator mnemonic seed is the **most critical information** for a validator and must be stored securely and privately. If someone gets access to your mnemonic seed, the attacker could regenerate your validator and gain access to your staked LYX/LYXt. If you lose your mnemonic seed and don't have your keys backed up, you **lose access** to your staked LYX/LYXt. The mnemonic seed should be written down by hand and **stored securely**. Storing multiple copies in different locations is considered best practice to protect against physical loss or damage.

## What is the validator key password?

The validator key password is used to **encrypt each validator's deposit key**. Every time you import a validator key into your validator client, you'll need to provide this password. It's important to note that each validator key can have its unique password. Separate passwords would mean that if you're importing multiple keys, you may need to provide numerous passwords. Your key passwords should be **strong, unique, and securely stored** like your wallet password. If you create multiple batches of validator keys, all keys within one folder will have the same password.

## What is the validator deposit key?

A keystore file, or deposit key, encrypts your private key using the validator key password. It is **generated for each potential deposit** you want to make. It can be used to import your validator key into a validator client. It's essential to store your keystore files securely, as anyone with access to your keystore file and its password would have access to your validator key. If you lose your keystore file, you can **regenerate it using your validator mnemonic seed**, assuming you have stored it securely. With it, the client can verify if you deposited the required 32 LYX/LYXe to become an active validator.

## How can I create my deposit data file?

The deposit data file is a JSON file generated when you set up your validator using your Validator Mnemonic Seed. The JSON file includes various essential pieces of information, such as your public key and a signature. This file is used as part of the process to register your validator on the blockchain using transactions.

## What is the validator wallet password used for?

The validator wallet password is used to secure the wallet holding your Validator Deposit Keys. The wallet password should be strong, unique, and known only to you. This password will be needed every time you start your validator client.

## What is the validator withdrawal address?

Staking withdrawals refer to **withdrawing earned rewards or the initial staked amount** of 32 LYX by validators participating in Proof-of-Stake. These staking withdrawals are automatically pushed to the withdrawal address set during the key generation process and are registered on-chain during the deposit. If set, the withdrawal address **cannot be changed once the stake is deposited**. If you want to update it, you must exit your validators to receive the funds on the current withdrawal address and set up new validator keys afterward.

## What is the validator fee recipient address?

The fee recipient address, e.g., transaction or gas fee address, differs from the staking withdrawal. The recipient fee address is associated with the validator when they perform validation duties, such as **proposing and attesting to blocks**. The fee recipient address is set during the start of the validator client on the node and can be changed upon restart. You need to know your node's wallet password after importing the validator keys to set or modify it. The fees are **paid by users who initiate transactions and smart contract executions** on the EVM network. Validators collect the fees as an incentive for their work in maintaining the blockchain.

## Can I use the same address as withdrawal and fee recipient?

Yes, they can be the same, meaning you will receive both: withdrawals and fees at the same address. Both addresses are regular Ethereum Addresses that can be generated in traditional or hardware-based wallets.

## How can I exit my validator?

Exiting a validator requires a signed message from your validator client. The LUKSO CLI can exit validator keys directly, allowing node operators to select which validator keys they want to exit.

If you use a custom setup, the exit process differs for each client. These are the links for the exit process for each supported consensus client:

- [Exiting a Prysm validator](https://docs.prylabs.network/docs/wallet/exiting-a-validator)
- [Exiting a Lighthouse validator](https://lighthouse-book.sigmaprime.io/voluntary-exit.html)
- [Exiting a DAppNode validator](https://forum.dappnode.io/t/how-to-exit-an-eth2-validator/786)
