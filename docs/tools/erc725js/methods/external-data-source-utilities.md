---
sidebar_position: 1
---

# External Data Source utilities (`VerifiableURI` and `JSONURI`)

## encodeDataSourceWithHash

```js
const myErc725 = new ERC725();
myErc725.encodeDataSourceWithHash(verification, dataSource);
```

```js
ERC725.encodeDataSourceWithHash(verification, dataSource);
```

Encode a verifiableURI providing the hashing function of the json file (method), the hash of the json file (data) and the url where the json file is stored.

| Name           | Type                          | Description                                                                                                              |
| :------------- | :---------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `verification` | `undefined` or `Verification` | Verification is an object containing the hashing function of the json file (method) and the hash of the json file (data) |
| `dataSource`   | `string`                      | The url where the json file is stored.                                                                                   |

```js
interface Verification {
    method: SUPPORTED_VERIFICATION_METHODS | string;
    data: string;
    source?: string;
}

type SUPPORTED_VERIFICATION_METHODS =
    | SUPPORTED_VERIFICATION_METHOD_STRINGS
    | SUPPORTED_VERIFICATION_METHOD_HASHES;

enum SUPPORTED_VERIFICATION_METHOD_STRINGS {
    KECCAK256_UTF8 = 'keccak256(utf8)',
    KECCAK256_BYTES = 'keccak256(bytes)',
}

enum SUPPORTED_VERIFICATION_METHOD_HASHES {
    HASH_KECCAK256_UTF8 = '0x6f357c6a',
    HASH_KECCAK256_BYTES = '0x8019f9b1',
}
```

#### Returns

| Name            | Type   | Description       |
| :-------------- | :----- | :---------------- |
| `verifiableURI` | string | The verifiableURI |

#### Examples

<details>
    <summary>Encode a <code>VerifiableURI</code> with JSON hash and uploaded URL</summary>

```javascript title="Encode a VerifiableURI with JSON hash and uploaded URL"
const verifiableURI = myErc725.encodeDataSourceWithHash(
  {
    method: 'keccak256(utf8)',
    data: '0x820464ddfac1bec070cc14a8daf04129871d458f2ca94368aae8391311af6361',
  },
  'ifps://QmYr1VJLwerg6pEoscdhVGugo39pa6rycEZLjtRPDfW84UAx',
);
/**
0x00006f357c6a0020820464ddfac1bec070cc14a8daf04129871d458f2ca94368aae8391311af6361696670733a2f2f516d597231564a4c776572673670456f73636468564775676f3339706136727963455a4c6a7452504466573834554178
*/
```

## decodeDataSourceWithHash

## getVerificationMethod

## hashData

## isDataAuthentic
