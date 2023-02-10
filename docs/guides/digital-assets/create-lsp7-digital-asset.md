---
sidebar_label: 'Create an LSP7 Digital Asset (Token)'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an LSP7 Digital Asset (Token)

This guide will teach you how to create our token ([**LSP7 Digital Asset**](../../standards/nft-2.0/lsp7-digital-asset)).

## Deploy an LSP7 Digital Asset contract

We will use a specific implementation of LSP7, called `LSP7Mintable`. It allows the contract deployer to mint new tokens.

Before starting with the guide you will need to install the following dependencies.

<Tabs>
  
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

### Step 1 - Setup imports and constants

At this point you will need a private key in order to deploy an `LSP7Mintable` contract.
We will import `LSP7Mintable` in order to get the _ABI_ and _bytecode_ of the contract that will be deployed.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');

// initialize your EOA
const PRIVATE_KEY = '0x...';
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');

// setup your EOA
const PRIVATE_KEY = '0x...';
const myEOA = new ethers.Wallet(PRIVATE_KEY).connect(provider);
```

  </TabItem>

</Tabs>

### Step 2 - Instantiate contracts

At this point, the `LPS7Mintable` contract is being prepared for deployment.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
// create an instance
const myToken = new web3.eth.Contract(LSP7Mintable.abi, {
  gas: 5_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
// create an instance of the token contract
const lsp7Factory = new ethers.ContractFactory(
  LSP7Mintable.abi,
  LSP7Mintable.bytecode,
);
```

  </TabItem>

</Tabs>

### Step 3 - Send transactions

Finally, we deploy the contract.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
// deploy the token contract
await myToken
  .deploy({
    data: LSP7Mintable.bytecode,
    arguments: [
      'My LSP7 Token', // token name
      'LSP7', // token symbol
      account.address, // new owner, who will mint later
      false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
    ],
  })
  .send({
    from: account.address,
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
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

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');

// initialize your EOA
const PRIVATE_KEY = '0x...';
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

// create an instance
const myToken = new web3.eth.Contract(LSP7Mintable.abi, {
  gas: 5_000_000,
  gasPrice: '1000000000',
});

// deploy the token contract
await myToken
  .deploy({
    data: LSP7Mintable.bytecode,
    arguments: [
      'My LSP7 Token', // token name
      'LSP7', // token symbol
      account.address, // new owner, who will mint later
      false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
    ],
  })
  .send({
    from: account.address,
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');

// setup your EOA
const PRIVATE_KEY = '0x...';
const myEOA = new ethers.Wallet(PRIVATE_KEY).connect(provider);

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
