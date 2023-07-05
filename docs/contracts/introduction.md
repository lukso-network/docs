---
title: Introduction
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Smart Contracts

> The smart contracts are public and open source on [GitHub](https://github.com/lukso-network/lsp-smart-contracts). <a href="https://github.com/lukso-network/lsp-smart-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="github badge" src="https://img.shields.io/github/v/release/lukso-network/lsp-smart-contracts?logo=github&label=Github"/></a>
>
> They are available as an npm package [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts). <a href="https://www.npmjs.com/package/@lukso/lsp-smart-contracts" target="_blank" rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} alt="npm badge" src="https://img.shields.io/npm/v/@lukso/lsp-smart-contracts.svg?style=flat&label=NPM&logo=npm"/></a>

<br/>

**Welcome to the LUKSO Smart Contracts documentation!**

In this section, you will find all the documentation and resources related to the `@lukso/lsp-smart-contracts`, the reference contract implementations in Solidity of the **[LUKSO Standard Proposals](../standards/introduction.md)**.

Developers wishing to understand the logic behind the standards and their tradeoffs within are well-advised to read these documents alongside the Solidity code itself.

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

Overall, the contracts can be divided by their usage, related to:

- **Universal Profiles**
- **Digital Assets and NFT 2.0**
- **General use cases**.

Some of the LSP standards do not have a contract implementation as they represent **Metadata-Standards** to be used in the implementation contracts.

### Universal Profile

The **Universal Profile** contracts allow a better representation of the identity on the blockchain and better control over it.

- **[LSP0ERC725Account](../standards/smart-contracts/lsp0-erc725-account.md)**: a contract that can be used as an account and represents an **identity on-chain**.
- **[LSP1UniversalReceiverDelegateUP](../standards/smart-contracts/lsp1-universal-receiver-delegate-up.md)**: a contract that allows the account to react to the calls that it receives (Normal transaction, Token transfer, Vaults transfer, etc.).
- **[LSP6KeyManager](../standards/smart-contracts/lsp6-key-manager.md)**: a contract that allows **multi-control** over the account using different permissions.
- **LSP11BasicSocialRecovery**

### Digital Assets

The **Digital Asset (Token and NFT 2.0)** contracts are the newest advanced version of the existing token standards. They come with many features that enhance the security and the overall user experience and compatibility with [ERC725Accounts](../standards/universal-profile/lsp0-erc725account.md) and [Universal Receivers](../standards/generic-standards/lsp1-universal-receiver.md).

- **[LSP4DigitalAssetMetadata](./contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.md)**: a contract that sets the **metadata** of the **Digital Asset**.
- **[LSP7DigitalAsset](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md)**: a contract that either represents a fungible or non-fungible token (NFT).
- **[LSP8IdentifiableDigitalAsset](../standards/smart-contracts/lsp8-identifiable-digital-asset.md)**: a contract that represents a non-fungible token (NFT). It uses a bytes32 tokenId to allow many uses of token identification, including numbers, contract addresses, and hashed values (e.g., serial numbers).

### Generic Standards

These contracts are not just related to one specific section and could be used with the **Universal Profile**, **Digital Asset**, and **NFT 2.0** contracts.

- **[LSP9Vault](../standards/smart-contracts/lsp9-vault.md)**: a contract representing a **Vault** able to execute and hold assets could be owned by an LSP0ERC725Account contract.
- **[LSP1UniversalReceiverDelegateVault](../standards/smart-contracts/lsp1-universal-receiver-delegate-vault.md)**: a contract that allows the vault to react to the calls it receives (Normal transaction, Token transfer, etc.).
- **LSP14Ownable2Step**
- **LSP17ContractExtension**
- **LSP20CallVerification**

## Further Information

- [UniversalProfile & Identity Section](https://youtu.be/SbTo_e3l_Lk?t=1727)
- [NFT 2.0 Section](https://youtu.be/hg1Ow6u9QVk)
