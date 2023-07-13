# LSP7CappedSupply

:::info Solidity contract

[`LSP7CappedSupply.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)

:::

LSP7 token extension to add a max token supply cap.

## Methods

### authorizeOperator

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#authorizeoperator)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Function signature: `authorizeOperator(address,uint256)`
- Function selector: `0x47980aa3`

:::

:::danger

To avoid front-running and Allowance Double-Spend Exploit when increasing or decreasing the authorized amount of an operator, it is advised to: 1. either call {revokeOperator} first, and then re-call {authorizeOperator} with the new amount. 2. or use the non-standard functions {increaseAllowance} or {decreaseAllowance}. For more information, see: https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/

:::

```solidity
function authorizeOperator(
  address operator,
  uint256 amount
) external nonpayable;
```

Sets an `amount` of tokens that an `operator` has access from the caller's balance (allowance). See [`authorizedAmountFor`](#authorizedamountfor).

#### Parameters

| Name       |   Type    | Description                                            |
| ---------- | :-------: | ------------------------------------------------------ |
| `operator` | `address` | The address to authorize as an operator.               |
| `amount`   | `uint256` | The allowance amount of tokens operator has access to. |

### authorizedAmountFor

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#authorizedamountfor)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Function signature: `authorizedAmountFor(address,address)`
- Function selector: `0x65aeaa95`

:::

```solidity
function authorizedAmountFor(
  address operator,
  address tokenOwner
) external view returns (uint256);
```

Get the amount of tokens `operator` address has access to from `tokenOwner`. Operators can send and burn tokens on behalf of their owners.

#### Parameters

| Name         |   Type    | Description                                                    |
| ------------ | :-------: | -------------------------------------------------------------- |
| `operator`   | `address` | The operator&#39;s address to query the authorized amount for. |
| `tokenOwner` | `address` | The token owner that `operator` has allowance on.              |

#### Returns

| Name |   Type    | Description                                                                                     |
| ---- | :-------: | ----------------------------------------------------------------------------------------------- |
| `0`  | `uint256` | The amount of tokens the `operator`&#39;s address has access on the `tokenOwner`&#39;s balance. |

### balanceOf

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#balanceof)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Function signature: `balanceOf(address)`
- Function selector: `0x70a08231`

:::

```solidity
function balanceOf(address tokenOwner) external view returns (uint256);
```

Get the number of tokens owned by `tokenOwner`. If the token is divisible (the [`decimals`](#decimals) function returns `18`), the amount returned should be divided by 1e18 to get a better picture of the actual balance of the `tokenOwner`. _Example:_ `balanceOf(someAddress) -> 42_000_000_000_000_000_000 / 1e18 = 42 tokens`

#### Parameters

| Name         |   Type    | Description                                               |
| ------------ | :-------: | --------------------------------------------------------- |
| `tokenOwner` | `address` | The address of the token holder to query the balance for. |

#### Returns

| Name |   Type    | Description                                 |
| ---- | :-------: | ------------------------------------------- |
| `0`  | `uint256` | The amount of tokens owned by `tokenOwner`. |

### decimals

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#decimals)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Function signature: `decimals()`
- Function selector: `0x313ce567`

:::

```solidity
function decimals() external view returns (uint8);
```

Returns the number of decimals used to get its user representation. If the asset contract has been set to be non-divisible via the `isNonDivisible_` parameter in the `constructor`, the decimals returned wiil be `0`. Otherwise `18` is the common value.

#### Returns

| Name |  Type   | Description                                                             |
| ---- | :-----: | ----------------------------------------------------------------------- |
| `0`  | `uint8` | the number of decimals. If `0` is returned, the asset is non-divisible. |

### decreaseAllowance

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#decreaseallowance)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Function signature: `decreaseAllowance(address,uint256)`
- Function selector: `0xa457c2d7`

:::

:::info

This is a non-standard function, not part of the LSP7 standard interface. It has been added in the LSP7 contract implementation so that it can be used as a prevention mechanism against the double spending allowance vulnerability.

:::

```solidity
function decreaseAllowance(
  address operator,
  uint256 substractedAmount
) external nonpayable;
```

_Decrease the allowance of `operator` by -`substractedAmount`_

Atomically decreases the allowance granted to `operator` by the caller. This is an alternative approach to [`authorizeOperator`](#authorizeoperator) that can be used as a mitigation for the double spending allowance problem.

<blockquote>

**Requirements:**

- `operator` cannot be the zero address.
- `operator` must have allowance for the caller of at least `substractedAmount`.

</blockquote>

<blockquote>

**Emitted events:**

- [`AuthorizedOperator`](#authorizedoperator) event indicating the updated allowance after decreasing it.
- [`RevokeOperator`](#revokeoperator) event if `substractedAmount` is the full allowance, indicating `operator` does not have any alauthorizedAmountForlowance left for `msg.sender`.

</blockquote>

#### Parameters

| Name                |   Type    | Description                                                |
| ------------------- | :-------: | ---------------------------------------------------------- |
| `operator`          | `address` | the operator to decrease allowance for `msg.sender`        |
| `substractedAmount` | `uint256` | the amount to decrease by in the operator&#39;s allowance. |

### getData

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#getdata)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#getdatabatch)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

### increaseAllowance

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#increaseallowance)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Function signature: `increaseAllowance(address,uint256)`
- Function selector: `0x39509351`

:::

:::info

This is a non-standard function, not part of the LSP7 standard interface. It has been added in the LSP7 contract implementation so that it can be used as a prevention mechanism against double spending allowance vulnerability.

:::

```solidity
function increaseAllowance(
  address operator,
  uint256 addedAmount
) external nonpayable;
```

_Increase the allowance of `operator` by +`addedAmount`_

Atomically increases the allowance granted to `operator` by the caller. This is an alternative approach to [`authorizeOperator`](#authorizeoperator) that can be used as a mitigation for the double spending allowance problem.

<blockquote>

**Requirements:**

- `operator` cannot be the same address as `msg.sender`
- `operator` cannot be the zero address.

</blockquote>

<blockquote>

**Emitted events:**

- [`AuthorizedOperator`](#authorizedoperator) indicating the updated allowance

</blockquote>

#### Parameters

| Name          |   Type    | Description                                                                 |
| ------------- | :-------: | --------------------------------------------------------------------------- |
| `operator`    | `address` | the operator to increase the allowance for `msg.sender`                     |
| `addedAmount` | `uint256` | the additional amount to add on top of the current operator&#39;s allowance |

### owner

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#owner)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#renounceownership)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Function signature: `renounceOwnership()`
- Function selector: `0x715018a6`

:::

```solidity
function renounceOwnership() external nonpayable;
```

Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

### revokeOperator

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#revokeoperator)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Function signature: `revokeOperator(address)`
- Function selector: `0xfad8b32a`

:::

```solidity
function revokeOperator(address operator) external nonpayable;
```

Removes the `operator` address as an operator of callers tokens, disallowing it to send any amount of tokens on behalf of the token owner (the caller of the function `msg.sender`). See also [`authorizedAmountFor`](#authorizedamountfor).

#### Parameters

| Name       |   Type    | Description                           |
| ---------- | :-------: | ------------------------------------- |
| `operator` | `address` | The address to revoke as an operator. |

### setData

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#setdata)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#setdatabatch)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#supportsinterface)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

### tokenSupplyCap

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#tokensupplycap)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#totalsupply)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#transfer)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Function signature: `transfer(address,address,uint256,bool,bytes)`
- Function selector: `0x760d9bba`

:::

```solidity
function transfer(
  address from,
  address to,
  uint256 amount,
  bool allowNonLSP1Recipient,
  bytes data
) external nonpayable;
```

Transfers an `amount` of tokens from the `from` address to the `to` address and notify both sender and recipients via the LSP1 [`universalReceiver(...)`](#`universalreceiver) function. If the tokens are transferred by an operator on behalf of a token holder, the allowance for the operator will be decreased by `amount` once the token transfer has been completed (See [`authorizedAmountFor`](#authorizedamountfor)).

#### Parameters

| Name                    |   Type    | Description                                                                                                                                                          |
| ----------------------- | :-------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address` | The sender address.                                                                                                                                                  |
| `to`                    | `address` | The recipient address.                                                                                                                                               |
| `amount`                | `uint256` | The amount of tokens to transfer.                                                                                                                                    |
| `allowNonLSP1Recipient` |  `bool`   | When set to `true`, the `to` address CAN be any address. When set to `false`, the `to` address MUST be a contract that supports the LSP1 UniversalReceiver standard. |
| `data`                  |  `bytes`  | Any additional data the caller wants included in the emitted event, and sent in the hooks of the `from` and `to` addresses.                                          |

### transferBatch

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#transferbatch)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Function signature: `transferBatch(address[],address[],uint256[],bool[],bytes[])`
- Function selector: `0x2d7667c9`

:::

```solidity
function transferBatch(
  address[] from,
  address[] to,
  uint256[] amount,
  bool[] allowNonLSP1Recipient,
  bytes[] data
) external nonpayable;
```

Same as [`transfer(...)`](#`transfer) but transfer multiple tokens based on the arrays of `from`, `to`, `amount`.

#### Parameters

| Name                    |    Type     | Description                                                                                                                                                                             |
| ----------------------- | :---------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address[]` | An array of sending addresses.                                                                                                                                                          |
| `to`                    | `address[]` | An array of receiving addresses.                                                                                                                                                        |
| `amount`                | `uint256[]` | An array of amount of tokens to transfer for each `from -&gt; to` transfer.                                                                                                             |
| `allowNonLSP1Recipient` |  `bool[]`   | For each transfer, when set to `true`, the `to` address CAN be any address. When set to `false`, the `to` address MUST be a contract that supports the LSP1 UniversalReceiver standard. |
| `data`                  |  `bytes[]`  | An array of additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                                                         |

### transferOwnership

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#transferownership)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#authorizedoperator)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Event signature: `AuthorizedOperator(address,address,uint256)`
- Event hash: `0xd66aff874162a96578e919097b6f6d153dfd89a5cec41bb331fdb0c4aec16e2c`

:::

```solidity
event AuthorizedOperator(address indexed operator, address indexed tokenOwner, uint256 indexed amount);
```

Emitted when `tokenOwner` enables `operator` for `amount` tokens.

#### Parameters

| Name                       |   Type    | Description                                                             |
| -------------------------- | :-------: | ----------------------------------------------------------------------- |
| `operator` **`indexed`**   | `address` | The address authorized as an operator                                   |
| `tokenOwner` **`indexed`** | `address` | The token owner                                                         |
| `amount` **`indexed`**     | `uint256` | The amount of tokens `operator` address has access to from `tokenOwner` |

### DataChanged

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#datachanged)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#ownershiptransferred)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
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

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#revokedoperator)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Event signature: `RevokedOperator(address,address)`
- Event hash: `0x50546e66e5f44d728365dc3908c63bc5cfeeab470722c1677e3073a6ac294aa1`

:::

```solidity
event RevokedOperator(address indexed operator, address indexed tokenOwner);
```

Emitted when `tokenOwner` disables `operator` for `amount` tokens and set its [`authorizedAmountFor(...)`](#`authorizedamountfor) to `0`.

