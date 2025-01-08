---
sidebar_label: '⛓ Deploy Multichain Contracts'
sidebar_position: 8
description: Learn to deploy contracts with the same addresses on multiple blockchains using LSP16-UniversalFactory.
---

# Deploy Multichain Contracts

In this guide, we will focus on deploying a contract at the same address across different blockchains using the [LSP16-UniversalFactory](../../standards/factories/lsp16-universal-factory.md) standard. While this method is suitable for deploying a variety of contracts, it's important to note that for deploying Universal Profiles specifically that requires setup with several contracts, the [LSP23-LinkedContractFactory](../universal-profile/advanced-guides/deploy-up-with-lsp23.md) is recommended as it facilitates the setup and linking of several contracts more efficiently.

## Contract Creation

:::info

Proceed to the next section if you already have an ABI and bytecode ready for deployment.

:::

Here is a basic contract example to deploy:

```solidity title="contracts/TargetContract.sol"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

/**
 * @dev sample contract to be used for a guide to deploy multichain contracts
 */
contract TargetContract {

    uint256 public number;

    constructor(uint256 _number) {
        number = _number;
    }

    function setNumber(uint256 _number) public {
        number = _number;
    }
}
```

Once compiled using Hardhat, navigate to the `artifacts/contracts/TargetContract.sol/` directory. The ABI and bytecode will be available in `TargetContract.json`.

<details>
    <summary>The ABI and the bytecode of the contract: </summary>

```json title="artifacts/contracts/TargetContract.sol/TargetContract.json"
{
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_number",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "number",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_number",
          "type": "uint256"
        }
      ],
      "name": "setNumber",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5060405161010f38038061010f83398101604081905261002f91610037565b600055610050565b60006020828403121561004957600080fd5b5051919050565b60b18061005e6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80633fb5c1cb1460375780638381f58a146049575b600080fd5b604760423660046063565b600055565b005b605160005481565b60405190815260200160405180910390f35b600060208284031215607457600080fd5b503591905056fea2646970667358221220958426080fb00e4b3e137866f9d1884559c2a31f2d3ee15cd4f2c8aee4a92e6764736f6c63430008110033"
}
```

</details>

**This file is essential for the upcoming steps and should be moved to the same directory as `main.js`.**

Once you have the ABI and the bytecode of the contract to deploy, you can start writing your script. We will use the `main.js` file in a new repo.

## Setup

Install `ethers` and `@lukso/lsp-smart-contracts`:

```bash
npm i ethers @lukso/lsp-smart-contracts
```

## Step 1: Check the Existence of the Factory

First, establish a connection to the first blockchain network you intend to deploy your contracts on (we will use [LUKSO Testnet](../../networks/testnet/parameters.md)):

```js title="main.js"
import { ethers } from 'ethers';

const RPC_URL = 'https://rpc.testnet.lukso.network';
const provider = new ethers.JsonRpcProvider(RPC_URL);

const checkDeployedCode = async (address: any) => {
  const code = await provider.getCode(address);
  return code !== '0x';
};

// Fixed addresses

// For more information check: https://github.com/Arachnid/deterministic-deployment-proxy
const NICK_FACTORY_ADDRESS = '0x4e59b44847b379578588920ca78fbf26c0b4956c';

// For more information check: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-16-UniversalFactory.md
const LSP16_FACTORY_ADDRESS = '0x1600016e23e25D20CA8759338BfB8A8d11563C4e';

const isNickFactoryDeployed = await checkDeployedCode(NICK_FACTORY_ADDRESS);
const isLSP16FactoryDeployed = await checkDeployedCode(LSP16_FACTORY_ADDRESS);

console.log('Nick Factory exists: ', isNickFactoryDeployed);
console.log('LSP16UniversalFactory exists: ', isLSP16FactoryDeployed);
```

### Deployment of Nick Factory

If `Nick Factory` doesn't exist, we'll need to deploy it:

