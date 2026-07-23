---
sidebar_label: 'Smart Wallet UX'
sidebar_position: 5
description: 'Build session keys, scoped delegation, guardian-based recovery, and signature verification on LUKSO with LSP6, LSP11 social recovery, LSP20, ERC-1271.'
---

# Build Smart Wallet UX on LUKSO

A smart wallet UX is a permission graph, not a connect button. [**LSP6 Key Manager**](../../../standards/access-control/lsp6-key-manager.md) is the standardized vocabulary for that graph — controllers, permissions, allowed calls, allowed data keys — and [**LSP0**](../../../standards/accounts/lsp0-erc725account.md) is the account those controllers act on. Because every account speaks the same permission vocabulary, cross-wallet session portability is possible in principle, unlike ERC-4337's per-vendor validator SDKs that don't share a common permission shape.

## The stack

| Standard                                                        | Role                                                                                                                               |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [LSP0](../../../standards/accounts/lsp0-erc725account.md)       | The account contract                                                                                                               |
| [LSP6](../../../standards/access-control/lsp6-key-manager.md)   | Per-controller permissions: target, selector, data-key scoping                                                                     |
| LSP11 Basic Social Recovery                                     | Guardian-voting recovery ([contract reference](../../../contracts/contracts/LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.md)) |
| [LSP20](../../../standards/accounts/lsp20-call-verification.md) | Inline call verification, when controllers call the account directly rather than through the Key Manager wrapper                   |
| ERC-1271                                                        | Contract signature validation — Sign-In-with-Ethereum, off-chain order signing                                                     |

## When this vertical fits

Anything where "the wallet has full account control" is the wrong default: session keys scoped to one app, controllers scoped to a single marketplace integration, recovery controllers a user never touches day-to-day, or multi-device flows where each device gets its own permission set instead of sharing one master key.

:::tip One permission vocabulary, every account
Because LSP6 permissions are a chain-level standard rather than a per-SDK convention, a session key granted by one LSP6-aware wallet means the same thing to every other LSP6-aware wallet or tool — no per-vendor integration required to understand what a given controller can do.
:::

**Related reading:** [Wallet permission scoping](../problems/wallet-permissions.md) · [Social recovery without a seed phrase](../problems/social-recovery.md) · [The EOA key-risk problem](../problems/eoa-key-risk.md) · [EOA vs Universal Profile](../compare/eoa-vs-universal-profile.md) · [Smart account permissions](../architecture/smart-account-permissions.md)
