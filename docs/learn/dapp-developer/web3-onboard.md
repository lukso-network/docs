---
sidebar_label: '🛳️ Connect Web3-Onboard'
sidebar_position: 3
description: Use Web3-Onboard with the LUKSO Universal Profile Browser Extension.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Universal Profile Integration for Web3-Onboard

The [Web3-Onboard](https://onboard.blocknative.com/) library is an open-source, framework-agnostic JavaScript tool to onboard users to Web3 apps. Developers can integrate it into their dApp to handle the routing for the different extensions and wallets, simultaneously docking onto the Ethereum provider. It's the **recommended way** to interact with the Universal Profile Browser extension, **if your dApp supports different wallets**.

![web3-onboard-view](/img/extension/web3-onboard.png)

Our [Web3-Onboard configuration](https://github.com/lukso-network/web3-onboard-config) can be used to integrate the [Universal Profile Browser Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl) into Web3-Onboard's connection module. If the [Universal Profile Browser Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl) is not installed, the user will be taken to its download page.

## Installation

You can install Web3-Onboard on the dApp using the related [NPM package](https://www.npmjs.com/package/@lukso/web3-onboard-config)

```shell
npm i @web3-onboard/core @lukso/web3-onboard-config @web3-onboard/injected-wallets
```

## Setup

After installation, you can proceed to configure your extension that you want to dock onto your dApp.

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

## Connect

To set and access the Web3-Onboard wallet within your dApp, you can call the integrated `connectWallet()` method provided by the `@web3-onboard/core` library. The library will show a connection window with all supported wallets. You can then fetch the active wallet and set it as the default provider within your dApp.

<Tabs>
  <TabItem value="ethers" label="ethers">

```js
// Trigger the connection process and screen
const connectedWallets = await web3OnboardComponent.connectWallet();
if (connectedWallets.length > 0) {
  // If a wallet has been connected, set it as default provider
  const provider = new ethers.BrowserProvider(connectedWallets[0].provider);
}
```

  </TabItem>
  <TabItem value="web3" label="web3">

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

## Disconnect

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

:::info Maintaining compatibility

The Universal Profile Browser Extension only handles **one active account connection** at a time. This behavior differs from regular wallets. Therefore, the `disconnectWallet()` method should be called on every provider's `accountsChanged` and `chainChanged` events. The state updates will ensure the Web3-Onboard connection synchronizes with the extension.

:::

## Sample Implementations

- Check our sample integration for NextJS on the [dApp Boilerplate](https://github.com/lukso-network/tools-dapp-boilerplate) repository.
- Test Web3-Onboard in our sandbox environment using [up-test-dapp.lukso.tech](https://up-test-dapp.lukso.tech/).
- Find further information in the [Web3-Onboard Documentation](https://onboard.blocknative.com/docs/getting-started).
