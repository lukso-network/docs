---
sidebar_label: 'EOA vs. Universal Profile'
sidebar_position: 4
description: 'Externally owned accounts compared with LUKSO Universal Profiles across identity, permissions, recovery, signing, and gasless execution, feature by feature.'
---

# EOA vs. Universal Profile

An externally owned account (EOA) is one private key and one address — portable across every EVM chain, but with no metadata, no per-app permissions, no recovery path, and no receiver hooks. A [**Universal Profile**](../../universal-profile/metadata/read-profile-data.md) is a smart contract account implementing [LSP0 ERC725Account](../../../standards/accounts/lsp0-erc725account.md): [LSP6 Key Manager](../../../standards/access-control/lsp6-key-manager.md) for scoped controller permissions, [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) for asset-receipt awareness, [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) for on-chain profile metadata, and [LSP20](../../../standards/accounts/lsp20-call-verification.md) for inline call verification. Where an EOA is a bare signer, a Universal Profile is an account-shaped product out of the box.

## Structural comparison

| Feature                          | EOA                                       | Universal Profile                                                                                              |
| -------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Account type                     | key pair                                  | smart contract ([LSP0](../../../standards/accounts/lsp0-erc725account.md))                                     |
| Identity                         | address only, off-chain profile elsewhere | [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) profile metadata + asset inventories, on-chain    |
| Controllers                      | exactly one private key                   | many, each with independently scoped [LSP6](../../../standards/access-control/lsp6-key-manager.md) permissions |
| Recovery                         | seed phrase — a single point of failure   | policy expressed through controllers, devices, and trusted contracts                                           |
| Signing                          | `ecrecover`                               | `isValidSignature` (ERC-1271, contract-native)                                                                 |
| Gasless transactions             | needs an external forwarder / paymaster   | native relay execution via [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md)                    |
| Receiver hooks                   | none                                      | [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) `universalReceiver` + delegate                  |
| `msg.sender` at target contracts | the EOA's address                         | the profile contract's own address                                                                             |

## An account, not just a signer

A raw EOA is the minimum a chain can express: `address = keccak(pubkey)[12:]`, one key, one signer. Everything a user-facing product needs on top — profile, permissions, recovery, notifications — has to be bolted on by the app, off-chain, per project.

A Universal Profile ships all of it as the account itself. [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) gives every profile a name, image, and links that any dApp can read the same way. [LSP6](../../../standards/access-control/lsp6-key-manager.md) lets a user grant one controller "transfer this token to this pool" and another controller "update this playlist" — narrow, revocable, auditable, instead of one key that can do everything. [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) means the profile knows the moment it receives an asset and can react — register it, forward it, or reject it — without a separate indexing service.

## Gasless by default, not by integration

New users don't need to understand "gas" before they can use an app. A Universal Profile executes relayed transactions natively through [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) — no custom forwarder contract, no per-app paymaster integration, no forcing users to acquire native currency before their first interaction. That removes the entire onboarding funnel of downloading a wallet, buying crypto, and funding an address just to try a dApp.

:::tip When a Universal Profile is the right call
Any product where the account carries identity, permissions, or recovery as part of the experience should build on Universal Profiles. An EOA remains the right choice only when "one private key controls one address" is itself the feature you're building around — pure cross-chain signer plumbing, hardware-wallet-anchored flows.
:::

**Related reading:** [The EOA key-risk problem](../problems/eoa-key-risk.md) · [Social recovery without a seed phrase](../problems/social-recovery.md) · [Wallet permission scoping](../problems/wallet-permissions.md) · [Benefits of the LUKSO standards](../../benefits-lukso-standards.md)
