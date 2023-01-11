---
title: LSP2JSONSchemaUtils
sidebar_position: 1
---

# LSP2JSONSchemaUtils

:::info

[`LSP2Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol)

:::

This library can be used to generate ERC725Y keys according to the JSON schemas defined in the LSP2 standard.

## Functions

### generateSingletonKey

```solidity
function generateSingletonKey(
    string memory keyName
) internal pure returns (bytes32);
```

Generates a data key of `keyType` Singleton.

#### Parameters:

| Name      | Type   | Description                                          |
| :-------- | :----- | :--------------------------------------------------- |
| `keyName` | string | The string to hash to generate a Singleton data key. |

#### Return Values:

| Name     | Type    | Description                      |
| :------- | :------ | :------------------------------- |
| `result` | bytes32 | Data key of `keyType` Singleton. |

### generateArrayKey

```solidity
function generateArrayKey(
    string memory keyName
) internal pure returns (bytes32);
```

Generates a data key of `keyType` Array by hashing `keyName`.

#### Parameters:

| Name      | Type   | Description                                                            |
| :-------- | :----- | :--------------------------------------------------------------------- |
| `keyName` | string | The string that will be used to generate a data key of `keyType` Array |

#### Return Values:

| Name     | Type    | Description                  |
| :------- | :------ | :--------------------------- |
| `result` | bytes32 | Data key of `keyType` Array. |

:::note

#### Requirements:

- The last two characters should be `[]`.

E.g.:

```solidity
string memory keyName = "ArrayName[]";
```

:::

### generateArrayElementKeyAtIndex

```solidity
function generateArrayElementKeyAtIndex(
    bytes32 arrayKey,
    uint256 index
) internal pure returns (bytes32);
```

Generates an Array index data key by concatenating the first 16 bytes of `arrayKey` with an `index`.

#### Parameters:

| Name      | Type    | Description                                                                       |
| :-------- | :------ | :-------------------------------------------------------------------------------- |
| `keyName` | string  | The key from which we're getting the first half of the Array index data key from. |
| `index`   | uint256 | Used to generate the second half of the Array index data key.                     |

#### Return Values:

| Name     | Type    | Description                        |
| :------- | :------ | :--------------------------------- |
| `result` | bytes32 | Data key of `keyType` Array Index. |

### generateMappingKey(string,srting)

```solidity
function generateMappingKey(
    string memory firstWord,
    string memory lastWord
) internal pure returns (bytes32);
```

Generates a data key of `keyType` Mapping by concatenating the hash of the `firstWord` with the hash of the `secondWord`.

#### Parameters:

| Name        | Type   | Description                                                                                                      |
| :---------- | :----- | :--------------------------------------------------------------------------------------------------------------- |
| `firstWord` | string | Used to generate a hash and its first 10 bytes are used for the first part of the data key of `keyType` Mapping. |
| `lastWord`  | string | Used to generate a hash and its first 20 bytes are used for the last part of the data key of `keyType` Mapping.  |

#### Return Values:

| Name     | Type    | Description                    |
| :------- | :------ | :----------------------------- |
| `result` | bytes32 | Data key of `keyType` Mapping. |

### generateMappingKey(string,address)

```solidity
function generateMappingKey(
    string memory firstWord,
    address addr
) internal pure returns (bytes32);
```

Generates a data key of `keyType` Mapping by hashing a string and concatenating it with an address.

#### Parameters:

| Name        | Type    | Description                                                                                                      |
| :---------- | :------ | :--------------------------------------------------------------------------------------------------------------- |
| `firstWord` | string  | Used to generate a hash and its first 10 bytes are used for the first part of the data key of `keyType` Mapping. |
| `addr`      | address | Used for the last part of the data key of `keyType` Mapping.                                                     |

#### Return Values:

| Name     | Type    | Description                    |
| :------- | :------ | :----------------------------- |
| `result` | bytes32 | Data key of `keyType` Mapping. |

### generateMappingKey(bytes10,bytes20)

```solidity
function generateMappingKey(
    bytes10 keyPrefix,
    bytes20 bytes20Value
) internal pure returns (bytes32);
```

Generate a data key of `keyType` Mapping by concatenating `keyPrefix` with `bytes20Value`.

#### Parameters:

| Name           | Type    | Description                                       |
| :------------- | :------ | :------------------------------------------------ |
| `keyPrefix`    | bytes10 | First part of the data key of `keyType` Mapping.  |
| `bytes20Value` | bytes20 | Second part of the data key of `keyType` Mapping. |

#### Return Values:

| Name     | Type    | Description                    |
| :------- | :------ | :----------------------------- |
| `result` | bytes32 | Data key of `keyType` Mapping. |

### generateMappingWithGroupingKey(string,string,address)

```solidity
function generateMappingWithGroupingKey(
    string memory firstWord,
    string memory secondWord,
    address addr
) internal pure returns (bytes32);
```

Generate a data key of `keyType` MappingWithGrouping by concatenating the hash of the `firstWord`, the hash of the `secondWord` and an address.

#### Parameters:

| Name         | Type    | Description                                                                                                                  |
| :----------- | :------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `firstWord`  | string  | Used to generate a hash and its first 6 bytes are used for the first part of the data key of `keyType` MappingWithGrouping.  |
| `secondWord` | string  | Used to generate a hash and its first 4 bytes are used for the second part of the data key of `keyType` MappingWithGrouping. |
| `addr`       | address | Used for the last part of the data key of `keyType` MappingWithGrouping.                                                     |

#### Return Values:

| Name     | Type    | Description                                |
| :------- | :------ | :----------------------------------------- |
| `result` | bytes32 | Data key of `keyType` MappingWithGrouping. |

### generateMappingWithGroupingKey(bytes10,bytes20)

```solidity
function generateMappingWithGroupingKey(
    bytes10 keyPrefix,
    bytes20 bytes20Value
) internal pure returns (bytes32);
```

Generate a data key of `keyType` MappingWithGrouping by concatenating `keyPrefix` with `bytes20Value`.

#### Parameters:

| Name           | Type    | Description                                                               |
| :------------- | :------ | :------------------------------------------------------------------------ |
| `keyPrefix`    | bytes10 | Used for the first part of the data key of `keyType` MappingWithGrouping. |
| `bytes20Value` | bytes20 | Used for the first last of the data key of `keyType` MappingWithGrouping. |

#### Return Values:

| Name     | Type    | Description                                |
| :------- | :------ | :----------------------------------------- |
| `result` | bytes32 | Data key of `keyType` MappingWithGrouping. |

### generateJSONURLValue

```solidity
function generateJSONURLValue(
    string memory hashFunction,
    string memory json,
    string memory url
) internal pure returns (bytes memory key);
```

Generate a JSONURL valueContent.

#### Parameters:

| Name           | Type   | Description                              |
| :------------- | :----- | :--------------------------------------- |
| `hashFunction` | string | The function used to hash the JSON file. |
| `json`         | string | Bytes value of the JSON file.            |
| `url`          | string | The URL where the JSON file is hosted.   |

#### Return Values:

| Name     | Type    | Description     |
| :------- | :------ | :-------------- |
| `result` | bytes32 | JSON URL Value. |

### generateASSETURLValue

```solidity
function generateASSETURLValue(
    string memory hashFunction,
    string memory assetBytes,
    string memory url
) internal pure returns (bytes memory key);
```

Generate a ASSETURL valueContent.

#### Parameters:

| Name           | Type   | Description                              |
| :------------- | :----- | :--------------------------------------- |
| `hashFunction` | string | The function used to hash the JSON file. |
| `assetBytes`   | string | Bytes value of the JSON file.            |
| `url`          | string | The URL where the JSON file is hosted.   |

#### Return Values:

| Name     | Type    | Description      |
| :------- | :------ | :--------------- |
| `result` | bytes32 | ASSET URL Value. |

### isEncodedArray

```solidity
function isEncodedArray(
    bytes memory data
) internal pure returns (bool);
```

Verifing if `data` is an encoded array

#### Parameters:

| Name   | Type  | Description                       |
| :----- | :---- | :-------------------------------- |
| `data` | bytes | The value that is to be verified. |

### isEncodedArrayOfAddresses

```solidity
function isEncodedArrayOfAddresses(
    bytes memory data
) internal pure returns (bool);
```

Verifing if `data` is an encoded array of addresses (address[])

#### Parameters:

| Name   | Type  | Description                       |
| :----- | :---- | :-------------------------------- |
| `data` | bytes | The value that is to be verified. |

### isBytes4EncodedArray

```solidity
function isBytes4EncodedArray(
    bytes memory data
) internal pure returns (bool);
```

Verify that `data` is an array of bytes4 (bytes4[]) encoded according to the Solidity ABI specs.

#### Parameters:

| Name   | Type  | Description                       |
| :----- | :---- | :-------------------------------- |
| `data` | bytes | The value that is to be verified. |

### isCompactBytesArray

```solidity
function isCompactBytesArray(
    bytes memory compactBytesArray
) internal pure returns (bool);
```

Verify the validity of the `compactBytesArray` according to LSP2.

#### Parameters:

| Name                | Type  | Description                       |
| :------------------ | :---- | :-------------------------------- |
| `compactBytesArray` | bytes | The value that is to be verified. |

### uncheckedIncrement

```solidity
uncheckedIncrement(
    uint256 i
) internal pure returns (uint256);
```

Will return unchecked incremented uint256.
Can be used to save gas when iterating over loops.

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
