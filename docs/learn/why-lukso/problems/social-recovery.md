---
sidebar_label: 'Social Recovery'
sidebar_position: 11
description: 'Recovery should be a permission graph, not a seed phrase. LSP11 lets guardians install a new controller with no residual key above the system.'
---

# Recover an Account Without a Seed Phrase

Recovery in the EOA world means one seed phrase — lose it and there is no fallback, no guardian, no delay, nothing to appeal to. [**LSP11 Basic Social Recovery**](../../../contracts/contracts/LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.md) turns recovery into a permission the [Universal Profile](../../universal-profile/metadata/read-profile-data.md) itself enforces: a set of guardian addresses vote to install a new controller once a configurable threshold is met, and that recovery contract only ever holds the specific [LSP6](../../../standards/access-control/lsp6-key-manager.md) permission it needs — typically the ability to add and remove controllers, nothing more.

## Before / after

| Recovery model            | Mechanism                                                                       | Residual key risk                                                                       |
| ------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| EOA seed phrase           | one phrase, memorized or stored                                                 | total loss if lost, total compromise if leaked                                          |
| Argent guardians          | bespoke contract, guardian set plus time lock                                   | reference implementation, hard to port to other wallets                                 |
| Safe owner rotation       | multisig vote to add or remove owners                                           | the multisig itself is the recovery primitive                                           |
| ERC-4337 recovery modules | validator module attached per wallet SDK                                        | module-by-module, no shared vocabulary                                                  |
| LSP11 + LSP6              | guardian threshold installs a new controller via the `ADDCONTROLLER` permission | the recovery contract holds only the permission it needs; daily controllers stay narrow |

## Why a single phrase is the wrong shape for recovery

An EOA has exactly one private key. Lose it, lose everything — there's no social fallback, no time-locked recovery, no rotating authority built into the account model. Those are all product problems that wallet vendors have had to solve outside the account, one bespoke implementation at a time. Smart-account recovery is possible today, but every model encodes its own rules and most are non-interoperable — migrating recovery from one wallet to another usually means migrating the whole account, not just the recovery policy.

## What people try today

**Argent's guardian model** has a guardian set sign a time-locked recovery request through custom contract logic. It's the reference implementation for social recovery, but it's hard to port outside Argent's own wallet. **Safe's owner rotation** uses the multisig itself as the recovery primitive — owners vote to add or remove owners, which works well but ties recovery to holding a Safe specifically. **ERC-4337 recovery modules** attach validator logic to a smart account, but each wallet SDK defines its own module shape, so there's no shared recovery vocabulary across products. **Custodial recovery** from providers like Privy, Magic, and Web3Auth gives a reset-password experience, trading away some self-custody for predictability.

## How LSP11 and LSP6 express recovery as permissions

A Universal Profile is one account with many controllers. LSP6 lets a project register a recovery controller — or a full recovery contract like LSP11 that enforces a guardian threshold, a delay, or a voting policy — with exactly the permissions it needs to do its job, typically just the ability to add and remove other controllers. Recovery becomes a design choice expressed as permissions, not a hardcoded wallet feature. Day-to-day controllers stay narrow in scope; the recovery controller stays cold and rarely used. If a daily key is lost, the recovery controller adds a replacement and removes the old one — the account address never changes, and neither does the profile or its history.

:::tip Recovery is only real without a residual key
A recovery model only holds up when there's no leftover EOA key sitting above the permission system — otherwise a stolen key can override any recovery configuration you've set up. LSP11 guardians authorize a new controller through LSP6; there's no master key left to bypass them.
:::

**Related reading:** [Wallet permission scoping](./wallet-permissions.md) · [The EOA key-risk problem](./eoa-key-risk.md) · [EOA vs. Universal Profile](../compare/eoa-vs-universal-profile.md) · [LSP14 Ownable 2-Step](../../../standards/access-control/lsp14-ownable-2-step.md)
