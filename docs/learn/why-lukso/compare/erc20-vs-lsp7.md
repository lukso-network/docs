---
sidebar_label: 'ERC20 vs. LSP7'
sidebar_position: 1
description: 'ERC20 vs LSP7 Digital Asset compared function by function: transfer signatures, receiver hooks, operator authorization, and on-chain metadata storage.'
---

# ERC20 vs. LSP7 Digital Asset

ERC20 is Ethereum's minimum fungible-token interface: six functions, two events, no receiver hook, no structured metadata, no per-transfer context. [**LSP7 Digital Asset**](../../../standards/tokens/LSP7-Digital-Asset.md) keeps the exact same mental model — balances, transfers, allowances — and then fixes everything that ERC20 leaves for every integrator to rebuild: a `bytes data` payload on every transfer, [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) notifications fired on sender **and** recipient, operator authorization that plugs into the [LSP6 Key Manager](../../../standards/access-control/lsp6-key-manager.md) permission system, and structured [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) metadata instead of three bare getter functions.

## Function-by-function comparison

| Feature                        | ERC20                                     | LSP7                                                                                                                                                       |
| ------------------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Balance model                  | `balanceOf(address) → uint256`            | `balanceOf(address) → uint256`                                                                                                                             |
| Transfer signature             | `transfer(to, amount)`                    | `transfer(from, to, amount, force, data)`                                                                                                                  |
| Recipient notification         | ❌ none                                   | ✅ [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) `universalReceiver` on both sender and recipient, when they're LSP1-supporting contracts |
| Transfer context payload       | ❌ none — bolted on via wrapper contracts | ✅ native `bytes data` on every transfer                                                                                                                   |
| Authorization                  | `approve` / `allowance` / `transferFrom`  | `authorizeOperator` — scoped, revocable, and notifies the operator                                                                                         |
| Metadata                       | `name()` / `symbol()` / `decimals()` only | ✅ unlimited [ERC725Y](../../../standards/erc725.md) key-value storage under [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md)              |
| Accidental-transfer protection | ❌ none                                   | ✅ required `force` flag — `force=false` rejects both EOAs and non-LSP1 contracts; `force=true` permits either                                             |
| Batch operations               | ❌ none natively                          | ✅ `transferBatch(...)`                                                                                                                                    |

## Why the LSP1 hook matters more than it looks

ERC20's biggest structural gap isn't the missing metadata — it's that a token contract has no way to tell the recipient "you just received tokens." That silence is why the `approve` → `transferFrom` two-step exists at all: contracts can't react to incoming value, so they have to be asked for permission in advance instead.

LSP7 closes that gap directly. Every transfer fires [`universalReceiver`](../../../standards/accounts/lsp1-universal-receiver.md) on both sides through LSP1, for any sender or recipient that's a contract implementing it (EOAs, having no code to call, are unaffected either way). A [Universal Profile](../../universal-profile/metadata/read-profile-data.md) can register received tokens automatically, forward a share to a savings vault, or reject a transfer outright by reverting inside the hook — logic that on ERC20 requires a custom wrapper contract deployed and audited per project. On LUKSO it's the default behavior of every LSP7 asset moving between LSP1-aware accounts.

## Authorization is scoped at the account, not the token

`authorizeOperator` is still amount-scoped, same as ERC20's `approve` — LSP7 doesn't pretend otherwise. What actually changes the security story is where that call originates. On a [Universal Profile](../../universal-profile/key-manager/grant-permissions.md), the controller invoking `authorizeOperator` is itself bound by [LSP6](../../../standards/access-control/lsp6-key-manager.md) permissions — allowed calls, allowed data keys, value limits, and one-transaction revocation. Instead of trusting every token contract you've ever approved forever, the account decides what each app controller may do, and can cut it off instantly.

:::tip When to reach for LSP7
Any product that wants recipient-aware transfers, structured on-chain metadata, or account-scoped authorization should build on LSP7 from day one — it costs nothing over ERC20 and removes an entire category of integration work later.
:::

## Migrating an existing ERC20 token

See the hands-on guide: [Migrate ERC20 to LSP7](../../migrate/migrate-erc20-to-lsp7.md).

**Related reading:** [The ERC20 approval problem](../problems/erc20-approval-risks.md) · [ERC20's missing transfer hooks](../problems/erc20-transfer-hooks.md) · [Choosing between LSP7 and LSP8](../../digital-assets/choose-lsp7-vs-lsp8.md)
