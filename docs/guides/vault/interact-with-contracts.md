---
sidebar_label: 'Interact With Contracts'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Interact With Contracts

Similar to our **[previous guide](./edit-vault-data.md)** on setting data on the Vault, in this guide, we will be learning how to **interact with other contracts** through the Vault's execute function.

:::info

This guide is also very similar to the guide: [**Interact with contract using a Universal Profie**](../universal-profile/interact-with-contracts.md)

:::

**Interaction flow**:

![Guide - Interact with other contracts using a Vault](/img/guides/lsp9/interact-with-contract-using-vaults-flow.jpg)

## Setup

To complete this mini-guide, we will need:

- an EOA with some LYX for gas fees and the required [**permissions**](../../standards/universal-profile/lsp6-key-manager.md#permissions) for the interaction.
- the `UniversalProfile`, `LSP6KeyManager` and `LSP9Vault` contracts ABIs from the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) npm package.
- the address of the Universal Profile.
- the address of the LSP9 Vault.
- the `targetContract` ABI.
- the address of the Target Contract.

:::info

The chosen EOA needs to have [**CALL Permission**](../../standards/universal-profile/lsp6-key-manager.md#permissions) together with [**AllowedCalls**](../../standards/universal-profile/lsp6-key-manager.md#allowed-calls) or [**SUPER_CALL Pemrission**](../../standards/universal-profile/lsp6-key-manager.md#super-permissions)

:::

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

## Step 1 - Setup imports & constants

At this step we will import the needed **contract ABIs** and we will save all the **required addresses** in constants.  
Also we will initialize our **EOA** for further use.

:::caution

Save the Target Contract ABI in a separate json and import it in the main file.  
You can quickly compile and get a contract's ABI in [**Remix IDO**](https://remix.ethereum.org/)

:::

<Tabs>

  <TabItem value="web3js" label="web3.js">

```typescript title="Imports & Constants"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import TargetContractABI from './TargetContractABI.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');
const universalProfileAddress = '0x...';
const vaultAddress = '0x...';
const targetContractAddress = '0x...';

// setup EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const myEOA = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Imports & Constants"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import TargetContractABI from './TargetContractABI.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const universalProfileAddress = '0x...';
const vaultAddress = '0x...';
const targetContractAddress = '0x...';

// setup EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const EOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

## Step 2 - Create the contracts instances

Further we will create instances for our contracts

- Create an Universal Profile contract instance from `universalProfileAddress`.
- Get the `owner()` of the Universal Profile.
- Create a Key Manager contract instance from the owner of the Universal Profile.
- Create a Target Contract instance from the `targetContractAddress`.

<Tabs>

  <TabItem value="web3js" label="web3.js">

```typescript title="Contracts instances"
// Create Universal Profile contract instance
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);
// Get Universal Profile owner
const keyManagerAddress = await universalProfile.methods.owner().call();
// Create LSP6 Key Manager contract instance
const keyManager = new web3.eth.Contract(LSP6KeyManager.abi, keyManagerAddress);
// Create LSP9 Vault contract instance
const valut = new web3.eth.Contract(LSP9Vault.abi, valutAddress);
// Create Target Contract contract instance
const targetContract = new web3.eth.Contract(
  TargetContractABI,
  targetContractAddress,
);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Contracts instances"
// Create Universal Profile contract instance
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
// Get Universal Profile owner
const keyManagerAddress = await universalProfile.owner();
// Create LSP6 Key Manager contract instance
const keyManager = new ethers.Contract(keyManagerAddress, LSP6KeyManager.abi);
// Create LSP9 Vault contract instance
const valut = new ethers.Contract(valutAddress, LSP9Vault.abi);
// Create Target Contract contract instance
const targetContract = new ethers.Contract(
  targetContractAddress,
  TargetContractABI,
);
```

  </TabItem>

</Tabs>

## Step 3 - Encode the calldatas

This is the easy part, we need to create 2 calldatas:

- The _first calldata_ will be executed on the Target Contract.
- The _second calldata_ will be executed on the Vault and will trigger the _first calldata_.
- The _third calldata_ will be executed on the Universal Profile and will trigger the _second calldata_.

### Step 3.1 Encode Target Contract calldata

Encoding the calldata that will be be exeuted on the Target Contract.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Target calldata"
// 1. encode the calldata to be run at the targetContract
// assuming targetContract is a Contract instance
const targetCalldata = targetContract.methods
  .myCoolfunction('dummyParameter')
  .encodeABI();
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Target calldata"
// 1. encode the calldata to be run at the targetContract
// assuming targetContract is a Contract instance
const targetCalldata = targetContract.interface.encodeFunctionData(
  'myCoolfunction',
  ['dummyParameter'],
);
```

  </TabItem>

</Tabs>

### Step 3.2 Encode Vault calldata

