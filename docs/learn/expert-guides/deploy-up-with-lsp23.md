---
sidebar_label: '🏭 Deploy Universal Profile + its Key Manager with LSP23 Factory'
description: 'Learn how to deploy a Universal Profile using LSP23.'
sidebar_position: 1
---

# Deploying a Universal Profile using LSP23 Factory

## Introduction

This guide will walk you through the steps to deploy a Universal Profile and its Key Manager using LSP23 Linked Contract Factory. We will not do a deep dive into the LSPs specifications. For more information on these specifications, please refer to the [LSP23 specification](../../standards/generic-standards/lsp23-linked-contracts-factory.md), the [Universal Profile specification](../../standards/universal-profile/introduction.md), and the [LSP6 Key Manager specification](../../standards/universal-profile/lsp6-key-manager.md).
You will be guided on how to create a script that could be used to deploy a Universal Profile and its Key Manager. In this example, we will be framework agnostic, but if you wish to see how to use it in Hardhat, you can refer to the [LUKSO Playground](https://github.com/lukso-network/lukso-playground) repository.

## Prerequisites

- [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package installed from npm using `npm i @lukso/lsp-smart-contracts@0.14.0` (or the latest version)
- The address of the LSP23 Linked Contracts Factory contract
- The address of the LSP23 Post Deployment module contract
- The address of the Universal Profile implementation contract
- The address of the LSP6 Key Manager implementation contract

## Deploying the proxies of the Universal Profile and its Key Manager

For this guide, we will use the minimal proxy versions of the contracts we will deploy (Key Manager and Universal Profile). This means that we will deploy proxies contracts that will point to their implementation contracts. It is a gas-efficient way to deploy contracts. For more information on minimal proxies, please refer to the [EIP-1167](https://eips.ethereum.org/EIPS/eip-1167) specification.

### Add the imports

Add to your file the imports of the artifacts, constants and libraries that we will use:

```typescript
// libs
import { AbiCoder, Contract, ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';

// LSPs Smart Contracts artifacts
import LSP23FactoryArtifact from '@lukso/lsp-smart-contracts/artifacts/LSP23LinkedContractsFactory.json';
import UniversalProfileInitArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfileInit.json';

// ERC725.js schemas
import LSP1UniversalReceiverDelegateSchemas from '@erc725/erc725.js/schemas/LSP1UniversalReceiverDelegate.json';
import LSP3ProfileMetadataSchemas from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import LSP6KeyManagerSchemas from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
```

### Add the addresses of the contracts

Below the imports section, add the addresses of the contracts that you want to use. For this guide we will use the following addresses:

```typescript
const LSP23_FACTORY_ADDRESS = '0x2300000A84D25dF63081feAa37ba6b62C4c89a30';
const LSP23_POST_DEPLOYMENT_MODULE =
  '0x000000000066093407b6704B89793beFfD0D8F00';
const UNIVERSAL_PROFILE_IMPLEMENTATION_ADDRESS =
  '0x3024D38EA2434BA6635003Dc1BDC0daB5882ED4F';
const LSP6_KEY_MANAGER_IMPLEMENTATION_ADDRESS =
  '0x2Fe3AeD98684E7351aD2D408A43cE09a738BF8a4';
// this will be needed later so we can set the Universal Receiver to the Universal Profile (see https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver)
const UNIVERSAL_RECEIVER_ADDRESS = '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D';
const MAIN_CONTROLLER = '0x3303Ce3b8644D566271DD2Eb54292d32F1458968';
```

### Add salt to the constants

The LSP23 Linked Contracts Factory contract uses a salt to generate the address of the Universal Profile and its Key Manager. The salt is a 32 bytes hex string. **Make sure this salt is unique**. If you were to deploy the Universal Profile and its Key Manager again with the same calldata, you would need to use a different salt or else you would get the same addresses and the deployment would fail.
For this guide we will use the following salt:

```typescript
const SALT =
  '0x5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed';
```

### Add the RPC URL and the private key

Add the RPC URL and the private key of the account that will deploy the Universal Profile and its Key Manager:

```typescript
const RPC_URL = 'https://rpc.testnet.lukso.network';
const PRIVATE_KEY = '0xYOUR_PRIVATE_KEY';
```

### Instantiate the contracts

Instantiate the contracts that we will be interacting with using the addresses from the previous step:

```typescript
async function main() {
  // Set up the provider
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  // Set up the signer
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  // Interacting with the LSP23Factory contract
  const lsp23FactoryContract = new Contract(
    LSP23_FACTORY_ADDRESS,
    LSP23FactoryArtifact.abi,
    signer,
  );

  // Interacting with the UniversalProfileImplementation contract
  const universalProfileImplementationContract = new Contract(
    UNIVERSAL_PROFILE_IMPLEMENTATION_ADDRESS,
    UniversalProfileInitArtifact.abi,
    signer,
  );
}
```

### Create the LSP23 Deployment Init Structs

The LSP23 Linked Contracts Factory contract uses structs as parameters to deploy the Universal Profile and its Key Manager proxies. You can find more information on these structs in the [LSP23 specification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#ilsp23linkedcontractsfactory). We will use the following structs:

```typescript
async function main() {
  // previous code

  const universalProfileInitStruct = {
    salt: SALT,
    fundingAmount: 0,
    implementationContract: UNIVERSAL_PROFILE_IMPLEMENTATION_ADDRESS,
    initializationCalldata:
      universalProfileImplementationContract.interface.encodeFunctionData(
        'initialize',
        [LSP23_POST_DEPLOYMENT_MODULE],
      ), // this will call the initialize() function of the Universal Profile and the the LSP23PostDeploymentModule address as owner
  };

  const keyManagerInitStruct = {
    fundingAmount: 0,
    implementationContract: LSP6_KEY_MANAGER_IMPLEMENTATION_ADDRESS,
    addPrimaryContractAddress: true, // this will append the primary contract address to the init calldata
    initializationCalldata: '0xc4d66de8', // initialize() function selector ( the deployed Universal Profile's address will be appended to this calldata)
    extraInitializationParams: '0x',
  };
}
```

### Create the Universal Profile initialization calldata

When deploying your Universal Profile, you might want to initialize it with some data. For example, you may want to set the Universal Profile [LSP3 Metadata](../../standards/universal-profile/lsp3-profile-metadata.md), set the Universal Receiver to the Universal Profile, give some [LSP6 permissions](../../standards/universal-profile/lsp6-key-manager#permissions.md) to some controllers, etc. For the following guide we will:

- set the Universal Profile [`LSP3Profile`](../../standards/universal-profile/lsp3-profile-metadata.md) Metadata
- set the [Universal Receiver](../../standards/generic-standards/lsp1-universal-receiver.md) to the Universal Profile
- give some permissions to the Universal Receiver ([`SUPER_SETDATA` and `REENTRANCY`](../../standards/universal-profile/lsp6-key-manager#permissions))
- give all permissions to the main controller
  set the [`AddressPermissions[]`](../../standards/universal-profile/lsp6-key-manager.md#permissions) length data key
- set the [`AddressPermissions[]`](../../standards/universal-profile/lsp6-key-manager.md#permissions) array data key
- set the [`AddressPermissions:Permissions:<address>`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#addresspermissionspermissionsaddress) data keys

#### Create the LSP3 Metadata

The LSP3 Metadata is a JSON object that contains information about the Universal Profile. For more information on the LSP3 Metadata, please refer to the [LSP3 Profile Metadata specification](../../standards/universal-profile/lsp3-profile-metadata.md). For the sake of simplicity, we will use one that we previously created and pushed to IPFS:

```typescript
async function main() {
  // previous code

  // instantiate the erc725 class
  const erc725 = new ERC725([
    ...LSP6KeyManagerSchemas,
    ...LSP3ProfileMetadataSchemas,
    ...LSP1UniversalReceiverDelegateSchemas,
  ]);

  const lsp3DataValue = {
    verification: {
      method: 'keccak256(utf8)',
      data: '0x6d6d08aafb0ee059e3e4b6b3528a5be37308a5d4f4d19657d26dd8a5ae799de0',
    },
    // this is an IPFS CID of a LSP3 Profile Metadata example, you can use your own
    url: 'ipfs://QmPRoJsaYcNqQiUrQxE7ajTRaXwHyAU29tHqYNctBmK64w',
  };
}
```

#### Create the permissions data keys and data values

In order to create all the permissions data keys and data values, we will use the [`@erc725/erc725.js`](../../tools/erc725js/getting-started.md) library. This library is a JavaScript implementation to encode and decode data key and values easily from any ERC725Y contract storage.

```typescript
async function main() {
  // previous code

  // create the permissions data keys
  const setDataKeysAndValues = erc725.encodeData([
    { keyName: 'LSP3Profile', value: lsp3DataValue }, // LSP3Metadata data key and value
    {
      keyName: 'LSP1UniversalReceiverDelegate',
      value: UNIVERSAL_RECEIVER_ADDRESS,
    }, // Universal Receiver data key and value
    {
      keyName: 'AddressPermissions:Permissions:<address>',
      dynamicKeyParts: [UNIVERSAL_RECEIVER_ADDRESS],
      value: erc725.encodePermissions({
        REENTRANCY: true,
        SUPER_SETDATA: true,
      }),
    }, // Universal Receiver Delegate permissions data key and value
    {
      keyName: 'AddressPermissions:Permissions:<address>',
      dynamicKeyParts: [MAIN_CONTROLLER],
      value: erc725.encodePermissions({
        CHANGEOWNER: true,
        ADDCONTROLLER: true,
        EDITPERMISSIONS: true,
        ADDEXTENSIONS: true,
        CHANGEEXTENSIONS: true,
        ADDUNIVERSALRECEIVERDELEGATE: true,
        CHANGEUNIVERSALRECEIVERDELEGATE: true,
        REENTRANCY: false,
        SUPER_TRANSFERVALUE: true,
        TRANSFERVALUE: true,
        SUPER_CALL: true,
        CALL: true,
        SUPER_STATICCALL: true,
        STATICCALL: true,
        SUPER_DELEGATECALL: false,
        DELEGATECALL: false,
        DEPLOY: true,
        SUPER_SETDATA: true,
        SETDATA: true,
        ENCRYPT: true,
        DECRYPT: true,
        SIGN: true,
        EXECUTE_RELAY_CALL: true,
      }), // Main Controller permissions data key and value
    },
    // Address Permissions array length = 2, and the controller addresses at each index
    {
      keyName: 'AddressPermissions[]',
      value: [UNIVERSAL_RECEIVER_ADDRESS, MAIN_CONTROLLER],
    },
  ]);
}
```

#### Encode the calldata that will be used to initialize the Universal Profile

Now that we have all the data keys and data values, we can encode the calldata that will be used to initialize the Universal Profile:

```typescript
async function main() {
  // previous code

  const abiCoder = new AbiCoder();

  const initializeEncodedBytes = abiCoder.encode(
    ['bytes32[]', 'bytes[]'],
    [setDataKeysAndValues.keys, setDataKeysAndValues.values],
  );
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
      LSP23_POST_DEPLOYMENT_MODULE,
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
    LSP23_POST_DEPLOYMENT_MODULE,
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
import { AbiCoder, Contract, ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';

// LSPs artifacts
import LSP23FactoryArtifact from '@lukso/lsp-smart-contracts/artifacts/LSP23LinkedContractsFactory.json';
import UniversalProfileInitArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfileInit.json';

// ERC725.js schemas
import LSP1UniversalReceiverDelegateSchemas from '@erc725/erc725.js/schemas/LSP1UniversalReceiverDelegate.json';
import LSP3ProfileMetadataSchemas from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import LSP6KeyManagerSchemas from '@erc725/erc725.js/schemas/LSP6KeyManager.json';

const LSP23_FACTORY_ADDRESS = '0x2300000A84D25dF63081feAa37ba6b62C4c89a30';
const LSP23_POST_DEPLOYMENT_MODULE =
  '0x000000000066093407b6704B89793beFfD0D8F00';
const UNIVERSAL_PROFILE_IMPLEMENTATION_ADDRESS =
  '0x3024D38EA2434BA6635003Dc1BDC0daB5882ED4F';
const LSP6_KEY_MANAGER_IMPLEMENTATION_ADDRESS =
  '0x2Fe3AeD98684E7351aD2D408A43cE09a738BF8a4';
const UNIVERSAL_RECEIVER_ADDRESS = '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D'; // this will be needed later so we can set the Universal Receiver to the Universal Profile (see https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver)
const MAIN_CONTROLLER = '0x3303Ce3b8644D566271DD2Eb54292d32F1458968';
const SALT =
  '0x5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed5eed';

const RPC_URL = 'https://rpc.testnet.lukso.network';
const PRIVATE_KEY = '0xYOUR_PRIVATE_KEY';

async function main() {
  // Set up the provider
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  // Set up the signer
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  // Interacting with the LSP23Factory contract
  const lsp23FactoryContract = new Contract(
    LSP23_FACTORY_ADDRESS,
    LSP23FactoryArtifact.abi,
    signer,
  );

  // Interacting with the UniversalProfileImplementation contract
  const universalProfileImplementationContract = new Contract(
    UNIVERSAL_PROFILE_IMPLEMENTATION_ADDRESS,
    UniversalProfileInitArtifact.abi,
    signer,
  );

  // create the init structs
  const universalProfileInitStruct = {
    salt: SALT,
    fundingAmount: 0,
    implementationContract: UNIVERSAL_PROFILE_IMPLEMENTATION_ADDRESS,
    initializationCalldata:
      universalProfileImplementationContract.interface.encodeFunctionData(
        'initialize',
        [LSP23_POST_DEPLOYMENT_MODULE],
      ), // this will call the `initialize(...)` function of the Universal Profile and the the LSP23_POST_DEPLOYMENT_MODULE as owner
  };

  const keyManagerInitStruct = {
    fundingAmount: 0,
    implementationContract: LSP6_KEY_MANAGER_IMPLEMENTATION_ADDRESS,
    addPrimaryContractAddress: true, // this will append the primary contract address to the init calldata
    initializationCalldata: '0xc4d66de8', // `initialize(...)` function selector
    extraInitializationParams: '0x',
  };

  // instantiate the erc725 class
  const erc725 = new ERC725([
    ...LSP6KeyManagerSchemas,
    ...LSP3ProfileMetadataSchemas,
    ...LSP1UniversalReceiverDelegateSchemas,
  ]);

  const lsp3DataValue = {
    verification: {
      method: 'keccak256(utf8)',
      data: '0x6d6d08aafb0ee059e3e4b6b3528a5be37308a5d4f4d19657d26dd8a5ae799de0',
    },
    url: 'ipfs://QmPRoJsaYcNqQiUrQxE7ajTRaXwHyAU29tHqYNctBmK64w',
  };

  // create the permissions data keys
  const setDataKeysAndValues = erc725.encodeData([
    { keyName: 'LSP3Profile', value: lsp3DataValue }, // LSP3Metadata data key and value
    {
      keyName: 'LSP1UniversalReceiverDelegate',
      value: UNIVERSAL_RECEIVER_ADDRESS,
    }, // Universal Receiver data key and value
    {
      keyName: 'AddressPermissions:Permissions:<address>',
      dynamicKeyParts: [UNIVERSAL_RECEIVER_ADDRESS],
      value: erc725.encodePermissions({
        REENTRANCY: true,
        SUPER_SETDATA: true,
      }),
    }, // Universal Receiver Delegate permissions data key and value
    {
      keyName: 'AddressPermissions:Permissions:<address>',
      dynamicKeyParts: [MAIN_CONTROLLER],
      value: erc725.encodePermissions({
        CHANGEOWNER: true,
        ADDCONTROLLER: true,
        EDITPERMISSIONS: true,
        ADDEXTENSIONS: true,
        CHANGEEXTENSIONS: true,
        ADDUNIVERSALRECEIVERDELEGATE: true,
        CHANGEUNIVERSALRECEIVERDELEGATE: true,
        REENTRANCY: false,
        SUPER_TRANSFERVALUE: true,
        TRANSFERVALUE: true,
        SUPER_CALL: true,
        CALL: true,
        SUPER_STATICCALL: true,
        STATICCALL: true,
        SUPER_DELEGATECALL: false,
        DELEGATECALL: false,
        DEPLOY: true,
        SUPER_SETDATA: true,
        SETDATA: true,
        ENCRYPT: true,
        DECRYPT: true,
        SIGN: true,
        EXECUTE_RELAY_CALL: true,
      }), // Main Controller permissions data key and value
    },
    // length of the Address Permissions array and their respective indexed keys and values
    {
      keyName: 'AddressPermissions[]',
      value: [UNIVERSAL_RECEIVER_ADDRESS, MAIN_CONTROLLER],
    },
  ]);

  const abiCoder = new AbiCoder();
  const types = ['bytes32[]', 'bytes[]']; // types of the parameters

  const initializeEncodedBytes = abiCoder.encode(types, [
    setDataKeysAndValues.keys,
    setDataKeysAndValues.values,
  ]);

  // deploy the Universal Profile and its Key Manager
  const [upAddress, keyManagerAddress] =
    await lsp23FactoryContract.deployERC1167Proxies.staticCall(
      universalProfileInitStruct,
      keyManagerInitStruct,
      LSP23_POST_DEPLOYMENT_MODULE,
      initializeEncodedBytes,
    );
  console.log('Universal Profile address:', upAddress);
  console.log('Key Manager address:', keyManagerAddress);

  const tx = await lsp23FactoryContract.deployERC1167Proxies(
    universalProfileInitStruct,
    keyManagerInitStruct,
    LSP23_POST_DEPLOYMENT_MODULE,
    initializeEncodedBytes,
  );
  await tx.wait(1);
}
```

</details>

### Conclusion

This is just an example on how you could implement the deployment of a Universal Profile and its Key Manager using the LSP23 Linked Contracts Factory. You can use this script as a base to create your own deployment script that would fit more your need. You can also refer to the [LUKSO Playground](https://github.com/lukso-network/lukso-playground) repository to see how it could be implemented using Hardhat.
