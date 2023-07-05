---
title: LSP1UniversalReceiverDelegateUP
sidebar_position: 5
---

# LSP1UniversalReceiverDelegateUP

:::info Solidity contract

[`LSP1UniversalReceiverDelegateUP.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol)

:::

The **LSP1UniversalReceiverDelegateUP** is a contract called by the **[`universalReceiver(...)`](./lsp0-erc725-account.md#universalreceiver)** function of the **[LSP0ERC725Account](./lsp0-erc725-account.md)** contract that:

- Writes the data keys representing assets received from type **[LSP7-DigitalAsset](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md)** and **[LSP8-IdentifiableDigitalAsset](./lsp8-identifiable-digital-asset.md)** into the account storage, and removes them when the balance is zero according to the **[LSP5-ReceivedAssets Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)**.

- Writes the data keys representing the owned vaults from type **[LSP9-Vault](./lsp9-vault.md)** into your account storage, and removes them when **transferring ownership** to other accounts according to the **[LSP10-ReceivedVaults Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)**.

The following two requirements are required to execute the logic above correctly:

1. The owner of the **LSP0ERC725Account** contract should be a contract allowing the UniversalReceiverDelegate to call `setDataBatch(..)` function.

For example, in the case of having the **LSP6KeyManager** as owner of the **LSP0ERC725Account**:

The **LSP1UniversalReceiverDelegateUP** contract should be granted the **[`SUPER_SETDATA`](../universal-profile/lsp6-key-manager.md#permission-values)** and **[`REENTRANCY`](../universal-profile/lsp6-key-manager.md#permission-values)** permission on the account (otherwise, the transaction will not pass and will not write any data keys to the storage).

:::note
_LSP1UniversalReceiverDelegateUP contract also contains the methods from the [ERC165 Standard](https://eips.ethereum.org/EIPS/eip-165):_

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

:::

## Functions

### universalReceiver

```solidity
function universalReceiver(
    bytes32 typeId,
    bytes memory data
) public payable returns (bytes memory result)
```

Writes the data keys of the received **LSP7DigitalAsset**, **LSP8IdentifiableDigitalAsset**, and **LSP9Vault** contract addresses into the account storage according to the **LSP5ReceivedAssets** and **LSP10-ReceivedVaults** Standard.

The data keys representing an asset/vault are cleared when the asset/vault is no longer owned by the account.

In case when the data registered is corrupted such as not stored correctly with standard length (LSP5ReceivedAssets), or when the token received is already registered or when the token being sent is not sent as full balance, the **LSP1UniversalReceiverDelegateUP** will pass and return and not modify any data key on the account.

#### Parameters:

| Name     | Type      | Description                                                                  |
| :------- | :-------- | :--------------------------------------------------------------------------- |
| `typeId` | `bytes32` | The token hooks of the contract.                                             |
| `data`   | `bytes`   | The data that is associated with the asset or vault transfer (concatenated). |

> **Note:** if the function is called by LSP0's [`universalReceiver(...)`](./lsp0-erc725-account.md#universalreceiver) function, it will receives the following **extra calldata**:
>
> - `bytes20 caller`: The token's or vault's smart contract address.
> - `bytes32 value`: The amount of value sent to the universalReceiver function.

#### Return Values:

| Name     | Type    | Description                                                                                                       |
| :------- | :------ | :---------------------------------------------------------------------------------------------------------------- |
| `result` | `bytes` | The value that is returned by the **Key Manager**'s **[`execute(...)`](./lsp6-key-manager.md#execute)** function. |

## References

- [LUKSO Standards Proposals: LSP1 - Universal Receiver (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP1UniversalReceiver)
