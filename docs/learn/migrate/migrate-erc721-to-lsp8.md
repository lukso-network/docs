---
sidebar_label: '🖼️ ERC721 to LSP8'
sidebar_position: 3
description: Learn how to migrate your ERC721 token to the LSP8 Identifiable Digital Asset standard on LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Erc721LSP8Table from '@site/src/components/Erc721LSP8Table';

# 🖼️ Migrate ERC721 to LSP8

> 👇🏻 Hands on 📽️ Solidity Workshop Video for the [**Oxford Blockchain Society**](https://x.com/oxfordblocksoc) from March 2024.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2WH1kI5iWJs?si=G8YNdmyL38us-2iP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

[LSP8IdentifiableDigitalAsset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) is a new token standard that offers a wider range of functionality compared to [ERC721](https://eips.ethereum.org/EIPS/eip-721), as described in the [standard section](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md). For migrating from ERC721 to LSP8, developers need to be aware of several key differences.

:::info Resources

See the [contract overview](../../contracts/overview/NFT/index.md#comparisons-with-erc20--erc721) page for the interface differences between ERC721 and LSP8.

:::

## Comparisons

### Solidity code

Usually, to create an ERC721 token, we import and inherit the `ERC721` contract from the [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts) package.

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

To create an LSP8 token, we should instead import `LSP8IdentifiableDigitalAsset` from the [`@lukso/lsp8-contracts`](https://www.npmjs.com/package/@lukso/lsp8-contracts) package, and replace it in the inheritance.

To deploy an `LSP8IdentifiableDigitalAsset` we can use the same [`constructor`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.md#constructor) parameters, but we also need to specify 2 extra parameters (_explanations of params provided in the code comments below_).

- the `lsp4TokenType_`.
- the `lsp8TokenIdFormat_`.

```solidity title="LSP8 Token"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "@lukso/lsp8-contracts/contracts/LSP8IdentifiableDigitalAsset.sol";

// highlight-next-line
contract MyLSP8Token is LSP8IdentifiableDigitalAsset {
    constructor(
        string memory name, // Name of the token
        string memory symbol, // Symbol of the token
        address tokenOwner, // Owner able to add extensions and change metadata
        // highlight-next-line
        uint256 lsp4TokenType_, // 1 if NFT, 2 if an advanced collection of multiple NFTs
        // highlight-next-line
        uint256 lsp8TokenIdFormat_ // 0 for compatibility with ERC721, check LSP8 specs for other values
    ) LSP8IdentifiableDigitalAsset(name, symbol, tokenOwner, lsp4TokenType_, lsp8TokenIdFormat_) {
        // _mint(to, tokenId, force, data)
        // force: should be set to true to allow EOA to receive tokens
        // data: only relevant if the `to` is a smart contract supporting LSP1.
        _mint(tokenOwner, bytes32(uint256(1)), true, "");
    }
}
```

### Functions & Behaviors

Below are the function signatures of the transfer functions for ERC721 and LSP8, respectively.

<div style={{display: "flex", justifyContent: "space-between"}}>

<div style={{width: "48%"}}>

**ERC721**

```solidity
function transferFrom(
    address from,
    address to,
    uint256 tokenId
) external;
```

</div>

<div style={{width: "48%"}}>

**LSP8**

```solidity
function transfer(
    address from,
    address to,
    bytes32 tokenId,
    // highlight-next-line
    bool force,
    // highlight-next-line
    bytes data
) external;
```

</div>

</div>

There are 4 main differences for LSP8 to note:

- **TokenId representation**: In LSP8, the `tokenId` is represented as `bytes32` instead of `uint256` in ERC721. This allows for more flexible token identification schemes.

- **Additional `force` parameter**: for the [`mint(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.md#mint) and [`transfer(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#transfer) functions.

For full compatibility with ERC721 behavior (where the recipient can be any address), set this to `true`. Setting it to `false` will only allow the transfer to smart contract addresses supporting the [**LSP1UniversalReceiver** interfaceId](../../contracts/interface-ids.md).

> See the [**LSP8 Standard > `force` mint and transfer**](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md#lsp1-token-hooks#force-mint-and-transfer) section for more details.

- **Additional `data` field**: for the `mint(...)`, `transfer(...)`, and [`burn(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.md#burn) functions.

For full compatibility with ERC721 behavior, set this to empty bytes `""`. This data is only relevant when the recipient is a smart contract that supports the LSP1 interfaceId, where the data will be sent and the recipient can act on it (_e.g., reject the transfer, forward the tokens to a vault, etc..._).

> See the [**LSP8 Standard > LSP1 Token Hooks**](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md#lsp1-token-hooks) section for more details.

- **LSP8 metadata is generic**: via a [flexible data key / value store](<(../../standards/erc725.md#erc725y-generic-data-keyvalue-store)>). It can be set and retrieved via [`setData(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#setdata) / [`setDataBatch(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#setdatabatch) and [`getData(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#getdata) / [`getDataBatch(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#getdatabatch).

### Interact with the Token Contract

:::info

To check function definitions and explanations of behavior and each parameter, check [API Reference](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md) section.

:::

To interact with the LSP8IdentifiableDigitalAsset contract, different functions should be called. This is a table comparing the different function definitions:

<Erc721LSP8Table/>

### Events

:::info

To check event definitions and explanations of behavior and each parameter, check [API Reference](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#events) section.

:::

Services like dApps and Indexers can use different events from LSP8 to listen to activities. The table below shows the different event definitions that should be used to track activity on an LSP8-IdentifiableDigitalAsset contract.

| ERC721 Event                                                                                                                       | LSP8 Event                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <pre lang="solidity">Transfer(<br/> address indexed from,<br/> address indexed to,<br/> uint256 indexed tokenId<br/>);</pre>       | <pre lang="solidity">Transfer(<br/> address operator,<br/> address indexed from,<br/> address indexed to,<br/> bytes32 indexed tokenId,<br/> bool force,<br/> bytes data<br/>)</pre>                    |
| <pre lang="solidity">Approval(<br/> address indexed owner,<br/> address indexed approved,<br/> uint256 indexed tokenId<br/>)</pre> | <pre lang="solidity">OperatorAuthorizationChanged(<br/> address indexed operator,<br/> address indexed tokenOwner,<br/> bytes32 indexed tokenId,<br/> bytes operatorNotificationData<br/>);</pre>       |
| <pre lang="solidity">ApprovalForAll(<br/> address indexed owner,<br/> address indexed operator,<br/> bool approved<br/>)</pre>     | _No direct equivalent_                                                                                                                                                                                  |
| _No equivalent_                                                                                                                    | <pre lang="solidity">OperatorRevoked(<br/> address indexed operator,<br/> address indexed tokenOwner,<br/> bytes32 indexed tokenId,<br/> bool notified,<br/> bytes operatorNotificationData<br/>)</pre> |

## Metadata Management

### Basic Token Information

<div style={{display: "flex", justifyContent: "space-between"}}>

<div style={{width: "58%"}}>

**ERC721**

```javascript
const name = await token.name();
const symbol = await token.symbol();
const tokenURI = await token.tokenURI(tokenId);
```

</div>

<div style={{width: "41.3%"}}>

**How to retrieve?**

In ERC721, the name, symbol, and tokenURI of a token can be retrieved by calling their own functions.

</div>
</div>

<div style={{display: "flex", justifyContent: "space-between"}}>

<div style={{width: "58%"}}>

**LSP8**

```javascript
import { keccak256, toUtf8Bytes } from 'ethers';

const nameKey = keccak256(toUtf8Bytes('LSP4TokenName'));
const symbolKey = keccak256(toUtf8Bytes('LSP4TokenSymbol'));

const nameValue = await token.getData(nameKey);
const symbolValue = await token.getData(symbolKey);

const name = ethers.toUtf8String(nameValue);
const symbol = ethers.toUtf8String(symbolValue);
```

</div>

<div style={{width: "41.3%"}}>

**How to retrieve?**

In LSP8, the token name, symbol and base URI can be retrieved with [`getData(bytes32)`](../../contracts/contracts/ERC725/ERC725.md#getdata). They are stored in the generic metadata key-value store under the data keys [`LSP4TokenName`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokenname), [`LSP4TokenSymbol`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokensymbol) and [`LSP8TokenMetadataBaseURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenmetadatabaseuri).

Once you have fetched the raw hex encoded value, you will need to decode it into a human readable string.

</div>
</div>

You can import the list of data keys related to each individual LSP standard from one of our library. There are 2 options:

<Tabs>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

For dApp developers, you can import the data keys from the `@lukso/lsp-smart-contracts` and use them directly in your scripts via _ethers.js_ or _web3.js_.

```javascript
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

const nameKey = ERC725YDataKeys.LSP4.LSP4TokenName;
const symbolKey = ERC725YDataKeys.LSP4.LSP4TokenSymbol;

const nameValue = await token.getData(nameKey); // 0x4c5350382050726f66696c65
const symbolValue = await token.getData(symbolKey); // 0x4c5350382050726f66696c65

const name = ethers.toUtf8String(nameValue); // Cool NFT
const symbol = ethers.toUtf8String(symbolValue); // COOL
```

</TabItem>

<TabItem value="erc725.js" label="erc725.js" attributes={{className: "tab_erc725"}}>

You can also obtain the [full schema definition](../../tools/libraries/erc725js/schemas.md) of the LSP4 Metadata from [`@erc725/erc725.js`](../../tools/libraries/erc725js/getting-started.md) library. **This library will also help you to [encode easily](../../tools/libraries/erc725js/methods.md#encodedata) data key value pairs.**

```javascript
import { ERC725 } from '@erc725/erc725.js';
import LSP4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAssetMetadata.json';

const nameKey = LSP4Schema.find((schema) => schema.name == 'LSP4TokenName').key;
const symbolKey = LSP4Schema.find(
  (schema) => schema.name == 'LSP4TokenSymbol',
).key;

const nameValue = await token.getData(nameKey); // 0x4c5350382050726f66696c65
const symbolValue = await token.getData(symbolKey); // 0x4c5350382050726f66696c65

const [name, symbol] = ERC725.decodeData([
  {
    keyName: 'LSP4TokenName',
    value: nameValue,
  },
  {
    keyName: 'LSP4TokenSymbol',
    value: symbolValue,
  },
]);
/**
[
  {
    name: 'LSP4TokenName',
    key: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',
    value: "Cool NFT",
  },
  {
    name: 'LSP4TokenSymbol',
    key: '0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756',
    value: "COOL",
  },
]
*/
```

</TabItem>

</Tabs>

### Extended Collection Metadata

:::success Tutorial 🎥

See the [**Metadata Management**](../digital-assets/metadata-management/edit-token-metadata.md) guide + video for how to create and set the JSON metadata for your LSP8 Token.

:::

[LSP8 allows for more flexible and extensible metadata](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md#lsp8-collection-vs-tokenid-metadata). You can store a JSON object containing information about:

- the whole NFT Collection contract
- and for each individual NFT `tokenId`.

The [`LSP4Metadata`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4metadata) is a JSON object that can contain many information about the token, including:

- 🌐 **official link to websites** (_e.g: project website, social media, community channels, etc..._).
- 🖼️ **images** (token icon and backgrounds) to display the token in dApps, explorers, or decentralised exchanges.
- 🏷️ **custom attributes** (for each specific NFTs for instance, can be displayed as badges on UIs).

```javascript
const metadataKey = ethers.keccak256(ethers.toUtf8Bytes('LSP4Metadata'));
const storedMetadata = await token.getData(metadataKey);
const retrievedJsonMetadata = JSON.parse(ethers.toUtf8String(storedMetadata));

// JSON Stored:

{
    LSP4Metadata: {
        description: 'A unique digital artwork collection.',
        links: [
            { title: 'Website', url: 'https://myawesomenft.com' },
            { title: 'Twitter', url: 'https://twitter.com/myawesomenft' }
        ],
        icon: [
            {
                width: 256,
                height: 256,
                url: 'ipfs://QmW5cF4r9yWeY1gUCtt7c6v3ve7Fzdg8CKvTS96NU9Uiwr',
                verification: {
                    method: 'keccak256(bytes)',
                    data: '0x01299df007997de92a820c6c2ec1cb2d3f5aa5fc1adf294157de563eba39bb6f',
                }
            }
        ],
        images: [
            [
                {
                    width: 1024,
                    height: 974,
                    url: 'ipfs://QmW4wM4r9yWeY1gUCtt7c6v3ve7Fzdg8CKvTS96NU9Uiwr',
                    verification: {
                        method: 'keccak256(bytes)',
                        data: '0xa9399df007997de92a820c6c2ec1cb2d3f5aa5fc1adf294157de563eba39bb6e',
                    }
                },
                // ... more image sizes
            ],
            // ... more images
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
                key: 'Edition',
                value: 1,
                type: "number"
            },
            {
                key: 'Original',
                value: true,
                type: "boolean"
            }
        ]
    }
}
```

### NFT-specific Metadata

LSP8 allows you to set and retrieve metadata for individual tokens using the [`setDataForTokenId(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#setdatafortokenid) and [`getDataForTokenId(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#getdatafortokenid) functions. This is particularly useful for NFTs where each token might have unique properties.

```javascript
// Setting token-specific metadata
const tokenId = '0x1234...'; // your token ID in bytes32 format
const metadataKey = ethers.keccak256(ethers.toUtf8Bytes('LSP4Metadata'));
const metadataValue = ethers.toUtf8Bytes(JSON.stringify({
    // Your token-specific metadata here
}));

await token.setDataForTokenId(tokenId, metadataKey, metadataValue);

// Retrieving token-specific metadata
const storedMetadata = await token.getDataForTokenId(tokenId, metadataKey);
const retrievedJsonMetadata = JSON.parse(ethers.toUtf8String(storedMetadata));

// Example of token-specific metadata
{
    LSP4Metadata: {
        description: 'Unique NFT #1234',
        image: 'ipfs://QmYourImageCID',
        attributes: [
            {
                trait_type: 'Rarity',
                value: 'Legendary'
            },
            {
                trait_type: 'Power Level',
                value: 9000
            }
        ]
    }
}
```

This feature allows for much more flexible and dynamic NFTs compared to the static `tokenURI` approach in ERC721.
