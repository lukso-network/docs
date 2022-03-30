---
sidebar_position: 1.3
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

1. `digitalAssetDeploymentOptions` - `Object`: The [constructor parameters](../../../../../standards/smart-contracts/lsp7-digital-asset#constructor) used when deploying.
   - `name` - `string`: The name of the token.
   - `symbol` - `string`: The symbol of the token.
   - `controllerAddress` - `string` : The owner of the contract.
   - `isNFT` - `boolean`: Specify if the contract represent a fungible or a non-fungible token.
   - `digitalAssetMetadata`?: `LSP4MetadataBeforeUpload | string`: [LSP4 Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md) to be attached to the smart contract. Can be an encoded hex string, ipfs url or metadata object as defined in [LSP4DigitalAssetMetadata.uploadMetadata](./lsp4-digital-asset-metadata#uploadMetadata).
   - `creators?` `string[]`: Array of ERC725Account `address`es that defines the creators of the digital asset. Used to set the [LSP4Creators[]](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4creators) key on the contract.
2. `contractDeploymentOptions?` - `Object`: Specify contract deployment details. See [Contract Deployment Options specification](../deployment/contract-deployment-options) for more information.
    - `version?` - `string`: The contract version you want to deploy. Defaults to latest version of [lsp-smart-contracts library](https://github.com/lukso-network/lsp-smart-contracts).
    - `byteCode?` - `string`: The creation + runtime bytecode of the contract to deploy.
    - `libAddress?` - `string`: The address of a Base Contract to be used in deployment as implementation behind a proxy contract (eg: [EIP1167](https://eips.ethereum.org/EIPS/eip-1167)).
    - `deployReactive?` - `boolean`: Whether to return an [RxJS Observable](https://rxjs.dev/guide/observable) of deployment events. Defaults to `false`.
    - `deployProxy?` - `boolean`: Whether the contract should be deployed using a proxy contract implementation (eg: [EIP1167](https://eips.ethereum.org/EIPS/eip-1167)). Defaults to true.
    - `uploadOptions?` - `Object`: Specify how the metadata should be uploaded.
      - `ipfsClientOptions?` - `Object`: IPFS Client Options as defined by the [ipfs-http-client library](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions) used internally.

Read more about `contractDeploymentOptions` specification [here](../deployment/contract-deployment-options.md)

#### Returns

`Promise`<`DeployedLSP7DigitalAsset`\> | `Observable`<`DigitalAssetDeploymentEvent`\>

Returns a Promise with object containing deployed contract details.

If `deployReactive` flag is set to `true` in the `ContractDeploymentOptions` object, returns an [RxJS Observable](https://rxjs.dev/guide/observable) of deployment events.

#### Example

```javascript title="LSP7 Digital Asset deployment"
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

```javascript title="Reactive LSP7 Digital Asset deployment"
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
