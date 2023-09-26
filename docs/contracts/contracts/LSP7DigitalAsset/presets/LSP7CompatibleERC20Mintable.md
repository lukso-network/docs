<!-- This file is auto-generated. Do not edit! -->
<!-- Check `@lukso-network/lsp-smart-contracts/CONTRIBUTING.md#solidity-code-comments` for more information. -->

# LSP7CompatibleERC20Mintable

:::info Standard Specifications

[`LSP-7-DigitalAsset`](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md)

:::
:::info Solidity implementation

[`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)

:::

> LSP7CompatibleERC20 deployable preset contract with a public {mint} function callable only by the contract {owner}.

## Public Methods

Public methods are accessible externally from users, allowing interaction with this function from dApps or other smart contracts.
When marked as 'public', a method can be called both externally and internally, on the other hand, when marked as 'external', a method can only be called externally.

### constructor

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#constructor)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)

:::

```solidity
constructor(string name_, string symbol_, address newOwner_);
```

_Deploying a `LSP7CompatibleERC20Mintable` token contract with: token name = `name_`, token symbol = `symbol_`, and address `newOwner_` as the token contract owner._

#### Parameters

| Name        |   Type    | Description                      |
| ----------- | :-------: | -------------------------------- |
| `name_`     | `string`  | The name of the token.           |
| `symbol_`   | `string`  | The symbol of the token.         |
| `newOwner_` | `address` | The owner of the token contract. |

<br/>

### fallback

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#fallback)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)

:::

```solidity
fallback() external payable;
```

<br/>

### allowance

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#allowance)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### approve

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#approve)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### authorizeOperator

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#authorizeoperator)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Function signature: `authorizeOperator(address,uint256,bytes)`
- Function selector: `0xb49506fd`

:::

:::danger

To avoid front-running and Allowance Double-Spend Exploit when increasing or decreasing the authorized amount of an operator, it is advised to: 1. either call {revokeOperator} first, and then re-call {authorizeOperator} with the new amount. 2. or use the non-standard functions {increaseAllowance} or {decreaseAllowance}. For more information, see: https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/

:::

```solidity
function authorizeOperator(
  address operator,
  uint256 amount,
  bytes operatorNotificationData
) external nonpayable;
```

Sets an `amount` of tokens that an `operator` has access from the caller's balance (allowance). See [`authorizedAmountFor`](#authorizedamountfor).

#### Parameters

| Name                       |   Type    | Description                                            |
| -------------------------- | :-------: | ------------------------------------------------------ |
| `operator`                 | `address` | The address to authorize as an operator.               |
| `amount`                   | `uint256` | The allowance amount of tokens operator has access to. |
| `operatorNotificationData` |  `bytes`  | The data to notify the operator about via LSP1.        |

<br/>

### authorizedAmountFor

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#authorizedamountfor)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

| Name         |   Type    | Description                                                |
| ------------ | :-------: | ---------------------------------------------------------- |
| `operator`   | `address` | The operator's address to query the authorized amount for. |
| `tokenOwner` | `address` | The token owner that `operator` has allowance on.          |

#### Returns

| Name |   Type    | Description                                                                             |
| ---- | :-------: | --------------------------------------------------------------------------------------- |
| `0`  | `uint256` | The amount of tokens the `operator`'s address has access on the `tokenOwner`'s balance. |

<br/>

### balanceOf

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#balanceof)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### decimals

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#decimals)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### decreaseAllowance

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#decreaseallowance)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Function signature: `decreaseAllowance(address,uint256,bytes)`
- Function selector: `0x7b204c4e`

:::

:::info

This is a non-standard function, not part of the LSP7 standard interface. It has been added in the LSP7 contract implementation so that it can be used as a prevention mechanism against the double spending allowance vulnerability.

:::

```solidity
function decreaseAllowance(
  address operator,
  uint256 substractedAmount,
  bytes operatorNotificationData
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

| Name                       |   Type    | Description                                            |
| -------------------------- | :-------: | ------------------------------------------------------ |
| `operator`                 | `address` | the operator to decrease allowance for `msg.sender`    |
| `substractedAmount`        | `uint256` | the amount to decrease by in the operator's allowance. |
| `operatorNotificationData` |  `bytes`  | -                                                      |

<br/>

### getData

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#getdata)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#getdatabatch)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#getoperatorsof)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Function signature: `getOperatorsOf(address)`
- Function selector: `0xd72fc29a`

:::

```solidity
function getOperatorsOf(address tokenOwner) external view returns (address[]);
```

Returns all `operator` addresses that are allowed to transfer or burn on behalf of `tokenOwner`.

#### Parameters

| Name         |   Type    | Description                               |
| ------------ | :-------: | ----------------------------------------- |
| `tokenOwner` | `address` | The token owner to get the operators for. |

#### Returns

| Name |    Type     | Description                                                                         |
| ---- | :---------: | ----------------------------------------------------------------------------------- |
| `0`  | `address[]` | An array of operators allowed to transfer or burn tokens on behalf of `tokenOwner`. |

<br/>

### increaseAllowance

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#increaseallowance)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Function signature: `increaseAllowance(address,uint256,bytes)`
- Function selector: `0x2bc1da82`

:::

:::info

This is a non-standard function, not part of the LSP7 standard interface. It has been added in the LSP7 contract implementation so that it can be used as a prevention mechanism against double spending allowance vulnerability.

:::

```solidity
function increaseAllowance(
  address operator,
  uint256 addedAmount,
  bytes operatorNotificationData
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

| Name                       |   Type    | Description                                                             |
| -------------------------- | :-------: | ----------------------------------------------------------------------- |
| `operator`                 | `address` | the operator to increase the allowance for `msg.sender`                 |
| `addedAmount`              | `uint256` | the additional amount to add on top of the current operator's allowance |
| `operatorNotificationData` |  `bytes`  | -                                                                       |

<br/>

### mint

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#mint)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Function signature: `mint(address,uint256,bool,bytes)`
- Function selector: `0x7580d920`

:::

```solidity
function mint(
  address to,
  uint256 amount,
  bool allowNonLSP1Recipient,
  bytes data
) external nonpayable;
```

Public [`_mint`](#_mint) function only callable by the [`owner`](#owner).

#### Parameters

| Name                    |   Type    | Description |
| ----------------------- | :-------: | ----------- |
| `to`                    | `address` | -           |
| `amount`                | `uint256` | -           |
| `allowNonLSP1Recipient` |  `bool`   | -           |
| `data`                  |  `bytes`  | -           |

<br/>

### name

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#name)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### owner

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#owner)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

### renounceOwnership

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#renounceownership)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#revokeoperator)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Function signature: `revokeOperator(address,bytes)`
- Function selector: `0xca3631e7`

:::

```solidity
function revokeOperator(
  address operator,
  bytes operatorNotificationData
) external nonpayable;
```

Removes the `operator` address as an operator of callers tokens, disallowing it to send any amount of tokens on behalf of the token owner (the caller of the function `msg.sender`). See also [`authorizedAmountFor`](#authorizedamountfor).

#### Parameters

| Name                       |   Type    | Description                                     |
| -------------------------- | :-------: | ----------------------------------------------- |
| `operator`                 | `address` | The address to revoke as an operator.           |
| `operatorNotificationData` |  `bytes`  | The data to notify the operator about via LSP1. |

<br/>

### setData

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#setdata)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#setdatabatch)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#supportsinterface)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#symbol)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### totalSupply

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#totalsupply)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#transfer)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### transfer

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#transfer)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### transferBatch

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#transferbatch)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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
| `amount`                | `uint256[]` | An array of amount of tokens to transfer for each `from -> to` transfer.                                                                                                                |
| `allowNonLSP1Recipient` |  `bool[]`   | For each transfer, when set to `true`, the `to` address CAN be any address. When set to `false`, the `to` address MUST be a contract that supports the LSP1 UniversalReceiver standard. |
| `data`                  |  `bytes[]`  | An array of additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                                                         |

<br/>

### transferFrom

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#transferfrom)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### transferOwnership

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#transferownership)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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
function _setData(bytes32 key, bytes value) internal nonpayable;
```

<br/>

### \_updateOperator

```solidity
function _updateOperator(
  address tokenOwner,
  address operator,
  uint256 amount,
  bytes operatorNotificationData
) internal nonpayable;
```

<br/>

### \_mint

```solidity
function _mint(
  address to,
  uint256 amount,
  bool allowNonLSP1Recipient,
  bytes data
) internal nonpayable;
```

<br/>

### \_burn

```solidity
function _burn(address from, uint256 amount, bytes data) internal nonpayable;
```

<br/>

### \_transfer

```solidity
function _transfer(
  address from,
  address to,
  uint256 amount,
  bool allowNonLSP1Recipient,
  bytes data
) internal nonpayable;
```

<br/>

### \_beforeTokenTransfer

```solidity
function _beforeTokenTransfer(
  address from,
  address to,
  uint256 amount
) internal nonpayable;
```

Hook that is called before any token transfer, including minting and burning.
Allows to run custom logic before updating balances and notifiying sender/recipient by overriding this function.

#### Parameters

| Name     |   Type    | Description                     |
| -------- | :-------: | ------------------------------- |
| `from`   | `address` | The sender address              |
| `to`     | `address` | The recipient address           |
| `amount` | `uint256` | The amount of token to transfer |

<br/>

### \_notifyTokenOperator

```solidity
function _notifyTokenOperator(
  address operator,
  bytes lsp1Data
) internal nonpayable;
```

Attempt to notify the operator `operator` about the `amount` tokens being authorized with.
This is done by calling its [`universalReceiver`](#universalreceiver) function with the `_TYPEID_LSP7_TOKENOPERATOR` as typeId, if `operator` is a contract that supports the LSP1 interface.
If `operator` is an EOA or a contract that does not support the LSP1 interface, nothing will happen and no notification will be sent.

#### Parameters

| Name       |   Type    | Description                                                                    |
| ---------- | :-------: | ------------------------------------------------------------------------------ |
| `operator` | `address` | The address to call the {universalReceiver} function on.                       |
| `lsp1Data` |  `bytes`  | the data to be sent to the `operator` address in the `universalReceiver` call. |

<br/>

### \_notifyTokenSender

```solidity
function _notifyTokenSender(address from, bytes lsp1Data) internal nonpayable;
```

Attempt to notify the token sender `from` about the `amount` of tokens being transferred.
This is done by calling its [`universalReceiver`](#universalreceiver) function with the `_TYPEID_LSP7_TOKENSSENDER` as typeId, if `from` is a contract that supports the LSP1 interface.
If `from` is an EOA or a contract that does not support the LSP1 interface, nothing will happen and no notification will be sent.

#### Parameters

| Name       |   Type    | Description                                                                |
| ---------- | :-------: | -------------------------------------------------------------------------- |
| `from`     | `address` | The address to call the {universalReceiver} function on.                   |
| `lsp1Data` |  `bytes`  | the data to be sent to the `from` address in the `universalReceiver` call. |

<br/>

### \_notifyTokenReceiver

```solidity
function _notifyTokenReceiver(
  address to,
  bool allowNonLSP1Recipient,
  bytes lsp1Data
) internal nonpayable;
```

Attempt to notify the token receiver `to` about the `amount` tokens being received.
This is done by calling its [`universalReceiver`](#universalreceiver) function with the `_TYPEID_LSP7_TOKENSRECIPIENT` as typeId, if `to` is a contract that supports the LSP1 interface.
If `to` is is an EOA or a contract that does not support the LSP1 interface, the behaviour will depend on the `allowNonLSP1Recipient` boolean flag.

- if `allowNonLSP1Recipient` is set to `true`, nothing will happen and no notification will be sent.

- if `allowNonLSP1Recipient` is set to `false, the transaction will revert.

#### Parameters

| Name                    |   Type    | Description                                                                                         |
| ----------------------- | :-------: | --------------------------------------------------------------------------------------------------- |
| `to`                    | `address` | The address to call the {universalReceiver} function on.                                            |
| `allowNonLSP1Recipient` |  `bool`   | a boolean that describe if transfer to a `to` address that does not support LSP1 is allowed or not. |
| `lsp1Data`              |  `bytes`  | the data to be sent to the `to` address in the `universalReceiver(...)` call.                       |

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

### \_getExtension

```solidity
function _getExtension(bytes4 functionSelector) internal view returns (address);
```

Returns the extension address stored under the following data key:

- [`_LSP17_EXTENSION_PREFIX`](#_lsp17_extension_prefix) + `<bytes4>` (Check [LSP2-ERC725YJSONSchema] for encoding the data key).

- If no extension is stored, returns the address(0).

<br/>

### \_fallbackLSP17Extendable

```solidity
function _fallbackLSP17Extendable(
  bytes callData
) internal nonpayable returns (bytes);
```

Forwards the call with the received value to an extension mapped to a function selector.
Calls [`_getExtension`](#_getextension) to get the address of the extension mapped to the function selector being
called on the account. If there is no extension, the address(0) will be returned.
Reverts if there is no extension for the function being called.
If there is an extension for the function selector being called, it calls the extension with the
CALL opcode, passing the [`msg.data`](#msg.data) appended with the 20 bytes of the [`msg.sender`](#msg.sender) and
32 bytes of the [`msg.value`](#msg.value)
Because the function uses assembly [`return()/revert()`](#return) to terminate the call, it cannot be
called before other codes in fallback().
Otherwise, the codes after \_fallbackLSP17Extendable() may never be reached.

<br/>

## Events

### Approval

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#approval)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Event signature: `Approval(address,address,uint256)`
- Event topic hash: `0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925`

:::

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Emitted when the allowance of a `spender` for an `owner` is set by a call to [`approve`](#approve). `value` is the new allowance.

#### Parameters

| Name                    |   Type    | Description                                               |
| ----------------------- | :-------: | --------------------------------------------------------- |
| `owner` **`indexed`**   | `address` | The account giving approval                               |
| `spender` **`indexed`** | `address` | The account receiving approval                            |
| `value`                 | `uint256` | The amount of tokens `spender` has access to from `owner` |

<br/>

### AuthorizedOperator

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#authorizedoperator)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Event signature: `AuthorizedOperator(address,address,uint256,bytes)`
- Event topic hash: `0x0744b3de98efaff36606a0e67662fb8697adb0ed49d90730bdb4bbf885f30597`

:::

```solidity
event AuthorizedOperator(address indexed operator, address indexed tokenOwner, uint256 indexed amount, bytes operatorNotificationData);
```

Emitted when `tokenOwner` enables `operator` for `amount` tokens.

#### Parameters

| Name                       |   Type    | Description                                                             |
| -------------------------- | :-------: | ----------------------------------------------------------------------- |
| `operator` **`indexed`**   | `address` | The address authorized as an operator                                   |
| `tokenOwner` **`indexed`** | `address` | The token owner                                                         |
| `amount` **`indexed`**     | `uint256` | The amount of tokens `operator` address has access to from `tokenOwner` |
| `operatorNotificationData` |  `bytes`  | The data to notify the operator about via LSP1.                         |

<br/>

### DataChanged

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#datachanged)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#ownershiptransferred)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#revokedoperator)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Event signature: `RevokedOperator(address,address,bytes)`
- Event topic hash: `0x9ebfc34ce0da1178c4be66252d63a8a173d733c4bbb049241ce142dc4f0e0228`

:::

```solidity
event RevokedOperator(address indexed operator, address indexed tokenOwner, bytes operatorNotificationData);
```

Emitted when `tokenOwner` disables `operator` for `amount` tokens and set its [`authorizedAmountFor(...)`](#`authorizedamountfor) to `0`.

#### Parameters

| Name                       |   Type    | Description                                     |
| -------------------------- | :-------: | ----------------------------------------------- |
| `operator` **`indexed`**   | `address` | The address revoked from operating              |
| `tokenOwner` **`indexed`** | `address` | The token owner                                 |
| `operatorNotificationData` |  `bytes`  | The data to notify the operator about via LSP1. |

<br/>

### Transfer

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#transfer)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Event signature: `Transfer(address,address,uint256)`
- Event topic hash: `0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef`

:::

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.

#### Parameters

| Name                 |   Type    | Description                      |
| -------------------- | :-------: | -------------------------------- |
| `from` **`indexed`** | `address` | The sending address              |
| `to` **`indexed`**   | `address` | The receiving address            |
| `value`              | `uint256` | The amount of tokens transfered. |

<br/>

### Transfer

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#transfer)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Event signature: `Transfer(address,address,address,uint256,bool,bytes)`
- Event topic hash: `0x3997e418d2cef0b3b0e907b1e39605c3f7d32dbd061e82ea5b4a770d46a160a6`

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

<br/>

## Errors

### ERC725Y_DataKeysValuesEmptyArray

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#erc725y_datakeysvaluesemptyarray)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#erc725y_datakeysvalueslengthmismatch)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#erc725y_msgvaluedisallowed)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#invalidextensionaddress)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#invalidfunctionselector)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp4tokennamenoteditable)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp4tokensymbolnoteditable)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Error signature: `LSP4TokenSymbolNotEditable()`
- Error hash: `0x76755b38`

:::

```solidity
error LSP4TokenSymbolNotEditable();
```

Reverts when trying to edit the data key `LSP4TokenSymbol` after the digital asset contract has been deployed. The `LSP4TokenSymbol` data key is located inside the ERC725Y Data key-value store of the digital asset contract. It can be set only once inside the constructor/initializer when the digital asset contract is being deployed.

<br/>

### LSP7AmountExceedsAuthorizedAmount

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp7amountexceedsauthorizedamount)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### LSP7AmountExceedsBalance

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp7amountexceedsbalance)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### LSP7CannotSendToSelf

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp7cannotsendtoself)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Error signature: `LSP7CannotSendToSelf()`
- Error hash: `0xb9afb000`

:::

```solidity
error LSP7CannotSendToSelf();
```

reverts when specifying the same address for `from` or `to` in a token transfer.

<br/>

### LSP7CannotSendWithAddressZero

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp7cannotsendwithaddresszero)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### LSP7CannotUseAddressZeroAsOperator

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp7cannotuseaddresszeroasoperator)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Error signature: `LSP7CannotUseAddressZeroAsOperator()`
- Error hash: `0x6355e766`

