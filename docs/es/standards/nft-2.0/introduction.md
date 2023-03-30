---
sidebar_label: 'Introduction'
sidebar_position: 1
---

# Tokens & NFT 2.0

:::success Useful Tip

The [guide section](../../guides/digital-assets/create-lsp7-digital-asset.md) will walk you through creating and deploying an LSP7 token or an LSP8 NFT on the [L14 test network](../../networks/l14-testnet.md).

Check the [profile explorer](https://universalprofile.cloud/) to browse the deployed digital assets.

:::

## Introduction  

The current standards representing fungible and non-fungible tokens (NFTs) are limiting the NFTs and token industry as they lack standardization and many powering features.

The lack of standardization can be seen through each NFT or token standard implementing its own interface with its own function names. This leads to having multiple token contracts deployed on networks, implementing different interfaces, and being non-interoperable between each other.

As for features, these standards are just representing **incremental tokenIds** without proper metadata, asset representation, standard interaction between sender and receivers, and no security measurements to ensure safe asset transfers.

**Tokens & NFT 2.0** is a collective name for the new token and NFT standards **[LSP7-DigitalAsset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)** and **[LSP8-IdentifiableDigitalAsset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)**. These replace ERC20 and ERC721, which you would usually use on other networks.


## Tokens & NFT 2.0


| Standard                                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[   LSP4 - DigitalAssetMetadata    ](./LSP4-Digital-Asset-Metadata.md)**                                    | The standard used by both **LSP7** & **LSP8** to provide proper **metadata** to the asset with standard ERC725Y Data Keys.  |
| **[LSP7-DigitalAsset](./LSP7-Digital-Asset.md)**                                | Similar to ERC20 Standard, LSP7 represents **fungible tokens** standard with proper metadata, more secure transfers and more interactive transfer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **[LSP8-IdentifiableDigitalAsset](./LSP8-Identifiable-Digital-Asset.md)** | Similar to ERC721 and ERC1155 Standard, LSP8 represents **non-fungible tokens (NFTs)** standard with proper metadata, more secure transfers, more asset representation and more interactive transfer.                                                                                                                                                                                                                                                                                                                                                      |



## References

- [NFT NYC - Building Blocks for the New Creative Economy (Fabian Vogelsteller, Youtube)](https://www.youtube.com/watch?v=skA4Y-vvt5s&t=2s)
