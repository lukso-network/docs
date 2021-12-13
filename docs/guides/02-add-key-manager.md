---
sidebar_label: 'Add control with a Key Manager'
sidebar_position: 2.2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set permissions for other addresses

Below is a list of ERC725Y Permission Keys related to the Key Manager.
We will store these values in a file `constants.js`, and reuse them through the next code snippets.

```javascript title="constants.js"
// keccak256('AddressPermissions[]')
const PERMISSIONS_ARRAY =
  '0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3';

// prettier-ignore
const ADDRESSES = {
  PERMISSIONS:      "0x4b80742d0000000082ac0000", // AddressPermissions:Permissions:<address> --> bytes32
  ALLOWEDADDRESSES: "0x4b80742d00000000c6dd0000", // AddressPermissions:AllowedAddresses:<address> --> address[]
  ALLOWEDFUNCTIONS: "0x4b80742d000000008efe0000", // AddressPermissions:AllowedFunctions:<address> --> bytes4[]
}

// prettier-ignore
const PERMISSIONS = {
  CHANGEOWNER:      "0x0000000000000000000000000000000000000000000000000000000000000001", // 0000 0000 0000 0001
  CHANGEPERMISSIONS:"0x0000000000000000000000000000000000000000000000000000000000000002", // .... .... .... 0010
  ADDPERMISSIONS:   "0x0000000000000000000000000000000000000000000000000000000000000004", // .... .... .... 0100
  SETDATA:          "0x0000000000000000000000000000000000000000000000000000000000000008", // .... .... .... 1000
  CALL:             "0x0000000000000000000000000000000000000000000000000000000000000010", // .... .... 0001 ....
  STATICCALL:       "0x0000000000000000000000000000000000000000000000000000000000000020", // .... .... 0010 ....
  DELEGATECALL:     "0x0000000000000000000000000000000000000000000000000000000000000040", // .... .... 0100 ....
  DEPLOY:           "0x0000000000000000000000000000000000000000000000000000000000000080", // .... .... 1000 ....
  TRANSFERVALUE:    "0x0000000000000000000000000000000000000000000000000000000000000100", // .... 0001 .... ....
  SIGN:             "0x0000000000000000000000000000000000000000000000000000000000000200", // .... 0010 .... ....
}

module.exports = {
  ADDRESSES,
  PERMISSIONS,
  PERMISSIONS_ARRAY,
};
```

