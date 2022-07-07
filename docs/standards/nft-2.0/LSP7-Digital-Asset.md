---
sidebar_label: 'LSP7 - Digital Asset (Token)'
sidebar_position: 3
---

# LSP7 - Digital Asset

:::info Standard Document

[LSP7 - Digital Asset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)

:::


## Introduction

Fungible assets represented mainly by **[ERC20](https://eips.ethereum.org/EIPS/eip-20)** and other standards such as **[ERC223](https://eips.ethereum.org/EIPS/eip-223)** and **[ERC777](https://eips.ethereum.org/EIPS/eip-777)** have a lot of limitations in terms of metadata, secure transfers, and asset interaction. This is causing major problems for users seeking, **full control** over which assets they accept or not, and a **simple user experience** while creating, buying, and exchanging assets.

**[LSP7-DigitalAsset](#)** is the standard that aims to solve all problems mentioned above by allowing, more secure transfers via **force bool**, more asset metadata **via [LSP4-DigitalAssetMetadata](./LSP4-Digital-Asset-Metadata.md)**, and more interaction between the asset contract and the asset *sender/recipient* **via token hooks**.

![LSP7DigitalAsset features Introduction](/img/standards/lsp7-intro.jpeg)

## What does this Standard represent ?

### Specification

**[LSP7-DigitalAsset](#)** is a standard that aims to describe fungible assets. The term _fungible_ means that these assets are **mutually interchangeable** (*e.g., *one token has the same value as another token).

LSP7-DigitalAsset is an interface standard, meaning it creates a joint base to use and interact with such assets. Contracts and clients can query and transfer such assets in the same way, using the same methods.

This standard was based on **[ERC20](https://eips.ethereum.org/EIPS/eip-20)** and **[ERC777](https://eips.ethereum.org/EIPS/eip-777)**. It got enhanced by **unifying function names**, adding more functions (**batch transfers**), and lots of **new features** mentioned below.

### Divisible _Vs_ Non-Divisible

When creating assets compliant with **LSP7-DigitalAsset** standard, it is possible to define the token as **divisible** or **non-divisible**. When creating a **divisible** token, the token can have decimals (up to 18). The token amounts can then be fractionals, and it is possible to mint or transfer less than one token (_e.g., 0.3 tokens_).

On the contrary, a **non-divisible** asset means that one of such tokens cannot be divided into fractional parts. For instance, you cannot transfer **1/10th** of a token, or 0.3 tokens, but only a whole token unit.

**Tickets created as tokens** could be a great example, there is no need to create these tickets using **[LSP8-IdentifiableDigitalAsset](./LSP8-Identifiable-Digital-Asset.md)** standard, as all tickets are interchangeable and will look the same and have the same utility.


![LSP7DigitalAsset Non Divisible Assets](/img/standards/lsp7-non-divisible.jpeg)

### Unlimited Metadata

:::success Recommendation

To mark the **asset authenticity**, it's advised to use a combination between **[LSP4-DigitalAssetMetadata](./LSP4-Digital-Asset-Metadata.md)** and **[LSP12-IssuedAssets](../universal-profile/lsp12-issued-assets.md)**.

:::

The current token standards don't enable attaching metadata to the contract in a generic and flexible way, they set the **name**, **symbol**, and **tokenURI**. This is limiting for a digital asset that may want to express the creators, the community behind it, and to have the ability to update the metadata of the token and the tokenIds over time depending on a certain logic (Evolving tokens).  

To ensure a flexible and generic asset representation, the token contract should use the **[LSP4-DigitalAsset-Metadata](./LSP4-Digital-Asset-Metadata.md)**. In this way, any information could be attached to the token contract. 

### Force Boolean

It's estimated that more than **Hundreds of Millions of Dollars** worth of tokens were **sent to uncontrolled addresses** because of lacks of transfer validation checks.

It is expected in the LUKSO's ecosystem to use **smart contract based accounts** to operate on the blockchain, which includes receiving and sending tokens. EOAs can receive tokens but they will be mainly used to control these accounts and not to hold tokens.

To ensure a **safe asset transfer**, an additional boolean parameter was added to the transfer and mint functions where this parameter if set to **False**, the transfer will only pass if the recipient is a smart contract that implements the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard.

![Token Force Boolean False](/img/standards/tokens-force-false.jpeg)

:::note
Implementing the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard will give a sign that the contract knows how to handle the tokens received.
It's advised to set the **force** bool as **False** when transferring or minting tokens to avoid sending them to the wrong address.
:::

If set to **TRUE**, the transfer will not be dependent on the recipient, meaning **smart contracts** not implementing the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard and **EOAs** will be able to receive the tokens.

![Token Force Boolean True](/img/standards/tokens-force-true.jpeg)


### Token Hooks

The current token standards do not allow **informing the sender** or **the recipient** about the transfer because the token contract acts like a **registry contract** that just tracks the balance of each address. This is causing a big problem where people will receive tokens and not know about it.

During an **ERC20 token transfer**, the balance of the sender is decreased and the balance of the recipient is increased without further interaction. 

![ERC20 Transfer](/img/standards/erc20-transfer.jpeg)

On the opposite side, and during an **LSP7 token transfer**, the same mechanism is applied of increasing the balance of the recipient and decreasing the balance of the sender, with an additional action, which is **informing** the sender and the recipient by calling the   **[`universalReceiever(...)`](../generic-standards/lsp1-universal-receiver.md#lsp1---universal-receiver)** function on their profiles.

![LSP7DigitalAsset Transfer](/img/standards/lsp7-transfer.jpeg)

In this way, users will be **informed** about the token transfers and they will have full control to **react on the transfer** either by accepting the tranfser or rejecting it or implementing a custom logic to run on each transfer with the help of 
**[LSP1-UnviersalReceiverDelegate](../universal-profile/lsp1-universal-receiver-delegate.md)**.


## References

- [LUKSO Standards Proposals: LSP7 - Digital Asset (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)
