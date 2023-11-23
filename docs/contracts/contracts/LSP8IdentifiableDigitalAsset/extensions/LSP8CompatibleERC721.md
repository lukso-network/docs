<!-- This file is auto-generated. Do not edit! -->
<!-- Check `@lukso-network/lsp-smart-contracts/CONTRIBUTING.md#solidity-code-comments` for more information. -->

# LSP8CompatibleERC721

:::info Standard Specifications

[`LSP-8-IdentifiableDigitalAsset`](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)

:::
:::info Solidity implementation

[`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)

:::

LSP8 extension, for compatibility for clients / tools that expect ERC721.

## Public Methods

Public methods are accessible externally from users, allowing interaction with this function from dApps or other smart contracts.
When marked as 'public', a method can be called both externally and internally, on the other hand, when marked as 'external', a method can only be called externally.

### fallback

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#fallback)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)

:::

```solidity
fallback(bytes calldata callData) external payable returns (bytes memory);
```

_The `fallback` function was called with the following amount of native tokens: `msg.value`; and the following calldata: `callData`._

Achieves the goal of [LSP-17-ContractExtension] standard by extending the contract to handle calls of functions that do not exist natively,
forwarding the function call to the extension address mapped to the function being called.
This function is executed when:

- Sending data of length less than 4 bytes to the contract.

- The first 4 bytes of the calldata do not match any publicly callable functions from the contract ABI.

- Receiving native tokens

1. If the data is equal or longer than 4 bytes, the [ERC-725Y] storage is queried with the following data key: [_LSP17_EXTENSION_PREFIX] + `bytes4(msg.sig)` (Check [LSP-2-ERC725YJSONSchema] for encoding the data key)

- If there is no address stored under the following data key, revert with [`NoExtensionFoundForFunctionSelector(bytes4)`](#noextensionfoundforfunctionselector). The data key relative to `bytes4(0)` is an exception, where no reverts occurs if there is no extension address stored under. This exception is made to allow users to send random data (graffiti) to the account and to be able to react on it.

- If there is an address, forward the `msg.data` to the extension using the CALL opcode, appending 52 bytes (20 bytes of `msg.sender` and 32 bytes of `msg.value`). Return what the calls returns, or revert if the call failed.

2. If the data sent to this function is of length less than 4 bytes (not a function selector), revert.

<br/>

### receive

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#receive)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)

:::

```solidity
receive() external payable;
```

_LSP8 contract cannot receive native tokens._

Reverts whenever someone tries to send native tokens to a LSP8 contract.

<br/>

### approve

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#approve)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `approve(address,uint256)`
- Function selector: `0x095ea7b3`

:::

```solidity
function approve(address operator, uint256 tokenId) external nonpayable;
```

_Calling `approve` function to approve operator at address `operator` to transfer tokenId `tokenId` on behalf of its owner._

Approval function compatible with ERC721 `approve(address,uint256)`.

#### Parameters

| Name       |   Type    | Description                           |
| ---------- | :-------: | ------------------------------------- |
| `operator` | `address` | The address to approve for `tokenId`. |
| `tokenId`  | `uint256` | The tokenId to approve.               |

<br/>

### authorizeOperator

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#authorizeoperator)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `authorizeOperator(address,bytes32,bytes)`
- Function selector: `0x86a10ddd`

:::

```solidity
function authorizeOperator(
  address operator,
  bytes32 tokenId,
  bytes operatorNotificationData
) external nonpayable;
```

Allow an `operator` address to transfer or burn a specific `tokenId` on behalf of its token owner. See [`isOperatorFor`](#isoperatorfor). Notify the operator based on the LSP1-UniversalReceiver standard

<blockquote>

**Emitted events:**

- LSP7 [`AuthorizedOperator`](#authorizedoperator) event.
- ERC721 [`Approval`](#approval) event.

</blockquote>

#### Parameters

| Name                       |   Type    | Description                                     |
| -------------------------- | :-------: | ----------------------------------------------- |
| `operator`                 | `address` | The address to authorize as an operator.        |
| `tokenId`                  | `bytes32` | The token ID operator has access to.            |
| `operatorNotificationData` |  `bytes`  | The data to notify the operator about via LSP1. |

<br/>

### balanceOf

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#balanceof)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `balanceOf(address)`
- Function selector: `0x70a08231`

:::

```solidity
function balanceOf(address tokenOwner) external view returns (uint256);
```

Get the number of token IDs owned by `tokenOwner`.

#### Parameters

| Name         |   Type    | Description             |
| ------------ | :-------: | ----------------------- |
| `tokenOwner` | `address` | The address to query \* |

#### Returns

| Name |   Type    | Description                                           |
| ---- | :-------: | ----------------------------------------------------- |
| `0`  | `uint256` | The total number of token IDs that `tokenOwner` owns. |

<br/>

### getApproved

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#getapproved)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `getApproved(uint256)`
- Function selector: `0x081812fc`

:::

```solidity
function getApproved(uint256 tokenId) external view returns (address);
```

_Retrieving the address other than the token owner that is approved to transfer tokenId `tokenId` on behalf of its owner._

Compatible with ERC721 getApproved.

#### Parameters

| Name      |   Type    | Description           |
| --------- | :-------: | --------------------- |
| `tokenId` | `uint256` | The tokenId to query. |

#### Returns

| Name |   Type    | Description                                |
| ---- | :-------: | ------------------------------------------ |
| `0`  | `address` | The address of the operator for `tokenId`. |

<br/>

### getData

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#getdata)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
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

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#getdatabatch)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
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

### getOperatorsOf

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#getoperatorsof)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `getOperatorsOf(bytes32)`
- Function selector: `0x49a6078d`

:::

```solidity
function getOperatorsOf(bytes32 tokenId) external view returns (address[]);
```

Returns all `operator` addresses that are allowed to transfer or burn a specific `tokenId` on behalf of its owner.

#### Parameters

| Name      |   Type    | Description                            |
| --------- | :-------: | -------------------------------------- |
| `tokenId` | `bytes32` | The token ID to get the operators for. |

#### Returns

| Name |    Type     | Description                                                                                                  |
| ---- | :---------: | ------------------------------------------------------------------------------------------------------------ |
| `0`  | `address[]` | An array of operators allowed to transfer or burn a specific `tokenId`. Requirements - `tokenId` must exist. |

<br/>

### isApprovedForAll

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#isapprovedforall)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `isApprovedForAll(address,address)`
- Function selector: `0xe985e9c5`

:::

```solidity
function isApprovedForAll(
  address tokenOwner,
  address operator
) external view returns (bool);
```

_Checking if address `operator` is approved to transfer any tokenId owned by address `owner`._

Compatible with ERC721 isApprovedForAll.

#### Parameters

| Name         |   Type    | Description                      |
| ------------ | :-------: | -------------------------------- |
| `tokenOwner` | `address` | The tokenOwner address to query. |
| `operator`   | `address` | The operator address to query.   |

#### Returns

| Name |  Type  | Description                                                                 |
| ---- | :----: | --------------------------------------------------------------------------- |
| `0`  | `bool` | Returns if the `operator` is allowed to manage all of the assets of `owner` |

<br/>

### isOperatorFor

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#isoperatorfor)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `isOperatorFor(address,bytes32)`
- Function selector: `0x2a3654a4`

:::

```solidity
function isOperatorFor(
  address operator,
  bytes32 tokenId
) external view returns (bool);
```

Returns whether `operator` address is an operator for a given `tokenId`.

#### Parameters

| Name       |   Type    | Description                                                   |
| ---------- | :-------: | ------------------------------------------------------------- |
| `operator` | `address` | The address to query operator status for.                     |
| `tokenId`  | `bytes32` | The token ID to check if `operator` is allowed to operate on. |

#### Returns

| Name |  Type  | Description                                                           |
| ---- | :----: | --------------------------------------------------------------------- |
| `0`  | `bool` | `true` if `operator` is an operator for `tokenId`, `false` otherwise. |

<br/>

### name

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#name)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `name()`
- Function selector: `0x06fdde03`

:::

```solidity
function name() external view returns (string);
```

Returns the name of the token. For compatibility with clients & tools that expect ERC721.

#### Returns

| Name |   Type   | Description           |
| ---- | :------: | --------------------- |
| `0`  | `string` | The name of the token |

<br/>

### owner

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#owner)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
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

### ownerOf

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#ownerof)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `ownerOf(uint256)`
- Function selector: `0x6352211e`

:::

```solidity
function ownerOf(uint256 tokenId) external view returns (address);
```

_Retrieving the address that own tokenId `tokenId`._

Compatible with ERC721 ownerOf.

#### Parameters

| Name      |   Type    | Description           |
| --------- | :-------: | --------------------- |
| `tokenId` | `uint256` | The tokenId to query. |

#### Returns

| Name |   Type    | Description               |
| ---- | :-------: | ------------------------- |
| `0`  | `address` | The owner of the tokenId. |

<br/>

### renounceOwnership

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#renounceownership)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `renounceOwnership()`
- Function selector: `0x715018a6`

:::

```solidity
function renounceOwnership() external nonpayable;
```

Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

<br/>

### revokeOperator

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#revokeoperator)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `revokeOperator(address,bytes32,bool,bytes)`
- Function selector: `0xdb8c9663`

:::

```solidity
function revokeOperator(
  address operator,
  bytes32 tokenId,
  bool notify,
  bytes operatorNotificationData
) external nonpayable;
```

Remove access of `operator` for a given `tokenId`, disallowing it to transfer `tokenId` on behalf of its owner. See also [`isOperatorFor`](#isoperatorfor).

#### Parameters

| Name                       |   Type    | Description                                              |
| -------------------------- | :-------: | -------------------------------------------------------- |
| `operator`                 | `address` | The address to revoke as an operator.                    |
| `tokenId`                  | `bytes32` | The tokenId `operator` is revoked from operating on.     |
| `notify`                   |  `bool`   | Boolean indicating whether to notify the operator or not |
| `operatorNotificationData` |  `bytes`  | The data to notify the operator about via LSP1.          |

<br/>

### safeTransferFrom

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#safetransferfrom)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `safeTransferFrom(address,address,uint256)`
- Function selector: `0x42842e0e`

:::

:::info

This function sets the `force` parameter to `true` so that EOAs and any contract can receive the `tokenId`.

:::

```solidity
function safeTransferFrom(
  address from,
  address to,
  uint256 tokenId
) external nonpayable;
```

_Calling `safeTransferFrom` function to transfer tokenId `tokenId` from address `from` to address `to`._

Safe Transfer function without optional data from the ERC721 standard interface.

#### Parameters

| Name      |   Type    | Description              |
| --------- | :-------: | ------------------------ |
| `from`    | `address` | The sending address.     |
| `to`      | `address` | The receiving address.   |
| `tokenId` | `uint256` | The tokenId to transfer. |

<br/>

### safeTransferFrom

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#safetransferfrom)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `safeTransferFrom(address,address,uint256,bytes)`
- Function selector: `0xb88d4fde`

:::

:::info

This function sets the `force` parameter to `true` so that EOAs and any contract can receive the `tokenId`.

:::

```solidity
function safeTransferFrom(
  address from,
  address to,
  uint256 tokenId,
  bytes data
) external nonpayable;
```

_Calling `safeTransferFrom` function to transfer tokenId `tokenId` from address `from` to address `to`._

Safe Transfer function with optional data from the ERC721 standard interface.

#### Parameters

| Name      |   Type    | Description                            |
| --------- | :-------: | -------------------------------------- |
| `from`    | `address` | The sending address.                   |
| `to`      | `address` | The receiving address.                 |
| `tokenId` | `uint256` | The tokenId to transfer.               |
| `data`    |  `bytes`  | The data to be sent with the transfer. |

<br/>

### setApprovalForAll

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#setapprovalforall)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `setApprovalForAll(address,bool)`
- Function selector: `0xa22cb465`

:::

```solidity
function setApprovalForAll(address operator, bool approved) external nonpayable;
```

_Setting the "approval for all" status of operator `_operator` to `_approved` to allow it to transfer any tokenIds on behalf of `msg.sender`._

Enable or disable approval for a third party ("operator") to manage all of `msg.sender`'s assets. The contract MUST allow multiple operators per owner. See [`_setApprovalForAll`](#_setapprovalforall)

<blockquote>

**Emitted events:**

- [`ApprovalForAll`](#approvalforall) event

</blockquote>

#### Parameters

| Name       |   Type    | Description                                                 |
| ---------- | :-------: | ----------------------------------------------------------- |
| `operator` | `address` | Address to add to the set of authorized operators.          |
| `approved` |  `bool`   | True if the operator is approved, false to revoke approval. |

<br/>

### setData

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#setdata)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `setData(bytes32,bytes)`
- Function selector: `0x7f23690c`

:::

:::caution Warning

**Note for developers:** despite the fact that this function is set as `payable`, if the function is not intended to receive value (= native tokens), **an additional check should be implemented to ensure that `msg.value` sent was equal to 0**.

:::

```solidity
function setData(bytes32 dataKey, bytes dataValue) external payable;
```

_Setting the following data key value pair in the ERC725Y storage. Data key: `dataKey`, data value: `dataValue`._

Sets a single bytes value `dataValue` in the ERC725Y storage for a specific data key `dataKey`. The function is marked as payable to enable flexibility on child contracts. For instance to implement a fee mechanism for setting specific data.

<blockquote>

**Requirements:**

- SHOULD only be callable by the [`owner`](#owner).

</blockquote>

<blockquote>

**Emitted events:**

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

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#setdatabatch)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `setDataBatch(bytes32[],bytes[])`
- Function selector: `0x97902421`

:::

:::caution Warning

**Note for developers:** despite the fact that this function is set as `payable`, if the function is not intended to receive value (= native tokens), **an additional check should be implemented to ensure that `msg.value` sent was equal to 0**.

:::

```solidity
function setDataBatch(bytes32[] dataKeys, bytes[] dataValues) external payable;
```

_Setting the following data key value pairs in the ERC725Y storage. Data keys: `dataKeys`, data values: `dataValues`._

Batch data setting function that behaves the same as [`setData`](#setdata) but allowing to set multiple data key/value pairs in the ERC725Y storage in the same transaction.

<blockquote>

**Requirements:**

- SHOULD only be callable by the [`owner`](#owner) of the contract.

</blockquote>

<blockquote>

**Emitted events:**

- [`DataChanged`](#datachanged) event **for each data key/value pair set**.

</blockquote>

#### Parameters

| Name         |    Type     | Description                                          |
| ------------ | :---------: | ---------------------------------------------------- |
| `dataKeys`   | `bytes32[]` | An array of data keys to set bytes values for.       |
| `dataValues` |  `bytes[]`  | An array of bytes values to set for each `dataKeys`. |

<br/>

### supportsInterface

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#supportsinterface)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `supportsInterface(bytes4)`
- Function selector: `0x01ffc9a7`

:::

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool);
```

Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section] to learn more about how these ids are created. This function call must use less than 30 000 gas.

