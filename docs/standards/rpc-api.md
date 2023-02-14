---
title: 🆙 RPC API
sidebar_position: 10
---

# 🆙 RPC API

:::danger Work in progress

This page is under active development.

:::

The [LUKSO Extension](../guides/browser-extension/install-browser-extension.md) uses new RPC API which are described here.

## Methods

### up_addTransactionRelayer

Add a custom relayer.

#### Parameters

##### 1. `relayer` - Object

Object containing the new relayer properties. To find more information about custom relayers, you can read the [Transaction Relay Service API](./relayer-api.md).

| Name       | Type   | Description                   |
| :--------- | :----- | :---------------------------- |
| `name`     | String | The name of the relayer.      |
| `apiUrl`   | String | The base API URL.             |
| `chainIds` | Array  | Array of string (hex) or int. |

```js
params: [
  {
    name: 'My Relayer',
    apiUrl: 'https://relayer.l16.staging.lukso.dev/api/v1/',
    chainIds: [2828],
  },
];
```

#### Returns

##### 1. `String Array` - Array of universal profile addresses the user selected for this relay service

It returns an array of Universal Profile addresses.

### up_import

Add a Universal Profile address.

#### Parameters

##### 1. `String` - Universal profile address to add to the extension

The Universal Profile address to add.

```js
params: ['0x311611C9A46a192C14Ea993159a0498EDE5578aC'];
```

#### Returns

##### 1. `String` - New controller address, to be added to the profile by the dapp.

TODO
