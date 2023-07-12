# LSP8CappedSupply

:::info Solidity contract

[`LSP8CappedSupply.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)

:::

LSP8 token extension to add a max token supply cap.

## Methods

### authorizeOperator

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#authorizeoperator)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Function signature: `authorizeOperator(address,bytes32)`
- Function selector: `0xcf5182ba`

:::

```solidity
function authorizeOperator(
  address operator,
  bytes32 tokenId
) external nonpayable;
```

Allow an `operator` address to transfer or burn a specific `tokenId` on behalf of its token owner. See [`isOperatorFor`](#isoperatorfor).

#### Parameters

| Name       |   Type    | Description                              |
| ---------- | :-------: | ---------------------------------------- |
| `operator` | `address` | The address to authorize as an operator. |
| `tokenId`  | `bytes32` | The token ID operator has access to..    |

### balanceOf

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#balanceof)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

### getData

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#getdata)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

### getDataBatch

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#getdatabatch)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

### getOperatorsOf

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#getoperatorsof)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

### isOperatorFor

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#isoperatorfor)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

### owner

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#owner)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

### renounceOwnership

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#renounceownership)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Function signature: `renounceOwnership()`
- Function selector: `0x715018a6`

:::

```solidity
function renounceOwnership() external nonpayable;
```

Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

### revokeOperator

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#revokeoperator)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Function signature: `revokeOperator(address,bytes32)`
- Function selector: `0x0b0c6d82`

:::

```solidity
function revokeOperator(address operator, bytes32 tokenId) external nonpayable;
```

Remove access of `operator` for a given `tokenId`, disallowing it to transfer `tokenId` on behalf of its owner. See also [`isOperatorFor`](#isoperatorfor).

#### Parameters

| Name       |   Type    | Description                                          |
| ---------- | :-------: | ---------------------------------------------------- |
| `operator` | `address` | The address to revoke as an operator.                |
| `tokenId`  | `bytes32` | The tokenId `operator` is revoked from operating on. |

### setData

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#setdata)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Function signature: `setData(bytes32,bytes)`
- Function selector: `0x7f23690c`

:::

:::caution Warning

**Note for developers:** despite the fact that this function is set as `payable`, if the function is not intended to receive value (= native tokens), **an additional check should be implemented to ensure that `msg.value` sent was equal to 0**.

:::

```solidity
function setData(bytes32 dataKey, bytes dataValue) external payable;
```

_Setting the following data key value pair in the ERC725Y storage. Data key: `dataKey`, data value: `dataValue`. _

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

### setDataBatch

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#setdatabatch)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Function signature: `setDataBatch(bytes32[],bytes[])`
- Function selector: `0x97902421`

:::

:::caution Warning

**Note for developers:** despite the fact that this function is set as `payable`, if the function is not intended to receive value (= native tokens), **an additional check should be implemented to ensure that `msg.value` sent was equal to 0**.

:::

```solidity
function setDataBatch(bytes32[] dataKeys, bytes[] dataValues) external payable;
```

_Setting the following data key value pairs in the ERC725Y storage. Data keys: `dataKeys`, data values: `dataValues`. _

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

### supportsInterface

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#supportsinterface)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

### tokenIdsOf

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#tokenidsof)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

### tokenOwnerOf

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#tokenownerof)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

### tokenSupplyCap

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#tokensupplycap)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Function signature: `tokenSupplyCap()`
- Function selector: `0x52058d8a`

:::

```solidity
function tokenSupplyCap() external view returns (uint256);
```

_The maximum supply amount of tokens allowed to exist is `_tokenSupplyCap`._

Get the maximum number of tokens that can exist to circulate. Once [`totalSupply`](#totalsupply) reaches reaches [`totalSuuplyCap`](#totalsuuplycap), it is not possible to mint more tokens.

#### Returns

| Name |   Type    | Description                                                  |
| ---- | :-------: | ------------------------------------------------------------ |
| `0`  | `uint256` | The maximum number of tokens that can exist in the contract. |

### totalSupply

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#totalsupply)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

### transfer

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#transfer)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Function signature: `transfer(address,address,bytes32,bool,bytes)`
- Function selector: `0x511b6952`

:::

```solidity
function transfer(
  address from,
  address to,
  bytes32 tokenId,
  bool allowNonLSP1Recipient,
  bytes data
) external nonpayable;
```

Transfer a given `tokenId` token from the `from` address to the `to` address. If operators are set for a specific `tokenId`, all the operators are revoked after the tokenId have been transferred. The `allowNonLSP1Recipient` parameter MUST be set to `true` when transferring tokens to Externally Owned Accounts (EOAs) or contracts that do not implement the LSP1 standard.

#### Parameters

| Name                    |   Type    | Description                                                                                                                                                         |
| ----------------------- | :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address` | The address that owns the given `tokenId`.                                                                                                                          |
| `to`                    | `address` | The address that will receive the `tokenId`.                                                                                                                        |
| `tokenId`               | `bytes32` | The token ID to transfer.                                                                                                                                           |
| `allowNonLSP1Recipient` |  `bool`   | When set to `true`, the `to` address CAN be any addres. When set to `false`, the `to` address MUST be a contract that supports the LSP1 UniversalReceiver standard. |
| `data`                  |  `bytes`  | Any additional data the caller wants included in the emitted event, and sent in the hooks of the `from` and `to` addresses.                                         |

### transferBatch

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#transferbatch)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Function signature: `transferBatch(address[],address[],bytes32[],bool[],bytes[])`
- Function selector: `0x7e87632c`

:::

```solidity
function transferBatch(
  address[] from,
  address[] to,
  bytes32[] tokenId,
  bool[] allowNonLSP1Recipient,
  bytes[] data
) external nonpayable;
```

Transfers multiple tokens at once based on the arrays of `from`, `to` and `tokenId`. If any transfer fails, the whole call will revert.

#### Parameters

| Name                    |    Type     | Description                                                                                                                               |
| ----------------------- | :---------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address[]` | An array of sending addresses.                                                                                                            |
| `to`                    | `address[]` | An array of recipient addresses.                                                                                                          |
| `tokenId`               | `bytes32[]` | An array of token IDs to transfer.                                                                                                        |
| `allowNonLSP1Recipient` |  `bool[]`   | When set to `true`, `to` may be any address. When set to `false`, `to` must be a contract that supports the LSP1 standard and not revert. |
| `data`                  |  `bytes[]`  | Any additional data the caller wants included in the emitted event, and sent in the hooks to the `from` and `to` addresses.               |

### transferOwnership

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#transferownership)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
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

---

## Events

### AuthorizedOperator

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#authorizedoperator)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Event signature: `AuthorizedOperator(address,address,bytes32)`
- Event hash: `0x34b797fc5a526f7bf1d2b5de25f6564fd85ae364e3ee939aee7c1ac27871a988`

:::

```solidity
event AuthorizedOperator(address indexed operator, address indexed tokenOwner, bytes32 indexed tokenId);
```

Emitted when `tokenOwner` enables `operator` to transfer or burn `tokenId` on its behalf.

#### Parameters

| Name                       |   Type    | Description                                                          |
| -------------------------- | :-------: | -------------------------------------------------------------------- |
| `operator` **`indexed`**   | `address` | The address authorized as an operator.                               |
| `tokenOwner` **`indexed`** | `address` | The owner of the `tokenId`.                                          |
| `tokenId` **`indexed`**    | `bytes32` | The tokenId `operator` address has access on behalf of `tokenOwner`. |

### DataChanged

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#datachanged)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Event signature: `DataChanged(bytes32,bytes)`
- Event hash: `0xece574603820d07bc9b91f2a932baadf4628aabcb8afba49776529c14a6104b2`

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

### OwnershipTransferred

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#ownershiptransferred)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Event signature: `OwnershipTransferred(address,address)`
- Event hash: `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0`

:::

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

#### Parameters

| Name                          |   Type    | Description |
| ----------------------------- | :-------: | ----------- |
| `previousOwner` **`indexed`** | `address` | -           |
| `newOwner` **`indexed`**      | `address` | -           |

### RevokedOperator

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#revokedoperator)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Event signature: `RevokedOperator(address,address,bytes32)`
- Event hash: `0x17d5389f6ab6adb2647dfa0aa365c323d37adacc30b33a65310b6158ce1373d5`

:::

```solidity
event RevokedOperator(address indexed operator, address indexed tokenOwner, bytes32 indexed tokenId);
```

Emitted when `tokenOwner` disables `operator` to transfer or burn `tokenId` on its behalf.

#### Parameters

| Name                       |   Type    | Description                                          |
| -------------------------- | :-------: | ---------------------------------------------------- |
| `operator` **`indexed`**   | `address` | The address revoked as an operator.                  |
| `tokenOwner` **`indexed`** | `address` | The owner of the `tokenId`.                          |
| `tokenId` **`indexed`**    | `bytes32` | The tokenId `operator` is revoked from operating on. |

### Transfer

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#transfer)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Event signature: `Transfer(address,address,address,bytes32,bool,bytes)`
- Event hash: `0xb333c813a7426a7a11e2b190cad52c44119421594b47f6f32ace6d8c7207b2bf`

:::

```solidity
event Transfer(address operator, address indexed from, address indexed to, bytes32 indexed tokenId, bool allowNonLSP1Recipient, bytes data);
```

Emitted when `tokenId` token is transferred from the `from` to the `to` address.

#### Parameters

| Name                    |   Type    | Description                                                                                                                        |
| ----------------------- | :-------: | ---------------------------------------------------------------------------------------------------------------------------------- |
| `operator`              | `address` | The address of operator that sent the `tokenId`                                                                                    |
| `from` **`indexed`**    | `address` | The previous owner of the `tokenId`                                                                                                |
| `to` **`indexed`**      | `address` | The new owner of `tokenId`                                                                                                         |
| `tokenId` **`indexed`** | `bytes32` | The tokenId that was transferred                                                                                                   |
| `allowNonLSP1Recipient` |  `bool`   | If the token transfer enforces the `to` recipient address to be a contract that implements the LSP1 standard or not.               |
| `data`                  |  `bytes`  | Any additional data the caller included by the caller during the transfer, and sent in the hooks to the `from` and `to` addresses. |

---

## Errors

### ERC725Y_DataKeysValuesEmptyArray

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#erc725y_datakeysvaluesemptyarray)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `ERC725Y_DataKeysValuesEmptyArray()`
- Error hash: `0x97da5f95`

:::

```solidity
error ERC725Y_DataKeysValuesEmptyArray();
```

Reverts when one of the array parameter provided to [`setDataBatch`](#setdatabatch) function is an empty array.

### ERC725Y_DataKeysValuesLengthMismatch

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#erc725y_datakeysvalueslengthmismatch)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `ERC725Y_DataKeysValuesLengthMismatch()`
- Error hash: `0x3bcc8979`

:::

```solidity
error ERC725Y_DataKeysValuesLengthMismatch();
```

Reverts when there is not the same number of elements in the `datakeys` and `dataValues` array parameters provided when calling the [`setDataBatch`](#setdatabatch) function.

### ERC725Y_MsgValueDisallowed

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#erc725y_msgvaluedisallowed)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `ERC725Y_MsgValueDisallowed()`
- Error hash: `0xf36ba737`

:::

```solidity
error ERC725Y_MsgValueDisallowed();
```

Reverts when sending value to the [`setData`](#setdata) or [`setDataBatch`](#setdatabatch) function.

### LSP4TokenNameNotEditable

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp4tokennamenoteditable)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP4TokenNameNotEditable()`
- Error hash: `0x85c169bd`

:::

```solidity
error LSP4TokenNameNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenName` after the digital asset contract has been deployed. The `LSP4TokenName` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

### LSP4TokenSymbolNotEditable

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp4tokensymbolnoteditable)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP4TokenSymbolNotEditable()`
- Error hash: `0x76755b38`

:::

```solidity
error LSP4TokenSymbolNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenSymbol` after the digital asset contract has been deployed. The `LSP4TokenSymbol` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

### LSP8CannotSendToAddressZero

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8cannotsendtoaddresszero)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8CannotSendToAddressZero()`
- Error hash: `0x24ecef4d`

