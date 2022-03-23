---
title: LSP0 ERC725Account
sidebar_position: 2
---

# LSP0ERC725Account

The **LSP0ERC725Account** contract is an implementation for the **[LSP0-ERC725Account Standard](../universal-profile/lsp0-erc725account)**. This contract forms a **Universal Profile** when combined with **[LSP3-UniversalProfile-Metadata Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)**.

This contract could be used as a _blockchain-based account_ by humans, machines, organizations, or even other smart contracts. It has all the basic functionalities of an _Externally Owned Account_ (EOA), as well as the following functions that gives the contract additional features:

- [`execute(...)`](#execute) : enable to execute functions on other contract, transfer value, or deploy new contracts.
- [`isValidSignature(...)`](#isvalidsignature): verify signatures and signed messages from EOA.
- [`universalReceiver(...)`](#universalreceiver): be notified of incoming calls and assets.
- [`setData(...)`](#setdata): set any information in the account storage.

:::note
**_LSP0ERC725Account contract also contains the methods from_ [_ERC165_](https://eips.ethereum.org/EIPS/eip-165) :**

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

Sets the **initial owner** of the contract and registers **[LSP0ERC725Account](./interface-ids.md)**, **[ERC1271](./interface-ids.md)** and **[LSP1UniversalReceiver InterfaceIds](./interface-ids.md)**.

#### Parameters:

| Name       | Type    | Description                                      |
| :--------- | :------ | :----------------------------------------------- |
| `newOwner` | address | The address to set as the owner of the contract. |

### owner

```solidity
function owner() public view returns (address owner)
```

Returns the address of the current owner.

#### Return Values:

| Name    | Type    | Description                        |
| :------ | :------ | :--------------------------------- |
| `owner` | address | The current owner of the contract. |

### transferOwnership

```solidity
function transferOwnership(address newOwner) public {
```

Transfers ownership of the contract to the `newOwner` address.

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
**The `execute(...)` function can only be called by the current owner of the contract.**
:::

#### Parameters:

| Name            | Type    | Description                                                                                                              |
| :-------------- | :------ | :----------------------------------------------------------------------------------------------------------------------- |
| `operationType` | uint256 | The type of operation to execute.                                                                                        |
| `to`            | address | The address to interact with. `to` will be unused if a contract is created (operation 1 & 2).                            |
| `value`         | uint256 | The desired value to transfer.                                                                                           |
| `data`          | bytes   | The calldata (abi-encoded payload of a function to run on an other contract), or the bytecode of the contract to deploy. |

#### Return Values:

| Name     | Type  | Description                                                                                                                  |
| :------- | :---- | :--------------------------------------------------------------------------------------------------------------------------- |
| `result` | bytes | The data returned by the function called on the external contract, or the address of the contract created (operation 1 & 2). |

### setData

```solidity
function setData(
    bytes32[] memory keys,
    bytes[] memory values
) public
```

Sets array of data at multiple keys in the account storage.

_Triggers the **[DataChanged](#datachanged)** event when setting data successfully._

:::note
**The `setData(...)` function can only be called by the current owner of the contract.**
:::

#### Parameters:

| Name     | Type       | Description                       |
| :------- | :--------- | :-------------------------------- |
| `keys`   | bytes32[ ] | The keys for which to set data.   |
| `values` | bytes[ ]   | The array of data to set.         |

### getData

```solidity
function getData(bytes32[] memory keys) public view returns (bytes[] memory values)
```

Retrieve an array of data for multiple given keys.

#### Parameters:

| Name   | Type       | Description                       |
| :----- | :--------- | :-------------------------------- |
| `keys` | bytes32[ ] | The keys to retrieve data from.   |

#### Return Values:

| Name     | Type     | Description                                    |
| :------- | :------- | :--------------------------------------------- |
| `values` | bytes[ ] | An array of the data for the requested keys. |


### setData

```solidity
function setData(
    bytes32 keys,
    bytes memory value
) public
```

Set data as **bytes** in the account storage for a single key.

_Triggers the **[DataChanged](#datachanged)** event when setting data successfully._

:::note
**The `setData(...)` function can only be called by the current owner of the contract.**
:::

#### Parameters:

| Name    | Type    | Description                       |
| :------ | :------ | :-------------------------------- |
| `key`   | bytes32 | The key for which to set data.    |
| `value` | bytes   | The data to set as bytes.         |

### getData

```solidity
function getData(bytes32 key) public view returns (bytes memory value)
```

Retrieve the data set for the given key.

#### Parameters:

| Name  | Type    | Description                    |
| :---- | :------ | :----------------------------- |
| `key` | bytes32 | The key to retrieve data from. |

#### Return Values:

| Name    | Type  | Description                      |
| :------ | :---- | :------------------------------- |
| `value` | bytes | The data for the requested key.  |


### universalReceiver

```solidity
function universalReceiver(
    bytes32 typeId,
    bytes memory data
) public returns (bytes memory result)
```

Forwards the call to the **UniversalReceiverDelegate** contract if its address is stored at the [LSP1UniversalReceiverDelegate](../generic-standards/02-lsp1-universal-receiver.md#extension) Key.   
The contract being called is expected to be an **[LSP1UniversalReceiverDelegateUP](./lsp1-universal-receiver-delegate-up.md)**, supporting [LSP1UniversalReceiverDelegate InterfaceId](./interface-ids.md) using [ERC165](https://eips.ethereum.org/EIPS/eip-165).

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

### isValidSignature

```solidity
function isValidSignature(
    bytes32 hash,
    bytes memory signature
) public view returns (bytes4 magicValue)
```

Checks if a signature was signed by the `owner` of the contract, according to [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271). If the `owner` is a contract itself, it will call the `isValidsignature(..)` function on the owner contract, if it supports [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271), otherwise it will return the failure value.


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

### OwnershipTransferred

```solidity
event OwnershipTransferred(
    address previousOwner,
    address newOwner,
)
```

_**MUST** be fired when **[transferOwnership(...)](#transferownership)** is successfully executed._

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
| `data`      | bytes   | The call data.                                 |

### ContractCreated

```solidity
event ContractCreated(
    uint256 operation,
    address contractAddress,
    uint256 value
)
```

_**MUST** be fired when the **[`execute(...)`](#execute)** creates a new contract using the `CREATE` or `CREATE2` operation._

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

_**MUST** be fired when the **[`setData(...)`](#setdata)** is successfully executed._

#### Values:

| Name    | Type    | Description                       |
| :------ | :------ | :-------------------------------- |
| `key`   | bytes32 | The key which value is set.       |
| `value` | bytes   | The data set.                     |

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

- [LUKSO Standards Proposals: LSP0 - ERC725 Account (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)
- [LUKSO Standards Proposals: LSP3 - UniversalProfile Metadata (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)
- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
