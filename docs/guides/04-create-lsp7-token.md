---
sidebar_label: 'Create an LSP7 Token'
sidebar_position: 2.4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an LSP7 Token

In this guide, we will learn how to create our own token (known as LSP7 Digital Asset) and transfer it between Universal Profiles (UP).

## Deploy your own LSP7 Token Contract

We will use a specific implementation of LSP7, called `LSP7Mintable`. It allows the contract deployer to mint new tokens.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/universalprofile-smart-contracts/artifacts/LSP7Mintable.json';

const myEOA = '<address-of-up-owner>';
const tokenParams = [
  'My LSP7 Token', // token name
  'LSP7', // token symbol
  myEOA, // new owner
  false, // isNFT (make your token divisible or not)
];

// create an instance
const myToken = new web3.eth.Contract(LSP7Mintable.abi, {
  gas: 5_000_000,
  gasPrice: '1000000000',
});

// deploy the token contract
await myToken
  .deploy({ data: LSP7Mintable.bytecode, arguments: tokenParams })
  .send({ from: myEOA });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/universalprofile-smart-contracts/artifacts/LSP7Mintable.json';

const myEOA = '<address-of-up-owner>';
const tokenParams = [
  'My LSP7 Token', // token name
  'LSP7', // token symbol
  myEOA, // new owner
  false, // isNFT (make your token divisible or not)
];

// deploy + create an instance of the token contract
const lsp7Factory = await ethers.getContractFactory('LSP7Mintable');
const myToken = await lsp7Factory.deploy(tokenParams);
```

  </TabItem>

</Tabs>

## Mint tokens for your Universal Profile

The code snippet below shows how to mint 100 tokens with your Universal Profile as a beneficiary.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
await myToken.methods
  .mint('<up-address>', 100, false, '0x')
  .send({ from: myEOA });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
await myToken.connect(myEOA).mint('<up-address>', 100, false, '0x');
```

  </TabItem>

</Tabs>

## Transfer tokens between Universal Profiles

The following code snippet show how to transfer 15 tokens from your UP to another UP called `bobUP`.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const bobUP = '<bob-up-address>';
const amount = 15;

// 1. generate the payload to transfer tokens
const tokenPayload = myToken.methods
  .transfer('<up-address>', bobUP, amount, false, '0x')
  .encodeABI();

// 2. generate payload for Universal Profile to execute the token transfer on the token contract
const upPayload = myUniversalProfile.methods
  .execute(0, myToken._address, 0, tokenPayload)
  .encodeABI();

// 3. execute via the KeyManager
await myKeyManager.methods.execute(upPayload).send({
  from: myEOA,
  gas: 5_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
const bobUP = '<bob-up-address>';
const amount = 15;

// 1. generate the payload to transfer tokens
const tokenPayload = myToken.interface.encodeFunctionData('transfer', [
  '<up-address>',
  bobUP,
  amount,
  false,
  '0x',
]);

// 2. generate payload for Universal Profile to execute the token transfer on the token contract
const upPayload = myUniversalProfile.interface.encodeFunctionData('execute', [
  0,
  myToken._address,
  0,
  tokenPayload,
]);

// 3. execute via the KeyManager
await myKeyManager.connect(myEOA).execute(upPayload, ({
  from: myEOA.address,
  gas: 5_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

</Tabs>
