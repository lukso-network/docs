---
sidebar_label: 'Interact with Contracts'
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Interact with other contracts

In this guide, we will learn how to use our Universal Profile to interact with any other smart contract (like if we were using a regular Externally Owned Account).

## Introduction

We have seen in the previous example how to send LYX from our UP via the [`execute(...)`](../../standards/smart-contracts/lsp0-erc725-account.md#execute) function.

This function offers a fourth parameter: `_data`, that provides a lot of flexibility when interacting from our UP. The `_data` parameter is handy when the `_to` recipient is a smart contract.

If you want to call a specific smart contract that was deployed on the network by the Universal Profile, the parameters of the `execute(...)` function will be as follow:

- `_operation`: `0` (for `CALL`).
- `_to`: the `address` of the smart contract we want to interact with.
- `_value_`: empty (0).
- `_data`: the ABI-encoded function name and arguments, to be run at the `_to` contract address.

Suppose a smart contract `targetContract` was deployed on the network and we want our UP to call the function `myCoolFunction` on this contract. We will have to:

1. [ABI-encode](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-encodeabi) the function call with the parameters we want to pass.
2. Pass the encoded calldata as argument `_data` of the `execute(...)` function.

## Setup

To complete this mini-guide, we will need:

- an EOA with some LYX for gas fees and the required [**permissions**](../../standards/universal-profile/lsp6-key-manager.md#permissions) for the interaction.
- the `UniversalProfile` and `KeyManager` contracts ABIs from the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) npm package.
- the address of our Universal Profile.
- the `targetContract` ABI.
- the address of the Target Contract.

:::info

The chosen EOA needs to have [**CALL Permission**](../../standards/universal-profile/lsp6-key-manager.md#permissions) together with [**AllowedCalls**](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls) or [**SUPER_CALL Pemrission**](../../standards/universal-profile/lsp6-key-manager.md#super-permissions)

:::

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

## Step 1 - Create the contracts instances

The first step is to create instances of our Universal Profile, Key Manager contracts and the Target Contract.

- Create an Universal Profile contract instance from `universalProfileAddress`.
- Get the `owner()` of the Universal Profile.
- Create a Key Manager contract instance from the owner of the Universal Profile.
- Create a Target Contract instance from the `targetContractAddress`.

:::caution

Save the Target Contract ABI in a separate json and import it in the main file.  
You can quickly compile and get a contract's ABI in [**Remix IDO**](https://remix.ethereum.org/)

:::

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import TargetContractABI from './TargetContractABI.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');

const universalProfileAddress = '0x...';
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);

// the KeyManager is the owner of the Universal Profile
// so we can call the owner() function to obtain the KeyManager's address
const owner = await universalProfile.methods.owner().call();
const keyManager = new web3.eth.Contract(KeyManager.abi, owner);

const targetContractAddress = '0x...';
const targetContract = new web3.eth.Contract(
  TargetContractABI,
  targetContractAddress,
);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import TargetContractABI from './TargetContractABI.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');

const universalProfileAddress = '0x...';
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
  provider,
);

// the KeyManager is the owner of the Universal Profile
// so we can call the owner() function to obtain the KeyManager's address
const owner = await universalProfile.owner();
const keyManager = new ethers.Contract(owner, KeyManager.abi, provider);

const targetContractAddress = '0x...';
const targetContract = new ethers.Contract(
  targetContractAddress,
  TargetContractABI,
  provider,
);
```

  </TabItem>

</Tabs>

## Step 2 - Encode the calldatas

This is the easy part, we need to create 2 calldatas:

- The _first calldata_ will be executed on the Target Contract.
- The _second calldata_ will be executed on ythe Universal Profile and will trigger the _first calldata_.

### Step 2.1 Encode Target Contract calldata

Encoding the calldata that will be be exeuted on the Target Contract.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
// 1. encode the calldata to be run at the targetContract
// assuming targetContract is a Contract instance
const targetCalldata = targetContract.methods
  .myCoolfunction('dummyParameter')
  .encodeABI();
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript
// 1. encode the calldata to be run at the targetContract
// assuming targetContract is a Contract instance
const targetCalldata = targetContract.interface.encodeFunctionData(
  'myCoolfunction',
  ['dummyParameter'],
);
```

  </TabItem>

</Tabs>

### Step 2.2 Encode Universal Profile calldata

Encoding the calldata that will be be exeuted on the Universal Profile. This calldata will also trigger the calldata that will be executed on the Target Contract.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
const OPERATION_CALL = 0;

