<!-- This file is auto-generated. Do not edit! -->
<!-- Check `@lukso-network/lsp-smart-contracts/CONTRIBUTING.md#solidity-code-comments` for more information. -->

# LSP17Extendable

:::info Standard Specifications

[`LSP-17-ContractExtension`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md)

:::
:::info Solidity implementation

[`LSP17Extendable.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp17contractextension-contracts/contracts/LSP17Extendable.sol)

:::

> Module to add more functionalities to a contract using extensions.

Implementation of the `fallback(...)` logic according to LSP17

- Contract Extension standard. This module can be inherited to extend the functionality of the parent contract when calling a function that doesn't exist on the parent contract via forwarding the call to an extension mapped to the function selector being called, set originally by the parent contract

## Public Methods

Public methods are accessible externally from users, allowing interaction with this function from dApps or other smart contracts.
When marked as 'public', a method can be called both externally and internally, on the other hand, when marked as 'external', a method can only be called externally.

### supportsInterface

:::note References

- Specification details: [**LSP-17-ContractExtension**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md#supportsinterface)
- Solidity implementation: [`LSP17Extendable.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp17contractextension-contracts/contracts/LSP17Extendable.sol)
- Function signature: `supportsInterface(bytes4)`
- Function selector: `0x01ffc9a7`

:::

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool);
```

See [`IERC165-supportsInterface`](#ierc165-supportsinterface).

#### Parameters

| Name          |   Type   | Description |
| ------------- | :------: | ----------- |
| `interfaceId` | `bytes4` | -           |

#### Returns

| Name |  Type  | Description |
| ---- | :----: | ----------- |
| `0`  | `bool` | -           |

<br/>

## Internal Methods

Any method labeled as `internal` serves as utility function within the contract. They can be used when writing solidity contracts that inherit from this contract. These methods can be extended or modified by overriding their internal behavior to suit specific needs.

Internal functions cannot be called externally, whether from other smart contracts, dApp interfaces, or backend services. Their restricted accessibility ensures that they remain exclusively available within the context of the current contract, promoting controlled and encapsulated usage of these internal utilities.

### \_supportsInterfaceInERC165Extension

```solidity
function _supportsInterfaceInERC165Extension(
  bytes4 interfaceId
) internal view returns (bool);
```

Returns whether the interfaceId being checked is supported in the extension of the
[`supportsInterface`](#supportsinterface) selector.
To be used by extendable contracts wishing to extend the ERC165 interfaceIds originally
supported by reading whether the interfaceId queried is supported in the `supportsInterface`
extension if the extension is set, if not it returns false.

<br/>

### \_getExtensionAndForwardValue

```solidity
function _getExtensionAndForwardValue(
  bytes4 functionSelector
) internal view returns (address, bool);
```

Returns the extension mapped to a specific function selector
If no extension was found, return the address(0)
To be overridden.
Up to the implementer contract to return an extension based on a function selector

<br/>

### \_fallbackLSP17Extendable

:::tip Hint

This function does not forward to the extension contract the `msg.value` received by the contract that inherits `LSP17Extendable`.
If you would like to forward the `msg.value` to the extension contract, you can override the code of this internal function as follow:

```solidity
(bool success, bytes memory result) = extension.call{value: msg.value}(
    abi.encodePacked(callData, msg.sender, msg.value)
);
```

:::

```solidity
function _fallbackLSP17Extendable(
  bytes callData
) internal nonpayable returns (bytes);
```

Forwards the call to an extension mapped to a function selector.
Calls [`_getExtensionAndForwardValue`](#_getextensionandforwardvalue) to get the address of the extension mapped to the function selector being
called on the account. If there is no extension, the `address(0)` will be returned.
Forwards the value if the extension is payable.
Reverts if there is no extension for the function being called.
If there is an extension for the function selector being called, it calls the extension with the
`CALL` opcode, passing the `msg.data` appended with the 20 bytes of the [`msg.sender`](#msg.sender) and 32 bytes of the `msg.value`.

<br/>
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

[ERC725]: https://docs.lukso.tech/standards/erc725
[UniversalProfile]: https://docs.lukso.tech/standards/accounts/introduction
[LSP0ERC725Account]: https://docs.lukso.tech/standards/accounts/lsp0-erc725account
[LSP1UniversalReceiver]: https://docs.lukso.tech/standards/accounts/lsp1-universal-receiver
[LSP1UniversalReceiverDelegate]: https://docs.lukso.tech/standards/accounts/lsp1-universal-receiver-delegate
[LSP2ERC725YJSONSchema]: https://docs.lukso.tech/standards/metadata/lsp2-json-schema
[LSP4DigitalAssetMetadata]: https://docs.lukso.tech/standards/tokens/LSP4-Digital-Asset-Metadata
[LSP5ReceivedVaults]: https://docs.lukso.tech/standards/metadata/lsp5-received-assets
[LSP6KeyManager]: https://docs.lukso.tech/standards/access-control/lsp6-key-manager
[LSP7DigitalAsset]: https://docs.lukso.tech/standards/tokens/LSP7-Digital-Asset
[LSP8IdentifiableDigitalAsset]: https://docs.lukso.tech/standards/tokens/LSP8-Identifiable-Digital-Asset
[LSP10ReceivedVaults]: https://docs.lukso.tech/standards/metadata/lsp10-received-vaults
[LSP14Ownable2Step]: https://docs.lukso.tech/standards/access-control/lsp14-ownable-2-step
[LSP17ContractExtension]: https://docs.lukso.tech/standards/accounts/lsp17-contract-extension
[LSP20CallVerification]: https://docs.lukso.tech/standards/accounts/lsp20-call-verification

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
