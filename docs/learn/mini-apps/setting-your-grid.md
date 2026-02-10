---
sidebar_label: '🎨 Setting your Grid'
description: 'How to encode and set your LSP28 Grid on your Universal Profile'
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setting your Grid

<img
src="/img/guides/setting-your-grid.jpg"
alt="Example of a Universal Profile Grid with multiple widgets"
style={{ maxWidth: '100%', borderRadius: '8px' }}
/>

The [LSP28 The Grid](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-28-TheGrid.md) standard allows you to create a customizable dashboard of widgets on your Universal Profile. This guide covers how to encode and set your grid data on-chain.

## What You'll Learn

- The JSON structure for your grid data
- How to encode your grid data using `@erc725/erc725.js`
- How to set the grid data via `setData` using viem or ethers
- Choosing between storing your grid data on-chain encoded as base64 _vs_ off-chain in IPFS

## Prerequisites

| Requirement                | Description                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------- |
| **UP with KeyManager**     | Your Universal Profile must have a KeyManager deployed                                  |
| **Controller permissions** | Your controller needs `SUPER_SETDATA` or specific `SETDATA` permission for the grid key |
| **JSON grid data**         | Your grid configuration as a JSON object                                                |

## Understanding the Data Key

The grid data is stored under the following ERC725Y data key:

```
0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff
```

This key is derived from `keccak256('LSP28TheGrid')`.

## VerifiableURI Format

