---
sidebar_label: '🧩 Setting Your Grid'
sidebar_position: 0
description: Learn how to set up LSP28 Grid on your Universal Profile — encode Grid JSON, build VerifiableURI, and write on-chain with erc725.js.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setting Your Grid

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('/img/guides/setting-your-grid.png').default}
    alt="LSP28 Grid layout on a Universal Profile"
    width="700"
  />
<br/>
<i>A customizable Grid layout on a Universal Profile, hosting mini-apps, social embeds, and content.</i>
<br /><br />
</div>

The **Grid** ([LSP28](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-28-TheGrid.md)) is a standard that lets Universal Profiles display **customizable, modular layouts** made of mini-apps, social media embeds, images, text, and other interactive content. Think of it as a personal dashboard you can attach to any Universal Profile — or even to [LSP7](/standards/tokens/LSP7-Digital-Asset.md) and [LSP8](/standards/tokens/LSP8-Identifiable-Digital-Asset.md) token contracts.

This guide walks you through:

1. Understanding the Grid JSON structure and all available element types
2. Encoding the Grid as a [VerifiableURI](/standards/metadata/lsp2-json-schema.md#verifiableuri)
3. Writing the encoded data on-chain to your Universal Profile

:::info What are Mini-Apps?
Mini-Apps are dApps that run inside an `<iframe>` on a host page. The Grid standard provides the layout framework for embedding them. Learn more about connecting Mini-Apps in the [Connect to a Mini-App](/learn/mini-apps/connect-upprovider) guide.
:::

## Prerequisites

- A **Universal Profile** on LUKSO (mainnet or testnet)
- A **controller EOA** private key with [`SETDATA` permission](/standards/access-control/lsp6-key-manager.md#permissions) on the profile
- **Node.js** ≥ 18

### Install Dependencies

<Tabs groupId="provider-lib">
<TabItem value="viem" label="viem + wagmi" default>

```shell
npm install viem @erc725/erc725.js @lukso/lsp-smart-contracts
```

</TabItem>
<TabItem value="ethers" label="ethers">

```shell
npm install ethers @erc725/erc725.js @lukso/lsp-smart-contracts
```

</TabItem>
<TabItem value="web3" label="web3.js">

```shell
npm install web3 @erc725/erc725.js @lukso/lsp-smart-contracts
```

</TabItem>
</Tabs>

## The LSP28 Data Key

The Grid data is stored under a single [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md) data key:

```
LSP28TheGrid → keccak256('LSP28TheGrid')
= 0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff
```

:::warning Draft Standard
LSP28 is currently a **draft** standard. The data key is not yet exported from `@lukso/lsp-smart-contracts`. We define the ERC725Y schema inline in this guide. Once the standard is finalized, import the key from the package instead of hardcoding it.
:::

The ERC725Y JSON Schema for the Grid looks like this:

```json title="LSP28GridSchema.json"
{
  "name": "LSP28TheGrid",
  "key": "0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff",
  "keyType": "Singleton",
  "valueType": "bytes",
  "valueContent": "VerifiableURI"
}
```

The value is a **[VerifiableURI](/standards/metadata/lsp2-json-schema.md#verifiableuri)** — a compact binary encoding that pairs a content hash with a URI pointing to the actual JSON data (either on IPFS or stored on-chain as base64).

## Grid JSON Structure

The Grid JSON follows a specific format defined by the [LSP28 specification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-28-TheGrid.md). Below is the full structure with all available properties.

### Main Properties

| Property      | Type     | Required | Description                                     |
| ------------- | -------- | -------- | ----------------------------------------------- |
| `title`       | `string` | ✅       | Display name of the grid                        |
| `gridColumns` | `number` | ✅       | Number of columns (recommended: `2`–`4`)        |
| `visibility`  | `string` | ❌       | `"public"` or `"private"` — hint for interfaces |
| `grid`        | `array`  | ✅       | Array of grid elements                          |

:::info About `visibility`
The `visibility` property is a **hint for interfaces only**. Setting it to `"private"` tells UIs to hide the grid from other users — but the data is still publicly readable on the blockchain. Interfaces should inform users that this is **not true privacy**.
:::

### Grid Element Properties

Each element in the `grid` array represents a tile with these common properties:

| Property     | Type     | Required | Description                                 |
| ------------ | -------- | -------- | ------------------------------------------- |
| `width`      | `number` | ✅       | Width in grid steps (recommended: `1`–`3`)  |
| `height`     | `number` | ✅       | Height in grid steps (recommended: `1`–`3`) |
| `type`       | `string` | ✅       | Element type (see below)                    |
| `properties` | `object` | ✅       | Type-specific configuration                 |

### Element Types

The spec defines the following built-in types. Custom types can also be created.

#### `IFRAME` — Embedded Web Content / Mini-Apps

```json
{
  "width": 2,
  "height": 3,
  "type": "IFRAME",
  "properties": {
    "src": "https://my-mini-app.com",
    "allow": "accelerometer; autoplay; clipboard-write",
    "sandbox": "allow-forms;allow-pointer-lock;allow-popups;allow-same-origin;allow-scripts;allow-top-navigation",
    "allowfullscreen": true,
    "referrerpolicy": "no-referrer"
  }
}
```

| Property          | Required | Description                                                                                             |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `src`             | ✅       | URL of the iframe content                                                                               |
| `allow`           | ❌       | Iframe [Permissions Policy](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#allow)     |
| `sandbox`         | ❌       | Iframe [sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox) restrictions |
| `allowfullscreen` | ❌       | Allow fullscreen mode                                                                                   |
| `referrerpolicy`  | ❌       | Referrer policy for the iframe                                                                          |

#### `TEXT` — Text Content Block

```json
{
  "width": 2,
  "height": 2,
  "type": "TEXT",
  "properties": {
    "title": "About Me",
    "titleColor": "#ffffff",
    "text": "Building on **LUKSO** 🆙",
    "textColor": "#cccccc",
    "backgroundColor": "#1a1a2e",
    "backgroundImage": "https://example.com/bg.jpg",
    "link": "https://lukso.network"
  }
}
```

| Property          | Required | Description                        |
| ----------------- | -------- | ---------------------------------- |
| `title`           | ❌       | Title text (supports **Markdown**) |
| `titleColor`      | ❌       | Override color for the title       |
| `text`            | ❌       | Body text (supports **Markdown**)  |
| `textColor`       | ❌       | Text color                         |
| `backgroundColor` | ❌       | Background color (hex)             |
| `backgroundImage` | ❌       | Background image URL               |
| `link`            | ❌       | Makes the entire box clickable     |

#### `IMAGES` — Image Gallery

```json
{
  "width": 2,
  "height": 2,
  "type": "IMAGES",
  "properties": {
    "type": "carousel",
    "images": [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg"
    ]
  }
}
```

| Property | Required | Description                        |
| -------- | -------- | ---------------------------------- |
| `type`   | ❌       | `"grid"` (default) or `"carousel"` |
| `images` | ✅       | Array of image URLs                |

#### `X` — X/Twitter Embed

```json
{
  "width": 2,
  "height": 1,
  "type": "X",
  "properties": {
    "type": "post",
    "username": "feindura",
    "id": "1804519711377436675",
    "theme": "dark",
    "language": "en",
    "donottrack": true
  }
}
```

#### `INSTAGRAM` — Instagram Embed

```json
{
  "width": 2,
  "height": 2,
  "type": "INSTAGRAM",
  "properties": {
    "type": "p",
    "id": "POST_ID"
  }
}
```

#### `QR_CODE` — QR Code

```json
{
  "width": 1,
  "height": 1,
  "type": "QR_CODE",
  "properties": {
    "data": "https://universaleverything.io/0x1234..."
  }
}
```

#### `ELFSIGHT` — Elfsight Widget

```json
{
  "width": 2,
  "height": 1,
  "type": "ELFSIGHT",
  "properties": {
    "id": "ELFSIGHT_WIDGET_ID"
  }
}
```

### Full Example

Here is a complete Grid JSON with multiple element types:

<details>
<summary>Complete Grid JSON example</summary>

```json title="my-grid.json"
{
  "LSP28TheGrid": [
    {
      "title": "My Creative Space",
      "gridColumns": 3,
      "visibility": "public",
      "grid": [
        {
          "width": 2,
          "height": 3,
          "type": "IFRAME",
          "properties": {
            "src": "https://my-mini-app.example.com"
          }
        },
        {
          "width": 1,
          "height": 1,
          "type": "TEXT",
          "properties": {
            "title": "👋 Hello!",
            "text": "Welcome to my **Universal Profile**.",
            "backgroundColor": "#0f0235",
            "textColor": "#ffffff"
          }
        },
        {
          "width": 1,
          "height": 2,
          "type": "IMAGES",
          "properties": {
            "type": "carousel",
            "images": [
              "https://example.com/art1.jpg",
              "https://example.com/art2.jpg"
            ]
          }
        },
        {
          "width": 1,
          "height": 1,
          "type": "X",
          "properties": {
            "type": "post",
            "username": "nickuniversal",
            "id": "1804519711377436675",
            "theme": "dark"
          }
        },
        {
          "width": 1,
          "height": 1,
          "type": "QR_CODE",
          "properties": {
            "data": "https://universaleverything.io/0x1234abcd..."
          }
        }
      ]
    }
  ]
}
```

</details>

## Understanding VerifiableURI Encoding

The Grid value stored on-chain is a **VerifiableURI** as defined in [LSP2 - ERC725Y JSON Schema](/standards/metadata/lsp2-json-schema.md#verifiableuri). It contains both a verification hash and the URI where the data can be found. This allows anyone to verify that the content at the URI hasn't been tampered with.

The binary format is:

| Bytes         | Length   | Description                                            |
| ------------- | -------- | ------------------------------------------------------ |
| `0x0000`      | 2 bytes  | Header — `0x0000` indicates a VerifiableURI            |
| `6f357c6a`    | 4 bytes  | Verification method: `keccak256('keccak256(utf8)')`    |
| `0020`        | 2 bytes  | Hash length — `32` bytes in hex                        |
| `<32 bytes>`  | 32 bytes | `keccak256` hash of the JSON content                   |
| `<url bytes>` | variable | UTF-8 encoded URI (e.g., `ipfs://Qm...` or `data:...`) |

:::warning Don't Forget the Hash Length!
A common mistake is to omit the `0020` (hash length) bytes from the VerifiableURI header. The full header for `keccak256(utf8)` is **`0x00006f357c6a0020`**, not just `0x00006f357c6a`. Missing the `0020` will make the data unreadable by clients.
:::

For **on-chain base64** storage (where the JSON is embedded directly in the URI as `data:application/json;base64,...`), the verification method changes to `keccak256(bytes)` with method ID `8019f9b1`. The header becomes `0x00008019f9b10020`.

## Encoding the Grid Data

We use [erc725.js](/tools/dapps/erc725js/getting-started) to encode the Grid JSON into a VerifiableURI value. The library handles the hash computation and binary packing automatically.

<Tabs groupId="storage-method">
<TabItem value="ipfs" label="📦 IPFS Storage" default>

If your Grid JSON is hosted on IPFS, you provide the IPFS hash and URL:

```javascript title="encode-grid-ipfs.js"
import { ERC725 } from '@erc725/erc725.js';

// LSP28 ERC725Y Schema (will be importable from @lukso/lsp-smart-contracts once finalized)
const LSP28Schema = {
  name: 'LSP28TheGrid',
  key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'VerifiableURI',
};

const erc725 = new ERC725([LSP28Schema]);

// After uploading your Grid JSON to IPFS, encode the reference
const encodedData = erc725.encodeData([
  {
    keyName: 'LSP28TheGrid',
    value: {
      hashFunction: 'keccak256(utf8)',
      hash: '0x...', // keccak256 hash of the Grid JSON string
      url: 'ipfs://QmYourGridJsonCID',
    },
  },
]);

console.log('Data Key:', encodedData.keys[0]);
console.log('Encoded Value:', encodedData.values[0]);
```

:::success Tip — Uploading to IPFS
You can use the [LUKSO data providers](https://github.com/lukso-network/tools-data-providers) library to upload your Grid JSON to IPFS. It supports local IPFS nodes, Pinata, Infura, and more.
:::

</TabItem>
<TabItem value="base64" label="💾 On-Chain (base64)">

For smaller grids, you can store the entire JSON on-chain using a `data:` URI with base64 encoding:

```javascript title="encode-grid-base64.js"
import { ERC725 } from '@erc725/erc725.js';
import { keccak256, toUtf8Bytes } from 'ethers';

// LSP28 ERC725Y Schema
const LSP28Schema = {
  name: 'LSP28TheGrid',
  key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'VerifiableURI',
};

const erc725 = new ERC725([LSP28Schema]);

// Your Grid JSON
const gridJson = {
  LSP28TheGrid: [
    {
      title: 'My Grid',
      gridColumns: 2,
      visibility: 'public',
      grid: [
        {
          width: 2,
          height: 2,
          type: 'TEXT',
          properties: {
            title: 'Hello World',
            text: 'Welcome to my **profile**!',
            backgroundColor: '#1a1a2e',
            textColor: '#ffffff',
          },
        },
      ],
    },
  ],
};

const gridJsonString = JSON.stringify(gridJson);
const base64Content = Buffer.from(gridJsonString).toString('base64');
const dataUri = `data:application/json;base64,${base64Content}`;

// Hash the JSON string
const jsonHash = keccak256(toUtf8Bytes(gridJsonString));

const encodedData = erc725.encodeData([
  {
    keyName: 'LSP28TheGrid',
    value: {
      hashFunction: 'keccak256(utf8)',
      hash: jsonHash,
      url: dataUri,
    },
  },
]);

console.log('Data Key:', encodedData.keys[0]);
console.log('Encoded Value:', encodedData.values[0]);
```

:::info On-Chain vs IPFS
Storing data on-chain as base64 is convenient for small grids but costs more gas as the JSON grows. For larger grids with many elements, IPFS is more cost-effective. The JSON content is identical either way — only the URI format differs.
:::

</TabItem>
</Tabs>

## Setting the Grid On-Chain

Once you have the encoded key-value pair, call [`setData`](/contracts/contracts/ERC725/ERC725.md) on the Universal Profile contract. Modern Universal Profiles have the [Key Manager (LSP6)](/standards/access-control/lsp6-key-manager.md) built-in, so you call `setData` directly on the UP from a controller address.

:::warning Do NOT Wrap in `execute()`
Call `setData(key, value)` directly on the Universal Profile contract from the controller EOA. Do **not** wrap it in an `execute()` call — this causes a `REENTRANCY` error because `setData` is an internal operation, not an external call.
:::

<Tabs groupId="provider-lib">
<TabItem value="viem" label="viem + wagmi" default>

```javascript title="set-grid-viem.js"
import {
  createWalletClient,
  createPublicClient,
  http,
  getContract,
} from 'viem';
import { lukso } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// --- Configuration ---
const PRIVATE_KEY = '0x...'; // Controller EOA private key (with SETDATA permission)
const UP_ADDRESS = '0x...'; // Your Universal Profile address
const RPC_URL = 'https://rpc.lukso.network'; // Use https://rpc.testnet.lukso.network for testnet
// ---------------------

// LSP28 ERC725Y Schema
const LSP28Schema = {
  name: 'LSP28TheGrid',
  key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'VerifiableURI',
};

const account = privateKeyToAccount(PRIVATE_KEY);

const walletClient = createWalletClient({
  account,
  chain: lukso,
  transport: http(RPC_URL),
});

const publicClient = createPublicClient({
  chain: lukso,
  transport: http(RPC_URL),
});

async function setGrid() {
  // 1. Encode the Grid data (see previous section)
  const erc725 = new ERC725([LSP28Schema]);

  const encodedData = erc725.encodeData([
    {
      keyName: 'LSP28TheGrid',
      value: {
        hashFunction: 'keccak256(utf8)',
        hash: '0x...', // keccak256 hash of your Grid JSON
        url: 'ipfs://QmYourGridJsonCID', // or data:application/json;base64,...
      },
    },
  ]);

  // 2. Get UP contract instance
  const upContract = getContract({
    address: UP_ADDRESS,
    abi: UniversalProfile.abi,
    client: walletClient,
  });

  // 3. Call setData directly on the UP
  const txHash = await upContract.write.setData([
    encodedData.keys[0],
    encodedData.values[0],
  ]);

  console.log('✅ Grid set! Transaction hash:', txHash);

  // 4. Wait for confirmation
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  });
  console.log('Block:', receipt.blockNumber);
}

setGrid().catch(console.error);
```

</TabItem>
<TabItem value="ethers" label="ethers">

```javascript title="set-grid-ethers.js"
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// --- Configuration ---
const PRIVATE_KEY = '0x...'; // Controller EOA private key (with SETDATA permission)
const UP_ADDRESS = '0x...'; // Your Universal Profile address
const RPC_URL = 'https://rpc.lukso.network'; // Use https://rpc.testnet.lukso.network for testnet
// ---------------------

// LSP28 ERC725Y Schema
const LSP28Schema = {
  name: 'LSP28TheGrid',
  key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'VerifiableURI',
};

async function setGrid() {
  // 1. Connect to the network
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  // 2. Encode the Grid data
  const erc725 = new ERC725([LSP28Schema]);

  const encodedData = erc725.encodeData([
    {
      keyName: 'LSP28TheGrid',
      value: {
        hashFunction: 'keccak256(utf8)',
        hash: '0x...', // keccak256 hash of your Grid JSON
        url: 'ipfs://QmYourGridJsonCID', // or data:application/json;base64,...
      },
    },
  ]);

  // 3. Create UP contract instance and call setData directly
  const upContract = new ethers.Contract(
    UP_ADDRESS,
    UniversalProfile.abi,
    signer,
  );

  const tx = await upContract.setData(
    encodedData.keys[0],
    encodedData.values[0],
  );

  console.log('✅ Grid set! Transaction hash:', tx.hash);

  const receipt = await tx.wait();
  console.log('Block:', receipt.blockNumber);
}

setGrid().catch(console.error);
```

</TabItem>
<TabItem value="web3" label="web3.js">

```javascript title="set-grid-web3.js"
import Web3 from 'web3';
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// --- Configuration ---
const PRIVATE_KEY = '0x...'; // Controller EOA private key (with SETDATA permission)
const UP_ADDRESS = '0x...'; // Your Universal Profile address
const RPC_URL = 'https://rpc.lukso.network'; // Use https://rpc.testnet.lukso.network for testnet
// ---------------------

// LSP28 ERC725Y Schema
const LSP28Schema = {
  name: 'LSP28TheGrid',
  key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'VerifiableURI',
};

async function setGrid() {
  // 1. Connect to the network
  const web3 = new Web3(RPC_URL);
  const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
  web3.eth.accounts.wallet.add(account);

  // 2. Encode the Grid data
  const erc725 = new ERC725([LSP28Schema]);

  const encodedData = erc725.encodeData([
    {
      keyName: 'LSP28TheGrid',
      value: {
        hashFunction: 'keccak256(utf8)',
        hash: '0x...', // keccak256 hash of your Grid JSON
        url: 'ipfs://QmYourGridJsonCID', // or data:application/json;base64,...
      },
    },
  ]);

  // 3. Create UP contract instance and call setData directly
  const upContract = new web3.eth.Contract(UniversalProfile.abi, UP_ADDRESS);

  const receipt = await upContract.methods
    .setData(encodedData.keys[0], encodedData.values[0])
    .send({ from: account.address, gas: 300_000 });

  console.log('✅ Grid set! Transaction hash:', receipt.transactionHash);
  console.log('Block:', receipt.blockNumber);
}

setGrid().catch(console.error);
```

</TabItem>
</Tabs>

## Reading the Grid

You can verify that the Grid was set correctly by reading the data back:

```javascript title="read-grid.js"
import { ERC725 } from '@erc725/erc725.js';

const LSP28Schema = {
  name: 'LSP28TheGrid',
  key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'VerifiableURI',
};

const UP_ADDRESS = '0x...';
const RPC_URL = 'https://rpc.lukso.network';

const erc725 = new ERC725([LSP28Schema], UP_ADDRESS, RPC_URL, {
  ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
});

async function readGrid() {
  const result = await erc725.getData('LSP28TheGrid');
  console.log('Grid VerifiableURI:', result.value);

  // If using fetchData(), erc725.js resolves the URI and returns the JSON
  const fetched = await erc725.fetchData('LSP28TheGrid');
  console.log('Grid JSON:', JSON.stringify(fetched.value, null, 2));
}

readGrid().catch(console.error);
```

:::success Verify with ERC725 Inspect
You can also paste your Universal Profile address into the [ERC725 Inspect Tool](https://erc725-inspect.lukso.tech/inspector?network=lukso+mainnet) and add the LSP28 schema in the Custom Key Reading section to decode your Grid data visually.
:::

## Live Implementation

The Grid is used in production on [Universal Everything](https://universaleverything.io). You can see live examples by visiting any Universal Profile that has a Grid set up, for example:

👉 [universaleverything.io/0x7b258dD350227CFc9Da1EDD7f4D978f7Df20fD40](https://universaleverything.io/0x7b258dD350227CFc9Da1EDD7f4D978f7Df20fD40)

## Troubleshooting

<details>
<summary><strong>❌ Transaction reverts with "REENTRANCY" error</strong></summary>

You are likely wrapping the `setData` call inside `execute()`. Call `setData(key, value)` **directly** on the Universal Profile contract from the controller EOA. The built-in Key Manager handles authorization automatically.

```javascript
// ❌ Wrong — causes reentrancy error
await upContract.execute(0, UP_ADDRESS, 0, setDataCalldata);

// ✅ Correct — call setData directly
await upContract.setData(encodedData.keys[0], encodedData.values[0]);
```

</details>

<details>
<summary><strong>❌ Data is not readable / decoding fails</strong></summary>

Check the VerifiableURI header. The most common mistake is forgetting the hash length bytes `0020` in the header:

- ✅ Correct header: `0x00006f357c6a0020`
- ❌ Wrong header: `0x00006f357c6a`

If you're using `erc725.js` to encode, this is handled automatically. If encoding manually, double-check the header format.

</details>

<details>
<summary><strong>❌ "NotAuthorised" or "NoPermissionsSet" error</strong></summary>

Your controller EOA needs the `SETDATA` permission on the Universal Profile. Check your controller's permissions using the [ERC725 Inspect Tool](https://erc725-inspect.lukso.tech/inspector?network=lukso+mainnet) or grant `SETDATA` permission following the [Grant Permissions guide](/learn/universal-profile/key-manager/grant-permissions).

</details>

<details>
<summary><strong>❌ Grid doesn't show up on Universal Everything</strong></summary>

1. Verify the data was written correctly by reading it back (see [Reading the Grid](#reading-the-grid))
2. Make sure the JSON structure matches the [LSP28 specification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-28-TheGrid.md) — the top-level key must be `LSP28TheGrid` containing an array
3. If using IPFS, ensure the CID is accessible and pinned
4. Check that `visibility` is set to `"public"` (or omitted, which defaults to public)

</details>

<details>
<summary><strong>❌ High gas cost when setting Grid data</strong></summary>

On-chain base64 storage costs more gas for large JSON payloads. Consider:

- **Using IPFS** for grids with many elements
- **Minimizing JSON** — remove unnecessary whitespace before base64 encoding
- **Reducing elements** — start with fewer grid items and add more over time

</details>

## Further Reading

- [LSP28 — The Grid Specification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-28-TheGrid.md)
- [LSP2 — ERC725Y JSON Schema (VerifiableURI)](/standards/metadata/lsp2-json-schema.md#verifiableuri)
- [Connect to a Mini-App](/learn/mini-apps/connect-upprovider)
- [Testing Mini-Apps Locally](/learn/mini-apps/testing-miniapps)
- [erc725.js — Getting Started](/tools/dapps/erc725js/getting-started)
- [Universal Everything](https://universaleverything.io)