#### Parameters

| Name          |   Type   | Description |
| ------------- | :------: | ----------- |
| `interfaceId` | `bytes4` | -           |

#### Returns

| Name |  Type  | Description |
| ---- | :----: | ----------- |
| `0`  | `bool` | -           |

<br/>

### symbol

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#symbol)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `symbol()`
- Function selector: `0x95d89b41`

:::

```solidity
function symbol() external view returns (string);
```

Returns the symbol of the token, usually a shorter version of the name. For compatibility with clients & tools that expect ERC721.

#### Returns

| Name |   Type   | Description             |
| ---- | :------: | ----------------------- |
| `0`  | `string` | The symbol of the token |

<br/>

### tokenIdsOf

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#tokenidsof)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `tokenIdsOf(address)`
- Function selector: `0xa3b261f2`

:::

```solidity
function tokenIdsOf(address tokenOwner) external view returns (bytes32[]);
```

Returns the list of token IDs that the `tokenOwner` address owns.

#### Parameters

| Name         |   Type    | Description                                                |
| ------------ | :-------: | ---------------------------------------------------------- |
| `tokenOwner` | `address` | The address that we want to get the list of token IDs for. |

#### Returns

| Name |    Type     | Description                                             |
| ---- | :---------: | ------------------------------------------------------- |
| `0`  | `bytes32[]` | An array of `bytes32[] tokenIds` owned by `tokenOwner`. |

