---
sidebar_label: 'LSP1 - Universal Receiver'
sidebar_position: 3
description: LUKSO LSP1 Universal Receiver Delegate.
---

# LSP1 - Universal Receiver

:::info Standard Specification

[LSP1 - Universal Receiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)

:::

> **Goal:** Handling incoming or outgoing transactions/transfers and contract interactions.

LSP1, introduces the Universal Receiver, a unique feature that revolutionizes how transactions, transfers, and contract interactions are handled on the blockchain. Imagine a world where every incoming action to your blockchain identity or asset is not just received but also intelligently responded to. That's what the Universal Receiver does.

By implementing LSP1, any smart contract or wallet can detect incoming transactions and automatically trigger customized responses. This could range from accepting certain types of assets, rejecting unwanted tokens, or even executing specific actions when receiving a message (e.g: store automatically certain received assets in a digital vault). The beauty of the Universal Receiver lies in its flexibility and the ability to delegate these responses to external contracts called Universal Receiver Delegates, which can have their own custom mechanisms for different purposes.

This ensures that your digital presence on the blockchain is not just passive but active, by managing and responding to interactions according to your own predefined rules. Whether it is for personal wallets, digital identities, or complex decentralized applications, the Universal Receiver provides a foundational layer for more secure, efficient, and user-friendly blockchain interactions.

## Introduction

There is often the need for smart contracts to **be aware of incoming transactions**, especially receiving tokens.

A good example is **[ERC20](https://eips.ethereum.org/EIPS/eip-20)** token transfers. When a smart contract receives a token, it has no generic way **to be notified** about it. During the token transfer, the sender's balance decreases, and the recipient's balance increases. There are **no further interactions**, and the ERC20 token contract just acts as a registry.

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

Smart contracts implementing the [LSP1-UniversalReceiver](../../standards/accounts/lsp1-universal-receiver-delegate.md) standard SHOULD **register** the **[LSP1UniversalReceiver InterfaceId](../../contracts/interface-ids.md) using ERC165**. This way, other contracts can be aware that the contract supports the LSP1 standard.

:::

This standard defines a single function named `universalReceiver(...)` that could receive **any arbitrary information**. It takes two parameters:

- bytes32 `typeId`: Hash or Hook of a specific standard.
- bytes `data`: Any arbitrary data.

> Receiving contracts should consider the `typeId` parameter to **decode the data correctly**.

The `universalReceiver(...)` function **emits an event with the data passed to it and some additional data**.

![universalReceiver function emits an event](/img/standards/lsp1/universal-receiver-event.jpeg)

For example, **to notify the recipient that he is about to receive tokens**, during a token transfer, the token contract can call the `universalReceiver(..)` function of the recipient with:

- bytes32 `typeId`: **Hash**('ERCXXXXTokenReceived')
- bytes `data`: **packedData**(amount of token sent, the sender address, the block timestamp)

In this way, instead of **listening to all the events of the token contracts on the network**, and checking which one of these transfers is relative to the recipient, users can listen to the **[UniversalReceiver](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver-1)** event on the contract implementing the `universalReceiver(..)` and know the token transfer details.

As well as emitting an event, the `universalReceiver(...)` function can implement **custom logic** to make the contract behave differently based on the data received. Some ideas include:

- Reverting on calls to completely disallow the smart contract from receiving assets, information, etc. :x:
- Registering the received assets inside the contract storage (see [LSP5 - Received Assets](../metadata/lsp5-received-assets.md)). :heavy_plus_sign:
- Disallowing receiving specific tokens from specific token contract addresses, for instance (e.g: spam tokens).
- Forwarding all the received assets to an external vault or a staking contract.
- Forwarding specific tokens in a contract behind a protocol or dApp (e.g: liquidity or lending pool to earn interest).
- Depending on the typeId, save a percentage % of tokens received (native tokens or not), by placing them in a vault for instance.

![universalReceiver function execute custom logic](/img/standards/lsp1/universal-receiver-logic.jpeg)

## Extension

:::info

See the **[LSP1-UniversalReceiverDelegate](../accounts/lsp1-universal-receiver-delegate.md)** standard for more details.

:::

Overriding and customizing the `universalReceiver(..)` function is an option for users to allow **different behaviours depending on the data received**. However, it's not advised to hardcode the logic of reacting to specific actions inside the function because **this logic may need to change in the future** depending on several factors (eg. the vault where the tokens are forwarded gets compromised, a new staking contract is deployed, decided to revert on specific tokens later).

**[LSP1-UniversalReceiverDelegate](../accounts/lsp1-universal-receiver-delegate.md)** is an **optional extension** to the **[LSP1-UniversalReceiver](../../standards/accounts/lsp1-universal-receiver.md)** standard. As well as notifying a contract about the incoming and outgoing transactions by emitting an event, it can delegate the call to an external contract that can **handle and react to specific calls** with its custom logic.

![Universal Receiver Delegate contract](/img/standards/lsp1/universal-receiver-delegate.jpeg)

The address of the **external contract** can be stored and changed inside the contract storage. This way, users can customize such contracts to implement a specific logic that is changeable at any time.

![Multiple Universal Receiver Delegate](/img/standards/lsp1/multiple-urd.jpeg)
