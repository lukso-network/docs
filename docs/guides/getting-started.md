---
sidebar_label: 'Setup'
sidebar_position: 2.1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setup

Let's get started by creating a wallet connected to the [LUKSO L14 test network](https://blockscout.com/lukso/l14).

You will also need some test LYX to follow the guides.

You can request some via the [L14 faucet](http://faucet.l14.lukso.network/).

<Tabs>

  <TabItem value="web3js" label="web3.js" default>

```javascript
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l14.lukso.network');

// GENERATE a key to control your UP
let myPassword = 'mypassword';

async function setupWallet() {
  // create a new account, if one does not exist
  if (!web3.eth.accounts.wallet.length) {
    web3.eth.accounts.wallet.create(1, myPassword);
    console.log('My new key address ', web3.eth.accounts.wallet[0].address);
  } else {
    console.log(
      'Loaded existing key address ',
      web3.eth.accounts.wallet[0].address,
    );
    console.log(
      'Balance ',
      web3.utils.fromWei(
        await web3.eth.getBalance(web3.eth.accounts.wallet[0].address),
        'ether',
      ),
      'LYXt',
    );
  }
}

setupWallet();
```

  </TabItem>

  <TabItem value="etherjs" label="ether.js" default>

```javascript
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.l14.lukso.network',
  {
    name: 'L14',
    chainId: 22,
  },
);

async function setupWallet() {
  // create a new account
  let wallet = ethers.Wallet.createRandom();
  console.log('My new key address ', wallet.address);
}

setupWallet();
```

  </TabItem>
</Tabs>
