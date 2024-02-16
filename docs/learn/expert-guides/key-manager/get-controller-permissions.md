---
sidebar_label: '🎮 Get Controller Permissions'
sidebar_position: 1
---

# Get Controller Permissions

In this guide, you will learn how to:

- **retrieve all controller addresses** of a Universal Profile
- **retrieve the permissions** of each controller address

![Get controller addresses](/img/standards/lsp6/lsp6-address-permissions-array.jpeg)

:::tip Code repository

You can find the scripts of this guide within our [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository.

:::

## Setup

First, we will install the 🛠️[`erc725.js`](../../../tools/erc725js/getting-started.md) library to easily query and decode the 🗂️[ERC725Y data storage](../../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) of the Universal Profile. You can then initialize a Universal Profile and connect to the LUKSO L16 network.

```bash
npm install @erc725/erc725.js
```

```js
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';

// Set up Universal Profile on the LUKSO Testnet
const erc725 = new ERC725(
  LSP6Schema,
  // Sample Profile Address
  '0xEda145b45f76EDB44F112B0d46654044E7B8F319',
  // LUKSO Testnet RPC
  'https://rpc.testnet.lukso.network',
);
```

## Get the Controller Addresses

After setting up the Universal Profile, you can retrieve the list of controller addressess by querying the [`AddressPermissions[]`](../../../standards/universal-profile/lsp6-key-manager.md#retrieving-addresses-with-permissions) key of the 🗂️[ERC725Y data storage](../../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store). This will return an array with all controller addresses of the Universal Profiles:

```js
async function getPermissionedAddresses() {
  // Get the list of addresses that have permissions on the Universal Profile
  const result = await erc725.getData('AddressPermissions[]');

  if (!result) {
    console.error('No controllers listed under this Universal Profile ');
  }
}
```

<Details>
    <summary>Show <code>AddressPermissions[]</code> value</summary>

```js
{
  key: '0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3',
  name: 'AddressPermissions[]',
   value: [
     '0x5F606b5b237623463a90F63230F9b929321dbCBa',
     '0xa1061408e55c971fD129eF5561dFB953d598dAD7'
   ]
}
```

</Details>

:::tip

If you want to retrieve a controller address individually, you can use the [`AddressPermissions[index]`](/standards/universal-profile/lsp6-key-manager/#permissions) within the [`getData()`](../../../tools/erc725js/classes/ERC725/#getdata) function of the contract or 🛠️[`erc725.js`](../../../tools/erc725js/getting-started.md) library.

:::

## Get the Controller Permissions

After queriying all controller addresses, you can retrieve the permissions of each controller by querying the dynamic [`AddressPermissions:Permissions:<address>`](../../../standards/universal-profile/lsp6-key-manager.md#retrieving-addresses-with-permissions) key of the 🗂️[ERC725Y data storage](../../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store). You can do this again using the [`getData(...)`](../../../tools/erc725js/classes/ERC725#getdata) functions of the 🛠️[`erc725.js`](../../../tools/erc725js/getting-started.md) library.

```js
async function getPermissionedAddresses() {

  // ...

  if (Array.isArray(result.value)) {
    // Get the permissions of each controller of the UP
    for (let i = 0; i < result.value.length; i++) {
      const address = result.value[i] as string;

      const addressPermission = await erc725.getData({
        keyName: 'AddressPermissions:Permissions:<address>',
        dynamicKeyParts: address,
      });

      console.log(addressPermission);
    }
  }
}
```

<Details>
    <summary>Show <code>addressPermission</code> value</summary>

```js
{
  key: '0x4b80742de2bf82acb3630000a1061408e55c971fd129ef5561dfb953d598dad7',
  name: 'AddressPermissions:Permissions:a1061408e55c971fD129eF5561dFB953d598dAD7',
  value: '0x0000000000000000000000000000000000000000000000000000000000000008'
}
```

</Details>

## Decode Controller Permissions

Permission are encoded as a [`BitArray`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#BitArray). After queriying their values, you can decode them by calling the and [`decodePermissions(...)`](../../../tools/erc725js/classes/ERC725#decodepermissions) function of the 🛠️[`erc725.js`](../../../tools/erc725js/getting-started.md) library:

```js
async function getPermissionedAddresses() {

  // ...

  if (Array.isArray(result.value)) {

    // ...

    // Decode the permission of each address
    const decodedPermission = erc725.decodePermissions(addressPermission.value as string);

    // Display the permission in a readable format
    console.log(
      `Decoded permission for ${address} = ` + JSON.stringify(decodedPermission, null, 2),
    );
  }
}
getPermissionedAddresses();
```

<Details>
    <summary>Show <code>decodedPermission</code> value</summary>

```js
Decoded permission for 0x5F606b5b237623463a90F63230F9b929321dbCBa = {
  "CHANGEOWNER": true,
  "ADDCONTROLLER": true,
  "EDITPERMISSIONS": true,
  "ADDEXTENSIONS": true,
  "CHANGEEXTENSIONS": true,
  "ADDUNIVERSALRECEIVERDELEGATE": true,
  "CHANGEUNIVERSALRECEIVERDELEGATE": true,
  "REENTRANCY": false,
  "SUPER_TRANSFERVALUE": true,
  "TRANSFERVALUE": true,
  "SUPER_CALL": true,
  "CALL": true,
  "SUPER_STATICCALL": true,
  "STATICCALL": true,
  "SUPER_DELEGATECALL": false,
  "DELEGATECALL": false,
  "DEPLOY": true,
  "SUPER_SETDATA": true,
  "SETDATA": true,
  "ENCRYPT": true,
  "DECRYPT": true,
  "SIGN": true,
}
```

</Details>