:::

```solidity
error LSP7CannotUseAddressZeroAsOperator();
```

reverts when trying to set the zero address as an operator.

<br/>

### LSP7DecreasedAllowanceBelowZero

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp7decreasedallowancebelowzero)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Error signature: `LSP7DecreasedAllowanceBelowZero()`
- Error hash: `0x0ef76c35`

:::

```solidity
error LSP7DecreasedAllowanceBelowZero();
```

Reverts when trying to decrease an operator's allowance to more than its current allowance.

<br/>

### LSP7InvalidTransferBatch

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp7invalidtransferbatch)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Error signature: `LSP7InvalidTransferBatch()`
- Error hash: `0x263eee8d`

:::

```solidity
error LSP7InvalidTransferBatch();
```

reverts when the array parameters used in [`transferBatch`](#transferbatch) have different lengths.

<br/>

### LSP7NotifyTokenReceiverContractMissingLSP1Interface

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp7notifytokenreceivercontractmissinglsp1interface)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### LSP7NotifyTokenReceiverIsEOA

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp7notifytokenreceiveriseoa)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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

<br/>

### LSP7TokenOwnerCannotBeOperator

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#lsp7tokenownercannotbeoperator)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
- Error signature: `LSP7TokenOwnerCannotBeOperator()`
- Error hash: `0xdab75047`

:::

```solidity
error LSP7TokenOwnerCannotBeOperator();
```

reverts when trying to authorize or revoke the token's owner as an operator.

<br/>

### NoExtensionFoundForFunctionSelector

:::note References

- Specification details: [**LSP-7-DigitalAsset**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-7-DigitalAsset.md#noextensionfoundforfunctionselector)
- Solidity implementation: [`LSP7CompatibleERC20Mintable.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol)
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
