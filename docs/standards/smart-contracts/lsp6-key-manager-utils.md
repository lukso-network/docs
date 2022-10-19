---
title: LSP6KeyManagerUtils
sidebar_position: 14
---

# LSP6KeyManagerUtils

:::info

[`LSP6Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP6KeyManager/LSP6Utils.sol)

:::

This library should be used to querry the permissions that a controller address has for a Key Manager Controlled ERC725 Account.

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

### getAllowedAddressesFor

```solidity
function getAllowedAddressesFor(
    IERC725Y target,
    address caller
) internal view returns (bytes memory);
```

Read the allowed addresses of a `caller` on an ERC725Y `target` contract.

#### Parameters:

| Name   | Type     | Description                                           |
| :----- | :------- | :---------------------------------------------------- |
| target | IERC725Y | An `IERC725Y` contract where to read the permissions. |
| caller | address  | The controller address to read the permissions from.  |

#### Return Value

Returns an abi-encoded array of addresses that the controller address is allowed to interact with.

### getAllowedFunctionsFor

```solidity
function getAllowedFunctionsFor(
    IERC725Y target,
    address caller
) internal view returns (bytes memory);
```

Read the allowed functions of a `caller` on an ERC725Y `target` contract.

#### Parameters:

| Name   | Type     | Description                                           |
| :----- | :------- | :---------------------------------------------------- |
| target | IERC725Y | An `IERC725Y` contract where to read the permissions. |
| caller | address  | The controller address to read the permissions from.  |

#### Return Value

Returns an abi-encoded array of functions selectors that the controller address is allowed to interact with.

### getAllowedStandardsFor

```solidity
function getAllowedStandardsFor(
    IERC725Y target,
    address caller
) internal view returns (bytes memory);
```

Read the allowed standards of a `caller` on an ERC725Y `target` contract.

#### Parameters:

| Name   | Type     | Description                                           |
| :----- | :------- | :---------------------------------------------------- |
| target | IERC725Y | An `IERC725Y` contract where to read the permissions. |
| caller | address  | The controller address to read the permissions from.  |

#### Return Value

Returns an abi-encoded array of allowed interface ids that the controller address is allowed to interact with.

### getAllowedERC725YKeysFor

```solidity
function getAllowedERC725YKeysFor(
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

Returns an abi-encoded array of allowed ERC725 keys that the controller address is allowed to interact with.

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

### hasPermission

```solidity
/**
     * @dev use the `setData(bytes32[],bytes[])` via the KeyManager of the target
     * @param keyManagerAddress the address of the KeyManager
     * @param keys the array of data keys
     * @param values the array of data values
     */
function setDataViaKeyManager(
    address keyManagerAddress,
    bytes32[] memory keys,
    bytes[] memory values
) internal returns (bytes memory result)
```

Use the `setData(bytes32[],bytes[])` via the KeyManager of the target.

#### Parameters:

| Name              | Type      | Description                     |
| :---------------- | :-------- | :------------------------------ |
| keyManagerAddress | address   | Tthe address of the KeyManager. |
| keys              | bytes32[] | The array of data keys.         |
| values            | bytes[]   | The array of data values.       |

#### Return Value

Returns the reuslt of the external call.

## References

- [Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts)
