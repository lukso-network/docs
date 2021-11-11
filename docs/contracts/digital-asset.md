---
title: LSP7-Digital Asset
sidebar_position: 5
---

# LSP7-Digital Asset

The **DigitalAsset** contract represents digital assets, for either fungible or non-fungible tokens where minting and transfering is specified with an amount of tokens. It have some functions from **[ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)** and **[ERC777](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC777/ERC777.sol)** with more upgraded features.

This contract serve as a **Fungible Token Contract** when  `isNFT`  bool is marked as **FALSE** in the constructor, and serve as **Non-Fungible Token Contract** otherwise. 

:::note
**_DigitalAsset implementation contains the methods from [ERC165](https://eips.ethereum.org/EIPS/eip-165) and [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) contract to attach metadata to the asset._**
:::

## Functions


### decimals

```solidity
  function decimals() public view returns (uint256 value); 
```

Returns the number of decimals used to get its user representation.

If the contract represents a **NFT** then `0`  **SHOULD** be used, otherwise `18` is the common value.


#### Return Values:

| Name    | Type      | Description                         |
| :-------| :-------- | :---------------------------------  |
| `value` |  uint256  | The number of decimals of the token.|


### totalSupply

```solidity
  function totalSupply() public view returns (uint256 value); 
```

Returns the number of existing tokens.


#### Return Values:

| Name    | Type      | Description                    |
| :-------| :-------- | :----------------------------  |
| `value` |  uint256  | The number of existing assets. |



### balanceOf

```solidity
  function balanceOf(
    address tokenOwner
  ) public view returns (uint256 value);
```

Returns the number of tokens owned by `tokenOwner`.


#### Parameters:

| Name         | Type    | Description           |
| :----------- | :------ | :-------------------- |
| `tokenOwner` | address | The address to query. |


#### Return Values:

| Name    | Type      | Description                                 |
| :-------| :-------- | :-----------------------------------------  |
| `value` |  uint256  | The number of assets owned by this address. |


### authorizeOperator

```solidity
  function authorizeOperator(
    address operator,
    uint256 amount
  ) public ;
```

Sets `amount` as the amount of tokens `operator` address has access to from callers tokens.

*Triggers the **[AuthorizedOperator](#authorizedoperator)** event when an address get authorized as an operator*



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
  function revokeOperator(
    address operator
  ) public ;
```

Removes `operator` address as an operator of callers tokens.

*Triggers the **[RevokedOperator](#revokedoperator)** event when an address get revoked as an operator*


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
  ) public view returns (uint256 amount);
```

Returns amount of tokens `operator` address has access to from `tokenOwner`. Operators can send and burn tokens on behalf of their owners. The tokenOwner is their own operator.

#### Parameters:

| Name         | Type    | Description                               |
| :----------- | :------ | :---------------------------------------- |
| `tokenOwner` | address | The token owner.                          |
| `tokenOwner` | address | The address to query operator status for. |


#### Return Values:

| Name     | Type      | Description                                                              |
| :------- | :-------- | :----------------------------------------------------------------------- |
| `amount` |  uint256  | The amount of tokens `operator` address has access to from `tokenOwner`. |


### transfer

```solidity
  function transfer(
    address from,
    address to,
    uint256 amount,
    bool force,
    bytes memory data
  ) public ;
```

Transfers amount of tokens from `from` to `to`. The `force` parameter will be used when notifying the token sender and receiver and revert.

*Triggers the **[Transfer](#trasnfer-2)** event when tokens get transferred successfully.*



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
  ) public ;
```

Transfers many tokens based on the list `from`, `to`, `amount`. If any transfer fails, the call will revert.

*Triggers the **[Transfer](#trasnfer-2)** event when tokens get transferred successfully.*



#### Parameters:

| Name     | Type    | Description                                                                                                                               |
| :------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `from`   | address | The list of sending addresses.                                                                                                            |
| `to`     | address | The list of receiving addresses.                                                                                                          |
| `amount` | uint256 | The amount of tokens to transfer.                                                                                                         |
| `force`  | bool    | When set to TRUE, `to` may be any address; when set to FALSE `to` must be a contract that supports LSP1 UniversalReceiver and not revert. |
| `data`   | bytes   | Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.                       |

:::note

#### Requirements:

- `from`, `to`, `amount` lists are the same length.
- No values in `from` can be the zero address.
- No values in `to` can be the zero address.
- Each `amount` tokens must be owned by `from`.
- If the caller is not `from`, it must be an operator for `from` with access to at least `amount` tokens.


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

_**MUST** be fired when **[transfer](#transfer)** get executed successfuly._


#### Parameters:

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

_**MUST** be fired when **[authorizeOperator](#authorizeoperator)** get executed successfully._


#### Parameters:

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

_**MUST** be fired when **[revokeOperator](#revokeoperator)** get executed successfully._

#### Parameters:

| Name         | Type    | Description                         |
| :----------- | :------ | :---------------------------------- |
| `operator`   | address | The address revoked from operating. |
| `tokenOwner` | address | The token owner.                    |

