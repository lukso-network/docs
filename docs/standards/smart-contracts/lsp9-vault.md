---
title: LSP9Vault
sidebar_position: 11
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
constructor(address initialOwner)
```

Sets the **initial owner** of the contract, the **[SupportedStandards:LSP9Vault ](#)** data key in the vault storage.

If the `initialOwner` is an **[LSP0ERC725Account](./lsp0-erc725-account.md)** contract, the **[`universalReceiver(...)`](./lsp0-erc725-account.md#universalreceiver)** function will be called on the **LSP0ERC725Account** contract to inform the account about the **newly owned vault**.

#### Parameters:

| Name           | Type      | Description                                      |
| :------------- | :-------- | :----------------------------------------------- |
| `initialOwner` | `address` | The address to set as the owner of the contract. |

### owner

```solidity
function owner() public view returns (address owner)
```

Returns the address of the current vault owner.

#### Return Values:

| Name    | Type      | Description                     |
| :------ | :-------- | :------------------------------ |
| `owner` | `address` | The current owner of the vault. |

### pendingOwner

```solidity
function pendingOwner() public view returns (address)
```

Return the address of the pending owner that was initiated by [`transferOwnership(address)`](#transferownership).

> **NB:** if no ownership transfer is in progress, the `pendingOwner` MUST be `address(0)`.

#### Return Values:

| Name           | Type      | Description                      |
| :------------- | :-------- | :------------------------------- |
| `pendingOwner` | `address` | The address of the pending owner |

### transferOwnership

```solidity
function transferOwnership(address newOwner) public
```

Initiate an ownership transfer by setting the `newOwner` as `pendingOwner`.

Requirements:

- Can only be called by the current owner.
- The `newOwner` to be set as the `pendingOwner` cannot be `address(this)`.

#### Parameters:

| Name       | Type      | Description                           |
| :--------- | :-------- | :------------------------------------ |
| `newOwner` | `address` | The address to set as `pendingOwner`. |

### acceptOwnership

```solidity
function acceptOwnership() public
```

Transfers ownership of the contract to the `pendingOwner` address. Can only be called by the `pendingOwner`.

_Triggers the **[OwnershipTransferred](#ownershiptransferred)** event once the new owner has claimed ownership._

### renounceOwnership

```solidity
function renounceOwnership() public
```

Since renouncing ownership is a sensitive operation, it is done as a two step process by calling `renounceOwnership(..)` twice. First to initiate the process, second as a confirmation.

The current block number is saved as a part of initiation because the following behaviour is wanted:

- The first 100 blocks after the saved block is the pending period, if you call `renounceOwnership(..)` during this period, the transaction will be reverted.
- the following 100 blocks is the period when you can confirm the renouncement of the contract by calling `renounceOwnership(..)` the second time.

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

_Triggers the **[ValueReceived](#valuereceived)** event when a native token is received._

### batchCalls

:::info

Check the [**batchCalls(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-9-Vault.md#batchcalls) function specification in [**LSP9-Vault Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-9-Vault.md) in the **LIP repository**.

:::

```solidity
function batchCalls(bytes[] calldata data) external returns (bytes[] memory results)
```

MUST batch calls on the contract by performing a delegatecall on the contract itself.

#### Parameters:

| Name   | Type      | Description                                   |
| :----- | :-------- | :-------------------------------------------- |
| `data` | `bytes[]` | The call data to be executed on the contract. |

#### Return Values:

| Name      | Type      | Description                                        |
| :-------- | :-------- | :------------------------------------------------- |
| `results` | `bytes[]` | an array of returned data of each called function. |

:::note
The `batchCalls(...)` function is not payable because of preserving context when doing delegatecall. Check this [issue](https://github.com/Uniswap/v3-periphery/issues/52).
:::

#### Data Parameter

The **data** field can be:

- an array of ABI-encoded function call such as an array of ABI-encoded execute, setData, transferOwnership or any LSP9 functions.
- an array of bytes which will resolve to the fallback function to be checked for an extension.

For example, to execute **[`setData(..)`](#setdata)** and **[`execute(..)`](#execute)** in one call:

```js
// Using ethersjs

let setDataPayload = lsp9Vault.interface.encodeFunctionData(
  'setData(bytes32,bytes)',
  [key, value],
);

let executePayload = lsp9Vault.interface.encodeFunctionData(
  'execute(uint256,address,uint256,bytes)',
  [Operation_Call, recipient, amountToSend, dataToSend],
);

await lsp9Vault
  .connect(context.owner)
  .batchCalls([setDataPayload, executePayload]);
