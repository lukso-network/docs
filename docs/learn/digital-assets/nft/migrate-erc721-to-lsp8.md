---
sidebar_label: 'Migrate from ERC721 to LSP8'
sidebar_position: 6
description: Learn how to migrate your ERC721 token to the LSP8 Identifiable Digital Asset standard on LUKSO.
---

import Erc721LSP8Table from '@site/src/components/Erc721LSP8Table';

# 🖼️ Migrate ERC721 to LSP8

[LSP8IdentifiableDigitalAsset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) is a new token standard that offers a wider range of functionality compared to [ERC721](https://eips.ethereum.org/EIPS/eip-721), as described in the [standard section](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md). For migrating from ERC721 to LSP8, developers need to be aware of several key differences.

:::info

If you need more details about the interface differences between ERC721 and LSP8, please visit our [contract overview](../../contracts/overview/DigitalAssets/#comparisons-with-erc20--erc721) page.

:::

## Smart Contract Building

Usually, to create an ERC721 token, `ERC721` is imported from [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts) package, and inherited.

```solidity title="ERC721 Token"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyERC721Token is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        // Your constructor logic
    }
}
```

To create an LSP8 NFT, `LSP8` is imported from [@lukso/lsp8-contracts](https://www.npmjs.com/package/@lukso/lsp8-contracts) package, and inherited.

The constructor arguments definitions can be found explained in the [constructor API](../../contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.md#constructor) section.

```js
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "@lukso/lsp8-contracts/contracts/LSP8IdentifiableDigitalAsset.sol";

contract MyLSP8Token is LSP8IdentifiableDigitalAsset {
    constructor(
        string memory name, // Name of the token
        string memory symbol, // Symbol of the token
        address tokenOwner, // Owner able to add extensions and change metadata
        uint256 lsp4TokenType_, // 1 if representing an NFT, 2 if representing an advanced collection of multiple NFTs
        uint256 lsp8TokenIdFormat_ // 0 for compatibility with ERC721, check LSP8 specs for other values
    ) LSP8IdentifiableDigitalAsset(name, symbol, tokenOwner, lsp4TokenType_, lsp8TokenIdFormat_) {
        // Your constructor logic
        bytes32 tokenId = bytes32(uint256(1));
        _mint(tokenOwner, tokenId, true, "");
    }
}
```

## Behavior

- For LSP8, the tokenId is represented as `bytes32` in contrast with ERC721 where its represented as `uint256`. This design decision allow for more representation of tokenIds.

Below are the function signatures of the transfer functions for ERC721 and LSP8, respectively.

ERC721: `function transferFrom(address from, address to, uint256 tokenId);`

LSP8: `function transfer(address from, address to, bytes32 tokenId, bool force, bytes data);`

- For LSP8, **mint and transfer functions will have a `force` additional field**. For full compatibility with ERC721 behavior (where the recipient can be any address), set this to `true`. Setting it to `false` will only allow the transfer to smart contract addresses supporting the LSP1 interfaceId. (Check [LSP1UniversalReceiver section](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md#lsp1-token-hooks) in LSP8IdentifiableDigitalAsset for more info).

- For LSP8, **mint, transfer, and burn functions will have `data` as an additional field**. For full compatibility with ERC721 behavior, set this to empty bytes. This data will only be relevant when the recipient is a smart contract address supporting the LSP1 interfaceId (Check [LSP1UniversalReceiver section](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md#lsp1-token-hooks)in LSP8IdentifiableDigitalAsset for more info), where the data will be sent and the recipient can act on it (e.g., reject the transfer, forward the tokens to a vault, etc.).

- **LSP8 metadata is generic**, in contrast to ERC721 where the metadata is limited to name and symbol and tokenURI. The [generic key-value store](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) in LSP8 allows for storing any possible data.

## Interacting with Contracts

:::info

To check function definitions and explanations of behavior and each parameter, check [API Reference](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md) section.

:::

To interact with LSP8IdentifiableDigitalAsset contract, different functions should be called. This is a table comparing function definitions:

<Erc721LSP8Table/>

## dApps and Indexers

:::info

To check event definitions and explanations of behavior and each parameter, check [API Reference](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md) section.

:::

The table below shows the different event definitions that should be used to track activity on an LSP8-IdentifiableDigitalAsset contract.

| ERC721 Event                                                                         | LSP8 Event                                                                                                                                      |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `Transfer(address indexed from, address indexed to, uint256 indexed tokenId)`        | `Transfer(address operator, address indexed from, address indexed to, bytes32 indexed tokenId, bool force, bytes data)`                         |
| `Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)` | `OperatorAuthorizationChanged(address indexed operator, address indexed tokenOwner, bytes32 indexed tokenId, bytes operatorNotificationData)`   |
| `ApprovalForAll(address indexed owner, address indexed operator, bool approved)`     | _No direct equivalent_                                                                                                                          |
| _No equivalent_                                                                      | `OperatorRevoked(address indexed operator, address indexed tokenOwner, bytes32 indexed tokenId, bool notified, bytes operatorNotificationData)` |

## Metadata Management

### Basic Token Information

In ERC721, the name, symbol and the tokenURI of a tokenId can be retrieved by calling their own function:

```javascript
// ERC721
const name = await token.name();
const symbol = await token.symbol();
const tokenURI = await token.tokenURI(tokenId);
```

In LSP8, the token name and symbol can be retrieved with [getData](../../contracts/contracts/ERC725/ERC725.md#getdata) function, since LSP8 uses a generic metadata key value store:

```javascript
// LSP8
const nameKey = ethers.keccak256(ethers.toUtf8Bytes('LSP4TokenName'));
const symbolKey = ethers.keccak256(ethers.toUtf8Bytes('LSP4TokenSymbol'));

const nameValue = await token.getData(nameKey);
const symbolValue = await token.getData(symbolKey);

const name = ethers.toUtf8String(nameValue);
const symbol = ethers.toUtf8String(symbolValue);
```

### Extended Token Metadata

:::info

To learn more about setting and creating the LSP4Metadata JSON, check the [metadata](../digital-assets/metadata-management/metadata-preparation.md) section.

:::

LSP8 allows for more flexible and extensive metadata storage directly on-chain. You can store a JSON object containing information about the whole NFT contract and for each individual tokenId.

#### For the NFT contract

```js
const metadataKey = ethers.keccak256(ethers.toUtf8Bytes('LSP4Metadata'));
const storedMetadata = await token.getData(metadataKey);
const retrievedJsonMetadata = JSON.parse(ethers.toUtf8String(storedMetadata));

// JSON Stored:

{
    LSP4Metadata: {
        description: 'A unique digital artwork.',
        links: [
            { title: 'Artist Website', url: 'https://artist.com' },
            { title: 'Gallery', url: 'https://gallery.com/artwork' }
        ],
        images: [
            {
                width: 1024,
                height: 1024,
                url: 'ipfs://QmW4wM4r9yWeY1gUCtt7c6v3ve7Fzdg8CKvTS96NU9Uiwr',
                verification: {
                    method: 'keccak256(bytes)',
                    data: '0xa9399df007997de92a820c6c2ec1cb2d3f5aa5fc1adf294157de563eba39bb6e',
                }
            }
        ],
        assets: [{
            verification: {
                method: 'keccak256(bytes)',
                data: '0x98fe032f81c43426fbcfb21c780c879667a08e2a65e8ae38027d4d61cdfe6f55',
            },
            url: 'ipfs://QmPJESHbVkPtSaHntNVY5F6JDLW8v69M2d6khXEYGUMn7N',
            fileType: 'json'
        }],
        attributes: [
            {
                key: 'Artist',
                value: 'Jane Doe',
                type: "string"
            },
            {
                key: 'Year',
                value: 2023,
                type: "number"
            },
            {
                key: 'Unique',
                value: true,
                type: "boolean"
            }
        ]
    }
}
```

#### For each individual tokenId

```js

const metadataKey = ethers.keccak256(ethers.toUtf8Bytes('LSP4Metadata'));
const storedMetadata = await token.getDataForTokenId(metadataKey);
const retrievedJsonMetadata = JSON.parse(ethers.toUtf8String(storedMetadata));
// JSON Stored:

{
    LSP4Metadata: {
        description: 'A unique digital artwork.',
        links: [
            { title: 'Artist Website', url: 'https://artist.com' },
            { title: 'Gallery', url: 'https://gallery.com/artwork' }
        ],
        images: [
            {
                width: 1024,
                height: 1024,
                url: 'ipfs://QmW4wM4r9yWeY1gUCtt7c6v3ve7Fzdg8CKvTS96NU9Uiwr',
                verification: {
                    method: 'keccak256(bytes)',
                    data: '0xa9399df007997de92a820c6c2ec1cb2d3f5aa5fc1adf294157de563eba39bb6e',
                }
            }
        ],
        assets: [{
            verification: {
                method: 'keccak256(bytes)',
                data: '0x98fe032f81c43426fbcfb21c780c879667a08e2a65e8ae38027d4d61cdfe6f55',
            },
            url: 'ipfs://QmPJESHbVkPtSaHntNVY5F6JDLW8v69M2d6khXEYGUMn7N',
            fileType: 'json'
        }],
        attributes: [
            {
                key: 'Artist',
                value: 'Jane Doe',
                type: "string"
            },
            {
                key: 'Year',
                value: 2023,
                type: "number"
            },
            {
                key: 'Unique',
                value: true,
                type: "boolean"
            }
        ]
    }
}
```
