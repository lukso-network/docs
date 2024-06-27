---
sidebar_label: '👋🏻 Getting Started'
sidebar_position: 1
description: Create a Hardhat project and start building your smart contracts for LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started building contracts

The LUKSO ecosystem offers smart contract developers a lot of [new standards](../../standards/introduction.md) and [tools](../../tools/getting-started.md) to build **powerful, modular, and standardized** blockchain applications. As LUKSO is an EVM-based Blockchain, all tools and tutorials for Ethereum also work well for LUKSO.

The following tutorial will teach you how to:

- set up a [Hardhat](https://hardhat.org/) project using TypeScript
- configure the contract settings, [networks](../../../networks/testnet/parameters) and [Blockscout API](https://explorer.execution.testnet.lukso.network/api-docs)
- utilize LSP smart contract presets using the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts)
- compile and deploy LSP-based smart contracts
- verify smart contracts on [Blockscout](https://explorer.execution.testnet.lukso.network/)

If you need more low level information about our contracts, you can check the dedicated [contracts](../../contracts/introduction.md) section.

### Playground Repository

Want to dive into the code directly? The [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository has a full Hardhat setup, including ready-to-go network configurations, sample contracts, and scripts to deploy and verify LSP-based contracts on LUKSO networks using both EOAs or Universal Profiles.

<div style={{textAlign: 'center'}}>

<img
src="/img/guides/playground_hardhat.png"
alt="LUKSO Playground Hardhat"
/>

</div>

## Clone the Playground Repository

First, clone the playground repository and navigate into the smart-contracts-hardhat folder:

```bash
git clone https://github.com/lukso-network/lukso-playground.git
cd lukso-playground/smart-contracts-hardhat
```

Once navigated, you have a working Hardhat setup.

:::info

**This repository uses the [bun](https://bun.sh) toolkit to manage packages and run scripts. Make sure to [install it](https://bun.sh/docs/installation) first.**

:::

To install all the dependencies, run the below command:

```bash
bun install
```

You can then go ahead to create a `.env` file within the root folder of the Hardhat repository and the following contents:

```text title=".env"
PRIVATE_KEY=0x...
UP_ADDR=0x...
```

The private key will be used to deploy the smart contracts to the network and can either be a **standalone Externally Owned Account** or a **controller of a Universal Profile**. If you want to deploy the smart contracts as a Universal Profile, you also have to provide the related address of the Universal Profile.

:::danger

Never share your private key that you will put into the `.env` file!

:::

:::success

To pay for the deployment fees of the accounts, you will need LYXt or LYX. For the testnet, you can request LYXt from the [LUKSO Testnet faucet](https://faucet.testnet.lukso.network/)

:::

We now have a base Hardhat setup that we can use to develop and deploy our smart contracts.

### Run locally

Run the TypeScript code of one file within the terminal using `bun`.

```bash
bun file-path/script.ts
```
