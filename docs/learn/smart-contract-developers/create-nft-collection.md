---
sidebar_label: '🗃 Create an NFT Collection'
sidebar_position: 4
---

# Create an NFT Collection Using LSP8

This tutorial will teach you how to create a collection of unique digital assets.

:::info
⌨️ The full code of this example can be found in the 👾 [lukso-hardhat-template](https://github.com/CJ42/LUKSO-Hardhat-template).
:::

## Setup

Make sure you have the following dependencies installed:

- [`ethers.js`](https://github.com/ethers-io/ethers.js/) (alternatively you can use [`web3.js`](https://github.com/web3/web3.js))
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

\```bash
npm install ethers @lukso/lsp-smart-contracts
\```

## Create the Smart Contracts

When creating digital asset smart contracts on LUKSO, you will need to specify the token type and the following data keys in the ERC725Y storage. There are three types that you can define:

- 0 = Token
- 1 = NFT
- 2 = Collection

```solidity title="contracts/TokenTypes.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

bytes32 constant _LSP4_TOKEN_TYPE_DATA_KEY = 0xe0261fa95db2eb3b5439bd033cda66d56b96f92f243a8228fd87550ed7bdfdb3;

enum TokenType {
    TOKEN,
    NFT,
    COLLECTION
}


```

You will also create a custom [LSP8 Identfiable Digital Asset Collection](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) that extends [LSP8Mintable](../../contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.md).

```solidity title="contracts/MyNFTCollection.sol"

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// modules
import {
    LSP8Mintable
} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol";

// constants
import {
    _LSP8_TOKENID_TYPE_NUMBER
} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";
import {_LSP4_TOKEN_TYPE_DATA_KEY, TokenType} from "../TokenTypes.sol";

contract BasicNFTCollection is LSP8Mintable {
    constructor(
        string memory nftCollectionName,
        string memory nftCollectionSymbol,
        address contractOwner
    )
        LSP8Mintable(
            nftCollectionName,        // NFT collection name
            nftCollectionSymbol,      // NFT collection symbol
            contractOwner,            // owner of the NFT contract (the address that controls it, sets metadata, can transfer the ownership of the contract)
            _LSP8_TOKENID_TYPE_NUMBER // type of NFT/ tokenIds
        )
    {
        // set token type
        _setData(_LSP4_TOKEN_TYPE_DATA_KEY, abi.encode(TokenType.COLLECTION));
    }
}
```

## Deploy our NFT Collection Contract on the LUKSO Testnet

```js
import { ethers } from "hardhat";

import {BasicNFTCollection, BasicNFTCollection__factory} from "../typechain-types";

async function deployLSP8Collection() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  const nftCollection: BasicNFTCollection = await new BasicNFTCollection__factory(deployer).deploy(
    "NFT Collection Name", // collection name
    "NFT",                 // collection symbol
    deployer.address
  );

}

deployLSP8Collection().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


```

## Congratulations 🥳

You have deployed your first LSP8 NFT Collection on the LUKSO Testnet.

## References

- [BuildUP #2 | Create an NFT Collection using LSP7 or LSP8 (YouTube)](https://www.youtube.com/watch?v=DMpeMswK12w)
