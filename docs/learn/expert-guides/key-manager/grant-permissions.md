---
sidebar_label: '🫡 Grant Permissions'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Grant Permissions

This guide will teach you how to grant [Key Manager Permissions](../../../standards/universal-profile/lsp6-key-manager.md#address-permissions) to third-party addresses. Permissioned addresses become _Universal Profile Controllers_ with **individual permissions** to **interact with or on behalf of the Universal Profile**.

:::info Code Examples

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/key-manager) repository.

:::

:::note Requirements

If you don't have a Universal Profile yet, please follow our previous guide to [**Create a Universal Profile**](../universal-profile/create-profile.md). To follow this guide, you must have a Universal Profile and related controller with the [`ADDCONTROLLER`](../../../standards/universal-profile/lsp6-key-manager#permissions) permission.

:::

## Key Manager Calls

The Universal Profile is a smart contract, meaning transactions can not be executed directly from it. Therefore, transactions have to be signed and executed by EOA controllers. To restrict interactions to the rightful controllers, the [Key Manager](../../../standards/universal-profile/lsp6-key-manager.md) checks if the calling addresses can perform specific actions on the Universal Profile.

![Give permissions to 3rd parties overview](/img/guides/lsp6/grant-permissions-to-3rd-parties-overview.jpeg)

If Alice sends a transaction to a [Universal Profile](../../../standards/universal-profile/introduction.md), the smart contract will first call its [Key Manager](../../../standards/universal-profile/lsp6-key-manager.md) to verify that the address is allowed to execute this action. If the check is successful, the transaction gets executed. Otherwise, it reverts.

## Granting Permissions