:::

```solidity
error LSP8CannotSendToAddressZero();
```

reverts when trying to send token to the zero address.

### LSP8CannotSendToSelf

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8cannotsendtoself)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8CannotSendToSelf()`
- Error hash: `0x5d67d6c1`

:::

```solidity
error LSP8CannotSendToSelf();
```

reverts when specifying the same address for `from` and `to` in a token transfer.

### LSP8CannotUseAddressZeroAsOperator

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8cannotuseaddresszeroasoperator)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8CannotUseAddressZeroAsOperator()`
- Error hash: `0x9577b8b3`

:::

```solidity
error LSP8CannotUseAddressZeroAsOperator();
```

reverts when trying to set the zero address as an operator.

### LSP8CappedSupplyCannotMintOverCap

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8cappedsupplycannotmintovercap)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8CappedSupplyCannotMintOverCap()`
- Error hash: `0xe8ba2291`

:::

```solidity
error LSP8CappedSupplyCannotMintOverCap();
```

_Cannot mint anymore as total supply reached the maximum cap._

Reverts when trying to mint tokens but the [`totalSupply`](#totalsupply) has reached the maximum [`tokenSupplyCap`](#tokensupplycap).

### LSP8CappedSupplyRequired

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8cappedsupplyrequired)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8CappedSupplyRequired()`
- Error hash: `0x38d9fc30`