#### Parameters

| Name                       |   Type    | Description                        |
| -------------------------- | :-------: | ---------------------------------- |
| `operator` **`indexed`**   | `address` | The address revoked from operating |
| `tokenOwner` **`indexed`** | `address` | The token owner                    |

### Transfer

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#transfer)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Event signature: `Transfer(address,address,address,uint256,bool,bytes)`
- Event hash: `0x3997e418d2cef0b3b0e907b1e39605c3f7d32dbd061e82ea5b4a770d46a160a6`

:::

```solidity
event Transfer(address indexed operator, address indexed from, address indexed to, uint256 amount, bool allowNonLSP1Recipient, bytes data);
```

Emitted when the `from` transferred successfully `amount` of tokens to `to`.

#### Parameters

| Name                     |   Type    | Description                                                                                                                  |
| ------------------------ | :-------: | ---------------------------------------------------------------------------------------------------------------------------- |
| `operator` **`indexed`** | `address` | The address of the operator that executed the transfer.                                                                      |
| `from` **`indexed`**     | `address` | The address which tokens were sent from (balance decreased by `-amount`).                                                    |
| `to` **`indexed`**       | `address` | The address that received the tokens (balance increased by `+amount`).                                                       |
| `amount`                 | `uint256` | The amount of tokens transferred.                                                                                            |
| `allowNonLSP1Recipient`  |  `bool`   | if the transferred enforced the `to` recipient address to be a contract that implements the LSP1 standard or not.            |
| `data`                   |  `bytes`  | Any additional data included by the caller during the transfer, and sent in the LSP1 hooks to the `from` and `to` addresses. |

