---
sidebar_label: 'LSP8 - Identifiable Digital Asset (NFT)'
sidebar_position: 4
---

# LSP8 - Identifiable Digital Asset

:::info Standard Document

[LSP8 - Identifiable Digital Asset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)

:::

## Introduction

Non-Fungible assets such as **[ERC721](https://eips.ethereum.org/EIPS/eip-721)** and **[ERC1155](https://eips.ethereum.org/EIPS/eip-1155)** tokens have a lot of limitations in terms of metadata, secure transfers, asset representation, and asset interaction. This causes problems for users seeking, **full control** over which assets they accept or not, **more complex NFT functionality**, and a **simple user experience** while creating, buying, and exchanging assets.

**[LSP8-IdentifiableDigitalAsset](#)** is the standard that aims to solve all problems mentioned above by:

- Allowing more secure transfers via **force boolean parameter**.
- More asset metadata **via [LSP4-DigitalAssetMetadata](./LSP4-Digital-Asset-Metadata.md)**.
- More asset representation **via bytes32 tokenIds**.
- More interaction between the asset contract and the asset _sender/recipient_ **via token hooks**.

![LSP8IdentifiableDigitalAsset features Introduction](/img/standards/lsp8/lsp8-intro.jpeg)

## What does this Standard represent?

### Specification

**[LSP8-IdentifiableDigitalAsset](#)** is a standard that aims to describe _non-fungible_ assets. The term _Non-fungible_ means that each asset is **unique and different**. They are distinguishable from each other and therefore **not interchangeable**.

This standard was based on **[ERC721](https://eips.ethereum.org/EIPS/eip-20)** and **[ERC1155](https://eips.ethereum.org/EIPS/eip-777)** with additional features mentioned below:

### Bytes32 TokenId Type

The current NFT standards such as **[ERC721](https://eips.ethereum.org/EIPS/eip-721)** and **[ERC1155](https://eips.ethereum.org/EIPS/eip-1155)** **lack asset representation** as they define the tokenIds **as Numbers** `(uint256)`. Each token from the NFT collection will be defined and queried based on this tokenId, which is normally incremental.

![ERC721 TokenIds Representation](/img/standards/lsp8/erc721-tokenIds.jpeg)

**[LSP8-IdentifiableDigitalAsset](#)** define the tokenIds as **bytes32**. The choice of **bytes32 tokenIds** allows a wide variety of applications including numbers, contract addresses, and hashed values (ie. serial numbers).

The **bytes32 tokenId** can be interpreted as a:

- <u><b>Number:</b></u>

![LSP8 Number TokenIds Representation](/img/standards/lsp8/lsp8-tokenId-number.jpeg)

- <u><b>Hashed Value:</b></u>:

![LSP8 Hashed Value TokenIds Representation](/img/standards/lsp8/lsp8-tokenId-hashed.jpeg)

- <u><b>Contract Address:</b></u>

![LSP8 Address TokenIds Representation](/img/standards/lsp8/lsp8-tokenId-address.jpeg)

TokenIds represented as **smart contract address** allow the creation of more **complex NFTs**. When each tokenId is a contract that have its own **[ERC725Y](../lsp-background//erc725.md#erc725y---generic-data-keyvalue-store)** storage. For instance in a video game, by changing the features and metadata of the tokenId based on the **game rules**.

![LSP8 Game Nested NFTs TokenIds Representation](/img/standards/lsp8/lsp8-game.jpeg)

### Unlimited Metadata

:::tip Recommendation

To mark the **asset authenticity**, it's advised to use a combination between **[LSP4-DigitalAssetMetadata](./LSP4-Digital-Asset-Metadata.md)** and **[LSP12-IssuedAssets](../universal-profile/lsp12-issued-assets.md)**.

:::

The current token standards don't enable attaching metadata to the contract in a generic and flexible way, they set the **name**, **symbol**, and **tokenURI**. This is limiting for a digital asset that may want to list the creators, the community behind it, and to have the ability to update the metadata of the token and the tokenIds over time depending on a certain logic (Evolving tokens).

To ensure a flexible and generic asset representation, the token contract should use the **[LSP4-DigitalAsset-Metadata](./LSP4-Digital-Asset-Metadata.md)**. In this way, any information could be attached to the token contract.

:::note Notice

The Metadata defined by the **ERC725Y Data Keys** can be set for **each tokenId**, not just for the whole NFT collection. Check **[LSP8 ERC725Y Data Keys](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#erc725y-data-keys)** in the LSP8 Standard Document.

:::

### LSP1 Token Hooks

:::caution

When LSP8 assets are transfered, the LSP8 contract will notify the token sender and recipient using [`_notifyTokenSender(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_notifytokensender) and [`_notifyTokenReceiver(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_notifytokenreceiver).

**These methods will make external calls** to the [`universalReceiver(...)`](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver) functions of both the sender and recipient.

This function could perform more complex logic, like delegating the call to the `LSP1UniversalReceiverDelegate` contract. This contract can contain custom logic for each user. For instance, a user could decide to re-transfer the tokens to another address once they are transferred to his UP.

:::

The current NFTs standards act as **registry contracts** that keep track of the ownership of each tokenId. They do not implement functionalities to **notify the recipient** that it has received some tokens or to **notify the sender** that it has sent some tokens.

During an **ERC721 token transfer**, the ownership of the tokenId is changed from the sender address to the recipient address without further interaction.

![ERC721 Transfer](/img/standards/lsp8/erc721-transfer.jpeg)

During an **LSP8 token transfer**, as well as updating the tokenId ownership, both the sender and recipient are informed of the transfer by calling the **[`universalReceiever(...)`](../generic-standards/lsp1-universal-receiver.md#lsp1---universal-receiver)** function on their profiles.

![LSP8 Transfer](/img/standards/lsp8/lsp8-transfer.jpeg)

In this way, users are **informed** about the NFT transfer and can decide how to **react on the transfer**, either by accepting or rejecting the NFT, or implementing a custom logic to run on each transfer with the help of **[LSP1-UniversalReceiverDelegate](../generic-standards/lsp1-universal-receiver-delegate.md)**.

If the sender and recipient are smart contracts that implement the LSP1 standard, the LSP8 token contract will notify them using the following `bytes32 typeIds` when calling their `universalReceiver(...)` function.

| address notified       | `bytes32` typeId used                                                | description                                     |
| ---------------------- | -------------------------------------------------------------------- | ----------------------------------------------- |
| Token sender (`from`)  | `0xb23eae7e6d1564b295b4c3e3be402d9a2f0776c57bdf365903496f6fa481ab00` | `keccak256('LSP8Tokens_SenderNotification')`    |
| Token recipient (`to`) | `0x0b084a55ebf70fd3c06fd755269dac2212c4d3f0f4d09079780bfa50c1b2984d` | `keccak256('LSP8Tokens_RecipientNotification')` |

### `force` mint and transfer

:::success

It is advised to set the `force` boolean to `false` when transferring or minting tokens to avoid sending them to the wrong address.

For instance, if the wrong address was pasted by mistake by the user in the input field of a dApp.
:::

It is expected in the LUKSO's ecosystem to use **smart contract based accounts** to interact on the blockchain. This includes sending and receiving tokens. EOAs can receive tokens, but should be used mainly to control these accounts, not to interact on the network or hold tokens.

To ensure a **safe asset transfer**, an additional boolean parameter was added to the [`transfer(...)``](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#transfer) and `_mint(...)` functions:

- If set to `false`, the transfer will only pass if the recipient is a smart contract that implements the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard.

![Token Force Boolean False](/img/standards/lsp7/tokens-force-false.jpeg)

- If set to `true`, the transfer will not be dependent on the recipient, meaning **smart contracts** not implementing the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard and **EOAs** will be able to receive the tokens.

![Token Force Boolean True](/img/standards/lsp7/tokens-force-true.jpeg)

Implementing the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard will give a sign that the contract knows how to handle the tokens received.

## References

- [LUKSO Standards Proposals: LSP8 - Identifiable Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)
