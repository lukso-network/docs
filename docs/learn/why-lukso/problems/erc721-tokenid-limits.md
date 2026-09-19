---
sidebar_label: 'Token ID Design'
sidebar_position: 9
description: 'ERC-721 token IDs are a bare, undeclared uint256 — a hash and a counter look identical on-chain. LSP8 lets a collection declare what its ID means.'
---

# Let Token IDs Declare What They Mean, Not Just Hold a Number

`uint256` and [`bytes32`](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) are both exactly 256 bits — a content hash, a packed address, or a structured reference fits in either one without truncation. That's not where ERC-721 actually falls short. The real gap is that a bare `uint256 tokenId` carries no signal about what it _is_: a sequential counter, a `keccak256` hash, an encoded address, all look identical — just a number — to any wallet, marketplace, or indexer reading the contract. LSP8 fixes the signal, not the size: the [`LSP8TokenIdFormat`](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) data key lets a collection **declare** how its token IDs should be interpreted, so external tooling can render them correctly without a per-project convention to reverse-engineer.

## Before / after

| Use case                                          | ERC-721 `uint256`                                                                                | LSP8 `bytes32` + `LSP8TokenIdFormat`                                                               |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Sequential mint counter                           | native fit                                                                                       | native fit — format `0` (`Number`)                                                                 |
| Content hash (e.g. `keccak256`)                   | fits the bits, but looks identical to a counter — no signal it's a hash                          | format `4` (`bytes32` hash digest) — declared, so tooling knows to treat it as a hash              |
| Off-chain serial / name                           | side convention required to know it isn't a counter                                              | format `1` (`string`, up to 32 UTF-8 bytes) — declared directly                                    |
| Token ID as its own contract address              | possible to pack, but no standard way to say "this ID is an address"                             | format `2` (`address`) — the ID **is** a contract address other code can call or read ERC725Y from |
| Mixed collection (mostly numbers, some contracts) | no standard way to express this per-token                                                        | formats `100`–`104` (`Mixed`) — default interpretation declared, per-token override queryable      |
| Marketplace readability                           | a 78-digit number; correct interpretation depends on knowing that project's off-chain convention | the same numeric case still works, or a self-describing, declared format when you choose one       |

## Why an undeclared integer forces a side convention

`uint256 tokenId` is a deliberate, minimal primitive — cheap and predictable, and for sequential mints it's genuinely the right answer. The cost shows up the moment the ID needs to carry meaning beyond a count: nothing in ERC-721 lets a contract declare "these IDs are hashes" or "these IDs are addresses." Every integrator either assumes a plain counter or has to go find that project's own documentation to learn its convention — the token ID itself, and the interface, give no hint. That's a discoverability problem, not a storage one.

## What people try today

**Off-chain registries** map `uint256` IDs to richer identifiers in a database. It works, but it couples the asset permanently to that project's infrastructure and gives generic tooling nothing to go on. **Documented per-project conventions** (a README, a subgraph schema) tell integrators how to interpret an ID, but only the integrators who found and read that documentation. **Hash-as-tokenId patterns** are common and technically fine — a `keccak256` hash fits a `uint256` exactly — but a wallet or marketplace has no on-chain way to know it should render the ID as a hash instead of a serial number.

## How LSP8TokenIdFormat makes the declaration standard

[LSP8](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) keeps the same 256-bit ID — `bytes32` instead of `uint256`, a more neutral fixed-length container for something that isn't always semantically a number — and adds `LSP8TokenIdFormat`, a data key every LSP8 contract sets once. Any LSP8-aware wallet or marketplace reads that key and knows immediately whether a given ID is a plain number, a UTF-8 string, a hash digest, or a contract address, without guessing or consulting off-chain docs. A collection that wants every NFT to itself be an [ERC725Y](../../../standards/erc725.md)-compatible contract — carrying its own evolving state — can do that natively with the `address` format, something a bare `uint256` has no standard way to express at all.

:::tip The win is declared interpretation, not extra room
LSP8's `bytes32` isn't bigger than `uint256` — both are 256 bits. What LSP8 adds is `LSP8TokenIdFormat`: a standard way to say what a token ID means, so integrators read that declaration instead of reverse-engineering a project-specific convention.
:::

**Related reading:** [Dynamic NFT metadata](./erc721-dynamic-metadata.md) · [ERC-721's safe transfer gap](./erc721-safe-transfer.md) · [ERC-1155 complexity](./erc1155-complexity.md) · [ERC721 vs. LSP8](../compare/erc721-vs-lsp8.md)