---

## Errors

### ERC725Y_DataKeysValuesEmptyArray

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#erc725y_datakeysvaluesemptyarray)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `ERC725Y_DataKeysValuesEmptyArray()`
- Error hash: `0x97da5f95`

:::

```solidity
error ERC725Y_DataKeysValuesEmptyArray();
```

Reverts when one of the array parameter provided to [`setDataBatch`](#setdatabatch) function is an empty array.

### ERC725Y_DataKeysValuesLengthMismatch

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#erc725y_datakeysvalueslengthmismatch)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `ERC725Y_DataKeysValuesLengthMismatch()`
- Error hash: `0x3bcc8979`

:::

```solidity
error ERC725Y_DataKeysValuesLengthMismatch();
```

Reverts when there is not the same number of elements in the `datakeys` and `dataValues` array parameters provided when calling the [`setDataBatch`](#setdatabatch) function.

### ERC725Y_MsgValueDisallowed

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#erc725y_msgvaluedisallowed)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `ERC725Y_MsgValueDisallowed()`
- Error hash: `0xf36ba737`

:::

```solidity
error ERC725Y_MsgValueDisallowed();
```

Reverts when sending value to the [`setData`](#setdata) or [`setDataBatch`](#setdatabatch) function.

### LSP4TokenNameNotEditable

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp4tokennamenoteditable)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP4TokenNameNotEditable()`
- Error hash: `0x85c169bd`

:::

```solidity
error LSP4TokenNameNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenName` after the digital asset contract has been deployed. The `LSP4TokenName` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

### LSP4TokenSymbolNotEditable

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp4tokensymbolnoteditable)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP4TokenSymbolNotEditable()`
- Error hash: `0x76755b38`

:::

```solidity
error LSP4TokenSymbolNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenSymbol` after the digital asset contract has been deployed. The `LSP4TokenSymbol` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

### LSP7AmountExceedsAuthorizedAmount

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7amountexceedsauthorizedamount)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7AmountExceedsAuthorizedAmount(address,uint256,address,uint256)`
- Error hash: `0xf3a6b691`

:::

```solidity
error LSP7AmountExceedsAuthorizedAmount(
  address tokenOwner,
  uint256 authorizedAmount,
  address operator,
  uint256 amount
);
```

reverts when `operator` of `tokenOwner` send an `amount` of tokens larger than the `authorizedAmount`.

#### Parameters

| Name               |   Type    | Description |
| ------------------ | :-------: | ----------- |
| `tokenOwner`       | `address` | -           |
| `authorizedAmount` | `uint256` | -           |
| `operator`         | `address` | -           |
| `amount`           | `uint256` | -           |

### LSP7AmountExceedsBalance

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7amountexceedsbalance)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7AmountExceedsBalance(uint256,address,uint256)`
- Error hash: `0x08d47949`

:::

```solidity
error LSP7AmountExceedsBalance(
  uint256 balance,
  address tokenOwner,
  uint256 amount
);
```

reverts when sending an `amount` of tokens larger than the current `balance` of the `tokenOwner`.

#### Parameters

| Name         |   Type    | Description |
| ------------ | :-------: | ----------- |
| `balance`    | `uint256` | -           |
| `tokenOwner` | `address` | -           |
| `amount`     | `uint256` | -           |

### LSP7CannotSendToSelf

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7cannotsendtoself)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7CannotSendToSelf()`
- Error hash: `0xb9afb000`

:::

```solidity
error LSP7CannotSendToSelf();
```

reverts when specifying the same address for `from` or `to` in a token transfer.

### LSP7CannotSendWithAddressZero

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7cannotsendwithaddresszero)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7CannotSendWithAddressZero()`
- Error hash: `0xd2d5ec30`

