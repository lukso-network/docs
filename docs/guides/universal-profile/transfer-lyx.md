---
sidebar_label: 'Transfer LYX'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer LYX

In this guide, we will learn **how to transfer LYX** from our Universal Profile to any `address` (including another :up: ). We will cover:

- the basics of the `execute(...)` function and how it works.
- how to use this function to transfer LYX from our UP.

![Guide - How to send LYX from a Universal Profile](./img/guide-LYX-transfer.jpeg)

:::tip
A complete _"ready to use"_ JS file is available at the end in the [**Final Code**](#final-code) section. If you want to run the code as standalone JavaScript files within the terminal or the browser, you can open the [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository or use the correlated [StackBlitz](https://stackblitz.com/github/lukso-network/lukso-playground) page. Remember that you will have to provide a controller key (EOA) of your Universal Profile in order to transfer funds.
:::

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

![](/img/guides/lsp6/transfer-lyx-interaction-via-key-manager.jpeg)

To transfer LYX from our UP, we need to perform the following steps:

1. ABI encode the [`execute(operation,to,value,data)`](../../standards/smart-contracts/erc725-contract.md#execute---erc725x) function call of our UP.
2. pass the ABI encoded **calldata** to the [`execute(calldata)`](../../standards/smart-contracts/lsp6-key-manager.md#execute) function on the KM.

:::info

Make sure to understand the difference between both `execute(...)` functions!

- [`execute(operation,to,value,data)`](../../standards/smart-contracts/erc725-contract.md#execute---erc725x) from the Universal Profile = generic executor function used to call and interact with EOAs or contracts + deploy new contracts from the UP.
- `execute(calldata)` from the Key Manager = used to run functions on the Universal Profile linked to the Key Manager (by forwarding ABI encoded calldata), while verifying if the caller has the right permissions to do so.

:::

## Setup

To complete this mini-guide, we will need:

- the `UniversalProfile` and `KeyManager` contracts ABIs from the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) npm package.
- the address of our Universal Profile we want to send LYX from.
- an EOA with some LYX for gas fees and the required [**permissions**](../../standards/universal-profile/lsp6-key-manager.md#permissions) for the interaction.

:::info

The chosen EOA needs to have [**TRANSFERVALUE Permission**](../../standards/universal-profile/lsp6-key-manager.md#permissions) together with [**AllowedCalls**](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls) or [**SUPER_TRANSFERVALUE Pemrission**](../../standards/universal-profile/lsp6-key-manager.md#super-permissions)

:::

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

## Step 1 - Get some LYX

:::caution

You need to have LYX both in your EOA (which will pay for the transaction fees) and in your Universal Profile (where the LYX will be transferred from).

:::

In order to send LYX from our Universal Profile, we will first request some free test LYX for our UP via the **[L16 Faucet](https://faucet.l16.lukso.network/)**.

1. Visit the :arrow_right: **[LUKSO L16 Faucet Website](https://faucet.l16.lukso.network/)**.
2. Make a **[tweet](https://twitter.com)** with your UP address and paste the tweet's url in the input field and click the _"Give me LYX"_ button.

![L16 Faucet screenshot](./img/L16-faucet.png)

3. Check the balance of your Universal Profile on the **[LUKSO L16 Block Explorer](https://explorer.execution.l16.lukso.network/)** :arrow_down:

Paste the address of the Universal Profile in the address field in the top right corner of the block explorer.

If everything went successfully, you should see that the _"Balance"_ field of your Universal Profile has been updated!

![LUKSO L16 Network Block Explorer (screenshot)](./img/explorer-balance.png)

## Step 2 - Create the contracts instances

The first step is to create instances of our Universal Profile and Key Manager contracts.

- 2.1 - First, we will use the Universal Profile to retrieve the address of the KeyManager via the [`owner()`](../../standards/smart-contracts/lsp0-erc725-account.md#owner) function.

- 2.2 - Then, we will use the Key Manager to interact with our Universal Profile and send some LYX.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');

const myUPAddress = '0x...';
const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);

// the KeyManager is the owner of the Universal Profile
// so we can call the owner() function to obtain the KeyManager contract address
const owner = await myUP.methods.owner().call();
const myKM = new web3.eth.Contract(KeyManager.abi, owner);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');

const myUPAddress = '0x...';
const myUP = new ethers.Contract(myUPAddress, UniversalProfile.abi, provider);

// the KeyManager is the owner of the Universal Profile
// so we can call the owner() function to obtain the KeyManager contract address
const owner = await myUP.owner();
const myKM = new ethers.Contract(owner, KeyManager.abi, provider);
```

  </TabItem>

</Tabs>

## Step 3 - Encode the calldata to transfer LYX

With our contract instances ready, we now want to transfer some LYX from the UP using the `execute(...)` function.
The next step is to ABI encode this function call with the correct parameters, as explained in the introduction.

We can use the [`encodeABI()`](https://web3js.readthedocs.io/en/v1.7.4/web3-eth-contract.html#methods-mymethod-encodeabi) method from web3.js

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
const OPERATION_CALL = 0;
const recipient = '0x...'; // address the recipient (any address, including an other UP)
const amount = web3.utils.toWei('3'); // amount of LYX we want to transfer
// calldata executed at the target (here nothing, just a plain LYX transfer)
const data = '0x';

// encode the calldata to transfer 3 LYX from the UP
const transferLYXCalldata = await myUP.methods[
  'execute(uint256,address,uint256,bytes)'
](OPERATION_CALL, recipient, amount, data).encodeABI();
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript
const OPERATION_CALL = 0;
const recipient = '0x...'; // address of the recipient (any address, including an other UP)
const amount = ethers.parseEther('3'); // amount of LYX we want to transfer
const data = '0x'; // calldata executed at the target (here nothing, just a plain LYX transfer)

// encode the calldata to transfer 3 LYX from the UP
const transferLYXCalldata = myUP.interface.encodeFunctionData(
  'execute(uint256,address,uint256,bytes)',
  [OPERATION_CALL, recipient, amount, data],
);
```

  </TabItem>

</Tabs>

## Step 4 - Execute via the Key Manager

### 4.1 - Load our EOA

Like in other guides, an important step is to load our EOA that is a controller for our Universal Profile. In this case the controller address must have either [**TRANSFERVALUE Permission**](../../standards/universal-profile/lsp6-key-manager.md#permissions) together with [**AllowedCalls**](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls) or [**SUPER_TRANSFERVALUE Pemrission**](../../standards/universal-profile/lsp6-key-manager.md#super-permissions) in order for the transaction to be successful.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
const PRIVATE_KEY = '0x...'; // your controller address private key

const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript
const PRIVATE_KEY = '0x...'; // your controller address private key

const myEOA = new ethers.Wallet(PRIVATE_KEY).connect(provider);
```

  </TabItem>

</Tabs>

### 4.2 - Send the LYX transfer calldata

The final step is to pass the encoded LYX transfer calldata to the Key Manager. Since we are calling from a UP's controller address (with proper [**permissions**](../../standards/universal-profile/lsp6-key-manager.md#permissions)), the Key Manager will authorize and execute the LYX transfer.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
await myKM.methods['execute(bytes)'](transferLYXCalldata).send({
  from: myEOA.address,
  gasLimit: 300_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript
await myKM.connect(myEOA)['execute(bytes)'](transferLYXCalldata);
```

  </TabItem>

</Tabs>

## Final Code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');

const PRIVATE_KEY = '0x...'; // your controller address private key
const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY); // amount of LYX we want to transfer

// 1. instantiate your contracts
const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);

// the KeyManager is the owner of the Universal Profile
// so we can call the owner() function to obtain the KeyManager contract address
const owner = await myUP.methods.owner().call();

const myKM = new web3.eth.Contract(KeyManager.abi, owner);

const OPERATION_CALL = 0;
const recipient = '0x...'; // address the recipient (any address, including an other UP)
const amount = web3.utils.toWei('3');
// calldata executed at the target (here nothing, just a plain LYX transfer)
const data = '0x';

// 2. encode the calldata to transfer 3 LYX from the UP
const transferLYXCalldata = await myUP.methods[
  'execute(uint256,address,uint256,bytes)'
](OPERATION_CALL, recipient, amount, data).encodeABI();

// 3. execute the LYX transfer via the Key Manager
await myKM.methods['execute(bytes)'](transferLYXCalldata).send({
  from: myEOA.address,
  gasLimit: 300_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l14.lukso.network');

const myUPAddress = '0x...';
const myUP = new ethers.Contract(myUPAddress, UniversalProfile.abi, provider);

// the KeyManager is the owner of the Universal Profile
// so we can call the owner() function to obtain the KeyManager contract address
const owner = await myUP.owner();

const myKM = new ethers.Contract(owner, KeyManager.abi, provider);

const OPERATION_CALL = 0;
const recipient = '0x...'; // address the recipient (any address, including an other UP)
const amount = ethers.parseEther('3'); // amount of LYX we want to transfer
// calldata executed at the target (here nothing, just a plain LYX transfer)
const data = '0x';

// encode the calldata to transfer 3 LYX from the UP
const transferLYXCalldata = myUP.interface.encodeFunctionData(
  'execute(uint256,address,uint256,bytes)',
  [OPERATION_CALL, recipient, amount, data],
);

const PRIVATE_KEY = '0x...'; // your controller address private key

const myEOA = new ethers.Wallet(PRIVATE_KEY).connect(provider);

await myKM.connect(myEOA)['execute(bytes)'](transferLYXCalldata);
```

  </TabItem>

</Tabs>
