---
sidebar_label: 'LSP5 - Received Assets'
sidebar_position: 5
---

# LSP5 - Received Assets

:::info Standard Document

[LSP5 - Received Assets](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md)

:::

## Introduction

Keeping track of all the tokens that an address owns is currently unfeasible. If you want to know from which tokens you own, you need to manually import the token contract address and query the balance of your key in it each time for each token. This inconvenience brings light to the following problem: owning tokens without being aware because there are no ways of being notified about the tokens you have received in the first place.

One way to solve this problem is to create generic metadata keys that would register in the smart contract storage how many different tokens you own and the address of the transferred token contracts.

## What does this standard represent?

:::tip Recommendation

Make sure to understand the **[ERC725Y Generic Key/Value Store](../lsp-background/erc725.md#erc725y---generic-data-keyvalue-store)** and **[LSP2 - ERC725YJSONSchema](../generic-standards/lsp2-json-schema.md)** Standards before going through the ERC725Y Data Keys.

:::


This Metadata standard describes two data keys that can be added to an [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) smart contract to reference and keep track of received assets.

### `LSP5ReceivedAssets[]`

This data key represents a list of all tokens and NFTs currently owned by the contract.

```json
{
  "name": "LSP5ReceivedAssets[]",
  "key": "0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b",
  "keyType": "Array",
  "valueType": "address",
  "valueContent": "Address"
}
```

:::tip Recommendation

It is advised to query the **`LSP5ReceivedAssets[]`** data key to verify if a contract supports the **[LSP5 - ReceivedAsset](./lsp5-received-assets.md)** standard.

:::

### `LSP5ReceivedAssetsMap`

This data key represents a map key, both holding:

- an [ERC165 interface ID](https://eips.ethereum.org/EIPS/eip-165) to quickly identify the standard used by each asset smart contract (without the need to query the asset contracts directly).
- the index in the [`LSP5ReceivedAssets[]`](#lsp5receivedassets-) Array where the received asset addresses are stored.

The `LSP5ReceivedAssetsMap` data key also helps to prevent adding duplications to the array when automatically added via smart contract (_e.g., _ an [LSP1-UniversalReceiverDelegate](../generic-standards/lsp1-universal-receiver-delegate.md)).

```json
{
  "name": "LSP5ReceivedAssetsMap:<address>",
  "key": "0x812c4334633eb816c80d0000<address>",
  "keyType": "Mapping",
  "valueType": "(bytes4,bytes8)",
  "valueContent": "(Bytes4,Number)"
}
```

### Flow

:::info Note

The data keys are also set on the **sender Universal Profile** to remove the token contract address if all the balance is sent.

:::

If set when transferring tokens, these data keys are automatically updated in the Universal Profile storage via the [LSP1UniversalReceiverDelegateUP](../smart-contracts/lsp1-universal-receiver-delegate-up.md) contract.

:::note
Check the [token transfer scenario](../generic-standards/lsp1-universal-receiver-delegate#token-transfer-scenario) for more details.
:::

![Token transfer detailed flow](/img/standards/lsp5/detailed-token-transfer.jpeg)

![LSP5 Received Assets Flow](/img/standards/lsp5/lsp5-received-assets.jpeg)
