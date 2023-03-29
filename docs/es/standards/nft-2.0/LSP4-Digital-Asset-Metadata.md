---
sidebar_label: 'LSP4 - Digital Asset Metadata'
sidebar_position: 2
---

# LSP4 - Digital Asset Metadata

:::info Standard Document

[LSP4 - Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md)

:::

## Introduction

The existing tokens and NFTs standards offer limited functionalities to attach information to the contracts themselves. As an example, the ERC20 and ERC721 standards only define a **`name()`**, **`symbol()`**, and **`tokenURI()`** functions. This makes it difficult to add information more specific to the asset (_e.g., an icon, the asset creator(s) , the utility or motive of the token, the community behind it, etc...). Such information is crucial to make each token or NFT descriptive and customised.

**LSP4-DigitalAsset-Metadata** solves this problem by defining a set of data keys to describe a **Digital Asset** using [ERC725Y](https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725y) as a backbone. ERC725Y enables smart contracts to have very flexible and extensible storage. With ERC725Y, any information or metadata can be attached to the token or NFT.

![LSP4 Digital Asset Metadata diagram](/img/standards/lsp4/lsp4-digital-asset-metadata-diagram.png)

## ERC725Y Data Keys

:::tip Recommendation

Make sure to understand the **[ERC725Y Generic Key/Value Store](../lsp-background/erc725.md#erc725y---generic-data-keyvalue-store)** and **[LSP2 - ERC725YJSONSchema](../generic-standards/lsp2-json-schema.md)** Standards before going through the ERC725Y Data Keys.

:::

### `SupportedStandards:LSP4DigitalAsset`

```json
{
  "name": "SupportedStandards:LSP4DigitalAsset",
  "key": "0xeafec4d89fa9619884b60000a4d96624a38f7ac2d8d9a604ecf07c12c77e480c",
  "keyType": "Mapping",
  "valueType": "bytes4",
  "valueContent": "0xa4d96624"
}
```

This key is used to know if the contract represents a **Digital Asset**.

### `LSP4TokenName`

```json
{
  "name": "LSP4TokenName",
  "key": "0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1",
  "keyType": "Singleton",
  "valueType": "string",
  "valueContent": "String"
}
```

The value attached to this data key represents the name of the digital asset.

### `LSP4TokenSymbol`

```json
{
  "name": "LSP4TokenSymbol",
  "key": "0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756",
  "keyType": "Singleton",
  "valueType": "string",
  "valueContent": "String"
}
```

The value attached to this data key represents the symbol of the digital asset.

### `LSP4Metadata`

```json
{
  "name": "LSP4Metadata",
  "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
  "keyType": "Singleton",
  "valueType": "bytes",
  "valueContent": "JSONURL"
}
```

The value attached to this data key is a [`JSONURL`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#jsonurl). It represents a reference to a [JSON file describing the **Digital Asset**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4metadata). The file can be stored on centralized or decentralized storage.

### `LSP4Creators`

This data key refers to the **address(es)** of the **creator(s)** of the digital asset. It can help to check the **asset authenticity** when combined with **[LSP12-IssuedAssets](../universal-profile/lsp12-issued-assets.md)**.

```json
{
  "name": "LSP4Creators[]",
  "key": "0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7",
  "keyType": "Array",
  "valueType": "address",
  "valueContent": "Address"
}
```

```json
{
  "name": "LSP4CreatorsMap:<address>",
  "key": "0x6de85eaf5d982b4e5da00000<address>",
  "keyType": "Mapping",
  "valueType": "(bytes4,bytes8)",
  "valueContent": "(Bytes4,Number)"
}
```

## References

- [LUKSO Standards Proposals: LSP4 - Digital Asset Metadata (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md)
