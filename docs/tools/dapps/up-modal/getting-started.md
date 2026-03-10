---
sidebar_position: 1
title: 'Getting Started'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started

The [`@lukso/up-modal`](https://www.npmjs.com/package/@lukso/up-modal) package provides a connect modal for LUKSO Universal Profiles. It offers a responsive connection dialog with support for desktop and mobile, automatically detecting UP Mobile (via WalletConnect), UP Browser Extension (via EIP-6963), and other EOA wallets. Modal works with apps that use [Wagmi](https://wagmi.sh), a library to interract Ethereum. Wagmi handles the underlying connection management, so you can use its APIs alongside the modal.

<div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap'}}>
  <img src="/img/tools/up-modal/modal-light.png" alt="Light theme" width="320" />
  <img src="/img/tools/up-modal/modal-dark.png" alt="Dark theme" width="320" />
</div>

## What gets auto-detected

Modal automatically configures:

| App              | How                                                     |
| ---------------- | ------------------------------------------------------- |
| **UP Mobile**    | WalletConnect (deep link on mobile, QR code on desktop) |
| **UP Extension** | Browser extension, detected via EIP-6963                |
| **EOA wallets**  | Other EIP-6963 wallets (MetaMask, Coinbase, etc.)       |

## Installation

```bash
# pnpm
pnpm add @lukso/up-modal

# npm
npm install @lukso/up-modal

# yarn
yarn add @lukso/up-modal
```

Also install the required peer dependencies:

```bash
npm install @wagmi/core viem
```

## Minimal Setup

### Initialize modal

```typescript
import { setupLuksoConnector } from '@lukso/up-modal';

const connector = await setupLuksoConnector({
  walletConnect: {
    projectId: 'YOUR_REOWN_PROJECT_ID', // get yours at https://cloud.reown.com
  },
});
```

### Open the Sign In modal

```typescript
connector.showSignInModal();
```

### Open the Sign Up modal

```typescript
connector.showSignUpModal();
```

<img src="/img/tools/up-modal/sign-up.png" alt="Sign Up" width="400" />

## Framework Integrations

<Tabs groupId="framework">
  <TabItem value="vue" label="Vue 3">

```html
<template>
  <button :disabled="!connector" @click="connector?.showSignInModal()">
    Connect Wallet
  </button>
</template>

<script setup lang="ts">
  import { setupLuksoConnector } from '@lukso/up-modal';
  import type { LuksoConnector } from '@lukso/up-modal';
  import { ref, onMounted } from 'vue';

  const connector = ref<LuksoConnector | null>(null);

  onMounted(async () => {
    connector.value = await setupLuksoConnector({
      theme: 'light',
      onConnect: (event) => console.log('Connected:', event.detail),
    });
  });
</script>
```

  </TabItem>

  <TabItem value="nuxt" label="Nuxt">

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

```html
<template>
  <button @click="connector?.showSignInModal()">Connect Wallet</button>
</template>

<script setup lang="ts">
  import { connector } from '~/plugins/lukso.client';
</script>
```

  </TabItem>

  <TabItem value="react" label="React">

```tsx
import { setupLuksoConnector } from '@lukso/up-modal';
import type { LuksoConnector } from '@lukso/up-modal';
import { useEffect, useState } from 'react';

export function ConnectButton() {
  const [connector, setConnector] = useState<LuksoConnector | null>(null);

  useEffect(() => {
    setupLuksoConnector({
      theme: 'light',
      onConnect: (event) => console.log('Connected:', event.detail),
    }).then(setConnector);
  }, []);

  return (
    <button disabled={!connector} onClick={() => connector?.showSignInModal()}>
      Connect Wallet
    </button>
  );
}
```

**Watching connection state** (requires `@wagmi/core`):

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

**Initialization** (`src/lib/connector.svelte.ts`):

```typescript
import { setupLuksoConnector } from '@lukso/up-modal';
import type { LuksoConnector } from '@lukso/up-modal';

export const connector: { current: LuksoConnector | null } = $state({
  current: null,
});

export async function initConnector() {
  connector.current = await setupLuksoConnector({
    theme: 'light',
    onConnect: (e) => console.log('Connected:', e.detail),
  });
}
```

**Component** (`ConnectButton.svelte`):

```svelte
<script lang="ts">
  import { connector, initConnector } from '$lib/connector.svelte'

  $effect(() => {
    initConnector();
  });
</script>

<button onclick={() => connector.current?.showSignInModal()}>
  Connect Wallet
</button>
```

  </TabItem>
</Tabs>

## Resources

- [GitHub repo](https://github.com/lukso-network/service-auth-simple/tree/main/packages/up-modal)
- [NPM package](https://www.npmjs.com/package/@lukso/up-modal)
