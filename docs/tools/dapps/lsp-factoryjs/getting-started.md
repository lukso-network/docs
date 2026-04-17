---
sidebar_position: 1.1
---

# Getting Started

`@lukso/lsp-factory.js` makes it easy to deploy smart accounts and tokens on LUKSO (and other EVM chains). Instead of manually deploying and wiring up multiple contracts, the factory handles everything in a single call:

- **[Universal Profiles](/standards/accounts/lsp0-erc725account)** — smart accounts with a built-in [Key Manager](/standards/access-control/lsp6-key-manager) for access control and a [Universal Receiver](/standards/accounts/lsp1-universal-receiver) for reacting to transactions
- **[LSP7 Digital Assets](/standards/tokens/LSP7-Digital-Asset)** — fungible tokens (like ERC-20, but with more features)
- **[LSP8 Identifiable Digital Assets](/standards/tokens/LSP8-Identifiable-Digital-Asset)** — NFTs (like ERC-721, but with richer metadata)

Under the hood, the library uses [LSP23](/standards/factories/lsp23-linked-contracts-factory) to deploy contracts atomically — meaning your Universal Profile and its Key Manager are created together in one transaction, so you never end up with a half-configured account.

:::info Requirements

- Node.js >= 22
- TypeScript >= 5.9

:::

## Installation

```bash
npm install @lukso/lsp-factory.js
```

## Quick Start

```typescript
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { luksoTestnet } from 'viem/chains';
import { LSPFactory } from '@lukso/lsp-factory.js';

// 1. Set up your account and clients
const account = privateKeyToAccount('0x...');

const publicClient = createPublicClient({
  chain: luksoTestnet,
  transport: http(),
});

const walletClient = createWalletClient({
  account,
  chain: luksoTestnet,
  transport: http(),
});

// 2. Create the factory
const factory = new LSPFactory(publicClient, walletClient);

// 3. Deploy a Universal Profile
const contracts = await factory.UniversalProfile.deploy({
  controllerAddresses: [account.address],
});

console.log('UP Address:', contracts.LSP0ERC725Account.address);
console.log('KeyManager:', contracts.LSP6KeyManager.address);
```

That's it — you now have a fully configured Universal Profile with a Key Manager, controller permissions, and a Universal Receiver Delegate, all deployed in one transaction.

:::tip Switching networks
Swap the chain import to deploy on any supported network:

```typescript
import { lukso } from 'viem/chains'; // LUKSO Mainnet
import { luksoTestnet } from 'viem/chains'; // LUKSO Testnet
import { mainnet } from 'viem/chains'; // Ethereum
import { base } from 'viem/chains'; // BASE
```

:::

## Universal Profile Options

### Adding profile metadata

To set a name, description, and avatar on your profile, encode the data with [erc725.js](https://docs.lukso.tech/tools/dapps/erc725js/getting-started) first:

```bash
npm install @erc725/erc725.js
```

```typescript
import { ERC725 } from '@erc725/erc725.js';
import LSP3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725 = new ERC725(LSP3ProfileSchema);

const encoded = erc725.encodeData([
  {
    keyName: 'LSP3Profile',
    value: { json: metadata, url: 'ipfs://...' },
  },
]);

const contracts = await factory.UniversalProfile.deploy(
  {
    controllerAddresses: ['0x...'],
    lsp3DataValue: encoded.values[0],
  },
  {
    salt: '0x...', // optional: makes the deployed address deterministic
  },
);
```

### Setting controller permissions

By default, every address in `controllerAddresses` gets full permissions. You can restrict specific controllers:

```typescript
import { ERC725 } from '@erc725/erc725.js';

const contracts = await factory.UniversalProfile.deploy({
  controllerAddresses: [
    '0xAdmin...', // full permissions (ALL_PERMISSIONS)
    {
      address: '0xRestricted...',
      permissions: ERC725.encodePermissions({ SUPER_SETDATA: true }),
    },
  ],
});
```

### Pre-computing addresses

If you need to know the contract addresses before deploying (e.g., for cross-contract references), use the same salt:

```typescript
const { upAddress, keyManagerAddress } =
  await factory.UniversalProfile.computeAddress(
    { controllerAddresses: ['0x...'] },
    { salt: '0x...' },
  );
```

## Deploying Tokens

### LSP7 — Fungible Tokens

```typescript
const contracts = await factory.LSP7DigitalAsset.deploy({
  name: 'My Token',
  symbol: 'MTK',
  controllerAddress: '0x...', // token contract owner
  tokenType: 0, // 0 = Token, 1 = NFT, 2 = Collection
  isNFT: false, // true = non-divisible (0 decimals)
});

console.log('Token address:', contracts.LSP7DigitalAsset.address);
```

#### With metadata

```typescript
const contracts = await factory.LSP7DigitalAsset.deploy({
  name: 'My Token',
  symbol: 'MTK',
  controllerAddress: '0x...',
  tokenType: 0,
  isNFT: false,
  digitalAssetMetadata: {
    verification: {
      method: 'keccak256(bytes)',
      data: '0x...', // hash of the JSON metadata file
    },
    url: 'ipfs://Qm...',
  },
});
```

### LSP8 — NFTs

```typescript
const contracts = await factory.LSP8IdentifiableDigitalAsset.deploy({
  name: 'My NFT Collection',
  symbol: 'MNFT',
  controllerAddress: '0x...',
  tokenType: 1, // 0 = Token, 1 = NFT, 2 = Collection
  tokenIdFormat: 1, // how token IDs are structured (see below)
});

console.log('NFT address:', contracts.LSP8IdentifiableDigitalAsset.address);
```

**Token ID formats:**

| Value | Format      | Description                 |
| ----- | ----------- | --------------------------- |
| 0     | `UNIQUE_ID` | Unique `bytes32`            |
| 1     | `NUMBER`    | Sequential number           |
| 2     | `STRING`    | Human-readable string       |
| 3     | `ADDRESS`   | Address packed in `bytes32` |
| 4     | `HASH`      | `keccak256` hash            |

## Tracking Deployment Progress

All `deploy` methods accept an `onDeployEvents` callback:

```typescript
const contracts = await factory.UniversalProfile.deploy(
  { controllerAddresses: ['0x...'] },
  {
    onDeployEvents: {
      next: (event) => {
        console.log(event.status, event.contractName, event.functionName);
      },
      error: (error) => {
        console.error('Deployment error:', error);
      },
      complete: (deployedContracts) => {
        console.log('Deployment complete:', deployedContracts);
      },
    },
  },
);
```

## Supported Networks

The factory contracts are deployed at the same addresses on all supported chains via deterministic deployment ([EIP-2470](https://eips.ethereum.org/EIPS/eip-2470)):

| Network          | Chain ID |
| ---------------- | -------- |
| LUKSO Mainnet    | 42       |
| LUKSO Testnet    | 4201     |
| Ethereum Mainnet | 1        |
| BASE             | 8453     |

**LSP23 Factory Address:** `0x2300000A84D25dF63081feAa37ba6b62C4c89a30`

## Next Steps

- [Edit Universal Profile metadata](/learn/universal-profile/metadata/edit-profile)
- [Deploying tokens and NFTs](/learn/digital-assets/getting-started)
- [LSP1 Notification Type IDs](/contracts/type-ids) — understanding notifications when deploying assets
