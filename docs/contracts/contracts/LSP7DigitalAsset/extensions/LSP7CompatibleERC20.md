# LSP7CompatibleERC20

:::info Solidity contract

[`LSP7CompatibleERC20.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)

:::

LSP7 extension, for compatibility for clients / tools that expect ERC20.

## Methods

### allowance

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#allowance)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Function signature: `allowance(address,address)`
- Function selector: `0xdd62ed3e`

:::

```solidity
function allowance(
  address tokenOwner,
  address operator
) external view returns (uint256);
```

#### Parameters

| Name         |   Type    | Description |
| ------------ | :-------: | ----------- |
| `tokenOwner` | `address` | -           |
| `operator`   | `address` | -           |

#### Returns

| Name |   Type    | Description |
| ---- | :-------: | ----------- |
| `0`  | `uint256` | -           |

### approve

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#approve)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Function signature: `approve(address,uint256)`
- Function selector: `0x095ea7b3`

:::

```solidity
function approve(
  address operator,
  uint256 amount
) external nonpayable returns (bool);
```

#### Parameters

| Name       |   Type    | Description |
| ---------- | :-------: | ----------- |
| `operator` | `address` | -           |
| `amount`   | `uint256` | -           |

#### Returns

| Name |  Type  | Description |
| ---- | :----: | ----------- |
| `0`  | `bool` | -           |

### authorizeOperator

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#authorizeoperator)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#authorizedamountfor)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#balanceof)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#decimals)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#decreaseallowance)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#getdata)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#getdatabatch)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#increaseallowance)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

### name

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#name)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#owner)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#renounceownership)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Function signature: `renounceOwnership()`
- Function selector: `0x715018a6`

:::

```solidity
function renounceOwnership() external nonpayable;
```

Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

### revokeOperator

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#revokeoperator)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#setdata)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#setdatabatch)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#supportsinterface)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#symbol)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

### totalSupply

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#totalsupply)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#transfer)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

### transfer

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#transfer)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Function signature: `transfer(address,uint256)`
- Function selector: `0xa9059cbb`

:::

:::info

This function uses the `allowNonLSP1Recipient` parameter as `true` so that EOA and any contract can receive tokens.

:::

```solidity
function transfer(
  address to,
  uint256 amount
) external nonpayable returns (bool);
```

#### Parameters

| Name     |   Type    | Description |
| -------- | :-------: | ----------- |
| `to`     | `address` | -           |
| `amount` | `uint256` | -           |

#### Returns

| Name |  Type  | Description |
| ---- | :----: | ----------- |
| `0`  | `bool` | -           |

### transferBatch

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#transferbatch)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

### transferFrom

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#transferfrom)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Function signature: `transferFrom(address,address,uint256)`
- Function selector: `0x23b872dd`

:::

:::info

This function uses the `allowNonLSP1Recipient` parameter as `true` so that EOA and any contract can receive tokens.

:::

```solidity
function transferFrom(
  address from,
  address to,
  uint256 amount
) external nonpayable returns (bool);
```

#### Parameters

| Name     |   Type    | Description |
| -------- | :-------: | ----------- |
| `from`   | `address` | -           |
| `to`     | `address` | -           |
| `amount` | `uint256` | -           |

#### Returns

| Name |  Type  | Description |
| ---- | :----: | ----------- |
| `0`  | `bool` | -           |

### transferOwnership

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#transferownership)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#approval)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Event signature: `Approval(address,address,uint256)`
- Event hash: `0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925`

:::

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

ERC20 `Approval` event emitted when `owner` enables `spender` for `value` tokens. To provide compatibility with indexing ERC20 events.

#### Parameters

| Name                    |   Type    | Description                                               |
| ----------------------- | :-------: | --------------------------------------------------------- |
| `owner` **`indexed`**   | `address` | The account giving approval                               |
| `spender` **`indexed`** | `address` | The account receiving approval                            |
| `value`                 | `uint256` | The amount of tokens `spender` has access to from `owner` |

### AuthorizedOperator

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#authorizedoperator)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#datachanged)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#ownershiptransferred)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#revokedoperator)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#transfer)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#erc725y_datakeysvaluesemptyarray)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Error signature: `ERC725Y_DataKeysValuesEmptyArray()`
- Error hash: `0x97da5f95`

:::

```solidity
error ERC725Y_DataKeysValuesEmptyArray();
```

Reverts when one of the array parameter provided to [`setDataBatch`](#setdatabatch) function is an empty array.

### ERC725Y_DataKeysValuesLengthMismatch

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#erc725y_datakeysvalueslengthmismatch)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Error signature: `ERC725Y_DataKeysValuesLengthMismatch()`
- Error hash: `0x3bcc8979`

:::

```solidity
error ERC725Y_DataKeysValuesLengthMismatch();
```

Reverts when there is not the same number of elements in the `datakeys` and `dataValues` array parameters provided when calling the [`setDataBatch`](#setdatabatch) function.

### ERC725Y_MsgValueDisallowed

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#erc725y_msgvaluedisallowed)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Error signature: `ERC725Y_MsgValueDisallowed()`
- Error hash: `0xf36ba737`

:::

```solidity
error ERC725Y_MsgValueDisallowed();
```

Reverts when sending value to the [`setData`](#setdata) or [`setDataBatch`](#setdatabatch) function.

### LSP4TokenNameNotEditable

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp4tokennamenoteditable)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Error signature: `LSP4TokenNameNotEditable()`
- Error hash: `0x85c169bd`

:::

```solidity
error LSP4TokenNameNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenName` after the digital asset contract has been deployed. The `LSP4TokenName` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

### LSP4TokenSymbolNotEditable

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp4tokensymbolnoteditable)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Error signature: `LSP4TokenSymbolNotEditable()`
- Error hash: `0x76755b38`

:::

```solidity
error LSP4TokenSymbolNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenSymbol` after the digital asset contract has been deployed. The `LSP4TokenSymbol` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

### LSP7AmountExceedsAuthorizedAmount

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp7amountexceedsauthorizedamount)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp7amountexceedsbalance)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp7cannotsendtoself)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Error signature: `LSP7CannotSendToSelf()`
- Error hash: `0xb9afb000`

:::

```solidity
error LSP7CannotSendToSelf();
```

reverts when specifying the same address for `from` or `to` in a token transfer.

### LSP7CannotSendWithAddressZero

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp7cannotsendwithaddresszero)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp7cannotuseaddresszeroasoperator)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Error signature: `LSP7CannotUseAddressZeroAsOperator()`
- Error hash: `0x6355e766`

:::

```solidity
error LSP7CannotUseAddressZeroAsOperator();
```

reverts when trying to set the zero address as an operator.

### LSP7DecreasedAllowanceBelowZero

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp7decreasedallowancebelowzero)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Error signature: `LSP7DecreasedAllowanceBelowZero()`
- Error hash: `0x0ef76c35`

:::

```solidity
error LSP7DecreasedAllowanceBelowZero();
```

Reverts when trying to decrease an operator's allowance to more than its current allowance.

### LSP7InvalidTransferBatch

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp7invalidtransferbatch)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Error signature: `LSP7InvalidTransferBatch()`
- Error hash: `0x263eee8d`

:::

```solidity
error LSP7InvalidTransferBatch();
```

reverts when the array parameters used in [`transferBatch`](#transferbatch) have different lengths.

### LSP7NotifyTokenReceiverContractMissingLSP1Interface

:::note Links

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp7notifytokenreceivercontractmissinglsp1interface)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp7notifytokenreceiveriseoa)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
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

- Specification details in [**LSP-7-CompatibleERC20**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-CompatibleERC20.md#lsp7tokenownercannotbeoperator)
- Solidity implementation in [**LSP7CompatibleERC20**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7CompatibleERC20)
- Error signature: `LSP7TokenOwnerCannotBeOperator()`
- Error hash: `0xdab75047`

:::

```solidity
error LSP7TokenOwnerCannotBeOperator();
```

reverts when trying to authorize or revoke the token's owner as an operator.
