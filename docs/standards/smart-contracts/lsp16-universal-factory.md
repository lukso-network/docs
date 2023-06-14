---
title: LSP16UniversalFactory
sidebar_position: 13
---

# LSP16UniversalFactory

:::info Solidity contract

[`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)

:::

The **LSP16UniversalFactory** contract is the official implementation of the **[LSP16-UniversalFactory Standard](../generic-standards//lsp16-universal-factory.md)**.

This factory contract is designed to deploy contracts at the same address on multiple chains given specific requirements using [CREATE2](https://eips.ethereum.org/EIPS/eip-1014). The **UniversalFactory** can deploy 2 types of contracts:

- non-initializable (normal deployment)
- initializable (external call after deployment, e.g: proxy contracts)

---

## Requirements

In order to reproduce the same addresses of the contract to be created from this factory, the factory itself needs to be deployed at the same address on any chain.

[LSP16-UniversalFactory](../generic-standards/lsp16-universal-factory.md) standardize the address of the factory to be `0x160000700D62B8dDC65FaeD5AC5Add2d2e30A803`.

Check the standard to know more how to deploy the factory at this address.

## Functions

### deployCreate2

```solidity
function deployCreate2(bytes calldata byteCode, bytes32 providedSalt) public payable returns (address)
```

Deploys a contract using the CREATE2 opcode. The address where the contract will be deployed can be known in advance via the [`computeAddress(..)`](#computeaddress) function.

This function deploys contracts without initialization (external call after deployment).

The `providedSalt` parameter is not used directly as the salt by the CREATE2 opcode. Instead, it is hashed with
keccak256: `keccak256(abi.encodePacked(false, providedSalt))`. See [`generateSalt(..)`](#generatesalt) function for more details.

**Requirements:**

- If value is associated with the contract creation, the constructor of the contract to deploy MUST be payable, otherwise the call will revert.

- MUST NOT use the same bytecode and providedSalt twice, otherwise the call will revert.

#### Parameters:

| Name           | Type      | Description                                                                                                                                        |
| :------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `byteCode`     | `bytes`   | The bytecode of the contract to deploy (appended with constructor params if exist)                                                                 |
| `providedSalt` | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |

#### Return Values:

| Name              | Type      | Description                          |
| :---------------- | :-------- | :----------------------------------- |
| `contractCreated` | `address` | The address of the contract created. |

### deployCreate2AndInitialize

```solidity
function deployCreate2AndInitialize(bytes calldata byteCode, bytes32 providedSalt, bytes calldata initializeCalldata, uint256 constructorMsgValue, uint256 initializeCalldataMsgValue) public payable returns (address)
```

Deploys a contract using the CREATE2 opcode. The address where the contract will be deployed can be known in advance via the [`computeAddress(..)`](#computeaddress) function.

This function deploys contracts with initialization (external call after deployment).

The `providedSalt` parameter is not used directly as the salt by the CREATE2 opcode. Instead, it is hashed with keccak256: `keccak256(abi.encodePacked(true, initializeCalldata, providedSalt))`. See [`generateSalt(..)`](#generatesalt) function for more details.

**Requirements:**

- If value is associated with the contract creation, the constructor of the contract to deploy MUST be payable, otherwise the call will revert.

- If value is associated with the initialization call, the initialize function called on the contract to deploy MUST be payable, otherwise the call will revert.

- The sum of `constructorMsgValue` and `initializeCalldataMsgValue` MUST be equal to the value associated with the function call.

- MUST NOT use the same `bytecode` and `providedSalt` twice, otherwise the call will revert.

#### Parameters:

| Name                         | Type      | Description                                                                                                                                        |
| :--------------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `byteCode`                   | `bytes`   | The bytecode of the contract to deploy (appended with constructor params if exist)                                                                 |
| `providedSalt`               | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `initializeCalldata`         | `bytes`   | The calldata to be executed on the created contract                                                                                                |
| `constructorMsgValue`        | `uint256` | The value sent to the contract during deploymentcontract                                                                                           |
| `initializeCalldataMsgValue` | `uint256` | The value sent to the contract during initialization                                                                                               |

#### Return Values:

| Name              | Type      | Description                          |
| :---------------- | :-------- | :----------------------------------- |
| `contractCreated` | `address` | The address of the contract created. |

### deployERC1167Proxy

```solidity
function deployERC1167Proxy(address implementationContract, bytes32 providedSalt) public virtual returns (address)
```

Deploys an ERC1167 minimal proxy contract using the CREATE2 opcode. The address where the contract will be deployed can be known in advance via the [`computeERC1167Address(..)`](#computeERC1167address) function.

This function deploys contracts without initialization (external call after deployment).

The `providedSalt` parameter is not used directly as the salt by the CREATE2 opcode. Instead, it is hashed with keccak256: `keccak256(abi.encodePacked(false, providedSalt))`. See [`generateSalt(..)`](#generatesalt) function for more details. See [`generateSalt(..)`](#generatesalt) function for more details.

#### Parameters:

| Name                     | Type      | Description                                                                                                                                        |
| :----------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `implementationContract` | `address` | The contract address to use as the base implementation behind the proxy that will be deployed                                                      |
| `providedSalt`           | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |

#### Return Values:

| Name    | Type      | Description                               |
| :------ | :-------- | :---------------------------------------- |
| `proxy` | `address` | The address of the minimal proxy created. |

### deployERC1167ProxyAndInitialize

```solidity
function deployERC1167ProxyAndInitialize(address implementationContract, bytes32 providedSalt, bytes calldata initializeCalldata) public payable virtual returns (address)
```

Deploys an ERC1167 minimal proxy contract using the CREATE2 opcode. The address where the contract will be deployed can be known in advance via the [`computeERC1167Address(..)`](#computeERC1167address) function.

This function deploys contracts with initialization (external call after deployment).

The `providedSalt` parameter is not used directly as the salt by the CREATE2 opcode. Instead, it is hashed with keccak256: `keccak256(abi.encodePacked(true, initializeCalldata, providedSalt))`. See [`generateSalt(..)`](#generatesalt) function for more details.

#### Parameters:

| Name                     | Type      | Description                                                                                                                                        |
| :----------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `implementationContract` | `address` | The contract address to use as the base implementation behind the proxy that will be deployed                                                      |
| `providedSalt`           | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `initializeCalldata`     | `bytes`   | The calldata to be executed on the created contract                                                                                                |

#### Return Values:

| Name    | Type      | Description                               |
| :------ | :-------- | :---------------------------------------- |
| `proxy` | `address` | The address of the minimal proxy created. |

### computeAddress

```solidity
function computeAddress(bytes32 bytecodeHash, bytes32 providedSalt, bool initializable, bytes calldata initializeCalldata) public view virtual returns (address)
```

Computes the address of a contract to be deployed using CREATE2, based on the input parameters. Any change in one of these parameters will result in a different address.

When the `initializable` boolean is set to `false`, `initializeCalldata` will not affect the function output.

#### Parameters:

| Name                 | Type      | Description                                                                                                                                        |
| :------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `byteCodeHash`       | `bytes32` | The keccak256 hash of the bytecode to be deployed                                                                                                  |
| `providedSalt`       | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `initializable`      | `bool`    | A boolean that indicates whether an external call should be made to initialize the contract after deployment                                       |
| `initializeCalldata` | `bytes`   | The calldata to be executed on the created contract if `initializable` is set to `true`                                                            |

#### Return Values:

| Name               | Type      | Description                                      |
| :----------------- | :-------- | :----------------------------------------------- |
| `contractToCreate` | `address` | The address where the contract will be deployed. |

### computeERC1167Address

```solidity
function computeERC1167Address(address implementationContract, bytes32 providedSalt, bool initializable, bytes calldata initializeCalldata) public view virtual returns (address)
```

Computes the address of a contract to be deployed using CREATE2, based on the input parameters. Any change in one of these parameters will result in a different address.

When the `initializable` boolean is set to `false`, `initializeCalldata` will not affect the function output.

#### Parameters:

| Name                     | Type      | Description                                                                                                                                        |
| :----------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `implementationContract` | `address` | The contract to create a clone of according to ERC1167                                                                                             |
| `providedSalt`           | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `initializable`          | `bool`    | A boolean that indicates whether an external call should be made to initialize the contract after deployment                                       |
| `initializeCalldata`     | `bytes`   | The calldata to be executed on the created contract if `initializable` is set to `true`                                                            |

#### Return Values:

| Name            | Type      | Description                                      |
| :-------------- | :-------- | :----------------------------------------------- |
| `proxyToCreate` | `address` | The address where the contract will be deployed. |

### generateSalt

```solidity
function generateSalt(bytes32 providedSalt, bool initializable, bytes memory initializeCalldata) public view virtual returns (bytes32)
```

Generates the salt used to deploy the contract by hashing the following parameters (concatenated together) with keccak256:

- the `providedSalt`
- the `initializable` boolean
- the `initializeCalldata`, only if the contract is initializable (the `initializable` boolean is set to `true`)

This approach ensures that in order to reproduce an initializable contract at the same address on another chain, not only the `providedSalt` is required to be the same, but also the initialize parameters within the `initializeCalldata` must also be the same.

This maintains consistent deployment behaviour. Users are required to initialize contracts with the same parameters across different chains to ensure contracts are deployed at the same address across different chains.

#### Parameters:

| Name                 | Type      | Description                                                                                                                                        |
| :------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `providedSalt`       | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `initializable`      | `bool`    | A boolean that indicates whether an external call should be made to initialize the contract after deployment                                       |
| `initializeCalldata` | `bytes`   | The calldata to be executed on the created contract if `initializable` is set to `true`                                                            |

#### Return Values:

| Name            | Type      | Description                                                  |
| :-------------- | :-------- | :----------------------------------------------------------- |
| `generatedSalt` | `address` | The generated salt which will be used for CREATE2 deployment |

## Events

### ContractCreated

```solidity
event ContractCreated(
    address indexed contractCreated,
    bytes32 indexed providedSalt,
    bytes32 generatedSalt,
    bool indexed initialized,
    bytes initializeCalldata
);
```

_**MUST** be fired when a contract is created successfully._

#### Values:

| Name                 | Type      | Description                                                                                                                                       |
| :------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `contractCreated`    | `address` | The address of the contract created                                                                                                               |
| `providedSalt`       | `bytes32` | The salt provided by the deployer which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `generatedSalt`      | `bytes32` | The salt used by the `CREATE2` opcode for contract deployment                                                                                     |
| `initialized`        | `bool`    | The Boolean that specifies if the contract must be initialized or not                                                                             |
| `initializeCalldata` | `bytes`   | The bytes provided as initializeCalldata (Empty string when `initialized` is set to false)                                                        |

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
