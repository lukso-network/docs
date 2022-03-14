---
sidebar_position: 1.2
title: Reactive Deployment
---

## Reactive Deployment

`lsp-factory.js` uses [RxJS](https://github.com/ReactiveX/rxjs) to deploy contracts. This can be leveraged to achieve reactive deployment of Universal Profiles and Digital Assets.

When deploying a Universal Profile or Digital Asset pass the `deployReactive` flag inside the [ContractDeploymentOptions](../deployment/contract-deployment-options.md) object to receive an RxJS Observable which will emit events as your contract is deployed.

### Universal Profiles

Use the `deployReactive` flag and use `subscribe()` to listen for deployment events.

```typescript
let deploymentEvents = [];

lspFactory.LSP3UniversalProfile
  .deploy({...}, { deployReactive: true })
  .subscribe({
    next: (deploymentEvent) => {
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

  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'setData',           status: 'PENDING',  transaction:  {} },
  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'setData',           status: 'COMPLETE', receipt:      {} },

  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'transferOwnership', status: 'PENDING',  transaction:  {} },
  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'transferOwnership', status: 'COMPLETE', receipt:      {} },
];
```

### Digtial Assets

For reactive deployment of LSP7 and LSP8 Digital Assets pass the `deployReactive` flag to `LSP7DigitalAsset.deploy` or `LSP8IdentifiableDigitalAsset.deploy` functions respectively

```typescript title="LSP7 Deployment"
// Reactive deplyoyment of LSP7
let deploymentEvents = [];

lspFactory.LSP7DigitalAsset
  .deploy({...}, { deployReactive: true })
  .subscribe({
    next: (deploymentEvent) => {
      deploymentEvents.push(deploymentEvent);
    },
    complete: () => {
      console.log(deploymentEvents);
    },
  });
```

or

```typescript title="LSP8 Deployment"
let deploymentEvents = [];

lspFactory.LSP8IdentifiableDigitalAsset
  .deploy({...}, { deployReactive: true })
  .subscribe({
    next: (deploymentEvent) => {
      deploymentEvents.push(deploymentEvent);
    },
    complete: () => {
      console.log(deploymentEvents);
    },
  });
```

```typescript title="LSP7 Deployment Events"
[
  { type: 'PROXY',        contractName: 'LSP7DigitalAsset',                                              status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'LSP7DigitalAsset',                                              status: 'PENDING',  receipt:      {} },
  { type: "PROXY",        contractName: 'LSP7DigitalAsset',           functionName: 'initialize',        status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'LSP7DigitalAsset',           functionName: 'initialize',        status: 'COMPLETE', receipt:      {} },
];
```

```typescript title="LSP8    Deployment Events"
[
  { type: 'PROXY',        contractName: 'LSP8IdentifiableDigitalAsset',                                              status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'LSP8IdentifiableDigitalAsset',                                              status: 'PENDING',  receipt:      {} },
  { type: "PROXY",        contractName: 'LSP8IdentifiableDigitalAsset',           functionName: 'initialize',        status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'LSP8IdentifiableDigitalAsset',           functionName: 'initialize',        status: 'COMPLETE', receipt:      {} },
];
```

## Use cases
Reactive Deployment may be useful for certain front end behaviours to give better feedback to users when they trigger a UP deployment from a user interface. For example you may want to implement a loading bar to tell users how deployment is progressing, or display details and addresses of the contracts as they are deployed.
