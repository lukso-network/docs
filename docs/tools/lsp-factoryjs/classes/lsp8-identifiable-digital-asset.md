---
sidebar_position: 1.4
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

1. `digitalAssetDeploymentOptions` - `Object`: The [options used for deployment](../../../../../standards/smart-contracts/lsp8-identifiable-digital-asset#constructor).
   - `name` - `string`: The name of the token.
   - `symbol` - `string`: The symbol of the token.
   - `ownerAddress` - `string` : The owner of the contract.
   - `digitalAssetMetadata`?: `LSP4MetadataBeforeUpload | string`: [LSP4 Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md) to be attached to the smart contract. Can be an encoded hex string, ipfs url or metadata object as defined in (LSP4DigitalAssetMetadata.uploadMetadata)[./lsp4-digital-asset-metadata#uploadMetadata].
   - `creators?` `string[]`: Array of ERC725Account `address`es that defines the creators of the digital asset. Used to set the [LSP4Creators[]](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4creators) key on the contract.
2. `contractDeploymentOptions?` - `Object`: Same as for [LSP7DigitalAsset deployment](./lsp7-digital-asset)

#### Returns

`Promise`<`DeployedLSP8IdentifiableDigitalAsset`\> | `Observable`<`DigitalAssetDeploymentEvent`\>

Promise with deployed contract details.

If `deployReactive` flag is set to `true` in the `ContractDeploymentOptions` object, returns an [RxJS Observable](https://rxjs.dev/guide/observable) of deployment events.

#### Example

```javascript
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  name: 'My token',
  symbol: 'TKN',
  ownerAddress: '0xb74a88C43BCf691bd7A851f6603cb1868f6fc147',
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

```javascript title="Reactive LSP8 Identifiable Digital Asset deployment"
await lspFactory.LSP8IdentifiableDigitalAsset.deploy(
  {
    name: 'My token',
    symbol: 'TKN',
    ownerAddress: '0xb74a88C43BCf691bd7A851f6603cb1868f6fc147',
  },
  { deployReactive: true }
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
