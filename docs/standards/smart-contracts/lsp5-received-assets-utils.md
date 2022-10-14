---
title: LSP5ReceivedAssetsUtils
sidebar_position: 13
---

# LSP5ReceivedAssetsUtils

:::info

[`LSP5Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP5ReceivedAsstes/LSP5Utils.sol)

:::

This library should be used to generate ERC725Y data keys and values for transferring assets (LSP7 & LSP8).

## Functions

### generateReceivedAssetKeys

```solidity
function generateReceivedAssetKeys(
    address receiver,
    address asset,
    bytes32 assetMapKey,
    bytes4 interfaceID
) internal view returns (bytes32[] memory keys, bytes[] memory values);
```

Generating the data keys/values to be set on the receiver address after receiving assets.

#### Parameters:

| Name          | Type    | Description                                                                                                 |
| :------------ | :------ | :---------------------------------------------------------------------------------------------------------- |
| `receiver`    | address | The address receiving the asset and where the Keys should be added.                                         |
| `asset`       | address | The address of the asset being received.                                                                    |
| `assetMapKey` | bytes32 | The map key of the asset being received containing the interfaceId of the asset and the index in the array. |
| `interfaceID` | bytes4  | The interfaceID of the asset being received.                                                                |

#### Return Values:

| Name     | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `keys`   | bytes32[] | Array of data keys.   |
| `values` | bytes[]   | Array of data values. |

### generateSentAssetKeys

```solidity
function generateSentAssetKeys(
    address sender,
    bytes32 assetMapKey,
    bytes memory assetInterfaceIdAndIndex
) internal view returns (bytes32[] memory keys, bytes[] memory values);
```

Generating the data keys/values to be set on the sender address after sending assets.

#### Parameters:

| Name                     | Type    | Description                                                                                                 |
| :----------------------- | :------ | :---------------------------------------------------------------------------------------------------------- |
| sender                   | address | The address sending the asset and where the Keys should be updated.                                         |
| assetMapKey              | bytes32 | The map key of the asset being received containing the interfaceId of the asset and the index in the array. |
| assetInterfaceIdAndIndex | bytes   | The value of the map key of the asset being sent.                                                           |

#### Return Values:

| Name     | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `keys`   | bytes32[] | Array of data keys.   |
| `values` | bytes[]   | Array of data values. |

### extractIndexFromMap

```solidity
function extractIndexFromMap(
    bytes memory mapValue
) internal pure returns (uint64);
```

Extracts the index from a mapping of `valueType` (bytes8,bytes4) and `valueContent` (Bytes4,Number).
Returns an index of type uint64.

#### Parameters:

| Name     | Type  | Description                                                                         |
| :------- | :---- | :---------------------------------------------------------------------------------- |
| mapValue | bytes | A bytes12 mapping of `valueType` (bytes8,bytes4) and `valueContent` (Bytes4,Number) |

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
