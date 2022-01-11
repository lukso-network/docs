---
title: LSP1 Universal Receiver Delegate Vault
sidebar_position: 9
---

# LSP1UniversalReceiverDelegateVault

The **LSP1UniversalReceiverDelegateVault** is the contract called by the **[universalReceiver](./lsp9-vault.md#universalreceiver)** function of the **[LSP9Vault](./lsp9-vault.md)** contract that:
It writes the **[LSP7-DigitalAsset](../nft-2.0/02-LSP7-Digital-Asset.md)** and **[LSP8-IdentifiableDigitalAsset](../nft-2.0/03-LSP8-Identifiable-Digital-Asset.md)** assets a vault receives into the vault storage, and remove them on zero balance according to the **[LSP5-ReceivedAssets standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)**.  

:::note
**_LSP1UniversalReceiverDelegateVault contract also contains the methods from_ [_ERC165_](https://eips.ethereum.org/EIPS/eip-165) :**

- **supportsInterface (bytes4 interfaceId) public view  returns (bool)**
:::

## Functions

### Constructor

```solidity
  constructor()
```

Registers **[LSP1UniversalReceiverDelegate InterfaceId](./interface-ids.md)**.

### universalReceiverDelegate

```solidity
  function universalReceiverDelegate(
    address sender,
    bytes32 typeId,
    bytes memory data
  ) public payable returns (bytes memory result)
```

Writes the received **LSP7DigitalAsset**, **LSP8IdentifiableDigitalAsset** assets into the vault storage according to the **LSP5ReceivedAssets** Standards. 

The keys representing an **asset** are cleared when the asset is not owned by the vault anymore.

#### Parameters:

| Name     | Type    | Description                                 |
| :------- | :------ | :------------------------------------------ |
| `sender` | address | The token smart contract address.           |
| `typeId` | bytes32 | The token hooks.                            |
| `data`   | bytes   | The concatenated data about asset transfer. |

#### Return Values:

| Name     | Type  | Description    |
| :------- | :---- | :------------- |
| `result` | bytes |  Empty bytes   |

## References

- [LUKSO Standards Proposals: LSP1 - Universal Receiver (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP1UniversalReceiver)
