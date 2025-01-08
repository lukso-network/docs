---
sidebar_label: '👾 Collection with LSP7'
sidebar_position: 2
description: Learn how to create an NFT Collection on LUKSO using LSP7 Digital Asset standard.
---

# Create an NFT Collection Using LSP7

This tutorial explores how to create a collection of [digital assets](/standards/tokens/LSP7-Digital-Asset.md), where each digital asset is the same. This method is useful for minting large quantities of NFTs at once efficiently (eg: tickets for an event).

:::note

This guide builds on top of a Hardhat project using TypeScript as described in the [Getting Started](../getting-started.md) section.

:::

:::tip

The full code of this example can be found in the smart contract section of the 👾 [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository.

:::

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/DMpeMswK12w?si=DqttxMJIv6c4H0FQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

When creating smart contracts representing digital assets on LUKSO, you will need to specify the token type and data keys for the 📄 [LSP4 Digital Asset Metadata](/standards/tokens/LSP4-Digital-Asset-Metadata) that will be stored in the 🗂️ [ERC725Y](/standards/erc725.md#erc725y-generic-data-keyvalue-store) storage of the Digital Asset. There are three different [token types](/standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokentype):

- `0` = Token
- `1` = NFT
- `2` = Collection

For this example we will use the `Token` token type. You can create a custom 🌄 [LSP7 Digital Asset Token](/standards/tokens/LSP7-Digital-Asset.md) that extends [LSP7Mintable](../../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md) so that new assets can be minted by the [`owner`](../../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md#owner) of the smart contract.

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

Next define the deployment script.

```ts title="scripts/deployAndMintTickets.ts"
import { ethers } from 'ethers';
import EventTicketsNFTArtifacts from './artifacts/EventTickets.json';

const accounts = await ethers.getSigners();
const deployer = accounts[0];

const contractFactory = new ethers.ContractFactory(
  EventTicketsNFTArtifacts.abi,
  EventTicketsNFTArtifacts.bytecode,
  deployer,
);

const luksoMeetupTickets = await contractFactory.deploy(
  'LUKSO Meetup #2',
  'MUP2',
  deployer.address,
);

// create 100 entry tickets.
// Give them to the deployer initially, who will distribute them afterwards.
await luksoMeetupTickets.mint(
  deployer.address, // recipient
  100, // amount
  true, // force sending to an EOA
  '0x', // data
);
const luksoMeetupTicketsAddress = await luksoMeetupTickets.getAddress();
console.log('NFT Collection deployed to:', luksoMeetupTicketsAddress);
console.log('Check the block explorer to see the deployed contract');
```

Finally, run the deploy script:

```sh
npx hardhat run --network luksoTestnet scripts/deployAndMintTickets.ts
```

You can now check out the NFT collection contract on the [execution block explorer](https://explorer.execution.testnet.lukso.network/) by pasting the address logged on the console to the search field of the block explorer.

## References

- [BuildUP #2 | Create an NFT Collection using LSP7 or LSP8 (YouTube)](https://www.youtube.com/watch?v=DMpeMswK12w)
