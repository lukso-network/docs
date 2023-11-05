---
title: 'Standard Detection'
sidebar_position: 3
---

# Standard Detection

:::caution

The **`interfaceId`** and the **`SupportedStandards:{StandardName}`** data key is not the most secure way to check for a standard, as they could be set manually.

:::

There are two types of **LSP** standards used to interact with smart contracts on the LUKSO blockchain.

| Standard Type           | Description                                                                                                                                                | Examples                                                                                                                                                                                                                    |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Interface Standards** | **Standardize a set of functions**. <br/> Defines the functions that can be called on a smart contract and their expected parameters                       | [LSP0-ERC725Account](./universal-profile/lsp0-erc725account.md) <br/> [LSP6-KeyManager](./universal-profile/lsp6-key-manager.md) <br/> [LSP7-DigitalAsset](./tokens/LSP7-Digital-Asset.md)                                  |
| **Metadata Standards**  | **Standardize a set of ERC725Y data keys**. <br/> Informs about the data set by default on the contract and which data keys to query to retrieve such data | [LSP3-Profile-Metadata](./universal-profile/lsp3-profile-metadata.md) <br/> [LSP4-DigitalAsset-Metadata](./tokens/LSP4-Digital-Asset-Metadata.md) <br/> [LSP10ReceivedVaults](./universal-profile/lsp10-received-vaults.md) |

![Interface and metadata standards](/img/standards/standard-detection/standard-detection.jpeg)

## Interface Checks

:::tip

See the **[LSP Detection Guide](../learn/dapp-developer/standard-detection.md)** to lean how to check standardized metadata storage and interfaces.

:::
