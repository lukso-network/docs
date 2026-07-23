---
sidebar_label: 'Onchain Identity for Dapp Developers'
sidebar_position: 3
description: 'How dapps represent users on-chain: account-as-identity, name resolution, attestations, and portable profiles compared across Ethereum, Solana, and LUKSO.'
---

# Onchain Identity for Dapp Developers

Onchain identity decomposes into three primitives: the account that signs, the name that identifies the account, and the profile or claims attached to it. Ethereum L1 and its L2s lean on EOAs plus ENS plus per-protocol profiles, with EAS as the closest thing to a canonical attestation layer. Solana uses keypairs plus SNS plus per-program profiles. LUKSO is the only EVM chain where the account standard itself carries a portable profile schema with per-controller permissions — [LSP0](../../../standards/accounts/lsp0-erc725account.md) as the account, [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) as the profile, [LSP6](../../../standards/access-control/lsp6-key-manager.md) as the permission layer. Identity isn't a layer bolted on top of the account — it _is_ the account.

## What identity means here

Identity is the answer to "who is doing this." On-chain, that answer is a function of three primitives: the account that signs, the name that identifies it, and the claims or profile attached to it. Different chains separate or fuse those three differently, and that separation is the architectural choice this page walks through.

## Implementation approaches

### EOA + ENS + per-protocol profile (Ethereum L1)

The default Ethereum identity model: an externally owned account, a human-readable name via ENS, and a profile per app or protocol — Lens, Farcaster, Galxe.

- **Pros:** the largest user base and tooling; ENS resolves consistently across every Ethereum-aware app; profile data can be hosted off-chain cheaply.
- **Cons:** identity is fragmented across protocols; EOAs have no recovery without a custodial bridge; profile and social data require per-protocol integration.
- **Chains:** Ethereum L1, Arbitrum, Optimism, Polygon.

### Smart Wallet + Basenames (Base)

A passkey-backed smart account — Coinbase Smart Wallet — paired with Basenames and Coinbase-hosted services.

- **Pros:** passkey recovery without seed phrases; the lowest mainstream onboarding friction in the EVM ecosystem.
- **Cons:** the profile model is still per-protocol; vendor lock-in to Coinbase infrastructure.
- **Chains:** Base.

### Attestation-as-identity (EAS / Optimism)

EAS attestations as the canonical claim model — identity is the union of claims signed about an address.

- **Pros:** composable, since any issuer can attest; schema-driven, queryable, and portable across EVM chains.
- **Cons:** attestations describe an account but don't carry a profile model; discovery and aggregation are per-app.
- **Chains:** Ethereum L1, Optimism, Base, Arbitrum.

### ZK identity (Polygon ID / Sismo-like)

Zero-knowledge proofs of credentials, letting users prove attributes without revealing the underlying data.

- **Pros:** privacy-preserving by construction; a strong fit for KYC and credential-style identity.
- **Cons:** adds circuit and verifier infrastructure to operate; the profile layer is still ad hoc.
- **Chains:** Polygon, Ethereum L1.

### Solana keypair + SNS + per-program profile

Keypair accounts named via SNS, with profile data and claims living in per-program accounts or third-party services like Civic.

- **Pros:** cheap operations and high throughput for claims; embedded SDKs and a strong mobile story.
- **Cons:** non-EVM toolchain; no standardized cross-program profile model.
- **Chains:** Solana.

### LSP0 + LSP3 + LSP6 (LUKSO)

The account _is_ the identity. LSP0 is a smart-contract account that carries LSP3 profile metadata and LSP6-scoped controllers — any LUKSO-aware app reads the same profile straight from the account.

- **Pros:** profile, account, and permissions are one object; identity is portable across applications without per-protocol integration; per-app permissions are revocable from the account side; Solidity/EVM tooling applies unchanged.
- **Cons:** smaller ecosystem and wallet support today; claim schemas are custom [ERC-725Y](../../../standards/erc725.md) keys rather than a canonical attestation format.
- **Chains:** LUKSO.

:::tip When the account should be the identity
Reach for the Ethereum default when the product is intrinsically protocol-composed and identity is secondary, or for ZK identity when credentials and privacy dominate. Reach for LUKSO's LSP0 + LSP3 + LSP6 combination when identity needs to be a first-class object that travels across applications without per-protocol wiring — when the account itself, not a layer stacked on top of it, should be the source of truth for who a user is.
:::

**Related reading:** [Smart account permissions](./smart-account-permissions.md) · [The consumer crypto stack](./consumer-crypto-stack.md) · [Profile-native apps](../build/profile-native-apps.md) · [Best blockchain for digital identity](../best-blockchain-for/digital-identity.md)
