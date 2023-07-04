---
title: LSP4DigitalAssetMetadata
sidebar_position: 7
---

# LSP4DigitalAssetMetadata

:::info Solidity contract

[`LSP4DigitalAssetMetadata.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol)

:::

:::note
_The LSP4DigitalAssetMetadata contract contains the methods from the [ERC725Y Standard](https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725y):_

```solidity
function setData(bytes32 key, bytes memory value) public;

function getData(bytes32 key) public view returns (bytes memory);

function setData(bytes32[] memory keys, bytes[] memory values) public;

function getData(bytes32[] memory keys) public view returns (bytes[] memory);

```

:::

## Functions

### constructor

```solidity
constructor(
    string memory name_,
    string memory symbol_,
    address newOwner_
) ERC725Y(newOwner_)
```

Sets the **initial owner** of the contract and the following data keys on the **[ERC725Y Data Key-Value Store](./lsp0-erc725-account#setdata)**:

- `name_`: token's name.
- `symbol_`: token's symbol.
- [**SupportedStandards:LSP4DigitalAsset**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#supportedstandardslsp4digitalasset) data key.

#### Parameters:

| Name        | Type      | Description                |
| :---------- | :-------- | :------------------------- |
| `name_`     | `string`  | The name of the token.     |
| `symbol_`   | `string`  | The symbol of the token.   |
| `newOwner_` | `address` | The owner of the contract. |

## Events

### DataChanged

```solidity
event DataChanged(bytes32 dataKey, bytes dataValue)
```

_**MUST** be fired when the **[`setData(...)`](#setdata)** function is successfully executed._

#### Values:

| Name        | Type      | Description                           |
| :---------- | :-------- | :------------------------------------ |
| `dataKey`   | `bytes32` | The data key which data value is set. |
| `dataValue` | `bytes`   | The data value to set.                |

:::info
The `DataChanged` event will emit only the first 256 bytes of `dataValue` (for large values set in the ERC725Y storage).
:::

## References

- [LUKSO Standards Proposals: LSP4 - DigitalAsset-Metadata (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md)
- [LSP4 - DigitalAsset-Metadata: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/blob/develop/contracts/LSP4DigitalAssetMetadata)
