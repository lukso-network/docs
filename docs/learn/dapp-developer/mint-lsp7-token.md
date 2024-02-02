---
sidebar_label: '💽 Mint LSP7 Token'
sidebar_position: 9
description: Learn how to create Digital Assets (token) on LUKSO using the LSP7 standard.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mint LSP7 Token

In this guide you will mint some [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) tokens as an EOA contract owner.

## Setup

The following code snippets require the installation of the following libraries:

- [`ethers.js`](https://github.com/ethers-io/ethers.js/) or [`web3.js`](https://www.npmjs.com/package/web3)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

```shell
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

```shell
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>
</Tabs>

### Imports and constants

At this point, the [`LSP7 Mintable`](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md) contract is being prepared for the following interaction. You construct an instance of a contract, using its _ABI_ and the _contract address_.

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

```javascript title="web3.js"
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import Web3 from 'web3';

const myTokenAddress = '0x...';

const web3 = new Web3(window.lukso);

await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();
```

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

```javascript title="ethers.js"
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import { ethers } from 'ethers';

const myTokenAddress = '0x...';

await ethers.provider.send('eth_requestAccounts', []);
const signer = await ethers.getSigner();
```

  </TabItem>
</Tabs>

### Instantiate the contracts

After defining the core parameters of the [`LSP7 Mintable`](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md) contract, you are able to create an instance using its _ABI_ and the _contract address_.

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

```javascript title="web3.js"
const myToken = new web3.eth.Contract(LSP7Mintable.abi, myTokenAddress);
```

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

```javascript title="ethers.js"
const myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi);
```

  </TabItem>
</Tabs>

### Send the transaction

Finally, you can send the transaction to mint some tokens.

:::warning

The sample contract of this guide only allows the smart contract owner to mint assets. Custom [LSP7](../../standards/tokens/LSP7-Digital-Asset.md) implementations might implement different permission sets.

:::

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

```javascript title="web3.js"
// mint 1 token
const amount = web3.utils.toWei('1', 'ether');

const mintTxn = await myToken.methods
  .mint(
    accounts[0], // recipient address
    amount, // token amount
    true, // force parameter
    '0x', // additional data
  )
  .send({ from: accounts[0] });

console.log(mintTxn);

// Waiting 10sec to make sure the minting transaction has been processed

const balance = await myToken.methods.balanceOf(accounts[0]);
console.log('🏦 Balance: ', balance.toString());
```

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

```javascript title="ethers.js"
// mint 1 token
const amount = ethers.parseUnits('1', 'ether');

const mintTxn = await myToken.mint(
  signer.address, // recipient address
  amount, // token amount
  true, // force parameter
  '0x', // additional data
);
console.log(mintTxn);

// Waiting 10sec to make sure the minting transaction has been processed

const balance = await myToken.balanceOf(signer.address);
console.log('🏦 Balance: ', balance.toString());
```

  </TabItem>
</Tabs>
