---
sidebar_position: 1.1
---

# Getting Started

The `@lukso/lsp-factory.js` package allows simple deployments of [ERC725-UniversalProfiles](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md), [LSP7-DigitalAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md) and [LSP8-IdentifiableDigitalAssets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md).

- GitHub repo: https://github.com/lukso-network/tools-lsp-factory
- NPM: https://www.npmjs.com/package/@lukso/lsp-factory.js

## Installation

```bash
npm install @lukso/lsp-factory.js
```

## Instantiation

```javascript
import { LSPFactory } from "@lukso/lsp-factory.js";

const deployKey = '0x...' // Private key of the account which will deploy UPs
const provider = "https://rpc.l14.lukso.network" // RPC url used to connect to the network
const chainId = 22 // Chain Id of the network you want to connect to

const lspFactory = new LSPFactory(provider, {
  deployKey,
  chainId
});
```

## Usage

Deploying a Universal Profile is as simple as running:

```javascript
const myContracts = await lspFactory.LSP3UniversalProfile.deploy({
    controllingAccounts: ['0x...'], // Account addresses which will control the UP
    lsp3Profile: myUniversalProfileData
  });
};
```


`lsp3Profile` contains the LSP3 metadata of your Universal Profile. This is the 'face' of your Universal Profile and contains all the public information people will see when they view your UP like your name, description and profile image.

```javascript
const myUniversalProfileData = {
    name: "My Universal Profile",
    description: "My cool Universal Profile",
    profileImage: [
      {
          width: 500,
          height: 500,
          hashFunction: "keccak256(bytes)",
          hash: "0x...", // bytes32 hex string of the image hash
          url: "ipfs://QmPLqMFHxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrtjSGp",
      },
    ],
    backgroundImage: [
      {
          width: 500,
          height: 500,
          hashFunction: "keccak256(bytes)",
          hash: "0x...", // bytes32 hex string of the image hash
          url: "ipfs://QmPLqMFHxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrtjSGp",
      },
    ],
    tags: ['Fashion', 'Design'],
    links: [{ title: "My Website", url: "www.my-website.com" }],
},
```

When deploying your UP your LSP3 data will be automatically uploaded to IPFS.

If you already have LSP3 data uploaded then simply pass an IPFS URL:
```javascript
const myUniversalProfileData = 'https://ipfs.lukso.network/ipfs/QmPzUfdKhY6vfcTNDnitwKnnpm5GqjYSmw9todNVmi4bqy'
```



To create a 'faceless' Universal Profile, omit the `lsp3Profile` value. This can be useful if you wish to create the LSP3 metadata later or create an anonymous UP. 


You can now continue using your UP address:

```javascript
const myUPAddress = myContracts.ERC725Account.address;
```

## Reactive Deployment

`lsp-factory.js` uses [RxJS](https://github.com/ReactiveX/rxjs) to deploy contracts. This can be leveraged to achieve reactive deployment of Universal Profiles and Digital Assets.

For Universal Profiles use the `deployReactive()` function with `subscribe()` to listen for deployment events.

```typescript
let deploymentEvents = [];

lspFactory.LSP3UniversalProfile
  .deployReactive(// ... omitted for brevity)
  .subscribe({
    next: (deploymentEvent: DeploymentEvent<any>) => {
      deploymentEvents.push(deploymentEvent);
    },
    complete: () => {
      console.log(deploymentEvents);
    },
  });
```
The function defined in `next` will be called whenever a new deployment event is created. In this case we are simply pushing every deployment event into a `deploymentEvents` array.

The function defined in `complete` will be called once after deployment is finished. Here we log the `deploymentEvents` array.


```typescript title="console.log(deploymentEvents) output"
[
  { type: 'PROXY',        contractName: 'ERC725Account',                                              status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'ERC725Account',                                              status: 'PENDING',  receipt:      {} },
  { type: "PROXY",        contractName: 'ERC725Account',           functionName: 'initialize',        status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'ERC725Account',           functionName: 'initialize',        status: 'COMPLETE', receipt:      {} },

  { type: 'CONTRACT',     contractName: 'KeyManager',                                                 status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'UniversalReceiver...',                                       status: 'PENDING',  transaction:  {} },
  { type: 'CONTRACT',     contractName: 'KeyManager',                                                 status: 'COMPLETE', receipt:      {} },
  { type: "PROXY",        contractName: 'UniversalReceiver...',                                       status: 'PENDING',  receipt:      {} },
  { type: "PROXY",        contractName: 'UniversalReceiver...',    functionName: 'initialize',        status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'UniversalReceiver...',    functionName: 'initialize',        status: 'COMPLETE', receipt:      {} },

  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'setDataMultiple',   status: 'PENDING',  transaction:  {} },
  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'setDataMultiple',   status: 'COMPLETE', receipt:      {} },

  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'transferOwnership', status: 'PENDING',  transaction:  {} },
  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'transferOwnership', status: 'COMPLETE', receipt:      {} },
];
```


```typescript
let deploymentEvents = [];

lspFactory.digitalAsset
  .deployReactive(// ... omitted for brevity)
  .subscribe({
    next: (deploymentEvent: DeploymentEvent<any>) => {
      deploymentEvents.push(deploymentEvent);
    },
    complete: () => {
      console.log(deploymentEvents);
    },
  });
```
## Use cases
Reactive Deployment may be useful for certain front end behaviours to give better feedback to users when they trigger a UP deployment from a user interface. For example you may want to implement a loading bar to tell users how deployment is progressing, or display details and addresses of the contracts as they are deployed.