:::

```solidity
error LSP8CappedSupplyRequired();
```

_The `tokenSupplyCap` must be set and cannot be `0`._

Reverts when setting `0` for the [`tokenSupplyCap`](#tokensupplycap). The max token supply MUST be set to a number greater than 0.

### LSP8InvalidTransferBatch

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8invalidtransferbatch)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8InvalidTransferBatch()`
- Error hash: `0x93a83119`

:::

```solidity
error LSP8InvalidTransferBatch();
```

reverts when the parameters used for `transferBatch` have different lengths.

### LSP8NonExistentTokenId

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8nonexistenttokenid)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8NonExistentTokenId(bytes32)`
- Error hash: `0xae8f9a36`

:::

```solidity
error LSP8NonExistentTokenId(bytes32 tokenId);
```

reverts when `tokenId` has not been minted.

#### Parameters

| Name      |   Type    | Description |
| --------- | :-------: | ----------- |
| `tokenId` | `bytes32` | -           |

### LSP8NonExistingOperator

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8nonexistingoperator)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8NonExistingOperator(address,bytes32)`
- Error hash: `0x4aa31a8c`

:::

```solidity
error LSP8NonExistingOperator(address operator, bytes32 tokenId);
```

reverts when `operator` is not an operator for the `tokenId`.

#### Parameters

| Name       |   Type    | Description |
| ---------- | :-------: | ----------- |
| `operator` | `address` | -           |
| `tokenId`  | `bytes32` | -           |

### LSP8NotTokenOperator

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8nottokenoperator)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8NotTokenOperator(bytes32,address)`
- Error hash: `0x1294d2a9`

