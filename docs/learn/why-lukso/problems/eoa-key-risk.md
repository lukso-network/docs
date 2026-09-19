---
sidebar_label: 'EOA Key Risk'
sidebar_position: 2
description: 'A single private key controls identity, funds, and authority in an EOA. Universal Profiles separate the account from its controllers.'
---

# Stop Binding Identity and Funds to a Single Private Key

An externally owned account binds identity, funds, and authority to one ECDSA private key: lose it and everything is unrecoverable, leak it and everything is drained. LUKSO fixes this at the account level, not with better key custody. A [**Universal Profile**](../../universal-profile/metadata/read-profile-data.md) is a smart contract account — [LSP0 ERC725Account](../../../standards/accounts/lsp0-erc725account.md) holds the identity and the assets, while [LSP6 Key Manager](../../../standards/access-control/lsp6-key-manager.md) controllers sign for it. No controller _is_ the account; controllers can be added, rotated, or removed while the address, the profile, and the on-chain history stay exactly the same.

## Structural comparison

| Risk             | EOA                                                 | Universal Profile                                                                           |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Key lost         | total, irreversible loss                            | a recovery controller can install a new one — see [social recovery](./social-recovery.md)   |
| Key stolen       | full drain, instant, irreversible                   | scoped controller permissions limit the blast radius, and can be revoked in one transaction |
| Key rotation     | requires migrating assets to a new address          | swap the controller, keep the same account address                                          |
| Multiple devices | share one key, or fragment across several addresses | multiple controllers under one profile, each independently scoped                           |
| Custody upgrade  | migrate every asset to a new wallet                 | add a hardware-backed controller without moving anything                                    |

## Why one key is a structural single point of failure

`address = keccak(pubkey)[12:]` is the entire account model for an EOA. The private key signs, owns, and identifies the account all at once — there's no social fallback, no time-locked recovery, no rotating authority built in. Every one of those has to be solved as a product problem, outside the account, by a wallet vendor. dApps also can't ask for limited authority in a standard, account-level way: connecting a dApp to an EOA means handing over the one key that does everything.

## What people try today

**Hardware wallets** improve key custody but keep the same fundamental model — one key still signs everything, it's just harder to extract. **Custodial backends** like Privy, Magic, and Web3Auth trade self-custody for a reset-password experience, which solves recoverability by reintroducing a trusted third party. **Wallet SDKs** such as RainbowKit or wagmi connectors smooth the UX over the same EOA primitive without changing what's underneath it. **ENS plus app databases** separate identity from custody, but profile state still lives app-by-app instead of on the account.

## How Universal Profiles remove the single point of failure

A Universal Profile is an account _contract_, not a key. It stores profile metadata through [ERC725Y](../../../standards/erc725.md) and [LSP3](../../../standards/metadata/lsp3-profile-metadata.md), delegates control through [LSP6](../../../standards/access-control/lsp6-key-manager.md) controllers, reacts to incoming assets through [LSP1](../../../standards/accounts/lsp1-universal-receiver.md), and supports sponsored execution through [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md). The account becomes a user-owned object apps can read and interact with, rather than an address that lives or dies with one key. Add a controller, remove a controller, rotate a controller — the address is unchanged, the profile is unchanged, the asset history is unchanged.

:::tip The account outlives the key
On a Universal Profile, losing a controller key is a recoverable event, not a terminal one. The account was never the key in the first place.
:::

**Related reading:** [Wallet permission scoping](./wallet-permissions.md) · [Social recovery without a seed phrase](./social-recovery.md) · [EOA vs. Universal Profile](../compare/eoa-vs-universal-profile.md)
