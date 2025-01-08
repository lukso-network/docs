---
sidebar_label: 'LSP3 - Profile Metadata'
sidebar_position: 4
description: 'LUKSO LSP3-Profile-Metadata: a Metadata standard that defines specific data keys to describe a profile.'
---

# LSP3 - Profile Metadata

:::info Standard Specification

[LSP3 - Profile Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md)

:::

## Introduction

The implementation of the **[LSP0-ERC725Account](../accounts/lsp0-erc725account.md)** standard does not contain any metadata describing the account.

**LSP3-Profile-Metadata** is a Metadata standard that defines specific data keys to describe a profile. A Universal Profile combines the following two standards.

- **[LSP0-ERC725Account](../accounts/lsp0-erc725account.md)**: an interface for a smart contract-based account.
- **LSP3-Profile-Metadata**: a set of predefined [ERC725Y](../accounts/lsp0-erc725account.md#erc725y---generic-key-value-store) Data keys to describe the profile.

## ERC725Y Data Keys

:::tip Recommendation

Make sure to understand the **[ERC725Y Generic Key/Value Store](../erc725.md#erc725y---generic-data-keyvalue-store)** and **[LSP2 - ERC725YJSONSchema](../metadata/lsp2-json-schema.md)** Standards before going through the ERC725Y Data Keys.

:::

### `SupportedStandards:LSP3Profile`

```json
{
  "name": "SupportedStandards:LSP3Profile",
  "key": "0xeafec4d89fa9619884b600005ef83ad9559033e6e941db7d7c495acdce616347",
  "keyType": "Mapping",
  "valueType": "bytes4",
  "valueContent": "0x5ef83ad9"
}
```

This data key is used to know if the contract contains some metadata to display as a profile.

### `LSP3Profile`

This standardised data key exists to store the metadata that represent the profile metadata of any kind of contract (e.g: a Universal Profile, a Vault, etc...). This is useful when one might want to represent a specific contract with some form of "branding" to give a profile-like aspect to the smart contract.

For instance, the metadata could represent the following in these scenarios:

- a **Universal Profile**: to represent an individual, a brand, a company or a DAO.
- a digital **Vault**: to represent a saving account, a safe contains high value NFTs, or a list of items about to be put on auction by an auction house.

```json
{
  "name": "LSP3Profile",
  "key": "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
  "keyType": "Singleton",
  "valueType": "bytes",
  "valueContent": "VerifiableURI"
}
```

The value attached to this data key is a [VerifiableURI-encoded value](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#verifiableuri). It represents a reference to a [JSON file that describes the Profile MetaData](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md#lsp3profile). The file can be stored on a centralized or decentralized storage.

![LSP3Profile Metadata as JSON file on IPFS (diagram)](../../learn/universal-profile/img/profile-metadata-ipfs-explained.jpeg)

Inside the JSON file, the keys `profileImage` and `backgroundImage` can accept an array of images, defining an image with different dimensions, `width` and `height`. Picture scaling is helpful for client interfaces to download and serve the images with the most suitable dimensions instead of re-scale them afterward.

<details>
    <summary>Example of JSON File linked to <code>LSP3Profile</code> data key </summary>

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
        "url": "ipfs://QmPJESHbVkPtSaHntNVY5F6JDLW8v69M2d6khXEYGUMn7N",
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
        "url": "ipfs://QmPJESHbVkPtSaHntNVY5F6JDLW8v69M2d6khXEYGUMn7N"
      },
      {
        "width": 1024,
        "height": 576,
        "hashFunction": "keccak256(bytes)",
        "hash": "0xfce1c7436a77a009a97e48e4e10c92e89fd95fe1556fc5c62ecef57cea51aa37",
        "url": "ipfs://QmZc9uMJxyUeUpuowJ7AD6MKoNTaWdVNcBj72iisRyM9Su"
      }
    ]
  }
}
```

</details>

### `LSP12IssuedAssets`

**Universal Profiles** can create digital assets, such as [tokens and NFTs](../tokens/introduction.md). All assets (tokens and NFTs) created should be registered in the `LSP12IssuedAssets[]` Array.

The `LSP12IssuedAssetsMap:<address>` can then be used to know the asset type (_e.g., an [LSP7 token](../tokens/LSP7-Digital-Asset.md) or an [LSP8 NFT](../tokens/LSP8-Identifiable-Digital-Asset.md)_) by extracting the `bytes4` ERC165 interface id of the asset contract. Developers can extract this `bytes4` value from the value retrieved, first 4bytes.

```json
{
  "name": "LSP12IssuedAssets[]",
  "key": "0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd",
  "keyType": "Array",
  "valueType": "address",
  "valueContent": "Address"
}
```

```json
{
  "name": "LSP12IssuedAssetsMap:<address>",
  "key": "0x74ac2555c10b9349e78f0000<address>",
  "keyType": "Mapping",
  "valueType": "(bytes4,uint128)",
  "valueContent": "(Bytes4,Number)"
}
```

### `LSP5ReceivedAssets`

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

If the Universal Profile is used with the **[LSP6-KeyManager](../access-control/lsp6-key-manager.md)** and **[LSP1-UniversalReceiverDelegate](../accounts/lsp1-universal-receiver-delegate.md)**, the received assets will be automatically registered in the storage. To know how many different assets you have, you can query this data key.
