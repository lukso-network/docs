---
sidebar_label: 'LSP8 - Identifiable Digital Asset (NFT)'
sidebar_position: 4
---

# LSP8 - Identifiable Digital Asset

:::info Standard Document

[LSP8 - Identifiable Digital Asset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)

:::

## Introduction

Non-Fungible assets represented mainly by **[ERC721](https://eips.ethereum.org/EIPS/eip-721)** and **[ERC1155](https://eips.ethereum.org/EIPS/eip-1155)** have a lot of limitations in terms of metadata, secure transfers, asset representation, and asset interaction. This causes problems for users seeking, **full control** over which assets they accept or not, **more complex NFT functionality**, and a **simple user experience** while creating, buying, and exchanging assets.

**[LSP8-IdentifiableDigitalAsset](#)** is the standard that aims to solve all problems mentioned above by:
- Allowing, more secure transfers via **force boolean parameter**.
- More asset metadata **via [LSP4-DigitalAssetMetadata](./LSP4-Digital-Asset-Metadata.md)**.
- More asset representation **via bytes32 tokenIds**.
- More interaction between the asset contract and the asset *sender/recipient* **via token hooks**.

![LSP8IdentifiableDigitalAsset features Introduction](/img/standards/lsp8-intro.jpeg)

## What does this Standard represent?

### Specification

**[LSP8-IdentifiableDigitalAsset](#)** is a standard that aims to describe _non-fungible_ assets. The term _Non-fungible_ means that each asset is **unique and different**. They are distinguishable from each other and therefore **not interchangeable**.

This standard was based on **[ERC721](https://eips.ethereum.org/EIPS/eip-20)** and **[ERC1155](https://eips.ethereum.org/EIPS/eip-777)** with additional features mentioned below:


### Bytes32 TokenId

The current NFT standards such as **[ERC721](https://eips.ethereum.org/EIPS/eip-721)** and **[ERC1155](https://eips.ethereum.org/EIPS/eip-1155)** **lack asset representation** as they define the tokenIds **as Numbers** `(uint256)`. Each token from the NFT collection will be defined and queried based on this tokenId, which is normally incremental.

![ERC721 TokenIds Representation](/img/standards/erc721-tokenIds.jpeg)

**[LSP8-IdentifiableDigitalAsset](#)** define the tokenIds as **bytes32**. The choice of **bytes32 tokenIds** allows a wide variety of applications including numbers, contract addresses, and hashed values (ie. serial numbers). 

The **bytes32 tokenId** can be interpreted as a <u>**Number**</u>: 

![LSP8 Number TokenIds Representation](/img/standards/lsp8-tokenId-number.jpeg)


The **bytes32 tokenId** can be interpreted as a <u>**Hashed Value**</u>: 

![LSP8 Hashed Value TokenIds Representation](/img/standards/lsp8-tokenId-hashed.jpeg)


The **bytes32 tokenId** can be interpreted as a <u>**Contract Address**</u>: 

![LSP8 Address TokenIds Representation](/img/standards/lsp8-tokenId-address.jpeg)

TokenIds represented as **contract address** will allow the creation of more  **complex NFTs**, such as **Nested NFTs**, where each tokenId could be a contract that has its own storage using **[ERC725Y](../lsp-background//erc725.md#erc725y---generic-data-keyvalue-store)**, and the tokenId can **evolve** by changing metadata depending on **game rules**.  

![LSP8 Game Nested NFTs TokenIds Representation](/img/standards/lsp8-game.jpeg)
### Unlimited Metadata

:::tip Recommendation

To mark the **asset authenticity**, it's advised to use a combination between **[LSP4-DigitalAssetMetadata](./LSP4-Digital-Asset-Metadata.md)** and **[LSP12-IssuedAssets](../universal-profile/lsp12-issued-assets.md)**.

:::

The current token standards don't enable attaching metadata to the contract in a generic and flexible way, they set the **name**, **symbol**, and **tokenURI**. This is limiting for a digital asset that may want to list the creators, the community behind it, and to have the ability to update the metadata of the token and the tokenIds over time depending on a certain logic (Evolving tokens).  

To ensure a flexible and generic asset representation, the token contract should use the **[LSP4-DigitalAsset-Metadata](./LSP4-Digital-Asset-Metadata.md)**. In this way, any information could be attached to the token contract.

:::note Notice

The Metadata defined by the **ERC725Y Data Keys** can be set for **each tokenId**, not just for the whole NFT collection. Check **[LSP8 ERC725Y Data Keys](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#erc725y-data-keys)** in the LSP8 Standard Document.

:::

### Force Boolean

It is expected in the LUKSO's ecosystem to use **smart contract based accounts** to operate on the blockchain, which includes receiving and sending tokens. EOAs can receive tokens but they will be mainly used to control these accounts and not to hold tokens.

To ensure a **safe asset transfer**, an additional boolean parameter was added to the [transfer](../smart-contracts//lsp8-identifiable-digital-asset.md#transfer) and mint functions where this parameter if set to **False**, the transfer will only pass if the recipient is a smart contract that implements the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard.

![Token Force Boolean False](/img/standards/tokens-force-false.jpeg)

:::note

Implementing the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard will give a sign that the contract knows how to handle the tokens received.
It's advised to set the **force** bool as **False** when transferring or minting tokens to avoid sending them to the wrong address.

:::

If set to **True**, the transfer will not be dependent on the recipient, meaning **smart contracts** not implementing the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard and **EOAs** will be able to receive the tokens.

![Token Force Boolean True](/img/standards/tokens-force-true.jpeg)


### Token Hooks

The current NFTs standards do not allow **informing the sender** or **the recipient** about the transfer because the token contract acts like a **registry contract** that just tracks the ownership of each tokenId. This is causing a big problem where people will receive tokens and not know about it.

During an **ERC721 token transfer**, the ownership of the tokenId is changed from the sender address to the recipient address without further interaction. 

![ERC721 Transfer](/img/standards/erc721-transfer.jpeg)

On the opposite side, and during an **LSP8 token transfer**, the same mechanism is applied of changing the ownership of the tokenId from the sender address to the recipient address, with an additional action, which is **informing** the sender and the recipient by calling the   **[`universalReceiever(...)`](../generic-standards/lsp1-universal-receiver.md#lsp1---universal-receiver)** function on their profiles.

![LSP8 Transfer](/img/standards/lsp8-transfer.jpeg)

In this way, users will be **informed** about the NFT transfers and they will have full control to **react on the transfer** either by accepting the tranfser or rejecting it or implementing a custom logic to run on each transfer with the help of 
**[LSP1-UnviersalReceiverDelegate](../universal-profile/lsp1-universal-receiver-delegate.md)**.

## References

- [LUKSO Standards Proposals: LSP8 - Identifiable Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)
