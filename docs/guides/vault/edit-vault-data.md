---
sidebar_label: 'Edit Vault Data'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Edit Vault Data

This guide will teach you how to set data to an **[LSP9Vault](../../standards/smart-contracts/lsp9-vault.md)** contract through a UniversalProfile owned by an LSP6KeyManager. Any data can be attached to the vault, and since it supports the **[LSP1-UniversalReceiver](../../standards/generic-standards/lsp1-universal-receiver.md)** standard, we will set the [**Universal Receiver Delegate**](../../standards/smart-contracts/lsp1-universal-receiver-delegate-vault.md) address inside the storage.

## Setting Data (Universal Receiver Delegate)

The default implementation of the **Universal Receiver Delegate** of the Vault that we will deploy will register the assets received to the storage and and will remove them when their balance equals 0.

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

For starters we need to get the _ABIs_ for the contracts that we will use and the _bytecode_ for the `LSP1UniversalReceiverDelegateVault`.  
After that we need to store the address of our LSP9 Vault and our Universal Profile.  
Then we will initialize the EOA that we will further use.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Imports, Constants & EOA"
import LSP1UniversalReceiverDelegateVault from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateVault.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.l16.lukso.network');
const vaultAddress = '0x...';
const universalProfileAddress = '0x...';

// setup your EOA
const privateKey = '0x...';
const myEOA = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Imports, Constants & EOA"
import LSP1UniversalReceiverDelegateVault from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateVault.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const vaultAddress = '0x...';
const universalProfileAddress = '0x...';

// setup your EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

## Step 2 - Deploying Universal Receiver Delegate (URD)

:::info

The **Universal Profile** and the **Vault** don't use the same implementation of the Universal Receiver Delegate.
:::

### Step 2.1 - Create a contract instance

At this step we will create an instance of the Vault URD that we will further be used to deploy one.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Contract instance of the LSP9 Vault URD"
// create an instance of the LSP1UniversalReceiverDelegateVault
const vaultURD = new web3.eth.Contract(LSP1UniversalReceiverDelegateVault.abi);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Contract instance of the LSP9 Vault URD"
// create a LSP1UniversalReceiverDelegateVault Contract Factory
const vaultURDFactory = new ethers.ContractFactory(
  LSP1UniversalReceiverDelegateVault.abi,
  LSP1UniversalReceiverDelegateVault.bytecode,
);
```

  </TabItem>

</Tabs>

### Step 2.2 - Send the contract deployment transaction

Send the deployment transaction and in a few seconds you will get a new deployed Vault URD.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Send the transaction for deploying a new LSP9 Vault URD"
// deploy the Universal Receiver Delegate Vault contract
await vaultURD
  .deploy({
    data: LSP1UniversalReceiverDelegateVault.bytecode,
  })
  .send({
    from: myEOA.address,
    gas: 5_000_000,
    gasPrice: '1000000000',
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Send the transaction for deploying a new LSP9 Vault URD"
// deploy the Universal Receiver Delegate Vault contract
const vaultURD = await vaultURDFactory.connect(myEOA).deploy();
```

  </TabItem>

</Tabs>

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Deploy a new LSP9 Vault Universal Receive Delegate"
const deployVaultURD = async () => {
  // create an instance of the LSP1UniversalReceiverDelegateVault
  const vaultURD = new web3.eth.Contract(
    LSP1UniversalReceiverDelegateVault.abi,
  );

  // deploy the Universal Receiver Delegate Vault contract
  const vaultURDAddress = await vaultURD
    .deploy({
      data: LSP1UniversalReceiverDelegateVault.bytecode,
    })
    .send({
      from: myEOA.address,
      gas: 5_000_000,
      gasPrice: '1000000000',
    })
    .on('receipt', (receipt) => {
      return receipt.contractAddress;
    });

  return vaultURDAddress;
};

// deploy a new Vault URD and retrieve its address
const vaultURDAddress = await deployVaultURD();
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Deploy a new LSP9 Vault Universal Receive Delegate"
const deployVaultURD = async () => {
  // create a LSP1UniversalReceiverDelegateVault Contract Factory
  const vaultURDFactory = new ethers.ContractFactory(
    LSP1UniversalReceiverDelegateVault.abi,
    LSP1UniversalReceiverDelegateVault.bytecode,
  );

  // deploy the Universal Receiver Delegate Vault contract
  const vaultURD = await vaultURDFactory.connect(myEOA).deploy();

  return vaultURD.target;
};

