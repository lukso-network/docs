---
title: Introduction
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {ContractCardsGallery} from '@site/src/components/ContractCardsGallery';

# Smart Contracts

> The smart contracts are public and open source on [GitHub](https://github.com/lukso-network/lsp-smart-contracts). <a href="https://github.com/lukso-network/lsp-smart-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="github badge" src="https://img.shields.io/github/v/release/lukso-network/lsp-smart-contracts?logo=github&label=Github"/></a>
>
> They are available as a npm package [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts). <a href="https://www.npmjs.com/package/@lukso/lsp-smart-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" src="https://img.shields.io/npm/v/@lukso/lsp-smart-contracts.svg?style=flat&label=NPM&logo=npm"/></a>

<br/>

**Welcome to the LUKSO Smart Contracts documentation!**

In this section, you will find all the documentation and resources related to the `@lukso/lsp-smart-contracts`, the reference contract implementations in Solidity of the **[LUKSO Standard Proposals](../standards/introduction.md)**.

The `@lukso/lsp-smart-contracts` codebase is modular, with each LSP standard and features implemented in separate contracts. This allows smart contract developers to _"pick and choose"_ the contracts for the requirements and behaviors they need for their protocols and applications. 

This modular design also helps in making the codebase easier to navigate and understand for developers using it.

## Installation

<Tabs>
  <TabItem value="npm" label="npm">

```bash
npm install @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="yarn" label="yarn">

```bash
yarn add @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>


## Overview

Overall the contracts can be divided by their usage.

<ContractCardsGallery />


## Types of contracts

:::info

If you are using base contracts and are deploying proxies for your application, it is recommended to use a factory pattern to deploy and initialize the proxies to avoid potential front-running issues. 

The **LSP16 Universal Factory** or **LSP23 Linked Contract Deployment** can help you achieve this.

:::

The `@lukso/lsp-smart-contracts` repository contains two types of contracts:

| Type                   | Description                                                                                                                 | Example                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **Standard contracts** | One contract deployed per user. Deployed and initialized via a `constructor`.                                               | `LSP0ERC725Account.sol`     |
| **Base contracts**     | Deploy one contract for all users. To be used as base contract behind proxies. Initialized via a `initalize(...)` function. | `LSP0ERC725AccountInit.sol` |


## LSP Recipes

Some of the LSP standards do not have a contract implementation as they represent **Metadata-Standards** to be used in the implementation contracts.

Each contracts are not just related to one specific section. They could be used in different fashion and combination, with the **Universal Profile**, **Digital Asset**, and **NFT 2.0** contracts.

For instance, the **Universal Profile Browser extension** comprises a set of contracts allow a better representation of the identity on the blockchain and better control over it.


## Further Information

- [UniversalProfile & Identity Section](https://youtu.be/SbTo_e3l_Lk?t=1727)
- [NFT 2.0 Section](https://youtu.be/hg1Ow6u9QVk)
- [LSP Smart Contracts - Detailed Architecture Diagram](https://twitter.com/gpersoon/status/1676588871255990272) by [@gpersoon](https://twitter.com/gpersoon)