:::

```solidity
error LSP7CannotSendWithAddressZero();
```

reverts when trying to:

- mint tokens to the zero address.

- burn tokens from the zero address.

- transfer tokens from or to the zero address.

### LSP7CannotUseAddressZeroAsOperator

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7cannotuseaddresszeroasoperator)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7CannotUseAddressZeroAsOperator()`
- Error hash: `0x6355e766`

:::

```solidity
error LSP7CannotUseAddressZeroAsOperator();
```

reverts when trying to set the zero address as an operator.

### LSP7CappedSupplyCannotMintOverCap

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7cappedsupplycannotmintovercap)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7CappedSupplyCannotMintOverCap()`
- Error hash: `0xeacbf0d1`

:::

```solidity
error LSP7CappedSupplyCannotMintOverCap();
```

_Cannot mint anymore as total supply reached the maximum cap._

Reverts when trying to mint tokens but the [`totalSupply`](#totalsupply) has reached the maximum [`tokenSupplyCap`](#tokensupplycap).

### LSP7CappedSupplyRequired

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7cappedsupplyrequired)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7CappedSupplyRequired()`
- Error hash: `0xacf1d8c5`

:::

```solidity
error LSP7CappedSupplyRequired();
```

_The `tokenSupplyCap` must be set and cannot be `0`._

Reverts when setting `0` for the [`tokenSupplyCap`](#tokensupplycap). The max token supply MUST be set to a number greater than 0.

### LSP7DecreasedAllowanceBelowZero

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7decreasedallowancebelowzero)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7DecreasedAllowanceBelowZero()`
- Error hash: `0x0ef76c35`

