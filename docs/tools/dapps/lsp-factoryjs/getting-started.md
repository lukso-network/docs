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
npm install @lukso/lsp-factory.js
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
You can use any viem-supported chain. Just swap `luksoTestnet` for `lukso`, `mainnet`, `base`, etc.
:::

## Deploying a Universal Profile

Deploys an [LSP0 Universal Profile](../../../standards/accounts/lsp0-erc725account.md) and [LSP6 KeyManager](../../../standards/access-control/lsp6-key-manager.md) atomically via LSP23, then configures controller permissions and a Universal Receiver Delegate.

```typescript
const contracts = await factory.UniversalProfile.deploy({
  controllerAddresses: ['0x...'], // Addresses that will control the UP
});

console.log('UP Address:', contracts.LSP0ERC725Account.address);
console.log('KeyManager Address:', contracts.LSP6KeyManager.address);
```

### With LSP3 metadata and a deterministic salt

```typescript
const contracts = await factory.UniversalProfile.deploy(
  {
    controllerAddresses: ['0x...'],
    lsp3DataValue: '0x...', // Pre-encoded LSP3Profile data (VerifiableURI)
  },
  {
    salt: '0x...', // bytes32 salt for deterministic address generation
  },
);
```

### With custom controller permissions

```typescript
const contracts = await factory.UniversalProfile.deploy({
  controllerAddresses: [
    '0xFullPermissionsAddress', // Gets ALL_PERMISSIONS by default
    {
      address: '0xLimitedAddress',
      permissions:
        '0x0000000000000000000000000000000000000000000000000000000000000010',
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
      method: 'keccak256(utf8)',
      data: '0x...',
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
  tokenIdFormat: 1, // Token ID format (e.g., 1 = Number)
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
