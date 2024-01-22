---
sidebar_label: '⚙️ Extend a Universal Profile Functionalities'
sidebar_position: 4
description: Learn to enhance your Universal Profile with added functionalities in JavaScript, covering extension deployment, interface extension, and practical use cases.
---

# Extend a Universal Profile Functionalities

:::info ments

You will need a Universal Profile that you can control via its KeyManager to follow this guide.

:arrow_left: If you don't have a Universal Profile yet, follow our previous guide [**Create a Universal Profile**](./create-profile.md).

:::

This guide will teach you how to **add functionalities to your Universal Profile** programmatically in JavaScript and includes:

- deploying extensions to the profile
- extending the Universal Profile with extensions
- extending the Universal Profile interfaceIds

To achieve this goal, we will perform the following steps:

1. Deploy contracts that have the logic to be added to the Universal Profile
2. Attach the extension addresses to the Universal Profile

## Introduction

:::info

Read the standard docs about including [LSP17-ContractExtension in the Universal Profile](../../../standards/universal-profile/lsp0-erc725account.md#lsp17---contract-extension).

:::

A Universal Profile contains non-biased features, including generic execution capabilities, the ability to attach generic information, and the ability to be notified and react to various actions. However, post-deployment, a Universal Profile, like any smart contract, becomes immutable. This immutability restricts the ability to add new functionalities into the code of the contract.

To overcome this limitation, the concept of **extensions** is introduced. Extensions are essentially external contracts that act as supplementary modules to the Universal Profile. They provide a dynamic way to enhance the profile's capabilities.

When a call is made to the Universal Profile for a function that isn't natively part of its primary code, the contract checks if this function exists as an extension. If found, the call is seamlessly redirected to the appropriate external contract (extension), thereby effectively expanding the functionality of the Universal Profile without altering its core, immutable code. This approach enables greater flexibility and adaptability, ensuring the Universal Profile can evolve to meet diverse ments.

## Extending Functionalities

### Setup

Set up a new project with:

```bash
npm init
```

Then, install the dependencies

```bash
npm install ethers@v5 @lukso/lsp-smart-contracts@v0.14
```

### Step 1: Instantiate the Universal Profile

#### Generate a Signer

First, we need to generate a signer. This signer will be used to interact with the blockchain. We'll use a private key of the Universal Profile controller and an RPC URL.

```js
import { ethers } from 'ethers';

// RPC URL (e.g., LUKSO testnet)
const RPC_URL = 'https://rpc.testnet.lukso.network';

// Replace with your private key
const privateKey = 'your-private-key';

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(privateKey, provider);
```

#### Instantiate the Universal Profile Contract

Now, we'll instantiate an instance of the Universal Profile contract.

```js
import { abi as UniversalProfileABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// Replace with the address of your Universal Profile
const universalProfileAddress = 'your-universal-profile-address';

const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfileABI,
  signer,
);
```

### Step 2: Create the Extension Contract

Next, we will create a Solidity contract named `TipMe` which will inherit from [`LSP17Extension`](../../../contracts/contracts/LSP17ContractExtension/LSP17Extension.md) and have a function `tipMe(..)` that emits an event `Tipped`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@lukso/lsp-smart-contracts/contracts/LSP17ContractExtension/LSP17Extension.sol";

contract TipMe is LSP17Extension {
    event Tipped(address tipper);

    function tipMe() public payable {
      // _extendableMsgSender() is a method inherited from LSP17Extension that
      // extract the address who initially called the Universal Profile with the tipMe selector
      // `msg.sender` in this case will be the Universal Profile address/
      emit Tipped(_extendableMsgSender());
    }

    // You can access the value sent to the UniversalProfile with
    // _extendableMsgValue() if the value is being preserved in the UniversalProfile
    // or with msg.value in case the UniversalProfile is forwarding the value to the extension

}
```

The contract can be compiled with any blockchain development environment like Hardhat or Foundry and extract the abi and bytecode. Create `TipMe.json` in the same directory of the main file.

<details>
    <summary>The ABI and the bytecode of the contract: </summary>

```json
{
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "tipper",
          "type": "address"
        }
      ],
      "name": "Tipped",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "VERSION",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tipMe",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50610359806100206000396000f3fe6080604052600436106100345760003560e01c806301ffc9a714610039578063c753619d1461006e578063ffa1ad7414610078575b600080fd5b34801561004557600080fd5b506100596100543660046101f3565b6100ce565b60405190151581526020015b60405180910390f35b610076610167565b005b34801561008457600080fd5b506100c16040518060400160405280600681526020017f302e31342e30000000000000000000000000000000000000000000000000000081525081565b604051610065919061023c565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fcee78b4000000000000000000000000000000000000000000000000000000000148061016157507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b7f6e6dc9fb40a5073d46db20aeeb93e8a1b65bcd97624d5be4bcb7105fd7256b586101906101ba565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390a1565b600080366101c960348261028a565b906101d560203661028a565b926101e2939291906102c4565b6101eb916102ee565b60601c905090565b60006020828403121561020557600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461023557600080fd5b9392505050565b600060208083528351808285015260005b818110156102695785810183015185820160400152820161024d565b506000604082860101526040601f19601f8301168501019250505092915050565b81810381811115610161577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600080858511156102d457600080fd5b838611156102e157600080fd5b5050820193919092039150565b6bffffffffffffffffffffffff19813581811691601485101561031b5780818660140360031b1b83161692505b50509291505056fea26469706673582212207cb079856f6eb296cf0fe4131f43256d95ad69524df0a266ae3952295688c20964736f6c63430008110033"
}
```

</details>

### Step 3: Deploy the Extension Contract

We will use the abi and bytecode to deploy the extension contract

```js
import { abi as TipMeABI } from './TipMe.json';
import { bytecode as TipMeBytecode } from './TipMe.json';

