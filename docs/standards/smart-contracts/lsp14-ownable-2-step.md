---
title: LSP14Ownable2Step
sidebar_position: 11
---

# LSP14Ownable2Step

:::info Solidity contract

[`LSP14Ownable2Step.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol)

:::

The **LSP14Ownable2Step** contract is an implementation of the **[LSP14-Ownable-2-Step Standard](#)**.

This contract can be **inherited** whenever one wants to make his contract **owned** by an EOA or by another contract. This contract contains all the necessary methods for **managing the ownership** of a contract, **`tranferOwnership(...)`**, **`acceptOwnership(...)`** and **`renounceOwnership(...)`**.

---

## Functions

### owner

```solidity
function owner() public view returns (address owner)
```

Returns the address of the current contract owner.

#### Return Values:

| Name    | Type    | Description                        |
| :------ | :------ | :--------------------------------- |
| `owner` | address | The current owner of the contract. |

### pendingOwner

```solidity
function pendingOwner() public view returns (address)
```

Return the address of the pending owner that was initiated by [`transferOwnership(address)`](#transferownership).

> **NB:** if no ownership transfer is in progress, the `pendingOwner` MUST be `address(0)`.

#### Return Values:

| Name           | Type    | Description                      |
| :------------- | :------ | :------------------------------- |
| `pendingOwner` | address | The address of the pending owner |

### transferOwnership

```solidity
function transferOwnership(address newOwner) public
```

Initiate an ownership transfer by setting the `newOwner` as `pendingOwner`.

Requirements:

- Can only be called by the current owner.
- The `newOwner` to be set as the `pendingOwner` cannot be `address(this)`.

#### Parameters:

| Name       | Type    | Description                           |
| :--------- | :------ | :------------------------------------ |
| `newOwner` | address | The address to set as `pendingOwner`. |

### acceptOwnership

```solidity
function acceptOwnership() public
```

Transfers ownership of the contract to the `pendingOwner` address. Can only be called by the `pendingOwner`.

_Triggers the **[OwnershipTransferred](#ownershiptransferred)** event once the new owner has claimed ownership._

### renounceOwnership

```solidity
function renounceOwnership() public
```

Since renouncing ownership is a sensitive operation, it is done as a two step process by calling `renounceOwnership(..)` twice. First to initiate the process, second as a confirmation.

The current block number is saved as a part of initiation because the following behaviour is wanted:

- The first 100 blocks after the saved block is the pending period, if you call `renounceOwnership(..)` during this period, the transaction will be reverted.
- the following 100 blocks is the period when you can confirm the renouncement of the contract by calling `renounceOwnership(..)` the second time.

_Triggers the **[RenounceOwnershipStarted](#RenounceOwnershipStarted)** event in the first call._

_Triggers the **[OwnershipTransferred](#ownershiptransferred)** and **[OwnershipRenounced](#ownershiprenounced)** events after successfully renouncing ownership._

:::warning
Leaves the contract without an owner. Once ownership of the contract is renounced, it won't be possible to call the functions restricted to the owner only.
:::

## Events

### OwnershipTransferStarted

```solidity
event OwnershipTransferred(
    address indexed currentOwner,
    address indexed newOwner,
)
```

_**MUST** be fired when the **[`transferOwnership(...)`](#transferownership)** function is successfully initiated._

#### Values:

| Name           | Type    | Description                              |
| :------------- | :------ | :--------------------------------------- |
| `currentOwner` | address | The current owner of the contract.       |
| `newOwner`     | address | The potential new owner of the contract. |

### OwnershipTransferred

```solidity
event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner,
)
```

_**MUST** be fired when the **[`transferOwnership(...)`](#transferownership)** function is successfully executed._

#### Values:

| Name            | Type    | Description                         |
| :-------------- | :------ | :---------------------------------- |
| `previousOwner` | address | The previous owner of the contract. |
| `newOwner`      | address | The new owner of the contract.      |

### RenounceOwnershipStarted

```solidity
event RenounceOwnershipStarted()
```

_**MUST** be fired when the **[`renounceOwnership()`](#renounceownership)** process is initiated._

### OwnershipRenounced

```solidity
event OwnershipRenounced()
```

_**MUST** be fired when the **[`renounceOwnership()`](#renounceownership)** process is confirmed._

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
