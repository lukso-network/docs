---
sidebar_label: 'Get controller addresses'
sidebar_position: 2
---

# Get controller addresses

In this guide, you will learn how to:

- retrieve all the addresses that have some permissions set on a Universal Profile,
- retrieve the permission of each of these **controller addresses**.

_image here_

We will use the [_erc725.js_](../../tools/erc725js/getting-started.md) library to do this with just over 30 lines of code.

## Setup

```bash
npm install erc725.js
```

## Step 1 - setup web3.js and erc725.js

The first step is to setup both and _web3.js_ and _erc725.js_, connected to the LUKSO L14 network. We will also need the address of the Universal Profile that we want to get the controller addresses from.

```js
const { ERC725 } = require("@erc725/erc725.js");
const LSP6Schema = require("@erc725/erc725.js/schemas/LSP6KeyManager.json");
const Web3 = require("web3");

// setup
const myUniversalProfileAddress = "0xC26508178c4D7d3Ad43Dcb9F9bb1fab9ceeD58B5";
const RPC_ENDPOINT = "https://rpc.l16.lukso.network";

// step 1 - setup instantiate erc725.js
const web3 = new Web3(RPC_ENDPOINT);
const erc725 = new ERC725(LSP6Schema, myUniversalProfileAddress, web3.currentProvider);
```


## Final Code

```js
const { ERC725 } = require("@erc725/erc725.js");
const LSP6Schema = require("@erc725/erc725.js/schemas/LSP6KeyManager.json");

const Web3 = require("web3");

// setup
const myUniversalProfileAddress = "0xC26508178c4D7d3Ad43Dcb9F9bb1fab9ceeD58B5";
const RPC_ENDPOINT = "https://rpc.l16.lukso.network";

const web3 = new Web3(RPC_ENDPOINT);

// step 1 -setup instantiate erc725.js
const erc725 = new ERC725(LSP6Schema, myUniversalProfileAddress, web3.currentProvider);

async function getPermissionedAddresses() {
  // step 2 - get the list of addresses that have permissioned on the Universal Profile
  const result = await erc725.getData("AddressPermissions[]");

  for (let ii = 0; ii < result.value.length; ii++) {
    const address = result.value[ii];

    // step 3.1 - get the permissions of each address
    const addressPermission = await erc725.getData({
      keyName: "AddressPermissions:Permissions:<address>",
      dynamicKeyParts: address,
    });

    // step 3.2 - decode the permission of each address
    const decodedPermission = erc725.decodePermissions(addressPermission.value);

    // we use JSON.stringify to display the permission in a readable format
    console.log(`decoded permission for ${address} = ` + JSON.stringify(decodedPermission, null, 2));
  }
}

getPermissionedAddresses();
```