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

```shell
npm install @lukso/lsp-smart-contracts web3
```

## Step 1 - Set up the constants and imports

Create a JavaScript file and add the following imports on the top of the file:

- `privateKey`: private key of a controller address, **MUST** have [**CHANGEOWNER**](../../standards/universal-profile/lsp6-key-manager.md#permissions) permission.
- `keyManagerAddress`: address of the current LSP6 Key Manager.
- `universalProfileAddress`: address of your Universal Profile.

```js
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json' assert { type: 'json' };
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');

const privateKey = '0x...';
const universalProfileAddress = '0x...';
const keyManagerAddress = '0x...';
```

## Step 2 - Initialize the controller account

In order to send any transaction on the blockchain you need an account, in our case that account MUST have [**CHANGEOWNER**](../../standards/universal-profile/lsp6-key-manager.md#permissions) permission on the Universal Profile that will have its LSP6 Key Manager upgraded.

```js
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
```

## Step 3 - Initialize the old LSP6 Key Manager

In order to transfer ownership of your Universal Profile, you need to initialize your current LSP6 Key Manager.

<!-- prettier-ignore-start -->

```js
const oldKeyManager = new web3.eth.Contract(LSP6KeyManager.abi, keyManagerAddress);
```

<!-- prettier-ignore-end -->

## Step 4 - Deploy the new LSP6 Key Manager

Deploy a new LSP6 Key Manager with the latest updates.

```js
const NewKeyManager = new web3.eth.Contract(LSP6KeyManager.abi);
const newKeyManager = await NewKeyManager.deploy({
  data: LSP6KeyManager.bytecode,
  arguments: [universalProfileAddress],
}).send({
  from: account.address,
  gas: 3000000,
  gasPrice: '1000000000',
});

console.log(newKeyManager._address);
```

## Step 5 - Upgrade your Key Manager

### Step 5.1 - Transfer Ownership to your new Key Manager

Create a payload for the [`transferOwnership(address)`](../../standards/smart-contracts/lsp14-ownable-2-step.md#transferownership) function and shift the ownership of your Universal Profile from your current LSP6 Key Manager.

```js
const transferOwnershipPayload =
  web3.eth.abi.encodeFunctionSignature('transferOwnership(address)') +
  web3.eth.abi.encodeParameter('address', newKeyManager._address).substring(2);

await oldKeyManager.methods['execute(bytes)'](transferOwnershipPayload).send({
  from: account.address,
  gas: 1000000,
  gasPrice: '1000000000',
});
```

### Step 5.2 - Accept Ownership from your new Key Manager

Create a payload for the [`claimOwnership()`](../../standards/smart-contracts/lsp14-ownable-2-step.md#acceptownership) function and take the ownership of your Universal Profile from your new LSP6 Key Manager.

<!-- prettier-ignore-start -->

```js
const claimOwnershipPayload = web3.eth.abi.encodeFunctionSignature('claimOwnership()');

await newKeyManager.methods['execute(bytes)'](claimOwnershipPayload).send({
  from: account.address,
  gas: 1000000,
  gasPrice: '1000000000',
});
```

<!-- prettier-ignore-end -->

:::success 🥳

The upgrade has been completed successfully.

:::

## Final code

<!-- prettier-ignore-start -->

```javascript title="upgrade-lsp6.js"
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json' assert { type: 'json' };
import Web3 from 'web3';
const web3 = new Web3('https://rpc.l16.lukso.network');

const privateKey = '0x...';
const universalProfileAddress = '0x...';
const keyManagerAddress = '0x...';

const upgradeLSP6 = async () => {
  // Initialize the controller account
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  // Initialize your current LSP6 Key Manager
  const oldKeyManager = new web3.eth.Contract(LSP6KeyManager.abi, keyManagerAddress);

  // Deploy a new LSP6 Key Manager
  const NewKeyManager = new web3.eth.Contract(LSP6KeyManager.abi);
  const newKeyManager = await NewKeyManager.deploy({
    data: LSP6KeyManager.bytecode,
    arguments: [universalProfileAddress],
  }).send({
    from: account.address,
    gas: 3000000,
    gasPrice: '1000000000',
  });

  // Transfer the ownership of your Universal Profile from the current LSP6 Key Manager to a new LSP6 Key Manager
  const transferOwnershipPayload =
    web3.eth.abi.encodeFunctionSignature('transferOwnership(address)') +
    web3.eth.abi.encodeParameter('address', newKeyManager._address).substring(2);

  await oldKeyManager.methods['execute(bytes)'](transferOwnershipPayload).send({
    from: account.address,
    gas: 1000000,
    gasPrice: '1000000000',
  });

  // Accept the ownership of your Universal Profile from the new LSP6 Key Manager
  const claimOwnershipPayload = web3.eth.abi.encodeFunctionSignature('claimOwnership()');

  await newKeyManager.methods['execute(bytes)'](claimOwnershipPayload).send({
    from: account.address,
    gas: 1000000,
    gasPrice: '1000000000',
  });
};

await upgradeLSP6();
```

<!-- prettier-ignore-end -->

## Test the new LSP6 Key Manager

We can now check the owner of the Universal Profile. If everything went through, the owner should be the address of the new LSP6 Key Manager.
Create the following file with the name `test-new-lsp6.js` and run:

```shell
node test-new-lsp6.js
```

<!-- prettier-ignore-start -->

```javascript title="test-new-lsp6.js"
import LSP0ERC725YAccount from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725YAccount.json' assert { type: 'json' };
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json' assert { type: 'json' };
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
