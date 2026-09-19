---
sidebar_label: 'ERC4337 vs. LSP Account Stack'
sidebar_position: 5
description: "ERC-4337 account abstraction compared with LUKSO's native LSP0 + LSP6 + LSP20 + LSP25 account stack: transaction flow, permissions, gas sponsorship."
---

# ERC4337 vs. the LSP Account Stack

ERC-4337 bolts account abstraction onto Ethereum without protocol changes: a parallel `UserOperation` mempool, an `EntryPoint` singleton, bundlers, and paymaster contracts. LUKSO doesn't need the workaround — the [**LSP account stack**](../../../standards/accounts/lsp0-erc725account.md) puts the account contract directly on the normal call path, with permissions and sponsored execution built in as composed standards from day one.

## Structural comparison

| Feature                     | ERC-4337                                                | LSP account stack                                                                                                               |
| --------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Transaction flow            | user → UserOp pool → bundler → EntryPoint → account     | user (controller) → account contract, directly                                                                                  |
| Permission layer            | validator module — different per account implementation | [LSP6 Key Manager](../../../standards/access-control/lsp6-key-manager.md) — one standardized vocabulary everywhere              |
| Gas sponsorship             | separate paymaster contract                             | [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) `executeRelayCall`, on the Key Manager the account already has |
| Signature verification      | `validateUserOp` on the account                         | [LSP20](../../../standards/accounts/lsp20-call-verification.md) `lsp20VerifyCall`, inline                                       |
| Explorer / trace experience | extra hops: `handleOps` → `EntryPoint` → account        | a direct call into the account contract                                                                                         |
| Permission vocabulary       | non-standard — every validator module defines its own   | uniform LSP6 permission bitfield + allowed calls + allowed data keys                                                            |

## No bundler, no EntryPoint, no extra hop

ERC-4337 exists because Ethereum's transaction model is EOA-anchored, and smart-account behavior has to be layered on top without a protocol change. That's a reasonable constraint for Ethereum mainnet — but LUKSO isn't constrained by it. A [Universal Profile](./eoa-vs-universal-profile.md) **is** [LSP0](../../../standards/accounts/lsp0-erc725account.md), the account contract, sitting directly on the normal call path. There's no `UserOperation` envelope to construct, no bundler to trust, no `EntryPoint` singleton to route through. `msg.sender` at every downstream contract is the account itself.

## One permission vocabulary instead of one per validator

ERC-4337's permission model lives in whatever validator module a given smart-account implementation chooses to ship — pluggable, but non-standard: a permission set built for one 4337 wallet doesn't necessarily translate to another. [LSP6](../../../standards/access-control/lsp6-key-manager.md) is a single, standardized permission bitfield with allowed calls, allowed standards, and allowed [ERC725Y](../../../standards/erc725.md) data keys, understood the same way by every Universal Profile, every LUKSO wallet, and every tool built against the standard.

## Sponsored execution without a paymaster contract

ERC-4337 sponsors gas through a separate paymaster contract that the EntryPoint calls out to. On LUKSO, sponsored execution is a function on the [Key Manager](../../../standards/access-control/lsp6-key-manager.md) that every Universal Profile already has — [`executeRelayCall`](../../../standards/accounts/lsp25-execute-relay-call.md) via LSP25 — with nonce channels that support parallel signed-payload streams, no separate sponsorship contract to deploy or trust.

:::tip When the LSP stack wins
Any product where the account contract itself should be the call entry point — clean traces, one standardized permission vocabulary, sponsored execution without extra infrastructure — is better served by the native LSP stack than by layering ERC-4337 on top of an EOA-anchored chain.
:::

**Related reading:** [ERC-4337's bundler tax](../problems/erc4337-bundler-tax.md) · [Gasless onboarding without a paymaster](../problems/gasless-onboarding.md) · [Wallet permission scoping](../problems/wallet-permissions.md) · [ERC-4337 vs EIP-7702](./erc4337-vs-eip7702.md)
