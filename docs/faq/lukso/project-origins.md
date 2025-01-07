---
sidebar_label: 'Project Origins'
sidebar_position: 6
description: 'The project origins of LUKSO, LUKSO Genesis Deposit Contract, and the LUKSO Reversible Initial Coin Offering (rICO).'
---

# Project Origins

## What was the LUKSO rICO?

The public funding of the project took place in 2020 on the Ethereum blockchain using Ether. LYXe, the **token equivalent on the Ethereum blockchain**, was handed out to participants of the funding.

The public sale was implemented as a **Reversible Initial Coin Offering** (rICO), allowing participants to purchase LYXe tokens at a specific price over **eight months** without a commitment to participate in the entire process length of the sale. Buyers could discontinue and have their remaining ETH returned at any time. It was also possible to join the sale in the latter stages without being drastically disadvantaged. In total, the project received nearly 10,000 Ether. You can get deeper insights at the official [Reversible ICO](https://rico.lukso.network/) page of LUKSO.

The rICO, proposed by LUKSO founder Fabian Vogelsteller for the LUKSO public sale, is a **public standard that gradually unlocks tokens through an autonomous-acting contract instance** deployed on the Ethereum blockchain. LUKSO did this to provide a fairer token sale and more protection for the buyer.

## Where can I find the LYXe token address?

The official address of the LYXe token is [`0xA8b919680258d369114910511cc87595aec0be6D`](https://etherscan.io/token/0xA8b919680258d369114910511cc87595aec0be6D). The Code of the LYXe Contract on Ethereum can be found here.

## Why was LYXe implemented as ERC777 token?

[ERC777](https://ethereum.org/de/developers/docs/standards/tokens/erc-777/) is a token standard on the Ethereum blockchain aimed at improving token contracts' functionality and user experience compared to its predecessor, the ERC20 standard. The key features of the ERC777 standard include:

- **Send and Receive Hooks**: This allows tokens to notify the recipient contract about incoming tokens, which can then choose to reject or accept them. Similarly, a contract can be notified before its tokens are moved and take action accordingly. This helps to prevent the common problem of tokens being stuck in contracts, which is prevalent in the [ERC20](https://ethereum.org/de/developers/docs/standards/tokens/erc-20/) standard.
- **Operator Access**: In the ERC777 standard, a user can designate an operator to manage their tokens. This can be used to allow a third-party smart contract to perform certain operations, which can enable more complex and powerful functionality.
- **Backward Compatibility**: Despite having improved features, ERC777 is backward compatible with ERC20, which means contracts expecting ERC20 tokens can handle ERC777 tokens without any issue.
- **More Detailed Transactions**: In ERC777, the 'send' function includes transaction data, not just the amount and recipient. This additional information can be helpful for dApps that need to process more than just simple transfers.
- **Minting and Burning Events**: ERC777 allows the tracking of token minting and burning events, which can be helpful for dApps that need to monitor the total supply of a token dynamically.

## How did the Genesis Validators start the network?

The [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) was open for about three weeks and was frozen on the 9th of May. The PoS consensus was started with all Genesis Validators that deposited up to block 17,227,300 on Ethereum. There was a 46,523 block delay after the LUKSO team triggered the freeze. The genesis deposit contract received 10.336 deposits from 223 unique addresses based on the [Dune Analytics Dashboard](https://dune.com/hmc/lukso-genesis-validators). Each validator had to deposit 32 LYXe.

Based LUKSO mainnet was started on the [23rd of May of 2023](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba) using the genesis files created from the deposits on Ethereum. All future validator deposits will be made as regular validators.

## Where can I find the LUKSO Genesis Deposit Contract?

The official address of the Genesis Deposit Contract is [`0x42000421dd80d1e90e56e87e6ee18d7770b9f8cc`](https://etherscan.io/address/0x42000421dd80d1e90e56e87e6ee18d7770b9f8cc). The Code of the contract can be found here. You can also see the list of all valid token transfers until the contract has been closed. We also have a Dune Dashboard for Genesis Validators showing created deposits.

## Which features did the Genesis Deposit Contract have?

The deposit contract called the external LYXe [ERC777](https://ethereum.org/de/developers/docs/standards/tokens/erc-777/) token contract to lock the deposit amounts. To prepare the genesis files of the mainnet launch featured a freeze. Therefore, the deposit contract featured checks if a public key has been registered, preventing duplicate deposits. Only static deposit amounts of 32 LYX were allowed.

The freeze also came with a delay function to allow people to have time still after the LUKSO team triggered it. Each validator that went through the Genesis Launchpad stored not only the LYXe token but also a vote for the initial coin supply of the mainnet. The additional data was stored on-chain to have a publicly verifiable source of the initial LYX supply and distribution.

## How was the token supply of LUKSO determined?

Genesis validators were able to deposit LYXe to the deposit launchpad. Each deposit transaction voted **35M**, **42M**, or **100M** LYX to the smart contract. 84.2% of the Genesis Validators voted for 42M. After the deposit contract was frozen, Genesis Validators could choose between the three genesis files to start their nodes. The launch was sealed after most validators had selected the genesis files of 42M.
