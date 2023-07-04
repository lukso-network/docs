---
title: LSP8IdentifiableDigitalAsset
sidebar_position: 10
---

# LSP8IdentifiableDigitalAsset

:::info Solidity contract

[`LSP8IdentifiableDigitalAsset.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol)

:::

:::note
_LSP8IdentifiableDigitalAsset contract also contains the methods from the [ERC165 Standard](https://eips.ethereum.org/EIPS/eip-165):_

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
    address newOwner_
) LSP4DigitalAssetMetadata(name_, symbol_, newOwner_)
```

Sets the **initial owner** of the token, and sets the following data keys on the [**ERC725Y Data Key-Value Store**](./lsp0-erc725-account#setdata):

- name: token's name.
- symbol: token's symbol.
- [**SupportedStandards:LSP4DigitalAsset**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#supportedstandardslsp4digitalasset) data key.

#### Parameters:

| Name        | Type      | Description                |
| :---------- | :-------- | :------------------------- |
| `name_`     | `string`  | The name of the token.     |
| `symbol_`   | `string`  | The symbol of the token.   |
| `newOwner_` | `address` | The owner of the contract. |

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

Returns the number of tokens owned by the `tokenOwner` address.

#### Parameters:

| Name         | Type      | Description           |
| :----------- | :-------- | :-------------------- |
| `tokenOwner` | `address` | The address to query. |

#### Return Values:

| Name    | Type      | Description                                 |
| :------ | :-------- | :------------------------------------------ |
| `value` | `uint256` | The number of tokens owned by this address. |

### tokenOwnerOf

```solidity
function tokenOwnerOf(bytes32 tokenId) public view returns (address tokenOwner)
```

Returns the `tokenOwner` address of the `tokenId`.

#### Parameters:

| Name      | Type      | Description         |
| :-------- | :-------- | :------------------ |
| `tokenId` | `bytes32` | The token to query. |

#### Return Values:

| Name         | Type      | Description      |
| :----------- | :-------- | :--------------- |
| `tokenOwner` | `address` | The token owner. |

:::note

#### Requirements:

- `tokenId` must exist.

:::

### tokenIdsOf

```solidity
function tokenIdsOf(address tokenOwner) public view returns (bytes32[] memory tokensId)
```

Returns the list of `tokenIds` for the `tokenOwner` address.

#### Parameters:

| Name         | Type      | Description           |
| :----------- | :-------- | :-------------------- |
| `tokenOwner` | `address` | The address to query. |

#### Return Values:

| Name       | Type        | Description                  |
| :--------- | :---------- | :--------------------------- |
| `tokensId` | `bytes32[]` | The list of owned token ids. |

### authorizeOperator

```solidity
function authorizeOperator(
    address operator,
    bytes32 tokenId
) public
```

Sets the `operator` address as an operator of a particular `tokenId`.

_Triggers the **[AuthorizedOperator](#authorizedoperator)** event when an address gets authorized as an operator._

#### Parameters:

| Name       | Type      | Description                              |
| :--------- | :-------- | :--------------------------------------- |
| `operator` | `address` | The address to authorize as an operator. |
| `tokenId`  | `bytes32` | The token to enable operator status to.  |

:::note

#### Requirements:

- `tokenId` must exist.
- Caller must be current `tokenOwner` of `tokenId`.
- `operator` cannot be calling address.
- `operator` cannot be the zero address.

:::

### revokeOperator

```solidity
function revokeOperator(
    address operator
    bytes32 tokenId
) public
```

Removes the `operator` address as an operator of a particular `tokenId`.

_Triggers the **[RevokedOperator](#revokedoperator)** event when an address gets revoked as an operator._

#### Parameters:

| Name       | Type      | Description                              |
| :--------- | :-------- | :--------------------------------------- |
| `operator` | `address` | The address to revoke as an operator.    |
| `tokenId`  | `bytes32` | The token to disable operator status to. |

:::note

#### Requirements:

- `tokenId` must exist.
- Caller must be current `tokenOwner` of `tokenId`.
- `operator` cannot be calling address.
- `operator` cannot be the zero address.

:::

### isOperatorFor

:::info
The tokenOwner is its own operator.
:::

```solidity
function isOperatorFor(
    address operator,
    bytes32 tokenId
) public view returns (bool result)
```

Returns whether the `operator` address is an operator of the `tokenId`. Operators can send and burn tokens on behalf of their owners.

#### Parameters:

| Name       | Type      | Description                               |
| :--------- | :-------- | :---------------------------------------- |
| `operator` | `address` | The address to query operator status for. |
| `tokenId`  | `bytes32` | The token to query.                       |

#### Return Values:

| Name     | Type   | Description                                                           |
| :------- | :----- | :-------------------------------------------------------------------- |
| `result` | `bool` | `true` if `operator` is an operator for `tokenId`, `false` otherwise. |

:::note

#### Requirements:

- `tokenId` must exist.
- Caller must be current `tokenOwner` of `tokenId`.

:::

### getOperatorsOf

```solidity
function getOperatorsOf(bytes32 tokenId) public view returns (address[] memory operators)
```

Returns all `operator` addresses of a particular `tokenId`.

#### Parameters:

| Name      | Type      | Description         |
| :-------- | :-------- | :------------------ |
| `tokenId` | `bytes32` | The token to query. |

#### Return Values:

| Name        | Type        | Description            |
| :---------- | :---------- | :--------------------- |
| `operators` | `address[]` | The list of operators. |

:::note

#### Requirements:

- `tokenId` must exist.

:::

### transfer

```solidity
function transfer(
    address from,
    address to,
    bytes32 tokenId,
    bool allowNonLSP1Recipient,
    bytes memory data
) public
```

Transfers the token with a particular `tokenId` from the `from` address to the `to` address. The `allowNonLSP1Recipient` parameter **MUST** be set to TRUE when transferring tokens to Externally Owned Accounts (EOAs) or contracts that do not implement the [LSP1 - Universal Receiver Delegate](../generic-standards/lsp1-universal-receiver.md) standard.

_Triggers the **[Transfer](#transfer-2)** event when the token gets successfully transferred._

#### Parameters:

| Name                    | Type      | Description                                                                                                                               |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address` | The sender address.                                                                                                                       |
| `to`                    | `address` | The recipient address.                                                                                                                    |
| `tokenId`               | `bytes32` | The token to transfer.                                                                                                                    |
| `allowNonLSP1Recipient` | `bool`    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`                  | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

:::note

#### Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `from` and `to` cannot be the same address.
- `tokenId` token must be owned by from.
- If the caller is not `from`, it must be an operator of `tokenId`.

:::

### transferBatch

```solidity
function transferBatch(
    address[] from,
    address[] to,
    bytes32[] tokenId,
    bool[] allowNonLSP1Recipient,
    bytes[] memory data
) public
```

Transfers multiple tokens based on the `from`, `to`, and `tokenId` arrays. If any transfer fails, the whole call will revert.

_Triggers the **[Transfer](#transfer-2)** event when the tokens get successfully transferred._

#### Parameters:

| Name                    | Type        | Description                                                                                                                               |
| :---------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address[]` | The list of sender addresses.                                                                                                             |
| `to`                    | `address[]` | The list of recipient addresses.                                                                                                          |
| `tokenId`               | `bytes32[]` | The list of tokenIds to transfer.                                                                                                         |
| `allowNonLSP1Recipient` | `bool[]`    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`                  | `bytes[]`   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

:::note

#### Requirements:

- `from`, `to`, `tokenId` lists are the same length.
- No values in `from` can be the zero address.
- No values in `to` can be the zero address.
- `from` and `to` cannot be the same address at the same index of each lists.
- Each `tokenId` token must be owned by `from`.
- If the caller is not `from`, it must be an operator of each `tokenId`.

:::

## Internal Functions

These internal functions can be extended via `override` to add some custom logic.

### \_mint

```solidity
function _mint(
    address to,
    bytes32 tokenId,
    bool allowNonLSP1Recipient,
    bytes memory data
) internal virtual
```

Mints `tokenId` and transfers it to `to`.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

| Name                    | Type      | Description                                                                                                                               |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `to`                    | `address` | The recipient address.                                                                                                                    |
| `tokenId`               | `bytes32` | The token to transfer.                                                                                                                    |
| `allowNonLSP1Recipient` | `bool`    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `memory`                | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hook to `to` address.                                     |

:::note

#### Requirements:

- `tokenId` must not exist.
- `to` cannot be the zero address.

:::

### \_transfer

```solidity
function _transfer(
    address from,
    address to,
    bytes32 tokenId,
    bool allowNonLSP1Recipient,
    bytes memory data
) internal virtual
```

Transfers `tokenId` from `from` to `to`.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

| Name                    | Type      | Description                                                                                                                               |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address` | The sender address.                                                                                                                       |
| `to`                    | `address` | The recipient address.                                                                                                                    |
| `tokenId`               | `bytes32` | The token to transfer.                                                                                                                    |
| `allowNonLSP1Recipient` | `bool`    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `memory`                | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

:::note

#### Requirements:

- `to` cannot be the zero address.
- `tokenId` token must be owned by `from`.

:::

### \_burn

```solidity
function _burn(
    address from,
    bytes32 tokenId,
    bytes memory data
) internal virtual
```

Burns `tokenId` and clear the operators authorized for the `tokenId`.

_Triggers the **[Transfer](#transfer-2)** event when tokens get successfully transferred._

#### Parameters:

| Name      | Type      | Description                                                                                             |
| :-------- | :-------- | :------------------------------------------------------------------------------------------------------ |
| `from`    | `address` | The sender address.                                                                                     |
| `tokenId` | `bytes32` | The token to burn.                                                                                      |
| `data`    | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hook to `from` address. |

:::note

#### Requirements:

- `from` cannot be the zero address.
- `tokenId` must exist.

:::

### \_beforeTokenTransfer

```solidity
function _beforeTokenTransfer(
    address from,
    address to,
    bytes32 tokenId
) internal virtual
```

Hook that is called before any token transfer, including minting and burning.

#### Parameters:

| Name      | Type      | Description            |
| :-------- | :-------- | :--------------------- |
| `from`    | `address` | The sender address.    |
| `to`      | `address` | The recipient address. |
| `tokenId` | `bytes32` | The token to transfer. |

### \_notifyTokenSender

```solidity
function _notifyTokenSender(
    address from,
    address to,
    bytes32 tokenId,
    bytes memory data
) internal virtual
```

An attempt is made to notify the token receiver about the `tokenId` token being received by calling the **[universalReceiver(...)](./lsp0-erc725-account.md#universalreceiver)** function on the receiver address if it exists.

#### Parameters:

| Name      | Type      | Description                                                                                                         |
| :-------- | :-------- | :------------------------------------------------------------------------------------------------------------------ |
| `from`    | `address` | The sender address.                                                                                                 |
| `to`      | `address` | The recipient address.                                                                                              |
| `tokenId` | `bytes32` | The token to transfer.                                                                                              |
| `data`    | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses. |

### \_notifyTokenReceiver

```solidity
function _notifyTokenReceiver(
    address from,
    address to,
    bytes32 tokenId,
    bool allowNonLSP1Recipient,
    bytes memory data
) internal virtual
```

An attempt is made to notify the token receiver about the `tokenId` token being received by calling the **[universalReceiver(...)](./lsp0-erc725-account.md#universalreceiver)** function on the receiver address if it exists.

#### Parameters:

| Name                    | Type      | Description                                                                                                                               |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                  | `address` | The sender address.                                                                                                                       |
| `to`                    | `address` | The recipient address.                                                                                                                    |
| `tokenId`               | `bytes32` | The token to transfer.                                                                                                                    |
| `allowNonLSP1Recipient` | `bool`    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `memory`                | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

### \_revokeOperator

```solidity
function _revokeOperator(
    address operator,
    address tokenOwner,
    bytes32 tokenId
) internal virtual
```

Revoke the `operator` of the `tokenId` token which belongs to `tokenOwner`.

#### Parameters:

| Name         | Type      | Description                               |
| :----------- | :-------- | :---------------------------------------- |
| `operator`   | `address` | The address of the operator to revoke.    |
| `tokenOwner` | `address` | The address that is the owner of tokenId. |
| `tokenId`    | `bytes32` | The token to disable operator status to.  |

### \_clearOperators

```solidity
function clearOperators(
    address tokenOwner,
    bytes32 tokenId
) internal virtual
```

Revoke the all current operators of the `tokenId` token which belongs to `tokenOwner`.

#### Parameters

| Name         | Type      | Description                               |
| :----------- | :-------- | :---------------------------------------- |
| `tokenOwner` | `address` | The address that is the owner of tokenId. |
| `tokenId`    | `bytes32` | The token to disable operator status to.  |

## Events

### Transfer

```solidity
event Transfer(
    address operator,
    address from,
    address to,
    bytes32 tokenId,
    bool allowNonLSP1Recipient,
    bytes data
)
```

_Fired when the **[transfer](#transfer)** function gets executed successfuly._

#### Values:

| Name                    | Type      | Description                                                                                                             |
| :---------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------- |
| `operator`              | `address` | The address of operator sending tokens.                                                                                 |
| `from`                  | `address` | The address which tokens are sent.                                                                                      |
| `to`                    | `address` | The recipient address.                                                                                                  |
| `tokenId`               | `bytes32` | The token to transfer.                                                                                                  |
| `allowNonLSP1Recipient` | `bool`    | When set to `true`, may be any address; When set to `false`, address must be a contract supporting LSP1 and not revert. |
| `data`                  | `bytes`   | Additional data the caller wants included in the emitted event, and sent in the hooks to from and to addresses.         |

### AuthorizedOperator

```solidity
event AuthorizedOperator(
    address operator,
    address tokenOwner,
    bytes32 tokenId
)
```

_Fired when the **[authorizeOperator](#authorizeoperator)** function gets successfully executed._

#### Values:

| Name         | Type      | Description                                                        |
| :----------- | :-------- | :----------------------------------------------------------------- |
| `operator`   | `address` | The address authorized as an operator.                             |
| `tokenOwner` | `address` | The token owner.                                                   |
| `tokenId`    | `bytes32` | The token that `operator` address has access to from `tokenOwner`. |

### RevokedOperator

```solidity
event RevokedOperator(
    address operator,
    address tokenOwner,
    bytes32 tokenId
)
```

_Fired when the **[revokeOperator](#revokeoperator)** function gets successfully executed._

#### Values:

| Name         | Type      | Description                               |
| :----------- | :-------- | :---------------------------------------- |
| `operator`   | `address` | The address authorized as an operator.    |
| `tokenOwner` | `address` | The token owner.                          |
| `tokenId`    | `bytes32` | The token revoked from `operator` access. |

## References

- [LUKSO Standards Proposals: LSP8 - Identifiable Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)
- [LSP8 Identifiable Digital Asset: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP8IdentifiableDigitalAsset)
