---
sidebar_label: 'Restrict Addresses to Vaults'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Restrict Addresses to Vaults

As mentioned in the [first Vault guide](./create-a-vault.md), the **Vault** can be used to restrict different addresses (protocols, other devices, etc..) to execute and set data on it instead of doing it directly on the Universal Profile.

This way, when **granting a third party permissions** to execute through your profile, this third party will only be able to interact with the Vault, and all the other assets will be safe.

![Guide - Restrict addresses to an LSP9Vault](/img/guides/lsp9/restrict-protocol-to-vault.jpeg)

## Granting Permission to 3rd Parties

:::note

Make sure not to grant the 3rd party address the **SUPER Permissions**. Otherwise, the **AllowedCalls restriction** will not work.

:::

Check the guide of **[granting permissions to 3rd Parties](../key-manager/give-permissions.md)**, and make sure to grant the 3rd party address the **CALL Permission**.

## Use AllowedCalls permission for the 3rd Parties

In this guide, after granting the 3rd party the permission **CALL**, we will need to **allow the address of the 3rd party** to interact with the **Vault address**. We will be using the [AllowedCalls permission](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls) from the Key Manager.

## Setup

Make sure you have the following dependencies installed before beginning this tutorial.

- You can use either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- You MUST install [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)
- You SHOULD install [`@erc725/erc725.js`](https://github.com/ERC725Alliance/erc725.js)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts @erc725/erc725.js
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts @erc725/erc725.js
```

  </TabItem>

</Tabs>

## Step 1 - Imports, Constants & EOA

For this guide we will firstly need and import the _ABIs_ for the Universal Profile & Key Manager contracts. Also we will import the `ERC725YDataKeys` to retrieve the data key for [AllowedCalls permission](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls).  
As constants we will need to store the addresses for the Universal Profile, Vault & the restricted third party.  
Finally, we will need a private key with the proper _permissions_, in our case [**ADDCONTROLLER permission**](../../standards/universal-profile/lsp6-key-manager.md#permissions).

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Imports, Constants & EOA initialization"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { encodeKey } from '@erc725/erc725.js/build/main/src/lib/utils.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.l16.lukso.network');
const universalProfileAddress = '0x..'; // address of the UP
const vaultAddress = '0x..'; // address of the Vault
const thirdPartyAddress = '0x..'; // address of the third party you want to restrict

// setup your EOA
const privateKey = '0x...';
const myEOA = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Imports, Constants & EOA initialization"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { encodeKey } from '@erc725/erc725.js/build/main/src/lib/utils.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const universalProfileAddress = '0x..'; // address of the UP
const vaultAddress = '0x..'; // address of the Vault
const thirdPartyAddress = '0x..'; // address of the third party you want to restrict

// setup your EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

## Step 2 - Create contract instances

At this point we will create instances for the following contracts:

- [**Universal Profile**](../../standards/universal-profile/lsp0-erc725account.md)
- [**Key Manager**](../../standards/universal-profile/lsp6-key-manager.md)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Universal Profile & Key Manager contract instances"
// create an instance of the UP
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);

// getting the Key Manager address from UP
const keyManagerAddress = await universalProfile.methods.owner().call();
// create an instance of the KeyManager
const keyManager = new web3.eth.Contract(LSP6KeyManager.abi, keyManagerAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Universal Profile & Key Manager contract instances"
// create an instance of the UP
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);

// getting the Key Manager address from UP
const keyManagerAddress = await universalProfile.owner();
// create an instance of the KeyManager
const keyManager = new ethers.Contract(keyManagerAddress, LSP6KeyManager.abi);
```

  </TabItem>

</Tabs>

## Step 3 - Encode the calldata for encoding [`AllowedCalls`](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls)

Now we need to encode the **Allowed Calls** that we want for the _Third Party address_. After we do that, we will encode a calldata that will update the _Allowed Calls data key_ with the encoded **Allowed Calls**

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Calldata that will update the Allowed Calls of a Controller address"
const allowedCallsDataKey = // constructing the data key of allowed addresses
  ERC725YDataKeys.LSP6['AddressPermissions:AllowedCalls'] +
  thirdPartyAddress.substring(2); // of the 3rd party

const allowedCallsSchema = {
  name: 'AddressPermissions:AllowedCalls:<address>',
  key: '0x4b80742de2bf393a64c70000<address>',
  keyType: 'MappingWithGrouping',
  valueType: '(bytes4,address,bytes4)[CompactBytesArray]',
  valueContent: '(Bytes4,Address,Bytes4)',
};

const allowedCallsDataValue = encodeKey(allowedCallsSchema, [
  '0xffffffff',
  vaultAddress,
  '0xffffffff',
]);

// encode setData calldata on the UP
const setDataCalldata = await universalProfile.methods[
  'setData(bytes32,bytes)'
](allowedCallsDataKey, allowedCallsDataValue).encodeABI();
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Calldata that will update the Allowed Calls of a Controller address"
const allowedCallsDataKey = // constructing the data key of allowed addresses
  ERC725YDataKeys.LSP6['AddressPermissions:AllowedCalls'] +
  thirdPartyAddress.substring(2); // of the 3rd party

const allowedCallsSchema = {
  name: 'AddressPermissions:AllowedCalls:<address>',
  key: '0x4b80742de2bf393a64c70000<address>',
  keyType: 'MappingWithGrouping',
  valueType: '(bytes4,address,bytes4)[CompactBytesArray]',
  valueContent: '(Bytes4,Address,Bytes4)',
};

const allowedCallsDataValue = encodeKey(allowedCallsSchema, [
  '0xffffffff',
  vaultAddress,
  '0xffffffff',
]);

// encode setData calldata on the UP
const setDataCalldata = universalProfile.interface.encodeFunctionData(
  'setData(bytes32,bytes)',
  [allowedCallsDataKey, allowedCallsDataValue],
);
```

  </TabItem>

</Tabs>

## Step 4 - Execute via the Key Manager

Finally we will send a transaction that will execute the `setData(...)` calldata on the Universal Profile via the Key Manager.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Send transaction to be executed in the Universal profile contract via the Key Manager"
// execute the setDataCalldata on the Key Manager
await keyManager.methods['execute(bytes)'](setDataCalldata).send({
  from: myEOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Send transaction to be executed in the Universal Profile contract via the Key Manager"
// execute the setDataCalldata on the Key Manager
await myKM.connect(EOA)['execute(bytes)'](setDataCalldata);
```

  </TabItem>

</Tabs>

## Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Setting Allowed Addresses for the 3rd party address"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { encodeKey } from '@erc725/erc725.js/build/main/src/lib/utils.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.l16.lukso.network');
const universalProfileAddress = '0x..'; // address of the UP
const vaultAddress = '0x..'; // address of the Vault
const thirdPartyAddress = '0x..'; // address of the third party you want to restrict

// setup your EOA
const privateKey = '0x...';
const myEOA = web3.eth.accounts.wallet.add(privateKey);

// create an instance of the UP
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);

