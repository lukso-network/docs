---
sidebar_label: 'LSP14 - Ownable 2-Step'
sidebar_position: 2
description: "LUKSO's LSP14 - Ownable2Step: an extended version of EIP173 - Contract Ownership Standard for transferring and renouncing ownership."
---

# LSP14 - Ownable 2-Step

:::info Standard Specification

[LSP14 - Ownable 2-Step](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-14-Ownable2Step.md)

:::

> **Goals:**
>
> - Secures owner management
> - Enables ownable 2-Step verification

LSP14 - Ownable2Step simplifies ownership management in smart contracts through a two-step process, enhancing security and preventing accidental loss of control. Unlike instant ownership transfer, LSP14 ensures deliberate actions by requiring the new owner's acceptance, thereby minimizing risks associated with wrong addresses or lost keys. It also incorporates LSP1's universalReceiver function, enabling notifications during ownership changes, fostering transparency and communication between the previous and new owners. This standard is crucial for maintaining control over contracts, especially in scenarios where ownership carries significant power and access to sensitive functions. Through LSP14, LUKSO enhances the safety and reliability of contract ownership transitions, supporting a more secure and user-friendly blockchain ecosystem.

## Introduction

In the current [EIP173 - Contract Ownership Standard](https://eips.ethereum.org/EIPS/eip-173) standard (EIP173), ownership of a contract is transferred directly in one transaction via `transferOwnership(...)`. This presents some risks. For instance if the new owner:

- is an EOA that lost its private key.
- is an `address` entered incorrectly.

Renouncing ownership of the contract in [EIP173 - Contract Ownership Standard](https://eips.ethereum.org/EIPS/eip-173) is also done in one transaction. If the owner accidentally calls `renounceOwnership()`, this leads to losing access to the contract.

What is needed is a safer mechanism for managing contract ownership.

## What does this standard represent ?

**LSP14 - Ownable2Step** is an extended version of [EIP173 - Contract Ownership Standard](https://eips.ethereum.org/EIPS/eip-173) that uses a 2-step process for transferring and renouncing ownership.

**LSP14 - Ownable2Step** modifies the processes of _transferring and renouncing ownership_ in the following way:

1. For _transferring ownership_ the method `transferOwnership(...)` is modified in a way so the **address** passed as parameter will not be the owner directly but a pending owner. A new method is introduced, `acceptOwnership()`, which should be called by the **pending owner** in order for the process of _transferring ownership_ to be complete.

2. For _renouncing ownership_ the method `renounceOwnership()` is modified in the following way. The **owner** of the contract need to firstly initiate the process of _renouncing ownership_ which starts a countdown of **200 blocks** which are broken into two _distinct periods_. The **first 100 blocks** are meant to be waited, a period when one can reflect upon the desire of renouncing ownership of the contract. The **second 100 blocks** are meant for confirming the ownership renouncement process. After a total of **200 blocks** pass from the initiation, the process is restarted.

In addition, this standard defines hooks that call the **[universalReceiver(...)](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver)** function of the current owner and new owner, if these addresses are contracts that implement LSP1.

## Specification

### Transferring the contract ownership

The control of the contract is fully transferred _once the new owner has accepted the new ownership_. The 2 steps of ownership transfer are described below:

1. The previous owner transfers ownership to a new owner via the [`transferOwnership(...)`](../../contracts/contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#transferownership) function.

![Transfer Ownership](/img/standards/lsp14/transfer-ownership.jpeg)

2. The new owner claims ownership of the contract by calling the [`acceptOwnership()`](../../contracts/contracts/LSP14Ownable2Step/LSP14Ownable2Step.md #acceptownership)` function.

![Accept Ownership](/img/standards/lsp14/accept-ownership.jpeg)

By making the new owner accept ownership explicitly, **LSP14 - Ownable2Step** ensures that the new owner has access to his address.

#### Transfer Ownership Hook

This hook is designed to _notify the new owner_ of the contract that he should accept ownership.
The hook is executed whenever the owner _initiates the process of transferring ownership_ and only if the new owner is a contract that **implements LSP1**.

![Transfer Ownership Notification](/img/standards/lsp14/transfer-ownership-notification.jpeg)

#### Accept Ownership Hooks

These hooks are designed to _notify the previous and new owner_ when ownership of the contract has been fully transferred. One hook notifies the previous owner and the second one notifies the new owner.
Each hook is executed whenever the _new owner confirms the process of transferring ownership_.

- The hook that notifies the previous owner is only executed if the previous owner is a contract that **implements LSP1**.
- The hook that notifies the new owner is only executed if the new owner is a contract that **implements LSP1**.

![Accept Ownership Notification](/img/standards/lsp14/accept-ownership-notification.jpeg)

### Renouncing the contract ownership

The control of the contract is refully renounced _once the owner of the contract confirms the ownership renouncement_. The 2 steps of ownership renouncement are described below:

1. The owner initiates the process of ownership renouncement via the ['renounceOwnership()'](../../contracts/contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#renounceownership) function.

2. After waiting for 200 blocks to pass from the initiation of the ownership renouncement process the owner has a window of 200 block for confirming the renouncement via ['renounceOwnership()'](../../contracts/contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#renounceownership). If the owner doesn't confirm in that window of time, the process cannot be confirmed and the owner must start again if it was intended to renounce ownership.

![Renounce Ownership](/img/standards/lsp14/renounce-ownership.jpeg)
