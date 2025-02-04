---
sidebar_position: 4
---

### addDigitalAssetCreators

▸ **addDigitalAssetCreators**(`digitalAsset`, `newCreators`, `signer?`): `Promise`\<`void`\>

Add LSP4 Creators to the digital asset contract that supports ERC725Y.

#### Parameters

| Name           | Type                     | Description                                                                          |
| :------------- | :----------------------- | :----------------------------------------------------------------------------------- |
| `digitalAsset` | `BytesLike` \| `ERC725Y` | -                                                                                    |
| `newCreators`  | `Issuer`[]               | An array of creators which specifies the address and interface id of each creator. |
| `signer?`      | `Signer` \| `Wallet`     | The signer that will send the transaction.                                           |

#### Returns

`Promise`\<`void`\>

**`Since`**

v0.0.2

**`Throws`**

- When `newCreators` is an empty array.
- When `digitalAssetAddress` is not a valid address.
- When the contract deployed at `digitalAssetAddress` address does not support the `ERC725Y` interface id.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md

#### Defined in

[LSP4DigitalAssetMetadata/addDigitalAssetCreators/addDigitalAssetCreators.ts:30](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP4DigitalAssetMetadata/addDigitalAssetCreators/addDigitalAssetCreators.ts#L30)

---

### authenticateDigitalAssetCreators

▸ **authenticateDigitalAssetCreators**(`digitalAsset`, `provider?`): `Promise`\<`DigitalAssetsCreators`\>

Get the authenticated LSP4 Creators of the digital asset contract that supports ERC725Y.

#### Parameters

| Name           | Type                     | Description         |
| :------------- | :----------------------- | :------------------ |
| `digitalAsset` | `BytesLike` \| `ERC725Y` | -                   |
| `provider?`    | `Provider`               | An ethers provider. |

#### Returns

`Promise`\<`DigitalAssetsCreators`\>

An array of authenticated & unauthenticated Issuers.

**`Since`**

v0.0.2

**`Throws`**

When `digitalAssetAddress` is not a valid address.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md

#### Defined in

[LSP4DigitalAssetMetadata/authenticateDigitalAssetCreators/authenticateDigitalAssetCreators.ts:27](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP4DigitalAssetMetadata/authenticateDigitalAssetCreators/authenticateDigitalAssetCreators.ts#L27)

---

### getAssetMetadata

▸ **getAssetMetadata**(`digitalAsset`, `provider?`): `Promise`\<`LSP4AssetMetadata`\>

Returns a object of type LSP4AssetMetadata.

#### Parameters

| Name           | Type                     | Description                         |
| :------------- | :----------------------- | :---------------------------------- |
| `digitalAsset` | `BytesLike` \| `ERC725Y` | The instance of a ERC725Y contract. |
| `provider?`    | `Provider`               | -                                   |

#### Returns

`Promise`\<`LSP4AssetMetadata`\>

**`Since`**

v0.0.2

**`Throws`**

- When fails fetching the data from the stored url.
- When the fetched data is not `LSP4AssetMetadata`.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md

**`Example`**

```ts
getAssetMetadata(ERC725Y) =>
{
  LSP4Metadata: {
    name: "",
    description: "",
    links: [],
    icon: [],
    assets: [],
    images: []
  }
}
```

#### Defined in

[LSP4DigitalAssetMetadata/getAssetMetadata/getAssetMetadata.ts:45](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP4DigitalAssetMetadata/getAssetMetadata/getAssetMetadata.ts#L45)

---

### getDigitalAssetCreators

▸ **getDigitalAssetCreators**(`digitalAsset`, `provider?`): `Promise`\<`Issuer`[]\>

Get the LSP4 Creators of a digital asset contract that supports ERC725Y.

#### Parameters

| Name           | Type                     | Description         |
| :------------- | :----------------------- | :------------------ |
| `digitalAsset` | `BytesLike` \| `ERC725Y` | -                   |
| `provider?`    | `Provider`               | An ethers provider. |

#### Returns

`Promise`\<`Issuer`[]\>

An array of Issuers.

**`Since`**

v0.0.2

**`Throws`**

- When `digitalAssetAddress` is not a valid address.
- When the contract deployed at `digitalAssetAddress` does not support the `ERC725Y` interface id.
- When the length for `LSP4Creators[]` is not a valid LSP2 array length value.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md

#### Defined in

[LSP4DigitalAssetMetadata/getDigitalAssetCreators/getDigitalAssetCreators.ts:33](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP4DigitalAssetMetadata/getDigitalAssetCreators/getDigitalAssetCreators.ts#L33)

---

### isAssetMetadata

▸ **isAssetMetadata**(`object`): object is LSP4DigitalAssetMetadataJSON

Returns `true` is the passed object is an LSP4 Asset Metadata, `false` otherwise.

#### Parameters

| Name     | Type  | Description                       |
| :------- | :---- | :-------------------------------- |
| `object` | `any` | The object that is to be checked. |

#### Returns

object is LSP4DigitalAssetMetadataJSON

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md

**`Example`**

```ts
isAssetMetadata({ LSP4Metadata: { description: "", links: [], images: [], assets: [] icon: [] } }) => true
isAssetMetadata({ description: "", links: [], name: "", tags: [] }) => false
```

#### Defined in

[LSP4DigitalAssetMetadata/isAssetMetadata/isAssetMetadata.ts:16](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP4DigitalAssetMetadata/isAssetMetadata/isAssetMetadata.ts#L16)

---

### removeDigitalAssetCreators

▸ **removeDigitalAssetCreators**(`digitalAsset`, `signer?`): `Promise`\<`void`\>

Remove the LSP4 Creators of a digital asset contract that supports ERC725Y.

#### Parameters

| Name           | Type                     | Description                                |
| :------------- | :----------------------- | :----------------------------------------- |
| `digitalAsset` | `BytesLike` \| `ERC725Y` | -                                          |
| `signer?`      | `Signer` \| `Wallet`     | The signer that will send the transaction. |

#### Returns

`Promise`\<`void`\>

**`Since`**

v0.0.2

**`Throws`**

- When `digitalAssetAddress` is not a valid address.
- When the contract deployed at `digitalAssetAddress` address does not support the `ERC725Y` interface id.
- When there are no `LSP4Creators[]` in the digital asset storage.
- When the length for `LSP4Creators[]` is not a valid LSP2 array length value.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md

#### Defined in

[LSP4DigitalAssetMetadata/removeDigitalAssetCreators/removeDigitalAssetCreators.ts:27](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP4DigitalAssetMetadata/removeDigitalAssetCreators/removeDigitalAssetCreators.ts#L27)
