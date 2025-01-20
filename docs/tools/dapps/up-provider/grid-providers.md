---
sidebar_position: 2
title: 'Grid Providers'
---

:::info About Grid Providers

Developers can use Grid Providers to host and connect mini-apps on their pages.

:::

# Grid Providers

Mini-apps can be hosted on a parent page by passing UP connections to a parent provider like `window.ethereum`.

```js
import { UPClientChannel, createUPProviderConnector } from '@lukso/up-provider';

// Pass in the provider you want the page to use.
const providerConnector = createUPProviderConnector(originalProvider, [
  'https://rpc.mainnet.lukso.network',
]);
// or later on call
// globalProvider.setupProvider(originalProvider, ['https://rpc.mainnet.lukso.network'])

providerConnector.on('channelCreated', ({ channel, id }) => {
  // Called when an iframe connects.
  // then channel can control the connection.
  // Usually you would store this in a ref and use it within a dialog to control the connection.

  // for example
  channel.enabled = true;
  // The addresses and chainId it will cause addressChanged and chainChanged events on the client provider.
  channel.setAllowedAccounts([profileAddress, ...extraAddresses]);
});
```
