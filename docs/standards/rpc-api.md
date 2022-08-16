---
title: RPC API
sidebar_position: 9
---

# RPC API

:::danger Work in progress

This page is under active development.

:::

The [LUKSO Extension](../guides/browser-extension/install-browser-extension) uses new RPC API which are described here.

## Methods

### up_addRelayService

Add a custom relayer.

#### Parameters

##### 1. `relayer` - Object

Object containing the new relayer properties. To find more information about custom relayers, you can read the [Transaction Relay Service API](https://www.notion.so/lukso/Transaction-Relay-Service-API-Standard-2bda58f4f47f4497bb3381654acda8c3).

| Name       | Type   | Description                   |
| :--------- | :----- | :---------------------------- |
| `name`     | String | The name of the relayer.      |
| `apiUrl`   | String | The base API URL.             |
| `chainIds` | Array  | Array of string (hex) or int. |

```js
params: [
  {
    name: 'myRelayer',
    apiUrl: 'https://relayer.l16.staging.lukso.dev/api/v1/',
    chainIds: [2828],
  },
];
```

#### Returns

##### 1. `addresses` - Array of strings

It returns an array of Universal Profile addresses.

### up_import

Add a Universal Profile address.

#### Parameters

##### 1. `address` - String

The Universal Profile address to add.

```js
params: ['0x311611C9A46a192C14Ea993159a0498EDE5578aC'];
```

#### Returns

##### 1. `??` - String

TODO
