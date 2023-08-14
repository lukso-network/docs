---
sidebar_label: 'Transfer a LSP7 Digital Asset (Token)'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an LSP7 Digital Asset (Token)

This guide will teach you how to tranfer an existing [LSP7 Digital Asset](../../standards/nft-2.0/LSP7-Digital-Asset.md) from a [Universal Profile](../../standards/universal-profile/lsp0-erc725account.md) controlled by a [Key Manager](../../standards//universal-profile/lsp6-key-manager.md) to another Universal Profile.

## Transfer tokens to an other Universal Profile

The following code snippet shows how to transfer 15 tokens from your Universal Profile to another Universal Profile.

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

At this point, you will need:

- The address & ABI of the LSP7DigitalAsset token contract.
- The address & ABI of the Universal Profile.
- The private key of the [controller](../../standards/universal-profile/lsp6-key-manager.md) of your Universal Profile.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const privateKey = '0x...';
const myUniversalProfileAddress = '0x...';
const myTokenAddress = '0x...';
const receiverUniversalProfileAddress = '0x...';

// setup your controller adddress
const account = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const privateKey = '0x...';
const myUniversalProfileAddress = '0x...';
const myTokenAddress = '0x...';
const receiverUniversalProfileAddress = '0x...';

// setup your controller address
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

### Step 2 - Instantiate contracts

At this point, the `LSP7Mintable` and `UniversalProfile` contracts are being prepared for the following interactions. Construct an instance of a contract, using _contract ABI_ and _contract address_.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```javascript
const myUniversalProfile = new web3.eth.Contract(UniversalProfile.abi, myUniversalProfileAddress);

const myToken = new web3.eth.Contract(LSP7Mintable.abi, myTokenAddress);
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```javascript
const myUniversalProfile = new ethers.Contract(myUniversalProfileAddress, UniversalProfile.abi);

const myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi);
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

### Step 3 - Setup the token trasnfer calldata

Now we need to prepare the calldata to transfer tokens from a Universal Profile to another UP.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```javascript
// generate the calldata to transfer tokens
const tokenCalldata = myToken.methods
  .transfer(myUniversalProfileAddress, receiverUniversalProfileAddress, 15, false, '0x')
  .encodeABI();
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
// generate the calldata to transfer tokens
const tokenCalldata = myToken.interface.encodeFunctionData('transfer', [
  myUniversalProfileAddress,
  receiverUniversalProfileAddress,
  15,
  false,
  '0x',
]);
```

  </TabItem>

</Tabs>

### Step 4 - Send transaction

Finally we send the transaction and transfer the tokens from a Universal Profile to another.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```javascript
// execute the token transfer through the UP
await myUniversalProfile.methods.execute(
  0, // operation 0 CALL
  myTokenAddress,
  0, // 0  LYX sent
  tokenCalldata,
).send({
  from: myEOA,
  gas: 500_000,
});
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```javascript
// execute the token transfer through the UP
await myUniversalProfile
  .connect(myEOA)
  .execute(
    0, // operation 0 CALL
    myTokenAddress,
    0, // 0  LYX sent
    tokenCalldata,
  );
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const privateKey = '0x...';
const myUniversalProfileAddress = '0x...';
const myTokenAddress = '0x...';
const receiverUniversalProfileAddress = '0x...';

// setup your EOA
const account = web3.eth.accounts.wallet.add(privateKey);

const myUniversalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  myUniversalProfileAddress,
);

const myToken = new web3.eth.Contract(LSP7Mintable.abi, myTokenAddress);

// generate the calldata to transfer tokens
const tokenCalldata = myToken.methods
  .transfer(
    myUniversalProfileAddress,
    receiverUniversalProfileAddress,
    15,
    false,
    '0x',
  )
  .encodeABI();

// execute the token transfer through the UP
await myUniversalProfile.methods.execute(
  0, // operation 0 CALL
  myTokenAddress,
  0, // 0  LYX sent
  tokenCalldata,
).send({
  from: myEOA,
  gas: 500_000,
});
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const privateKey = '0x...';
const myUniversalProfileAddress = '0x...';
const myTokenAddress = '0x...';
const receiverUniversalProfileAddress = '0x...';

// setup your EOA
const myEOA = new ethers.Wallet(privateKey).connect(provider);

const myUniversalProfile = new ethers.Contract(
  myUniversalProfileAddress,
  UniversalProfile.abi,
);

const myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi);

// generate the calldata to transfer tokens
const tokenCalldata = myToken.interface.encodeFunctionData('transfer', [
  myUniversalProfileAddress,
  receiverUniversalProfileAddress,
  15,
  false,
  '0x',
]);

// execute the token transfer through the UP
await myUniversalProfile
  .connect(myEOA)
  .execute(
    0, // operation 0 CALL
    myTokenAddress,
    0, // 0  LYX sent
    tokenCalldata,
  );
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>
