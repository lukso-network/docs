---
sidebar_position: 4
title: LSP8IdentifiableDigitalAsset
---

# LSP8IdentifiableDigtialAsset

## deploy

```js
lspFactory.LSP8IdentifiableDigitalAsset.deploy(
  digitalAssetDeploymentOptions,
  contractDeploymentOptions?);
```

Deploys a mintable [LSP8 Identifiable Digital Asset](../../../standards/nft-2.0/LSP8-Identifiable-Digital-Asset).

#### Parameters

| Name                            | Type   | Description                                          |
| :------------------------------ | :----- | :--------------------------------------------------- |
| `digitalAssetDeploymentOptions` | Object | The [constructor parameters] used when deploying.    |
| `contractDeploymentOptions?`    | Object | The Specification for [Contract Deployment Options]. |

#### Parameters of `digitalAssetDeploymentOptions`

| Name                    | Type                               | Description                                               |
| :---------------------- | :--------------------------------- | :-------------------------------------------------------- |
| `name`                  | string                             | The name of the token.                                    |
| `symbol`                | string                             | The symbol of the token.                                  |
| `controllerAddress`     | string                             | The owner of the contract.                                |
| `digitalAssetMetadata?` | LSP4MetadataBeforeUpload or string | The [LSP4] metadata to be attached to the smart contract. |
| `creators?`             | string[&nbsp;]                     | The [LSP4] metadata to be attached to the smart contract. |

#### Returns

| Name         | Type                                                           | Description                                                |
| :----------- | :------------------------------------------------------------- | :--------------------------------------------------------- |
| `Promise`    | <DeployedLSP8DigitalAsset\>, or <DigitalAssetDeploymentEvent\> | An object containing deployed contract details.            |
| `Observable` | RxJS <Object\>                                                 | An [RxJS Observable], if `deployReactive` is set to `true` |

:::info
The `deployReactive` flag can be set in the `ContractDeploymentOptions` object, and returns an [RxJS Observable] of deployment events.
:::

#### Deployment of LSP8 Identifiable Digital Asset Example

```javascript title="Deploying an LSP8 Identifiable Digital Asset"
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  name: 'My token',
  symbol: 'TKN',
  controllerAddress: '0xb74a88C43BCf691bd7A851f6603cb1868f6fc147',
  digitalAssetMetadata: {
      description: "Digital Asset",
      assets: [asset],
      images: [image],
      icon: icon,
      links: [{ title: "MyDigitalAsset", url: "my-asset.com" }],
  };
});
/**
{
  LSP8IdentifiableDigitalAsset: {
    address: '0x336a4751a078Fe3f7af4ff2f194f7481f957b04a',
    receipt: {
      to: null,
      from: '0x9Fba07e245B415cC9580BD6c890a9fd7D22e20db',
      contractAddress: '0x336a4751a078Fe3f7af4ff2f194f7481f957b04a',
      transactionIndex: 0,
      gasUsed: [BigNumber],
      logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      blockHash: '0x7c7a8a2723bbdfd257f3bc0bd27edcf98d9d119f70971f80a6066449ea5922ae',
      transactionHash: '0x05c791245a29b8cd2167bab41f56fbaf79d7a64814c1e161a2de352cead9c3fd',
      logs: [],
      blockNumber: 12028969,
      confirmations: 1,
      cumulativeGasUsed: [BigNumber],
      status: 1,
      type: 0,
      byzantium: true,
      events: []
    }
  }
}
*/
```

#### Deployment of Reactive LSP8 Identifiable Digital Asset Example

```javascript title="Deploying a Reactive LSP8 Identifiable Digital Asset"
await lspFactory.LSP8IdentifiableDigitalAsset.deploy(
  {
    name: 'My token',
    symbol: 'TKN',
    controllerAddress: '0xb74a88C43BCf691bd7A851f6603cb1868f6fc147',
  },
  { deployReactive: true },
).subscribe({
  next: (deploymentEvent) => {
    console.log(deploymentEvent);
  },
  complete: () => {
    console.log('Deployment Complete');
  },
});
/**
{
  type: 'PROXY',
  contractName: 'LSP8IdentifiableDigitalAsset',
  status: 'PENDING',
  transaction: {
     ...
  }
}
{
  type: 'PROXY',
  contractName: 'LSP8IdentifiableDigitalAsset',
  status: 'PENDING',
  receipt: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'initialize',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'initialize',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
*/
```

[lsp4]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
[contract deployment options]: ../deployment/digital-asset/#deployment-configuration
[rxjs observable]: https://rxjs.dev/guide/observable
