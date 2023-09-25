---
title: 🆙 RPC API
sidebar_position: 10
---

# 🆙 RPC API

:::danger Work in progress

This page is under active development.

:::

The [LUKSO Extension](../guides/browser-extension/install-browser-extension.md) uses the RPC API methods from the table below. The methods are grouped by category: signing methods, standard methods, and LUKSO-specific methods.

## Supported Methods

<table>
  <tr>
    <td>Name</td>
    <td>Type</td>
  </tr>
  <tr>
    <td><a href="#eth_sign">eth_sign</a></td>
    <td>signing</td>
  </tr>
  <tr>
    <td><a href="#personal_sign">personal_sign</a></td>
    <td>signing</td>
  </tr>
  <tr>
    <td><a href="#eth_accounts">eth_accounts</a></td>
    <td>standard</td>
  </tr>
  <tr>
    <td><a href="#eth_requestAccounts">eth_requestAccounts</a></td>
    <td>standard</td>
  </tr>
  <tr>
    <td><a href="#eth_sendTransaction">eth_sendTransaction</a></td>
    <td>standard</td>
  </tr>
  <tr>
    <td><a href="#wallet_switchEthereumChain">wallet_switchEthereumChain</a></td>
    <td>standard</td>
  </tr>
   <tr>
    <td><a href="#up_addTransactionRelayer">up_addTransactionRelayer</a></td>
    <td>LUKSO specific</td>
  </tr>
   <tr>
    <td><a href="#up_import">up_import</a></td>
    <td>LUKSO specific</td>
  </tr>
   <tr>
    <td><a href="#up_generateLsp23Address">up_generateLsp23Address</a></td>
    <td>LUKSO specific</td>
  </tr>
</table>

## Signing

### eth_sign

:::tip

We encourage developers to use `eth_sign` for signing purposes.

:::

While a security issue potentially existed in the initial implementation on Ethereum, the current implementation has no such potential exploit. As such usage of this method is preferable to [personal_sign](#personal_sign).

This method returns a [EIP-191](https://eips.ethereum.org/EIPS/eip-191) signature over the data provided to the call.
It requests that the user provides an Ethereum address that should sign the transaction as well as the data (encoded bytes) that are to be executed.

#### Returns

`string` - on a successful call the method returns a signature, a string representing hex encoded bytes or an error with code `4001` - if the user rejects the requets

### personal_sign

The `personal_sign` endpoint is enabled to allow for backward compatibility. However, its use is not recommended.
Some libraries such as Ethers.js end up using `personal_sign` under the hood. That is why, for compatibility reasons, `personal_sign` is left enabled. Note however that `personal_sign` ultimately acts as a proxy, redirecting the call to the [eth_sign](#eth_sign) method.

## Standard

### eth_sendTransaction {#eth_sendTransaction}

Creates new message call transaction and signs it using the account specified in `from`. This method requires that the user has granted permission to interact with their account first.
The transaction will not be signed by the UP itself, but by a controller address that has sufficient permissions.

### eth_requestAccounts {#eth_requestAccounts}

This method is specified by [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102).
Calling this method may trigger a user interface that allows the user to approve or reject account access for a given DApp.

#### Returns

`string[]` - an array of accounts or throws an error with code `4001` if the request was rejected by the user.

### wallet_switchEthereumChain {#wallet_switchEthereumChain}

This method implements [EIP-3326](https://eips.ethereum.org/EIPS/eip-3326).
It allows Dapps to request that a wallet switches its active chain (connection).

The method requires that a target chain ID is provided

#### Returns

`null` or `error` - the method will return null if successful or throw an error otherwise

### eth_accounts {#eth_accounts}

Similar to the `eth_requestAccounts` this method returns all of the addresses that the user has approved for the DApp. This method does not trigger a user interface.

#### Returns

`string[]` - a successful request returns an array of hexadecimal Ethereum address strings

## LUKSO Specific

### up_addTransactionRelayer {#up_addTransactionRelayer}

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

### up_import {#up_import}

Add a Universal Profile address.

#### Parameters

##### 1. `String` - Universal profile address to add to the extension

The Universal Profile address to add.

```js
params: ['0x311611C9A46a192C14Ea993159a0498EDE5578aC'];
```

#### Returns

##### 1. `String` - New controller address, to be added to the profile by the dapp.