The grid data must be encoded as a [VerifiableURI](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#verifiableuri) following this structure:

| Component | Bytes    | Description                         |
| --------- | -------- | ----------------------------------- |
| `0x0000`  | 2        | VerifiableURI prefix                |
| method    | 4        | Verification method (see below)     |
| `0020`    | 2        | Verification data length (32 bytes) |
| `<hash>`  | 32       | keccak256 hash of the content       |
| `<url>`   | variable | Base64 data URI or IPFS URL         |

**Verification methods:**

| Method ID  | Algorithm          | Use for                             |
| ---------- | ------------------ | ----------------------------------- |
| `8019f9b1` | `keccak256(bytes)` | On-chain: hash of raw JSON bytes    |
| `6f357c6a` | `keccak256(utf8)`  | Off-chain: hash of UTF-8 URL string |

**Total structure:**

```
0x0000 + <method-id> + 0020 + <32-byte-hash> + <hex-encoded-url>
```

## Grid JSON Structure

Your grid must follow this JSON format:

```json
{
  "LSP28TheGrid": [
    {
      "width": 1,
      "height": 1,
      "type": "iframe",
      "properties": {
        "src": "https://example.com/widget"
      }
    }
  ]
}
```

:::success

For more details on all the available Grid properties (like embedding X or Instagram posts, or Elfsight widgets), see the [LSP28 specs](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-28-TheGrid.md#grid-element-properties).

:::

### Grid Item Properties

| Property     | Type   | Description                            |
| ------------ | ------ | -------------------------------------- |
| `width`      | number | Grid columns the item spans (1-12)     |
| `height`     | number | Grid rows the item spans               |
| `type`       | string | Widget type: `iframe`, `image`, `link` |
| `properties` | object | Type-specific configuration            |

## Encoding with erc725.js

Use the `@erc725/erc725.js` library to encode your grid. You can store the data either **on-chain** (base64 encoded) or **off-chain** (IPFS).

<Tabs>
  <TabItem value="onchain" label="On-Chain (base64)">

For on-chain storage, the JSON is embedded directly as base64 in the VerifiableURI with verification method `keccak256(bytes)`:

```typescript
import { ERC725 } from '@erc725/erc725.js';

// Define the LSP28 schema
const LSP28_SCHEMA = [
  {
    name: 'LSP28TheGrid',
    key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
    keyType: 'Singleton',
    valueType: 'VerifiableURI',
    valueContent: 'VerifiableURI',
  },
];

const gridData = {
  LSP28TheGrid: [
    {
      width: 1,
      height: 1,
      type: 'iframe',
      properties: {
        src: 'https://universalswaps.io',
      },
    },
  ],
};

// Initialize ERC725 with schema
const erc725 = new ERC725(LSP28_SCHEMA);

// Encode the JSON to a VerifiableURI with on-chain base64
const encodedData = erc725.encodeData([
  {
    keyName: 'LSP28TheGrid',
    value: {
      json: gridData, // The JSON object to encode as base64
      verification: {
        method: 'keccak256(bytes)',
        data: '0x', // Hash computed automatically
      },
    },
  },
]);

console.log('Encoded value:', encodedData.values[0]);
// Format: 0x0000 + 8019f9b1 (keccak256(bytes)) + 0020 + hash + base64url
```

  </TabItem>
  <TabItem value="offchain" label="Off-Chain (IPFS)">

For off-chain storage, upload to IPFS first, then encode the URL with verification method `keccak256(utf8)`:

```typescript
import { ERC725 } from '@erc725/erc725.js';

// Define the LSP28 schema
const LSP28_SCHEMA = [
  {
    name: 'LSP28TheGrid',
    key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
    keyType: 'Singleton',
    valueType: 'VerifiableURI',
    valueContent: 'VerifiableURI',
  },
];

const gridData = {
  LSP28TheGrid: [
    {
      width: 1,
      height: 1,
      type: 'iframe',
      properties: {
        src: 'https://universalswaps.io',
      },
    },
  ],
};

// 1. Upload JSON to IPFS (e.g., using nft.storage or Pinata)
const ipfsCid = 'QmYourCidHere...'; // Your IPFS CID
const ipfsUrl = `ipfs://${ipfsCid}`;

// Initialize ERC725 with schema
const erc725 = new ERC725(LSP28_SCHEMA);

// 2. Encode with off-chain URL
const encodedData = erc725.encodeData([
  {
    keyName: 'LSP28TheGrid',
    value: {
      url: ipfsUrl,
      verification: {
        method: 'keccak256(utf8)',
        data: '0x', // Hash of the UTF-8 URL
      },
    },
  },
]);

console.log('Encoded value:', encodedData.values[0]);
// Format: 0x0000 + 6f357c6a (keccak256(utf8)) + 0020 + hash + hex-encoded-ipfs-url
```

  </TabItem>
</Tabs>

## Setting Your Grid On-Chain

Choose your preferred library:

<Tabs>
  <TabItem value="viem" label="viem">

```typescript
import { createPublicClient, createWalletClient, http, custom } from 'viem';
import { lukso } from 'viem/chains';

const GRID_DATA_KEY =
  '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff';

// Your encoded grid data from erc725.js
const encodedGridData = '0x00008019f9b10020...'; // Full VerifiableURI

const publicClient = createPublicClient({
  chain: lukso,
  transport: http('https://rpc.mainnet.lukso.network'),
});

const walletClient = createWalletClient({
  chain: lukso,
  transport: custom(window.ethereum),
});

const [address] = await walletClient.getAddresses();

// Method 1: Direct UP setData (if controller has permission)
const hash = await walletClient.writeContract({
  address: '0xYOUR_UP_ADDRESS',
  abi: [
    {
      name: 'setData',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'dataKey', type: 'bytes32' },
        { name: 'dataValue', type: 'bytes' },
      ],
      outputs: [],
    },
  ],
  functionName: 'setData',
  args: [GRID_DATA_KEY, encodedGridData],
});

await publicClient.waitForTransactionReceipt({ hash });
```

  </TabItem>
  <TabItem value="ethers" label="ethers v6">

```typescript
import { ethers } from 'ethers';

const GRID_DATA_KEY =
  '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff';

// Your encoded grid data from erc725.js
const encodedGridData = '0x00008019f9b10020...'; // Full VerifiableURI

const provider = new ethers.JsonRpcProvider(
  'https://rpc.mainnet.lukso.network',
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// UP ABI for setData
const upAbi = ['function setData(bytes32 dataKey, bytes dataValue) external'];

const up = new ethers.Contract('0xYOUR_UP_ADDRESS', upAbi, wallet);

// Set the grid data
const tx = await up.setData(GRID_DATA_KEY, encodedGridData);
await tx.wait();

console.log('Grid updated! Transaction:', tx.hash);
```

  </TabItem>
</Tabs>

## Setting via KeyManager (Legacy Pattern)

:::info Modern Universal Profiles

Most modern Universal Profiles have the KeyManager functionality built-in. You can simply call `setData()` directly on your UP address — it will automatically route through the built-in KeyManager.

The separate KeyManager pattern below is for legacy UPs with external KeyManager contracts.

:::

For legacy UPs with a separate KeyManager contract:

<Tabs>
  <TabItem value="viem" label="viem">

```typescript
import { encodeFunctionData } from 'viem';

const upAbi = [
  {
    name: 'setData',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'dataKey', type: 'bytes32' },
      { name: 'dataValue', type: 'bytes' },
    ],
    outputs: [],
  },
];

