---
sidebar_label: 'Sign arbitrary messages'
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign arbitrary messages

:::tip

If you want to authenticate a user, please refer to the [Sign-In with Ethereum](./sign-in-with-ethereum.md) page.

:::

This article explains how to request a signature from the [LUKSO UP Browser Extension](../browser-extension/install-browser-extension.md).

<div style={{textAlign: 'center'}}>
<img
    src="/img/extension/lukso-extension-sign.webp"
    alt="Example of Sign-In with Ethereum screen"
/>
</div>

## 1. Initialize a blockchain provider

The UP Browser Extension injects a global API into the website that is visited. This API is available under `window.ethereum`. You can use this object to initialise your [web3.js](https://web3js.readthedocs.io/en/v1.8.0/) or [Ethers.js](https://docs.ethers.io/v5/) library.

<Tabs groupId="provider">
  <TabItem value="ethers" label="Ethers.js">

```js
import { ethers } from 'ethers';

const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
```

  </TabItem>
  <TabItem value="web3" label="web3.js">

```js
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
```

  </TabItem>
</Tabs>

## 2. Get the Universal Profile address

A call to `requestAccounts` will open the extension popup and prompt the user to select her or his Universal Profile to interact with your Dapp. The UP Browser Extension will send the Universal Profile address back to your Dapp (which is the address of the [`LSP0 - ERC725 Account`](../../standards/universal-profile/lsp0-erc725account.md) smart contract).

<Tabs groupId="provider">
  <TabItem value="ethers" label="Ethers.js">

```js
const accountsRequest = await etherProvider.send('eth_requestAccounts', []);
const signer = etherProvider.getSigner();
const upAddress = await signer.getAddress();
// 0x3E39275Ed3B370E074534edeE13a166512AD32aB
```

  </TabItem>
  <TabItem value="web3" label="web3.js">

```js
const accountsRequest = await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();
const upAddress = accounts[0];
// 0x3E39275Ed3B370E074534edeE13a166512AD32aB
```

  </TabItem>
  <TabItem value="raw" label="raw">

```js
const accountsRequest = await window.ethereum.request({
  method: 'eth_requestAccounts',
  params: [],
});
const accounts = await window.ethereum.request({
  method: 'eth_accounts',
  params: [],
});

const upAddress = accounts[0];
```

  </TabItem>
</Tabs>

## 3. Sign the message

Once you have access to the Universal Profile address, you can request a signature. The UP Browser Extension will sign the message with the controller key used by the extension (a smart contract can't sign).

<Tabs groupId="provider">
  <TabItem value="ethers" label="Ethers.js">

:::caution

When calling Ethers.js [`signer.signMessage( message )`](https://docs.ethers.io/v5/api/signer/#Signer-signMessage), it uses `personal_sign` RPC call under the hood. However, our extension only supports the latest version of [`eth_sign`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sign). Therefore, you need to use `provider.send("eth_sign", [upAddress, message])` instead.

You can get more information [here](https://github.com/MetaMask/metamask-extension/issues/15857) and [here](https://github.com/ethers-io/ethers.js/issues/1544).

:::

<!-- prettier-ignore-start -->

```js
const message = 'Please sign this message 😊';
const signature = await etherProvider.send('eth_sign', [upAddress, message]);
// 0x38c53...
```

<!-- prettier-ignore-end -->

  </TabItem>
  <TabItem value="web3" label="web3.js">

```js
const message = 'Please sign this message 😊';
const signature = await web3.eth.sign(message, upAddress);
// 0x38c53...
```

  </TabItem>
</Tabs>

## 4. Verify the signature

Your Dapp has now received a message signed by the controller address of the Universal Profile. To finalise the login, you need to verify if the message was signed by an address which has the `SIGN` permission for this Universal Profile.

The verification process is the same as for [Sign-In with Ethereum](./sign-in-with-ethereum.md#4-verify-the-signature), you can check how it is done there.