```js title="main.js"
// The private key should not be committed to a public GitHub repository.
const signer = new ethers.Wallet('<private-key>', provider);

if (!isNickFactoryDeployed) {
  const fundingTx = await signer.sendTransaction({
    // Standardized address
    to: '0x3fab184622dc19b6109349b94811493bf2a45362',
    value: ethers.parseEther('0.009'), // This value should be enough
    // Check gasLimit and gasPrice to estimate exactly the value: https://github.com/Arachnid/deterministic-deployment-proxy
  });

  await fundingTx.wait();

  // Sending raw transaction specified by the Nick factory
  const rawTx =
    '0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222';

  const deployNickFactoryTx = await provider.broadcastTransaction(rawTx);
  await deployNickFactoryTx.wait();
}
```

### Deployment of LSP16UniversalFactory

If `LSP16UniversalFactory` doesn't exist, we'll need to deploy it, we'll get the standardized salt and bytecode from the [LSP16-UniversalFactory specification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-16-UniversalFactory.md#standardized-bytecode)

```js title="main.js"
if (!isLSP16FactoryDeployed) {
  const lsp16Tx = await signer.sendTransaction({
    to: NICK_FACTORY_ADDRESS,
    data:
      '0xfaee762dee0012026f5380724e9744bdc5dd26ecd8f584fe9d72a4170d01c049' + // Standardized Salt
      '60806040523480156100105...', // Standardized Bytecode
    // Copy the full bytecode from https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-16-UniversalFactory.md#standardized-bytecode
  });

  await lsp16Tx.wait();
}
```

## Step 2: Deploying TargetContract

### Case 1: Contract with Constructor

After deploying the two factory contracts, we can deploy the target contract and precompute its address. We will start by deploying a contract that has a constructor:

```js title="main.js"
import { abi as LSP16UniversalFactoryABI } from '@lukso/lsp-smart-contracts/artifacts/LSP16UniversalFactory.json';
import {
  abi as TargetContractABI,
  bytecode as targetContractBytecode,
} from './TargetContract.json';

// signer and provider and LSP16_FACTORY_ADDRESS available from the last step

const lsp16UniversalFactory = new ethers.Contract(
  LSP16_FACTORY_ADDRESS,
  LSP16UniversalFactoryABI,
  signer,
);

// Dummy value
const constructorArgument = 123;
const encodedConstructorArg = ethers.AbiCoder.defaultAbiCoder().encode(
  ['uint256'],
  [constructorArgument],
);

const contractBytecodeWithArg =
  targetContractBytecode + encodedConstructorArg.substring(2);

// On each script run, this salt should be different otherwise the deployment will fail
// Don't use random bytes as salt, use a deterministic salt to be able to deploy on a different network
// using the same salt, to produce the same address
// Should be a hex string like 0x1322322... (32 bytes)
const deploymentSalt = '<bytes32-salt>';

// Precompute the address of the contract to be deployed without initialization
const precomputedAddressWithoutInit =
  await lsp16UniversalFactory.computeAddress(
    ethers.keccak256(contractBytecodeWithArg),
    deploymentSalt,
    false, // --> boolean indicating if the contract should be initialized or not after deployment
    '0x', // --> bytes representing the calldata to initialize the contract
  );

// Deploy contract without initialization
const deployTxWithoutInit = await lsp16UniversalFactory.deployCreate2(
  contractBytecodeWithArg,
  deploymentSalt,
);
await deployTxWithoutInit.wait();

const contractWithoutInit = new ethers.Contract(
  precomputedAddressWithoutInit,
  TargetContractABI,
  signer,
);

const numberInContractWithoutInit = await contractWithoutInit.number();
console.log(
  'The number in the non-initialized contract is: ',
  numberInContractWithoutInit,
);
```

### Case 2: Contract with Constructor with intializable function

Using the `LSP16UniversalFactory`, we can also deploy initializable contracts, where a method can be called directly after deploying. We can call `setNumber(..)` after deployment within the same transaction on the `TargetContract`.

