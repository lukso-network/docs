---
sidebar_label: 'Grant Vault Permissions'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Grant Vault Permissions

:::caution Disclaimer

This guide might contain outdated information and will be updated soon.

:::

As mentioned in the [first Vault guide](./create-a-vault.md), the **Vault** can be used to restrict different addresses (protocols, other devices, etc..) to execute and set data on it instead of doing it directly on the Universal Profile.

This way, when **granting a third party permissions** to execute through your profile, this third party will only be able to interact with the Vault, and all the other assets will be safe.

![Guide - Restrict addresses to an LSP9Vault](/img/guides/lsp9/restrict-protocol-to-vault.jpg)

## Granting Permission to 3rd Parties

:::note

Make sure not to grant the 3rd party address the **SUPER Permissions**. Otherwise, the **AllowedCalls restriction** will not work.

:::

Check the guide of **[granting permissions to 3rd Parties](../key-manager/grant-permissions.md)**, and make sure to grant the 3rd party address the **CALL Permission**.

## Use AllowedCalls permission for the 3rd Parties

In this guide, after granting the 3rd party the permission **CALL**, we will need to **allow the address of the 3rd party** to interact with the **Vault address**. We will be using the [AllowedCalls permission](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls) from the Key Manager.

## Setup

Make sure you have the following dependencies installed before beginning this tutorial.

- You can use either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- You MUST install [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)
- You SHOULD install [`@erc725/erc725.js`](https://github.com/ERC725Alliance/erc725.js)

<Tabs>
  
  <TabItem value="web3" label="web3">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts @erc725/erc725.js
```

  </TabItem>

  <TabItem value="ethers" label="ethers.js">

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
  
  <TabItem value="web3" label="web3">

```typescript title="Imports, Constants & EOA initialization"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { encodeKey } from '@erc725/erc725.js/build/main/src/lib/utils.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.testnet.lukso.network');
const universalProfileAddress = '0x..'; // address of the UP
const vaultAddress = '0x..'; // address of the Vault
const thirdPartyAddress = '0x..'; // address of the third party you want to restrict

// setup your EOA
const privateKey = '0x...';
const myEOA = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethers" label="ethers.js">

```typescript title="Imports, Constants & EOA initialization"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { encodeKey } from '@erc725/erc725.js/build/main/src/lib/utils.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const universalProfileAddress = '0x..'; // address of the UP
const vaultAddress = '0x..'; // address of the Vault
const thirdPartyAddress = '0x..'; // address of the third party you want to restrict

// setup your EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

## Step 2 - Create UP contract instance

At this point we will create instance for the [**Universal Profile**](../../standards/universal-profile/lsp0-erc725account.md) contract.

<Tabs>
  
  <TabItem value="web3" label="web3">

```typescript title="Universal Profile contract instance"
// create an instance of the UP
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);
```

  </TabItem>

  <TabItem value="ethers" label="ethers.js">

```typescript title="Universal Profile contract instance"
// create an instance of the UP
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
```

  </TabItem>

</Tabs>

## Step 3 - Generate the data key-value pair for [`AllowedCalls`](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls)

Now we need to generate a data key & a data value for the **Allowed Calls** that we want for the _Third Party address_. After we do that, we will update the _Allowed Calls data key_ with the encoded **Allowed Calls**

<Tabs>
  
  <TabItem value="web3" label="web3">

```typescript title="Data key & value for updating the Allowed Calls of a Controller address"
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
```

  </TabItem>

  <TabItem value="ethers" label="ethers.js">

```typescript title="Data key & value for updating the Allowed Calls of a Controller address"
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
```

  </TabItem>

</Tabs>

## Step 4 - Update the Universal profile data

Finally we will send a transaction that will update the Universal Profile AllowedCalls data key with the newly generated AllowedCalls.

<Tabs>
  
  <TabItem value="web3" label="web3">

<!-- prettier-ignore-start -->

```typescript title="Set the data key on the Universal Profile"
// Set the AllowedCalls data key on the Universal Profile
await universalProfile.methods.setData(
  allowedCallsDataKey,
  allowedCallsDataValue,
).send({
  from: myEOA.address,
  gasLimit: 600_000,
});
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethers" label="ethers.js">

```typescript title="Set the data key on the Universal Profile"
// Set the AllowedCalls data key on the Universal Profile
await universalProfile
  .connect(myEOA)
  .setData(allowedCallsDataKey, allowedCallsDataValue);
```

  </TabItem>

</Tabs>

## Final code

<Tabs>
  
  <TabItem value="web3" label="web3">

<!-- prettier-ignore-start -->

```typescript title="Setting Allowed Addresses for the 3rd party address"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { encodeKey } from '@erc725/erc725.js/build/main/src/lib/utils.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.testnet.lukso.network');
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

// Set the AllowedCalls data key on the Universal Profile
await universalProfile.methods.setData(
  allowedCallsDataKey,
  allowedCallsDataValue,
).send({
  from: myEOA.address,
  gasLimit: 600_000,
});
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethers" label="ethers.js">

```typescript title="Setting Allowed Addresses for the 3rd party address"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { encodeKey } from '@erc725/erc725.js/build/main/src/lib/utils.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
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

// Set the AllowedCalls data key on the Universal Profile
await universalProfile
  .connect(myEOA)
  .setData(allowedCallsDataKey, allowedCallsDataValue);
```

  </TabItem>

</Tabs>
