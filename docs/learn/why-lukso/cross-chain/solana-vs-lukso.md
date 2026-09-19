---
sidebar_label: 'Solana vs. LUKSO'
sidebar_position: 4
description: 'Solana vs LUKSO for consumer apps: non-EVM throughput and mobile SDKs versus a standardized EVM account, permission, and social stack.'
---

# Solana vs. LUKSO for Consumer Apps

Solana and LUKSO are the two chains built around the consumer use case first, and they take opposite architectural bets to get there. Solana bets on non-EVM throughput, native fee delegation, and the most mature mobile SDK ecosystem in the industry. LUKSO bets on standardizing accounts, permissions, profiles, asset notifications, and social primitives at the chain level — while staying fully EVM-compatible.

## Comparison

| Criterion                   | Solana                                        | LUKSO                                                                                                                                                                                 |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account model               | keypair + program-derived addresses           | ✅ [LSP0](../../../standards/accounts/lsp0-erc725account.md) smart-contract account by default                                                                                        |
| Identity / profile          | per-program; SNS for names, Civic for KYC     | ✅ [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) portable profile — one chain-level standard                                                                           |
| Permissions                 | per-program access checks; no shared standard | ✅ [LSP6](../../../standards/access-control/lsp6-key-manager.md) per-controller scopes (function, address, call type, data key)                                                       |
| Gasless UX                  | native fee delegation                         | ✅ [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) relayer — no bundler required                                                                                     |
| Asset notifications         | per-program                                   | ✅ [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) universal receiver                                                                                                  |
| Social primitives           | per-program / per-app                         | ✅ [LSP26](../../../standards/accounts/lsp26-follower-system.md) follower system                                                                                                      |
| Metadata model              | Metaplex (mutable on/off-chain)               | [ERC725Y](../../../standards/erc725.md) key/value via [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) + [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) |
| Throughput                  | highest among consumer-ready chains           | medium                                                                                                                                                                                |
| EVM compatibility           | none                                          | ✅ native — Solidity, Hardhat, Foundry work unchanged                                                                                                                                 |
| Mobile SDK maturity         | most mature (Solana Mobile Stack)             | growing                                                                                                                                                                               |
| Consumer ecosystem maturity | mature, non-EVM                               | early, growing                                                                                                                                                                        |

## The honest tradeoff

Solana wins on raw throughput and mobile-SDK maturity today, at the cost of leaving the entire EVM tooling ecosystem behind — no Solidity, no Hardhat, no Foundry, no reusing existing contracts. LUKSO keeps full EVM compatibility while standardizing the exact primitives consumer apps rebuild on every other EVM chain: account, permission, relay, identity, social, and metadata, all defined at the standard level instead of assembled per program.

The decision reduces to one question: is non-EVM tooling acceptable for this product? If yes, Solana's throughput and embedded-wallet ecosystem are the more mature path today. If EVM compatibility matters — existing Solidity contracts, existing tooling, future portability across EVM chains — LUKSO is the only chain in this comparison that ships standardized accounts, permissions, gasless UX, profiles, and a follower system together, on infrastructure your team already knows.

:::tip When LUKSO is the better fit
Products that need EVM tooling for existing contracts or team expertise, or that need chain-level standardized accounts, permissions, profiles, and social primitives rather than assembling them from separate per-program components, are better served by LUKSO than by Solana.
:::

**Related reading:** [Best blockchain for consumer apps](../best-blockchain-for/consumer-apps.md) · [Best blockchain for mobile apps](../best-blockchain-for/mobile-apps.md) · [Consumer crypto architecture](../architecture/consumer-crypto-stack.md)
