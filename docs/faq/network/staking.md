---
sidebar_label: 'Staking'
sidebar_position: 7
description: Staking LYX on the LUKSO network.
---

# Staking

## How to stake LYX on the LUKSO mainnet?

The [LUKSO CLI](../../networks/mainnet/running-a-node.md) is a great starting point for setting up a validator node for staking. However, people must set up their server system correctly and install custom monitoring. Additionally, technical people could also use Docker or manual setups.

For non-technical people, we suggest waiting until the [Dappnode](https://dappnode.com/) integration. If you do not want to run your node, please wait until the first external staking services are deployed on the LUKSO mainnet.

## Do I receive higher returns if I deposit more than 32 LYX?

No, your validator key will not gain higher returns. It just needs 32 LYX to be activated.

## What rewards are included in the Annual Percentage Yield for staking?

Typically, funds from the **withdrawal and the fee recipient address** are included in the APY for staking rewards. But as expected, return rates can fluctuate for various factors such as network usage, the total number of validators in the network, and consensus changes. The APY can be found within the landing page of the [Deposit Launchpad](https://deposit.mainnet.lukso.network/).

## Do I get additional rewards for running a slasher node?

Given certain conditions, running a slasher may offer some profits to your validators. However, running a slasher **is not meant to be profitable**, and **whistleblower rewards are purposefully low**, as slashing happens rarely. If the slasher detects a slashable condition, it will default broadcast it to the network. Some lucky validator will then package this slashing evidence into a block and be rewarded. This validator might be your one.

By only running one or two-digit validator amounts, chances are pretty low, and do not keep up with the potential rewards. Please also note that if there is no cheating behavior within the network, there is nothing to be slashed, as regular penalties are applied from the consensus.

## Are LUKSO validator rewards taxable?

We cannot provide specific tax implications for LUKSO validator rewards as they can significantly vary based on your local tax regulations. We **strongly recommend consulting with a local tax professional or accountant** familiar with cryptocurrency-related taxation. Always make sure to comply with local tax laws to avoid penalties or legal issues. Cryptocurrency regulations are rapidly evolving, so staying informed and regularly reviewing your obligations is crucial. Every operator is responsible for being compliant with local laws.

## Is every validator able to withdraw staking rewards?

Every validator key can withdraw staking rewards **after their withdrawal credentials have been set** or attached to them, called ETH1 address. The [LUKSO Wagyu Key Gen](https://github.com/lukso-network/tools-wagyu-key-gen) automatically creates the validator key with your withdrawal address. If you created your validator keys with the [LUKSO Keygen CLI](https://github.com/lukso-network/tools-key-gen-cli) and did not **set the withdrawal credential**, you can update your validator keys using our [Validator Withdrawal Update](../../networks/advanced-guides/withdrawal-update.md) guide.

## Do rewards per validator increase based on the node's validator number?

No. Rewards are given out for each validator key separately and do not increase based on the number you run. If you add multiple validator keys to your node, the total rewards will increase linearly based on the number of keys.

## Are LYX/LYXt locked after they have been deposited?

No, validators are not locked after depositing their stake. The locking **only occurred for genesis deposits** before the Shapella fork went live on the LUKSO mainnet. Please remember that the deposited LYX can only be exited from the network after they have been activated, which may take up to 24h. In addition, the exit process may also **take up to multiple hours** until it is picked up from the consensus. Please also note that it requires setting withdrawal credentials to withdraw your funds to an account.

## Are there different types of withdrawals for validators?

Yes, there are two different types of withdrawals:

- **Partial withdrawals** occur when the validator key's balance exceeds 32 LYX due to earned rewards. They are withdrawn to an Ethereum address and can be spent immediately. The validator will continue to be a part of the beacon chain and validate as expected.
- **Total withdrawals**, also known as **exits**, occur when the validator exits the network and stops being a part of the consensus. Here, the entire balance of 32 LYX and any of the earned rewards will be unlocked and allowed to be spent after the finalization of the exit process.

## How can I check if my withdrawal credentials are set?

The validator deposit file contains a field known as withdrawal credentials. The first byte of this credential is known as the withdrawal prefix. This value is either `0x00` or `0x01`. The value is set on-chain when the deposit is made by a deposit tool. You can withdraw if your deposit file shows your withdrawal credential with `0x01`. If you have a validator with `0x00` withdrawal credentials, you will not immediately be able to withdraw. You need to set a withdrawal address before withdrawals are enabled and funds unlocked.

## How to set my withdrawal credentials?

If you created your validator keys with the [LUKSO Keygen CLI](https://github.com/lukso-network/tools-key-gen-cli) without setting the withdrawal credential, you can update your validator keys shortly after the migration.

For details on how to enable withdrawals manually, have a look at these guides:

- [Withdrawals Guide](https://notes.ethereum.org/@launchpad/withdrawals-guide) by Ethereum
- [Withdraw Validator](https://docs.prylabs.network/docs/wallet/withdraw-validator) by Prylabs

## Can I update my withdrawal credentials?

Setting your withdrawal credentials is a one-time process, so please do so with utmost caution. If you already set a withdrawal credential once, you cannot update it! The only way would be to fully exit your validator keys to the current withdrawal address and re-deposit them to freshly generated validator keys.

## Do withdrawals happen automatically?

If your withdrawal credentials are set within the validator keys, and point to a valid Ethereum address, partial withdrawal will happen automatically. The time of withdrawals depends on the total amount of validators per network.

## Do network exits happen automatically?

If your validator is active and participating in the consensus chain, the total withdrawal, e.g., exits of your stake, will not happen automatically and needs to be initiated manually. However, if your stake drops below 16 LYX/LYXt from being slashed or offline, the protocol will forcefully exit your validator key.

In case you did not set your withdrawal credential for the validator keys, your funds will not be withdrawn until their `BLSToExecutionChange` message is included on the chain. We are currently working on a solution to help people set their credentials if it was missed during the initial deposit.

## Can I change my withdrawal address after I lose the private key?

Unfortunately, you can not update your withdrawal credentials once set. Nothing can be done if you can no longer access the withdrawal key. Please ensure this address is adequately backed up and securely stored.

## What happens when exiting the network without setting the withdrawal address?

Your validator will exit and no longer be assigned duties. The validator can neither earn nor lose any more additional LYX/LYXt. After the validator exit, you can still set your withdrawal credentials. Once the consensus client picks up and finalizes this update, the validator's balance will be withdrawn into the address.

## Can I define a different withdrawal address for each validator key?

Yes, you can define a separate withdrawal address during each key generation process using the [LUKSO Wagyu Key Gen](https://github.com/lukso-network/tools-wagyu-key-gen) or the [LUKSO Key Gen CLI](https://github.com/lukso-network/tools-key-gen-cli). If you want to have a different withdrawal key for each address or a certain subset of your validator keys, you have to generate your validator keys in multiple rounds or batches.

## How to predetermine a single withdrawal address for multiple validators?

While generating your validator keys in batches, you can always assign the same withdrawal address and even use the same address for recipient fees. This way, all rewards, and exited validator funds will be at the same address.

## Can I make validator key deposits from multiple wallets?

In case you have multiple wallets to make deposits from but you don't want to send your LYX/LYXt to the same address, linking your wallets, you could either:

- **Generate batches with the same seed**. Therefore create the keys for the first wallet and redo the process by importing an existing mnemonic seed phrase afterward. This way, you will have multiple deposit data files for each wallet, separated by folders.

- **Modify the deposit file after you generate your total keys in one folder**. Here, create a duplicate of the original deposit file for each wallet. Open the deposit file using a JSON Editor and remove certain `pubkey` elements so each file will house a subset of the total validator keys. Please ensure no validator keys are duplicated or missing when modifying those files.

## How much stake will I lose for being offline?

The exact calculation of penalties can be complex due to these variables, but there are rough estimates based on the [EVM Panelty Research](https://alonmuroch-65570.medium.com/how-long-will-it-take-an-inactive-eth2-validator-to-get-ejected-a6ce8f98fd1c). You will roughly lose 0.01 LYX/LYXt per validatory for being offline for an hour. After being offline for a whole day, it will increase to about 0.1 LYX/LYXt. After an entire offline week, it will be approximately 1 LYX/LYXt per validator.

A validator will lose roughly 60% of their staked LYX after 18 days of inactivity. It takes around three weeks for the effective balance to fall to around 16 LYX/LYXt, which will cause the validator to be ejected from the PoS protocol. Remember, these are **rough estimates, and the penalties could differ** based on the network conditions. If the network is not finalizing, e.g., over one-third of the network is offline, penalties can ramp up significantly.