<br/>

### tokenOwnerOf

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#tokenownerof)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `tokenOwnerOf(bytes32)`
- Function selector: `0x217b2270`

:::

```solidity
function tokenOwnerOf(bytes32 tokenId) external view returns (address);
```

Returns the list of `tokenIds` for the `tokenOwner` address.

#### Parameters

| Name      |   Type    | Description                                  |
| --------- | :-------: | -------------------------------------------- |
| `tokenId` | `bytes32` | tokenOwner The address to query owned tokens |

#### Returns

| Name |   Type    | Description                               |
| ---- | :-------: | ----------------------------------------- |
| `0`  | `address` | The owner address of the given `tokenId`. |

<br/>

### tokenURI

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#tokenuri)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `tokenURI(uint256)`
- Function selector: `0xc87b56dd`

:::

```solidity
function tokenURI(uint256) external view returns (string);
```

_Retrieving the token URI of tokenId `tokenId`._

Compatible with ERC721Metadata tokenURI. Retrieve the tokenURI for a specific `tokenId`.

#### Parameters

| Name |   Type    | Description |
| ---- | :-------: | ----------- |
| `_0` | `uint256` | -           |

#### Returns

| Name |   Type   | Description    |
| ---- | :------: | -------------- |
| `0`  | `string` | The token URI. |

