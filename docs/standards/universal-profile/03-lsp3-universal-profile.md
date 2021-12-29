---
sidebar_label: 'LSP3 - Universal Profile'
sidebar_position: 4
---

# Universal Profile

LSP3 is a standard that aims to define a Universal Profile. It is based

LSP3 is a Metadata standard. It defines a set of ERC725Y key that can be used to describe a Universal Profile.

This standard is based on ERC725Account.

A Universal Profile contains the following main keys:

## LSP3Profile

The value attached to this key is a JSON URL. It represents a reference to a file, stored on a centralised or decentralised storage.

*Figure of UP with link to IPFS*

Inside the JSON file, the keys `profileImage` and `backgroundImage` can accept an array of images, each defining an image with different dimensions (width + height). This is useful for client interfaces, so that they can download and serve the image with the dimensions that is the most suitable, instead of having to re-scale it.

## LSP3IssuedAssets

Universal Profiles have the capabilities to create digital assets, such as tokens and NFTs. They are