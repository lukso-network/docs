---
title: Introduction
sidebar_position: 1
---

# Smart Contract Implementation

In this section, you will find the implementation of **[LUKSO Standard Proposals](../introduction.md)**, some of the standards don't have a contract implementation as they represent **Metadata-Standards** to be used in the implementation contracts.

Developers wishing to understand the standard in terms of code and the tradeoffs within it will be well-advised to read these documents alongside the Solidity code itself.

The smart contracts are public and open source. They can be found [on Github here](https://github.com/lukso-network/lsp-universalprofile-smart-contracts), with an [NPM package available here](https://www.npmjs.com/package/@lukso/universalprofile-smart-contracts).

---


## Overview

The contracts could be divided in their usage, some of them are related to the **UniversalProfile** section, some of them are related to the **NFT 2.0** section and some have more **general usecases**.

### UniversalProfile
The **UniversalProfile** contracts allows a better representation of the identity on the blockchain and a better control over it.
- **[LSP0ERC725Account](./lsp0-erc725-account.md)**: The contract to be used as an account that represent an **identity on-chain**.
- **[LSP1UniversalReceiverDelegateUP](./lsp1-universal-receiver-delegate-up.md)**: The contract that allows the account to react to the calls that it receives (Normal transaction, Token transfer, Vaults transfer etc .. ).
- **[LSP6KeyManager](./lsp6-key-manager.md)**: The contract that allows a better **multi-control** over the account along with different permissions.

### NFT 2.0
The **NFT 2.0** contracts are the newest advanced version of the token contracts with many features that enhance the securiy, gas saving and the overall user experience.
- **[LSP4DigitalAsset-Metadata](./lsp4-digital-asset-metadata)**: The contract that sets the **Token-Metadata**.
- **[LSP7DigitalAsset](./lsp7-digital-asset.md)**: The contract that can represent either fungible or non-fungible tokens.
- **[LSP8IdentifiableDigitalAsset](./lsp8-identifiable-digital-asset.md)**: The contract that represent an NFT, with a **bytes32 tokenId** to allow many uses of token identification including numbers, contract addresses, and hashed values (ie. serial numbers).

### Periphery 
These contracts are not just related to one specific section but could be used together with the **UniversalProfile** and **NFT 2.0** contracts.
- **[LSP9Vault](./lsp9-vault.md)**: The contract that represent a **Vault** able to execute and hold assets, could be owned by a **LSP0ERC725Account** contract.
- **[LSP1UniversalReceiverDelegateVault](./lsp1-universal-receiver-delegate-vault.md)**: The contract that allow the vault to react to the calls it receives (Normal transaction, Token transfer, etc .. ).


## Installation

```bash
npm install @lukso/universalprofile-smart-contracts
```

## Usage


### Create your own UniversalProfile

```solidity
// MyUP.sol
// SPDX-License-Identifier: MIT

import "@lukso/universalprofile-smart-contracts/contracts/UniversalProfile.sol";

pragma solidity ^0.8.0;

contract MyUP is UniversalProfile {

    constructor() UniversalProfile(msg.sender) {
        // ..
    }
}
```

### Create your own Fungible token

```solidity
// MyToken.sol
// SPDX-License-Identifier: MIT

import "@lukso/universalprofile-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";

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

## Learn More

- **[UniversalProfile & Identity Section](https://youtu.be/SbTo_e3l_Lk?t=1727)**
- **[NFT 2.0 Section](https://youtu.be/hg1Ow6u9QVk)**
