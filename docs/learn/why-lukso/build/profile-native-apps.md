---
sidebar_label: 'Profile-Native Apps'
sidebar_position: 4
description: 'Build apps on LUKSO where identity is the account, inventory is on-chain, and the social graph is portable — LSP3, LSP5, LSP12, and LSP26.'
---

# Build Profile-Native Apps on LUKSO

A profile-native app reads the account, not its own database. Name, avatar, owned assets, and created assets live directly on the [Universal Profile](../compare/eoa-vs-universal-profile.md) under standardized [**LSP3**](../../../standards/metadata/lsp3-profile-metadata.md), [**LSP5**](../../../standards/metadata/lsp5-received-assets.md), and [**LSP12**](../../../standards/metadata/lsp12-issued-assets.md) keys; followers are indexed by [**LSP26**](../../../standards/accounts/lsp26-follower-system.md), a separate chain-level registry contract keyed by address rather than data stored on the profile itself. Either way, your app composes existing primitives instead of mirroring them into a separate login system.

## The stack

| Standard                                                       | Role                                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [LSP0](../../../standards/accounts/lsp0-erc725account.md)      | The account itself                                                        |
| [LSP3](../../../standards/metadata/lsp3-profile-metadata.md)   | Profile-level metadata — name, avatar, bio, links                         |
| [LSP5](../../../standards/metadata/lsp5-received-assets.md)    | Received-assets inventory registry                                        |
| [LSP12](../../../standards/metadata/lsp12-issued-assets.md)    | Issued-assets registry, for creators                                      |
| [LSP26](../../../standards/accounts/lsp26-follower-system.md)  | The follower graph                                                        |
| [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) | Receiver hook — LSP5 entries get written automatically when assets arrive |

## When this vertical fits

You're building anything social-shaped on LUKSO: a feed reader, a creator marketplace, a collector index, a follow-based discovery surface. The product _is_ a way to consume what the profile graph already publishes — no per-app login flow, no separate identity database to keep in sync.

:::tip Why this matters for distribution
Because [LSP3](../../../standards/metadata/lsp3-profile-metadata.md), [LSP5](../../../standards/metadata/lsp5-received-assets.md), [LSP12](../../../standards/metadata/lsp12-issued-assets.md), and [LSP26](../../../standards/accounts/lsp26-follower-system.md) are chain-level standards rather than protocol-specific conventions, any new app that speaks the LSP surface reads a user's existing identity, inventory, and social graph on day one — no cold-start problem, no asking users to rebuild a profile from scratch.
:::

**Related reading:** [EOA vs Universal Profile](../compare/eoa-vs-universal-profile.md) · [The EOA key-risk problem](../problems/eoa-key-risk.md) · [Best blockchain for social apps](../best-blockchain-for/social-apps.md) · [On-chain identity architecture](../architecture/onchain-identity.md)
