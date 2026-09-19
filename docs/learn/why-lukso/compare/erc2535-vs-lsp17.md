---
sidebar_label: 'ERC2535 Diamonds vs. LSP17'
sidebar_position: 7
description: 'ERC-2535 Diamond proxies compared with LSP17 Contract Extension: storage model, upgrade authority, and permissioning for adding functions post-deploy.'
---

# ERC2535 Diamonds vs. LSP17 Contract Extension

Both standards let a deployed contract grow new functions after launch. ERC-2535 Diamonds route calls via `delegatecall` to facet contracts sharing one storage layout, controlled by a permanent `diamondCut` admin authority. [**LSP17 Contract Extension**](../../../standards/accounts/lsp17-contract-extension.md) routes unknown function selectors through a fallback to per-selector extension contracts using `CALL` — never `delegatecall` — registered under [ERC725Y](../../../standards/erc725.md) and gated by [LSP6](../../../standards/access-control/lsp6-key-manager.md), with the base contract's own bytecode immutable either way.

## Comparison

| Feature                              | ERC-2535 Diamonds                                      | LSP17 Contract Extension                                                                                                                                   |
| ------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Extension mechanism                  | `delegatecall` to a facet, dispatched by selector      | `CALL` to an extension, dispatched by selector — `delegatecall` is explicitly not used                                                                     |
| Storage                              | shared with facets — strict layout discipline required | extension keeps its own separate storage; the base contract's storage can't be corrupted by an extension                                                   |
| Registration                         | `diamondCut`, called by the diamond owner              | `setData` on [ERC725Y](../../../standards/erc725.md), permissioned via [LSP6](../../../standards/access-control/lsp6-key-manager.md)                       |
| Upgrade authority over base bytecode | diamond owner can replace any facet, permanently       | none — the base contract's own bytecode is immutable either way                                                                                            |
| Which extension handles a selector   | diamond owner can repoint any facet, permanently       | whoever holds `ADDEXTENSIONS`/`CHANGEEXTENSIONS` can add or change an extension mapping — scoped by LSP6, not a single admin lever over the whole contract |
| Permission granularity               | one `diamondCut` function gates everything             | per-selector `setData` grants — independently scoped per extension                                                                                         |

## CALL, not DELEGATECALL — a narrower blast radius by construction

Diamonds make the base contract itself a router: every call goes through `delegatecall` into a facet sharing the diamond's storage, so a malicious or buggy facet can corrupt the diamond's own storage or `selfdestruct` it outright. Both adding and upgrading behavior go through the same `diamondCut` function — powerful, but a standing risk: whoever holds `diamondCut` authority can rewrite what the contract does, permanently, at any time.

LSP17 is stricter by construction. Extensions are invoked with `CALL`, never `delegatecall` — an extension runs in its own storage context and can't overwrite the base contract's storage or `selfdestruct` it, whatever it does. Known functions run as immutable base bytecode that no extension can touch; only _unknown_ selectors hit the fallback. Which extension handles a given selector can still be changed by whoever holds `ADDEXTENSIONS`/`CHANGEEXTENSIONS` — that's a real, scoped LSP6 permission, not a claim that extensions can never change — but the base contract's own bytecode has no `diamondCut`-style lever at all.

## The right fit for an account, not just a token

For a protocol contract that genuinely needs to patch bugs after launch, Diamonds' upgrade lever is the point — and users accept that authority as the cost. For an **account** contract like a Universal Profile, that tradeoff inverts: users should never have to trust that a single admin key can rewrite an already-defined function on their account. [LSP0](../../../standards/accounts/lsp0-erc725account.md) uses LSP17 for exactly this reason — a Universal Profile can register a new signature verifier or a new asset receiver as an extension for a selector that didn't exist before, but no key, however permissioned, can touch the base contract's own bytecode or the behavior of a function it already defines.

:::tip When to reach for LSP17
Extending an account, a wallet, or any contract where the base bytecode needs to stay immutable no matter who holds permissions later — LSP17 can only add handling for previously-undefined selectors, never rewrite one the contract already implements. Reach for Diamonds only when shared storage across facets is a genuine requirement and the permanent `diamondCut` authority — including the ability to replace already-defined behavior — is an accepted cost.
:::

**Related reading:** [The contract-extension problem](../problems/contract-extension.md) · [ERC721 vs LSP8](./erc721-vs-lsp8.md)
