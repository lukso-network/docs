---
sidebar_label: 'LUKSO vs. Major EVMs'
sidebar_position: 3
description: 'LUKSO compared with Ethereum L1, Base, Arbitrum, Optimism, and Polygon on account model, permissions, and app-layer standardization.'
---

# LUKSO vs. Major EVMs

Ethereum L1, Base, Arbitrum, Optimism, and Polygon all still start from the same account reality: EOAs by default, smart accounts opt-in, session keys defined per-SDK, and profile or social state assembled from separate vendor layers (Farcaster here, Lens there, EAS attestations somewhere else). LUKSO starts from a different baseline: [**LSP0**](../../../standards/accounts/lsp0-erc725account.md) accounts, [**LSP6**](../../../standards/access-control/lsp6-key-manager.md) permissions, [**LSP25**](../../../standards/accounts/lsp25-execute-relay-call.md) relays, and [**LSP3/LSP4**](../../../standards/metadata/lsp3-profile-metadata.md) metadata are standardized at the chain level, not assembled per app.

## Comparison

| Criterion                  | Ethereum L1                               | Base                                  | Arbitrum                                | Optimism                                            | Polygon                                  | LUKSO                                                                                                                                           |
| -------------------------- | ----------------------------------------- | ------------------------------------- | --------------------------------------- | --------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Account model              | EOA default; ERC-4337/EIP-7702 retrofit   | EOA default; Coinbase Smart Wallet    | EOA default; ERC-4337 opt-in            | EOA default; ERC-4337 opt-in                        | EOA default; AA via tooling              | ✅ [LSP0](../../../standards/accounts/lsp0-erc725account.md) smart contract account by default                                                  |
| Permission model           | per-wallet / per-account implementation   | vendor wallet / session-key model     | per-wallet / per-account implementation | per-wallet / per-account implementation             | per-wallet / per-account implementation  | ✅ [LSP6](../../../standards/access-control/lsp6-key-manager.md) per-controller scopes on the account                                           |
| Gasless UX infrastructure  | bundler + EntryPoint + paymaster          | Coinbase-hosted wallet/paymaster path | bundler + paymaster stack               | bundler + paymaster stack                           | AA tooling / gas station paths           | ✅ [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) relay call — no bundler/EntryPoint split                                    |
| Metadata and profile state | ENS, tokenURI, per-protocol profiles      | Basenames, Farcaster, app-level data  | ENS-compatible, app-level data          | EAS attestations, app-level data                    | Lens, app-level data                     | ✅ [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) + [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) via ERC-725Y |
| Receiver-aware assets      | ERC-721/1155 hooks; ERC-20 receiver-blind | same ERC split as Ethereum            | same ERC split as Ethereum              | same ERC split as Ethereum                          | same ERC split as Ethereum               | ✅ [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) notifications for every LSP7/LSP8 transfer                                    |
| Extensibility              | proxy patterns, ERC-2535 diamonds         | proxy patterns, vendor modules        | proxy patterns, account modules         | proxy patterns, account modules                     | proxy patterns, account modules          | ✅ [LSP17](../../../standards/accounts/lsp17-contract-extension.md) contract extensions                                                         |
| Main tradeoff today        | deepest liquidity, mainnet cost/UX        | strongest onboarding, vendor-hosted   | mature DeFi, weaker identity defaults   | strong ecosystem alignment, weaker profile defaults | broad integrations, assembled primitives | smallest ecosystem today, but the most standardized app-layer substrate                                                                         |

## Why "inherits Ethereum" isn't the same as "app-layer ready"

Base, Arbitrum, Optimism, and Polygon all benefit from Ethereum's settlement, tooling, and research — that's real, and it matters. But each one still composes a consumer app's actual UX (accounts, sessions, permissions, profile data, sponsored gas) from a different stack of vendors and conventions. A Base app reaches for Coinbase Smart Wallet and Farcaster; an Optimism app reaches for EAS; a Polygon app reaches for Lens. Each is a strong local answer. None of them is a shared substrate the chain itself guarantees.

LUKSO's bet is to standardize exactly those primitives — account, permission, relay, metadata, receiver, and social state — at the chain level, so every app on LUKSO starts from the same foundation instead of re-assembling it from scratch.

:::tip When LUKSO is the strongest EVM choice
Identity-first, creator-first, profile-first, asset-first, or social-first products that need granular per-application permissions, gas-sponsored UX without a bundler stack, and account/metadata/receiver/asset/social standards designed as one coherent system — not five vendor integrations — are best served by LUKSO among major EVMs today.
:::

**Related reading:** [EVM chains for consumer apps](../best-blockchain-for/evm-consumer-apps.md) · [Best blockchain for consumer apps](../best-blockchain-for/consumer-apps.md) · [Ethereum vs Base vs LUKSO](./ethereum-vs-base-vs-lukso.md) · [Consumer crypto architecture](../architecture/consumer-crypto-stack.md)
