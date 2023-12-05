---
sidebar_label: '🔀 Migrate to LUKSO'
sidebar_position: 3
---

# Migrate to LUKSO

This page will overview the similarities and differences between the LUKSO ecosystem and regular Ethereum blockchains.

## What is LUKSO's Relationship to Ethereum?

LUKSO is an L1 blockchain ecosystem that focuses on creating and managing [user profiles](../standards/universal-profile/introduction.md), assets, and decentralized applications, introducing [unique features](./introduction.md) and standards, particularly around digital identity and creative industries. LUKSO's network is similar to Ethereum's PoS blockchain up to the Shanghai and Capella fork and uses the Ethereum Virtual Machine (EVM) for smart contract functionality. In the future, LUKSO plans to integrate upcoming forks further.

To participate in the network, the Ethereum clients can be run with a [custom network configuration](https://github.com/lukso-network/network-configs). To [run a node](/networks/mainnet/running-a-node.md), operators can use the LUKSO CLI, Dappnode, Docker, or manual installation.

In terms of programmability, LUKSO is similar to Ethereum's EVM. Therefore, all programming languages, developer tooling, and standards are relevant for both ecosystems. Developers building on LUKSO can write smart contracts in Solidity, use [Hardhat](https://hardhat.org/) for smart contract management, and use smart contract standards already developed for Ethereum.

You can read more about the network and concept on our FAQ pages:

- [Why did LUKSO launch as Layer 1 blockchain?](../faq/lukso/general-information.md#why-did-lukso-launch-as-a-layer-1-blockchain)
- [What are the main features of LSPs?](../faq/onboarding/lukso-standards.md#what-are-the-main-features-of-lsps)
- [What is the network architecture of LUKSO?](../faq/network/blockchain-architecture.md#what-is-the-network-architecture-of-lukso)

## Native assets and transactions

Like Ethereum, the LUKSO blockchain has its native coin, LYX, that can be stored on any Ethereum wallet with custom network support. However, users on LUKSO do not need LYX to interact on the network. When creating a [Universal Profile](../standards/universal-profile/introduction.md) through the [Universal Profile Browser Extension](/install-up-browser-extension), users get a free monthly quota of 20.000.000 GAS, subsidized by LUKSO using a [transaction relay service](../standards/relayer-api.md). It is planned to have a landscape of transaction relay services that people can choose from to allow indirect payment. All transaction objects are equal to Ethereum.

Before the mainnet started, the project's initial asset was [LYXe](https://etherscan.io/token/0xA8b919680258d369114910511cc87595aec0be6D), which is represented on the Ethereum blockchain. LYXe can be migrated to LYX using the migration service on [migrate.lukso.network](https://migrate.lukso.network/).

You can read more about the project's origins in the following pages and articles:

- [What are the project's origins](/faq/lukso/project-origins.md)
- [The LUKSO Mainnet Start](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba)
- [The LUKSO Migration](https://medium.com/lukso/the-lyxe-migration-process-374053e5ddf5)

## Network Interactions

The Universal Profile Browser Extension is the recommended way of interacting on LUKSO. It acts like a regular Ethereum wallet and uses the `window.ethereum` object. Developers can use their preferred libraries like [web3.js](https://web3js.readthedocs.io/) and [ethers.js](https://docs.ethers.org/) to interact with Universal Profiles like they do with other wallets. When [connecting](https://docs.lukso.tech/learn/dapp-developer/connect-profile.md), the extension automatically returns the address of the smart contract account. Similarly, the extension automatically verifies if the EOA controller has permission to [log-in](../learn/dapp-developer/siwe.md) or [execute transfers](../learn/dapp-developer/transfer-lyx.md).

:::success Developer Libraries

Check out our [Developer Tools](../tools/getting-started.md) for LSP smart contract deployments, smart contract interactions, and data retrievals.

:::

## Things to watch out for

- [Universal Profiles](../standards/universal-profile/introduction.md) are abstracted smart accounts that can be controlled with different accounts (either EOA or Smart Contract) having various permissions. Therefore, the address of the signer (controller) is decoupled from the address of the account (Universal Profile) you are interacting with. EOA signatures can still be verified off-chain. However, checking if the related EOA has the required [permissions](../standards/universal-profile/lsp6-key-manager#types-of-permissions) requires an on-chain call to the [Key Manager](../standards/universal-profile/lsp6-key-manager.md) of the account. The Universal Profile Browser Extension automatically handles permissions checks when interacting with dApps. If needed, signatures can be verified manually by [retrieving the controllers](../learn/expert-guides/key-manager/get-controller-permissions.md) of an account and checking their permissions.
- As developers interact with smart contracts with different or custom functionalities, verifying that certain conditions and methods are set before interacting with them is always recommended. Such checks can be done by [detecting interfaces and metadata](../learn/dapp-developer/standard-detection.md) of the given address.
- When doing network interactions without using a [transaction relay service](../standards/relayer-api.md), the controller of the Universal Profile has to be funded to execute network transactions on behalf of the account.

## Deploying Ethereum Contracts to LUKSO

As LUKSO is EVM compatible, all smart contracts written for Ethereum can easily be ported over by redeploying them. The main difference is that developers must connect to a [LUKSO node or RPC endpoint](../networks/mainnet/parameters) instead of an Ethereum node.

You can read more about smart contract development in the following guides and pages:

- [LSP smart contract development](../learn/smart-contract-developers/getting-started.md)
- [Technical LSP documentation](../contracts/introduction.md)
- [LSPs on GitHub](https://github.com/lukso-network/LIPs/)
