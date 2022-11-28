---
title: LSP0ERC725Account
sidebar_position: 4
---

# LSP0ERC725Account

:::info Solidity contract

[`LSP0ERC725Account.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol)

:::

The **LSP0ERC725Account** contract is an implementation for the **[LSP0-ERC725Account Standard](../universal-profile/lsp0-erc725account)**. This contract forms a **Universal Profile** when combined with **[LSP3-UniversalProfile-Metadata Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)**.

This contract could be used as a _blockchain-based account_ by humans, machines, organizations, or even other smart contracts. It has all the basic functionalities of an _Externally Owned Account_ (EOA), as well as the following functions that give the contract additional features:

- [`execute(...)`](#execute) : enables to execute functions on other contracts, transfer value, or deploy new contracts.
- [`isValidSignature(...)`](#isvalidsignature): delivers verification of signatures and signed messages from EOAs.
- [`universalReceiver(...)`](#universalreceiver): brings notification of incoming calls and assets.
- [`setData(...)`](#setdata): offers to set information in the account storage.

:::note
LSP0ERC725Account contract also contains the method from [ERC165](https://eips.ethereum.org/EIPS/eip-165):

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

Returns the address of the current owner of the contract.

#### Return Values:

| Name    | Type    | Description                        |
| :------ | :------ | :--------------------------------- |
| `owner` | address | The current owner of the contract. |

### pendingOwner

```solidity
function pendingOwner() public view returns (address)
```

Return the address of the pending owner that was initiated by [`transferOwnership(address)`](#transferownership).

> **NB:** if no ownership transfer is in progress, the `pendingOwner` MUST be `address(0)`.

#### Return Values:

| Name           | Type    | Description                      |
| :------------- | :------ | :------------------------------- |
| `pendingOwner` | address | The address of the pending owner |

### transferOwnership

```solidity
function transferOwnership(address newOwner) public
```

Initiate an ownership transfer by setting the `newOwner` as `pendingOwner`.

Requirements:

- Can only be called by the current owner.
- The `newOwner` to be set as the `pendingOwner` cannot be `address(this)`.

#### Parameters:

| Name       | Type    | Description                           |
| :--------- | :------ | :------------------------------------ |
| `newOwner` | address | The address to set as `pendingOwner`. |

### acceptOwnership

```solidity
function acceptOwnership() public
```

Transfers ownership of the contract to the `pendingOwner` address. Can only be called by the `pendingOwner`.

Once ownership of the contract has been transfered, this function will clear the address stored under the `pendingOwner`.

Requirements:

- MUST be called by the `pendingOwner` only.
- The `acceptOwnership` function cannot be called in the same transaction as [`transferOwnership`](#transferownership). It MUST be called in a separate transaction.

_Triggers the **[OwnershipTransferred](#ownershiptransferred)** event once the new owner has claimed ownership._

### renounceOwnership

```solidity
function renounceOwnership() public
```

Since renouncing ownership is a sensitive operation, it is done as a two-step process by calling `renounceOwnership(..)` twice. First to initiate the process, second as a confirmation.

The current block number is saved as a part of initiation because the following behaviour is wanted:

- The first 100 blocks after the saved block is the pending period, if you call `renounceOwnership(..)` during this period, the transaction will be reverted.
- the following 100 blocks is the period when you can confirm the renouncement of the contract by calling `renounceOwnership(..)` the second time.

Calling the `renounceOwnership` function at the initiation stage will also clear any address previously set as `pendingOwner`.

_Triggers the **[RenounceOwnershipInitiated](#renounceownershipinitiated)** event in the first call._

_Triggers the **[OwnershipTransferred](#ownershiptransferred)** event after successfully renouncing ownership._

:::warning
Leaves the contract without an owner. Once ownership of the contract is renounced, it won't be possible to call the functions restricted to the owner only.
:::

### fallback

```solidity
fallback() external payable
```

Executed when value is transferred to the contract or when function identifier doesn't match any of the available functions.

_Triggers the **[ValueReceived](#valuereceived)** event when receiving native tokens._

### execute

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

_Triggers the **[ValueReceived](#valuereceived)** event when sending native tokens while calling the function._

:::note
The `execute(...)` function can only be called by the current owner of the contract.

The operation types `staticcall` (`3`) and `delegatecall` (`4`) do not allow to transfer value.
:::

#### Parameters:

| Name            | Type    | Description                                                                                                              |
| :-------------- | :------ | :----------------------------------------------------------------------------------------------------------------------- |
| `operationType` | uint256 | The type of operation that needs to be executed.                                                                         |
| `to`            | address | The address to interact with. The address `to` will be unused if a contract is created (operations 1 & 2).               |
| `value`         | uint256 | The amount of native tokens to transfer with the transaction (in Wei).                                                   |
| `data`          | bytes   | The calldata (ABI-encoded payload of a function to run on an other contract), or the bytecode of the contract to deploy. |

#### Return Values:

| Name     | Type  | Description                                                                                                                            |
| :------- | :---- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `result` | bytes | The data that was returned by the function called on the external contract, or the address of the contract created (operations 1 & 2). |

### setData

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

### getData

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

### execute (Array)

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

_Triggers the **[ValueReceived](#valuereceived)** event when sending native tokens while calling the function._

:::note
The `execute(uint256[],address[],uint256[],bytes[])` function can only be called by the current owner of the contract.

The operation types `staticcall` (`3`) and `delegatecall` (`4`) do not allow to transfer value.
:::

#### Parameters:

| Name             | Type        | Description                                                                                                               |
| :--------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------ |
| `operationsType` | `uint256[]` | The type of operations that need to be executed.                                                                          |
| `targets`        | `address[]` | The addresses to interact with. Unused if a contract is created (operations 1 & 2).                                       |
| `values`         | `uint256[]` | The amount of native tokens to transfer with the transaction (in Wei).                                                    |
| `datas`          | `bytes[]`   | The calldatas (ABI-encoded payloads of functions to run on other contracts), or the bytecodes of the contracts to deploy. |

#### Return Values:

| Name      | Type      | Description                                                                                                                                   |
| :-------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `results` | `bytes[]` | The datas that were returned by the functions called on the external contracts, or the addresses of the contracts created (operations 1 & 2). |

### setData (Array)

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

### getData (Array)

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

### universalReceiver

```solidity
function universalReceiver(
    bytes32 typeId,
    bytes memory data
) public payable returns (bytes memory result)
```

Forwards the call to the **UniversalReceiverDelegate** contract if its address is stored at the [LSP1UniversalReceiverDelegate](../generic-standards/lsp1-universal-receiver.md#extension) data Key. The contract being called is expected to be an **[LSP1UniversalReceiverDelegateUP](./lsp1-universal-receiver-delegate-up.md)**, supporting [LSP1UniversalReceiverDelegate InterfaceId](./interface-ids.md) using [ERC165](https://eips.ethereum.org/EIPS/eip-165).

_Triggers the **[UniversalReceiver](#universalreceiver-1)** event when this function gets successfully executed._

_Triggers the **[ValueReceived](#valuereceived)** event when sending native tokens while calling the function._

#### Parameters:

| Name     | Type    | Description                    |
| :------- | :------ | :----------------------------- |
| `typeId` | bytes32 | The type of transfer received. |
| `data`   | bytes   | The data received.             |

#### Return Values:

| Name     | Type  | Description                            |
| :------- | :---- | :------------------------------------- |
| `result` | bytes | Can be used to encode response values. |

### isValidSignature

```solidity
function isValidSignature(
    bytes32 hash,
    bytes memory signature
) public view returns (bytes4 magicValue)
```

Checks if a signature was signed by the `owner` of the contract, according to [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271). If the `owner` is a contract itself, it will call the `isValidsignature(..)` function on the owner contract, if it supports [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271). Otherwise it will return the failure value.

#### Parameters:

| Name        | Type    | Description                                           |
| :---------- | :------ | :---------------------------------------------------- |
| `hash`      | bytes32 | The hash of the data signed on the behalf of address. |
| `signature` | bytes   | The Owner's signature(s) of the data.                 |

#### Return Values:

| Name         | Type   | Description                                                            |
| :----------- | :----- | :--------------------------------------------------------------------- |
| `magicValue` | bytes4 | The magicValue either `0x1626ba7e` on success or `0xffffffff` failure. |

## Events

### OwnershipTransferStarted

```solidity
event OwnershipTransferred(
    address indexed currentOwner,
    address indexed newOwner,
)
```

_**MUST** be fired when the **[`transferOwnership(...)`](#transferownership)** function is successfully initiated._

#### Values:

| Name           | Type    | Description                              |
| :------------- | :------ | :--------------------------------------- |
| `currentOwner` | address | The current owner of the contract.       |
| `newOwner`     | address | The potential new owner of the contract. |

### OwnershipTransferred

```solidity
event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner,
)
```

_**MUST** be fired when the **[`transferOwnership(...)`](#transferownership)** function is successfully executed._

#### Values:

| Name            | Type    | Description                         |
| :-------------- | :------ | :---------------------------------- |
| `previousOwner` | address | The previous owner of the contract. |
| `newOwner`      | address | The new owner of the contract.      |

### RenounceOwnershipStarted

```solidity
event RenounceOwnershipStarted()
```

_**MUST** be fired when the **[`renounceOwnership()`](#renounceownership)** process is initiated._

### OwnershipRenounced

```solidity
event OwnershipRenounced()
```

_**MUST** be fired when the **[`renounceOwnership()`](#renounceownership)** process is confirmed._

### ValueReceived

```solidity
event ValueReceived(
    address sender,
    uint256 value
)
```

_**MUST** be fired when when a native token is received via **[`fallback(...)`](#fallback)** function._

#### Values:

| Name     | Type    | Description                |
| :------- | :------ | :------------------------- |
| `sender` | address | The address of the sender. |
| `value`  | uint256 | The amount sent.           |

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

:::info
The `DataChanged` event will emit only the first 256 bytes of `dataValue` (for large values set in the ERC725Y storage).
:::

### UniversalReceiver

```solidity
event UniversalReceiver(
    address from,
    uint256 value,
    bytes32 typeId,
    bytes receivedData
    bytes returnedValue,
)
```

_**MUST** be fired when the **[`universalReceiver(...)`](#universalreceiver)** function is successfully executed._

#### Values:

| Name            | Type    | Description                                                     |
| :-------------- | :------ | :-------------------------------------------------------------- |
| `from`          | address | The address calling the **universalReceiver** function.         |
| `value`         | uint256 | The amount of value sent to the **universalReceiver** function. |
| `typeId`        | bytes32 | The hash of a specific standard or a hook.                      |
| `receivedData`  | bytes   | The arbitrary data passed to **universalReceiver** function.    |
| `returnedValue` | bytes   | The value returned by the **universalReceiver** function.       |

## References

- [LUKSO Standards Proposals: LSP0 - ERC725 Account (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)
- [LUKSO Standards Proposals: LSP3 - UniversalProfile Metadata (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)
- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
