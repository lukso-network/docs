---
title: Introduction
sidebar_position: 1
---

# Smart Contract Implementation

:::success Documentation

The smart contracts are public and open source. They can be found [on GitHub](https://github.com/lukso-network/lsp-smart-contracts) and in the [NPM package available here](https://www.npmjs.com/package/@lukso/lsp-smart-contracts).

:::

In this section, you will find the implementation of **[LUKSO Standard Proposals](../introduction.md)**. Some of the standards do not have a contract implementation as they represent **Metadata-Standards** to be used in the implementation contracts.

Developers wishing to understand the standards in terms of code and the tradeoffs within are well-advised to read these documents alongside the Solidity code itself.

---

## Overview

The contracts can be divided by their usage. Some are related to **Universal Profiles**, while others are related to **Digital Assets and NFT 2.0**. Finally, some standards are for more **general use cases**.

### Universal Profile

The **Universal Profile** contracts allow a better representation of the identity on the blockchain and better control over it.

- **[LSP0 - ERC725Account](./02-lsp0-erc725-account.md)**: a contract that can be used as an account and represents an **identity on-chain**.
- **[LSP1 - UniversalReceiverDelegateUP](./03-lsp1-universal-receiver-delegate-up.md)**: a contract that allows the account to react to the calls that it receives (Normal transaction, Token transfer, Vaults transfer, etc.).
- **[LSP6 - KeyManager](./05-lsp6-key-manager.md)**: a contract that allows **multi-control** over the account using different permissions.

### Digital Assets

The **Digital Assets and NFT 2.0** contracts are the newest advanced version of the existing token standards. They come with many features that enhance the security and the overall user experience and compatibility with [ERC725Accounts](../universal-profile/02-lsp0-erc725account.md) and [Universal Receivers](../generic-standards/01-lsp1-universal-receiver.md).

- **[LSP4 - DigitalAsset-Metadata](./lsp4-digital-asset-metadata)**: a contract that sets the **metadata** of the **Digital Asset**.
- **[LSP7 - DigitalAsset](./06-lsp7-digital-asset.md)**: a contract that either represents a fungible or non-fungible token (NFT).
- **[LSP8 - IdentifiableDigitalAsset](./07-lsp8-identifiable-digital-asset.md)**: a contract representing a non-fungible token (NFT). It uses a bytes32 tokenId to allow many uses of token identification, including numbers, contract addresses, and hashed values (e.g., serial numbers).

### Periphery

These contracts are not just related to one specific section and could be used with the **Universal Profile**, **Digital Asset**, and **NFT 2.0** contracts.

- **[LSP9 - Vault](./08-lsp9-vault.md)**: a contract representing a **Vault** able to execute and hold assets could be owned by an LSP0ERC725Account contract.
- **[LSP1 - UniversalReceiverDelegateVault](./09-lsp10-universal-receiver-delegate-vault.md)**: a contract that allows the vault to react to the calls it receives (Normal transaction, Token transfer, etc.).

## Installation

```bash
npm install @lukso/lsp-smart-contracts
```

## Usage

### Create a Universal Profile

```solidity
// MyUP.sol
// SPDX-License-Identifier: MIT

import "@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol";

pragma solidity ^0.8.0;

contract MyUP is UniversalProfile {

    constructor() UniversalProfile(msg.sender) {
        // ..
    }
}
```

### Create a Fungible token

```solidity
// MyToken.sol
// SPDX-License-Identifier: MIT

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/06-LSP7DigitalAsset.sol";

pragma solidity ^0.8.0;

contract MyToken is LSP7DigitalAsset {
    // 4th argument (false) marks that this contract serves as a Fungible Token and not as a NFT.
    constructor() LSP7DigitalAsset("MyToken","MTKN",msg.sender,false) {
        // ..
    }

    function mint() public {
        _mint(...);
    }
}
```

## Further Information

- **[UniversalProfile & Identity Section](https://youtu.be/SbTo_e3l_Lk?t=1727)**
- **[NFT 2.0 Section](https://youtu.be/hg1Ow6u9QVk)**
