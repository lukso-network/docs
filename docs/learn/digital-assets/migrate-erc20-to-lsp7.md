---
sidebar_label: '💰 Migrate ERC20 to LSP7'
sidebar_position: 7
description: Learn how to migrate your ERC20 token to the LSP7 Digital Asset standard on LUKSO.
---

import Erc20LSP7Table from '@site/src/components/Erc20LSP7Table';

# 🪙 Migrate ERC20 to LSP7

[LSP7DigitalAsset](../../standards/tokens/LSP7-Digital-Asset.md) is a new token standard that offers a wider range of functionality compared to [ERC20](https://eips.ethereum.org/EIPS/eip-20), as described in the [standard section](../../standards/tokens/LSP7-Digital-Asset.md). For migrating from ERC20 to LSP7, developers need to be aware of several key differences.

## Smart Contract Building

Usually, to create an ERC20 token, `ERC20` is imported from [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts) package, and inherited.

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

To create an LSP7 token, `LSP7` is imported from [@lukso/lsp7-contracts](https://www.npmjs.com/package/@lukso/lsp7-contracts) package, and inherited.

The constructor arguments definitions can be found explained in the [constructor API](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md#constructor) section.

```solidity title="LSP7 Token"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "@lukso/lsp7-contracts/contracts/LSP7DigitalAsset.sol";

contract MyLSP7Token is LSP7DigitalAsset {
    constructor(
        string memory name, // Name of the token
        string memory symbol, // Symbol of the token
        address tokenOwner, // Owner able to add extensions and change metadata
        uint256 lsp4tokenType, // 0 if representing a fungible token, 1 if representing an NFT
        bool isNonDivisible // false for decimals equal to 18, true for decimals equal to 0
    ) LSP7DigitalAsset(name, symbol, tokenOwner, lsp4tokenType, isNonDivisible) {
        // _mint(to, amount, force, data)
        // force: should be set to true to allow EOA to receive tokens
        // data: only relevant if the `to` is a smart contract supporting LSP1.
        _mint(tokenOwner, 200000, true, "");
    }
}
```

## Behavior

Below are the function signatures of the transfer functions for ERC20 and LSP7, respectively.

ERC20: `function transferFrom(address from, address to, uint256 amount);`

LSP7: `function transfer(address from, address to, uint256 amount, bool force, bytes data);`

- For LSP7, **mint and transfer functions will have a `force` additional field**. For full compatibility with ERC20 behavior (where the recipient can be any address), set this to `true`. Setting it to `false` will only allow the transfer to smart contract addresses supporting the LSP1 interfaceId. (Check [LSP1UniversalReceiver section](../../standards/tokens/LSP7-Digital-Asset.md#lsp1-token-hooks) in LSP7DigitalAsset for more info).

- For LSP7, **mint, transfer, and burn functions will have `data` as an additional field**. For full compatibility with ERC20 behavior, set this to empty bytes. This data will only be relevant when the recipient is a smart contract address supporting the LSP1 interfaceId (Check [LSP1UniversalReceiver section](../../standards/tokens/LSP7-Digital-Asset.md#lsp1-token-hooks) in LSP7DigitalAsset for more info), where the data will be sent and the recipient can act on it (e.g., reject the transfer, forward the tokens to a vault, etc.).

- **LSP7 metadata is generic**, in contrast to ERC20 where the metadata is limited to name and symbol. The [generic key-value store](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) in LSP7 allows for storing any possible data.

## Interacting with Contracts

:::info

To check function definitions and explanations of behavior and each parameter, check [API Reference](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md) section.

:::

To interact with LSP7DigitalAsset contract, different functions should be called. This is a table comparing function definitions:

<Erc20LSP7Table/>

| ERC20 Function                                           | LSP7 Equivalent                                                                     |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `approve(address spender, uint256 amount)`               | `authorizeOperator(address spender, uint256 amount, bytes memory data)`             |
| `allowance(address owner, address spender)`              | `authorizedAmountFor(address spender, address owner)`                               |
| _No equivalent_                                          | `getOperatorsOf(address owner)`                                                     |
| _No equivalent_                                          | `revokeOperator(address spender, bytes memory data)`                                |
| _No equivalent_                                          | `increaseAllowance(address spender, uint256 addedAmount, bytes memory data)`        |
| _No equivalent_                                          | `decreaseAllowance(address spender, uint256 subtractedAmount, bytes memory data)`   |
| `transfer(address to, uint256 amount)`                   | `transfer(address from, address to, uint256 amount, bool force, bytes memory data)` |
| `transferFrom(address from, address to, uint256 amount)` | `transfer(address from, address to, uint256 amount, bool force, bytes memory data)` |
| _No equivalent_                                          | `batchCalls(bytes[] memory data)`                                                   |

## dApps and Indexers

:::info

To check event definitions and explanations of behavior and each parameter, check [API Reference](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md) section.

:::

The table below shows the different event definitions that should be used to track activity on an LSP7-DigitalAsset contract.

| ERC20 Event                                                               | LSP7 Event                                                                                                                                   |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Transfer(address indexed from, address indexed to, uint256 value)`       | `Transfer(address indexed operator, address indexed from, address indexed to, uint256 amount, bool force, bytes data)`                       |
| `Approval(address indexed owner, address indexed spender, uint256 value)` | `OperatorAuthorizationChanged(address indexed operator, address indexed tokenOwner, uint256 indexed amount, bytes operatorNotificationData)` |
| _No equivalent_                                                           | `OperatorRevoked(address indexed operator, address indexed tokenOwner, bool indexed notified, bytes operatorNotificationData)`               |

## Metadata Management

### Basic Token Information

In ERC20, the name and symbol of a token can be retrieved by calling their own function:

```javascript
// ERC20
const name = await token.name();
const symbol = await token.symbol();
```

In LSP7, the token name and symbol can be retrieved with [getData](../../contracts/contracts/ERC725/ERC725.md#getdata) function, since LSP7 uses a generic metadata key value store:

```javascript
// LSP7
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

LSP7 allows for more flexible and extensive metadata storage. You can store a JSON object containing additional token information:

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
                url: 'ifps://QmW5cF4r9yWeY1gUCtt7c6v3ve7Fzdg8CKvTS96NU9Uiwr',
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
                    url: 'ifps://QmW4wM4r9yWeY1gUCtt7c6v3ve7Fzdg8CKvTS96NU9Uiwr',
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
            url: 'ifps://QmPJESHbVkPtSaHntNVY5F6JDLW8v69M2d6khXEYGUMn7N',
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
