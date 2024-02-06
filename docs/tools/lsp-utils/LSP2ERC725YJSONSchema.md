---
sidebar_position: 2
---

### decodeAssetUrl

▸ **decodeAssetUrl**(`assetUrlValue`): `Object`

Decode a JSONURL value content.

#### Parameters

| Name            | Type        | Description                                            |
| :-------------- | :---------- | :----------------------------------------------------- |
| `assetUrlValue` | `BytesLike` | The encoded value as `{ "valueContent": "ASSETURL" }`. |

#### Returns

`Object`

```json
{
  // The hash digest of the function used to hash the JSON file.
  "hashFunction": "string"
  // the hashed bytes value of the JSON file.
  "json": "string"
  // The URL where the JSON file is hosted.
  "url": "string"
}
```

| Name           | Type     |
| :------------- | :------- |
| `hash`         | `string` |
| `hashFunction` | `string` |
| `url`          | `string` |

**`Since`**

v0.0.1

**`Throws`**

When `assetUrlValue` his composed of less than 36 bytes.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
decodeAssetUrl("0x6f357c6a2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c053568747470733a2f2f676f6f676c652e636f6d2f") =>
{
  hashFunction: "0x6f357c6a",
  hash: "0x2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c0535",
  url: "https://google.com/"
}
```

#### Defined in

LSP2ERC725YJSONSchema/decodeAssetUrl/decodeAssetUrl.ts:35

---

### decodeJsonUrl

▸ **decodeJsonUrl**(`jsonUrlValue`): `Object`

Decode a JSONURL value content.

#### Parameters

| Name           | Type        | Description                                           |
| :------------- | :---------- | :---------------------------------------------------- |
| `jsonUrlValue` | `BytesLike` | The encoded value as `{ "valueContent": "JSONURL" }`. |

#### Returns

`Object`

```json
{
  // The hash digest of the function used to hash the JSON file.
  "hashFunction": "string"
  // the hashed bytes value of the JSON file.
  "json": "string"
  // The URL where the JSON file is hosted.
  "url": "string"
}
```

| Name           | Type     |
| :------------- | :------- |
| `hash`         | `string` |
| `hashFunction` | `string` |
| `url`          | `string` |

**`Since`**

v0.0.1

**`Throws`**

When `jsonUrlValue` his composed of less than 36 bytes.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
decodeJsonUrl("0x6f357c6a4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a4184968747470733a2f2f676f6f676c652e636f6d2f") =>
{
  hashFunction: "0x6f357c6a",
  hash: "0x4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a41849",
  url: "https://google.com/"
}
```

#### Defined in

LSP2ERC725YJSONSchema/decodeJsonUrl/decodeJsonUrl.ts:35

---

### encodeAssetUrl

▸ **encodeAssetUrl**(`hashFunction`, `assetBytes`, `url`): `string`

Generate a ASSETURL value content.

#### Parameters

| Name           | Type     | Description                              |
| :------------- | :------- | :--------------------------------------- |
| `hashFunction` | `string` | The function used to hash the JSON file. |
| `assetBytes`   | `string` | Bytes value of the JSON file.            |
| `url`          | `string` | The URL where the JSON file is hosted.   |

#### Returns

`string`

The encoded value as an `ASSETURL`.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
encodeAssetUrl(
  "keccak256(utf8)",
  "{\"name\":\"USDStablecoin\",\"description\":\"Some random description about the token USD Stablecoin\"}",
  "https://google.com/"
) => "0x6f357c6a2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c053568747470733a2f2f676f6f676c652e636f6d2f"
```

#### Defined in

LSP2ERC725YJSONSchema/encodeAssetUrl/encodeAssetUrl.ts:25

---

### encodeJsonUrl

▸ **encodeJsonUrl**(`hashFunction`, `json`, `url`): `string`

Encode a JSONURL value content.

#### Parameters

| Name           | Type     | Description                              |
| :------------- | :------- | :--------------------------------------- |
| `hashFunction` | `string` | The function used to hash the JSON file. |
| `json`         | `string` | Bytes value of the JSON file.            |
| `url`          | `string` | The URL where the JSON file is hosted.   |

#### Returns

`string`

The encoded value as an `JSONURL`.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
encodeJsonUrl(
  "keccak256(utf8)",
  "{\"name\":\"Tom\",\"description\":\"Some random description about Tom\"}",
  "https://google.com/"
) => "0x6f357c6a4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a4184968747470733a2f2f676f6f676c652e636f6d2f"
```

