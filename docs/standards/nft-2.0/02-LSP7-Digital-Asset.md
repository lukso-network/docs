---
sidebar_label: 'LSP7 - Digital Asset'
---

# LSP7 - Digital Asset

:::caution This section is a work in progress.
:::

:::info Standard Document

[LSP7 - Digital Asset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)

:::

LSP7 Digital Asset is a standard that aims to describe a fungible asset. The term _fungible_ means that these assets are mutually interchangeable between each other (*eg: *one token has the same value than an other token).

LSP7 Digital Assets are similar in nature to [ERC20](https://eips.ethereum.org/EIPS/eip-20) Tokens.

LSP7 Digital Asset is an interface standard, meaning it creates a common base to use and interact with such assets. Contracts and clients can query and transfer such assets in the same way, using the same methods.

This standard was based on ERC20 and [ERC777](https://eips.ethereum.org/EIPS/eip-777).

## Divisible _vs_ Non-Divisible

When creating a LSP7 Digital Asset, it is possible to define the token as **divisible** or **non-divisible**.
This means that token amounts can have decimals (up to 18), an it is possible to mint or transfer less than 1 token (_eg: 0.3 tokens_).

On the contrary, a LSP7 Digital Asset created as **non-divisible** means that one of such token cannot be divided in fractional parts (for instance, you cannot transfer 1/10th of a token).

## References

- [LUKSO Standards Proposals: LSP7 - Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)
