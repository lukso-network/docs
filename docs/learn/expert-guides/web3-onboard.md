---
sidebar_label: '🛳️ Connect Web3-Onboard'
sidebar_position: 5
---

# Connect users' wallets to your dApp with web3-onboard

## The easiest way to connect a wallet 🚀

![web3-onboard-view](/img/extension/web3-onboard.png)

Web3-onboard configuration allows the detection of the [Universal Profile (UP) Browser Extension](https://chrome.google.com/webstore/search/lukso%20blockchain), along with any other installed browser extensions. Developers can integrate it into their Dapp to handle the routing for the different browser extensions.

Web3-onboard is an open-source, framework-agnostic JavaScript library to onboard users to web3 apps. This package can be used to integrate LUKSO [Universal Profiles Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en) support into web3-onboard's "Connect Wallet" modal. With this module, **the LUKSO Universal Profile Extension option will be shown even if the extension is not installed on the user's browser**. If selected the user will be taken to a download screen where they can install the extension.

## Installation

Developers can install web3-onboard in their Dapp using npm, from the [following package](https://www.npmjs.com/package/@lukso/web3-onboard-config). The implementation can be found in the [web3-onboard-config LUKSO GitHub repo](https://github.com/lukso-network/web3-onboard-config).

```shell
npm i @web3-onboard/core @lukso/web3-onboard-config @web3-onboard/injected-wallets
```

You can find a link to web3-onboard's official npm documentation here: [@web3-onboard/core official npm documentation](https://www.npmjs.com/package/@web3-onboard/core)

## Where can I test it out?

Users can experiment with LUKSO's web3-onboard implementation in a sandbox environment using [up-test-dapp.lukso.tech](https://up-test-dapp.lukso.tech/).
