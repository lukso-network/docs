---
sidebar_label: 'What is ERC20?'
sidebar_position: 1
description: 'ERC20 origin, the six-function ABI, its well-known approval and receiver-hook limits, and the LSP7 standard its own author built to fix them.'
---

# What is ERC20?

ERC20 is Ethereum's fungible token standard, proposed as [GitHub issue #20](https://github.com/ethereum/EIPs/issues/20) on 19 November 2015 by **Fabian Vogelsteller** and co-authored with **Vitalik Buterin**, later formalized as [EIP-20](https://eips.ethereum.org/EIPS/eip-20). Six functions, two events, no opinion about receivers, metadata, accounts, or permissions — that minimalism is exactly what let the DeFi economy build on top of it, and exactly what's left every integrator since 2015 paying an integration tax for the gaps. Vogelsteller went on to co-found **LUKSO** and design **LSP7 Digital Asset** as the standard he wished he'd been able to write the first time.

## Origin

Vogelsteller filed the proposal as a minimum interface any token contract could implement — deliberately underspecified. That underspecification is _why_ it worked: an exchange, a wallet, a DEX, and a lending market written by five different teams could all transact the same token without coordinating. By 2017 the standard had absorbed the ICO boom. By 2020, Compound and Uniswap were entire economies built on the assumption that `balanceOf` and `transferFrom` mean exactly what the spec says. A decade later, trillions of dollars in supply move through that six-function interface every week.

## The interface

```solidity
// EIP-20 — required
function totalSupply()                                external view returns (uint256);
function balanceOf(address owner)                     external view returns (uint256);
function transfer(address to, uint256 value)          external returns (bool);
function transferFrom(address from, address to, uint256 value) external returns (bool);
function approve(address spender, uint256 value)      external returns (bool);
function allowance(address owner, address spender)    external view returns (uint256);

event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);

// EIP-20 — optional
function name()     external view returns (string memory);
function symbol()   external view returns (string memory);
function decimals() external view returns (uint8);
```

## Where it breaks down

### The approval problem

`approve(spender, amount)` and the spender's later `transferFrom` split user intent across two transactions the wallet can't connect. Apps request max-uint approvals to skip the second prompt, turning every authorized spender into a standing risk — if the spender contract is later upgraded, drained, or misconfigured, the approval is already sitting there. Revoke flows are reactive cleanup, not prevention. Workarounds layered on top: `revoke.cash`, EIP-2612 `permit`, Uniswap's Permit2, ERC-1363 approve-and-call — none fix intent context at the primitive layer.

### The receiver problem

`transfer` never calls the recipient. If the receiver is a contract that doesn't know what to do with incoming tokens, the balance is simply stranded — no on-transfer hook exists to credit a deposit or revert. Millions of dollars in tokens sent directly to token contracts themselves is a direct, well-documented consequence.

### The metadata problem

Three optional methods — `name`, `symbol`, `decimals` — and nothing else. No icon, no description, no link to documentation or an audit, no way to attach structured data without forking the contract or pinning a JSON file to a server that can go offline.

### The accounts problem

ERC20 assumes its owners are addresses — either an EOA (one key, no recovery, no scoping) or a contract that has to implement everything itself. The standard pushes account abstraction entirely onto the application layer, which is why a 2015 token spec spawned years of follow-on EIP work (ERC-4337, EIP-7702) trying to retrofit what an account should be.

### The integration tax

Permit (EIP-2612), Permit2, ERC-1363, ERC-777, ERC-3009, ERC-4626 — each adds a layer instead of fixing the substrate, and each ships its own adoption problem because half the ecosystem keeps using the original six functions underneath.

## The LUKSO successor

[**LSP7 Digital Asset**](../../../standards/tokens/LSP7-Digital-Asset.md) keeps ERC20's balance model exactly, and builds the surrounding system directly into the standard instead of leaving it as a patch layer.

|                        | ERC20                                    | LSP7                                                                                                                                |
| ---------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Transfer signature     | `transfer(to, amount)`                   | `transfer(from, to, amount, force, data)`                                                                                           |
| Recipient notification | none                                     | [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) `universalReceiver` on either side that's a contract implementing it |
| Authorization          | `approve` / `allowance` / `transferFrom` | `authorizeOperator` + [LSP6](../../../standards/access-control/lsp6-key-manager.md) controller scope                                |
| Metadata               | `name` / `symbol` / `decimals` only      | [ERC725Y](../../../standards/erc725.md) under [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md) keys                 |
| Transfer data payload  | none — workaround via wrappers           | native `bytes data`                                                                                                                 |

Behind LSP7 sits the rest of the LUKSO account stack: [LSP0](../../../standards/accounts/lsp0-erc725account.md) makes the account a programmable contract instead of a bare address, [LSP3](../../../standards/metadata/lsp3-profile-metadata.md) gives it a profile, [LSP6](../../../standards/access-control/lsp6-key-manager.md) makes permissions an account property instead of a token allowance, and [LSP25](../../../standards/accounts/lsp25-execute-relay-call.md) makes gasless onboarding a native function rather than a bolted-on mempool. Where ERC20 pushed every one of these concerns to the application layer, LUKSO designed them into the account and token system from the start.

:::info Is ERC20 still the right choice?
When compatibility is the entire product — a wrapped reserve asset, a stablecoin whose universe of integrators expects the exact ERC20 ABI, or a protocol whose audit assumes zero recipient-side code execution on transfer — ERC20 remains the right interface. LSP7's advantages matter once receiver awareness, structured metadata, or account-level permission scoping become real requirements.
:::

## FAQ

### What does ERC20 stand for?

ERC stands for Ethereum Request for Comments — ERC20 is the twentieth proposal in that series, later formalized as EIP-20 at [eips.ethereum.org/EIPS/eip-20](https://eips.ethereum.org/EIPS/eip-20).

### What is wrong with ERC20?

Five well-known limits: split-intent approvals that enable phishing, no receiver hook (stranding tokens sent to contracts), thin metadata (three strings, no schema), no built-in account abstraction, and a growing stack of patch standards (Permit, Permit2, ERC-1363, ERC-777, ERC-4337) instead of a fixed substrate.

### What is LSP7?

LSP7 is LUKSO's Digital Asset standard, designed by Fabian Vogelsteller — ERC20's original author — as the fungible token standard for Universal Profiles. It keeps the balance model and adds a required `force` flag, a `data` payload on every transfer, [LSP1](../../../standards/accounts/lsp1-universal-receiver.md) notifications on whichever side is a contract implementing it, and account-scoped operator authorization via [LSP6](../../../standards/access-control/lsp6-key-manager.md).

### Can I migrate an ERC20 token to LSP7?

Yes — the balance model is identical, so migration is contract-level, not user-level. See the [full migration guide](../../migrate/migrate-erc20-to-lsp7.md).

**Related reading:** [ERC20 vs LSP7](../compare/erc20-vs-lsp7.md) · [The ERC20 approval problem](../problems/erc20-approval-risks.md) · [ERC20's missing transfer hooks](../problems/erc20-transfer-hooks.md)
