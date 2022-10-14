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

Returns the permissions of the `caller` for the ERC725Y `target`.

#### Parameters:

| Name   | Type     | Description                   |
| :----- | :------- | :---------------------------- |
| target | IERC725Y | A valid `IERC725Y` interface. |
| caller | address  | The controller address.       |

#### Return Value

Returns a `bytes32` BitArray containing the permissions of a controller address.

### getAllowedAddressesFor

```solidity
function getAllowedAddressesFor(
    IERC725Y target,
    address caller
) internal view returns (bytes memory);
```

Returns the allowed addresses of the `caller` for the ERC725Y `target`.

#### Parameters:

| Name   | Type     | Description                   |
| :----- | :------- | :---------------------------- |
| target | IERC725Y | A valid `IERC725Y` interface. |
| caller | address  | The controller address.       |

#### Return Value

Returns an encoded `bytes` value which contains an array of allowed addresses (to interact with) for the controller address.

### getAllowedFunctionsFor

```solidity
function getAllowedFunctionsFor(
    IERC725Y target,
    address caller
) internal view returns (bytes memory);
```

Returns the allowed functions of the `caller` for the ERC725Y `target`.

#### Parameters:

| Name   | Type     | Description                   |
| :----- | :------- | :---------------------------- |
| target | IERC725Y | A valid `IERC725Y` interface. |
| caller | address  | The controller address.       |

#### Return Value

Returns an encoded `bytes` value which contains an array of allowed function signatures (to interact with) for the controller address.

### getAllowedStandardsFor

```solidity
function getAllowedStandardsFor(
    IERC725Y target,
    address caller
) internal view returns (bytes memory);
```

Returns the allowed standards of the `caller` for the ERC725Y `target`.

#### Parameters:

| Name   | Type     | Description                   |
| :----- | :------- | :---------------------------- |
| target | IERC725Y | A valid `IERC725Y` interface. |
| caller | address  | The controller address.       |

#### Return Value

Returns an encoded `bytes` value which contains an array of allowed standards/interfaceIds (to interact with) for the controller address.

### getAllowedERC725YKeysFor

```solidity
function getAllowedERC725YKeysFor(
    IERC725Y target,
    address caller
) internal view returns (bytes memory);
```

Returns the allowed ERC725Y keys of the `caller` for the ERC725Y `target`.

#### Parameters:

| Name   | Type     | Description                   |
| :----- | :------- | :---------------------------- |
| target | IERC725Y | A valid `IERC725Y` interface. |
| caller | address  | The controller address.       |

#### Return Value

Returns an encoded `bytes` value which contains an array of allowed ERC725 keys (to interact with) for the controller address.

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
