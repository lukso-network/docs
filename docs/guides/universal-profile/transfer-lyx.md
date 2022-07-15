---
sidebar_label: 'Transfer LYX'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer LYX

In this guide, we will learn **how to transfer LYX** from our Universal Profile to any `address` (including another :up: ). We will cover:

- the basics of the `execute(...)` function and how it works.
- how to use this function to transfer LYX from our UP.

![Guide - How to send LYX from a Universal Profile](./img/guide-LYX-transfer.jpeg)

## Introduction

Let's recap what we have learned so far!

- In our [**Create a Universal Profile**](./create-profile.md) guide, we saw in the [Universal Profile architecture diagram](./create-profile.md#contracts-overview) that the owner of a Universal Profile (UP) is a Key Manager (KM). This smart contract acts as its controller.

- In our [**Edit a Universal Profile**](./edit-profile.md) guide, we saw the basics of interacting with our UP to edit our profile info. We did so by interacting via the KM.

We previously saw how to use `setData(...)` to update data in our UP contract's storage. Let's now look at `execute(...)`.

### Basics of the `execute(...)` function

The [`execute(operation,to,value,data)`](../../standards/smart-contracts/erc725-contract.md#execute---erc725x) function from [ERC725X](../../standards/lsp-background/erc725.md#erc725x---generic-executor) enable us to use our UP to interact with other addresses, such as transferring LYX or calling other smart contracts. This function takes four arguments (see [ERC725 API docs](../../standards/smart-contracts/erc725-contract.md#execute---erc725x)).


We can use this function to transfer LYX from our UP to any address (including another UP). Transferring LYX from our UP is as simple as making a standard [`CALL`](../../standards/universal-profile/lsp6-key-manager.md#permission-values) to any `address`, attaching some **value** to the call.

For a regular LYX transfer, the parameters will be:
- `_operation`: `0` (for `CALL`).
- `_to`: the `address` we want to send LYX to (Externally Owned Account or contract address).
- `_value`: the amount of LYX we want to transfer (in Wei).
- `_data`: empty (`0x` since we are just transferring LYX).

### Interacting via the Key Manager

Most of the functions on the UP contract, such as [`setData(...)`](../../standards/smart-contracts/erc725-contract.md#setdata---erc725y) and [`execute(...)`](../../standards/smart-contracts/erc725-contract.md#execute---erc725x) can only be called by the [`owner`](../../standards/smart-contracts/erc725-contract.md#owner). Therefore if we want to use our UP to do meaningful things, **all interactions should go through the KM**.

![](/img/guides/transfer-lyx-interaction-via-key-manager.jpeg)

To transfer LYX from our UP, we need to perform the following steps:

1. ABI encode the [`execute(operation,to,value,data)`](../../standards/smart-contracts/erc725-contract.md#execute---erc725x) function call of our UP.
2. pass the ABI encoded **payload** to the [`execute(payload)`](../../standards/smart-contracts/lsp6-key-manager.md#execute) function on the KM.

:::info

Make sure to understand the difference between both `execute(...)` functions!

- [`execute(operation,to,value,data)`](../../standards/smart-contracts/erc725-contract.md#execute---erc725x) from the Universal Profile = generic executor function used to call and interact with EOAs or contracts + deploy new contracts from the UP.
- `execute(payload)` from the Key Manager = used to run functions on the Universal Profile linked to the Key Manager (by forwarding  ABI encoded payload), while verifying if the caller has the right permissions to do so.

:::

## Setup

To complete this mini-guide, we will need:

- the `UniversalProfile` and `KeyManager` contracts ABIs from the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) npm package.
- the address of our Universal Profile we want to send LYX from.

```shell
npm install web3 @lukso/lsp-smart-contracts
```

## Step 1 - Get some LYX

In order to send LYX from our Universal Profile, we will first request some free test LYX for our UP via the **[L16 Faucet](https://faucet.l16.lukso.network/)**.

1. Visit the :arrow_right: **[LUKSO L16 Faucet Website](https://faucet.l16.lukso.network/)**.
2. Paste the address of your Universal Profile in the input field :arrow\*down: and click in the _"Give me LYX"_ button.

![L16 Faucet screenshot](./img/L16-faucet.png)

3. Check the balance of your Universal Profile on the **[LUKSO L16 Block Explorer](https://explorer.execution.l16.lukso.network/)** :arrow_down:

Paste the address of the Universal Profile in the address field in the top right corner of the block explorer.

If everything went successfully, you should see that the _"Balance"_ field of your Universal Profile has been updated!

![LUKSO L16 Network Block Explorer (screenshot)](./img/explorer-balance.png)

## Step 2 - Create the contracts instances

The first step is to create instances of our Universal Profile and Key Manager contracts.

- 2.1 - First, we will use the Universal Profile to retrieve the address of the KeyManager via the [`owner()`](../../standards/smart-contracts/lsp0-erc725-account.md#owner) function.

- 2.2 - Then, we will use the Key Manager to interact with our Universal Profile and send some LYX.

```typescript
const UniversalProfile = require('@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json');

const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);

// the KeyManager is the owner of the Universal Profile
// so we can call the owner() function to obtain the KeyManager's address
const owner = myUP.methods.owner().call();

const myKM = new web3.eth.Contract(KeyManager.abi, owner);
```

## Step 3 - Encode the payload to transfer LYX

With our contract instances ready, we now want to transfer some LYX from the UP using the `execute(...)` function.
The next step is to ABI encode this function call with the correct parameters, as explained in the introduction.

We can use the [`encodeABI()`](https://web3js.readthedocs.io/en/v1.7.4/web3-eth-contract.html#methods-mymethod-encodeabi) method from web3.js

```javascript
const Web3 = require('web3');
const web3 = new Web3('https://rpc.l14.lukso.network');

const OPERATION_CALL = 0;
const recipient = '0x...'; // address the recipient (any address, including an other UP)
const amount = web3.utils.toWei('3'); // amount of LYX we want to transfer
// payload executed at the target (here nothing, just a plain LYX transfer)
const data = '0x';

// encode the payload to transfer 3 LYX from the UP
const transferLYXPayload = await myUP.methods
  .execute(OPERATION_CALL, recipient, amount, data)
  .encodeABI();
```

## Step 4 - Execute via the Key Manager

### 4.1 - Load our EOA

Like in other guides, the first step is to load our EOA that act as the main controller for our Universal Profile.

```javascript title="Load EOA from a private key"
const Web3 = require('web3');
const web3 = new Web3('https://rpc.l16.lukso.network');

const PRIVATE_KEY = '0x...'; // your EOA private key (main controller address)

const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);
```

### 4.2 - Send the LYX transfer payload

The final step is to pass the encoded LYX transfer function to the Key Manager. Since we are calling from the UP's owner address, the Key Manager will authorize and execute the LYX transfer.

```javascript
await myKM.execute(transferLYXPayload).send({
  from: myEOA.address,
  gasLimit: 300_000,
});
```

## Final Code

```javascript
const Web3 = require('web3');
const UniversalProfile = require('@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json');

const web3 = new Web3('https://rpc.l16.lukso.network');

const PRIVATE_KEY = '0x...'; // your EOA private key (main controller address)
const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY); // amount of LYX we want to transfer

// 1. instantiate your contracts
const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);

// the KeyManager is the owner of the Universal Profile
// so we can call the owner() function to obtain the KeyManager's address
const owner = myUP.methods.owner().call();

const myKM = new web3.eth.Contract(KeyManager.abi, owner);

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
