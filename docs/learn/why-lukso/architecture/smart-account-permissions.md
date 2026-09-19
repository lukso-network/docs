---
sidebar_label: 'Smart Account Permissions'
sidebar_position: 4
description: 'How per-app, per-device, and per-function account permissions are handled across ERC-4337, Safe, EIP-7702, Solana, and LUKSO LSP6.'
---

# Smart Account Permissions: LSP6 vs. the Rest of the EVM

Every chain answers "what is this key allowed to do" differently. ERC-4337 session keys, Safe modules, and EIP-7702 delegation are all workable answers — but none of them are standardized at the **chain level**. [**LSP6 Key Manager**](../../../standards/access-control/lsp6-key-manager.md) is the one exception: a single, chain-level permission schema covering function selectors, target addresses, call types, [ERC725Y](../../../standards/erc725.md) data keys, and asset standards, understood identically by every LSP6-aware wallet and tool.

## Approaches compared

| Approach                      | Where the scope lives                                                    | Standardized?                | Revocation                              |
| ----------------------------- | ------------------------------------------------------------------------ | ---------------------------- | --------------------------------------- |
| ERC-4337 session keys         | per-SDK (Biconomy, ZeroDev, Safe SDK, Coinbase Smart Wallet each differ) | ❌ no cross-SDK standard     | per-SDK logic                           |
| Safe modules                  | per-module contract                                                      | ❌ per-module semantics      | per-module                              |
| EIP-7702 set-code             | the delegated implementation; root EOA key still exists                  | ❌ depends on implementation | none by default — root key can override |
| Solana program-derived access | per-program                                                              | ❌ no cross-program concept  | per-program                             |
| **LSP6 Key Manager (LUKSO)**  | the account itself                                                       | ✅ one chain-level schema    | **one transaction on the account**      |

## Four questions every permission system has to answer

Granularity (per-app or per-function?), revocability (immediate or delayed?), recoverability (what happens when a key is lost?), and standardization (is this a contract pattern, or a protocol-level guarantee?). ERC-4337 sets the account-abstraction stage but leaves the actual permission scope to whichever account implementation a given SDK ships — Biconomy's session keys and ZeroDev's don't mean the same thing. Safe modules are powerful but ad hoc, each one its own audited contract. EIP-7702 makes an EOA smart by delegating to contract code — a delegation that persists until replaced or cleared, not a one-transaction effect — but the root key that started as "all-or-nothing" never really goes away.

## LSP6: permissions as chain-level state, not a per-app convention

[LSP6](../../../standards/access-control/lsp6-key-manager.md) puts the answer directly on the account. Every controller — a device, an app, a session — gets a permission bitfield scoped to specific functions, specific target addresses, specific call types, specific [ERC725Y](../../../standards/erc725.md) data keys, and specific asset standards. Because the schema is defined by the standard rather than by each SDK, any LSP6-aware wallet, indexer, or dApp reads the exact same permission shape without custom integration work. Revoking a controller's access is a single transaction directly on the account — no waiting on a delayed timelock, no per-module cleanup.

[LSP6](../../../standards/access-control/lsp6-key-manager.md) also pairs natively with [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) for gasless execution — a scoped controller can sign a relay call without ever needing a bundler or EntryPoint in the loop.

:::tip When LSP6 is the right fit
Any product needing per-app, per-device, or per-function permission scopes that are standardized at the chain level — not just implemented well by one SDK — should build on LSP6. It's the only approach here where the permission shape is a chain-level guarantee rather than a per-vendor contract.
:::

**Related reading:** [Wallet permission scoping](../problems/wallet-permissions.md) · [ERC-4337 vs the LSP account stack](../compare/erc4337-vs-lsp-stack.md) · [ERC-4337 vs EIP-7702 vs LUKSO](../cross-chain/erc4337-vs-eip7702-vs-lukso.md) · [Smart wallet UX](../build/smart-wallet-ux.md)