#### Defined in

LSP2ERC725YJSONSchema/encodeJsonUrl/encodeJsonUrl.ts:25

---

### generateArrayElementKeyAtIndex

▸ **generateArrayElementKeyAtIndex**(`arrayKey`, `index`): `string`

Generates a data key of `{ "keyType": "Array" }` at a specific `index`. `arrayKey` can have the following values:

1. An array data key, 32 bytes hex value.
2. An array data key name of type `dataKeyName[]` that will be used to generate an array data key using `generateArrayKey(arrayKey)`.

#### Parameters

| Name       | Type     | Description                                                                         |
| :--------- | :------- | :---------------------------------------------------------------------------------- |
| `arrayKey` | `string` | The Array data key from which to generate the Array data key at a specific `index`. |
| `index`    | `number` | The index number in the `arrayKey`.                                                 |

#### Returns

`string`

The generated `bytes32` data key of key type Array at a specific `index`.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
generateSingletonKey(arrayDataKeyName, index) => `<bytes16(keccak256(arrayDataKeyName))>:<bytes16(index)>`
generateSingletonKey(arrayDataKey, index) => `<bytes16(arrayDataKey)>:<bytes16(index)>`
```

#### Defined in

LSP2ERC725YJSONSchema/generateArrayElementKeyAtIndex/generateArrayElementKeyAtIndex.ts:24

---

### generateArrayKey

▸ **generateArrayKey**(`arrayKeyName`): `string`

Generates a data key of `{ "keyType": "Array" }` by hashing `arrayKeyName`.

#### Parameters

| Name           | Type     | Description                                                            |
| :------------- | :------- | :--------------------------------------------------------------------- |
| `arrayKeyName` | `string` | The string that will be used to generate a data key of key type Array. |

#### Returns

`string`

The generated `bytes32` data key of key type Array.

**`Since`**

v0.0.1

**`Throws`**

`keyName` has less than 2 characters.

**`Throws`**

`keyName` does not include square brackets `"[]"` at the end of the string.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
generateArrayKey("RandomArrayDataKey[]") => keccak256("RandomArrayDataKey[]") = "0x6e9974ec39571e80dcc2ab1fac99097b03bb4617b071cd519a23d38f88f28ffb"
```

#### Defined in

LSP2ERC725YJSONSchema/generateArrayKey/generateArrayKey.ts:22

---

### generateMappingKey

▸ **generateMappingKey**(`firstPart`, `lastPart`): `string`

Generates a data key of `{ "keyType": "Mapping" }` that map `firstPart` to `lastPart`.

`firstPart` can have the following values:

1. A 10 bytes hex value.
2. A hex value that will be hashed (first 10 bytes will be used).
3. A UTF8 string that will be hashed (first 10 bytes will be used).

`lastPart` can have the following values:

1. An address.
1. A 20 bytes hex value.
1. A hex value that will be hashed (first 20 bytes will be used).
1. A UTF8 string that will be hashed (first 20 bytes will be used).

#### Parameters

| Name        | Type        | Description                                          |
| :---------- | :---------- | :--------------------------------------------------- |
| `firstPart` | `BytesLike` | The word to retrieve the first 10 bytes of its hash. |
| `lastPart`  | `BytesLike` | The word to retrieve the first 10 bytes of its hash. |

#### Returns

`string`

The generated `bytes32` data key of key type Mapping that map `firstPart` to a specific `lastPart`.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
generateMappingKey(firstWord, lastWord) =>`<bytes10(keccak256(firstWord))>:<0000>:<bytes20(keccak256(lastWord))>`

generateMappingKey(firstWord, bytes20value) =>`<bytes10(keccak256(firstWord))>:<0000>:<bytes20value>`

generateMappingKey(bytes10Value, lastWord) =>`<bytes10Value>:<0000>:<bytes20(keccak256(lastWord))>`

