---
sidebar_position: 1.1
---

# Getting Started

`@lukso/lsp-factory.js` is a helper library for deploying [Universal Profiles](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md), [LSP7 Digital Assets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md), and [LSP8 Identifiable Digital Assets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md).

v4 uses [viem](https://viem.sh/) for all blockchain interactions and deploys contracts atomically via [LSP23LinkedContractsFactory](../../../standards/factories/lsp23-linked-contracts-factory.md).

## Supported Networks

All contracts (LSP23 factory, base implementations) are deployed at the same deterministic addresses across chains via the [Nick Factory (EIP-2470)](https://eips.ethereum.org/EIPS/eip-2470).

**LSP23 Factory Address:** `0x2300000A84D25dF63081feAa37ba6b62C4c89a30`

| Network          | Chain ID |
| ---------------- | -------- |
| LUKSO Mainnet    | 42       |
| LUKSO Testnet    | 4201     |
| Ethereum Mainnet | 1        |
| BASE             | 8453     |

## Installation

```bash
npm install @lukso/lsp-factory.js @erc725/erc725.js
```

## Setup

Create a [viem](https://viem.sh/) `PublicClient` (for reading) and `WalletClient` (for signing transactions), then pass them to `LSPFactory`:

```typescript
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { luksoTestnet } from 'viem/chains';
import { LSPFactory } from '@lukso/lsp-factory.js';

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

const factory = new LSPFactory(publicClient, walletClient);
```

:::tip
You can use any viem-supported chain. Just swap `luksoTestnet` for the chain you want to deploy to:

```typescript
import { lukso } from 'viem/chains'; // LUKSO Mainnet (42)
import { luksoTestnet } from 'viem/chains'; // LUKSO Testnet (4201)
import { mainnet } from 'viem/chains'; // Ethereum (1)
import { base } from 'viem/chains'; // BASE (8453)
```

:::

## Deploying a Universal Profile

Deploys an [LSP0 Universal Profile](../../../standards/accounts/lsp0-erc725account.md) and [LSP6 KeyManager](../../../standards/access-control/lsp6-key-manager.md) atomically via [LSP23 Factory](../../../standards/factories/lsp23-linked-contracts-factory.md), then configures controller permissions and a Universal Receiver Delegate.

```typescript
const contracts = await factory.UniversalProfile.deploy({
  controllerAddresses: ['0x...'], // Addresses that will control the UP
});

console.log('UP Address:', contracts.LSP0ERC725Account.address);
console.log('KeyManager Address:', contracts.LSP6KeyManager.address);
```

### With LSP3 metadata and a deterministic salt

First, encode your LSP3Profile metadata using [erc725.js](https://docs.lukso.tech/tools/dapps/erc725js/getting-started):

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

const lsp3DataValue = encoded.values[0];
```

Then pass it into the deploy call:

```typescript
const contracts = await factory.UniversalProfile.deploy(
  {
    controllerAddresses: ['0x...'],
    lsp3DataValue, // Pre-encoded LSP3Profile VerifiableURI
  },
  {
    salt: '0x...', // bytes32 salt for deterministic address generation
  },
);
```

### With custom controller permissions

```typescript
import { ERC725 } from '@erc725/erc725.js';

// Replace with the correct addresses for your controllers
const adminController = '0x...';
const restrictedController = '0x...';

const contracts = await factory.UniversalProfile.deploy({
  controllerAddresses: [
    // Gets ALL_PERMISSIONS by default
    adminController,
    {
      address: restrictedController,
      permissions: ERC725.encodePermissions({ SUPER_SETDATA: true }),
    },
  ],
});
```

### Pre-computing addresses

Compute the UP and KeyManager addresses before deploying:

```typescript
const { upAddress, keyManagerAddress } =
  await factory.UniversalProfile.computeAddress(
    { controllerAddresses: ['0x...'] },
    { salt: '0x...' }, // Use the same salt you will deploy with
  );
```

## Deploying an LSP7 Digital Asset

Deploys an [LSP7 Digital Asset](../../../standards/tokens/LSP7-Digital-Asset.md) (fungible token) as a minimal proxy:

```typescript
const contracts = await factory.LSP7DigitalAsset.deploy({
  name: 'My Token',
  symbol: 'MTK',
  controllerAddress: '0x...', // Owner of the token contract
  tokenType: 0, // 0 = Token, 1 = NFT, 2 = Collection
  isNFT: false, // Whether the token is non-divisible
});

console.log('LSP7 Address:', contracts.LSP7DigitalAsset.address);
```

### With metadata

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
      data: '0x...', // keccak256 hash of the JSON metadata file bytes
    },
    url: 'ipfs://Qm...',
  },
});
```

## Deploying an LSP8 Identifiable Digital Asset

Deploys an [LSP8 Identifiable Digital Asset](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) (NFT) as a minimal proxy:

```typescript
const contracts = await factory.LSP8IdentifiableDigitalAsset.deploy({
  name: 'My NFT Collection',
  symbol: 'MNFT',
  controllerAddress: '0x...',
  tokenType: 1, // 0 = Token, 1 = NFT, 2 = Collection
  // Token ID format constants (from @lukso/lsp8-contracts):
  // 0 = UNIQUE_ID    (unique bytes32)
  // 1 = NUMBER       (sequential uint256)
  // 2 = STRING       (human-readable string)
  // 3 = ADDRESS      (address packed in bytes32)
  // 4 = HASH         (keccak256 hash)
  tokenIdFormat: 1,
});

console.log('LSP8 Address:', contracts.LSP8IdentifiableDigitalAsset.address);
```

## Deployment Events

All `deploy` methods accept an `onDeployEvents` callback for tracking deployment progress:

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

## Next steps

- [Edit Universal Profile metadata](../../../learn/universal-profile/metadata/edit-profile.md)
- [Deploying tokens and NFTs](../../../learn/digital-assets/getting-started.md)
- [LSP1 Notification Type IDs](../../../contracts/type-ids.md) — understanding notifications when deploying assets
