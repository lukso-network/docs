---
sidebar_position: 1.3
---

# Reactive Deployment

LSPFactory uses [`rxjs`](https://github.com/ReactiveX/rxjs) to deploy Universal Profiles. This can be leveraged to achieve reactive deployment of Universal Profiles.

Use the `reactiveDeploy` function with `subscribe` to listen for deployment events.

```typescript
let deploymentEvents = [];

lspFactory.LSP3UniversalProfile
  .deploy(// ... omitted for brevity)
  .subscribe({
    next: (deploymentEvent: DeploymentEvent<any>) => {
      deploymenLogs.push(deploymentEvent);
    },
    complete: () => {
      console.log(deploymentEvents);
    },
  });
```

The function defined in `next` will be called whenever a new deployment event is created. In this case we are simply pushing every deployment event into a `deploymentEvents` array.

The function defined in `complete` will be called once after deployment is finished. Here we log the `deploymentEvents` array.


```typescript title="console.log output"
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

## Use cases
Reactive Deployment may be useful for certain front end behaviours to give better feedback to users when they trigger a UP deployment from a user interface. For example you may want to implement a loading bar to tell users how deployment is progressing, or display details and addresses of the contracts as they are deployed.
