---
title: LSP10Utils
sidebar_position: 4
---

# LSP10Utils

:::info

[`LSP10Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP10ReceivedVaults/LSP10Utils.sol)

:::

This library contains helper functions that can be used to generate ERC725Y data keys-values pairs related to LSP10 Received Vaults.

## Functions

### generateReceivedVaultKeys

```solidity
function generateReceivedVaultKeys(
    address receiver,
    address vault,
    bytes32 vaultMapKey,
    bytes4 interfaceID
) internal view returns (bytes32[] memory keys, bytes[] memory values);
```

Generate the data keys/values to register the address of a `vault` on the ERC725Y storage of the `receiver`.

#### Parameters:

| Name        | Type    | Description                                                                        |
| :---------- | :------ | :--------------------------------------------------------------------------------- |
| receiver    | address | The address receiving the vault and where the Keys should be added.                |
| vault       | address | The address of the received vault.                                                 |
| vaultMapKey | bytes32 | The map key constructed by concatenating LSP10Vault Map Prefix and `vault` address |
| interfaceID | bytes4  | The interfaceID of the vault being received.                                       |

#### Return Values:

| Name     | Type      | Description                                                                                                |
| :------- | :-------- | :--------------------------------------------------------------------------------------------------------- |
| `keys`   | bytes32[] | Array of data keys, `LSP10Vaults[]`, `LSP10Vaults[index]`, `LSP10VaultsMap + vault address` to be precise. |
| `values` | bytes[]   | Array of data values.                                                                                      |

### generateSentVaultKeys

```solidity
function generateSentVaultKeys(
    address sender,
    bytes32 vaultMapKey,
    bytes memory vaultInterfaceIdAndIndex
) internal view returns (bytes32[] memory keys, bytes[] memory values);
```

Generate the data keys/values to be set on the sender address after sending vaults.

#### Parameters:

| Name                     | Type    | Description                                                                                             |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------ |
| sender                   | address | The address sending the vault and where the Keys should be updated.                                     |
| vaultMapKey              | bytes32 | The map key of the vault being sent containing the interfaceId of the vault and the index in the array. |
| vaultInterfaceIdAndIndex | bytes   | The value of the map key of the vault being sent.                                                       |

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

#### Return Values:

| Name    | Type   | Description                   |
| :------ | :----- | :---------------------------- |
| `index` | uint64 | Extracted index from mapping. |

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/contracts)
