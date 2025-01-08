---
sidebar_position: 5
---

### generateReceivedAssetKeys

▸ **generateReceivedAssetKeys**(`erc725YContract`, `assetAddress`, `assetInterfaceId`): `Promise`\<\{ `lsp5DataKeys`: `BytesLike`[] ; `lsp5DataValues`: `BytesLike`[] }\>

Generate an array of Data Key/Value pairs to be set on the receiver address after receiving assets.

#### Parameters

| Name               | Type               | Description                                                             |
| :----------------- | :----------------- | :---------------------------------------------------------------------- |
| `erc725YContract`  | `UniversalProfile` | The contract instance of the asset receiver.                            |
| `assetAddress`     | `BytesLike`        | The address of the asset being received (_e.g: an LSP7 or LSP8 token_). |
| `assetInterfaceId` | `BytesLike`        | The interfaceID of the asset being received.                            |

#### Returns

`Promise`\<\{ `lsp5DataKeys`: `BytesLike`[] ; `lsp5DataValues`: `BytesLike`[] }\>

A set of LSP5 data keys & data values that can be used to update an array and map in ERC725Y storage.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md

**`Example`**

```ts
generateReceivedAssetKeys(...) => { lsp5DataKeys: BytesLike[], lsp5DataValues: BytesLike[] }
```

#### Defined in

[LSP5ReceivedAssets/generateReceivedAssetKeys/generateReceivedAssetKeys.ts:32](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP5ReceivedAssets/generateReceivedAssetKeys/generateReceivedAssetKeys.ts#L32)

---

### generateSentAssetKeys

▸ **generateSentAssetKeys**(`erc725YContract`, `assetAddress`): `Promise`\<\{ `dataKeys`: `BytesLike`[] ; `dataValues`: `BytesLike`[] }\>

Generate an array of Data Key/Value pairs to be set on the sender address after sending assets.

#### Parameters

| Name              | Type               | Description                                  |
| :---------------- | :----------------- | :------------------------------------------- |
| `erc725YContract` | `UniversalProfile` | The contract instance of the asset sender.   |
| `assetAddress`    | `BytesLike`        | The address of the asset that is being sent. |

#### Returns

`Promise`\<\{ `dataKeys`: `BytesLike`[] ; `dataValues`: `BytesLike`[] }\>

A set of LSP5 data keys & data values that can be used to update an array and map in ERC725Y storage.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md

**`Example`**

```ts
generateSentAssetKeys(...) => { lsp5DataKeys: BytesLike[], lsp5DataValues: BytesLike[] }
```

#### Defined in

[LSP5ReceivedAssets/generateSentAssetKeys/generateSentAssetKeys.ts:34](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP5ReceivedAssets/generateSentAssetKeys/generateSentAssetKeys.ts#L34)