<br/>

### totalSupply

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#totalsupply)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `totalSupply()`
- Function selector: `0x18160ddd`

:::

```solidity
function totalSupply() external view returns (uint256);
```

Returns the number of existing tokens that have been minted in this contract.

#### Returns

| Name |   Type    | Description                    |
| ---- | :-------: | ------------------------------ |
| `0`  | `uint256` | The number of existing tokens. |

<br/>

### transfer

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#transfer)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `transfer(address,address,bytes32,bool,bytes)`
- Function selector: `0x511b6952`

:::

```solidity
function transfer(
  address from,
  address to,
  bytes32 tokenId,
  bool force,
  bytes data
) external nonpayable;
```

Transfer a given `tokenId` token from the `from` address to the `to` address. If operators are set for a specific `tokenId`, all the operators are revoked after the tokenId have been transferred. The `force` parameter MUST be set to `true` when transferring tokens to Externally Owned Accounts (EOAs) or contracts that do not implement the LSP1 standard.

#### Parameters

| Name      |   Type    | Description                                                                                                                                                         |
| --------- | :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`    | `address` | The address that owns the given `tokenId`.                                                                                                                          |
| `to`      | `address` | The address that will receive the `tokenId`.                                                                                                                        |
| `tokenId` | `bytes32` | The token ID to transfer.                                                                                                                                           |
| `force`   |  `bool`   | When set to `true`, the `to` address CAN be any addres. When set to `false`, the `to` address MUST be a contract that supports the LSP1 UniversalReceiver standard. |
| `data`    |  `bytes`  | Any additional data the caller wants included in the emitted event, and sent in the hooks of the `from` and `to` addresses.                                         |

<br/>

### transferBatch

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#transferbatch)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `transferBatch(address[],address[],bytes32[],bool[],bytes[])`
- Function selector: `0x7e87632c`

:::

```solidity
function transferBatch(
  address[] from,
  address[] to,
  bytes32[] tokenId,
  bool[] force,
  bytes[] data
) external nonpayable;
```

Transfers multiple tokens at once based on the arrays of `from`, `to` and `tokenId`. If any transfer fails, the whole call will revert.

#### Parameters

| Name      |    Type     | Description                                                                                                                               |
| --------- | :---------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `from`    | `address[]` | An array of sending addresses.                                                                                                            |
| `to`      | `address[]` | An array of recipient addresses.                                                                                                          |
| `tokenId` | `bytes32[]` | An array of token IDs to transfer.                                                                                                        |
| `force`   |  `bool[]`   | When set to `true`, `to` may be any address. When set to `false`, `to` must be a contract that supports the LSP1 standard and not revert. |
| `data`    |  `bytes[]`  | Any additional data the caller wants included in the emitted event, and sent in the hooks to the `from` and `to` addresses.               |

<br/>

### transferFrom

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#transferfrom)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `transferFrom(address,address,uint256)`
- Function selector: `0x23b872dd`

:::

:::info

This function sets the `force` parameter to `true` so that EOAs and any contract can receive the `tokenId`.

:::

```solidity
function transferFrom(
  address from,
  address to,
  uint256 tokenId
) external nonpayable;
```

_Calling `transferFrom` function to transfer tokenId `tokenId` from address `from` to address `to`._

Transfer functions from the ERC721 standard interface.

#### Parameters

| Name      |   Type    | Description              |
| --------- | :-------: | ------------------------ |
| `from`    | `address` | The sending address.     |
| `to`      | `address` | The receiving address.   |
| `tokenId` | `uint256` | The tokenId to transfer. |

<br/>

### transferOwnership

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#transferownership)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Function signature: `transferOwnership(address)`
- Function selector: `0xf2fde38b`

:::

```solidity
function transferOwnership(address newOwner) external nonpayable;
```

Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.

#### Parameters

| Name       |   Type    | Description |
| ---------- | :-------: | ----------- |
| `newOwner` | `address` | -           |

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

The ERC725Y data key `_LSP8_TOKENID_TYPE_KEY` cannot be changed
once the identifiable digital asset contract has been deployed.

<br/>

### \_isOperatorOrOwner

```solidity
function _isOperatorOrOwner(
  address caller,
  bytes32 tokenId
) internal view returns (bool);
```

verifies if the `caller` is operator or owner for the `tokenId`

#### Returns

| Name |  Type  | Description                                  |
| ---- | :----: | -------------------------------------------- |
| `0`  | `bool` | true if `caller` is either operator or owner |

<br/>

### \_revokeOperator

```solidity
function _revokeOperator(
  address operator,
  address tokenOwner,
  bytes32 tokenId,
  bool notified,
  bytes operatorNotificationData
) internal nonpayable;
```

removes `operator` from the list of operators for the `tokenId`

<br/>

### \_clearOperators

```solidity
function _clearOperators(
  address tokenOwner,
  bytes32 tokenId
) internal nonpayable;
```

revoke all the current operators for a specific `tokenId` token which belongs to `tokenOwner`.

#### Parameters

| Name         |   Type    | Description                                       |
| ------------ | :-------: | ------------------------------------------------- |
| `tokenOwner` | `address` | The address that is the owner of the `tokenId`.   |
| `tokenId`    | `bytes32` | The token to remove the associated operators for. |

<br/>

### \_exists

```solidity
function _exists(bytes32 tokenId) internal view returns (bool);
```

Returns whether `tokenId` exists.
Tokens start existing when they are minted ([`_mint`](#_mint)), and stop existing when they are burned ([`_burn`](#_burn)).

<br/>

### \_existsOrError

```solidity
function _existsOrError(bytes32 tokenId) internal view;
```

When `tokenId` does not exist then revert with an error.

<br/>

### \_mint

```solidity
function _mint(
  address to,
  bytes32 tokenId,
  bool force,
  bytes data
) internal nonpayable;
```

<br/>

### \_burn

```solidity
function _burn(bytes32 tokenId, bytes data) internal nonpayable;
```

<br/>

### \_transfer

```solidity
function _transfer(
  address from,
  address to,
  bytes32 tokenId,
  bool force,
  bytes data
) internal nonpayable;
```

<br/>

### \_beforeTokenTransfer

```solidity
function _beforeTokenTransfer(
  address from,
  address to,
  bytes32 tokenId,
  bytes data
) internal nonpayable;
```

Hook that is called before any token transfer, including minting and burning.
Allows to run custom logic before updating balances and notifiying sender/recipient by overriding this function.

#### Parameters

| Name      |   Type    | Description                            |
| --------- | :-------: | -------------------------------------- |
| `from`    | `address` | The sender address                     |
| `to`      | `address` | @param tokenId The tokenId to transfer |
| `tokenId` | `bytes32` | The tokenId to transfer                |
| `data`    |  `bytes`  | The data sent alongside the transfer   |

<br/>

### \_afterTokenTransfer

```solidity
function _afterTokenTransfer(
  address from,
  address to,
  bytes32 tokenId,
  bytes data
) internal nonpayable;
```

Hook that is called after any token transfer, including minting and burning.
Allows to run custom logic after updating balances, but **before notifiying sender/recipient via LSP1** by overriding this function.

#### Parameters

| Name      |   Type    | Description                            |
| --------- | :-------: | -------------------------------------- |
| `from`    | `address` | The sender address                     |
| `to`      | `address` | @param tokenId The tokenId to transfer |
| `tokenId` | `bytes32` | The tokenId to transfer                |
| `data`    |  `bytes`  | The data sent alongside the transfer   |

<br/>

### \_notifyTokenReceiver

```solidity
function _notifyTokenReceiver(
  address to,
  bool force,
  bytes lsp1Data
) internal nonpayable;
```

An attempt is made to notify the token receiver about the `tokenId` changing owners
using LSP1 interface. When force is FALSE the token receiver MUST support LSP1.
The receiver may revert when the token being sent is not wanted.

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

Returns the extension address stored under the following data key:

- [`_LSP17_EXTENSION_PREFIX`](#_lsp17_extension_prefix) + `<bytes4>` (Check [LSP2-ERC725YJSONSchema] for encoding the data key).

- If no extension is stored, returns the address(0).

<br/>

### \_fallbackLSP17Extendable

:::info

The LSP8 Token contract should not hold any native tokens. Any native tokens received by the contract
will be forwarded to the extension address mapped to the selector from `msg.sig`.

:::

```solidity
function _fallbackLSP17Extendable(
  bytes callData
) internal nonpayable returns (bytes);
```

Forwards the call with the received value to an extension mapped to a function selector.
Calls [`_getExtensionAndForwardValue`](#_getextensionandforwardvalue) to get the address of the extension mapped to the function selector being
called on the account. If there is no extension, the address(0) will be returned.
We will always forward the value to the extension, as the LSP8 contract is not supposed to hold any native tokens.
Reverts if there is no extension for the function being called.
If there is an extension for the function selector being called, it calls the extension with the
CALL opcode, passing the [`msg.data`](#msg.data) appended with the 20 bytes of the [`msg.sender`](#msg.sender) and
32 bytes of the [`msg.value`](#msg.value)

<br/>

### \_safeTransfer

```solidity
function _safeTransfer(
  address from,
  address to,
  uint256 tokenId,
  bytes data
) internal nonpayable;
```

Transfer the `tokenId` from `from` to `to` and check if the `to` recipient address is
a contract that implements the `IERC721Received` interface and return the right magic value.
See [`_checkOnERC721Received`](#_checkonerc721received) for more infos.

<br/>

### \_setApprovalForAll

```solidity
function _setApprovalForAll(
  address tokensOwner,
  address operator,
  bool approved
) internal nonpayable;
```

Approve `operator` to operate on all tokens of `tokensOwner`.

<blockquote>

**Emitted events:**

- [`ApprovalForAll`](#approvalforall) event.

</blockquote>

<br/>

## Events

### Approval

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#approval)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Event signature: `Approval(address,address,uint256)`
- Event topic hash: `0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925`

:::

```solidity
event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
```

Emitted when the allowance of a `spender` for an `owner` is set by a call to [`approve`](#approve). `value` is the new allowance.

#### Parameters

| Name                     |   Type    | Description |
| ------------------------ | :-------: | ----------- |
| `owner` **`indexed`**    | `address` | -           |
| `approved` **`indexed`** | `address` | -           |
| `tokenId` **`indexed`**  | `uint256` | -           |

<br/>

### ApprovalForAll

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#approvalforall)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Event signature: `ApprovalForAll(address,address,bool)`
- Event topic hash: `0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31`

:::

```solidity
event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
```

Emitted when `account` grants or revokes permission to `operator` to transfer their tokens, according to `approved`.

#### Parameters

| Name                     |   Type    | Description |
| ------------------------ | :-------: | ----------- |
| `owner` **`indexed`**    | `address` | -           |
| `operator` **`indexed`** | `address` | -           |
| `approved`               |  `bool`   | -           |

<br/>

### AuthorizedOperator

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#authorizedoperator)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Event signature: `AuthorizedOperator(address,address,bytes32,bytes)`
- Event topic hash: `0x0052e433f2d4225671bc164dd1cdc9a76044356091f27ad234798bd0cbf08349`

:::

```solidity
event AuthorizedOperator(address indexed operator, address indexed tokenOwner, bytes32 indexed tokenId, bytes operatorNotificationData);
```

Emitted when `tokenOwner` enables `operator` to transfer or burn the `tokenId`.

#### Parameters

| Name                       |   Type    | Description                                                          |
| -------------------------- | :-------: | -------------------------------------------------------------------- |
| `operator` **`indexed`**   | `address` | The address authorized as an operator.                               |
| `tokenOwner` **`indexed`** | `address` | The owner of the `tokenId`.                                          |
| `tokenId` **`indexed`**    | `bytes32` | The tokenId `operator` address has access on behalf of `tokenOwner`. |
| `operatorNotificationData` |  `bytes`  | The data to notify the operator about via LSP1.                      |

<br/>

### DataChanged

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#datachanged)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
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

### OwnershipTransferred

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#ownershiptransferred)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Event signature: `OwnershipTransferred(address,address)`
- Event topic hash: `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0`

:::

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

#### Parameters

| Name                          |   Type    | Description |
| ----------------------------- | :-------: | ----------- |
| `previousOwner` **`indexed`** | `address` | -           |
| `newOwner` **`indexed`**      | `address` | -           |

<br/>

### RevokedOperator

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#revokedoperator)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Event signature: `RevokedOperator(address,address,bytes32,bool,bytes)`
- Event topic hash: `0x3ee932cea40ebbbfd8577d47156cc17cce8683802c57bbd1fb8c131c6f07af0a`

:::

```solidity
event RevokedOperator(address indexed operator, address indexed tokenOwner, bytes32 indexed tokenId, bool notified, bytes operatorNotificationData);
```

Emitted when `tokenOwner` disables `operator` to transfer or burn `tokenId` on its behalf.

#### Parameters

| Name                       |   Type    | Description                                                                        |
| -------------------------- | :-------: | ---------------------------------------------------------------------------------- |
| `operator` **`indexed`**   | `address` | The address revoked from the operator array ([`getOperatorsOf`](#getoperatorsof)). |
| `tokenOwner` **`indexed`** | `address` | The owner of the `tokenId`.                                                        |
| `tokenId` **`indexed`**    | `bytes32` | The tokenId `operator` is revoked from operating on.                               |
| `notified`                 |  `bool`   | Bool indicating whether the operator has been notified or not                      |
| `operatorNotificationData` |  `bytes`  | The data to notify the operator about via LSP1.                                    |

<br/>

### Transfer

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#transfer)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Event signature: `Transfer(address,address,address,bytes32,bool,bytes)`
- Event topic hash: `0xb333c813a7426a7a11e2b190cad52c44119421594b47f6f32ace6d8c7207b2bf`

:::

```solidity
event Transfer(address operator, address indexed from, address indexed to, bytes32 indexed tokenId, bool force, bytes data);
```

Emitted when `tokenId` token is transferred from the `from` to the `to` address.

#### Parameters

| Name                    |   Type    | Description                                                                                                                        |
| ----------------------- | :-------: | ---------------------------------------------------------------------------------------------------------------------------------- |
| `operator`              | `address` | The address of operator that sent the `tokenId`                                                                                    |
| `from` **`indexed`**    | `address` | The previous owner of the `tokenId`                                                                                                |
| `to` **`indexed`**      | `address` | The new owner of `tokenId`                                                                                                         |
| `tokenId` **`indexed`** | `bytes32` | The tokenId that was transferred                                                                                                   |
| `force`                 |  `bool`   | If the token transfer enforces the `to` recipient address to be a contract that implements the LSP1 standard or not.               |
| `data`                  |  `bytes`  | Any additional data the caller included by the caller during the transfer, and sent in the hooks to the `from` and `to` addresses. |

<br/>

### Transfer

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#transfer)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Event signature: `Transfer(address,address,uint256)`
- Event topic hash: `0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef`

:::

```solidity
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
```

Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.

#### Parameters

| Name                    |   Type    | Description |
| ----------------------- | :-------: | ----------- |
| `from` **`indexed`**    | `address` | -           |
| `to` **`indexed`**      | `address` | -           |
| `tokenId` **`indexed`** | `uint256` | -           |

<br/>

## Errors

### ERC725Y_DataKeysValuesEmptyArray

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#erc725y_datakeysvaluesemptyarray)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
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

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#erc725y_datakeysvalueslengthmismatch)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `ERC725Y_DataKeysValuesLengthMismatch()`
- Error hash: `0x3bcc8979`

:::

```solidity
error ERC725Y_DataKeysValuesLengthMismatch();
```

Reverts when there is not the same number of elements in the `datakeys` and `dataValues` array parameters provided when calling the [`setDataBatch`](#setdatabatch) function.

<br/>

### ERC725Y_MsgValueDisallowed

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#erc725y_msgvaluedisallowed)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `ERC725Y_MsgValueDisallowed()`
- Error hash: `0xf36ba737`

:::

```solidity
error ERC725Y_MsgValueDisallowed();
```

Reverts when sending value to the [`setData`](#setdata) or [`setDataBatch`](#setdatabatch) function.

<br/>

### InvalidExtensionAddress

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#invalidextensionaddress)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `InvalidExtensionAddress(bytes)`
- Error hash: `0x42bfe79f`

:::

```solidity
error InvalidExtensionAddress(bytes storedData);
```

reverts when the bytes retrieved from the LSP17 data key is not a valid address (not 20 bytes)

#### Parameters

| Name         |  Type   | Description |
| ------------ | :-----: | ----------- |
| `storedData` | `bytes` | -           |

<br/>

### InvalidFunctionSelector

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#invalidfunctionselector)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `InvalidFunctionSelector(bytes)`
- Error hash: `0xe5099ee3`

:::

```solidity
error InvalidFunctionSelector(bytes data);
```

reverts when the contract is called with a function selector not valid (less than 4 bytes of data)

#### Parameters

| Name   |  Type   | Description |
| ------ | :-----: | ----------- |
| `data` | `bytes` | -           |

<br/>

### LSP4TokenNameNotEditable

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp4tokennamenoteditable)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP4TokenNameNotEditable()`
- Error hash: `0x85c169bd`

