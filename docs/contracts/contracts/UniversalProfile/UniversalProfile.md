<!-- This file is auto-generated. Do not edit! -->
<!-- Check `@lukso-network/lsp-smart-contracts/CONTRIBUTING.md#solidity-code-comments` for more information. -->

# UniversalProfile

:::info Standard Specifications

[`UniversalProfile`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)

:::
:::info Solidity implementation

[`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)

:::

> implementation of a LUKSO&#39;s Universal Profile based on LSP3

Implementation of the ERC725Account + LSP1 universalReceiver

## Public Methods

Public methods are accessible externally from users, allowing interaction with this function from dApps or other smart contracts.
When marked as 'public', a method can be called both externally and internally, on the other hand, when marked as 'external', a method can only be called externally.

### constructor

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#constructor)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)

:::

```solidity
constructor(address initialOwner);
```

_Deploying a UniversalProfile contract with owner set to address `initialOwner`._

Set `initialOwner` as the contract owner and the `SupportedStandards:LSP3Profile` data key in the ERC725Y data key/value store.

- The `constructor` is payable and allows funding the contract on deployment.

- The `initialOwner` will then be allowed to call protected functions marked with the `onlyOwner` modifier.

<blockquote>

**Emitted events:**

- [`UniversalReceiver`](#universalreceiver) event when funding the contract on deployment.
- [`OwnershipTransferred`](#ownershiptransferred) event when `initialOwner` is set as the contract [`owner`](#owner).
- [`DataChanged`](#datachanged) event when setting the [`_LSP3_SUPPORTED_STANDARDS_KEY`](#_lsp3_supported_standards_key).

</blockquote>

#### Parameters

| Name           |   Type    | Description               |
| -------------- | :-------: | ------------------------- |
| `initialOwner` | `address` | the owner of the contract |

<br/>

### fallback

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#fallback)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)

:::

```solidity
fallback() external payable;
```

<br/>

### receive

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#receive)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)

:::

```solidity
receive() external payable;
```

<br/>

### RENOUNCE_OWNERSHIP_CONFIRMATION_DELAY

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#renounce_ownership_confirmation_delay)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `RENOUNCE_OWNERSHIP_CONFIRMATION_DELAY()`
- Function selector: `0xead3fbdf`

:::

```solidity
function RENOUNCE_OWNERSHIP_CONFIRMATION_DELAY()
  external
  view
  returns (uint256);
```

#### Returns

| Name |   Type    | Description |
| ---- | :-------: | ----------- |
| `0`  | `uint256` | -           |

<br/>

### RENOUNCE_OWNERSHIP_CONFIRMATION_PERIOD

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#renounce_ownership_confirmation_period)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `RENOUNCE_OWNERSHIP_CONFIRMATION_PERIOD()`
- Function selector: `0x01bfba61`

:::

```solidity
function RENOUNCE_OWNERSHIP_CONFIRMATION_PERIOD()
  external
  view
  returns (uint256);
```

#### Returns

| Name |   Type    | Description |
| ---- | :-------: | ----------- |
| `0`  | `uint256` | -           |

<br/>

### VERSION

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#version)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `VERSION()`
- Function selector: `0xffa1ad74`

:::

```solidity
function VERSION() external view returns (string);
```

_Contract version._

#### Returns

| Name |   Type   | Description |
| ---- | :------: | ----------- |
| `0`  | `string` | -           |

<br/>

### acceptOwnership

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#acceptownership)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `acceptOwnership()`
- Function selector: `0x79ba5097`

:::

```solidity
function acceptOwnership() external nonpayable;
```

_`msg.sender` is accepting ownership of contract: `address(this)`._

Transfer ownership of the contract from the current [`owner()`](#owner) to the [`pendingOwner()`](#pendingowner). Once this function is called:

- The current [`owner()`](#owner) will lose access to the functions restricted to the [`owner()`](#owner) only.

- The [`pendingOwner()`](#pendingowner) will gain access to the functions restricted to the [`owner()`](#owner) only.

<blockquote>

**Requirements:**

- Only the [`pendingOwner`](#pendingowner) can call this function.
- When notifying the previous owner via LSP1, the typeId used must be the `keccak256(...)` hash of [LSP0OwnershipTransferred_SenderNotification].
- When notifying the new owner via LSP1, the typeId used must be the `keccak256(...)` hash of [LSP0OwnershipTransferred_RecipientNotification].

</blockquote>

<br/>

### batchCalls

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#batchcalls)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `batchCalls(bytes[])`
- Function selector: `0x6963d438`

:::

:::info

It's not possible to send value along the functions call due to the use of `delegatecall`.

:::

```solidity
function batchCalls(bytes[] data) external nonpayable returns (bytes[] results);
```

_Executing the following batch of abi-encoded function calls on the contract: `data`._

Allows a caller to batch different function calls in one call. Perform a `delegatecall` on self, to call different functions with preserving the context.

#### Parameters

| Name   |   Type    | Description                                                          |
| ------ | :-------: | -------------------------------------------------------------------- |
| `data` | `bytes[]` | An array of ABI encoded function calls to be called on the contract. |

#### Returns

| Name      |   Type    | Description                                                      |
| --------- | :-------: | ---------------------------------------------------------------- |
| `results` | `bytes[]` | An array of abi-encoded data returned by the functions executed. |

<br/>

### execute

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#execute)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `execute(uint256,address,uint256,bytes)`
- Function selector: `0x44c028fe`

:::

```solidity
function execute(
  uint256 operationType,
  address target,
  uint256 value,
  bytes data
) external payable returns (bytes);
```

_Calling address `target` using `operationType`, transferring `value` wei and data: `data`._

Generic executor function to:

- send native tokens to any address.

- interact with any contract by passing an abi-encoded function call in the `data` parameter.

- deploy a contract by providing its creation bytecode in the `data` parameter.

<blockquote>

**Requirements:**

- Can be only called by the [`owner`](#owner) or by an authorised address that pass the verification check performed on the owner.
- If a `value` is provided, the contract must have at least this amount in its balance to execute successfully.
- If the operation type is `CREATE` (1) or `CREATE2` (2), `target` must be `address(0)`.
- If the operation type is `STATICCALL` (3) or `DELEGATECALL` (4), `value` transfer is disallowed and must be 0.

</blockquote>

<blockquote>

**Emitted events:**

- [`Executed`](#executed) event for each call that uses under `operationType`: `CALL` (0), `STATICCALL` (3) and `DELEGATECALL` (4).
- [`ContractCreated`](#contractcreated) event, when a contract is created under `operationType`: `CREATE` (1) and `CREATE2` (2).
- [`UniversalReceiver`](#universalreceiver) event when receiving native tokens.

</blockquote>

#### Parameters

| Name            |   Type    | Description                                                                                           |
| --------------- | :-------: | ----------------------------------------------------------------------------------------------------- |
| `operationType` | `uint256` | The operation type used: CALL = 0; CREATE = 1; CREATE2 = 2; STATICCALL = 3; DELEGATECALL = 4          |
| `target`        | `address` | The address of the EOA or smart contract. (unused if a contract is created via operation type 1 or 2) |
| `value`         | `uint256` | The amount of native tokens to transfer (in Wei)                                                      |
| `data`          |  `bytes`  | The call data, or the creation bytecode of the contract to deploy if `operationType` is `1` or `2`.   |

#### Returns

| Name |  Type   | Description |
| ---- | :-----: | ----------- |
| `0`  | `bytes` | -           |

<br/>

### executeBatch

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#executebatch)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `executeBatch(uint256[],address[],uint256[],bytes[])`
- Function selector: `0x31858452`

:::

:::caution Warning

- The `msg.value` should not be trusted for any method called within the batch with `operationType`: `DELEGATECALL` (4).

:::

```solidity
function executeBatch(
  uint256[] operationsType,
  address[] targets,
  uint256[] values,
  bytes[] datas
) external payable returns (bytes[]);
```

_Calling multiple addresses `targets` using `operationsType`, transferring `values` wei and data: `datas`._

Batch executor function that behaves the same as [`execute`](#execute) but allowing multiple operations in the same transaction.

<blockquote>

**Requirements:**

- The length of the parameters provided must be equal.
- Can be only called by the [`owner`](#owner) or by an authorised address that pass the verification check performed on the owner.
- If a `value` is provided, the contract must have at least this amount in its balance to execute successfully.
- If the operation type is `CREATE` (1) or `CREATE2` (2), `target` must be `address(0)`.
- If the operation type is `STATICCALL` (3) or `DELEGATECALL` (4), `value` transfer is disallowed and must be 0.

</blockquote>

<blockquote>

**Emitted events:**

- [`Executed`](#executed) event for each call that uses under `operationType`: `CALL` (0), `STATICCALL` (3) and `DELEGATECALL` (4). (each iteration)
- [`ContractCreated`](#contractcreated) event, when a contract is created under `operationType`: `CREATE` (1) and `CREATE2` (2) (each iteration)
- [`UniversalReceiver`](#universalreceiver) event when receiving native tokens.

</blockquote>

#### Parameters

| Name             |    Type     | Description                                                                                                     |
| ---------------- | :---------: | --------------------------------------------------------------------------------------------------------------- |
| `operationsType` | `uint256[]` | The list of operations type used: `CALL = 0`; `CREATE = 1`; `CREATE2 = 2`; `STATICCALL = 3`; `DELEGATECALL = 4` |
| `targets`        | `address[]` | The list of addresses to call. `targets` will be unused if a contract is created (operation types 1 and 2).     |
| `values`         | `uint256[]` | The list of native token amounts to transfer (in Wei).                                                          |
| `datas`          |  `bytes[]`  | The list of calldata, or the creation bytecode of the contract to deploy if `operationType` is `1` or `2`.      |

#### Returns

| Name |   Type    | Description |
| ---- | :-------: | ----------- |
| `0`  | `bytes[]` | -           |

<br/>

### getData

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#getdata)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `getData(bytes32)`
- Function selector: `0x54f6127f`

:::

```solidity
function getData(bytes32 dataKey) external view returns (bytes dataValue);
```

_Reading the ERC725Y storage for data key `dataKey` returned the following value: `dataValue`._

Get in the ERC725Y storage the bytes data stored at a specific data key `dataKey`.

#### Parameters

| Name      |   Type    | Description                                   |
| --------- | :-------: | --------------------------------------------- |
| `dataKey` | `bytes32` | The data key for which to retrieve the value. |

#### Returns

| Name        |  Type   | Description                                          |
| ----------- | :-----: | ---------------------------------------------------- |
| `dataValue` | `bytes` | The bytes value stored under the specified data key. |

<br/>

### getDataBatch

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#getdatabatch)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `getDataBatch(bytes32[])`
- Function selector: `0xdedff9c6`

:::

```solidity
function getDataBatch(
  bytes32[] dataKeys
) external view returns (bytes[] dataValues);
```

_Reading the ERC725Y storage for data keys `dataKeys` returned the following values: `dataValues`._

Get in the ERC725Y storage the bytes data stored at multiple data keys `dataKeys`.

#### Parameters

| Name       |    Type     | Description                                |
| ---------- | :---------: | ------------------------------------------ |
| `dataKeys` | `bytes32[]` | The array of keys which values to retrieve |

#### Returns

| Name         |   Type    | Description                               |
| ------------ | :-------: | ----------------------------------------- |
| `dataValues` | `bytes[]` | The array of data stored at multiple keys |

<br/>

### isValidSignature

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#isvalidsignature)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `isValidSignature(bytes32,bytes)`
- Function selector: `0x1626ba7e`

:::

:::caution Warning

This function does not enforce by default the inclusion of the address of this contract in the signature digest. It is recommended that protocols or applications using this contract include the targeted address (= this contract) in the data to sign. To ensure that a signature is valid for a specific LSP0ERC725Account and prevent signatures from the same EOA to be replayed across different LSP0ERC725Accounts.

:::

```solidity
function isValidSignature(
  bytes32 dataHash,
  bytes signature
) external view returns (bytes4 returnedStatus);
```

_Achieves the goal of [EIP-1271] by validating signatures of smart contracts according to their own logic._

Handles two cases:

1. If the owner is an EOA, recovers an address from the hash and the signature provided:

- Returns the `_ERC1271_SUCCESSVALUE` if the address recovered is the same as the owner, indicating that it was a valid signature.

- If the address is different, it returns the `_ERC1271_FAILVALUE` indicating that the signature is not valid.

2. If the owner is a smart contract, it forwards the call of [`isValidSignature()`](#isvalidsignature) to the owner contract:

- If the contract fails or returns the `_ERC1271_FAILVALUE`, the [`isValidSignature()`](#isvalidsignature) on the account returns the `_ERC1271_FAILVALUE`, indicating that the signature is not valid.

- If the [`isValidSignature()`](#isvalidsignature) on the owner returned the `_ERC1271_SUCCESSVALUE`, the [`isValidSignature()`](#isvalidsignature) on the account returns the `_ERC1271_SUCCESSVALUE`, indicating that it's a valid signature.

#### Parameters

| Name        |   Type    | Description                                                  |
| ----------- | :-------: | ------------------------------------------------------------ |
| `dataHash`  | `bytes32` | The hash of the data to be validated.                        |
| `signature` |  `bytes`  | A signature that can validate the previous parameter (Hash). |

#### Returns

| Name             |   Type   | Description                                                       |
| ---------------- | :------: | ----------------------------------------------------------------- |
| `returnedStatus` | `bytes4` | A `bytes4` value that indicates if the signature is valid or not. |

<br/>

### owner

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#owner)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `owner()`
- Function selector: `0x8da5cb5b`

:::

```solidity
function owner() external view returns (address);
```

Returns the address of the current owner.

#### Returns

| Name |   Type    | Description |
| ---- | :-------: | ----------- |
| `0`  | `address` | -           |

<br/>

### pendingOwner

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#pendingowner)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `pendingOwner()`
- Function selector: `0xe30c3978`

:::

:::info

If no ownership transfer is in progress, the pendingOwner will be `address(0).`.

:::

```solidity
function pendingOwner() external view returns (address);
```

The address that ownership of the contract is transferred to. This address may use [`acceptOwnership()`](#acceptownership) to gain ownership of the contract.

#### Returns

| Name |   Type    | Description |
| ---- | :-------: | ----------- |
| `0`  | `address` | -           |

<br/>

### renounceOwnership

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#renounceownership)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `renounceOwnership()`
- Function selector: `0x715018a6`

:::

:::danger

Leaves the contract without an owner. Once ownership of the contract has been renounced, any functions that are restricted to be called by the owner or an address allowed by the owner will be permanently inaccessible, making these functions not callable anymore and unusable.

:::

```solidity
function renounceOwnership() external nonpayable;
```

_`msg.sender` is renouncing ownership of contract `address(this)`._

Renounce ownership of the contract in a 2-step process.

1. The first call will initiate the process of renouncing ownership.

2. The second call is used as a confirmation and will leave the contract without an owner.

<blockquote>

**Requirements:**

- Can be only called by the [`owner`](#owner) or by an authorised address that pass the verification check performed on the owner.

</blockquote>

<br/>

### setData

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#setdata)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `setData(bytes32,bytes)`
- Function selector: `0x7f23690c`

:::

```solidity
function setData(bytes32 dataKey, bytes dataValue) external payable;
```

_Setting the following data key value pair in the ERC725Y storage. Data key: `dataKey`, data value: `dataValue`._

Sets a single bytes value `dataValue` in the ERC725Y storage for a specific data key `dataKey`. The function is marked as payable to enable flexibility on child contracts. For instance to implement a fee mechanism for setting specific data.

<blockquote>

**Requirements:**

- Can be only called by the [`owner`](#owner) or by an authorised address that pass the verification check performed on the owner.

</blockquote>

<blockquote>

**Emitted events:**

- [`UniversalReceiver`](#universalreceiver) event when receiving native tokens.
- [`DataChanged`](#datachanged) event.

</blockquote>

#### Parameters

| Name        |   Type    | Description                                |
| ----------- | :-------: | ------------------------------------------ |
| `dataKey`   | `bytes32` | The data key for which to set a new value. |
| `dataValue` |  `bytes`  | The new bytes value to set.                |

<br/>

### setDataBatch

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#setdatabatch)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `setDataBatch(bytes32[],bytes[])`
- Function selector: `0x97902421`

:::

```solidity
function setDataBatch(bytes32[] dataKeys, bytes[] dataValues) external payable;
```

_Setting the following data key value pairs in the ERC725Y storage. Data keys: `dataKeys`, data values: `dataValues`._

Batch data setting function that behaves the same as [`setData`](#setdata) but allowing to set multiple data key/value pairs in the ERC725Y storage in the same transaction.

<blockquote>

**Requirements:**

- Can be only called by the [`owner`](#owner) or by an authorised address that pass the verification check performed on the owner.

</blockquote>

<blockquote>

**Emitted events:**

- [`UniversalReceiver`](#universalreceiver) event when receiving native tokens.
- [`DataChanged`](#datachanged) event. (on each iteration of setting data)

</blockquote>

#### Parameters

| Name         |    Type     | Description                                          |
| ------------ | :---------: | ---------------------------------------------------- |
| `dataKeys`   | `bytes32[]` | An array of data keys to set bytes values for.       |
| `dataValues` |  `bytes[]`  | An array of bytes values to set for each `dataKeys`. |

<br/>

### supportsInterface

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#supportsinterface)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `supportsInterface(bytes4)`
- Function selector: `0x01ffc9a7`

:::

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool);
```

_Checking if this contract supports the interface defined by the `bytes4` interface ID `interfaceId`._

Achieves the goal of [ERC-165] to detect supported interfaces and [LSP-17-ContractExtension] by checking if the interfaceId being queried is supported on another linked extension. If the contract doesn't support the `interfaceId`, it forwards the call to the `supportsInterface` extension according to [LSP-17-ContractExtension], and checks if the extension implements the interface defined by `interfaceId`.

#### Parameters

| Name          |   Type   | Description                                            |
| ------------- | :------: | ------------------------------------------------------ |
| `interfaceId` | `bytes4` | The interface ID to check if the contract supports it. |

#### Returns

| Name |  Type  | Description                                                                                   |
| ---- | :----: | --------------------------------------------------------------------------------------------- |
| `0`  | `bool` | `true` if this contract implements the interface defined by `interfaceId`, `false` otherwise. |

<br/>

### transferOwnership

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#transferownership)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `transferOwnership(address)`
- Function selector: `0xf2fde38b`

:::

```solidity
function transferOwnership(address pendingNewOwner) external nonpayable;
```

_Transfer ownership initiated by `newOwner`._

Initiate the process of transferring ownership of the contract by setting the new owner as the pending owner. If the new owner is a contract that supports + implements LSP1, this will also attempt to notify the new owner that ownership has been transferred to them by calling the [`universalReceiver()`](#universalreceiver) function on the `newOwner` contract.

<blockquote>

**Requirements:**

- Can be only called by the [`owner`](#owner) or by an authorised address that pass the verification check performed on the owner.
- When notifying the new owner via LSP1, the `typeId` used must be the `keccak256(...)` hash of [LSP0OwnershipTransferStarted].
- Pending owner cannot accept ownership in the same tx via the LSP1 hook.

</blockquote>

#### Parameters

| Name              |   Type    | Description |
| ----------------- | :-------: | ----------- |
| `pendingNewOwner` | `address` | -           |

<br/>

### universalReceiver

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#universalreceiver)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Function signature: `universalReceiver(bytes32,bytes)`
- Function selector: `0x6bb56a14`

:::

```solidity
function universalReceiver(
  bytes32 typeId,
  bytes receivedData
) external payable returns (bytes returnedValues);
```

_Notifying the contract by calling its `universalReceiver` function with the following information: typeId: `typeId`; data: `data`._

Achieves the goal of [LSP-1-UniversalReceiver] by allowing the account to be notified about incoming/outgoing transactions and enabling reactions to these actions. The reaction is achieved by having two external contracts ([LSP1UniversalReceiverDelegate]) that react on the whole transaction and on the specific typeId, respectively. The function performs the following steps:

1. Query the [ERC-725Y] storage with the data key [_LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY].

- If there is an address stored under the data key, check if this address supports the LSP1 interfaceId.

- If yes, call this address with the typeId and data (params), along with additional calldata consisting of 20 bytes of `msg.sender` and 32 bytes of `msg.value`. If not, continue the execution of the function.

2. Query the [ERC-725Y] storage with the data key [_LSP1_UNIVERSAL_RECEIVER_DELEGATE_PREFIX] + `bytes32(typeId)`. (Check [LSP-2-ERC725YJSONSchema] for encoding the data key)

- If there is an address stored under the data key, check if this address supports the LSP1 interfaceId.

- If yes, call this address with the typeId and data (params), along with additional calldata consisting of 20 bytes of `msg.sender` and 32 bytes of `msg.value`. If not, continue the execution of the function. This function delegates internally the handling of native tokens to the [`universalReceiver`](#universalreceiver) function itself passing `_TYPEID_LSP0_VALUE_RECEIVED` as typeId and the calldata as received data.

<blockquote>

**Emitted events:**

- [`UniversalReceiver`](#universalreceiver) when receiving native tokens.
- [`UniversalReceiver`](#universalreceiver) event with the function parameters, call options, and the response of the UniversalReceiverDelegates (URD) contract that was called.

</blockquote>

#### Parameters

| Name           |   Type    | Description                |
| -------------- | :-------: | -------------------------- |
| `typeId`       | `bytes32` | The type of call received. |
| `receivedData` |  `bytes`  | The data received.         |

#### Returns

| Name             |  Type   | Description                                                                                             |
| ---------------- | :-----: | ------------------------------------------------------------------------------------------------------- |
| `returnedValues` | `bytes` | The ABI encoded return value of the LSP1UniversalReceiverDelegate call and the LSP1TypeIdDelegate call. |

<br/>

## Internal Methods

Any method labeled as `internal` serves as utility function within the contract. They can be used when writing solidity contracts that inherit from this contract. These methods can be extended or modified by overriding their internal behavior to suit specific needs.

Internal functions cannot be called externally, whether from other smart contracts, dApp interfaces, or backend services. Their restricted accessibility ensures that they remain exclusively available within the context of the current contract, promoting controlled and encapsulated usage of these internal utilities.

### \_checkOwner

```solidity
function _checkOwner() internal view;
```

Throws if the sender is not the owner.

<br/>

### \_setOwner

```solidity
function _setOwner(address newOwner) internal nonpayable;
```

Changes the owner if `newOwner` and oldOwner are different
This pattern is useful in inheritance.

<br/>

### \_execute

```solidity
function _execute(
  uint256 operationType,
  address target,
  uint256 value,
  bytes data
) internal nonpayable returns (bytes);
```

check the `operationType` provided and perform the associated low-level opcode after checking for requirements (see [`execute`](#execute)).

<br/>

### \_executeBatch

```solidity
function _executeBatch(
  uint256[] operationsType,
  address[] targets,
  uint256[] values,
  bytes[] datas
) internal nonpayable returns (bytes[]);
```

check each `operationType` provided in the batch and perform the associated low-level opcode after checking for requirements (see [`executeBatch`](#executebatch)).

<br/>

### \_executeCall

```solidity
function _executeCall(
  address target,
  uint256 value,
  bytes data
) internal nonpayable returns (bytes result);
```

Perform low-level call (operation type = 0)

#### Parameters

| Name     |   Type    | Description                           |
| -------- | :-------: | ------------------------------------- |
| `target` | `address` | The address on which call is executed |
| `value`  | `uint256` | The value to be sent with the call    |
| `data`   |  `bytes`  | The data to be sent with the call     |

#### Returns

| Name     |  Type   | Description            |
| -------- | :-----: | ---------------------- |
| `result` | `bytes` | The data from the call |

<br/>

### \_executeStaticCall

```solidity
function _executeStaticCall(
  address target,
  bytes data
) internal nonpayable returns (bytes result);
```

Perform low-level staticcall (operation type = 3)

#### Parameters

| Name     |   Type    | Description                                 |
| -------- | :-------: | ------------------------------------------- |
| `target` | `address` | The address on which staticcall is executed |
| `data`   |  `bytes`  | The data to be sent with the staticcall     |

#### Returns

| Name     |  Type   | Description                           |
| -------- | :-----: | ------------------------------------- |
| `result` | `bytes` | The data returned from the staticcall |

<br/>

### \_executeDelegateCall

:::caution Warning

The `msg.value` should not be trusted for any method called with `operationType`: `DELEGATECALL` (4).

:::

```solidity
function _executeDelegateCall(
  address target,
  bytes data
) internal nonpayable returns (bytes result);
```

Perform low-level delegatecall (operation type = 4)

#### Parameters

| Name     |   Type    | Description                                   |
| -------- | :-------: | --------------------------------------------- |
| `target` | `address` | The address on which delegatecall is executed |
| `data`   |  `bytes`  | The data to be sent with the delegatecall     |

#### Returns

| Name     |  Type   | Description                             |
| -------- | :-----: | --------------------------------------- |
| `result` | `bytes` | The data returned from the delegatecall |

<br/>

### \_deployCreate

```solidity
function _deployCreate(
  uint256 value,
  bytes creationCode
) internal nonpayable returns (bytes newContract);
```

Deploy a contract using the `CREATE` opcode (operation type = 1)

#### Parameters

| Name           |   Type    | Description                                                                        |
| -------------- | :-------: | ---------------------------------------------------------------------------------- |
| `value`        | `uint256` | The value to be sent to the contract created                                       |
| `creationCode` |  `bytes`  | The contract creation bytecode to deploy appended with the constructor argument(s) |

#### Returns

| Name          |  Type   | Description                                  |
| ------------- | :-----: | -------------------------------------------- |
| `newContract` | `bytes` | The address of the contract created as bytes |

<br/>

### \_deployCreate2

```solidity
function _deployCreate2(
  uint256 value,
  bytes creationCode
) internal nonpayable returns (bytes newContract);
```

Deploy a contract using the `CREATE2` opcode (operation type = 2)

#### Parameters

| Name           |   Type    | Description                                                                                           |
| -------------- | :-------: | ----------------------------------------------------------------------------------------------------- |
| `value`        | `uint256` | The value to be sent to the contract created                                                          |
| `creationCode` |  `bytes`  | The contract creation bytecode to deploy appended with the constructor argument(s) and a bytes32 salt |

#### Returns

| Name          |  Type   | Description                                  |
| ------------- | :-----: | -------------------------------------------- |
| `newContract` | `bytes` | The address of the contract created as bytes |

<br/>

### \_getData

```solidity
function _getData(bytes32 dataKey) internal view returns (bytes dataValue);
```

Read the value stored under a specific `dataKey` inside the underlying ERC725Y storage,
represented as a mapping of `bytes32` data keys mapped to their `bytes` data values.

```solidity
mapping(bytes32 => bytes) _store
```

#### Parameters

| Name      |   Type    | Description                                                             |
| --------- | :-------: | ----------------------------------------------------------------------- |
| `dataKey` | `bytes32` | A bytes32 data key to read the associated `bytes` value from the store. |

#### Returns

| Name        |  Type   | Description                                                                   |
| ----------- | :-----: | ----------------------------------------------------------------------------- |
| `dataValue` | `bytes` | The `bytes` value associated with the given `dataKey` in the ERC725Y storage. |

<br/>

### \_setData

```solidity
function _setData(bytes32 dataKey, bytes dataValue) internal nonpayable;
```

Write a `dataValue` to the underlying ERC725Y storage, represented as a mapping of
`bytes32` data keys mapped to their `bytes` data values.

```solidity
mapping(bytes32 => bytes) _store
```

<blockquote>

**Emitted events:**

- [`DataChanged`](#datachanged) event emitted after a successful `setData` call.

</blockquote>

#### Parameters

| Name        |   Type    | Description                                                                     |
| ----------- | :-------: | ------------------------------------------------------------------------------- |
| `dataKey`   | `bytes32` | A bytes32 data key to write the associated `bytes` value to the store.          |
| `dataValue` |  `bytes`  | The `bytes` value to associate with the given `dataKey` in the ERC725Y storage. |

<br/>

### \_transferOwnership

```solidity
function _transferOwnership(address newOwner) internal nonpayable;
```

Set the pending owner of the contract and cancel any renounce ownership process that was previously started.

<blockquote>

**Requirements:**

- `newOwner` cannot be the address of the contract itself.

</blockquote>

#### Parameters

| Name       |   Type    | Description                           |
| ---------- | :-------: | ------------------------------------- |
| `newOwner` | `address` | The address of the new pending owner. |

<br/>

### \_acceptOwnership

```solidity
function _acceptOwnership() internal nonpayable;
```

Set the pending owner of the contract as the new owner.

<br/>

### \_renounceOwnership

```solidity
function _renounceOwnership() internal nonpayable;
```

Initiate or confirm the process of renouncing ownership after a specific delay of blocks have passed.

<br/>

### \_supportsInterfaceInERC165Extension

```solidity
function _supportsInterfaceInERC165Extension(
  bytes4 interfaceId
) internal view returns (bool);
```

Returns whether the interfaceId being checked is supported in the extension of the
[`supportsInterface`](#supportsinterface) selector.
To be used by extendable contracts wishing to extend the ERC165 interfaceIds originally
supported by reading whether the interfaceId queried is supported in the `supportsInterface`
extension if the extension is set, if not it returns false.

<br/>

### \_getExtensionAndForwardValue

```solidity
function _getExtensionAndForwardValue(
  bytes4 functionSelector
) internal view returns (address, bool);
```

Returns the extension address and the boolean indicating whether to forward the value received to the extension, stored under the following data key:

- [`_LSP17_EXTENSION_PREFIX`](#_lsp17_extension_prefix) + `<bytes4>` (Check [LSP2-ERC725YJSONSchema] for encoding the data key).

- If no extension is stored, returns the address(0).

- If the stored value is 20 bytes, return false for the boolean

<br/>

### \_fallbackLSP17Extendable

:::tip Hint

If you would like to forward the `msg.value` to the extension contract, you should store an additional `0x01` byte after the address of the extension under the corresponding LSP17 data key.

:::

```solidity
function _fallbackLSP17Extendable(
  bytes callData
) internal nonpayable returns (bytes);
```

Forwards the call to an extension mapped to a function selector.
Calls [`_getExtensionAndForwardValue`](#_getextensionandforwardvalue) to get the address of the extension mapped to the function selector being
called on the account. If there is no extension, the `address(0)` will be returned.
Forwards the value sent with the call to the extension if the function selector is mapped to a payable extension.
Reverts if there is no extension for the function being called, except for the `bytes4(0)` function selector, which passes even if there is no extension for it.
If there is an extension for the function selector being called, it calls the extension with the
`CALL` opcode, passing the `msg.data` appended with the 20 bytes of the [`msg.sender`](#msg.sender) and 32 bytes of the `msg.value`.

<br/>

### \_verifyCall

```solidity
function _verifyCall(
  address logicVerifier
) internal nonpayable returns (bool verifyAfter);
```

Calls [`lsp20VerifyCall`](#lsp20verifycall) function on the logicVerifier.

<br/>

### \_verifyCallResult

```solidity
function _verifyCallResult(
  address logicVerifier,
  bytes callResult
) internal nonpayable;
```

Calls [`lsp20VerifyCallResult`](#lsp20verifycallresult) function on the logicVerifier.

<br/>

### \_revertWithLSP20DefaultError

```solidity
function _revertWithLSP20DefaultError(
  bool postCall,
  bytes returnedData
) internal pure;
```

<br/>

## Events

### ContractCreated

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#contractcreated)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Event signature: `ContractCreated(uint256,address,uint256,bytes32)`
- Event topic hash: `0xa1fb700aaee2ae4a2ff6f91ce7eba292f89c2f5488b8ec4c5c5c8150692595c3`

:::

```solidity
event ContractCreated(
  uint256 indexed operationType,
  address indexed contractAddress,
  uint256 value,
  bytes32 indexed salt
);
```

_Deployed new contract at address `contractAddress` and funded with `value` wei (deployed using opcode: `operationType`)._

Emitted when a new contract was created and deployed.

#### Parameters

| Name                            |   Type    | Description                                                                                                                               |
| ------------------------------- | :-------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `operationType` **`indexed`**   | `uint256` | The opcode used to deploy the contract (`CREATE` or `CREATE2`).                                                                           |
| `contractAddress` **`indexed`** | `address` | The created contract address.                                                                                                             |
| `value`                         | `uint256` | The amount of native tokens (in Wei) sent to fund the created contract on deployment.                                                     |
| `salt` **`indexed`**            | `bytes32` | The salt used to deterministically deploy the contract (`CREATE2` only). If `CREATE` opcode is used, the salt value will be `bytes32(0)`. |

<br/>

### DataChanged

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#datachanged)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Event signature: `DataChanged(bytes32,bytes)`
- Event topic hash: `0xece574603820d07bc9b91f2a932baadf4628aabcb8afba49776529c14a6104b2`

:::

```solidity
event DataChanged(bytes32 indexed dataKey, bytes dataValue);
```

_The following data key/value pair has been changed in the ERC725Y storage: Data key: `dataKey`, data value: `dataValue`._

Emitted when data at a specific `dataKey` was changed to a new value `dataValue`.

#### Parameters

| Name                    |   Type    | Description                                  |
| ----------------------- | :-------: | -------------------------------------------- |
| `dataKey` **`indexed`** | `bytes32` | The data key for which a bytes value is set. |
| `dataValue`             |  `bytes`  | The value to set for the given data key.     |

<br/>

### Executed

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#executed)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Event signature: `Executed(uint256,address,uint256,bytes4)`
- Event topic hash: `0x4810874456b8e6487bd861375cf6abd8e1c8bb5858c8ce36a86a04dabfac199e`

:::

```solidity
event Executed(
  uint256 indexed operationType,
  address indexed target,
  uint256 value,
  bytes4 indexed selector
);
```

_Called address `target` using `operationType` with `value` wei and `data`._

Emitted when calling an address `target` (EOA or contract) with `value`.

#### Parameters

| Name                          |   Type    | Description                                                                                          |
| ----------------------------- | :-------: | ---------------------------------------------------------------------------------------------------- |
| `operationType` **`indexed`** | `uint256` | The low-level call opcode used to call the `target` address (`CALL`, `STATICCALL` or `DELEGATECALL`). |
| `target` **`indexed`**        | `address` | The address to call. `target` will be unused if a contract is created (operation types 1 and 2).     |
| `value`                       | `uint256` | The amount of native tokens transferred along the call (in Wei).                                     |
| `selector` **`indexed`**      | `bytes4`  | The first 4 bytes (= function selector) of the data sent with the call.                              |

<br/>

### OwnershipRenounced

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#ownershiprenounced)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Event signature: `OwnershipRenounced()`
- Event topic hash: `0xd1f66c3d2bc1993a86be5e3d33709d98f0442381befcedd29f578b9b2506b1ce`

:::

```solidity
event OwnershipRenounced();
```

_Successfully renounced ownership of the contract. This contract is now owned by anyone, it's owner is `address(0)`._

Emitted when the ownership of the contract has been renounced.

<br/>

### OwnershipTransferStarted

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#ownershiptransferstarted)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Event signature: `OwnershipTransferStarted(address,address)`
- Event topic hash: `0x38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700`

:::

```solidity
event OwnershipTransferStarted(
  address indexed previousOwner,
  address indexed newOwner
);
```

_The transfer of ownership of the contract was initiated. Pending new owner set to: `newOwner`._

Emitted when [`transferOwnership(..)`](#transferownership) was called and the first step of transferring ownership completed successfully which leads to [`pendingOwner`](#pendingowner) being updated.

#### Parameters

| Name                          |   Type    | Description                        |
| ----------------------------- | :-------: | ---------------------------------- |
| `previousOwner` **`indexed`** | `address` | The address of the previous owner. |
| `newOwner` **`indexed`**      | `address` | The address of the new owner.      |

<br/>

### OwnershipTransferred

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#ownershiptransferred)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Event signature: `OwnershipTransferred(address,address)`
- Event topic hash: `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0`

:::

```solidity
event OwnershipTransferred(
  address indexed previousOwner,
  address indexed newOwner
);
```

#### Parameters

| Name                          |   Type    | Description |
| ----------------------------- | :-------: | ----------- |
| `previousOwner` **`indexed`** | `address` | -           |
| `newOwner` **`indexed`**      | `address` | -           |

<br/>

### RenounceOwnershipStarted

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#renounceownershipstarted)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Event signature: `RenounceOwnershipStarted()`
- Event topic hash: `0x81b7f830f1f0084db6497c486cbe6974c86488dcc4e3738eab94ab6d6b1653e7`

:::

```solidity
event RenounceOwnershipStarted();
```

_Ownership renouncement initiated._

Emitted when starting the [`renounceOwnership(..)`](#renounceownership) 2-step process.

<br/>

### UniversalReceiver

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#universalreceiver)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Event signature: `UniversalReceiver(address,uint256,bytes32,bytes,bytes)`
- Event topic hash: `0x9c3ba68eb5742b8e3961aea0afc7371a71bf433c8a67a831803b64c064a178c2`

:::

```solidity
event UniversalReceiver(
  address indexed from,
  uint256 indexed value,
  bytes32 indexed typeId,
  bytes receivedData,
  bytes returnedValue
);
```

\*Address `from` called the `universalReceiver(...)` function while sending `value` LYX. Notification type (typeId): `typeId`

- Data received: `receivedData`.\*

Emitted when the [`universalReceiver`](#universalreceiver) function was called with a specific `typeId` and some `receivedData`

#### Parameters

| Name                   |   Type    | Description                                                                                                                                                                             |
| ---------------------- | :-------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from` **`indexed`**   | `address` | The address of the EOA or smart contract that called the [`universalReceiver(...)`](#universalreceiver) function.                                                                       |
| `value` **`indexed`**  | `uint256` | The amount sent to the [`universalReceiver(...)`](#universalreceiver) function.                                                                                                         |
| `typeId` **`indexed`** | `bytes32` | A `bytes32` unique identifier (= _"hook"_)that describe the type of notification, information or transaction received by the contract. Can be related to a specific standard or a hook. |
| `receivedData`         |  `bytes`  | Any arbitrary data that was sent to the [`universalReceiver(...)`](#universalreceiver) function.                                                                                        |
| `returnedValue`        |  `bytes`  | The value returned by the [`universalReceiver(...)`](#universalreceiver) function.                                                                                                      |

<br/>

## Errors

### ERC725X_ContractDeploymentFailed

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725x_contractdeploymentfailed)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725X_ContractDeploymentFailed()`
- Error hash: `0x0b07489b`

:::

```solidity
error ERC725X_ContractDeploymentFailed();
```

Reverts when contract deployment failed via [`execute`](#execute) or [`executeBatch`](#executebatch) functions, This error can occur using either operation type 1 (`CREATE`) or 2 (`CREATE2`).

<br/>

### ERC725X_CreateOperationsRequireEmptyRecipientAddress

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725x_createoperationsrequireemptyrecipientaddress)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725X_CreateOperationsRequireEmptyRecipientAddress()`
- Error hash: `0x3041824a`

:::

```solidity
error ERC725X_CreateOperationsRequireEmptyRecipientAddress();
```

Reverts when passing a `to` address that is not `address(0)` (= address zero) while deploying a contract via [`execute`](#execute) or [`executeBatch`](#executebatch) functions. This error can occur using either operation type 1 (`CREATE`) or 2 (`CREATE2`).

<br/>

### ERC725X_ExecuteParametersEmptyArray

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725x_executeparametersemptyarray)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725X_ExecuteParametersEmptyArray()`
- Error hash: `0xe9ad2b5f`

:::

```solidity
error ERC725X_ExecuteParametersEmptyArray();
```

Reverts when one of the array parameter provided to the [`executeBatch`](#executebatch) function is an empty array.

<br/>

### ERC725X_ExecuteParametersLengthMismatch

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725x_executeparameterslengthmismatch)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725X_ExecuteParametersLengthMismatch()`
- Error hash: `0x3ff55f4d`

:::

```solidity
error ERC725X_ExecuteParametersLengthMismatch();
```

Reverts when there is not the same number of elements in the `operationTypes`, `targets` addresses, `values`, and `datas` array parameters provided when calling the [`executeBatch`](#executebatch) function.

<br/>

### ERC725X_InsufficientBalance

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725x_insufficientbalance)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725X_InsufficientBalance(uint256,uint256)`
- Error hash: `0x0df9a8f8`

:::

```solidity
error ERC725X_InsufficientBalance(uint256 balance, uint256 value);
```

Reverts when trying to send more native tokens `value` than available in current `balance`.

#### Parameters

| Name      |   Type    | Description                                                                                                                            |
| --------- | :-------: | -------------------------------------------------------------------------------------------------------------------------------------- |
| `balance` | `uint256` | The balance of native tokens of the ERC725X smart contract.                                                                            |
| `value`   | `uint256` | The amount of native tokens sent via `ERC725X.execute(...)`/`ERC725X.executeBatch(...)` that is greater than the contract's `balance`. |

<br/>

### ERC725X_MsgValueDisallowedInDelegateCall

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725x_msgvaluedisallowedindelegatecall)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725X_MsgValueDisallowedInDelegateCall()`
- Error hash: `0x5ac83135`

:::

```solidity
error ERC725X_MsgValueDisallowedInDelegateCall();
```

Reverts when trying to send native tokens (`value` / `values[]` parameter of [`execute`](#execute) or [`executeBatch`](#executebatch) functions) while making a `delegatecall` (`operationType == 4`). Sending native tokens via `staticcall` is not allowed because `msg.value` is persisting.

<br/>

### ERC725X_MsgValueDisallowedInStaticCall

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725x_msgvaluedisallowedinstaticcall)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725X_MsgValueDisallowedInStaticCall()`
- Error hash: `0x72f2bc6a`

:::

```solidity
error ERC725X_MsgValueDisallowedInStaticCall();
```

Reverts when trying to send native tokens (`value` / `values[]` parameter of [`execute`](#execute) or [`executeBatch`](#executebatch) functions) while making a `staticcall` (`operationType == 3`). Sending native tokens via `staticcall` is not allowed because it is a state changing operation.

<br/>

### ERC725X_NoContractBytecodeProvided

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725x_nocontractbytecodeprovided)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725X_NoContractBytecodeProvided()`
- Error hash: `0xb81cd8d9`

:::

```solidity
error ERC725X_NoContractBytecodeProvided();
```

Reverts when no contract bytecode was provided as parameter when trying to deploy a contract via [`execute`](#execute) or [`executeBatch`](#executebatch). This error can occur using either operation type 1 (`CREATE`) or 2 (`CREATE2`).

<br/>

### ERC725X_UnknownOperationType

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725x_unknownoperationtype)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725X_UnknownOperationType(uint256)`
- Error hash: `0x7583b3bc`

:::

```solidity
error ERC725X_UnknownOperationType(uint256 operationTypeProvided);
```

Reverts when the `operationTypeProvided` is none of the default operation types available. (CALL = 0; CREATE = 1; CREATE2 = 2; STATICCALL = 3; DELEGATECALL = 4)

#### Parameters

| Name                    |   Type    | Description                                                                                            |
| ----------------------- | :-------: | ------------------------------------------------------------------------------------------------------ |
| `operationTypeProvided` | `uint256` | The unrecognised operation type number provided to `ERC725X.execute(...)`/`ERC725X.executeBatch(...)`. |

<br/>

### ERC725Y_DataKeysValuesEmptyArray

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725y_datakeysvaluesemptyarray)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725Y_DataKeysValuesEmptyArray()`
- Error hash: `0x97da5f95`

:::

```solidity
error ERC725Y_DataKeysValuesEmptyArray();
```

Reverts when one of the array parameter provided to [`setDataBatch`](#setdatabatch) function is an empty array.

<br/>

### ERC725Y_DataKeysValuesLengthMismatch

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#erc725y_datakeysvalueslengthmismatch)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `ERC725Y_DataKeysValuesLengthMismatch()`
- Error hash: `0x3bcc8979`

:::

```solidity
error ERC725Y_DataKeysValuesLengthMismatch();
```

Reverts when there is not the same number of elements in the `datakeys` and `dataValues` array parameters provided when calling the [`setDataBatch`](#setdatabatch) function.

<br/>

### LSP14CallerNotPendingOwner

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp14callernotpendingowner)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `LSP14CallerNotPendingOwner(address)`
- Error hash: `0x451e4528`

:::

```solidity
error LSP14CallerNotPendingOwner(address caller);
```

Reverts when the `caller` that is trying to accept ownership of the contract is not the pending owner.

#### Parameters

| Name     |   Type    | Description                                 |
| -------- | :-------: | ------------------------------------------- |
| `caller` | `address` | The address that tried to accept ownership. |

<br/>

### LSP14CannotTransferOwnershipToSelf

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp14cannottransferownershiptoself)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `LSP14CannotTransferOwnershipToSelf()`
- Error hash: `0xe052a6f8`

:::

```solidity
error LSP14CannotTransferOwnershipToSelf();
```

_Cannot transfer ownership to the address of the contract itself._

Reverts when trying to transfer ownership to the `address(this)`.

<br/>

### LSP14MustAcceptOwnershipInSeparateTransaction

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp14mustacceptownershipinseparatetransaction)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `LSP14MustAcceptOwnershipInSeparateTransaction()`
- Error hash: `0x5758dd07`

:::

```solidity
error LSP14MustAcceptOwnershipInSeparateTransaction();
```

_Cannot accept ownership in the same transaction with [`transferOwnership(...)`](#transferownership)._

Reverts when pending owner accept ownership in the same transaction of transferring ownership.

<br/>

### LSP14NotInRenounceOwnershipInterval

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp14notinrenounceownershipinterval)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `LSP14NotInRenounceOwnershipInterval(uint256,uint256)`
- Error hash: `0x1b080942`

:::

```solidity
error LSP14NotInRenounceOwnershipInterval(
  uint256 renounceOwnershipStart,
  uint256 renounceOwnershipEnd
);
```

_Cannot confirm ownership renouncement yet. The ownership renouncement is allowed from: `renounceOwnershipStart` until: `renounceOwnershipEnd`._

Reverts when trying to renounce ownership before the initial confirmation delay.

#### Parameters

| Name                     |   Type    | Description                                                             |
| ------------------------ | :-------: | ----------------------------------------------------------------------- |
| `renounceOwnershipStart` | `uint256` | The start timestamp when one can confirm the renouncement of ownership. |
| `renounceOwnershipEnd`   | `uint256` | The end timestamp when one can confirm the renouncement of ownership.   |

<br/>

### LSP20CallVerificationFailed

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp20callverificationfailed)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `LSP20CallVerificationFailed(bool,bytes4)`
- Error hash: `0x9d6741e3`

:::

```solidity
error LSP20CallVerificationFailed(bool postCall, bytes4 returnedStatus);
```

reverts when the call to the owner does not return the LSP20 success value

#### Parameters

| Name             |   Type   | Description                                             |
| ---------------- | :------: | ------------------------------------------------------- |
| `postCall`       |  `bool`  | True if the execution call was done, False otherwise    |
| `returnedStatus` | `bytes4` | The bytes4 decoded data returned by the logic verifier. |

<br/>

### LSP20CallingVerifierFailed

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp20callingverifierfailed)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `LSP20CallingVerifierFailed(bool)`
- Error hash: `0x8c6a8ae3`

:::

```solidity
error LSP20CallingVerifierFailed(bool postCall);
```

reverts when the call to the owner fail with no revert reason

#### Parameters

| Name       |  Type  | Description                                          |
| ---------- | :----: | ---------------------------------------------------- |
| `postCall` | `bool` | True if the execution call was done, False otherwise |

<br/>

### LSP20EOACannotVerifyCall

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp20eoacannotverifycall)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `LSP20EOACannotVerifyCall(address)`
- Error hash: `0x0c392301`

:::

```solidity
error LSP20EOACannotVerifyCall(address logicVerifier);
```

Reverts when the logic verifier is an Externally Owned Account (EOA) that cannot return the LSP20 success value.

#### Parameters

| Name            |   Type    | Description                       |
| --------------- | :-------: | --------------------------------- |
| `logicVerifier` | `address` | The address of the logic verifier |

<br/>

### NoExtensionFoundForFunctionSelector

:::note References

- Specification details: [**UniversalProfile**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#noextensionfoundforfunctionselector)
- Solidity implementation: [`UniversalProfile.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts/contracts/UniversalProfile.sol)
- Error signature: `NoExtensionFoundForFunctionSelector(bytes4)`
- Error hash: `0xbb370b2b`

:::

```solidity
error NoExtensionFoundForFunctionSelector(bytes4 functionSelector);
```

reverts when there is no extension for the function selector being called with

#### Parameters

| Name               |   Type   | Description |
| ------------------ | :------: | ----------- |
| `functionSelector` | `bytes4` | -           |

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

[ERC725]: https://docs.lukso.tech/standards/erc725
[UniversalProfile]: https://docs.lukso.tech/standards/accounts/introduction
[LSP0ERC725Account]: https://docs.lukso.tech/standards/accounts/lsp0-erc725account
[LSP1UniversalReceiver]: https://docs.lukso.tech/standards/accounts/lsp1-universal-receiver
[LSP1UniversalReceiverDelegate]: https://docs.lukso.tech/standards/accounts/lsp1-universal-receiver-delegate
[LSP2ERC725YJSONSchema]: https://docs.lukso.tech/standards/metadata/lsp2-json-schema
[LSP4DigitalAssetMetadata]: https://docs.lukso.tech/standards/tokens/LSP4-Digital-Asset-Metadata
[LSP5ReceivedVaults]: https://docs.lukso.tech/standards/metadata/lsp5-received-assets
[LSP6KeyManager]: https://docs.lukso.tech/standards/access-control/lsp6-key-manager
[LSP7DigitalAsset]: https://docs.lukso.tech/standards/tokens/LSP7-Digital-Asset
[LSP8IdentifiableDigitalAsset]: https://docs.lukso.tech/standards/tokens/LSP8-Identifiable-Digital-Asset
[LSP10ReceivedVaults]: https://docs.lukso.tech/standards/metadata/lsp10-received-vaults
[LSP14Ownable2Step]: https://docs.lukso.tech/standards/access-control/lsp14-ownable-2-step
[LSP17ContractExtension]: https://docs.lukso.tech/standards/accounts/lsp17-contract-extension
[LSP20CallVerification]: https://docs.lukso.tech/standards/accounts/lsp20-call-verification

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
