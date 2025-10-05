<!-- This file is auto-generated. Do not edit! -->
<!-- Check `@lukso-network/lsp-smart-contracts/CONTRIBUTING.md#solidity-code-comments` for more information. -->

# OnERC721ReceivedExtension

:::info Standard Specifications

[`LSP-17-Extensions`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md)

:::
:::info Solidity implementation

[`OnERC721ReceivedExtension.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp17-contracts/contracts/OnERC721ReceivedExtension.sol)

:::

LSP17 Extension that can be attached to a LSP17Extendable contract to allow it to receive ERC721 tokens via `safeTransferFrom`.

## Public Methods

Public methods are accessible externally from users, allowing interaction with this function from dApps or other smart contracts.
When marked as 'public', a method can be called both externally and internally, on the other hand, when marked as 'external', a method can only be called externally.

### VERSION

:::note References

- Specification details: [**LSP-17-Extensions**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md#version)
- Solidity implementation: [`OnERC721ReceivedExtension.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp17-contracts/contracts/OnERC721ReceivedExtension.sol)
- Function signature: `VERSION()`
- Function selector: `0xffa1ad74`

:::

```solidity
function VERSION() external view returns (string);
```

_Contract version._

#### Returns

| Name |   Type   | Description |
| ---- | :------: | ----------- |
| `0`  | `string` | -           |

<br/>

### onERC721Received

:::note References