:::

```solidity
error LSP4TokenNameNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenName` after the digital asset contract has been deployed. The `LSP4TokenName` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

<br/>

### LSP4TokenSymbolNotEditable

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp4tokensymbolnoteditable)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP4TokenSymbolNotEditable()`
- Error hash: `0x76755b38`

:::

```solidity
error LSP4TokenSymbolNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenSymbol` after the digital asset contract has been deployed. The `LSP4TokenSymbol` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

<br/>

### LSP8CannotSendToAddressZero

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8cannotsendtoaddresszero)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8CannotSendToAddressZero()`
- Error hash: `0x24ecef4d`

:::

```solidity
error LSP8CannotSendToAddressZero();
```

Reverts when trying to send token to the zero address.

<br/>

### LSP8CannotSendToSelf

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8cannotsendtoself)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8CannotSendToSelf()`
- Error hash: `0x5d67d6c1`

:::

```solidity
error LSP8CannotSendToSelf();
```

Reverts when specifying the same address for `from` and `to` in a token transfer.

<br/>

### LSP8CannotUseAddressZeroAsOperator

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8cannotuseaddresszeroasoperator)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8CannotUseAddressZeroAsOperator()`
- Error hash: `0x9577b8b3`

:::

```solidity
error LSP8CannotUseAddressZeroAsOperator();
```

