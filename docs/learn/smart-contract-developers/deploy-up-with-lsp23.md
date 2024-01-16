---
sidebar_label: '🏭 Deploying a Universal Profile and its Key Manager using LSP23'
description: 'Learn how to deploy a Universal Profile using LSP23.'
sidebar_position: 7
---

# Deploying a Universal Profile using LSP-23

:::note

This guide builds on top of a Hardhat project using TypeScript as described in the [Getting Started](../smart-contract-developers/getting-started.md) section.

:::

## Introduction

This guide will walk you through the steps to deploy a Universal Profile and its Key Manager using LSP23 Linked Contract Factory. We will not do a deep dive into the LSPs specifications. For more information on these specifications, please refer to the [LSP23 specification](../../standards/generic-standards/lsp23-linked-contracts-factory.md), the [Universal Profile specification](../../standards/universal-profile/introduction.md), and the [LSP6 Key Manager specification](../../standards/universal-profile/lsp6-key-manager.md).

## Prerequisites

- [Hardhat installed and initialized](../smart-contract-developers/getting-started.md)
- [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package installed from npm using `npm i @lukso/lsp-smart-contracts@0.14.0` (or the latest version)
- The address of the LSP23 Linked Contracts Factory contract
- The address of the LSP23 Post Deployment module contract
- The address of the Universal Profile implementation contract
- The address of the LSP6 Key Manager implementation contract

## Deploying the proxies of the Universal Profile and its Key Manager

For this guide, we will use the minimal proxy versions of the contracts we will deploy (Key Manager and Universal Profile). This means that we will deploy proxies contracts that will point to their implementation contracts. It is a gas-efficient way to deploy contracts. For more information on minimal proxies, please refer to the [EIP-1167](https://eips.ethereum.org/EIPS/eip-1167) specification.

Once you have initialized and installed the dependencies of your hardhat project, you can start writing your deployment script. We will use the `deploy.ts` file in the `scripts/` folder. You can remove the existing code in the file and start writing your own.

### Add the imports

Add the imports of the artifacts, constants and libraries that we will use:

```typescript
import { ethers } from 'hardhat';
import { AbiCoder } from 'ethers';

// import the artifacts
import LSP23FactoryArtifact from '@lukso/lsp-smart-contracts/artifacts/LSP23LinkedContractsFactory.json';
import UniversalProfileInitArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfileInit.json';

// import the constants from the LSP-Smart-Contracts library
import { ALL_PERMISSIONS, ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
```

### Add the addresses of the contracts

Below the imports section, add the addresses of the contracts that you want to use. For this guide we will use the following addresses:

```typescript
const LSP23FactoryAddress = '0x2300000A84D25dF63081feAa37ba6b62C4c89a30';
const LSP23PostDeploymentModuleAddress =
  '0x000000000066093407b6704B89793beFfD0D8F00';
const UniversalProfileImplementationAddress =
  '0x3024D38EA2434BA6635003Dc1BDC0daB5882ED4F';
const LSP6KeyManagerImplementationAddress =
  '0x2Fe3AeD98684E7351aD2D408A43cE09a738BF8a4';
// this will be needed later so we can set the Universal Receiver to the Universal Profile (see https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver)
const UniversalReceiverAddress = '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D';
```

### Add salt to the constants

The LSP23 Linked Contracts Factory contract uses a salt to generate the address of the Universal Profile and its Key Manager. The salt is a 32 bytes hex string. **Make sure this salt is unique**. If you were to deploy the Universal Profile and its Key Manager again with the same calldata, you would need to use a different salt or else you would get the same addresses and the deployment would fail.
For this guide we will use the following salt:

```typescript
const salt =
  '0x5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed';
```

### Instantiate the contracts

Instantiate the contracts that we will be interacting with using the addresses from the previous step:

```typescript
async function main() {
  const lsp23FactoryContract = await ethers.getContractAt(
    LSP23FactoryArtifact.abi,
    LSP23FactoryAddress,
  );

  const universalProfileImplementationContract = await ethers.getContractAt(
    UniversalProfileInitArtifact.abi,
    UniversalProfileImplementationAddress,
  );
}
```

### Create the LSP23 Deployment Init Structs

The LSP23 Linked Contracts Factory contract uses structs as parameters to deploy the Universal Profile and its Key Manager proxies. You can find more information on these structs in the [LSP23 specification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#ilsp23linkedcontractsfactory). We will use the following structs:

```typescript
async function main() {
  // previous code

  const universalProfileInitStruct = {
    salt,
    fundingAmount: 0,
    implementationContract: UniversalProfileImplementationAddress,
    initializationCalldata:
      universalProfileImplementationContract.interface.encodeFunctionData(
        'initialize',
        [LSP23PostDeploymentModuleAddress],
      ), // this will call the initialize() function of the Universal Profile and the the LSP23PostDeploymentModule address as owner
  };

  const keyManagerInitStruct = {
    fundingAmount: 0,
    implementationContract: LSP6KeyManagerImplementationAddress,
    addPrimaryContractAddress: true, // this will append the primary contract address to the init calldata
    initializationCalldata: '0xc4d66de8', // initialize() function selector ( the deployed Universal Profile's address will be appended to this calldata)
    extraInitializationParams: '0x',
  };
}
```

### Create the Universal Profile initialisation calldata

When deploying your Universal Profile, you might want to initialize it with some data. For example, you may want to set the Universal Profile [LSP3 Metadata](../../standards/universal-profile/lsp3-profile-metadata.md), set the Universal Receiver to the Universal Profile, give some [LSP6 permissions](../../standards/universal-profile/lsp6-key-manager#permissions.md) to some controllers, etc. For the following guide we will:

- set the Universal Profile [`LSP3Profile`](../../standards/universal-profile/lsp3-profile-metadata.md) Metadata
- set the [Universal Receiver](../../standards/generic-standards/lsp1-universal-receiver.md) to the Universal Profile
- give some permissions to the Universal Receiver ([`SUPER_SETDATA` and `REENTRANCY`](../../standards/universal-profile/lsp6-key-manager#permissions))
- give all permissions to the main controller
  set the [`AddressPermissions[]`](../../standards/universal-profile/lsp6-key-manager.md#permissions) length data key
- set the [`AddressPermissions[]`](../../standards/universal-profile/lsp6-key-manager.md#permissions) array data key
- set the [`AddressPermissions:Permissions:<address>`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#addresspermissionspermissionsaddress) data keys

#### Create the LSP3 Metadata

The LSP3 Metadata is a JSON object that contains information about the Universal Profile. For more information on the LSP3 Metadata, please refer to the [LSP3 Profile Metadata specification](../../standards/universal-profile/lsp3-profile-metadata.md). For the sake of simplicity, we will not create the JSON object in this guide but use random bytes instead:

```typescript
async function main() {
  // previous code

  const lsp3DataKey = ERC725YDataKeys.LSP3.LSP3Profile;
  const lsp3DataValue = ethers.randomBytes(32); // this is just a random value for the LSP3Profile
}
```

#### Create the Universal Receiver data key

```typescript
async function main() {
  // previous code

  const universalReceiverDataKey =
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;
}
```

#### Create the permissions data keys and data values

Let's start by creating the permissions data keys and data values of the Universal Receiver. The Universal Receiver will have the [`SUPER_SETDATA` and `REENTRANCY`](../../standards/universal-profile/lsp6-key-manager#permissions) permissions. At the moment we are writing this guide, the combination of these two permissions is `0x0000000000000000000000000000000000000000000000000000000000060080` however this may change in the future. You can check if this is still the case by looking at the [ERC725 Inspection Tool](https://erc725-inspect.lukso.tech/key-manager).

```typescript
async function main() {
  // previous code

  const universalReceiverPermissionsKey =
    ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
    UniversalReceiverAddress.slice(2);
  const universalReceiverPermissionsValue =
    '0x0000000000000000000000000000000000000000000000000000000000060080'; // REENTRANCY & SUPER_SETDATA permissions
}
```

Now we will want after deployment to have a main controller that has all the permissions on the Universal Profile. We will start by adding this address under our previous constants:

```typescript
const mainController = '0x3303Ce3b8644D566271DD2Eb54292d32F1458968'; // this is just a random address
```

Then we will create the data key and data value for the permissions of the main controller:

```typescript
async function main() {
  // previous code

  const mainControllerPermissionsKey =
    ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
    mainController.slice(2);
  // main controller will have all permissions on the Universal Profile
  const mainControllerPermissionsValue = ALL_PERMISSIONS;
}
```

#### Create the `AddressPermissions[]` Array length data key and data value

```typescript
async function main() {
  // previous code

  const addressPermissionsLengthDataKey =
    ERC725YDataKeys.LSP6['AddressPermissions[]'].length;

  const abiCoder = new AbiCoder(); // instantiate the abiCoder
  const addressPermissionsLengthDataValue = abiCoder.encode(['uint256'], [2]); // Address Permissions array length
}
```

#### Create the AddressPermissions[] array data keys and data values

```typescript
async function main() {
  // previous code

  const addressPermissionsArrayFirstElementKey =
    ERC725YDataKeys.LSP6['AddressPermissions[]'].index +
    abiCoder.encode(['uint128'], [0]).slice(34); // remove the 0x and the first 16 bytes of the index
  console.log(addressPermissionsArrayFirstElementKey);
  const addressPermissionsArrayFirstElementValue = UniversalReceiverAddress; // first element is the Universal Receiver

  const addressPermissionsArraySecondElementKey =
    ERC725YDataKeys.LSP6['AddressPermissions[]'].index +
    abiCoder.encode(['uint128'], [1]).slice(34); // remove the 0x and the first 16 bytes of the index
  const addressPermissionsArraySecondElementValue = mainController; // second element is the main controller
}
```

#### Encode the calldata that will be used to initialize the Universal Profile

Now that we have all the data keys and data values, we can encode the calldata that will be used to initialize the Universal Profile:

```typescript
async function main() {
  // previous code

  const types = ['bytes32[]', 'bytes[]']; // types of the parameters
  const initializeEncodedBytes = abiCoder.encode(types, [
    [
      lsp3DataKey, // LSP3Metadata data key
      universalReceiverDataKey, // Universal Receiver data key
      universalReceiverPermissionsKey, // URD Permissions data key
      mainControllerPermissionsKey, // Main Controller Permissions data key
      addressPermissionsLengthDataKey, // Number of address with permissions data key
      addressPermissionsArrayFirstElementKey, // Index of the first address with permissions data key
      addressPermissionsArraySecondElementKey, // Index of the second address with permissions data key
    ],
    [
      lsp3DataValue, // LSP3Metadata data value
      UniversalReceiverAddress, // URD Address
      universalReceiverPermissionsValue, // URD Permissions data value
      mainControllerPermissionsValue, // main controller permissions data value
      addressPermissionsLengthDataValue, // Address Permissions array length data value
      addressPermissionsArrayFirstElementValue, // first element of the Address Permissions array
      addressPermissionsArraySecondElementValue, // second element of the Address Permissions array
    ],
  ]);
}
```

### Deploy the Universal Profile and its Key Manager

Now that we have all the data needed to deploy the Universal Profile and its Key Manager, we can deploy them. We will first make a static call to the LSP23 Linked Contracts Factory contract to get the addresses of the Universal Profile and its Key Manager:

```typescript
async function main() {
  // previous code

  const [upAddress, keyManagerAddress] =
    await lsp23FactoryContract.deployERC1167Proxies.staticCall(
      universalProfileInitStruct,
      keyManagerInitStruct,
      LSP23PostDeploymentModuleAddress,
      initializeEncodedBytes,
    );

  console.log('Universal Profile address:', upAddress);
  console.log('Key Manager address:', keyManagerAddress);
}
```

Now that we have the addresses of the Universal Profile and its Key Manager, we can deploy them:

```typescript
async function main() {
  // previous code

  const tx = await lsp23FactoryContract.deployERC1167Proxies(
    universalProfileInitStruct,
    keyManagerInitStruct,
    LSP23PostDeploymentModuleAddress,
    initializeEncodedBytes,
  );
  await tx.wait(1);
}
```

### Final script

Your final script should look like this:

<details>
<summary>Click to expand/collapse the script</summary>

```typescript
import { ethers } from 'hardhat';
import { AbiCoder } from 'ethers';
import LSP23FactoryArtifact from '../node_modules/@lukso/lsp-smart-contracts/artifacts/LSP23LinkedContractsFactory.json';
import UniversalProfileInitArtifact from '../node_modules/@lukso/lsp-smart-contracts/artifacts/UniversalProfileInit.json';
import { ALL_PERMISSIONS, ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

const LSP23FactoryAddress = '0x2300000A84D25dF63081feAa37ba6b62C4c89a30';
const LSP23PostDeploymentModuleAddress =
  '0x000000000066093407b6704B89793beFfD0D8F00';
const UniversalProfileImplementationAddress =
  '0x3024D38EA2434BA6635003Dc1BDC0daB5882ED4F';
const LSP6KeyManagerImplementationAddress =
  '0x2Fe3AeD98684E7351aD2D408A43cE09a738BF8a4';
const UniversalReceiverAddress = '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D'; // this will be needed later so we can set the Universal Receiver to the Universal Profile (see https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver)
const mainController = '0x3303Ce3b8644D566271DD2Eb54292d32F1458968';

const salt =
  '0x5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed';

async function main() {
  // instantiate the contracts
  const lsp23FactoryContract = await ethers.getContractAt(
    LSP23FactoryArtifact.abi,
    LSP23FactoryAddress,
  );

  const universalProfileImplementationContract = await ethers.getContractAt(
    UniversalProfileInitArtifact.abi,
    UniversalProfileImplementationAddress,
  );

  // create the init structs
  const universalProfileInitStruct = {
    salt,
    fundingAmount: 0,
    implementationContract: UniversalProfileImplementationAddress,
    initializationCalldata:
      universalProfileImplementationContract.interface.encodeFunctionData(
        'initialize',
        [LSP23PostDeploymentModuleAddress],
      ), // this will call the `initialize(...)` function of the Universal Profile and the the LSP23PostDeploymentModuleAddress as owner
  };

  const keyManagerInitStruct = {
    fundingAmount: 0,
    implementationContract: LSP6KeyManagerImplementationAddress,
    addPrimaryContractAddress: true, // this will append the primary contract address to the init calldata
    initializationCalldata: '0xc4d66de8', // `initialize(...)` function selector
    extraInitializationParams: '0x',
  };

  // create the lsp3 data key and value
  const lsp3DataKey = ERC725YDataKeys.LSP3.LSP3Profile;
  const lsp3DataValue = ethers.randomBytes(32); // this is just a random value for the LSP3Profile

  // create the universalReceiver data key
  const universalReceiverDataKey =
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;

  // create the permissions data keys
  const universalReceiverPermissionsKey =
    ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
    UniversalReceiverAddress.slice(2);
  const universalReceiverPermissionsValue =
    '0x0000000000000000000000000000000000000000000000000000000000060080'; // REENTRNACY & SUPER_SETDATA permissions

  const mainControllerPermissionsKey =
    ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
    mainController.slice(2);
  const mainControllerPermissionsValue = ALL_PERMISSIONS; // main controller will have all permissions on the Universal Profile

  // create the AddressPermissions[] length data key and data value
  const addressPermissionsLengthDataKey =
    ERC725YDataKeys.LSP6['AddressPermissions[]'].length;

  const abiCoder = new AbiCoder(); // instantiate the abiCoder
  const addressPermissionsLengthDataValue = abiCoder.encode(['uint256'], [2]); // Address Permissions array length

  // create the AddressPermissions[] array data keys and data values
  const addressPermissionsArrayFirstElementKey =
    ERC725YDataKeys.LSP6['AddressPermissions[]'].index +
    abiCoder.encode(['uint'], [0]).slice(34); // remove the 0x and the first 16 bytes of the index
  const addressPermissionsArrayFirstElementValue = UniversalReceiverAddress; // first element is the Universal Receiver

  const addressPermissionsArraySecondElementKey =
    ERC725YDataKeys.LSP6['AddressPermissions[]'].index +
    abiCoder.encode(['uint'], [1]).slice(34); // remove the 0x and the first 16 bytes of the index
  const addressPermissionsArraySecondElementValue = mainController; // second element is the main controller

  // encode the calldata that will be used to initialize the Universal Profile
  const types = ['bytes32[]', 'bytes[]']; // types of the parameters
  const initializeEncodedBytes = abiCoder.encode(types, [
    [
      lsp3DataKey, // LSP3Metadata data key
      universalReceiverDataKey, // Universal Receiver data key
      universalReceiverPermissionsKey, // URD Permissions data key
      mainControllerPermissionsKey, // Main Controller Permissions data key
      addressPermissionsLengthDataKey, // Number of address with permissions data key
      addressPermissionsArrayFirstElementKey, // Index of the first address with permissions data key
      addressPermissionsArraySecondElementKey, // Index of the second address with permissions data key
    ],
    [
      lsp3DataValue, // LSP3Metadata data value
      UniversalReceiverAddress, // URD Address
      universalReceiverPermissionsValue, // URD Permissions data value
      mainControllerPermissionsValue, // main controller permissions data value
      addressPermissionsLengthDataValue, // Address Permissions array length data value
      addressPermissionsArrayFirstElementValue, // first element of the Address Permissions array
      addressPermissionsArraySecondElementValue, // second element of the Address Permissions array
    ],
  ]);

  // deploy the Universal Profile and its Key Manager
  const [upAddress, keyManagerAddress] =
    await lsp23FactoryContract.deployERC1167Proxies.staticCall(
      universalProfileInitStruct,
      keyManagerInitStruct,
      LSP23PostDeploymentModuleAddress,
      initializeEncodedBytes,
    );
  console.log('Universal Profile address:', upAddress);
  console.log('Key Manager address:', keyManagerAddress);

  const tx = await lsp23FactoryContract.deployERC1167Proxies(
    universalProfileInitStruct,
    keyManagerInitStruct,
    LSP23PostDeploymentModuleAddress,
    initializeEncodedBytes,
  );
  await tx.wait(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

</details>

### Run the script

You can now run the script using `npx hardhat run scripts/deploy.ts --network <networkName>`.
