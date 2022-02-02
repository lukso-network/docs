---
sidebar_label: 'LSP8 - Identifiable Digital Asset'
---

# LSP8 - Identifiable Digital Asset

:::caution This section is a work in progress.
:::

:::info Standard Document

[LSP8 - Identifiable Digital Asset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)

:::

LSP8 Identifiable Digital Asset is a standard that aims to describe _non-fungible_ assets. The term _non-fungible_ means that each asset are unique and different. They are distinguisable from each other, and therefore are not interchangeable.

LSP8 assets are similar in nature to [ERC721](https://eips.ethereum.org/EIPS/eip-721) tokens (NFTs)

Since every single asset is unique on its own, they are differentiated by a unique identifier: a `tokenId`. The identifier can be anything from a unique serial number, to another [ERC725Y](https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725y) Smart Contract that contains information and metadata specific to this `tokenId`.

## NFT Metadata

One of the key difference of LSP8 is that each newly created `tokenId` (NFT) has its own metadata, that describes its uniqueness. Such metadata can be a reference either:

- _off-chain_ (a **JSON file url** stored on IPFS, a public / private registry, etc...)
- _on-chain_ (an other **ERC725Y smart contract**)

It is possible to know where the metadata for a specific tokenID is located by simply querying the LSP8 contract, giving the `tokenID` as an argument.

## NFTs as ERC725Y contracts

If each NFT is represent by its own ERC725Y contract (= metadata contract), this contract contain informations like:

- the `address` of the contract that minted this NFT.
- the `tokenId` of this NFT.

## References

- [LUKSO Standards Proposals: LSP8 - Identifiable Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)