Reverts when trying to set the zero address as an operator.

<br/>

### LSP8InvalidTransferBatch

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8invalidtransferbatch)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8InvalidTransferBatch()`
- Error hash: `0x93a83119`

:::

```solidity
error LSP8InvalidTransferBatch();
```

Reverts when the parameters used for `transferBatch` have different lengths.

<br/>

### LSP8NonExistentTokenId

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8nonexistenttokenid)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8NonExistentTokenId(bytes32)`
- Error hash: `0xae8f9a36`

:::

```solidity
error LSP8NonExistentTokenId(bytes32 tokenId);
```

Reverts when `tokenId` has not been minted.

#### Parameters

| Name      |   Type    | Description |
| --------- | :-------: | ----------- |
| `tokenId` | `bytes32` | -           |

<br/>

### LSP8NonExistingOperator

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8nonexistingoperator)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8NonExistingOperator(address,bytes32)`
- Error hash: `0x4aa31a8c`

:::

```solidity
error LSP8NonExistingOperator(address operator, bytes32 tokenId);
```

Reverts when `operator` is not an operator for the `tokenId`.

#### Parameters

| Name       |   Type    | Description |
| ---------- | :-------: | ----------- |
| `operator` | `address` | -           |
| `tokenId`  | `bytes32` | -           |

<br/>

### LSP8NotTokenOperator

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8nottokenoperator)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8NotTokenOperator(bytes32,address)`
- Error hash: `0x1294d2a9`

