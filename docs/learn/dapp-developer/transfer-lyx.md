---
sidebar_label: '💰 Transfer LYX'
sidebar_position: 6
description: Learn how to transfer LYX from your Universal Profile.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer LYX

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('./img/transfer-lyx.png').default}
    alt="Transfering 0.5 LYXt between two Universal Profiles"
    width="400"
  />
<br/>
<i>Transfering 0.5 LYXt between two Universal Profiles.</i>
<br /><br />
</div>

:::info

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/transfer-lyx) repository and ⚡️ [StackBlitz](https://stackblitz.com/github/lukso-network/lukso-playground?file=transfer-lyx%2Fregular-transaction.js).

The 🆙 [Universal Profile Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) makes it easy to send LYX transaction without having to interact with the smart contract of the Universal Profile. If you are building a service or backend, you can also 👾 [execute transfers by directly calling the profile contract](https://github.com/lukso-network/lukso-playground/blob/main/transfer-lyx/backend-transaction.js).

:::

## Setup

<Tabs groupId="web3-lib">
  
  <TabItem value="web3js" label="web3.js">

```shell
npm install web3@v1
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell
npm install ethers
```

  </TabItem>

</Tabs>

## Transfer LYX from a Universal Profile

The Universal Profile browser extension will magically wrap all the calls internally so you don't have to worry about crafting custom transactions. Simply use [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) as you always did while working with EOA.

<Tabs groupId="web3-lib">
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```js
import Web3 from 'web3';

const web3 = new Web3(window.lukso);

await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();

await web3.eth.sendTransaction({
    from: accounts[0],                      // The Universal Profile address
    to: '0x...',                            // receiving address, can be a UP or EOA
    value: web3.utils.toWei('0.5', 'ether') // 0.5 amount in ETH, in wei unit
})
```
<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```js
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.lukso);

await provider.send("eth_requestAccounts", []);

const signer = provider.getSigner();
const account = await signer.getAddress();

// Send transaction
const tx = await signer.sendTransaction({
    from: account,                        // The Universal Profile address
    to: '0x...',                          // Receiving address, can be a UP or EOA
    value: ethers.utils.parseEther('0.5') // 0.5 amount in ETH, in wei unit
});
```
<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>
