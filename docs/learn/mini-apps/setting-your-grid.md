---
sidebar_label: '🎨 Setting your Grid'
description: 'How to encode and set your LSP28 Grid on your Universal Profile'
sidebar_position: 0
---

# Setting your Grid

The [LSP28 The Grid](../../standards/access-control/lsp28-the-grid.md) standard allows you to create a customizable dashboard of widgets on your Universal Profile. This guide covers how to encode and set your grid data on-chain.

## What You'll Learn

- The VerifiableURI format for grid data
- How to encode your grid using `@erc725/erc725.js`
- How to set the grid data via `setData` using viem or ethers

## Prerequisites

| Requirement | Description |
|-------------|-------------|
| **UP with KeyManager** | Your Universal Profile must have a KeyManager deployed |
| **Controller permissions** | Your controller needs `SUPER_SETDATA` or specific `SETDATA` permission for the grid key |
| **JSON grid data** | Your grid configuration as a JSON object |

## Understanding the Data Key

The grid data is stored at a specific ERC725Y key:

```
0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff
```

This key is derived from `keccak256('LSP28TheGrid')`.

## VerifiableURI Format

The grid data must be encoded as a [VerifiableURI](../../standards/standard-types.md#verifiableuri) following this structure:

| Component | Bytes | Description |
|-----------|-------|-------------|
| `0x0000` | 2 | VerifiableURI prefix |
| `8019f9b1` | 4 | Verification method (keccak256(bytes)) |
| `0020` | 2 | Verification data length (32 bytes) |
| `<hash>` | 32 | keccak256 hash of the JSON content |
| `<url>` | variable | Base64 data URI or IPFS URL |

**Total structure:**
```
0x0000 + 8019f9b1 + 0020 + <32-byte-hash> + <hex-encoded-url>
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

### Grid Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `width` | number | Grid columns the item spans (1-12) |
| `height` | number | Grid rows the item spans |
| `type` | string | Widget type: `iframe`, `image`, `link` |
| `properties` | object | Type-specific configuration |

## Encoding with erc725.js

Use the `@erc725/erc725.js` library to encode your grid:

```typescript
import { ERC725 } from '@erc725/erc725.js';
import LSP28TheGrid from '@lukso/lsp28-contracts/...'; // Schema import

const gridData = {
  LSP28TheGrid: [
    {
      width: 1,
      height: 1,
      type: 'iframe',
      properties: {
        src: 'https://universalswaps.io'
      }
    },
    {
      width: 1,
      height: 1,
      type: 'iframe',
      properties: {
        src: 'https://stakingverse.io'
      }
    }
  ]
};

// Encode the JSON to a VerifiableURI
const encodedData = ERC725.encodeData([
  {
    keyName: 'LSP28TheGrid',
    value: JSON.stringify(gridData)
  }
]);

console.log('Encoded value:', encodedData.values[0]);
```

## Setting Your Grid On-Chain

Choose your preferred library:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="viem" label="viem">

```typescript
import { createPublicClient, createWalletClient, http, custom } from 'viem';
import { lukso } from 'viem/chains';

const GRID_KEY = '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff';

// Your encoded grid data from erc725.js
const encodedGridData = '0x00008019f9b10020...'; // Full VerifiableURI

const publicClient = createPublicClient({
  chain: lukso,
  transport: http('https://rpc.mainnet.lukso.network')
});

const walletClient = createWalletClient({
  chain: lukso,
  transport: custom(window.ethereum)
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
        { name: 'dataValue', type: 'bytes' }
      ],
      outputs: []
    }
  ],
  functionName: 'setData',
  args: [GRID_KEY, encodedGridData]
});

await publicClient.waitForTransactionReceipt({ hash });
```

  </TabItem>
  <TabItem value="ethers" label="ethers v6">

```typescript
import { ethers } from 'ethers';

const GRID_KEY = '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff';

// Your encoded grid data from erc725.js
const encodedGridData = '0x00008019f9b10020...'; // Full VerifiableURI

