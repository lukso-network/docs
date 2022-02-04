---
sidebar_label: 'Introduction'
sidebar_position: 1
---

# NFT 2.0

:::success Useful Tip

The [Guides Section](../../guides/assets/create-lsp7-digital-asset.md) will take you through the process of creating a NFT and deploying it on the [L14 testnet](../../networks/l14-testnet.md), check out [universalprofile.cloud](https://universalprofile.cloud/). It lets you easily browse the deployed NFTs.

:::

NFT2.0 is a collective name for the new token and NFT standards: [LSP7-DigitalAsset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md) and [LSP8-IdentifiableDigitalAsset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md). These replace ERC20 and ERC721, which you would usually use on Ethereum.

> We have [LSP7 and LSP8 implementations that are backwards compatible with ERC20 and ERC721](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/main/contracts), but we highly recommend using the native ones.

The interfaces used to interact with these standards was inspired from [EIP1155](https://eips.ethereum.org/EIPS/eip-1155), a Multi-Token standard for multiple token types (fungible, non-fungible, or other configurations).

One of the main questions about NFT 2.0 is which characteristics make them the next generation of digital assets on the blockchain.

**How different are they compared to traditional ERC20 tokens / ERC721 NFTs?**

## How NFT 2.0 are different?

### Unlimited Metadata

Current tokens and NFTs standards do not have a standard way to attach information to themselves. Such information (= metadata) is crucial to make each tokens / NFTs as descriptive as possible, and make them unique assets on their own.

The current ERC20 / ERC721 standards only contain name, symbol and asset url internally. But how about if we would like to attach some more specific data to them? Like an icon, the creators of the asset, their utility and motive, or even the community they are attached to.

NFT 2.0 solves this problem by creating tokens and NFTs that use [ERC725Y](https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725y) under the hood. ERC725Y enables to create smart contracts with a very flexible and extensible storage. With ERC725Y as a backbone, it is then possible to attach any type of information or metadata to the token or NFT.

### Safer transfers

NFT 2.0 implement a `force` parameter, set to `false` by default. The intention behind it is to prevent accidental transfers, due to mistakes for instance (_eg: pasting the wrong recipient address, or making a typo in the recipient address_). It also aims to prevent transferring to unwanted or untrusted addresses. Such accidental transfers can result in assets lost forever.

In the LUKSO ecosystem, the `force` parameter restricts transfer to Externally Owned Accounts (EOA) or contracts that do not implement [LSP1 - Universal Receiver](../generic-standards/02-lsp1-universal-receiver.md). The reason behind this is that contracts that do not implement the [`universalReceiver`](../../standards/smart-contracts/lsp0-erc725-account.md#universalreceiver) functionality might not be able to register or transfer these assets after receiving them.

## LSP4 Digital Asset Metadata

Both standards are derived from [LSP4 - Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md). LSP4 is a metadata standard, that defines which keys can be used to represent a digital asset on the blockchain.

With ERC20 and ERC721, `name` and `symbol` were stored as (public) variables in the smart contract.
With LSP4, such informations are stored under the ERC725Y contract storage, under the keys `LSP4TokenName` and `LSP4TokenSymbol`.

## References

- [LUKSO Standards Proposals: LSP4 - Digital Asset Metadata (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md)
- [NFT NYC - Building Blocks for the New Creative Economy (Fabian Vogelsteller, Youtube)](https://www.youtube.com/watch?v=skA4Y-vvt5s&t=2s)
