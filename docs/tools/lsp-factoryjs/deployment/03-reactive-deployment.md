---
sidebar_position: 3
title: Reactive Deployment
---

## Reactive Deployment

The `lsp-factory.js` uses the [RxJS](https://github.com/ReactiveX/rxjs) library to deploy contracts. Developers can leverage this to achieve reactive deployment of Universal Profiles and Digital Assets.

When deploying a Universal Profile or Digital Asset, pass the `deployReactive` flag inside the [ContractDeploymentOptions](../deployment/05-contract-deployment-options.md) object to receive an RxJS Observable, which will emit events as your contract is deployed.

### Universal Profiles

Use the `deployReactive` flag and the `subscribe()` function to listen for deployment events.

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

The function defined in `next` will be called whenever a new deployment event is created. We are simply pushing every deployment event into a `deploymentEvents` array.

The function defined in `complete` will be called once after the deployment is finished. The following code snippet describes, how we can log the `deploymentEvents` array.

```typescript title="Output from calling the console.log(deploymentEvents) function"
[
  {
    type: 'PROXY',
    contractName: 'ERC725Account',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'PROXY',
    contractName: 'ERC725Account',
    status: 'PENDING',
    receipt: {},
  },
  {
    type: 'PROXY',
    contractName: 'ERC725Account',
    functionName: 'initialize',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'PROXY',
    contractName: 'ERC725Account',
    functionName: 'initialize',
    status: 'COMPLETE',
    receipt: {},
  },

  {
    type: 'CONTRACT',
    contractName: 'KeyManager',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'PROXY',
    contractName: 'UniversalReceiver...',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'CONTRACT',
    contractName: 'KeyManager',
    status: 'COMPLETE',
    receipt: {},
  },
  {
    type: 'PROXY',
    contractName: 'UniversalReceiver...',
    status: 'PENDING',
    receipt: {},
  },
  {
    type: 'PROXY',
    contractName: 'UniversalReceiver...',
    functionName: 'initialize',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'PROXY',
    contractName: 'UniversalReceiver...',
    functionName: 'initialize',
    status: 'COMPLETE',
    receipt: {},
  },

  {
    type: 'TRANSACTION',
    contractName: 'ERC725Account',
    functionName: 'setData',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'TRANSACTION',
    contractName: 'ERC725Account',
    functionName: 'setData',
    status: 'COMPLETE',
    receipt: {},
  },

  {
    type: 'TRANSACTION',
    contractName: 'ERC725Account',
    functionName: 'transferOwnership',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'TRANSACTION',
    contractName: 'ERC725Account',
    functionName: 'transferOwnership',
    status: 'COMPLETE',
    receipt: {},
  },
];
```

### Digtial Assets

For reactive deployment of LSP7 and LSP8 Digital Assets, pass the `deployReactive` flag to `LSP7DigitalAsset.deploy` or `LSP8IdentifiableDigitalAsset.deploy` functions.

#### Example LSP7 Deployment

```typescript title="Deploying an LSP7 contract"
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

#### Example LSP8 Deployment

```typescript title="Deploying as LSP8 Contract"
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

#### LSP7 Deployment Events

```typescript
[
  {
    type: 'PROXY',
    contractName: 'LSP7DigitalAsset',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'PROXY',
    contractName: 'LSP7DigitalAsset',
    status: 'PENDING',
    receipt: {},
  },
  {
    type: 'PROXY',
    contractName: 'LSP7DigitalAsset',
    functionName: 'initialize',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'PROXY',
    contractName: 'LSP7DigitalAsset',
    functionName: 'initialize',
    status: 'COMPLETE',
    receipt: {},
  },
];
```

#### LSP8 Deployment Events

```typescript
[
  {
    type: 'PROXY',
    contractName: 'LSP8IdentifiableDigitalAsset',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'PROXY',
    contractName: 'LSP8IdentifiableDigitalAsset',
    status: 'PENDING',
    receipt: {},
  },
  {
    type: 'PROXY',
    contractName: 'LSP8IdentifiableDigitalAsset',
    functionName: 'initialize',
    status: 'PENDING',
    transaction: {},
  },
  {
    type: 'PROXY',
    contractName: 'LSP8IdentifiableDigitalAsset',
    functionName: 'initialize',
    status: 'COMPLETE',
    receipt: {},
  },
];
```

## Use Cases

Reactive deployment may be helpful in certain front-end behaviors to give better feedback to users when they trigger a UP deployment from a user interface. For example, you may want to implement a loading bar to tell users how deployment is progressing or display details and addresses of the contracts as they are deployed.
