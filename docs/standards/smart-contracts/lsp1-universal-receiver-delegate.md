---
title: LSP1 - Universal Receiver Delegate
sidebar_position: 3
---

# LSP1 Universal Receiver Delegate

The **UniversalReceiverDelegate** (URD) is the contract called by the **[universalReceiver](./lsp0-erc725-account.md#universalreceiver)** function on the **[ERC725Account](./lsp0-erc725-account.md)**.

To be called, the address of this contract should be set as a value for the **[UniversalReceiverKey](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#implementation)** in the **ERC725Account** storage and the ERC725Account should be controlled by a KeyManager that grant the universalReceiverDelegate address the permission of **setData**, also the URD should register the **[LSP1UniversalReceiverDelegate Interface ID](./interface-ids.md)** using **ERC165Storage**. If these 2 conditions aren't met, the **UniversalReceiverDelegate** contract won't be called when calling **[universalReceiver](./lsp0-erc725-account.md#universalreceiver)** function on the account.

This implementation writes **[LSP7-DigitalAsset](./lsp7-digital-asset.md)** and **[LSP8-IdentifiableDigitalAsset](./lsp8-identifiable-digital-asset.md)** Assets into your account storage, and remove them on balance equal 0.

Assets are written according to the **[LSP5-ReceivedAssets standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)**.

:::note
**_UniversalReceiverDelegate implementation also contains the methods from [ERC165](https://eips.ethereum.org/EIPS/eip-165)._**
:::

## Functions

### universalReceiverDelegate

```solidity
  function universalReceiverDelegate(
    address sender,
    bytes32 typeId,
    bytes memory data
  ) public payable returns (bytes memory result)
```

Get called by the **[universalReceiver](./lsp0-erc725-account.md#universalreceiver)** function when the conditions mentioned **[above](#)** are met.

Register the **Map** and the **Key in the ReceivedAsset Array** for incoming assets and remove them on balance equal 0.

#### Parameters:

| Name     | Type    | Description                                 |
| :------- | :------ | :------------------------------------------ |
| `sender` | address | The token smart contract address.           |
| `typeId` | bytes32 | The token hooks.                            |
| `data`   | bytes   | The concatenated data about asset transfer. |

#### Return Values:

| Name     | Type  | Description                                                                                 |
| :------- | :---- | :------------------------------------------------------------------------------------------ |
| `result` | bytes | The return value of **keyManager**'s **[execute](./lsp6-key-manager.md#execute)** function. |

## References

- [LUKSO Standards Proposals: LSP1 - Universal Receiver (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP1UniversalReceiver)