The code snippets below show how to set permissions for **Bob** on a Universal Profile owned by `yourEOA`.
It assumes that the profile has been deployed with our [lsp-factory.js](https://docs.lukso.tech/tools/lsp-factoryjs/introduction/getting-started.md) tool.

<Tabs>
  <TabItem value="web3js" label="web3.js" default>

```javascript
// see file above constants.js
import { ADDRESSES, PERMISSIONS, PERMISSIONS_ARRAY } from './constants';

import UniversalProfile from '@lukso/universalprofile-smart-contracts/build/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/universalprofile-smart-contracts/build/artifacts/KeyManager.json';

const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  '<your-UniversalProfile-address>',
);
const keyManager = new web3.eth.Contract(
  KeyManager.abi,
  '<your-KeyManager-Address>',
);

let bobAddress = '0xcafecafecafecafecafecafecafecafecafecafe';
let bobPermissions = PERMISSIONS.SETDATA;

// give the permission SETDATA to Bob
async function setBobPermission() {
  let payload = await universalProfile.methods
    .setData(
      [
        KEYS.PERMISSIONS + bobAddress.substr(2), // allow Bob to setData on your UP
        KEYS.PERMISSIONS_ARRAY, // length of AddressPermissions[]
        KEYS.PERMISSIONS_ARRAY.slice(0, 34) +
          '00000000000000000000000000000001', // add Bob's address into the list of permissions
      ],
      [
        bobPermissions,
        3, // 3 because UP owner + Universal Receiver Delegate permission have already been set by lsp-factory
        bobAddress,
      ],
    )
    .encodeABI();

  keyManager
    .execute(payload)
    .send({ from: '<your-eoa-address>', gas: 300_000 });
}

setBobPermission();
```

  </TabItem>
  <TabItem value="etherjs" label="ether.js">

```javascript
// see file above constants.js
import { ADDRESSES, PERMISSIONS, PERMISSIONS_ARRAY } from './constants';

import UniversalProfile from '@lukso/universalprofile-smart-contracts/build/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/universalprofile-smart-contracts/build/artifacts/KeyManager.json';

const universalProfile = new ethers.Contract(
  '<your-UniversalProfile-address>',
  UniversalProfile.abi,
);
const keyManager = new ethers.Contract(
  '<your-KeyManager-Address>',
  KeyManager.abi,
);

let bobAddress = '0xcafecafecafecafecafecafecafecafecafecafe';
let bobPermissions = ethers.utils.hexZeroPad(PERMISSIONS.SETDATA, 32);

// give the permission SETDATA to Bob
async function setBobPermission() {
  let payload = universalProfile.interface.encodeFunctionData('setData', [
    [
      KEYS.PERMISSIONS + bobAddress.substr(2),
      KEYS.PERMISSIONS_ARRAY, // length of AddressPermissions[]
      KEYS.PERMISSIONS_ARRAY.slice(0, 34) + '00000000000000000000000000000001', // add Bob's address into the list of
    ],
    [
      bobPermissions,
      3, // 3 because UP owner + Universal Receiver Delegate permission have already been set by lsp-factory
      bobAddress,
    ],
  ]);

  await keyManager.connect(yourEOA).execute(payload); // yourEOA should be of type Signer
}

setBobPermission();
```

  </TabItem>
</Tabs>

## Interact via the Key Manager

To interact with a UP that has a Key Manager attached to it, all interactions should be sent to the Key Manager directly. You will need to encode the payload of the function you want to call on the UP, and pass it to the `keyManager.execute(_data)` function.

The Key Manager will allow / disallow execution after checking the permissions of the calling address.

The examples below are the same as the ones from the _Create a Universal Profile_ guide, adapted with the Key Manager.

### Set data in the key-value store

You will need the following permissions, based on the keys you are trying to set.

If setting permission keys:

- **required permission =** `ADDPERMISSIONS` if granting some permissions for a new address.
- **required permission =** `CHANGEPERMISSIONS` if changing the permissions of an address that already has some permissions set.

For any other keys:

- **required permission =** `SETDATA`

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const key = web3.utils.keccak256('MyFirstKey');
const value = web3.utils.stringToHex('Hello LUKSO!');

// 1. encode the setData payload
let abiPayload - await myUp.methods.setData([key], [value]).encodeABI();

// 2. execute via the KeyManager, passing the UP payload
await myKeyManager.execute(abiPayload, { from: '<address-of-up-owner>' })
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
const key = web3.utils.keccak256('MyFirstKey');
const value = web3.utils.stringToHex('Hello LUKSO!');

// 1. encode the setData payload
let abiPayload - await myUp.interface.encodeFunctionData("setData", [[key], [value]]);

// 2. execute via the KeyManager, passing the UP payload
await myKeyManager.connect(upOwner).execute(abiPayload)
```

  </TabItem>

</Tabs>

### Transfer LYX

You will need the permissions `CALL` + `TRANSFERVALUE` to transfer LYX from a UP.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const OPERATION_CALL = 0;
const recipient = '0xcafecafecafecafecafecafecafecafecafecafe';
const amount = web3.utils.toWei('3');
// payload executed at the target. Here nothing (just a plain LYX transfer)
const data = '0x';

// 1. encode the payload to transfer 3 LYX from the UP
let abiPayload = await myUp.methods
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
// payload executed at the target. Here nothing (just a plain LYX transfer)
const data = '0x';

// 1. encode the payload to transfer 3 LYX from the UP
let abiPayload = await myUp.interface.encodeFunctionData('execute', [
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

You will need the permission `CALL` to interact with an other contract from a UP.

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
