---
title: LSP9Vault
sidebar_position: 10
---

# LSP9Vault

:::info Solidity contract

[`LSP9Vault.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP9Vault/LSP9Vault.sol)

:::

The **LSP9Vault** contract is an implementation of the **[LSP9-Vault Standard](#)**.

This contract can be used as a **vault** that can **hold assets** and **interact with other smart contracts**, as it has all the functions of the **[LSP0ERC725Account](./lsp0-erc725-account.md)** contract, except for the **`isValidSignature(...)`** function.

:::note
_LSP9Vault contract also contains the methods from the [ERC165 Standard](https://eips.ethereum.org/EIPS/eip-165):_

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

:::

---

## Functions

### constructor

```solidity
constructor(address newOwner) ERC725(newOwner)
```

Sets the **initial owner** of the contract, the **[SupportedStandards:LSP9Vault ](#)** data key in the vault storage, and registers the **[LSP9Vault and LSP1UniversalReceiver interface IDs](./interface-ids.md)**.

If the `newOwner` is an **[LSP0ERC725Account](./lsp0-erc725-account.md)** contract, the **[`universalReceiver(...)`](./lsp0-erc725-account.md#universalreceiver)** function will be called on the **LSP0ERC725Account** contract to inform the account about the **newly owned vault**.

#### Parameters:

| Name       | Type    | Description                                      |
| :--------- | :------ | :----------------------------------------------- |
| `newOwner` | address | The address to set as the owner of the contract. |


### owner

```solidity
function owner() public view returns (address owner)
```

Returns the address of the current vault owner.

#### Return Values:

| Name    | Type    | Description                     |
| :------ | :------ | :-------------------------------|
| `owner` | address | The current owner of the vault. |


### pendingOwner

```solidity
function pendingOwner() public view returns (address)
```

Return the `address` of the pending owner that was initiated by [`transferOwnership(address)`](#transferownership). 

> **NB:** if no ownership transfer is in progress, the `pendingOwner` MUST be `0x0000000000000000000000000000000000000000`.

#### Return Values:

| Name           | Type    | Description |
|:---------------|:--------|:------------|
| `pendingOwner` | address | undefined   |

### transferOwnership

```solidity
function transferOwnership(address newOwner) public {
```

Initiate an ownership transfer, setting the `pendingOwner` as the `newOwner`.

#### Parameters:

| Name       | Type    | Description                                      |
| :--------- | :------ | :----------------------------------------------- |
| `newOwner` | address | The address to set as the owner of the contract. |


### claimOwnership

```solidity
function claimOwnership() public {
```

Transfers ownership of the contract to the `pendingOwner` address. Can only be called by the `pendingOwner`.

_Triggers the **[OwnershipTransferred](#ownershiptransferred)** event once the new owner has claimed ownership._


### receive

```solidity
receive() external payable
```

Executed when value is transferred to the contract.

_Triggers the **[ValueReceived](#valuereceived)** event when a native token is received._

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

The **operationType** can be the following:

- `0` for `CALL`
- `1` for `CREATE`
- `2` for `CREATE2`
- `3` for `STATICCALL`
- `4` for `DELEGATECALL`

_Triggers the **[Executed](#executed)** event when a call is successfully executed using `CALL/STATICCALL/DELEGATECALL` operations._

_Triggers the **[ContractCreated](#contractcreated)** event when a smart contract is created using `CREATE/CREATE2` operations._

:::note
The `execute(...)` function can only be called by the current owner of the vault.

The operation types `staticcall` (`3`) and `delegatecall` (`4`) do not allow to transfer value.
:::

#### Parameters:

| Name            | Type    | Description                                                                                   |
| :-------------- | :------ | :-------------------------------------------------------------------------------------------- |
| `operationType` | uint256 | The type of operation that needs to be executed.                                                                     |
| `to`            | address | The address to interact with. `to` will be unused if a contract is created (operation 1 & 2). |
| `value`         | uint256 | The amount of native tokens to transfer with the transaction (in Wei).                                                                |
| `data`          | bytes   | The calldata (ABI-encoded payload of a function to run on an other contract), or the bytecode of the contract to deploy. |

#### Return Values:

| Name     | Type  | Description                                                                                         |
| :------- | :---- | :-------------------------------------------------------------------------------------------------- |
| `result` | bytes | The returned data of the called function, or the address of the contract created (operation 1 & 2). |

### setData

```solidity
function setData(
    bytes32 key,
    bytes memory value
) public
```

Sets the data of a single data `key` as **bytes** to the vault's storage.

_Triggers the **[DataChanged](#datachanged)** event when successfully setting the data._

:::note
The `setData(...)` function can only be called by the current owner of the contract and the LSP1UniversalReceiverDelegateVault contract.
:::

#### Parameters:

| Name    | Type    | Description                         |
| :------ | :------ | :---------------------------------- |
| `key`   | bytes32 | The data key for which to set data. |
| `value` | bytes   | The data to set as bytes.           |

### getData

```solidity
function getData(bytes32 key) public view returns (bytes memory value)
```

Retrieves the data that was set for a particular data `key`.

#### Parameters:

| Name  | Type    | Description                         |
| :---- | :------ | :---------------------------------- |
| `key` | bytes32 | The data key to retrieve data from. |

#### Return Values:

| Name    | Type  | Description                          |
| :------ | :---- | :----------------------------------- |
| `value` | bytes | The data for the requested data key. |

### setData (Array)

```solidity
function setData(
    bytes32[] memory keys,
    bytes[] memory values
) public
```

Sets an array of data at multiple data keys in the vault storage.

_Triggers the **[DataChanged](#datachanged)** event when successfully setting the data._

:::note
The `setData(...)` function can only be called by the current owner of the contract and the LSP1UniversalReceiverDelegateVault contract.
:::

#### Parameters:

| Name     | Type            | Description                          |
| :------- | :-------------- | :----------------------------------- |
| `keys`   | bytes32[&nbsp;] | The data keys for which to set data. |
| `values` | bytes[&nbsp;]   | The array of data to set.            |

### getData (Array)

```solidity
function getData(bytes32[] memory keys) public view returns (bytes[] memory values)
```

Retrieves an array of data for multiple given data keys.

#### Parameters:

| Name   | Type            | Description                          |
| :----- | :-------------- | :----------------------------------- |
| `keys` | bytes32[&nbsp;] | The data keys to retrieve data from. |

#### Return Values:

| Name     | Type          | Description                                       |
| :------- | :------------ | :------------------------------------------------ |
| `values` | bytes[&nbsp;] | An array of the data for the requested data keys. |

### universalReceiver

```solidity
function universalReceiver(
    bytes32 typeId,
    bytes memory data
) public payable returns (bytes memory result)
```

Forwards the call to the **UniversalReceiverDelegate** contract if its address is stored at the [LSP1UniversalReceiverDelegate](../generic-standards/lsp1-universal-receiver.md#extension) data Key.
The contract being called is expected to be an **[LSP1UniversalReceiverDelegateVault](./lsp1-universal-receiver-delegate-vault.md)**, supporting [LSP1UniversalReceiverDelegate InterfaceId](./interface-ids.md) using ERC165.

_Triggers the **[UniversalReceiver](#universalreceiver-1)** event when this function gets successfully executed._

#### Parameters:

| Name     | Type    | Description                    |
| :------- | :------ | :----------------------------- |
| `typeId` | bytes32 | The type of transfer received. |
| `data`   | bytes   | The data received.             |

#### Return Values:

| Name     | Type  | Description                            |
| :------- | :---- | :------------------------------------- |
| `result` | bytes | Can be used to encode response values. |

## Events

### OwnershipTransferred

```solidity
event OwnershipTransferred(
    address previousOwner,
    address newOwner,
)
```

_**MUST** be fired when the **[`transferOwnership(...)`](#transferownership)** function is successfully executed._

#### Values:

| Name            | Type    | Description                         |
| :-------------- | :------ | :---------------------------------- |
| `previousOwner` | address | The previous owner of the contract. |
| `newOwner`      | address | The new owner of the contract.      |

### ValueReceived

```solidity
event ValueReceived(
    address sender,
    uint256 value
)
```

_**MUST** be fired when the **[`receive(...)`](#receive)** function is successfully executed._

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

_**MUST** be fired when the **[`execute(...)`](#execute)** function creates a new call using the `CALL`, `STATICCALL`, or `DELEGATECALL` operation._

#### Values:

| Name        | Type    | Description                                                       |
| :---------- | :------ | :---------------------------------------------------------------- |
| `operation` | uint256 | The operation executed.                                           |
| `to`        | address | The smart contract or address interacted with.                    |
| `value`     | uint256 | The value transferred.                                            |
| `selector`  | bytes4  | The bytes4 selector of the function executed at the `to` address. |

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
event DataChanged(bytes32 dataKey)
```

_**MUST** be fired when the **[`setData(...)`](#setdata)** function is successfully executed._

#### Values:

| Name        | Type    | Description                      |
| :---------- | :------ | :------------------------------- |
| `dataKey`   | bytes32 | The data key which value is set. |

### UniversalReceiver

```solidity
event UniversalReceiver(
    address from,
    uint256 value,
    bytes32 typeId,
    bytes returnedValue,
    bytes receivedData
)
```

_**MUST** be fired when the **[`universalReceiver(...)`](#universalreceiver)** function is successfully executed._

#### Values:

| Name            | Type    | Description                                                     |
| :-------------- | :------ | :-------------------------------------------------------------- |
| `from`          | address | The address calling the **universalReceiver** function.         |
| `value`         | uint256 | The amount of value sent to the **universalReceiver** function. |
| `typeId`        | bytes32 | The hash of a specific standard or a hook.                      |
| `returnedValue` | bytes   | The return value of **universalReceiver** function.             |
| `receivedData`  | bytes   | The arbitrary data passed to **universalReceiver** function.    |

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
