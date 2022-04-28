---
sidebar_label: 'LSP1 - Universal Receiver'
sidebar_position: 1
---

# LSP1 - Universal Receiver

:::info Standard Document

[LSP1 - Universal Receiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)

:::

## Introduction
There is often the need for smart contracts to **be aware of incoming transactions**, especially when it comes to value transfers.

A good example is ERC20 token transfers. When a smart contract receives a token, it has no generic way to be notified about it. One solution to this problem could be to monitor the receiving contract by listening for ERC20 token transfer events.

However, this requires using a trusted third party to monitor the contract. Such a method limits smart contracts' autonomy and introduces a single point of failure.

One way to solve this problem is by creating a standard function that any smart contract can implement. Wallets or profiles could use this function to notify the user about an incoming asset, information, followers, etc.

## What does this standard represent?

### Specification

:::success recommendation

Smart contracts implementing the `universalReceiver(...)` function SHOULD **register** the **[LSP1UniversalReceiver InterfaceId](../smart-contracts/interface-ids.md) using ERC165**. This way, other contracts can be aware that the contract supports the LSP1 standard.

:::

This standard defines a single function named `universalReceiver(...)` that could receive **any arbitrary information**. It takes two parameters:

- bytes32 `typeId`: Hash or Hook of a specific standard.
- bytes `data`: Any arbitrary data.

The `universalReceiver(...)` function emits an event with the data passed to it and some additional data. The function can then implement custom logic to make the contract behave differently based on the data received. For instance, the universalReceiver(...) function offers the following possibilities:

- Reverting on calls to completely disallow the smart contract from receiving assets, information, etc. :x:
- Registering the received assets inside the contract storage (see [LSP5 - Received Assets](../universal-profile/lsp5-received-assets.md)). :heavy_plus_sign:

> Receiving contracts should consider the `typeId` parameter to **decode the data correctly**.

![schema of universal receiver transaction](/img/ur-transaction.jpeg)

## Extension

:::info

See the **[LSP1-UniversalReceiverDelegate](../universal-profile/lsp1-universal-receiver-delegate.md)** standard for more details.

:::

LSP1-UniversalReceiverDelegate is an **optional extension** to the LSP1-UniversalReceiver Standard. As well as notifying a contract about the incoming and outgoing transactions via an event, it will delegate the `universalReceiver(...)` functionality to an external contract that can **handle and react to specific calls** with its custom logic.

The address of the **external contract** MUST be set as a value for the **LSP1UniversalReceiverDelegate data key** shown below to enable the optional extension. This key-value pair inside the **[ERC725Y Data key-value store](https://github.com/ERC725Alliance/erc725/blob/main/docs/ERC-725.md#erc725y)** of the contract implementing the `universalReceiver(...)` function will act as a reference, making this external contract upgradeable if required.

```json
{
  "name": "LSP1UniversalReceiverDelegate",
  "key": "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
  "keyType": "Singleton",
  "valueType": "address",
  "valueContent": "Address"
}
```

## References

- [LUKSO Standards Proposals: LSP1 - Universal Receiver (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)
