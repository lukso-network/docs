---
sidebar_label: 'LUKSO Standards'
sidebar_position: 3
description: 'LUKSO Standard Proposals (LSPs) overview: main features of LSPs, the difference between ERC721, ERC1155, LSP7, LSP8, and LUKSO phygital assets.'
---

# LUKSO Standard Proposals

## What are LUKSO Standard Proposals?

LUKSO Standard Proposals, often abbreviated as [LSPs](/standards/introduction.md), serve as the building blocks that can be used to create a wide range of features and possibilities for a new creative economy of blockchain accounts.

With LSPs, the mission is to have standards that facilitate using tools that abstract the blockchain complexity, effectively minimizing the technical problems users may encounter. The goal is to **make blockchain technology as user-friendly and accessible** as standard Web 2.0 technologies. This ease of use paves the way for broader acceptance and integration of blockchain systems in everyday digital interactions.

## Who can utilize LUKSO Standard Proposals?

[LSPs](/standards/introduction.md) are a public good and are entirely open source. They can be implemented directly on any EVM blockchain. While LSPs are implemented in Solidity by default, LUKSO ensures that the standardizations are kept platform-independent and can be rewritten in other languages for other blockchain architecture.

## What are the main features of LSPs?

- Tokens and NFTs get **extensible, standardized, and exchangeable** storage through a key-value scheme for any metadata or attached files using [LSP4](/standards/tokens/LSP4-Digital-Asset-Metadata).
- All contracts can also have **native rights management** and **permissions handling** by using [LSP6](/standards/access-control/lsp6-key-manager).
- Assets can be **anchored** directly to the blockchain **account's storage** using [LSP1](/standards/accounts/lsp1-universal-receiver), abandoning complex data fetching.
- Token IDs have an increased size and can map any serial number (for digital or physical products) on-chain, which also allows NFC integration.
- Developers and users can safely utilize **events from asset contracts**, regulate allowlists and blocklists, customize UI and app workflows, or create consensus for asset transfers using LSP1 Delegate.
- Assets have **built-in security for sending assets** to accounts without recovery, utilizing account abstraction with their force parameter in [LSP7](/standards/tokens/LSP7-Digital-Asset) and [LSP8](/standards/tokens/LSP8-Identifiable-Digital-Asset).
- Attached data can always be verified through hash integration in the [LSP2](/standards/metadata/lsp2-json-schema) schema.
- Assets can be **organized and managed in vaults** using [LSP9](/standards/accounts/lsp9-vault). Here, multiple services and games can have permissioned access for updating the asset data of user accounts.
- For NFTs, individual token IDs from a collection can have **separate metadata**, upgrades, creators, and behaviors, instead of just being limited to the logic of the mint contract.

## What's the recommended language for LSP development?

If you want to build on the LUKSO blockchain, the recommended programming language is Solidity. It is the implementation language of LSPs, the most commonly used language for the EVM, and the default implementation language for LSPs.

## Why are LSPs not proposed as ERCs?

