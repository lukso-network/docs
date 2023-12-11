---
sidebar_label: '👾 Create an NFT Collection with LSP7'
sidebar_position: 4
---

# Create an NFT Collection Using LSP7

This tutorial explores how to create a collection of [digital assets](../../standards/tokens/LSP7-Digital-Asset.md), where each digital asset is the same. This method is useful for minting large quantities of NFTs at once efficiently (eg: tickets for an event).

:::note

This guide builds on top of a Hardhat project using TypeScript as described in the [Getting Started](../smart-contract-developers/getting-started.md) section.

:::

:::info

⌨️ The full code of this example can be found in the 👾 [LUKSO-Hardhat-template](https://github.com/CJ42/LUKSO-Hardhat-template).

:::

## Setup

To create your custom contract based on the [LUKSO smart contracts](../../contracts/introduction.md), you will need the [`@lukso/lsp-smart-contracts`](../../tools/lsp-smart-contracts/getting-started.md) library. Go ahead and add it to your project:

```shell
npm install @lukso/lsp-smart-contracts
```

## Create the Smart Contracts

When creating smart contracts representing digital assets on LUKSO, you will need to specify the token type and data keys for the 📄 [LSP4 Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata) that will be stored in the 🗂️ [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) storage of the Digital Asset. There are three different [token types](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokentype):

- `0` = Token
- `1` = NFT
- `2` = Collection

For this example we will use the `Token` token type. You can create a custom 🌄 [LSP7 Digital Asset Token](../../standards/tokens/LSP7-Digital-Asset.md) that extends [LSP7Mintable](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md) so that new assets can be minted by the [`owner`](../../contracts/LSP7DigitalAsset/presets/LSP7Mintable#owner) of the smart contract.

```solidity title="contracts/Example1/EventTicketsNFT.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// modules
import {
    LSP7Mintable
} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol";
import {
    _LSP4_TOKEN_TYPE_TOKEN
} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";

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
            _LSP4_TOKEN_TYPE_TOKEN, // set the token type as Token
            true // make the token non divisible
        )
    {}
}
```

Next you define the deployment script.

<!-- prettier-ignore-start -->
```js title="scripts/mintTickets.ts"
import { ethers } from "hardhat";

// typechain should generate new types for you on every compilation 
// otherwise you can always: npx hardhat typechain 
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

## Check Your NFT Collection

You can now check out your NFT collection on the [execution block explorer](https://explorer.execution.testnet.lukso.network/) using the address output to the web console during deployment.

## References

- [BuildUP #2 | Create an NFT Collection using LSP7 or LSP8 (YouTube)](https://www.youtube.com/watch?v=DMpeMswK12w)
