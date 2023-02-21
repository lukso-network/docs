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

---

## Functions

### constructor

```solidity
constructor(address initialOwner)
```

Sets the **initial owner** of the contract.

#### Parameters:

| Name           | Type      | Description                                      |
| :------------- | :-------- | :----------------------------------------------- |
| `initialOwner` | `address` | The address to set as the owner of the contract. |

### receive

:::info

Check the [**receive(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#receive) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**receive(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L73) function implementation in **LSP0ERC725Account** Contract.

:::

```solidity
receive() external payable
```

_Triggers the [**ValueReceived**](#valuereceived)_ event when the contract receives native tokens.

### fallback

:::info

Check the [**fallback(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#fallback) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**fallback(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L121) function implementation in **LSP0ERC725Account** Contract.

:::

```solidity
fallback() external payable
```

Executed when sending bytes data to the contract and the first 4 bytes of this data do not match any of the native available functions.

- Triggers the **[ValueReceived](#valuereceived)** event if the call was associated with sending value.

- If the data sent is **shorter than 4 bytes**, then the call should pass. For example, sending `0xaabbcc` to the contract will be successful.

- If the data sent is **preprended with 4 zeros (0)**, then the call should pass.

  For example, when sending value to the contract it can be associated with a message, such as `"Here is 1 Ether"`, after encoding the message as bytes: `0x486572652069732031204574686572`.

  In order to make the call to the contract pass, it should be prepended with `bytes4(0)`. A call to the **LSP0** with `0x00000000486572652069732031204574686572` as data **will pass**.

- If the data sent is equal or larger to 4 bytes and is not prepended with `bytes4(0)`, the following steps will be executed:

1. Query the [storage of the LSP0](../universal-profile/lsp0-erc725account.md#erc725y---generic-key-value-store), and check if there is an address under this following data Key:

```json
{
  "name": "LSP17Extension:<bytes4>",
  "key": "0xcee78b4094da860110960000<bytes4>",
  "keyType": "Mapping",
  "valueType": "address",
  "valueContent": "Address"
}
```

> `<bytes4>` is the first 4 bytes of the data received

1.1 If there is not an address stored under this data key, revert with custom error `NoExtensionFoundForFunctionSelector(bytes4(data))`

1.2 If there is an address stored under the data key, forward the `msg.data` received to this address via a low level call with appending the `msg.sender` and `msg.value`as extra 52 bytes to the call.

2.Then return the return value received after this low level call.

This feature is useful for making the **LSP0ERC725Account contract extendable**, where you can add functions to be called on the LSP0 as extensions. Check [**LSP17-ContractExtension**](../universal-profile/lsp0-erc725account.md#lsp17---contract-extension) section in LSP0.

### supportsInterface

:::info

<!---
@todo to add a link once it has been added to the LIP repo
-->

Check the **supportsInterface(..)** function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**supportsInterface(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L136) function implementation in **LSP0ERC725Account** Contract.

:::

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

Returns whether the LSP0 supports the given interfaceId or not.

New interfaceIds can be supported even after the deployment of the **LSP0**, by setting the address of a contract that contains these extended interfaceIds under the following data key:

```json
{
  "name": "LSP17Extension:<bytes4>",
  "key": "0xcee78b4094da860110960000<bytes4>",
  "keyType": "Mapping",
  "valueType": "address",
  "valueContent": "Address"
}
```

> `<bytes4>` being the `supportsInterface(..)` selector in this case.

### owner

:::info

Check the [**owner(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#owner) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**owner(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L20) inherited function implementation in **LSP0ERC725Account** Contract.

:::

```solidity
function owner() public view returns (address owner)
```

Returns the address of the current owner of the contract.

#### Return Values:

| Name    | Type      | Description                        |
| :------ | :-------- | :--------------------------------- |
| `owner` | `address` | The current owner of the contract. |

### pendingOwner

:::info

Check the [**pendingOwner(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#pendingowner) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**pendingOwner(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L20) inherited function implementation in **LSP0ERC725Account** Contract.

:::

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

:::info

Check the [**transferOwnership(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#transferownership) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**transferOwnership(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L290) function implementation in **LSP0ERC725Account** Contract.

:::

```solidity
function transferOwnership(address newOwner) public
```

Initiate an ownership transfer by setting the `newOwner` as `pendingOwner`.

Calls the `universalReceiver(..)` function [**on the pending owner**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L328), if it supports LSP1 InterfaceId with the following typeId:

- `keccak256('LSP0OwnershipTransferStarted')` > `0xe17117c9d2665d1dbeb479ed8058bbebde3c50ac50e2e65619f60006caac6926`.

Requirements:

- Can only be called by the current owner.
- The `newOwner` to be set as the `pendingOwner` cannot be `address(this)`.

#### Parameters:

| Name       | Type      | Description                           |
| :--------- | :-------- | :------------------------------------ |
| `newOwner` | `address` | The address to set as `pendingOwner`. |

### acceptOwnership

:::info

Check the [**acceptOwnership(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#acceptownership) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**acceptOwnership(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L20) inherited function implementation in **LSP0ERC725Account** Contract.

:::

```solidity
function acceptOwnership() public
```

Transfers ownership of the contract to the `pendingOwner` address. Can only be called by the `pendingOwner`.

Calls the `universalReceiver(..)` function on the previous and the new [`pendingOwner`](#pendingOwner), if it supports LSP1 InterfaceId with the following typeId:

- On the [**previous owner**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L345): `keccak256('LSP0OwnershipTransferred_SenderNotification')` > `0xa4e59c931d14f7c8a7a35027f92ee40b5f2886b9fdcdb78f30bc5ecce5a2f814`.

- On the [**new owner**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L361): `keccak256('LSP0OwnershipTransferred_RecipientNotification')` > `0xceca317f109c43507871523e82dc2a3cc64dfa18f12da0b6db14f6e23f995538`.

_Triggers the **[OwnershipTransferred](#ownershiptransferred)** event once the new owner has claimed ownership._

### renounceOwnership

:::info

Check the [**renounceOwnership(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#renounceownership) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**renounceOwnership(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L302) function implementation in **LSP0ERC725Account** Contract.

:::

```solidity
function renounceOwnership() public
```

Since renouncing ownership is a sensitive operation, it is done as a two-step process by calling `renounceOwnership(..)` twice. First to initiate the process, second as a confirmation.

The current block number is saved as a part of initiation because the following behaviour is wanted:

- The first 100 blocks after the saved block is the pending period, if you call `renounceOwnership(..)` during this period, the transaction will be reverted.
- the following 100 blocks is the period when you can confirm the renouncement of the contract by calling `renounceOwnership(..)` the second time.

_Triggers the **[RenounceOwnershipInitiated](#renounceownershipinitiated)** event in the first call._

_Triggers the **[OwnershipTransferred](#ownershiptransferred)** event after successfully renouncing ownership._

:::warning
Leaves the contract without an owner. Once ownership of the contract is renounced, it won't be possible to call the functions restricted to the owner only.
:::

### batchCalls

:::info

Check the [**batchCalls(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#batchcalls) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

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

- an array of ABI-encoded function call such as an array of ABI-encoded execute, setData, transferOwnership or any LSP0 functions.
- an array of bytes which will resolve to the fallback function to be checked for an extension.

For example, to execute **[`setData(..)`](#setdata)** and **[`execute(..)`](#execute)** in one call:

```js
// Using ethersjs

let setDataPayload = lsp0Contract.interface.encodeFunctionData(
  'setData(bytes32,bytes)',
  [key, value],
);

let executePayload = lsp0Contract.interface.encodeFunctionData(
  'execute(uint256,address,uint256,bytes)',
  [Operation_Call, recipient, amountToSend, dataToSend],
);

await lsp0Contract
  .connect(context.owner)
  .batchCalls([setDataPayload, executePayload]);
```

### execute

:::info

Check the [**execute(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#execute) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**execute(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L200) function implementation in **LSP0ERC725Account** Contract.

Check the **javascript** guides to know [**How to Send native tokens**](../../guides/universal-profile/transfer-lyx.md) or [**How to Call other contract's function**](../../guides/universal-profile/interact-with-contracts.md) using the execute function.

:::

```solidity
function execute(
    uint256 operationType,
    address target,
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

_Triggers the **[ValueReceived](#valuereceived)** event when a the call is associated with value._

_Triggers the **[Executed](#executed)** event when a call is successfully executed using `CALL/STATICCALL/DELEGATECALL` operations._

_Triggers the **[ContractCreated](#contractcreated)** event when a smart contract is created using `CREATE/CREATE2` operations._

:::note
The `execute(...)` function can only be called by the current owner of the contract.

The operation types `staticcall` (`3`) and `delegatecall` (`4`) do not allow to transfer value.
:::

#### Parameters:

| Name            | Type      | Description                                                                                                              |
| :-------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------- |
| `operationType` | `uint256` | The type of operation that needs to be executed.                                                                         |
| `target`        | `address` | The address to interact with. The address `to` will be unused if a contract is created (operations 1 & 2).               |
| `value`         | `uint256` | The amount of native tokens to transfer with the transaction (in Wei).                                                   |
| `data`          | `bytes`   | The calldata (ABI-encoded payload of a function to run on an other contract), or the bytecode of the contract to deploy. |

#### Return Values:

| Name     | Type    | Description                                                                                                                            |
| :------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| `result` | `bytes` | The data that was returned by the function called on the external contract, or the address of the contract created (operations 1 & 2). |

### execute (Array)

:::info

Check the [**execute(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#execute-array) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**execute(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L215) function implementation in **LSP0ERC725Account** Contract.

:::

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

_Triggers the **[ValueReceived](#valuereceived)** event when a the call is associated with value._

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

### setData

:::info

Check the [**setData(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#setdata) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**setData(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L17) function implementation in **LSP0ERC725Account** Contract.

Check the **javascript** guides to know [**How to Edit a Profile (setData)**](../../guides/universal-profile/edit-profile.md).

:::

```solidity
function setData(
    bytes32 dataKey,
    bytes memory dataValue
) public
```

Sets data in the account storage for a particular data key.

_Triggers the **[DataChanged](#datachanged)** event when successfully setting the data with [emitting the first 256 bytes](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L314) of the data Value._

:::note
The `setData(...)` function can only be called by the current [owner](#owner) of the contract.
:::

#### Parameters:

| Name        | Type      | Description                                  |
| :---------- | :-------- | :------------------------------------------- |
| `dataKey`   | `bytes32` | The data key for which the data will be set. |
| `dataValue` | `bytes`   | The data to be set.                          |

### getData

:::info

Check the [**getData(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#getdata) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**getData(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L17) function implementation in **LSP0ERC725Account** Contract.

Check the **javascript** guides to know [**How to Read from a Profile (getData)**](../../guides/universal-profile/read-profile-data.md).

:::

```solidity
function getData(bytes32 dataKey) public view returns (bytes memory dataValue)
```

Retrieves the value set for the given data key.

#### Parameters:

| Name      | Type      | Description                         |
| :-------- | :-------- | :---------------------------------- |
| `dataKey` | `bytes32` | The data key to retrieve data from. |

#### Return Values:

| Name        | Type    | Description                          |
| :---------- | :------ | :----------------------------------- |
| `dataValue` | `bytes` | The data for the requested data key. |

### setData (Array)

:::info

Check the [**setData(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#setdata-array) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**setData(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L17) function implementation in **LSP0ERC725Account** Contract.

Check the **javascript** guides to know [**How to Edit a Profile (setData)**](../../guides/universal-profile/edit-profile.md).

:::

```solidity
function setData(
    bytes32[] memory dataKeys,
    bytes[] memory dataValues
) public
```

Sets an array of values at multiple data keys in the account storage.

_Triggers the **[DataChanged](#datachanged)** event when successfully setting each data key/value with [emitting the first 256 bytes](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L314) of each data Value._

:::note
The `setData(...)` function can only be called by the current [owner](#owner) of the contract.
:::

#### Parameters:

| Name         | Type        | Description                          |
| :----------- | :---------- | :----------------------------------- |
| `dataKeys`   | `bytes32[]` | The data keys for which to set data. |
| `dataValues` | `bytes[]`   | The array of data to set.            |

### getData (Array)

:::info

Check the [**getData(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#getdata-array) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**getData(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L17) function implementation in **LSP0ERC725Account** Contract.

Check the **javascript** guides to know [**How to Read from a Profile (getData)**](../../guides/universal-profile/read-profile-data.md).

:::

```solidity
function getData(bytes32[] memory dataKeys) public view returns (bytes[] memory dataValues)
```

Retrieves an array of values for multiple given data keys.

#### Parameters:

| Name       | Type        | Description                          |
| :--------- | :---------- | :----------------------------------- |
| `dataKeys` | `bytes32[]` | The data keys to retrieve data from. |

#### Return Values:

| Name         | Type          | Description                                       |
| :----------- | :------------ | :------------------------------------------------ |
| `dataValues` | bytes[&nbsp;] | An array of the data for the requested data keys. |

### universalReceiver

:::info

Check the [**universalReceiver(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#universalreceiver) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**universalReceiver(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L235) function implementation in **LSP0ERC725Account** Contract.

Check the **javascript** guides to know [**How to set a UniversalReceiverDelegate built by LUKSO**](../../guides/universal-receiver-delegate/set-default-implementation.md) or [**How to set your own UniversalReceiverDelegate**](../../guides/universal-receiver-delegate/accept-reject-assets.md).

:::

```solidity
function universalReceiver(
    bytes32 typeId,
    bytes memory data
) public payable returns (bytes memory result)
```

- Forwards the `msg.data` appended with the `msg.sender` and `msg.value` to the **UniversalReceiverDelegate** contract address stored under the data key attached below, if it supports [LSP1UniversalReceiver InterfaceId](../smart-contracts/interface-ids.md).

```json
{
  "name": "LSP1UniversalReceiverDelegate",
  "key": "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
  "keyType": "Singleton",
  "valueType": "address",
  "valueContent": "Address"
}
```

- Forwards the `msg.data` appended with the `msg.sender` and `msg.value` to the **typeId delegate** contract address stored under the data key attached below, if it supports [LSP1UniversalReceiver InterfaceId](../smart-contracts/interface-ids.md).

```json
{
  "name": "LSP1UniversalReceiverDelegate:<bytes32>",
  "key": "0x0cfc51aec37c55a4d0b10000<bytes32>",
  "keyType": "Mapping",
  "valueType": "address",
  "valueContent": "Address"
}
```

> <bytes32\> is the `typeId` passed to the `universalReceiver(..)` function.

If there is no address stored under these data keys, execution continue normally until the emission of the event.

_Triggers the **[ValueReceived](#valuereceived)** event when a the call is associated with value._

_Triggers the **[UniversalReceiver](#universalreceiver-1)** event when this function gets successfully executed._

#### Parameters:

| Name     | Type      | Description                    |
| :------- | :-------- | :----------------------------- |
| `typeId` | `bytes32` | The type of transfer received. |
| `data`   | `bytes`   | The data received.             |

#### Return Values:

| Name     | Type    | Description                                                                    |
| :------- | :------ | :----------------------------------------------------------------------------- |
| `result` | `bytes` | The return value of the UniversalReceiverDelegates contracts encoded as bytes. |

### isValidSignature

:::info

Check the [**isValidSignature(..)**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#isvalidsignature) function specification in [**LSP0-ERC725Account Standard**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) in the **LIP repository**.

Check the [**isValidSignature(..)**](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol#L159) function implementation in **LSP0ERC725Account** Contract.

:::

```solidity
function isValidSignature(
    bytes32 dataHash,
    bytes memory signature
) public view returns (bytes4 magicValue)
```

Checks if a signature was signed by the [`owner`](#owner) of the contract, according to [**EIP-1271**](https://eips.ethereum.org/EIPS/eip-1271).

If the `owner` is an EOA, the **ECDSA algorithm** will be used to recover the address of the signer from the dataHash and the signature, the function will return the [**`MAGICVALUE`**](https://eips.ethereum.org/EIPS/eip-1271#specification) pointing that the signature is valid, if the address recovered matches the address of the owner. Will return the **`FAIL VALUE`** `0xffffffff` otherwise.

If the `owner` is a contract itself, it will call the `isValidsignature(..)` function on the owner contract, and return the magicValue if the function returns the magicValue. In any other case such as non-standard return value or revert, it will return the failure value indicating that the signature is not valid.

#### Parameters:

| Name        | Type      | Description                  |
| :---------- | :-------- | :--------------------------- |
| `hash`      | `bytes32` | The hash of the data signed. |
| `signature` | `bytes`   | The signature provided.      |

#### Return Values:

| Name         | Type     | Description                                                            |
| :----------- | :------- | :--------------------------------------------------------------------- |
| `magicValue` | `bytes4` | The magicValue either `0x1626ba7e` on success or `0xffffffff` failure. |

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
    uint256 operationType,
    address target,
    uint256 value,
    bytes4 selector
)
```

_**MUST** be fired when **[`execute(...)`](#execute)** function creates a new call using the `CALL`, `STATICCALL`, or `DELEGATECALL` operation._

#### Values:

| Name            | Type      | Description                                                                        |
| :-------------- | :-------- | :--------------------------------------------------------------------------------- |
| `operationType` | `uint256` | Either **0** (for `CALL`), **3** (for `STATICCALL`) or **3** (for `DELEGATECALL`). |
| `target`        | `address` | The smart contract or address interacted with.                                     |
| `value`         | `uint256` | The value transferred.                                                             |
| `selector`      | `bytes4`  | The bytes4 selector of the function executed at the `target` address               |

### ContractCreated

```solidity
event ContractCreated(
    uint256 operation,
    address contractAddress,
    uint256 value,
    bytes32 salt
)
```

_**MUST** be fired when the **[`execute(...)`](#execute)** function creates a new contract using the `CREATE` or `CREATE2` operation._

#### Values:

| Name              | Type      | Description                                                                               |
| :---------------- | :-------- | :---------------------------------------------------------------------------------------- |
| `operationType`   | `uint256` | Either **1** (for `CREATE`) or **2** (for `CREATE2`).                                     |
| `contractAddress` | `address` | The address of the created contract.                                                      |
| `value`           | `uint256` | The value sent to the contract.                                                           |
| `salt`            | `bytes32` | The salt used in `CREATE2` operation. Will be `bytes32(0)` in case of `CREATE` operation. |

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

- [LUKSO Standards Proposals: LSP0 - ERC725 Account (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)
- [LUKSO Standards Proposals: LSP3 - UniversalProfile Metadata (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)
- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
