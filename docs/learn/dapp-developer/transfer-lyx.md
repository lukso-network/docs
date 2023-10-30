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

In this guide, we will learn **how to transfer LYX** from your Universal Profile to any `address` (including another Universal Profile :up: ). We will cover:

- `sendTransaction({from:, to, value, data: '0x', ....})`
- Give example with Web3js v1 / Ethers -> <https://www.quicknode.com/guides/ethereum-development/transactions/how-to-send-a-transaction-in-ethersjs>

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

:::caution

Note there is an example here: <https://github.com/lukso-network/universalprofile-test-dapp/blob/main/src/components/endpoints/SendTransaction.vue#L304>

```
// using the promise
web3.eth.sendTransaction({
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
.then(function(receipt){
    ...
});
```

https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction

:::
