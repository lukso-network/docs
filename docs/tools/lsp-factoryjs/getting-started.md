---
sidebar_position: 1.1
---

# Getting Started

The `@lukso/lsp-factory.js` package allows simple deployments of [ERC725-UniversalProfiles](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md), [LSP7-DigitalAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md), and [LSP8-IdentifiableDigitalAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md).

- [GitHub Repository](https://github.com/lukso-network/tools-lsp-factory)
- [NPM Package](https://www.npmjs.com/package/@lukso/lsp-factory.js)

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

If used in the browser on a dApp's page, pass the ethereum object as the provider parameter to connect to a browser extension like the UniversalProfile browser extension or MetaMask. The browser extension will prompt users to sign the transactions as the **LSPFactory** deploys the smart contracts.

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

The key `lsp3Profile` contains the [LSP3 Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#JSONURL) of your Universal Profile. This is the "face" of your Universal Profile and contains all the public information people will see when they view your UP like your name, description and profile image.

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

## Proxy Deployment

LSPFactory uses proxy deployment of smart contracts to maximise gas efficiency. This can be configured inside the `options` object when deploying [Universal Profiles](./deployment/universal-profile.md) or [Digital Assets](./deployment/digital-asset.md).

When using proxy deployment contracts will be deployed as a **minimal proxy contract** based on [EIP1167](https://eips.ethereum.org/EIPS/eip-1167). This is a lightweight contract that inherits its logic by referencing the address of a contract already deployed on the blockchain. Inheriting allows cheaper deployment of Universal Profiles and Digital Assets because only the proxy contract needs to be deployed.

Base contract addresses for different networks are stored internally in the [version file](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json) to allow a specific version of an LSP smart contract to be used. If no version is specified, the most recent base contract version will be referenced by the proxy contract.

:::info
A specific contract version can be used by passing the `version` parameter in the `options` object when deploying. If no version is specified the latest base contract address will be used.
:::

LSPFactory will check that there is some bytecode deployed at the base contract address before deploying. If none is found, a new base contract will be deployed and referenced in the proxy contract. This process is helpful when using LSPFactory on a local development network like Hardhat where there will be no pre-deployed base contracts.

When using proxy deployment you can specify the base contract address by passing the `version` parameter inside the `options` object. This allows you to deploy a specific contract implementation by using a custom base contract you have deployed.

## Reactive deployment

The LSPFactory uses [RxJS](https://rxjs.dev/) library to deploy contracts. This can be leveraged for certain front-end behaviors to give better feedback to users when they trigger a deployment from a user interface. For example, you may want to implement a loading bar to tell users how deployment is progressing or display details and addresses of the contracts as they are deployed.

When deploying, pass the `deployReactive` flag inside the `options` object when deploying an LSP smart contract to receive an [RxJS](https://rxjs.dev/) `Observable`, which will emit events as your contract is deployed.


```typescript title="Reactive deployment of a Universal Profile"
const observable = await lspFactory.UniversalProfile.deploy({...}, {
  deployReactive: true
});

observable.subscribe({
  next: (deploymentEvent) => {
    console.log(deploymentEvent);
  },
  complete: () => {
    console.log('Universal Profile deployment completed');
  },
});
```

```typescript title="Reactive deployment of an LSP7 Digital Asset"
const observable = await lspFactory.LSP7DigitalAsset.deploy({...}, {
  deployReactive: true
});

observable.subscribe({
  next: (deploymentEvent) => {
    console.log(deploymentEvent);
  },
  complete: () => {
    console.log('Digital Asset deployment completed');
  },
});
```

:::note
The function defined in `next` will be called whenever a new deployment event is created. The function defined in `complete` will be called once after deployment is finished.
:::

Read further specification on the deployment events emitted when deploying [Universal Profiles](./deployment/universal-profile.md#reactive-deployment) and [Digital Assets](./deployment/digital-asset.md#reactive-deployment).