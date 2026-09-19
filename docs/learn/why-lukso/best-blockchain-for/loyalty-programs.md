---
sidebar_label: 'Loyalty Programs'
sidebar_position: 5
description: 'Best blockchain for loyalty programs: gasless redemption, portable member identity, and per-vendor permissions compared across chains.'
---

# Best Blockchain for Loyalty Programs

Loyalty programs live or die on three constraints: zero gas friction for everyday members, low cost per redemption, and a member identity portable enough to survive a vendor migration. LUKSO is purpose-built for exactly this shape — [**LSP25**](../../../standards/accounts/lsp25-execute-relay-call.md) sponsors every member transaction without operating bundler infrastructure, [**LSP3**](../../../standards/metadata/lsp3-profile-metadata.md) carries tier and history as portable profile data, and [**LSP6**](../../../standards/access-control/lsp6-key-manager.md) scopes each vendor to a distinct, revocable permission on the member's own account.

## Comparison

| Criterion                   | Ethereum L1                  | Base / Arbitrum / Optimism                  | Polygon                              | Solana                | LUKSO                                                                                   |
| --------------------------- | ---------------------------- | ------------------------------------------- | ------------------------------------ | --------------------- | --------------------------------------------------------------------------------------- |
| Cost per redemption         | prohibitive                  | low                                         | low                                  | very low              | low                                                                                     |
| Gasless UX                  | paymaster + bundler required | paymaster + bundler (Base: Coinbase-hosted) | paymaster / Gas Station              | native fee delegation | ✅ [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) relayer, no bundler |
| Member identity portability | per-program                  | per-program (Optimism: EAS attestations)    | per-program                          | per-program           | ✅ [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) profile                 |
| Issuance auditability       | on-chain                     | on-chain                                    | on-chain                             | on-chain              | ✅ on-chain + [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) metadata |
| Per-vendor permission       | session keys (SDK-specific)  | session keys                                | session keys                         | per-program           | ✅ [LSP6](../../../standards/access-control/lsp6-key-manager.md) per-controller         |
| Wallet recovery             | custodial / SDK              | custodial / SDK (Base: passkeys)            | custodial / SDK                      | custodial / SDK       | ✅ LSP6 multi-controller / social recovery                                              |
| Enterprise readiness        | high                         | high (medium on Optimism)                   | highest — existing brand deployments | medium                | growing                                                                                 |

## Why loyalty needs a different scorecard than general consumer apps

Members never think about gas — the program operator absorbs that cost, which makes per-redemption cost and sponsorship infrastructure the real constraints, not raw throughput. And because loyalty relationships routinely outlive a single vendor relationship, member tier and history need to travel to the next program without starting from zero. Every EVM competitor here handles gasless UX through a bundler-and-paymaster stack that the operator has to run or rent; LUKSO handles it as a native account function through [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md).

:::tip When LUKSO is the strongest fit
Programs where members should carry tier and history across vendors, where gas must be sponsored without standing up bundler infrastructure, and where each vendor's access needs to be independently scoped and revocable from the member's own account are the clearest fit for LUKSO's stack.
:::

:::info When another chain makes more sense
Polygon has the deepest bench of existing enterprise loyalty deployments and brand partnerships — a program that needs that track record today may reasonably start there. Solana wins on raw per-action cost for very high-frequency, gaming-adjacent loyalty mechanics where non-EVM tooling is acceptable.
:::

**Related reading:** [Gasless onboarding without a paymaster](../problems/gasless-onboarding.md) · [Token economics on LUKSO](../build/token-economics.md) · [Gasless onboarding architecture](../architecture/gasless-onboarding-patterns.md)
