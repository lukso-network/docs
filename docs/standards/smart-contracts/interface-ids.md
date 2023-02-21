---
title: Interfaces IDs
sidebar_position: 2
---

# Interfaces IDs

**Interfaces IDs** help check if a contract supports a specific interface, e.g., its meta-interface. They are helpful if we want to interact with a contract but don't know if it supports an interface such as **[ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y)**, **[LSP1UniversalReceiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)**, etc.

The **supportsInterface** function from the **[ERC165](https://eips.ethereum.org/EIPS/eip-165)** standard returns `true` if the standard is supported, `false` otherwise.

:::note
_Interface IDs are not the most secure way to ensure that a contract implements a specific set of functions, as they are manually set and can be set to any value._
:::

Interface IDs can be easily accessed in your code using the [LSP smart contract NPM package](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) as follows. The accessible interface IDs can be found in the [constants.js file](https://github.com/lukso-network/lsp-smart-contracts/blob/main/constants.js)

```js
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/constants.js';

const ERC725X_ID = INTERFACE_IDS.ERC725X;
```

| Contract                         | InterfaceId Description |
| :------------------------------- | :---------------------- | :---------------------------------------------------------------------------------------------- |
| **ERC165**                       | `0x01ffc9a7`            | Standard Interface Detection.                                                                   |
| **ERC1271**                      | `0x1626ba7e`            | Standard Signature Validation Method for Contracts.                                             |
| **ERC725X**                      | `0x570ef073`            | General executor.                                                                               |
| **ERC725Y**                      | `0x714df77c`            | General Data key-value store.                                                                   |
| **LSP0ERC725Account**            | `0x0f15a0af`            | Account that represent an identity on-chain.                                                    |
| **LSP1UniversalReceiver**        | `0x6bb56a14`            | Universal Receiver entry function.                                                              |
| **LSP6KeyManager**               | `0xfb437414`            | Controller for the ERC725Account.                                                               |
| **LSP7DigitalAsset**             | `0xda1f85e4`            | Digital Assets either fungible or non-fungible. _ERC20 A-like_                                  |
| **LSP8IdentifiableDigitalAsset** | `0x622e7a01`            | Identifiable Digital Assets (NFT). _ERC721 A-like_                                              |
| **LSP9Vault**                    | `0x19331ad1`            | Vault that can hold assets and interact with other smart contracts.                             |
| **LSP11BasicSocialRecovery**     | `0x049a28f1`            | Mechanism to recover access control to an account.                                              |
| **LSP17Extendable**              | `0xa918fa6b`            | Module to add more functionalities to a contract using extensions.                              |
| **LSP17Extension**               | `0xcee78b40`            | Module to create a contract that can act as an extension.                                       |
| **LSP14Ownable2Steps**           | `0x94be5999`            | Extended version of [EIP173] (Ownable) with a 2-step process to transfer or renounce ownership. |

[eip173]: https://eips.ethereum.org/EIPS/eip-173
