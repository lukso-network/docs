---
sidebar_label: 'LSP1 - Universal Receiver Delegate'
sidebar_position: 4
description: LUKSO LSP1 Universal Receiver for notifying upon incoming transactions.
---

# LSP1 - Universal Receiver Delegate

:::info Standard Specification

[LSP1 - Universal Receiver Delegate](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md#specification-of-the-universalreceiverdelegate)

:::

:::success Recommendation

To better understand this standard, it is well-advised first to check the origin standard **[LSP1-UniversalReceiver](../accounts/lsp1-universal-receiver.md)**.

:::

## Introduction

Once deployed, the code of a smart contract **can not be changed**. However, builders can decide how their smart contracts implement the [`universalReceiver(...)`](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver) function.

Therefore, it is advised not to hardcode how the smart contract should handle and react to specific calls inside the `universalReceiver(...)` function. Instead, it should delegate this functionality to another external contract. Developers could then customize such contracts to implement a specific logic, that is **changeable anytime** by updating the reference to a new contract in the `universalReceiver(..)` function.

## What does this standard represent ?

### Specification

:::success recommendation

Smart contracts implementing the [LSP1-UniversalReceiverDelegate](../../standards/accounts/lsp1-universal-receiver-delegate.md) standard SHOULD **register** the **[LSP1UniversalReceiverDelegate InterfaceId](../../contracts/interface-ids.md) using ERC165**. This way, other contracts can be aware that the contract supports the LSP1-UniversalReceiverDelegate standard.

:::

This standard defines a contract called **UniversalReceiverDelegate** containing a single function named `universalReceiverDelegate(...)` that should be called by the `universalReceiver(..)` function with:

- address `caller` is the address calling the `universalReceiver` function.

- uint256 `value` is the amount of value sent to the `universalReceiver` function.

- bytes32 `typeId`: the typeId passed to the `universalReceiver(...)` function.

- bytes `data`: the data passed to the `universalReceiver(...)` function.

### How Delegation works

Delegation in the context of smart contracts implementing the `universalReceiver(...)` function allows for flexibility in handling specific calls without hardcoding the logic within the primary contract. While the exact implementation of delegation is up to the individual contract, there are some common steps involved in the process.

1- Query the **UniversalReceiverDelegate** address: Typically, the address of the **UniversalReceiverDelegate** contract is stored in the primary contract's storage. When the `universalReceiver(...)` function is called, the address is retrieved to facilitate delegation.

2- Check for LSP1Delegate support: Before making any calls to the UniversalReceiverDelegate contract, it's essential to ensure that the contract supports the LSP1Delegate standard. This can be done by checking for the **LSP1UniversalReceiverDelegate InterfaceId** using ERC165.

3- Call the UniversalReceiverDelegate's `universalReceiverDelegate(..)` function: Once LSP1Delegate support is confirmed, the primary contract's `universalReceiver(...)` function can delegate the call to the UniversalReceiverDelegate's `universalReceiverDelegate(...)` function. This allows the primary contract to utilize the logic implemented in the delegate contract.

Delegation can be implemented in various ways, depending on the developer's requirements. Some possible delegation strategies include:

- Single delegation: The primary contract delegates all calls to a single UniversalReceiverDelegate contract.

- Multiple delegation: Different calls are delegated to different UniversalReceiverDelegate contracts based on specific conditions, such as the typeId.

- Mixed delegation: A combination of single and multiple delegation strategies can be used, where some calls are delegated to a single contract, while others are delegated to different contracts based on specific conditions.

In summary, delegation provides a flexible way for smart contracts to handle and react to specific calls, allowing developers to update the logic without altering the primary contract's code. This approach is particularly useful when working with the universalReceiver(...) function and implementing the LSP1 standard.

## Implementations

There are several implementations of the standard. The **[LSP1UniversalReceiverDelegateUP](../../contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/)** contract is one of them and is used as a delegate to the `universalReceiver(...)` function of **UniversalProfile** contract.

At the moment, this contract allows to:

- receive and send tokens & vaults
- register the data keys representing them according to **[LSP5-ReceivedAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)** and **[LSP10-ReceivedVaults](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-10-ReceivedVaults.md)** Standards.

### Token transfer scenario

One of the possible scenarios is a token transfer between Alice and Bob. Alice wants to transfer a token owned by her Universal Profile to the Universal Profile of her friend Bob.

**1.** It calls the **`transfer(...)`** function on the token contract.

![executing transfer function](/img/standards/lsp1delegate/token-transfer-1.jpeg)

**2.** The `transfer(...)` function on the token contract will directly **trigger a hook** that will call the `universalReceiver(...)` function on both sender and recipient Universal Profiles.

![token contract hooks calling universalReceiver function](/img/standards/lsp1delegate/token-transfer-2.jpeg)

**3.** 3. If the **UniversalReceiverDelegate** contract is set, it will be called by the `universalReceiver(...)` function and will execute its custom logic.

![universalReceiver function calling UniversalReceiverDelegate contract](/img/standards/lsp1delegate/token-transfer-3.jpeg)

**4.** The **UniversalReceiverDelegate** of **Universal Profile** allows the transfer and set **[LSP5-ReceivedAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)** data keys on both Profiles.

![UniversalReceiverDelegate setting data keys on profile](/img/standards/lsp1delegate/token-transfer-4.jpeg)

> For the UniversalReceiverDelegate to be able to call setData function on the UniversalProfile, it should be allowed by the logic of the owner through LSP20.

## Data Keys

### LSP1UniversalReceiverDelegate Singleton

```json
{
  "name": "LSP1UniversalReceiverDelegate",
  "key": "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
  "keyType": "Singleton",
  "valueType": "address",
  "valueContent": "Address"
}
```

### LSP1UniversalReceiverDelegate Mapping

```json
{
  "name": "LSP1UniversalReceiverDelegate:<bytes32>",
  "key": "0x0cfc51aec37c55a4d0b10000<bytes32>",
  "keyType": "Mapping",
  "valueType": "address",
  "valueContent": "Address"
}
```

## References

- [LUKSO Standards Proposals: LSP1 - Universal Receiver (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp1-contracts/contracts)
