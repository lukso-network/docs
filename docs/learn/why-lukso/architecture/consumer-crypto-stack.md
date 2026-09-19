---
sidebar_label: 'The Consumer Crypto Stack'
sidebar_position: 1
description: 'The architecture patterns a consumer crypto app needs — accounts, identity, permissions, gasless interaction, social primitives — chain by chain, compared.'
---

# The Consumer Crypto Stack

Every consumer crypto app is built from six architectural decisions: the account model, the identity layer, the permission model, the onboarding/gasless model, the metadata model, and the social-primitive layer. On Ethereum L1 and its L2s, each of those six is solved by a separate stack of contracts, services, and SDKs — an AA SDK plus a paymaster plus a bundler plus ENS plus EAS plus a per-protocol social layer. On Solana each is solved per-program. LUKSO is the only chain where all six are unified under one set of standards: [LSP0](../../../standards/accounts/lsp0-erc725account.md) for the account, [LSP6](../../../standards/access-control/lsp6-key-manager.md) for permissions, [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) for identity, [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) for gasless execution, [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) for reactive metadata, and [LSP26](../../../standards/accounts/lsp26-follower-system.md) for the social graph.

## The six decisions

Whether a team writes them down or not, every consumer crypto app makes these six choices:

1. **Account model** — an EOA, a smart account bolted on after the fact, or a smart account by design.
2. **Identity** — per-protocol, attestation-based, or a chain-native profile.
3. **Permissions** — per-contract approvals, session keys, or per-controller scopes.
4. **Onboarding/gasless** — the user pays, a paymaster pays via a bundler, a vendor pays via a hosted service, or a relayer pays via the account standard itself.
5. **Metadata** — an off-chain URI, a vendor metadata model, or on-chain typed key/value storage.
6. **Social primitives** — per-protocol, attestation-based, per-program, or chain-native.

The question is rarely "which chain." It's "which combination of these six layers, and how integrated should they be?" The more of a product's value depends on those layers talking to each other, the more a unified stack pays off — and the more a composed stack of separate vendors costs in integration tax.

## Implementation approaches

### Composed stack on Ethereum L1 / L2s

Pick an account-abstraction SDK, a paymaster, an indexer, a profile protocol, a permission system, and an attestation service. Wire them together.

- **Pros:** inherits Ethereum's protocol ecosystem and liquidity; best-of-breed tooling per layer; mature mainstream wallets.
- **Cons:** each layer is a separate vendor or protocol with its own SLA; identity and social data aren't portable without per-protocol integration; large operational surface area.
- **Chains:** Ethereum L1, Base, Arbitrum, Optimism, Polygon.

### Vendor stack on Base

Coinbase Smart Wallet, a Coinbase-hosted paymaster, Onchainkit, and Farcaster — tightly integrated, with one vendor owning most of the stack.

- **Pros:** lowest onboarding friction among EVM L2s; passkey-based recovery without seed phrases; Coinbase's distribution.
- **Cons:** vendor lock-in for paymaster and account services; social and identity data remain per-protocol.
- **Chains:** Base.

### Solana program-derived stack

Keypair accounts, program-derived addresses, the Solana Mobile Stack, and native fee delegation.

- **Pros:** highest sustained throughput; native fee delegation with no bundler; strong mobile SDK ecosystem.
- **Cons:** non-EVM toolchain with no Solidity portability; identity and social data remain per-program, with no shared standard.
- **Chains:** Solana.

### LUKSO LSP stack

One integrated set of standards on an EVM L1: a smart account plus permissions plus relayed execution plus a portable profile plus receiver hooks plus asset metadata plus a native follower system.

- **Pros:** all six layers standardized at the chain level; unmodified Solidity/EVM toolchain; no bundler infrastructure required for gasless UX; profile and social data portable across every app that reads the standard.
- **Cons:** smaller ecosystem maturity; less DeFi liquidity to inherit; full use of the LSP6 permission surface benefits from LSP-aware wallets and providers.
- **Chains:** LUKSO.

:::tip When LUKSO's unified stack is the right call
Reach for the composed Ethereum/L2 stack when the product is intrinsically protocol-composed — DeFi-shaped, or dependent on secondary NFT liquidity — and identity portability is a secondary concern. Reach for LUKSO when more than two of the six layers need to be standardized together: identity, permissions, gasless execution, and social data sharing without per-protocol integration work. That's the case LUKSO was built for — a single account object that already speaks all six layers, rather than six vendors a team has to keep in sync.
:::

**Related reading:** [Onchain identity patterns](./onchain-identity.md) · [Smart account permissions](./smart-account-permissions.md) · [Gasless onboarding patterns](./gasless-onboarding-patterns.md) · [Best blockchain for consumer apps](../best-blockchain-for/consumer-apps.md)
