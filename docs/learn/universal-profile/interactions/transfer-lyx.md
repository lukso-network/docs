---
sidebar_label: 'Transfer LYX'
sidebar_position: 8
description: Learn how to transfer LYX from your Universal Profile.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer LYX

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('../img/transfer-lyx.png').default}
    alt="Transfering 0.5 LYXt between two Universal Profiles"
    width="400"
  />
<br/>
<i>Transfering 0.5 LYXt between two Universal Profiles.</i>
<br /><br />
</div>

:::info

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/transfer-lyx) repository.

:::

The 🆙 [Universal Profile Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) magically wraps all the calls internally so you don't have to craft custom transactions.

This makes it easy to send transaction like LYX transfer (= native token transfers). Simply use [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) as you always did while working with wallets and smart accounts that used EOAs.

No need to make contract calls to instruct the smart contract of the Universal Profile what to do. The Browser Extension handles all of that behind the scene for you!

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

## Code Examples

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

const provider = new ethers.BrowserProvider(window.lukso);

await provider.send("eth_requestAccounts", []);

const signer = await provider.getSigner();
const account = await signer.getAddress();

// Send transaction
const tx = await signer.sendTransaction({
    from: account,                        // The Universal Profile address
    to: '0x...',                          // Receiving address, can be a UP or EOA
    value: ethers.parseEther('0.5') // 0.5 amount in ETH, in wei unit
});
```
<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>
