---
sidebar_position: 1.2
title: LSP4DigitalAssetMetadata
---

# LSP4DigitalAssetMetadata

## uploadMetadata

```js
LSP4DigitalAssetMetadata.uploadMetadata(lsp4Metadata, uploadOptions?);
```

Upload and processes passed images and assets and uploads the [LSP4 Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md) to IPFS.

Available as a static or non-static function callable on an instance of `LSPFactory`. If used on an `LSPFactory` instance the `uploadOptions` passed to LSPFactory on instantiation will used if `uploadOptions` are not specified in the function call.

#### Parameters

1. `metaData` - `Object`: The Metadata to be uploaded.
   - `description` - `string`: A description of the digital asset.
   - `links?` - `{title: string, url: string}[]`
   - `icon?` - `File | ImageBuffer | ImageMetadata[]`
   - `images?` - `File | ImageBuffer | ImageMetadata[]`
   - `assets?` - `File | AssetBuffer | AssetMetadata[]`
2. `uploadOptions?` - `Object`: Specify how the metadata should be uploaded.
   - `ipfsClientOptions?` - `Object`: IPFS Client Options as defined by the [ipfs-http-client library](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions) used internally.

#### Returns

`Promise`<`LSP4MetadataForEncoding`\>

Processed [LSP4](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md) data and upload URL.

#### Example

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
