---
sidebar_label: '📐 Upgrade Key Manager'
sidebar_position: 4
description: This advanced tutorial shows how you can upgrade the `owner()` of a Universal Profile. For instance upgrading the Key Manager with a better one.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrade Key Manager

:::danger Warning

This guide is an **advanced guide**. It is intended for developers who are looking to upgrade the Key Manager of their Universal Profile to a new one. For instance, if a new Key Manager with enhanced features.

For normal user using the UP Browser Extension, their UP is currently setup with a basic Key Manager already deployed for them on profile creation. **It is therefore not recommended to follow this guide as this could affect the functionality of their UP, making it not possible to interact with it via the Browser Extension**.

:::

This advanced guide shows how to upgrade the [`LSP6KeyManager`](../../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md) of your UP, which is the [`owner()`](../../../contracts/contracts/UniversalProfile.md#owner) of the [`UniversalProfile`](../../../contracts/contracts/UniversalProfile.md). We will:

1. Deploy a new `LSP6KeyManager` contract on LUKSO Testnet.
2. Upgrade by transferring ownership of the UniversalProfile to the newly deployed `LSP6KeyManager`.
3. Confirm the upgrade by accepting ownership via the new Key Manager.

## Setup

Make sure you have the following dependencies installed before beginning this tutorial:

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

## Step 1 - Set up constants and imports

Create a JavaScript file and add the following imports on the top of the file:

- `privateKey`: private key of a controller address, **MUST** have [**CHANGEOWNER**](../../../standards/access-control/lsp6-key-manager.md#permissions) permission.
- `universalProfileAddress`: address of your Universal Profile.

<Tabs>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js title="Imports & Constants"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);

const privateKey = '0x...';
const universalProfileAddress = '0x...';
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js title="Imports & Constants"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

const privateKey = '0x...';
const universalProfileAddress = '0x...';
```

  </TabItem>

</Tabs>

## Step 2 - Initialize the controller

> **Requirement:** the EOA controller that we will use MUST have the [**`CHANGEOWNER`**](../../../standards/access-control/lsp6-key-manager.md#permissions) permission on the UP

<Tabs>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js title="Initialise EOA"
const account = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js title="Initialise EOA"
const account = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

</Tabs>

## Step 3 - Initialize UP contract

In order to transfer ownership of your Universal Profile, you need to initialize the UP's contract.

<Tabs>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js title="Create an instance of the old Key Manager"
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js title="Create an instance of the old Key Manager"
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);
```

  </TabItem>

</Tabs>

## Step 4 - Deploy the new Key Manager

Deploy a new LSP6 Key Manager with the latest updates.

<Tabs>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js title="Deploy a new Key Manager"
const newKeyManager = await new ethers.ContractFactory(
  LSP6KeyManager.abi,
  LSP6KeyManager.bytecode,
)
  .connect(account)
  .deploy(universalProfileAddress);
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

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

</Tabs>

## Step 5 - Upgrade your Key Manager

### Step 5.1 - Transfer Ownership to your new Key Manager

Create a calldata for the [`transferOwnership(address)`](../../../contracts/contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#transferownership) function and shift the ownership of your Universal Profile from your current LSP6 Key Manager.

<Tabs>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js title="Transfer ownership of the Universal Profile from the old Key Manager to the new one"
await universalProfile
  .connect(account)
  .transferOwnership(newKeyManager.address);
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js title="Transfer ownership of the Universal Profile from the old Key Manager to the new one"
await universalProfile.methods.transferOwnership(newKeyManager.address).send({
  from: account.address,
  gas: 1_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

</Tabs>

### Step 5.2 - Accept Ownership from your new Key Manager

Create a calldata for the [`acceptOwnership()`](../../../contracts/contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#acceptownership) function and take the ownership of your Universal Profile from your new LSP6 Key Manager.

<Tabs>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js title="Accept ownership of the Universal Profile via the new Key Manager"
const acceptOwnershipCalldata = new ethers.Interface(
  UniversalProfile.abi,
).encodeFunctionData('acceptOwnership()');

await newKeyManager.connect(account).execute(acceptOwnershipCalldata);
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js title="Accept ownership of the Universal Profile via the new Key Manager"
const acceptOwnershipCalldata = new web3.eth.Contract(
  UniversalProfile.abi,
).methods
  .acceptOwnership()
  .encodeABI();

await newKeyManager.methods.execute(acceptOwnershipCalldata).send({
  from: account.address,
  gas: 1_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

</Tabs>

:::success 🥳

The upgrade has been completed successfully.

:::

## Final code

<Tabs>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js title="upgrade-lsp6.js"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);

const privateKey = '0x...';
const universalProfileAddress = '0x...';

const upgradeLSP6 = async () => {
  // Initialize the controller account
  const account = new ethers.Wallet(privateKey).connect(provider);

  // Initialize your current UP
  const universalProfile = new ethers.Contract(
    universalProfileAddress,
    UniversalProfile.abi,
  );

  // Deploy a new LSP6 Key Manager
  const newKeyManager = await new ethers.ContractFactory(
    LSP6KeyManager.abi,
    LSP6KeyManager.bytecode,
  )
    .connect(account)
    .deploy(universalProfileAddress);

  // Transfer the ownership of your Universal Profile from the current LSP6 Key Manager to a new LSP6 Key Manager
  await universalProfile
    .connect(account)
    .transferOwnership(newKeyManager.address);

  // Accept the ownership of your Universal Profile from the new LSP6 Key Manager
  const acceptOwnershipCalldata = new ethers.Interface(
    UniversalProfile.abi,
  ).encodeFunctionData('acceptOwnership()');

  await newKeyManager.connect(account).execute(acceptOwnershipCalldata);
};

await upgradeLSP6();
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```javascript title="upgrade-lsp6.js"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';
const web3 = new Web3('https://rpc.testnet.lukso.network');

const privateKey = '0x...';
const universalProfileAddress = '0x...';

const upgradeLSP6 = async () => {
  // Initialize the controller account
  const account = web3.eth.accounts.wallet.add(privateKey);

  // Initialize your current UP
  const universalProfile = new web3.eth.Contract(
    UniversalProfile.abi,
    universalProfileAddress,
  );

  // Deploy a new LSP6 Key Manager
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

  // Transfer the ownership of your Universal Profile from the current LSP6 Key Manager to a new LSP6 Key Manager
  await universalProfile.methods.transferOwnership(newKeyManager.address).send({
    from: account.address,
    gas: 1_000_000,
    gasPrice: '1000000000',
  });

  // Accept the ownership of your Universal Profile from the new LSP6 Key Manager
  const acceptOwnershipCalldata = new web3.eth.Contract(
    UniversalProfile.abi,
  ).methods
    .acceptOwnership()
    .encodeABI();

  await newKeyManager.methods.execute(acceptOwnershipCalldata).send({
    from: account.address,
    gas: 1_000_000,
    gasPrice: '1000000000',
  });
};

await upgradeLSP6();
```

  </TabItem>

</Tabs>

## Test the new LSP6 Key Manager

We can now check the owner of the Universal Profile. If everything went through, the owner should be the address of the new LSP6 Key Manager.
Create the following file with the name `test-new-lsp6.js` and run:

```shell
node test-new-lsp6.js
```

```javascript title="test-new-lsp6.js"
import LSP0ERC725YAccount from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725YAccount.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

const universalProfileAddress = '0x...';

const testLSP6 = async () => {
  const universalProfile = new web3.eth.Contract(
    LSP0ERC725YAccount.abi,
    universalProfileAddress,
  );

  const universalProfileOwner = await universalProfile.methods.owner().call();

  console.log(
    `The new owner of the Universal Profile is: ${universalProfileOwner}`,
  );
  console.log(`The old LSP6 Key Manager is at address: ${keyManagerAddress}`);

  const keyManager = new web3.eth.Contract(
    LSP6KeyManager.abi,
    universalProfileOwner,
  );

  const keyManagerTarget = await keyManager.methods.target().call();

  console.log(
    `The address of the Universal Profile is: ${universalProfile._address}`,
  );
  console.log(`The target of the new LSP6 Key Manager: ${keyManagerTarget}`);
};

await testLSP6();
```
