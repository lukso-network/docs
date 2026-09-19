---
sidebar_label: 'Gasless Onboarding Patterns'
sidebar_position: 2
description: "How consumer apps sponsor user transactions: meta-transactions, paymasters, EIP-7702 delegation, and LUKSO's native relayed execution, compared head to head."
---

# Gasless Onboarding Patterns

"Gasless" is a UX claim, not a technical one — somebody always pays the gas. The architectural question is _who_, _with what scope_, _through what infrastructure_, and _what does the user have to trust_. Five patterns answer those questions today: meta-transactions via ERC-2771, paymasters via ERC-4337, vendor-hosted paymasters, set-code delegation via EIP-7702, native fee delegation on Solana, and relayed execution via [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) on LUKSO. They differ in operational burden — do you run bundler infrastructure? — in revocability, and in whether the relay logic lives in your SDK, in a separate protocol, or in infrastructure the account already has. For apps that want to sponsor every interaction without standing up bundler infrastructure, LSP25 is the lowest-burden option among EVM chains, because the scope of what gets relayed is enforced by [LSP6](../../../standards/access-control/lsp6-key-manager.md) on the Key Manager that already governs the account, rather than by a separate paymaster contract.

## The bundler question

The single biggest operational fork in this decision is whether the app ends up running bundler infrastructure. ERC-4337 makes the bundler a permanent part of the stack. Vendor-hosted paymasters externalize it to Coinbase or Polygon. EIP-7702 delegation can be paired with a paymaster for full gasless UX, but a plain transaction sender can already cover gas for a delegated EOA without a paymaster or bundler in the loop. Solana avoids the bundler question entirely via a native fee-payer field. LUKSO avoids it too, but differently: relayed execution is a function on the [LSP6 Key Manager](../../../standards/access-control/lsp6-key-manager.md) that already governs every Universal Profile, so the "relayer" is a simple submit-call service rather than a new category of protocol infrastructure to operate or rent.

## Implementation approaches

### ERC-2771 meta-transactions

The user signs a typed-data message; a trusted forwarder submits it on-chain. The older pattern, still widely used.

- **Pros:** simple to implement, no bundler infrastructure, works on every EVM chain.
- **Cons:** requires forwarder integration in every contract being called; no standard account-level scope — the forwarder is fully trusted.
- **Chains:** Ethereum L1, all EVM L2s.

### ERC-4337 paymaster + bundler

Users sign UserOperations; a paymaster contract pays gas; a bundler aggregates UserOps to the EntryPoint. The modern account-abstraction stack.

- **Pros:** standardized account-abstraction stack, per-operation policy on the paymaster, a growing ecosystem of bundler/paymaster providers.
- **Cons:** requires a bundler, a paymaster, and an indexer; paymaster policy logic is per-implementation; several new components to operate or rent.
- **Chains:** Ethereum L1, Base, Arbitrum, Optimism, Polygon.

### Vendor-hosted paymaster (Base, Polygon)

Coinbase or Polygon hosts the paymaster and bundler; the app just configures a sponsorship policy.

- **Pros:** lowest operational burden in the EVM ecosystem, strong UX out of the box.
- **Cons:** vendor lock-in for sponsorship and bundler services; policy logic is still per-implementation.
- **Chains:** Base, Polygon.

### EIP-7702 set-code delegation

An EOA delegates to a smart-account implementation — the delegation persists until replaced or explicitly cleared, not just for the transaction that set it — and a plain transaction sender can already cover gas for the delegated EOA without a paymaster or bundler in the loop.

- **Pros:** backwards-compatible with existing EOAs, standardized at the protocol level.
- **Cons:** matching ERC-4337's exact sponsorship UX still means pairing 7702 with paymaster-and-bundler infrastructure; the EOA's root key remains overridable.
- **Chains:** Ethereum L1, most EVM L2s.

### Solana native fee delegation

Solana transactions carry a separate fee-payer field, so any signer can cover the fee and the user doesn't need a balance at all.

- **Pros:** built into the protocol with no bundler infrastructure, lowest overhead among production chains.
- **Cons:** non-EVM; the scope of what the fee-payer can sign is defined per-program, not standardized.
- **Chains:** Solana.

### LSP25 Execute Relay Call (LUKSO)

LSP25 standardizes how a relayer submits a signed call to the [LSP6 Key Manager](../../../standards/access-control/lsp6-key-manager.md) that governs an [LSP0](../../../standards/accounts/lsp0-erc725account.md) account. The relayer pays gas; the Key Manager verifies the signature and confirms the signer holds `EXECUTE_RELAY_CALL` plus whatever permission the payload itself needs, then executes on the account.

- **Pros:** no bundler or EntryPoint infrastructure to run; per-controller scope enforced by LSP6 on the same Key Manager that already governs the account; standardized at the chain level, so every LSP25-aware relayer behaves the same way.
- **Cons:** requires LSP25-aware relayer infrastructure; specific to LSP0 accounts with a Key Manager attached.
- **Chains:** LUKSO.

:::tip When to reach for LSP25
Use ERC-2771 only when integrating with legacy contracts that already support forwarders, and vendor-hosted paymasters when the lock-in is acceptable and EVM is a hard requirement. Reach for LSP25 when the goal is standardized relayed execution scoped by the account's own permission system — sponsoring every interaction without ever standing up a bundler, an EntryPoint, or a separate paymaster contract with its own deposit to manage.
:::

**Related reading:** [Gasless onboarding — building the vertical](../build/gasless-onboarding.md) · [Smart account permissions](./smart-account-permissions.md) · [The ERC-4337 bundler tax](../problems/erc4337-bundler-tax.md) · [ERC-4337 vs EIP-7702 vs LUKSO](../cross-chain/erc4337-vs-eip7702-vs-lukso.md)
