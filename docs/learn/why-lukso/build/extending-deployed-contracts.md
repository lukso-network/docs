---
sidebar_label: 'Extending Deployed Contracts'
sidebar_position: 2
description: 'Add new function selectors to a deployed LUKSO contract with LSP17 Contract Extension — no admin upgrade key, no shared storage, no diamond-cut ceremony.'
---

# Extending Deployed Contracts with LSP17

Adding new capability to a contract after deployment usually means an upgrade key someone has to hold forever, or a diamond-storage layout everyone has to get right. [**LSP17 Contract Extension**](../../../standards/accounts/lsp17-contract-extension.md) takes a third path: the base contract's fallback resolves an incoming function selector against an [ERC725Y](../../../standards/erc725.md)-keyed registry of extension addresses and forwards the call. New capability ships as a new extension contract plus a permission-gated `setData` call — no admin upgrade key, no shared storage, no diamond-cut ceremony.

## The stack

| Standard                                                           | Role                                                                                                        |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| [LSP17](../../../standards/accounts/lsp17-contract-extension.md)   | The fallback router on the base contract                                                                    |
| Extension contracts                                                | One per new function selector you want to add                                                               |
| [LSP14](../../../standards/access-control/lsp14-ownable-2-step.md) | Safer ownership rotation for whoever can register extensions                                                |
| [LSP6](../../../standards/access-control/lsp6-key-manager.md)      | Governs the permission to write the registration key, when the registrant is a Universal Profile controller |

## When this vertical fits

You're shipping a contract that will need to grow over time — new asset receivers, new signature verifiers, new app-specific entry points — without ever surrendering a permanent upgrade key over the base bytecode. Or you're extending a [Universal Profile](../compare/eoa-vs-universal-profile.md) with custom behavior that should be registered per-profile rather than coded directly into the account contract.

A [Universal Profile](../../../standards/accounts/lsp0-erc725account.md) is the canonical use case, but LSP17 is a general primitive — any contract can adopt the same fallback-and-registry pattern.

:::tip The structural guarantee
Known functions always execute as immutable base bytecode. Only unknown selectors ever hit the fallback and route to a registered extension — so there's no path back to silently rewriting behavior the base contract already has, unlike a diamond's permanent `diamondCut` authority.
:::

**Related reading:** [ERC2535 Diamonds vs LSP17](../compare/erc2535-vs-lsp17.md) · [The contract-extension problem](../problems/contract-extension.md)
