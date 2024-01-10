---
sidebar_label: '🎨 Set LSP8 NFT Metadata'
sidebar_position: 9
description: Learn how to set the metadata of a NFT part of a LSP8 Collection.
---

# Set LSP8 NFT Metadata

In this guide you will learn how to set the metadata of a specific NFT (represented by its `bytes32 tokenId`) part of a [LSP8 Identifiable Digital Asset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) collection.

## Setup

You will need the address of an existing LSP8 NFT collection in order to follow this tutorial. This represent the LSP8 collection that includes the NFT you want to update metadata for.

The following code snippets require the installation of the following libraries:

- [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

```shell
npm install ethers @lukso/lsp-smart-contracts
```

## Imports and constants

At this point, we are preparing the `LSP8IdentifiableDigitalAsset` contract to interact with it. We will construct an instance of the contract using its _ABI_ and the _contract address_.

```javascript
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import { ethers } from 'ethers';

const privateKey = '0x...';
const lsp8ContractAddress = '0x...';

const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');

// setup signer
const signer = new ethers.Wallet(privateKey as string, provider);
console.log('🔑 EOA: ', signer.address);
```

### Instantiate the LSP8 contract

Create an instance of the LSP8 collection contract as shown below:

```javascript
const lsp8Contract = new ethers.Contract(lsp8ContractAddress, LSP8IdentifiableDigitalAsset.abi, signer);
```

### Send the transaction to set metadata for a tokenId

The last step is to set the metadata for a specific `tokenId`. You can then send the transaction to set the metadata for the given NFT represented by its `tokenId`.

Here we will use the following parameters as examples:

- `tokenId`: `0x0000000000000000000000000000000000000000000000000000000000000001`
- `dataKey`: [`LSP4Metadata`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4metadata)
- `metadataValue`: some placeholder value as a .

```javascript
import {ERC725YDataKeys} from "@lukso/lsp-smart-contracts";

// change this with the actual tokenId to update metadata for
const tokenId = "0x0000000000000000000000000000000000000000000000000000000000000001";

// change this with the actual VerifiableURI of the metadata uploaded on IPFS
const metadataValue = "0x..."

let setTokenIdMetadataTxn = await lsp8Contract.setDataForTokenId(
    tokenId,
    ERC725YDataKeys.LSP4["LSP4Metadata"],
    metadataValue,
    { gasLimit: 400_000 }
);
```

### Final code

```javascript
import { ethers } from 'ethers';
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import {ERC725YDataKeys} from "@lukso/lsp-smart-contracts";

const privateKey = '0x...';
const lsp8ContractAddress = '0x...';

async function main() {

    const provider = new ethers.JsonRpcProvider(
        'https://rpc.testnet.lukso.network',
    );

    const signer = new ethers.Wallet(privateKey as string, provider);
    console.log('🔑 EOA: ', signer.address);

    const lsp8Contract = new ethers.Contract(lsp8ContractAddress, LSP8IdentifiableDigitalAsset.abi, signer);

    // change this with the actual tokenId to update metadata for
    const tokenId = "0x0000000000000000000000000000000000000000000000000000000000000001";

    // change this with the actual VerifiableURI of the metadata uploaded on IPFS
    const metadataValue = "0x...";

    let setTokenIdMetadataTxn = await lsp8Contract.setDataForTokenId(
        tokenId,
        ERC725YDataKeys.LSP4["LSP4Metadata"],
        metadataValue,
        { gasLimit: 400_000 }
    );

}

main()
```