The Key Manager is restricting access and performing the checks. However, the actual permissions are stored within the [Universal Profile](../../../standards/universal-profile/introduction.md). When adding a new controller, the following **three data keys** have to be updated in the [ERC725Y](../../../standards/lsp-background/erc725.md#erc725y) storage:

| :file_cabinet: ERC725Y Data Key                                                                                                        | :page_with_curl: Description                                   | :dart: **Objective**                                             |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`AddressPermissions[]`](../../../standards/universal-profile/lsp6-key-manager.md#retrieving-addresses-with-permissions)               | Holds the number of addresses that have permissions on our UP. | Must be **incremented by 1**.                                    |
| [`AddressPermissions[index]`](../../../standards/universal-profile/lsp6-key-manager.md#retrieving-addresses-with-permissions)          | Holds a controller address at a specific index.                | Has to **include the beneficiary address** at the **new index**. |
| [`AddressPermissions:Permissions:<beneficiary-address>`](../../../standards/universal-profile/lsp6-key-manager.md#address-permissions) | Holds the permissions of a controller address.                 | Has to **include the permissions** of the beneficiary address.   |

## Setup

In order to grant permissions, you have to install a provider library and necessary libraries. We will use [`erc725.js`](../../../tools/erc725js/getting-started.md) to encode the permissions. The [`lsp-smart-contracts`](../../../tools/lsp-smart-contracts/getting-started.md) library is further used to get the ABI of the [Universal Profile](../../../standards/universal-profile/introduction.md).

<Tabs groupId="provider-lib">
   <TabItem value="ethersjs" label="ethers.js" default>

```shell
npm install ethers @erc725/erc725.js @lukso/lsp-smart-contracts
```

  </TabItem>
  <TabItem value="web3js" label="web3.js">

```shell
npm install web3 @erc725/erc725.js @lukso/lsp-smart-contracts
```

  </TabItem>
</Tabs>

After the installation, you can initialize the [ERC725](../../../tools/erc725js/getting-started.md) object with the JSON Schema of the [LSP6 Key Manager](../../../standards/universal-profile/lsp6-key-manager.md). The schema is necessary to create and encode the permissions.

<Tabs groupId="provider-lib">
   <TabItem value="ethersjs" label="ethers.js" default>

```js
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';

const myUniversalProfileAddress = '0x...';

const RPC_ENDPOINT = new ethers.JsonRpcProvider(
  'https://4201.rpc.thirdweb.com',
);

// Initialize erc725.js with the permission data keys from LSP6 Key Manager
const erc725 = new ERC725(
  LSP6Schema,
  myUniversalProfileAddress,
  RPC_ENDPOINT,
  {},
);
```

  </TabItem>
  <TabItem value="web3js" label="web3.js">

```js
import Web3 from 'web3';
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';

const myUniversalProfileAddress = '0x...';

const web3 = new Web3('https://4201.rpc.thirdweb.com');

// Initialize erc725.js with the permission data keys from LSP6 Key Manager
const erc725 = new ERC725(
  LSP6Schema,
  myUniversalProfileAddress,
  web3.currentProvider,
);
```

  </TabItem>
</Tabs>

## Encode Permissions

To create the permissions for a specific third-party address, [`erc725.js`](../../../tools/erc725js/getting-started.md) provides the [`encodePermissions`](../../../tools/erc725js/classes/ERC725#encodepermissions) function. As input, it will take an object of all permissions that will be set or updated for the address. In this example, we will create the permission to `SETDATA`, so that the _beneficiary address_ can edit the Universal Profile storage.

```js
// Create the permissions for the beneficiary address
const beneficiaryPermissions = erc725.encodePermissions({
  SETDATA: true,
});
```

:::success Permission Selection

The full list of available permissions can be found within the [Permissions API Documentation](../../../tools/erc725js/classes/ERC725.md#encodepermissions).

:::

Next, the permission has to be assigned to the _beneficiary address_. You can do so by adding the address and its permission into the `AddressPermissions:Permissions:<address>` data key. On top, the _beneficiary address_ must also be added inside the `AddressPermissions[]`array, meaning its array length must be incremented by`1`.

```js
// EOA address of the new controller
const myBeneficiaryAddress = '0xcafecafecafecafecafecafecafecafecafecafe';

// Retrieve the current controllers of the Universal Profile
const addressPermissionsArray = await erc725.getData('AddressPermissions[]');
const currentControllerAddresses = addressPermissionsArray.value;
const currentControllerLength = currentControllerAddresses.length;

// Encode the key-value pairs of the controller permission
const permissionData = erc725.encodeData([
  // the permission of the beneficiary address
  {
    keyName: 'AddressPermissions:Permissions:<address>',
    dynamicKeyParts: myBeneficiaryAddress,
    value: beneficiaryPermissions,
  },
  // The new incremented list of permissioned controllers addresses
  {
    keyName: 'AddressPermissions[]',
    value: [myBeneficiaryAddress],
    startingIndex: currentControllerLength,
    totalArrayLength: currentControllerLength + 1,
  },
]);
```

## Set the Permissions

The encoded data can now be passed within a transaction to update the controllers of the Universal Profile on the blockchain. This transaction must be signed by an existing Universal Profiles controller, as described in the [Introduction](#introduction). The key-value pair from the previous step can be passed into the [`setData(...)`](../../../contracts/contracts/ERC725/ERC725.md#setdata) function.

You will need the following parameters:

- The **ABI** of a UniversalProfile from [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts)
- The **address** of the Universal Profile that you want to set the controller on
- The **private key** of a existing controller with the [`ADDCONTROLLER`](../../../standards/universal-profile/lsp6-key-manager#permissions) permission.

<Tabs groupId="provider-lib">

  <TabItem value="ethersjs" label="ethers.js" default>

<!-- prettier-ignore-start -->

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// Private key to sign the transaction
const PRIVATE_KEY = '0x...';

const provider = new ethers.JsonRpcProvider(RPC_ENDPOINT);

// Existing UP controller
const controller = new ethers.Wallet(PRIVATE_KEY).connect(provider);

// Instantiate the Universal Profile
const myUniversalProfile = new ethers.Contract(
  myUniversalProfileAddress,
  UniversalProfileArtefact.abi,
);

// Execute the transaction
await myUniversalProfile
  .connect(controller)
  .setData(permissionData.keys, permissionData.values);
```

  </TabItem>
  <TabItem value="web3js" label="web3.js">

```javascript
import UniversalProfileArtefact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// Private key to sign the transaction
const PRIVATE_KEY = '0x...';

// Existing UP controller
const controller = web3.eth.accounts.wallet.add(PRIVATE_KEY);

// Instantiate the Universal Profile
const myUniversalProfile = new web3.eth.Contract(
  UniversalProfileArtefact.abi,
  myUniversalProfileAddress,
);

// Execute the transaction
await myUniversalProfile.methods.setData(
  permissionData.keys,
  permissionData.values,
).send({
  from: controller.address,
  gasLimit: 300_000,
});
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

:::info Account Interaction

To grant permissions from a dApp, you can connect a controller using `window.lukso` instead of the private key.

:::

## Retrieve Permissions

To check that the permissions have been correctly set, you can query the `AddressPermissions:Permissions:<address>` data key on the [ERC725Y](../../../standards/universal-profile/lsp0-erc725account.md#erc725y---generic-key-value-store) storage of the [Universal Profile](../../../standards/universal-profile/introduction.md).

```js
const updatedPermissions = await erc725.getData({
  keyName: 'AddressPermissions:Permissions:<address>',
  dynamicKeyParts: myBeneficiaryAddress,
});

console.log(
  `The beneficiary address ${myBeneficiaryAddress} has the following permissions:`,
  erc725.decodePermissions(updatedPermissions.value),
);
```

If the transaction was successful, the output should match the permissions set within the [Encode Permissions](#encode-permissions) section.

:::note Profile Interaction

This guide's default permission was `SETDATA`. To test this storage permission in praxis, you could try to [Edit the Universal Profile](../universal-profile/edit-profile.md) using the controller of the _beneficiary address_.

:::
