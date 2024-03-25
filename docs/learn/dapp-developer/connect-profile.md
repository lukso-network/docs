---
sidebar_label: '🔗 Connect a Universal Profile'
sidebar_position: 2
description: Learn how to connect your Universal Profile to a dApp (decentralized application) on LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect a Universal Profile

To interact with a [Universal Profile](../../standards/universal-profile/introduction.md), we recommend your dApp to call the `window.lukso` object within the browser. Before a connection can be established, users have to create their Universal Profile by:

1. [Installing the Universal Profile Browser Extension](/install-up-browser-extension)
2. [Deploying their Universal Profile](https://my.universalprofile.cloud)

:::info Wallet Compatibility

Alternatively to calling the `window.lukso` object, the equivalent `window.ethereum` object can be called within [supported browsers](/install-up-browser-extension), just like other Ethereum wallets.

:::

:::note Manual Deployment

You can also create new [Universal Profiles](../../standards/universal-profile/introduction.md) by ⚒️ [deploying them programmatically](../../learn/expert-guides/universal-profile/create-profile.md). However, please keep in mind that you would also have to deploy your own [Transaction Relay Service](../../standards/relayer-api.md) to allow gasless onboarding. Customly deployed profiles will not receive free monthly transaction quota through the LUKSO Transaction Relay Service.

:::

## Connect to a dApp

:::success Request Handling

The [Universal Profile Extension](/install-up-browser-extension) automatically manages incoming requests and returns the address of the connected [Universal Profile](../../standards/universal-profile/introduction.md). To get the conrolling EOAs of the [smart contract account](../../standards/universal-profile/lsp0-erc725account.md), you can manually [fetch it's controllers](../expert-guides/key-manager/get-controller-permissions.md).

:::

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers">

```sh
npm install ethers
```

  </TabItem>
  <TabItem value="web3" label="web3">

```sh
npm install web3
```

  </TabItem>
</Tabs>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers">

```js
import { ethers } from 'ethers';
const provider = new ethers.BrowserProvider(window.lukso);

const accounts = await provider.send('eth_requestAccounts', []);
console.log('Connected with', accounts[0]);
```

  </TabItem>
  <TabItem value="web3" label="web3">

```js
import Web3 from 'web3';
const provider = new Web3(window.lukso);

const accounts = await provider.eth.requestAccounts();
console.log('Connected with', accounts[0]);
```

  </TabItem>
</Tabs>

<div style={{textAlign: 'center'}}>

<img
    src="/img/learn/up_extension_connect.png"
    alt="Example of Sign-In with Ethereum screen"
    width="400"
/>

</div>

## Handle multiple extensions

If you expect your users to have multiple browser wallets or extensions, we recommend installing [Web3 Onboard](https://onboard.blocknative.com/) by following our [Web3 Onboard Configuration](./web3-onboard.md). The library will allow users to manage multiple browser providers in parallel.

Alternatively, you can use a simple fallback to allow regular wallet connections, if the [Universal Profile Browser Extension](/install-up-browser-extension) is not installed:

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers">

```js
const providerObject = window.lukso || window.ethereum;
const provider = new ethers.BrowserProvider(providerObject);
```

  </TabItem>
  <TabItem value="web3" label="web3">

```js
const providerObject = window.lukso || window.ethereum;
const provider = new Web3(providerObject);
```

  </TabItem>
</Tabs>

## Create Universal Profiles

:::tip Relayer API

If you want to deploy Universal Profiles for your users, check out our [Relayer API](../../tools/relayer-developer.md).

:::