- Specification details: [**LSP-17-Extensions**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md#onerc721received)
- Solidity implementation: [`OnERC721ReceivedExtension.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp17-contracts/contracts/OnERC721ReceivedExtension.sol)
- Function signature: `onERC721Received(address,address,uint256,bytes)`
- Function selector: `0x150b7a02`

:::

```solidity
function onERC721Received(
  address,
  address,
  uint256,
  bytes
) external nonpayable returns (bytes4);
```

See [`IERC721Receiver-onERC721Received`](#ierc721receiver-onerc721received). Always returns `IERC721Receiver.onERC721Received.selector`.

#### Parameters

| Name |   Type    | Description |
| ---- | :-------: | ----------- |
| `_0` | `address` | -           |
| `_1` | `address` | -           |
| `_2` | `uint256` | -           |
| `_3` |  `bytes`  | -           |

#### Returns

| Name |   Type   | Description |
| ---- | :------: | ----------- |
| `0`  | `bytes4` | -           |

<br/>

### supportsInterface

:::note References

- Specification details: [**LSP-17-Extensions**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md#supportsinterface)
- Solidity implementation: [`OnERC721ReceivedExtension.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp17-contracts/contracts/OnERC721ReceivedExtension.sol)
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

### \_extendableMsgData

```solidity
function _extendableMsgData() internal view returns (bytes);
```

Returns the original `msg.data` passed to the extendable contract
without the appended `msg.sender` and `msg.value`.

<br/>

### \_extendableMsgSender

```solidity
function _extendableMsgSender() internal view returns (address);
```

Returns the original `msg.sender` calling the extendable contract.

<br/>

### \_extendableMsgValue

```solidity
function _extendableMsgValue() internal view returns (uint256);
```

Returns the original `msg.value` sent to the extendable contract.

<br/>

<!-- GLOBAL LINKS -->

<!-- prettier-ignore-start -->

<!-- SPECS -->

[ERC-165]: https://eips.ethereum.org/EIPS/eip-165
[ERC-173]: https://eips.ethereum.org/EIPS/eip-173
[ERC-191]: https://eips.ethereum.org/EIPS/eip-191
[ERC-725X]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#ERC725X
[ERC-725Y]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#ERC725Y
[ERC-725]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md
[ERC-1271]: https://eips.ethereum.org/EIPS/eip-1271
[EIP-1271]: https://eips.ethereum.org/EIPS/eip-1271
[LSP-0-ERC725Account]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-0-ERC725Account.md
[LSP-1-UniversalReceiver]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-1-UniversalReceiver.md
[LSP-2-ERC725YJSONSchema]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-2-ERC725YJSONSchema.md
[LSP-3-Profile-Metadata]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-3-Profile-Metadata.md
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

[`ERC725.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/ERC725.sol
[`ERC725Init.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/ERC725Init.sol
[`ERC725InitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/ERC725InitAbstract.sol
[`IERC725X.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/interfaces/IERC725X.sol
[`ERC725X.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/ERC725X.sol
[`ERC725XCore.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v7.0.0/implementations/contracts/ERC725XCore.sol
[`ERC725XInit.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/ERC725XInit.sol
[`ERC725XInitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/ERC725XInitAbstract.sol
[`IERC725Y.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/interfaces/IERC725Y.sol
[`ERC725Y.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/ERC725Y.sol
[`ERC725YCore.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v7.0.0/implementations/contracts/ERC725YCore.sol
[`ERC725YInit.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/ERC725YInit.sol
[`ERC725YInitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/main/implementations/contracts/ERC725YInitAbstract.soll
[`OwnableUnset.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v7.0.0/implementations/contracts/custom/OwnableUnset.sol

<!-- EXTERNAL LIBRARIES -->

[`Create2.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.6/contracts/utils/Create2.sol
[`ECDSA.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.6/contracts/utils/cryptography/ECDSA.sol
[`ERC165Checker.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.6/contracts/utils/introspection/ERC165Checker.sol
[`Address.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.6/contracts/utils/Address.sol
[`ERC165.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.6/contracts/utils/introspection/ERC165.sol
[`EnumerableSet.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.6/contracts/utils/structs/EnumerableSet.so
[`Initializable.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/v4.9.6/contracts/proxy/utils/Initializable.sol
[`BytesLib.sol`]: https://github.com/GNSPS/solidity-bytes-utils/blob/v0.8.4/contracts/BytesLib.sol

<!-- SOLIDITY IMPLEMENTATION -->

[`LSP0ERC725AccountCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp0-contracts/contracts/LSP0ERC725AccountCore.sol
[`LSP0Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp0-contracts/contracts/LSP0Utils.sol
[`LSP0ERC725AccountInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp0-contracts/contracts/LSP0ERC725AccountInitAbstract.sol
[`ILSP0ERC725Account.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp0-contracts/contracts/ILSP0ERC725Account.sol
[`LSP0ERC725Account.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp0-contracts/contracts/LSP0ERC725Account.sol
[`LSP0ERC725AccountInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp0-contracts/contracts/LSP0ERC725AccountInit.sol
[`LSP0Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp0-contracts/contracts/LSP0Constants.sol
[`UniversalProfileInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/universalprofile-contracts/contracts/UniversalProfileInitAbstract.sol
[`UniversalProfile.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/universalprofile-contracts/contracts/UniversalProfile.sol
[`UniversalProfileInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/universalprofile-contracts/contracts/UniversalProfileInit.sol
[`LSP1UniversalReceiverDelegateUP.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp1delegate-contracts/contracts/LSP1UniversalReceiverDelegateUP.sol
[`LSP1UniversalReceiverDelegateVault.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp1delegate-contracts/contracts/LSP1UniversalReceiverDelegateVault.sol
[`LSP1Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/blob/main/packages/lsp1delegate-contracts/contracts/LSP1Errors.sol
[`LSP1Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp1-contracts/contracts/LSP1Utils.sol
[`ILSP1UniversalReceiver.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp1-contracts/contracts/ILSP1UniversalReceiver.sol
[`LSP1Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp1-contracts/contracts/LSP1Constants.sol
[`LSP4DigitalAssetMetadataInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp4-contracts/contracts/LSP4DigitalAssetMetadataInitAbstract.sol
[`LSP4DigitalAssetMetadata.sol`]: chttps://github.com/code-423n4/2023-06-lukso/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol
[`LSP4Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp4-contracts/contracts/LSP4Constants.sol
[`LSP4Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp4-contracts/contracts/LSP4Errors.sol
[`LSP6SetDataModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/LSP6Modules/LSP6SetDataModule.sol
[`LSP6KeyManagerCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/LSP6KeyManagerCore.sol
[`LSP6ExecuteModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/LSP6Modules/LSP6ExecuteModule.sol
[`LSP6Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/LSP6Utils.sol
[`LSP6Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/LSP6Constants.sol
[`ILSP6KeyManager.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/ILSP6KeyManager.sol
[`LSP6Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/LSP6Errors.sol
[`LSP6OwnershipModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/LSP6Modules/LSP6OwnershipModule.sol
[`LSP6KeyManagerInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/LSP6KeyManagerInitAbstract.sol
[`LSP6KeyManager.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/LSP6KeyManager.sol
[`LSP6KeyManagerInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp6-contracts/contracts/LSP6KeyManagerInit.sol
[`ILSP7DigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/ILSP7DigitalAsset.sol
[`LSP7DigitalAssetInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/LSP7DigitalAssetInitAbstract.sol
[`LSP7CappedSupply.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/extensions/LSP7CappedSupply.sol
[`LSP7CappedSupplyInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/extensions/LSP7CappedSupplyInitAbstract.sol
[`LSP7DigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/LSP7DigitalAsset.sol
[`LSP7MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/presets/LSP7MintableInitAbstract.sol
[`LSP7Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/presets/LSP7Mintable.sol
[`LSP7Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/LSP7Errors.sol
[`LSP7MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/presets/LSP7MintableInit.sol
[`ILSP7Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/presets/ILSP7Mintable.sol
[`LSP7Burnable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/extensions/LSP7Burnable.sol
[`LSP7BurnableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/extensions/LSP7BurnableInitAbstract.sol
[`LSP7Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp7-contracts/contracts/LSP7Constants.sol
[`ILSP8IdentifiableDigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/ILSP8IdentifiableDigitalAsset.sol
[`LSP8EnumerableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/extensions/LSP8EnumerableInitAbstract.sol
[`LSP8Enumerable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/extensions/LSP8Enumerable.sol
[`LSP8CappedSupplyInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/extensions/LSP8CappedSupplyInitAbstract.sol
[`LSP8CappedSupply.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/extensions/LSP8CappedSupply.sol
[`LSP8IdentifiableDigitalAssetInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/LSP8IdentifiableDigitalAssetInitAbstract.sol
[`LSP8MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/presets/LSP8MintableInitAbstract.sol
[`LSP8IdentifiableDigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/LSP8IdentifiableDigitalAsset.sol
[`LSP8Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/presets/LSP8Mintable.sol
[`LSP8Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/LSP8Errors.sol
[`LSP8MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/presets/LSP8MintableInit.sol
[`LSP8Burnable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/extensions/LSP8Burnable.sol
[`ILSP8Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/presets/ILSP8Mintable.sol
[`LSP8Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp8-contracts/contracts/LSP8Constants.s
[`LSP14Ownable2Step.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp14-contracts/contracts/LSP14Ownable2Step.sol
[`ILSP14Ownable2Step.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp14-contracts/contracts/ILSP14Ownable2Step.sol
[`LSP14Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp14-contracts/contracts/LSP14Constants.sol
[`LSP14Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp14-contracts/contracts/LSP14Errors.sol
[`LSP17Extendable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp17contractextension-contracts/contracts/LSP17Extendable.sol
[`LSP17Extension.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp17contractextension-contracts/contracts/LSP17Extension.sol
[`LSP17Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp17contractextension-contracts/contracts/LSP17Constants.sol
[`LSP17Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp17contractextension-contracts/contracts/LSP17Errors.sol
[`LSP17Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp17contractextension-contracts/contracts/LSP17Utils.sol
[`LSP20CallVerification.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp20-contracts/contracts/LSP20CallVerification.sol
[`ILSP20CallVerifier.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp20-contracts/contracts/ILSP20CallVerifier.sol
[`LSP20Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp20-contracts/contracts/LSP20Constants.sol
[`LSP20Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp20-contracts/contracts/LSP20Errors.sol
[`LSP2Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp2-contracts/contracts/LSP2Utils.sol
[`LSP5Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp5-contracts/contracts/LSP5Utils.sol
[`LSP5Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp5-contracts/contracts/LSP5Constants.sol
[`LSP10Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp10-contracts/contracts/LSP10Utils.sol
[`LSP10Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/packages/lsp10-contracts/contracts/LSP10Constants.sol

<!-- prettier-ignore-end -->