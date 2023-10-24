---
sidebar_label: '🌄 Create LSP7 Token'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create LSP7 Token

:::caution

This article is a WIP

:::

This guide will teach you how to create an [LSP7 Digital Asset contract](../../standards/tokens/LSP7-Digital-Asset.md).

## Deploy an LSP7 Digital Asset contract

We will use a specific implementation of LSP7, called `LSP7Mintable`. It allows the contract deployer to mint new tokens.

Make sure you have the following dependencies installed:

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

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

At this point you will need a private key in order to deploy an `LSP7Mintable` contract.
We will import `LSP7Mintable` in order to get the _ABI_ and _bytecode_ of the contract that will be deployed.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

// initialize your EOA
const privateKey = '0x...';
const account = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);

// setup your EOA
const privateKey = '0x...';
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

### Step 2 - Instantiate contracts

At this point, the `LPS7Mintable` contract is being prepared for deployment.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const myToken = new web3.eth.Contract(LSP7Mintable.abi, {
  gas: 5_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
const lsp7Factory = new ethers.ContractFactory(
  LSP7Mintable.abi,
  LSP7Mintable.bytecode,
);
```

  </TabItem>

</Tabs>

### Step 3 - Send transaction

Finally, deploy the contract.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```javascript title="Deploy the LSP7 Digital Asset contract"
await myToken.deploy({
    data: LSP7Mintable.bytecode,
    arguments: [
      'My LSP7 Token', // token name
      'LSP7', // token symbol
      account.address, // new owner, who will mint later
      false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
    ],
  })
  .send({ from: account.address });
```
<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript title="Deploy the LSP7 Digital Asset contract"
const myToken = await lsp7Factory.connect(myEOA).deploy(
  'My LSP7 Token', // token name
  'LSP7', // token symbol
  myEOA.address, // new owner, who will mint later
  false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
);
```

  </TabItem>

</Tabs>

### Final code

<!-- prettier-ignore-start -->

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

// initialize your EOA
const privateKey = '0x...';
const account = web3.eth.accounts.wallet.add(privateKey);

// create a contract instance
const myToken = new web3.eth.Contract(LSP7Mintable.abi, {
  gas: 5_000_000,
  gasPrice: '1000000000',
});

// deploy the token contract
await myToken.deploy({
    data: LSP7Mintable.bytecode,
    arguments: [
      'My LSP7 Token', // token name
      'LSP7', // token symbol
      account.address, // new owner, who will mint later
      false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
    ],
  })
  .send({ from: account.address });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.network');

// set up your EOA
const privateKey = '0x...';
const myEOA = new ethers.Wallet(privateKey).connect(provider);

// create an instance of the token contract
const lsp7Factory = new ethers.ContractFactory(
  LSP7Mintable.abi,
  LSP7Mintable.bytecode,
);

// deploy the token contract
const myToken = await lsp7Factory.connect(myEOA).deploy(
  'My LSP7 Token', // token name
  'LSP7', // token symbol
  myEOA.address, // new owner, who will mint later
  false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
);
```

  </TabItem>

</Tabs>

<!-- prettier-ignore-end -->
