---
sidebar_label: '🪙 ERC20 to LSP7'
sidebar_position: 2
description: Learn how to migrate your ERC20 token to the LSP7 Digital Asset standard on LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Erc20LSP7Table from '@site/src/components/Erc20LSP7Table';

# 🪙 Migrate ERC20 to LSP7

> 👇🏻 Hands on 📽️ Solidity Workshop Video for the [**Oxford Blockchain Society**](https://x.com/oxfordblocksoc) from March 2024.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/2WH1kI5iWJs?si=G8YNdmyL38us-2iP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

[LSP7DigitalAsset](../../standards/tokens/LSP7-Digital-Asset.md) is a new token standard that offers a wider range of functionality compared to [ERC20](https://eips.ethereum.org/EIPS/eip-20), as described in the [standard section](../../standards/tokens/LSP7-Digital-Asset.md). For migrating from ERC20 to LSP7, developers need to be aware of several key differences.

:::info Resources

See the [contract overview](../../contracts/overview/Token/index.md#comparisons-with-erc20--erc721) page for the interface differences between ERC20 and LSP7.

:::

## Comparisons

### Solidity code

Usually, to create an ERC20 token, we import and inherit the `ERC20` contract from the [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts) package.

```solidity title="ERC20 Token"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20Token is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Your constructor logic
    }
}
```

To create an LSP7 token, we should instead import `LSP7DigitalAsset` from the [`@lukso/lsp7-contracts`](https://www.npmjs.com/package/@lukso/lsp7-contracts) package, and replace it in the inheritance.

To deploy an `LSP7DigitalAsset` we can use the same [`constructor`](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md#constructor) parameters. but we also need to specify 2 extra parameters (_explanations of params provided in the code comments below_).

- the `lsp4TokenType`.
- if the token `isNonDivisible`.

```solidity title="LSP7 Token"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "@lukso/lsp7-contracts/contracts/LSP7DigitalAsset.sol";

// highlight-next-line
contract MyLSP7Token is LSP7DigitalAsset {
    constructor(
        string memory name, // Name of the token
        string memory symbol, // Symbol of the token
        address tokenOwner, // Owner able to add extensions and change metadata
        // highlight-next-line
        uint256 lsp4tokenType, // 0 if representing a fungible token, 1 if representing an NFT
        // highlight-next-line
        bool isNonDivisible // false for decimals equal to 18, true for decimals equal to 0
    ) LSP7DigitalAsset(name, symbol, tokenOwner, lsp4tokenType, isNonDivisible) {
        // _mint(to, amount, force, data)
        // force: should be set to true to allow EOA to receive tokens
        // data: only relevant if the `to` is a smart contract supporting LSP1.
        _mint(tokenOwner, 200000, true, "");
    }
}
```

### Functions & Behaviors

Below are the function signatures of the transfer functions for ERC20 and LSP7, respectively.

<div style={{display: "flex", justifyContent: "space-between"}}>

<div style={{width: "48%"}}>

**ERC20**

```solidity
function transferFrom(
    address from,
    address to,
    uint256 amount
) external;
```

</div>

<div style={{width: "48%"}}>

**LSP7**

```solidity
function transfer(
    address from,
    address to,
    uint256 amount,
    // highlight-next-line
    bool force,
    // highlight-next-line
    bytes data
) external;
```

</div>

</div>

There are 3 main differences for LSP7 to note

- **Additional `force` parameter**: for the [`mint(...)`](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md#mint) and [`transfer(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#ransfer) functions.

For full compatibility with ERC20 behavior (where the recipient can be any address), set this to `true`. Setting it to `false` will only allow the transfer to smart contract addresses supporting the [**LSP1UniversalReceiver** interfaceId](../../contracts/interface-ids.md).

> See the [**LSP7 Standard > `force` mint and transfer**](../../standards/tokens/LSP7-Digital-Asset.md#lsp1-token-hooks#force-mint-and-transfer) section for more details.

- **Additional `data` field**: for the `mint(...)`, `transfer(...)`, and [`burn(...)`](../../contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.md#burn) functions.

For full compatibility with ERC20 behavior, set this to empty bytes `""`. This data is only relevant when the recipient is a smart contract that supports the LSP1 interfaceId, where the data will be sent and the recipient can act on it (_e.g., reject the transfer, forward the tokens to a vault, etc..._).

> See the [**LSP7 Standard > LSP1 Token Hooks**](../../standards/tokens/LSP7-Digital-Asset.md#lsp1-token-hooks) section for more details.

- **LSP7 metadata is generic**: via a [flexible data key / value store](<(../../standards/erc725.md#erc725y-generic-data-keyvalue-store)>). It can be set and retrieved via [`setData(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#setdata) / [`setDataBatch(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#setdatabatch) and [`getData(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#getdata) / [`getDataBatch(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#getdatabatch).

ERC20 metadata is limited to `name()` and `symbol()`. LSP7 allows to store any data after deployment without limitations.

### Interact with the Token Contract

:::info

To check function definitions and explanations of behavior and each parameter, check [API Reference](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md) section.

:::

To interact with the LSP7DigitalAsset contract, different functions should be called. This is a table comparing the different function definitions:

<Erc20LSP7Table/>

### Events

:::info

To check event definitions and explanations of behavior and each parameter, check [API Reference](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md) section.

:::

Services like dApps and Indexers can use different events from LSP7 to listen to activities. The table below shows the different event definitions that should be used to track activity on an LSP7-DigitalAsset contract.

| ERC20 Event                                                                                                             | LSP7 Event                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <pre lang="solidity">Transfer(<br/> address indexed from,<br/> address indexed to,<br/> uint256 value<br/>);</pre>      | <pre lang="solidity">Transfer(<br/> address indexed operator,<br/> address indexed from,<br/> address indexed to,<br/> uint256 amount,<br/> bool force,<br/> bytes data<br/>)</pre>              |
| <pre lang="solidity">Approval(<br/> address indexed owner,<br/> address indexed spender,<br/> uint256 value<br/>)</pre> | <pre lang="solidity">OperatorAuthorizationChanged(<br/> address indexed operator,<br/> address indexed tokenOwner,<br/> uint256 indexed amount,<br/> bytes operatorNotificationData<br/>);</pre> |
| _No equivalent_                                                                                                         | <pre lang="solidity">OperatorRevoked(<br/> address indexed operator,<br/> address indexed tokenOwner,<br/> bool indexed notified,<br/> bytes operatorNotificationData<br/>)</pre>                |

## Metadata Management

### Basic Token Information

<div style={{display: "flex", justifyContent: "space-between"}}>

<div style={{width: "64%"}}>

**ERC20**

```javascript
const name = await token.name();
const symbol = await token.symbol();
```

</div>

<div style={{width: "34%"}}>

**How to retrieve?**

In ERC20, the name and symbol of a token can be retrieved by calling their own function.

</div>
</div>

<div style={{display: "flex", justifyContent: "space-between"}}>

<div style={{width: "64%"}}>

**LSP7**

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

<div style={{width: "34%"}}>

**How to retrieve?**

In LSP7, the token name and symbol can be retrieved with [`getData(bytes32)`](../../contracts/contracts/ERC725/ERC725.md#getdata). They are stored in the generic metadata key-value store under the data keys [`LSP4TokenName`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokenname) and [`LSP4TokenSymbol`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokensymbol).

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

const nameValue = await token.getData(nameKey); // 0x555020417374726f20373235
const symbolValue = await token.getData(symbolKey); // 0x5550373235

const name = ethers.toUtf8String(nameValue); // UP Astro 725
const symbol = ethers.toUtf8String(symbolValue); // UP725
```

</TabItem>

<TabItem value="erc725.js" label="erc725.js" attributes={{className: "tab_erc725"}}>

You can also obtain the full schema with all the definitions from our [`@erc725/erc725.js`](../../tools/dapps/erc725js/getting-started.md) library. **This library will also help you to [encode easily](../../tools/dapps/erc725js/methods.md#encodedata) data key value pairs.**

You can also import the [full schema definition](../../tools/dapps/erc725js/schemas.md) of the LSP4 Metadata from `@erc725/erc725.js`. The library can also provide convenience for fetching, encoding and decoding.

<!-- prettier-ignore-start -->

```javascript title="Example of decoding using the LSP4 schema and erc725.js"
import { ERC725 } from '@erc725/erc725.js';
import LSP4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAssetMetadata.json';

const nameKey = LSP4Schema.find((schema) => schema.name == 'LSP4TokenName').key;
const symbolKey = LSP4Schema.find((schema) => schema.name == 'LSP4TokenSymbol').key;

const nameValue = await token.getData(nameKey); // 0x555020417374726f20373235
const symbolValue = await token.getData(symbolKey); // 0x5550373235

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
    value: "UP Astro 725",
  },
  {
    name: 'LSP4TokenSymbol',
    key: '0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756',
    value: "UP725",
  },
]
*/
```

<!-- prettier-ignore-end -->

</TabItem>

</Tabs>

### Extended Token Metadata

:::success Tutorial 🎥

See the [**Metadata Management**](../digital-assets/metadata-management/edit-token-metadata.md) guide + video for how to create and set the JSON metadata for your LSP7 Token.

:::

LSP7 allows for more flexible and extensible metadata. The [`LSP4Metadata`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4metadata) is a JSON object that can contain many information about the token, including:

- 🌐 **official link to websites** (_e.g: project website, social media, community channels, etc..._).
- 🖼️ **images** (token icon and backgrounds) to display the token in dApps, explorers, or decentralised exchanges.
- 🏷️ **custom attributes** (can be displayed as badges on UIs).

```javascript
const metadataKey = ethers.keccak256(ethers.toUtf8Bytes('LSP4Metadata'));
const storedMetadata = await token.getData(metadataKey);
const retrievedJsonMetadata = JSON.parse(ethers.toUtf8String(storedMetadata));

// JSON Stored:

{
    LSP4Metadata: {
        description: 'The first digital golden pig.',
        links: [
            { title: 'Twitter', url: 'https://twitter.com/goldenpig123' },
            { title: 'goldenpig.org', url: 'https://goldenpig.org' }
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
        images: [ // COULD be used for LSP8 NFT art
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
                ... // more image sizes
            ],
            ... // more images
        ],
        assets: [{
            verification: {
                method: 'keccak256(bytes)',
                data: '0x98fe032f81c43426fbcfb21c780c879667a08e2a65e8ae38027d4d61cdfe6f55',
            },
            url: 'ipfs://QmPJESHbVkPtSaHntNVY5F6JDLW8v69M2d6khXEYGUMn7N',
            fileType: 'fbx'
        }],
        attributes: [
            {
                key: 'Standard type',
                value: 'LSP',
                type: "string"
            },
            {
                key: 'Standard number',
                value: 4,
                type: "number"
            },
            {
                key: '🆙',
                value: true,
                type: "boolean"
            }
        ]
    }
}
```