// getting the Key Manager address from UP
const keyManagerAddress = await universalProfile.methods.owner().call();
// create an instance of the KeyManager
const keyManager = new web3.eth.Contract(LSP6KeyManager.abi, keyManagerAddress);

const allowedCallsDataKey = // constructing the data key of allowed addresses
  ERC725YDataKeys.LSP6['AddressPermissions:AllowedCalls'] +
  thirdPartyAddress.substring(2); // of the 3rd party

const allowedCallsSchema = {
  name: 'AddressPermissions:AllowedCalls:<address>',
  key: '0x4b80742de2bf393a64c70000<address>',
  keyType: 'MappingWithGrouping',
  valueType: '(bytes4,address,bytes4)[CompactBytesArray]',
  valueContent: '(Bytes4,Address,Bytes4)',
};

const allowedCallsDataValue = encodeKey(allowedCallsSchema, [
  '0xffffffff',
  vaultAddress,
  '0xffffffff',
]);

// encode setData calldata on the UP
const setDataCalldata = await universalProfile.methods[
  'setData(bytes32,bytes)'
](allowedCallsDataKey, allowedCallsDataValue).encodeABI();

// execute the setDataCalldata on the Key Manager
await keyManager.methods['execute(bytes)'](setDataCalldata).send({
  from: myEOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Setting Allowed Addresses for the 3rd party address"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { encodeKey } from '@erc725/erc725.js/build/main/src/lib/utils.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const universalProfileAddress = '0x..'; // address of the UP
const vaultAddress = '0x..'; // address of the Vault
const thirdPartyAddress = '0x..'; // address of the third party you want to restrict

// setup your EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const myEOA = new ethers.Wallet(privateKey).connect(provider);

// create an instance of the UP
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);

// getting the Key Manager address from UP
const keyManagerAddress = await universalProfile.owner();
// create an instance of the KeyManager
const keyManager = new ethers.Contract(keyManagerAddress, LSP6KeyManager.abi);

const allowedCallsDataKey = // constructing the data key of allowed addresses
  ERC725YDataKeys.LSP6['AddressPermissions:AllowedCalls'] +
  thirdPartyAddress.substring(2); // of the 3rd party

const allowedCallsSchema = {
  name: 'AddressPermissions:AllowedCalls:<address>',
  key: '0x4b80742de2bf393a64c70000<address>',
  keyType: 'MappingWithGrouping',
  valueType: '(bytes4,address,bytes4)[CompactBytesArray]',
  valueContent: '(Bytes4,Address,Bytes4)',
};

const allowedCallsDataValue = encodeKey(allowedCallsSchema, [
  '0xffffffff',
  vaultAddress,
  '0xffffffff',
]);

// encode setData calldata on the UP
const setDataCalldata = universalProfile.interface.encodeFunctionData(
  'setData(bytes32,bytes)',
  [allowedCallsDataKey, allowedCallsDataValue],
);

// execute the setDataCalldata on the Key Manager
await myKM.connect(EOA)['execute(bytes)'](setDataCalldata);
```

  </TabItem>

</Tabs>
