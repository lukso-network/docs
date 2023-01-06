---
sidebar_label: 'Upgrade LSP6 Key Manager'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrade the LSP6 Key Manager

:::info Requirements

You will need a Universal Profile that you can control via its KeyManager to follow this guide. <br/>
If you don't have a Universal Profile yet, follow our previous guide [**Create a Universal Profile**](../universal-profile/create-profile.md) or look at the [_lsp-factory.js_](../../tools/lsp-factoryjs/deployment/universal-profile.md) docs.

:::

In this guide, we will learn how upgrade the LSP6 Key Manager of your Universal Profile to the latest version available.

By the end of this guide, you will know:

- How to deploy a new LSP6 Key Manager with the last updates.
- How to transfer ownership of your Universal Profile through the old LSP6 Key Manager.
- How to accept ownership of your Universal Profile through the new LSP6 Key Manager

## Setup

```shell
npm install @lukso/lsp-smart-contracts, web3
```

## Step 1 - Create `constants.js` file and save the needed constants

Create a `constants.js` file with the following constants

- PRIVATE_KEY = private key of a conroller address
- keyManagerAddress = address of the current LSP6 Key Manager
- universalProfileAddress = address of your Universal Profile
  This controller must have CHANGEOWNER permission

After this first step you can save & close `constants.js`.

```js
export const PRIVATE_KEY = '0x...';
export const universalProfileAddress = '0x...';
export const keyManagerAddress = '0x...';
```

## Step 2 - Create `upgrade-lsp6.js` and get the imports

Create a file with the name `upgarde-lsp6.js` and you should have the following imports on the top of the file.

```js
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json' assert { type: 'json' };
import {
  PRIVATE_KEY,
  keyManagerAddress,
  universalProfileAddress,
} from './constants.js';
import Web3 from 'web3';
const web3 = new Web3('https://rpc.l14.lukso.network');
```

## Step 3 - Initialize the controller account

In order to use the controller account you need to initialize it using web3.js.

```js
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
```

## Step 4 - Initialize the old LSP6 Key Manager

In order to transfer ownership of your Universal Profile you need to initialize your current LSP6 Key Manager.

```js
const oldKeyManager = new web3.eth.Contract(
  LSP6KeyManager.abi,
  keyManagerAddress,
);
```

## Step 5 - Deploy the new LSP6 Key Manager

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

## Step 6 - Transfer ownership of the Universal Profile

Create a payload for `transferOwnership(address)` and tarnsfer the ownership of your Universal Profile from your current LSP6 Key Manager.

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

## Step 7 - Claim ownership of the Universal Profile

Create a payload for `claimOwnership()` and claim the ownership of your Universal Profile from your new LSP6 Key Manager.

```js
const claimOwnershipPayload =
  web3.eth.abi.encodeFunctionSignature('claimOwnership()');

await newKeyManager.methods['execute(bytes)'](claimOwnershipPayload).send({
  from: account.address,
  gas: 1000000,
  gasPrice: '1000000000',
});
```

## Final code

```javascript title="constants.js"
export const PRIVATE_KEY = '0x...';
export const universalProfileAddress = '0x...';
export const keyManagerAddress = '0x...';
```

```javascript title="upgrade-lsp6.js"
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json' assert { type: 'json' };
import {
  PRIVATE_KEY,
  keyManagerAddress,
  universalProfileAddress,
} from './constants.js';
import Web3 from 'web3';
const web3 = new Web3('https://rpc.l14.lukso.network');

const upgradeLSP6 = async () => {
  // Initialize the controller account
  const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
  web3.eth.accounts.wallet.add(account);

  // Initialize your current LSP6 Key Manager
  const oldKeyManager = new web3.eth.Contract(
    LSP6KeyManager.abi,
    keyManagerAddress,
  );

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

  console.log(newKeyManager._address);

  // Transfer the ownership of your Universal Profile from the current LSP6 Key Manager to a new LSP6 Key Manager
  const transferOwnershipPayload =
    web3.eth.abi.encodeFunctionSignature('transferOwnership(address)') +
    web3.eth.abi
      .encodeParameter('address', newKeyManager._address)
      .substring(2);

  await oldKeyManager.methods['execute(bytes)'](transferOwnershipPayload).send({
    from: account.address,
    gas: 1000000,
    gasPrice: '1000000000',
  });

  // Accept the ownership of your Universal Profile from the new LSP6 Key Manager
  const claimOwnershipPayload =
    web3.eth.abi.encodeFunctionSignature('claimOwnership()');

  await newKeyManager.methods['execute(bytes)'](claimOwnershipPayload).send({
    from: account.address,
    gas: 1000000,
    gasPrice: '1000000000',
  });
};

await upgradeLSP6();
```

## Testing the new LSP6 Key Manager

We can now check the owner of the Universal Profile and it should be the new LSP6 Key Manager.
Create the following file with the name `test-new-lsp6.js` and run:

```shell
node test-new-lsp6.js
```

```javascript title="test-new-lsp6.js"
import LSP0ERC725YAccount from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725YAccount.json' assert { type: 'json' };
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json' assert { type: 'json' };
import { keyManagerAddress, universalProfileAddress } from './constants.js';
import Web3 from 'web3';
const web3 = new Web3('https://rpc.l14.lukso.network');

const upgradeLSP6 = async () => {
  const unviersalProfile = new web3.eth.Contract(
    LSP0ERC725YAccount.abi,
    universalProfileAddress,
  );

  const universalProfileOwner = await universalProfile.methods.owner().call();
  console.log(
    `The new owner of the Universal Profile is: ${universalProfileOwner}`,
  );
  console.log(`The old LSP6 Key Manager is at address: ${keyManagerAdderss}`);

  const keyManager = new web3.eth.Contract(
    LSP6KeyManager.abi,
    universalProfileOwner,
  );

  const keyManagerTarget = await keyManager.methods.target().call();

  console.log(
    `The address of the Universal Profile is: ${unviersalProfile._address}`,
  );
  console.log(`The target of the new LSP6 Key Manager: ${keyManagerTarget}`);
};

await upgradeLSP6();
```