// deploy a new Vault URD and retrieve its address
const vaultURDAddress = await deployVaultURD();
```

  </TabItem>

</Tabs>

## Step 3 - Setting the URD address in the storage

The Vault's owner could be an **EOA**, or any **other smart contract**. In our case, we will suppose that the Vault's owner is a [Universal Profile](../../standards/universal-profile/introduction.md) that is controlled by a Key Manager.

### Step 3.1 - Create the contract instances

Firstly we need to create instances for the following contracts:

- [**Vault**](../../standards/universal-profile/lsp9-vault.md)
- [**Universal Profile**](../../standards/universal-profile/lsp0-erc725account.md)
- [**Key Manager**](../../standards/universal-profile/lsp6-key-manager.md)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Contract instances for the Universal Profile, Key Manager and Vault"
// create an instance of the LSP9Vault
const vault = new web3.eth.Contract(LSP9Vault.abi, vaultAddress);
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

```typescript title="Contract instances for the Universal Profile, Key Manager and Vault"
// create an instance of the LSP9Vault
const vault = new ethers.Contract(vaultAddress, LSP9Vault.abi);
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

### Step 3.2 - Encode `setData(..)` calldata

Secondly, we need to encode a calldata that will update the address of the Vault URD.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Calldata for updating the LSP9 Vault URD"
// encode setData Calldata on the Vault
const setDataCalldata = await vault.methods['setData(bytes32,bytes)'](
  ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate,
  vaultURDAddress,
).encodeABI(); // Any other information can be stored here
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Calldata for updating the LSP9 Vault URD"
// encode setData Calldata on the Vault
const setDataCalldata = vault.interface.encodeFunctionData(
  'setData(bytes32,bytes)',
  [ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate, vaultURDAddress],
); // Any other information can be stored here
```

  </TabItem>

</Tabs>

### Step 3.3 - Encode `execute(..)` calldata

Thirdly, we need to encode another calldata that will trigger the [Vault URD data updating calldata](#step-32---encode-setdata-calldata).

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Calldata for executing a the setData(..) calldata through the Universal Profile"
// encode execute Calldata on the UP
const executeCalldata = await universalProfile.methods[
  'execute(uint256,address,uint256,bytes)'
](
  0, // OPERATION CALL
  vaultAddress,
  0, // value to transfer
  setDataCalldata,
).encodeABI();
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Calldata for executing a the setData(..) calldata through the Universal Profile"
// encode execute Calldata on the UP
const executeCalldata = universalProfile.interface.encodeFunctionData(
  'execute(uint256,address,uint256,bytes)',
  [
    0, // OPERATION CALL
    vaultAddress,
    0, // value to transfer
    setDataCalldata,
  ],
);
```

  </TabItem>

</Tabs>

### Step 3.4 - Send transaction via Key Manager

