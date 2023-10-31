---
sidebar_label: '💰 Transfer LYX'
sidebar_position: 5
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

<!-- The code on the playground is wrong - it is for manual / low level lyx transfer. It is not relevant for this article -->

## Setup

<Tabs>
  
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

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```js
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();

await web3.eth.sendTransaction({
    from: accounts[0],             // The Universal Profile address
    to: '0x...',                   // receiving address, can be a UP or EOA
    value: '5000000000000000000'   // 0.5 amount in LYX, in wei unit
})
```
<!-- prettier-ignore-end -->
  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```js
const { ethers } = require('ethers'); // TODO: use import

const provider = new ethers // use window.ethereum here
```
<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>
