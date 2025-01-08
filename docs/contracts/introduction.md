---
title: Introduction
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {ContractCardsGallery} from '@site/src/components/ContractCardsGallery';

# Smart Contracts

**Welcome to the LUKSO Smart Contracts documentation!**

You will find on this page all the documentation and resources related to the `@lukso/lsp-smart-contracts`, the reference implementation in Solidity of the **[LSPs (LUKSO Standard Proposals)](../standards/introduction.md)**.

Each LSP standard and features are implemented in separate contracts under their own package. This allows developers to *"pick and choose"* the contracts for the requirements and behaviours they need for their protocols and applications. The `@lukso/lsp-smart-contracts` package also contains all the LSPs implementations listed below.

This modular design also helps in making the codebase easier to navigate and understand for developers using it.

<div style={{display: "flex", justifyContent: "space-between"}}>

<div style={{width: "46%"}}>

| Package                                                                                                                              | Version                                                                                                                                                                                                                                                                                            |
| :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts)                                                 | <a href="https://www.npmjs.com/package/@lukso/lsp-smart-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp-smart-contracts.svg?style=flat&label=NPM&logo=npm"/></a>     |
| [`@lukso/lsp0-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp0-contracts)                 | <a href="https://www.npmjs.com/package/@lukso/lsp0-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp0-contracts.svg?style=flat&label=NPM&logo=npm"/></a>               |
| [`@lukso/lsp1-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp1-contracts)                 | <a href="https://www.npmjs.com/package/@lukso/lsp1-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp1-contracts.svg?style=flat&label=NPM&logo=npm"/></a>               |
| [`@lukso/lsp1delegate-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp1delegate-contracts) | <a href="https://www.npmjs.com/package/@lukso/lspdelegate-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lspdelegate-contracts.svg?style=flat&label=NPM&logo=npm"/></a> |
| [`@lukso/lsp2-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp2-contracts)                 | <a href="https://www.npmjs.com/package/@lukso/lsp2-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp2-contracts.svg?style=flat&label=NPM&logo=npm"/></a>               |
| [`@lukso/lsp3-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp3-contracts)                 | <a href="https://www.npmjs.com/package/@lukso/lsp3-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp3-contracts.svg?style=flat&label=NPM&logo=npm"/></a>               |
| [`@lukso/lsp4-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp4-contracts)                 | <a href="https://www.npmjs.com/package/@lukso/lsp4-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp4-contracts.svg?style=flat&label=NPM&logo=npm"/></a>               |
| [`@lukso/lsp5-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp5-contracts)                 | <a href="https://www.npmjs.com/package/@lukso/lsp5-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp5-contracts.svg?style=flat&label=NPM&logo=npm"/></a>               |
| [`@lukso/lsp6-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp6-contracts)                 | <a href="https://www.npmjs.com/package/@lukso/lsp6-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp6-contracts.svg?style=flat&label=NPM&logo=npm"/></a>               |
| [`@lukso/lsp7-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp7-contracts)                 | <a href="https://www.npmjs.com/package/@lukso/lsp7-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp7-contracts.svg?style=flat&label=NPM&logo=npm"/></a>               |
| [`@lukso/lsp8-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp8-contracts)                 | <a href="https://www.npmjs.com/package/@lukso/lsp8-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp8-contracts.svg?style=flat&label=NPM&logo=npm"/></a>               |
| [`@lukso/lsp9-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp9-contracts)                 | <a href="https://www.npmjs.com/package/@lukso/lsp9-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp9-contracts.svg?style=flat&label=NPM&logo=npm"/></a>               |

</div>

<div style={{width: "50%"}}>

| Package                                                                                                                                                  | Version                                                                                                                                                                                                                                                                                                                  |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@lukso/lsp10-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp10-contracts)                                   | <a href="https://www.npmjs.com/package/@lukso/lsp10-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp10-contracts.svg?style=flat&label=NPM&logo=npm"/></a>                                   |
| [`@lukso/lsp11-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp11-contracts)                                   |                                                                                                                                                                                                                                                                                                                          |
| [`@lukso/lsp12-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp12-contracts)                                   | <a href="https://www.npmjs.com/package/@lukso/lsp12-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp12-contracts.svg?style=flat&label=NPM&logo=npm"/></a>                                   |
| [`@lukso/lsp14-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp14-contracts)                                   | <a href="https://www.npmjs.com/package/@lukso/lsp14-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp14-contracts.svg?style=flat&label=NPM&logo=npm"/></a>                                   |
| [`@lukso/lsp16-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp16-contracts)                                   | <a href="https://www.npmjs.com/package/@lukso/lsp16-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp16-contracts.svg?style=flat&label=NPM&logo=npm"/></a>                                   |
| [`@lukso/lsp17-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp17-contracts)                                   | <a href="https://www.npmjs.com/package/@lukso/lsp17-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp17-contracts.svg?style=flat&label=NPM&logo=npm"/></a>                                   |
| [`@lukso/lsp17contractextension-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp17contractextension-contracts) | <a href="https://www.npmjs.com/package/@lukso/lsp17contractextension-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp17contractextension-contracts.svg?style=flat&label=NPM&logo=npm"/></a> |
| [`@lukso/lsp20-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp20-contracts)                                   | <a href="https://www.npmjs.com/package/@lukso/lsp20-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp20-contracts.svg?style=flat&label=NPM&logo=npm"/></a>                                   |
| [`@lukso/lsp23-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts)                                   | <a href="https://www.npmjs.com/package/@lukso/lsp23-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp23-contracts.svg?style=flat&label=NPM&logo=npm"/></a>                                   |
| [`@lukso/lsp25-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp25-contracts)                                   | <a href="https://www.npmjs.com/package/@lukso/lsp25-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/lsp25-contracts.svg?style=flat&label=NPM&logo=npm"/></a>                                   |
| [`@lukso/lsp26-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp26-contracts)                                   |                                                                                                                                                                                                                                                                                                                          |
| [`@lukso/universalprofile-contracts`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/universalprofile-contracts)             | <a href="https://www.npmjs.com/package/@lukso/universalprofile-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" class="shield-badge" src="https://img.shields.io/npm/v/@lukso/universalprofile-contracts.svg?style=flat&label=NPM&logo=npm"/></a>             |

</div>

</div>

## Installation

### with npm, yarn or pnpm

To get all the LSP smart contracts, install the `@lukso/lsp-smart-contracts`.

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

You can also install individual package based on the LSP that you need (see table above). For instance, if you only need the LSP7 Digital Asset contract implementation for your project, simply install the `@lukso/lsp7-contracts` package.

<Tabs>
  <TabItem value="npm" label="npm">

```bash
npm install @lukso/lsp7-contracts
```

  </TabItem>

  <TabItem value="yarn" label="yarn">

```bash
yarn add @lukso/lsp7-contracts
```

  </TabItem>

  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add @lukso/lsp7-contracts
```

  </TabItem>

</Tabs>

### with Foundry

Currently, the monorepo structure of the LSP Smart Contracts create issues when installing via Foundry and forge. As a workaround, it is recommend to use the following method:

1. install the smart contract package with your preferred package manager as shown above (npm, yarn or pnpm).

```bash
npm i @lukso/lsp7-contracts
```

2. add the following in your `remappings.txt` or `foundry.toml`.

```txt title="remappings.txt"
@lukso/=node_modules/@lukso/
```

This will install the LUKSO LSP Solidity contracts in your `node_modules/` folder and forge will remap your `import @lukso/...` statements in your `.sol` files by locating the LSP contracts in the `node_modules/` folder.

## Overview

Overall the contracts can be divided by their usage.

<ContractCardsGallery />

## Types of contracts

:::info

If you are using base contracts and are deploying proxies for your application, it is recommended to use a factory pattern to deploy and initialize the proxies to avoid potential front-running issues.

The **LSP16 Universal Factory** or **LSP23 Linked Contract Deployment** can help you achieve this.

:::

The `@lukso/lsp-smart-contracts` repository contains two types of contracts:

| Type                   | Description                                                                                                                  | Example                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **Standard contracts** | One contract deployed per user. Deployed and initialized via a `constructor`.                                                | `LSP0ERC725Account.sol`     |
| **Base contracts**     | Deploy one contract for all users. To be used as base contract behind proxies. Initialized via a `initialize(...)` function. | `LSP0ERC725AccountInit.sol` |

## LSP Recipes

Some of the LSP standards do not have a contract implementation as they represent **Metadata-Standards** to be used in the implementation contracts.

Each contracts are not just related to one specific section. They could be used in different fashion and combination, with the **Universal Profile**, **Digital Asset**, and **NFT 2.0** contracts.

For instance, the **Universal Profile Browser extension** comprises a set of contracts allow a better representation of the identity on the blockchain and better control over it.

## Further Information

- [UniversalProfile & Identity Section](https://youtu.be/SbTo_e3l_Lk?t=1727)
- [NFT 2.0 Section](https://youtu.be/hg1Ow6u9QVk)
- [LSP Smart Contracts - Detailed Architecture Diagram](https://twitter.com/gpersoon/status/1676588871255990272) by [@gpersoon](https://twitter.com/gpersoon)