Lastly, we need to send the transaction that will send the [`execute(..)` calldata](#step-33---encode-execute-calldata) to the Universal profile via the Key Manager.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Execute the calldata on the Universal Profile via the Key Manager"
// execute the `executeCalldata` on the Key Manager
await keyManager.methods['execute(bytes)'](executeCalldata).send({
  from: myEOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Execute the calldata on the Universal Profile via the Key Manager"
// execute the `executeCalldata` on the Key Manager
await keyManager.connect(myEOA)['execute(bytes)'](executeCalldata);
```

  </TabItem>

</Tabs>

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Update Vault's URD to the one newly deployed"
const updateVaultURD = async (vaultURDAddress) => {
  // create an instance of the LSP9Vault
  const vault = new web3.eth.Contract(LSP9Vault.abi, vaultAddress);
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

  // encode setData Calldata on the Vault
  const setDataCalldata = await vault.methods['setData(bytes32,bytes)'](
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate,
    vaultURDAddress,
  ).encodeABI(); // Any other information can be stored here

  // encode execute Calldata on the UP
  const executeCalldata = await universalProfile.methods[
    'execute(uint256,address,uint256,bytes)'
  ](
    0, // OPERATION CALL
    vaultAddress,
    0, // value to transfer
    setDataCalldata,
  ).encodeABI();

  // execute the `sexecuteCalldata` on the KM
  await keyManager.methods['execute(bytes)'](executeCalldata).send({
    from: myEOA.address,
    gasLimit: 600_000,
  });
};

// update the curent Vault's URD
await updateVaultURD(vaultURDAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Update Vault's URD to the one newly deployed"
const updateVaultURD = async (vaultURDAddress) => {
  // create an instance of the LSP9Vault
  const vault = new ethers.Contract(vaultAddress, LSP9Vault.abi);
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

  // encode setData Calldata on the Vault
  const setDataCalldata = vault.interface.encodeFunctionData(
    'setData(bytes32,bytes)',
    [ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate, vaultURDAddress],
  ); // Any other information can be stored here

  // encode execute Calldata on the UP
  const executeCalldata = universalProfile.interface.encodeFunctionData(
    'execute(uint256,address,uint256,bytes)',
    [
      0, // OPERATION CALL
      vaultAddress,
      0, // value to transfer
      setDataCalldata,
    ],
  );

  // execute the `sexecuteCalldata` on the KM
  await keyManager.connect(myEOA)['execute(bytes)'](executeCalldata);
};

// update the curent Vault's URD
await updateVaultURD(vaultURDAddress);
```

  </TabItem>

</Tabs>

## Final code - Deploy & Update

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Deploy new Vault URD and update Vault's URD"
import LSP1UniversalReceiverDelegateVault from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateVault.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');
const vaultAddress = '0x...';
const universalProfileAddress = '0x...';

// setup your EOA
const privateKey = '0x...';
const myEOA = web3.eth.accounts.wallet.add(privateKey);

const deployVaultURD = async () => {
  // create an instance of the LSP1UniversalReceiverDelegateVault
  const vaultURD = new web3.eth.Contract(
    LSP1UniversalReceiverDelegateVault.abi,
  );

  // deploy the Universal Receiver Delegate Vault contract
  const vaultURDAddress = await vaultURD
    .deploy({
      data: LSP1UniversalReceiverDelegateVault.bytecode,
    })
    .send({
      from: myEOA.address,
      gas: 5_000_000,
      gasPrice: '1000000000',
    })
    .on('receipt', (receipt) => {
      return receipt.contractAddress;
    });

  return vaultURDAddress;
};

const updateVaultURD = async (vaultURDAddress) => {
  // create an instance of the LSP9Vault
  const vault = new web3.eth.Contract(LSP9Vault.abi, vaultAddress);
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

  // encode setData Calldata on the Vault
  const setDataCalldata = await vault.methods['setData(bytes32,bytes)'](
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate,
    vaultURDAddress,
  ).encodeABI(); // Any other information can be stored here

  // encode execute Calldata on the UP
  const executeCalldata = await universalProfile.methods[
    'execute(uint256,address,uint256,bytes)'
  ](
    0, // OPERATION CALL
    vaultAddress,
    0, // value to transfer
    setDataCalldata,
  ).encodeABI();

  // execute the `sexecuteCalldata` on the KM
  await keyManager.methods['execute(bytes)'](executeCalldata).send({
    from: myEOA.address,
    gasLimit: 600_000,
  });
};

// deploy a new Vault URD and retrieve its address
const vaultURDAddress = await deployVaultURD();
// update the curent Vault's URD
await updateVaultURD(vaultURDAddress);
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Deploy new Vault URD and update Vault's URD"
import LSP1UniversalReceiverDelegateVault from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateVault.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const vaultAddress = '0x...';
const universalProfileAddress = '0x...';

// setup your EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const myEOA = new ethers.Wallet(privateKey).connect(provider);

const deployVaultURD = async () => {
  // create a LSP1UniversalReceiverDelegateVault Contract Factory
  const vaultURDFactory = new ethers.ContractFactory(
    LSP1UniversalReceiverDelegateVault.abi,
    LSP1UniversalReceiverDelegateVault.bytecode,
  );

  // deploy the Universal Receiver Delegate Vault contract
  const vaultURD = await vaultURDFactory.connect(myEOA).deploy();

  return vaultURD.target;
};

const updateVaultURD = async (vaultURDAddress) => {
  // create an instance of the LSP9Vault
  const vault = new web3.eth.Contract(LSP9Vault.abi, vaultAddress);
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

  // encode setData Calldata on the Vault
  const setDataCalldata = await vault.methods['setData(bytes32,bytes)'](
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate,
    vaultURDAddress,
  ).encodeABI(); // Any other information can be stored here

  // encode execute Calldata on the UP
  const executeCalldata = await universalProfile.methods[
    'execute(uint256,address,uint256,bytes)'
  ](
    0, // OPERATION CALL
    vaultAddress,
    0, // value to transfer
    setDataCalldata,
  ).encodeABI();

  // execute the `sexecuteCalldata` on the KM
  await keyManager.methods['execute(bytes)'](executeCalldata).send({
    from: myEOA.address,
    gasLimit: 600_000,
  });
};

// deploy a new Vault URD and retrieve its address
const vaultURDAddress = await deployVaultURD();
// update the curent Vault's URD
await updateVaultURD(vaultURDAddress);
```

  </TabItem>

</Tabs>

## Reading Data

The **LSP9Vault** contract is an **ERC725** contract, so it shares the same way to read data as Universal Profiles and other ERC725 contracts by using **[erc725.js](../../tools/erc725js/getting-started.md)**.

You can refer to this **[previous guide](../universal-profile/read-profile-data.md)** to learn how to **fetch data** (received assets, issued assets, etc ..). Please note, that you will need to replace the address of the **Universal Profile** with the **Vault's** address.
