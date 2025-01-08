---
sidebar_position: 6
---

### createValidityTimestamp

▸ **createValidityTimestamp**(`startingTimestamp`, `endingTimestamp`): `string`

Create a `validityTimestamp` that can be used in `LSP6.executeRelayCall(...)`

#### Parameters

| Name                | Type           | Description                                                |
| :------------------ | :------------- | :--------------------------------------------------------- |
| `startingTimestamp` | `BigNumberish` | The timestamp after which a relay call can be executed.    |
| `endingTimestamp`   | `BigNumberish` | The timestamp after which a relay call cannot be executed. |

#### Returns

`string`

A hex value of 32 bytes that contains both starting & ending timestamps.

**`Since`**

v0.0.1

**`Throws`**

When the bytes value of either `startingTimestamp` or `endingTimestamp` exceeds 16 bytes.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```ts
createValidityTimestamp(5, 10) => `0x000000000000000000000000000000050000000000000000000000000000000a`
```

#### Defined in

[LSP6KeyManager/createValidityTimestamp/createValidityTimestamp.ts:21](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP6KeyManager/createValidityTimestamp/createValidityTimestamp.ts#L21)

---

### decodeAllowedCalls

▸ **decodeAllowedCalls**(`allowedCalls`): `Object`

Decode AllowedCalls encoded as `{ "valueType": "bytes[CompactBytesArray]" }`.

#### Parameters

| Name           | Type        | Description                                                               |
| :------------- | :---------- | :------------------------------------------------------------------------ |
| `allowedCalls` | `BytesLike` | A list of allowed calls as `{ "valueType": "bytes[CompactBytesArray]" }`. |

#### Returns

`Object`

The allowed interactions, addresses, functions and standards that were encoded.

| Name                  | Type          |
| :-------------------- | :------------ |
| `allowedAddresses`    | `BytesLike`[] |
| `allowedFunctions`    | `BytesLike`[] |
| `allowedInteractions` | `BytesLike`[] |
| `allowedStandards`    | `BytesLike`[] |

**`Since`**

v0.0.1

**`Throws`**

- When the value of `allowedCalls` is not hex.
- When the bytes length of any allowed call is different from 32.
- When the length of an element reaches past the length of `allowedCalls`

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```ts
decodeAllowedCalls("0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c002000000003cafecafecafecafecafecafecafecafecafecafe24871b3d44c028fe") =>
{
  allowedInteractions: ["0x00000002", "0x00000003"],
  allowedAddresses: ["0xcafecafecafecafecafecafecafecafecafecafe", "0xcafecafecafecafecafecafecafecafecafecafe"],
  allowedStandards: ["0x24871b3d", "0x24871b3d"],
  allowedFunctions: ["0x7f23690c", "0x44c028fe"],
}

decodeAllowedCalls("0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c") =>
{
  allowedInteractions: ["0x00000002"],
  allowedAddresses: ["0xcafecafecafecafecafecafecafecafecafecafe"],
  allowedStandards: ["0x24871b3d"],
  allowedFunctions: ["0x7f23690c"],
}
```

#### Defined in

[LSP6KeyManager/decodeAllowedCalls/decodeAllowedCalls.ts:37](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP6KeyManager/decodeAllowedCalls/decodeAllowedCalls.ts#L37)

---

### decodeAllowedERC725YDataKeys

▸ **decodeAllowedERC725YDataKeys**(`allowedERC725YDataKeys`): `BytesLike`[]

Decode AllowedERC725YDataKeys encoded as `{ "valueType": "bytes[CompactBytesArray]" }`.

#### Parameters

| Name                     | Type        | Description                                                               |
| :----------------------- | :---------- | :------------------------------------------------------------------------ |
| `allowedERC725YDataKeys` | `BytesLike` | A list of allowed calls as `{ "valueType": "bytes[CompactBytesArray]" }`. |

#### Returns

`BytesLike`[]

The allowed ERC725Y data keys that were encoded.

**`Since`**

v0.0.1

**`Throws`**

- When the value of `allowedERC725YDataKeys` is not hex.
- When the bytes length of any allowed ERC725Y data key is 0 or bigger than 32.
- When the length of an element reaches past the length of `allowedERC725YDataKeys`

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```ts
decodeAllowedERC725YDataKeys("0x0002cafe000abeefdeadbeef0000cafe") =>
[
  "0xcafe",
  "0xbeefdeadbeef0000cafe"
]
```

#### Defined in

[LSP6KeyManager/decodeAllowedERC725YDataKeys/decodeAllowedERC725YDataKeys.ts:27](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP6KeyManager/decodeAllowedERC725YDataKeys/decodeAllowedERC725YDataKeys.ts#L27)

---

### decodePermissions

▸ **decodePermissions**(`permissions`, `decodedPermissionsType?`): `Set`\<`BytesLike` \| `bigint` \| `LSP6PermissionName`\> \| `boolean`[]

Decode a hex value, containing a `BitArray` of permissions. The `AddressPermissions:Permissions:<address>` can be decoded using this function.

#### Parameters

| Name                      | Type                                                                 | Description                                                                                                                                                                 |
| :------------------------ | :------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `permissions`             | `BytesLike`                                                          | A hex value, containing a BitArray of permissions.                                                                                                                          |
| `decodedPermissionsType?` | `"bigint"` \| `"boolean"` \| `"BytesLike"` \| `"LSP6PermissionName"` | Optional param, defaults to `LSP6PermissionName`. Can be used to specify the type of the return array. Options: - `BytesLike` - `bigint` - `boolean` - `LSP6PermissionName` |

#### Returns

`Set`\<`BytesLike` \| `bigint` \| `LSP6PermissionName`\> \| `boolean`[]

An array of decoded permissions.

**`Since`**

v0.0.2

**`Throws`**

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```ts
decodePermissions([
  `0x0000000000000000000000000000000000000000000000000000000000040803`
]) => new Set([ CHANGEOWNER, ADDCONTROLLER, CALL, SETDATA ])
decodePermissions([
  `0x0000000000000000000000000000000000000000000000000000000000040803`,
  'LSP6PermissionName'
]) => new Set([ CHANGEOWNER, ADDCONTROLLER, CALL, SETDATA ])
decodePermissions([
  `0x0000000000000000000000000000000000000000000000000000000000040803`,
  'BytesLike'
]) =>
new Set([
  '0x0000000000000000000000000000000000000000000000000000000000000001',
  '0x0000000000000000000000000000000000000000000000000000000000000002',
  '0x0000000000000000000000000000000000000000000000000000000000000800',
  '0x0000000000000000000000000000000000000000000000000000000000040000',
])
decodePermissions([
  `0x0000000000000000000000000000000000000000000000000000000000040803`,
  'bigint'
]) => new Set([ 1n, 2n, 2048n, 262144n ])
decodePermissions([
  `0x0000000000000000000000000000000000000000000000000000000000000003`,
  'boolean'
]) => [ true, true, false, false, false, false, false, false ]
```

#### Defined in

[LSP6KeyManager/decodePermissions/decodePermissions.ts:53](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP6KeyManager/decodePermissions/decodePermissions.ts#L53)

---

### encodeAllowedCalls

▸ **encodeAllowedCalls**(`allowedInteractions`, `allowedAddresses`, `allowedStandards`, `allowedFunctions`): `string`

Encode a list of data keys as `{ "valueType": "(bytes4,address,bytes4,bytes4)[CompactBytesArray]" }`. The result can be used for `AddressPermissions:AllowedCalls:<address>`

#### Parameters

| Name                  | Type          | Description                     |
| :-------------------- | :------------ | :------------------------------ |
| `allowedInteractions` | `BytesLike`[] | A list of allowed interactions. |
| `allowedAddresses`    | `BytesLike`[] | A list of allowed addresses.    |
| `allowedStandards`    | `BytesLike`[] | A list of allowed standards.    |
| `allowedFunctions`    | `BytesLike`[] | A list of allowed functions.    |

#### Returns

`string`

The compacted array of allowed calls as `{ "valueType": "(bytes4,address,bytes4,bytes4)[CompactBytesArray]" }`.

**`Since`**

v0.0.1

**`Throws`**

- When the arrays passed as parameters don't have the same length.
- When one of `allowedInteractions[index]` has a bytes length different from 4.
- When one of `allowedAddresses[index]` has a bytes length different from 20.
- When one of `allowedStandards[index]` has a bytes length different from 4.
- When one of `allowedFunctions[index]` has a bytes length different from 4.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```ts
encodeAllowedCalls(
  ["0x00000002", "0x00000003"],
  ["0xcafecafecafecafecafecafecafecafecafecafe", "0xcafecafecafecafecafecafecafecafecafecafe"]
  ["0x24871b3d", "0x24871b3d"],
  ["0x7f23690c", "0x44c028fe"],
) => "0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c002000000003cafecafecafecafecafecafecafecafecafecafe24871b3d44c028fe"
encodeAllowedCalls(
  ["0x00000002"],
  ["0xcafecafecafecafecafecafecafecafecafecafe"]
  ["0x24871b3d"],
  ["0x7f23690c"],
) => "0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c"
```

#### Defined in

[LSP6KeyManager/encodeAllowedCalls/encodeAllowedCalls.ts:39](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP6KeyManager/encodeAllowedCalls/encodeAllowedCalls.ts#L39)

---

### encodeAllowedERC725YDataKeys

▸ **encodeAllowedERC725YDataKeys**(`dataKeys`): `string`

Encode a list of data keys as `{ "valueType": "bytes[CompactBytesArray]" }`. The result can be user for `AddressPermissions:AllowedERC725YDataKeys:<address>`

#### Parameters

| Name       | Type          | Description          |
| :--------- | :------------ | :------------------- |
| `dataKeys` | `BytesLike`[] | A list of data keys. |

#### Returns

`string`

The compacted array of data keys as `{ "valueType": "bytes[CompactBytesArray]" }`.

**`Since`**

v0.0.1

**`Throws`**

- When one of `dataKeys[index]` is not hex.
- When one of `dataKeys[index]` has a length of 0 bytes or bigger than 32 bytes.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```ts
encodeAllowedERC725YDataKeys([
  "0xcafe",
  "0xbeefdeadbeef0000cafe"
]) => "0x0002cafe000abeefdeadbeef0000cafe"
```

#### Defined in

[LSP6KeyManager/encodeAllowedERC725YDataKeys/encodeAllowedERC725YDataKeys.ts:25](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP6KeyManager/encodeAllowedERC725YDataKeys/encodeAllowedERC725YDataKeys.ts#L25)

---

### encodePermissions

▸ **encodePermissions**(`permissions`): `string`

Generate a `BitArray` of permissions. The result can be user for `AddressPermissions:Permissions:<address>`.

#### Parameters

| Name          | Type                                              | Description                                                                                                                   |
| :------------ | :------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| `permissions` | (`string` \| `number` \| `bigint` \| `boolean`)[] | An array of LSP6 permissions, LSP6 permission names, numbers, booleans or any combination of the previously enumerated types. |

#### Returns

`string`

A `BitArray` that can be use as LSP6 controller permissions.

**`Since`**

v0.0.2

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```ts
encodePermissions([
  "0x0000000000000000000000000000000000000000000000000000000000000001", //CHANGEOWNER
  "0x0000000000000000000000000000000000000000000000000000000000000002", //ADDCONTROLLER
  "0x0000000000000000000000000000000000000000000000000000000000000800", //CALL
  "0x0000000000000000000000000000000000000000000000000000000000040000", //SETDATA
]) => `0x0000000000000000000000000000000000000000000000000000000000040803`

encodePermissions([
  true,  // `0x0000000000000000000000000000000000000000000000000000000000000001` - CHANGEOWNER
  true,  // `0x0000000000000000000000000000000000000000000000000000000000000002` - ADDCONTROLLER
  false, // `0x0000000000000000000000000000000000000000000000000000000000000000` - EDITPERMISSIONS
  true,  // `0x0000000000000000000000000000000000000000000000000000000000000008` - ADDEXTENSIONS
]) => `0x000000000000000000000000000000000000000000000000000000000000000b`

encodePermissions([
  1, // `0x0000000000000000000000000000000000000000000000000000000000000001` - CHANGEOWNER
  2, // `0x0000000000000000000000000000000000000000000000000000000000000002` - ADDCONTROLLER
  4, // `0x0000000000000000000000000000000000000000000000000000000000000004` - EDITPERMISSIONS
]) => `0x0000000000000000000000000000000000000000000000000000000000000007`
```

#### Defined in

[LSP6KeyManager/encodePermissions/encodePermissions.ts:37](https://github.com/lukso-network/lsp-utils/blob/31b2f8b/src/LSP6KeyManager/encodePermissions/encodePermissions.ts#L37)
