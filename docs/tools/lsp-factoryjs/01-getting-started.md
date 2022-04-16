---
sidebar_position: 1
---

# Getting Started

The `@lukso/lsp-factory.js` package allows simple deployments of [ERC725-UniversalProfiles](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md), [LSP7-DigitalAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md), and [LSP8-IdentifiableDigitalAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md).

- GitHub Repository: https://github.com/lukso-network/tools-lsp-factory
- NPM Package: https://www.npmjs.com/package/@lukso/lsp-factory.js

## Installation

```bash
npm install @lukso/lsp-factory.js
```

## Instantiation

```javascript
import { LSPFactory } from '@lukso/lsp-factory.js';

const provider = 'https://rpc.l14.lukso.network'; // RPC provider url

const lspFactory = new LSPFactory(provider, {
  deployKey: '0x...', // Private key of the account which will deploy any smart contract,
  chainId: 22, // Chain Id of the network you want to deploy to
});
```

## Using LSPFactory in a dApp

If used in the browser on a dApp page, pass the ethereum object as the provider parameter to connect to a browser extension like the UniversalProfile browser extension or MetaMask. The wallet application will prompt users to sign the transactions the **LSPFactory** deploys smart contracts.

```javascript
await ethereum.request({ method: 'eth_requestAccounts', params: [] });

const lspFactory = new LSPFactory(ethereum);
```

## Usage

Deploying a Universal Profile is as simple as running:

```javascript
const myContracts = await lspFactory.UniversalProfile.deploy({
    controllingAccounts: ['0x...'], // Account addresses which will control the UP
    lsp3Profile: myLSP3MetaData
  });
};
```

The key phrase `lsp3Profile` contains the [LSP3 Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#JSONURL) of your Universal Profile. This is the "face" of your Universal Profile and contains all the public information people will see when they view your UP like your name, description and profile image.

```javascript
const myLSP3MetaData = {
  name: 'My Universal Profile',
  description: 'My cool Universal Profile',
  profileImage: [
    {
      width: 500,
      height: 500,
      hashFunction: 'keccak256(bytes)',
      // bytes32 hex string of the image hash
      hash: '0xfdafad027ecfe57eb4ad047b938805d1dec209d6e9f960fc320d7b9b11cbed14',
      url: 'ipfs://QmPLqMFHxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrtjSGp',
    },
  ],
  backgroundImage: [
    {
      width: 500,
      height: 500,
      hashFunction: 'keccak256(bytes)',
      // bytes32 hex string of the image hash
      hash: '0xfdafad027ecfe57eb4ad047b938805d1dec209d6e9f960fc320d7b9b11cbed14',
      url: 'ipfs://QmPLqMFHxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrtjSGp',
    },
  ],
  tags: ['public profile', 'creator'],
  links: [
    {
      title: 'My Website',
      url: 'www.my-website.com',
    },
  ],
  ...
};
```

When deploying your Universal Profile, your LSP3 data will be automatically uploaded to IPFS.

:::note
If you already have LSP3 data uploaded, then you can pass an IPFS URL:

```javascript
const myLSP3MetaData = 'ipfs://QmPzUfdKhY6vfcTNDnitwKnnpm5GqjYSmw9todNVmi4bqy';
```

:::

To create a anonymous Universal Profile, omit the `lsp3Profile` value.

:::info
Anonymous profiles can also be useful if you wish to create the LSP3 metadata later.
:::

You can now continue using your UP address within the dApp:

```javascript
const myUPAddress = myContracts.ERC725Account.address;
```
