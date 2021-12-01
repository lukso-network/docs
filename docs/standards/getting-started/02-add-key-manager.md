---
sidebar_label: 'Add control with a Key Manager'
sidebar_position: 2.2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add control with a KeyManager

In order to interact with the KeyManager, you will need to download its ABI from our npm package

```javascript
import KeyManager from '@lukso/universalprofile-smart-contracts/build/contracts/KeyManager/KeyManager.json';
```

## Setting up a Key Manager

When you create a Universal Profile using the LSP Factory tools, a Key Manager is automatically deployed and ownership of your UP is automatically transfered to it.

You can then easily get you KeyManager's address by querying the `owner()` of the UP, and create an instance of the KM from this address.

```javascript
let keyManagerAddress = await myUP.methods.owner().call();
let myKeyManager = new web3.eth.Contract(KeyManager.abi, keyManagerAddress);
```

## Set permissions for other addresses

Below is a list of ERC725Y Permission Keys related to the Key Manager.
We will store these values in a file `constants.js`, and reuse them through the next code snippets.

```javascript title="constants.js"
const KEYS = {
  PERMISSIONS: '0x4b80742d0000000082ac0000', // AddressPermissions:Permissions:<address> --> bytes32
  ALLOWEDADDRESSES: '0x4b80742d00000000c6dd0000', // AddressPermissions:AllowedAddresses:<address> --> address[]
  ALLOWEDFUNCTIONS: '0x4b80742d000000008efe0000', // AddressPermissions:AllowedFunctions:<address> --> bytes4[]
  PERMISSIONS_ARRAY:
    '0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3', // keccak256('AddressPermissions[]')
};

const PERMISSIONS = {
  CHANGEOWNER:
    '0x0000000000000000000000000000000000000000000000000000000000000001',
  CHANGEPERMISSIONS:
    '0x0000000000000000000000000000000000000000000000000000000000000002',
  ADDPERMISSIONS:
    '0x0000000000000000000000000000000000000000000000000000000000000004',
  SETDATA: '0x0000000000000000000000000000000000000000000000000000000000000008',
  CALL: '0x0000000000000000000000000000000000000000000000000000000000000010',
  STATICCALL:
    '0x0000000000000000000000000000000000000000000000000000000000000020',
  DELEGATECALL:
    '0x0000000000000000000000000000000000000000000000000000000000000040',
  DEPLOY: '0x0000000000000000000000000000000000000000000000000000000000000080',
  TRANSFERVALUE:
    '0x0000000000000000000000000000000000000000000000000000000000000100',
  SIGN: '0x0000000000000000000000000000000000000000000000000000000000000200',
};

module.exports = {
  KEYS,
  PERMISSIONS,
};
```

The code snippets below show how to set permissions for **Bob** on a Universal Profile owned by `yourEOA`.
It assumes that the profile has been deployed with our [lsp-factory.js](https://docs.lukso.tech/tools/lsp-factoryjs/introduction/getting-started.md) tool.

<Tabs>
  <TabItem value="web3js" label="web3.js" default>

```javascript
const { KEYS, PERMISSIONS } = require('./constants');

const UniversalProfile = require('@lukso/universalprofile-smart-contracts/build/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/universalprofile-smart-contracts/build/artifacts/KeyManager.json');

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
const { KEYS, PERMISSIONS } = require('./constants');

const UniversalProfile = require('@lukso/universalprofile-smart-contracts/build/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/universalprofile-smart-contracts/build/artifacts/KeyManager.json');

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

## Interact with your UP via the Key Manager

### Set data in the key-value store

### Transfer LYX

### Interact with other smart contracts
