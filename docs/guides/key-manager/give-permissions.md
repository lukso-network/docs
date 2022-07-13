---
sidebar_label: 'Grant Permissions to 3rd parties'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Grant Permissions to 3rd party addresses

:::info

You will need a Universal Profile deployed and setup with a Key Manager as an owner. If you haven't, head back to our [**"Create a Universal Profile"** guide](../universal-profile/create-profile.md) or look at the [_lsp-factory.js_](../../tools/lsp-factoryjs/deployment/universal-profile.md) docs.

:::

In this guide, you will learn how to grant permission to 3rd party addresses, so that they can interact on your behalf on your Universal Profile.

_image here_

We will use [_erc725.js_](../../../../tools/erc725js/getting-started) library to create the permissions of the 3rd party address.


## Introduction

The Key Manager (KM) enables us to give permissions to other 3rd party addresses to perform certain actions on our Universal Profile (UP), such as editing our profile details, or any other profile metadata.

The JSON schema for the permissions is available in erc725.js
## Setup

```shell
npm install erc725.js @lukso/lsp-smart-contracts
```

## Step 1 - Initialize erc725.js

The first step is to initialize the erc725.js library with a JSON schema specific to the LSP6 Key Manager. This will enable the library to know how to create and encode the permissions.

```js
const { ERC725 } = require("@erc725/erc725.js");
const LSP6Schema = require("@erc725/erc725.js/schemas/LSP6KeyManager.json");

// step 1 -initialize erc725.js with the ERC725Y permissions data keys from LSP6 Key Manager
const erc725 = new ERC725(LSP6Schema);
```


## Step 2 - Encode the permissions

:::info 

More permissions are available in erc725.js. See the API docs for [`encodePermissions(...)`](../../tools/erc725js/classes/ERC725.md#encodepermissions) function for a complete list.

:::

We can now use erc725.js to create the permissions for a specific 3rd party `address`. The library provide convenience functions for us, such as [`encodePermissions`](../../../../tools/erc725js/classes/ERC725#encodepermissions).

### 2.1 - create the permission


Let's consider in our example that we want to grant the permission `SETDATA` to a `beneficiaryAddress`, so that it can edit our Universal Profile details on our behalf.

We can do this very easily with erc725.js, using the `encodePermissions(...)` function.

```js
// step 2.1 - create the permissions of the beneficiary address
const beneficiaryPermissions = erc725.encodePermissions({
    SETDATA: true,
});
```

### 2.2 - encode the permission for the 3rd party address

Now that we have created the permission value `SETDATA`, we need to assign it to the `beneficiaryAddress`.

To do so, we need to assign the permission value created in step 2.1 to the `beneficiaryAddress`, using the `AddressPermissions:Permissions:<address>`, where `<address>` will be the address of the beneficiary

```js
// step 2.2 - encode the data key-value pairs of the permissions to be set for the beneficiary address
const beneficiaryAddress = "0xcafecafecafecafecafecafecafecafecafecafe"; // EOA address of an exemplary person
const permissionData = erc725.encodeData({
    keyName: "AddressPermissions:Permissions:<address>",
    dynamicKeyParts: beneficiaryAddress,
    value: beneficiaryPermissions,
  });
```


## Step 3 - Add the permissions on your UP

We have now all the data needed to setup the permission for this 3rd party addres on our Universal Profile.

### 3.1 - Load your controller address

We will need to interact with the Key Manager from the main controller address (the externally owned account (EOA) that has all the permissions on the UP).

The first step is to load this main controller address as an EOA using its private key.

The private key can be obtained depending on how you created your Universal Profile:

- UP created with our **Create a Universal Profile guide**: you should have provided the private key and known it.
- UP created with the _lsp-factory.js_: this is the private key given in the `controllerAddresses` field in the method [`lspFactory.UniversalProfile.deploy(...)`](../../tools/lsp-factoryjs/classes/universal-profile#deploy)
- UP created via the Browser extension: click on the _Settings_ icon (top right) > and _Export Private Key_


```javascript title="Load account from a private key"
const Web3 = require('web3');
const web3 = new Web3('https://rpc.l14.lukso.network');

const PRIVATE_KEY = '0x...'; // your EOA private key (previously created)

const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);
```

### 3.2 - Create contract instance

The next steps is to create the web3 instance of our smart contracts to interact with them. The contract ABIs are available in the @lukso/lsp-smart-contracts npm package.

You will need the address of your Universal Profile deployed on L16.

```js
const UniversalProfile = require("@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json");
const KeyManager = require("@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json");

const Web3 = require("web3");

const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
const web3 = new Web3(RPC_ENDPOINT);


// step 1 - create instance of UniversalProfile and KeyManager contracts
const myUniversalProfileAddress = "0x4F81bFDD12c73c94222C7879C91c1B837b8adb62";
const myUniversalProfile = new web3.eth.Contract(UniversalProfile.abi, myUniversalProfileAddress);
```

Since the KeyManager is the owner of the Universal Profile, its address can be obtained easily by querying the `owner()` of the Universal Profile.

```js
const keyManagerAddress = await myUniversalProfile.methods.owner().call();
const myKeyManager = new web3.eth.Contract(KeyManager.abi, keyManagerAddress);
```


### 3.3 - Set the permission on the Universal Profile

The last and final step is to setup the permissions the `beneficiaryAddress` on our Universal Profile.

We can easily access the data key-value pair from the encoded data obtained by erc725.js in step 2.2.

We will then encode this permission data keys in a `setData(...)` payload and interact via the Key Manager.

```js
// step 3.3 - encode the payload to set permissions and send the transaction via the Key Manager
const payload = myUniversalProfile.methods["setData(bytes32,bytes)"](data.keys[0], data.values[0]).encodeABI();

  // step 4 - send the transaction via the Key Manager contract
  await myKeyManager.methods.execute(payload).send({
    from: myEOA.address,
    gasLimit: 300_000,
  });
```


## Testing the permissions

We can now check that the permissions have been correctly set by querying the `AddressPermissions:Permissions:<beneficiaryAddress>` data key on the ERC725Y storage of the Universal Profile.

If everything went well, the code snippet below should return you back an object with the permission `SETDATA` set to `true`.

```js
const result = await myUniversalProfile.methods["getData(bytes32)"](data.keys[0]).call();
  console.log(
    `The beneficiary address ${beneficiaryAddress} has now the following permissions:`,
    erc725.decodePermissions(result)
  );
```

Finally, to test the actual permissions, you can do this guide using a `beneficiaryAddress` that you have control over (created manually via web3.js).

You can then try to do again the **Edit our Universal Profile** guide, using this new 3rd party address that you have control over to test if it can successfull edit the profile details. This will give you guarantee that this `beneficiaryAddress` has the `SETDATA` permission working.



