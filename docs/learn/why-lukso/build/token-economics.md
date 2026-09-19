---
sidebar_label: 'Token Economics'
sidebar_position: 6
description: 'Build fungible token economics on LUKSO with LSP7 and LSP4 — tokens that integrate with profile identity instead of sitting on a detached balance sheet.'
---

# Build Token Economics on LUKSO

Token economics on LSP isn't a rebuild of ERC20 — it's the same balance-and-transfer model with everything you used to bolt on afterward baked in from the start. [**LSP7 Digital Asset**](../../../standards/tokens/LSP7-Digital-Asset.md) ships transfer with [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) receiver hooks, operator authorization, and transfer context, paired with [**LSP4**](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) for typed metadata under [ERC725Y](../../../standards/erc725.md). Because token holders are [Universal Profiles](../compare/eoa-vs-universal-profile.md) by default, distribution, airdrops, and holder-gated features integrate naturally with [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) identity, [LSP5](../../../standards/metadata/lsp5-received-assets.md) received-assets tracking, and the [LSP26](../../../standards/accounts/lsp26-follower-system.md) follower graph — instead of a balance sheet detached from who actually holds it.

## The stack

| Standard                                                         | Role                                                                                               |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [LSP7](../../../standards/tokens/LSP7-Digital-Asset.md)          | Balances, transfers, operator authorization                                                        |
| [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) | Asset metadata under [ERC725Y](../../../standards/erc725.md) typed keys                            |
| [LSP1](../../../standards/accounts/lsp1-universal-receiver.md)   | Fires automatically on recipients you control (Universal Profile delegates handle this by default) |
| [LSP6](../../../standards/access-control/lsp6-key-manager.md)    | Controller-side permission scoping, when account-level authorization policy matters                |

## When this vertical fits

You're shipping a fungible asset that participates in app or profile UX: a creator coin, a governance token with proposal links in its metadata, an in-game currency that needs to notify vaults on deposit, or a membership asset where every transfer should fire a hook on the recipient's profile.

:::info When ERC20 is still the right call
When the minimum-interface property is the actual design goal. ERC20 ships exactly balances, a transfer, an allowance pattern, and three metadata fields — no recipient call, no reentrancy surface on transfer, no `force` flag to decide on per integration. If a token's entire value proposition is that downstream code can integrate it with zero opinions about behavior beyond "moves balance, fires an event," ERC20 is the right interface, and the absence of an LSP1 hook is a feature rather than a gap.
:::

**Related reading:** [ERC20 vs LSP7](../compare/erc20-vs-lsp7.md) · [The ERC20 approval problem](../problems/erc20-approval-risks.md) · [ERC20's missing transfer hooks](../problems/erc20-transfer-hooks.md) · [Migrate ERC20 to LSP7](../../migrate/migrate-erc20-to-lsp7.md)