const provider = new ethers.JsonRpcProvider('https://rpc.mainnet.lukso.network');
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

// UP ABI for setData
const upAbi = [
  'function setData(bytes32 dataKey, bytes dataValue) external'
];

const up = new ethers.Contract('0xYOUR_UP_ADDRESS', upAbi, wallet);

// Set the grid data
const tx = await up.setData(GRID_KEY, encodedGridData);
await tx.wait();

console.log('Grid updated! Transaction:', tx.hash);
```

  </TabItem>
</Tabs>

## Setting via KeyManager

If your UP uses a KeyManager (recommended), execute via the KeyManager:

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
      { name: 'dataValue', type: 'bytes' }
    ],
    outputs: []
  }
];

const keyManagerAbi = [
  {
    name: 'execute',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'payload', type: 'bytes' }],
    outputs: [{ name: '', type: 'bytes' }]
  }
];

// Encode the UP.setData call
const setDataPayload = encodeFunctionData({
  abi: upAbi,
  functionName: 'setData',
  args: [GRID_KEY, encodedGridData]
});

// Execute via KeyManager
const hash = await walletClient.writeContract({
  address: '0xYOUR_KEY_MANAGER_ADDRESS',
  abi: keyManagerAbi,
  functionName: 'execute',
  args: [setDataPayload]
});
```

  </TabItem>
  <TabItem value="ethers" label="ethers v6">

```typescript
const upInterface = new ethers.Interface([
  'function setData(bytes32 dataKey, bytes dataValue) external'
]);

const keyManagerInterface = new ethers.Interface([
  'function execute(bytes payload) external returns (bytes)'
]);

// Encode the UP.setData call
const setDataPayload = upInterface.encodeFunctionData('setData', [
  GRID_KEY,
  encodedGridData
]);

// Execute via KeyManager
const keyManager = new ethers.Contract(
  '0xYOUR_KEY_MANAGER_ADDRESS',
  keyManagerInterface,
  wallet
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

const GRID_KEY = '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff';

const gridConfig = {
  LSP28TheGrid: [
    {
      width: 1,
      height: 1,
      type: 'iframe',
      properties: {
        src: 'https://universalswaps.io',
        title: 'Universal Swaps'
      }
    }
  ]
};

async function setGrid() {
  // 1. Encode the data
  const encoded = ERC725.encodeData([
    {
      keyName: 'LSP28TheGrid',
      value: JSON.stringify(gridConfig)
    }
  ]);

  // 2. Set via KeyManager
  const provider = new ethers.JsonRpcProvider('https://rpc.mainnet.lukso.network');
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  const km = new ethers.Contract(
    '0xYOUR_KEY_MANAGER',
    ['function execute(bytes) external returns (bytes)'],
    wallet
  );

  const up = new ethers.Contract(
    '0xYOUR_UP',
    ['function setData(bytes32,bytes) external'],
    wallet
  );

  const payload = up.interface.encodeFunctionData('setData', [
    GRID_KEY,
    encoded.values[0]
  ]);

  const tx = await km.execute(payload);
  await tx.wait();
  
  console.log('Grid set! Transaction:', tx.hash);
}

setGrid();
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Grid not displaying** | Verify the VerifiableURI format — must include `0x0000` prefix, `8019f9b1` method, and `0020` length field |
| **Transaction reverts** | Check your controller has `SETDATA` permission for the grid key |
| **Wrong hash** | Ensure you're hashing the raw JSON bytes, not the string |
| **IPFS not loading** | Use base64 data URI for immediate testing; switch to IPFS for production |

## Next Steps

- [Create Mini-Apps](./connect-upprovider.md) that can run in your grid
- Learn about [up-provider](/tools/dapps/up-provider/getting-started) for seamless connections
- Explore [standard detection](../standard-detection.md) to identify grid capabilities

## References

- [LSP28 The Grid Standard](../../standards/access-control/lsp28-the-grid.md)
- [VerifiableURI Type](../../standards/standard-types.md#verifiableuri)
- [erc725.js Documentation](/tools/libraries/erc725js/getting-started)