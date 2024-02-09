---
sidebar_label: '🔗 Using NFC on LUKSO'
description: 'Learn how NFC technology can be used on LUKSO blockchain for innovative applications.'
sidebar_position: 10
---

# Using NFC on LUKSO

This guide will explore the essential considerations for effectively integrating [NFC technology] within the LUKSO ecosystem.

## Introduction

The use of NFC within the blockchain space offers significant advantages, particularly in connecting physical items to their digital counterparts on the blockchain which enables verification of ownership, providing a transparent view of current and historical holders. Such a connection is beneficial for tracking the ownership history of physical items and understanding the collections they are part of.

Additionally, NFC-enabled NFTs can prove participation in real-world events like concerts and meetups. By scanning an NFC chip at the event location, attendees can mint unique NFTs, which could later grant them access to exclusive content or rewards. This technology fosters a new level of interaction between creators, designers, and their communities, enhancing engagement and offering tangible to loyal supporters.

## LSPs Compatibility

Typically, NFC and NFT integrations work by scanning an NFC chip, which redirects to a link or an app. This app is responsible for verifying ownership or triggering a transfer of an NFT to a user's account. Traditional setups often involve the NFT being held in an Externally Owned Account (EOA) and created according to the [ERC721] Token standard. However, for compatibility with the LUKSO ecosystem, there are important considerations to keep in mind, which involve the nature of the account holding the NFT and the token standards used.

### Main Account

In the context of LUKSO, the primary account for users is not a traditional Externally Owned Account [(EOA)], but a [UniversalProfile](../../standards/universal-profile/introduction.md), which is a smart contract-based account. This shift brings numerous advantages over EOAs, particularly in terms of flexibility and functionality. When integrating NFC with NFTs on LUKSO, it's crucial to ensure that the NFTs are compatible with smart contract accounts as recipients.

### Token Standards

LUKSO's ecosystem utilizes specific token standards, mainly **[LSP7-DigitalAsset](../../standards/tokens/LSP7-Digital-Asset.md)** and **[LSP8-IdentifiableDigitalAsset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md)**, which offer significant improvements over the traditional [ERC721] standard. These standards provide enhanced features such as richer metadata and more robust asset interactions. When developing NFC-based solutions for LUKSO, aligning with these standards ensures a better user experience.

## Conclusion

The NFC designed to be working on any EVM network will work on LUKSO but won't be compatible with its ecosystem, because the LUKSO ecosystem uses [different tools and standards](../migrate-to-lukso.md) than the one available on Ethereum. The only difference that needs to be made is to use the new token standards instead of [ERC721] or [ERC1155].

### Further Information

- [Phygital Hackathon Project Video](https://www.youtube.com/watch?v=NZiShK34YZ8).
- [Phygital Hackathon Project Github](https://github.com/Tuszy/phygital).

[ERC721]: https://eips.ethereum.org/EIPS/eip-721
[ERC1155]: https://eips.ethereum.org/EIPS/eip-1155
[(EOA)]: https://ethereum.org/developers/docs/accounts
[NFC technology]: https://en.wikipedia.org/wiki/Near-field_communication
