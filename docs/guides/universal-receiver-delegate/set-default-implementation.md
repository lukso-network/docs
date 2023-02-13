---
sidebar_label: 'Set the default implementation'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set the default implementation

:::note

Users deploying their Universal Profiles using the guides that utilize **[lsp-factory](../universal-profile/create-profile.md)** or the **[Browser Extension](../browser-extension/create-a-universal-profile.md)** can skip this guide, as this contract is already deployed and set for their profiles.

:::

This guide will teach you how to deploy and set the default implementation of the **[Universal Receiver Delegate](../../standards/smart-contracts/lsp1-universal-receiver-delegate-up.md)** (URD) used by the Universal Profile. This contract will register the addresses of the **[received assets](../../standards/universal-profile/lsp5-received-assets.md)** and **[vaults](../../standards/universal-profile/lsp10-received-vaults.md)** and will remove them on a balance equal to 0. This contract requires the [**SUPER_SETDATA Permission**](../../standards/universal-profile/lsp6-key-manager.md#super-permissions) to interact with the profile through the KeyManager.

![UniversalReceiverDelegate setting data keys on profile](/img/standards/lsp1delegate/token-transfer-4.jpg)

## Setup

Make sure you have the following dependencies installed before beginning this tutorial.

- You can use either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- You SHOULD install [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

## Step 1 - Imports, Constants and EOA

For starters we need to get the _ABIs_ for the contracts that we will use and the _bytecode_ for the `LSP1UniversalReceiverDelegateUP`.  
After that we need to store the address of our LSP9 Vault and our Universal Profile.  
Then we will initialize the EOA that we will further use.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Imports, Constants & EOA"
import LSP1UniversalReceiverDelegateUP from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateUP.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import {
  ERC725YDataKeys,
  PERMISSIONS,
} from '@lukso/lsp-smart-contracts/constants.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.l16.lukso.network');
const URD_DATA_KEY = ERC725YDataKeys.LSP0.LSP1UniversalReceiverDelegate;
const universalProfileAddress = '0x...';

// setup your EOA
const privateKey = '0x...';
const EOA = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Imports, Constants & EOA"
import LSP1UniversalReceiverDelegateUP from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateUP.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import {
  ERC725YDataKeys,
  PERMISSIONS,
} from '@lukso/lsp-smart-contracts/constants.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const URD_DATA_KEY = ERC725YDataKeys.LSP0.LSP1UniversalReceiverDelegate;
const universalProfileAddress = '0x...';

// setup your EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const EOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

## Step 2 - Deploy the default Universal Receiver Delegate contract

:::info

The **Universal Profile** and the **Vault** don't use the same implementation of the Universal Receiver Delegate.
:::

### Step 2.1 - Create a contract instance

At this step we will create an instance of the Universal profile URD that we will further be used to deploy one.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Contract instance of the Universal Profile URD"
// create an instance of the LSP1UniversalReceiverDelegateUP
let universalProfileURD = new web3.eth.Contract(
  LSP1UniversalReceiverDelegateUP.abi,
);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Contract instance of the Universal Profile URD"
// create a LSP1UniversalReceiverDelegateUP Contract Factory
let universalProfileURDFactory = new ethers.ContractFactory(
  LSP1UniversalReceiverDelegateUP.abi,
  LSP1UniversalReceiverDelegateUP.bytecode,
);
```

  </TabItem>

</Tabs>

### Step 2.2 - Send the contract deployment transaction

Send the deployment transaction and in a few seconds you will get a new deployed Unviersal Profile URD.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Send the transaction for deploying a new Universal Profile URD"
// deploy the Universal Receiver Delegate UP contract
await universalProfileURD
  .deploy({
    data: LSP1UniversalReceiverDelegateUP.bytecode,
  })
  .send({
    from: EOA.address,
    gas: 5_000_000,
    gasPrice: '1000000000',
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Send the transaction for deploying a new Universal Profile URD"
// deploy the Universal Receiver Delegate UP contract
const universalProfileURD = await universalProfileURDFactory
  .connect(EOA)
  .deploy();
```

  </TabItem>

</Tabs>

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Deploy a Universal Receiver Delegate for the Universal Profile"
const deployUniversalProfileURD = async () => {
  // create an instance of the LSP1UniversalReceiverDelegateUP
  let universalProfileURD = new web3.eth.Contract(
    LSP1UniversalReceiverDelegateUP.abi,
  );

  // deploy the Universal Receiver Delegate UP contract
  const universalProfileURDAddress = await universalProfileURD
    .deploy({
      data: LSP1UniversalReceiverDelegateUP.bytecode,
    })
    .send({
      from: EOA.address,
      gas: 5_000_000,
      gasPrice: '1000000000',
    })
    .on('receipt', (receipt) => {
      return receipt.contractAddress;
    });

  return universalProfileURDAddress;
};

// deploy a new Universal Profile URD and retrieve its address
const universalProfileURDAddress = await deployUniversalProfileURD();
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Deploy a Universal Receiver Delegate for the Universal Profile"
const deployUniversalProfileURD = async () => {
  // create a LSP1UniversalReceiverDelegateUP Contract Factory
  let universalProfileURDFactory = new ethers.ContractFactory(
    LSP1UniversalReceiverDelegateUP.abi,
    LSP1UniversalReceiverDelegateUP.bytecode,
  );

  // deploy the Universal Receiver Delegate UP contract
  const universalProfileURD = await universalProfileURDFactory
    .connect(EOA)
    .deploy();

  return universalProfileURD.target;
};

// deploy a new Universal Profile URD and retrieve its address
const universalProfileURDAddress = await deployUniversalProfileURD();
```

  </TabItem>

</Tabs>

## Step 3 - Set the address of the URD in the storage

After deploying the contract, we need to set its address under the **[LSP1-UniversalReceiverDelegate Data Key](../../standards/generic-standards/lsp1-universal-receiver.md#extension)** and grant it the **[SUPER_SETDATA](../../standards/universal-profile/lsp6-key-manager.md#super-permissions)** permission.

### Step 3.1 - Create the contract instances

Firstly we need to create instances for the following contracts:

- [**Universal Profile**](../../standards/universal-profile/lsp0-erc725account.md)
- [**Key Manager**](../../standards/universal-profile/lsp6-key-manager.md)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Contract instances for the Universal Profile & Key Manager"
// create an insatnce of the Universal Profile
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);
// get the owner of the Universal Profile
// in our case it should be the address of the Key Manager
const keyManagerAddress = await universalProfile.methods.owner().call();
// create an instance of the LSP6KeyManager
const keyManager = new web3.eth.Contract(LSP6KeyManager.abi, keyManagerAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Contract instances for the Universal Profile & Key Manager"
// create an insatnce of the Universal Profile
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
// get the owner of the Universal Profile
// in our case it should be the address of the Key Manager
const keyManagerAddress = await universalProfile.methods.owner().call();
// create an instance of the LSP6KeyManager
const keyManager = new ethers.Contract(keyManagerAddress, LSP6KeyManager.abi);
```

  </TabItem>

</Tabs>

### Step 3.2 - Encode new permissions Data Keys & Values

Generate _Data Keys & Vaules_ for [**adding a URD**](../../standards/generic-standards/lsp1-universal-receiver-delegate.md/#how-delegation-works) to the Universal Profile and for granting [**SUPER_SETDATA**](../../standards/universal-profile/lsp6-key-manager.md#super-permissions) permission to the **URD**.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Encode Data Keys & Values for updating the URD and its permissions"
const addressPermissionsOldArrayLengthHex = await myUP.methods[
  'getData(bytes32)'
](ERC725YDataKeys.LSP6['AddressPermissions[]'].length).call();

const addressPermissionsNewArrayLength =
  web3.utils.hexToNumber(addressPermissionsOldArrayLengthHex) + 1;

const addressPermissionsNewArrayLengthHex = web3.utils.padLeft(
  web3.utils.numberToHex(addressPermissionsNewArrayLength),
  64,
);

// bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
const newElementIndexInArrayHex = addressPermissionsOldArrayLengthHex.substring(
  34,
  66,
);

const dataKeys = [
  URD_DATA_KEY,
  ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
  ERC725YDataKeys.LSP6['AddressPermissions[]'].index +
    newElementIndexInArrayHex,
  ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
    universalProfileURDAddress.substring(2),
];
const dataValues = [
  universalProfileURDAddress,
  addressPermissionsNewArrayLengthHex,
  universalProfileURDAddress,
  PERMISSIONS.SUPER_SETDATA,
];
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Encode Data Keys & Values for updating the URD and its permissions"
const addressPermissionsOldArrayLengthHex = await myUP['getData(bytes32)'](
  ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
);

const addressPermissionsNewArrayLength =
  ethers.toNumber(addressPermissionsOldArrayLengthHex) + 1;

const addressPermissionsNewArrayLengthHex = ethers.toBeHex(
  addressPermissionsNewArrayLength2,
  32,
);

// bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
const newElementIndexInArrayHex = addressPermissionsOldArrayLengthHex.substring(
  34,
  66,
);

const dataKeys = [
  URD_DATA_KEY,
  ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
  ERC725YDataKeys.LSP6['AddressPermissions[]'].index +
    newElementIndexInArrayHex,
  ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
    universalProfileURDAddress.substring(2),
];
const dataValues = [
  universalProfileURDAddress,
  addressPermissionsNewArrayLengthHex,
  universalProfileURDAddress,
  PERMISSIONS.SUPER_SETDATA,
];
```

  </TabItem>

</Tabs>

### Step 3.3 - Encode `setData(..)` calldata

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Encode a calldata that will updated the URD and its permissions"
// encode setData Calldata on the Universal Profile
const setDataCalldata = await universalProfile.methods[
  'setData(bytes32[],bytes[])'
](dataKeys, dataValues).encodeABI();
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Encode a calldata that will updated the URD and its permissions"
// encode setData Calldata on the Universal Profile
const setDataCalldata = await universalProfile.interface.encodeFunctionData(
  'setData(bytes32[],bytes[])',
  [dataKeys, dataValues],
);
```

  </TabItem>

</Tabs>

### Step 3.4 - Send transaction via Key Manager

Lastly, we need to send the transaction that will update the URD and its permissions on the Universal profile via the Key Manager.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Execute the calldata on the Universal Profile via the Key Manager"
// execute the `setDataCalldata` on the Key Manager
await keyManager.methods['execute(bytes)'](setDataCalldata).send({
  from: myEOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Execute the calldata on the Universal Profile via the Key Manager"
// execute the `setDataCalldata` on the Key Manager
await keyManager.connect(myEOA)['execute(bytes)'](setDataCalldata);
```

  </TabItem>

</Tabs>

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Update the URD of the Universal Profile and its permissions"
const updateUniversalProfileURD = async (vaultURDAddress) => {
  // create an insatnce of the Universal Profile
  const universalProfile = new web3.eth.Contract(
    UniversalProfile.abi,
    universalProfileAddress,
  );
  // get the owner of the Universal Profile
  // in our case it should be the address of the Key Manager
  const keyManagerAddress = await universalProfile.methods.owner().call();
  // create an instance of the LSP6KeyManager
  const keyManager = new web3.eth.Contract(
    LSP6KeyManager.abi,
    keyManagerAddress,
  );

  const addressPermissionsOldArrayLengthHex = await myUP.methods[
    'getData(bytes32)'
  ](ERC725YDataKeys.LSP6['AddressPermissions[]'].length).call();

  const addressPermissionsNewArrayLength =
    web3.utils.hexToNumber(addressPermissionsOldArrayLengthHex) + 1;

  const addressPermissionsNewArrayLengthHex = web3.utils.padLeft(
    web3.utils.numberToHex(addressPermissionsNewArrayLength),
    64,
  );

  // bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
  const newElementIndexInArrayHex =
    addressPermissionsOldArrayLengthHex.substring(34, 66);

  const dataKeys = [
    URD_DATA_KEY,
    ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
    ERC725YDataKeys.LSP6['AddressPermissions[]'].index +
      newElementIndexInArrayHex,
    ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
      universalProfileURDAddress.substring(2),
  ];
  const dataValues = [
    universalProfileURDAddress,
    addressPermissionsNewArrayLengthHex,
    universalProfileURDAddress,
    PERMISSIONS.SUPER_SETDATA,
  ];

  // encode setData Calldata on the Universal Profile
  const setDataCalldata = await universalProfile.methods[
    'setData(bytes32[],bytes[])'
  ](dataKeys, dataValues).encodeABI();

  // execute the `setDataCalldata` on the Key Manager
  await keyManager.methods['execute(bytes)'](setDataCalldata).send({
    from: myEOA.address,
    gasLimit: 600_000,
  });
};

// update the URD of the Universal profile
await updateUniversalProfileURD(vaultURDAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Update the URD of the Universal Profile and its permissions"
const updateUniversalProfileURD = async (vaultURDAddress) => {
  // create an insatnce of the Universal Profile
  const universalProfile = new ethers.Contract(
    universalProfileAddress,
    UniversalProfile.abi,
  );
  // get the owner of the Universal Profile
  // in our case it should be the address of the Key Manager
  const keyManagerAddress = await universalProfile.methods.owner().call();
  // create an instance of the LSP6KeyManager
  const keyManager = new ethers.Contract(keyManagerAddress, LSP6KeyManager.abi);

  const addressPermissionsOldArrayLengthHex = await myUP['getData(bytes32)'](
    ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
  );

  const addressPermissionsNewArrayLength =
    ethers.toNumber(addressPermissionsOldArrayLengthHex) + 1;

  const addressPermissionsNewArrayLengthHex = ethers.toBeHex(
    addressPermissionsNewArrayLength2,
    32,
  );

  // bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
  const newElementIndexInArrayHex =
    addressPermissionsOldArrayLengthHex.substring(34, 66);

  const dataKeys = [
    URD_DATA_KEY,
    ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
    ERC725YDataKeys.LSP6['AddressPermissions[]'].index +
      newElementIndexInArrayHex,
    ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
      universalProfileURDAddress.substring(2),
  ];
  const dataValues = [
    universalProfileURDAddress,
    addressPermissionsNewArrayLengthHex,
    universalProfileURDAddress,
    PERMISSIONS.SUPER_SETDATA,
  ];

  // encode setData Calldata on the Universal Profile
  const setDataCalldata = await universalProfile.interface.encodeFunctionData(
    'setData(bytes32[],bytes[])',
    [dataKeys, dataValues],
  );

  // execute the `setDataCalldata` on the Key Manager
  await keyManager.connect(myEOA)['execute(bytes)'](setDataCalldata);
};

// update the URD of the Universal profile
await updateUniversalProfileURD(vaultURDAddress);
```

  </TabItem>

</Tabs>

## Final code - Deploy & Update

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Deploy a Universal Profile URD, update its permissions and add it to the Universal Profile"
import LSP1UniversalReceiverDelegateUP from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateUP.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import {
  ERC725YDataKeys,
  PERMISSIONS,
} from '@lukso/lsp-smart-contracts/constants.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.l16.lukso.network');
const URD_DATA_KEY = ERC725YDataKeys.LSP0.LSP1UniversalReceiverDelegate;
const universalProfileAddress = '0x...';

// setup your EOA
const privateKey = '0x...';
const EOA = web3.eth.accounts.wallet.add(privateKey);

const deployUniversalProfileURD = async () => {
  // create an instance of the LSP1UniversalReceiverDelegateUP
  let universalProfileURD = new web3.eth.Contract(
    LSP1UniversalReceiverDelegateUP.abi,
  );

  // deploy the Universal Receiver Delegate UP contract
  const universalProfileURDAddress = await universalProfileURD
    .deploy({
      data: LSP1UniversalReceiverDelegateUP.bytecode,
    })
    .send({
      from: EOA.address,
      gas: 5_000_000,
      gasPrice: '1000000000',
    })
    .on('receipt', (receipt) => {
      return receipt.contractAddress;
    });

  return universalProfileURDAddress;
};

const updateUniversalProfileURD = async (vaultURDAddress) => {
  // create an insatnce of the Universal Profile
  const universalProfile = new web3.eth.Contract(
    UniversalProfile.abi,
    universalProfileAddress,
  );
  // get the owner of the Universal Profile
  // in our case it should be the address of the Key Manager
  const keyManagerAddress = await universalProfile.methods.owner().call();
  // create an instance of the LSP6KeyManager
  const keyManager = new web3.eth.Contract(
    LSP6KeyManager.abi,
    keyManagerAddress,
  );

  const addressPermissionsOldArrayLengthHex = await myUP.methods[
    'getData(bytes32)'
  ](ERC725YDataKeys.LSP6['AddressPermissions[]'].length).call();

  const addressPermissionsNewArrayLength =
    web3.utils.hexToNumber(addressPermissionsOldArrayLengthHex) + 1;

  const addressPermissionsNewArrayLengthHex = web3.utils.padLeft(
    web3.utils.numberToHex(addressPermissionsNewArrayLength),
    64,
  );

  // bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
  const newElementIndexInArrayHex =
    addressPermissionsOldArrayLengthHex.substring(34, 66);

  const dataKeys = [
    URD_DATA_KEY,
    ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
    ERC725YDataKeys.LSP6['AddressPermissions[]'].index +
      newElementIndexInArrayHex,
    ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
      universalProfileURDAddress.substring(2),
  ];
  const dataValues = [
    universalProfileURDAddress,
    addressPermissionsNewArrayLengthHex,
    universalProfileURDAddress,
    PERMISSIONS.SUPER_SETDATA,
  ];

  // encode setData Calldata on the Universal Profile
  const setDataCalldata = await universalProfile.methods[
    'setData(bytes32[],bytes[])'
  ](dataKeys, dataValues).encodeABI();

  // execute the `setDataCalldata` on the Key Manager
  await keyManager.methods['execute(bytes)'](setDataCalldata).send({
    from: myEOA.address,
    gasLimit: 600_000,
  });
};

// deploy a new Universal Profile URD and retrieve its address
const universalProfileURDAddress = await deployUniversalProfileURD();

// update the URD of the Universal profile
await updateUniversalProfileURD(vaultURDAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Deploy a Universal Profile URD, update its permissions and add it to the Universal Profile"
import LSP1UniversalReceiverDelegateUP from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateUP.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import {
  ERC725YDataKeys,
  PERMISSIONS,
} from '@lukso/lsp-smart-contracts/constants.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const URD_DATA_KEY = ERC725YDataKeys.LSP0.LSP1UniversalReceiverDelegate;
const universalProfileAddress = '0x...';

// setup your EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const EOA = new ethers.Wallet(privateKey).connect(provider);

const deployUniversalProfileURD = async () => {
  // create a LSP1UniversalReceiverDelegateUP Contract Factory
  let universalProfileURDFactory = new ethers.ContractFactory(
    LSP1UniversalReceiverDelegateUP.abi,
    LSP1UniversalReceiverDelegateUP.bytecode,
  );

  // deploy the Universal Receiver Delegate UP contract
  const universalProfileURD = await universalProfileURDFactory
    .connect(EOA)
    .deploy();

  return universalProfileURD.target;
};

const updateUniversalProfileURD = async (vaultURDAddress) => {
  // create an insatnce of the Universal Profile
  const universalProfile = new ethers.Contract(
    universalProfileAddress,
    UniversalProfile.abi,
  );
  // get the owner of the Universal Profile
  // in our case it should be the address of the Key Manager
  const keyManagerAddress = await universalProfile.methods.owner().call();
  // create an instance of the LSP6KeyManager
  const keyManager = new ethers.Contract(keyManagerAddress, LSP6KeyManager.abi);

  const addressPermissionsOldArrayLengthHex = await myUP['getData(bytes32)'](
    ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
  );

  const addressPermissionsNewArrayLength =
    ethers.toNumber(addressPermissionsOldArrayLengthHex) + 1;

  const addressPermissionsNewArrayLengthHex = ethers.toBeHex(
    addressPermissionsNewArrayLength2,
    32,
  );

  // bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
  const newElementIndexInArrayHex =
    addressPermissionsOldArrayLengthHex.substring(34, 66);

  const dataKeys = [
    URD_DATA_KEY,
    ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
    ERC725YDataKeys.LSP6['AddressPermissions[]'].index +
      newElementIndexInArrayHex,
    ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
      universalProfileURDAddress.substring(2),
  ];
  const dataValues = [
    universalProfileURDAddress,
    addressPermissionsNewArrayLengthHex,
    universalProfileURDAddress,
    PERMISSIONS.SUPER_SETDATA,
  ];

  // encode setData Calldata on the Universal Profile
  const setDataCalldata = await universalProfile.interface.encodeFunctionData(
    'setData(bytes32[],bytes[])',
    [dataKeys, dataValues],
  );

  // execute the `setDataCalldata` on the Key Manager
  await keyManager.connect(myEOA)['execute(bytes)'](setDataCalldata);
};

// deploy a new Universal Profile URD and retrieve its address
const universalProfileURDAddress = await deployUniversalProfileURD();

// update the URD of the Universal profile
await updateUniversalProfileURD(vaultURDAddress);
```

  </TabItem>

</Tabs>
