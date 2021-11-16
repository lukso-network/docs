---
title: LSP8 Identifiable Digital Asset
sidebar_position: 6
---

# LSP8 Identifiable Digital Asset

The **IdentifiableDigitalAsset** contract represents identifiable digital assets, where tokens to be uniquely traded and given metadata using **[ERC725Y Standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y)**.
Tokens are identified with a tokenId, based on **[ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)**.

A **bytes32** value is used for tokenId to allow many uses of token identification including numbers, contract addresses, and hashed values (ie. serial numbers).

:::note
**_IdentifiableDigitalAsset implementation also contains the methods from [ERC165](https://eips.ethereum.org/EIPS/eip-165) and [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) contract to attach metadata to the asset. _**
:::

## Functions

### totalSupply

```solidity
  function totalSupply() public view returns (uint256 value)
```

Returns the number of existing tokens.

#### Return Values:

| Name    | Type    | Description                    |
| :------ | :------ | :----------------------------- |
| `value` | uint256 | The number of existing tokens. |

### balanceOf

```solidity
  function balanceOf(
    address tokenOwner
  ) public view returns (uint256 value)
```

Returns the number of tokens owned by `tokenOwner`.

#### Parameters:

| Name         | Type    | Description           |
| :----------- | :------ | :-------------------- |
| `tokenOwner` | address | The address to query. |

#### Return Values:

| Name    | Type    | Description                                 |
| :------ | :------ | :------------------------------------------ |
| `value` | uint256 | the number of tokens owned by this address. |

### tokenOwnerOf

```solidity
  function tokenOwnerOf(
    bytes32 tokenId
  ) public view returns (address tokenOwner)
```

Returns the `tokenOwner` address of the `tokenId` token.

#### Parameters:

| Name      | Type    | Description         |
| :-------- | :------ | :------------------ |
| `tokenId` | bytes32 | The token to query. |

#### Return Values:

| Name         | Type    | Description      |
| :----------- | :------ | :--------------- |
| `tokenOwner` | address | The token owner. |

:::note

#### Requirements:

- `tokenId` must exist.

:::

### tokenIdsOf

```solidity
  function tokenIdsOf(
    address tokenOwner
  ) public view returns (bytes32[] memory tokensId)
```

Returns the list of `tokenIds` for the `tokenOwner` address.

#### Parameters:

| Name         | Type    | Description           |
| :----------- | :------ | :-------------------- |
| `tokenOwner` | address | The address to query. |

#### Return Values:

| Name       | Type       | Description                  |
| :--------- | :--------- | :--------------------------- |
| `tokensId` | bytes32[ ] | The list of owned token ids. |

### authorizeOperator

```solidity
  function authorizeOperator(
    address operator,
    bytes32 tokenId
  ) public
```

Makes `operator` address an operator of `tokenId`.

_Triggers the **[AuthorizedOperator](#authorizedoperator)** event when an address get authorized as an operator_

#### Parameters:

| Name       | Type    | Description                              |
| :--------- | :------ | :--------------------------------------- |
| `operator` | address | The address to authorize as an operator. |
| `tokenId`  | bytes32 | The token to enable operator status to.  |

:::note

#### Requirements:

- `tokenId` must exist
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

Removes `operator` address as an operator of `tokenId`.

_Triggers the **[RevokedOperator](#revokedoperator)** event when an address get revoked as an operator_

#### Parameters:

| Name       | Type    | Description                              |
| :--------- | :------ | :--------------------------------------- |
| `operator` | address | The address to revoke as an operator.    |
| `tokenId`  | bytes32 | The token to disable operator status to. |

:::note

#### Requirements:

- `tokenId` must exist
- Caller must be current `tokenOwner` of `tokenId`.
- `operator` cannot be calling address.
- `operator` cannot be the zero address.

:::

### isOperatorFor

```solidity
  function isOperatorFor(
    address operator,
    bytes32 tokenId
  ) public view returns (bool result)
```

Returns whether `operator` address is an operator of `tokenId`. Operators can send and burn tokens on behalf of their owners. The tokenOwner is their own operator.

#### Parameters:

| Name       | Type    | Description                               |
| :--------- | :------ | :---------------------------------------- |
| `operator` | address | The address to query operator status for. |
| `tokenId`  | bytes32 | The token to query.                       |

#### Return Values:

| Name     | Type | Description                                                               |
| :------- | :--- | :------------------------------------------------------------------------ |
| `result` | bool | TRUE if `operator` address is an operator for `tokenId`, false otherwise. |

:::note

#### Requirements:

- `tokenId` must exist
- Caller must be current `tokenOwner` of `tokenId`.

:::

### getOperatorsOf

```solidity
  function getOperatorsOf(
    bytes32 tokenId
  ) public view returns (address[] memory operators)
```

Returns all `operator` addresses of `tokenId`.

#### Parameters:

| Name      | Type    | Description         |
| :-------- | :------ | :------------------ |
| `tokenId` | bytes32 | The token to query. |

#### Return Values:

| Name        | Type       | Description            |
| :---------- | :--------- | :--------------------- |
| `operators` | address[ ] | The list of operators. |

:::note

#### Requirements:

- `tokenId` must exist

:::

### transfer

```solidity
  function transfer(
    address from,
    address to,
    bytes32 tokenId,
    bool force,
    bytes memory data
  ) public
```

Transfers `tokenId` token from `from` to `to`. The `force` parameter will be used when notifying the token sender and receiver.

_Triggers the **[Transfer](#trasnfer-2)** event when token get transferred successfully._

#### Parameters:

| Name      | Type    | Description                                                                                                                               |
| :-------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`    | address | The sending address.                                                                                                                      |
| `to`      | address | The receiving address.                                                                                                                    |
| `tokenId` | uint256 | The token to transfer.                                                                                                                    |
| `force`   | bool    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`    | bytes   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

:::note

#### Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `tokenId` token must be owned by from.
- If the caller is not `from`, it must be an operator of `tokenId`.

:::

### transferBatch

```solidity
  function transferBatch(
    address[] from,
    address[] to,
    bytes32[] tokenId,
    bool[] force,
    bytes[] memory data
  ) public
```

Transfers many tokens based on the list `from`, `to`, `amount`. If any transfer fails, the call will revert.

_Triggers the **[Transfer](#trasnfer-2)** event when tokens get transferred successfully._

#### Parameters:

| Name      | Type      | Description                                                                                                                               |
| :-------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`    | address[] | The list of sending addresses.                                                                                                            |
| `to`      | address[] | The list of receiving addresses.                                                                                                          |
| `tokenId` | bytes32[] | The amount of tokens to transfer.                                                                                                         |
| `force`   | bool[]    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`    | bytes[]   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

:::note

#### Requirements:

- `from`, `to`, `tokenId` lists are the same length.
- No values in `from` can be the zero address.
- No values in `to` can be the zero address.
- Each `tokenId` token must be owned by `from`.
- If the caller is not `from`, it must be an operator of each `tokenId`.

:::

## Events

### Transfer

```solidity
  event Transfer(
    address operator,
    address from,
    address to,
    bytes32 tokenId,
    bool force,
    bytes data
  )
```

_**MUST** be fired when **[transfer](#transfer)** get executed successfuly._

#### Values:

| Name       | Type    | Description                                                                                                                           |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `operator` | address | The address of operator sending tokens.                                                                                               |
| `from`     | address | The address which tokens are sent.                                                                                                    |
| `to`       | address | The receiving address.                                                                                                                |
| `tokenId`  | bytes32 | The token to transfer.                                                                                                                |
| `force`    | bool    | When set to TRUE, to may be any address; when set to FALSE to must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`     | bytes   | Additional data the caller wants included in the emitted event, and sent in the hooks to from and to addresses.                       |

### AuthorizedOperator

```solidity
  event AuthorizedOperator(
    address operator,
    address tokenOwner,
    bytes32 tokenId
  )
```

_**MUST** be fired when **[authorizeOperator](#authorizeoperator)** get executed successfully._

#### Values:

| Name         | Type    | Description                                                        |
| :----------- | :------ | :----------------------------------------------------------------- |
| `operator`   | address | The address authorized as an operator.                             |
| `tokenOwner` | address | The token owner.                                                   |
| `tokenId`    | bytes32 | The token that `operator` address has access to from `tokenOwner`. |

### RevokedOperator

```solidity
  event RevokedOperator(
    address operator,
    address tokenOwner,
    bytes32 tokenId
  )
```

_**MUST** be fired when **[revokeOperator](#revokeoperator)** get executed successfully._

#### Values:

| Name         | Type    | Description                               |
| :----------- | :------ | :---------------------------------------- |
| `operator`   | address | The address authorized as an operator.    |
| `tokenOwner` | address | The token owner.                          |
| `tokenId`    | bytes32 | The token revoked from `operator` access. |
