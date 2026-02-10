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
    src="/img/learn/grid-example.png"
    alt="LSP28 Grid layout on a Universal Profile"
    width="633"
  />
<br/>
<i>A customizable Grid layout on a Universal Profile, hosting mini-apps, social embeds, and content.</i>
<br /><br />
</div>

The **Grid** ([LSP28](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-28-TheGrid.md)) is a standard that lets Universal Profiles display **customizable, modular layouts** made of mini-apps, social media embeds, images, text, and other interactive content. Think of it as a personal dashboard you can attach to any Universal Profile.

This guide walks you through:

1. Understanding the JSON structure of a Grid and all its available element types
2. How to encode the Grid as a [VerifiableURI](/standards/metadata/lsp2-json-schema.md#verifiableuri)
3. Encode the grid data either on-chain as base64 or off-chain on IPFS
4. Set it on your Universal Profile via `setData(bytes32,bytes)`

:::info What are Mini-Apps?
Mini-Apps are dApps that run inside an `<iframe>` on a host page. The Grid standard provides the layout framework for embedding them. Learn more about connecting Mini-Apps in the [Connect to a Mini-App](/learn/mini-apps/connect-upprovider) guide.
:::

## Prerequisites

- A **Universal Profile** with the [UP Browser Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) installed

### Install Dependencies

<Tabs groupId="provider-lib">
<TabItem value="viem" label="viem + wagmi" default>

```shell
npm install wagmi viem@2.x @tanstack/react-query @erc725/erc725.js @lukso/lsp-smart-contracts
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

The Grid data is stored under a single [ERC725Y](http://docs.lukso.tech/standards/erc725/#erc725y-generic-data-keyvalue-store) data key.

To get the `bytes32` data key to set in the [`UniversalProfile`](/docs/contracts/contracts/UniversalProfile/UniversalProfile.md) smart contract via [`setData(bytes32,bytes)`](/docs/contracts/contracts/UniversalProfile/UniversalProfile.md#setdata), hash the string `'LSP28TheGrid'` using `keccak256`.

```shell
keccak256('LSP28TheGrid') = 0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff
```

:::warning Draft Standard
LSP28 is currently a **draft** standard. The data key is not yet exported from `@lukso/lsp-smart-contracts`. We define the ERC725Y schema inline in this guide. Once the standard is finalized, import the data key from the package instead of hardcoding it.
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

The value is a **[VerifiableURI](/standards/metadata/lsp2-json-schema.md#verifiableuri)** — a compact bytes encoding that pairs a content hash with a URI pointing to the actual JSON data (either on IPFS or stored on-chain as base64).

## Grid JSON Structure

The Grid follows a specific JSON format defined by the [LSP28 specification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-28-TheGrid.md). Below is the full structure with all available properties. You can have multiple grids on multiple tabs. The `"LSP28TheGrid:"` property accepts an array of objects.

<details>
    <summary>See LSP28TheGrid JSON file template</summary>

```json
{
  "LSP28TheGrid": [
    {
      "title": "My Socials",
      "gridColumns": 2,
      "visibility": "private",
      "grid": [
        {
          "width": 1,
          "height": 3,
          "type": "IFRAME",
          "properties": {
            "src": "...",
            "allow": "accelerometer; autoplay; clipboard-write",
            "sandbox": "allow-forms;allow-pointer-lock;allow-popups;allow-same-orig;allow-scripts;allow-top-navigation",
            "allowfullscreen": true,
            "referrerpolicy": "..."
          }
        },
        {
          "width": 2,
          "height": 2,
          "type": "TEXT",
          "properties": {
            "title": "My title",
            "titleColor": "#000000",
            "text": "My title",
            "textColor": "#000000",
            "backgroundColor": "#ffffff",
            "backgroundImage": "https://myimage.jpg",
            "link": "https://mylink.com"
          }
        },
        {
          "width": 2,
          "height": 2,
          "type": "IMAGES",
          "properties": {
            "type": "grid",
            "images": ["<IMAGE_URL_1>", "<IMAGE_URL_2>"]
          }
        },
        {
          "width": 2,
          "height": 1,
          "type": "ELFSIGHT",
          "properties": {
            "id": "..."
          }
        },
        {
          "width": 2,
          "height": 1,
          "type": "X",
          "properties": {
            "type": "post",
            "username": "feindura",
            "id": "1804519711377436675",
            "theme": "light",
            "language": "en",
            "donottrack": true
          }
        },
        {
          "width": 2,
          "height": 2,
          "type": "INSTAGRAM",
          "properties": {
            "type": "p",
            "id": "..."
          }
        },
        {
          "width": 2,
          "height": 1,
          "type": "QR_CODE",
          "properties": {
            "data": "..."
          }
        }
      ]
    }
  ]
}
```

</details>

<details>
    <summary>Visual example of multiple Grids across tabs</summary>

![Multiple grid tabs example](/img/learn/multi-grid-tabs-example.png)

</details>

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

<details>
    <summary><code>IFRAME</code> — Embedded Web Content / Mini-Apps</summary>

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

</details>

<details>
    <summary><code>TEXT</code> — Text Content Block</summary>

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

</details>

<details>
    <summary><code>IMAGES</code> — Image Gallery</summary>

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

</details>

<details>
    <summary><code>X</code> — X/Twitter Embed</summary>

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

</details>

<details>
    <summary><code>INSTAGRAM</code> — Instagram Embed</summary>

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

</details>

<details>
    <summary><code>QR_CODE</code> — QR Code</summary>

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

</details>

<details>
    <summary><code>ELFSIGHT</code> — Elfsight Widget</summary>

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

</details>

### Full Example

Here is a complete Grid JSON with multiple element types:

<details>
<summary>Single Grid - JSON example</summary>

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

<details>
<summary>Multiple Grids across tabs - JSON example</summary>

```json
{
  "LSP28TheGrid": [
    {
      "title": "Art Gallery",
      "gridColumns": 3,
      "visibility": "public",
      "grid": [
        {
          "width": 2,
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
          "type": "TEXT",
          "properties": {
            "title": "Welcome!",
            "text": "Enjoy my latest artwork.",
            "backgroundColor": "#fffaf0",
            "textColor": "#302b29"
          }
        },
        {
          "width": 1,
          "height": 1,
          "type": "QR_CODE",
          "properties": {
            "data": "https://myartsite.example.com"
          }
        }
      ]
    },
    {
      "title": "Mini-Apps",
      "gridColumns": 3,
      "visibility": "public",
      "grid": [
        {
          "width": 2,
          "height": 2,
          "type": "IFRAME",
          "properties": {
            "src": "https://my-mini-app.example.com"
          }
        },
        {
          "width": 1,
          "height": 2,
          "type": "TEXT",
          "properties": {
            "title": "Try My App",
            "text": "Interact with my custom mini-app here!",
            "backgroundColor": "#e7f6f9",
            "textColor": "#123456"
          }
        }
      ]
    },
    {
      "title": "Social",
      "gridColumns": 2,
      "visibility": "public",
      "grid": [
        {
          "width": 2,
          "height": 1,
          "type": "X",
          "properties": {
            "type": "post",
            "username": "lukso",
            "id": "1804519711377436675",
            "theme": "light"
          }
        },
        {
          "width": 1,
          "height": 1,
          "type": "INSTAGRAM",
          "properties": {
            "type": "p",
            "id": "CgNUIyjCDcV"
          }
        }
      ]
    }
  ]
}
```

</details>

## Encoding the Grid Data

:::success On-Chain vs IPFS
Storing data on-chain as base64 is convenient for small grids but costs more gas to set as the JSON grows. For larger grids with many elements, IPFS is more cost-effective. The JSON content is identical either way — only the URI format differs.
:::

:::info About `VerifiableURI` encoding
See the [**LSP2 > `valueContent` encoding > `VerifiableURI`**](/docs/standards/metadata/lsp2-json-schema.md#verifiableuri) section of the LSP2 page for more technical details on how a `VerifiableURI` value is generated.
:::

We use [erc725.js](/tools/dapps/erc725js/getting-started) to encode the Grid JSON into a `VerifiableURI` value. The library handles the hash computation and binary packing automatically.

<Tabs groupId="storage-method">
<TabItem value="ipfs" label="📦 IPFS Storage" default>

:::success Tip — Uploading to IPFS
You can use the [LUKSO data providers](https://github.com/lukso-network/tools-data-providers) library to upload your Grid JSON to IPFS. It supports local IPFS nodes, Pinata, Infura, and more.
:::

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

// After uploading your Grid JSON to IPFS, encode the reference / IPFS CID of the file as shown below
const encodedData = erc725.encodeData([
  {
    keyName: 'LSP28TheGrid',
    value: {
      hashFunction: 'keccak256(utf8)',
      hash: '0x...', // keccak256 hash of the Grid JSON string
      url: 'ipfs://Qm<ipfs-cid-of-grid-json-file>',
    },
  },
]);

// 0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff
console.log('Data Key:', encodedData.keys[0]);

// Encoded value must start with one of the following:
// - 0x00006f357c6a0020... (off-chain storage)
// - 0x00008019f9b10020... (on-chain storage)
console.log('Encoded Value:', encodedData.values[0]);
```

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

// 0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff
console.log('Data Key:', encodedData.keys[0]);

// Encoded value must start with one of the following:
// - 0x00006f357c6a0020... (off-chain storage)
// - 0x00008019f9b10020... (on-chain storage)
console.log('Encoded Value:', encodedData.values[0]);
```

</TabItem>
</Tabs>

## Setting the Grid

Once you have the encoded data key-value pair, call [`setData(bytes32,bytes)`](/contracts/contracts/UniversalProfile/#setdata) on the Universal Profile contract.

<Tabs groupId="provider-lib">
<TabItem value="viem" label="viem + wagmi" default>

```javascript title="set-grid-viem.jsx"
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// LSP28 ERC725Y Schema
const LSP28Schema = {
  name: 'LSP28TheGrid',
  key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'VerifiableURI',
};

function SetGrid() {
  const { address: UP_ADDRESS } = useAccount();
  const { writeContract, data: txHash } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  async function handleSetGrid() {
    // 1. Encode the Grid data (see previous section)
    const erc725 = new ERC725([LSP28Schema]);

    const encodedData = erc725.encodeData([
      {
        keyName: 'LSP28TheGrid',
        value: {
          hashFunction: 'keccak256(utf8)',
          hash: '0x...', // keccak256 hash of your Grid JSON
          url: 'ipfs://Qm<ipfs-cid-of-grid-json-file>', // or data:application/json;base64,...
        },
      },
    ]);

    // 2. Call setData on the UP — the Browser Extension handles signing
    writeContract({
      address: UP_ADDRESS,
      abi: UniversalProfile.abi,
      functionName: 'setData',
      args: [encodedData.keys[0], encodedData.values[0]],
    });
  }

  return (
    <button onClick={handleSetGrid}>
      {isSuccess ? '✅ Grid set!' : 'Set Grid'}
    </button>
  );
}
```

</TabItem>
<TabItem value="ethers" label="ethers">

```javascript title="set-grid-ethers.js"
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// LSP28 ERC725Y Schema
const LSP28Schema = {
  name: 'LSP28TheGrid',
  key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'VerifiableURI',
};

async function setGrid() {
  // 1. Connect via the UP Browser Extension
  const provider = new ethers.BrowserProvider(window.lukso);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  const account = await signer.getAddress();

  // 2. Encode the Grid data
  const erc725 = new ERC725([LSP28Schema]);

  const encodedData = erc725.encodeData([
    {
      keyName: 'LSP28TheGrid',
      value: {
        hashFunction: 'keccak256(utf8)',
        hash: '0x...', // keccak256 hash of your Grid JSON
        url: 'ipfs://Qm<ipfs-cid-of-grid-json-file>', // or data:application/json;base64,...
      },
    },
  ]);

  // 3. Create UP contract instance and call setData
  const upContract = new ethers.Contract(
    account, // The Universal Profile address
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

// LSP28 ERC725Y Schema
const LSP28Schema = {
  name: 'LSP28TheGrid',
  key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'VerifiableURI',
};

async function setGrid() {
  // 1. Connect via the UP Browser Extension
  const web3 = new Web3(window.lukso);
  await web3.eth.requestAccounts();
  const accounts = await web3.eth.getAccounts();

  // 2. Encode the Grid data
  const erc725 = new ERC725([LSP28Schema]);

  const encodedData = erc725.encodeData([
    {
      keyName: 'LSP28TheGrid',
      value: {
        hashFunction: 'keccak256(utf8)',
        hash: '0x...', // keccak256 hash of your Grid JSON
        url: 'ipfs://Qm<ipfs-cid-of-grid-json-file>', // or data:application/json;base64,...
      },
    },
  ]);

  // 3. Create UP contract instance and call setData
  const upContract = new web3.eth.Contract(UniversalProfile.abi, accounts[0]);

  const receipt = await upContract.methods
    .setData(encodedData.keys[0], encodedData.values[0])
    .send({ from: accounts[0] });

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
const RPC_URL = 'https://rpc.mainnet.lukso.network'; // Use https://rpc.testnet.lukso.network for testnet

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

1. Verify the data was written correctly by reading it back. Use [**ERC725 Inspect Tool**](https://erc725-inspect.lukso.tech/inspector?address=0x26e7Da1968cfC61FB8aB2Aad039b5A083b9De21e) or see the [Reading the Grid guide](#reading-the-grid))
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
- [erc725.js — Useful utility functions for `VerifiableURI`](/tools/dapps/erc725js/methods/#external-data-source-utilities-verifiableuri-and-jsonuri)
- [Universal Everything](https://universaleverything.io)
