---
sidebar_label: 'Multi-Provider Connection'
sidebar_position: 3
description: Use Wallet Connect or Web3-Onboard with the LUKSO Universal Profile Browser Extension.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Multi-Provider Connection

If you want to support the Universal Profile Browser Extension alongside other wallets, you can use third-party libraries to improve the user's onboarding experience. Here are some options:

- **Web3Modal** : [Documentation](https://docs.walletconnect.com/web3modal/about)
- **Web3-Onboard** : [Documentation](https://onboard.blocknative.com/)

Both libraries are open-source, framework-agnostic JavaScript tools.

<Tabs groupId="wallet-lib">
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
    <li>Automatically detects <a href="hhttps://eips.ethereum.org/EIPS/eip-6963">EIP-6963</a> Extensions</li>
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

## Installation

<Tabs groupId="wallet-lib">
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

## Setup

After the installation, you can proceed to configure the library to support the LUKSO network and your dApp.

<Tabs groupId="wallet-lib">
<TabItem value="walletconnect" label="Wallet Connect" default>

```js
// Import the necessary components
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

// Import the project ID from https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID';

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
  // https://docs.lukso.tech/networks/mainnet/parameters
  {
    chainId: 42,
    name: 'LUKSO Mainnet',
    currency: 'LYX',
    explorerUrl: 'https://explorer.execution.mainnet.lukso.network/',
    rpcUrl: 'https://42.rpc.thirdweb.com/',
  },
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
  projectId,
  chainImages: walletConnectChainImages,
  // OPTIONAL: Only show wallets that are installed by the user
  featuredWalletIds: ['NONE'],
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
// Import the necessary components
import Onboard, { OnboardAPI } from "@web3-onboard/core";
import { ConnectModalOptions } from "@web3-onboard/core/dist/types";
import injectedModule from "@web3-onboard/injected-wallets";
import luksoModule from "@lukso/web3-onboard-config";

// Initialize the LUKSO provider from this library
const luksoProvider = luksoModule();

// Define the download link for the extension
const UP_BROWSER_EXTENSION_URL =
  "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl";

// Set up the injected wallet interface
const injectedWallets = injectedModule({
  /**
   * Add custom wallets here that you want
   * to inject into Web3-Onboard
   */
  custom: [luksoProvider],

  // OPTIONAL: Add sorting for supported wallets
  sort: (wallets) => {
    const sorted = wallets.reduce<any[]>((sorted, wallet) => {
      /**
       * Universal Profiles will be placed at the
       * top of the wallet connection screen
       *
       * Add other injected wallet names here
       * to adjust their order
       */
      if (wallet.label === "Universal Profiles") {
        sorted.unshift(wallet);
      } else {
        sorted.push(wallet);
      }
      return sorted;
    }, []);
    return sorted;
  },

  /**
   * OPTIONAL: Specify wallets that should still be displayed
   * in the list, even when unavailable in the browser
   */
  displayUnavailable: ["Universal Profiles"],
});

/**
 * Define at least one blockchain network that is able to
 * interact with the Universal Profile Browser Extension
 */
const supportedChains = [
  // https://docs.lukso.tech/networks/mainnet/parameters
  {
    id: 42,
    token: "LYX",
    label: "LUKSO Mainnet",
    rpcUrl: "https://42.rpc.thirdweb.com/",
  },
  // https://docs.lukso.tech/networks/testnet/parameters
  {
    id: 4021,
    token: "LYXt",
    label: "LUKSO Testnet",
    rpcUrl: "https://4201.rpc.thirdweb.com/",
  },
];

/**
 * OPTIONAL: Set up the app description of the
 * Web3-Onboard connection window
 */
const appInfo = {
  name: "My LUKSO App",
  /**
   * Pictures can either be a valid
   * Image URL or SVG as string
   *
   * The icon shows behind the extension picture
   * on the right side, while the connection
   * is being established
   */
  icon: "/my_app_icon.svg",
  /**
   * The logo shows left of the wallet list,
   * indicating the used app
   */
  logo: "<svg> ... </svg>",
  description: "My LUKSO App using Web3-Onboard",
  recommendedInjectedWallets: [
    /**
     * Add other injected wallets and their download links
     * to directly take users to the installation screen
     */
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
  chains: supportedChains,

  // OPTIONAL COMPONENTS:
  appMetadata: appInfo,
  connect: connectionOptions,
});
```

</TabItem>
</Tabs>

## Connect

<Tabs groupId="wallet-lib">
<TabItem value="walletconnect" label="Wallet Connect">

To set and access the Wallet Connect provider within your dApp, you can call the integrated `open()` method provided by the `createWeb3Modal` instance. The library will show a connection window with all supported wallets. You can then fetch the active account and set it as the default provider within your dApp.

<Tabs groupId="provider-lib">
<TabItem value="ethersjs" label="ethers.js" default>

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
  <TabItem value="web3js" label="web3.js">

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
<TabItem value="ethersjs" label="ethers.js" default>

```js
// Trigger the connection process and screen
const connectedWallets = await web3OnboardComponent.connectWallet();
if (connectedWallets.length > 0) {
  // If a wallet has been connected, set it as default provider
  const provider = new ethers.BrowserProvider(connectedWallets[0].provider);
}
```

  </TabItem>
  <TabItem value="web3js" label="web3.js">

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

## Disconnect

<Tabs groupId="wallet-lib">
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

:::info Maintaining compatibility

The Universal Profile Browser Extension only handles **one active account connection** at a time. This behavior differs from regular wallets. Therefore, the **Disconnect** methods should be called on every provider's `accountsChanged` and `chainChanged` events.

:::

## Sample Implementations

- Check our sample implementations for NextJS on the [dApp Boilerplate](https://boilerplate.lukso.tech/).
- Test Web3-Onboard in our sandbox environment using [up-test-dapp.lukso.tech](https://up-test-dapp.lukso.tech/).
- Find further information in the [Web3-Onboard Documentation](https://onboard.blocknative.com/docs/getting-started).
- Find further hooks and implementations in the [Web3Modal Documentation](https://docs.walletconnect.com/web3modal/about)
