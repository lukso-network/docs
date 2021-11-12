---
sidebar_label: LSP3UniversalProfile
sidebar_position: 1.2
---
# Class: LSP3UniversalProfile

## Methods

### deploy

▸ **deploy**(`profileDeploymentOptions`, `contractDeploymentOptions?`): `Promise`<`DeployedContracts`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `profileDeploymentOptions` | `ProfileDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

#### Returns

`Promise`<`DeployedContracts`\>

#### Defined in

[src/lib/classes/lsp3-universal-profile.ts:125](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/lsp3-universal-profile.ts#L125)

___

### deployBaseContracts

▸ **deployBaseContracts**(): `Promise`<`DeployedContracts`\>

#### Returns

`Promise`<`DeployedContracts`\>

#### Defined in

[src/lib/classes/lsp3-universal-profile.ts:152](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/lsp3-universal-profile.ts#L152)

___

### deployReactive

▸ **deployReactive**(`profileDeploymentOptions`, `contractDeploymentOptions?`): `Observable`<`LSP3AccountDeploymentEvent` \| `DeploymentEventTransaction`\>

TODO: docs

#### Parameters

| Name | Type |
| :------ | :------ |
| `profileDeploymentOptions` | `ProfileDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

#### Returns

`Observable`<`LSP3AccountDeploymentEvent` \| `DeploymentEventTransaction`\>

#### Defined in

[src/lib/classes/lsp3-universal-profile.ts:46](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/lsp3-universal-profile.ts#L46)

___

### getDeployedByteCode

▸ **getDeployedByteCode**(`contractAddress`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractAddress` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/classes/lsp3-universal-profile.ts:148](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/lsp3-universal-profile.ts#L148)

___

### preDeployContracts

▸ **preDeployContracts**(`version?`): `Promise`<`void`\>

Pre-deploys the latest Version of the LSP3UniversalProfile smart-contracts.

#### Parameters

| Name | Type |
| :------ | :------ |
| `version?` | ``"string"`` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/classes/lsp3-universal-profile.ts:182](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/lsp3-universal-profile.ts#L182)

___

### uploadProfileData

▸ `Static` **uploadProfileData**(`profileData`, `uploadOptions?`): `Promise`<`LSP3ProfileDataForEncoding`\>

Uploads the LSP3Profile to the desired endpoint. This can be an `https` URL either pointing to
a public, centralized storage endpoint or an IPFS Node / Cluster

**`memberof`** LSP3UniversalProfile

#### Parameters

| Name | Type |
| :------ | :------ |
| `profileData` | `ProfileDataBeforeUpload` |
| `uploadOptions?` | `ProfileUploadOptions` |

#### Returns

`Promise`<`LSP3ProfileDataForEncoding`\>

{(Promise<AddResult | string>)}

#### Defined in

[src/lib/classes/lsp3-universal-profile.ts:194](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/lsp3-universal-profile.ts#L194)
