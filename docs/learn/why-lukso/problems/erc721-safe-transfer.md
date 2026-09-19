---
sidebar_label: 'Safe Transfer Hooks'
sidebar_position: 8
description: 'ERC-721 safeTransferFrom only checks one receiver interface, and the unsafe path still ships. LSP1 gives every asset type one universal hook.'
---

# One Receiver Hook for Every Asset Type

`safeTransferFrom` only checks `onERC721Received` — and only when the caller chooses the safe variant, since plain `transferFrom` still ships and bypasses the check entirely. Every other asset standard defines its own receiver shape on top: ERC-1155's `IERC1155Receiver` (one interface, with both a single-transfer and a batch-transfer callback), ERC-777's now-abandoned `tokensReceived`. A multi-asset contract ends up implementing several interfaces, and a legacy one silently strands whatever it wasn't built to check for. LSP1 replaces all of it with one hook — [`universalReceiver(bytes32 typeId, bytes data)`](../../../standards/accounts/lsp1-universal-receiver.md) — that LSP7, LSP8, and native value transfers all call, with `typeId` telling the receiver exactly what just happened.

## Before / after

| Asset type                                     | ERC ecosystem receiver                                                             | LUKSO receiver                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| ERC-721 / LSP8                                 | `onERC721Received`, opt-in via `safeTransferFrom` only                             | `universalReceiver`, `typeId`-discriminated                          |
| ERC-1155                                       | `IERC1155Receiver` (`onERC1155Received` + `onERC1155BatchReceived`, one interface) | same LSP1 hook                                                       |
| ERC-20 / LSP7                                  | none natively                                                                      | `universalReceiver` on every transfer to an LSP1-supporting contract |
| Native value                                   | none                                                                               | `universalReceiver` via the account's receive path                   |
| Interfaces to implement to "accept everything" | up to three                                                                        | one                                                                  |

## Why a narrow, opt-in check still strands assets

`safeTransferFrom` is real safety, but it's narrow: it only checks `IERC721Receiver`, only on that one call, only when the caller chose the safe variant. The plain `transferFrom` still ships, and most ERC-20 transfers go straight to a balance update with no recipient interaction of any kind. In practice, every asset standard invented its own receiver shape — `IERC721Receiver`, `IERC1155Receiver`, ERC-777's `tokensReceived` — so a multi-asset contract has to implement each one separately, and there's still no general "I received value of some kind" hook to fall back on.

## What people try today

**Implementing every receiver interface** is required for compliance with each standard, but it's boilerplate that grows with every new asset type and doesn't compose into a shared policy. **OpenZeppelin's Holder mixins** (`ERC721Holder`, `ERC1155Holder`) accept everything unconditionally, which just defers the policy question to somewhere else. **Defensive transfer-then-call patterns** are ad hoc per integration and don't interoperate across projects. **Sweeper or rescue contracts** recover stranded assets after the fact — they treat the symptom, not the missing hook.

## How LSP1 generalizes the hook

LSP1 defines one hook signature:

```solidity
function universalReceiver(bytes32 typeId, bytes calldata data)
  external payable returns (bytes memory);
```

LSP7 and LSP8 transfers call it on both sender and recipient that implement LSP1, with a `typeId` that tells the receiver what kind of interaction just occurred — token sent, token received, asset registered, and so on. A Universal Profile uses a **Universal Receiver Delegate** to dispatch on that signal: register received assets in [LSP5](../../../standards/metadata/lsp5-received-assets.md), reject spam by `typeId`, or run app-specific logic — one hook, every asset type, a declared policy instead of several bespoke interfaces.

:::tip One interface to implement
If a contract or account needs to react to receiving any kind of asset — fungible, identifiable, or native value — LSP1 is the only receiver interface it needs.
:::

**Related reading:** [ERC-20's missing transfer hooks](./erc20-transfer-hooks.md) · [Dynamic NFT metadata](./erc721-dynamic-metadata.md) · [ERC721 vs. LSP8](../compare/erc721-vs-lsp8.md) · [Accept or reject incoming assets](../../universal-profile/universal-receiver/accept-reject-assets.md)
