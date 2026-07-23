---
sidebar_label: 'Contract Extension'
sidebar_position: 1
description: 'Add new functions to a deployed contract without a permanent upgrade key: LSP17 compared with proxies, diamonds, and Safe modules.'
---

# Extend a Deployed Contract Without an Upgrade Key

Adding a new function to a contract you've already deployed usually forces a trade-off: an upgradeable proxy leaves a permanent admin key able to swap your logic overnight, or an [ERC-2535 Diamond](https://eips.ethereum.org/EIPS/eip-2535) trades that key for a shared storage layout you now have to manage by hand. [**LSP17 Contract Extension**](../../../standards/accounts/lsp17-contract-extension.md) skips both trade-offs. It routes unrecognized function calls to extension contracts registered in the base contract's own [ERC725Y](../../../standards/erc725.md) storage, so new behavior ships by registering an extension — not by upgrading, and not by touching a shared storage-slot map. Every Universal Profile grows this way, and any contract can adopt the same primitive.

## Comparing the extension models

| Approach                 | Mechanism                                          | Upgrade authority                  | Storage risk                             |
| ------------------------ | -------------------------------------------------- | ---------------------------------- | ---------------------------------------- |
| Transparent / UUPS proxy | swap the implementation address                    | permanent admin key, forever       | none — single implementation             |
| ERC-2535 Diamond         | facet registry routes selectors via `delegatecall` | none once ownership is renounced   | shared storage layout, developer-managed |
| Safe modules             | sandboxed module calls scoped to one Safe          | module owner controls installation | isolated per module, Safe-specific       |
| LSP17                    | fallback router looks up an extension per selector | none — base bytecode is immutable  | isolated per extension, no shared layout |

## Why a permanent upgrade key is a standing liability

A UUPS or transparent proxy is proven infrastructure, but the trade-off never goes away: whoever holds `upgradeTo` can replace the logic behind a stable address at any time. Every user of that contract is permanently exposed to that key, whether or not it's ever misused. Diamonds remove the key but introduce a different tax — facets share one storage layout, and getting that layout wrong across upgrades is a well-documented way to corrupt state. Account-specific patterns like Safe modules and ERC-4337 validators solve extension for one account type; they aren't a general-purpose primitive a token or registry contract can adopt.

## What builders reach for today

Most teams pick between the same handful of options. **OpenZeppelin's transparent and UUPS proxies** are battle-tested, but the upgrade key is a permanent trust assumption baked into the deployment. **ERC-2535 Diamonds** are genuinely modular and let you add facets after launch, at the cost of specialized tooling and storage discipline that has to be maintained correctly forever. **Safe modules and guards** work well for the one account they're scoped to, but don't generalize to arbitrary contracts. **Bespoke plugin patterns** baked into an app contract solve the immediate need but ship with no shared tooling and no audit trail beyond the one project that wrote them.

## How LSP17 solves it

LSP17 defines a fallback router: when a contract receives a call for a function selector it doesn't recognize, it looks up an extension contract registered under an [ERC725Y](../../../standards/erc725.md) data key for that selector, and forwards the call. The base contract's bytecode never changes and there is no admin key that can swap it. Extensions each keep their own storage, so there's no shared layout to coordinate across facets.

Universal Profiles use LSP17 to grow new capabilities without proxy upgrades — a profile deployed years ago can gain new selector-level behavior just by registering an extension. The same primitive is available to any contract that wants to add functions after deployment without asking its users to trust a permanent upgrade key.

:::tip LSP17 in one line
No upgrade authority over the base contract, no diamond-style storage discipline to maintain. If a deployed contract needs a new capability, register an extension instead of scheduling an upgrade.
:::

**Related reading:** [Wallet permission scoping](./wallet-permissions.md) · [ERC-4337's bundler tax](./erc4337-bundler-tax.md) · [ERC-2535 vs. LSP17](../compare/erc2535-vs-lsp17.md)
