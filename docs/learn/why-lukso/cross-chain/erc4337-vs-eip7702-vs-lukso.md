---
sidebar_label: 'ERC-4337 vs EIP-7702 vs LUKSO'
sidebar_position: 1
description: 'ERC-4337, EIP-7702, and LUKSO Universal Profiles compared as three answers to what a smart account should be — infrastructure, security, and permissions.'
---

# ERC-4337 vs EIP-7702 vs LUKSO Universal Profiles

Three different answers to "what should a smart account be," and only one of them ships as the ecosystem's own default account. ERC-4337 layers account abstraction on top of Ethereum's EOA-shaped transaction system — a parallel `UserOperation` mempool, an `EntryPoint` singleton, bundlers, paymasters. EIP-7702 lets an EOA delegate to smart-contract code while keeping its address and its root key — the delegation persists until the EOA replaces or clears it, not just for one transaction. LUKSO skips the retrofit: on an unmodified EVM chain, [Universal Profiles](../../../standards/accounts/lsp0-erc725account.md) _are_ the account, with permissions ([LSP6](../../../standards/access-control/lsp6-key-manager.md)) and relayed execution ([LSP25](../../../standards/accounts/lsp25-execute-relay-call.md)) standardized alongside it since mainnet launch in 2023 — not bolted on later as an opt-in SDK choice.

That head start comes with a real tradeoff. ERC-4337 runs on every EVM chain today, and EIP-7702 upgrades an existing EOA in place without asking a user to move anywhere. LUKSO's integrated stack only ships natively on LUKSO. Pick the right one for the reach you actually need.

## No parallel infrastructure to trust

ERC-4337 exists because Ethereum's transaction model can't change at the protocol level, so smart-account behavior gets bolted on above it: a `UserOperation` envelope, a bundler that has to include it, an `EntryPoint` singleton every call routes through, and — if the user shouldn't pay gas — a separate paymaster contract. Each of those is infrastructure a team has to run, rent, or trust. A Universal Profile has none of that between the user and the call: the account contract sits directly on the normal call path, and [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) sponsors execution as a function on the [Key Manager](../../../standards/access-control/lsp6-key-manager.md) every profile already has — no separate paymaster contract to deploy.

## No root key sitting underneath

EIP-7702 is the more conservative move — an EOA delegates to smart-contract code but keeps its private key as the ultimate override. That's a genuine backwards-compatibility win, and also the model's central limitation: the account is only as safe as that one key, permission scoping on top of it is still whatever the delegated implementation invents, and there's no chain-standardized way to revoke or scope a controller. LUKSO's [LSP6 Key Manager](../../../standards/access-control/lsp6-key-manager.md) makes per-controller scopes — function, address, call type, data key — a first-class part of the account standard, not an implementation detail of whichever contract an EOA happens to delegate to this week.

## Structural comparison

| Criterion               | ERC-4337                                                 | EIP-7702                                                                                                | LUKSO Universal Profile                                                                                                                                        |
| ----------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account type            | Smart contract account, EOA still exists                 | EOA with delegated code                                                                                 | Smart contract account ([LSP0](../../../standards/accounts/lsp0-erc725account.md))                                                                             |
| Default on which chains | None — opt-in stack on every EVM chain                   | Per-EOA opt-in on EVM chains supporting EIP-7702                                                        | Ecosystem default on LUKSO — the account type the ecosystem is standardized around, on an unmodified EVM chain                                                 |
| Infrastructure required | Bundler + EntryPoint + paymaster + indexer               | Delegated code alone covers execution; a paymaster + bundler is only needed for the same UX as ERC-4337 | LSP25 relayer submitting to the Key Manager — a single submit-call service, no bundler or EntryPoint                                                           |
| Permission model        | Per-SDK session keys (Biconomy, ZeroDev, Coinbase, Safe) | Inherits delegated implementation; EOA root key overrides                                               | LSP6 per-controller scopes (function, address, call type, data key)                                                                                            |
| Revocation              | Per-SDK; per-session expiry common                       | Per delegated implementation; root key can override                                                     | Single transaction on the account, immediate                                                                                                                   |
| Recovery                | Per-SDK; passkeys in Smart Wallet, modules in Safe       | Inherits delegated implementation                                                                       | Multi-controller / social recovery via LSP6 + [LSP11 Basic Social Recovery](../../../contracts/contracts/LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.md) |
| Gasless UX              | Paymaster + bundler                                      | Delegated code plus any gas-paying sender; paymaster + bundler only if matching ERC-4337's exact flow   | LSP25 relayer submitting to the Key Manager, no bundler                                                                                                        |
| Cross-app portability   | Address portable; permission semantics per-SDK           | Address portable; behavior depends on current delegation                                                | Account, profile, permissions, and social graph portable as one object                                                                                         |
| EVM compatibility       | Works on every EVM chain                                 | Works on EVM chains that adopt the EIP                                                                  | Native on LUKSO; deployable as an EIP-4337-style account on any other EVM chain                                                                                |
| Maturity                | Mature; production across L1 and L2s                     | Recent; rolling out as part of Pectra                                                                   | Production on LUKSO since mainnet (2023)                                                                                                                       |

## When each chain wins

- **ERC-4337** wins when EVM-wide compatibility is the binding constraint and the team already operates, or is willing to rent, bundler and paymaster infrastructure.
- **EIP-7702** wins when backwards compatibility with an existing EOA user base is the priority — users keep their address and gain smart-account behavior on top of it.
- **LUKSO Universal Profile** wins whenever the account standard itself should carry permissions and relayed execution instead of assembling them from separate infrastructure — the common case for identity-, permission-, or gasless-first products, and the reason the LUKSO ecosystem standardizes on it as the default rather than treating it as an add-on.

:::tip When Universal Profiles are the right call
If the product needs the account contract to be the call entry point — clean traces, one standardized permission vocabulary, sponsored execution without extra infrastructure — Universal Profiles deliver that natively. ERC-4337 and EIP-7702 both exist to approximate the same outcome on chains that can't change the account model at the protocol level.
:::

:::info Being honest about the tradeoff
LUKSO's smart-account stack is the most integrated of the three, but it's also the youngest in wall-clock terms and the only one that doesn't run natively across the rest of the EVM. A team that needs day-one reach across every EVM chain still has a real reason to reach for ERC-4337.
:::

**Related reading:** [ERC-4337 vs the LSP account stack](../compare/erc4337-vs-lsp-stack.md) · [ERC-4337 vs EIP-7702](../compare/erc4337-vs-eip7702.md) · [The 4337 extension for Universal Profiles](../../universal-profile/advanced-guides/4337-extension.md) · [Best blockchain for consumer apps](../best-blockchain-for/consumer-apps.md)
