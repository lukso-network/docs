---
sidebar_label: 'LSP10 - Received Vaults'
sidebar_position: 8
description: LUKSO LSP10 - Received Vaults for keeping track of all the vaults owned by a smart contract.
---

# LSP10 - Received Vaults

:::info Standard Document

[LSP10 - Received Vaults](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-10-ReceivedVaults.md)

:::

## Introduction

To keep track of all the vaults that an address owns, we should avoid the same problem mentioned in [LSP5-ReceivedAssets](./lsp5-received-assets.md), which is not informing recipients and senders about the ownership transfer of [LSP9-Vaults](../accounts/lsp9-vault.md).

One way to avoid this problem is to create generic metadata keys that developers should register in the smart contract storage, representing how many different vaults you own, their type, and the address of the transferred vault contract.

## What does this standard represent ?

:::tip Recommendation

Make sure to understand the **[ERC725Y Generic Key/Value Store](../erc725.md#erc725y---generic-data-keyvalue-store)** and **[LSP2 - ERC725YJSONSchema](../metadata/lsp2-json-schema.md)** Standards before going through the ERC725Y Data Keys.

:::

This Metadata standard describes two data keys that can be added to an [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md) smart contract to keep track of received and owned [LSP9-Vaults](../accounts/lsp9-vault.md).

### `LSP10Vaults[]`

This data key represents a list of all the vaults owned by the contract.

```json
{
  "name": "LSP10Vaults[]",
  "key": "0x55482936e01da86729a45d2b87a6b1d3bc582bea0ec00e38bdb340e3af6f9f06",
  "keyType": "Array",
  "valueType": "address",
  "valueContent": "Address"
}
```

:::tip Recommendation

It is recommended to query the **`LSP10Vaults[]`** data key to check if a smart contract supports the **[LSP10 - ReceivedVaults](./lsp10-received-vaults.md)** standard.

:::

### `LSP10VaultsMap`

This data key represents a map key holding both:

- an [ERC165 interface ID](https://eips.ethereum.org/EIPS/eip-165) to quickly identify the standard used by each vault's smart contract (without the need to query the assets contracts directly).
- the index in the [`LSP10Vaults[]`](#lsp10vaults-) array where the received vaults addresses are stored.

The `LSP10VaultsMap` data key also helps prevent adding duplications to the array when automatically added via smart contract (_e.g.,_ an [LSP1-UniversalReceiverDelegate](../accounts/lsp1-universal-receiver-delegate.md)).

```json
{
  "name": "LSP10VaultsMap:<address>",
  "key": "0x192448c3c0f88c7f238c0000<address>",
  "keyType": "Mapping",
  "valueType": "(bytes4,uint128)",
  "valueContent": "(Bytes4,Number)"
}
```

### Flow

:::info Note

The data keys are also set on the **sender's Universal Profile** to remove the vault contract address when sent to the recipient.

:::

If set when transferring vaults, these data keys are automatically updated in the UniversalProfile storage via the [LSP1UniversalReceiverDelegateUP](../../contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.md) contract.

![Vault transfer detailed flow](/img/standards/lsp10/detailed-vault-transfer.jpeg)

![LSP10 Received Vaults Flow](/img/standards/lsp10/lsp10-received-vaults.jpeg)
