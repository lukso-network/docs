---
sidebar_label: 'LSP3 - Universal Profile - Metadata'
sidebar_position: 4
---

# LSP3 - Universal Profile Metadata

:::info Standard Document

[LSP3 - Universal Profile Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)

:::

## Introduction

The implementation of the **[LSP0-ERC725Account](#)** standard does not contain any metadata describing the account.   

**[LSP3-UniversalProfile-Metadata](#)** is a Metadata standard that aims to define specific keys that desribes an account. A Universal Profile is a combination between **LSP0-ERC725Account**, a smart contract based account, and **LSP3-UniversalProfile-Metadata**, a set of predefined ERC725Y keys that describes the account.

## ERC725Y Keys

### SupportedStandards:LSP3UniversalProfile

```json
{
    "name": "SupportedStandards:LSP3UniversalProfile",
    "key": "0xeafec4d89fa9619884b6b89135626455000000000000000000000000abe425d6",
    "keyType": "Mapping",
    "valueType": "bytes4",
    "valueContent": "0xabe425d6"
}
```
This key is used to know whether the account represent a **UniversalProfile** or a normal account.

### LSP3Profile


```json
{
    "name": "LSP3Profile",
    "key": "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
    "keyType": "Singleton",
    "valueType": "bytes",
    "valueContent": "JSONURL"
}
```

The value attached to this key is a JSON URL. It represents a reference to a file, stored on a centralised or decentralised storage.

Inside the JSON file, the keys `profileImage` and `backgroundImage` can accept an array of images, each defining an image with different dimensions (width + height). This is useful for client interfaces, so that they can download and serve the image with the dimensions that is the most suitable, instead of having to re-scale it.

### LSP3IssuedAssets

```json
{
    "name": "LSP3IssuedAssets[]",
    "key": "0x3a47ab5bd3a594c3a8995f8fa58d0876c96819ca4516bd76100c92462f2f9dc0",
    "keyType": "Array",
    "valueContent": "Address",
    "valueType": "address"
}
```

Universal Profiles have the capabilities to create digital assets, such as tokens and NFTs. Every token created should be registred in this array key.
