---
sidebar_label: 'Upgrade LSP6 Key Manager'
sidebar_position: 4
describtion: 'This guide explains how to change or upgrade the LSP6 Key Manager of a Universal Profile.'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrade the LSP6 Key Manager

:::info Requirements

You will need a Universal Profile that you can control via its [KeyManager](../../standards/universal-profile/lsp6-key-manager.md) to follow this guide.
If you don't have a Universal Profile yet, follow our previous guide [**Create a Universal Profile**](../universal-profile/create-profile.md) or look at the [_lsp-factory.js_](../../tools/lsp-factoryjs/deployment/universal-profile.md) docs.

:::

In this guide, we will learn how to upgrade the LSP6 Key Manager of your Universal Profile to the latest version available.

By the end of this guide, you will know how to:

- Deploy a new LSP6 Key Manager with the last updates.
- Upgrade your Key Manager by changing the owner of your UP from your old to your new Key Manager.

## Setup

Make sure you have the following dependencies installed before beginning this tutorial:

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

## Step 1 - Set up the constants and imports

Create a JavaScript file and add the following imports on the top of the file:

- `privateKey`: private key of a controller address, **MUST** have [**CHANGEOWNER**](../../standards/universal-profile/lsp6-key-manager.md#permissions) permission.
- `universalProfileAddress`: address of your Universal Profile.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```js title="Imports & Constants"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');

const privateKey = '0x...';
const universalProfileAddress = '0x...';
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```js title="Imports & Constants"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');

const privateKey = '0x...';
const universalProfileAddress = '0x...';
```

  </TabItem>

</Tabs>

## Step 2 - Initialize the controller account

In order to send any transaction on the blockchain you need an EOA. In our case that account MUST have [**`CHANGEOWNER`**](../../standards/universal-profile/lsp6-key-manager.md#permissions) permission on the Universal Profile that will have its LSP6 Key Manager upgraded.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```js title="Initialise EOA"
const account = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```js title="Initialise EOA"
const account = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

## Step 3 - Initialize UP contract

In order to transfer ownership of your Universal Profile, you need to initialize the UP's contract.

<!-- prettier-ignore-start -->

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```js title="Create an instance of the old Key Manager"
const universalProfile = new web3.eth.Contract(UniversalProfile.abi, universalProfileAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```js title="Create an instance of the old Key Manager"
const universalProfile = new ethers.Contract(universalProfileAddress, UniversalProfile.abi);
```

  </TabItem>

</Tabs>

<!-- prettier-ignore-end -->

## Step 4 - Deploy the new LSP6 Key Manager

Deploy a new LSP6 Key Manager with the latest updates.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```js title="Deploy a new Key Manager"
const newKeyManager = new web3.eth.Contract(LSP6KeyManager.abi);
await newKeyManager
  .deploy({
    data: LSP6KeyManager.bytecode,
    arguments: [universalProfileAddress],
  })
  .send({
    from: account.address,
    gas: 3_000_000,
    gasPrice: '1000000000',
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```js title="Deploy a new Key Manager"
const keyManagerFactory = new ethers.ContractFactory(
  LSP6KeyManager.abi,
  LSP6KeyManager.bytecode,
);
const newKeyManager = await keyManagerFactory.deploy(universalProfileAddress);
```

  </TabItem>

</Tabs>

## Step 5 - Upgrade your Key Manager

### Step 5.1 - Transfer Ownership to your new Key Manager

Create a calldata for the [`transferOwnership(address)`](../../standards/smart-contracts/lsp14-ownable-2-step.md#transferownership) function and shift the ownership of your Universal Profile from your current LSP6 Key Manager.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```js title="Transfer ownership of the Universal Profile from the old Key Manager to the new one"
await universalProfile.methods.transferOwnership(newKeyManager.address).send({
  from: account.address,
  gas: 1_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```js title="Transfer ownership of the Universal Profile from the old Key Manager to the new one"
await universalProfile
  .connect(account)
  .transferOwnership(newKeyManager.address);
```

  </TabItem>

</Tabs>

### Step 5.2 - Accept Ownership from your new Key Manager

Create a calldata for the [`claimOwnership()`](../../standards/smart-contracts/lsp14-ownable-2-step.md#acceptownership) function and take the ownership of your Universal Profile from your new LSP6 Key Manager.

<!-- prettier-ignore-start -->

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```js title="Accept ownership of the Universal Profile via the new Key Manager"
const acceptOwnershipCalldata = new web3.eth.Contract(UniversalProfile.abi).methods.acceptOwnership().encodeABI();

await newKeyManager.methods['execute(bytes)'](acceptOwnershipCalldata).send({
  from: account.address,
  gas: 1_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```js title="Accept ownership of the Universal Profile via the new Key Manager"
const acceptOwnershipCalldata = new ethers.Interface(UniversalProfile.abi).encodeFunctionData("acceptOwnership()");

await newKeyManager.connect(account)['execute(bytes)'](acceptOwnershipCalldata);
```

  </TabItem>

</Tabs>

<!-- prettier-ignore-end -->

:::success 🥳

The upgrade has been completed successfully.

:::

## Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```javascript title="upgrade-lsp6.js"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';
const web3 = new Web3('https://rpc.l16.lukso.network');

const privateKey = '0x...';
const universalProfileAddress = '0x...';
const keyManagerAddress = '0x...';

const upgradeLSP6 = async () => {
  // Initialize the controller account
  const account = web3.eth.accounts.wallet.add(privateKey);

  // Initialize your current UP
  const universalProfile = new web3.eth.Contract(UniversalProfile.abi, universalProfileAddress);

  // Deploy a new LSP6 Key Manager
  const newKeyManager = new web3.eth.Contract(LSP6KeyManager.abi);
  await newKeyManager.deploy({
    data: LSP6KeyManager.bytecode,
    arguments: [universalProfileAddress],
  }).send({
    from: account.address,
    gas: 3_000_000,
    gasPrice: '1000000000',
  });

  // Transfer the ownership of your Universal Profile from the current LSP6 Key Manager to a new LSP6 Key Manager
  await universalProfile.methods.transferOwnership(newKeyManager.address).send({
    from: account.address,
    gas: 1_000_000,
    gasPrice: '1000000000',
  });

  // Accept the ownership of your Universal Profile from the new LSP6 Key Manager
  const acceptOwnershipCalldata = new web3.eth.Contract(UniversalProfile.abi).methods.acceptOwnership().encodeABI();

  await newKeyManager.methods['execute(bytes)'](acceptOwnershipCalldata).send({
    from: account.address,
    gas: 1_000_000,
    gasPrice: '1000000000',
  });
};

await upgradeLSP6();
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```js title="upgrade-lsp6.js"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');

const privateKey = '0x...';
const universalProfileAddress = '0x...';
const keyManagerAddress = '0x...';

const upgradeLSP6 = async () => {
  // Initialize the controller account
  const account = new ethers.Wallet(privateKey).connect(provider);

  // Initialize your current UP
  const universalProfile = new ethers.Contract(universalProfileAddress, UniversalProfile.abi);

  // Deploy a new LSP6 Key Manager
  const keyManagerFactory = new ethers.ContractFactory(
    LSP6KeyManager.abi,
    LSP6KeyManager.bytecode,
  );
  const newKeyManager = await keyManagerFactory.deploy(universalProfileAddress);

  // Transfer the ownership of your Universal Profile from the current LSP6 Key Manager to a new LSP6 Key Manager
  await universalProfile
    .connect(account)
    .transferOwnership(newKeyManager.address);

  // Accept the ownership of your Universal Profile from the new LSP6 Key Manager
  const acceptOwnershipCalldata = new ethers.Interface(UniversalProfile.abi).encodeFunctionData("acceptOwnership()");

  await newKeyManager.connect(account)['execute(bytes)'](acceptOwnershipCalldata);
};

await upgradeLSP6();
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

## Test the new LSP6 Key Manager

We can now check the owner of the Universal Profile. If everything went through, the owner should be the address of the new LSP6 Key Manager.
Create the following file with the name `test-new-lsp6.js` and run:

```shell
node test-new-lsp6.js
```

<!-- prettier-ignore-start -->

```javascript title="test-new-lsp6.js"
import LSP0ERC725YAccount from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725YAccount.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');

const universalProfileAddress = '0x...';
const keyManagerAddress = '0x...';

const testLSP6 = async () => {
  const universalProfile = new web3.eth.Contract(LSP0ERC725YAccount.abi, universalProfileAddress);

  const universalProfileOwner = await universalProfile.methods.owner().call();

  console.log(`The new owner of the Universal Profile is: ${universalProfileOwner}`);
  console.log(`The old LSP6 Key Manager is at address: ${keyManagerAdderss}`);

  const keyManager = new web3.eth.Contract(LSP6KeyManager.abi, universalProfileOwner);

  const keyManagerTarget = await keyManager.methods.target().call();

  console.log(`The address of the Universal Profile is: ${universalProfile._address}`);
  console.log(`The target of the new LSP6 Key Manager: ${keyManagerTarget}`);
};

await testLSP6();
```

<!-- prettier-ignore-end -->
