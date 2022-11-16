---
title: ERC725
sidebar_position: 3
---

# ERC725

:::info Solidity contract

[`ERC725.sol`](https://github.com/ERC725Alliance/ERC725/blob/develop/implementations/contracts/ERC725.sol)

:::

The **ERC725** is the contract combining:

- **ERC725X**: contract that allow a generic execution using different types of operations.

- **ERC725Y**: contract that allow for a generic data storage in a smart contract.

:::note
ERC725 contract also contains the method from [ERC165](https://eips.ethereum.org/EIPS/eip-165):

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

:::

---

## Functions

### constructor

```solidity
constructor(address initialOwner)
```

Sets the **initial owner** of the contract.

#### Parameters:

| Name           | Type    | Description                                      |
| :------------- | :------ | :----------------------------------------------- |
| `initialOwner` | address | The address to set as the owner of the contract. |

### owner

```solidity
function owner() public view returns (address owner)
```

Returns the address of the current owner of the smart contract.

#### Return Values:

| Name    | Type    | Description                        |
| :------ | :------ | :--------------------------------- |
| `owner` | address | The current owner of the contract. |

### transferOwnership

```solidity
function transferOwnership(address newOwner) public {
```

Transfers the ownership of the contract to the `newOwner` address.

_Triggers the **[OwnershipTransferred](#ownershiptransferred)** event when ownership is transferred._

#### Parameters:

| Name       | Type    | Description                                      |
| :--------- | :------ | :----------------------------------------------- |
| `newOwner` | address | The address to set as the owner of the contract. |


### execute - ERC725X

```solidity
function execute(
    uint256 operationType,
    address to,
    uint256 value,
    bytes memory data
) public payable returns (bytes memory result)
```

Executes a call on any other smart contracts, transfers value, or deploys a new smart contract.

The `operationType` can be the following:

- `0` for `CALL`
- `1` for `CREATE`
- `2` for `CREATE2`
- `3` for `STATICCALL`
- `4` for `DELEGATECALL`

_Triggers the **[Executed](#executed)** event when a call is successfully executed using `CALL/STATICCALL/DELEGATECALL` operations._

_Triggers the **[ContractCreated](#contractcreated)** event when a smart contract is created using `CREATE/CREATE2` operations._

:::note
The `execute(...)` function can only be called by the current owner of the contract.

The operation types `staticcall` (`3`) and `delegatecall` (`4`) do not allow to transfer value.
:::

#### Parameters:

| Name            | Type    | Description                                                                                                              |
| :-------------- | :------ | :----------------------------------------------------------------------------------------------------------------------- |
| `operationType` | uint256 | The type of operation that needs to be executed.                                                                         |
| `to`            | address | The address to interact with. The address `to` will be unused if a contract is created (operations 1 & 2).               |
| `value`         | uint256 | The amount of native tokens to transfer with the transaction (in Wei).                                                                      |
| `data`          | bytes   | The calldata (ABI-encoded payload of a function to run on an other contract), or the bytecode of the contract to deploy. |

#### Return Values:

| Name     | Type  | Description                                                                                                                            |
| :------- | :---- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `result` | bytes | The data that was returned by the function called on the external contract, or the address of the contract created (operations 1 & 2). |

### setData - ERC725Y 

```solidity
function setData(
    bytes32 dataKey,
    bytes memory dataValue
) public
```

Sets data in the account storage for a particular data key.

_Triggers the **[DataChanged](#datachanged)** event when successfully setting the data._

:::note
The `setData(...)` function can only be called by the current owner of the contract.
:::

#### Parameters:

| Name        | Type    | Description                                  |
| :---------- | :------ | :------------------------------------------- |
| `dataKey`   | bytes32 | The data key for which the data will be set. |
| `dataValue` | bytes   | The data to be set.                          |

### getData - ERC725Y 

```solidity
function getData(bytes32 dataKey) public view returns (bytes memory dataValue)
```

Retrieves the data set for the given data key.

#### Parameters:

| Name      | Type    | Description                         |
| :-------- | :------ | :---------------------------------- |
| `dataKey` | bytes32 | The data key to retrieve data from. |

#### Return Values:

| Name        | Type  | Description                          |
| :---------- | :---- | :----------------------------------- |
| `dataValue` | bytes | The data for the requested data key. |

### execute (Array) - ERC725X

```solidity
function execute(
    uint256[] memory operationsType,
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory memory datas
) public payable returns (bytes memory result)
```

Same as [`execute(uint256,address,uint256,bytes)`](#execute---erc725x) but executes a batch of calls on any other smart contracts, transferring values, or deploying new smart contracts.

The values in the list of `operationsType` can be one of the following:

- `0` for `CALL`
- `1` for `CREATE`
- `2` for `CREATE2`
- `3` for `STATICCALL`
- `4` for `DELEGATECALL`

_Triggers the **[Executed](#executed)** event on every successful call that used operation type `CALL`, `STATICCALL` or `DELEGATECALL`._

_Triggers the **[ContractCreated](#contractcreated)** event on every newly created smart contract that used operation `CREATE` or `CREATE2`._

:::note
The `execute(uint256[],address[],uint256[],bytes[])` function can only be called by the current owner of the contract.

The operation types `staticcall` (`3`) and `delegatecall` (`4`) do not allow to transfer value.
:::

#### Parameters:

| Name             | Type        | Description                                                                                                                  |
| :--------------- | :-----------| :--------------------------------------------------------------------------------------------------------------------------- |
| `operationsType` | `uint256[]` | The type of operations that need to be executed.                                                                             |
| `targets`        | `address[]` | The addresses to interact with. Unused if a contract is created (operations 1 & 2).                                          |
| `values`         | `uint256[]` | The amount of native tokens to transfer with the transaction (in Wei).                                                       |
| `datas`          | `bytes[]`   | The calldatas (ABI-encoded payloads of functions to run on other contracts), or the bytecodes of the contracts to deploy. |

#### Return Values:

| Name     | Type  | Description                                                                                                                                        |
| :------- | :---- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `results` | `bytes[]` | The datas that were returned by the functions called on the external contracts, or the addresses of the contracts created (operations 1 & 2). |


### setData (Array) - ERC725Y 

```solidity
function setData(
    bytes32[] memory dataKeys,
    bytes[] memory dataValues
) public
```

Sets an array of data at multiple data keys in the account storage.

_Triggers the **[DataChanged](#datachanged)** event when successfully setting each data key/value pair._

:::note
The `setData(...)` function can only be called by the current owner of the contract.
:::

#### Parameters:

| Name         | Type            | Description                          |
| :----------- | :-------------- | :----------------------------------- |
| `dataKeys`   | bytes32[&nbsp;] | The data keys for which to set data. |
| `dataValues` | bytes[&nbsp;]   | The array of data to set.            |

### getData (Array) - ERC725Y 

```solidity
function getData(bytes32[] memory dataKeys) public view returns (bytes[] memory dataValues)
```

Retrieves an array of data for multiple given data keys.

#### Parameters:

| Name       | Type            | Description                          |
| :--------- | :-------------- | :----------------------------------- |
| `dataKeys` | bytes32[&nbsp;] | The data keys to retrieve data from. |

#### Return Values:

| Name         | Type          | Description                                       |
| :----------- | :------------ | :------------------------------------------------ |
| `dataValues` | bytes[&nbsp;] | An array of the data for the requested data keys. |


## Events

### OwnershipTransferred

```solidity
event OwnershipTransferred(
    address previousOwner,
    address newOwner,
)
```

_**MUST** be fired when **[transferOwnership(...)](#transferownership)** function is successfully executed._

#### Values:

| Name            | Type    | Description                         |
| :-------------- | :------ | :---------------------------------- |
| `previousOwner` | address | The previous owner of the contract. |
| `newOwner`      | address | The new owner of the contract.      |


### Executed

```solidity
event Executed(
    uint256 operation,
    address to,
    uint256 value,
    bytes4 selector
)
```

_**MUST** be fired when **[`execute(...)`](#execute)** function creates a new call using the `CALL`, `STATICCALL`, or `DELEGATECALL` operation._

#### Values:

| Name        | Type    | Description                                                      |
| :---------- | :------ | :--------------------------------------------------------------- |
| `operation` | uint256 | The operation executed.                                          |
| `to`        | address | The smart contract or address interacted with.                   |
| `value`     | uint256 | The value transferred.                                           |
| `selector`  | bytes4  | The bytes4 selector of the function executed at the `to` address |

### ContractCreated

```solidity
event ContractCreated(
    uint256 operation,
    address contractAddress,
    uint256 value
)
```

_**MUST** be fired when the **[`execute(...)`](#execute)** function creates a new contract using the `CREATE` or `CREATE2` operation._

#### Values:

| Name        | Type    | Description                          |
| :---------- | :------ | :----------------------------------- |
| `operation` | uint256 | The operation executed.              |
| `to`        | address | The address of the created contract. |
| `value`     | uint256 | The value sent to the contract.      |

### DataChanged

```solidity
event DataChanged(bytes32 dataKey, bytes dataValue)
```

_**MUST** be fired when the **[`setData(...)`](#setdata)** function is successfully executed._

#### Values:

| Name        | Type    | Description                           |
| :---------- | :------ | :------------------------------------ |
| `dataKey`   | bytes32 | The data key which data value is set. |
| `dataValue` | bytes   | The data value to set.                |


## References

- [ERC725 (Standard Specification, GitHub)](https://github.com/ERC725Alliance/ERC725/blob/develop/docs/ERC-725.md)
- [Solidity implementations (GitHub)](https://github.com/ERC725Alliance/ERC725/tree/develop/implementations)
