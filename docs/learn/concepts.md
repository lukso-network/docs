---
sidebar_label: '📑 Concepts & Glossary'
sidebar_position: 2
---

# Concepts & Glossary

## Universal Profile (UP)

A [Universal Profile (UP)](../standards/universal-profile/introduction.md) is a smart contract-based account that acts as the center for all your blockchain interactions. UPs are generic for various use cases, such as regular wallets, and can interact directly with onchain applications. Additionally, they also feature permission and asset management, updatable profile information, and let you interact as one persona through different controller keys.

:::info The importance of using Universal Profiles

Contrary to most EVM chains, you're encouraged on LUKSO to mainly use [Universal Profiles](../standards/universal-profile/introduction.md) as the account solution for dApps and as a gateway for your users to the LUKSO Blockchain. It is discouraged to use simple EOAs as accounts, as they are insecure, inflexible and don't track incoming assets. If you need a more general understanding of why we build our accounts on the smart contract level, we advise you to read about the [LUKSO Ecosystem](https://medium.com/lukso/lukso-ecosystem-part-1-4c3f5d67b081) concept.

:::

## Controller

In the [LSP6 Key Manager](../standards/universal-profile/lsp6-key-manager.md), the term _"controller"_ refers to a permissioned address. These addresses have permissions that allow them to perform certain actions on the [LSP0ERC725Account](../standards/universal-profile/lsp0-erc725account.md) linked with the Key Manager (e.g., setting data or transferring LYX from the account).

The controllers can be Externally Owned Accounts (EOA) or smart contracts. The Key Manager will allow or restrict access based on the permissions set for the calling address.
A controller can interact directly with the Key Manager, or it can sign messages that can then be executed by other parties (such as users or transaction relay services).

## Transaction Relay Service

A transaction relay service, often referred to as a relayer, is a solution designed to improve the blockchain user experience by addressing the issue of gas fees - the costs users pay when executing transactions on a blockchain.

Typically, users must have the blockchain's native token to pay these gas fees. However, a relayer works around this problem. Users can send their signed transactions to the relayer. The relayer will then execute the transaction on their behalf and cover the associated gas cost.
Payment to the relayer can be handled in different ways. One option is an onchain payment where the fees are deducted directly from an onchain balance. Alternatively, users can set up an offchain agreement with the relayer service via a subscription model that gives them a monthly allowance for relayed transactions. This flexibility allows users to choose the method that best suits their needs.

Currently, on LUKSO there is a Transaction Relay Service that subsidizes early users' gas fees. In the future, various relay services will be offered by multiple third parties, evolving into a competitive relay ecosystem with various business models.
