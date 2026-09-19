---
sidebar_label: 'ERC1155 vs. LSP7 + LSP8'
sidebar_position: 3
description: "ERC1155 multi-token contracts compared with LUKSO's LSP7 + LSP8 split-by-shape model: transfer hooks, metadata, batch transfers, and indexing cost."
---

# ERC1155 vs. LSP7 + LSP8

ERC1155 packs fungible, semi-fungible, and non-fungible token types into a single contract, with type semantics conventionally encoded in the token ID bits — a convention every integrator has to reverse-engineer per collection. LUKSO splits the same surface at the standard level instead of the ID level: [**LSP7**](../../../standards/tokens/LSP7-Digital-Asset.md) handles divisible balances, [**LSP8**](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) handles unique items, and downstream code can tell which is which just by checking the interface — no per-collection convention required.

## Comparison

| Feature               | ERC1155                                              | LSP7 + LSP8                                                                                                                         |
| --------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Contracts per product | one                                                  | one LSP7 contract per distinct fungible asset, plus one LSP8 collection for all identifiable items — not a fixed number             |
| Fungibility signal    | convention encoded in token-id bits                  | declared by the standard itself (LSP7 vs LSP8)                                                                                      |
| Transfer hook         | `IERC1155Receiver` (single + batch variants)         | one [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) `universalReceiver` shape for both                               |
| Metadata              | `uri(id) → string`                                   | [ERC725Y](../../../standards/erc725.md) + [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) keys, per-token via LSP8 |
| Batch transfer        | `safeBatchTransferFrom`                              | `transferBatch(...)` on each standard                                                                                               |
| Indexing cost         | high — every collection needs its own decoding logic | low — asset shape is declared, not inferred                                                                                         |

## The semantic boundary moves from convention to standard

ERC1155 makes fungible-vs-unique a contract-internal decision. The high bits of a token ID might mean "this is fungible" in one collection and something else entirely in the next — wallets and indexers have to learn each project's convention individually, and get it wrong often enough that this is a recurring source of marketplace bugs.

LSP7 and LSP8 put that boundary where it belongs: in the standard. If it's fungible, it's an LSP7 contract. If it's identifiable, it's an LSP8 contract. A marketplace or wallet branches on the interface ID once — not on a token-ID bit pattern that changes per project.

## One receiver hook shape, not four

`IERC1155Receiver` requires implementing both a single-transfer and a batch-transfer callback, on top of whatever `IERC721Receiver` shape a mixed integration also needs to support. LSP7 and LSP8 both dispatch through the same [LSP1 `universalReceiver`](../../../standards/accounts/lsp1-universal-receiver.md) hook, branching on a `typeId` — one interface to implement, one code path to audit, regardless of which LUKSO asset is arriving.

:::info The honest tradeoff
Where ERC1155 ships one contract for a multi-asset product, LSP7 + LSP8 ships one contract per distinct fungible asset plus one LSP8 collection — two contracts for a product with a single fungible currency and a single NFT collection, more if there are several distinct fungible assets to keep separate. That's a real, scaling deployment cost, not a flat one-time fee. For a game with a handful of stable item categories, the integration savings from clean type separation pay that back immediately. For a single collection of thousands of loosely related items, ERC1155's one-contract model can still be the pragmatic choice.
:::

**Related reading:** [ERC1155's complexity problem](../problems/erc1155-complexity.md) · [ERC20 vs LSP7](./erc20-vs-lsp7.md) · [ERC721 vs LSP8](./erc721-vs-lsp8.md) · [Migrate ERC1155 to LSP7 + LSP8](../../migrate/migrate-erc1155-to-lsp7-lsp8.md)
