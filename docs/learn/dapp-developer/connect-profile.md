---
sidebar_label: '🔗 Connect a Universal Profile'
sidebar_position: 2
description: Learn how to connect your Universal Profile to a dApp (decentralized application) on LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect a Universal Profile

There are several methods to connect to a [Universal Profile](../../standards/universal-profile/introduction.md), each catering to different developer requirements and scenarios. Below, we detail the most common approaches and explain why a developer might prefer one over the others.

Connecting to the [Universal Profile Browser Extension](https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) will trigger the following connection screen:

<div style={{textAlign: 'center'}}>

<img
    src="/img/learn/up_extension_connect.png"
    alt="Example of UP Connection Screen"
    width="600"
/>

</div>

:::success Request Handling

The [Universal Profile Extension](/install-up-browser-extension) returns the address of the connected [Universal Profile](../../standards/universal-profile/introduction.md). Making transactions is the same as with any wallet, you just use the profile address as a `from` in your transactions.

:::

## Connect with EIP-6963

:::info Wallet Compatability

Using [EIP-6963 Provider Discovery](https://eips.ethereum.org/EIPS/eip-6963) is the latest industry standardization, solving previous connectivity issues when having multiple wallet extensions installed at the same time.

:::

You can listen to `eip6963:announceProvider` events following the [EIP-6963: Multi Injected Provider](https://eips.ethereum.org/EIPS/eip-6963) standardization to facilitate a more versatile connection to multiple wallet extensions. This method is beneficial for developers who require the ability to maintain low-level control over how different extensions are targeted and managed within their dApp.

```js
let providers = [];

window.addEventListener("eip6963:announceProvider", (event) => {
  providers.push(event.detail);
});

// Request installed providers
window.dispatchEvent(new Event("eip6963:requestProvider"));

...

// pick a provider to instantiate (providers[n].info)
const provider = new Web3(providers[0].provider);

const accounts = await provider.eth.requestAccounts();
console.log('Connected with', accounts[0]);
```

:::tip Example Implementation

If you want to implement _Injected Provider Discovery_ you can visit our [Example EIP-6963 Test dApp](https://github.com/lukso-network/example-eip-6963-test-dapp).

:::

### Multi-Provider Libraries

You can use third-party libraries to connect to various wallet extensions with ease. Here are some options:

* **Web3Modal** : [Documentation](https://docs.walletconnect.com/web3modal/about)
* **Web3-Onboard** : [Documentation](https://onboard.blocknative.com/)

Both libraries come with built-in UI elements and allow you to support multiple extensions without them all supporting [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963).

:::tip Example Implementation

If you want to implement a _Multi-Provider Library_, you can follow our [Multi-Provider Connections Guide](./multi-provider.md) or check out the implementation within our [dApp Boilerplate](https://boilerplate.lukso.tech/).

:::

## Use Provider Injection

You can use the `window.lukso` object, tailored for a direct integration with the UP Browser Extension. This approach allows developers to engage directly with the UP Browser Extension without the need to consider compatibility with other extensions.

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

:::info Wallet Compatibility

Alternatively to the `window.lukso`, the equivalent `window.ethereum` object can be called within [supported browsers](/install-up-browser-extension), just like other Ethereum wallets. Both follow the [EIP-1193 Ethereum Provider JavaScript API](https://eips.ethereum.org/EIPS/eip-1193). You can use a simple fallback to allow regular wallet connections, if the [Universal Profile Browser Extension](/install-up-browser-extension) is not installed:

:::

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
