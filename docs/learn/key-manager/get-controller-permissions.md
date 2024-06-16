---
sidebar_label: 'Get List of Permissioned addresses'
sidebar_position: 1
---

# Get List of Permissioned Addresses

:::tip Code repository

You can find the scripts of this guide within our [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository.

:::

This guide shows how to retrieve the list of addresses that have some permissions on a Universal Profile. We commonly call these addresses **controllers**.

Alongside each controller, Ww will also retrieve their associated permissions. All of this will involve 3 steps:

1. **retrieve all controller addresses** of a Universal Profile
2. **retrieve the encoded permissions** of each controller.
3. **decode these permissions** in a human readable way

![Get controller addresses](/img/standards/lsp6/lsp6-address-permissions-array.jpeg)

## Setup

We will use the [`erc725.js`](../../tools/erc725js/getting-started.md) library to easily query and decode the [`AddressPermissions[]`](../../standards/universal-profile/lsp6-key-manager.md#retrieving-list-of-controllers) and [`AddressPermissions:Permissions:<controller-address>`](../../standards/universal-profile/lsp6-key-manager.md#address-permissions) data keys on the Universal Profile.

```bash
npm install @erc725/erc725.js
```

## Step 1 - Instantiate erc725.js

First let's initialize _erc725.js_ and connect it to a specific Universal Profile address on LUKSO Testnet. This will enable us to query its storage easily.

```js title="Create an instance of erc725.js connected to a 🆙"
import { ERC725 } from '@erc725/erc725.js';

// This contains the schemas of the data keys:
// - AddressPermissions[] -> contains the list of controllers
// - `AddressPermission:Permissions:<controller-address>
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';

// Sample Profile Address
const UNIVERSAL_PROFILE = '0xEda145b45f76EDB44F112B0d46654044E7B8F319';

// Instantiate erc725.js with a Universal Profile address on Testnet
const erc725 = new ERC725(
  LSP6Schema,
  UNIVERSAL_PROFILE,
  'https://rpc.testnet.lukso.network',
);
```

## Step 2 - Get the list of controllers

You can now simply query the [`AddressPermissions[]`](../../standards/universal-profile/lsp6-key-manager.md#retrieving-addresses-with-permissions) data key with the [`getData('AddressPermissions[]')`](../../tools/erc725js/methods.md#getdata) function from _erc725.js_. This will return you an array of addresses.

```js title="Retrieve the list of addresses that have some permissions on the 🆙."
async function getPermissionedAddresses() {
  // Get the list of addresses that have permissions on the Universal Profile
  const controllerAddresses = await erc725.getData('AddressPermissions[]');

  if (!controllerAddresses) {
    console.error('No controllers listed under this Universal Profile ');
  }

  console.log(controllerAddresses);
  // {
  //   key: '0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3',
  //   name: 'AddressPermissions[]',
  //    value: [
  //      '0x5F606b5b237623463a90F63230F9b929321dbCBa',
  //      '0xa1061408e55c971fD129eF5561dFB953d598dAD7'
  //    ]
  // }
}
```

<!-- TODO: double check this, it might be incorrect -->
<!-- :::tip

If you want to retrieve a controller address individually, you can use the [`AddressPermissions[index]`](/standards/universal-profile/lsp6-key-manager/#permissions) within the [`getData()`](../../tools/erc725js/methods/#getdata) function of the contract or 🛠️[`erc725.js`](../../tools/erc725js/getting-started.md) library.

::: -->

## Step 3 - Get controller's permissions

Now that we have all the controller's addresses, You can retrieve the permissions of each individual controller by querying the data key [`AddressPermissions:Permissions:<controller-address>`](../../standards/universal-profile/lsp6-key-manager.md#retrieving-addresses-with-permissions). This involves 2 steps:

1. Get the raw encoded `bytes32` permission for the controller
2. Decode this permission value to get an object listing which permissions are set or not for this controller.

### 3.1 - Get the encoded permission of the controller.

Let's first understand how to query the controller's permission!

You will have to replace the `<controller-address>` part with the actual address of the controller. Therefore the data key for the controller address `0xcafecafecafecafecafecafecafecafecafecafe` will look as follow:

<!-- prettier-ignore-start -->

```js title="From human readable to smart contract readable permission data key."
// human readable
`AddressPermissions:Permissions:<controller-address>`

// in hex
0x4b80742de2bf82acb3630000<controller-address>

// final data key with actual controller address 0xcafecafe...
0x4b80742de2bf82acb3630000cafecafecafecafecafecafecafecafecafecafe
```

<!-- prettier-ignore-end -->

Thankfully, _erc725.js_ manages all this complexity for us! Simply use the `getData(...)` function and pass the controller address as option to the `dynamicKeyPart`. See the code snippet below:

```js title="Fetch the encoded permissions for a controller."
async function getPermissionedAddresses() {

  // ...

  if (Array.isArray(controllerAddresses.value)) {
    // Get the permissions of each controller of the UP
    for (let i = 0; i < controllerAddresses.value.length; i++) {
      const address = controllerAddresses.value[i] as string;

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
    }
  }
}
```

### 3.2 - Decode the permission

The `value` above `0x0000...0008` in the object does not give us a lot of information. This is because **permissions are encoded as a [`BitArray`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#BitArray)**.

Luckily, we don't need to understand the complexity behind the scene to understand the permissions that are set. After retrieving these encoded permission values, we can use again the [`decodePermissions(...)`](../../tools/erc725js/methods#decodepermissions) function from the 🛠️[`erc725.js`](../../tools/erc725js/getting-started.md) library to decode them easily.

The function returns an object showing which permissions the controller has with `true` or `false`.

```js title="Example of decoded permission value from hex to an object."
async function getPermissionedAddresses() {

  // ...

  if (Array.isArray(controllerAddresses.value)) {

    // ...

    // Decode the permission of each address
    const decodedPermission = erc725.decodePermissions(addressPermission.value as string);

    // Display the permission in a readable format
    console.log(
      `Decoded permission for ${address} = ` + JSON.stringify(decodedPermission, null, 2),
    );
    // Decoded permission for 0x5F606b5b237623463a90F63230F9b929321dbCBa = {
    //   "CHANGEOWNER": true,
    //   "ADDCONTROLLER": true,
    //   "EDITPERMISSIONS": true,
    //   "ADDEXTENSIONS": true,
    //   "CHANGEEXTENSIONS": true,
    //   "ADDUNIVERSALRECEIVERDELEGATE": true,
    //   "CHANGEUNIVERSALRECEIVERDELEGATE": true,
    //   "REENTRANCY": false,
    //   "SUPER_TRANSFERVALUE": true,
    //   "TRANSFERVALUE": true,
    //   "SUPER_CALL": true,
    //   "CALL": true,
    //   "SUPER_STATICCALL": true,
    //   "STATICCALL": true,
    //   "SUPER_DELEGATECALL": false,
    //   "DELEGATECALL": false,
    //   "DEPLOY": true,
    //   "SUPER_SETDATA": true,
    //   "SETDATA": true,
    //   "ENCRYPT": true,
    //   "DECRYPT": true,
    //   "SIGN": true,
    // }
  }
}
getPermissionedAddresses();
```
