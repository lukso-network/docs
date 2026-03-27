---
sidebar_position: 1
sidebar_label: 'viem & wagmi'
title: 'viem & wagmi'
description: 'Use viem and wagmi with LUKSO — native chain support, Universal Profile interactions, and LSP contract integration.'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[viem](https://viem.sh) natively supports LUKSO Mainnet and Testnet as built-in chains — no custom chain configuration needed. This page covers client setup, reading Universal Profile data, calling LSP contracts, and React hooks with wagmi.

:::tip LUKSO is a first-class viem chain

`viem` includes `lukso` (chainId: 42) and `luksoTestnet` (chainId: 4201) as built-in chains.

```ts
import { lukso, luksoTestnet } from 'viem/chains';
```

No custom chain config required.
:::

## Installation

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
# viem only
npm install viem

# with wagmi (React)
npm install viem wagmi @tanstack/react-query
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
# viem only
yarn add viem

# with wagmi (React)
yarn add viem wagmi @tanstack/react-query
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
# viem only
pnpm add viem

# with wagmi (React)
pnpm add viem wagmi @tanstack/react-query
```

  </TabItem>
</Tabs>

## Chain Setup

### Public Client (read-only)

Use a public client for reading on-chain data from scripts or server-side code:

```ts
import { createPublicClient, http } from 'viem';
import { lukso } from 'viem/chains';

const publicClient = createPublicClient({
  chain: lukso,
  transport: http(),
});
```

### Wallet Client (browser + UP Extension)

Use a wallet client to send transactions via the UP Browser Extension:

```ts
import { createWalletClient, custom } from 'viem';
import { lukso } from 'viem/chains';

const [account] = await window.lukso.request({ method: 'eth_requestAccounts' });

const walletClient = createWalletClient({
  account,
  chain: lukso,
  transport: custom(window.lukso),
});
```

:::info UP Browser Extension

The UP Browser Extension injects a provider at `window.lukso`. Use `custom(window.lukso)` as the transport for browser dApps.

:::

## Reading Universal Profile Data

### Read a Single Data Key

```ts
import { createPublicClient, http } from 'viem';
import { lukso } from 'viem/chains';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

const publicClient = createPublicClient({ chain: lukso, transport: http() });

// LSP3Profile metadata data key
const LSP3_PROFILE_KEY =
  '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5';

const profileData = await publicClient.readContract({
  address: '0xYourUPAddress',
  abi: lsp0Erc725AccountAbi,
  functionName: 'getData',
  args: [LSP3_PROFILE_KEY],
});
```

### Read Multiple Data Keys

```ts
const [profileData, issuedAssets] = (await publicClient.readContract({
  address: '0xYourUPAddress',
  abi: lsp0Erc725AccountAbi,
  functionName: 'getDataBatch',
  args: [
    [
      '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5', // LSP3Profile
      '0x412e1c0000000000000000000000000000000000000000000000000000000000', // LSP12IssuedAssets[]
    ],
  ],
})) as [`0x${string}`, `0x${string}`];
```

## Interacting with LSP Contracts

### Check LSP7 Token Balance

```ts
import { lsp7DigitalAssetAbi } from '@lukso/lsp7-contracts/abi';

const balance = await publicClient.readContract({
  address: '0xTokenContractAddress',
  abi: lsp7DigitalAssetAbi,
  functionName: 'balanceOf',
  args: ['0xHolderAddress'],
});
```

### Transfer LSP7 Tokens

```ts
import { lsp7DigitalAssetAbi } from '@lukso/lsp7-contracts/abi';

const txHash = await walletClient.writeContract({
  address: '0xTokenContractAddress',
  abi: lsp7DigitalAssetAbi,
  functionName: 'transfer',
  args: [
    account, // from
    '0xRecipient', // to
    BigInt(100), // amount
    false, // force: false = recipient must have a Universal Receiver
    '0x', // data
  ],
});
```

:::caution LSP7 transfer vs ERC20 transfer

LSP7's `transfer` function has a different signature than ERC20: it requires `from`, `to`, `amount`, `force`, and `data`. Setting `force` to `false` will revert if the recipient does not have a Universal Receiver.

:::

## Using with wagmi (React)

### Config Setup

```ts
import { createConfig, http } from 'wagmi';
import { lukso } from 'viem/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [lukso],
  transports: {
    [lukso.id]: http(),
  },
  connectors: [injected()],
});
```

Wrap your app with the required providers:

```tsx
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './wagmi.config';

const queryClient = new QueryClient();

export function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* your app */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### Reading Data with Hooks

```tsx
import { useReadContract } from 'wagmi';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

const LSP3_PROFILE_KEY =
  '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5';

function ProfileData({ upAddress }: { upAddress: `0x${string}` }) {
  const { data, isLoading } = useReadContract({
    address: upAddress,
    abi: lsp0Erc725AccountAbi,
    functionName: 'getData',
    args: [LSP3_PROFILE_KEY],
  });

  if (isLoading) return <span>Loading...</span>;
  return <pre>{String(data ?? '')}</pre>;
}
```

:::info

wagmi works well for read operations and standard wallet interactions. For advanced LSP-specific features like relay transactions or batch calls, use viem directly.

:::

## Using with UP Provider (Grid mini-apps)

For LUKSO Grid mini-apps, combine viem with [`@lukso/up-provider`](../up-provider/getting-started.md) for seamless one-click connect. The UP Provider handles the connection lifecycle while viem handles all contract interactions.

See the [UP Provider documentation](../up-provider/getting-started.md) for setup details.

## Migration from ethers.js

:::tip Coming from ethers.js?

| ethers.js                 | viem                           |
| ------------------------- | ------------------------------ |
| `Provider`                | `PublicClient`                 |
| `Signer`                  | `WalletClient`                 |
| `Contract`                | `getContract` / `readContract` |
| `BigNumber`               | `bigint` (native JS)           |
| `ethers.utils.parseEther` | `parseEther` (from viem)       |

:::
