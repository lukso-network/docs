---
sidebar_label: 'LSP9 - Vault'
sidebar_position: 7
---

# LSP9 - Vault

:::info Standard Document

[LSP9 - Vault](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-9-Vault.md)

:::

## Introduction

Using the Key Manager with the Universal Profile will enable third parties to execute through your profile given specific permissions, but this will not eliminate the risk of operating maliciously with your data and belongings.

Third parties should be restricted when talking to a specific smart contract through the Universal Profile to avoid this risk when it almost has the same functionalities and is controlled by the Universal Profile.

## What does this standard represent?

This standard defines a vault that can hold assets and interact with other contracts. It can **attach information** via [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) to itself, **execute, deploy or transfer value** to any other smart contract or EOA via [ERC725X](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725x). It can be **notified of incoming assets** via the [LSP1-UniversalReceiver](https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-1-UniversalReceiver.md) function.

This standard uses the **[ERC173](https://eips.ethereum.org/EIPS/eip-173)** standard to provide ownership functions for owning and controlling the implementation contract.

### ERC725X - Generic Executor

This substandard enables the vault to execute a call on any other smart contracts, transfer the blockchain's native token, or deploy a new smart contract. Only the owner can perform these operations below.

The following `operationType` MUST exist:

- `0` for `CALL`
- `1` for `CREATE`
- `2` for `CREATE2`
- `3` for `STATICCALL`

The following `operationType` COULD exist:

- `4` for `DELEGATECALL` - **NOTE** This is a potentially dangerous operation

### ERC725Y - Generic Data Key-Value Store

This substandard enables the vault to hold arbitrary data through a generic data key/value store. It gives flexibility to the contract storage by allowing to attach any information to the contract and update it easily.

:::info
The data keys and values are constructed according to the **[LSP2-ERC725YJSONSchema](../generic-standards/lsp2-json-schema.md)** standard.
:::

### LSP1 - UniversalReceiver

:::info

See the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard for more information.

:::

This standard enables the vault to be notified of incoming transactions such as token transfer, followers, information transfer, etc. Notifications are handy for situations where users want to customize how their account contract reacts to certain tokens by either rejecting them or operating a specific call on each token received.

The **[LSP9-Vault](#)** implements the `universalReceiver(..)` function that:

- Emits an event with the typeId and data passed to it, as well as additional parameters such as the amount sent to the function, the caller of the function, and the return value of the delegate contracts.

- Forwards the call to the **UniversalReceiverDelegate** contract address stored under the data key attached below, if it supports [LSP1UniversalReceiverDelegate InterfaceId](../smart-contracts/interface-ids.md).

```json
{
  "name": "LSP1UniversalReceiverDelegate",
  "key": "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
  "keyType": "Singleton",
  "valueType": "address",
  "valueContent": "Address"
}
```

- Forwards the call to the **typeId delegate** contract address stored under the data key attached below, if it supports [LSP1UniversalReceiverDelegate InterfaceId](../smart-contracts/interface-ids.md).

```json
{
  "name": "LSP1UniversalReceiverDelegate:<bytes32>",
  "key": "0x0cfc51aec37c55a4d0b10000<bytes32>",
  "keyType": "Mapping",
  "valueType": "address",
  "valueContent": "Address"
}
```

> <bytes32\> is the `typeId` passed to the `universalReceiver(..)` function. 

### Flow

Developers could use the vault to hold assets and, as mentioned before, could be used to restrict third parties to only operate on the assets and metadata of the vault and not the Universal Profile. The Universal Profile's metadata and assets are safe if the third party tries to act maliciously.

**1.** The **protocol** should be allowed to only talk to the vault A1 through [AllowedAddresses permission](./lsp6-key-manager#address-permissions).

![LSP9 vault allowed in profile](/img/standards/lsp9/vault-flow.jpeg)

**2.** All the **protocol** transactions should be routed through the vault. Otherwise, the transaction will **revert**.

![LSP9 vault with third parties flow](/img/standards/lsp9/lsp9-vault-flow.jpeg)
