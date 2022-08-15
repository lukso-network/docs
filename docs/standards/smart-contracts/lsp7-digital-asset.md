---
title: LSP7DigitalAsset
sidebar_position: 8
---

# LSP7DigitalAsset

:::info Solidity contract

[`LSP7DigitalAsset.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol)

:::

The **LSP7DigitalAsset** contract represents digital assets for either fungible or non-fungible tokens where minting and transferring are specified with an amount of tokens. It has some functions from **[ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)** and **[ERC777](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC777/ERC777.sol)** with more upgraded features.

This contract serves as a **Fungible Token Contract** when `isNonDivisible` bool is set to **false** in the `constructor(...)` and otherwise serves as a **Non-Fungible Token Contract**.

:::note
_The LSP7DigitalAsset contract also contains the methods from_ [_ERC165_](https://eips.ethereum.org/EIPS/eip-165) :

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

:::

## Public Functions

### constructor

```solidity
constructor(
    string memory name_,
    string memory symbol_,
    address newOwner_,
    bool isNonDivisible_
) LSP4DigitalAssetMetadata(name_, symbol_, newOwner_)
```

Sets the **initial owner** of the token, and sets the following data keys on the [**ERC725Y Data Key-Value Store**](./lsp0-erc725-account#setdata):

- name: token's name.
- symbol: token's symbol.
- [**SupportedStandards:LSP4DigitalAsset**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#supportedstandardslsp4digitalasset) data key.

The the `isNonDivisible` parameter specifies if the contract represents a fungible token or an NFT.

#### Parameters:

| Name        | Type    | Description                                                            |
| :---------- | :------ | :--------------------------------------------------------------------- |
| `name_`     | string  | The name of the token.                                                 |
| `symbol_`   | string  | The symbol of the token.                                               |
| `newOwner_` | address | The owner of the contract.                                             |
| `isNonDivisible_`    | bool    | Specify if the contract represents a fungible or a non-fungible token. |

### decimals

```solidity
  function decimals() public view returns (uint256 value)
```

Returns the number of decimals used to get its user representation.

:::note
If the contract represents a **NFT** then **0** SHOULD be used, otherwise **18** is the common value.
:::

#### Return Values:

| Name    | Type    | Description                          |
| :------ | :------ | :----------------------------------- |
| `value` | uint256 | The number of decimals of the token. |

### totalSupply

```solidity
function totalSupply() public view returns (uint256 value)
```

Returns the number of existing tokens of this contract.

#### Return Values:

| Name    | Type    | Description                    |
| :------ | :------ | :----------------------------- |
| `value` | uint256 | The number of existing tokens. |

### balanceOf

```solidity
function balanceOf(address tokenOwner) public view returns (uint256 value)
```

Returns the number of existing tokens of the contract owned by the `tokenOwner` address.

#### Parameters:

| Name         | Type    | Description           |
| :----------- | :------ | :-------------------- |
| `tokenOwner` | address | The address to query. |

#### Return Values:

| Name    | Type    | Description                                 |
| :------ | :------ | :------------------------------------------ |
| `value` | uint256 | The number of tokens owned by this address. |

### authorizeOperator

```solidity
function authorizeOperator(
    address operator,
    uint256 amount
) public
```

Sets the `amount` of tokens to which the `operator` has access from the caller's tokens.

_Triggers the **[AuthorizedOperator](#authorizedoperator)** event when an address get authorized as an operator._

#### Parameters:

| Name       | Type    | Description                                  |
| :--------- | :------ | :------------------------------------------- |
| `operator` | address | The address to authorize as an operator.     |
| `amount`   | uint256 | The amount of tokens operator has access to. |

:::note

#### Requirements:

- `operator` cannot be calling address.
- `operator` cannot be the zero address.

:::

### revokeOperator

```solidity
function revokeOperator(address operator) public
```

Removes the `operator` address as an operator of caller's tokens.

_Triggers the **[RevokedOperator](#revokedoperator)** event when an address get revoked as an operator._

#### Parameters:

| Name       | Type    | Description                           |
| :--------- | :------ | :------------------------------------ |
| `operator` | address | The address to revoke as an operator. |

:::note

#### Requirements:

- `operator` cannot be calling address.
- `operator` cannot be the zero address.

:::

### isOperatorFor

```solidity
function isOperatorFor(
    address tokenOwner,
    address operator
) public view returns (uint256 amount)
```

Returns the amount of tokens to which the `operator` address has access from the `tokenOwner` contract. Operators can send and burn tokens on behalf of their owners.

:::note
The tokenOwner is its own operator.
:::

#### Parameters:

| Name         | Type    | Description                               |
| :----------- | :------ | :---------------------------------------- |
| `tokenOwner` | address | The token owner.                          |
| `operator`   | address | The address to query operator status for. |

#### Return Values:

| Name     | Type    | Description                                                              |
| :------- | :------ | :----------------------------------------------------------------------- |
| `amount` | uint256 | The amount of tokens `operator` address has access to from `tokenOwner`. |

### transfer

```solidity
function transfer(
    address from,
    address to,
    uint256 amount,
    bool force,
    bytes memory data
) public
```

Transfers an `amount` of tokens from the `from` address to the `to` address. The `force` parameter **MUST** be set to TRUE when transferring tokens to Externally Owned Accounts (EOAs) or if contracts do not implement the [LSP1-UniversalReceiverDelegate Standard](../generic-standards/lsp1-universal-receiver.md).

Will notify the token sender and receiver by calling the `universalReceiver(...)` function on the `from` and `to` address.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

| Name     | Type    | Description                                                                                                                               |
| :------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`   | address | The sending address.                                                                                                                      |
| `to`     | address | The receiving address.                                                                                                                    |
| `amount` | uint256 | The amount of token to transfer.                                                                                                          |
| `force`  | bool    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`   | bytes   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

:::note

#### Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `amount` tokens must be owned by `from` .
- If the caller is not `from`, it must be an operator for `from` with access to at least `amount` tokens.

:::

### transferBatch

```solidity
function transferBatch(
    address[] from,
    address[] to,
    uint256[] amount,
    bool[] force,
    bytes[] memory data
) public
```

Transfers multiple tokens based on the `from`, `to`, and `amount` arrays. If any transfer fails, the whole call will revert.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

| Name     | Type      | Description                                                                                                                               |
| :------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`   | address[] | The list of sending addresses.                                                                                                            |
| `to`     | address[] | The list of receiving addresses.                                                                                                          |
| `amount` | uint256[] | The amount of tokens to transfer.                                                                                                         |
| `force`  | bool[]    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`   | bytes[]   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

:::note

#### Requirements:

- `from`, `to`, `amount` lists are the same length.
- No values in `from` can be the zero address.
- No values in `to` can be the zero address.
- Each `amount` tokens must be owned by `from`.
- If the caller is not `from`, it must be an operator for `from` with access to at least `amount` tokens.

:::

## Internal Functions

:::info Warning
By deploying an LSP7DigitalAsset contract, there will be no public mint or burn function.
In order to use them you have to extend the smart contracts and create custom methods using the internal functions.
:::

### _mint

```solidity
function _mint(
    address to,
    uint256 amount,
    bool force,
    bytes memory data
) internal virtual
```

Mints `amount` tokens and transfers it to `to`.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

|   Name   |   Type   | Description |
| :------- | :------- | :---------- |
| `to`     | address  | The receiving address. |
| `amount` | uint256  | The amount of token to mint. |
| `force`  | bool     | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `memory` | bytes    | Additional data the caller wants included in the emitted event, and sent in the hook to `to` address. |

:::note

#### Requirements:

- `to` cannot be the zero address.

:::

### _transfer

```solidity
function _transfer(
    address from,
    address to,
    uint256 amount,
    bool force,
    bytes memory data
) internal virtual
```

Transfers `amount` tokens from `from` to `to`.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

|   Name   |   Type   | Description |
| :------- | :------- | :---------- |
| `from`   | address  | The sending address. |
| `to`     | address  | The receiving address. |
| `amount` | uint256  | The amount of token to transfer. |
| `force`  | bool     | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `memory` | bytes    | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses. |

:::note

#### Requirements:

- `to` cannot be the zero address.
- `from` cannot be the zero address.
- `from` must have at least `amount` tokens.
- If the caller is not `from`, it must be an operator for `from` with access to at least `amount` tokens.

:::

### _burn

```solidity
function _burn(
    address from,
    uint256 amount,
    bytes memory data
) internal virtual
```

Burns `amount` tokens.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

|   Name   |   Type   | Description |
| :------- | :------- | :---------- |
| `from`   | address  | The sending address. |
| `amount` | uint256  | The amount of token to burn. |
| `data`   | bytes    | Additional data the caller wants included in the emitted event, and sent in the hook to `from` address. |

:::note

#### Requirements:

- `from` cannot be the zero address.
- `from` must have at least `amount` tokens.
- If the caller is not `from`, it must be an operator for `from` with access to at least `amount` tokens.

:::

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
) internal virtual
```

Hook that is called before any token transfer. This includes minting and burning.

#### Parameters:

|   Name   |   Type   | Description |
| :------- | :------- | :---------- |
| `from`   | address  | The sending address. |
| `to`     | address  | The receiving address. |
| `amount` | uint256  | The amount of token to transfer. |

:::note

#### Requirements:

- When `from` and `to` are both non-zero, ``from``'s `amount` tokens will betransferred to `to`.
- When `from` is zero, `amount` tokens will be minted for `to`.
- When `to` is zero, ``from``'s `amount` tokens will be burned.

:::

### _notifyTokenSender

```solidity
function _notifyTokenSender(
    address from,
    address to,
    uint256 amount,
    bytes memory data
) internal virtual
```

An attempt is made to notify the token sender about the `amount` tokens being sent by calling the **[universalReceiver(...)](./lsp0-erc725-account.md#universalreceiver)** function on the sender address if it exist.

#### Parameters:

|   Name   |   Type   | Description |
| :------- | :------- | :---------- |
| `from`   | address  | The sending address. |
| `to`     | address  | The receiving address. |
| `amount` | uint256  | The amount of token to transfer. |
| `data`   | bytes    | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses. |

### _notifyTokenReceiver

```solidity
function _notifyTokenReceiver(
    address from,
    address to,
    uint256 amount,
    bool force,
    bytes memory data
) internal virtual
```

An attempt is made to notify the token receiver about the `amount` tokens being received by calling the **[universalReceiver(...)](./lsp0-erc725-account.md#universalreceiver)** function on the receiver address if it exists.

#### Parameters:

|   Name   |   Type   | Description |
| :------- | :------- | :---------- |
| `from`   | address  | The sending address. |
| `to`     | address  | The receiving address. |
| `amount` | uint256  | The amount of token to transfer. |
| `force`  | bool     | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `memory` | bytes    | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses. |

### _updateOperator

```
function _updateOperator(
    address tokenOwner,
    address operator,
    uint256 amount
) internal virtual
```

Changes token `amount` the `operator` has access to from `tokenOwner` tokens. If the amount is zero then the operator is being revoked, otherwise the operator amount is being modified.

_Triggers the **[AuthorizedOperator](#authorizedoperator)** event if an address get authorized as an operator or **[RevokedOperator](#revokedoperator)** event if an address get revoked as an operator._

#### Parameters

|     Name     |   Type   | Description |
| :----------- | :------- | :---------- |
| `tokenOwner` | address | The address that is the owner of tokens. |
| `operator`   | address | The address to authorize as an operator. |
| `amount`     | uint256 | The amount of tokens operator has access to. |

:::note

#### Requirements

- `operator` cannot be the zero address.

:::

## Events

### Transfer

```solidity
event Transfer(
    address operator,
    address from,
    address to,
    uint256 amount,
    bool force,
    bytes data
)
```

_**MUST** be fired when the **[transfer](#transfer)** function gets executed successfuly._

#### Values:

| Name       | Type    | Description                                                                                                                           |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `operator` | address | The address of operator sending tokens.                                                                                               |
| `from`     | address | The address which tokens are sent.                                                                                                    |
| `to`       | address | The receiving address.                                                                                                                |
| `amount`   | uint256 | The amount of tokens transferred.                                                                                                     |
| `force`    | bool    | When set to TRUE, to may be any address; when set to FALSE to must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`     | bytes   | Additional data the caller wants included in the emitted event, and sent in the hooks to from and to addresses.                       |

### AuthorizedOperator

```solidity
event AuthorizedOperator(
    address operator,
    address tokenOwner,
    uint256 amount
)
```

_**MUST** be fired when the **[authorizeOperator](#authorizeoperator)** function gets successfully executed._

#### Values:

| Name         | Type    | Description                                                              |
| :----------- | :------ | :----------------------------------------------------------------------- |
| `operator`   | address | The address authorized as an operator.                                   |
| `tokenOwner` | address | The token owner.                                                         |
| `amount`     | uint256 | The amount of tokens `operator` address has access to from `tokenOwner`. |

### RevokedOperator

```solidity
event RevokedOperator(
    address operator,
    address tokenOwner
)
```

_**MUST** be fired when the **[revokeOperator](#revokeoperator)** function gets successfully executed._

#### Values:

| Name         | Type    | Description                         |
| :----------- | :------ | :---------------------------------- |
| `operator`   | address | The address revoked from operating. |
| `tokenOwner` | address | The token owner.                    |

## References

- [LUKSO Standards Proposals: LSP7 - Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)
- [LSP7 Digital Asset: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP7DigitalAsset)
