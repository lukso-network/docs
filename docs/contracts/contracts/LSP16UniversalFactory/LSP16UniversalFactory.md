<!-- This file is auto-generated. Do not edit! -->
<!-- Check `@lukso-network/lsp-smart-contracts/CONTRIBUTING.md#solidity-code-comments` for more information. -->

# LSP16UniversalFactory

:::info Standard Specifications

[`LSP-16-UniversalFactory`](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md)

:::
:::info Solidity implementation

[`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)

:::

> LSP16 Universal Factory

Factory contract to deploy different types of contracts using the CREATE2 opcode standardized as LSP16

- UniversalFactory: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-16-UniversalFactory.md The UniversalFactory will be deployed using Nick's Factory (0x4e59b44847b379578588920ca78fbf26c0b4956c) The deployed address can be found in the LSP16 specification. Please refer to the LSP16 Specification to obtain the exact creation bytecode and salt that should be used to produce the address of the UniversalFactory on different chains. This factory contract is designed to deploy contracts at the same address on multiple chains. The UniversalFactory can deploy 2 types of contracts:

- non-initializable (normal deployment)

- initializable (external call after deployment, e.g: proxy contracts) The `providedSalt` parameter given by the deployer is not used directly as the salt by the CREATE2 opcode. Instead, it is used along with these parameters:

- `initializable` boolean

- `initializeCalldata` (when the contract is initializable and `initializable` is set to `true`). These three parameters are concatenated together and hashed to generate the final salt for CREATE2. See [`generateSalt`](#generatesalt) function for more details. The constructor and `initializeCalldata` SHOULD NOT include any network-specific parameters (e.g: chain-id, a local token contract address), otherwise the deployed contract will not be recreated at the same address across different networks, thus defeating the purpose of the UniversalFactory. One way to solve this problem is to set an EOA owner in the `initializeCalldata`/constructor that can later call functions that set these parameters as variables in the contract. The UniversalFactory must be deployed at the same address on different chains to successfully deploy contracts at the same address across different chains.

## Public Methods

Public methods are accessible externally from users, allowing interaction with this function from dApps or other smart contracts.
When marked as 'public', a method can be called both externally and internally, on the other hand, when marked as 'external', a method can only be called externally.

### computeAddress

:::note References

- Specification details: [**LSP-16-UniversalFactory**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md#computeaddress)
- Solidity implementation: [`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)
- Function signature: `computeAddress(bytes32,bytes32,bool,bytes)`
- Function selector: `0x3b315680`

:::

```solidity
function computeAddress(
  bytes32 creationBytecodeHash,
  bytes32 providedSalt,
  bool initializable,
  bytes initializeCalldata
) external view returns (address);
```

Computes the address of a contract to be deployed using CREATE2, based on the input parameters. Any change in one of these parameters will result in a different address. When the `initializable` boolean is set to `false`, `initializeCalldata` will not affect the function output.

#### Parameters

| Name                   |   Type    | Description                                                                                                                                        |
| ---------------------- | :-------: | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `creationBytecodeHash` | `bytes32` | The keccak256 hash of the creation bytecode to be deployed                                                                                         |
| `providedSalt`         | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `initializable`        |  `bool`   | A boolean that indicates whether an external call should be made to initialize the contract after deployment                                       |
| `initializeCalldata`   |  `bytes`  | The calldata to be executed on the created contract if `initializable` is set to `true`                                                            |

#### Returns

| Name |   Type    | Description                                     |
| ---- | :-------: | ----------------------------------------------- |
| `0`  | `address` | The address where the contract will be deployed |

<br/>

### computeERC1167Address

:::note References

