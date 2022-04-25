---
sidebar_label: 'LSP7 - Digital Asset (Token)'
sidebar_position: 3
---

# LSP7 - Digital Asset

:::caution This section is a work in progress.
:::

:::info Standard Document

[LSP7 - Digital Asset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)

:::

LSP7 Digital Asset is a standard that aims to describe a fungible asset. The term _fungible_ means that these assets are mutually interchangeable (*e.g., *one token has the same value as another token).

LSP7 Digital Assets are similar to [ERC20](https://eips.ethereum.org/EIPS/eip-20) Tokens.

LSP7 Digital Asset is an interface standard, meaning it creates a joint base to use and interact with such assets. Contracts and clients can query and transfer such assets in the same way, using the same methods.

This standard was based on ERC20 and [ERC777](https://eips.ethereum.org/EIPS/eip-777).

## Divisible _vs_ Non-Divisible

When creating an LSP7 Digital Asset, it is possible to define the token as **divisible** or **non-divisible**.

When creating a **divisible** token, the token can have decimals (up to 18). The token amounts can then be fractionals, and it is possible to mint or transfer less than one token (_e.g., 0.3 tokens_).

On the contrary, an LSP7 Digital Asset created as **non-divisible** means that one of such tokens cannot be divided into fractional parts. For instance, you cannot transfer 1/10th of a token, or 0.3 tokens, but only a whole token unit.

## References

- [LUKSO Standards Proposals: LSP7 - Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)
