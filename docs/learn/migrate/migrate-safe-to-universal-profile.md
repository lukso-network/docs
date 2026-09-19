---
sidebar_label: '🔐 Safe to Universal Profile'
sidebar_position: 5
description: 'Step-by-step guide to migrating custody from a Gnosis Safe multisig to a LUKSO Universal Profile: mapping signers to LSP6 controller permissions.'
---

# 🔐 Migrate from Safe to Universal Profile

Moving custody from a Safe (Gnosis Safe) multisig to a [**Universal Profile**](../universal-profile/metadata/read-profile-data.md) maps the multisig-signer model onto [LSP6 Key Manager](../../standards/access-control/lsp6-key-manager.md) controllers. Each Safe owner becomes an LSP6 controller address with its own permission bitfield (`CALL`, `SETDATA`, `TRANSFERVALUE`, `ADDCONTROLLER`, `SIGN`, and more) — narrower and more expressive than a flat multisig owner list.

:::info Estimate
Roughly a day for a small Safe. Longer if the Safe custodies many distinct asset types, since each needs its own transfer step.
:::

## When to migrate

Migrate when per-controller permission scoping in a standard vocabulary — the LSP6 bitfield plus `AllowedCalls` and `AllowedERC725YDataKeys` — profile-native metadata storage, or [LSP25](../../standards/accounts/lsp25-execute-relay-call.md) relay execution through the Key Manager (no bundler or paymaster contract needed) is what you need. Stay on Safe when an m-of-n multisig threshold is the exact primitive your product encodes — that pattern doesn't map one-to-one onto LSP6 and needs an explicit recovery-contract layer to express instead.

## Step 1 — model the Safe as permissions

Safe's "3 of 5" threshold doesn't exist directly in LSP6 — controllers are individual, not aggregated by a vote. Two patterns work:

- **Recovery contract** — deploy a contract that enforces the threshold itself, and register that contract as a controller holding both `ADDCONTROLLER` and `EDITPERMISSIONS` on the profile. Both are required: `ADDCONTROLLER` lets it install a brand-new replacement controller (the one that's never held permissions before — the whole point of recovery), while `EDITPERMISSIONS` alone only lets it edit or remove a controller that already has some permission entry. Day-to-day controllers handle daily operations; the recovery contract handles ownership-level changes.
- **Single day-to-day controller + cold multisig** — flatten daily operations to one controller, and keep the Safe (or a new threshold contract) as the cold recovery layer behind it.

## Step 2 — deploy the Universal Profile

Deploy with the standard `lsp-factory.js` (or equivalent) deployment script. Set [LSP3](../../standards/metadata/lsp3-profile-metadata.md) profile metadata, then add controllers per the design from Step 1.

## Step 3 — transfer assets

For each asset class, the Safe is always the one initiating the transfer via `Safe.execTransaction`:

- **Native LYX** — `Safe.execTransaction(profileAddress, value, "0x", ...)`, sending value directly to the profile's address. There's no separate call needed on the profile side to receive a plain LYX transfer.
- **ERC20 tokens moving to LSP7** — the Safe calls `token.transfer(profile, balance)` on the old ERC20 contract (unchanged ERC20 syntax) if you're sweeping the legacy token, or the LSP7 contract's own `transfer(from, to, amount, force, data)` if you're moving an already-migrated LSP7 balance — LSP7's `transfer` is a 5-argument function, not ERC20's 2-argument one.
- **NFTs** — `token.safeTransferFrom(safe, profile, id)` for existing ERC721 assets works as-is between EOAs and contracts implementing `onERC721Received`, but a default Universal Profile does **not** implement `onERC721Received` natively. Before sending an ERC721 NFT with `safeTransferFrom`, register LSP17's [`OnERC721ReceivedExtension`](../../contracts/contracts/LSP17Extensions/OnERC721ReceivedExtension.md) on the profile for that selector, or use `transferFrom` (the non-safe variant) instead. NFTs already migrated to LSP8 move with `transferBatch(...)` or the LSP8 `transfer(from, to, tokenId, force, data)` call, which works against a Universal Profile with no extension needed.

If the Safe holds many distinct assets, write a sweep contract that batches the outbound transfers instead of sending them one by one.

## Step 4 — update integrations

Identify every protocol that references the Safe's address directly: vesting contracts, DAO memberships, subscriptions, allowance grants. Addresses don't migrate on their own — every external reference needs to be re-pointed to the new profile address.

## Step 5 — sunset the Safe

Once nothing material remains in the Safe, sweep out any remaining gas dust and treat it as historical. Leave the contract deployed — destroying multisig contracts is unsupported and risky.

## Gotchas

- Multisig threshold semantics don't map one-to-one to LSP6 — model it as a recovery-controller contract that enforces the threshold, then register that contract as an LSP6 controller with both `ADDCONTROLLER` and `EDITPERMISSIONS` (installing a never-before-permissioned replacement controller needs `ADDCONTROLLER`; `EDITPERMISSIONS` alone isn't enough).
- Asset transfer is many separate transactions unless the Safe owns assets through a sweep contract that batches outbound moves.
- Anything connected to the Safe's address — vesting schedules, allowance grants, on-chain memberships — needs to be re-pointed to the new profile address; addresses don't migrate, only the references you update do.
- Safe modules have their own permission shape; LSP6 controllers plus [LSP17](../../standards/accounts/lsp17-contract-extension.md) extensions are the closest LSP-side equivalents. Map each module to its closest LSP primitive deliberately rather than assuming a 1:1 translation.

## Verify the migration

- All assets transferred to the Universal Profile.
- Old Safe emptied of material assets — Safe has no built-in pause function, so "sunset" means the Safe holds nothing worth protecting anymore, not that it's disabled on-chain.
- Controllers and permissions configured on the new profile.
- Recovery policy in place, with at least one cold controller holding both `ADDCONTROLLER` and `EDITPERMISSIONS`.
- Off-chain integrations updated to the new address.

**Related reading:** [EOA vs Universal Profile](../why-lukso/compare/eoa-vs-universal-profile.md) · [Wallet permission scoping](../why-lukso/problems/wallet-permissions.md)
