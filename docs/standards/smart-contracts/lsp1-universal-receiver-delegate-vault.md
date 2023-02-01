---
title: LSP1UniversalReceiverDelegateVault
sidebar_position: 6
---

# LSP1UniversalReceiverDelegateVault

:::info Solidity contract

[`LSP1UniversalReceiverDelegateVault.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateVault/LSP1UniversalReceiverDelegateVault.sol)

:::

The **LSP1UniversalReceiverDelegateVault** is a contract called by the **[`universalReceiver(...)`](./lsp9-vault.md#universalreceiver)** function of the **[LSP9Vault](./lsp9-vault.md)** contract that:

- Writes the data keys representing assets received from type **[LSP7-DigitalAsset](./lsp7-digital-asset.md)** and **[LSP8-IdentifiableDigitalAsset](./lsp8-identifiable-digital-asset.md)** into the account storage, and removes them when the balance is zero according to the **[LSP5-ReceivedAssets Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)**.

The requirements stated in the **[LSP1UniversalReceiverDelegateUP](./lsp1-universal-receiver-delegate-up.md)** contract doesn't apply in this contract to execute the logic above correctly, as the address registred under the [LSP1UniversalReceiverDelegate](../generic-standards/lsp1-universal-receiver.md/#extension) data key has write access to the storage.

:::note
_LSP1UniversalReceiverDelegateVault contract also contains the methods from the [ERC165 Standard](https://eips.ethereum.org/EIPS/eip-165):_

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

:::

## Functions

### universalReceiverDelegate

```solidity
function universalReceiver(
    bytes32 typeId,
    bytes memory data
) public payable returns (bytes memory result)
```

Writes the received **LSP7-DigitalAsset** or **LSP8-IdentifiableDigitalAsset** assets into the vault storage according to the **LSP5-ReceivedAssets** standard.

:::note
The data key representing an **asset** is cleared when the asset is not owned by the vault anymore.
:::

#### Parameters:

| Name     | Type      | Description                                                                  |
| :------- | :-------- | :--------------------------------------------------------------------------- |
| `typeId` | `bytes32` | The token hooks of the contract.                                             |
| `data`   | `bytes`   | The data that is associated with the asset or vault transfer (concatenated). |

#### Return Values:

| Name     | Type  | Description |
| :------- | :---- | :---------- |
| `result` | bytes | Empty bytes |

## References

- [LUKSO Standards Proposals: LSP1 - Universal Receiver (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP1UniversalReceiver)
