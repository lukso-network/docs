---
sidebar_position: 2
title: LSP4DigitalAssetMetadata
---

# LSP4DigitalAssetMetadata

## uploadMetadata

```js
LSP4DigitalAssetMetadata.uploadMetadata(lsp4Metadata [, options]);
```

Uploads and processes passed assets and images, and uploads the [LSP4 Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md) to IPFS.
The `uploadMetadata` function is available as a static or non-static function callable on the `LSPFactory` library instance.

If `options` are not specified in the function call, and the function is used on an `LSPFactory` instance, the specified `options` that were passed to the LSPFactory during instantiation will be used.

### Parameters

#### 1. `metaData` - Object (optional)

| Name                | Type          | Description                                                                                                                                          |
| :------------------ | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`       | String        | A description of the digital asset.                                                                                                                  |
| `links` (optional)  | Array         | An Array of Objects containing title and url parameters.                                                                                             |
| `icon` (optional)   | File \| Array | The icon of the digital asset passed as a JavaScript File object or an Array of image metadata objects for different sizes of the same image.        |
| `images` (optional) | Array         | An Array of images where each image element is a JavaScript File object or an Array of image metadata Objects for different sizes of the same image. |
| `assets` (optional) | Array         | An Array of assets where each asset is a JavaScript File object or an asset metadata Object.                                                         |

#### 2. `options` - Object (optional)

| Name                                                                        | Type             | Description                                                                                                 |
| :-------------------------------------------------------------------------- | :--------------- | :---------------------------------------------------------------------------------------------------------- |
| [`ipfsGateway`](../deployment/digital-asset#ipfs-upload-options) (optional) | String \| Object | ipfsGateway URL string or IPFS Client Options as defined by the [ipfs-http-client library] used internally. |

#### Returns

| Type      | Description                               |
| :-------- | :---------------------------------------- |
| `Promise` | The processed [LSP4] data and upload URL. |

### Example

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

```javascript title="Uploading LSP4Metadata using custom upload options"
await LSP4DigitalAssetMetadata.uploadMetadata(
  {
    description: 'Digital Asset',
    assets: [asset],
    images: [image],
    icon: icon,
    links: [{ title: 'Cool', url: 'cool.com' }],
  },
  {
    ipfsGateway: {
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    },
  },
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

```javascript title="Uploading LSP4Metadata using upload options passed when instantiating LSPFactory"
const lspFactory = new LSPFactory(provider, {
  deployKey: myDeployKey,
  chainId: myChainId,
  ipfsGateway: {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
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