generateMappingKey(bytes10Value, bytes20value) =>`<bytes10Value>:<0000>:<bytes20value>`
```

#### Defined in

LSP2ERC725YJSONSchema/generateMappingKey/generateMappingKey.ts:37

---

### generateMappingWithGroupingKey

▸ **generateMappingWithGroupingKey**(`firstPart`, `middlePart`, `lastPart`): `string`

Generates a data key of `{ "keyType": "MappingWithGrouping" }` that map `firstPart` to `middlePart` and to `lastPart`.

`firstPart` can have the following values:

1. A 6 bytes hex value.
2. A hex value that will be hashed (first 6 bytes will be used).
3. A UTF8 string that will be hashed (first 6 bytes will be used).

`middlePart` can have the following values:

1. A 4 bytes hex value.
2. A hex value that will be hashed (first 4 bytes will be used).
3. A UTF8 string that will be hashed (first 4 bytes will be used).

`lastPart` can have the following values:

1. An address.
1. A 20 bytes hex value.
1. A hex value that will be hashed (first 20 bytes will be used).
1. A UTF8 string that will be hashed (first 20 bytes will be used).

#### Parameters

| Name         | Type        | Description                                          |
| :----------- | :---------- | :--------------------------------------------------- |
| `firstPart`  | `BytesLike` | The word to retrieve the first 6 bytes of its hash.  |
| `middlePart` | `BytesLike` | The word to retrieve the first 4 bytes of its hash.  |
| `lastPart`   | `BytesLike` | The word to retrieve the first 20 bytes of its hash. |

#### Returns

`string`

The generated `bytes32` data key of key type MappingWithGrouping that map a `firstWord` to a `secondWord` to a specific address `addr`.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
generateMappingWithGroupingKey(firstWord, middleWord, lastWord) => `<bytes6(keccak256(firstWord))>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20(keccak256(lastWord))>`

generateMappingWithGroupingKey(firstWord, middleWord, bytes20Value) => `<bytes6(keccak256(firstWord))>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20Value>`

generateMappingWithGroupingKey(firstWord, bytes4Value, lastWord) => `<bytes6(keccak256(firstWord))>:<bytes4Value>:<0000>:<bytes20(keccak256(lastWord))>`

generateMappingWithGroupingKey(firstWord, bytes4Value, bytes20Value) => `<bytes6(keccak256(firstWord))>:<bytes4Value>:<0000>:<bytes20Value>`

generateMappingWithGroupingKey(bytes6Value, middleWord, lastWord) => `<bytes6Value>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20(keccak256(lastWord))>`

generateMappingWithGroupingKey(bytes6Value, middleWord, bytes20Value) => `<bytes6Value>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20Value>`

generateMappingWithGroupingKey(bytes6Value, bytes4Value, lastWord) => `<bytes6Value>:<bytes4Value>:<0000>:<bytes20(keccak256(lastWord))>`

generateMappingWithGroupingKey(bytes6Value, bytes4Value, bytes20Value) => `<bytes6Value>:<bytes4Value>:<0000>:<bytes20Value>`
```

#### Defined in

LSP2ERC725YJSONSchema/generateMappingWithGroupingKey/generateMappingWithGroupingKey.ts:51

---

### generateSingletonKey

▸ **generateSingletonKey**(`keyName`): `string`

Generates a data key of `{ "keyType": "Singleton" }` by hashing the string `keyName`.

#### Parameters

| Name      | Type     | Description                                          |
| :-------- | :------- | :--------------------------------------------------- |
| `keyName` | `string` | The string to hash to generate a Singleton data key. |

#### Returns

`string`

The generated `bytes32` data key of key type Singleton.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
generateSingletonKey("RandomDataKey") => keccak256("RandomKeyName") = "0xb0c92ac98a2a422f33a3e130e3fa6e922195f0a0a99199963814012351f906cb"
```

#### Defined in

LSP2ERC725YJSONSchema/generateSingletonKey/generateSingletonKey.ts:19

---

### isCompactBytesArray

▸ **isCompactBytesArray**(`compactBytesArray`): `boolean`

Verify if `data` is a valid array of value encoded as a `CompactBytesArray` according to the LSP2 `CompactBytesArray` valueType specification.

#### Parameters

| Name                | Type        | Description                |
| :------------------ | :---------- | :------------------------- |
| `compactBytesArray` | `BytesLike` | The bytes value to verify. |

#### Returns

`boolean`

`true` if the `data` is correctly encoded CompactBytesArray, `false` otherwise.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
isCompactBytesArray("0x0002cafe000abeefdeadbeef0000cafe") => true
isCompactBytesArray("0x0002cafecafe000abeefdeadbeef0000cafe") => false
isCompactBytesArray("0x0002") => false
```

