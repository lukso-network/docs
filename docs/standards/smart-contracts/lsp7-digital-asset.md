---
title: LSP7DigitalAsset
sidebar_position: 9
---

# LSP7DigitalAsset

:::info Solidity contract

[`LSP7DigitalAsset.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol)

:::

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

| Name              | Type      | Description                                                            |
| :---------------- | :-------- | :--------------------------------------------------------------------- |
| `name_`           | `string`  | The name of the token.                                                 |
| `symbol_`         | `string`  | The symbol of the token.                                               |
| `newOwner_`       | `address` | The owner of the contract.                                             |
| `isNonDivisible_` | `bool`    | Specify if the contract represents a fungible or a non-fungible token. |

### decimals

:::info
If the contract represents a **NFT** then **0** SHOULD be used, otherwise **18** is the common value.
:::

```solidity
  function decimals() public view returns (uint256 value)
```

Returns the number of decimals used to get its user representation.

#### Return Values:

| Name    | Type      | Description                          |
| :------ | :-------- | :----------------------------------- |
| `value` | `uint256` | The number of decimals of the token. |

### totalSupply

```solidity
function totalSupply() public view returns (uint256 value)
```

Returns the number of existing tokens of this contract.

#### Return Values:

| Name    | Type      | Description                    |
| :------ | :-------- | :----------------------------- |
| `value` | `uint256` | The number of existing tokens. |

### balanceOf

```solidity
function balanceOf(address tokenOwner) public view returns (uint256 value)
```

Returns the number of existing tokens of the contract owned by the `tokenOwner` address.

#### Parameters:

| Name         | Type      | Description           |
| :----------- | :-------- | :-------------------- |
| `tokenOwner` | `address` | The address to query. |

#### Return Values:

| Name    | Type      | Description                                 |
| :------ | :-------- | :------------------------------------------ |
| `value` | `uint256` | The number of tokens owned by this address. |

### authorizeOperator

```solidity
function authorizeOperator(address operator, uint256 amount) public
```

Sets the `amount` of tokens to which the `operator` has access from the caller's tokens.

To increase or decrease the authorized amount of an operator, it's advised to call [`revokeOperator(..)`](#revokeoperator) function first, and then re-call [`authorizeOperator(..)`](#authorizeoperator) with the new amount to authorize, to avoid front-running and Allowance Double-Spend Exploit.
Check more information in this [document](https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/).

_Triggers the **[AuthorizedOperator](#authorizedoperator)** event when an address get authorized as an operator._

#### Parameters:

| Name       | Type      | Description                                  |
| :--------- | :-------- | :------------------------------------------- |
| `operator` | `address` | The address to authorize as an operator.     |
| `amount`   | `uint256` | The amount of tokens operator has access to. |

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

| Name       | Type      | Description                           |
| :--------- | :-------- | :------------------------------------ |
| `operator` | `address` | The address to revoke as an operator. |

:::note

#### Requirements:

- `operator` cannot be calling address.
- `operator` cannot be the zero address.

:::

### increaseAllowance

:::info
This is a non-standard function, not part of the `ILSP7DigitalAsset` interface. It exists to be used as a prevention mechanism against the double spending allowance vulnerability.
:::

```solidity
function increaseAllowance(address operator, uint256 addedAmount) external;
```

Increase the allowance of `operator` by +`addedAmount`

Atomically increases the allowance granted to `operator` by the caller.

This is an alternative approach to [`authorizeOperator`](#authorizedoperator) that can be used as a mitigation for the double spending allowance problem.

> **Requirements:**
>
> - `operator` cannot be the same address as `msg.sender`
> - `operator` cannot be the zero address.

> **Events Emitted**
>
> - `AuthorizedOperator` event indicating the updated allowance.

#### Parameters

| Name          | Type      | Description                                                                 |
| ------------- | --------- | --------------------------------------------------------------------------- |
| `operator`    | `address` | the operator to increase the allowance for `msg.sender`                     |
| `addedAmount` | `uint256` | the additional amount to add on top of the current operator&#39;s allowance |

### decreaseAllowance

:::info
This is a non-standard function, not part of the `ILSP7DigitalAsset` interface. It exists to be used as a prevention mechanism against the double spending allowance vulnerability.
:::

```solidity
function decreaseAllowance(address operator, uint256 substractedAmount) external;
```

Decrease the allowance of `operator` by -`substractedAmount`

Atomically decreases the allowance granted to `operator` by the caller.

This is an alternative approach to [`authorizeOperator(...)`](#authorizedoperator) that can be used as a mitigation for the double spending allowance problem

> **Requirements:**
>
> - `operator` cannot be the zero address.
> - `operator` must have allowance for the caller of at least `substractedAmount`.

> **Events Emitted**:
>
> - `AuthorizedOperator` event indicating the updated allowance after decreasing it.
> - `RevokeOperator` event if `substractedAmount` is the full allowance, indicating `operator` does not have any allowance left for `msg.sender`.

#### Parameters

| Name                | Type      | Description                                                |
| ------------------- | --------- | ---------------------------------------------------------- |
| `operator`          | `address` | the operator to decrease allowance for `msg.sender`        |
| `substractedAmount` | `uint256` | the amount to decrease by in the operator&#39;s allowance. |

### authorizedAmountFor

:::info
The tokenOwner is its own operator.
:::

```solidity
function authorizedAmountFor(
    address tokenOwner,
    address operator
) public view returns (uint256 amount)
```

Returns the amount of tokens to which the `operator` address has access from the `tokenOwner` contract. Operators can send and burn tokens on behalf of their owners.

#### Parameters:

| Name         | Type      | Description                               |
| :----------- | :-------- | :---------------------------------------- |
| `tokenOwner` | `address` | The token owner.                          |
| `operator`   | `address` | The address to query operator status for. |

#### Return Values:

| Name     | Type      | Description                                                              |
| :------- | :-------- | :----------------------------------------------------------------------- |
| `amount` | `uint256` | The amount of tokens `operator` address has access to from `tokenOwner`. |

### transfer

```solidity
function transfer(
    address from,
    address to,
    uint256 amount,
    bool allowNonLSP1Recipient,
    bytes memory data
) public
```

Transfers an `amount` of tokens from the `from` address to the `to` address. The `allowNonLSP1Recipient` parameter **MUST** be set to TRUE when transferring tokens to Externally Owned Accounts (EOAs) or if contracts do not implement the [LSP1-UniversalReceiverDelegate Standard](../generic-standards/lsp1-universal-receiver.md).

Will notify the token sender and receiver by calling the `universalReceiver(...)` function on the `from` and `to` address.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

| Name                    | Type      | Description                                                                                                                               |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address` | The sender address.                                                                                                                       |
| `to`                    | `address` | The recipient address.                                                                                                                    |
| `amount`                | `uint256` | The amount of token to transfer.                                                                                                          |
| `allowNonLSP1Recipient` | `bool`    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`                  | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

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
    bool[] allowNonLSP1Recipient,
    bytes[] memory data
) public
```

Transfers multiple tokens based on the `from`, `to`, and `amount` arrays. If any transfer fails, the whole call will revert.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

| Name                    | Type        | Description                                                                                                                               |
| :---------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address[]` | The list of sender addresses.                                                                                                             |
| `to`                    | `address[]` | The list of recipient addresses.                                                                                                          |
| `amount`                | `uint256[]` | The amount of tokens to transfer.                                                                                                         |
| `allowNonLSP1Recipient` | `bool[]`    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`                  | `bytes[]`   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

:::note

#### Requirements:

- `from`, `to`, `amount` lists are the same length.
- No values in `from` can be the zero address.
- No values in `to` can be the zero address.
- Each `amount` tokens must be owned by `from`.
- If the caller is not `from`, it must be an operator for `from` with access to at least `amount` tokens.

:::

## Internal Functions

These internal functions can be extended via `override` to add some custom logic.

### \_mint

```solidity
function _mint(
    address to,
    uint256 amount,
    bool allowNonLSP1Recipient,
    bytes memory data
) internal virtual
```

Mints `amount` tokens and transfers it to `to`.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

| Name                    | Type      | Description                                                                                                                               |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `to`                    | `address` | The recipient address.                                                                                                                    |
| `amount`                | `uint256` | The amount of token to mint.                                                                                                              |
| `allowNonLSP1Recipient` | `bool`    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `memory`                | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hook to `to` address.                                     |

:::note

#### Requirements:

- `to` cannot be the zero address.

:::

### \_transfer

```solidity
function _transfer(
    address from,
    address to,
    uint256 amount,
    bool allowNonLSP1Recipient,
    bytes memory data
) internal virtual
```

Transfers `amount` tokens from `from` to `to`.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

| Name                    | Type      | Description                                                                                                                               |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address` | The sender address.                                                                                                                       |
| `to`                    | `address` | The recipient address.                                                                                                                    |
| `amount`                | `uint256` | The amount of token to transfer.                                                                                                          |
| `allowNonLSP1Recipient` | `bool`    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `memory`                | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

:::note

#### Requirements:

- `to` cannot be the zero address.
- `from` cannot be the zero address.
- `from` must have at least `amount` tokens.
- If the caller is not `from`, it must be an operator for `from` with access to at least `amount` tokens.

:::

### \_burn

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

| Name     | Type      | Description                                                                                             |
| :------- | :-------- | :------------------------------------------------------------------------------------------------------ |
| `from`   | `address` | The sender address.                                                                                     |
| `amount` | `uint256` | The amount of token to burn.                                                                            |
| `data`   | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hook to `from` address. |

:::note

#### Requirements:

- `from` cannot be the zero address.
- `from` must have at least `amount` tokens.
- If the caller is not `from`, it must be an operator for `from` with access to at least `amount` tokens.

:::

### \_beforeTokenTransfer

```solidity
function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
) internal virtual
```

Hook that is called before any token transfer. This includes minting and burning.

#### Parameters:

| Name     | Type      | Description                      |
| :------- | :-------- | :------------------------------- |
| `from`   | `address` | The sender address.              |
| `to`     | `address` | The recipient address.           |
| `amount` | `uint256` | The amount of token to transfer. |

:::note

#### Requirements:

- When `from` and `to` are both non-zero, `from`'s `amount` tokens will betransferred to `to`.
- When `from` is zero, `amount` tokens will be minted for `to`.
- When `to` is zero, `from`'s `amount` tokens will be burned.

:::

### \_notifyTokenSender

```solidity
function _notifyTokenSender(
    address from,
    address to,
    uint256 amount,
    bytes memory data
) internal virtual
```

An attempt is made to notify the token sender about the `amount` of tokens being sent by calling the **[universalReceiver(...)](./lsp0-erc725-account.md#universalreceiver)** function on the sender address if it exists.

#### Parameters:

| Name     | Type      | Description                                                                                                         |
| :------- | :-------- | :------------------------------------------------------------------------------------------------------------------ |
| `from`   | `address` | The sender address.                                                                                                 |
| `to`     | `address` | The recipient address.                                                                                              |
| `amount` | `uint256` | The amount of token to transfer.                                                                                    |
| `data`   | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses. |

### \_notifyTokenReceiver

```solidity
function _notifyTokenReceiver(
    address from,
    address to,
    uint256 amount,
    bool allowNonLSP1Recipient,
    bytes memory data
) internal virtual
```

An attempt is made to notify the token receiver about the `amount` of tokens being received by calling the **[universalReceiver(...)](./lsp0-erc725-account.md#universalreceiver)** function on the receiver address if it exists.

#### Parameters:

| Name                    | Type      | Description                                                                                                                               |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address` | The sender address.                                                                                                                       |
| `to`                    | `address` | The recipient address.                                                                                                                    |
| `amount`                | `uint256` | The amount of token to transfer.                                                                                                          |
| `allowNonLSP1Recipient` | `bool`    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `memory`                | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

