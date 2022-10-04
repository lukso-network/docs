---
sidebar_label: 'LSP7 - Digital Asset (Token)'
sidebar_position: 3
---

# LSP7 - Digital Asset

:::info Standard Document

[LSP7 - Digital Asset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)

:::

## Introduction

Fungible assets such as **[ERC20](https://eips.ethereum.org/EIPS/eip-20)**, **[ERC223](https://eips.ethereum.org/EIPS/eip-223)** or **[ERC777](https://eips.ethereum.org/EIPS/eip-777)** tokens have a lot of limitations in terms of metadata, secure transfers, and asset interaction. This causes problems for users seeking, **full control** over which assets they accept or not, and a **simple user experience** while creating, buying, and exchanging assets.

**[LSP7-DigitalAsset](#)** is the standard that aims to solve all problems mentioned above by:

- Allowing more secure transfers via **force boolean parameter**.
- More asset metadata **via [LSP4-DigitalAssetMetadata](./LSP4-Digital-Asset-Metadata.md)**.
- More interaction between the asset contract and the asset _sender/recipient_ **via token hooks**.

![LSP7DigitalAsset features Introduction](/img/standards/lsp7/lsp7-intro.jpeg)

## What does this Standard represent?

### Specification

**[LSP7-DigitalAsset](#)** is a standard that aims to describe fungible assets. The term _fungible_ means that these assets are **mutually interchangeable** (*e.g., *one token has the same value as another token).

LSP7-DigitalAsset is an interface standard which describes a set of methods that fungible asset contracts should implement which other contracts and clients can call.

This standard was based on **[ERC20](https://eips.ethereum.org/EIPS/eip-20)** and **[ERC777](https://eips.ethereum.org/EIPS/eip-777)** with additional features mentioned below:

### Divisible _vs_ Non-Divisible

When creating assets compliant with **LSP7-DigitalAsset** standard, it is possible to define the token as **divisible** or **non-divisible** in the constructor.

- **Divisible** asset can have decimals (up to 18) and token amounts can be fractional. For instance, it is possible to mint or transfer less than one token (_e.g., 0.3 tokens_).
- **Non-divisible** asset means that a token cannot be divided into fractional parts. For instance, you cannot transfer **1/10th** of a token, or 0.3 tokens, but only a whole token unit.

**Tickets created as tokens** are a great example of a use case of **LSP7-DigitalAsset**. All tickets look the same, are **interchangeable** and have the same utility. Moreover, such tickets can be made as **non-divisible** as it is only possible to sell or give away a whole ticket.

![LSP7DigitalAsset Non Divisible Assets](/img/standards/lsp7/lsp7-non-divisible.jpeg)

### Unlimited Metadata

:::tip Recommendation

To mark the **asset authenticity**, it's advised to use a combination between **[LSP4-DigitalAssetMetadata](./LSP4-Digital-Asset-Metadata.md)** and **[LSP12-IssuedAssets](../universal-profile/lsp12-issued-assets.md)**.

:::

The current token standards don't enable attaching metadata to the contract in a generic and flexible way, they set the **name**, **symbol**, and **tokenURI**. This is limiting for a digital asset that may want to list the creators, the community behind it, and to have the ability to update the metadata of the token and the tokenIds over time depending on a certain logic (Evolving tokens).

To ensure a flexible and generic asset representation, the token contract should use the **[LSP4-DigitalAsset-Metadata](./LSP4-Digital-Asset-Metadata.md)**. In this way, any information could be attached to the token contract.

### Force Boolean

It is expected in the LUKSO's ecosystem to use **[smart contract-based accounts](../universal-profile/lsp0-erc725account.md)** to operate on the blockchain, which includes receiving and sending tokens. EOAs can receive tokens, but they will be used mainly to control these accounts and not to hold them.

To ensure a **safe asset transfer**, an additional boolean parameter was added to the [transfer](../smart-contracts/lsp7-digital-asset.md#transfer) and mint functions:

- If set to **False**, the transfer will only pass if the recipient is a smart contract that implements the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard.

![Token Force Boolean False](/img/standards/lsp7/tokens-force-false.jpeg)

:::note

It's advised to set the **force** bool as **False** when transferring or minting tokens to avoid sending them to the wrong address.

:::

- If set to **TRUE**, the transfer will not be dependent on the recipient, meaning **smart contracts** not implementing the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard and **EOAs** will be able to receive the tokens.

![Token Force Boolean True](/img/standards/lsp7/tokens-force-true.jpeg)

Implementing the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard will give a sign that the contract knows how to handle the tokens received.

### Token Hooks

:::caution

When LSP7 assets are transfered, the LSP7 contract will notify the token sender and recipient using [`_notifyTokenSender(...)`](../smart-contracts/lsp7-digital-asset.md#_notifytokensender) and [`_notifyTokenReceiver(...)`](../smart-contracts/lsp7-digital-asset.md#_notifytokenreceiver).

**These methods will make external calls** to the [`universalReceiver(...)`](../smart-contracts/lsp0-erc725-account.md#universalreceiver) functions of both the sender and recipient.

This function could perform more complex logic, like delegating the call to the `LSP1UniversalReceiverDelegate` contract. This contract can contain custom logic for each user. For instance, a user could decide to re-transfer the tokens to another address once they are transferred to his UP.

:::

The current token standards act as **registry contracts** that keep track of each address's balance. They do not implement functionalities to **notify the recipient** that it has received some tokens or to **notify the sender** that it has sent some tokens.

During an **ERC20 token transfer**, the sender's balance is decreased, and the recipient's balance is increased without further interaction.

![ERC20 Transfer](/img/standards/lsp7/erc20-transfer.jpeg)

During an **LSP7 token transfer**, as well as updating the balances, both the sender and recipient are informed of the transfer by calling the **[`universalReceiever(...)`](../generic-standards/lsp1-universal-receiver.md#lsp1---universal-receiver)** function on their profiles.

![LSP7DigitalAsset Transfer](/img/standards/lsp7/lsp7-transfer.jpeg)

In this way, users are **informed** about the token transfers and can decide how to **react on the transfer**, either by accepting or rejecting the tokens, or implementing a custom logic to run on each transfer with the help of **[LSP1-UniversalReceiverDelegate](../generic-standards/lsp1-universal-receiver-delegate.md)**.

## References

- [LUKSO Standards Proposals: LSP7 - Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)
