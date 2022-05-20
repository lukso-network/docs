---
sidebar_position: 3
title: LSP7DigitalAsset
---

# LSP7DigitalAsset

## deploy

```js
lspFactory.LSP7DigitalAsset.deploy(digitalAssetProperties [, options]);
```

Deploys a mintable [LSP7 Digital Asset](../../../standards/nft-2.0/LSP7-Digital-Asset).

### Parameters

#### 1. `digitalAssetProperties` - Object

Specify properties to be set on the LSP7 Digital Asset during deployment.

| Name                                                                                    | Type             | Description                                                                                                                                      |
| :-------------------------------------------------------------------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| [`name`](../deployment/digital-asset#digital-asset-properties)                          | String           | The name of the token. Passed to the LSP7 smart contract as a constructor parameter                                                              |
| [`symbol`](../deployment/digital-asset#digital-asset-properties)                        | String           | The symbol of the token. Passed to the LSP7 smart contract as a constructor parameter                                                            |
| [`controllerAddress`](../deployment/digital-asset#controller-address)                   | String           | The owner of the contract. Passed to the LSP7 smart contract constructor parameter                                                               |
| [`isNFT`](../deployment/digital-asset#lsp7-nft-20)                                      | Boolean          | Specify if the token should be fungible by setting the [LSP7 decimals] value to 18. Passed to the LSP7 smart contract as a constructor parameter |
| [`digitalAssetMetadata`](../deployment/digital-asset#digital-asset-metadata) (optional) | Object \| String | The [LSP4] metadata to be attached to the smart contract.                                                                                        |
| [`creators`](../deployment/digital-asset#adding-lsp4-metadata) (optional)               | Array            | The [LSP4] metadata to be attached to the smart contract.                                                                                        |

#### 2. `options` - Object (optional)

Object which specifies how the LSP7 Digital Asset will be deployed

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

```javascript title="Deploying an LSP7 Digital Asset"
await lspFactory.LSP7DigitalAsset.deploy({
  name: 'My token',
  symbol: 'TKN',
  controllerAddress: '0xb74a88C43BCf691bd7A851f6603cb1868f6fc147',
  isNFT: true,
});
/**
{
  LSP7DigitalAsset: {
    address: '0x32208e331d023c2ABcdfD160Ee25B97219aEfCD9',
    receipt: {
      to: null,
      from: '0x9Fba07e245B415cC9580BD6c890a9fd7D22e20db',
      contractAddress: '0x32208e331d023c2ABcdfD160Ee25B97219aEfCD9',
      transactionIndex: 0,
      gasUsed: [BigNumber],
      logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      blockHash: '0x1b44bd472b1b202620a78847138692828149e7f692763c884d99a9adf0b8a94c',
      transactionHash: '0xe923acc3431ef24fc11103b53b4219611d0f72e59734fc3c7db8da3eb4564844',
      logs: [],
      blockNumber: 12028918,
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

#### Deployment of Reactive LSP7 Digital Asset Example

```javascript title="Deploying a Reactive LSP7 Digital Asset"
await lspFactory.LSP7DigitalAsset.deploy(
  {
    name: 'My token',
    symbol: 'TKN',
    controllerAddress: '0xb74a88C43BCf691bd7A851f6603cb1868f6fc147',
    isNFT: true,
  },
  {
    deployReactive: true,
  },
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
  contractName: 'LSP7DigitalAsset',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP7DigitalAsset',
  status: 'COMPLETE',
  contractAddress: '0x97053C386eaa49d6eAD7477220ca04EFcD857dde',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP7DigitalAsset',
  functionName: 'initialize(string,string,address,bool)',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP7DigitalAsset',
  functionName: 'initialize(string,string,address,bool)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP7DigitalAsset',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP7DigitalAsset',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  status: 'PENDING',
  contractName: 'LSP7DigitalAsset',
  functionName: 'transferOwnership(address)',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP7DigitalAsset',
  functionName: 'transferOwnership(address)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  LSP7DigitalAsset: {
    address: '0x97053C386eaa49d6eAD7477220ca04EFcD857dde',
    receipt: {
      ...
    },
  }
}
Deployment Complete
*/
```

[constructor parameters]: ../../../../../standards/smart-contracts/lsp7-digital-asset#constructor
[contract deployment options]: ../deployment/digital-asset.md
[lsp4]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
[uploading lsp4 digital asset metadata]: ./lsp4-digital-asset-metadata#uploadMetadata
[lsp-smart-contracts]: https://github.com/lukso-network/lsp-smart-contracts
[eip1167]: https://eips.ethereum.org/EIPS/eip-1167
[rxjs observable]: https://rxjs.dev/guide/observable
[ipfs-http-client]: https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions
[lsp7 decimals]: https://github.com/lukso-network/lsp-smart-contracts/blob/develop/docs/ILSP7DigitalAsset.md#decimals
