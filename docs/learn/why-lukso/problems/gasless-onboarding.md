---
sidebar_label: 'Gasless Onboarding'
sidebar_position: 10
description: 'New users need native gas before they can do anything. LSP25 lets a relayer submit signed calls with no bundler or paymaster contract.'
---

# Onboard Users Without Making Them Buy Gas First

A brand-new EOA can't do anything until it holds native currency, because an EOA signs and pays in the same step. Every popular fix for this — trusted forwarders, ERC-4337 paymasters, third-party relayer SDKs — adds a layer of infrastructure the builder has to run, rent, or trust. [**LSP25**](../../../standards/accounts/lsp25-execute-relay-call.md) puts relay execution on the [LSP6 Key Manager](../../../standards/access-control/lsp6-key-manager.md) that already governs every [Universal Profile](../../universal-profile/metadata/read-profile-data.md): a controller signs a payload, a relayer submits it to the Key Manager and pays gas, and `executeRelayCall` verifies the signature and the controller's permissions before executing on the account — no bundler, no EntryPoint, no separate mempool.

## Before / after

| Architecture                                      | What it requires                                       | Sponsorship model                                 |
| ------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------- |
| ERC-2771 trusted forwarder                        | every recipient contract inherits `ERC2771Context`     | forwarder pays; contracts trust the forwarder     |
| ERC-4337 + paymaster                              | EntryPoint deposit, bundler, `validatePaymasterUserOp` | a paymaster contract sponsors per `UserOperation` |
| Third-party relayers (Gelato, Biconomy, Defender) | vendor SDK integration                                 | vendor-hosted infrastructure                      |
| LSP25 `executeRelayCall`                          | a signed payload plus a nonce channel                  | a relayer submits to the Key Manager — no bundler |

## Why sponsorship needs a separate signer and payer

A new user needs native currency before they can do anything with an EOA, because signing and paying are the same act. Any sponsorship model has to add a layer that separates who signs from who pays — and every popular pattern does that by adding infrastructure: a trusted forwarder you have to trust, an ERC-4337 EntryPoint and bundler you have to run or rent, or a third-party relayer with its own SDK and its own vendor lock-in. The cost lands on the builder, not on the spec.

## What people try today

**EIP-2771 trusted forwarders** let contracts extract the real `msg.sender` from calldata. It's cheap, but every protected contract has to be built forwarder-aware and has to trust that specific forwarder. **ERC-4337 plus a paymaster** is powerful but means shipping or renting the full `UserOperation` pool, bundler, and `EntryPoint` stack. **Turnkey relayers** like Gelato, Biconomy, and Defender wrap one of the above into a convenient SDK, at the cost of vendor coupling. **EIP-7702** lets an EOA delegate to smart-account code — a delegation that persists until replaced or cleared, not just for one transaction — and a plain transaction sender can already cover gas for it, though matching ERC-4337's exact sponsorship UX still means pairing it with a paymaster.

## How LSP25 keeps it native, with no new infrastructure

LSP25 defines `executeRelayCall` on the [LSP6 Key Manager](../../../standards/access-control/lsp6-key-manager.md) — the same contract that already checks permissions for every direct call on the profile. A controller signs a payload — with a nonce channel for ordering and replay protection — and a relayer submits it to the Key Manager, which verifies the signature, confirms the signer holds the `EXECUTE_RELAY_CALL` permission alongside whatever permission the payload itself needs, and then executes it on the account. There's still no bundler, no `EntryPoint`, no separate mempool: gasless execution is one function call on infrastructure every Universal Profile already has, not a new protocol layer bolted on top. Because the Key Manager checks the same [LSP6](../../../standards/access-control/lsp6-key-manager.md) permissions it always would, the controller signing the relay payload can only authorize what its permissions allow, so the sponsoring relayer can never escalate the controller's authority just by paying for gas.

:::tip Sponsorship without extra trust
A relayer that pays gas through `executeRelayCall` never gains more authority than the signing controller already had — the Key Manager checks LSP6 permissions (including `EXECUTE_RELAY_CALL`) on every relayed call, not bypassed by it.
:::

**Related reading:** [ERC-4337's bundler tax](./erc4337-bundler-tax.md) · [Wallet permission scoping](./wallet-permissions.md) · [Building gasless onboarding](../build/gasless-onboarding.md) · [Gasless onboarding patterns](../architecture/gasless-onboarding-patterns.md) · [Execute relay transactions](../../universal-profile/key-manager/execute-relay-transactions.md)