const keyManagerAbi = [
  {
    name: 'execute',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'payload', type: 'bytes' }],
    outputs: [{ name: '', type: 'bytes' }],
  },
];

// Encode the UP.setData call
const setDataPayload = encodeFunctionData({
  abi: upAbi,
  functionName: 'setData',
  args: [GRID_DATA_KEY, encodedGridData],
});

// Execute via KeyManager
const hash = await walletClient.writeContract({
  address: '0xYOUR_KEY_MANAGER_ADDRESS',
  abi: keyManagerAbi,
  functionName: 'execute',
  args: [setDataPayload],
});
```

  </TabItem>
  <TabItem value="ethers" label="ethers v6">

```typescript
const upInterface = new ethers.Interface([
  'function setData(bytes32 dataKey, bytes dataValue) external',
]);

const keyManagerInterface = new ethers.Interface([
  'function execute(bytes payload) external returns (bytes)',
]);

// Encode the UP.setData call
const setDataPayload = upInterface.encodeFunctionData('setData', [
  GRID_DATA_KEY,
  encodedGridData,
]);

// Execute via KeyManager
const keyManager = new ethers.Contract(
  '0xYOUR_KEY_MANAGER_ADDRESS',
  keyManagerInterface,
  wallet,
);

const tx = await keyManager.execute(setDataPayload);
await tx.wait();
```

  </TabItem>
</Tabs>

## Complete Example

Here's a complete script that combines encoding and setting:

```typescript
import { ERC725 } from '@erc725/erc725.js';
import { ethers } from 'ethers';

const GRID_DATA_KEY =
  '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff';

// LSP28 Grid schema for ERC725
const LSP28_SCHEMA = [
  {
    name: 'LSP28TheGrid',
    key: GRID_DATA_KEY,
    keyType: 'Singleton',
    valueType: 'VerifiableURI',
    valueContent: 'VerifiableURI',
  },
];

const gridConfig = {
  LSP28TheGrid: [
    {
      width: 1,
      height: 1,
      type: 'iframe',
      properties: {
        src: 'https://universalswaps.io',
        title: 'Universal Swaps',
      },
    },
  ],
};

async function setGrid() {
  // 1. Initialize ERC725 with schema
  const erc725 = new ERC725(LSP28_SCHEMA);

  // 2. Encode the data (on-chain base64 example)
  const encoded = erc725.encodeData([
    {
      keyName: 'LSP28TheGrid',
      value: {
        json: gridConfig,
        verification: {
          method: 'keccak256(bytes)',
          data: '0x',
        },
      },
    },
  ]);

  // 3. Set directly on your Universal Profile
  const provider = new ethers.JsonRpcProvider(
    'https://rpc.mainnet.lukso.network',
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const up = new ethers.Contract(
    '0xYOUR_UP',
    ['function setData(bytes32,bytes) external'],
    wallet,
  );

  const tx = await up.setData(GRID_DATA_KEY, encoded.values[0]);
  await tx.wait();

  console.log('Grid set! Transaction:', tx.hash);
}

setGrid();
```

## Troubleshooting

| Issue                   | Solution                                                                                                   |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Grid not displaying** | Verify the VerifiableURI format — must include `0x0000` prefix, `8019f9b1` method, and `0020` length field |
| **Transaction reverts** | Check your controller has `SETDATA` permission for the grid key                                            |
| **Wrong hash**          | Ensure you're hashing the raw JSON bytes, not the string                                                   |
| **IPFS not loading**    | Use base64 data URI for immediate testing; switch to IPFS for production                                   |

## Next Steps

- [Create Mini-Apps](./connect-upprovider.md) that can run in your grid
- Learn about [up-provider](/tools/dapps/up-provider/getting-started) for seamless connections
- Explore [standard detection](../standard-detection.md) to identify grid capabilities

## References

- [LSP28 The Grid Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-28-TheGrid.md)
- [VerifiableURI Type](../../standards/standard-types.md#verifiableuri)
- [erc725.js Documentation](/tools/libraries/erc725js/getting-started)
