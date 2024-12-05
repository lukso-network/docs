---
title: 🔊 Universal Receiver
sidebar_position: 3
---

# Universal Receiver Delegate

There are two default implementations of the LSP1 Delegate contracts available, each for different use cases.

| Contract                                                                                                                                                    | Description                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **[`LSP1UniversalReceiverDelegateUP.sol`](../contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.md)**          | Add feature to a `LSP0ERC725Account` to registered and un-register tokens (LSP7 and LSP8) and vaults (LSP9) received. |
| **[`LSP1UniversalReceiverDelegateVault.sol`](../contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateVault/LSP1UniversalReceiverDelegateVault.md)** | Add feature to a `LSP9Vault` to register and un-register tokens (LSP7 and LSP8).                                      |

## Routing

The Universal Profile implementation allows for attaching multiple instances of Universal Receiver Delegate to it. This is due to LSP1 Routing. You could have a single General Purpose Universal Receiver Delegate and multiple instances of Specific Universal Receiver Delegate.

A General Purpose Universal Receiver Delegate has its address stored under the [LSP1UniversalReceiverDelegate Singleton](/standards/accounts/lsp1-universal-receiver-delegate.md#lsp1universalreceiverdelegate-singleton) data key. This contract will be called on any LSP1 hook, meaning that it can potentially react on any [TypeID](../type-ids.md#universal-receiver-type-ids).

A Specific Universal Receiver Delegate has its address stored under the [LSP1UniversalReceiverDelegate Mapping](/standards/accounts/lsp1-universal-receiver-delegate.md#lsp1universalreceiverdelegate-mapping) data key. This contract will be called on specific LSP1 hook, depending on the [TypeID](../type-ids.md#universal-receiver-type-ids) that was passed as a parameter in the hook, meaning that it only reacts on a single specific [TypeID](../type-ids.md#universal-receiver-type-ids).
