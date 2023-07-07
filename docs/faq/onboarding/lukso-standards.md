---
sidebar_label: 'LUKSO Standards'
sidebar_position: 3
---

# LUKSO Standard Proposals

### What are LUKSO Standard Proposals?

LUKSO Standard Proposals, often abbreviated as LSPs, serve as building blocks designed to create a wide range of features and possibilities for a new creative economy of blockchain accounts.

With LSPs, the mission is to have standards that facilitate using tools that abstract the blockchain complexity, effectively minimizing the technical problems users may encounter. The goal is to **make blockchain technology as user-friendly and accessible** as the standard Web 2.0 technologies. This ease of use paves the way for broader acceptance and integration of blockchain systems in everyday digital interactions.

### Who can utilize LUKSO Standard Proposals?

LSPs can be seen as a public good and are entirely open source. They can be directly implemented on any EVM blockchain. While LSPs are implemented in Solidity by default, LUKSO ensures that the standardizations are kept platform-independent to be rewritten for other languages or blockchain architecture.

### What are the main features of LSPs?

- Tokens and NFTs get **extensible, standardized, and exchangeable** storage through a key-value scheme for any metadata or attached files using LSP4.
- All contracts can also have **native right management** and **permission handling** by using LSP6.
- Assets can be **anchored** directly to the blockchain **account's storage** using LSP1, abandoning complex data fetching.
- Token IDs have an increased size and can map any serial number of digital or physical products on-chain, even allowing NFC integration.
- Developers and users can safely utilize **events from asset contracts**, regulate allowlists and blocklists, customize UI and app workflows, or create consensus for asset transfers using LSP1 Delegate.
- Assets have **built-in security for sending assets** to accounts without recovery, utilizing account abstraction with their force parameter in LSP7 and LSP8.
- Attached data can always be verifiable through hash integration in the LSP2 schema.
- Assets can be **organized and managed in vaults** using LSP9. Here, multiple services and games could have specific access to updating asset data in subfolders of someone's account on their behalf.
- For NFTs, individual token IDs from a collection can have **separate metadata**, upgrades, creators, and behaviors, instead of just being limited to the logic in the mint contract.

### What's the recommended language for LSP development?

If you want to build on the LUKSO blockchain, the recommended programming language is Solidity. It is the implementation language of LSPs, the most commonly used language for the EVM, and the default implementation for LSPs.

### Why are LSPs not proposed as ERCs?

While LUKSO Standard Proposals are compatible with any EVM blockchain by default and even utilize ERCs ([ERC165](https://eips.ethereum.org/EIPS/eip-165), [ERC173](https://eips.ethereum.org/EIPS/eip-173), [ERC725](https://eips.ethereum.org/EIPS/eip-725)) under the hood, they were proposed within a neutral space to build out a larger ecosystem of core standards that are all interoperable and cohesive within each other. The less noisy environment allowed us to move forward effectively and transparently build out the initial [set of LSPs](https://github.com/lukso-network/LIPs).

### Why will LUKSO have an advantage in LSP adoption?

LUKSO has quite an advantage on first implementations, as the whole user base will be **directly onboarded through Universal Profiles**, setting the perfect environment for LSPs without creating sub-sections. Furthermore, LUKSO can subsidize early adopters on the new chain until a substantial user base is reached. Other networks must update to the new behaviors instead, as they have already onboarded people with other tools or standards.

### How many pictures or datasets can be added to NFTs 2.0?

Thanks to the LSP4-DigitalAsset-Metadata standard that is used within [LSP7](https://docs.lukso.tech/standards/nft-2.0/LSP7-Digital-Asset) Token and [LSP8](https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset) NFT, an asset can hold unlimited metadata, which could store or link to multiple images, videos, gifs, and texts if needed. These datasets could then also be updated if configured.

### When using the LSP9 Vault, does the NFT store on-chain?

Yes. The vault is a subcontract of the owned UP smart contract account on-chain, with its contracts sent to them. While the NFT contract is stored on-chain, most of its metadata and contents will come from the **storage solution link** you specified in the **JSON schema**. The link could point to any data hub, home environment, or decentralized storage application.

### Do LSPs define the storage solution of the contract’s data?

No, the LSPs do not specify the type of storage solution. Any content link can be attached to the contract. This allows assets and profiles to be stored across various existing and upcoming data solutions. The link can be specified in the JSON schema.

### What is the difference between ERC721, ERC1155, LSP7, and LSP8?

[ERC721](https://eips.ethereum.org/EIPS/eip-721) and [ERC1155](https://eips.ethereum.org/EIPS/eip-1155) are widely used Non-Fungible Token (NFT) standards on Ethereum. While they sent off the NFT adoption and were the first of their kind, they have certain limitations. By default, the standards lack metadata for the asset, limit the NFT's storage and attachments, and restrict interaction capabilities due to not being updatable and only having simple EOA management.

LUKSO's NFT standards, namely [LSP7](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md) and [LSP8](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md), are designed to overcome these limitations. The standards enhance the interaction potential. For instance, when an asset is transferred, the sender and recipient are notified. You can also attach multiple owners, add various media content, and update its content over time.

Furthermore, LSP7 and LSP8 allow on-chain information storage about the asset in a standardized format, thereby enhancing the traceability and authenticity verification of the NFT. While ERC721 and ERC1155 provide a foundation for NFTs, LUKSO's LSP7 and LSP8 standards offer more sophisticated features and capabilities, catering to a broader range of use cases and improving overall user experience. For more detailed information, check out the [LSP7](https://docs.lukso.tech/standards/nft-2.0/LSP7-Digital-Asset) and [LSP8](https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset) documentation.

### How can I create an updatable NFT on LUKSO?

On the LUKSO network, NFTs can be made **updatable** using certain standards, specifically the LSP8 standard. While the underlying technology of the LUKSO network is similar to that of Ethereum, it differentiates itself through the use of advanced standards. The commonly used NFT standards on Ethereum, ERC721, and ERC1155 do not fully support updatable metadata for NFTs. This is a limitation that LUKSO's LSP8 standard seeks to address.

The LSP8 standard introduces a **standardized key-value store**, allowing metadata to be stored and updated over time. This makes NFTs on the LUKSO network dynamic, as their information can be altered after they are minted. For more detailed information on achieving this, please refer to the [LSP8](https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset) documentation.

### How can I create a phygital asset on LUKSO?

Creating a hybrid between a physical and a digital asset on LUKSO involves using the [LSP7](https://docs.lukso.tech/standards/nft-2.0/LSP7-Digital-Asset) or [LSP8](https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset) token standards. These standards offer a **flexible and updatable key-value store** for the data of the digital half on the blockchain to carry and update relevant information related to its physical counterpart. The managing instance of the token can then update information about the asset's physical aspect dynamically.
