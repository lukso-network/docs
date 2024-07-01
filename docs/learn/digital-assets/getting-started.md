---
sidebar_label: '👋🏻 Getting Started'
sidebar_position: 1
description: Create a Hardhat project and start building your smart contracts for LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started building Tokens & NFTs

The LUKSO ecosystem offers smart contract developers a lot of [new standards](../../standards/introduction.md) and [tools](../../tools/getting-started.md) to build **powerful, modular, and standardized** blockchain applications.

This page will guide you in setting up your development environment to build and deploy tokens and NFTs on LUKSO.

:::info

For more low level information about the Tokens Contracts (LSP7 and LSP8), see the dedicated [contracts](../../contracts/introduction.md) section.

:::

### Playground Repository

In the following guides, we will use the [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository with a full Hardhat setup, including ready-to-go network configurations, sample contracts, and scripts to deploy and verify LSP-based contracts on LUKSO.

<div style={{textAlign: 'center'}}>

<img
src="/img/guides/playground_hardhat.png"
alt="LUKSO Playground Hardhat"
/>

</div>

:::info

**This repository uses the [bun](https://bun.sh) toolkit to manage packages and run scripts. Make sure to [install it](https://bun.sh/docs/installation) first.**

:::

## Clone the Playground Repository

First, clone the playground repository and navigate into the smart-contracts-hardhat folder:

```bash
git clone https://github.com/lukso-network/lukso-playground.git
cd lukso-playground/smart-contracts-hardhat
```

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

## Run locally

Run the TypeScript code of one file within the terminal using `bun`.

```bash
bun file-path/script.ts
```