:::

```solidity
error LSP7DecreasedAllowanceBelowZero();
```

Reverts when trying to decrease an operator's allowance to more than its current allowance.

### LSP7InvalidTransferBatch

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7invalidtransferbatch)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7InvalidTransferBatch()`
- Error hash: `0x263eee8d`

:::

```solidity
error LSP7InvalidTransferBatch();
```

reverts when the array parameters used in [`transferBatch`](#transferbatch) have different lengths.

### LSP7NotifyTokenReceiverContractMissingLSP1Interface

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7notifytokenreceivercontractmissinglsp1interface)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7NotifyTokenReceiverContractMissingLSP1Interface(address)`
- Error hash: `0xa608fbb6`

:::

```solidity
error LSP7NotifyTokenReceiverContractMissingLSP1Interface(
  address tokenReceiver
);
```

reverts if the `tokenReceiver` does not implement LSP1 when minting or transferring tokens with `bool allowNonLSP1Recipient` set as `false`.

#### Parameters

| Name            |   Type    | Description |
| --------------- | :-------: | ----------- |
| `tokenReceiver` | `address` | -           |

### LSP7NotifyTokenReceiverIsEOA

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7notifytokenreceiveriseoa)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7NotifyTokenReceiverIsEOA(address)`
- Error hash: `0x26c247f4`

:::

```solidity
error LSP7NotifyTokenReceiverIsEOA(address tokenReceiver);
```

reverts if the `tokenReceiver` is an EOA when minting or transferring tokens with `bool allowNonLSP1Recipient` set as `false`.

#### Parameters

| Name            |   Type    | Description |
| --------------- | :-------: | ----------- |
| `tokenReceiver` | `address` | -           |

### LSP7TokenOwnerCannotBeOperator

:::note Links

- Specification details in [**LSP-7-CappedSupply**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CappedSupply.md#lsp7tokenownercannotbeoperator)
- Solidity implementation in [**LSP7CappedSupply**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CappedSupply)
- Error signature: `LSP7TokenOwnerCannotBeOperator()`
- Error hash: `0xdab75047`

:::

```solidity
error LSP7TokenOwnerCannotBeOperator();
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
