---
title: LSP1 Universal Receiver Delegate UP
sidebar_position: 3
---

# LSP1UniversalReceiverDelegateUP

The **LSP1UniversalReceiverDelegateUP** is a contract called by the **[`universalReceiver(...)`](./02-lsp0-erc725-account.md#universalreceiver)** function of the **[LSP0ERC725Account](./02-lsp0-erc725-account.md)** contract that:

- Writes the keys representing **[LSP7-DigitalAsset](./06-lsp7-digital-asset.md)** and **[LSP8-IdentifiableDigitalAsset](./07-lsp8-identifiable-digital-asset.md)** assets received into the account storage and removes them when the balance is zero according to the **[LSP5-ReceivedAssets Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)**.

- Writes the keys representing **[LSP9-Vault](./08-lsp9-vault.md)** vaults owned into your account storage, and remove them when **transferring ownership** to other accounts according to the **[LSP10-ReceivedVaults Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)**.

The following requirements are required to execute the logic above correctly. First, the owner of the **LSP0ERC725Account** contract should be an **[LSP6KeyManager](./05-lsp6-key-manager.md)** contract. Additionally, the **[LSP6KeyManager](./05-lsp6-key-manager.md)** contract should be granted **permission to [`SETDATA`](../universal-profile/06-lsp6-key-manager.md#permission-values)** on the account (otherwise, the transaction will pass but will not write any keys to the storage).

:::note
_LSP1UniversalReceiverDelegateUP contract also contains the methods from [ERC165](https://eips.ethereum.org/EIPS/eip-165): _

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

:::

## Functions

### constructor

```solidity
constructor()
```

The function registers the **[LSP1UniversalReceiverDelegate InterfaceId](./10-interface-ids.md)**.

### universalReceiverDelegate

```solidity
function universalReceiverDelegate(
    address sender,
    bytes32 typeId,
    bytes memory data
) public payable returns (bytes memory result)
```

The function writes the keys of the received **LSP7DigitalAsset**, **LSP8IdentifiableDigitalAsset**, and **LSP9Vault** contract addresses into the account storage according to the **LSP5ReceivedAssets** and **LSP10ReceivedVaults** Standard.

The keys representing an asset/vault are cleared when the asset/vault is no longer owned by the account.

#### Parameters:

| Name     | Type    | Description                                                                  |
| :------- | :------ | :--------------------------------------------------------------------------- |
| `sender` | address | The token's or vault's smart contract address.                               |
| `typeId` | bytes32 | The token's hooks that are connected the the contract.                       |
| `data`   | bytes   | The data that is associated with the asset or vault transfer (concatenated). |

#### Return Values:

| Name     | Type  | Description                                                                                                          |
| :------- | :---- | :------------------------------------------------------------------------------------------------------------------- |
| `result` | bytes | The value that is returned by the **Key Manager**'s **[`execute(...)`](./05-lsp6-key-manager.md#execute)** function. |

## References

- [LUKSO Standards Proposals: LSP1 - Universal Receiver (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP1UniversalReceiver)