const TipMeFactory = new ethers.ContractFactory(
  TipMeABI,
  TipMeBytecode,
  signer,
);

const tipMeContract = await TipMeFactory.deploy();
await tipMeContract.deployTransaction.wait();

const tipMeExtensionAddress = tipMeContract.addres;
```

### Step 4: Encode Function Selector and Store in Universal Profile

:::info Requirements

The address calling the `setData(..)` function needs to have `ADDEXTENSIONS` and `CHANGEEXTENSIONS` permission otherwise the call will fail. Check the [keyManager guides](../key-manager/get-controller-permissions.md) to learn more about permissions.

:::

We need to encode the function selector of `tipMe(..)` and store it in the Universal Profile with a specific data key according to the [LSP17-ContractExtension](../../../standards/generic-standards/lsp17-contract-extension.md) standard.

#### Prepare data key and data value

```js
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// We get `TipMeABI` from the last step
// import {abi as TipMeABI} from './TipMe.json';
const tipMeInterface = new ethers.utils.Interface(TipMeABI);
const tipMeFunctionSelector = tipMeInterface.getSighash('tipMe()');

// Define the DataKey for the extension
// according to the LSP17-ContractExtension standard
const extensionDataKey =
  ERC725YDataKeys.LSP17.LSP17ExtensionPrefix +
  tipMeFunctionSelector.substr(2) +
  '0'.repeat(32);
```

#### Controlling Value Forwarding to Extensions

When calling an extension through a UniversalProfile, **in case value was sent along the call**, there's an option to either retain the sent value within the UniversalProfile contract or forward it to the extension contract. This choice depends on the intended purpose of the extension. In scenarios where a single extension is utilized collectively by multiple users, it might be preferable to keep the value within the UniversalProfile. Alternatively, if the extension requires funds to perform specific actions, forwarding the value might be necessary.

This behavior is controlled by appending a boolean value to the address stored under the extension's data key for a particular function selector.

For example, to forward the value along with the call, the address would be stored with a "0x01" boolean appended:

```js
const tx = await universalProfile.setData(
  extensionDataKey,
  tipMeContract.address + '01',
);

await tx.wait();
```

**Note**: Ensure that the function in the extension being called is marked as payable.

Conversely, to keep the value sent within the UniversalProfile, store the address as is, without appending any boolean:

```js
const tx = await universalProfile.setData(
  extensionDataKey,
  tipMeContract.address,
);

await tx.wait();
```

### Step 5: Test the Function Call

Finally, test calling the tipMe function on the Universal Profile.

```js
// Attaching the ABI of TipMe to the Universal Profile so we can call tipMe() function directly on it
const universalProfileWithExtension = new ethers.Contract(
  universalProfileAddress,
  TipMeABI,
  signer,
);

