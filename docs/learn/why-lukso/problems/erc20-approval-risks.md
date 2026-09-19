---
sidebar_label: 'ERC20 Approval Risk'
sidebar_position: 4
description: 'ERC-20 approve grants standing, often unlimited, allowances. LSP7 moves scope enforcement to LSP6 account permissions instead.'
---

# Stop Granting Standing Allowances to Token Contracts

ERC-20's `approve(spender, amount)` asks a token contract to trust a spender indefinitely — most dApps request max-uint to avoid a second prompt, and that allowance sits live on-chain until someone manually revokes it. LSP7's `authorizeOperator` is still amount-scoped, exactly like `approve`, and revoking an operator allowance once it's been granted still takes the same `revokeOperator` call ERC-20 requires — LUKSO isn't pretending otherwise. What changes is _who gets to create that allowance in the first place_: on a [Universal Profile](../../universal-profile/metadata/read-profile-data.md), the controller calling `authorizeOperator` is itself bound by [LSP6 Key Manager](../../../standards/access-control/lsp6-key-manager.md) permissions, so a compromised or over-trusted app controller can be cut off from granting _new_ allowances in one transaction — a layer of defense ERC-20 has no equivalent for, even though it doesn't reach back and undo an allowance that controller already created.

## Before / after

| Mechanism                                | ERC-20                                                | LSP7 + LSP6                                                                                                                                                |
| ---------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Grant call                               | `approve(spender, amount)`                            | `authorizeOperator(operator, amount, data)`                                                                                                                |
| Common default                           | dApps request max-uint to skip re-prompting           | still amount-scoped by convention — not fixed by LSP7 alone                                                                                                |
| Who can grant new approvals              | anyone holding the private key, forever               | only a controller whose LSP6 permissions allow calling `authorizeOperator` — revocable at the account level                                                |
| Revoking an existing allowance           | separate `approve(spender, 0)` transaction, per token | separate `revokeOperator(operator, tokenOwner, false, "0x")` transaction, per token — same shape as ERC-20, LSP7 doesn't change this                       |
| Stopping a controller from granting more | not applicable — ERC-20 has no controller layer       | revoke the controller's LSP6 permission — one transaction, account-wide, but any operator allowance it already granted stays live until separately revoked |

## Why approve/transferFrom splits intent from execution

`approve` sets an allowance; the spender calls `transferFrom` later, whenever it wants, for any amount up to that allowance. The user signs intent once and never sees the individual executions, so a wallet can't meaningfully explain what it's authorizing beyond a number. Because most dApps request max-uint to avoid asking twice, every approved spender becomes a standing risk — if that spender contract is later upgraded, exploited, or misconfigured, the allowance is already sitting there waiting to be used.

## What people try today

**Revoke flows** like revoke.cash and wallet allowance dashboards are reactive — they require the user to notice and act, after the allowance has already lived on-chain, potentially for months. **EIP-2612 Permit** moves the approval from a transaction into a signature, which is cheaper to give but is still blanket authority that still trusts the spender contract not to misuse it. **Permit2** scopes allowances per transaction and per contract, which helps materially, but only when both the token and the integrating app support it. **Approve-and-call wrapper contracts** add a router in front of the token, which fragments the UX across two contracts without touching the underlying ERC-20 model.

## How LSP6 moves the policy to the account

LSP7's `authorizeOperator` doesn't magically fix amount-scoped allowances — that part of the risk is unchanged. What's different is that on a Universal Profile, the controller invoking `authorizeOperator` is itself governed by LSP6: allowed calls, allowed standards, allowed [ERC725Y](../../../standards/erc725.md) data keys, value limits, all revocable per controller. Instead of asking the token contract to police every future `transferFrom` forever, the account decides what each app controller may invoke, and can cut that controller off in a single transaction — without ever touching a token-level allowance.

:::tip Honest framing, real change
LSP7 operators are still amount-scoped, and an allowance already granted still needs its own `revokeOperator` call — that isn't a magic fix, and LUKSO doesn't claim otherwise. The real shift is one layer up: a session controller's _ability to grant new allowances_ can be switched off in one LSP6 transaction, account-wide — a kill switch ERC-20 simply has no equivalent for, on top of (not instead of) revoking the allowance itself.
:::

**Related reading:** [Wallet permission scoping](./wallet-permissions.md) · [ERC-20's missing transfer hooks](./erc20-transfer-hooks.md) · [ERC-20 explained](../erc-explainers/erc-20.md) · [ERC20 vs. LSP7](../compare/erc20-vs-lsp7.md)
