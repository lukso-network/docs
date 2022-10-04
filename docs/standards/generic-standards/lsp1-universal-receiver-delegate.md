---
sidebar_label: 'LSP1 - Universal Receiver Delegate'
sidebar_position: 2
---

# LSP1 - Universal Receiver Delegate

:::info Standard Document

[LSP1 - Universal Receiver Delegate](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md#specification-of-the-universalreceiverdelegate)

:::

:::success Recommendation

To better understand this standard, it is well-advised first to check the origin standard **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)**.

:::

## Introduction

Once deployed, the code of a smart contract **can not be changed**. However, builders can decide how their smart contracts implement the [`universalReceiver(...)`](../smart-contracts/lsp0-erc725-account.md#universalreceiver) function. This standard allows any external smart contract to change relations from the main contract to change function behavior.

Therefore, it is advised not to hardcode how the smart contract should handle and react to specific calls inside the `universalReceiver(...)` function. Instead, it should delegate this functionality to another external contract. Developers could then customize such contracts to implement a specific logic that is **changeable anytime via an upgrade**.

## What does this standard represent ?

### Specification

:::success recommendation

Smart contracts implementing the `universalReceiverDelegate(...)` function SHOULD **register** the **[LSP1UniversalReceiverDelegate InterfaceId](../smart-contracts/interface-ids.md) using ERC165**. This way, other contracts can be aware that the contract supports the LSP1 standard.

:::

This standard defines a contract called **UniversalReceiverDelegate** containing a single function named `universalReceiverDelegate(...)` that should be called by the `universalReceiver(..)` function with the `typeId` and `data` passed to it, as well as two other parameters:

- address `caller`: the address that initially called the `universalReceiver(...)` function.

- uint256 `value`: the amount of value sent to the `universalReceiver(...)` function.

### How Delegation works

The address of the **[UniversalReceiverDelegate](../smart-contracts/lsp1-universal-receiver-delegate-up.md)** contract can be a variable inside the storage, to allow future upgrade of the **UniversalReceiverDelegate** simply by changing the address to another UniversalReceiverDelegate containing a new logic.

If the contract implementing the `universalReceiver(..)` supports **[ERC725Y Data key-value store](https://github.com/ERC725Alliance/erc725/blob/main/docs/ERC-725.md#erc725y)**, the address of the **external contract** MUST be set as a value for the **LSP1UniversalReceiverDelegate data key** shown below to enable the optional extension. This key-value pair will act as a reference, making this external contract upgradeable if required.

```json
{
  "name": "LSP1UniversalReceiverDelegate",
  "key": "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
  "keyType": "Singleton",
  "valueType": "address",
  "valueContent": "Address"
}
```
Check **[LSP2-ERC725YJSONSchema](./lsp2-json-schema.md)** for more information about the JSON schema.

## Implementations

There are several implementations of the standard. The **[LSP1UniversalReceiverDelegateUP](../smart-contracts/lsp1-universal-receiver-delegate-up.md)** contract is one of them and is used as a delegate to the `universalReceiver(...)` function of **UniversalProfile** contract.

At the moment, this contract allows to:

- receive and send tokens & vaults
- register the data keys representing them according to **[LSP5-ReceivedAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)** and **[LSP10-ReceivedVaults](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-10-ReceivedVaults.md)** Standards.

### Token transfer scenario

One of the possible scenarios is a token transfer between Alice and Bob. Alice wants to transfer a token owned by her Universal Profile to the Universal Profile of her friend Bob.

**1.** It calls the **`transfer(...)`** function on the token contract through the [KeyManager](../smart-contracts/lsp6-key-manager.md).

![executing transfer function](/img/standards/lsp1delegate/token-transfer-1.jpg)

**2.** The `transfer(...)` function on the token contract will directly **trigger a hook** that will call the `universalReceiver(...)` function on both sender and recipient Universal Profiles.

![token contract hooks calling universalReceiver function](/img/standards/lsp1delegate/token-transfer-2.jpg)

**3.** 3. If the **UniversalReceiverDelegate** contract is set, it will be called by the `universalReceiver(...)` function and will execute its custom logic.

![universalReceiver function calling UniversalReceiverDelegate contract](/img/standards/lsp1delegate/token-transfer-3.jpg)

**4.** The **UniversalReceiverDelegate** of **Universal Profile** allows the transfer and set **[LSP5-ReceivedAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)** data keys on both Profiles through the KeyManager.

![UniversalReceiverDelegate setting data keys on profile](/img/standards/lsp1delegate/token-transfer-4.jpg)

## References

- [LUKSO Standards Proposals: LSP1 - Universal Receiver (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP1UniversalReceiver)