// Calling the tipMe() function on the Universal Profile
// Make sure the address associated with the private key have enough native tokens to send

const tipMeTx = await universalProfileWithExtension.tipMe({
  value: ethers.utils.parseEther('0.1'),
});

await tipMeTx.wait();
```

The event should be emitted and the value should be seen on the Universal Profile or the extension contract depending whether the value was retained or forwarded.

### Final Code (Function)

Below is the complete code snippet of this guide, with all the steps compiled together.

```js
import { ethers } from 'ethers';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

import { abi as UniversalProfileABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

import { abi as TipMeABI } from './TipMe.json';
import { bytecode as TipMeBytecode } from './TipMe.json';

async function main() {
  // RPC URL (e.g., LUKSO testnet)
  const RPC_URL = 'https://rpc.testnet.lukso.network';

  // Make sure the address associated with this private key has the 'ADDEXTENSIONS' and 'CHANGEEXTENSIONS' permissions

  // Replace with your private key
  const privateKey = 'your-private-key';

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(privateKey, provider);

  const universalProfileAddress = 'your-universal-profile-address';

  const universalProfile = new ethers.Contract(
    universalProfileAddress,
    UniversalProfileABI,
    signer,
  );

  const TipMeFactory = new ethers.ContractFactory(
    TipMeABI,
    TipMeBytecode,
    signer,
  );

  const tipMeContract = await TipMeFactory.deploy();
  await tipMeContract.deployTransaction.wait();

  const tipMeInterface = new ethers.utils.Interface(TipMeABI);
  const tipMeFunctionSelector = tipMeInterface.getSighash('tipMe()');

  // Define the DataKey for the extension
  const extensionDataKey =
    ERC725YDataKeys.LSP17.LSP17ExtensionPrefix +
    tipMeFunctionSelector.substr(2) +
    '0'.repeat(32);

  const tx = await universalProfile.setData(
    extensionDataKey,
    tipMeContract.address,
  );
  await tx.wait();

  // Attaching the ABI of TipMe to the Universal Profile so we can call tipMe() function directly on it
  const universalProfileWithExtension = new ethers.Contract(
    universalProfileAddress,
    TipMeABI,
    signer,
  );

  // Calling the tipMe() function on the Universal Profile
  const tipMeTx = await universalProfileWithExtension.tipMe({
    value: ethers.utils.parseEther('0.1'),
  });
  await tipMeTx.wait();
}

main();
```

## Extending InterfaceIds

Extending interfaceIds is crucial for Universal Profiles, as many protocols check for support of specific interfaceIds before executing calls to certain functions. Extending interfaceIds typically follows a similar approach to extending functions, with the main distinction being the existance of the `supportsInterface` function.

### Step 1: Create a Contract Supporting a Specific InterfaceId

First, you need to create a Solidity contract that implements the supportsInterface function. This function should return true for at least one specific interfaceId, in this case, a dummy interfaceId like `0xaabbccdd`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InterfaceIdExtension {
    bytes4 constant DUMMY_INTERFACE_ID = 0xaabbccdd;

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == DUMMY_INTERFACE_ID;
    }

}
```

The contract can be compiled with any blockchain development environment like Hardhat or Foundry and extract the abi and bytecode. Create `SupportsInterface.json` in the same directory of the main file.

<details>
    <summary>The ABI and the bytecode of the contract: </summary>

```json
{
  "abi": [
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50610110806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806301ffc9a714602d575b600080fd5b607f60383660046093565b7fffffffff00000000000000000000000000000000000000000000000000000000167faabbccdd000000000000000000000000000000000000000000000000000000001490565b604051901515815260200160405180910390f35b60006020828403121560a457600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811460d357600080fd5b939250505056fea2646970667358221220f5bcd4c144943e9ab139d02d2609c021af3361f19e8d47a551246e3678d74e9264736f6c63430008110033"
}
```

</details>

### Step 2: Deploy the Extension Contract

We will use the abi and bytecode to deploy the extension contract

```js
import { abi as SupportsInterfaceABI } from './SupportsInterface.json';
import { bytecode as SupportsInterfaceBytecode } from './SupportsInterface.json';

const supportsInterfaceFactory = new ethers.ContractFactory(
  SupportsInterfaceABI,
  SupportsInterfaceBytecode,
  signer,
);

const supportsInterfaceContract = await supportsInterfaceFactory.deploy();
await supportsInterfaceContract.deployTransaction.wait();

const supportsInterfaceExtensionAddress = supportsInterfaceContract.addres;
```

### Step 3: Encode Function Selector and Store in Universal Profile

:::info ments

The address calling the `setData(..)` function needs to have `ADDEXTENSIONS` and `CHANGEEXTENSIONS` permission otherwise the call will fail. Check the [keyManager guides](../key-manager/get-controller-permissions.md) to learn more about permissions.

:::

We need to encode the function selector of `supportsInterface(..)` and store it in the Universal Profile with a specific data key according to the [LSP17-ContractExtension](../../../standards/generic-standards/lsp17-contract-extension.md) standard.

```js
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

const supportsInterfaceInterface = new ethers.utils.Interface(
  SupportsInterfaceABI,
);
const supportsInterfaceFunctionSelector = supportsInterfaceInterface.getSighash(
  'supportsInterface(bytes4)',
);

// Define the DataKey for the extension
const extensionDataKey =
  ERC725YDataKeys.LSP17.LSP17ExtensionPrefix +
  supportsInterfaceFunctionSelector.substr(2) +
  '0'.repeat(32);

const tx = await universalProfile.setData(
  extensionDataKey,
  supportsInterfaceContract.address,
);

await tx.wait();
```

### Step 4: Call supportsInterface with the InterfaceId

Finally, you can verify that the extension was successful by calling the supportsInterface function with the dummy interfaceId `0xaabbccdd`. The function should return true, indicating that the Universal Profile now supports this interfaceId through the extension.

```js
const result =
  await universalProfile.callStatic.supportsInterface('0xaabbccdd');
console.log('Supports Dummy InterfaceId:', result);
```

This process effectively extends the capabilities of your Universal Profile to acknowledge support for additional interfaceIds, enhancing its interoperability within the broader ecosystem.

### Final Code (InterfaceId)

Below is the complete code snippet of this guide, with all the steps compiled together.

```js
import { ethers } from 'ethers';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

import { abi as UniversalProfileABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

import { abi as SupportsInterfaceABI } from './SupportsInterface.json';
import { bytecode as SupportsInterfaceBytecode } from './SupportsInterface.json';

async function main() {
  // RPC URL (e.g., LUKSO testnet)
  const RPC_URL = 'https://rpc.testnet.lukso.network';

  // Make sure the address associated with this private key has the 'ADDEXTENSIONS' and 'CHANGEEXTENSIONS' permissions

  // Replace with your private key
  const privateKey = 'your-private-key';

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(privateKey, provider);

  const universalProfileAddress = 'your-universal-profile-address';

  const universalProfile = new ethers.Contract(
    universalProfileAddress,
    UniversalProfileABI,
    signer,
  );

  const supportsInterfaceFactory = new ethers.ContractFactory(
    SupportsInterfaceABI,
    SupportsInterfaceBytecode,
    signer,
  );

  const supportsInterfaceContract = await supportsInterfaceFactory.deploy();
  await supportsInterfaceContract.deployTransaction.wait();

  const supportsInterfaceExtensionAddress = supportsInterfaceContract.addres;

  const supportsInterfaceInterface = new ethers.utils.Interface(
    SupportsInterfaceABI,
  );
  const supportsInterfaceFunctionSelector =
    supportsInterfaceInterface.getSighash('supportsInterface(bytes4)');

  // Define the DataKey for the extension
  const extensionDataKey =
    ERC725YDataKeys.LSP17.LSP17ExtensionPrefix +
    supportsInterfaceFunctionSelector.substr(2) +
    '0'.repeat(32);

  const tx = await universalProfile.setData(
    extensionDataKey,
    supportsInterfaceContract.address,
  );

  await tx.wait();

  const result =
    await universalProfile.callStatic.supportsInterface('0xaabbccdd');
  console.log('Supports Dummy InterfaceId:', result);
}

main();
```
