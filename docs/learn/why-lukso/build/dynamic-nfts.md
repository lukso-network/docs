---
sidebar_label: 'Dynamic NFTs'
sidebar_position: 1
description: 'Build stateful, evolving NFTs on LUKSO with LSP8, LSP4, and ERC725Y: per-token on-chain data, no metadata server or marketplace refresh button needed.'
---

# Build Dynamic NFTs on LUKSO

If an NFT's traits evolve, levels accrue, or its art changes on a schedule, metadata has to be data — not just a URL. [**LSP8**](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) makes that distinction structural rather than bolted on: every token's attributes, image reference, and provenance live under typed [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) keys on the token contract, and updates go through `setDataForTokenId(tokenId, key, value)` — gated by [LSP6](../../../standards/access-control/lsp6-key-manager.md) permissions. No metadata refresh button on a marketplace, no off-chain server required for state to change, no [ERC-4906](https://eips.ethereum.org/EIPS/eip-4906) update event bolted on after the fact.

## The stack

| Standard                                                             | Role                                                        |
| -------------------------------------------------------------------- | ----------------------------------------------------------- |
| [LSP8](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) | Ownership + per-token `bytes32` IDs                         |
| [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md)     | Collection and per-token metadata under typed keys          |
| [ERC725Y](../../../standards/erc725.md)                              | The typed key-value storage substrate underneath LSP4       |
| VerifiableURI (LSP4 option)                                          | Integrity guarantees when off-chain media is still involved |
| [LSP1](../../../standards/accounts/lsp1-universal-receiver.md)       | Receiver hook so profiles can react when the NFT lands      |

## When this vertical fits

The asset has per-token state that mutates over time, and that state needs to be readable by _any_ app — not just yours. The token ID itself might carry meaning (a content hash, a serial). And you don't want to rely on users clicking "refresh metadata" every time a marketplace's cache goes stale.

:::info When ERC721 is still the right call
If marketplace compatibility on day one is the entire product — the collection has to list on every major NFT venue immediately — ERC721 is the pragmatic path, tokenURI tax included. LSP8 is the right call once dynamic, per-token, on-chain state is a real requirement rather than a nice-to-have.
:::

**Related reading:** [ERC721 vs LSP8](../compare/erc721-vs-lsp8.md) · [ERC721's dynamic metadata problem](../problems/erc721-dynamic-metadata.md) · [ERC721 token ID limits](../problems/erc721-tokenid-limits.md) · [Migrate ERC721 to LSP8](../../migrate/migrate-erc721-to-lsp8.md)
