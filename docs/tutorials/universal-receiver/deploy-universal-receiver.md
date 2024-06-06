---
sidebar_label: 'Create & Deploy Universal Receiver'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Universal Receiver

The [Universal Receiver](../../../standards/generic-standards/lsp1-universal-receiver.md) is a powerful tool that enables any smart contract or wallet to identify incoming transactions and automatically initiate customized responses.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/aE00rHVAWbw?si=XAcF8Kbn549E7RWw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

### Advantages

- **Flexibility**: The Universal Receiver offers flexibility in assigning customized responses to external contracts.
- **Customization**: These responses can be assigned to external contracts, known as [Universal Receiver Delegate](../../../standards/generic-standards/lsp1-universal-receiver-delegate.md), which can have their own unique mechanisms for various purposes.

A Universal Profile contract can host multiple Universal Receiver Delegate (URD) smart contracts. This enables an active digital presence on the blockchain, where interactions are managed and responded to based on your own predefined rules.

To delegate incoming Universal Receiver notifications to a specific smart contract, simply set a [ERC725Y](../../../standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store) data key on your Universal Profile. This will instruct your profile to forward notifications to the designated contract.

The _data key_ field uses the following formats to store URD contracts:

### Singleton Format

```json
{
  "name": "LSP1UniversalReceiverDelegate",
  "key": "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
  "keyType": "Singleton",
  "valueType": "address",
  "valueContent": "Address"
}
```

:::warning
Setting a new default Universal Receiver Delegate (URD) contract will replace the default delegate contract, which can be found [here](../../../contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.md).
:::

### Mapping Format

This format allows Universal Profiles to host multiple Universal Receiver Delegate contracts:

```json
{
  "name": "LSP1UniversalReceiverDelegate:<bytes32>",
  "key": "0x0cfc51aec37c55a4d0b10000<bytes32>",
  "keyType": "Mapping",
  "valueType": "address",
  "valueContent": "Address"
}
```

This way, different Universal Receiver Delegate contracts can be assigned for certain type IDs (bytes32) that are sent along the Universal Receiver call from a notifying smart contract.

## Getting Started

