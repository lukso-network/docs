---
sidebar_label: 'Gasless Onboarding'
sidebar_position: 3
description: 'Build sponsored, gasless transaction flows on LUKSO with LSP25 executeRelayCall — no bundler, no EntryPoint, no paymaster contract.'
---

# Build Gasless Onboarding on LUKSO

Gasless UX is fundamentally a separation between the signer and the payer. [**LSP25**](../../../standards/accounts/lsp25-execute-relay-call.md) puts that separation on the [Key Manager](../../../standards/access-control/lsp6-key-manager.md) every profile already has: a controller signs a payload via `executeRelayCall(signature, nonce, validityTimestamps, payload)`, a relayer submits it to the Key Manager and pays the gas, and the Key Manager verifies the signature and the controller's [LSP6](../../../standards/access-control/lsp6-key-manager.md) permissions — including `EXECUTE_RELAY_CALL` — before executing on the account. No parallel `UserOperation` mempool, no `EntryPoint` singleton, no separate paymaster contract holding its own deposit — sponsored execution is a native function call on infrastructure the profile already has.

## The stack

| Standard                                                         | Role                                                                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) | `executeRelayCall` on the account's Key Manager                                                        |
| [LSP6](../../../standards/access-control/lsp6-key-manager.md)    | Constrains what the signing controller may authorize (requires `EXECUTE_RELAY_CALL` for relayed calls) |
| [LSP20](../../../standards/accounts/lsp20-call-verification.md)  | Lets controllers call the account directly inline when relay isn't needed                              |

Relayers can be self-hosted against LSP15's standardized relayer API, or mocked for testing via `github.com/lukso-network/tools-mock-relayer`.

## When this vertical fits

You're onboarding users who don't already hold LYX, and you want to sponsor the first N actions, an entire app session, or just the expensive operations (recovery, large `setData` calls) — without standing up and operating a bundler.

:::tip Nonce channels
Use higher nonce channels for parallel session streams instead of serializing every relayed call through channel 0 — this lets multiple concurrent flows (e.g. one per device or app) submit relay calls without blocking on each other's ordering.
:::

**Related reading:** [Gasless onboarding without a paymaster](../problems/gasless-onboarding.md) · [ERC-4337's bundler tax](../problems/erc4337-bundler-tax.md) · [ERC-4337 vs the LSP account stack](../compare/erc4337-vs-lsp-stack.md) · [Gasless onboarding architecture patterns](../architecture/gasless-onboarding-patterns.md)
