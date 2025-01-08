---
sidebar_label: 'Connect UP with Providers'
sidebar_position: 1
description: Learn how to connect your Universal Profile to a dApp (decentralized application) on LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect a Universal Profile

There are several methods to connect to a [Universal Profile](../../../standards/accounts/introduction.md), each catering to different developer requirements and scenarios. Below, we detail the most common approaches and explain why a developer might prefer one over the others.

Connecting to the [Universal Profile Browser Extension](https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) will trigger the following connection screen:

<div style={{textAlign: 'center'}}>

<img
    src="/img/learn/up_extension_connect.png"
    alt="Example of UP Connection Screen"
    width="600"
/>

</div>

:::success Request Handling

The [Universal Profile Extension](/install-up-browser-extension) returns the address of the connected [Universal Profile](../../../standards/accounts/introduction.md). Making transactions is the same as with any wallet, you just use the profile address as a `from` in your transactions.

:::

## Connect with EIP-6963

:::tip Example Implementation

If you want to implement _Injected Provider Discovery_ you can visit our [Example EIP-6963 Test dApp](https://github.com/lukso-network/example-eip-6963-test-dapp).

:::

:::info Wallet Compatibility

Using [EIP-6963 Provider Discovery](https://eips.ethereum.org/EIPS/eip-6963) is the latest industry standardization, solving previous connectivity issues when having multiple wallet extensions installed at the same time.

:::

You can listen to `eip6963:announceProvider` events following the [EIP-6963: Multi Injected Provider](https://eips.ethereum.org/EIPS/eip-6963) standardization to facilitate a more versatile connection to multiple wallet extensions. This method is beneficial for developers who require the ability to maintain low-level control over how different extensions are targeted and managed within their dApp.

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
import { ethers } from 'ethers';

let providers = [];

window.addEventListener("eip6963:announceProvider", (event) => {
  providers.push(event.detail);
});

// Request installed providers
window.dispatchEvent(new Event("eip6963:requestProvider"));

...

// pick a provider to instantiate (providers[n].info)
const provider = new ethers.BrowserProvider(providers[0].provider);

const accounts = await provider.eth.requestAccounts();
console.log('Connected with', accounts[0]);
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```js
import Web3 from "web3";

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

  </TabItem>
</Tabs>

Since the Universal Profile Browser Extension is compatible with EIP-6963 Multi Injected Provider, it works out of the box with tools like [Wagmi](https://wagmi.sh/react/api/connectors/injected) or [RainbowKit](https://www.rainbowkit.com/docs/introduction). If you use Wagmi or RainbowKit, the 🆙 extension will appear in the list of available wallets. See the example image below with RainbowKit.

<div style={{textAlign: 'center'}}>

<img
    src="/img/learn/up-extension-wallets-list-rainbowkit.png"
    alt="When using RainbowKit, the UP Browser Extension will show up in the list of wallets."
    width="600"
/>

</div>

## Multi-Provider Libraries

You can use third-party libraries to connect to various wallet extensions with ease. Here are some options:

- **Web3Modal** : [Documentation](https://docs.walletconnect.com/web3modal/about)
- **Web3-Onboard** : [Documentation](https://onboard.blocknative.com/)

Both libraries come with built-in UI elements and allow you to support multiple extensions without them all supporting [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963).

<Tabs groupId="provider-lib">
<TabItem value="walletconnect" label="Wallet Connect" default>

<table>
  <tr>
    <th>Image</th>
    <th style={{ minWidth: "25rem" }}>Description</th>
  </tr>
  <tr>
    <td><img src="/img/learn/web3_onboard_view.png" /></td>
    <td style={{ minWidth: "25rem" }}><li>Customizable Connection Window</li>
    <li>Remains connection on Page Refresh</li>
    <li>Lists supported <a href="https://eips.ethereum.org/EIPS/eip-1193">EIP-1193</a> Extensions</li>
    <li>Automatically detects <a href="https://eips.ethereum.org/EIPS/eip-6963">EIP-6963</a> Extensions</li>
    <li>Requires <a href="https://cloud.walletconnect.com">Wallet Connect Account ID</a></li></td>
  </tr>
</table>

</TabItem>
<TabItem value="web3onboard" label="Web3 Onboard">

<table>
  <tr>
    <th>Image</th>
    <th style={{ minWidth: "25rem" }}>Description</th>
  </tr>
  <tr>
    <td><img src="/img/learn/web3_modal_view.png" /></td>
    <td style={{ minWidth: "25rem" }}><li>Customizable Connection Window</li>
    <li>Permanently Visible Connector Element</li>
    <li>Uses <a href="https://www.npmjs.com/package/@lukso/web3-onboard-config">Custom Configuration Packages</a></li>
    <li>Disconnects on Page Refresh</li>
    <li>Lists <a href="https://eips.ethereum.org/EIPS/eip-1193">EIP-1193</a> Extensions</li></td>
  </tr>
</table>

</TabItem>
</Tabs>

:::tip Example Implementation

You can check out the implementation of both libraries within our [dApp Boilerplate](https://boilerplate.lukso.tech/). You can change between multiple provider methods on the fly using the provider switcher component.

:::

### Installation

<Tabs groupId="provider-lib">
<TabItem value="walletconnect" label="Wallet Connect" default>

You can install the Web3 Modal using [different configurations](https://docs.walletconnect.com/web3modal/javascript/about). The default package utilizes the Ethers.js library, which will be used in this example:

```shell
npm i @web3modal/ethers ethers
```

</TabItem>
<TabItem value="web3onboard" label="Web3 Onboard">

You can install Web3-Onboard on the dApp using their core library, including all UI elements and hooks. In order to support the Universal Profile Browser Extension, you will have to install the [`@lukso/web3-onboard`](https://www.npmjs.com/package/@lukso/web3-onboard-config) configuration that can be integrated as injected wallet.

```shell
npm i @web3-onboard/core @lukso/web3-onboard-config @web3-onboard/injected-wallets
```

</TabItem>
</Tabs>

### Setup

After the installation, you can proceed to configure the library to support the LUKSO network and your dApp.

<Tabs groupId="provider-lib">
<TabItem value="walletconnect" label="Wallet Connect" default>

```js
// Import the necessary components
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

// Setup the Metadata
const walletConnectMetadata = {
  name: 'Example dApp',
  description: 'dApp using Wallet Connect',
  url: 'https://my.dapp.domain',
  icons: ['https://my.dapp.domain/icon.svg'],
};

// Initialize the Configuration Element
const walletConnectConfig = defaultConfig({
  metadata: walletConnectMetadata,
});

// Define the supported networks
const supportedChains = [
  // https://docs.lukso.tech/networks/testnet/parameters
  {
    chainId: 4021,
    name: 'LUKSO Testnet',
    currency: 'LYXt',
    explorerUrl: 'https://explorer.execution.testnet.lukso.network/',
    rpcUrl: 'https://4201.rpc.thirdweb.com/',
  },
];

// Define chain images for the network screen
const walletConnectChainImages = {
  42: 'https://my.dapp.domain/lyx_symbol.svg',
  4201: 'https://my.dapp.domain/lyx_symbol.svg',
};

// Create the Web3 Modal Instance
const walletConnectInstance = createWeb3Modal({
  ethersConfig: walletConnectConfig,
  chains: supportedChains,
  'YOUR_PROJECT_ID', // Import the project ID from https://cloud.walletconnect.com
  chainImages: walletConnectChainImages,
  featuredWalletIds: ['NONE'], // OPTIONAL: Only show wallets that are installed by the user
});
```

</TabItem>
<TabItem value="web3onboard" label="Web3 Onboard">

:::caution Referral Links

Be aware that anyone implementing Web3-Onboard can modify the download link to the extension.

:::

:::success

The Web3-Onboard configuration and calls should be set up as a global `context` or `component`, accessible to every page or component of your application layout that is interacting with the blockchain.

:::

```js
import Onboard, { OnboardAPI } from "@web3-onboard/core";
import { ConnectModalOptions } from "@web3-onboard/core/dist/types";
import injectedModule from "@web3-onboard/injected-wallets";
import luksoModule from "@lukso/web3-onboard-config";

// Initialize the LUKSO provider from this library
const luksoProvider = luksoModule();

// Set up the injected wallet interface
const injectedWallets = injectedModule({
  // Add custom wallets here that you want to inject into Web3-Onboard
  custom: [luksoProvider],

  // OPTIONAL: Add sorting for supported wallets
  sort: (wallets) => {
    const sorted = wallets.reduce<any[]>((sorted, wallet) => {

      // Universal Profiles will be placed at the top of the wallet connection screen
      // Add other injected wallet names here to adjust their order
      if (wallet.label === "Universal Profiles") {
        sorted.unshift(wallet);
      } else {
        sorted.push(wallet);
      }
      return sorted;
    }, []);
    return sorted;
  },

  // OPTIONAL: Specify wallets that should still be displayed in the list,
  // even when unavailable in the browser
  displayUnavailable: ["Universal Profiles"],
});

// Define the download link for the extension
const UP_BROWSER_EXTENSION_URL =
  "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl";

// OPTIONAL: Set up the app description of the Web3-Onboard connection window
const appInfo = {
  name: "My LUKSO App",
  // Pictures can either be a valid image URL or SVG as string.
  // The icon shows behind the extension picture on the right side while connecting
  icon: "/my_app_icon.svg",
  // The logo shows left of the wallet list, indicating the used app
  logo: "<svg> ... </svg>",
  description: "My LUKSO App using Web3-Onboard",
  recommendedInjectedWallets: [
    // Add other injected wallets and their download links
    // to take users directly to the installation screen
    {
      name: "Universal Profiles",
      url: UP_BROWSER_EXTENSION_URL,
    },
  ],
};

// OPTIONAL: Set up global installation notices
const connectionOptions: ConnectModalOptions = {
  iDontHaveAWalletLink: UP_BROWSER_EXTENSION_URL,
  removeWhereIsMyWalletWarning: true,
};

// Create the Web3-Onboard Component
const web3OnboardComponent: OnboardAPI = Onboard({
  wallets: [injectedWallets],

  // Define at least one network to interact with using the Universal Profile Browser Extension
  chains: [{
    id: 4021,
    token: "LYXt",
    label: "LUKSO Testnet", // https://docs.lukso.tech/networks/testnet/parameters
    rpcUrl: "https://4201.rpc.thirdweb.com/",
  }],,

  // OPTIONAL COMPONENTS:
  appMetadata: appInfo,
  connect: connectionOptions,
});
```

</TabItem>
</Tabs>

### Connect

<Tabs groupId="provider-lib">
<TabItem value="walletconnect" label="Wallet Connect">

To set and access the Wallet Connect provider within your dApp, you can call the integrated `open()` method provided by the `createWeb3Modal` instance. The library will show a connection window with all supported wallets. You can then fetch the active account and set it as the default provider within your dApp.

<Tabs groupId="provider-lib">
<TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}} default>

```js
// Trigger the connection process and screen
await walletConnectInstance.open();

// Subscribe to provider events, to track the connection
walletConnectInstance.subscribeProvider(
  ({ provider, address, isConnected, error }) => {
    if (error) {
      console.log('Wallet Connect Error:', error);
      return;
    }
    // If access was granted
    if (isConnected && provider && address) {
      const provider = new ethers.BrowserProvider(provider);
      walletConnectInstance.close();
    }
  },
);
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js
// Trigger the connection process and screen
await walletConnectInstance.open();

// Subscribe to provider events, to track the connection
walletConnectInstance.subscribeProvider(
  ({ provider, address, isConnected, error }) => {
    if (error) {
      console.log('Wallet Connect Error:', error);
      return;
    }
    // If access was granted
    if (isConnected && provider && address) {
      const provider = new Web3(provider);
      walletConnectInstance.close();
    }
  },
);
```

  </TabItem>
</Tabs>

</TabItem>
<TabItem value="web3onboard" label="Web3 Onboard">

To set and access the Web3-Onboard provider within your dApp, you can call the integrated `connectWallet()` method provided by the `@web3-onboard/core` library. The library will show a connection window with all supported wallets. You can then fetch the active account and set it as the default provider within your dApp.

<Tabs groupId="provider-lib">
<TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}} default>

```js
// Trigger the connection process and screen
const connectedWallets = await web3OnboardComponent.connectWallet();

if (connectedWallets.length > 0) {
  // If a wallet has been connected, set it as default provider
  const provider = new ethers.BrowserProvider(connectedWallets[0].provider);
}
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js
// Trigger the connection process and screen
const connectedWallets = await web3OnboardComponent.connectWallet();

if (connectedWallets.length > 0) {
  // If a wallet has been connected, set it as default provider
  const provider = new Web3(connectedWallets[0].provider);
}
```

  </TabItem>
</Tabs>

</TabItem>
</Tabs>

### Disconnect

<Tabs groupId="provider-lib">
<TabItem value="walletconnect" label="Wallet Connect">

To disconnect your wallet, you have to call the `disconnect()` method provided by the `createWeb3Modal` instance.

```js
// Close all connections
walletConnectInstance.disconnect();
```

</TabItem>
<TabItem value="web3onboard" label="Web3 Onboard">

To disconnect your wallet, you have to call the `disconnectWallet()` method provided by the `@web3-onboard/core` library. This method requires specifying the wallet you wish to disconnect. You can obtain the necessary information from the state of the Web3-Onboard component, maintaining the current wallet connections.

```js
// Retrieve the current onboard state
const onboardState = web3OnboardComponent.state.get();

// Extract the current connected wallets
const [currentWallet] = onboardState.wallets;

if (currentWallet) {
  // If there is an active connection, trigger the disconnect process
  await web3OnboardComponent.disconnectWallet({ label: currentWallet.label });
}
```

</TabItem>
</Tabs>

## Use Provider Injection

You can use the `window.lukso` object, tailored for a direct integration with the UP Browser Extension. This approach allows developers to engage directly with the UP Browser Extension without the need to consider compatibility with other extensions.

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```sh
npm install ethers
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```sh
npm install web3
```

  </TabItem>
</Tabs>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
import { ethers } from 'ethers';
const provider = new ethers.BrowserProvider(window.lukso);

const accounts = await provider.send('eth_requestAccounts', []);
console.log('Connected with', accounts[0]);
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

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
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
const provider = new ethers.BrowserProvider(window.lukso || window.ethereum);
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js
const provider = new Web3(window.lukso || window.ethereum);
```

  </TabItem>
</Tabs>

## Sample Implementations

- Check our sample implementations for NextJS on the [dApp Boilerplate](https://boilerplate.lukso.tech/).
- Test Web3-Onboard in our sandbox environment using [up-test-dapp.lukso.tech](https://up-test-dapp.lukso.tech/).
- Find further information in the [Web3-Onboard Documentation](https://onboard.blocknative.com/docs/getting-started).
- Find further hooks and implementations in the [Web3Modal Documentation](https://docs.walletconnect.com/web3modal/about)
