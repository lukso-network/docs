---
sidebar_label: 'LSP10 - Received Vaults'
sidebar_position: 8
---

# LSP10 - Received Vaults

:::info Standard Document

[LSP10 - Received Vaults](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-10-ReceivedVaults.md)

:::

## Introduction

To keep track of all the vaults that an address owns, we should avoid the same problem of token standards mentioned in [LSP5-ReceivedAssets](./06-lsp5-received-assets.md), which is not informing recipients and senders about the transfer.

One way to avoid this problem is to create generic metadata keys that should be registered in the smart contract storage, representing how many different vaults you own, their type, and the address of the transferred vault contract.

## What does this standard represent ?

:::success Useful Tip

To check if a smart contract supports the **LSP10 - ReceivedVaults** standard, it's advised to check the **LSP10Vaults[ ]** key.

:::

This Metadata standard describes a set of keys that can be added to an [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md) smart contract.
Two keys are proposed to reference received vaults smart contracts.

### LSP10Vaults[ ]

```json
{
    "name": "LSP10Vaults[]",
    "key": "0x55482936e01da86729a45d2b87a6b1d3bc582bea0ec00e38bdb340e3af6f9f06",
    "keyType": "Array",
    "valueType": "address",
    "valueContent": "Address"
}
```

This key represents an array key listing all the vaults you currently own.

### LSP10VaultsMap

```json
{
    "name": "LSP10VaultsMap:<address>",
    "key": "0x192448c3c0f88c7f00000000<address>",
    "keyType": "Mapping",
    "valueType": "bytes",
    "valueContent": "Mixed"
}
```
This key represents a map key holding:
  - the index in the former array where the received vaults address is stored.
  - an [ERC165 interface ID](https://eips.ethereum.org/EIPS/eip-165) to easily identify the standard used by each vault smart contract, without the need to query the contracts directly. 

The key `LSP10VaultsMap` also helps to prevent adding duplications to the array, when automatically added via smart contract (e.g. a [LSP1-UniversalReceiverDelegate](./02-lsp1-universal-receiver-delegate.md)).

### Flow 

:::info Note

The keys are also set on the **sender UniversalProfile** to remove the vault contract address when it's sent to the recipient.   

::: 

These keys are automatically updated in the UniversalProfile storage via the [LSP1UniversalReceiverDelegateUP](../smart-contracts/lsp1-universal-receiver-delegate-up.md) contract if set, when transferring vaults.
 
![LSP10 Received Vaults Flow](../../../static/img/lsp10-received-vaults.jpeg)


