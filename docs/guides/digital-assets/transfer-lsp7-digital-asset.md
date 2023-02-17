---
sidebar_label: 'Transfer an LSP7 Digital Asset (Token)'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an LSP7 Digital Asset (Token)

This guide will teach you how to tranfer an existing ([LSP7 Digital Asset](../../standards/nft-2.0/lsp7-digital-asset)) from a [**Universal Profile**](../../standards/universal-profile/lsp0-erc725account.md) controlled by a [**Key Manager**](../../standards//universal-profile/lsp6-key-manager.md) to another Universal Profile.

## Transfer tokens to an other Universal Profile

The following code snippet shows how to transfer 15 tokens from your Universal Profile to another Universal Profile.

Make sure you have the following dependencies installed before beginning this tutorial.

- You can use either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- You MUST install [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

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

At this point you will need a private key in order to transfer some tokens as well as the `LSP7Mintable` _token contract address_ and the _address of the Universal Profile_ that has some tokens.
We will import `LSP7Mintable`, `UniversalProfile`, `KeyManager` in order to get the _ABIs_ of the contracts that we will interact with.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');
const privateKey = '0x...';
const myUniversalProfileAddress = '0x...';
const myTokenAddress = '0x...';

// setup your EOA
const account = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const privateKey = '0x...';
const myUniversalProfileAddress = '0x...';
const myTokenAddress = '0x...';

// setup your EOA
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

### Step 2 - Instantiate contracts

At this point, the `LSP7Mintable`, `UniversalProfile`, `KeyManager` contracts are being prepared for the following interactions. Construct an instance of a contract, using _contract ABI_ and _contract address_.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const myUniversalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  myUniversalProfileAddress,
);

const owner = await myUniversalProfile.methods.owner();
const myKeyManager = new web3.eth.Contract(KeyManager.abi, owner);

const myToken = new web3.eth.Contract(LSP7Mintable.abi, myTokenAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
const myUniversalProfile = new ethers.Contract(
  myUniversalProfileAddress,
  UniversalProfile.abi,
);

const owner = await myUniversalProfile.methods.owner();
const myKeyManager = new ethers.Contract(owner, KeyManager.abi);

const myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi);
```

  </TabItem>

</Tabs>

### Step 3 - Setup the calldatas

Now we need to prepare the calldatas that we will use in order to transfer tokens from a Universal Profile to another. First calldata is a token tarnsfer. Second calldata is an interaction of the Universal Profile with the Token contract.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
// 1. generate the calldata to transfer tokens
const tokenCalldata = myToken.methods
  .transfer(myUniversalProfileAddress, '<receiver-up-address>', 15, false, '0x')
  .encodeABI();

// 2. generate calldata for Universal Profile to execute the token transfer on the token contract
const upCalldata = myUniversalProfile.methods[
  'execute(uint256,address,uint256,bytes)'
](
  0, // operation 0 CALL
  myToken._address,
  0, // 0  LYX sent
  tokenCalldata,
).encodeABI();
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
// 1. generate the calldata to transfer tokens
const tokenCalldata = myToken.interface.encodeFunctionData('transfer', [
  myUniversalProfileAddress,
  '<receiver-up-address>',
  15,
  false,
  '0x',
]);

// 2. generate calldata for Universal Profile to execute the token transfer on the token contract
const upCalldata = myUniversalProfile.interface.encodeFunctionData('execute', [
  0, // operation 0 CALL
  myToken._address,
  0, // 0  LYX sent
  tokenCalldata,
]);
```

  </TabItem>

</Tabs>

### Step 4 - Send transaction

Finally we send the transaction and transfer the tokens from a Universal Profile to another.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
// 3. execute via the KeyManager
await myKeyManager.methods['execute(bytes)'](upCalldata).send({
  from: myEOA,
  gas: 5_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
// 3. execute via the KeyManager
await myKeyManager.connect(myEOA)['execute(bytes)'](upCalldata);
```

  </TabItem>

</Tabs>

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');
const privateKey = '0x...';
const myUniversalProfileAddress = '0x...';
const myTokenAddress = '0x...';

// setup your EOA
const account = web3.eth.accounts.wallet.add(privateKey);

const myUniversalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  myUniversalProfileAddress,
);

const owner = await myUniversalProfile.methods.owner();
const myKeyManager = new web3.eth.Contract(KeyManager.abi, owner);

const myToken = new web3.eth.Contract(LSP7Mintable.abi, myTokenAddress);

// 1. generate the calldata to transfer tokens
const tokenCalldata = myToken.methods
  .transfer(myUniversalProfileAddress, '<receiver-up-address>', 15, false, '0x')
  .encodeABI();

// 2. generate calldata for Universal Profile to execute the token transfer on the token contract
const upCalldata = myUniversalProfile.methods[
  'execute(uint256,address,uint256,bytes)'
](
  0, // operation 0 CALL
  myToken._address,
  0, // 0  LYX sent
  tokenCalldata,
).encodeABI();

// 3. execute via the KeyManager
await myKeyManager.methods['execute(bytes)'](upCalldata).send({
  from: myEOA,
  gas: 5_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const privateKey = '0x...';
const myUniversalProfileAddress = '0x...';
const myTokenAddress = '0x...';

// setup your EOA
const myEOA = new ethers.Wallet(privateKey).connect(provider);

const myUniversalProfile = new ethers.Contract(
  myUniversalProfileAddress,
  UniversalProfile.abi,
);

const owner = await myUniversalProfile.methods.owner();
const myKeyManager = new ethers.Contract(owner, KeyManager.abi);

const myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi);

// 1. generate the calldata to transfer tokens
const tokenCalldata = myToken.interface.encodeFunctionData('transfer', [
  myUniversalProfileAddress,
  '<receiver-up-address>',
  15,
  false,
  '0x',
]);

// 2. generate calldata for Universal Profile to execute the token transfer on the token contract
const upCalldata = myUniversalProfile.interface.encodeFunctionData('execute', [
  0, // operation 0 CALL
  myToken._address,
  0, // 0  LYX sent
  tokenCalldata,
]);

// 3. execute via the KeyManager
await myKeyManager.connect(myEOA)['execute(bytes)'](upCalldata);
```

  </TabItem>

</Tabs>
