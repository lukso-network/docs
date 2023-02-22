---
sidebar_label: 'Get controller addresses'
sidebar_position: 2
---

# Get controller addresses

In this guide, you will learn how to:

- retrieve all the addresses that have some permissions set on a Universal Profile,
- retrieve the permission of each of these **controller addresses**.

![Get controller addresses](/img/standards/lsp6/lsp6-address-permissions-array.jpeg)

We will use the [_erc725.js_](../../tools/erc725js/getting-started.md) library to do this with just over 30 lines of code.

## Setup

```bash
npm install @erc725/erc725.js
```

## Step 1 - setup web3.js and erc725.js

The first step is to set up both and _web3.js_ and _erc725.js_, and connect to the LUKSO L16 network. We will also need the address of the Universal Profile that we want to get the controller addresses from.

```js
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import Web3 from 'web3';

// setup
const myUniversalProfileAddress = '0xC26508178c4D7d3Ad43Dcb9F9bb1fab9ceeD58B5';
const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';

// step 1 - setup erc725.js
const web3 = new Web3(RPC_ENDPOINT);
const erc725 = new ERC725(
  LSP6Schema,
  myUniversalProfileAddress,
  web3.currentProvider,
);
```

## Step 2 - Get the list of controller addresses

The next step is to retrieve the list of controller addresses. In other words, addresses with some permissions can interact with the Universal Profile.

All the controller addresses are listed under the data key `AddressPermissions[]`. We can retrieve them by:

1. querying the `AddressPermissions[]` to get the array length and know **how many controller addresses** have some permissions on the UP.
2. querying each index of the `AddressPermissions[index]` array to retrieve each address individually.

Thanks to _erc725.js_, we can do that very easily. The library will do both steps for us and will returns the full list of controller addresses.

```js
// step 2 - get the list of addresses that have permissions on the Universal Profile
const result = await erc725.getData('AddressPermissions[]');
console.log(result);

// {
//   key: '0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3',
//   name: 'AddressPermissions[]',
//   value: [
//     '0x5F606b5b237623463a90F63230F9b929321dbCBa',
//     '0xa1061408e55c971fD129eF5561dFB953d598dAD7'
//   ]
// }
```

## Step 3 - Get permissions of each controllers

Getting the addresses of each controller is not enough. We need to retrieve the permissions of each of these controller address, so to know what they are allowed to do in our Universal Profile.

We can do this easily again with the [`getData(...)`](../../tools/erc725js/classes/ERC725#getdata) and [`decodePermissions(...)`](../../tools/erc725js/classes/ERC725#decodepermissions) functions from _erc725.js_.

### 3.1 - Retrieve controller's permissions

Using `getData(...)` with the data key `AddressPermissions:Permissions:<address>`, we can pass the controller address as the dynamic part `<address>` in the data key.

```js
// step 3.1 - get the permissions of each address
const addressPermission = await erc725.getData({
  keyName: 'AddressPermissions:Permissions:<address>',
  dynamicKeyParts: address,
});
console.log(addressPermission);

// {
//   key: '0x4b80742de2bf82acb3630000a1061408e55c971fd129ef5561dfb953d598dad7',
//   name: 'AddressPermissions:Permissions:a1061408e55c971fD129eF5561dFB953d598dAD7',
//   value: '0x0000000000000000000000000000000000000000000000000000000000000008'
// }
```

### 3.2 - Decode controller's permissions

As you can see in step 3.1, the permission that we obtain for a controller address is still encoded in `bytes32` as a [`BitArray`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#BitArray).

In order to read the controller permissions in a human readable format, we can use the convenience function [`decodePermissions(...)`](../../tools/erc725js/classes/ERC725#decodepermissions) from _erc725.js_.

```js
// step 3.2 - decode the permission of each address
const decodedPermission = erc725.decodePermissions(addressPermission.value);

// we use JSON.stringify to display the permission in a readable format
console.log(
  `decoded permission for ${address} = ` +
    JSON.stringify(decodedPermission, null, 2),
);

// decoded permission for 0x5F606b5b237623463a90F63230F9b929321dbCBa = {
// "CHANGEOWNER": true,
// "ADDCONTROLLER": true,
// "EDITPERMISSIONS": true,
// "ADDEXTENSIONS": true,
// "CHANGEEXTENSIONS": true,
// "ADDUNIVERSALRECEIVERDELEGATE": true,
// "CHANGEUNIVERSALRECEIVERDELEGATE": true,
// "REENTRANCY": false,
// "SUPER_TRANSFERVALUE": true,
// "TRANSFERVALUE": true,
// "SUPER_CALL": true,
// "CALL": true,
// "SUPER_STATICCALL": true,
// "STATICCALL": true,
// "SUPER_DELEGATECALL": false,
// "DELEGATECALL": false,
// "DEPLOY": true,
// "SUPER_SETDATA": true,
// "SETDATA": true,
// "ENCRYPT": true,
// "DECRYPT": true,
// "SIGN": true,
// }
```

## Final Code

```js
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import Web3 from 'web3';

// setup
const myUniversalProfileAddress = '0xC26508178c4D7d3Ad43Dcb9F9bb1fab9ceeD58B5';
const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';

const web3 = new Web3(RPC_ENDPOINT);

// step 1 - setup erc725.js
const erc725 = new ERC725(
  LSP6Schema,
  myUniversalProfileAddress,
  web3.currentProvider,
);

async function getPermissionedAddresses() {
  // step 2 - get the list of addresses that have permissions on the Universal Profile
  const result = await erc725.getData('AddressPermissions[]');

  for (let ii = 0; ii < result.value.length; ii++) {
    const address = result.value[ii];

    // step 3.1 - get the permissions of each address
    const addressPermission = await erc725.getData({
      keyName: 'AddressPermissions:Permissions:<address>',
      dynamicKeyParts: address,
    });

    // step 3.2 - decode the permission of each address
    const decodedPermission = erc725.decodePermissions(addressPermission.value);

    // we use JSON.stringify to display the permission in a readable format
    console.log(
      `decoded permission for ${address} = ` +
        JSON.stringify(decodedPermission, null, 2),
    );
  }
}

getPermissionedAddresses();
```
