---
sidebar_label: 'Vault Execution'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Interact With Contracts

:::caution Disclaimer

This guide might contain outdated information and will be updated soon.

:::

Similar to our **[previous guide](./edit-vault-data.md)** on setting data on the Vault, in this guide, we will be learning how to **interact with other contracts** through the Vault's execute function.

:::info

This guide is also very similar to the guide: [**Interact with contract using a Universal Profile**](./interact-with-contracts.md).

:::

**Interaction flow**:

![Guide - Interact with other contracts using a Vault](/img/guides/lsp9/interact-with-contract-using-vaults-flow.jpg)

## Setup

To complete this mini-guide, we will need:

- an EOA with some LYX for gas fees and the required [**permissions**](../../standards/access-control/lsp6-key-manager.md#permissions) for the interaction.
- the `UniversalProfile` and `LSP9Vault` contracts ABIs from the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) npm package.
- the address of the Universal Profile.
- the address of the LSP9 Vault.
- the `targetContract` ABI.
- the address of the Target Contract.

:::info

The chosen EOA needs to have [**CALL Permission**](../../standards/access-control/lsp6-key-manager.md#permissions) together with [**AllowedCalls**](../../standards/access-control/lsp6-key-manager.md#allowed-calls) or [**SUPER_CALL Permission**](../../standards/access-control/lsp6-key-manager.md#super-permissions)

:::

Make sure you have the following dependencies installed before beginning this tutorial.

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="ethers" label="ethers.js">

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

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```typescript title="Imports & Constants"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import TargetContractABI from './TargetContractABI.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const universalProfileAddress = '0x...';
const vaultAddress = '0x...';
const targetContractAddress = '0x...';

// setup EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const myEOA = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethers" label="ethers.js">

```typescript title="Imports & Constants"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import TargetContractABI from './TargetContractABI.json';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const universalProfileAddress = '0x...';
const vaultAddress = '0x...';
const targetContractAddress = '0x...';

// setup EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

## Step 2 - Create the contracts instances

Further we will create instances for our contracts

- Create a Universal Profile contract instance from `universalProfileAddress`.
- Create a Target Contract instance from the `targetContractAddress`.

<Tabs>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```typescript title="Contracts instances"
// Create Universal Profile contract instance
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);
// Create LSP9 Vault contract instance
const vault = new web3.eth.Contract(LSP9Vault.abi, vaultAddress);
// Create Target Contract contract instance
const targetContract = new web3.eth.Contract(
  TargetContractABI,
  targetContractAddress,
);
```

  </TabItem>

  <TabItem value="ethers" label="ethers.js">

```typescript title="Contracts instances"
// Create Universal Profile contract instance
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
// Create LSP9 Vault contract instance
const vault = new ethers.Contract(vaultAddress, LSP9Vault.abi);
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

### Encode Target Contract calldata

Encoding the calldata that will be be executed on the Target Contract.

<Tabs>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```typescript title="Target calldata"
// 1. encode the calldata to be run at the targetContract
// assuming targetContract is a Contract instance
const targetCalldata = targetContract.methods
  .myCoolfunction('dummyParameter')
  .encodeABI();
```

  </TabItem>
  
  <TabItem value="ethers" label="ethers.js">

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

### Encode Vault calldata

Encoding the calldata that will be be executed on the Vault. This calldata will also trigger the calldata that will be executed on the Target Contract.

<Tabs>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```typescript title="Vault calldata"
// 2. encode the calldata to be run on the Vault,
// passing the calldata to be run at the targetContract as 4th parameter
const vaultCalldata = await vault.methods
  .execute(0, targetContract.address, 0, targetCalldata)
  .encodeABI();
```

  </TabItem>
  
  <TabItem value="ethers" label="ethers.js">

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

## Step 4 - Execute the calldata through the UP

The final step is to execute the encoded calldata through the Universal Profile. Since we are calling from a UP's controller address (with proper [**permissions**](../../standards/access-control/lsp6-key-manager.md#permissions)), the Key Manager will authorize the transaction.

<Tabs>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```typescript title="Send transaction"
// Execute the calldata through the Universal Profile
await universalProfile.methods.execute(0, vaultAddress, 0, vaultCalldata).send({
  from: myEOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>
  
  <TabItem value="ethers" label="ethers.js">

```typescript title="Send transaction"
// Execute the calldata through the Universal Profile
await universalProfile
  .connect(myEOA)
  .execute(0, vaultAddress, 0, vaultCalldata);
```

  </TabItem>

</Tabs>

## Final code

<Tabs>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```typescript title="Interacting with other contracts through the vault"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import TargetContractABI from './TargetContractABI.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');
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
// Create LSP9 Vault contract instance
const vault = new web3.eth.Contract(LSP9Vault.abi, vaultAddress);
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
const vaultCalldata = await vault.methods
  .execute(0, targetContract.address, 0, targetCalldata)
  .encodeABI();

// Execute the calldata through the Universal Profile
await universalProfile.methods.execute(0, vaultAddress, 0, vaultCalldata).send({
  from: myEOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>
  
  <TabItem value="ethers" label="ethers.js">

```typescript title="Interacting with other contracts through the vault"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import TargetContractABI from './TargetContractABI.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const universalProfileAddress = '0x...';
const vaultAddress = '0x...';
const targetContractAddress = '0x...';

// setup EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const myEOA = new ethers.Wallet(privateKey).connect(provider);

// Create Universal Profile contract instance
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
// Create LSP9 Vault contract instance
const vault = new ethers.Contract(vaultAddress, LSP9Vault.abi);
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
  targetContractAddress,
  0,
  targetCalldata,
]);

// Execute the calldata through the Universal Profile
await universalProfile
  .connect(myEOA)
  .execute(0, vaultAddress, 0, vaultCalldata);
```

  </TabItem>

</Tabs>

In the code snippet above, we interacted with `myCoolfunction(..)` function on the **targetContract** contract through the Vault's [execute](../../contracts/contracts/LSP9Vault/LSP9Vault.md#execute) function. The call was encoded and executed through the Universal Profile.
