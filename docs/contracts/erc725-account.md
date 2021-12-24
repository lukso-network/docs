---
title: LSP0 ERC725Account
sidebar_position: 2
---

# LSP0 ERC725Account

The **ERC725Account** contract is basically an implementation for the **[LSP0-ERC725Account Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)**, this contract could also use simultaneously the **[LSP3-UniversalProfile-Metadata Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)** to form a **UniversalProfile** where you could attach information to the Profile like the name, pictures, owned assets, etc under a certain schema.

This **ERC725Account** contract could be used as an _account system_ to be used by humans, machines, organizations, or even other smart contracts. It has all the functionalities that an _EOA_ have and even more, starting from executing functions, transferring value, deploying smart contracts via **[execute](#execute)** function, verifying signatures via **[isValidSignature](#isvalidsignature)** function, being notified of incoming assets via **[universalReceiver](#universalreceiver)** function and the ability to set any information on the account via **[setData](#setdata)** function.

:::note
**_ERC725Account implementation also contains the methods from [ERC173](https://eips.ethereum.org/EIPS/eip-173) and [ERC165](https://eips.ethereum.org/EIPS/eip-165)._**
:::

---

## Functions

### receive

```solidity
  receive() external payable
```

_Triggers the **[ValueReceived](#valuereceived)** event when a native token transfer was received._

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

_Triggers the **[Executed](#executed)** event when a call is successfully executed using `CALL/STATICCALL/DELEGATECALL` operations._

_Triggers the **[ContractCreated](#contractcreated)** event when a smart contract is created using `CREATE/CREATE2` operations._

:::note
**It can only be called by the current owner of the contract.**
:::

#### Parameters:

| Name            | Type    | Description                                                                                                     |
| :-------------- | :------ | :-------------------------------------------------------------------------------------------------------------- |
| `operationType` | uint256 | The operation to execute.                                                                                       |
| `to`            | address | The smart contract or address to interact with. `to` will be unused if a contract is created (operation 1 & 2). |
| `value`         | uint256 | The desired value to transfer.                                                                                  |
| `data`          | bytes   | The call data (ABI of the function to execute) , or the contract data to deploy.                                |

The **[operationType](#execute)** can execute the following operations:

- `0` for `CALL`
- `1` for `CREATE`
- `2` for `CREATE2`
- `3` for `STATICCALL`
- `4` for `DELEGATECALL`

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

Sets array of data as `bytes` in the account storage at multiple keys.

_Triggers the **[DataChanged](#datachanged)** event when setting data successfully._

:::note
**It can only be called by the current owner of the contract.**
:::

#### Parameters:

| Name     | Type       | Description                        |
| :------- | :--------- | :--------------------------------- |
| `keys`   | bytes32[ ] | The keys which values to retrieve. |
| `values` | bytes[ ]   | The array of bytes to set.         |

### getData

```solidity
  function getData(
    bytes32[] memory keys
  ) public view returns (bytes[] memory values)
```

Gets array of data at multiple given key.

#### Parameters:

| Name   | Type       | Description                        |
| :----- | :--------- | :--------------------------------- |
| `keys` | bytes32[ ] | The keys which values to retrieve. |

#### Return Values:

| Name     | Type     | Description                                 |
| :------- | :------- | :------------------------------------------ |
| `values` | bytes[ ] | Array of the values for the requested keys. |

### universalReceiver

```solidity
  function universalReceiver(
    bytes32 typeId,
    bytes memory data
  ) public returns (bytes memory result)
```

Emits an event when it's succesfully executed.

Call the **[universalReceiverDelegate](.//universal-receiver-delegate.md#universalreceiverdelegate)** function in the **[universalReceiverDelegate](.//universal-receiver-delegate.md)** (URD) contract, if the address of the URD was set as a value for the **[UniversalReceiverKey](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#implementation)** in the account key/value value store of the same contract implementing the universalReceiver function and if the URD contract has the **[LSP1UniversalReceiverDelegate Interface ID](./interface-ids.md)** registred using **ERC165**.

The current implementation of the **UniversalReceiverDelegate** is found **[here](.//universal-receiver-delegate.md)**.

_Triggers the **[UniversalReceiver](#universalreceiver-1)** event when this function get executed successfully._

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

Should return whether the signature provided is valid for the provided data.

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

### ValueReceived

```solidity
  event ValueReceived(
    address sender,
    uint256 value
  )
```

_**MUST** be fired when **[receive](#receive)** is successfully executed._

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

_**MUST** be fired when **[execute](#execute)** creates a new call using the `CALL/STATICCALL/DELEGATECALL` operations._

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

_**MUST** be fired when **[execute](#execute)** creates a new contract using the `CREATE/CREATE2` operations._

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

_**MUST** be fired when **[setData](#setdata)** is successfully executed._

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

_**MUST** be fired when the **[universalReceiver](#universalreceiver)** is succesfully executed._

#### Values:

| Name            | Type    | Description                                                  |
| :-------------- | :------ | :----------------------------------------------------------- |
| `from`          | address | The address calling the **universalReceiver** function.      |
| `typeId`        | bytes32 | The hash of a specific standard or a hook.                   |
| `returnedValue` | bytes   | The return value of **universalReceiver** function.          |
| `receivedData`  | bytes   | The arbitrary data passed to **universalReceiver** function. |

## References

- [LUKSO Standards Proposals: LSP3 - UniversalProfile Metadata (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)
- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
