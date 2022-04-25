---
sidebar_label: 'LSP1 Universal Receiver Delegate'
sidebar_position: 3
---

# LSP1 Universal Receiver Delegate

:::info Standard Document

[LSP1 - Universal Receiver Delegate](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md#specification-of-the-universalreceiverdelegate)

:::

:::success Recommendation

To better understand this standard, it is well-advised first to check the origin standard **[LSP1-UniversalReceiver](../generic-standards/02-lsp1-universal-receiver.md)**.

:::

## Introduction

Once deployed, the code of a smart contract **can not be changed**. However, builders can decide how their smart contracts implement the [`universalReceiver(...)`](../smart-contracts/lsp0-erc725-account.md#universalreceiver) function. This standard allows any external smart contract to change relations from the main contract to change function behavior.

Therefore, it is advised not to hardcode how the smart contract should handle and react to specific calls inside the `universalReceiver(...)` function. Instead, it should delegate this functionality to another external contract. Developers could then customize such contracts to implement a specific logic that is **changeable anytime via an upgrade**.

## What does this standard represent ?

### Specification

This standard represents a smart contract delegated to the initial `universalReceiver(...)` function.

It contains a single function named `universalReceiverDelegate(...)` that takes the same parameters as the `universalReceiver(...)` function with an additional one:

- address `sender`: the address that initially called the `universalReceiver(...)` function.

### How Delegation works

The address of the **UniversalReceiverDelegate** contract should be set as a value for the key `LSP1UniversalReceiver`, inside the [ERC725Y key-value store](https://github.com/ERC725Alliance/erc725/blob/main/docs/ERC-725.md#erc725y) of the implementation contract (contract implementing the `universalReceiver(...)` function). With such an implementation, the `universalReceiver(...)` function can forward the call to its similar one called `universalReceiverDelegate(...)`.

This external contract will then implement the `universalReceiverDelegate(...)` function. It is also recommended that this contract registers the **[LSP1UniversalReceiverDelegate interfaceId](../smart-contracts/interface-ids.md)** using ERC165.

![ur-delegate-transaction](/img/ur-delegate-transaction.jpeg)

## Implementations

There are several implementations of the standard. The **[LSP1UniversalReceiverDelegateUP](../smart-contracts/lsp1-universal-receiver-delegate-up.md)** contract is one of them and is used as a delegate to the `universalReceiver(...)` function of **UniversalProfile** contract.

At the moment, this contract allows to:

- receive and send tokens & vaults
- register the keys representing them according to **[LSP5-ReceivedAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)** and **[LSP10-ReceivedVaults](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-10-ReceivedVaults.md)** Standards.

### Token transfer scenario

One of the possible scenarios is a token transfer between Alice and Bob. Alice wants to transfer a token owned by her Universal Profile to the Universal Profile of her friend Bob.

**1.** It calls the **`transfer(...)`** function on the token contract through the KeyManager.

![executing transfer function](/img/token-transfer-1.jpg)

**2.** The `transfer(...)` function on the token contract will directly **trigger a hook** that will call the `universalReceiver(...)` function on both sender and recipient Universal Profiles.

![token contract hooks calling universalReceiver function](/img/token-transfer-2.jpg)

**3.** 3. If the **UniversalReceiverDelegate** contract is set, it will be called by the `universalReceiver(...)` function and will execute its custom logic.

![universalReceiver function calling UniversalReceiverDelegate contract](/img/token-transfer-3.jpg)

**4.** The **UniversalReceiverDelegate** of **Universal Profile** allows the transfer and set **[LSP5-ReceivedAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)** keys on both Profiles through the KeyManager.

![UniversalReceiverDelegate setting keys on profile](/img/token-transfer-4.jpg)

## References

- [LUKSO Standards Proposals: LSP1 - Universal Receiver (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP1UniversalReceiver)
