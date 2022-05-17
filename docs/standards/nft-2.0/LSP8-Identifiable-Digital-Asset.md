---
sidebar_label: 'LSP8 - Identifiable Digital Asset (NFT)'
sidebar_position: 4
---

# LSP8 - Identifiable Digital Asset

:::info Standard Document

[LSP8 - Identifiable Digital Asset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)

:::

## Introduction

When it comes to Non Fungible Tokens (NFTs), one of the key characteristics that make them unique is their **metadata.**

In their current state, such assets are created as ERC721 tokens. However, their limitations are following:

#### 1. The metadata attached to the NFT (represented with `tokenURI`) refers to a file.

The reference raises several questions around where the token's metadata is stored. Is a central service used to store the metadata? What about if such a service goes down?

![ERC721 Metadata Security](/img/erc721-metadata-security.png)

#### 2. The only data that can be attached to an NFT is a `name` and `symbol`.

Each NFT has its own characteristics and specific details. The singularity is what makes each NFT unique. But how can we attach more information specific to an NFT? Or **how can we query one precise information** specific to an NFT without having to retrieve and search through the entire metadata?

#### 3. The metadata file can be altered.

Suppose the metadata for an NFT is linked to a JSON file. How do we know if it has been altered? The uncertainty presents a significant problem. If the rules and logic of an application were based on the metadata related to an NFT, any unexpected change to the data could affect the whole application.

#### 4. The NFT metadata is set in stone.

How about if we want to represent NFTs as more than just a set of information in a JSON file? If we wish NFTs to act as "digital liveable things" that can **change**, **evolve** or **be upgraded over time**?

A good example where all these problems could have effects is a video game. Game services could use an NFT to represent a unique item like a weapon. We might want the player to have the ability to upgrade the weapon features over time so that it becomes more powerful.

## What does this Standard represent?

LSP8 Identifiable Digital Asset is a standard that aims to describe _non-fungible_ assets. _Non-fungible_ means that each asset is unique and different. They are distinguishable from each other and therefore not interchangeable.

Since every single asset is unique on its own, they are differentiated by a unique identifier: a `tokenId`. The identifier can be anything from a unique serial number to another [ERC725Y](https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725y) smart contract that contains information and metadata specific to this `tokenId`.

LSP8 solves the current problems of NFTs by using the ERC725Y standard as its base. By using a generic data key-value store, an LSP8 contract now comes with the following features:

- attaching an unlimited amount of information (= metadata), making the asset more customizable and unique.
- knowing when the metadata has been altered, as a `DataChanged` event will be emitted in ERC725Y.
- having metadata as a **hash reference** (= data reference), instead of a URL reference.

LSP8 assets are similar to [ERC721](https://eips.ethereum.org/EIPS/eip-721) tokens (NFTs). Their underlying base makes them different in terms of more customization and upgradability of their metadata over time. Such a feature set lets them become part of a new generation of unique assets known as **NFT 2.0**.

### NFT Metadata

One of the critical differences of LSP8 is that it allows representing each NFT as more than just a unique `tokenId` number. Each newly created `tokenId` (NFT) has its own metadata, that describes its uniqueness. Such metadata can refer to either:

- _off-chain metadata_ (a **JSON file URL** stored on IPFS, a public registry, or even permissioned or private servers) or
- _on-chain metadata_ (within another **ERC725Y smart contract**).

It is possible to know where the metadata for a specific `tokenId` is located by simply querying the LSP8 contract, giving the `tokenId` as an argument.

One benefit of using an ERC725Y metadata contract per singular `tokenId` or NFT is that users can edit the metadata related to this NFT. Changeability makes the metadata flexible and upgradable. It enables the representation of unique NFTs that can be altered over time.

## Types of `tokenId`

:::caution

It is recommended that the `tokenId` should not change over the lifecycle of the LSP8 contract.

:::

An LSP8 NFT can be represented in multiple ways, depending on the type of `tokenId` used as:

- a **number** (`uint256`) that increments on each newly minted NFT,
- a unique `bytes32` value (representing a _serial number_, for instance), or
- an ERC725Y contract.

![LSP8 tokenId = number](/img/lsp8-tokenid-number.jpeg)

---

![LSP8 tokenId = bytes32](/img/lsp8-tokenid-serial-number.jpeg)

### NFTs as ERC725Y Contract

If each NFT is represented by its own ERC725Y contract (= metadata contract), this contract contains information like:

- the `address` of the contract that minted this NFT or
- the `tokenId` of this NFT.

![LSP8 tokenId = ERC725Y contract](/img/lsp8-tokenid-erc725y.jpeg)

## References

- [LUKSO Standards Proposals: LSP8 - Identifiable Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)