```

### execute

```solidity
function execute(
    uint256 operationType,
    address target,
    uint256 value,
    bytes memory data
) public payable returns (bytes memory result)
```

Executes a call on any other smart contracts, transfers value, or deploys a new smart contract.

The following `operationType` MUST exist:

- `0` for `CALL`
- `1` for `CREATE`
- `2` for `CREATE2`
- `3` for `STATICCALL`

_Triggers the **[Executed](#executed)** event when a call is successfully executed using `CALL/STATICCALL` operations._

_Triggers the **[ContractCreated](#contractcreated)** event when a smart contract is created using `CREATE/CREATE2` operations._

:::note
The `execute(...)` function can only be called by the current owner of the vault.

The operation type `staticcall` (`3`) does not allow to transfer value.
:::

#### Parameters:

| Name            | Type      | Description                                                                                                              |
| :-------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------- |
| `operationType` | `uint256` | The type of operation that needs to be executed.                                                                         |
| `target`        | `address` | The address to interact with. `target` will be unused if a contract is created (operation 1 & 2).                        |
| `value`         | `uint256` | The amount of native tokens to transfer with the transaction (in Wei).                                                   |
| `data`          | `bytes`   | The calldata (ABI-encoded payload of a function to run on an other contract), or the bytecode of the contract to deploy. |

#### Return Values:

| Name     | Type    | Description                                                                                         |
| :------- | :------ | :-------------------------------------------------------------------------------------------------- |
| `result` | `bytes` | The returned data of the called function, or the address of the contract created (operation 1 & 2). |

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

| Name    | Type      | Description                         |
| :------ | :-------- | :---------------------------------- |
| `key`   | `bytes32` | The data key for which to set data. |
| `value` | `bytes`   | The data to set as bytes.           |

### getData

```solidity
function getData(bytes32 key) public view returns (bytes memory value)
```

Retrieves the data that was set for a particular data `key`.

#### Parameters:

| Name  | Type      | Description                         |
| :---- | :-------- | :---------------------------------- |
| `key` | `bytes32` | The data key to retrieve data from. |

#### Return Values:

| Name    | Type    | Description                          |
| :------ | :------ | :----------------------------------- |
| `value` | `bytes` | The data for the requested data key. |

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

| Name     | Type        | Description                          |
| :------- | :---------- | :----------------------------------- |
| `keys`   | `bytes32[]` | The data keys for which to set data. |
| `values` | `bytes[]`   | The array of data to set.            |

### getData (Array)

```solidity
function getData(bytes32[] memory keys) public view returns (bytes[] memory values)
```

Retrieves an array of data for multiple given data keys.

#### Parameters:

| Name   | Type        | Description                          |
| :----- | :---------- | :----------------------------------- |
| `keys` | `bytes32[]` | The data keys to retrieve data from. |

#### Return Values:

| Name     | Type      | Description                                       |
| :------- | :-------- | :------------------------------------------------ |
| `values` | `bytes[]` | An array of the data for the requested data keys. |

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

| Name     | Type      | Description                    |
| :------- | :-------- | :----------------------------- |
| `typeId` | `bytes32` | The type of transfer received. |
| `data`   | `bytes`   | The data received.             |

#### Return Values:

| Name     | Type    | Description                            |
| :------- | :------ | :------------------------------------- |
| `result` | `bytes` | Can be used to encode response values. |

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

| Name           | Type      | Description                              |
| :------------- | :-------- | :--------------------------------------- |
| `currentOwner` | `address` | The current owner of the contract.       |
| `newOwner`     | `address` | The potential new owner of the contract. |

### OwnershipTransferred

```solidity
event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner,
)
```

_**MUST** be fired when the **[`transferOwnership(...)`](#transferownership)** function is successfully executed._

#### Values:

| Name            | Type      | Description                         |
| :-------------- | :-------- | :---------------------------------- |
| `previousOwner` | `address` | The previous owner of the contract. |
| `newOwner`      | `address` | The new owner of the contract.      |

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

| Name     | Type      | Description                |
| :------- | :-------- | :------------------------- |
| `sender` | `address` | The address of the sender. |
| `value`  | `uint256` | The amount sent.           |

### Executed

```solidity
event Executed(
    uint256 operation,
    address target,
    uint256 value,
    bytes4 selector
)
```

_**MUST** be fired when the **[`execute(...)`](#execute)** function creates a new call using the `CALL` or `STATICCALL` operation._

#### Values:

| Name        | Type      | Description                                                       |
| :---------- | :-------- | :---------------------------------------------------------------- |
| `operation` | `uint256` | The operation executed.                                           |
| `target`    | `address` | The smart contract or address interacted with.                    |
| `value`     | `uint256` | The value transferred.                                            |
| `selector`  | `bytes4`  | The bytes4 selector of the function executed at the `to` address. |

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

| Name        | Type      | Description                          |
| :---------- | :-------- | :----------------------------------- |
| `operation` | `uint256` | The operation executed.              |
| `to`        | `address` | The address of the created contract. |
| `value`     | `uint256` | The value sent to the contract.      |

### DataChanged

```solidity
event DataChanged(bytes32 dataKey, bytes dataValue)
```

_**MUST** be fired when the **[`setData(...)`](#setdata)** function is successfully executed._

#### Values:

| Name        | Type      | Description                           |
| :---------- | :-------- | :------------------------------------ |
| `dataKey`   | `bytes32` | The data key which data value is set. |
| `dataValue` | `bytes`   | The data value to set.                |

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

| Name            | Type      | Description                                                     |
| :-------------- | :-------- | :-------------------------------------------------------------- |
| `from`          | `address` | The address calling the **universalReceiver** function.         |
| `value`         | `uint256` | The amount of value sent to the **universalReceiver** function. |
| `typeId`        | `bytes32` | The hash of a specific standard or a hook.                      |
| `receivedData`  | `bytes`   | The arbitrary data passed to **universalReceiver** function.    |
| `returnedValue` | `bytes`   | The value returned by the **universalReceiver** function.       |

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
