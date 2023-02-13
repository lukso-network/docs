---
sidebar_label: 'Mint an LSP7 Digital Asset (Token)'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an LSP7 Digital Asset (Token)

This guide will teach you how to mint some ([**LSP7 Digital Asset**](../../standards/nft-2.0/lsp7-digital-asset)) tokens to your [**Universal Profile**](../../standards/universal-profile/lsp0-erc725account.md).

## Mint tokens for your Universal Profile

The code snippet below shows how to mint 100 tokens with your Universal Profile as a beneficiary.

Make sure you have the following dependencies installed before beginning this tutorial.

- You can use either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- You SHOULD install [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

### Step 1 - Setup imports and constants

At this point you will need a private key in order to mint some tokens as well as the `LSP7Mintable` _token contract address_.
We will import `LSP7Mintable` in order to get the _ABI_ of the contract that we will interact with.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');
const privateKey = '0x...';
const myTokenAddress = '0x...';

// setup your EOA
const account = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const privateKey = '0x...';
const myTokenAddress = '0x...';

// setup your EOA
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

### Step 2 - Instantiate contracts

At this point, the `LPS7Mintable` contract is being prepared for the following intercation. We construct an instance of a contract, using _contract ABI_ and _contract address_.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const myToken = new web3.eth.Contract(LSP7Mintable.abi, myTokenAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
const myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi);
```

  </TabItem>

</Tabs>

### Step 3 - Send transaction

Finally, we send the transaction and mint some tokens to the Universal Profile of your choosing.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
await myToken.methods.mint('<up-address>', 100, false, '0x').send({
  from: myEOA,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
await myToken.connect(myEOA).mint('<up-address>', 100, false, '0x');
```

  </TabItem>

</Tabs>

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');
const privateKey = '0x...';
const myTokenAddress = '0x...';

// setup your EOA
const account = web3.eth.accounts.wallet.add(privateKey);

const myToken = new web3.eth.Contract(LSP7Mintable.abi, myTokenAddress);

await myToken.methods.mint('<up-address>', 100, false, '0x').send({
  from: myEOA,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const privateKey = '0x...';
const myTokenAddress = '0x...';

// setup your EOA
const myEOA = new ethers.Wallet(privateKey).connect(provider);

const myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi);

await myToken.connect(myEOA).mint('<up-address>', 100, false, '0x');
```

  </TabItem>

</Tabs>
