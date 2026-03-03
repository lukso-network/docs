---
sidebar_position: 2
title: 'API Reference'
---

# API Reference

## `setupLuksoConnector`

Returns `Promise<LuksoConnector>`. Call once at app initialization.

### Config Options

| Option                    | Type                          | Default       | Description                             |
| ------------------------- | ----------------------------- | ------------- | --------------------------------------- |
| `theme`                   | `'light' \| 'dark' \| 'auto'` | `'light'`     | Modal theme                             |
| `onConnect`               | `(e: CustomEvent) => void`    | —             | Called on successful connection         |
| `onError`                 | `(e: CustomEvent) => void`    | —             | Called on connection error              |
| `onClose`                 | `() => void`                  | —             | Called when modal is closed             |
| `walletConnect.enabled`   | `boolean`                     | `true`        | Enable WalletConnect                    |
| `walletConnect.projectId` | `string`                      | LUKSO default | WalletConnect project ID                |
| `chains.defaultChainId`   | `number`                      | `42`          | Default chain (LUKSO mainnet)           |
| `chains.enableTestnet`    | `boolean`                     | `true`        | Also enable LUKSO testnet (4201)        |
| `storage.key`             | `string`                      | `'up-wagmi'`  | localStorage key prefix for wagmi state |
| `wagmiConfig`             | `Config`                      | auto-created  | Pass your own wagmi config              |

### `LuksoConnector` Methods

| Method              | Description                                                                          |
| ------------------- | ------------------------------------------------------------------------------------ |
| `showSignInModal()` | Opens the sign-in modal (creates `<connect-modal>` in `document.body` on first call) |
| `showSignUpModal()` | Opens the sign-up modal for creating a new Universal Profile                         |
| `closeModal()`      | Closes the modal                                                                     |
| `setTheme(theme)`   | Updates the theme (`'light' \| 'dark' \| 'auto'`) — works while modal is open        |
| `destroyModal()`    | Closes the modal and removes the element from the DOM                                |
| `wagmiConfig`       | The underlying wagmi `Config` instance for advanced use                              |

## Advanced

### Using Your Own Wagmi Config

```typescript
import { setupLuksoConnector } from '@lukso/up-modal';
import { myWagmiConfig } from './wagmi';

const connector = await setupLuksoConnector({
  wagmiConfig: myWagmiConfig,
});
```

### Watching Connection State

```typescript
import { watchConnection, getConnection } from '@wagmi/core';

const { wagmiConfig } = connector;

// One-time read
const connection = getConnection(wagmiConfig);

// Subscribe to changes
const stopWatching = watchConnection(wagmiConfig, {
  onChange: (connection) => {
    console.log(connection.address, connection.chainId);
  },
});
```
