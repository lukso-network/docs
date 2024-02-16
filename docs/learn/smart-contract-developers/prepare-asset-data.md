---
sidebar_label: '📇 Prepare Asset Data'
sidebar_position: 3
description: Learn how to prepare and use asset data for LSP7 and LSP8 tokens on LUKSO.
---

# Prepare Asset Data

If you create your Token, NFT, or Collection using [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) or [LSP8 Digital Identifiable Asset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) standards, you will likely attach metadata to the [ERC725Y data storage](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) of the contract. The [`LSP4 Metadata`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) may include pictures, descriptions, links, and associated creators.

Before you can [Attach Token Metadata](./attach-token-metadata.md) to your contract, you have to prepare the media files and JSON that will later be **encoded and attached** to the **contract storage on-chain**. Therefore, you must:

1. Upload the media files so they are accessible through a URL
2. Generate the LSP4 Metadata JSON file, including the media links as `VerifiableURI`
3. Upload the LSP4 Metadata JSON file so its encoded link can be set in the contract

:::info Storage Solutions

**LSPs do not restrict you to a specific storage solution.** You can use **any file service** or even host files yourself. The [VerifiableURI](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#verifiableuri) can point to anything, including centralized and decentralized storage solutions:

- **centralized file providers**: _AWS_, _Google Cloud Storage_, _Dropbox_, ...
- **decentralized file providers**: _IPFS_, _Arweave_, _Filecoin_, ...

Centralized storage solutions are user-friendly and can be a good starting point for those new to NFTs or participating in hackathons. However, they rely on a single point of control, which may not align with the decentralized ethos of blockchain technology. Decentralized storage solutions align with the decentralized nature of blockchain and offer benefits like _redundancy_, _censorship resistance_, and _permanent storage_, which are more complex to interact with.

:::

## Generate the JSON File

After uploading the media files, you can attach their links to a JSON file in the below structure. The JSON content is then used as input for encoding the metadata according to [LSP4](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4---digital-asset-metadata).

<!-- TODO: Explain where this structure comes from and if keys are mandatory or can be left out-->

:::tip Data Verification

To ensure the authenticity of the images, please generate the hash of the uploaded files and attach the hash function and the actual hash in hex format within the `"verification"` field including a `"method"` and `"data"` entry.

:::

<Details>
<summary>LSP4 Example JSON File</summary>

```js
{
    "LSP4Metadata": {
      "name": "My Token Name",
      "description": "Sample Description",
      "links": [{ "title": "My Website", "url": "https://my.website.com" }],
      "icon": [
        {
          "width": 1600,
          "height": 1600,
          "url": "https://link-to-my-icon.com>"
        }
      ],
      "images": [
        [
          {
            "width": 1000,
            "height": 1000,
            "url": "https://link-to-my-image.com>",
            "verification": {
              "method": "keccak256(bytes)",
              "data": "0x<hashOfTheUploadedFile>"
            }

          }
        ]
      ],
      "assets": [],
      "attributes": [
        {
          "key": "Standard type",
          "value": "LSP",
          "type": "string"
        },
        {
          "key": "Standard number",
          "value": 4,
          "type": "number"
        }
      ]
    }
  }
```

</Details>

## Construct the Metadata Object

:::tip Code repository

You can find all code snippets of the guide within our [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository.

:::

After the JSON file can be accessed through the URL, you can construct the actual metadata object encoded and set on the contract.

```js title="prepare-asset-metadata.ts"
import { EncodeDataInput } from '@erc725/erc725.js/build/main/src/types/decodeData';

const LSP4JSON = { /* Your JSON */ };

const LSP4Metadata: EncodeDataInput[] = [
  {
    keyName: 'LSP4Metadata',
    value: {
      json: LSP4JSON,
      url: 'https://my-file-provider.com/my-file-link',
    },
  },
];
```

## Encode the LSP4 Metadata

To encode the LSP4 Metadata with ease, you can use the 🛠️ [`erc725.js`](../../tools/erc725js/getting-started.md) library. The tool provides all necessary LSP Schemas and the `encodeData()` function.

```js title="prepare-asset-metadata.ts"
import { ERC725 } from '@erc725/erc725.js';
import LSP4DigitalAssetSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

// ...

export const = encodedLSP4Metadata = ERC725.encodeData(LSP4Metadata, LSP4DigitalAssetSchema);

```

The encoded content will then look like the following:

<Details>
<summary>LSP4 Encoded Contract Metadata</summary>

```js
{
  keys: [
    '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e'
  ],
  values: [
    '0x00006f357c6a0020610be5a5ebf25a8323ed5a9d8735f78aaf97c7e3529da7249f17e1b4129636f3697066733a2f2f516d5154716865424c5a466e5155787535524473387441394a746b78665a714d42636d47643973756b587877526d'
  ]
}
```

</Details>

To check the generated hash values and contents, you can also decode the values back again:

```js title="prepare-asset-metadata.ts"
// ...

const decodedLSP4Metadata = ERC725.decodeData(
  [
    {
      keyName: encodedLSP4Metadata.keys[0],
      value: encodedLSP4Metadata.values[0],
    },
  ],
  LSP4DigitalAssetSchema,
);
```

<Details>
<summary>LSP4 Decoded Contract Metadata</summary>

```js
{
  key: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',
  name: 'LSP4Metadata',
  value: {
    verification: {
      method: 'keccak256(utf8)',
      data: '0x<hashOfTheJSON>',
    },
    url: 'https://my-file-provider.com/my-file-link',
  },
}
```

</Details>

:::tip

The encoded data can be used within the `setData()` and `setDataBatch()` function calls to [Attach Token Metadata](./attach-token-metadata) to the contract of your digital asset.

:::

## Utilizing IPFS for NFT Storage

:::danger Advanced Guide 🌶️

The following section is an advanced guide for production. If you are testing asset deployments or participating in a hackathon, please use centralized file providers to save time during deployment.

:::

You can integrate IPFS into your asset deployment workflow on LUKSO by using the following repositories:

- [`tools-data-providers`](https://github.com/lukso-network/tools-data-providers)
- [`service-ipfs-proxy`](https://github.com/lukso-network/service-ipfs-proxy)

To use IPFS as a file service through _Pinata_ and _Infura_, you will have to:

1. **Setup your Gateway Account**: Register at [Pinata](https://www.pinata.cloud/) and [Infura](https://www.infura.io/) and ensure the IPFS gateway is enabled on your Infura account. This will grant you access to their service endpoints.
2. **Configure your Proxy**: Deploy a proxy on Cloudflare using secrets from Infura and Pinata and a shared secret of your choice. This setup allows for a customized Pinata gateway for uploads and enables downloads via a subscription.
3. **Upload your File Content**: Utilize the [LUKSO network tools for data providers](https://github.com/lukso-network/tools-data-providers) to upload content. You can upload directly to Pinata using your Pinata credentials or to the proxy with the shared secret.

This approach offers flexibility in how you upload and manage your asset data. While direct uploads to Infura are possible, the recommended method involves using the proxy to ensure reliability and ease of use.

:::info Storing Files

The setup will use Pinata as a file provider. Pinata is an IPFS pinning service that makes IPFS easy for creators. If you are not yet familiar with decentralized file services, you should read about them here:

- [IPFS Network Documentation](https://docs.ipfs.tech/)
- [Pinata Developer Documentation](https://docs.pinata.cloud/introduction)

:::

:::info Accessing Files

The [Infura](https://www.infura.io/) service offers access to the IPFS, so you can easily _add_, _pin_, and _access_ data on IPFS without hosting and managing your own IPFS node. Infura's IPFS gateway offers access to files stored on IPFS within the web browser without needing a dedicated IPFS client. By setting up a proxy through Cloudflare with credentials from both Infura and Pinata, you can create a robust and efficient system for uploading and accessing assets.

:::

### Resolving IPFS Files

After setting up the accounts and configuring the proxy, you can install the URL Resolver within your code repository to fetch files directly from your IPFS provider:

```bash
npm install @lukso/data-provider-urlresolver
```

```js
import { UrlResolver } from '@lukso/data-provider-urlresolver';

// Example to resolve standard IPFS URL
const urlResolver = new UrlResolver([
  ['ipfs://', 'https://api.universalprofile.cloud/ipfs/'],
]);

// Example to customize URL resolution
const customResolver = new UrlResolver([
  ['ipfs://', 'https://some.proxy?cid='],
]);
```

### Uploading IPFS Files

To upload files via IPFS using Infura, set up your gateway with necessary authorization headers and [set up your Infura key and credentials](https://github.com/lukso-network/tools-data-providers?tab=readme-ov-file#pinning-files) as environment variables. You will then be able to upload files directly from your application:

```bash
npm install @lukso/data-provider-urlresolver
```

```js
import { createReadStream } from 'fs';
import { IPFSHttpClientUploader } from '@lukso/data-provider-ipfs-http-client';

const provider = new IPFSHttpClientUploader(import.meta.env.INFURA_GATEWAY, {
  headers: {
    authorization: `Basic ${Buffer.from(
      `${import.meta.env.INFURA_API_KEY_NAME}:${import.meta.env.INFURA_API_KEY}`,
    ).toString('base64')}`,
  },
});

const file = createReadStream('./path-to-your-file');
const url = await provider.upload(file);

console.log('File URL:', url);
```

:::info Proxy Configuration

You can also deploy your IPFS proxy service using the [Service IPFS Proxy](https://github.com/lukso-network/service-ipfs-proxy) repository. The setup will enable managing _GET_ and _POST_ requests to access or upload files, allowing you to upload and access IPFS content in production without exposing credentials.

:::
