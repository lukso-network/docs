---
sidebar_label: 'LSP3 - Universal Profile Metadata'
sidebar_position: 4
---

# LSP3 - Universal Profile Metadata

:::info Standard Document

[LSP3 - Universal Profile Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)

:::

## Introduction

The implementation of the **[LSP0-ERC725Account](./lsp0-erc725account.md)** standard does not contain any metadata describing the account.

**LSP3-UniversalProfile-Metadata** is a Metadata standard that defines specific data keys to describe a Universal Profile. A Universal Profile combines the following two standards.

- **[LSP0-ERC725Account](./lsp0-erc725account.md)**: an interface for a smart contract-based account.
- **LSP3-UniversalProfile-Metadata**: a set of predefined [ERC725Y](lsp0-erc725account.md#erc725y---generic-key-value-store) Data keys to describe the profile.

## ERC725Y Data Keys

### `SupportedStandards:LSP3UniversalProfile`

```json
{
  "name": "SupportedStandards:LSP3UniversalProfile",
  "key": "0xeafec4d89fa9619884b60000abe425d64acd861a49b8ddf5c0b6962110481f38",
  "keyType": "Mapping",
  "valueType": "bytes4",
  "valueContent": "0xabe425d6"
}
```

This data key is used to know if the contract represents a **Universal Profile**.

### `LSP3Profile`

```json
{
  "name": "LSP3Profile",
  "key": "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
  "keyType": "Singleton",
  "valueType": "bytes",
  "valueContent": "JSONURL"
}
```

The value attached to this data key is a [JSONURL-encoded value](../../standards/generic-standards/lsp2-json-schema.md). It represents a reference to a [JSON file that describes the Universal Profile MetaData](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp3profile). The file can be stored on a centralized or decentralized storage.

Inside the JSON file, the keys `profileImage` and `backgroundImage` can accept an array of images, defining an image with different dimensions, `width` and `height`. Picture scaling is helpful for client interfaces to download and serve the images with the most suitable dimensions instead of re-scale them afterward.

<details>
    <summary>Example of JSON File linked to <code>LSP3Profile</code>data key </summary>

```json
{
  "LSP3Profile": {
    "name": "frozeman",
    "description": "The inventor of ERC725 and ERC20...",
    "links": [
      { "title": "Twitter", "url": "https://twitter.com/feindura" },
      { "title": "lukso.network", "url": "https://lukso.network" }
    ],
    "tags": ["brand", "public profile"],
    "avatar": [
      {
        "hashFunction": "keccak256(bytes)",
        "hash": "0x98fe032f81c43426fbcfb21c780c879667a08e2a65e8ae38027d4d61cdfe6f55",
        "url": "ifps://QmPJESHbVkPtSaHntNVY5F6JDLW8v69M2d6khXEYGUMn7N",
        "fileType": "fbx"
      }
    ],
    "profileImage": [
      {
        "address": 0x1231c7436a77a009a97e48e4e10c92e89fd95fe15, // the address of an LSP7 or LSP8
        "tokenId": 0xdde1c7436a77a009a97e48e4e10c92e89fd95fe1556fc5c62ecef57cea51aa37 // (optional) if token contract is an LSP7
      }
    ],
    "backgroundImage": [
      {
        "width": 1800,
        "height": 1013,
        "hashFunction": "keccak256(bytes)",
        "hash": "0x98fe032f81c43426fbcfb21c780c879667a08e2a65e8ae38027d4d61cdfe6f55",
        "url": "ifps://QmPJESHbVkPtSaHntNVY5F6JDLW8v69M2d6khXEYGUMn7N"
      },
      {
        "width": 1024,
        "height": 576,
        "hashFunction": "keccak256(bytes)",
        "hash": "0xfce1c7436a77a009a97e48e4e10c92e89fd95fe1556fc5c62ecef57cea51aa37",
        "url": "ifps://QmZc9uMJxyUeUpuowJ7AD6MKoNTaWdVNcBj72iisRyM9Su"
      }
    ]
  }
}
```

</details>

### LSP3IssuedAssets

**Universal Profiles** can create digital assets, such as [tokens and NFTs](../nft-2.0/introduction.md). All assets (tokens and NFTs) created should be registered in the `LSP3IssuedAssets[]` Array.

The `LSP3IssuedAssetsMap:<address>` can then be used to know the asset type (_e.g., an [LSP7 token](../nft-2.0/LSP7-Digital-Asset.md) or an [LSP8 NFT](../nft-2.0/LSP8-Identifiable-Digital-Asset.md)_) by extracting the `bytes4` ERC165 interface id of the asset contract. Developers can extract this `bytes4` value from the value retrieved, starting at the 8th byte (_index 7_).

```json
{
  "name": "LSP3IssuedAssets[]",
  "key": "0x3a47ab5bd3a594c3a8995f8fa58d0876c96819ca4516bd76100c92462f2f9dc0",
  "keyType": "Array",
  "valueContent": "Address",
  "valueType": "address"
}
```

```json
{
  "name": "LSP3IssuedAssetsMap:<address>",
  "key": "0x83f5e77bfb14241600000000<address>",
  "keyType": "Mapping",
  "valueType": "bytes",
  "valueContent": "Mixed"
}
```

### LSP5ReceivedAssets

:::info

See the [LSP5 - Received Assets](./lsp5-received-assets.md) standard page for more information.

:::

```json
{
  "name": "LSP5ReceivedAssets[]",
  "key": "0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b",
  "keyType": "Array",
  "valueType": "address",
  "valueContent": "Address"
}
```

If the Universal Profile is used with the **[LSP6-KeyManager](./lsp6-key-manager.md)** and **[LSP1-UniversalReceiverDelegate](./lsp1-universal-receiver-delegate.md)**, the received assets will be automatically registered in the storage. To know how many different assets you have, you can query this data key.
