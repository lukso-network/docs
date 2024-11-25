---
sidebar_label: 'LSP23 - Linked Contracts Factory'
sidebar_position: 2
description: LUKSO's LSP23 Linked Contracts Factory to allow the deployment of primary and secondary smart contracts that are linked together.
---

# LSP23 Linked Contracts Factory

:::info Standard Document

[LSP23 - Linked Contracts Factory](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md)

:::

LSP 23 simplifies the deployment of interdependent smart contracts by providing a standardized way to deploy and link contracts that require knowledge of each other's details at creation. It addresses the challenge of circular dependencies in contract deployment, enabling the establishment of complex contract systems with ease. Through the use of post-deployment modules, LSP 23 also facilitates additional actions after contracts are deployed, streamlining the process and reducing potential errors. This standard is particularly beneficial for deploying contract ecosystems where components need to interact closely, ensuring seamless integration and interaction across the deployed contracts.

## Introduction

Deploying smart contracts that are interdependent can be a complex process. Often, two or more contracts need each other's addresses at deployment, creating a circular dependency that can be challenging to resolve.

![Circular Dependency](/img/standards/lsp23/circular-dependency.jpeg)

The LSP23 Linked Contracts Factory addresses this issue by providing a unified interface for deploying linked contracts with an optional post-deployment execution. This standard simplifies the deployment of complex contract systems, making it easier for developers to deploy interdependent contracts without the need for manual intervention.

## What does this standard represent?

This standard represents a smart contract factory that allows users to deploy **primary** and **secondary** contracts that are linked together. It also supports deploying contracts as `ERC1167` minimal proxies. The factory can execute post-deployment modules to perform additional logic after deploying the contracts (_example: pass the address of the secondary contract to the primary contract's `constructor` / initializer function_)

![LSP23 Flow](/img/standards/lsp23/lsp23-flow.jpeg)

Like [`LSP16`](./lsp16-universal-factory.md), the `LSP23` standard addresses the issue of deterministic address generation for contracts across different chains by generating the salt for contract deployment within the function, ensuring a fully decentralized deployment process. This approach guarantees consistent contract addresses across multiple chains and prevents "squatting addresses", enhancing the security and integrity of the deployment process.

## Specification

:::tip

Check the [**LSP23 LinkedContractsFactory contract functions**](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/docs/contracts/LSP23LinkedContractsDeployment/LSP23LinkedContractsFactory.md) to know how to deploy contracts at the same address across different chains.
:::

The `LSP23LinkedContractsFactory` contract provides two main functions for deploying linked contracts: [`deployContracts`](../../contracts/contracts/LSP23LinkedContractsDeployment/LSP23LinkedContractsFactory.md#deploycontracts) and [`deployERC1167Proxies`](../../contracts/contracts/LSP23LinkedContractsDeployment/LSP23LinkedContractsFactory.md#deployerc1167proxies). Both functions allow the deployment of primary and secondary contracts, with optional post-deployment modules.
You can find the [`IPostDeploymentModule`](../../contracts/contracts/LSP23LinkedContractsDeployment/IPostDeploymentModule.md) interface.

## Example

The deployment process for a [`Universal Profile`](../accounts/introduction.md) and its associated [`Key Manager`](../access-control/lsp6-key-manager.md) involves a series of steps that ensure proper integration and ownership assignment between the two contracts. The `Universal Profile` serves as the primary contract, while the `Key Manager` functions as the secondary contract. Both contracts require each other's addresses during deployment.

Using, `LSP23`, the deployment flow is outlined as follows:

- Deploy the `Universal Profile`, designating the post-deployment module as the initial owner of the `Universal Profile`.
- Deploy the `Key Manager`, providing it with the address of the newly deployed `Universal Profile`.
- Execute the post-deployment module to transfer ownership of the `Universal Profile` to the `Key Manager`. Additionally, carry out any other post-deployment logic as necessary.

![Universal Profile Deployment](/img/standards/lsp23/up-deployment.jpeg)
