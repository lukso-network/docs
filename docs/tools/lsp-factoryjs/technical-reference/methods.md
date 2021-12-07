---
sidebar_label: Methods
sidebar_position: 1.1
---


## Class: LSPFactory

### Constructors

- [constructor](LSPFactory.md#constructor)


## Class: LSP3UniversalProfile

### Constructors

- [constructor](LSP3UniversalProfile.md#constructor)

### Properties

- [options](LSP3UniversalProfile.md#options)
- [signer](LSP3UniversalProfile.md#signer)

### Methods

- [deploy](LSP3UniversalProfile.md#deploy)
- [deployBaseContracts](LSP3UniversalProfile.md#deploybasecontracts)
- [deployReactive](LSP3UniversalProfile.md#deployreactive)
- [getDeployedByteCode](LSP3UniversalProfile.md#getdeployedbytecode)
- [preDeployContracts](LSP3UniversalProfile.md#predeploycontracts)
- [uploadProfileData](LSP3UniversalProfile.md#uploadprofiledata)

## Constructors

### constructor

• **new LSP3UniversalProfile**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`LSPFactoryOptions`](../interfaces/LSPFactoryOptions.md) |

#### Defined in

[lib/classes/lsp3-universal-profile.ts:38](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/lsp3-universal-profile.ts#L38)

## Properties

### options

• **options**: [`LSPFactoryOptions`](../interfaces/LSPFactoryOptions.md)

#### Defined in

[lib/classes/lsp3-universal-profile.ts:36](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/lsp3-universal-profile.ts#L36)

___

### signer

• **signer**: `NonceManager`

#### Defined in

[lib/classes/lsp3-universal-profile.ts:37](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/lsp3-universal-profile.ts#L37)

## Methods

### deploy

▸ **deploy**(`profileDeploymentOptions`, `contractDeploymentOptions?`): `Promise`<[`DeployedContracts`](../interfaces/DeployedContracts.md)\>

TODO: docs

#### Parameters

| Name | Type |
| :------ | :------ |
| `profileDeploymentOptions` | [`ProfileDeploymentOptions`](../interfaces/ProfileDeploymentOptions.md) |
| `contractDeploymentOptions?` | [`ContractDeploymentOptions`](../interfaces/ContractDeploymentOptions.md) |

#### Returns

`Promise`<[`DeployedContracts`](../interfaces/DeployedContracts.md)\>

#### Defined in

[lib/classes/lsp3-universal-profile.ts:123](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/lsp3-universal-profile.ts#L123)

___

### deployBaseContracts

▸ **deployBaseContracts**(): `Promise`<[`DeployedContracts`](../interfaces/DeployedContracts.md)\>

#### Returns

`Promise`<[`DeployedContracts`](../interfaces/DeployedContracts.md)\>

#### Defined in

[lib/classes/lsp3-universal-profile.ts:150](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/lsp3-universal-profile.ts#L150)

___

### deployReactive

▸ **deployReactive**(`profileDeploymentOptions`, `contractDeploymentOptions?`): `Observable`<`LSP3AccountDeploymentEvent` \| [`DeploymentEventTransaction`](../interfaces/DeploymentEventTransaction.md)\>

TODO: docs

#### Parameters

| Name | Type |
| :------ | :------ |
| `profileDeploymentOptions` | [`ProfileDeploymentOptions`](../interfaces/ProfileDeploymentOptions.md) |
| `contractDeploymentOptions?` | [`ContractDeploymentOptions`](../interfaces/ContractDeploymentOptions.md) |

#### Returns

`Observable`<`LSP3AccountDeploymentEvent` \| [`DeploymentEventTransaction`](../interfaces/DeploymentEventTransaction.md)\>

#### Defined in

[lib/classes/lsp3-universal-profile.ts:46](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/lsp3-universal-profile.ts#L46)

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

[lib/classes/lsp3-universal-profile.ts:146](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/lsp3-universal-profile.ts#L146)

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

[lib/classes/lsp3-universal-profile.ts:180](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/lsp3-universal-profile.ts#L180)

___

### uploadProfileData

▸ `Static` **uploadProfileData**(`profileData`, `uploadOptions?`): `Promise`<`LSP3ProfileDataForEncoding`\>

Uploads the LSP3Profile to the desired endpoint. This can be an `https` URL either pointing to
a public, centralized storage endpoint or an IPFS Node / Cluster

**`memberof`** LSP3UniversalProfile

#### Parameters

| Name | Type |
| :------ | :------ |
| `profileData` | [`ProfileDataBeforeUpload`](../interfaces/ProfileDataBeforeUpload.md) |
| `uploadOptions?` | `ProfileUploadOptions` |

#### Returns

`Promise`<`LSP3ProfileDataForEncoding`\>

{(Promise<AddResult | string>)}

#### Defined in

[lib/classes/lsp3-universal-profile.ts:192](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/lsp3-universal-profile.ts#L192)

## Class: DigitalAsset

### Constructors

- [constructor](DigitalAsset.md#constructor)

### Properties

- [options](DigitalAsset.md#options)
- [signer](DigitalAsset.md#signer)

### Methods

- [deployBaseContracts](DigitalAsset.md#deploybasecontracts)
- [deployLSP7DigitalAsset](DigitalAsset.md#deploylsp7digitalasset)
- [deployLSP7DigitalAssetReactive](DigitalAsset.md#deploylsp7digitalassetreactive)
- [deployLSP8IdentifiableDigitalAsset](DigitalAsset.md#deploylsp8identifiabledigitalasset)
- [deployLSP8IdentifiableDigitalAssetReactive](DigitalAsset.md#deploylsp8identifiabledigitalassetreactive)

## Constructors

### constructor

• **new DigitalAsset**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`LSPFactoryOptions`](../interfaces/LSPFactoryOptions.md) |

#### Defined in

[lib/classes/digital-asset.ts:22](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/digital-asset.ts#L22)

## Properties

### options

• **options**: [`LSPFactoryOptions`](../interfaces/LSPFactoryOptions.md)

#### Defined in

[lib/classes/digital-asset.ts:20](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/digital-asset.ts#L20)

___

### signer

• **signer**: `NonceManager`

#### Defined in

[lib/classes/digital-asset.ts:21](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/digital-asset.ts#L21)

## Methods

### deployBaseContracts

▸ **deployBaseContracts**(): `Promise`<`DeployedContracts`\>

#### Returns

`Promise`<`DeployedContracts`\>

#### Defined in

[lib/classes/digital-asset.ts:106](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/digital-asset.ts#L106)

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

[lib/classes/digital-asset.ts:42](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/digital-asset.ts#L42)

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

[lib/classes/digital-asset.ts:29](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/digital-asset.ts#L29)

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

[lib/classes/digital-asset.ts:83](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/digital-asset.ts#L83)

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

[lib/classes/digital-asset.ts:67](https://github.com/lukso-network/tools-lsp-factory/blob/8e385a2/src/lib/classes/digital-asset.ts#L67)
