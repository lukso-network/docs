---
sidebar_label: '📤 Use IPFS Storage'
description: 'Learn how to integrate IPFS storage solutions for dApps.'
sidebar_position: 11
---

# Use IPFS Storage

This is a follow-up guide to [Working with Assets](../digital-assets/metadata-management/metadata-preparation.md) guide for production use-cases. If you are testing asset deployments or participating in a hackathon, please use centralized file providers to save time during deployment.

If you want to set up your own workflow for uploading and retrieving files using a **decentralized file storage**, you can integrate IPFS on LUKSO by using the following repositories:

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

## Resolving IPFS Files

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

## Uploading IPFS Files

You can use our [tools-data-providers] library to upload files to IPFS. [The supported services](https://github.com/lukso-network/tools-data-providers?tab=readme-ov-file#apps-and-packages) by this library includes Pinata, Infura, Cascade, and Sense.

### Local IPFS Node

Here's how you can upload a file with using a local IPFS node:

```js
import { createReadStream } from 'fs';
import { IPFSHttpClientUploader } from '@lukso/data-provider-ipfs-http-client';

const provider = new IPFSHttpClientUploader('http://127.0.0.1:5001/api/v0/add');

const file = createReadStream('./path-to-your-file');

const { url, hash } = await provider.upload(file);

console.log(url, hash);
```

Alternatively, here's how we can create providers for other [supported services](https://github.com/lukso-network/tools-data-providers?tab=readme-ov-file#apps-and-packages).

### Pinata

```js
const provider = new PinataUploader({
  pinataApiKey: import.meta.env.TEST_PINATAAPIKEY,
  pinataSecretApiKey: import.meta.env.TEST_PINATASECRETAPIKEY,
});
```

or

```js
const provider = new PinataUploader({
  pinataJWTKey: import.meta.env.TEST_PINATAJWTKEY,
});
```

### Infura

```js
// import.meta.env.VAR is the new way of importing environment within vite and astro and
// equivalent to the old process.env.VAR
//
const provider = new IPFSHttpClientUploader(import.meta.env.INFURA_GATEWAY, {
  headers: {
    authorization: `Basic ${Buffer.from(
      `${import.meta.env.INFURA_API_KEY_NAME}:${import.meta.env.INFURA_API_KEY}`,
    ).toString('base64')}`,
  },
});
```

### Cascade

```js
const provider = new CascadeUploader(import.meta.env.CASCADE_API_KEY);
```

### Sense

```js
const provider = new SenseUploader(import.meta.env.SENSE_API_KEY);
```

:::info Proxy Configuration

You can also deploy your IPFS proxy service using the [Service IPFS Proxy](https://github.com/lukso-network/service-ipfs-proxy) repository. The setup will enable managing _GET_ and _POST_ requests to access or upload files, allowing you to upload and access IPFS content in production without exposing credentials.

:::