- Specification details: [**LSP-16-UniversalFactory**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md#computeerc1167address)
- Solidity implementation: [`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)
- Function signature: `computeERC1167Address(address,bytes32,bool,bytes)`
- Function selector: `0xe888edcb`

:::

```solidity
function computeERC1167Address(
  address implementationContract,
  bytes32 providedSalt,
  bool initializable,
  bytes initializeCalldata
) external view returns (address);
```

Computes the address of an ERC1167 proxy contract based on the input parameters. Any change in one of these parameters will result in a different address. When the `initializable` boolean is set to `false`, `initializeCalldata` will not affect the function output.

#### Parameters

| Name                     |   Type    | Description                                                                                                                                        |
| ------------------------ | :-------: | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `implementationContract` | `address` | The contract to create a clone of according to ERC1167                                                                                             |
| `providedSalt`           | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `initializable`          |  `bool`   | A boolean that indicates whether an external call should be made to initialize the proxy contract after deployment                                 |
| `initializeCalldata`     |  `bytes`  | The calldata to be executed on the created contract if `initializable` is set to `true`                                                            |

#### Returns

| Name |   Type    | Description                                                   |
| ---- | :-------: | ------------------------------------------------------------- |
| `0`  | `address` | The address where the ERC1167 proxy contract will be deployed |

<br/>

### deployCreate2

:::note References

- Specification details: [**LSP-16-UniversalFactory**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md#deploycreate2)
- Solidity implementation: [`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)
- Function signature: `deployCreate2(bytes,bytes32)`
- Function selector: `0x26736355`

:::

```solidity
function deployCreate2(
  bytes creationBytecode,
  bytes32 providedSalt
) external payable returns (address);
```

_Deploys a smart contract._

Deploys a contract using the CREATE2 opcode. The address where the contract will be deployed can be known in advance via the [`computeAddress`](#computeaddress) function. This function deploys contracts without initialization (external call after deployment). The `providedSalt` parameter is not used directly as the salt by the CREATE2 opcode. Instead, it is hashed with keccak256: `keccak256(abi.encodePacked(false, providedSalt))`. See [`generateSalt`](#generatesalt) function for more details. Using the same `creationBytecode` and `providedSalt` multiple times will revert, as the contract cannot be deployed twice at the same address. If the constructor of the contract to deploy is payable, value can be sent to this function to fund the created contract. However, sending value to this function while the constructor is not payable will result in a revert.

#### Parameters

| Name               |   Type    | Description                                                                                                                                        |
| ------------------ | :-------: | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `creationBytecode` |  `bytes`  | The creation bytecode of the contract to be deployed                                                                                               |
| `providedSalt`     | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |

#### Returns

| Name |   Type    | Description                          |
| ---- | :-------: | ------------------------------------ |
| `0`  | `address` | The address of the deployed contract |

<br/>

### deployCreate2AndInitialize

:::note References

- Specification details: [**LSP-16-UniversalFactory**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md#deploycreate2andinitialize)
- Solidity implementation: [`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)
- Function signature: `deployCreate2AndInitialize(bytes,bytes32,bytes,uint256,uint256)`
- Function selector: `0xcdbd473a`

:::

```solidity
function deployCreate2AndInitialize(
  bytes creationBytecode,
  bytes32 providedSalt,
  bytes initializeCalldata,
  uint256 constructorMsgValue,
  uint256 initializeCalldataMsgValue
) external payable returns (address);
```

_Deploys a smart contract and initializes it._

Deploys a contract using the CREATE2 opcode. The address where the contract will be deployed can be known in advance via the [`computeAddress`](#computeaddress) function. This function deploys contracts with initialization (external call after deployment). The `providedSalt` parameter is not used directly as the salt by the CREATE2 opcode. Instead, it is hashed with keccak256: `keccak256(abi.encodePacked(true, initializeCalldata, providedSalt))`. See [`generateSalt`](#generatesalt) function for more details. Using the same `creationBytecode`, `providedSalt` and `initializeCalldata` multiple times will revert, as the contract cannot be deployed twice at the same address. If the constructor or the initialize function of the contract to deploy is payable, value can be sent along with the deployment/initialization to fund the created contract. However, sending value to this function while the constructor/initialize function is not payable will result in a revert. Will revert if the `msg.value` sent to the function is not equal to the sum of `constructorMsgValue` and `initializeCalldataMsgValue`.

#### Parameters

| Name                         |   Type    | Description                                                                                                                                        |
| ---------------------------- | :-------: | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `creationBytecode`           |  `bytes`  | The creation bytecode of the contract to be deployed                                                                                               |
| `providedSalt`               | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `initializeCalldata`         |  `bytes`  | The calldata to be executed on the created contract                                                                                                |
| `constructorMsgValue`        | `uint256` | The value sent to the contract during deployment                                                                                                   |
| `initializeCalldataMsgValue` | `uint256` | The value sent to the contract during initialization                                                                                               |

#### Returns

| Name |   Type    | Description                          |
| ---- | :-------: | ------------------------------------ |
| `0`  | `address` | The address of the deployed contract |

<br/>

### deployERC1167Proxy

:::note References

- Specification details: [**LSP-16-UniversalFactory**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md#deployerc1167proxy)
- Solidity implementation: [`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)
- Function signature: `deployERC1167Proxy(address,bytes32)`
- Function selector: `0x49d8abed`

:::

```solidity
function deployERC1167Proxy(
  address implementationContract,
  bytes32 providedSalt
) external nonpayable returns (address);
```

_Deploys a proxy smart contract._

Deploys an ERC1167 minimal proxy contract using the CREATE2 opcode. The address where the contract will be deployed can be known in advance via the [`computeERC1167Address`](#computeerc1167address) function. This function deploys contracts without initialization (external call after deployment). The `providedSalt` parameter is not used directly as the salt by the CREATE2 opcode. Instead, it is hashed with keccak256: `keccak256(abi.encodePacked(false, providedSalt))`. See [`generateSalt`](#generatesalt) function for more details. Using the same `implementationContract` and `providedSalt` multiple times will revert, as the contract cannot be deployed twice at the same address. Sending value to the contract created is not possible since the constructor of the ERC1167 minimal proxy is not payable.

#### Parameters

| Name                     |   Type    | Description                                                                                                                                        |
| ------------------------ | :-------: | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `implementationContract` | `address` | The contract address to use as the base implementation behind the proxy that will be deployed                                                      |
| `providedSalt`           | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |

#### Returns

| Name |   Type    | Description                               |
| ---- | :-------: | ----------------------------------------- |
| `0`  | `address` | The address of the minimal proxy deployed |

<br/>

### deployERC1167ProxyAndInitialize

:::note References

- Specification details: [**LSP-16-UniversalFactory**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md#deployerc1167proxyandinitialize)
- Solidity implementation: [`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)
- Function signature: `deployERC1167ProxyAndInitialize(address,bytes32,bytes)`
- Function selector: `0x5340165f`

:::

```solidity
function deployERC1167ProxyAndInitialize(
  address implementationContract,
  bytes32 providedSalt,
  bytes initializeCalldata
) external payable returns (address);
```

_Deploys a proxy smart contract and initializes it._

Deploys an ERC1167 minimal proxy contract using the CREATE2 opcode. The address where the contract will be deployed can be known in advance via the [`computeERC1167Address`](#computeerc1167address) function. This function deploys contracts with initialization (external call after deployment). The `providedSalt` parameter is not used directly as the salt by the CREATE2 opcode. Instead, it is hashed with keccak256: `keccak256(abi.encodePacked(true, initializeCalldata, providedSalt))`. See [`generateSalt`](#generatesalt) function for more details. Using the same `implementationContract`, `providedSalt` and `initializeCalldata` multiple times will revert, as the contract cannot be deployed twice at the same address. If the initialize function of the contract to deploy is payable, value can be sent along to fund the created contract while initializing. However, sending value to this function while the initialize function is not payable will result in a revert.

#### Parameters

| Name                     |   Type    | Description                                                                                                                                        |
| ------------------------ | :-------: | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `implementationContract` | `address` | The contract address to use as the base implementation behind the proxy that will be deployed                                                      |
| `providedSalt`           | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `initializeCalldata`     |  `bytes`  | The calldata to be executed on the created contract                                                                                                |

#### Returns

| Name |   Type    | Description                               |
| ---- | :-------: | ----------------------------------------- |
| `0`  | `address` | The address of the minimal proxy deployed |

<br/>

### generateSalt

:::note References

- Specification details: [**LSP-16-UniversalFactory**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md#generatesalt)
- Solidity implementation: [`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)
- Function signature: `generateSalt(bytes32,bool,bytes)`
- Function selector: `0x1a17ccbf`

:::

```solidity
function generateSalt(
  bytes32 providedSalt,
  bool initializable,
  bytes initializeCalldata
) external pure returns (bytes32);
```

Generates the salt used to deploy the contract by hashing the following parameters (concatenated together) with keccak256:

1. the `providedSalt`

2. the `initializable` boolean

3. the `initializeCalldata`, only if the contract is initializable (the `initializable` boolean is set to `true`)

- The `providedSalt` parameter is not used directly as the salt by the CREATE2 opcode. Instead, it is used along with these parameters:

1. `initializable` boolean

2. `initializeCalldata` (when the contract is initializable and `initializable` is set to `true`).

- This approach ensures that in order to reproduce an initializable contract at the same address on another chain, not only the `providedSalt` is required to be the same, but also the initialize parameters within the `initializeCalldata` must also be the same. This maintains consistent deployment behaviour. Users are required to initialize contracts with the same parameters across different chains to ensure contracts are deployed at the same address across different chains.

1. Example (for initializable contracts)

- For an existing contract A on chain 1 owned by X, to replicate the same contract at the same address with the same owner X on chain 2, the salt used to generate the address should include the initializeCalldata that assigns X as the owner of contract A.

- For instance, if another user, Y, tries to deploy the contract at the same address on chain 2 using the same providedSalt, but with a different initializeCalldata to make Y the owner instead of X, the generated address would be different, preventing Y from deploying the contract with different ownership at the same address.

- However, for non-initializable contracts, if the constructor has arguments that specify the deployment behavior, they will be included in the creation bytecode. Any change in the constructor arguments will lead to a different contract's creation bytecode which will result in a different address on other chains.

2. Example (for non-initializable contracts)

- If a contract is deployed with specific constructor arguments on chain 1, these arguments are embedded within the creation bytecode. For instance, if contract B is deployed with a specific `tokenName` and `tokenSymbol` on chain 1, and a user wants to deploy the same contract with the same `tokenName` and `tokenSymbol` on chain 2, they must use the same constructor arguments to produce the same creation bytecode. This ensures that the same deployment behaviour is maintained across different chains, as long as the same creation bytecode is used.

- If another user Z, tries to deploy the same contract B at the same address on chain 2 using the same `providedSalt` but different constructor arguments (a different `tokenName` and/or `tokenSymbol`), the generated address will be different. This prevents user Z from deploying the contract with different constructor arguments at the same address on chain 2.

- The providedSalt was hashed to produce the salt used by CREATE2 opcode to prevent users from deploying initializable contracts using non-initializable functions such as [`deployCreate2`](#deploycreate2) without having the initialization call.

- In other words, if the providedSalt was not hashed and was used as it is as the salt by the CREATE2 opcode, malicious users can check the generated salt used for the already deployed initializable contract on chain 1, and deploy the contract from [`deployCreate2`](#deploycreate2) function on chain 2, with passing the generated salt of the deployed contract as providedSalt that will produce the same address but without the initialization, where the malicious user can initialize after.

#### Parameters

| Name                 |   Type    | Description                                                                                                                                        |
| -------------------- | :-------: | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `providedSalt`       | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment |
| `initializable`      |  `bool`   | The Boolean that specifies if the contract must be initialized or not                                                                              |
| `initializeCalldata` |  `bytes`  | The calldata to be executed on the created contract if `initializable` is set to `true`                                                            |

#### Returns

| Name |   Type    | Description                                                  |
| ---- | :-------: | ------------------------------------------------------------ |
| `0`  | `bytes32` | The generated salt which will be used for CREATE2 deployment |

<br/>

## Internal Methods

Any method labeled as `internal` serves as utility function within the contract. They can be used when writing solidity contracts that inherit from this contract. These methods can be extended or modified by overriding their internal behavior to suit specific needs.

Internal functions cannot be called externally, whether from other smart contracts, dApp interfaces, or backend services. Their restricted accessibility ensures that they remain exclusively available within the context of the current contract, promoting controlled and encapsulated usage of these internal utilities.

### \_verifyCallResult

```solidity
function _verifyCallResult(bool success, bytes returndata) internal pure;
```

Verifies that the contract created was initialized correctly.
Bubble the revert reason if present, revert with `ContractInitializationFailed` otherwise.

<br/>

## Events

### ContractCreated

:::note References

- Specification details: [**LSP-16-UniversalFactory**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md#contractcreated)
- Solidity implementation: [`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)
- Event signature: `ContractCreated(address,bytes32,bytes32,bool,bytes)`
- Event topic hash: `0x8872a323d65599f01bf90dc61c94b4e0cc8e2347d6af4122fccc3e112ee34a84`

:::

```solidity
event ContractCreated(address indexed createdContract, bytes32 indexed providedSalt, bytes32 generatedSalt, bool indexed initialized, bytes initializeCalldata);
```

_Contract created. Contract address: `createdContract`._

Emitted whenever a contract is created.

#### Parameters

| Name                            |   Type    | Description                                                                                                                                         |
| ------------------------------- | :-------: | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createdContract` **`indexed`** | `address` | The address of the contract created.                                                                                                                |
| `providedSalt` **`indexed`**    | `bytes32` | The salt provided by the deployer, which will be used to generate the final salt that will be used by the `CREATE2` opcode for contract deployment. |
| `generatedSalt`                 | `bytes32` | The salt used by the `CREATE2` opcode for contract deployment.                                                                                      |
| `initialized` **`indexed`**     |  `bool`   | The Boolean that specifies if the contract must be initialized or not.                                                                              |
| `initializeCalldata`            |  `bytes`  | The bytes provided as initializeCalldata (Empty string when `initialized` is set to false).                                                         |

<br/>

## Errors

### ContractInitializationFailed

:::note References

- Specification details: [**LSP-16-UniversalFactory**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md#contractinitializationfailed)
- Solidity implementation: [`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)
- Error signature: `ContractInitializationFailed()`
- Error hash: `0xc1ee8543`

:::

```solidity
error ContractInitializationFailed();
```

_Couldn't initialize the contract._

Reverts when there is no revert reason bubbled up by the created contract when initializing

<br/>

### InvalidValueSum

:::note References

- Specification details: [**LSP-16-UniversalFactory**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-16-UniversalFactory.md#invalidvaluesum)
- Solidity implementation: [`LSP16UniversalFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP16UniversalFactory/LSP16UniversalFactory.sol)
- Error signature: `InvalidValueSum()`
- Error hash: `0x2fd9ca91`

:::

```solidity
error InvalidValueSum();
```

Reverts when `msg.value` sent to [`deployCreate2AndInitialize(..)`](#deploycreate2andinitialize) function is not equal to the sum of the `initializeCalldataMsgValue` and `constructorMsgValue`

<br/>

<!-- GLOBAL LINKS -->

<!-- prettier-ignore-start -->

<!-- SPECS -->

[ERC-165]: https://eips.ethereum.org/EIPS/eip-165
[EIP-165]: https://eips.ethereum.org/EIPS/eip-165
[ERC-173]: https://eips.ethereum.org/EIPS/eip-173
[EIP-173]: https://eips.ethereum.org/EIPS/eip-173
[ERC-191]: https://eips.ethereum.org/EIPS/eip-191
[EIP-191]: https://eips.ethereum.org/EIPS/eip-191
[ERC-725X]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#ERC725X
[ERC-725Y]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#ERC725Y
[ERC-725]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md
[ERC-1271]: https://eips.ethereum.org/EIPS/eip-1271
[EIP-1271]: https://eips.ethereum.org/EIPS/eip-1271
[LSP-0-ERC725Account]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-0-ERC725Account.md
[LSP-1-UniversalReceiver]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-1-UniversalReceiver.md
[LSP-2-ERC725YJSONSchema]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-2-ERC725YJSONSchema.md
[LSP-3-UniversalProfile-Metadata]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-3-UniversalProfile-Metadata.md
[LSP-4-DigitalAsset-Metadata]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-4-DigitalAsset-Metadata.md
[LSP-5-ReceivedAssets]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-5-ReceivedAssets.md
[LSP-6-KeyManager]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-6-KeyManager.md
[LSP-7-DigitalAsset]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-7-DigitalAsset.md
[LSP-8-IdentifiableDigitalAsset]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md
[LSP-9-Vault.md]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-9-Vault.md.md
[LSP-10-ReceivedVaults]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-10-ReceivedVaults.md
[LSP-11-BasicSocialRecovery]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-11-BasicSocialRecovery.md
[LSP-12-IssuedAssets]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-12-IssuedAssets.md
[LSP-14-Ownable2Step]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-14-Ownable2Step.md
[LSP-15-TransactionRelayServiceAPI]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-15-TransactionRelayServiceAPI.md
[LSP-16-UniversalFactory]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-16-UniversalFactory.md
[LSP-17-ContractExtension]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-17-ContractExtension.md
[LSP-20-CallVerification]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-20-CallVerification.md

<!-- DOCS -->

[ERC725]: https://docs.lukso.tech/standards/lsp-background/erc725
[UniversalProfile]: https://docs.lukso.tech/standards/universal-profile/introduction
[LSP0ERC725Account]: https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account
[LSP1UniversalReceiver]: https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver
[LSP1UniversalReceiverDelegate]: https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver-delegate
[LSP2ERC725YJSONSchema]: https://docs.lukso.tech/standards/generic-standards/lsp2-json-schema
[LSP4DigitalAssetMetadata]: https://docs.lukso.tech/standards/tokens/LSP4-Digital-Asset-Metadata
[LSP5ReceivedVaults]: https://docs.lukso.tech/standards/universal-profile/lsp5-received-assets
[LSP6KeyManager]: https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager
[LSP7DigitalAsset]: https://docs.lukso.tech/standards/tokens/LSP7-Digital-Asset
[LSP8IdentifiableDigitalAsset]: https://docs.lukso.tech/standards/tokens/LSP8-Identifiable-Digital-Asset
[LSP10ReceivedVaults]: https://docs.lukso.tech/standards/universal-profile/lsp10-received-vaults
[LSP14Ownable2Step]: https://docs.lukso.tech/standards/generic-standards/lsp14-ownable-2-step
[LSP17ContractExtension]: https://docs.lukso.tech/standards/generic-standards/lsp17-contract-extension
[LSP20CallVerification]: https://docs.lukso.tech/standards/generic-standards/lsp20-call-verification

<!-- DATA KEYS -->

[_LSP17_EXTENSION_PREFIX]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md#lsp17extendable-specification
[_LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md#specification-1
[_LSP1_UNIVERSAL_RECEIVER_DELEGATE_PREFIX]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md#specification-1

<!-- LSP1 TYPE IDS -->

[LSP0OwnershipTransferStarted]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#transferownership
[LSP0OwnershipTransferred_SenderNotification]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#acceptownership
[LSP0OwnershipTransferred_RecipientNotification]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#acceptownership

<!-- ERC725 LIBRARY -->

[`ERC725.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725.sol
[`ERC725Init.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725Init.sol
[`ERC725InitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725InitAbstract
[`IERC725X.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/interfaces/IERC725X.sol
[`ERC725X.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725X.sol
[`ERC725XCore.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XCore.sol
[`ERC725XInit.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XInit.sol
[`ERC725XInitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XInitAbstract.sol
[`IERC725Y.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/interfaces/IERC725Y.sol
[`ERC725Y.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725Y.sol
[`ERC725YCore.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YCore.sol
[`ERC725YInit.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YInit.sol
[`ERC725YInitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YInitAbstract.soll
[`OwnableUnset.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/custom/OwnableUnset.sol

<!-- EXTERNAL LIBRARIES -->

[`Create2.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/Create2.sol
[`ECDSA.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/cryptography/ECDSA.sol
[`ERC165Checker.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/introspection/ERC165Checker.sol
[`Address.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/Address.sol
[`ERC165.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/introspection/ERC165.sol
[`EnumerableSet.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/structs/EnumerableSet.so
[`Initializable.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/v4.9.2/contracts/proxy/utils/Initializable.sol
[`BytesLib.sol`]: https://github.com/GNSPS/solidity-bytes-utils/blob/v0.8.0/contracts/BytesLib.sol

<!-- SOLIDITY IMPLEMENTATION -->

[`LSP0ERC725AccountCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol
[`LSP0Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0Utils.sol
[`LSP0ERC725AccountInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountInitAbstract.sol
[`ILSP0ERC725Account.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/ILSP0ERC725Account.sol
[`LSP0ERC725Account.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725Account.sol
[`LSP0ERC725AccountInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountInit.sol
[`LSP0Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0Constants.sol
[`UniversalProfileInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/UniversalProfileInitAbstract.sol
[`UniversalProfile.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/UniversalProfile.sol
[`UniversalProfileInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/UniversalProfileInit.sol
[`LSP1UniversalReceiverDelegateUP.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol
[`LSP1Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1Utils.sol
[`LSP1UniversalReceiverDelegateVault.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateVault/LSP1UniversalReceiverDelegateVault.sol
[`ILSP1UniversalReceiver.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/ILSP1UniversalReceiver.sol
[`LSP1Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1Constants.sol
[`LSP1Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1Errors.sol
[`LSP4DigitalAssetMetadataInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadataInitAbstract.sol
[`LSP4DigitalAssetMetadata.sol`]: chttps://github.com/code-423n4/2023-06-lukso/tree/main/ontracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol
[`LSP4Compatibility.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Compatibility.sol
[`LSP4Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol
[`ILSP4Compatibility.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/ILSP4Compatibility.sol
[`LSP4Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Errors.sol
[`LSP6SetDataModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol
[`LSP6KeyManagerCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol
[`LSP6ExecuteModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6ExecuteModule.sol
[`LSP6Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Utils.sol
[`LSP6Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Constants.sol
[`ILSP6KeyManager.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/ILSP6KeyManager.sol
[`LSP6Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Errors.sol
[`LSP6OwnershipModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6OwnershipModule.sol
[`LSP6KeyManagerInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerInitAbstract.sol
[`LSP6KeyManager.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManager.sol
[`LSP6KeyManagerInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerInit.sol
[`LSP7DigitalAssetCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol
[`LSP7CompatibleERC20InitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CompatibleERC20InitAbstract.sol
[`LSP7CompatibleERC20.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CompatibleERC20.sol
[`ILSP7DigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol
[`LSP7DigitalAssetInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAssetInitAbstract.sol
[`LSP7CappedSupply.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupply.sol
[`LSP7CappedSupplyInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupplyInitAbstract.sol
[`LSP7DigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol
[`LSP7MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7MintableInitAbstract.sol
[`LSP7CompatibleERC20MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInitAbstract.sol
[`LSP7Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol
[`LSP7CompatibleERC20Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol
[`LSP7Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7Errors.sol
[`LSP7CompatibleERC20MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInit.sol
[`LSP7MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7MintableInit.sol
[`ILSP7CompatibleERC20.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/ILSP7CompatibleERC20.sol
[`ILSP7Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/ILSP7Mintable.sol
[`LSP7Burnable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.sol
[`LSP7BurnableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7BurnableInitAbstract.sol
[`LSP7Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7Constants.sol
[`LSP8IdentifiableDigitalAssetCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol
[`LSP8CompatibleERC721InitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol
[`LSP8CompatibleERC721.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol
[`ILSP8IdentifiableDigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/ILSP8IdentifiableDigitalAsset.sol
[`LSP8EnumerableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8EnumerableInitAbstract.sol
[`LSP8Enumerable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol
[`LSP8CappedSupplyInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupplyInitAbstract.sol
[`LSP8CappedSupply.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupply.sol
[`LSP8IdentifiableDigitalAssetInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetInitAbstract.sol
[`LSP8MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableInitAbstract.sol
[`ILSP8CompatibleERC721.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/ILSP8CompatibleERC721.sol
[`LSP8IdentifiableDigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol
[`LSP8CompatibleERC721MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInitAbstract.s
[`LSP8Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol
[`LSP8CompatibleERC721Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721Mintable.sol
[`LSP8CompatibleERC721MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInit.sol
[`LSP8Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8Errors.sol
[`LSP8MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableInit.sol
[`LSP8Burnable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.sol
[`ILSP8Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/ILSP8Mintable.sol
[`LSP8Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.s
[`LSP14Ownable2Step.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol
[`ILSP14Ownable2Step.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/ILSP14Ownable2Step.sol
[`LSP14Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/LSP14Constants.sol
[`LSP14Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/LSP14Errors.sol
[`LSP17Extendable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Extendable.sol
[`LSP17Extension.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Extension.sol
[`LSP17Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Constants.sol
[`LSP17Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Errors.sol
[`LSP17Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Utils.sol
[`LSP20CallVerification.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/LSP20CallVerification.sol
[`ILSP20CallVerifier.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/ILSP20CallVerifier.sol
[`LSP20Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/LSP20Constants.sol
[`LSP20Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/LSP20Errors.sol
[`LSP2Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol
[`LSP5Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP5ReceivedAssets/LSP5Utils.sol
[`LSP5Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP5ReceivedAssets/LSP5Constants.sol
[`LSP10Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP10ReceivedVaults/LSP10Utils.sol
[`LSP10Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP10ReceivedVaults/LSP10Constants.sol

<!-- prettier-ignore-end -->
