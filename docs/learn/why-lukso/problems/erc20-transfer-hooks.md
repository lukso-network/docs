---
sidebar_label: 'ERC20 Transfer Hooks'
sidebar_position: 5
description: 'ERC-20 transfer() never calls the recipient, stranding tokens sent to contracts. LSP7 fires an LSP1 universalReceiver hook on every transfer, both sides.'
---

# Give Every Token Transfer a Receiver Hook

ERC-20's `transfer` is two storage writes and an event — the recipient contract is never called, so it has no way to react when tokens arrive. That silence is the root cause of tokens getting stranded in contracts that can't credit a deposit without a second function call or an off-chain indexer watching for `Transfer` events. LSP7 closes the gap natively: every transfer carries a `bytes data` payload and fires [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) `universalReceiver` on the sender and recipient, for whichever side is a contract implementing it. And because LSP1 is the same hook used by LSP8 and by native value transfers, a receiving contract implements it once instead of maintaining four separate receiver interfaces.

## Before / after

| Behavior                                                 | ERC-20                                              | LSP7                                                                                                        |
| -------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Transfer signature                                       | `transfer(to, amount)`                              | `transfer(from, to, amount, force, data)`                                                                   |
| Recipient notified                                       | no                                                  | yes, if the recipient is a contract implementing LSP1 — via `universalReceiver`                             |
| Context payload                                          | none                                                | native `bytes data` on every transfer                                                                       |
| Send to a non-receiving contract                         | tokens strand silently                              | required `force` flag — `force=false` rejects both EOAs and non-LSP1 contracts; `force=true` permits either |
| Receiver interfaces to implement for "accept everything" | one per asset standard (ERC-721, ERC-1155, ERC-777) | one — LSP1, shared across LSP7, LSP8, and value transfers                                                   |

## Why silence at the recipient is the root problem

A vault that needs to credit a user on deposit has exactly two options with ERC-20: trust `msg.sender` to call a second function after the transfer, or poll `Transfer` events from an indexer and reconcile state after the fact. Neither is a hook — both are workarounds for the contract having no way to react to incoming value. This is also the direct cause of the "tokens stuck in contract" pattern: a user sends ERC-20 directly to a contract address, the contract has no mechanism to notice, and the tokens sit there until someone writes a rescue function.

## What people try today

**ERC-777's `tokensReceived`** added receiver awareness back in 2017, but introduced reentrancy issues that led most teams to avoid it — it's largely abandoned in new deployments. **ERC-1363's `transferAndCall` / `approveAndCall`** is a clean opt-in design, but adoption is thin: any token that doesn't implement it still strands on arrival. **Wrapper contracts** that require a deposit call after the transfer move the burden onto the user and add an extra transaction, and don't compose with contracts that weren't built to expect the pattern. **Off-chain `Transfer` event indexers** are necessary for reading app state, but a subgraph can't trigger an on-chain reaction — it can only tell you what already happened.

## How LSP1 and LSP7 fix it

LSP7's `transfer` takes a required `force` flag and a `bytes data` payload. With `force=false`, the transfer reverts unless the recipient is a contract implementing LSP1 — that rejects both EOAs and non-LSP1 contracts. With `force=true`, the transfer goes through regardless of what the recipient is, but only a contract that actually implements LSP1 gets the `universalReceiver` callback; an EOA has no code to call, so it just receives the tokens silently, same as ERC-20. A recipient contract that implements LSP1 receives a `typeId` describing what just happened along with the transfer data, and can run accept, reject, or routing logic inside one standard hook — no polling, no second transaction. The structural win is that LSP1 is one interface across LSP7, LSP8, and native value transfers: a Universal Profile, or any LSP1-aware contract, handles every asset type through the same entry point, and the four-receiver-interfaces problem simply doesn't exist.

:::tip One hook, every asset
If a contract needs to react when it receives value, LSP1 is the only interface to implement — it covers fungible tokens, identifiable tokens, and native transfers alike.
:::

**Related reading:** [ERC-721's safe transfer gap](./erc721-safe-transfer.md) · [The ERC-20 approval problem](./erc20-approval-risks.md) · [ERC-20 explained](../erc-explainers/erc-20.md) · [ERC20 vs. LSP7](../compare/erc20-vs-lsp7.md)