This guide will teach you how to deploy and set the default implementation of the **[Universal Receiver Delegate](../../../contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.md)** (URD) used by the Universal Profile. This contract will register the addresses of the **[received assets](../../../standards/universal-profile/lsp5-received-assets.md)** and **[vaults](../../../standards/universal-profile/lsp10-received-vaults.md)** and will remove them on a balance equal to 0. This contract requires the [**`SUPER_SETDATA` Permission**](../../../standards/universal-profile/lsp6-key-manager.md#super-permissions) to interact with the profile through the KeyManager.

![UniversalReceiverDelegate setting data keys on profile](/img/standards/lsp1delegate/token-transfer-4.jpg)

## Setup

:::note

Users deploying their Universal Profiles using the guides that utilize **[lsp-factory](../universal-profile/create-profile.md)** or the **[Browser Extension](/install-up-browser-extension)** can skip this guide, as this contract is already deployed and set for their profiles.

:::

Make sure you have the following dependencies installed before beginning this tutorial:

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts @erc725/erc725.js
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts @erc725/erc725.js
```

  </TabItem>

</Tabs>

## Step 1 - Imports, constants and EOA

We need to;

1. Get the _ABIs_ of the contracts that we will use and the _bytecode_ of the `LSP1UniversalReceiverDelegateUP`.
2. Store the address of our Universal Profile.
3. Initialize the EOA that we will further use.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Imports, Constants & EOA"
import LSP1UniversalReceiverDelegateUP from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateUP.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import {
  ERC725YDataKeys,
  PERMISSIONS,
} from '@lukso/lsp-smart-contracts/constants.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.testnet.lukso.network');
const URD_DATA_KEY = ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;
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
import {
  ERC725YDataKeys,
  PERMISSIONS,
} from '@lukso/lsp-smart-contracts/constants.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const URD_DATA_KEY = ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;
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

### Create a contract instance

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

### Send the contract deployment transaction

Send the deployment transaction to get a newly deployed URD.

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
  const universalProfileURD = new web3.eth.Contract(
    LSP1UniversalReceiverDelegateUP.abi,
  );
  let universalProfileURDAddress;

  // deploy the Universal Receiver Delegate UP contract
  await universalProfileURD
    .deploy({
      data: LSP1UniversalReceiverDelegateUP.bytecode,
    })
    .send({
      from: EOA.address,
      gas: 5_000_000,
      gasPrice: '1000000000',
    })
    .on('receipt', (receipt) => {
      universalProfileURDAddress = receipt.contractAddress;
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

  return testnetuniversalProfileURD.address;
};

// deploy a new Universal Profile URD and retrieve its address
const universalProfileURDAddress = await deployUniversalProfileURD();
```

  </TabItem>

</Tabs>

## Step 3 - Set the address of the URD in the storage

After deploying the contract, we need to set its address under the **[LSP1-UniversalReceiverDelegate Data Key](../../../standards/generic-standards/lsp1-universal-receiver.md#extension)** and grant it the **[SUPER_SETDATA](../../../standards/universal-profile/lsp6-key-manager.md#super-permissions)** permission.

### Create an UP contract instance

Firstly we need to create an instance for the [**Universal Profile**](../../../standards/universal-profile/lsp0-erc725account.md) contract.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Contract instance for the Universal Profile"
// create an instance of the Universal Profile
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Contract instance for the Universal Profile"
// create an instance of the Universal Profile
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
```

  </TabItem>

</Tabs>

### Register URD on the UP + set the URD permissions

Generate _Data Keys & Values_ for [**adding a URD**](../../../standards/generic-standards/lsp1-universal-receiver-delegate.md#how-delegation-works) to the Universal Profile and for granting [**SUPER_SETDATA**](../../../standards/universal-profile/lsp6-key-manager.md#super-permissions) permission to the **URD**.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Encode Data Keys & Values for updating the URD and its permissions"
import { ERC725 } from '@erc725/erc725.js';

const addressPermissionsOldArrayLengthHex = await universalProfile.methods[
  'getData(bytes32)'
](ERC725YDataKeys.LSP6['AddressPermissions[]'].length).call();

const addressPermissionsNewArrayLength =
  web3.utils.hexToNumber(addressPermissionsOldArrayLengthHex) + 1;

const addressPermissionsNewArrayLengthHex = web3.utils.padLeft(
  web3.utils.numberToHex(addressPermissionsNewArrayLength),
  32,
);

// create bytes32 permission value for the LSP1 Delegate
const lsp1DelegatePermissions = ERC725.encodePermissions({
  SUPER_SETDATA: true,
  REENTRANCY: true,
});

// bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
const newElementIndexInArrayHex =
  addressPermissionsOldArrayLengthHex.substring(2);

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
  lsp1DelegatePermissions,
];
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Encode Data Keys & Values for updating the URD and its permissions"
import { ERC725 } from '@erc725/erc725.js';

const addressPermissionsOldArrayLengthHex = await universalProfile[
  'getData(bytes32)'
](ERC725YDataKeys.LSP6['AddressPermissions[]'].length);

const addressPermissionsNewArrayLength =
  ethers.toBigInt(addressPermissionsOldArrayLengthHex) + ethers.toBigInt(1);

const addressPermissionsNewArrayLengthHex =
  '0x' + addressPermissionsNewArrayLength.toString(16).padStart(32, '0');

// create bytes32 permission value for the LSP1 Delegate
const lsp1DelegatePermissions = ERC725.encodePermissions({
  SUPER_SETDATA: true,
  REENTRANCY: true,
});

// bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
const newElementIndexInArrayHex =
  addressPermissionsOldArrayLengthHex.substring(2);

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
  lsp1DelegatePermissions,
];
```

  </TabItem>

</Tabs>

### Set the URD and its permissions

Lastly, we need to send the transaction that will update the URD and its permissions on the Universal Profile.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Update the data on the Universal Profile"
// update the Universal Profile data
await universalProfile.methods.setDataBatch(dataKeys, dataValues).send({
  from: EOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Update the data on the Universal Profile"
// update the Universal Profile data
await universalProfile.connect(EOA).setDataBatch(dataKeys, dataValues);
```

  </TabItem>

</Tabs>

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Update the URD of the Universal Profile and its permissions"
import { ERC725 } from '@erc725/erc725.js';

const updateUniversalProfileURD = async (universalProfileURDAddress) => {
  // create an instance of the Universal Profile
  const universalProfile = new web3.eth.Contract(
    UniversalProfile.abi,
    universalProfileAddress,
  );

  const addressPermissionsOldArrayLengthHex = await universalProfile.methods[
    'getData(bytes32)'
  ](ERC725YDataKeys.LSP6['AddressPermissions[]'].length).call();

  const addressPermissionsNewArrayLength =
    web3.utils.hexToNumber(addressPermissionsOldArrayLengthHex) + 1;

  const addressPermissionsNewArrayLengthHex = web3.utils.padLeft(
    web3.utils.numberToHex(addressPermissionsNewArrayLength),
    32,
  );

  // create bytes32 permission value for the LSP1 Delegate
  const lsp1DelegatePermissions = ERC725.encodePermissions({
    SUPER_SETDATA: true,
    REENTRANCY: true,
  });

  // bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
  const newElementIndexInArrayHex =
    addressPermissionsOldArrayLengthHex.substring(2);

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
    lsp1DelegatePermissions,
  ];

  // update the Universal Profile data
  await universalProfile.methods.setDataBatch(dataKeys, dataValues).send({
    from: EOA.address,
    gasLimit: 600_000,
  });
};

// update the URD of the Universal profile
await updateUniversalProfileURD(universalProfileURDAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Update the URD of the Universal Profile and its permissions"
import { ERC725 } from '@erc725/erc725.js';

const updateUniversalProfileURD = async (universalProfileURDAddress) => {
  // create an instance of the Universal Profile
  const universalProfile = new ethers.Contract(
    universalProfileAddress,
    UniversalProfile.abi,
  );

  const addressPermissionsOldArrayLengthHex = await universalProfile[
    'getData(bytes32)'
  ](ERC725YDataKeys.LSP6['AddressPermissions[]'].length);

  const addressPermissionsNewArrayLength =
    ethers.toBigInt(addressPermissionsOldArrayLengthHex) + ethers.toBigInt(1);

  const addressPermissionsNewArrayLengthHex =
    '0x' + addressPermissionsNewArrayLength.toString(16).padStart(32, '0');

  // create bytes32 permission value for the LSP1 Delegate
  const lsp1DelegatePermissions = ERC725.encodePermissions({
    SUPER_SETDATA: true,
    REENTRANCY: true,
  });

  // bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
  const newElementIndexInArrayHex =
    addressPermissionsOldArrayLengthHex.substring(2);

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
    lsp1DelegatePermissions,
  ];

  // update the Universal Profile data
  await universalProfile.connect(EOA).setDataBatch(dataKeys, dataValues);
};

// update the URD of the Universal profile
await updateUniversalProfileURD(universalProfileURDAddress);
```

  </TabItem>

</Tabs>

## Final code - Deploy & Update

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Deploy a Universal Profile URD, update its permissions and add it to the Universal Profile"
import LSP1UniversalReceiverDelegateUP from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateUP.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import {
  ERC725YDataKeys,
  PERMISSIONS,
} from '@lukso/lsp-smart-contracts/constants.js';
import Web3 from 'web3';
import { ERC725 } from '@erc725/erc725.js';

// constants
const web3 = new Web3('https://rpc.testnet.lukso.network');
const URD_DATA_KEY = ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;
const universalProfileAddress = '0x...';

// setup your EOA
const privateKey = '0x...';
const EOA = web3.eth.accounts.wallet.add(privateKey);

const deployUniversalProfileURD = async () => {
  // create an instance of the LSP1UniversalReceiverDelegateUP
  const universalProfileURD = new web3.eth.Contract(
    LSP1UniversalReceiverDelegateUP.abi,
  );
  let universalProfileURDAddress;

  // deploy the Universal Receiver Delegate UP contract
  await universalProfileURD
    .deploy({
      data: LSP1UniversalReceiverDelegateUP.bytecode,
    })
    .send({
      from: EOA.address,
      gas: 5_000_000,
      gasPrice: '1000000000',
    })
    .on('receipt', (receipt) => {
      universalProfileURDAddress = receipt.contractAddress;
    });

  return universalProfileURDAddress;
};

const updateUniversalProfileURD = async (universalProfileURDAddress) => {
  // create an instance of the Universal Profile
  const universalProfile = new web3.eth.Contract(
    UniversalProfile.abi,
    universalProfileAddress,
  );

  const addressPermissionsOldArrayLengthHex = await universalProfile.methods[
    'getData(bytes32)'
  ](ERC725YDataKeys.LSP6['AddressPermissions[]'].length).call();

  const addressPermissionsNewArrayLength =
    web3.utils.hexToNumber(addressPermissionsOldArrayLengthHex) + 1;

  const addressPermissionsNewArrayLengthHex = web3.utils.padLeft(
    web3.utils.numberToHex(addressPermissionsNewArrayLength),
    32,
  );

  // create bytes32 permission value for the LSP1 Delegate
  const lsp1DelegatePermissions = ERC725.encodePermissions({
    SUPER_SETDATA: true,
    REENTRANCY: true,
  });

  // bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
  const newElementIndexInArrayHex =
    addressPermissionsOldArrayLengthHex.substring(2);

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
    lsp1DelegatePermissions,
  ];

  // update the Universal Profile data
  await universalProfile.methods.setDataBatch(dataKeys, dataValues).send({
    from: EOA.address,
    gasLimit: 600_000,
  });
};

// deploy a new Universal Profile URD and retrieve its address
const universalProfileURDAddress = await deployUniversalProfileURD();

// update the URD of the Universal profile
await updateUniversalProfileURD(universalProfileURDAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Deploy a Universal Profile URD, update its permissions and add it to the Universal Profile"
import LSP1UniversalReceiverDelegateUP from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateUP.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import {
  ERC725YDataKeys,
  PERMISSIONS,
} from '@lukso/lsp-smart-contracts/constants.js';
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';

// constants
const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const URD_DATA_KEY = ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;
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

  return testnetuniversalProfileURD.address;
};

const updateUniversalProfileURD = async (universalProfileURDAddress) => {
  // create an instance of the Universal Profile
  const universalProfile = new ethers.Contract(
    universalProfileAddress,
    UniversalProfile.abi,
  );

  const addressPermissionsOldArrayLengthHex = await universalProfile[
    'getData(bytes32)'
  ](ERC725YDataKeys.LSP6['AddressPermissions[]'].length);

  const addressPermissionsNewArrayLength =
    ethers.toBigInt(addressPermissionsOldArrayLengthHex) + ethers.toBigInt(1);

  const addressPermissionsNewArrayLengthHex =
    '0x' + addressPermissionsNewArrayLength.toString(16).padStart(64, '0');

  // create bytes32 permission value for the LSP1 Delegate
  const lsp1DelegatePermissions = ERC725.encodePermissions({
    SUPER_SETDATA: true,
    REENTRANCY: true,
  });

  // bytes16 index `addressPermissionsOldArrayLengthHex` will serve as index
  const newElementIndexInArrayHex =
    addressPermissionsOldArrayLengthHex.substring(2);

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
    lsp1DelegatePermissions,
  ];

  // update the Universal Profile data
  await universalProfile.connect(EOA).setDataBatch(dataKeys, dataValues);
};

// deploy a new Universal Profile URD and retrieve its address
const universalProfileURDAddress = await deployUniversalProfileURD();

// update the URD of the Universal profile
await updateUniversalProfileURD(universalProfileURDAddress);
```

  </TabItem>

</Tabs>
