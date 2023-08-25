# LSP8CompatibleERC721

:::info Solidity contract

[`LSP8CompatibleERC721.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)

:::

LSP8 extension, for compatibility for clients / tools that expect ERC721.

## Methods

### approve

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#approve)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `approve(address,uint256)`
- Function selector: `0x095ea7b3`

:::

```solidity
function approve(address operator, uint256 tokenId) external nonpayable;
```

Compatible with ERC721 approve.

#### Parameters

| Name       |   Type    | Description                          |
| ---------- | :-------: | ------------------------------------ |
| `operator` | `address` | The address to approve for `tokenId` |
| `tokenId`  | `uint256` | The tokenId to approve               |

### authorizeOperator

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#authorizeoperator)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

<blockquote>

**Emitted events:**

- LSP7 [`AuthorizedOperator`](#authorizedoperator) event.
- ERC721 [`Approval`](#approval) event.

</blockquote>

#### Parameters

| Name       |   Type    | Description                              |
| ---------- | :-------: | ---------------------------------------- |
| `operator` | `address` | The address to authorize as an operator. |
| `tokenId`  | `bytes32` | The token ID operator has access to..    |

### balanceOf

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#balanceof)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

### getApproved

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#getapproved)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `getApproved(uint256)`
- Function selector: `0x081812fc`

:::

```solidity
function getApproved(uint256 tokenId) external view returns (address);
```

Compatible with ERC721 getApproved.

#### Parameters

| Name      |   Type    | Description          |
| --------- | :-------: | -------------------- |
| `tokenId` | `uint256` | The tokenId to query |

#### Returns

| Name |   Type    | Description                               |
| ---- | :-------: | ----------------------------------------- |
| `0`  | `address` | The address of the operator for `tokenId` |

### getData

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#getdata)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#getdatabatch)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#getoperatorsof)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

### isApprovedForAll

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#isapprovedforall)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `isApprovedForAll(address,address)`
- Function selector: `0xe985e9c5`

:::

```solidity
function isApprovedForAll(
  address tokenOwner,
  address operator
) external view returns (bool);
```

#### Parameters

| Name         |   Type    | Description |
| ------------ | :-------: | ----------- |
| `tokenOwner` | `address` | -           |
| `operator`   | `address` | -           |

#### Returns

| Name |  Type  | Description |
| ---- | :----: | ----------- |
| `0`  | `bool` | -           |

### isOperatorFor

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#isoperatorfor)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

### name

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#name)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `name()`
- Function selector: `0x06fdde03`

:::

```solidity
function name() external view returns (string);
```

Returns the name of the token.

#### Returns

| Name |   Type   | Description           |
| ---- | :------: | --------------------- |
| `0`  | `string` | The name of the token |

### owner

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#owner)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

### ownerOf

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#ownerof)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `ownerOf(uint256)`
- Function selector: `0x6352211e`

:::

```solidity
function ownerOf(uint256 tokenId) external view returns (address);
```

Compatible with ERC721 ownerOf.

#### Parameters

| Name      |   Type    | Description          |
| --------- | :-------: | -------------------- |
| `tokenId` | `uint256` | The tokenId to query |

#### Returns

| Name |   Type    | Description              |
| ---- | :-------: | ------------------------ |
| `0`  | `address` | The owner of the tokenId |

### renounceOwnership

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#renounceownership)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `renounceOwnership()`
- Function selector: `0x715018a6`

:::

```solidity
function renounceOwnership() external nonpayable;
```

Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

### revokeOperator

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#revokeoperator)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

### safeTransferFrom

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#safetransferfrom)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `safeTransferFrom(address,address,uint256)`
- Function selector: `0x42842e0e`

:::

:::info

This function sets the `allowNonLSP1Recipient` parameter to `true` so that EOAs and any contract can receive the `tokenId`.

:::

```solidity
function safeTransferFrom(
  address from,
  address to,
  uint256 tokenId
) external nonpayable;
```

Safe Transfer function without optional data from the ERC721 standard interface.

#### Parameters

| Name      |   Type    | Description              |
| --------- | :-------: | ------------------------ |
| `from`    | `address` | The sending address.     |
| `to`      | `address` | The receiving address.   |
| `tokenId` | `uint256` | The tokenId to transfer. |

### safeTransferFrom

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#safetransferfrom)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `safeTransferFrom(address,address,uint256,bytes)`
- Function selector: `0xb88d4fde`

:::

:::info

This function sets the `allowNonLSP1Recipient` parameter to `true` so that EOAs and any contract can receive the `tokenId`.

:::

```solidity
function safeTransferFrom(
  address from,
  address to,
  uint256 tokenId,
  bytes data
) external nonpayable;
```

Safe Transfer function with optional data from the ERC721 standard interface..

#### Parameters

| Name      |   Type    | Description                            |
| --------- | :-------: | -------------------------------------- |
| `from`    | `address` | The sending address.                   |
| `to`      | `address` | The receiving address.                 |
| `tokenId` | `uint256` | The tokenId to transfer.               |
| `data`    |  `bytes`  | The data to be sent with the transfer. |

### setApprovalForAll

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#setapprovalforall)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `setApprovalForAll(address,bool)`
- Function selector: `0xa22cb465`

:::

```solidity
function setApprovalForAll(address operator, bool approved) external nonpayable;
```

See [`_setApprovalForAll`](#_setapprovalforall)

#### Parameters

| Name       |   Type    | Description |
| ---------- | :-------: | ----------- |
| `operator` | `address` | -           |
| `approved` |  `bool`   | -           |

### setData

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#setdata)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#setdatabatch)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#supportsinterface)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

### symbol

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#symbol)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `symbol()`
- Function selector: `0x95d89b41`

:::

```solidity
function symbol() external view returns (string);
```

Returns the symbol of the token, usually a shorter version of the name.

#### Returns

| Name |   Type   | Description             |
| ---- | :------: | ----------------------- |
| `0`  | `string` | The symbol of the token |

### tokenIdsOf

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#tokenidsof)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#tokenownerof)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

### tokenURI

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#))
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `)`
- Function selector: `0x59d76dc3`

:::

```solidity
function tokenURI(uint256) external view returns (string);
```

#### Parameters

| Name |   Type    | Description |
| ---- | :-------: | ----------- |
| `_0` | `uint256` | -           |

#### Returns

| Name |   Type   | Description |
| ---- | :------: | ----------- |
| `0`  | `string` | -           |

### totalSupply

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#totalsupply)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#transfer)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#transferbatch)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

### transferFrom

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#transferfrom)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Function signature: `transferFrom(address,address,uint256)`
- Function selector: `0x23b872dd`

:::

:::info

This function sets the `allowNonLSP1Recipient` parameter to `true` so that EOAs and any contract can receive the `tokenId`.

:::

```solidity
function transferFrom(
  address from,
  address to,
  uint256 tokenId
) external nonpayable;
```

Transfer functions from the ERC721 standard interface.

#### Parameters

| Name      |   Type    | Description              |
| --------- | :-------: | ------------------------ |
| `from`    | `address` | The sending address.     |
| `to`      | `address` | The receiving address.   |
| `tokenId` | `uint256` | The tokenId to transfer. |

### transferOwnership

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#transferownership)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

### Approval

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#approval)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Event signature: `Approval(address,address,uint256)`
- Event hash: `0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925`

:::

```solidity
event Approval(address indexed owner, address indexed operator, uint256 indexed tokenId);
```

Emitted when the allowance of a `spender` for an `owner` is set by a call to [`approve`](#approve). `value` is the new allowance.

#### Parameters

| Name                     |   Type    | Description |
| ------------------------ | :-------: | ----------- |
| `owner` **`indexed`**    | `address` | -           |
| `operator` **`indexed`** | `address` | -           |
| `tokenId` **`indexed`**  | `uint256` | -           |

### ApprovalForAll

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#approvalforall)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Event signature: `ApprovalForAll(address,address,bool)`
- Event hash: `0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31`

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

### AuthorizedOperator

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#authorizedoperator)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#datachanged)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#ownershiptransferred)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#revokedoperator)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#transfer)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#erc725y_datakeysvaluesemptyarray)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Error signature: `ERC725Y_DataKeysValuesEmptyArray()`
- Error hash: `0x97da5f95`

:::

```solidity
error ERC725Y_DataKeysValuesEmptyArray();
```

Reverts when one of the array parameter provided to [`setDataBatch`](#setdatabatch) function is an empty array.

### ERC725Y_DataKeysValuesLengthMismatch

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#erc725y_datakeysvalueslengthmismatch)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Error signature: `ERC725Y_DataKeysValuesLengthMismatch()`
- Error hash: `0x3bcc8979`

:::

```solidity
error ERC725Y_DataKeysValuesLengthMismatch();
```

Reverts when there is not the same number of elements in the `datakeys` and `dataValues` array parameters provided when calling the [`setDataBatch`](#setdatabatch) function.

### ERC725Y_MsgValueDisallowed

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#erc725y_msgvaluedisallowed)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Error signature: `ERC725Y_MsgValueDisallowed()`
- Error hash: `0xf36ba737`

:::

```solidity
error ERC725Y_MsgValueDisallowed();
```

Reverts when sending value to the [`setData`](#setdata) or [`setDataBatch`](#setdatabatch) function.

### LSP4TokenNameNotEditable

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp4tokennamenoteditable)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Error signature: `LSP4TokenNameNotEditable()`
- Error hash: `0x85c169bd`

:::

```solidity
error LSP4TokenNameNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenName` after the digital asset contract has been deployed. The `LSP4TokenName` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

### LSP4TokenSymbolNotEditable

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp4tokensymbolnoteditable)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Error signature: `LSP4TokenSymbolNotEditable()`
- Error hash: `0x76755b38`

:::

```solidity
error LSP4TokenSymbolNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenSymbol` after the digital asset contract has been deployed. The `LSP4TokenSymbol` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

### LSP8CannotSendToAddressZero

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8cannotsendtoaddresszero)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Error signature: `LSP8CannotSendToAddressZero()`
- Error hash: `0x24ecef4d`

:::

```solidity
error LSP8CannotSendToAddressZero();
```

reverts when trying to send token to the zero address.

### LSP8CannotSendToSelf

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8cannotsendtoself)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Error signature: `LSP8CannotSendToSelf()`
- Error hash: `0x5d67d6c1`

:::

```solidity
error LSP8CannotSendToSelf();
```

reverts when specifying the same address for `from` and `to` in a token transfer.

### LSP8CannotUseAddressZeroAsOperator

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8cannotuseaddresszeroasoperator)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Error signature: `LSP8CannotUseAddressZeroAsOperator()`
- Error hash: `0x9577b8b3`

:::

```solidity
error LSP8CannotUseAddressZeroAsOperator();
```

reverts when trying to set the zero address as an operator.

### LSP8InvalidTransferBatch

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8invalidtransferbatch)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Error signature: `LSP8InvalidTransferBatch()`
- Error hash: `0x93a83119`

:::

```solidity
error LSP8InvalidTransferBatch();
```

reverts when the parameters used for `transferBatch` have different lengths.

### LSP8NonExistentTokenId

:::note Links

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8nonexistenttokenid)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8nonexistingoperator)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8nottokenoperator)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8nottokenowner)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8notifytokenreceivercontractmissinglsp1interface)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8notifytokenreceiveriseoa)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8operatoralreadyauthorized)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
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

- Specification details in [**LSP-8-CompatibleERC721**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-8-CompatibleERC721.md#lsp8tokenownercannotbeoperator)
- Solidity implementation in [**LSP8CompatibleERC721**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8CompatibleERC721)
- Error signature: `LSP8TokenOwnerCannotBeOperator()`
- Error hash: `0x89fdad62`

:::

```solidity
error LSP8TokenOwnerCannotBeOperator();
```

reverts when trying to authorize or revoke the token's owner as an operator.

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

[ERC725]: https://docs.lukso.tech/standards/lsp-background/erc725
[UniversalProfile]: https://docs.lukso.tech/standards/universal-profile/introduction
[LSP0ERC725Account]: https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account
[LSP1UniversalReceiver]: https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver
[LSP1UniversalReceiverDelegate]: https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver-delegate
[LSP2ERC725YJSONSchema]: https://docs.lukso.tech/standards/generic-standards/lsp2-json-schema
[LSP4DigitalAssetMetadata]: https://docs.lukso.tech/standards/nft-2.0/LSP4-Digital-Asset-Metadata
[LSP5ReceivedVaults]: https://docs.lukso.tech/standards/universal-profile/lsp5-received-assets
[LSP6KeyManager]: https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager
[LSP7DigitalAsset]: https://docs.lukso.tech/standards/nft-2.0/LSP7-Digital-Asset
[LSP8IdentifiableDigitalAsset]: https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset
[LSP10ReceivedVaults]: https://docs.lukso.tech/standards/universal-profile/lsp10-received-vaults
[LSP14Ownable2Step]: https://docs.lukso.tech/standards/generic-standards/lsp14-ownable-2-step
[LSP17ContractExtension]: https://docs.lukso.tech/standards/generic-standards/lsp17-contract-extension
[LSP20CallVerification]: https://docs.lukso.tech/standards/generic-standards/lsp20-call-verification

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
