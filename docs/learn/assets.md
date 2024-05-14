---
sidebar_label: '🖼️ Working with assets'
sidebar_position: 6
description: Learn how to prepare and use assets for LUKSO Universal Profiles and digital assets (LSP7 / LSP8).
---

# Working with assets

When creating/editing Universal Profiles or Digital Assets, you will need to upload assets (such as images, icons, videos, etc.) and [metadata JSON files](../standards/tokens/LSP4-Digital-Asset-Metadata.md). This can be tricky, but this guide will help you get through this process.

## Asset upload flow

The asset upload flow works like this:

1. Upload each media file (icon, pictures, images, videos...) and get their URLs or IPFS CID (more info below).
2. With the file hashes and URLs, generate the final [LSP4 Metadata JSON file](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md) and upload this file to get its URL or IPFS CID.
3. Encode the LSP4 Metadata JSON file URL as a `VerifiableURI`.
4. Write the reference to the JSON file on the contract.

### Where to upload the files?

**LSPs do not restrict you to a specific storage solution.**

To upload the files (assets and metadata JSON file), you have mainly two options:

- Centralised storage such as [AWS S3](https://aws.amazon.com/s3/), [Google Cloud](https://cloud.google.com/storage?hl=en), Dropbox...
- Decentralised storage such as [IPFS](https://ipfs.tech/), [Arweave](https://www.arweave.org/), [Filecoin](https://filecoin.io/)...

Centralized storage solutions are user-friendly and can be a good starting point for those new to the ecosystem or participating in hackathons. However, they rely on a single point of control, which may not align with the decentralized ethos of blockchain technology.

Decentralized storage solutions align with the decentralized nature of blockchain and offer benefits like _redundancy_, _censorship resistance_, and _permanent storage_. However, they might be more complex to interact with.

## Generate the JSON File

After uploading the media files, you can attach their links to a JSON file in the below structure. The JSON content is then used as input for encoding the metadata according to [LSP4](../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4---digital-asset-metadata).

:::tip Data Verification

To ensure the authenticity of the images, please generate the hash of the uploaded files and attach the hash function and the actual hash in hex format within the `"verification"` field including a `"method"` and `"data"` entry.

:::

<details>
  <summary>LSP4 Example JSON File</summary>

```js
{
    "LSP4Metadata": {
      "name": "My Token Name",
      "description": "Sample Description",
      "links": [{ "title": "My Website", "url": "https://my.website.com" }],
      "icon": [
        {
          "width": 60,
          "height": 60,
          "url": "https://mycentralised-storage.com/filename.png"
        }
      ],
      "images": [
        [
          {
            "width": 1000,
            "height": 1000,
            "url": "https://centralised-cloud-storage.com/image.jpg",
            "verification": {
              "method": "keccak256(bytes)",
              "data": "0x<hashOfTheUploadedFile>"
            }

          }
          {
            "width": 500,
            "height": 500,
            "url": "ipfs://[IPFS-CID]",
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

</details>

Such JSON can be generated manually or using tools, such as [`@lukso/lsp-utils`](https://github.com/lukso-network/lsp-utils). To generate the JSON from predefined fields:

- Install the `@lukso/lsp-utils` library

```bash
npm i @lukso/lsp-utils
```

- Then import the `generateLSP4JSON` to generate the JSON

```js
import { generateLSP4JSON } from '@lukso/lsp-utils';
```

Example:

```js
const name = 'Test NFT';

const description = 'This is a test NFT collection';

const links = [
  { title: 'Website', url: 'https://example.com' },
  { title: 'Twitter', url: 'https://twitter.com/example' },
];

const attributes = [
  { key: 'trait', value: 'rare', type: 'string' },
  { key: 'level', value: '5', type: 5 },
];

const hashVerification = {
  method: 'keccak256(bytes)',
  data: '0x1234567890abcdef',
};

const icons = {
  icons: [
    {
      width: 200,
      height: 200,
      url: 'ipfs://example/icon1.png',
      verification: hashVerification,
    },
    {
      width: 400,
      height: 400,
      url: 'ipfs://example/icon2.png',
      verification: hashVerification,
    },
  ],
  lsp7images: [],
  lsp8images: [],
};

const images = {
  imageFields: [
    {
      images: [
        {
          width: 1200,
          height: 1200,
          url: 'ipfs://example/image1.png',
          verification: hashVerification,
        },
        {
          width: 800,
          height: 600,
          url: 'ipfs://example/image2.png',
          verification: hashVerification,
        },
      ],
      lsp7images: [{ address: '0x1234567890abcdef' }],
      lsp8images: [{ address: '0x0987654321fedcba', tokenId: '0x456' }],
    },
  ],
};

const assets = {
  assets: [
    {
      url: 'ipfs://example/asset1.json',
      fileType: 'json',
      verification: hashVerification,
    },
    {
      url: 'ipfs://example/asset2.png',
      fileType: 'image/png',
      verification: hashVerification,
    },
  ],
  lsp7assets: [{ address: '0x1234567890abcdef' }],
  lsp8assets: [{ address: '0x0987654321fedcba', tokenId: '0x456' }],
};

const json = generateLSP4JSON(
  name,
  description,
  links,
  attributes,
  icons,
  images,
  assets,
);
//
// {
//  links: ...
//  description:...
// }
//
```

Now the JSON can be uploaded to IPFS.

Other utility functions can be used to prepare the JSON to be converted to [VerifiableURI](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4metadata), such as creating the hash and encoding it as VerifiableURI.

```js
import { generateLSP4JSONWithHash } from '@lukso/lsp-utils/dist/lib/es6';
import { generateLSP4JSONVerifiableURI } from '@lukso/lsp-utils/dist/lib/es6';

const { json, hash } = generateLSP4JSONWithHash(
  name,
  description,
  links,
  attributes,
  icons,
  images,
  assets,
);

const verifiableURI = generateLSP4JSONVerifiableURI(
  name,
  description,
  links,
  attributes,
  icons,
  images,
  assets,
);
```

The `generateLSP4JSONVerifiableURI` will return you directly what needs to be set in the smart contract, but it is slightly more expensive than uploading the JSON to IPFS and encoding the link, as the function encode the JSON as a base64 link.

## Encode the LSP4 Metadata

To encode the LSP4 Metadata with ease, you can use the 🛠️ [`erc725.js`](../tools/erc725js/getting-started.md) library. The tool provides all necessary LSP Schemas and the `encodeData()` function.

```js
import { ERC725 } from '@erc725/erc725.js';
import LSP4DigitalAssetSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

const LSP4JSON = {
  /* Your JSON */
};

const encodedLSP4Metadata = ERC725.encodeData(
  {
    keyName: 'LSP4Metadata',
    value: {
      json: LSP4JSON,
      url: 'https://my-file-provider.com/my-file-link.json', // It can also be: ipfs://[CID]
    },
  },
  LSP4DigitalAssetSchema,
);
```

The encoded content will then look like the following:

<details>
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

</details>

## Write the value to the contract

Now that you have they key to update and the value to write, you can use the [`setData()`](../contracts/contracts/ERC725/ERC725.md#setdata) to update the contract.