:::

```solidity
error LSP8NotTokenOperator(bytes32 tokenId, address caller);
```

Reverts when `caller` is not an allowed operator for `tokenId`.

#### Parameters

| Name      |   Type    | Description |
| --------- | :-------: | ----------- |
| `tokenId` | `bytes32` | -           |
| `caller`  | `address` | -           |

<br/>

### LSP8NotTokenOwner

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8nottokenowner)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8NotTokenOwner(address,bytes32,address)`
- Error hash: `0x5b271ea2`

:::

```solidity
error LSP8NotTokenOwner(address tokenOwner, bytes32 tokenId, address caller);
```

Reverts when `caller` is not the `tokenOwner` of the `tokenId`.

#### Parameters

| Name         |   Type    | Description |
| ------------ | :-------: | ----------- |
| `tokenOwner` | `address` | -           |
| `tokenId`    | `bytes32` | -           |
| `caller`     | `address` | -           |

<br/>

### LSP8NotifyTokenReceiverContractMissingLSP1Interface

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8notifytokenreceivercontractmissinglsp1interface)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8NotifyTokenReceiverContractMissingLSP1Interface(address)`
- Error hash: `0x4349776d`

:::

```solidity
error LSP8NotifyTokenReceiverContractMissingLSP1Interface(
  address tokenReceiver
);
```

