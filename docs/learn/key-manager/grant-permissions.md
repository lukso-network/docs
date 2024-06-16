---
sidebar_label: 'Grant Permissions to an address'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Grant Permissions

:::caution

This article is a WIP

:::

:::info Requirements

You will need a Universal Profile that you can control via its KeyManager to follow this guide. <br/>

:::

In this guide, we will learn how to grant permissions to third-party addresses to enable them to interact with our Universal Profile.

By the end of this guide, you will know:

- How permissions in the LSP6 Key Manager work + how to create them using [_erc725.js_](../../tools/erc725js/getting-started.md).
- How to set permissions for a third party `address` on your Universal Profile.

![Give permissions to 3rd parties overview](/img/guides/lsp6/grant-permissions-to-3rd-parties-overview.jpeg)

## Introduction

The Key Manager (KM) enables us to give permissions to other 3rd party addresses to perform certain actions on our Universal Profile (UP), such as editing our profile details, or any other profile metadata.

When granting permissions to a new address, we need to update three data keys in the [ERC725Y](../../standards/lsp-background/erc725.md#erc725y) storage of our Universal Profile:

| :file_cabinet: ERC725Y data key                                                                                                     | :page_with_curl: Description                                   | :dart: **Objective**                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`AddressPermissions[]`](../../standards/universal-profile/lsp6-key-manager.md#retrieving-addresses-with-permissions)               | holds the number of addresses that have permissions on our UP. | We need to **increment it by +1**.                                                 |
| [`AddressPermissions[index]`](../../standards/universal-profile/lsp6-key-manager.md#retrieving-addresses-with-permissions)          | holds a controller address at a specific index.                | We need to **add the beneficiary address at the new index**.                       |
| [`AddressPermissions:Permissions:<beneficiary-address>`](../../standards/universal-profile/lsp6-key-manager.md#address-permissions) | this data key holds the permissions of a controller address.   | We need to **add the permissions of the beneficiary address** under this data key. |

## Setup

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3 @erc725/erc725.js @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell title="Install the dependencies"
npm install ethers @erc725/erc725.js @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

## Step 1 - Initialize erc725.js

The first step is to initialize the erc725.js library with a JSON schema specific to the LSP6 Key Manager. This will enable the library to know how to create and encode the permissions.

```js
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';

// step 1 -initialize erc725.js with the ERC725Y permissions data keys from LSP6 Key Manager
const erc725 = new ERC725(
  LSP6Schema,
  myUniversalProfileAddress,
  web3.currentProvider,
);
```

## Step 2 - Encode the permissions

:::info

More permissions are available in erc725.js. See the API docs for [`encodePermissions(...)`](../../tools/erc725js/methods.md#encodepermissions) function for a complete list.

:::

We can now use erc725.js to create the permissions for a specific 3rd party `address`. The library provide convenience functions for us, such as [`encodePermissions`](../../tools/erc725js/methods#encodepermissions).

### 2.1 - Create the permission

Let's consider in our example that we want to grant the permission `SETDATA` to a `beneficiaryAddress`, so that it can edit our Universal Profile details on our behalf.

We can do this very easily with erc725.js, using the `encodePermissions(...)` function.

```js
// step 2.1 - create the permissions of the beneficiary address
const beneficiaryPermissions = erc725.encodePermissions({
  SETDATA: true,
});
```

### 2.2 - Encode the permission for the 3rd party address

Now that we have created the permission value `SETDATA`, we need to assign it to the `beneficiaryAddress`.

To do so, we need to assign the permission value created in step 2.1 to the `beneficiaryAddress`, using the `AddressPermissions:Permissions:<address>`, where `<address>` will be the address of the beneficiary.

We also need to add the `beneficiaryAddress` inside the `AddressPermissions[]` Array, and increment the `AddressPermissions[]` array length (+1).

```js
// step 2.2 - encode the data key-value pairs of the permissions to be set for the beneficiary address
const beneficiaryAddress = '0xcafecafecafecafecafecafecafecafecafecafe'; // EOA address of an exemplary person

const addressPermissionsArray = await erc725.getData('AddressPermissions[]');
const controllers = addressPermissionsArray.value;

const permissionData = erc725.encodeData([
  // the permission of the beneficiary address
  {
    keyName: 'AddressPermissions:Permissions:<address>',
    dynamicKeyParts: beneficiaryAddress,
    value: beneficiaryPermissions,
  },
  // the new list controllers addresses (= addresses with permissions set on the UP)
  // + the incremented `AddressPermissions[]` array length
  {
    keyName: 'AddressPermissions[]',
    value: [...controllers, beneficiaryAddress],
  },
]);
```

## Step 3 - Add the permissions on your UP

We have now all the data needed to setup the permission for this 3rd party addres on our Universal Profile.

### 3.1 - Add imports & constants

To get started you would need the following:

- **UniversalProfile** from [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts) in order to use its ABI.
- The private key for your _controller address_ with proper [**permissions**](../../standards/universal-profile/lsp6-key-manager.md#permissions), used for interacting with the Universal Profile.
- The address of the Universal Profile that you want to interact with.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript title="Load account from a private key"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const myUniversalProfileAddress = '0x...';
const PRIVATE_KEY = '0x...'; // your EOA private key (previously created)
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```javascript title="Load account from a private key"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');
const myUniversalProfileAddress = '0x...';
const PRIVATE_KEY = '0x...'; // your EOA private key (previously created)
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

### 3.2 - Load your controller address

We will need to interact with the Key Manager from the main controller address (the externally owned account (EOA) that has all the permissions on the UP).

The first step is to load this main controller address as an EOA using its private key.

The private key can be obtained depending on how you created your Universal Profile:

- UP created with our **Create a Universal Profile guide**: you should have provided the private key and known it.
- UP created with the _lsp-factory.js_: this is the private key given in the `controllerAddresses` field in the method [`lspFactory.UniversalProfile.deploy(...)`](../../tools/lsp-factoryjs/classes/universal-profile#deploy)
- UP created via the Browser extension: click on the _Settings_ icon (top right) > and _Export Private Key_

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript title="Load account from a private key"
const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript title="Load account from a private key"
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

### 3.3 - Create contract instance

The next steps is to create an instance of our UP smart contract to interact with. The contract ABIs are available in the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) npm package.

You will need the address of your Universal Profile.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```js
// step 1 - create instance of UniversalProfile contract
const myUniversalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  myUniversalProfileAddress,
);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```js
// step 1 - create instance of UniversalProfile contract
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
```

  </TabItem>

</Tabs>

### 3.4 - Set the permission on the Universal Profile

The last and final step is to setup the permissions the `beneficiaryAddress` on our Universal Profile.

We can easily access the data key-value pair from the encoded data obtained by erc725.js in step 2.2.

We will then encode this permission data keys in a `setData(...)` payload and interact via the Key Manager.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```js
// step 3.3 - send the transaction
await myUniversalProfile.methods.setData(
  data.keys,
  data.values,
).send({
  from: myEOA.address,
  gasLimit: 300_000,
});
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```js
// step 3.3 - send the transaction
await myUniversalProfile
  .connect(account)
  .setData(data.keys, data.values);
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

## Testing the permissions

We can now check that the permissions have been correctly set by querying the `AddressPermissions:Permissions:<beneficiaryAddress>` data key on the ERC725Y storage of the Universal Profile.

If everything went well, the code snippet below should return you back an object with the permission `SETDATA` set to `true`.

```js
const result = await myUniversalProfile.methods['getData(bytes32)'](
  data.keys[0],
).call();
console.log(
  `The beneficiary address ${beneficiaryAddress} has now the following permissions:`,
  erc725.decodePermissions(result),
);
```

Finally, to test the actual permissions, you can do this guide using a `beneficiaryAddress` that you have control over (created manually via web3.js).

You can then try to do again the **Edit our Universal Profile** guide, using this new 3rd party address that you have control over to test if it can successfull edit the profile details. This will give you guarantee that this `beneficiaryAddress` has the `SETDATA` permission working.

## Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```js
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const myUniversalProfileAddress = '0x...';

const PRIVATE_KEY = '0x...'; // your EOA private key (previously created)
const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);

const erc725 = new ERC725(
  LSP6Schema,
  myUniversalProfileAddress,
  web3.currentProvider,
);

async function grantPermissions() {
  // step 1 - create instance of UP contract
  const myUniversalProfile = new web3.eth.Contract(
    UniversalProfile.abi,
    myUniversalProfileAddress,
  );

  // step 2 - setup the permissions of the beneficiary address
  const beneficiaryAddress = '0xcafecafecafecafecafecafecafecafecafecafe'; // EOA address of an exemplary person
  const beneficiaryPermissions = erc725.encodePermissions({
    SETDATA: true,
  });

  // step 3.1 - encode the data key-value pairs of the permissions to be set
  const addressPermissionsArray = await erc725.getData('AddressPermissions[]');
  const controllers = addressPermissionsArray.value;

  const data = erc725.encodeData([
    // the permission of the beneficiary address
    {
      keyName: 'AddressPermissions:Permissions:<address>',
      dynamicKeyParts: beneficiaryAddress,
      value: beneficiaryPermissions,
    },
    // the new list controllers addresses (= addresses with permissions set on the UP)
    // + the incremented `AddressPermissions[]` array length
    {
      keyName: 'AddressPermissions[]',
      value: [...controllers, beneficiaryAddress],
    },
  ]);

  // step 3.3 - send the transaction
  await myUniversalProfile.methods.setDataBatch(
    data.keys,
    data.values,
  ).send({
    from: myEOA.address,
    gasLimit: 300_000,
  });

  const result = await myUniversalProfile.methods['getData(bytes32)'](
    data.keys[0],
  ).call();
  console.log(
    `The beneficiary address ${beneficiaryAddress} has now the following permissions:`,
    erc725.decodePermissions(result),
  );
}

grantPermissions();
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```js
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import { ethers } from 'ethers';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const myUniversalProfileAddress = '0x...';

const PRIVATE_KEY = '0x...'; // your EOA private key (previously created)
const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');
const myEOA = new ethers.Wallet(privateKey).connect(provider);

const erc725 = new ERC725(
  LSP6Schema,
  myUniversalProfileAddress,
  web3.currentProvider,
);

async function grantPermissions() {
  // step 1 - create instance of UniversalProfile contract
  const universalProfile = new ethers.Contract(
    universalProfileAddress,
    UniversalProfile.abi,
  );

  // step 2 - setup the permissions of the beneficiary address
  const beneficiaryAddress = '0xcafecafecafecafecafecafecafecafecafecafe'; // EOA address of an exemplary person
  const beneficiaryPermissions = erc725.encodePermissions({
    SETDATA: true,
  });

  // step 3.1 - encode the data key-value pairs of the permissions to be set
  const addressPermissionsArray = await erc725.getData('AddressPermissions[]');
  const controllers = addressPermissionsArray.value;

  const data = erc725.encodeData([
    // the permission of the beneficiary address
    {
      keyName: 'AddressPermissions:Permissions:<address>',
      dynamicKeyParts: beneficiaryAddress,
      value: beneficiaryPermissions,
    },
    // the new list controllers addresses (= addresses with permissions set on the UP)
    // + the incremented `AddressPermissions[]` array length
    {
      keyName: 'AddressPermissions[]',
      value: [...controllers, beneficiaryAddress],
    },
  ]);

  // step 3.3 - send the transaction
  await myUniversalProfile
    .connect(account)
    .setData(data.keys, data.values);

  const result = await myUniversalProfile.['getData(bytes32)'](
    data.keys[0],
  );
  console.log(
    `The beneficiary address ${beneficiaryAddress} has now the following permissions:`,
    erc725.decodePermissions(result),
  );
}

grantPermissions();
```

  </TabItem>

</Tabs>
