---
sidebar_position: 2
title: LSP4DigitalAssetMetadata
---

# LSP4DigitalAssetMetadata

## uploadMetadata

```js
LSP4DigitalAssetMetadata.uploadMetadata(lsp4Metadata, uploadOptions?);
```

Uploads and processes passed assets and images, and uploads the [LSP4 Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md) to IPFS.
The `uploadMetadata` function is available as a static or non-static function callable on the `LSPFactory` library instance.

If `uploadOptions` are not specified in the function call, and the function is used on an `LSPFactory` instance, the specified options in `uploadOptions` that were passed to the LSPFactory during instantiation will be used.

#### Parameters

| Name             | Type   | Description                                            |
| :--------------- | :----- | :----------------------------------------------------- |
| `metaData`       | Object | The metadata to be uploaded.                           |
| `uploadOptions?` | Object | The specification how the metadata should be uploaded. |

#### Parameters of `metaData`

| Name          | Type                                             | Description                         |
| :------------ | :----------------------------------------------- | :---------------------------------- |
| `description` | string                                           | A description of the digital asset. |
| `links?`      | {&nbsp;title: string, url: string&nbsp;}[&nbsp;] | The links of the digital asset.     |
| `icon?`       | File, AssetBuffer, or AssetMetadata[&nbsp;]      | The icon of the digital asset.      |
| `images?`     | File, AssetBuffer, or AssetMetadata[&nbsp;]      | The images of the digital asset.    |
| `assets?`     | File, AssetBuffer, or AssetMetadata[&nbsp;]      | The assets of the digital asset.    |

#### Parameters of `uploadOptions?`

| Name                 | Type   | Description                                                                       |
| :------------------- | :----- | :-------------------------------------------------------------------------------- |
| `ipfsClientOptions?` | Object | IPFS Client Options as defined by the [ipfs-http-client library] used internally. |

#### Returns

| Name      | Type                       | Description                               |
| :-------- | :------------------------- | :---------------------------------------- |
| `Promise` | <LSP4MetadataForEncoding\> | The processed [LSP4] data and upload URL. |

#### Upload LSP4 Metadata Example

```javascript title="Uploading LSP4Metadata"
const image = new File();
const icon = new File();
const asset = new File();
await LSP4DigitalAssetMetadata.uploadMetadata(
    {
        description: "Digital Asset",
        assets: [asset],
        images: [image],
        icon: icon,
        links: [{ title: "Cool", url: "cool.com" }],
    };
);
/**
{
  lsp4Metadata: {
    LSP4Metadata: {
      description: 'Digital Asset',
      assets: [Array],
      images: [Array],
      icon: [Array],
      links: [Array]
    }
  },
  url: 'ipfs://QmXJxJePjm6A9TSC4m32GN6h3PknVY2C4HqNaBEF6EeuGB'
}
*/
```

#### Upload Custom LSP4 Metadata Example

```javascript title="Uploading LSP4Metadata using custom uploadOptions"
await LSP4DigitalAssetMetadata.uploadMetadata(
  {
    description: 'Digital Asset',
    assets: [asset],
    images: [image],
    icon: icon,
    links: [{ title: 'Cool', url: 'cool.com' }],
  },
  {
    ipfsUploadOptions: {
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    },
  }
);
/**
{
  lsp4Metadata: {
    LSP4Metadata: {
      description: 'Digital Asset',
      assets: [Array],
      images: [Array],
      icon: [Array],
      links: [Array]
    }
  },
  url: 'ipfs://QmXJxJePjm6A9TSC4m32GN6h3PknVY2C4HqNaBEF6EeuGB'
}
*/
```

#### Upload Custom LSP4 Metadata with LSP Factory Example

```javascript title="Uploading LSP4Metadata using uploadOptions passed when instantiating LSPFactory"
const lspFactory = new LSPFactory(provider, {
  deployKey: myDeployKey,
  chainId: myChainId,
  uploadOptions: {
    ipfsClientOptions: {
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    },
  },
});
await lspFactory.LSP4DigitalAssetMetadata.uploadMetadata({
  description: 'Digital Asset',
  assets: [asset],
  images: [image],
  icon: icon,
  links: [{ title: 'Cool', url: 'cool.com' }],
});
/**
{
  lsp4Metadata: {
    LSP4Metadata: {
      description: 'Digital Asset',
      assets: [Array],
      images: [Array],
      icon: [Array],
      links: [Array]
    }
  },
  url: 'ipfs://QmXJxJePjm6A9TSC4m32GN6h3PknVY2C4HqNaBEF6EeuGB'
}
*/
```

[ipfs-http-client library]: https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions
[lsp4]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
