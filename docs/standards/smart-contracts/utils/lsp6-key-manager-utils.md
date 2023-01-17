---
title: LSP6Utils
sidebar_position: 3
---

# LSP6KeyManagerUtils

:::info

[`LSP6Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP6KeyManager/LSP6Utils.sol)

:::

Library that contains helper functions to query ERC725Y data keys related to LSP6. They can be used to retrieve permissions, Allowed Calls or ERC725Y Data Keys related to controller addresses.

## Functions

### getPermissionsFor

```solidity
function getPermissionsFor(
    IERC725Y target,
    address caller
) internal view returns (bytes32);
```

Read the permissions of a `caller` on an ERC725Y `target` contract.

#### Parameters:

| Name   | Type     | Description                                           |
| :----- | :------- | :---------------------------------------------------- |
| target | IERC725Y | An `IERC725Y` contract where to read the permissions. |
| caller | address  | The controller address to read the permissions from.  |

#### Return Value

Returns a `bytes32` BitArray containing the permissions of a controller address.

### getAllowedCallsFor

```solidity
function getAllowedCallsFor(
    IERC725Y target,
    address caller
) internal view returns (bytes memory);
```

Read the allowed calls of a `caller` on an ERC725Y `target` contract.

#### Parameters:

| Name   | Type     | Description                                           |
| :----- | :------- | :---------------------------------------------------- |
| target | IERC725Y | An `IERC725Y` contract where to read the permissions. |
| caller | address  | The controller address to read the permissions from.  |

#### Return Value

Returns a CompactBytesArray containing the calls that a controller is allowed to make.

### getAllowedERC725YKeysFor

```solidity
function getAllowedERC725YDataKeysFor(
    IERC725Y target,
    address caller
) internal view returns (bytes memory);
```

Read the allowed ERC725Y keys of a `caller` on an ERC725Y `target` contract.

#### Parameters:

| Name   | Type     | Description                                           |
| :----- | :------- | :---------------------------------------------------- |
| target | IERC725Y | An `IERC725Y` contract where to read the permissions. |
| caller | address  | The controller address to read the permissions from.  |

#### Return Value

Returns a CompactBytesArray containing the allowed ERC725 data keys that the controller address is allowed to interact with.

### hasPermission

```solidity
function hasPermission(
    bytes32 addressPermission,
    bytes32 permissionToCheck
) internal pure returns (bool);
```

Compare the permissions `addressPermissions` of an address to check if they includes the permissions `permissionToCheck`.

#### Parameters:

| Name              | Type    | Description                                                |
| :---------------- | :------ | :--------------------------------------------------------- |
| addressPermission | bytes32 | The permissions of an address stored on an ERC725 account. |
| permissionToCheck | bytes32 | The permissions to check.                                  |

#### Return Value

Returns `true` if `addressPermission` is containing the `permissionToCheck`.

### setDataViaKeyManager

```solidity
function setDataViaKeyManager(
    address keyManagerAddress,
    bytes32[] memory keys,
    bytes[] memory values
) internal returns (bytes memory result);
```

Use the `setData(bytes32[],bytes[])` via the KeyManager of the target.

#### Parameters:

| Name              | Type      | Description                    |
| :---------------- | :-------- | :----------------------------- |
| keyManagerAddress | address   | The address of the KeyManager. |
| keys              | bytes32[] | The array of data keys.        |
| values            | bytes[]   | The array of data values.      |

#### Return Value

Returns the reuslt of the external call.

### getPermissionName

```solidity
function getPermissionName(
    bytes32 permission
) internal pure returns (string memory errorMessage);
```

Get the name of the permission from its BitArray value.

#### Parameters:

| Name       | Type    | Description                                  |
| :--------- | :------ | :------------------------------------------- |
| permission | bytes32 | The permission whose name is to be returned. |

#### Return Value

The name of the permission.

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/contracts)