// 2. encode the calldata to be run on the UP,
// passing the calldata to be run at the targetContract as 4th parameter
let abiCalldata = await universalProfile.methods
  .execute(OPERATION_CALL, targetContract.address, 0, targetCalldata)
  .encodeABI();
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript
const OPERATION_CALL = 0;

// 2. encode the calldata to be run on the UP,
// passing the calldata to be run at the targetContract as 4th parameter
let abiCalldata = universalProfile.interface.encodeFunctionData('execute', [
  OPERATION_CALL,
  targetContract.address,
  0,
  targetCalldata,
]);
```

  </TabItem>

</Tabs>

## Step 3 - Execute via the Key Manager

### Step 3.1 - Load the EOA

Like in other guides, an important step is to load our EOA that is a controller for our Universal Profile. In this case the controller address must have either [**CALL Permission**](../../standards/universal-profile/lsp6-key-manager.md#permissions) together with [**AllowedCalls**](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls) or [**SUPER_CALL Pemrission**](../../standards/universal-profile/lsp6-key-manager.md#super-permissions) in order for the transaction to be successful.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
const PRIVATE_KEY = '0x...'; // your EOA private key (controller address)
const EOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript
const PRIVATE_KEY = '0x...'; // your EOA private key (controller address)
const EOA = new ethers.Wallet(PRIVATE_KEY);
```

  </TabItem>

</Tabs>

### Step 3.2 - Send the execute calldata

The final step is to pass the encoded calldata to the Key Manager. Since we are calling from a UP's controller address (with proper [**permissions**](../../standards/universal-profile/lsp6-key-manager.md#permissions)), the Key Manager will authorize and execute the LYX transfer.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
// 3. execute via the KeyManager, passing the UP calldata
await keyManager.methods.execute(abiCalldata).send({
  from: EOA.address,
  gasLimit: 300_000,
});
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript
// 3. execute via the KeyManager, passing the UP calldata
await keyManager.connect(EOA).execute(abiCalldata);
```

  </TabItem>

</Tabs>

## Final Code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import TargetContractABI from './TargetContractABI.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');

const universalProfileAddress = '0x...';
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);

// the KeyManager is the owner of the Universal Profile
// so we can call the owner() function to obtain the KeyManager's address
const owner = await universalProfile.methods.owner().call();
const keyManager = new web3.eth.Contract(KeyManager.abi, owner);

const targetContractAddress = '0x...';
const targetContract = new web3.eth.Contract(
  TargetContractABI,
  targetContractAddress,
);

// 1. encode the calldata to be run at the targetContract
// assuming targetContract is a Contract instance
const targetCalldata = targetContract.methods
  .myCoolfunction('dummyParameter')
  .encodeABI();

const OPERATION_CALL = 0;

// 2. encode the calldata to be run on the UP,
// passing the calldata to be run at the targetContract as 4th parameter
let abiCalldata = await universalProfile.methods
  .execute(OPERATION_CALL, targetContract.address, 0, targetCalldata)
  .encodeABI();

const PRIVATE_KEY = '0x...'; // your EOA private key (controller address)
const EOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);

// 3. execute via the KeyManager, passing the UP calldata
await keyManager.methods.execute(abiCalldata).send({
  from: EOA.address,
  gasLimit: 300_000,
});
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import TargetContractABI from './TargetContractABI.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');

const universalProfileAddress = '0x...';
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
  provider,
);

// the KeyManager is the owner of the Universal Profile
// so we can call the owner() function to obtain the KeyManager's address
const owner = await universalProfile.owner();
const keyManager = new ethers.Contract(owner, KeyManager.abi, provider);

const targetContractAddress = '0x...';
const targetContract = new ethers.Contract(
  targetContractAddress,
  TargetContractABI,
  provider,
);

// 1. encode the calldata to be run at the targetContract
// assuming targetContract is a Contract instance
const targetCalldata = targetContract.interface.encodeFunctionData(
  'myCoolfunction',
  ['dummyParameter'],
);

const OPERATION_CALL = 0;

// 2. encode the calldata to be run on the UP,
// passing the calldata to be run at the targetContract as 4th parameter
let abiCalldata = universalProfile.interface.encodeFunctionData('execute', [
  OPERATION_CALL,
  targetContract.address,
  0,
  targetCalldata,
]);

const PRIVATE_KEY = '0x...'; // your EOA private key (controller address)
const EOA = new ethers.Wallet(PRIVATE_KEY);

// 3. execute via the KeyManager, passing the UP calldata
await keyManager.connect(EOA).execute(abiCalldata);
```

  </TabItem>

</Tabs>
