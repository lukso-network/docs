---
sidebar_label: 'Scoped Wallet Permissions'
sidebar_position: 12
description: 'Connecting a dApp usually hands over the whole account. LSP6 Key Manager grants per-controller, per-call, revocable permissions on-chain.'
---

# Grant a dApp Less Than the Whole Account

Connect most wallets to a dApp and the dApp effectively gets the whole account — there's no standard way to ask for less. Session-key systems exist, but each ships as a different vendor SDK with its own validator shape, so nothing is portable across wallets. [**LSP6 Key Manager**](../../../standards/access-control/lsp6-key-manager.md) makes scoped access a standard, on-chain vocabulary every [Universal Profile](../../universal-profile/metadata/read-profile-data.md) speaks: a permission bitfield per controller, plus optional allowed calls (target, standard, selector) and allowed [ERC725Y](../../../standards/erc725.md) data keys. Granting a narrow session controller is one transaction. Revoking it is one transaction. And because the profile checks permissions on every call, the scope is enforced on-chain — not just hidden behind a wallet UI that a compromised frontend could ignore.

## Before / after

| Model                       | Scope granularity                                       | Enforced where                                            | Portable across wallets              |
| --------------------------- | ------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------ |
| Default wallet connect      | full account                                            | nowhere — the dApp gets whatever it asks the user to sign | n/a                                  |
| Argent session keys         | per-contract allowlist                                  | wallet-specific validator                                 | no                                   |
| ERC-4337 validation modules | pluggable per wallet                                    | validator contract                                        | mechanism is standard, policy is not |
| Zodiac scope guards (Safe)  | module-level                                            | Safe module                                               | Safe-only                            |
| LSP6 Key Manager            | permission bitfield + allowed calls + allowed data keys | the account contract itself                               | every Universal Profile              |

## Why "connect wallet" defaults to full access

EOAs sign every action with the same key, so there's no narrower unit of authority to hand out in the first place. Even most smart wallets expose the full account on connect, because there's no standard way for a dApp to ask for something less than everything. When fine-grained authority does exist today, it usually lives in custom validator code written per wallet — interoperability is poor, and revocation tends to be all-or-nothing rather than scoped to the one controller that should lose access.

## What people try today

**Argent session keys** issue temporary signing keys scoped to an allowed-contract list, but the mechanism is vendor-specific to Argent's wallet. **ERC-4337 validation modules** make pluggable validators possible, which standardizes the _mechanism_ for defining what a key may do, without standardizing the _policy vocabulary_ itself — every wallet SDK still defines its own shape. **Zodiac scope guards** on Safe gate access at the module level, which is powerful but complex to author and scoped entirely to Safe accounts. **Off-chain delegation** via signed capability objects is flexible, but enforcement depends entirely on the relayer honoring the capability — there's no on-chain check backing it up.

## How LSP6 makes scope a standard vocabulary

LSP6 Key Manager assigns each controller a permission bitfield — `CALL`, `SETDATA`, `TRANSFERVALUE`, `ADDCONTROLLER`, `SIGN`, and more — plus optional allowed calls (target contract, standard interface, function selector) and allowed ERC725Y data keys:

```
Controller: app session key 0xabc...
Permission: CALL
AllowedCalls:
  - target: 0x<token>, standard: LSP7, selector: transfer
```

Granting an app a session controller is one transaction. Revoking it is one transaction. The Universal Profile checks permissions on every call through [LSP20](../../../standards/accounts/lsp20-call-verification.md), so the scope is enforced on-chain, not at a wallet UI layer that a malicious or compromised frontend could bypass. Core LSP6 has no controller-expiry field — a controller's permissions stay live until someone explicitly revokes them in a transaction. An app can layer its own off-chain "session" convention on top (e.g. stop using a key after N hours), but that's an app-level policy, not something the account itself enforces; a direct call with that controller's key still works until the on-chain permission is actually revoked.

:::tip Ask for less, by default
A Universal Profile lets a dApp request exactly the permission it needs — one token, one function, one target contract — instead of defaulting to full account access just because there was no standard way to ask for less.
:::

**Related reading:** [The ERC-20 approval problem](./erc20-approval-risks.md) · [Social recovery without a seed phrase](./social-recovery.md) · [The EOA key-risk problem](./eoa-key-risk.md) · [Grant controller permissions](../../universal-profile/key-manager/grant-permissions.md) · [Get controller permissions](../../universal-profile/key-manager/get-controller-permissions.md)
