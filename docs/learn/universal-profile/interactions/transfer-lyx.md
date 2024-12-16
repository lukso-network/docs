---
sidebar_label: 'Transfer LYX'
sidebar_position: 1
description: Learn how to write a simple dApp code to transfer LYX from your Universal Profile Browser Extension programmatically.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer LYX

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('../img/transfer-lyx.png').default}
    alt="Transferring 0.5 LYXt between two Universal Profiles"
    width="400"
  />
<br/>
<i>Transferring 0.5 LYXt between two Universal Profiles.</i>
<br /><br />
</div>

:::info

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/transfer-lyx) repository.

:::

The 🆙 [Universal Profile Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) magically wraps all the calls internally so you don't have to craft custom transactions.

This makes it easy to send transaction like LYX transfer (= native token transfers). Simply use [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) as you always did while working with wallets and smart accounts that used EOAs.

No need to make contract calls to instruct the smart contract of the Universal Profile what to do. The Browser Extension handles all of that behind the scene for you!

## Setup Dependencies

<Tabs groupId="web3-lib">
  
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```shell
npm install ethers
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```shell
npm install web3@v1
```

  </TabItem>

</Tabs>

## Code Examples

<Tabs groupId="web3-lib">

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { ethers } from 'ethers';

const provider = new ethers.BrowserProvider(window.lukso);

await provider.send('eth_requestAccounts', []);

const signer = await provider.getSigner();
const account = await signer.getAddress();

// Send transaction
const tx = await signer.sendTransaction({
  from: account, // The Universal Profile address
  to: '0x...', // Receiving address, can be a UP or EOA
  value: ethers.parseEther('0.5'), // 0.5 amount in ETH, in wei unit
});
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js
import Web3 from 'web3';

const web3 = new Web3(window.lukso);

await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();

await web3.eth.sendTransaction({
  from: accounts[0], // The Universal Profile address
  to: '0x...', // receiving address, can be a UP or EOA
  value: web3.utils.toWei('0.5', 'ether'), // 0.5 amount in ETH, in wei unit
});
```

  </TabItem>

</Tabs>
