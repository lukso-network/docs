---
sidebar_label: '🗃 Collection with LSP8'
sidebar_position: 1
description: Learn how to create an NFT Collection on LUKSO using LSP8 Identifiable Digital Asset standard.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an NFT Collection Using LSP8

This tutorial explains how to create a collection of unique Digital Assets based on the [LSP8-Identifiable-Digital-Asset](/standards/tokens/LSP8-Identifiable-Digital-Asset.md) standard.

:::note

This guide builds on top of a Hardhat project using TypeScript as described in the [Getting Started](../getting-started.md) section.

:::

:::tip

The full code of this example can be found in the smart contract section of the 👾 [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository.

:::

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/DMpeMswK12w?si=DqttxMJIv6c4H0FQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

When creating smart contracts representing digital assets on LUKSO, you need to specify the type of token you are deploying. This is done by setting the `LSP4TokenType` data key stored in the 🗂️ [ERC725Y](../../../standards/erc725.md#erc725y-generic-data-keyvalue-store) storage of the Digital Asset. There are three different [token types](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokentype):

- `0` = Token
- `1` = NFT
- `2` = Collection

For this example we will use the `Collection` token type. You can create a custom 🌄 [LSP8 Identifiable Digital Asset Collection](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) that extends [LSP8Mintable](../../../contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.md) so that new assets can be created within the smart contract.

```solidity title="contracts/BasicNFTCollection.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// modules
import {
    LSP8Mintable
} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol";

// constants
import {
    _LSP8_TOKENID_FORMAT_NUMBER
} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";
import {
    _LSP4_TOKEN_TYPE_COLLECTION
} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";


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
            _LSP4_TOKEN_TYPE_COLLECTION,     // type of the token is collection
            _LSP8_TOKENID_FORMAT_NUMBER // format of each `tokenId`s is number (represented as bytes32)
        )
    {}
}
```

The contract is ready, it's time to deploy it. You can easily do it with hardhat deployment script.

```js title="scripts/deploy.ts"
import { ethers } from 'ethers';
import BasicNFTCollectionArtifacts from './artifacts/BasicNFTCollection.json';

const accounts = await ethers.getSigners();
const deployer = accounts[0];

const contractFactory = await new ethers.ContractFactory(
  BasicNFTCollectionArtifacts.abi,
  BasicNFTCollectionArtifacts.bytecode,
  deployer,
);

const nftCollection = contractFactory.deploy(
  'NFT Collection Name', // collection name
  'NFT', // collection symbol
  deployer.address,
);
const nftCollectionAddress = await nftCollection.getAddress();
console.log('NFT Collection deployed to:', nftCollectionAddress);
console.log('Check the block explorer to see the deployed contract');
```

Finally, run the deploy script:

```sh
npx hardhat run --network luksoTestnet scripts/deploy.ts
```

You can now check out the NFT collection contract on the [execution block explorer](https://explorer.execution.testnet.lukso.network/) by pasting the address logged on the console to the search field of the block explorer.

<!-- TODO: add link to NFT marketplaces / dapp that can read such NFTs -->

## References

- [BuildUP #2 | Create an NFT Collection using LSP7 or LSP8 (YouTube)](https://www.youtube.com/watch?v=DMpeMswK12w)
