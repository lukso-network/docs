---
sidebar_position: 4
title: LSP8IdentifiableDigitalAsset
---

# LSP8IdentifiableDigtialAsset

## deploy

```js
lspFactory.LSP8IdentifiableDigitalAsset.deploy(digitalAssetProperties [, options]);
```

Deploys a mintable [LSP8 Identifiable Digital Asset](../../../standards/nft-2.0/LSP8-Identifiable-Digital-Asset).

### Parameters

#### 1. `digitalAssetProperties` - Object

Specify properties to be set on the LSP8 Digital Asset during deployment.

| Name                                                                                    | Type             | Description                                                                           |
| :-------------------------------------------------------------------------------------- | :--------------- | :------------------------------------------------------------------------------------ |
| [`name`](../deployment/digital-asset#digital-asset-properties)                          | String           | The name of the token. Passed to the LSP8 smart contract as a constructor parameter   |
| [`symbol`](../deployment/digital-asset#digital-asset-properties)                        | String           | The symbol of the token. Passed to the LSP8 smart contract as a constructor parameter |
| [`controllerAddress`](../deployment/digital-asset#controller-address)                   | String           | The owner of the contract. Passed to the LSP8 smart contract constructor parameter    |
| [`digitalAssetMetadata`](../deployment/digital-asset#digital-asset-metadata) (optional) | Object \| String | The [LSP4] metadata to be attached to the smart contract.                             |
| [`creators`](../deployment/digital-asset#adding-lsp4-metadata) (optional)               | Array            | The [LSP4] metadata to be attached to the smart contract.                             |

#### 2. `options` - Object (optional)

Object which specifies how the LSP8 Digital Asset will be deployed

| Name                                                                           | Type             | Description                                                                                                          |
| :----------------------------------------------------------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------- |
| [`version`](../deployment/digital-asset#version) (optional)                    | String           | The contract version you want to deploy. Defaults to latest version of the [lsp-smart-contracts] library.            |
| [`deployReactive`](../deployment/digital-asset#reactive-deployment) (optional) | Boolean          | Whether to return an [RxJS Observable] of deployment events. Defaults to `false`.                                    |
| [`deployProxy`](../deployment/digital-asset#proxy-deployment) (optional)       | Boolean          | Whether the contract should be deployed using a proxy contract implementation (e.g., [EIP1167]). Defaults to `true`. |
| [`ipfsGateway`](../deployment/digital-asset#ipfs-upload-options) (optional)    | String \| Object | An IPFS gateway URL or an object containing IPFS configuration options.                                              |

:::info
You can read more about the `options` object specification on [its official page](../deployment/digital-asset.md#deployment-configuration)
:::

### Returns

| Type         | Description                                                                                  |
| :----------- | :------------------------------------------------------------------------------------------- |
| `Promise`    | Resolves to an object containing deployed contract details. Default return value.            |
| `Observable` | An [RxJS Observable]. Returned if `deployReactive` is set to `true` inside `options` object. |

:::info
The `deployReactive` flag can be set in the `options` object to return an [RxJS Observable] of deployment events.
:::

### Example

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
  { deployReactive: true }
).subscribe({
  next: (deploymentEvent) => {
    console.log(deploymentEvent);
  },
  error: (error) => {
    console.error(error);
  },
  complete: () => {
    console.log('Deployment Complete');
  },
});
/**
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP8IdentifiableDigitalAsset',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP8IdentifiableDigitalAsset',
  status: 'COMPLETE',
  contractAddress: '0x2cA038832c15E61b83d47414Eb53818a45e0E142',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'initialize(string,string,address)',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'initialize(string,string,address)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  status: 'PENDING',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'transferOwnership(address)',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'transferOwnership(address)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  LSP8IdentifiableDigitalAsset: {
    address: '0x2cA038832c15E61b83d47414Eb53818a45e0E142',
    receipt: {
      ...
    },
  }
}
*/
```

[contract deployment options]: ../deployment/digital-asset/#deployment-configuration
[rxjs observable]: https://rxjs.dev/guide/observable
[constructor parameters]: ../../../../../standards/smart-contracts/lsp7-digital-asset#constructor
[contract deployment options]: ../deployment/digital-asset.md
[lsp4]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
[uploading lsp4 digital asset metadata]: ./lsp4-digital-asset-metadata#uploadMetadata
[lsp-smart-contracts]: https://github.com/lukso-network/lsp-smart-contracts
[eip1167]: https://eips.ethereum.org/EIPS/eip-1167
[rxjs observable]: https://rxjs.dev/guide/observable
[ipfs-http-client]: https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions
