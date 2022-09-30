---
sidebar_label: 'LSP14 - Ownable 2-Step'
sidebar_position: 3
---

# LSP14 - Ownable 2-Step

:::info Standard Document

[LSP14 - Ownable 2-Step](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-14-Ownable2Step.md)

:::

## Introduction

The **[LSP14 Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-14-Ownable2Step.md)** describes an extended version of **[EIP173](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-173.md)** that uses a 2-step process to transfer or renounce ownership of a contract, instead of instant execution.

In addition, this standard defines hooks that call the **[universalReceiver(...)](../smart-contracts/lsp0-erc725-account.md#universalreceiver)** function of the current owner and new owner, if these addresses are contracts that implement LSP1. This aims to:

- notify when the new owner of the contract should accept ownership.

![Transfer Ownership Notification](/img/standards/lsp14/transfer-ownership-notification.jpeg)

- notify the previous and new owner when ownership of the contract has been fully transferred.

![Accept Ownership Notification](/img/standards/lsp14/accept-ownership-notification.jpeg)

## What does this standard represent ?

**LSP14 - Ownable2Step** is a modified version of [EIP173 - Contract Ownership Standard](https://eips.ethereum.org/EIPS/eip-173) that uses a safer mechanism for transferring and renouncing ownership.

In EIP173, ownership of a contract is transferred directly to a new owner, potentially leading to blocking access to the contract. For instance, if the owner calls `transferOwnership()` and the new owner:

- is an EOA that lost its private key.
- is an `address` entered incorrectly.

The same thing happens with renouncing ownership of the contract, it is done in a single transaction. This can lead to renouncing ownership of the contract by accident and potentially losing access to the contract.

With **LSP14 - Ownable2Step**, those two problem are tackled by making the processes of transferring and renouncing ownership a 2-step process.

### Transferring the contract ownership

The control of the contract is fully transferred _once the new owner has accepted the new ownership_. The 2 steps of ownership transfer are described below:

1. The previous owner transfers ownership to a new owner via the [`transferOwnership()`](../smart-contracts/lsp14-ownable-2-step.md#transferownership) function.

![Transfer Ownership](/img/standards/lsp14/transfer-ownership.jpeg)

2. The new owner claims ownership of the contract by calling the [`acceptOwnership()`](../smart-contracts/lsp14-ownable-2-step.md#acceptownership)` function.

![Accept Ownership](/img/standards/lsp14/accept-ownership.jpeg)

By making the new owner accept ownership explicitly, **LSP14 - Ownable2Step** ensures that the new owner has access to his address.

### Renouncing the contract ownership

The control of the contract is refully renounced _once the owner of the cntract confirmes the ownership renouncement_. The 2 steps of ownership renouncement are described below:

1. The owner initiates the process of ownerhsip renouncement via the ['renounceOwnership()'](../smart-contracts/lsp14-ownable-2-step.md#renounceownership) function.

2. After waiting for 100 blocks to pass from the intiation of the ownership renouncement process the owner has a window of 100 block for confirming the renouncement via ['renounceOwnership()'](../smart-contracts/lsp14-ownable-2-step.md#renounceownership). If the owner doesn't confirm in that window of time, the process cannot be confirmed and the owner must start again if it was intended to renounce ownership.

![Renounce Ownership](/img/standards/lsp14/renounce-ownership.jpeg)
