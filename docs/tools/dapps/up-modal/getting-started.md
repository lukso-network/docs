---
sidebar_position: 1
title: 'Getting Started'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started

The [`@lukso/up-modal`](https://www.npmjs.com/package/@lukso/up-modal) package provides a connect modal for LUKSO Universal Profiles. It offers a responsive connection dialog with support for desktop and mobile, automatically detecting UP Mobile (via WalletConnect), UP Browser Extension (via EIP-6963), and other EOA wallets.

## Installation

```bash
npm install @lukso/up-modal
```

## Minimal Setup

```typescript
import { setupLuksoConnector } from '@lukso/up-modal';

const connector = await setupLuksoConnector();

// Open the modal
connector.showSignInModal();
```

The `<connect-modal>` element is injected into `document.body` automatically on the first `showSignInModal()` call.

### With Callbacks and Theme

```typescript
const connector = await setupLuksoConnector({
  theme: 'light', // 'light' | 'dark' | 'auto'

  onConnect: (event) => {
    console.log('Connected:', event.detail);
  },
  onError: (event) => {
    console.error('Error:', event.detail);
  },
  onClose: () => {
    console.log('Modal closed');
  },
});

connector.showSignInModal();
connector.closeModal();
connector.setTheme('dark'); // update theme at any time
connector.destroyModal(); // close + remove from DOM
```

## Framework Integrations

<Tabs groupId="framework">
  <TabItem value="vue" label="Vue / Nuxt">

**Plugin** (`plugins/lukso.client.ts`):

```typescript
import { setupLuksoConnector } from '@lukso/up-modal';
import type { LuksoConnector } from '@lukso/up-modal';

let connector: LuksoConnector | null = null;

export default defineNuxtPlugin(async () => {
  if (process.server) return;

  connector = await setupLuksoConnector({
    theme: 'light',
    onConnect: (event) => console.log('Connected:', event.detail),
  });
});

export { connector };
```

**Component**:

```vue
<template>
  <button @click="connector?.showSignInModal()">Connect Wallet</button>
</template>

<script setup lang="ts">
import { connector } from '~/plugins/lukso.client';
</script>
```

**Accessing wagmiConfig** (for `@wagmi/vue`):

```typescript
import { useAccount } from '@wagmi/vue';

// Pass connector.wagmiConfig to your wagmi provider
const { wagmiConfig } = connector;
```

  </TabItem>

  <TabItem value="react" label="React">

**Initialization** (e.g. `src/main.tsx` or a provider):

```typescript
import { setupLuksoConnector } from '@lukso/up-modal';
import type { LuksoConnector } from '@lukso/up-modal';

export let connector: LuksoConnector | null = null;

export async function initConnector() {
  connector = await setupLuksoConnector({
    theme: 'light',
    onConnect: (event) => console.log('Connected:', event.detail),
  });
}
```

**Component**:

```tsx
import { connector, initConnector } from './connector';
import { useEffect } from 'react';

export function ConnectButton() {
  useEffect(() => {
    initConnector();
  }, []);

  return (
    <button onClick={() => connector?.showSignInModal()}>Connect Wallet</button>
  );
}
```

**Watching connection state** (with wagmiConfig):

```typescript
import { watchConnection } from '@wagmi/core';

const stopWatching = watchConnection(connector.wagmiConfig, {
  onChange: (connection) => {
    console.log('Address:', connection.address);
  },
});
```

  </TabItem>

  <TabItem value="svelte" label="Svelte">

**Initialization** (`src/lib/connector.ts`):

```typescript
import { setupLuksoConnector } from '@lukso/up-modal';
import type { LuksoConnector } from '@lukso/up-modal';
import { writable } from 'svelte/store';

export const connectorStore = writable<LuksoConnector | null>(null);

export async function initConnector() {
  const connector = await setupLuksoConnector({
    theme: 'light',
    onConnect: (e) => console.log('Connected:', e.detail),
  });
  connectorStore.set(connector);
}
```

**Component** (`ConnectButton.svelte`):

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { connectorStore, initConnector } from '$lib/connector';

  onMount(() => {
    initConnector();
  });
</script>

<button on:click={() => $connectorStore?.showSignInModal()}>
  Connect Wallet
</button>
```

  </TabItem>
</Tabs>

## Auto-Detection

The modal automatically configures connection methods based on available wallets:

| App              | How                                               |
| ---------------- | ------------------------------------------------- |
| **UP Mobile**    | WalletConnect (deep link + QR code)               |
| **UP Extension** | Browser extension, detected via EIP-6963          |
| **EOA wallets**  | Other EIP-6963 wallets (MetaMask, Coinbase, etc.) |

## Resources

- [GitHub repo](https://github.com/lukso-network/service-auth-simple/tree/main/packages/up-modal)
- [NPM package](https://www.npmjs.com/package/@lukso/up-modal)
