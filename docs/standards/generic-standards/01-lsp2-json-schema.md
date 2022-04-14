---
sidebar_label: 'LSP2 - ERC725Y JSON Schema'
sidebar_position: 3.3
---

# LSP2 - ERC725Y JSON Schema

:::info Standard Document

[LSP2 - ERC725Y JSON Schema](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md)

:::

:::success Recommendation

Our [JavaScript library **erc725.js**](../../tools/erc725js/01-getting-started.md) makes it easy to read + write data encoded according to the LSP2 Schema without manually going through all the encoding complexity.

:::

## Introduction

The storage of a smart contract consists of multiple **storage slots**. These slots are referenced by a **slot number** (as an **integer**) starting from slot 0. Each piece of data (= contract state) in a smart contract is stored as raw **bytes** under a specific storage slot.

> In summary, smart contracts understand only two languages: bytes and uint256.

Take the following key-value pair, for instance. It is not easy to infer the meaning of these keys by reading them as **bytes**.

```
(key)                                                              => (value)
0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1 => 0x4d7920546f6b656e20322e30
```

Using **slots numbers** and **raw bytes** makes the contract storage very hard to work with. [ERC725Y](../universal-profile/01-lsp0-erc725account.md#erc725y---generic-key-value-store) solves part of the problem through a more flexible storage layout, where data is addressed via `bytes32` keys. However, with such low-level languages, it is difficult for humans to understand the data in the storage.

The main problem around smart contract storage also arises when data is stored differently, depending on individual use cases and application needs. No standard schema exist to define "what the data stored under a specific key represents".

These two issues make it very hard for smart contracts to interact with each other and for external services to interact with contracts' storage.

## What does this standard represent?

### Specification

The LSP2 Standard aims to offer a better abstraction on top of the storage of a smart contract.

This standard introduces a JSON schema that enables to represent the storage of a smart contract through more understandable keys. It makes the data stored in a smart contract more organised.

![Universal Profile + ERC725Y JSON schema (diagram)](../../../static/img/standards/ERC725Y-JSON-Schema-explained.jpeg)

By introducing a schema, contract storage can be represented in the same way across contracts in the network. Everyone has a unified view of the data stored between smart contracts. Data can then be easily parsed, and contracts or interfaces can read or write data from/to the contract storage in the same manner. This makes smart contracts **more interoperable with each other**.

### How does LSP2 work?

LSP2 introduces new ways to encode data, depending on its type. From a single entry to multiple entries (like arrays or maps).

A key in the contract storage can be defined as a JSON object, with properties that describe the key.

```json
{
  "name": "LSP4TokenName",
  "key": "0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1",
  "keyType": "Singleton",
  "valueType": "string",
  "valueContent": "String"
}
```

## Key Types

A Key Type defines, HOW a 32 bytes key is constructed. Meaning how a certain key type is represented in 32 bytes. For example, `Singleton` keys are simple keccak256 hashes of the key name string. Other Key Types are constructed of slices of hashes to group different key name parts or define array element keys, for example.

The LSP2 Standard defines several **key types**:

- `keyType`:
  - [Singleton](#singleton)
  - [Array](#array)
  - [Mapping](#mapping)
  - [Bytes20Mapping](#bytes20mapping)
  - [Bytes20MappingWithGrouping](#bytes20mappingwithgrouping)

### Singleton

A **Singleton** key is useful to store a unique single value under a single key.

Below is an example of a **Singleton** key.

```json
{
  "name": "LSP4TokenName",
  "key": "0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1",
  "keyType": "Singleton",
  "valueType": "string",
  "valueContent": "String"
}
```

![LSP2 Singleton key type](../../../static/img/standards/lsp2-key-type-singleton.jpeg)

### Array

A key of type **Array** can be used to store a list of elements of the same data type. Array elements are accessed by an _index_, that defines their position in the **Array**.

The **Array** elements are arranged systematically, in the order they are added or removed to/from the **Array**. The main basics of the LSP2 **Array** key type are:

- **ordering matters** :exclamation:
- _duplicates are permitted_ :white_check_mark:

A key type **Array** can be useful when there is the need to store a large group of similar data items under the same key. For instance, a list of tokens or NFTs that an address has received.

Below is an example of an **Array** key.

```json
{
  "name": "LSP5ReceivedAssets[]",
  "key": "0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b",
  "keyType": "Array",
  "valueType": "address",
  "valueContent": "Address"
}
```

![LSP2 Array key type (length check)](../../../static/img/standards/lsp2-key-type-array-length-check.jpeg)

---

![LSP2 Array key type (index access)](../../../static/img/standards/lsp2-key-type-array-index-access.jpeg)

### Mapping

A key of type **Mapping** can be useful to store a collection of data items that have a shared significance (for instance, items derived from a common ancestor type).

The **Mapping** key type is similar to the concept of lookup tables. It can be used to search or query specific elements in the collection easily and efficiently. The key principle of the **Mapping** key type are:

- _ordering does not matter_ :white_check_mark:
- **duplicates are not permitted** :x:

Below is an example of a **Mapping** key.

```json
{
  "name": "SupportedStandards:LSP3UniversalProfile",
  "key": "0xeafec4d89fa9619884b6b89135626455000000000000000000000000abe425d6",
  "keyType": "Mapping",
  "valueType": "bytes4",
  "valueContent": "0xabe425d6"
}
```

![LSP2 Mapping key type](../../../static/img/standards/lsp2-key-type-mapping.jpeg)

### Bytes20Mapping

A key of type **Bytes20Mapping** is similar to the **[Mapping](#mapping)** key type, except that it can be useful to map specific data to a 20-bytes long value (eg: an `address`).

Below is an example of **Bytes20Mapping** key.

```json
{
  "name": "LSP8MetadataAddress:0x20BytesTokenIdHash",
  "key": "0x73dcc7c3c4096cdc00000000cafecafecafecafecafecafecafecafecafecafe",
  "keyType": "Bytes20Mapping",
  "valueType": "Mixed",
  "valueContent": "Mixed"
}
```

![LSP2 Bytes20Mapping key type](../../../static/img/standards/lsp2-key-type-bytes20-mapping.jpeg)

### Bytes20MappingWithGrouping

A key of type **Bytes20MappingWithGrouping** is similar to the **[Bytes20Mapping](#bytes20mapping)** key type, except that sub-types can be added to the main mapping key.

For instance, it can be used to differentiate various types from the primary mapping key, like different types of permissions (see [LSP6 - Key Manager](../universal-profile/04-lsp6-key-manager.md)).

Below is an example of a **Bytes20MappingWithGrouping** key.

```json
{
  "name": "AddressPermissions:Permissions:<address>",
  "key": "0x4b80742d0000000082ac0000<address>",
  "keyType": "Bytes20MappingWithGrouping",
  "valueType": "bytes32",
  "valueContent": "BitArray"
}
```

![LSP2 Bytes20MappingWithGrouping key type](../../../static/img/standards/lsp2-key-type-bytes20-mapping-with-grouping.jpeg)
