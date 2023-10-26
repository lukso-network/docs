---
sidebar_label: '💰 Transfer LYX'
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer LYX

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('./img/transfer-lyx.png').default}
    alt="Transfering 0.5 LYXt between two Universal Profiles"
    width="400"
  />
<br/>
<i>Transfering 0.5 LYXt between two Universal Profiles.</i>
<br /><br />
</div>

In this guide, we will learn **how to transfer LYX** from your Universal Profile to any `address` (including another Universal Profile :up: ). We will cover:

- the basics of the [`execute(...)`](../../contracts/contracts/LSP0ERC725Account/#execute) function and how it works.
- how to use this function to transfer LYX from our UP.
- simple token transfer call.
- `sendTransaction({from:, to, value, data: '0x', ....})`

:::tip

A complete _"ready to use"_ JS file is available at the end in the [**Final Code**](#final-code) section. If you want to run the code as standalone JavaScript files within the terminal or the browser, you can open the [`lukso-playground`](https://github.com/lukso-network/lukso-playground/tree/main/transfer-lyx) repository or use the correlated [StackBlitz](https://stackblitz.com/github/lukso-network/lukso-playground) page. Remember that you will have to provide a controller key (EOA) of your Universal Profile in order to transfer funds.

:::

### Executing transaction _through_ a Universal Profile smart contract

As you are working with Smart Contract based accounts - _the Universal Profiles_ - you will need to "wrap" the call through the `execute` function of the Universal Profile smart contract. This function is very important as it allows you to prepare a transaction - signed by an EOA that has permissions over this Universal Profile - and execute it through the Universal Profile.

The [`execute(operation, to, value, data)`](../../contracts/contracts/LSP0ERC725Account/#execute) function (as defined by [ERC725X](../../standards/lsp-background/erc725.md#erc725x---generic-executor)) lets you use your UP to interact with other addresses, such as transferring LYX or calling other smart contracts. This function takes four arguments (see [ERC725 API docs](../../contracts/contracts/ERC725/ERC725.md#execute)).

For a regular LYX transfer, the parameters will be:

- `_operation`: `0` (for `CALL`).
- `_to`: the `address` we want to send LYX to (Externally Owned Account or contract address - such as another Universal Profile).
- `_value`: the amount of LYX we want to transfer (in Wei).
- `_data`: empty (`0x` since we are just transferring LYX).

### Permissions required to transfer LYX

The EOA that will sign the transaction (remember, a smart contract cannot sign 😉) needs to have the right permissions over that Universal Profile. For this transfer LYX action, the required permissions are:

- [`TRANSFERVALUE`](../../standards/universal-profile/lsp6-key-manager.md#permissions) with [`AllowedCalls`](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls)
- or [`SUPER_TRANSFERVALUE`](../../standards/universal-profile/lsp6-key-manager.md#super-permissions)

## Setup

To complete this guide, you will need:

- the `UniversalProfile` contracts ABI from the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) npm package.
- the address of the Universal Profile you want to send LYX from.
- an EOA with some LYX for gas fees and the required [**permissions**](../../standards/universal-profile/lsp6-key-manager.md#permissions) for the interaction.

Make sure you have the following dependencies installed before beginning this tutorial:

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3@v1 @lukso/lsp-smart-contracts
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

You can get test LYX (LYXt) from the [Testnet Faucet](https://faucet.testnet.lukso.network/). Use the [LUKSO Testnet Block Explorer](https://explorer.execution.testnet.lukso.network/) the verify the balances of your EOA and Universal Profile.

## Step 2 - Create the contract instance

Create the Universal Profile contract instance.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

const myUPAddress = '0x...';
const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.network');

const myUPAddress = '0x...';
const myUP = new ethers.Contract(myUPAddress, UniversalProfile.abi, provider);
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

### Step 3 - Load your EOA

Like in other guides, an important step is to load our EOA that is a controller for our Universal Profile.

:::caution

Explain how to get the EOA from the Extension! The feat. is currently disabled from the extension.

:::

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

## Step 4 - Send the LYX

With your contract instance ready, you can now transfer LYX from the UP using the `execute(...)` function. Since you are calling from a UP's controller address (with proper [**permissions**](../../standards/universal-profile/lsp6-key-manager.md#permissions)), the Key Manager will authorize the LYX transfer.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
const OPERATION_CALL = 0;
const recipient = '0x...'; // address the recipient (any address, including another UP)
const amount = web3.utils.toWei('3'); // amount of LYX we want to transfer
const data = '0x';

await myUP.methods.execute(OPERATION_CALL, recipient, amount, data).send({
  from: myEOA.address,
  gasLimit: 300_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript
const OPERATION_CALL = 0;
const recipient = '0x...'; // address of the recipient (any address, including another UP)
const amount = ethers.utils.parseEther('3'); // amount of LYX we want to transfer
const data = '0x';

await myUP.connect(myEOA).execute(OPERATION_CALL, recipient, amount, data);
```

  </TabItem>

</Tabs>

## Final Code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

const myUPAddress = '0x...';
const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);

const PRIVATE_KEY = '0x...'; // your controller address private key
const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);

const OPERATION_CALL = 0;
const recipient = '0x...'; // address the recipient (any address, including an other UP)
const amount = web3.utils.toWei('3'); // amount of LYX we want to transfer
const data = '0x';

await myUP.methods.execute(OPERATION_CALL, recipient, amount, data).send({
  from: myEOA.address,
  gasLimit: 300_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.network');

const myUPAddress = '0x...';
const myUP = new ethers.Contract(myUPAddress, UniversalProfile.abi, provider);

const PRIVATE_KEY = '0x...'; // your controller address private key
const myEOA = new ethers.Wallet(PRIVATE_KEY).connect(provider);

const OPERATION_CALL = 0;
const recipient = '0x...'; // address the recipient (any address, including an other UP)
const amount = ethers.utils.parseEther('3'); // amount of LYX we want to transfer
const data = '0x';

await myUP.connect(myEOA).execute(OPERATION_CALL, recipient, amount, data);
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>
