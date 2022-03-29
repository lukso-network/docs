---
title: Interfaces Ids
sidebar_position: 10
---

# Interfaces Ids

**Interfaces Ids** helps to check if a contract supports a specific interface, it's a meta-interface so to say. This is useful if we want to interact with a contract but we don't know if it supports an interface such as **[ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y)** or **[LSP1UniversalReceiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)**, etc.

The **supportsInterface** function from **[ERC165 Standard](https://eips.ethereum.org/EIPS/eip-165)** returns **TRUE** if the standard is supported, **FALSE** otherwise.

:::note
**_Interface Ids are not the best secure way to ensure that a contract implements specific functions as its manually set and could be set by anyone to any value._**
:::

| Contract                          | InterfaceId  | Description                                                           |
| :-------------------------------- | :----------- | :-------------------------------------------------------------------- |
| **ERC725X**                       | `0x44c028fe` | General executor.                                                     |
| **ERC725Y**                       | `0x714df77c` | General key-value store.                                              |
| **LSP1UniversalReceiver**         | `0x6bb56a14` | Universal Receiver entry function.                                    |
| **ERC1271**                       | `0x1626ba7e` | Standard Signature Validation Method for Contracts.                   |
| **LSP0ERC725Account**             | `0x481e0fe8` | Account that represent an identity on-chain                           |
| **LSP6KeyManager**                | `0x6f4df48b` | Controller for the ERC725Account.                                     |
| **LSP1UniversalReceiverDelegate** | `0xc2d7bcc1` | Universal Receiver delegated to an other smart contract.              |
| **LSP7DigitalAsset**              | `0xe33f65c3` | Digital Assets either fungible or non-fungible. _ERC20 A-like_        |
| **LSP8IdentifiableDigitalAsset**  | `0x49399145` | Identifiable Digital Assets (NFT). _ERC721 A-like_                    |
| **LSP9Vault**                     | `0x5e38b596` | Vault that could interact with other smart contracts and hold assets. |
