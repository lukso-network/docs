---
title: LUKSO Standard Proposals
description: LUKSO Frequently Asked Questions
sidebar_position: 3
---

# Frequently Asked Questions

## What are LUKSO Standard Proposals ?

LUKSO Standard Proposals, often abbreviated as **LSPs**, serve as building blocks designed to create a wide range of features and possibilities within the LUKSO ecosystem and other similar blockchain networks. With these LSPs, the mission is to have standards that facilitate the use of blockchain tools that abstract the blockchain complexity, effectively minimizing the technical problems users may encounter. By abstracting this complexity, LSPs make blockchain technology as user-friendly and accessible as the familiar Web 2.0 technologies. This ease of use paves the way for broader acceptance and integration of blockchain systems in our everyday digital interactions.

## Why are LSPs not proposed as ERCs?

The LUKSO Standard Proposals (LSPs) are part of a larger set of core standards that are all interoperable and cohesive together. Nonetheless, they do function equally for any EVM chain, the ability to make these standards understood requires a less noisy and neutral place than the current ERC space.

Therefore, we consider a separate repo **[(LIPs/LSPs)](https://github.com/lukso-network/LIPs)** to be necessary for the success and transparency of these new sets of standards, many of which use ERCs (ERC165, ERC173, ERC725) as a core basis.

## What is a transaction Relayer?

A transaction relayer service, often just referred to as a "relayer", is a solution designed to improve the blockchain user experience by addressing the issue of gas fees - the costs users pay when executing transactions on a blockchain network.

Normally, users need to possess the blockchain's native coin to pay these gas fees. However, a relayer works around this problem. When a user want to execute a transaction, he could sign a message from their account and send it to the relayer, the relayer then will have the permission and ability to execute transactions on their behalf. Essentially, the relayer pays the gas fees for the user.

Payment to the relayer can be handled in different ways. One option is an on-chain payment where the fees are deducted directly from a balance within the blockchain. Alternatively, users can set up an off-chain agreement with the relayer service, via a subscription that give them a monthly allowance for relayed transactions. This flexibility allows users to choose the method that best suits their needs.

## What is a Social Recovery?

For conventional Ethereum accounts, also known as Externally Owned Accounts (EOAs), loosing your private key can be disastrous, as it's the sole means of accessing your account. If it's lost, access to the account and all its associated assets are lost as well.

However, with smart contract-based accounts like Universal Profiles, a more flexible and secure solution is available: Social Recovery. With Social Recovery, users can set up a recovery process that fits their needs. For instance, recovery could require permissions from pre-set trusted individuals (often called "guardians") or the provision of a secret phrase known only to the user, or even a combination of these methods.

This process enables users to regain access to their accounts securely, even if they lose the private key controlling the account, making the blockchain experience much more user-friendly and less risky.

## What's the difference between ERC721 and LUKSO's NFT Standards?

ERC721 and ERC1155 are widely used NFT (Non-Fungible Token) standards on Ethereum but they have certain limitations, such as a lack of metadata for the asset, limited NFT representation, and restricted interaction capabilities.

LUKSO's NFT standards, namely LSP7 and LSP8, are designed to overcome these limitations. These standards enhance the interaction potential; for instance, when an asset is transferred, both the sender and recipient are notified.

Furthermore, LSP7 and LSP8 allow for on-chain information storage about the asset in a standardized format, thereby enhancing the traceability and authenticity verification of the NFT. This makes the representation of complex NFTs, like game characters that can execute certain actions, possible.

Thus, while both ERC721 and ERC1155 provide a foundation for NFTs, LUKSO's LSP7 and LSP8 standards offer more sophisticated features and capabilities, catering to a wider range of use-cases and improving overall user experience. For more detailed information, check out the [LSP7](../standards/nft-2.0/LSP7-Digital-Asset.md) and [LSP8](../standards/nft-2.0/LSP8-Identifiable-Digital-Asset.md) documentation.
