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

This standard enables the vault to be notified of any incoming transactions, whether token transfer, vault transfer, information transfer, etc. Notification is handy for vaults. Within them, anyone could customize how their account reacts to certain tokens by rejecting them or operating a specific call on token receive.

:::note
Check **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard for more information.
:::

## Extension

### Interactivity

:::caution

The implementation of the **UniversalReceiverDelegate** used by the Universal Profile is different from the one used by the vault. Check [LSP1UniversalReceiverDelegateVault](../smart-contracts/lsp1-universal-receiver-delegate-vault.md)

:::

Developers can notify the vault of incoming assets, information, etc., via the **universalReceiver** function. Builders could add an extension to increase the autonomy of the contract by handling and reacting to transactions that the vault receives.

Such functionality can be attached by setting an **[LSP1-UniversalReceiverDelegate](./lsp1-universal-receiver-delegate.md)** to your account.

### Flow

Developers could use the vault to hold assets and, as mentioned before, could be used to restrict third parties to only operate on the assets and metadata of the vault and not the Universal Profile. The Universal Profile's metadata and assets are safe if the third party tries to act maliciously.

**1.** The **protocol** should be allowed to only talk to the vault A1 through [AllowedAddresses permission](./lsp6-key-manager#address-permissions).

![LSP9 vault allowed in profile](/img/standards/lsp9/vault-flow.jpeg)

**2.** All the **protocol** transactions should be routed through the vault. Otherwise, the transaction will **revert**.

![LSP9 vault with third parties flow](/img/standards/lsp9/lsp9-vault-flow.jpeg)