#### Defined in

LSP2ERC725YJSONSchema/isCompactBytesArray/isCompactBytesArray.ts:21

---

### isValidArrayLengthValue

▸ **isValidArrayLengthValue**(`arrayLength`): `boolean`

Validates if the bytes `arrayLength` are exactly 16 bytes long, and are of the exact size of an LSP2 Array length value

#### Parameters

| Name          | Type        | Description                           |
| :------------ | :---------- | :------------------------------------ |
| `arrayLength` | `BytesLike` | Plain bytes that should be validated. |

#### Returns

`boolean`

`true` if the value is 16 bytes long, `false` otherwise.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
isValidArrayLengthValue("0x00000000000000000000000000000001") => true
isValidArrayLengthValue("0x00000000000000000000000000000a3b") => true
isValidArrayLengthValue("0x000000000000000000000000004a") => false
isValidArrayLengthValue("0x0000000000000000000000000000000000f60a") => false
```

#### Defined in

LSP2ERC725YJSONSchema/isValidArrayLengthValue/isValidArrayLengthValue.ts:22

---

### removeElementFromArrayAndMap

▸ **removeElementFromArrayAndMap**(`erc725YContract`, `arrayKey`, `newArrayLength`, `removedElementIndexKey`, `removedElementIndex`, `removedElementMapKey`): `Promise`\<\{ `dataKeys`: `BytesLike`[] ; `dataValues`: `BytesLike`[] }\>

Generates Data Key/Value pairs for removing an element from an LSP2 Array and a mapping Data Key.

#### Parameters

| Name                     | Type               | Description                                                   |
| :----------------------- | :----------------- | :------------------------------------------------------------ |
| `erc725YContract`        | `UniversalProfile` | The ERC725Y contract.                                         |
| `arrayKey`               | `BytesLike`        | The Data Key of Key Type Array.                               |
| `newArrayLength`         | `number`           | The new Array Length for the `arrayKey`.                      |
| `removedElementIndexKey` | `BytesLike`        | The Data Key of Key Type Array Index for the removed element. |
| `removedElementIndex`    | `number`           | the index of the removed element.                             |
| `removedElementMapKey`   | `BytesLike`        | The Data Key of a mapping to be removed.                      |

#### Returns

`Promise`\<\{ `dataKeys`: `BytesLike`[] ; `dataValues`: `BytesLike`[] }\>

A set of data keys & data values that can be used to update an array and map in ERC725Y storage.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
removeLastElementFromArrayAndMap(...) => { dataKeys: BytesLike[], dataValues: BytesLike[] }
```

#### Defined in

LSP2ERC725YJSONSchema/removeElementFromArrayAndMap/removeElementFromArrayAndMap.ts:32

---

### removeLastElementFromArrayAndMap

▸ **removeLastElementFromArrayAndMap**(`arrayKey`, `newArrayLength`, `removedElementIndexKey`, `removedElementMapKey`): `Object`

Generates Data Key/Value pairs for removing the last element from an LSP2 Array and a mapping Data Key.

#### Parameters

| Name                     | Type        | Description                                                   |
| :----------------------- | :---------- | :------------------------------------------------------------ |
| `arrayKey`               | `BytesLike` | The Data Key of Key Type Array.                               |
| `newArrayLength`         | `number`    | The new Array Length for the `arrayKey`.                      |
| `removedElementIndexKey` | `BytesLike` | The Data Key of Key Type Array Index for the removed element. |
| `removedElementMapKey`   | `BytesLike` | The Data Key of a mapping to be removed.                      |

#### Returns

`Object`

A set of data keys & data values that can be used to update an array and map in ERC725Y storage.

| Name         | Type          |
| :----------- | :------------ |
| `dataKeys`   | `BytesLike`[] |
| `dataValues` | `BytesLike`[] |

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
removeLastElementFromArrayAndMap(...) => { dataKeys: BytesLike[], dataValues: BytesLike[] }
```

#### Defined in

LSP2ERC725YJSONSchema/removeLastElementFromArrayAndMap/removeLastElementFromArrayAndMap.ts:22
