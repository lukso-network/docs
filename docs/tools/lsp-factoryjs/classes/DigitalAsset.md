---
sidebar_position: 1.3
---

## deployBaseContracts

**deployBaseContracts**(): `Promise`<`DeployedContracts`\>

Deploys LSP7 and LSP7 base contracts

Returns Promise with base contract details


### Returns

`Promise`<`DeployedContracts`\>


## deployLSP7DigitalAsset

**deployLSP7DigitalAsset**(`digitalAssetDeploymentOptions`, `contractDeploymentOptions?`): `Promise`<`DeployedContracts`\>

Deploys a mintable LSP7 Digital Asset

Asyncronous version of `deployLSP7DigitalAssetReactive`. Returns a Promise with deployed contract details

**`example`**
```javascript
lspFactory.DigitalAsset.deployLSP7DigitalAsset({
 name: "My token",
 symbol: "TKN",
 ownerAddress: "0xb74a88C43BCf691bd7A851f6603cb1868f6fc147",
 isNFT: true,
}) 
```

### Parameters

| Name | Type |
| :------ | :------ |
| `digitalAssetDeploymentOptions` | `LSP7DigitalAssetDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

### Returns

`Promise`<`DeployedContracts`\>

Promise<`DeployedContracts`>

___

## deployLSP7DigitalAssetReactive

**deployLSP7DigitalAssetReactive**(`digitalAssetDeploymentOptions`, `contractDeploymentOptions?`): `Observable`<`DigitalAssetDeploymentEvent`\>

Deploys a mintable LSP7 Digital Asset

Returns an Observable which emits events as contracts are deployed

### Parameters

| Name | Type |
| :------ | :------ |
| `digitalAssetDeploymentOptions` | `LSP7DigitalAssetDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

### Returns

`Observable`<`DigitalAssetDeploymentEvent`\>

Observable<`DigitalAssetDeploymentEvent`>

___

## deployLSP8IdentifiableDigitalAsset

**deployLSP8IdentifiableDigitalAsset**(`digitalAssetDeploymentOptions`, `ContractDeploymentOptions?`): `Promise`<`DeployedContracts`\>

Deploys a mintable LSP7 Digital Asset

Asyncronous version of `deployLSP8IdentifiableDigitalAssetReactive`.
Returns a Promise with deployed contract details

**`example`**
```javascript
lspFactory.DigitalAsset.deployLSP8IdentifiableDigitalAsset({
 name: "My token",
 symbol: "TKN",
 ownerAddress: "0xb74a88C43BCf691bd7A851f6603cb1868f6fc147",
})
```

### Parameters

| Name | Type |
| :------ | :------ |
| `digitalAssetDeploymentOptions` | `DigitalAssetDeploymentOptions` |
| `ContractDeploymentOptions?` | `ContractDeploymentOptions` |

### Returns

`Promise`<`DeployedContracts`\>

___

## deployLSP8IdentifiableDigitalAssetReactive

**deployLSP8IdentifiableDigitalAssetReactive**(`digitalAssetDeploymentOptions`, `contractDeploymentOptions?`): `Observable`<`DigitalAssetDeploymentEvent`\>

Deploys a mintable LSP8 Digital Asset

Returns an Observable which emits events as contracts are deployed

### Parameters

| Name | Type |
| :------ | :------ |
| `digitalAssetDeploymentOptions` | `DigitalAssetDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

### Returns

`Observable`<`DigitalAssetDeploymentEvent`\>
