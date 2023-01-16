---
title: LSP5Utils
sidebar_position: 2
---

# LSP5ReceivedAssetsUtils

:::info

[`LSP5Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP5ReceivedAssets/LSP5Utils.sol)

:::

This library can be used to generate ERC725Y data keys-values pairs related to LSP5ReceivedAssets. This is useful to register and de-register addresses of assets owned such as LSP7 tokens or LSP8 NFTs.

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

Generate the data keys/values to be set on the receiver address after receiving assets.

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

| Name     | Type      | Description                                                                                                                     |
| :------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `keys`   | bytes32[] | Array of data keys, `LSP5RecievedAssets[]`, `LSP5RecievedAssets[index]`, `LSP5RecievedAssetsMap + vault address` to be precise. |
| `values` | bytes[]   | Array of data values.                                                                                                           |

### extractIndexFromMap

```solidity
function extractIndexFromMap(
    bytes memory mapValue
) internal pure returns (uint64);
```

Extracts the index from a mapping of `valueType` (bytes8,bytes4) and `valueContent` (Bytes4,Number).

#### Parameters:

| Name     | Type  | Description                                                                         |
| :------- | :---- | :---------------------------------------------------------------------------------- |
| mapValue | bytes | A bytes12 mapping of `valueType` (bytes8,bytes4) and `valueContent` (Bytes4,Number) |

#### Return Values:

| Name    | Type   | Description                   |
| :------ | :----- | :---------------------------- |
| `index` | uint64 | Extracted index from mapping. |

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/contracts)