```js title="main.js"
// contract instances and bytecode available from the last step

// Precompute the address of the contract to be deployed with initialization
const encodedFunctionCallForInit =
  contractWithoutInit.interface.encodeFunctionData('setNumber', [456]); // Dummy value

const precomputedAddressWithInit = await lsp16UniversalFactory.computeAddress(
  ethers.keccak256(contractBytecodeWithArg),
  deploymentSalt,
  true, // --> boolean indicating if the contract should be initialized or not after deployment
  encodedFunctionCallForInit, // --> bytes representing the calldata to initialize the contract
);

// Deploy and initialize contract
const deployAndInitTx = await lsp16UniversalFactory.deployCreate2AndInitialize(
  contractBytecodeWithArg,
  deploymentSalt,
  encodedFunctionCallForInit,
  0, // --> Value to be sent to the constructor
  0, // --> Value to be sent to the initialize function
);
await deployAndInitTx.wait();

const contractWithInit = new ethers.Contract(
  precomputedAddressWithInit,
  TargetContractABI,
  signer,
);

const numberInContractWithInit = await contractWithInit.number();
console.log(
  'The number in the initialized contract is: ',
  numberInContractWithInit,
);
```

### Case 3: ERC-1167 Proxy contract

Using the `LSP16UniversalFactory`, we can also deploy minimal proxies according to the ERC1167 standard, where a method can be called to generate a minimal proxy based on the address of an existing contract.

```js title="main.js"
// contract instances and bytecode available from the last step

// Precompute the address for ERC1167 proxy deployment
const precomputedProxyAddress =
  await lsp16UniversalFactory.computeERC1167Address(
    precomputedAddressWithInit,
    deploymentSalt,
    false, // --> boolean indicating if the contract should be initialized or not after deployment
    '0x', // --> bytes representing the calldata to initialize the contract
  );

// Deploy ERC1167 proxy
const deployProxyTx = await lsp16UniversalFactory.deployERC1167Proxy(
  precomputedAddressWithInit,
  deploymentSalt,
);

await deployProxyTx.wait();

const proxyContract = new ethers.Contract(
  precomputedProxyAddress,
  TargetContractABI,
  signer,
);

const numberInProxyWithoutInit = await proxyContract.number();
// The number will be 0, as a proxy does not have state unless its initialized
console.log(
  'The number in proxy without initialization is: ',
  numberInProxyWithoutInit,
);
```

### Case 4: ERC-1167 Proxy contract with initializable function

Using the `LSP16UniversalFactory`, we can also deploy initializable minimal proxies according to the ERC1167 standard, where a method can be called to generate a minimal proxy based on the address of an existing contract and have a call after deployment to initialize the proxy.

```js title="main.js"
// Encode function call for proxy initialization
const encodedFunctionCallForProxyInit =
  proxyContract.interface.encodeFunctionData('setNumber', [789]); // Dummy value

// Precompute the address for initialized ERC1167 proxy
const precomputedInitializedProxyAddress =
  await lsp16UniversalFactory.computeERC1167Address(
    precomputedAddressWithInit,
    deploymentSalt,
    true, // --> boolean indicating if the contract should be initialized or not after deployment
    encodedFunctionCallForProxyInit, // --> bytes representing the calldata to initialize the contract
  );

// Deploy and initialize ERC1167 proxy
const deployAndInitProxyTx =
  await lsp16UniversalFactory.deployERC1167ProxyAndInitialize(
    precomputedAddressWithInit,
    deploymentSalt,
    encodedFunctionCallForProxyInit,
  );
await deployAndInitProxyTx.wait();

const initializedProxyContract = new ethers.Contract(
  precomputedInitializedProxyAddress,
  TargetContractABI,
  signer,
);
const numberInProxyAfterInit = await initializedProxyContract.number();
console.log('The number in the initialized proxy is: ', numberInProxyAfterInit);
```

### Generating CREATE2 Salt

:::info

This section is primarily intended for advanced developers who require knowledge of the specific salt used in address generation. Developers focusing on basic deployment across multiple chains may not need this detailed information and can precompute the address of the contract to be created using the provided method of the contract.

:::

The `LSP16UniversalFactory` uses a unique approach to deploy contracts with CREATE2. Instead of using the salt directly, it combines and hashes the salt with other parameters.

```js title="main.js"
// Precompute the salt for deployment
// Should be a hex string like 0x1322322... (32 bytes)
const providedSalt = '<salt>'; // replace with your actual salt

const precomputedProvidedSalt = await lsp16UniversalFactory.generateSalt(
  providedSalt,
  <boolean>,                // --> boolean indicating if the contract should be initialized or not after deployment
  <empty or encoded call>,  // --> bytes representing the calldata to initialize the contract
);

console.log('The actual salt used for deployment is: ', precomputedProvidedSalt);
```