:::

```solidity
error LSP8NotTokenOperator(bytes32 tokenId, address caller);
```

reverts when `caller` is not an allowed operator for `tokenId`.

#### Parameters

| Name      |   Type    | Description |
| --------- | :-------: | ----------- |
| `tokenId` | `bytes32` | -           |
| `caller`  | `address` | -           |

### LSP8NotTokenOwner

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8nottokenowner)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8NotTokenOwner(address,bytes32,address)`
- Error hash: `0x5b271ea2`

:::

```solidity
error LSP8NotTokenOwner(address tokenOwner, bytes32 tokenId, address caller);
```

reverts when `caller` is not the `tokenOwner` of the `tokenId`.

#### Parameters

| Name         |   Type    | Description |
| ------------ | :-------: | ----------- |
| `tokenOwner` | `address` | -           |
| `tokenId`    | `bytes32` | -           |
| `caller`     | `address` | -           |

### LSP8NotifyTokenReceiverContractMissingLSP1Interface

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8notifytokenreceivercontractmissinglsp1interface)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8NotifyTokenReceiverContractMissingLSP1Interface(address)`
- Error hash: `0x4349776d`

:::

```solidity
error LSP8NotifyTokenReceiverContractMissingLSP1Interface(
  address tokenReceiver
);
```

reverts if the `tokenReceiver` does not implement LSP1 when minting or transferring tokens with `bool allowNonLSP1Recipient` set as `false`.

#### Parameters

| Name            |   Type    | Description |
| --------------- | :-------: | ----------- |
| `tokenReceiver` | `address` | -           |

### LSP8NotifyTokenReceiverIsEOA

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8notifytokenreceiveriseoa)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8NotifyTokenReceiverIsEOA(address)`
- Error hash: `0x03173137`

:::

```solidity
error LSP8NotifyTokenReceiverIsEOA(address tokenReceiver);
```

reverts if the `tokenReceiver` is an EOA when minting or transferring tokens with `bool allowNonLSP1Recipient` set as `false`.

#### Parameters

| Name            |   Type    | Description |
| --------------- | :-------: | ----------- |
| `tokenReceiver` | `address` | -           |

### LSP8OperatorAlreadyAuthorized

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8operatoralreadyauthorized)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8OperatorAlreadyAuthorized(address,bytes32)`
- Error hash: `0xa7626b68`

:::

```solidity
error LSP8OperatorAlreadyAuthorized(address operator, bytes32 tokenId);
```

reverts when `operator` is already authorized for the `tokenId`.

#### Parameters

| Name       |   Type    | Description |
| ---------- | :-------: | ----------- |
| `operator` | `address` | -           |
| `tokenId`  | `bytes32` | -           |

### LSP8TokenOwnerCannotBeOperator

:::note Links

- Specification details in [**LSP-8-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CappedSupply.md#lsp8tokenownercannotbeoperator)
- Solidity implementation in [**LSP8CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CappedSupply)
- Error signature: `LSP8TokenOwnerCannotBeOperator()`
- Error hash: `0x89fdad62`

:::

```solidity
error LSP8TokenOwnerCannotBeOperator();
```

reverts when trying to authorize or revoke the token's owner as an operator.
