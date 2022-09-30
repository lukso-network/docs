---
sidebar_position: 3
---

# Providers

The provider by which `@erc725/erc725.js` will request blockchain data is set on the instantiation of the class through the configuration object.

The following provider types are supported:

## RPC URL

An RPC URL can be passed when instantiating the `ERC725` class.

```javascript
const RPC_URL = 'https://rpc.l16.lukso.network';
```

## Ethereum (MetaMask)

:::caution Warning
Ethereum providers are being deprecated. Please provide an RPC url instead.
:::

The following code snippet will use the web3 provider available at web3.providers from the corresponding `web3` library.

```javascript
const ethereumProvider = window.ethereum;
```

## Web3

:::caution Warning
Web3 providers are being deprecated. Please provide an RPC url instead.
:::

The following code snippet will use the web3 provider available at web3.providers from the corresponding `web3` library.

```javascript
import Web3 from 'web3';

const web3provider = new Web3(
  new Web3.providers.HttpProvider('https://rpc.l16.lukso.network'),
);
```
