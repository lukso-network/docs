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

The browser extension has a custom Sign screen. The article

<div style={{textAlign: 'center'}}>
<img
    src="/img/extension/lukso-extension-sign.webp"
    alt="Example of Sign-In with Ethereum screen"
/>
</div>

## 1. Initialize a blockchain provider

<Tabs groupId="provider">
  <TabItem value="ethers" label="Ethers.js">

```js
import { ethers } from 'ethers';

const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
```

  </TabItem>
  <TabItem value="web3" label="Web3.js">

```js
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
```

  </TabItem>
</Tabs>

## 2. Get the Universal Profile address

A call to `requestAccounts` will open an extension popup to authorize an account.

<Tabs groupId="provider">
  <TabItem value="ethers" label="Ethers.js">

```js
const accountsRequest = await etherProvider.send('eth_requestAccounts', []);
const signer = etherProvider.getSigner();
const upAddress = await signer.getAddress();
```

  </TabItem>
  <TabItem value="web3" label="Web3.js">

```js
const accountsRequest = await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();

const upAddress = accounts[0];
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

<Tabs groupId="provider">
  <TabItem value="ethers" label="Ethers.js">

```js
const message = 'Please sign this message 😊';
const signature = await signer.signMessage(message);
```

  </TabItem>
  <TabItem value="web3" label="Web3.js">

```js
const message = 'Please sign this message 😊';
const address = web3.currentProvider.selectedAddress;
const signature = await web3.eth.sign(message, upAddress);
```

  </TabItem>
</Tabs>

## 4. Verify the signature

Your Dapp has now received a message signed by the controller address of the Universal Profile. To finalise the login, you need to verify if the message was signed by an address which has the `SIGN` permission for this UP.

The verification process is the same as for [Sign-In with Ethereum](./sign-in-with-ethereum.md#4-verify-the-signature).
