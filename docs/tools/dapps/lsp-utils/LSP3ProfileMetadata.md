---
sidebar_position: 3
---

### getProfileMetadata

▸ **getProfileMetadata**(`contract`, `provider?`): `Promise`\<`LSP3ProfileMetadataJSON`\>

Returns a object of type LSP3ProfileMetadata.

#### Parameters

| Name        | Type                     |
| :---------- | :----------------------- |
| `contract`  | `BytesLike` \| `ERC725Y` |
| `provider?` | `Provider`               |

#### Returns

`Promise`\<`LSP3ProfileMetadataJSON`\>

**`Since`**

v0.0.1

**`Throws`**

- When fails fetching the data from the stored url.
- When the fetched data is not `LSP3ProfileMetadata`.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md

**`Example`**

```ts
getProfileMetadata(ERC725Y) =>
{
  LSP3Profile: {
    name: string;
    description: string;
    links: Link[];
    tags: string[];
    avatar: (Avatar | NFTBasedAvatar)[];
    profileImage: (Image | NFTBasedImage)[];
    backgroundImage: (Image | NFTBasedImage)[];
  }
}
```

#### Defined in

[LSP3ProfileMetadata/getProfileMetadata/getProfileMetadata.ts:53](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP3ProfileMetadata/getProfileMetadata/getProfileMetadata.ts#L53)

---

### isProfileMetadata

▸ **isProfileMetadata**(`object`): object is LSP3ProfileMetadataJSON

Returns `true` is the passed object is an LSP3 Profile Metadata, `false` otherwise.

#### Parameters

| Name     | Type  | Description                       |
| :------- | :---- | :-------------------------------- |
| `object` | `any` | The object that is to be checked. |

#### Returns

object is LSP3ProfileMetadataJSON

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md

**`Example`**

```ts
isProfileMetadata({ LSP3Profile: { name: "", description: "", links: [], tags: [] avatar: [], profileImage: [], backgroundImage: [], } }) => true
isProfileMetadata({ description: "", links: [], name: "", tags: [] }) => false
```

#### Defined in

[LSP3ProfileMetadata/isProfileMetadata/isProfileMetadata.ts:16](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP3ProfileMetadata/isProfileMetadata/isProfileMetadata.ts#L16)
