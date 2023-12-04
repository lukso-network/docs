---
sidebar_label: '🛳️ Connect Web3-Onboard'
sidebar_position: 9
---

# Universal Profile Integration for Web3-Onboard

The [Web3-Onboard](https://onboard.blocknative.com/) library is an open-source, framework-agnostic JavaScript tool to onboard users to Web3 apps. Developers can integrate it into their dApp to handle the routing for the different extensions and wallets, simultaniously docking onto the Ethereum provider.

![web3-onboard-view](/img/extension/web3-onboard.png)

Our [Web3-Onboard configuration](https://github.com/lukso-network/web3-onboard-config) can be used to integrate the [Universal Profile Browser Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl) into Web3-Onboard's connection module. In case the [Universal Profile Browser Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl) is not installed, the user will be taken to its download page.

## Installation

You can install Web3-Onboard on the dApp using the related [NPM package](https://www.npmjs.com/package/@lukso/web3-onboard-config)

```shell
npm i @web3-onboard/core @lukso/web3-onboard-config @web3-onboard/injected-wallets
```

## Setup

After installation, you can proceed to configure your extensions that you want to dock onto your dApp.

:::caution Refferal Links

Be aware that anyone implementing Web3-Onboard can modify the download link to the extension.

:::

:::success

The Web3-Onboard configuration and calls should be set up as a global `context` or `component`, acsessable to every page or component of your application layout that is interacting with the blockchain.

:::

```js
// Import the necessary components
import Onboard, { OnboardAPI } from "@web3-onboard/core";
import { ConnectModalOptions } from "@web3-onboard/core/dist/types";
import injectedModule from "@web3-onboard/injected-wallets";
import luksoModule from "@lukso/web3-onboard-config";

// Initialize the LUKSO provider from this library
const onboardLuksoProvider = luksoModule();

// Define the download link for the extension
const UP_BROWSER_EXTENSION_URL =
  "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl";

// Set up the injected wallet interface
const injectedWallets = injectedModule({
  /**
   * Add custom wallets here that you want
   * to inject into Web3-Onboard
   */
  custom: [onboardLuksoProvider],

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
  {
    id: 42,
    token: "LYX",
    label: "LUKSO Mainnet",
    rpcUrl: "https://rpc.lukso.gateway.fm/",
  },
  {
    id: 4021,
    token: "LYXt",
    label: "LUKSO Testnet",
    rpcUrl: "https://rpc.testnet.lukso.gateway.fm/",
  },
];

/**
 * OPTIONAL: Set up the app description of the
 * Web3-Onboard connection window
 */
const appMetadata = {
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
  chains: onboardSupportedChains,

  // OPTIONAL COMPONENTS:
  appMetadata: onboardAppMetadata,
  connect: onboardLuksoConnection,
});

// Calling the connect functionality,
const connectedWallets = await web3OnboardComponent.connectWallet();

// Debug
console.log(connectedWallets);
```

## Sample Implementations

- Check our sample integration for NextJS on the [dApp Boilerplate](https://github.com/lukso-network/tools-dapp-boilerplate) repository.
- Test Web3-Onboard in our sandbox environment using [up-test-dapp.lukso.tech](https://up-test-dapp.lukso.tech/).
- Find further information in the [Web3-Onboard Documentation](https://onboard.blocknative.com/docs/getting-started).