Encoding the calldata that will be be exeuted on the Vault. This calldata will also trigger the calldata that will be executed on the Target Contract.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Vault calldata"
// 2. encode the calldata to be run on the Vault,
// passing the calldata to be run at the targetContract as 4th parameter
const vaultCalldata = await vault.methods[
  'execute(uint256,address,uint256,bytes)'
](0, targetContract.address, 0, targetCalldata).encodeABI();
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Vault calldata"
// 2. encode the calldata to be run on the Vault,
// passing the calldata to be run at the targetContract as 4th parameter
const vaultCalldata = vault.interface.encodeFunctionData('execute', [
  0,
  targetContract.address,
  0,
  targetCalldata,
]);
```

  </TabItem>

</Tabs>

### Step 3.3 Encode Universal Profile calldata

Encoding the calldata that will be be exeuted on the Universal Profile. This calldata will also trigger the calldata that will be executed in the Vault.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Universal Profile calldata"
// 3. encode the calldata to be run on the UP,
// passing the calldata to be run in the Vault as 4th parameter
const universalProfileCalldata = await universalProfile.methods[
  'execute(uint256,address,uint256,bytes)'
](0, vaultAddress, 0, vaultCalldata).encodeABI();
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Universal Profile calldata"
// 3. encode the calldata to be run on the UP,
// passing the calldata to be run in the Vault as 4th parameter
const universalProfileCalldata = universalProfile.interface.encodeFunctionData(
  'execute',
  [0, vaultAddress, 0, vaultCalldata],
);
```

  </TabItem>

</Tabs>

## Step 4 - Execute via the Key Manager

The final step is to pass the encoded calldata to the Key Manager. Since we are calling from a UP's controller address (with proper [**permissions**](../../standards/universal-profile/lsp6-key-manager.md#permissions)), the Key Manager will authorize and execute the transaction.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Send transaction"
// Execute via the KeyManager, passing the UP calldata
await keyManager.methods['execute(bytes)'](universalProfileCalldata).send({
  from: EOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Send transaction"
// Execute via the KeyManager, passing the UP calldata
await keyManager.connect(EOA)['execute(bytes)'](universalProfileCalldata);
```

  </TabItem>

</Tabs>

## Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Interacting with other contracts through the vault"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import TargetContractABI from './TargetContractABI.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');
const universalProfileAddress = '0x...';
const vaultAddress = '0x...';
const targetContractAddress = '0x...';

// setup EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const myEOA = web3.eth.accounts.wallet.add(privateKey);

// Create Universal Profile contract instance
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);
// Get Universal Profile owner
const keyManagerAddress = await universalProfile.methods.owner().call();
// Create LSP6 Key Manager contract instance
const keyManager = new web3.eth.Contract(LSP6KeyManager.abi, keyManagerAddress);
// Create LSP9 Vault contract instance
const valut = new web3.eth.Contract(LSP9Vault.abi, valutAddress);
// Create Target Contract contract instance
const targetContract = new web3.eth.Contract(
  TargetContractABI,
  targetContractAddress,
);

// 1. encode the calldata to be run at the targetContract
// assuming targetContract is a Contract instance
const targetCalldata = targetContract.methods
  .myCoolfunction('dummyParameter')
  .encodeABI();

// 2. encode the calldata to be run on the Vault,
// passing the calldata to be run at the targetContract as 4th parameter
const vaultCalldata = await vault.methods[
  'execute(uint256,address,uint256,bytes)'
](0, targetContract.address, 0, targetCalldata).encodeABI();

// 3. encode the calldata to be run on the UP,
// passing the calldata to be run in the Vault as 4th parameter
const universalProfileCalldata = await universalProfile.methods[
  'execute(uint256,address,uint256,bytes)'
](0, vaultAddress, 0, vaultCalldata).encodeABI();

// Execute via the KeyManager, passing the UP calldata
await keyManager.methods['execute(bytes)'](universalProfileCalldata).send({
  from: EOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Interacting with other contracts through the vault"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import TargetContractABI from './TargetContractABI.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const universalProfileAddress = '0x...';
const vaultAddress = '0x...';
const targetContractAddress = '0x...';

// setup EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const EOA = new ethers.Wallet(privateKey).connect(provider);

// Create Universal Profile contract instance
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
// Get Universal Profile owner
const keyManagerAddress = await universalProfile.owner();
// Create LSP6 Key Manager contract instance
const keyManager = new ethers.Contract(keyManagerAddress, LSP6KeyManager.abi);
// Create LSP9 Vault contract instance
const valut = new ethers.Contract(valutAddress, LSP9Vault.abi);
// Create Target Contract contract instance
const targetContract = new ethers.Contract(
  targetContractAddress,
  TargetContractABI,
);

// 1. encode the calldata to be run at the targetContract
// assuming targetContract is a Contract instance
const targetCalldata = targetContract.interface.encodeFunctionData(
  'myCoolfunction',
  ['dummyParameter'],
);

// 2. encode the calldata to be run on the Vault,
// passing the calldata to be run at the targetContract as 4th parameter
const vaultCalldata = vault.interface.encodeFunctionData('execute', [
  0,
  targetContract.address,
  0,
  targetCalldata,
]);

// 3. encode the calldata to be run on the UP,
// passing the calldata to be run in the Vault as 4th parameter
const universalProfileCalldata = universalProfile.interface.encodeFunctionData(
  'execute',
  [0, vaultAddress, 0, vaultCalldata],
);

// Execute via the KeyManager, passing the UP calldata
await keyManager.connect(EOA)['execute(bytes)'](universalProfileCalldata);
```

  </TabItem>

</Tabs>

In the code snippet above, we interacted with `myCoolfunction(..)` function on the **targetContract** contract through the Vault's [execute](../../standards/smart-contracts/lsp9-vault.md#execute) function. The call was encoded and executed through the Universal Profile and the Key Manager.
