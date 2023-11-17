---
sidebar_label: '👾 Create an NFT Collection with LSP7'
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an NFT Collection Using LSP7

This tutorial explores how to create a collection of [digital assets](../../standards/tokens/LSP7-Digital-Asset.md), where each digital asset is the same. This method is useful for minting large quantities of NFTs at once efficiently (eg: tickets for an event).

:::info

⌨️ The full code of this example can be found in the 👾 [lukso-hardhat-template](https://github.com/CJ42/LUKSO-Hardhat-template).

:::

:::note

This guide builds on top of a Hardhat project using TypeScript as described in the [Getting Started](../smart-contract-developers/getting-started.md) section.

:::

## Setup

Make sure you have the following dependencies installed:

- [`ethers.js`](https://github.com/ethers-io/ethers.js/) (alternatively you can use [`web3.js`](https://github.com/web3/web3.js))
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

```bash
yarn add ethers @lukso/lsp-smart-contracts
```

## Create the Smart Contracts

When creating smart contracts representing digital assets on LUKSO, you will need to specify the token type and data keys for the 📄 [LSP4 Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata) that will be stored in the 🗂️ [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage of the Universal Profile. There are three different token types:

- `0` = Token
- `1` = NFT
- `2` = Collection

```solidity title="contracts/TokenTypes.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

bytes32 constant _LSP4_TOKEN_TYPE_DATA_KEY = 0xe0261fa95db2eb3b5439bd033cda66d56b96f92f243a8228fd87550ed7bdfdb3; // kecca256 hash of the word `LSP4TokenType`

enum TokenType {
    TOKEN,
    NFT,
    COLLECTION
}
```

After defining the type of the asset and its 🗂️ [ERC725 data key](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) you can create a custom 🌄 [LSP7 Digital Asset Collection](../../standards/tokens/LSP7-Digital-Asset.md) that extends [LSP7Mintable](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md) so that new assets can be created within the smart contract.

```solidity title="contracts/EventTicketsNFT.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// modules
import {
    LSP7Mintable
} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol";

import {_LSP4_TOKEN_TYPE_DATA_KEY, TokenType} from "../TokenTypes.sol";

contract EventTicketsNFT is LSP7Mintable {
    constructor(
        string memory eventName,
        string memory tokenSymbol,
        address contractOwner
    )
        LSP7Mintable(
            eventName,
            tokenSymbol,
            contractOwner,
            true // make the token non divisible
        )
    {
        // set the token type
        _setData(_LSP4_TOKEN_TYPE_DATA_KEY, abi.encode(TokenType.TOKEN));
    }
}
```

Next you define the deployment script.

<Tabs groupId="web3-lib">
  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->
```js
import { ethers } from "hardhat";

import {
    EventTicketsNFT,
    EventTicketsNFT__factory
} from "../typechain-types";

async function deployAndCreateTickets() {
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    const luksoMeetupTickets: EventTicketsNFT = await new EventTicketsNFT__factory(
        deployer
    ).deploy(
        "LUKSO Meetup #2",
        "MUP2",
        deployer.address,
    )

    // create 100 entry tickets.
    // Give them to the deployer initially, who will distribute them afterwards.
    await luksoMeetupTickets.mint(
        deployer.address, // recipient
        100, // amount
        true, // force sending to an EOA
        "0x" // data
    );
    const luksoMeetupTicketsAddress = await luksoMeetupTickets.getAddress()
    console.log("NFT Collection deployed to:", luksoMeetupTicketsAddress)
    console.log("Check the block explorer to see the deployed contract")
    
}

deployAndCreateTickets().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

```
<!-- prettier-ignore-end -->
</TabItem>
<TabItem value="web3js" label="web3.js">

Swap to the latest version of node;

```sh
nvm install node
nvm use node
```

Install hardhat web3;

```sh
yarn add --save-dev @nomiclabs/hardhat-web3 'web3@^1.0.0-beta.36'
```

Add the following to your hardhat.config.ts;

```js
import '@nomiclabs/hardhat-web3';
```

Write your deployment script:

```js

import { ethers, web3 } from "hardhat";
import {
    EventTicketsNFT,
    EventTicketsNFT__factory
} from "../typechain-types";

async function deployAndCreateTickets() {
  const accounts = await web3.eth.getAccounts();
  const deployer = await ethers.getSigner(accounts[0])

    const luksoMeetupTickets: EventTicketsNFT = await new EventTicketsNFT__factory(deployer).deploy(
        "LUKSO Meetup #2",
        "MUP2",
        deployer.address,
    )

    // create 100 entry tickets.
    // give them to the deployer initially, who will distribute them afterwards.
    await luksoMeetupTickets.mint(
        deployer.address, // recipient
        100, // amount
        true, // force sending to an EOA
        "0x" // data
    );

    const luksoMeetupTicketsAddress = await luksoMeetupTickets.getAddress()
    console.log("NFT Collection deployed to:", luksoMeetupTicketsAddress)
    console.log("Check the block explorer to see the deployed contract")
}

deployAndCreateTickets().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

```

</TabItem>
</Tabs>

## Check Your NFT Collection

You can now check out your NFT collection on the [execution block explorer](https://explorer.execution.testnet.lukso.network/) using the address output to the web console during deployment.

## References

- [BuildUP #2 | Create an NFT Collection using LSP7 or LSP8 (YouTube)](https://www.youtube.com/watch?v=DMpeMswK12w)
