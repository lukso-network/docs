---
sidebar_position: 8
---

### deployUniversalProfile

▸ **deployUniversalProfile**(`signer`, `mainController`, `additionalDataKeys`, `additionalDataValues`, `additionalControllers`, `salt?`): `Promise`\<\{ `keyManagerAddress`: `string` ; `universalProfileAddress`: `string` }\>

Deploy Universal Profile with Key Manager using LSP23 Linked Contracts Factory.

#### Parameters

| Name                    | Type                 | Description                                                                       |
| :---------------------- | :------------------- | :-------------------------------------------------------------------------------- |
| `signer`                | `Signer` \| `Wallet` | The signer used to deploy the contracts, needs to have native token for gas fees. |
| `mainController`        | `BytesLike`          | The main controller for the Universal Profile.                                    |
| `additionalDataKeys`    | `BytesLike`[]        | Data keys that you want to set on deployment.                                     |
| `additionalDataValues`  | `BytesLike`[]        | Data values that you want to set on deployment.                                   |
| `additionalControllers` | `LSP6Controller`[]   | Additional controllers for the deployed Universal Profile.                        |
| `salt?`                 | `BytesLike`          | -                                                                                 |

#### Returns

`Promise`\<\{ `keyManagerAddress`: `string` ; `universalProfileAddress`: `string` }\>

The addresses of the Universal Profile & Key Manager.

**`Since`**

v0.0.2

#### Defined in

[LSP23LinkedContractsFactory/deployUniversalProfile/deployUniversalProfile.ts:34](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP23LinkedContractsFactory/deployUniversalProfile/deployUniversalProfile.ts#L34)
