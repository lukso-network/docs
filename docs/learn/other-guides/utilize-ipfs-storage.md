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

To use IPFS as a file service through _Pinata_, _Infura_, _Cascade_ and _Sense_ you will have to:

1. **Setup your Gateway Account**: Register with [Pinata](https://www.pinata.cloud/), [Infura](https://www.infura.io/), or one the two other storage solutions integrated with LUKSO that provide additional benefits:

- [Sense](https://sense.pastel.network)
- [Cascade](https://cascade.pastel.network)

Ensure the IPFS gateway is enabled on your Infura account. This will grant you access to their service endpoints.

1. **Configure your Proxy**: Deploy a proxy on Cloudflare using secrets from Infura, Pinata, Sense and a shared secret of your choice. This setup allows for a customized Pinata gateway for uploads and enables downloads via a subscription.
2. **Upload your File Content**: Use the [LUKSO network tools for data providers](https://github.com/lukso-network/tools-data-providers) to upload content. You can upload directly to Pinata using your Pinata credentials or to the proxy with the shared secret. And also by using Sense or Cascade API key, you can upload to Sense protocol directly.

This approach offers flexibility in how you upload and manage your asset data. While direct uploads to Infura are possible, the recommended method involves using the proxy to ensure reliability and ease of use.

:::info Storing Files

The setup will use Pinata as a file provider. Pinata is an IPFS pinning service that makes IPFS easy for creators. If you are not yet familiar with decentralized file services, you should read about them here:

- [IPFS Network Documentation](https://docs.ipfs.tech/)
- [Pinata Developer Documentation](https://docs.pinata.cloud/introduction)
- [Pastel Network Documentation](https://docs.pastel.network/sense-protocol/master)

:::

:::info Accessing Files

The [Infura](https://www.infura.io/) service offers access to the IPFS, so you can easily _add_, _pin_, and _access_ data on IPFS without hosting and managing your own IPFS node. Infura's IPFS gateway offers access to files stored on IPFS within the web browser without needing a dedicated IPFS client. By setting up a proxy through Cloudflare with credentials from both Infura and Pinata, you can create a robust and efficient system for uploading and accessing assets.

:::

## Resolving IPFS Files

After setting up the accounts and configuring the proxy, you can install the URL Resolver within your code repository to fetch files directly from your IPFS provider:

```bash
npm install @lukso/data-provider-urlresolver
```

```ts
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

```ts
import { createReadStream } from 'fs';
import { IPFSHttpClientUploader } from '@lukso/data-provider-ipfs-http-client';

const provider = new IPFSHttpClientUploader('http://127.0.0.1:5001/api/v0/add');

const file = createReadStream('./path-to-your-file');

const { url, hash } = await provider.upload(file);

console.log(url, hash);
```

Alternatively, here's how we can create providers for other [supported services](https://github.com/lukso-network/tools-data-providers?tab=readme-ov-file#apps-and-packages).

### Pinata

```ts
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

```ts
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

```ts
import { createReadStream } from 'fs';
import { CascadeUploader } from '@lukso/data-provider-cascade';

const provider = new CascadeUploader(import.meta.env.CASCADE_API_KEY);

const file = createReadStream('./path-to-your-file');

const { result_id, ipfs_url } = await provider.uploadToCascade(file);
console.log(result_id, ipfs_url);

// upload folder
const results = await provider.uploadFolderToCascade('./examples');

if (results.length > 0) {
  for (const result of results) {
    if (result) {
      console.log('File Name:', result.file_name);
      console.log('IPFS Url:', result.ipfs_url);
      console.log('Result Id:', result.result_id);
    }
  }
}
```

**Using Cascade**

```js
import { CascadeUploader } from '@lukso/data-provider-cascade';

const provider = new CascadeUploader(import.meta.env.CASCADE_API_KEY);
```

React Example

```ts
import React, { useCallback, useMemo, useRef, useState } from "react";
import { CascadeUploader } from "@lukso/data-provider-cascade";
import { urlResolver } from "./shared";

export interface Props {
  apiKey: string;
}

export default function UploadLocal({ apiKey }: Props) {
  const provider = useMemo(
    () => new CascadeUploader(apiKey),
    []
  );
  const fileInput = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const [hash, setHash] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const upload = useCallback(async () => {
    const file = fileInput?.current?.files?.item(0) as File;
    const formData = new FormData();
    formData.append("file", file); // FormData keys are called fields
    const { hash, url } = await provider.upload(file);
    setUrl(url);
    setHash(hash);
    const destination = urlResolver.resolveUrl(url);
    setImageUrl(destination);
  }, []);

  return (
    <div>
      <input ref={fileInput} type="file" accept="image/*" />
      <button onClick={upload}>Upload</button>
      <div className="url">{url}</div>
      <div>
        <img className="image" src={imageUrl} alt="uploaded image" />
      </div>
    </div>
  );
}
```

Can use above component like following.

```js
<Upload client:only="react" apiKey="import.meta.env.CASCADE_API_KEY" />
```

API endpoint example

```ts
import type { APIContext } from 'astro';
import { CascadeUploader } from '@lukso/data-provider-cascade';

export async function POST({ request }: APIContext) {
  const formData = await request.formData();
  const file = formData.get('file');

  const provider = new CascadeUploader(import.meta.env.CASCADE_API_KEY);

  const { hash, url } = await provider.upload(file);
  return new Response(JSON.stringify({ Hash: url }), {
    headers: { contentType: 'application/json' },
  });
}
```

### Sense

```ts
import { createReadStream } from 'fs';
import { SenseUploader } from '@lukso/data-provider-sense';

const provider = new SenseUploader(import.meta.env.SENSE_API_KEY);

const file = createReadStream('./path-to-your-file');

const { result_id, ipfs_url } = await provider.uploadToSense(file);
console.log(result_id, ipfs_url);

// upload folder
const results = await provider.uploadFolderToSense('./examples');

if (results.length > 0) {
  for (const result of results) {
    if (result) {
      console.log('File Name:', result.file_name);
      console.log('IPFS Url:', result.ipfs_url);
      console.log('Result Id:', result.result_id);
    }
  }
}
```

**Using Sense**

To upload files via IPFS using Sense Protocol, please setup api key and add that as environment variables.

```ts
import { SenseUploader } from '@lukso/data-provider-sense';
const provider = new SenseUploader(import.meta.env.SENSE_API_KEY);
```

React Example

```ts
import React, { useCallback, useMemo, useRef, useState } from "react";
import { SenseUploader } from "@lukso/data-provider-sense";
import { urlResolver } from "./shared";

export interface Props {
  apiKey: string;
}

export default function UploadLocal({ apiKey }: Props) {
  const provider = useMemo(
    () => new SenseUploader(apiKey),
    []
  );
  const fileInput = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const [hash, setHash] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const upload = useCallback(async () => {
    const file = fileInput?.current?.files?.item(0) as File;
    const formData = new FormData();
    formData.append("file", file); // FormData keys are called fields
    const { hash, url } = await provider.upload(file);
    setUrl(url);
    setHash(hash);
    const destination = urlResolver.resolveUrl(url);
    setImageUrl(destination);
  }, []);

  return (
    <div>
      <input ref={fileInput} type="file" accept="image/*" />
      <button onClick={upload}>Upload</button>
      <div className="url">{url}</div>
      <div>
        <img className="image" src={imageUrl} alt="uploaded image" />
      </div>
    </div>
  );
}
```

Can use above component like following.

```js
<Upload client:only="react" apiKey="import.meta.env.SENSE_API_KEY" />
```

API endpoint example

```ts
import type { APIContext } from 'astro';
import { SenseUploader } from '@lukso/data-provider-sense';

export async function POST({ request }: APIContext) {
  const formData = await request.formData();
  const file = formData.get('file');

  const provider = new SenseUploader(import.meta.env.SENSE_API_KEY);

  const { hash, url } = await provider.upload(file);
  return new Response(JSON.stringify({ Hash: url }), {
    headers: { contentType: 'application/json' },
  });
}
```

:::info Proxy Configuration

You can also deploy your IPFS proxy service using the [Service IPFS Proxy](https://github.com/lukso-network/service-ipfs-proxy) repository. The setup will enable managing _GET_ and _POST_ requests to access or upload files, allowing you to upload and access IPFS content in production without exposing credentials.

:::
