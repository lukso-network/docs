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

:::info
By default LSPFactory deploys the [`Mintable`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol) implementation of LSP7 digital assets. To call the `mint` function import the `LSP7Mintable` abi from the [lsp-smart-contracts library](https://github.com/lukso-network/lsp-smart-contracts).

:::


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

| Name                                                                           | Type             | Description                                                                                                                                                                           |
| :----------------------------------------------------------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`LSP7DigitalAsset`](../deployment/options.md) (optional)                      | String           | Generic contract configuration object. Takes [`version`](../deployment/options.md#version) and [`deployProxy`](../deployment/options.md#version) parameters.                          |
| [`onDeployEvents`](../deployment/digital-asset#reactive-deployment) (optional) | Object           | Pass `next`, `complete` and `error` callback handlers to be executed as deployment events are fired. See [`Reactive Deployment`](../deployment/digital-asset.md#reactive-deployment). |
| [`ipfsGateway`](../deployment/digital-asset#ipfs-upload-options) (optional)    | String \| Object | An IPFS gateway URL or an object containing IPFS configuration options.                                                                                                               |

:::info
You can read more about the `options` object specification on [its official page](../deployment/digital-asset.md#deployment-configuration)
:::

### Returns

| Type         | Description                                                                                  |
| :----------- | :------------------------------------------------------------------------------------------- |
| `Promise`    | Resolves to an object containing deployed contract details.                                  |

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

#### Reactive LSP7 Digital Asset deployment Example

```javascript title="Deploying a Reactive LSP7 Digital Asset"
await lspFactory.LSP7DigitalAsset.deploy(
  {
    name: 'My token',
    symbol: 'TKN',
    controllerAddress: '0xb74a88C43BCf691bd7A851f6603cb1868f6fc147',
    isNFT: true,
  },
  {
    onDeployEvents: {
      next: (deploymentEvent) => {
        console.log(deploymentEvent);
      },
      error: (error) => {
        console.error(error);
      },
      complete: (contracts) => {
        console.log('Deployment Complete');
        console.log(contracts.LSP7DigitalAsset);
      },
    },
  },
);

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
Deployment Complete
{
  address: '0x97053C386eaa49d6eAD7477220ca04EFcD857dde',
  receipt: {
    ...
  },
}
*/
```

[constructor parameters]: ../../../../../standards/smart-contracts/lsp7-digital-asset#constructor
[contract deployment options]: ../deployment/digital-asset.md
[lsp4]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
[uploading lsp4 digital asset metadata]: ./lsp4-digital-asset-metadata#uploadMetadata
[lsp-smart-contracts]: https://github.com/lukso-network/lsp-smart-contracts
[eip1167]: https://eips.ethereum.org/EIPS/eip-1167
[ipfs-http-client]: https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions
[lsp7 decimals]: https://github.com/lukso-network/lsp-smart-contracts/blob/develop/docs/ILSP7DigitalAsset.md#decimals
