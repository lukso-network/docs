---
sidebar_label: '🎒 ERC1155 to LSP7 + LSP8'
sidebar_position: 4
description: 'Step-by-step guide to migrating an ERC1155 multi-asset contract to LSP7 and LSP8 on LUKSO by splitting the collection along fungible vs identifiable shape.'
---

# 🎒 Migrate ERC1155 to LSP7 + LSP8

ERC1155 packs fungible and identifiable token IDs into one contract, with the type signaled by convention in the ID bits. Migrating to LUKSO splits that surface along asset semantics instead: fungible IDs become an [**LSP7**](../../standards/tokens/LSP7-Digital-Asset.md) contract, identifiable IDs become an [**LSP8**](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) contract. Both dispatch transfer notifications through the same [LSP1](../../standards/accounts/lsp1-universal-receiver.md) `universalReceiver(typeId, data)` hook — receivers branch on `typeId`, not on a per-collection ID-bit convention.

:::info Estimate
Roughly a week for a typical game or edition contract. Effort scales with how much of your existing code assumed the ERC1155 type-bit decoding convention rather than reading semantics from the standard itself.
:::

## When to migrate

Migrate when downstream code needs to dispatch on asset shape — fungible vs. identifiable — by interface, without a per-collection decoding rule. Keep ERC1155 when atomic cross-ID batch transfers are a primitive your protocol depends on, or when per-ID semantics are baked into your contract's state machine in a way that resists splitting.

## Step 1 — classify every token ID

For each token ID (or ID range) in the existing ERC1155 contract, decide: is it **fungible** (interchangeable units, summable) or **identifiable** (each unit unique)? Fungible → LSP7. Identifiable → LSP8.

:::warning Each distinct fungible ID normally needs its own LSP7 contract
LSP7 has one `balanceOf(address)` per contract — there's no token-ID dimension to a balance. If ID 1 (5 units) and ID 2 (7 units) were two _different_ fungible assets in the ERC1155 contract, minting both into the same LSP7 contract collapses them into one indistinguishable balance of 12. Give each distinct fungible asset its own LSP7 deployment unless merging them into a single balance is actually what you want. A semi-fungible edition (e.g. 100 prints of the same piece, one ID) is the case where a single LSP7 contract with `decimals` set to `0` is correct — it was one fungible asset to begin with.
:::

Some ERC1155 collections signal fungible-vs-unique by convention in the high bits of the token ID — that's one pattern some contracts use, not a property ERC1155 itself defines. Don't assume it applies to a given contract without checking its actual minting logic.

## Step 2 — deploy the contracts

One LSP7 contract per distinct fungible asset in the old collection, one LSP8 contract for the identifiable inventory (a single LSP8 contract can hold many unique token IDs, since LSP8 balances are already per-ID). [LSP4](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) metadata lives independently on each.

## Step 3 — port the holders

Snapshot ERC1155 balances per token ID, then cut the old contract off from further transfers **before or atomically with** minting the new balances — see Step 5 for how, since minting from a snapshot that the old contract can still transfer against leaves both the old and new balances simultaneously spendable. For each fungible ID, mint the equivalent amount into that ID's dedicated LSP7 contract — don't combine amounts from different fungible IDs into one contract's balance. For LSP8 IDs, mint `bytes32`-encoded token IDs into the LSP8 contract. This is typically one coordinated mint script per new contract, sometimes merkle-claimed for large holder sets.

## Step 4 — port the integrations

Every place that implemented `IERC1155Receiver` needs [LSP1](../../standards/accounts/lsp1-universal-receiver.md) `universalReceiver` support instead. The `typeId` on each call lets a receiver branch on "is this an LSP7 transfer?" vs. "is this an LSP8 transfer?" — one hook function handles both, rather than separate single/batch receiver interfaces.

## Step 5 — cut over from the old contract

Minting new balances from a snapshot only works if the old contract can no longer move value after that snapshot — otherwise a holder can still transfer, sell, or double-spend the old balance after already receiving the new one. **ERC-1155 defines no standard pause function**, so most existing deployments have no built-in way to freeze transfers; check your specific contract before assuming this step is available. Pick a cutover that matches what your contract actually supports:

- **Atomic pause + burn** — if your contract does have a pause/freeze modifier (common on OpenZeppelin-based deployments that added `Pausable`), pause it in the same transaction or block as the final snapshot, so nothing can transfer after the snapshot but before the new contracts go live.
- **Escrow-and-claim** — holders deposit their ERC1155 balance into an escrow or burn contract in exchange for the new LSP7/LSP8 tokens. This works even without a pause function, since it only relies on the standard `safeTransferFrom`, not owner-level control.

A delay-and-reconcile approach without one of the above isn't a fix — catching transfers that happened _during_ a window does nothing to stop the old balances from moving again _after_ the new claims go live, so both representations stay permanently spendable, not just spendable during the window. Whichever method you use, the old contract should end up paused or drained into escrow — a persistent, on-chain cutoff — not just watched during a delay period. Keep the contract deployed for reference; don't redeploy over it.

## Gotchas

- **Snapshot-then-mint without a hard cutoff is a double-spend risk** — if the old ERC1155 contract can still be transferred after the balances used for minting were read, a holder can spend both the old and new balance. Confirm your contract actually has a pause function before planning around one, and use escrow-and-claim if it doesn't (see Step 5) — a delay period alone isn't replay protection.
- Multiple contracts instead of one — one LSP7 deployment per distinct fungible asset, plus one LSP8 deployment for the identifiable inventory. Deployment cost and indexing surface scale with how many distinct fungible IDs the old contract actually held.
- Batch transfers are now per-standard and per-contract, not cross-standard — a batch can't mix LSP7 and LSP8 items, or items from two different LSP7 contracts, in one call.
- Holders with mixed ERC1155 IDs need a coordinated mint across every new contract that inherits part of their balance.
- Marketplaces that supported your ERC1155 contract won't automatically pick up the new LSP7 + LSP8 contracts — plan for marketplace re-listing.

## Verify the migration

- Every ERC1155 token ID is mapped to either an LSP7 amount (in that asset's own contract) or an LSP8 token ID — no two distinct fungible assets share one LSP7 balance.
- The old contract is actually unable to honor transfers against re-minted balances — paused or escrowed with a persistent on-chain cutoff, not just "planned to be ignored."
- Holder balances are reproduced identically across every new contract.
- Batch transfer behavior is tested per standard.
- LSP1 receivers correctly handle both LSP7 and LSP8 `typeId`s.

**Related reading:** [ERC1155 vs LSP7 + LSP8](../why-lukso/compare/erc1155-vs-lsp7-lsp8.md) · [ERC1155's complexity problem](../why-lukso/problems/erc1155-complexity.md)
