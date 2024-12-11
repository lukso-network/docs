---
sidebar_position: 7
---

### addIssuedAssets

▸ **addIssuedAssets**(`issuer`, `newIssuedAssets`, `signer?`): `Promise`\<`void`\>

Add LSP12 Issued Assets to a issuer contract that supports ERC725Y.

#### Parameters

| Name              | Type                     | Description                                                                                  |
| :---------------- | :----------------------- | :------------------------------------------------------------------------------------------- |
| `issuer`          | `BytesLike` \| `ERC725Y` | -                                                                                            |
| `newIssuedAssets` | `DigitalAsset`[]         | An array of issued assets which specifies the address and interface id of each issued asset. |
| `signer?`         | `Signer` \| `Wallet`     | The signer that will send the transaction.                                                   |

#### Returns

`Promise`\<`void`\>

**`Since`**

v0.0.2

**`Throws`**

- When `newIssuedAssets` is an empty array.
- When `issuerAddress` is not a valid address.
- When the contract deployed at `issuerAddress` address does not support the `ERC725Y` interface id.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md

#### Defined in

[LSP12IssuedAssets/addIssuedAssets/addIssuedAssets.ts:32](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP12IssuedAssets/addIssuedAssets/addIssuedAssets.ts#L32)

---

### authenticateIssuedAssets

▸ **authenticateIssuedAssets**(`issuer`, `provider?`): `Promise`\<`IssuerAssets`\>

Get the authenticated LSP12 Issued Assets of a issuer contract that supports ERC725Y.

#### Parameters

| Name        | Type                     | Description         |
| :---------- | :----------------------- | :------------------ |
| `issuer`    | `BytesLike` \| `ERC725Y` | -                   |
| `provider?` | `Provider`               | An ethers provider. |

#### Returns

`Promise`\<`IssuerAssets`\>

An array of authenticated & unauthenticated Digital Assets.

**`Since`**

v0.0.2

**`Throws`**

When `issuerAddress` is not a valid address.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md

#### Defined in

[LSP12IssuedAssets/authenticateIssuedAssets/authenticateIssuedAssets.ts:27](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP12IssuedAssets/authenticateIssuedAssets/authenticateIssuedAssets.ts#L27)

---

### getIssuedAssets

▸ **getIssuedAssets**(`issuer`, `provider?`): `Promise`\<`DigitalAsset`[]\>

Get the LSP12 Issued Assets of a issuer contract that supports ERC725Y.

#### Parameters

| Name        | Type                     | Description         |
| :---------- | :----------------------- | :------------------ |
| `issuer`    | `BytesLike` \| `ERC725Y` | -                   |
| `provider?` | `Provider`               | An ethers provider. |

#### Returns

`Promise`\<`DigitalAsset`[]\>

An array of Digital Assets.

**`Since`**

v0.0.2

**`Throws`**

- When `issuerAddress` is not a valid address.
- When the contract deployed at `issuerAddress` does not support the `ERC725Y` interface id.
- When the length for `LSP12IssuedAssets[]` is not a valid LSP2 array length value.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md

#### Defined in

[LSP12IssuedAssets/getIssuedAssets/getIssuedAssets.ts:33](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP12IssuedAssets/getIssuedAssets/getIssuedAssets.ts#L33)

---

### removeIssuedAssets

▸ **removeIssuedAssets**(`issuer`, `signer?`): `Promise`\<`void`\>

Remove the LSP12 Issued Assets of a issuer contract that supports ERC725Y.

#### Parameters

| Name      | Type                     | Description                                |
| :-------- | :----------------------- | :----------------------------------------- |
| `issuer`  | `BytesLike` \| `ERC725Y` | -                                          |
| `signer?` | `Signer` \| `Wallet`     | The signer that will send the transaction. |

#### Returns

`Promise`\<`void`\>

**`Since`**

v0.0.2

**`Throws`**

- When `issuerAddress` is not a valid address.
- When the contract deployed at `issuerAddress` address does not support the `ERC725Y` interface id.
- When there are no `LSP12IssuedAssets[]` in the issuer storage.
- When the length for `LSP12IssuedAssets[]` is not a valid LSP2 array length value.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md

#### Defined in

[LSP12IssuedAssets/removeIssuedAssets/removeIssuedAssets.ts:27](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP12IssuedAssets/removeIssuedAssets/removeIssuedAssets.ts#L27)
