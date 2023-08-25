# LSP1UniversalReceiverDelegateUP

:::info Standard Specifications

[`LSP-1-UniversalReceiver`](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md)

:::
:::info Soldity implementation

[`LSP1UniversalReceiverDelegateUP.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)

:::

> Implementation of a UniversalReceiverDelegate for the [LSP-0-ERC725Account]

The [`LSP1UniversalReceiverDelegateUP`](#lsp1universalreceiverdelegateup) follows the [LSP-1-UniversalReceiver] standard and is designed for [LSP-0-ERC725Account] contracts. The [`LSP1UniversalReceiverDelegateUP`](#lsp1universalreceiverdelegateup) is a contract called by the [`universalReceiver(...)`](#universalreceiver) function of the [LSP-0-ERC725Account] contract that:

- Writes the data keys representing assets received from type [LSP-7-DigitalAsset] and [LSP-8-IdentifiableDigitalAsset] into the account storage, and removes them when the balance is zero according to the [LSP-5-ReceivedAssets] Standard.

- Writes the data keys representing the owned vaults from type [LSP-9-Vault] into your account storage, and removes them when transferring ownership to other accounts according to the [LSP-10-ReceivedVaults] Standard.

## Methods

### supportsInterface

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#supportsinterface)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Function signature: `supportsInterface(bytes4)`
- Function selector: `0x01ffc9a7`

:::

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool);
```

_Achieves the goal of ERC165 to detect supported interfaces and LSP17 by checking if the interfaceId being queried is supported on another linked extension._

Returns true if this contract implements the interface defined by `interfaceId`. If the contract doesn't support the `interfaceId`, it forwards the call to the `supportsInterface` extension according to LSP17, and checks if the extension implements the interface defined by `interfaceId`.

#### Parameters

| Name          |   Type   | Description |
| ------------- | :------: | ----------- |
| `interfaceId` | `bytes4` | -           |

#### Returns

| Name |  Type  | Description |
| ---- | :----: | ----------- |
| `0`  | `bool` | -           |

### universalReceiver

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#universalreceiver)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Function signature: `universalReceiver(bytes32,)`
- Function selector: `0x534e72c8`

:::

```solidity
function universalReceiver(
  bytes32 typeId,
  bytes
) external payable returns (bytes result);
```

_Achieves the goal of [LSP-1-UniversalReceiver] by allowing the account to be notified about incoming/outgoing transactions and enabling reactions to these actions. The reaction is achieved by having two external contracts (UniversalReceiverDelegates) that react on the whole transaction and on the specific typeId, respectively. The notification is achieved by emitting a [`UniversalReceiver`](#universalreceiver) event on the call with the function parameters, call options, and the response of the UniversalReceiverDelegates (URD) contract._

The function performs the following steps:

1. Query the ERC725Y storage with the data key `[_LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY]`.

- If there is an address stored under the data key, check if this address supports the LSP1 interfaceId.

- If yes, call this address with the typeId and data (params), along with additional calldata consisting of 20 bytes of `msg.sender` and 32 bytes of `msg.value`. If not, continue the execution of the function.

2. Query the ERC725Y storage with the data key `[_LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY] + <bytes32 typeId>`. (Check [LSP2-ERC725YJSONSchema] for encoding the data key)

- If there is an address stored under the data key, check if this address supports the LSP1 interfaceId.

- If yes, call this address with the typeId and data (params), along with additional calldata consisting of 20 bytes of `msg.sender` and 32 bytes of `msg.value`. If not, continue the execution of the function.

<blockquote>

**Emitted events:**

- [`ValueReceived`](#valuereceived) when receiving native tokens.
- [`UniversalReceiver`](#universalreceiver) event.

</blockquote>

#### Parameters

| Name     |   Type    | Description                |
| -------- | :-------: | -------------------------- |
| `typeId` | `bytes32` | The type of call received. |
| `_1`     |  `bytes`  | -                          |

#### Returns

| Name     |  Type   | Description |
| -------- | :-----: | ----------- |
| `result` | `bytes` | -           |

## Events

### UniversalReceiver

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#universalreceiver)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Event signature: `UniversalReceiver(address,uint256,bytes32,bytes,bytes)`
- Event hash: `0x9c3ba68eb5742b8e3961aea0afc7371a71bf433c8a67a831803b64c064a178c2`

:::

```solidity
event UniversalReceiver(address indexed from, uint256 indexed value, bytes32 indexed typeId, bytes receivedData, bytes returnedValue);
```

_`from` sent `value` native tokens and a notification using `typeId` and `receivedData`._

The event is emitted when `universalReceiver(...)` reacted successfully on all of the following inputs:

- A valid notifier: `from`

- A valid amount of native tokens are sent: `value`

- A supported type ID: `typeId`

- Arbitrary data which may or may not be used: `receivedData` And returned a valid result: `returnedValue` based on the inputs.

#### Parameters

| Name                   |   Type    | Description                                                     |
| ---------------------- | :-------: | --------------------------------------------------------------- |
| `from` **`indexed`**   | `address` | The address calling the {universalReceiver(...)} function.      |
| `value` **`indexed`**  | `uint256` | The amount sent to the {universalReceiver(...)} function.       |
| `typeId` **`indexed`** | `bytes32` | The hash of a specific standard or a hook.                      |
| `receivedData`         |  `bytes`  | The arbitrary data passed to {universalReceiver(...)} function. |
| `returnedValue`        |  `bytes`  | The value returned by the {universalReceiver(...)} function.    |

## Errors

### CannotRegisterEOAsAsAssets

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#cannotregistereoasasassets)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Error signature: `CannotRegisterEOAsAsAssets(address)`
- Error hash: `0xa5295345`

:::

```solidity
error CannotRegisterEOAsAsAssets(address caller);
```

_EOA: `caller` cannot be registered as an asset._

Reverts when EOA calls the [`universalReceiver(..)`](#universalreceiver) function with an asset/vault typeId.

#### Parameters

| Name     |   Type    | Description            |
| -------- | :-------: | ---------------------- |
| `caller` | `address` | The address of the EOA |

### InvalidLSP10ReceivedVaultsArrayLength

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#invalidlsp10receivedvaultsarraylength)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Error signature: `InvalidLSP10ReceivedVaultsArrayLength(bytes,uint256)`
- Error hash: `0x12ce1c39`

:::

```solidity
error InvalidLSP10ReceivedVaultsArrayLength(
  bytes invalidValueStored,
  uint256 invalidValueLength
);
```

_The data stored under `LSP10ReceivedVaults[]` Data Key is invalid. Value storred: `invalidValueStored`. Value length: `invalidValueLength`._

Reverts when the value stored under the 'LSP10ReceivedVaults[]' data key is not valid. The value stored under this data key should be exactly 16 bytes long. Only possible valid values are:

- any valid uint128 values i.e. `0x00000000000000000000000000000000` (zero), meaning empty array, no vaults received. i.e. `0x00000000000000000000000000000005` (non-zero), meaning 5 array elements, 5 vaults received.

- `0x` (nothing stored under this data key, equivalent to empty array)

#### Parameters

| Name                 |   Type    | Description                                                                                            |
| -------------------- | :-------: | ------------------------------------------------------------------------------------------------------ |
| `invalidValueStored` |  `bytes`  | The invalid value stored under the `LSP10ReceivedVaults[]` data key.                                   |
| `invalidValueLength` | `uint256` | The invalid number of bytes stored under the `LSP10ReceivedVaults[]` data key (MUST be 16 bytes long). |

### InvalidLSP5ReceivedAssetsArrayLength

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#invalidlsp5receivedassetsarraylength)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Error signature: `InvalidLSP5ReceivedAssetsArrayLength(bytes,uint256)`
- Error hash: `0xecba7af8`

:::

```solidity
error InvalidLSP5ReceivedAssetsArrayLength(
  bytes invalidValueStored,
  uint256 invalidValueLength
);
```

_The data stored under `LSP5ReceivedAssets[]` Data Key is invalid. Value storred: `invalidValueStored`. Value length: `invalidValueLength`._

Reverts when the value stored under the 'LSP5ReceivedAssets[]' data key is not valid. The value stored under this data key should be exactly 16 bytes long. Only possible valid values are:

- any valid uint128 values i.e. `0x00000000000000000000000000000000` (zero), empty array, no assets received. i.e. `0x00000000000000000000000000000005` (non-zero), 5 array elements, 5 assets received.

- `0x` (nothing stored under this data key, equivalent to empty array)

#### Parameters

| Name                 |   Type    | Description                                                                                                   |
| -------------------- | :-------: | ------------------------------------------------------------------------------------------------------------- |
| `invalidValueStored` |  `bytes`  | The invalid value stored under the `LSP5ReceivedAssets[]` data key.                                           |
| `invalidValueLength` | `uint256` | The invalid number of bytes stored under the `LSP5ReceivedAssets[]` data key (MUST be exactly 16 bytes long). |

### MaxLSP10VaultsCountReached

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#maxlsp10vaultscountreached)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Error signature: `MaxLSP10VaultsCountReached(address)`
- Error hash: `0x11610270`

:::

```solidity
error MaxLSP10VaultsCountReached(address notRegisteredVault);
```

_Limit reached. Cannot register more vaults. Failed to register: `notRegisteredVault`._

Reverts when the `LSP10Vaults[]` array reaches its maximum limit (`max(uint128)`).

#### Parameters

| Name                 |   Type    | Description                                            |
| -------------------- | :-------: | ------------------------------------------------------ |
| `notRegisteredVault` | `address` | The address of the vault that could not be registered. |

### MaxLSP5ReceivedAssetsCountReached

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#maxlsp5receivedassetscountreached)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Error signature: `MaxLSP5ReceivedAssetsCountReached(address)`
- Error hash: `0x0b51a2d0`

:::

```solidity
error MaxLSP5ReceivedAssetsCountReached(address notRegisteredAsset);
```

_Limit reached. Cannot register more assets. Failed to register: `notRegisteredAsset`._

Reverts when the `LSP5ReceivedAssets[]` array reaches its maximum limit (`max(uint128)`).

#### Parameters

| Name                 |   Type    | Description                                            |
| -------------------- | :-------: | ------------------------------------------------------ |
| `notRegisteredAsset` | `address` | The address of the asset that could not be registered. |

### NativeTokensNotAccepted

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#nativetokensnotaccepted)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Error signature: `NativeTokensNotAccepted()`
- Error hash: `0x114b721a`

:::

```solidity
error NativeTokensNotAccepted();
```

_Cannot send native tokens to [`universalReceiver(...)`](#universalreceiver) function of the delegated contract._

Reverts when [`universalReceiver(...)`](#universalreceiver) function in the delegated contract is called with a value different than 0.

### ReceivedAssetsIndexSuperiorToUint128

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#receivedassetsindexsuperiortouint128)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Error signature: `ReceivedAssetsIndexSuperiorToUint128(uint256)`
- Error hash: `0xe8a4fba0`

:::

```solidity
error ReceivedAssetsIndexSuperiorToUint128(uint256 index);
```

_Asset index stored under the `ReceivedAssetsMap` Data Key is invalid. Invalid index: `index`._

Reverts when the received assets index is superior to `uint128`.

#### Parameters

| Name    |   Type    | Description                |
| ------- | :-------: | -------------------------- |
| `index` | `uint256` | The received assets index. |

### VaultIndexSuperiorToUint128

:::note Links

- Specification details in [**LSP-1-UniversalReceiver**](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md#vaultindexsuperiortouint128)
- Solidity implementation in [**LSP1UniversalReceiverDelegateUP**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)
- Error signature: `VaultIndexSuperiorToUint128(uint256)`
- Error hash: `0x76f9db1b`

:::

```solidity
error VaultIndexSuperiorToUint128(uint256 index);
```

_Vault index stored under the `ReceivedVaultsMap` Data Key is invalid. Invalid index: `index`._

Reverts when the vault index is superior to `uint128`.

#### Parameters

| Name    |   Type    | Description      |
| ------- | :-------: | ---------------- |
| `index` | `uint256` | The vault index. |

<!-- GLOBAL LINKS -->

<!-- prettier-ignore-start -->

<!-- SPECS -->

[ERC-165]: https://eips.ethereum.org/EIPS/eip-165
[EIP-165]: https://eips.ethereum.org/EIPS/eip-165
[ERC-173]: https://eips.ethereum.org/EIPS/eip-173
[EIP-173]: https://eips.ethereum.org/EIPS/eip-173
[ERC-191]: https://eips.ethereum.org/EIPS/eip-191
[EIP-191]: https://eips.ethereum.org/EIPS/eip-191
[ERC-725X]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#ERC725X
[ERC-725Y]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#ERC725Y
[ERC-725]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md
[ERC-1271]: https://eips.ethereum.org/EIPS/eip-1271
[EIP-1271]: https://eips.ethereum.org/EIPS/eip-1271
[LSP-0-ERC725Account]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-0-ERC725Account.md
[LSP-1-UniversalReceiver]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-1-UniversalReceiver.md
[LSP-2-ERC725YJSONSchema]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-2-ERC725YJSONSchema.md
[LSP-3-UniversalProfile-Metadata]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-3-UniversalProfile-Metadata.md
[LSP-4-DigitalAsset-Metadata]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-4-DigitalAsset-Metadata.md
[LSP-5-ReceivedAssets]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-5-ReceivedAssets.md
[LSP-6-KeyManager]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-6-KeyManager.md
[LSP-7-DigitalAsset]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-7-DigitalAsset.md
[LSP-8-IdentifiableDigitalAsset]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md
[LSP-9-Vault.md]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-9-Vault.md.md
[LSP-10-ReceivedVaults]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-10-ReceivedVaults.md
[LSP-11-BasicSocialRecovery]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-11-BasicSocialRecovery.md
[LSP-12-IssuedAssets]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-12-IssuedAssets.md
[LSP-14-Ownable2Step]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-14-Ownable2Step.md
[LSP-15-TransactionRelayServiceAPI]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-15-TransactionRelayServiceAPI.md
[LSP-16-UniversalFactory]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-16-UniversalFactory.md
[LSP-17-ContractExtension]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-17-ContractExtension.md
[LSP-20-CallVerification]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-20-CallVerification.md

<!-- DOCS -->

[ERC725]: https://docs.lukso.tech/standards/lsp-background/erc725
[UniversalProfile]: https://docs.lukso.tech/standards/universal-profile/introduction
[LSP0ERC725Account]: https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account
[LSP1UniversalReceiver]: https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver
[LSP1UniversalReceiverDelegate]: https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver-delegate
[LSP2ERC725YJSONSchema]: https://docs.lukso.tech/standards/generic-standards/lsp2-json-schema
[LSP4DigitalAssetMetadata]: https://docs.lukso.tech/standards/nft-2.0/LSP4-Digital-Asset-Metadata
[LSP5ReceivedVaults]: https://docs.lukso.tech/standards/universal-profile/lsp5-received-assets
[LSP6KeyManager]: https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager
[LSP7DigitalAsset]: https://docs.lukso.tech/standards/nft-2.0/LSP7-Digital-Asset
[LSP8IdentifiableDigitalAsset]: https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset
[LSP10ReceivedVaults]: https://docs.lukso.tech/standards/universal-profile/lsp10-received-vaults
[LSP14Ownable2Step]: https://docs.lukso.tech/standards/generic-standards/lsp14-ownable-2-step
[LSP17ContractExtension]: https://docs.lukso.tech/standards/generic-standards/lsp17-contract-extension
[LSP20CallVerification]: https://docs.lukso.tech/standards/generic-standards/lsp20-call-verification

<!-- DATA KEYS -->

[_LSP17_EXTENSION_PREFIX]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md#lsp17extendable-specification
[_LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md#specification-1
[_LSP1_UNIVERSAL_RECEIVER_DELEGATE_PREFIX]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md#specification-1

<!-- LSP1 TYPE IDS -->

[LSP0OwnershipTransferStarted]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#transferownership
[LSP0OwnershipTransferred_SenderNotification]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#acceptownership
[LSP0OwnershipTransferred_RecipientNotification]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#acceptownership

<!-- ERC725 LIBRARY -->

[`ERC725.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725.sol
[`ERC725Init.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725Init.sol
[`ERC725InitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725InitAbstract
[`IERC725X.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/interfaces/IERC725X.sol
[`ERC725X.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725X.sol
[`ERC725XCore.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XCore.sol
[`ERC725XInit.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XInit.sol
[`ERC725XInitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XInitAbstract.sol
[`IERC725Y.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/interfaces/IERC725Y.sol
[`ERC725Y.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725Y.sol
[`ERC725YCore.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YCore.sol
[`ERC725YInit.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YInit.sol
[`ERC725YInitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YInitAbstract.soll
[`OwnableUnset.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/custom/OwnableUnset.sol

<!-- EXTERNAL LIBRARIES -->

[`Create2.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/Create2.sol
[`ECDSA.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/cryptography/ECDSA.sol
[`ERC165Checker.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/introspection/ERC165Checker.sol
[`Address.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/Address.sol
[`ERC165.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/introspection/ERC165.sol
[`EnumerableSet.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/structs/EnumerableSet.so
[`Initializable.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/v4.9.2/contracts/proxy/utils/Initializable.sol
[`BytesLib.sol`]: https://github.com/GNSPS/solidity-bytes-utils/blob/v0.8.0/contracts/BytesLib.sol

<!-- SOLIDITY IMPLEMENTATION -->

[`LSP0ERC725AccountCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol
[`LSP0Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0Utils.sol
[`LSP0ERC725AccountInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountInitAbstract.sol
[`ILSP0ERC725Account.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/ILSP0ERC725Account.sol
[`LSP0ERC725Account.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725Account.sol
[`LSP0ERC725AccountInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountInit.sol
[`LSP0Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0Constants.sol
[`UniversalProfileInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/UniversalProfileInitAbstract.sol
[`UniversalProfile.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/UniversalProfile.sol
[`UniversalProfileInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/UniversalProfileInit.sol
[`LSP1UniversalReceiverDelegateUP.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol
[`LSP1Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1Utils.sol
[`LSP1UniversalReceiverDelegateVault.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateVault/LSP1UniversalReceiverDelegateVault.sol
[`ILSP1UniversalReceiver.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/ILSP1UniversalReceiver.sol
[`LSP1Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1Constants.sol
[`LSP1Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1Errors.sol
[`LSP4DigitalAssetMetadataInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadataInitAbstract.sol
[`LSP4DigitalAssetMetadata.sol`]: chttps://github.com/code-423n4/2023-06-lukso/tree/main/ontracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol
[`LSP4Compatibility.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Compatibility.sol
[`LSP4Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol
[`ILSP4Compatibility.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/ILSP4Compatibility.sol
[`LSP4Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Errors.sol
[`LSP6SetDataModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol
[`LSP6KeyManagerCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol
[`LSP6ExecuteModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6ExecuteModule.sol
[`LSP6Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Utils.sol
[`LSP6Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Constants.sol
[`ILSP6KeyManager.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/ILSP6KeyManager.sol
[`LSP6Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Errors.sol
[`LSP6OwnershipModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6OwnershipModule.sol
[`LSP6KeyManagerInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerInitAbstract.sol
[`LSP6KeyManager.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManager.sol
[`LSP6KeyManagerInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerInit.sol
[`LSP7DigitalAssetCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol
[`LSP7CompatibleERC20InitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CompatibleERC20InitAbstract.sol
[`LSP7CompatibleERC20.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CompatibleERC20.sol
[`ILSP7DigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol
[`LSP7DigitalAssetInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAssetInitAbstract.sol
[`LSP7CappedSupply.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupply.sol
[`LSP7CappedSupplyInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupplyInitAbstract.sol
[`LSP7DigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol
[`LSP7MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7MintableInitAbstract.sol
[`LSP7CompatibleERC20MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInitAbstract.sol
[`LSP7Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol
[`LSP7CompatibleERC20Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol
[`LSP7Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7Errors.sol
[`LSP7CompatibleERC20MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInit.sol
[`LSP7MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7MintableInit.sol
[`ILSP7CompatibleERC20.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/ILSP7CompatibleERC20.sol
[`ILSP7Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/ILSP7Mintable.sol
[`LSP7Burnable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.sol
[`LSP7BurnableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7BurnableInitAbstract.sol
[`LSP7Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7Constants.sol
[`LSP8IdentifiableDigitalAssetCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol
[`LSP8CompatibleERC721InitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol
[`LSP8CompatibleERC721.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol
[`ILSP8IdentifiableDigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/ILSP8IdentifiableDigitalAsset.sol
[`LSP8EnumerableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8EnumerableInitAbstract.sol
[`LSP8Enumerable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol
[`LSP8CappedSupplyInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupplyInitAbstract.sol
[`LSP8CappedSupply.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupply.sol
[`LSP8IdentifiableDigitalAssetInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetInitAbstract.sol
[`LSP8MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableInitAbstract.sol
[`ILSP8CompatibleERC721.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/ILSP8CompatibleERC721.sol
[`LSP8IdentifiableDigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol
[`LSP8CompatibleERC721MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInitAbstract.s
[`LSP8Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol
[`LSP8CompatibleERC721Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721Mintable.sol
[`LSP8CompatibleERC721MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInit.sol
[`LSP8Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8Errors.sol
[`LSP8MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableInit.sol
[`LSP8Burnable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.sol
[`ILSP8Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/ILSP8Mintable.sol
[`LSP8Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.s
[`LSP14Ownable2Step.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol
[`ILSP14Ownable2Step.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/ILSP14Ownable2Step.sol
[`LSP14Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/LSP14Constants.sol
[`LSP14Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/LSP14Errors.sol
[`LSP17Extendable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Extendable.sol
[`LSP17Extension.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Extension.sol
[`LSP17Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Constants.sol
[`LSP17Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Errors.sol
[`LSP17Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Utils.sol
[`LSP20CallVerification.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/LSP20CallVerification.sol
[`ILSP20CallVerifier.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/ILSP20CallVerifier.sol
[`LSP20Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/LSP20Constants.sol
[`LSP20Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/LSP20Errors.sol
[`LSP2Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol
[`LSP5Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP5ReceivedAssets/LSP5Utils.sol
[`LSP5Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP5ReceivedAssets/LSP5Constants.sol
[`LSP10Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP10ReceivedVaults/LSP10Utils.sol
[`LSP10Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP10ReceivedVaults/LSP10Constants.sol

<!-- prettier-ignore-end -->
