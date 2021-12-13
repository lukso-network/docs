---
sidebar_label: 'Using your Universal Profile'
sidebar_position: 2.2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using your Universal Profile

To interact with a Universal Profile (UP), all interactions should go through the Key Manager (KM). The KM will allow / disallow execution after checking the permissions of the calling address.

To interact with your UP, you will need to encode the function call of your UP and pass the **payload** to the KM via `keyManager.execute(_data)`.

### Edit your `LSP3Profile` metadata

You can add details to your Universal Profile (or edit existing ones) by adding / updating the LSP3Profile metadata.

This take the form of a JSON file on stored on ipfs, where your Universal Profile refers to.

You can do so in 3 steps:

1. upload the JSON file to IPFS (via lsp-factory, or manually)
2. encode the JSON file (our `erc725.js` tool provide convenience for this)
3. set your new `LSP3Profile` metadata in your profile.

### Set data in the key-value store

<details>
    <summary>Permissions Required</summary>

The permission required differs, based on the keys you are trying to set.

If setting permission keys:

- **required permission =** `ADDPERMISSIONS` if granting some permissions for a new address.
- **required permission =** `CHANGEPERMISSIONS` if changing the permissions of an address that already has some permissions set.

For any other keys:

- **required permission =** `SETDATA`

</details>

Below is a basic example of how to set any key-value pair in the Universal Profile contract storage.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const key = web3.utils.keccak256('MyFirstKey');
const value = web3.utils.stringToHex('Hello LUKSO!');

// 1. encode the setData payload
const abiPayload - await myUp.methods.setData([key], [value]).encodeABI();

// 2. execute via the KeyManager, passing the UP payload
await myKeyManager.execute(abiPayload, { from: '<address-of-up-owner>' })
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
const key = ethers.utils.keccak256('MyFirstKey');
const value = ethers.utils.hexlify(ethers.utils.toUtf8Bytes('Hello LUKSO!'));

// 1. encode the setData payload
const abiPayload = await myUp.interface.encodeFunctionData('setData', [
  [key],
  [value],
]);

// 2. execute via the KeyManager, passing the UP payload
await myKeyManager.connect(upOwner).execute(abiPayload);
```

  </TabItem>

</Tabs>

### Transfer LYX

<details>
    <summary>Permissions Required</summary>

The caller needs the permissions `CALL` + `TRANSFERVALUE` to transfer LYX from a UP.

The `recipient` address should also be listed under the `AddressPermission:AllowedAddresses:<caller>` (or the `caller` should have all address whitelisted under this key).

</details>

Transferring LYX from a Universal Profile is as simple as making a standard `CALL` to any `address`, attaching some `_value` to the call. You can transfer LYX from a UP via the `.execute(...)` function in the UP contract.

The parameters of the function will be as follow:

- `_operation`: `0` (for `CALL`).
- `_to`: the `address` you want to send LYX to (Externally Owned Account or contract address).
- `_value`: the amount of LYX you want to transfer (in Wei)
- `_data`: empty payload (`0x`)

Since we are just making a simple LYX transfer, the fourth parameter `_data` will be empty.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const OPERATION_CALL = 0;
const recipient = '0xcafecafecafecafecafecafecafecafecafecafe';
const amount = web3.utils.toWei('3');
// payload executed at the target (here nothing, just a plain LYX transfer)
const data = '0x';

// 1. encode the payload to transfer 3 LYX from the UP
const abiPayload = await myUp.methods
  .execute(OPERATION_CALL, recipient, amount, data)
  .encodeABI();

// 2. execute via the KeyManager, passing the UP payload
await myKeyManager.execute(abiPayload, { from: '<address-of-up-owner>' });
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
const OPERATION_CALL = 0;
const recipient = '0xcafecafecafecafecafecafecafecafecafecafe';
const amount = web3.utils.toWei('3');
// payload executed at the target (here nothing, just a plain LYX transfer)
const data = '0x';

// 1. encode the payload to transfer 3 LYX from the UP
const abiPayload = await myUp.interface.encodeFunctionData('execute', [
  OPERATION_CALL,
  recipient,
  amount,
  data,
]);

// 2. execute via the KeyManager, passing the UP payload
await myKeyManager.connect(upOwner).execute(abiPayload);
```

  </TabItem>

</Tabs>

### Interact with other contracts

<details>
    <summary>Permissions Required</summary>

The caller needs the permissions `CALL` + `TRANSFERVALUE` to transfer LYX from a UP.

The `recipient` address should also be listed under the `AddressPermission:AllowedAddresses:<caller>` (or the `caller` should have all address whitelisted under this key).

</details>

We have seen in the previous example how to send LYX from your UP via the `.execute` function.

This function offers a fourth parameter: `_data`, that provides a lot of flexibility when interacting from your UP. The `_data` parameter is especially useful when the `_to` recipient is a smart contract.

To make your UP call a function on a specific contract deployed on the network, the parameters of the `.execute` function will be as follow:

- `_operation`: `0` (for `CALL`).
- `_to`: the `address` of the smart contract you want to interact with.
- `_value_`: empty (0).
- `_data`: the abi-encoded function name + arguments, to to be run at the `_to` contract address.
- Let's imagine a smart contract `targetContract` deployed on the network. You want your UP to call the function `myCoolFunction` on this contract. You will have to:

1. abi-encode the function call with the parameters you want to pass.
2. pass this payload as the fourth argument `_data` of the `.execute` function.

The code snippets below show you how to do this.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const OPERATION_CALL = 0;

// 1. encode the payload to be run at the targetContract
// assuming targetContract is a Contract instance
const targetPayload = targetContract.methods
  .myCoolfunction('dummyParameter')
  .encodeABI();

// 2. encode the payload to be run on the UP,
// passing the payload to be run at the targetContract as 4th parameter
let abiPayload = await myUp.methods
  .execute(OPERATION_CALL, targetContract.address, 0, targetPayload)
  .encodeABI();

// 3. execute via the KeyManager, passing the UP payload
await myKeyManager.execute(abiPayload, { from: '<address-of-up-owner>' });
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
const OPERATION_CALL = 0;

// 1. encode the payload to be run at the targetContract
// assuming targetContract is a Contract instance
const targetPayload = targetContract.interface.encodeFunctionData(
  'myCoolfunction',
  ['dummyParameter'],
);

// 2. encode the payload to be run on the UP,
// passing the payload to be run at the targetContract as 4th parameter
let abiPayload = myUp.interface.encodeFunctionData('execute', [
  OPERATION_CALL,
  targetContract.address,
  0,
  targetPayload,
]);

// 3. execute via the KeyManager, passing the UP payload
await myKeyManager.connect(upOwner).execute(abiPayload);
```

  </TabItem>

</Tabs>

:::info

See the [Solidity docs](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html#function-selector-and-argument-encoding) for more infos on function + arguments encoding.

:::
