---
sidebar_label: 'ERC1155 Complexity'
sidebar_position: 3
description: 'ERC-1155 packs fungible and non-fungible items into one contract via ID bit conventions. LSP7 and LSP8 split the semantics at the standard level.'
---

# Split Fungible and Unique Assets at the Standard Level, Not the Token ID

ERC-1155 packs fungible tokens, semi-fungible editions, and one-of-one items into a single contract, using the high bits of `tokenId` to signal which is which. That convention is cheap on-chain and expensive everywhere else — every indexer, marketplace, and wallet has to learn and decode it per collection, and there's no way to tell what an ID means just by reading it. LUKSO splits the semantics at the standard layer instead: [**LSP7**](../../../standards/tokens/LSP7-Digital-Asset.md) for fungible and semi-fungible assets, [**LSP8**](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) for identifiable ones. Both share the same transfer shape, the same [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) receiver hook, and the same [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) metadata pattern, so downstream code dispatches on the contract's interface, not on bits buried in an integer.

## ERC-1155 vs. the LSP7 / LSP8 split

| Aspect               | ERC-1155                                                     | LSP7 + LSP8                                                                                                                                 |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Where semantics live | encoded in `tokenId` bits, per-collection convention         | in the contract's standard interface itself                                                                                                 |
| Balance query        | `balanceOf(account, id)`                                     | LSP7 `balanceOf(account)`; LSP8 `tokenOwnerOf(tokenId)`                                                                                     |
| Receiver hook        | `IERC1155Receiver` (one interface, single + batch callbacks) | one LSP1 `universalReceiver`, `typeId`-discriminated                                                                                        |
| Metadata             | `uri(id)` with `{id}` substitution clients resolve manually  | [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) typed [ERC725Y](../../../standards/erc725.md) keys, per-asset or per-token |
| Batch operations     | native batch transfer                                        | `transferBatch` on LSP7/LSP8, same hook path                                                                                                |
| Integrator cost      | decode the type-bit convention per contract                  | read the standard interface — no decoding required                                                                                          |

## Why packing everything into one contract breaks down

One ERC-1155 contract can hold currency-like tokens, edition NFTs, and unique items simultaneously. Wallets and indexers have to reconstruct the intent of each ID from whatever per-collection rules that project chose to use — there's no standard way to know which IDs are fungible and which are unique without reading that project's specific convention. Marketplaces end up writing custom logic per contract. Batch transfer is genuinely useful for gas savings, but it composes awkwardly with receiver hooks: every receiver must implement `IERC1155Receiver` for both single and batch cases, so the savings on gas land as integration costs downstream.

## What people try today

**High-bit token ID conventions** encode "this range is fungible, this range is unique" into the top bits of the ID. It works inside one contract, but any external code that wants the same semantics has to learn that specific convention from scratch. **One-contract-per-game patterns** restore the type boundary ERC-1155 erased, which negates the gas savings that motivated using ERC-1155 in the first place. **Off-chain ID registries** move the typing problem into an off-chain index, leaving the on-chain state with no opinion at all. **Custom decoder logic per contract** works, but the cost compounds with every new integration that has to write its own version.

## How the LSP7 / LSP8 split fixes it

LSP7 covers fungible and semi-fungible assets. LSP8 covers identifiable assets. They share transfer naming conventions — the same `force` flag and `bytes data` parameter — the same LSP1 receiver hook, and the same LSP4 metadata pattern, so a contract that handles one knows most of what it needs to handle the other. When a project genuinely needs multi-asset packing, it deploys multiple LSP7/LSP8 contracts side by side. The semantic boundary between "this is money" and "this is unique" lives in the standard itself, not in a token-ID bit range that every integrator has to reverse-engineer.

:::tip When the split pays off
Any product mixing currency-like tokens with unique items should reach for LSP7 and LSP8 together rather than one ERC-1155 contract — the type boundary ships for free instead of becoming decoder logic every integrator has to write.
:::

**Related reading:** [ERC-721 token ID limits](./erc721-tokenid-limits.md) · [ERC-20's missing transfer hooks](./erc20-transfer-hooks.md) · [ERC-1155 vs. LSP7/LSP8](../compare/erc1155-vs-lsp7-lsp8.md) · [Choosing between LSP7 and LSP8](../../digital-assets/choose-lsp7-vs-lsp8.md)