This salt can be used by off-chain tools to detect the address where the contract will be deployed along with the init code hash and the deployer address.

## Step 3: Repeating on different networks

To achieve the same address on a different network, make sure to:

- Run the script with the same salt specified in the script.
- Replace `RPC_URL` with the rpc of the network you want to deploy on.
- Make sure the `signer` has enough native tokens to cover the cost of deployment on the new network.

## Final code

The code will run, just need to:

- Replace `<private-key>` with a private key containing funds.
- Add the full bytecode when deploying the `LSP16UniversalFactory` from `Nick Factory`.

> **Note:** The private key should not be committed to a public GitHub repository.

```js title="main.js"
import { ethers } from 'ethers';
import { abi as LSP16UniversalFactoryABI } from '@lukso/lsp-smart-contracts/artifacts/LSP16UniversalFactory.json';
import {
  abi as TargetContractABI,
  bytecode as targetContractBytecode,
} from './TargetContract.json';

const RPC_URL = 'https://rpc.testnet.lukso.network';
const provider = new ethers.JsonRpcProvider(RPC_URL);

async function main() {
  const checkDeployedCode = async (address: any) => {
    const code = await provider.getCode(address);
    return code !== '0x';
  };

  // For more information check: https://github.com/Arachnid/deterministic-deployment-proxy
  const NICK_FACTORY_ADDRESS = '0x4e59b44847b379578588920ca78fbf26c0b4956c';

  // For more information check: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-16-UniversalFactory.md
  const LSP16_FACTORY_ADDRESS = '0x1600016e23e25D20CA8759338BfB8A8d11563C4e';

  const isNickFactoryDeployed = await checkDeployedCode(NICK_FACTORY_ADDRESS);
  const isLSP16FactoryDeployed = await checkDeployedCode(LSP16_FACTORY_ADDRESS);

  console.log('Nick Factory exists: ', isNickFactoryDeployed);
  console.log('LSP16UniversalFactory exists: ', isLSP16FactoryDeployed);

  // The private key should not be committed to a public GitHub repository
  const signer = new ethers.Wallet('<private-key>', provider);

  if (!isNickFactoryDeployed) {
    const fundingTx = await signer.sendTransaction({
      // Standardized address
      to: '0x3fab184622dc19b6109349b94811493bf2a45362',
      value: ethers.parseEther('0.009'), // This value should be enough
      // Check gasLimit and gasPrice to estimate exactly the value: https://github.com/Arachnid/deterministic-deployment-proxy
    });
    await fundingTx.wait();

    // Sending raw transaction specified by the Nick factory
    const rawTx =
      '0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222';
    const deployNickFactoryTx = await provider.broadcastTransaction(rawTx);
    await deployNickFactoryTx.wait();
  }

  if (!isLSP16FactoryDeployed) {
    const lsp16Tx = await signer.sendTransaction({
      to: NICK_FACTORY_ADDRESS,
      data:
        '0xfaee762dee0012026f5380724e9744bdc5dd26ecd8f584fe9d72a4170d01c049' + // Standardized Salt
        '60806040523480156100105...', // Standardized Bytecode
      // Copy the full bytecode from https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-16-UniversalFactory.md#standardized-bytecode
    });

    await lsp16Tx.wait();
  }

  const lsp16UniversalFactory = new ethers.Contract(
    LSP16_FACTORY_ADDRESS,
    LSP16UniversalFactoryABI,
    signer,
  );

  // Dummy value
  const constructorArgument = 123;
  const encodedConstructorArg = ethers.AbiCoder.defaultAbiCoder().encode(
    ['uint256'],
    [constructorArgument],
  );

  const contractBytecodeWithArg =
    targetContractBytecode + encodedConstructorArg.substring(2);

  // On each script run, this salt should be different otherwise the deployment will fail
  // Don't use random bytes as salt, use a deterministic salt to be able to deploy on a different network
  // using the same salt, to produce the same address
  // Should be a hex string like 0x1322322... (32 bytes)
  const deploymentSalt = '<bytes32-salt>';

  // Precompute the address of the contract to be deployed without initialization
  const precomputedAddressWithoutInit =
    await lsp16UniversalFactory.computeAddress(
      ethers.keccak256(contractBytecodeWithArg),
      deploymentSalt,
      false, // --> boolean indicating if the contract should be initialized or not after deployment
      '0x', // --> bytes representing the calldata to initialize the contract
    );

  // Deploy contract without initialization
  const deployTxWithoutInit = await lsp16UniversalFactory.deployCreate2(
    contractBytecodeWithArg,
    deploymentSalt,
  );
  await deployTxWithoutInit.wait();

  const contractWithoutInit = new ethers.Contract(
    precomputedAddressWithoutInit,
    TargetContractABI,
    signer,
  );

  const numberInContractWithoutInit = await contractWithoutInit.number();
  console.log(
    'The number in the non-initialized contract is: ',
    numberInContractWithoutInit,
  );

  // Precompute the address of the contract to be deployed with initialization
  const encodedFunctionCallForInit =
    contractWithoutInit.interface.encodeFunctionData('setNumber', [
      456, // Dummy value
    ]);
  const precomputedAddressWithInit = await lsp16UniversalFactory.computeAddress(
    ethers.keccak256(contractBytecodeWithArg),
    deploymentSalt,
    true, // --> boolean indicating if the contract should be initialized or not after deployment
    encodedFunctionCallForInit, // --> bytes representing the calldata to initialize the contract
  );

  // Deploy and initialize contract
  const deployAndInitTx =
    await lsp16UniversalFactory.deployCreate2AndInitialize(
      contractBytecodeWithArg,
      deploymentSalt,
      encodedFunctionCallForInit,
      0, // --> Value to be sent to the constructor
      0, // --> Value to be sent to the initialize function
    );
  await deployAndInitTx.wait();

  const contractWithInit = new ethers.Contract(
    precomputedAddressWithInit,
    TargetContractABI,
    signer,
  );

  const numberInContractWithInit = await contractWithInit.number();
  console.log(
    'The number in the initialized contract is: ',
    numberInContractWithInit,
  );

  // Precompute the address for ERC1167 proxy deployment
  const precomputedProxyAddress =
    await lsp16UniversalFactory.computeERC1167Address(
      precomputedAddressWithInit,
      deploymentSalt,
      false, // --> boolean indicating if the contract should be initialized or not after deployment
      '0x', // --> bytes representing the calldata to initialize the contract
    );

  // Deploy ERC1167 proxy
  const deployProxyTx = await lsp16UniversalFactory.deployERC1167Proxy(
    precomputedAddressWithInit,
    deploymentSalt,
  );
  await deployProxyTx.wait();

  const proxyContract = new ethers.Contract(
    precomputedProxyAddress,
    TargetContractABI,
    signer,
  );
  const numberInProxyWithoutInit = await proxyContract.number();
  // The number will be 0, as a proxy does not have state unless its initialized
  console.log(
    'The number in proxy without initialization is: ',
    numberInProxyWithoutInit,
  );

  // Encode function call for proxy initialization
  const encodedFunctionCallForProxyInit =
    proxyContract.interface.encodeFunctionData('setNumber', [
      789, // Dummy value
    ]);

  // Precompute the address for initialized ERC1167 proxy
  const precomputedInitializedProxyAddress =
    await lsp16UniversalFactory.computeERC1167Address(
      precomputedAddressWithInit,
      deploymentSalt,
      true, // --> boolean indicating if the contract should be initialized or not after deployment
      encodedFunctionCallForProxyInit, // --> bytes representing the calldata to initialize the contract
    );

  // Deploy and initialize ERC1167 proxy
  const deployAndInitProxyTx =
    await lsp16UniversalFactory.deployERC1167ProxyAndInitialize(
      precomputedAddressWithInit,
      deploymentSalt,
      encodedFunctionCallForProxyInit,
    );
  await deployAndInitProxyTx.wait();

  const initializedProxyContract = new ethers.Contract(
    precomputedInitializedProxyAddress,
    TargetContractABI,
    signer,
  );
  const numberInProxyAfterInit = await initializedProxyContract.number();
  console.log(
    'The number in the initialized proxy is: ',
    numberInProxyAfterInit,
  );
}

main();
```
