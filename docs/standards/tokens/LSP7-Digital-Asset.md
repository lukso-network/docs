---
sidebar_label: 'LSP7 - Digital Asset (Token)'
sidebar_position: 3
description: LUKSO LSP7 - Digital Asset for fungible assets.
---

# LSP7 - Digital Asset

:::info Standard Document

[LSP7 - Digital Asset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)

:::

## Introduction

Fungible assets such as **[ERC20](https://eips.ethereum.org/EIPS/eip-20)**, **[ERC223](https://eips.ethereum.org/EIPS/eip-223)** or **[ERC777](https://eips.ethereum.org/EIPS/eip-777)** tokens have a lot of limitations in terms of metadata, secure transfers, and asset interaction. This causes problems for users seeking, **full control** over which assets they accept or not, and a **simple user experience** while creating, buying, and exchanging assets.

**[LSP7-DigitalAsset](../../standards/tokens/LSP7-Digital-Asset.md)** is the standard that aims to solve all problems mentioned above by:

- Allowing more secure transfers via **force boolean parameter**.
- More asset metadata **via [LSP4-DigitalAssetMetadata](./LSP4-Digital-Asset-Metadata.md)**.
- More interaction between the asset contract and the asset _sender/recipient_ **via token hooks**.

![LSP7DigitalAsset features Introduction](/img/standards/lsp7/lsp7-intro.jpeg)

## What does this Standard represent?

### Specification

**[LSP7-DigitalAsset](../../standards/tokens/LSP7-Digital-Asset.md)** is a standard that aims to describe fungible assets. The term _fungible_ means that these assets are **mutually interchangeable** (*e.g., *one token has the same value as another token).

LSP7-DigitalAsset is an interface standard which describes a set of methods that fungible asset contracts should implement which other contracts and clients can call.

This standard was based on the ideas of **[ERC20](https://eips.ethereum.org/EIPS/eip-20)** and **[ERC777](https://eips.ethereum.org/EIPS/eip-777)**. While it does not integrate all the functionality from [ERC777](https://eips.ethereum.org/EIPS/eip-777), LSP7 comes with the additional features mentioned below:

### Divisible _vs_ Non-Divisible

When creating assets compliant with **LSP7-DigitalAsset** standard, it is possible to define the token as **divisible** or **non-divisible** in the constructor.

- **Divisible** asset can have decimals (up to 18) and token amounts can be fractional. For instance, it is possible to mint or transfer less than one token (_e.g., 0.3 tokens_).
- **Non-divisible** asset means that a token cannot be divided into fractional parts. For instance, you cannot transfer **1/10th** of a token, or 0.3 tokens, but only a whole token unit.

**Tickets created as tokens** are a great example of a use case of **LSP7-DigitalAsset**. All tickets look the same, are **interchangeable** and have the same utility. Moreover, such tickets can be made as **non-divisible** as it is only possible to sell or give away a whole ticket.

![LSP7DigitalAsset Non Divisible Assets](/img/standards/lsp7/lsp7-non-divisible.jpeg)

### Unlimited Metadata

:::tip Recommendation

To mark the **asset authenticity**, it's advised to use a combination between **[LSP4-DigitalAssetMetadata](./LSP4-Digital-Asset-Metadata.md)** and **[LSP12-IssuedAssets](../metadata/lsp12-issued-assets.md)**.

:::

The current token standards don't enable attaching metadata to the contract in a generic and flexible way, they set the **name**, **symbol**, and **tokenURI**. This is limiting for a digital asset that may want to list the creators, the community behind it, and to have the ability to update the metadata of the token and the tokenIds over time depending on a certain logic (Evolving tokens).

To ensure a flexible and generic asset representation, the token contract should use the **[LSP4-DigitalAsset-Metadata](./LSP4-Digital-Asset-Metadata.md)**. In this way, any information could be attached to the token contract.

### LSP1 Token Hooks

:::caution

When LSP7 assets are transferred, the LSP7 contract will notify the token sender and recipient using [`_notifyTokenSender(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_notifytokensender) and [`_notifyTokenReceiver(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_notifytokenreceiver).

**These methods will make external calls** to the [`universalReceiver(...)`](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver) functions of both the sender and recipient.

This function could perform more complex logic, like delegating the call to the `LSP1UniversalReceiverDelegate` contract. This contract can contain custom logic for each user. For instance, a user could decide to re-transfer the tokens to another address once they are transferred to his UP.

:::

The current token standards act as **registry contracts** that keep track of each address's balance. They do not implement functionalities to **notify the recipient** that it has received some tokens or to **notify the sender** that it has sent some tokens.

During an **ERC20 token transfer**, the sender's balance is decreased, and the recipient's balance is increased without further interaction.

![ERC20 Transfer](/img/standards/lsp7/erc20-transfer.jpeg)

During an **LSP7 token transfer**, as well as updating the balances, both the sender and recipient are informed of the transfer by calling their **[`universalReceiver(...)`](../accounts/lsp1-universal-receiver.md#lsp1---universal-receiver)** function (if these are both smart contracts).

![LSP7DigitalAsset Transfer](/img/standards/lsp7/lsp7-transfer.jpeg)

In this way, users are **informed** about the token transfers and approval and can decide how to **react on the transfer or approval**, either by accepting or rejecting the tokens, or implementing a custom logic to run on each transfer with the help of **[LSP1-UniversalReceiverDelegate](../accounts/lsp1-universal-receiver-delegate.md)**.

If the sender and recipient are smart contracts that implement the LSP1 standard, the LSP7 token contract will notify them using the following `bytes32 typeIds` when calling their `universalReceiver(...)` function.

| address notified            | `bytes32` typeId used                                                | description                                     |
| --------------------------- | -------------------------------------------------------------------- | ----------------------------------------------- |
| Token sender (`from`)       | `0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea` | `keccak256('LSP7Tokens_SenderNotification')`    |
| Token recipient (`to`)      | `0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c` | `keccak256('LSP7Tokens_RecipientNotification')` |
| Token Operator (`operator`) | `0x386072cc5a58e61263b434c722725f21031cd06e7c552cfaa06db5de8a320dbc` | `keccak256('LSP7Tokens_OperatorNotification')`  |

### `force` mint and transfer

:::success

It is advised to set the `force` boolean to `false` when transferring or minting tokens to avoid sending them to the wrong address.

For instance, if the wrong address was pasted by mistake by the user in the input field of a dApp.

:::

It is expected in the LUKSO's ecosystem to use **[smart contract-based accounts](../accounts/lsp0-erc725account.md)** to interact on the blockchain. This includes sending and receiving tokens. EOAs can receive tokens, but should be used mainly to control these accounts, not to interact on the network or hold tokens.

To ensure a **safe asset transfer**, an additional boolean parameter was added to the [`transfer(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#transfer) and [`_mint(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_mint) functions:

- If set to `false`, the transfer will only pass if the recipient is a smart contract that implements the **[LSP1-UniversalReceiver](../accounts/lsp1-universal-receiver.md)** standard.

![Token Force Boolean False](/img/standards/lsp7/tokens-force-false.jpeg)

- If set to `true`, the transfer will not be dependent on the recipient, meaning **smart contracts** not implementing the **[LSP1-UniversalReceiver](../accounts/lsp1-universal-receiver.md)** standard and **EOAs** will be able to receive the tokens.

![Token Force Boolean True](/img/standards/lsp7/tokens-force-true.jpeg)

Implementing the **[LSP1-UniversalReceiver](../accounts/lsp1-universal-receiver.md)** standard will give a sign that the contract knows how to handle the tokens received.

## References

- [LUKSO Standards Proposals: LSP7 - Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)
