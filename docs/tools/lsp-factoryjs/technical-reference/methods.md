---
sidebar_label: Methods
sidebar_position: 1.1
---

# Class: LSPFactory

Factory for creating LSP3UniversalProfiles / LSP4DigitalCertificates

## LSPFactory Constructor

• **new LSPFactory**(`rpcUrlOrProvider`, `privateKeyOrSigner`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rpcUrlOrProvider` | `string` \| `Web3Provider` \| `JsonRpcProvider` |
| `privateKeyOrSigner` | `string` \| `Signer` \| `SignerOptions` |

#### Defined in

[src/lib/lsp-factory.ts:24](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/lsp-factory.ts#L24)


# Class: LSP3UniversalProfile

## LSP3UniversalProfile Methods

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

#### Defined in

[src/lib/classes/lsp3-universal-profile.ts:194](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/lsp3-universal-profile.ts#L194)

# Class: DigitalAsset

## DigitalAsset Methods

### deployBaseContracts

▸ **deployBaseContracts**(): `Promise`<`DeployedContracts`\>

#### Returns

`Promise`<`DeployedContracts`\>

#### Defined in

[src/lib/classes/digital-asset.ts:106](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/digital-asset.ts#L106)

___

### deployLSP7DigitalAsset

▸ **deployLSP7DigitalAsset**(`digitalAssetDeploymentOptions`, `contractDeploymentOptions?`): `Promise`<`DeployedContracts`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `digitalAssetDeploymentOptions` | `LSP7DigitalAssetDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

#### Returns

`Promise`<`DeployedContracts`\>

#### Defined in

[src/lib/classes/digital-asset.ts:42](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/digital-asset.ts#L42)

___

### deployLSP7DigitalAssetReactive

▸ **deployLSP7DigitalAssetReactive**(`digitalAssetDeploymentOptions`, `contractDeploymentOptions?`): `Observable`<`DigitalAssetDeploymentEvent`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `digitalAssetDeploymentOptions` | `LSP7DigitalAssetDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

#### Returns

`Observable`<`DigitalAssetDeploymentEvent`\>

#### Defined in

[src/lib/classes/digital-asset.ts:29](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/digital-asset.ts#L29)

___

### deployLSP8IdentifiableDigitalAsset

▸ **deployLSP8IdentifiableDigitalAsset**(`digitalAssetDeploymentOptions`, `ContractDeploymentOptions?`): `Promise`<`DeployedContracts`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `digitalAssetDeploymentOptions` | `DigitalAssetDeploymentOptions` |
| `ContractDeploymentOptions?` | `ContractDeploymentOptions` |

#### Returns

`Promise`<`DeployedContracts`\>

#### Defined in

[src/lib/classes/digital-asset.ts:83](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/digital-asset.ts#L83)

___

### deployLSP8IdentifiableDigitalAssetReactive

▸ **deployLSP8IdentifiableDigitalAssetReactive**(`digitalAssetDeploymentOptions`, `contractDeploymentOptions?`): `Observable`<`DigitalAssetDeploymentEvent`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `digitalAssetDeploymentOptions` | `DigitalAssetDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

#### Returns

`Observable`<`DigitalAssetDeploymentEvent`\>

#### Defined in

[src/lib/classes/digital-asset.ts:67](https://github.com/lukso-network/tools-lsp-factory/blob/0803dfe/src/lib/classes/digital-asset.ts#L67)
