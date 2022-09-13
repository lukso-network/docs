---
sidebar_label: 'Sign-in With Ethereum'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign-in with Ethereum

This guide will teach you how to sign a mesage using the [Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361) standard in order to be able to sign human readable messages and get their signature verified on the Universal Profile.

## Sign a mesage

### 1. Initialize a blockchain provider.

<Tabs>
  <TabItem value="web3" label="web3">

```js
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);
```

  </TabItem>
  <TabItem value="ethers" label="ethers">

```js
import { ethers } from 'ethers';
const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
```

  </TabItem>
</Tabs>

### 2. Get access to the UP address in use.

A call to `requestAccounts` will open an extension popup to authorize an account.

<Tabs>
  <TabItem value="web3" label="web3">

```js
const accountsRequest: string[] = await web3.eth.requestAccounts();
const accounts: string[] = await web3.eth.getAccounts(); //should also yield the same address
```

  </TabItem>
  <TabItem value="ethers" label="ethers">

```js
const accountsRequest: string[] = await etherProvider.send(
  'eth_requestAccounts',
  [],
);
const signer = etherProvider.getSigner();
await signer.getAddress(); //should also yield the same address
```

  </TabItem>
  <TabItem value="raw" label="raw">

```js
const accountsRequest: string[] = await window.ethereum.request({
  method: 'eth_requestAccounts',
  params: [],
});
const accounts: string[] = await window.ethereum.request({
  method: 'eth_accounts',
  params: [],
}); //should also yield the same address
```

  </TabItem>
</Tabs>

### 3. Sign message.

<Tabs>
  <TabItem value="web3" label="web3">

```js
const message = 'Hello World';
const address = web3.currentProvider.selectedAddress;
const signature = await web3.eth.sign(message, address);
```

  </TabItem>
  <TabItem value="ethers" label="ethers">

```js
const message = 'Hello World';
const signature = await signer.signMessage(message);
```

  </TabItem>
</Tabs>

## Verify the signature on the Universal Profile

Because the UP is a smart contract, and the messages are usually signed by a controller account (EOA), Universal Profile has the [`isValidSignature`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L111-#L130) function implemented to check if the signature was signed by an EOA that has the sign permission over the Universal Profile.
