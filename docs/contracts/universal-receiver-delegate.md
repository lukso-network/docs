---
title: LSP1 Universal Receiver Delegate
sidebar_position: 4
---

# LSP1 Universal Receiver Delegate

The **UniversalReceiverDelegate** is the contract called by the **[universalReceiver](./erc725-account.md#universalreceiver)** function on the **[ERC725Account](./erc725-account.md)** when the address of this contract is set as value for the **[UniversalReceiverKey](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#implementation)** in the **[ERC725Account](./erc725-account.md)** storage and when the contract register the **[LSP1UniversalReceiverDelegate Interface ID](./interface-ids.md)** using **ERC165Storage**.

This contract writes **[LSP7](./identifiable-digital-asset.md)** and **[LSP8](./digital-asset.md)** Assets into your account storage, and remove them on balance equal 0.

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

Register the **Map** and the **Key in the ReceivedAsset Array** for incoming assets and remove them on balance equal 0.

#### Parameters:

| Name     | Type    | Description                                 |
| :------- | :------ | :------------------------------------------ |
| `sender` | address | The token smart contract address.           |
| `typeId` | bytes32 | The token hooks.                            |
| `data`   | bytes   | The concatenated data about asset transfer. |

#### Return Values:

| Name     | Type  | Description                                                                            |
| :------- | :---- | :------------------------------------------------------------------------------------- |
| `result` | bytes | The return value of **keyManager**'s **[execute](./key-manager.md#execute)** function. |
