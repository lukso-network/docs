---
sidebar_position: 1
title: 'Getting Started'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started

The `@up-provider` library lets dApps run as mini-apps on Grid and allows parent applications to one-click-connect to your mini-app.

## Installation

```bash
npm install @lukso/up-provider
```

## Usage in mini-apps

Below are the examples of how to use the `up-provider` with different libraries:

<Tabs groupId="provider-lib">
  <TabItem value="viem" label="viem">

```js
import { createClientUPProvider } from '@lukso/up-provider';
import { createWalletClient, createPublicClient, custom } from 'viem';
import { lukso } from 'viem/chains';

// Construct the up-provider
const provider = createClientUPProvider();

// Create public client if you need direct connection to RPC
const publicClient = createPublicClient({
  chain: lukso,
  transport: http(),
});

// Create wallet client to connect to provider
const walletClient = createWalletClient({
  chain: lukso,
  transport: custom(provider),
});
```

  </TabItem>

  <TabItem value="ethers" label="ethers" >

```js
import { createClientUPProvider } from '@lukso/up-provider'
import { type Eip1193Provider, ethers } from 'ethers'

// Create the up-provider
const provider = createClientUPProvider()

// Wrap provider into ethers for usage.
const browserProvider = new ethers.BrowserProvider(upProvider as unknown as Eip1193Provider)
```

  </TabItem>
  <TabItem value="web3" label="web3" >

```js
import { createClientUPProvider } from '@lukso/up-provider';
import Web3, { type EthExecutionAPI, type SupportedProviders } from 'web3';

// Create the up-provider
const provider = createClientUPProvider();

// Wrap provider into web3 for usage.
const web3 = new Web3(provider as SupportedProviders<EthExecutionAPI>);
```

  </TabItem>

</Tabs>

## Resources

- [GitHub repo](https://github.com/lukso-network/tools-up-provider/)
- [NPM package](https://www.npmjs.com/package/@lukso/up-provider)
- [Try out the example mini-app on your grid!](https://nextjs.miniapp-example.lukso.tech/)