Reverts if the `tokenReceiver` does not implement LSP1 when minting or transferring tokens with `bool force` set as `false`.

#### Parameters

| Name            |   Type    | Description |
| --------------- | :-------: | ----------- |
| `tokenReceiver` | `address` | -           |

<br/>

### LSP8NotifyTokenReceiverIsEOA

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8notifytokenreceiveriseoa)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8NotifyTokenReceiverIsEOA(address)`
- Error hash: `0x03173137`

:::

```solidity
error LSP8NotifyTokenReceiverIsEOA(address tokenReceiver);
```

Reverts if the `tokenReceiver` is an EOA when minting or transferring tokens with `bool force` set as `false`.

#### Parameters

| Name            |   Type    | Description |
| --------------- | :-------: | ----------- |
| `tokenReceiver` | `address` | -           |

<br/>

### LSP8OperatorAlreadyAuthorized

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8operatoralreadyauthorized)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8OperatorAlreadyAuthorized(address,bytes32)`
- Error hash: `0xa7626b68`

:::

```solidity
error LSP8OperatorAlreadyAuthorized(address operator, bytes32 tokenId);
```

Reverts when `operator` is already authorized for the `tokenId`.

#### Parameters

| Name       |   Type    | Description |
| ---------- | :-------: | ----------- |
| `operator` | `address` | -           |
| `tokenId`  | `bytes32` | -           |

<br/>

### LSP8TokenContractCannotHoldValue

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokencontractcannotholdvalue)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8TokenContractCannotHoldValue()`
- Error hash: `0x61f49442`

:::

```solidity
error LSP8TokenContractCannotHoldValue();
```

_LSP8 contract cannot receive native tokens._

Error occurs when sending native tokens to the LSP8 contract without sending any data. E.g. Sending value without passing a bytes4 function selector to call a LSP17 Extension.

<br/>

### LSP8TokenIdTypeNotEditable

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidtypenoteditable)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8TokenIdTypeNotEditable()`
- Error hash: `0x53bc1122`

:::

```solidity
error LSP8TokenIdTypeNotEditable();
```

Reverts when trying to edit the data key `LSP8TokenIdType` after the identifiable digital asset contract has been deployed. The `LSP8TokenIdType` data key is located inside the ERC725Y Data key-value store of the identifiable digital asset contract. It can be set only once inside the constructor/initializer when the identifiable digital asset contract is being deployed.

<br/>

### LSP8TokenOwnerCannotBeOperator

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenownercannotbeoperator)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `LSP8TokenOwnerCannotBeOperator()`
- Error hash: `0x89fdad62`

:::

```solidity
error LSP8TokenOwnerCannotBeOperator();
```

Reverts when trying to authorize or revoke the token's owner as an operator.

<br/>

### NoExtensionFoundForFunctionSelector

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#noextensionfoundforfunctionselector)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
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

### OwnableCallerNotTheOwner

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#ownablecallernottheowner)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `OwnableCallerNotTheOwner(address)`
- Error hash: `0xbf1169c5`

:::

```solidity
error OwnableCallerNotTheOwner(address callerAddress);
```

Reverts when only the owner is allowed to call the function.

#### Parameters

| Name            |   Type    | Description                              |
| --------------- | :-------: | ---------------------------------------- |
| `callerAddress` | `address` | The address that tried to make the call. |

<br/>

### OwnableCannotSetZeroAddressAsOwner

:::note References

- Specification details: [**LSP-8-IdentifiableDigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#ownablecannotsetzeroaddressasowner)
- Solidity implementation: [`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol)
- Error signature: `OwnableCannotSetZeroAddressAsOwner()`
- Error hash: `0x1ad8836c`

:::

```solidity
error OwnableCannotSetZeroAddressAsOwner();
```

Reverts when trying to set `address(0)` as the contract owner when deploying the contract, initializing it or transferring ownership of the contract.

<br/>
