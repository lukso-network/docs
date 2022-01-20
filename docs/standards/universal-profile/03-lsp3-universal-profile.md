---
sidebar_label: 'LSP3 - Universal Profile'
sidebar_position: 4
---

# LSP3 - Universal Profile

:::caution this section is a work in progress

:::

LSP3 is a Metadata standard that aims to define a Universal Profile. A Universal Profile is a smart contract based profile, that contains some specific ERC725Y keys that describes the profile.

This standard is based on ERC725Account. Therefore, a Universal Profile can:

- interact with any address or contracts ([ERC725X](./lsp0-erc725account.md#erc725x---generic-executor)).
- be attached any information ([ERC725Y](./lsp0-erc725account#erc725y---generic-key-value-store)).

A Universal Profile contains the following main keys:

## LSP3Profile

The value attached to this key is a JSON URL. It represents a reference to a file, stored on a centralised or decentralised storage.

Inside the JSON file, the keys `profileImage` and `backgroundImage` can accept an array of images, each defining an image with different dimensions (width + height). This is useful for client interfaces, so that they can download and serve the image with the dimensions that is the most suitable, instead of having to re-scale it.

## LSP3IssuedAssets

Universal Profiles have the capabilities to create digital assets, such as tokens and NFTs. They are
