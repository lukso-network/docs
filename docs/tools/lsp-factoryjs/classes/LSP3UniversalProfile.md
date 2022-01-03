---
sidebar_position: 1.2
---
## deploy

**deploy**(`profileDeploymentOptions`, `contractDeploymentOptions?`): `Promise`<`DeployedContracts`>

Deploys a UniversalProfile to the blockchain and uploads LSP3 Profile data to IPFS

Asyncronous version of `deployReactive`. Returns a Promise with deployed contract details

**`example`**
```javascript
lspFactory.LSP3UniversalProfile.deploy({
   controllingAccounts: ['0xb74a88C43BCf691bd7A851f6603cb1868f6fc147'],
   lsp3Profile: myUniversalProfileData
 });
};
```

### Parameters

| Name | Type |
| :------ | :------ |
| `profileDeploymentOptions` | `ProfileDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

### Returns

`Promise`<`DeployedContracts`\>

___

## deployBaseContracts

**deployBaseContracts**(): `Promise`<`DeployedContracts`\>

Deploys UniversalProfile base contracts

Returns Promise with base contract details

### Returns

`Promise`<`DeployedContracts`\>

___

## deployReactive

**deployReactive**(`profileDeploymentOptions`, `contractDeploymentOptions?`): `Observable`<`LSP3AccountDeploymentEvent` \| `DeploymentEventTransaction`\>

Deploys a UniversalProfile and uploads LSP3 Profile data to IPFS

Returns an Observable which emits events as UP contracts are deployed

### Parameters

| Name | Type |
| :------ | :------ |
| `profileDeploymentOptions` | `ProfileDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

### Returns

`Observable`<`LSP3AccountDeploymentEvent` \| `DeploymentEventTransaction`\>

Observable<LSP3AccountDeploymentEvent | DeploymentEventTransaction>

___

## getDeployedByteCode

**getDeployedByteCode**(`contractAddress`): `Promise`<`string`\>

### Parameters

| Name | Type |
| :------ | :------ |
| `contractAddress` | `string` |

### Returns

`Promise`<`string`\>

___


## uploadProfileData

`Static` **uploadProfileData**(`profileData`, `uploadOptions?`): `Promise`<`LSP3ProfileDataForEncoding`\>

Uploads the LSP3Profile to the desired endpoint. This can be an `https` URL either pointing to
a public, centralized storage endpoint or an IPFS Node / Cluster

### Parameters

| Name | Type |
| :------ | :------ |
| `profileData` | `ProfileDataBeforeUpload` |
| `uploadOptions?` | `ProfileUploadOptions` |

### Returns

`Promise`<`LSP3ProfileDataForEncoding`\>
