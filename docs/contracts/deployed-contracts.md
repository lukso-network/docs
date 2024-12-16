---
title: ⛓ Deployed Implementation Contracts
description: List of base implementation and factory contracts addresses deployed on LUKSO Mainnet.
---

import { BaseContractsTable, FactoryContractsTable } from "@site/src/components/DeployedContractsTable"

# Deployed Implementation Contracts on LUKSO Mainnet

:::success Deployment Guides

Check our guide [**_🏭 Deploy Universal Profile + its Key Manager with LSP23 Factory_**](../learn/universal-profile/advanced-guides/deploy-up-with-lsp23.md) if you are looking for a script to deploy with the LSP23 Factory using _ethers.js_.

:::

Below is a list of contracts deployed on the LUKSO Mainnet for production usage. These contracts are deployed with `CREATE2` using the Nick Factory, so that they can be re-deployed at different addresses across multiple chains.

## 🏭 Factory contracts

The LSP23 Linked Contract Factory is used to deploy a full Universal Profile (with its Key Manager) and setup the main controller permissions. It is used by the UP Browser Extension and can be leveraged by any other dApp to deploy UPs.

<FactoryContractsTable />

## 📑 Implementation contracts

Below are the base implementation contracts deployed on mainnet.

They contain all the core logic of the **Universal Profile** 🆙, **LSP6 Key Manager** 🔐 and **LSP1 Universal Receiver Delegate** 📣. Proxies pointing to these implementations must be initialized via the `initialize(...)` function to work.

The Universal Profile and Key Manager contracts of each users are deployed as EIP1167 minimal proxy, with their bytecode pointing to these implementation contracts. Finally, each Universal Profile has its **default** Universal Receiver Delegate contract linked to its 🆙 contract via the [`LSP1UniversalReceiverDelegate`](/standards/accounts/lsp1-universal-receiver-delegate.md#lsp1universalreceiverdelegate-singleton) data key.

You can inspect these details via our [_erc725-inspect_](https://erc725-inspect.lukso.tech/inspector?address=0x0F4180da178ed1C71398a57ca8Cb177F69591f1f&network=mainnet) tool.

<BaseContractsTable />
