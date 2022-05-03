---
sidebar_position: 3
title: LSP7DigitalAsset
---

# LSP7DigitalAsset

## deploy

```js
lspFactory.LSP7DigitalAsset.deploy(
  digitalAssetDeploymentOptions,
  contractDeploymentOptions?
);
```

Deploys a mintable [LSP7 Digital Asset](../../../standards/nft-2.0/LSP7-Digital-Asset).

#### Parameters

| Name                            | Type   | Description                                          |
| :------------------------------ | :----- | :--------------------------------------------------- |
| `digitalAssetDeploymentOptions` | Object | The [constructor parameters] used when deploying.    |
| `contractDeploymentOptions?`    | Object | The Specification for [Contract Deployment Options]. |

#### Parameters of `digitalAssetDeploymentOptions`

| Name                    | Type                               | Description                                                                         |
| :---------------------- | :--------------------------------- | :---------------------------------------------------------------------------------- |
| `name`                  | string                             | The name of the token.                                                              |
| `symbol`                | string                             | The symbol of the token.                                                            |
| `controllerAddress`     | string                             | The owner of the contract.                                                          |
| `isNFT`                 | boolean                            | Specify if the token should be fungible by setting the [LSP7 decimals] value to 18. |
| `digitalAssetMetadata?` | LSP4MetadataBeforeUpload or string | The [LSP4] metadata to be attached to the smart contract.                           |
| `creators?`             | string[&nbsp;]                     | The [LSP4] metadata to be attached to the smart contract.                           |

:::info
The property `digitalAssetMetadata?` can be:

- an encoded hex string,
- an IPFS URL, or
- a metadata object as defined in [Uploading LSP4 Digital Asset Metadata].
  The property `creators?` is used to set the [LSP4Creators[&nbsp;]](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4creators) key on the contract.
  :::

#### Parameters of `contractDeploymentOptions?`

| Name                 | Type    | Description                                                                                                          |
| :------------------- | :------ | :------------------------------------------------------------------------------------------------------------------- |
| `version?`           | string  | The contract version you want to deploy. Defaults to latest version of the [lsp-smart-contracts] library.            |
| `byteCode?`          | string  | The creation + runtime bytecode of the contract to deploy.                                                           |
| `libAddress?`        | string  | The address of a base contract to be used in deployment as implementation behind a proxy contract (e.g., [EIP1167]). |
| `deployReactive?`    | boolean | Whether to return an [RxJS Observable] of deployment events. Defaults to `false`.                                    |
| `deployProxy?`       | boolean | Whether the contract should be deployed using a proxy contract implementation (e.g., [EIP1167]). Defaults to `true`. |
| `uploadOptions?`     | Object  | The Specification of how the metadata should be uploaded.                                                            |
| `ipfsClientOptions?` | Object  | The IPFS client options as defined by the [IPFS-HTTP-Client] used internally.                                        |

:::info
You can read more about the `contractDeploymentOptions?` specification on [its official page](../deployment/digital-asset.md).
:::

#### Returns

| Name         | Type                                                           | Description                                                 |
| :----------- | :------------------------------------------------------------- | :---------------------------------------------------------- |
| `Promise`    | <DeployedLSP7DigitalAsset\>, or <DigitalAssetDeploymentEvent\> | An object containing deployed contract details.             |
| `Observable` | RxJS <Object\>                                                 | An [RxJS Observable], if `deployReactive` is set to `true`. |

:::info
The `deployReactive` flag can be set in the `ContractDeploymentOptions` object, and returns an [RxJS Observable] of deployment events.
:::

#### Deployment of LSP7 Digital Asset Example

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
  complete: () => {
    console.log('Deployment Complete');
  },
});
/**
{
  type: 'PROXY',
  contractName: 'LSP7DigitalAsset',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'LSP7DigitalAsset',
  status: 'PENDING',
  receipt: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'LSP7DigitalAsset',
  functionName: 'initialize',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'LSP7DigitalAsset',
  functionName: 'initialize',
  status: 'COMPLETE',
  receipt: {
    ...
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
