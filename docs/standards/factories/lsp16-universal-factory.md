---
sidebar_label: 'LSP16 - Universal Factory'
sidebar_position: 1
description: LUKSO's LSP16 - Universal Factory for deploying the same smart contracts to the same address across different chains.
---

# LSP16 - Universal Factory

:::info Standard Document

[LSP16 - Universal Factory](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-16-UniversalFactory.md)

:::

> **Goals:**
>
> - Multi-chain compatibility
> - CREATE2 opcode for the deployment of various contracts

LSP16 introduces a universal factory for deploying smart contracts using the CREATE2 opcode, ensuring consistent contract addresses across multiple blockchains. This standard allows for the deployment of various contract types, including initializable contracts, with initialization data included in the deployment process to prevent address squatting. By leveraging the Nick Factory for deployment, LSP16 enables a decentralized way to replicate contract addresses on any chain, facilitating multi-chain identity and asset management. This approach offers significant advantages, such as ensuring that assets sent across chains reach their intended contract by maintaining consistent contract addresses. LSP16 is a cornerstone for building interoperable and scalable blockchain applications, offering developers a reliable tool for multi-chain deployment and management.

## Introduction

The use of different blockchain networks has brought with it a unique challenge: ensuring that an entity or user controlling an address on one chain can have the same control on another chain. For Externally Owned Accounts, this is known, as possessing the private key of the address means control over it regardless of the chain.

![EOA Control](/img/standards/lsp16/EOA-Control.jpeg)

Currently, this control isn't guaranteed when it comes to smart contracts. Even if a contract resides at a particular address on one chain, the same contract does not necessarily exist at the same address on another chain or even a possibility of not having a contract at all on the other chain at the same address.

![EOA Control](/img/standards/lsp16/Contract-Control.jpeg)

When it comes to EOAs, people can send assets to EOA on any chain as there is a known control over any chain. This situation creates a problem where assets might be sent to a contract on a different chain under the assumption that it's identical and under the sender's control, which may not be the case.

Therefore, it's preferable to opt for a situation that can allow for the creation of identical smart contracts at the same addresses across different chains.

## What does this standard represent?

This standard defines a contract called **Universal Factory** which provide a way to deploy the same contracts at the same addresses across different chains given few requirements.

![UniversalFactory](/img/standards/lsp16/UniversalFactory.jpeg)

This multi-chain compatibility eliminates the **risk of asset loss** due to mismatched contracts and addresses. Further, it opens up the possibility of establishing a kind of multi-chain identity, which is particularly beneficial for factory, registry, and account-based contracts.

### Specification

:::tip

Check the [**LSP16UniversalFactory contract functions**](../../contracts/contracts/LSP16UniversalFactory/LSP16UniversalFactory.md) to know how to deploy contracts at the same address across different chains.

Check the **JavaScript** guides to know [**How to deploy contracts at the same address across different chains.**](../../learn/other-guides/deploy-multichain-contracts.md)

:::

LSP16 establishes a range of functions to deploy different types of contracts using the [CREATE2](https://eips.ethereum.org/EIPS/eip-1014) opcode, including standard and initializable contracts (proxies).

For initializable contracts, the initialization data is included into the salt to prevent address squatting across chains.

Additionally, it ensures that the same bytecode and salt will create the same contract address on different chains, given that the UniversalFactory contract was deployed on the same address on each chain.

For a contract to be replicated at the same address across different chain, it should be deployed using the same:

- Bytecode
- Salt
- Initialization Data (If the contract is initializable)

### Example

Suppose Alice wants to deploy a **UniversalProfile** on **LUKSO Mainnet** owned by her EOA. If she deploys the UniversalProfile using the UniversalFactory on LUKSO, she can later deploy the same UniversalProfile owned by her EOA on **Ethereum Mainnet** using the UniversalFactory with **producing the same address**.

This interoperability also ensures that if Alice, or anyone else, sends assets to the contract's address on one chain, **those assets can be accessed** on the other chain as well, preventing inadvertent loss of assets and creating a **multi-chain identity**.
