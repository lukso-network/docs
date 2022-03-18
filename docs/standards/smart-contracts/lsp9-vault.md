---
title: LSP9 Vault
sidebar_position: 8
---

# LSP9Vault

The **LSP9Vault** contract is an implementation of the **[LSP9-Vault Standard](#)**.

This contract can be used as a **vault** that can **hold assets** and **interact with other smart contracts**, as it has all the functions of the **[LSP0ERC725Account](./lsp0-erc725-account.md)** contract, except for the **`isValidSignature(...)`** function.

:::note
**_LSP9Vault contract also contains the methods from_ [_ERC165_](https://eips.ethereum.org/EIPS/eip-165) :**

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

Sets the **initial owner** of the contract, the **[SupportedStandards:LSP9Vault ](#)**key in the vault storage and registers the **[LSP9Vault and LSP1UniversalReceiver interface ids](./interface-ids.md)**.

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
| :------ | :------ | :------------------------------ |
| `owner` | address | The current owner of the vault. |

### transferOwnership

```solidity
function transferOwnership(address newOwner) public {
```

Transfers ownership of the contract to the `newOwner` address.

If the current owner or the `newOwner` address is an **[LSP0ERC725Account](./lsp0-erc725-account.md)** contract, the **[`universalReceiver(...)`](./lsp0-erc725-account.md#universalreceiver)** function will be called on the **LSP0ERC725Account** contract to inform the account(s) about the **vault ownership transfer**.

_Triggers the **[OwnershipTransferred](#ownershiptransferred)** event ownership is transferred._

#### Parameters:

| Name       | Type    | Description                                      |
| :--------- | :------ | :----------------------------------------------- |
| `newOwner` | address | The address to set as the owner of the contract. |

### receive

```solidity
receive() external payable
```

Executed on value transfers.

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
**The `execute(...)` function can only be called by the current owner of the vault.**
:::

#### Parameters:

| Name            | Type    | Description                                                                                   |
| :-------------- | :------ | :-------------------------------------------------------------------------------------------- |
| `operationType` | uint256 | The operation to execute.                                                                     |
| `to`            | address | The address to interact with. `to` will be unused if a contract is created (operation 1 & 2). |
| `value`         | uint256 | The desired value to transfer.                                                                |
| `data`          | bytes   | The calldata (= abi-encoded function to execute) , or the bytecode of the contract to deploy. |

#### Return Values:

| Name     | Type  | Description                                                                                         |
| :------- | :---- | :-------------------------------------------------------------------------------------------------- |
| `result` | bytes | The returned data of the called function, or the address of the contract created (operation 1 & 2). |

### setData

```solidity
function setData(
    bytes32[] memory keys,
    bytes[] memory values
) public
```

Set an array of data as **bytes** in the vault storage for multiple keys.

_Triggers the **[DataChanged](#datachanged)** event when setting data successfully._

:::note
**The `setData(...)` function can only be called by the current owner of the contract and the LSP1UniversalReceiverDelegateVault contract.**
:::

#### Parameters:

| Name     | Type       | Description                       |
| :------- | :--------- | :-------------------------------- |
| `keys`   | bytes32[ ] | The keys for which to set value.  |
| `values` | bytes[ ]   | The array of bytes values to set. |

### getData

```solidity
function getData(bytes32[] memory keys) public view returns (bytes[] memory values)
```

Retrieve an array of values for multiple given keys.

#### Parameters:

| Name   | Type       | Description                       |
| :----- | :--------- | :-------------------------------- |
| `keys` | bytes32[ ] | The keys to retrieve values from. |

#### Return Values:

| Name     | Type     | Description                                    |
| :------- | :------- | :--------------------------------------------- |
| `values` | bytes[ ] | An array of the values for the requested keys. |



### setData

```solidity
function setData(
    bytes32 keys,
    bytes values
) public
```

Set data as **bytes** in the vault storage for a single key.

_Triggers the **[DataChanged](#datachanged)** event when setting data successfully._

:::note
**The `setData(...)` function can only be called by the current owner of the contract and the LSP1UniversalReceiverDelegateVault contract.**
:::

#### Parameters:

| Name    | Type    | Description                       |
| :------ | :------ | :-------------------------------- |
| `key`   | bytes32 | The key for which to set value.   |
| `value` | bytes   | The bytes value to set.           |

### getData

```solidity
function getData(bytes32 key) public view returns (bytes memory value)
```

Retrieve the data set for the given key.

#### Parameters:

| Name  | Type    | Description                    |
| :---- | :------ | :------------------------------ |
| `key` | bytes32 | The key to retrieve value from. |

#### Return Values:

| Name    | Type  | Description                      |
| :------ | :---- | :------------------------------- |
| `value` | bytes | The value for the requested key. |

### universalReceiver

```solidity
function universalReceiver(
    bytes32 typeId,
    bytes memory data
) public returns (bytes memory result)
```

Forwards the call to the **UniversalReceiverDelegate** contract if its address is stored at the [LSP1UniversalReceiverDelegate](../generic-standards/02-lsp1-universal-receiver.md#extension) Key.   
The contract being called is expected to be an **[LSP1UniversalReceiverDelegateVault](./lsp1-universal-receiver-delegate-vault.md)**, supporting [LSP1UniversalReceiverDelegate InterfaceId](./interface-ids.md) using ERC165.

_Triggers the **[UniversalReceiver](#universalreceiver-1)** event when this function gets executed successfully._

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

_**MUST** be fired when **[`transferOwnership(...)`](#transferownership)** is successfully executed._

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
    bytes data
)
```

_**MUST** be fired when **[`execute(...)`](#execute)** creates a new call using the `CALL`, `STATICCALL` or `DELEGATECALL` operation._

#### Values:

| Name        | Type    | Description                                    |
| :---------- | :------ | :--------------------------------------------- |
| `operation` | uint256 | The operation executed.                        |
| `to`        | address | The smart contract or address interacted with. |
| `value`     | uint256 | The value transferred.                         |
| `data`      | bytes   | The Call data.                                 |

### ContractCreated

```solidity
event ContractCreated(
    uint256 operation,
    address contractAddress,
    uint256 value
)
```

_**MUST** be fired when **[`execute(...)`](#execute)** creates a new contract using the `CREATE` or `CREATE2` operation._

#### Values:

| Name        | Type    | Description                          |
| :---------- | :------ | :----------------------------------- |
| `operation` | uint256 | The operation executed.              |
| `to`        | address | The address of the created contract. |
| `value`     | uint256 | The value sent to the contract.      |

### DataChanged

```solidity
event DataChanged(
    bytes32 key,
    bytes value,
)
```

_**MUST** be fired when **[`setData(...)`](#setdata)** is successfully executed._

#### Values:

| Name    | Type    | Description                       |
| :------ | :------ | :-------------------------------- |
| `key`   | bytes32 | The key which value is retrieved. |
| `value` | bytes   | The data of bytes set.            |

### UniversalReceiver

```solidity
event UniversalReceiver(
    address from,
    bytes32 typeId,
    bytes returnedValue,
    bytes receivedData
)
```

_**MUST** be fired when the **[`universalReceiver(...)`](#universalreceiver)** function is succesfully executed._

#### Values:

| Name            | Type    | Description                                                  |
| :-------------- | :------ | :----------------------------------------------------------- |
| `from`          | address | The address calling the **universalReceiver** function.      |
| `typeId`        | bytes32 | The hash of a specific standard or a hook.                   |
| `returnedValue` | bytes   | The return value of **universalReceiver** function.          |
| `receivedData`  | bytes   | The arbitrary data passed to **universalReceiver** function. |

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
