---
title: Interfaces IDs
sidebar_position: 2
---

import InterfaceIdsTable from "./\_interface_ids_table.mdx";

# Interfaces IDs

:::caution
Interface IDs are not the most secure way to ensure that a contract implements a specific set of functions, as they are manually set and can be set to any value.
:::

**Interfaces IDs** help check if a contract supports a specific interface, e.g., its meta-interface. They are helpful if we want to interact with a contract but don't know if it supports an interface such as **[ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y)**, **[LSP1UniversalReceiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)**, etc.

The **supportsInterface** function from the **[ERC165](https://eips.ethereum.org/EIPS/eip-165)** standard returns `true` if the standard is supported, `false` otherwise.

The interface IDs of each LSP standards can be easily imported in your code from the [`@lukso/lsp-smart-contracts` NPM package](https://www.npmjs.com/package/@lukso/lsp-smart-contracts). They are accessible as follow:

```js
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

const LSP0_INTERFACE_ID = INTERFACE_IDS.LSP0ERC725Account;
```

<details>
    <summary>Note on importing <code>INTERFACE_IDS</code> in Hardhat Typescript projects</summary>

If you are trying to import the `INTERFACE_IDS` within a Hardhat Typescript project, use the following import syntax:

```ts
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/dist/constants.cjs.js';

// This will raise an error if you have ES Lint enabled,
// but will allow you to import the constants in a Hardhat + Typescript based project.
const LSP0_INTERFACE_ID = INTERFACE_IDS.LSP0ERC725Account;
```

This is due to the current issue that it is not possible to import ES Modules in Hardhat Typescript projects.

</details>

<InterfaceIdsTable />
