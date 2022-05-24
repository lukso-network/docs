---
title: Interfaces IDs
sidebar_position: 10
---

# Interfaces IDs

**Interfaces IDs** help check if a contract supports a specific interface, e.g., its meta-interface. They are helpful if we want to interact with a contract but don't know if it supports an interface such as **[ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y)**, **[LSP1UniversalReceiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)**, etc.

The **supportsInterface** function from the **[ERC165](https://eips.ethereum.org/EIPS/eip-165)** standard returns `true` if the standard is supported, `false` otherwise.

Interface IDs can be easily accessed in your code using the [LSP smart contract implementations](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) as follows:
```js
import { INTERFACE_IDS } from "@lukso/lsp-smart-contracts/constants.js"

const ERC725X_ID = INTERFACE_IDS.ERC725X
```

:::note
_Interface IDs are not the most secure way to ensure that a contract implements a specific set of functions, as they are manually set and can be set to any value._
:::

| Contract                          | InterfaceId  | Description                                                           |
| :-------------------------------- | :----------- | :-------------------------------------------------------------------- |
| **ERC725X**                       | `0x44c028fe` | General executor.                                                     |
| **ERC725Y**                       | `0x714df77c` | General Data key-value store.                                         |
| **LSP1UniversalReceiver**         | `0x6bb56a14` | Universal Receiver entry function.                                    |
| **ERC1271**                       | `0x1626ba7e` | Standard Signature Validation Method for Contracts.                   |
| **LSP0ERC725Account**             | `0x9a3bfe88` | Account that represent an identity on-chain                           |
| **LSP6KeyManager**                | `0xc403d48f` | Controller for the ERC725Account.                                     |
| **LSP1UniversalReceiverDelegate** | `0xc2d7bcc1` | Universal Receiver delegated to an other smart contract.              |
| **LSP7DigitalAsset**              | `0xe33f65c3` | Digital Assets either fungible or non-fungible. _ERC20 A-like_        |
| **LSP8IdentifiableDigitalAsset**  | `0x49399145` | Identifiable Digital Assets (NFT). _ERC721 A-like_                    |
| **LSP9Vault**                     | `0x8c1d44f6` | Vault that could interact with other smart contracts and hold assets. |
| **ClaimOwnership**                | `0xad7dd9b0` | Modified version of [ERC173](https://eips.ethereum.org/EIPS/eip-173) |
