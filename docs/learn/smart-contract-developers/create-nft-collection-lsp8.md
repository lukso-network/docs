---
sidebar_label: '🗃 Create an NFT Collection with LSP8'
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an NFT Collection Using LSP8

This tutorial explains how to create a collection of unique Digital Assets based on the [LSP8-Identifiable-Digital-Asset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) standard.

:::note

This guide builds on top of a Hardhat project using TypeScript as described in the [Getting Started](../smart-contract-developers/getting-started.md) section.

:::

:::info

⌨️ The full code of this example can be found in the 👾 [LUKSO-Hardhat-template](https://github.com/CJ42/LUKSO-Hardhat-template) repository.

:::

## Setup

To create your custom contract based on the [LUKSO smart contracts](../../contracts/introduction.md), you will need the [`@lukso/lsp-smart-contracts`](../../tools/lsp-smart-contracts/getting-started.md) library. Go ahead and add it to your project:

```shell
npm install @lukso/lsp-smart-contracts
```

## Create the Smart Contracts

When creating smart contracts representing digital assets on LUKSO, you will need to specify the token type and data keys for the 📄 [LSP4 Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata) that will be stored in the 🗂️ [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage of the Digital Asset. There are three different token types:

- `0` = Token
- `1` = NFT
- `2` = Collection

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

The data key value `0xe026...` is the keccak256 hash of the word `LSP4TokenType` as defined by the [LSP2 - ERC725Y JSON Schema](../../standards/generic-standards/lsp2-json-schema.md#singleton) standard.

After defining the type of the asset and its 🗂️ [ERC725 data key](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) you can create a custom 🌄 [LSP8 Identfiable Digital Asset Collection](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) that extends [LSP8Mintable](../../contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.md) so that new assets can be created within the smart contract.

```solidity title="contracts/Example3/BasicNFTCollection.sol"
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

## Deploy the Smart Contract

The contract is ready, it's time to deploy it. You can easily do it with hardhat deployment script.

<!-- prettier-ignore-start -->

```js title="scripts/deploy.ts"
import { ethers } from "hardhat";

import {BasicNFTCollection, BasicNFTCollection__factory} from "../typechain-types";

async function deployLSP8Collection() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  const nftCollection: BasicNFTCollection = await new BasicNFTCollection__factory(deployer).deploy(
      "NFT Collection Name", // collection name
      "NFT", // collection symbol
      deployer.address
  );
  const nftCollectionAddress = await nftCollection.getAddress()
  console.log("NFT Collection deployed to:", nftCollectionAddress)
  console.log("Check the block explorer to see the deployed contract")
}

deployLSP8Collection().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

If you get issues related to `typechain-types`, you need to generate the types with:

```
npx hardhat typechain
```

<!-- prettier-ignore-end -->

Finally, run the deploy script:

```sh
npx hardhat run --network luksoTestnet scripts/deploy.ts
```

:::tip

The [Create a deploy script](./create-lsp7-token#create-a-deploy-script.md) section of the Create LSP7 Token guide gives more details and information about how to deploy the contracts.

:::

## View your NFT Collection

You can now use the contract address to check the deployment on the [testnet execution block explorer](https://explorer.execution.testnet.lukso.network/)

<!-- TODO: add link to NFT marketplaces / dapp that can read such NFTs -->

## References

- [BuildUP #2 | Create an NFT Collection using LSP7 or LSP8 (YouTube)](https://www.youtube.com/watch?v=DMpeMswK12w)
