---
sidebar_label: 'LSP1 - Universal Receiver'
sidebar_position: 1
---

# LSP1 - Universal Receiver

:::info Standard Document

[LSP1 - Universal Receiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)

:::

## Introduction
There is often the need for smart contracts to **be aware of incoming transactions**, especially when it comes to token transfers.

A good example is **[ERC20](https://eips.ethereum.org/EIPS/eip-20)** token transfers. When a smart contract receives a token, it has no generic way **to be notified** about it. As the ERC20 token contract acts like a registry and during the transfer, the sender's balance is decreased, and the recipient's balance is increased **without further interaction**.

![Smart contract recipient outside interaction](/img/standards/lsp1/token-contract-registry.jpeg)

One solution to this problem could be to listen to all the ERC20 token transfer events on the network. However, this requires using a trusted third party to listen to the events. Such a method limits smart contracts autonomy and introduces a single point of failure.

Standards like **[ERC223](https://eips.ethereum.org/EIPS/eip-223)**, **[ERC721](https://eips.ethereum.org/EIPS/eip-712)**, and **[ERC1155](https://eips.ethereum.org/EIPS/eip-1155)** require having specific functions in order to receive and be notified about the token such as `tokenReceived(..)`, `onERC721Received(..)`, and `onERC1155Received(..)` respectively.

These functions have different contexts, parameters, and events that make the smart contract not interoperable. If later in the future, a token standard **ERCXXXX** gets adopted, the smart contract (account, DEXs) will not be able to receive these kinds of tokens because it was already deployed on the network and **does not support** `onERCXXXXReceived(..)` function.

![On token received functions](/img/standards/lsp1/on-received-functions.jpeg)

One way to solve this problem is by creating a **standard and unified function** that any smart contract can implement. DEXs, Wallets, or profiles could use this function to be notified about an incoming asset, information, followers, etc.

![Unified notification function to call](/img/standards/lsp1/unified-notification-function.jpeg)

## What does this standard represent?

### Specification

:::success recommendation

Smart contracts implementing the `universalReceiver(...)` function SHOULD **register** the **[LSP1UniversalReceiver InterfaceId](../smart-contracts/interface-ids.md) using ERC165**. This way, other contracts can be aware that the contract supports the LSP1 standard.

:::

This standard defines a single function named `universalReceiver(...)` that could receive **any arbitrary information**. It takes two parameters:

- bytes32 `typeId`: Hash or Hook of a specific standard.
- bytes `data`: Any arbitrary data.

> Receiving contracts should consider the `typeId` parameter to **decode the data correctly**.

The `universalReceiver(...)` function **emits an event with the data passed to it and some additional data**. 

![universalReceiver function emits an event](/img/standards/lsp1/universal-receiver-event.jpeg)

For example, **to mark the receiving of a specific token**, during a token transfer, the token contract can call the `universalReceiver(..)` function of the token recipient with:

- bytes32 `typeId`: **Hash**('ERCXXXXTokenReceived')
- bytes `data`: **packedData**(amount of token sent, the sender address, the block timestamp)

In this way, instead of **listening to all the events of the token contrats on the network**, and checking which one of these transfers is relative to the recipient, users can listen to the **[UniversalReceiver](../smart-contracts/lsp0-erc725-account.md#universalreceiver-1)** event on the contract implementing the `universalReceiver(..)` and know the token transfer details.  


Also, the function can then implement **custom logic** to make the contract behave differently based on the data received. For instance, the `universalReceiver(...)` function, if customized, can do the following:

- Reverting on calls to completely disallow the smart contract from receiving assets, information, etc. :x:
- Registering the received assets inside the contract storage (see [LSP5 - Received Assets](../universal-profile/lsp5-received-assets.md)). :heavy_plus_sign:
- Forwarding all the received assets to an external vault or a staking contract.

![universalReceiver function execute custom logic](/img/standards/lsp1/universal-receiver-logic.jpeg)



## Extension

:::info

See the **[LSP1-UniversalReceiverDelegate](../universal-profile/lsp1-universal-receiver-delegate.md)** standard for more details.

:::

Customizing the `universalReceiver(..)` function is an option that users have to allow the function to **behave differently on different actions**. However, it's not advised to hardcode the logic of reacting on specific actions inside the function, as **this logic may need to change in the future** depending on several factors (eg. the vault where the tokens are forwarded get hacked, new staking contract is deployed, decided to revert on specific tokens later). 

**[LSP1-UniversalReceiverDelegate](../universal-profile/lsp1-universal-receiver-delegate.md)** is an **optional extension** to the **[LSP1-UniversalReceiver](#)** standard. As well as notifying a contract about the incoming and outgoing transactions by emitting an event, it can delegate the call to an external contract that can **handle and react to specific calls** with its custom logic.

![Universal Receiver Delegate contract](/img/standards/lsp1/universal-receiver-delegate.jpeg)


The address of the **external contract** can be a variable that changes in the contract storage by a setter function. In this way, users can customize such contracts to implement a specific logic that is changeable anytime in the future.

![Multiple Universal Receiver Delegate](/img/standards/lsp1/multiple-urd.jpeg)

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

## References

- [LUKSO Standards Proposals: LSP1 - Universal Receiver (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)