While LUKSO Standard Proposals are compatible with any EVM blockchain by default and even utilize ERCs ([ERC165](https://eips.ethereum.org/EIPS/eip-165), [ERC173](https://eips.ethereum.org/EIPS/eip-173), [ERC725](https://eips.ethereum.org/EIPS/eip-725)) under the hood, they were proposed within a neutral space to build out a larger ecosystem of core standards that are all interoperable and cohesive with each other. This less noisy environment allowed us to move forward effectively and transparently to build out the initial [set of LSPs](https://github.com/lukso-network/LIPs).

## Why will LUKSO have an advantage in LSP adoption?

LUKSO has quite the advantage with first implementation as the whole user base will be **onboarded directly with Universal Profiles**. Furthermore, LUKSO subsidizes the gas of early adopters on the new chain.

## How many pictures or datasets can be added to NFTs 2.0?

Thanks to the LSP4-DigitalAsset-Metadata standard that is included in the [LSP7](/standards/tokens/LSP7-Digital-Asset) Token and [LSP8](/standards/tokens/LSP8-Identifiable-Digital-Asset) NFT standards, **assets can hold unlimited metadata** including images, videos, gifs, and text.

## When using the LSP9 Vault, is the NFT stored on-chain?

Yes, the [LSP9 Vault](/standards/accounts/lsp9-vault.md) is a subcontract of a UP. While the NFT contract is stored on-chain, some of its metadata will rely on a **storage solution link** that is specified in its **JSON schema**. This link can point to anything including centralized and decentralized storage solutions.

## Do LSPs specify a storage solution for contract data?

No, LSPs do not require the use of any specific data solution. Any content link can be attached to the contract. This means assets and profiles can use any existing and upcoming data solutions. The link can be specified in the JSON schema.

## What is the difference between ERC721, ERC1155, LSP7, and LSP8?

[ERC721](https://eips.ethereum.org/EIPS/eip-721) and [ERC1155](https://eips.ethereum.org/EIPS/eip-1155) are widely used Non-Fungible Token (NFT) standards on Ethereum. While they set off NFT adoption and were the first of their kind, they have certain limitations. Namely these standards lack metadata for the asset, limit the NFT's storage and attachments, and restrict potential interaction due to them not being updatable and having limited EOA management.

LUKSO's NFT standards, [LSP7](/standards/tokens/LSP7-Digital-Asset.md) and [LSP8](/standards/tokens/LSP8-Identifiable-Digital-Asset.md), are designed to overcome these limitations. These standards enhance NFT's interaction potential. For instance, when an asset is transferred, the sender and recipient are notified. You can also attach multiple owners, add various media content, and update its content over time.

Furthermore, LSP7 and LSP8 standardize the on-chain information available for these assets, thereby enhancing their traceability and enabling authenticity checks for NFTs. While ERC721 and ERC1155 provide a foundation for NFTs, LUKSO's LSP7 and LSP8 standards offer more sophisticated features and capabilities, catering to a broader range of use cases and improving the overall user experience. For more detailed information, check out the [LSP7](/standards/tokens/LSP7-Digital-Asset.md) and [LSP8](/standards/tokens/LSP8-Identifiable-Digital-Asset) documentation.

## How can I create an updatable NFT on LUKSO?

On the LUKSO network, NFTs can be made **updatable** with the [LSP8](/standards/tokens/LSP8-Identifiable-Digital-Asset) standard. While the underlying technology of the LUKSO network is similar to that of Ethereum, it differentiates itself through the use of these standards. The commonly used NFT standards on Ethereum, ERC721, and ERC1155 do not fully support updatable metadata for NFTs. This is a limitation that LUKSO's LSP8 standard seeks to address.

The LSP8 standard introduces a **standardized key-value store**, allowing metadata to be stored and updated over time. This makes NFTs on the LUKSO network dynamic, as their information can be altered after they are minted. For more detailed information please refer to the [LSP8](/standards/tokens/LSP8-Identifiable-Digital-Asset) documentation.

## How can I create a phygital asset on LUKSO?

Creating a hybrid between a physical and a digital asset on LUKSO involves using the [LSP7](/standards/tokens/LSP7-Digital-Asset) or [LSP8](/standards/tokens/LSP8-Identifiable-Digital-Asset) token standards. These standards offer a **flexible and updatable key-value store** for the data of the digital half on the blockchain to carry and update relevant information related to its physical counterpart. The managing instance of the token can then update information about the asset's physical aspect dynamically.

## How are asset creators verified using LSPs?

In the blockchain world, verifying the creator of digital assets is crucial to prevent scams and ensure authenticity. There are two primary LSP standards for creator verification:

- [LSP12 Issued Assets](/standards/metadata/lsp12-issued-assets/)
- and [LSP4](../../contracts/contracts/LSP4DigitalAssetMetadata/) having a [Creators List](/standards/tokens/LSP4-Digital-Asset-Metadata/#lsp4creators)

During the creation of an asset, Universal Profiles can be referenced as [LSP4Creators](/standards/tokens/LSP4-Digital-Asset-Metadata/#lsp4creators). However, to verify the creator, these profiles must also link to the asset on their [ERC725Y data storage](/standards/erc725.md#erc725y-data-representation) using the [LSP12 Issued Assets](/standards/metadata/lsp12-issued-assets/) array. The cross-check ensures that creators get the recognition they deserve and users can trust the authenticity of assets. Platforms can then check if the asset is referenced on the Universal Profile, preventing impersonation and spam.
