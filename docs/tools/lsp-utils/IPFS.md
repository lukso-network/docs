---
sidebar_position: 9
---

### validateIpfsUrl

▸ **validateIpfsUrl**(`url`, `ipfsGateway?`): `string`

Returns a valid URL. If it is an IPFS URL (E.g. `ipfs://{hash}`), the IPFS Gateway will be used to generate a valid link. Otherwise the link is returned.

#### Parameters

| Name           | Type     | Description                                |
| :------------- | :------- | :----------------------------------------- |
| `url`          | `string` | The URL that is to be validated.           |
| `ipfsGateway?` | `string` | The IPFS Gateway to be used for IPFS URLs. |

#### Returns

`string`

**`Since`**

v0.0.1

**`Example`**

```ts
validateIpfsUrl('ipfs://{hash}') => 'https://2eff.lukso.dev/ipfs/{hash}'
validateIpfsUrl('https://google.com/something') => 'https://google.com/something'
validateIpfsUrl('') => ''
```

#### Defined in

[IPFS/validateIpfsUrl/validateIpfsUrl.ts:17](https://github.com/lukso-network/lsp-utils/blob/122accb/src/IPFS/validateIpfsUrl/validateIpfsUrl.ts#L17)
