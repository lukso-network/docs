---
sidebar_label: 'Transfer LYX'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer LYX

In this tutorial, you will learn **how to transfer LYX** from your Universal Profile (UP) to any `address` (including another :up: ).

![Guide - How to send LYX from a Universal Profile](./img/guide-LYX-transfer.jpeg)

## Introduction

While interacting with a Universal Profile (UP), all interactions should go through the Key Manager (KM). The KM will allow/disallow execution after checking the [permissions](../../standards/universal-profile/04-lsp6-key-manager.md#permission-values) of the calling address.

Therefore to interact with our UP, we will need to encode the function call of our UP and pass the **payload** to the [`execute(payload)`](../../standards/smart-contracts/lsp6-key-manager.md#execute) function on the KM.

Transferring LYX from a UP is as simple as making a standard [`CALL`](../../standards/universal-profile/04-lsp6-key-manager.md#permission-values) to any `address`, attaching some **value** to the call. You can transfer LYX from a UP via the [`execute(...)`](../../standards/smart-contracts/lsp0-erc725-account.md) function in the UP contract.

The parameters of the function will be as follow:

- `_operation`: `0` (for `CALL`).
- `_to`: the `address` we want to send LYX to (Externally Owned Account or contract address).
- `_value`: the amount of LYX we want to transfer (in Wei).
- `_data`: empty payload (`0x`).

Since we are just making a simple LYX transfer, the fourth parameter `_data` will be empty.

## Step 1 - Get some LYX

In order to send LYX from our Universal Profile, we will first request some free test LYX for our Universal Profile via the **[L14 Faucet](http://faucet.l14.lukso.network/)**.

1. Visit the :arrow_right: **[LUKSO L14 Faucet Website](http://faucet.l14.lukso.network/)**.
2. Paste the address of your Universal Profile in the input field :arrow\*down: and click in the _"request 5 LYX"_ button.

![L14 Faucet screenshot](./img/L14-faucet.png)

3. Check the balance of your Universal Profile on the **[LUKSO L14 Block Explorer](https://blockscout.com/lukso/l14)** :arrow_down:

You can paste the address of your Universal Profile on the top right corner.

If everything went successfully, you should see that the _"Balance"_ field of your Universal Profile has been updated!

![LUKSO L14 Network Block Explorer (screenshot)](./img/l14-explorer.png)

## Step 2 - Create the contracts instances

We will first need to create the instance of each contract. To do so, we will need:

- the contract's ABIs,
- the address of our Universal Profile, and
- the address of it's KeyManager contract

```typescript
const UniversalProfile = require('@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json');

const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);
const myKM = new web3.eth.Contract(KeyManager.abi, myURDAddress);
```

## Step 3 - Encode the payload to transfer LYX

The next step is to encode the action that we will perform on our Universal Profile. In our case, we want to transfer 3 LYX to an address using the `execute(...)` function on the UP.

```typescript
const Web3 = require('web3');
const web3 = new Web3('https://rpc.l14.lukso.network');

const OPERATION_CALL = 0;
const recipient = '0x...'; // address the recipient (any address, including an other UP)
const amount = web3.utils.toWei('3');
// payload executed at the target (here nothing, just a plain LYX transfer)
const data = '0x';

// encode the payload to transfer 3 LYX from the UP
const transferLYXPayload = await myUP.methods
  .execute(OPERATION_CALL, recipient, amount, data)
  .encodeABI();
```

## Step 4 - Send the payload to the Key Manager

The final step is to pass the encoded LYX transfer function to the Key Manager. Since we are calling from the UP's owner address, the Key Manager will authorize and execute the LYX transfer.

```javascript
await myKM.execute(transferLYXPayload).send({
  from: wallet.address,
  gasLimit: 300_000,
});
```

## Final Code

```javascript
const Web3 = require('web3');
const UniversalProfile = require('@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json');

const web3 = new Web3('https://rpc.l14.lukso.network');

// 1. instantiate your contracts
const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);
const myKM = new web3.eth.Contract(KeyManager.abi, myURDAddress);

const OPERATION_CALL = 0;
const recipient = '0x...'; // address the recipient (any address, including an other UP)
const amount = web3.utils.toWei('3');
// payload executed at the target (here nothing, just a plain LYX transfer)
const data = '0x';

// 2. encode the payload to transfer 3 LYX from the UP
const transferLYXPayload = await myUP.methods
  .execute(OPERATION_CALL, recipient, amount, data)
  .encodeABI();

// 3. execute the LYX transfer via the Key Manager
await myKM.execute(transferLYXPayload).send({
  from: wallet.address,
  gasLimit: 300_00,
});
```