### \_updateOperator

```
function _updateOperator(
    address tokenOwner,
    address operator,
    uint256 amount
) internal virtual
```

Changes token `amount` the `operator` has access to from `tokenOwner` tokens. Setting the `amount` to zero is equivalent to revoking the operator.

_Triggers the **[AuthorizedOperator](#authorizedoperator)** event if an address gets authorized as an operator or **[RevokedOperator](#revokedoperator)** event if an address gets revoked as an operator._

#### Parameters

| Name         | Type      | Description                                  |
| :----------- | :-------- | :------------------------------------------- |
| `tokenOwner` | `address` | The address that is the owner of tokens.     |
| `operator`   | `address` | The address to authorize as an operator.     |
| `amount`     | `uint256` | The amount of tokens operator has access to. |

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
    bool allowNonLSP1Recipient,
    bytes data
)
```

_Fired when the **[transfer](#transfer)** function gets executed successfuly._

#### Values:

| Name                    | Type      | Description                                                                                                                           |
| :---------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `operator`              | `address` | The address of operator sending tokens.                                                                                               |
| `from`                  | `address` | The address which tokens are sent.                                                                                                    |
| `to`                    | `address` | The recipient address.                                                                                                                |
| `amount`                | `uint256` | The amount of tokens transferred.                                                                                                     |
| `allowNonLSP1Recipient` | `bool`    | When set to TRUE, to may be any address; when set to FALSE to must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`                  | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hooks to from and to addresses.                       |

### AuthorizedOperator

```solidity
event AuthorizedOperator(
    address operator,
    address tokenOwner,
    uint256 amount
)
```

_Fired when the **[authorizeOperator](#authorizeoperator)** function gets successfully executed._

#### Values:

| Name         | Type      | Description                                                              |
| :----------- | :-------- | :----------------------------------------------------------------------- |
| `operator`   | `address` | The address authorized as an operator.                                   |
| `tokenOwner` | `address` | The token owner.                                                         |
| `amount`     | `uint256` | The amount of tokens `operator` address has access to from `tokenOwner`. |

### RevokedOperator

```solidity
event RevokedOperator(
    address operator,
    address tokenOwner
)
```

_Fired when the **[revokeOperator](#revokeoperator)** function gets successfully executed._

#### Values:

| Name         | Type      | Description                         |
| :----------- | :-------- | :---------------------------------- |
| `operator`   | `address` | The address revoked from operating. |
| `tokenOwner` | `address` | The token owner.                    |

## References

- [LUKSO Standards Proposals: LSP7 - Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)
- [LSP7 Digital Asset: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP7DigitalAsset)
