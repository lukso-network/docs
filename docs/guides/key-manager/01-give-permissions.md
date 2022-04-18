---
sidebar_label: 'Give permissions to addresses'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Give permissions to addresses

The Key Manager (KM) enables us to give permissions to other addresses, so they can edit data on our Universal Profile (UP) or interact with it on our behalf. In this section, we will see how to set up these permissions.

Below is a list of ERC725Y Permission Keys related to the Key Manager.
We will store these values in a file `constants.js` and reuse them through the following code snippets.

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

The code snippets below show how to set permissions for _Bob_ on a Universal Profile owned by `myEOA`.
It assumes that the profile has been deployed with our [lsp-factory.js](https://docs.lukso.tech/tools/lsp-factoryjs/introduction/getting-started.md) tool.

<Tabs>
  <TabItem value="web3js" label="web3.js" default>

```javascript
// see file above constants.js
const { ADDRESSES, PERMISSIONS, PERMISSIONS_ARRAY } = require('./constants');

const UniversalProfile = require('@lukso/lsp-smart-contracts/build/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/lsp-smart-contracts/build/artifacts/KeyManager.json');

const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  '<my-UniversalProfile-address>',
);
const keyManager = new web3.eth.Contract(
  KeyManager.abi,
  '<my-KeyManager-Address>',
);

let bobAddress = '0xcafecafecafecafecafecafecafecafecafecafe';
let bobPermissions = PERMISSIONS.SETDATA;

// give the permission SETDATA to Bob
async function setBobPermission() {
  let payload = await universalProfile.methods['setData(bytes32[],bytes[])'](
    [
      ADDRESSES.PERMISSIONS + bobAddress.substr(2), // allow Bob to setData on your UP
      PERMISSIONS_ARRAY, // length of AddressPermissions[]
      PERMISSIONS_ARRAY.slice(0, 34) + '00000000000000000000000000000001', // add Bob's address into the list of permissions
    ],
    [
      bobPermissions,
      3, // 3 because UP owner + Universal Receiver Delegate permission have already been set by lsp-factory
      bobAddress,
    ],
  ).encodeABI();

  keyManager
    .execute(payload)
    .send({ from: '<my-eoa-address>', gasLimit: 300_000 });
}

setBobPermission();
```

  </TabItem>
  <TabItem value="etherjs" label="ether.js">

```javascript
// see file above constants.js
const { ADDRESSES, PERMISSIONS, PERMISSIONS_ARRAY } = require('./constants');

const UniversalProfile = require('@lukso/lsp-smart-contracts/build/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/lsp-smart-contracts/build/artifacts/KeyManager.json');

const universalProfile = new ethers.Contract(
  '<my-UniversalProfile-address>',
  UniversalProfile.abi,
);
const keyManager = new ethers.Contract(
  '<my-KeyManager-Address>',
  KeyManager.abi,
);

let bobAddress = '0xcafecafecafecafecafecafecafecafecafecafe';
let bobPermissions = ethers.utils.hexZeroPad(PERMISSIONS.SETDATA, 32);

// give the permission SETDATA to Bob
async function setBobPermission() {
  let payload = universalProfile.interface.encodeFunctionData(
    'setData(bytes32[],bytes[])',
    [
      [
        ADDRESSES.PERMISSIONS + bobAddress.substr(2),
        PERMISSIONS_ARRAY, // length of AddressPermissions[]
        PERMISSIONS_ARRAY.slice(0, 34) + '00000000000000000000000000000001', // add Bob's address into the list of
      ],
      [
        bobPermissions,
        3, // 3 because UP owner + Universal Receiver Delegate permission have already been set by lsp-factory
        bobAddress,
      ],
    ],
  );

  await keyManager.connect(myEOA).execute(payload);
}

setBobPermission();
```

  </TabItem>
</Tabs>

:::tip

You can easily [`encodePermissions`](../../../../tools/erc725js/classes/ERC725#encodepermissions) and [`decodePermissions`](../../../../tools/erc725js/classes/ERC725#decodepermissions) using the [**erc725.js**](../../../../tools/erc725js/getting-started) library.

:::
