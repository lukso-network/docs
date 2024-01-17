---
sidebar_label: '🃏 Create NFT Collection with a contract address as tokenId'
description: 'Learn how to create a NFT collection with a contract address as tokenId'
sidebar_position: 8
---

# Create NFT Collection with a contract address as tokenId

:::note

This guide builds on top of a Hardhat project using TypeScript as described in the [Getting Started](./getting-started.md) section.

:::

## Introduction

If you have been looking at our [LSP8 token standard](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md), you probably have notice that addresses could actually be tokenId. In this guide we will replicate a real world example where this could be useful.

## Use Case

Let's take the example of [The Dematerialised](https://thedematerialised.com), and more precisely their KLxENDLESS PHYSITAL COLLECTION. As you can see the picture below, we have three medaillons of different colors.

![KLxENDLESS PHYSITAL COLLECTION](../../../static/img/learn/klxendless-physital-collection.png)

Each medaillon has a supply limit and each medaillon collection has its own metadata with different attributes. What we will do is create an [LSP8 collection](../../standards/tokens//LSP8-Identifiable-Digital-Asset.md) that will represent the KLxENDLESS PHYSITAL collection and each medaillon sub-collection (purple, blue or gold) will be represented by an limited supply [LSP7 token](../../standards/tokens//LSP7-Digital-Asset.md).

## Prerequisites

- Hardhat installed and initialized
- [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package installed from npm using `npm i @lukso/lsp-smart-contracts@0.14.0` (or the latest version)
- [@erc725/erc725.js](https://www.npmjs.com/package/@erc725/erc725.js) package installed from npm using `npm i @erc725/erc725js` (we will use it to encode the token metadata)

## Create the LSP7 token

Even though, it seems a little bit counter intuitive, we will start by creating the LSP7 token. The reason is that the LSP8 collection will be in charge of deploying the LSP7 sub-collection tokens.

### Specify what we need to be set at deployment

In order to create the LSP7 token contract, we will need to know what we want to be set at deployment. In our case, we want to set the following:

- the name of the sub-collection
- the symbol of the sub-collection
- the address of the owner of the sub-collection (in our case it will the the LSP8 collection contract)
- the initial receiver of the tokens that will be minted at deployment (could be the token creator)
- the number of tokens that can be minted
- whether the token is divisible or not
- the total supply of the token
- the [Token Type](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4tokentype)
- the [LSP4 Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4metadata)

This is just an example but you may want to set a deployment other parameters such as the [LSP4 Creators array](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4creators).

### Imports

Let's start creating an `LSP7Token.sol` file in the `contracts` folder and importing:

- the [`LSP7DigitalAssetCore.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol) contract
- the [`LSP4DigitalAssetMetadata.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol) contract
- the [`_LSP4_SUPPORTED_STANDARDS_KEY`](../../standards//tokens/LSP4-Digital-Asset-Metadata.md#supportedstandardslsp4digitalasset) constant
- the [`_LSP4_SUPPORTED_STANDARDS_VALUE`](../../standards//tokens/LSP4-Digital-Asset-Metadata.md#supportedstandardslsp4digitalasset) constant
- the [`_LSP4_METADATA_KEY`](../../standards//tokens/LSP4-Digital-Asset-Metadata.md#lsp4metadata) constant
- the [`_LSP8_REFERENCE_CONTRACT`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8referencecontract) constant

```typescript
import { LSP7DigitalAssetCore } from '@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol';
import { LSP4DigitalAssetMetadata } from '@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol';
import {
  _LSP4_SUPPORTED_STANDARDS_KEY,
  _LSP4_SUPPORTED_STANDARDS_VALUE,
  _LSP4_METADATA_KEY,
} from '@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol';
import { _LSP8_REFERENCE_CONTRACT } from '@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol';
```

### Contract

At deployment, we will need to set the following parameters:

- `name`: the name of the token
- `symbol`: the symbol of the token
- `owner`: the address that will be able to update the contract metadata (except the symbol, name and the LSP4TokenType)
- `receiverOfInitialTokens`: the address that will receive the minted tokens at deployment
- `[lsp4TokenType](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4tokentype): the token type of the token
- [`isNonDivisible`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#decimals): whether the token is divisible or not
- `totalSupply`: the total supply of the token
- `lsp4MetadataURI`: the [LSP4 Metadata](../../standards//tokens/LSP4-Digital-Asset-Metadata.md#lsp4metadata)

```typescript
contract LSP7Token is LSP7DigitalAssetCore, LSP4DigitalAssetMetadata {
    constructor(
        string memory name_,
        string memory symbol_,
        address newOwner_,
        address receiverOfInitialTokens_,
        uint256 lsp4TokenType_,
        bool isNonDivisible_,
        uint256 totalSupply_,
        bytes memory lsp4MetadataURI_
    ) LSP4DigitalAssetMetadata(name_, symbol_, newOwner_, lsp4TokenType_) {
        _isNonDivisible = isNonDivisible_;

        // set SupportedStandards:LSP4DigitalAsset
        LSP4DigitalAssetMetadata._setData(
            _LSP4_SUPPORTED_STANDARDS_KEY,
            _LSP4_SUPPORTED_STANDARDS_VALUE
        );

        // set LSP8ReferenceContract
        LSP4DigitalAssetMetadata._setData(
            _LSP8_REFERENCE_CONTRACT,
            abi.encodePacked(
                msg.sender,
                bytes32(uint256(uint160(address(this))))
            )
        );

        // set the lsp4MetadataURI
        _setData(_LSP4_METADATA_KEY, lsp4MetadataURI_);

        // mint all tokens to the receiver of the initial tokens
        _mint(receiverOfInitialTokens_, totalSupply_, true, "");
    }
}
```

### Override the `_setData` function

As per the [`LSP8IdentifiableDigitalAsset`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8referencecontract) standard, the `LSP8ReferenceContract` data key should only be set once and not be modifiable. For this reason, we will need to override the `_setData(...)`function.

```typescript
contract LSP7Token is LSP7DigitalAssetCore, LSP4DigitalAssetMetadata {
    // previous code

    // override the _setData function so that the LSP8ReferenceContract is not editable
    function _setData(
        bytes32 dataKey,
        bytes memory dataValue
    ) internal override {
        require(
            dataKey != _LSP8_REFERENCE_CONTRACT,
            "LSP8ReferenceContractNotEditable"
        );
        LSP4DigitalAssetMetadata._setData(dataKey, dataValue);
    }
}
```

### Final LSP7 token contract

<details>
<summary>Click to expand/collapse the script</summary>

```typescript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LSP7DigitalAssetCore} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol";
import {LSP4DigitalAssetMetadata} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol";
import {_LSP4_SUPPORTED_STANDARDS_KEY, _LSP4_SUPPORTED_STANDARDS_VALUE, _LSP4_METADATA_KEY} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";
import {_LSP8_REFERENCE_CONTRACT} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";

contract LSP7Token is LSP7DigitalAssetCore, LSP4DigitalAssetMetadata {
    constructor(
        string memory name_,
        string memory symbol_,
        address newOwner_,
        address receiverOfInitialTokens_,
        uint256 lsp4TokenType_,
        bool isNonDivisible_,
        uint256 totalSupply_,
        bytes memory lsp4MetadataURI_
    ) LSP4DigitalAssetMetadata(name_, symbol_, newOwner_, lsp4TokenType_) {
        _isNonDivisible = isNonDivisible_;

        // set SupportedStandards:LSP4DigitalAsset
        LSP4DigitalAssetMetadata._setData(
            _LSP4_SUPPORTED_STANDARDS_KEY,
            _LSP4_SUPPORTED_STANDARDS_VALUE
        );

        // set LSP8ReferenceContract
        LSP4DigitalAssetMetadata._setData(
            _LSP8_REFERENCE_CONTRACT,
            abi.encodePacked(
                msg.sender,
                bytes32(uint256(uint160(address(this))))
            )
        );

        // set the lsp4MetadataURI
        _setData(_LSP4_METADATA_KEY, lsp4MetadataURI_);

        // mint all tokens to the receiver of the initial tokens
        _mint(receiverOfInitialTokens_, totalSupply_, true, "");
    }

    // override the _setData function so that the LSP8ReferenceContract is not editable
    function _setData(
        bytes32 dataKey,
        bytes memory dataValue
    ) internal override {
        require(
            dataKey != _LSP8_REFERENCE_CONTRACT,
            "LSP8ReferenceContractNotEditable"
        );
        LSP4DigitalAssetMetadata._setData(dataKey, dataValue);
    }
}
```

</details>

## Create the LSP8 token

Now that we have the LSP7 token, we can create the LSP8 token.

### Specify what the LSP8 token will need to do

The LSP8 token will be in charge of deploying the LSP7 token and minting the initial supply. When minting the LSP7 tokens, the deployed LSP7 token will be set as a `tokenId` of the LSP8 token.
For this reason, when minting a new token on the LSP8 contract (a new LSP7 token contract), we will need to set the following:

- the `name` of the LSP7 token
- the `symbol` of the LSP7 token
- the `lsp4TokenType` of the LSP7 token
- the `isNonDivisible` of the LSP7 token
- the `totalSupply` of the LSP7 token
- the `receiver` of the initial tokens of the LSP7 token

### Imports

Let's start creating an `LSP8Token.sol` file in the `contracts` folder and import:

- the [`LSP8IdentifiableDigitalAsset.sol`](https://github.com/lukso-network/lsp-smart-contracts.git)
- the LSP7 token contract we just created so that we can use it in our `mint(...)` function
- the [`_LSP4_METADATA_KEY`](../../standards//tokens/LSP4-Digital-Asset-Metadata.md#lsp4metadata) constant

```typescript
import { LSP8IdentifiableDigitalAsset } from '@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol';
import { _LSP4_METADATA_KEY } from '@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol';
import { LSP7Token } from './LSP7Token.sol';
```

### Contract

#### Constructor

The constructor will be in charge of setting the following parameters:

- `name`: the name of the LSP8 token
- `symbol`: the symbol of the LSP8 token
- `owner`: the owner of the LSP8 token that will be able change the contract metadata and mint new LSP7 tokens
- `lsp4TokenType`: the token type of the LSP8 token
- `lsp8TokenIdFormat`: the [format of the tokenId](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat) of the LSP8 token
- `lsp4MetadataURI`: the [LSP4 Metadata](../../standards//tokens/LSP4-Digital-Asset-Metadata.md#lsp4metadata)

```typescript
contract LSP8Token is LSP8IdentifiableDigitalAsset {
    constructor(
        string memory name_,
        string memory symbol_,
        address newOwner_,
        uint256 lsp4TokenType_,
        uint256 lsp8TokenIdFormat_,
        bytes memory lsp4MetadataURI_
    )
        LSP8IdentifiableDigitalAsset(
            name_,
            symbol_,
            newOwner_,
            lsp4TokenType_,
            lsp8TokenIdFormat_
        )
    {
        // set the lsp4MetadataURI
        _setData(_LSP4_METADATA_KEY, lsp4MetadataURI_);
    }
}
```

#### Mint function

Now let's implement the `mint(...)` function. This function will only be callable by the owner of the contract and will be in charge of deploying the LSP7 tokens as well as minting the LSP8 tokenId that will represent the LSP7 token.

```typescript
contract LSP8Token is LSP8IdentifiableDigitalAsset {

  // previous code

    function mint(
        string memory nameOfLSP7_,
        string memory symbolOfLSP7_,
        uint256 lsp4TokenType_,
        bool isNonDivisible_,
        uint256 totalSupplyOfLSP7_,
        address receiverOfInitialTokens_,
        bytes memory lsp4MetadataURIOfLSP7_
    ) public returns (address lsp7TokenAddress) {
        // deploy the LSP7Token and set the address as tokenId
        LSP7Token lsp7Token = new LSP7Token(
            nameOfLSP7_,
            symbolOfLSP7_,
            address(this), // owner of the LSP7Token is this contract (LSP8Token contract)
            receiverOfInitialTokens_,
            lsp4TokenType_,
            isNonDivisible_,
            totalSupplyOfLSP7_,
            lsp4MetadataURIOfLSP7_
        );

        lsp7TokenAddress = address(lsp7Token);

        // convert the address of the LSP7Token to bytes32 to use it as tokenId
        bytes32 tokenId = bytes32(uint256(uint160(lsp7TokenAddress)));

        /*
          owner of the tokenId is this contract
          tokenId is the address of the newly deployed LSP7Token
          force is true since here the owner of the tokenId is this contract
          data is empty
        */
        _mint(address(this), tokenId, true, "");
    }
}

```

### Override the `_setDataForTokenId` & `_getDataForTokenId` functions

Since we are inheriting from the `LSP8IdentifiableDigitalAsset.sol` contract, we will need to override the [`setDataForTokenId`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#setdatafortokenid) & [`getDataForTokenId`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#getdatafortokenid) functions (same for the batch functions). These functions will be in charge of setting and getting the metadata of the deployed LSP7 token. In this particular case, it will make more sense to directly call on the [`setData(...)`](../../contracts/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.md#setData) and [`getData(...)`](../../contracts/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.md#getData) functions of the LSP7 token contract.

```typescript
contract LSP8Token is LSP8IdentifiableDigitalAsset {

    // previous code

    // override the _setDataForTokenId function to set the data on the LSP7Token itself
    function _setDataForTokenId(
        bytes32 tokenId,
        bytes32 dataKey,
        bytes memory dataValue
    ) internal override {
        // setData on the LSP7Token
        LSP7Token(address(uint160(uint256(tokenId)))).setData(
            dataKey,
            dataValue
        );

        emit TokenIdDataChanged(tokenId, dataKey, dataValue);
    }

    // override the _getDataForTokenId function to get the data from the LSP7Token itself
    function _getDataForTokenId(
        bytes32 tokenId,
        bytes32 dataKey
    ) internal view override returns (bytes memory dataValues) {
        return LSP7Token(address(uint160(uint256(tokenId)))).getData(dataKey);
    }
}
```

### Final LSP8 token contract

<details>
<summary>Click to expand/collapse the script</summary>

```typescript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LSP8IdentifiableDigitalAsset} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";
import {_LSP4_METADATA_KEY} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";
import {LSP7Token} from "./LSP7Token.sol";

contract LSP8Token is LSP8IdentifiableDigitalAsset {
    constructor(
        string memory name_,
        string memory symbol_,
        address newOwner_,
        uint256 lsp4TokenType_,
        uint256 lsp8TokenIdFormat_,
        bytes memory lsp4MetadataURI_
    )
        LSP8IdentifiableDigitalAsset(
            name_,
            symbol_,
            newOwner_,
            lsp4TokenType_,
            lsp8TokenIdFormat_
        )
    {
        // set the lsp4MetadataURI
        _setData(_LSP4_METADATA_KEY, lsp4MetadataURI_);
    }

    function mint(
        string memory nameOfLSP7_,
        string memory symbolOfLSP7_,
        uint256 lsp4TokenType_,
        bool isNonDivisible_,
        uint256 totalSupplyOfLSP7_,
        address receiverOfInitialTokens_,
        bytes memory lsp4MetadataURIOfLSP7_
    ) public returns (address lsp7TokenAddress) {
        // deploy the LSP7Token and set the address as tokenId
        LSP7Token lsp7Token = new LSP7Token(
            nameOfLSP7_,
            symbolOfLSP7_,
            address(this), // owner of the LSP7Token is this contract (LSP8Token contract)
            receiverOfInitialTokens_,
            lsp4TokenType_,
            isNonDivisible_,
            totalSupplyOfLSP7_,
            lsp4MetadataURIOfLSP7_
        );

        lsp7TokenAddress = address(lsp7Token);

        // convert the address of the LSP7Token to bytes32 to use it as tokenId
        bytes32 tokenId = bytes32(uint256(uint160(lsp7TokenAddress)));

        /*
          owner of the tokenId is this contract
          tokenId is the address of the newly deployed LSP7Token
          force is true since here the owner of the tokenId is this contract
          data is empty
        */
        _mint(address(this), tokenId, true, "");
    }

    // override the _setDataForTokenId function to set the data on the LSP7Token itself
    function _setDataForTokenId(
        bytes32 tokenId,
        bytes32 dataKey,
        bytes memory dataValue
    ) internal override {
        // setData on the LSP7Token
        LSP7Token(address(uint160(uint256(tokenId)))).setData(
            dataKey,
            dataValue
        );

        emit TokenIdDataChanged(tokenId, dataKey, dataValue);
    }

    // override the _getDataForTokenId function to get the data from the LSP7Token itself
    function _getDataForTokenId(
        bytes32 tokenId,
        bytes32 dataKey
    ) internal view override returns (bytes memory dataValues) {
        return LSP7Token(address(uint160(uint256(tokenId)))).getData(dataKey);
    }
}
```

</details>

## Scripts

Now that we have the contracts ready to be deployed, let's create a script that will deploy the LSP8 token and one script that will mint the LSP7 tokens.

:::note

Please make sure you compile your newly created contract before creating the scripts.
You can run `npx hardhat compile` to compile your contracts.
Since the contracts are quite big, you may run into a compilation error. If this is the case, you should update your compiler settings in the `hardhat.config.ts` file.
This is what we used to compile the contracts:

<details>
<summary>Click to expand/collapse the script</summary>
```typescript
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  }
````

</details>
:::

### Create the metadata JSONs files

:::note
In this part we will not cover the part where you first need to upload your JSONs files on IPFS and retrieve their CIDs.
We have done it and will add them directly in the following scripts files.
:::

Let's start by creating a `lsp8TokenMetadata.json` file in the `metadata` folder and set the following metadata:

```json
{
  "LSP4Metadata": {
    "name": "The Dematerialised",
    "description": "The Experiential Marketspace For Digital Goods",
    "links": [{ "title": "Website", "url": "https://thedematerialised.com" }],
    "icon": [],
    "images": [
      [
        {
          "width": 1024,
          "height": 974,
          "url": "ifps://QmS3jF9jsoG6gnyJ7wCeJ4bej2aJEnPSv527UV8KxjBDAA"
        }
      ]
    ],
    "assets": [],
    "attributes": []
  }
}
```

We will do the same with the LSP7 token metadata. Let's create a `lsp7TokenMetadata.json` file in the `metadata` folder and set the following metadata:

```json
{
  "LSP4Metadata": {
    "name": "KLxENDLESS MEDALLION Purple",
    "description": "Collaboration with Karl Largerfeld",
    "links": [{ "title": "", "url": "" }],
    "icon": [
      {
        "width": 256,
        "height": 256,
        "url": "ifps://QmS3jF9jsoG6gnyJ7wCeJ4bej2aJEnPSv527UV8KxjBDAA"
      }
    ],
    "images": [
      [
        {
          "width": 1024,
          "height": 974,
          "url": "ifps://QmTDQGR26dSd3c4qJpmFwTh7gNRPnNbBf2Fg3gULypUag3"
        }
      ]
    ],
    "assets": [],
    "attributes": []
  }
}
```

### Deploy the LSP8 token script

Let's create a `deployLSP8Token.ts` file in the `scripts` folder.

#### Imports

For this script we will jut need to import:

- the `ethers` library to interact with the blockchain
- the ERC725 library to convert the metadata to [VerifiableURI](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#verifiableuri)
- the LSP8 token metadata json file

```typescript
import { ethers } from 'hardhat';
import { ERC725 } from '@erc725/erc725.js';
import lsp8TokenMetadata from './metadata/lsp8TokenMetadata.json';
```

#### Constants

We will need to set:

- the `lsp8TokenMetadataCID` constant that is the IPFS CID of the LSP8 token metadata file we just created
- the `schemas` we will be using with the ERC725 library in order to convert the metadata to a verifiable uri

```typescript
const lsp8TokenMetadataCID =
  'ipfs://QmRiZA4TXytvijaxXtJATstnqvTLesmJWM6Ki1fM1xW2QK';

const schemas = [
  {
    name: 'LSP4Metadata',
    key: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',
    keyType: 'Singleton',
    valueType: 'bytes',
    valueContent: 'VerifiableURI',
  },
];
```

#### Deploy the LSP8 token

Let's create a `main()` function that will be in charge of deploying the LSP8 token.

```typescript
async function main() {
  // get LSP8Token contract factory
  const LSP8Token = await ethers.getContractFactory('LSP8Token');

  // get the deployer address so we can assign ownership to it
  const [deployer] = await ethers.getSigners();

  // convert the lsp8TokenMetadata to a verifiable uri
  const erc725 = new ERC725(schemas, '', '', {});
  const encodeMetadata = erc725.encodeData([
    {
      keyName: 'LSP4Metadata',
      value: {
        json: lsp8TokenMetadata,
        url: lsp8TokenMetadataCID,
      },
    },
  ]);

  // deploy LSP8Token contract
  const lsp8Token = await LSP8Token.deploy(
    'KLxENDLESS Medallion Purple',
    'KLxENDLESS',
    // will be the owner of the LSP8Token contract
    deployer.address,
    // lsp4TokenType is address - see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4tokentype
    2,
    // tokenId format is address - see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat
    2,
    // encoded metadata
    encodeMetadata.values[0],
  );

  // wait until the contract is mined
  await lsp8Token.waitForDeployment();

  // print contract address
  console.log('LSP8Token deployed to:', await lsp8Token.getAddress());
}
```

#### Final script

<details>
<summary>Click to expand/collapse the script</summary>

```typescript
import { ethers } from 'hardhat';
import { ERC725 } from '@erc725/erc725.js';
import lsp8TokenMetadata from './metadata/lsp8TokenMetadata.json';

const lsp8TokenMetadataCID =
  'ipfs://QmRiZA4TXytvijaxXtJATstnqvTLesmJWM6Ki1fM1xW2QK';

const schemas = [
  {
    name: 'LSP4Metadata',
    key: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',
    keyType: 'Singleton',
    valueType: 'bytes',
    valueContent: 'VerifiableURI',
  },
];

async function main() {
  // get LSP8Token contract factory
  const LSP8Token = await ethers.getContractFactory('LSP8Token');

  // get the deployer address so we can assign ownership to it
  const [deployer] = await ethers.getSigners();

  // convert the lsp8TokenMetadata to a verifiable uri
  const erc725 = new ERC725(schemas, '', '', {});
  const encodeMetadata = erc725.encodeData([
    {
      keyName: 'LSP4Metadata',
      value: {
        json: lsp8TokenMetadata,
        url: lsp8TokenMetadataCID,
      },
    },
  ]);

  // deploy LSP8Token contract
  const lsp8Token = await LSP8Token.deploy(
    'MyToken0',
    'MT0',
    // will be the owner of the LSP8Token contract
    deployer.address,
    // lsp4TokenType is address - see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4tokentype
    2,
    // tokenId format is address - see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat
    2,
    // encoded metadata
    encodeMetadata.values[0],
  );

  // wait until the contract is mined
  await lsp8Token.waitForDeployment();

  // print contract address
  console.log('LSP8Token deployed to:', await lsp8Token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

</details>

#### Run the script

Let's run the script using `npx hardhat run scripts/deployLSP8Token.ts --network <nameOfNetwork>`.

:::note
The deployed contract address should be printed in the console. Make sure to copy it as we will need it for the next script.
:::

#### Check the deployed contract

If you happen to have deployed the contract on one of our network (Testnet or Mainnet), you can check the contract on our [ERC725 Inspect tool](https://erc725-inspect.lukso.tech/inspector).
By pasting the address of the contract, you should see that it supports:

- [ERC725Y](../../standards/generic-standards/lsp2-json-schema.md)
- [LSP8IdentifiableDigitalAsset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md)

![Inspect tool](../../../static/img/learn/inspect-tool-lsp8.png)

### Mint the LSP7 tokens script

Let's create a `mintLSP7Tokens.ts` file in the `scripts`.

#### Imports

For this script we will just need to import:

- the `ethers` library to interact with the blockchain
- the ERC725 library to convert the metadata
- the LSP7 token metadata json file

```typescript
import { ethers } from 'hardhat';
import { ERC725 } from '@erc725/erc725.js';
import lsp7TokenMetadata from './metadata/lsp7TokenMetadata.json';
```

#### Constants

For this script, we will need to set the following constants:

- `lsp8TokenContractAddress`: the address of the LSP8 token contract we just deployed
- `lsp7TokenName`: the name of the LSP7 token we want to mint
- `lsp7TokenSymbol`: the symbol of the LSP7 token we want to mint
- `lsp7TokenType`: the token type of the LSP7 token we want to mint
- `lsp7TokenIsNonDivisible`: whether the LSP7 token we want to mint is divisible or not
- `lsp7TokenTotalSupply`: the total supply of the LSP7 token we want to mint
- `lsp7TokenMetadataCID`: the IPFS CID of the LSP7 token metadata file we just created
- `schemas`: the schemas we will be using with the ERC725 library in order to convert the metadata to a verifiable uri

```typescript
const lsp8TokenContractAddress = '0xd2c4c2634a547F170E1e02AA9d15747845d27999';
const lsp7TokenName = 'KLxENDLESS MEDALLION Purple';
const lsp7TokenSymbol = 'KLxENDLESS MEDALLION';
const lsp7TokenType = 2;
const lsp7TokenIsNonDivisible = true; // decimals will be 0
const lsp7TokenSupply = 50;
const lsp7TokenMetadataCID =
  'ipfs://QmTRPdywbusetLCffDJX6CuXMJ7eqXduYoWVvjnTXT5xgz';
// lsp4 metadata schema
const schemas = [
  {
    name: 'LSP4Metadata',
    key: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',
    keyType: 'Singleton',
    valueType: 'bytes',
    valueContent: 'VerifiableURI',
  },
];
```

### Mint the LSP7 tokens

Let's create a `main()` function that will be in charge of minting the LSP7 tokens.

```typescript
async function main() {
  // get LSP8Token contract
  const lsp8TokenContract = await ethers.getContractAt(
    'LSP8Token',
    lsp8TokenContractAddress,
  );

  // convert the lsp4TokenMetadata to a verifiable uri
  const erc725 = new ERC725(schemas, '', '', {});
  const encodedMetadata = erc725.encodeData(
    [
      {
        keyName: 'LSP4Metadata',
        value: {
          json: lsp7TokenMetadata,
          url: lsp7TokenMetadataCID,
        },
      },
    ],
    [],
  );

  // get deployer to set it as original receiver of the minted tokens
  const [deployer] = await ethers.getSigners();

  // get LSP7Token contract address
  const lsp7ContractAddress = await lsp8TokenContract.mint.staticCall(
    lsp7TokenName,
    lsp7TokenSymbol,
    lsp7TokenType,
    lsp7TokenIsNonDivisible,
    lsp7TokenSupply,
    deployer.address,
    encodedMetadata.values[0],
  );

  // mint LSP7Token
  const tx = await lsp8TokenContract.mint(
    lsp7TokenName,
    lsp7TokenSymbol,
    lsp7TokenType,
    lsp7TokenIsNonDivisible,
    lsp7TokenSupply,
    deployer.address,
    encodedMetadata.values[0],
  );

  await tx.wait();

  console.log('LSP7Token deployed to:', lsp7ContractAddress);
}
```

#### Final script

<details>

<summary>Click to expand/collapse the script</summary>

```typescript
import { ethers } from 'hardhat';
import { ERC725 } from '@erc725/erc725.js';
import lsp7TokenMetadata from './metadata/lsp7TokenMetadata.json';

const lsp8TokenContractAddress = '0xd2c4c2634a547F170E1e02AA9d15747845d27999';
const lsp7TokenName = 'KLxENDLESS MEDALLION Purple';
const lsp7TokenSymbol = 'KLxENDLESS MEDALLION';
const lsp7TokenType = 2;
const lsp7TokenIsNonDivisible = true; // decimals will be 0
const lsp7TokenSupply = 50;
const lsp7TokenMetadataCID =
  'ipfs://QmTRPdywbusetLCffDJX6CuXMJ7eqXduYoWVvjnTXT5xgz';
// lsp4 metadata schema
const schemas = [
  {
    name: 'LSP4Metadata',
    key: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',
    keyType: 'Singleton',
    valueType: 'bytes',
    valueContent: 'VerifiableURI',
  },
];

async function main() {
  // get LSP8Token contract
  const lsp8TokenContract = await ethers.getContractAt(
    'LSP8Token',
    lsp8TokenContractAddress,
  );

  // convert the lsp4TokenMetadata to a verifiable uri
  const erc725 = new ERC725(schemas, '', '', {});
  const encodedMetadata = erc725.encodeData(
    [
      {
        keyName: 'LSP4Metadata',
        value: {
          json: lsp7TokenMetadata,
          url: lsp7TokenMetadataCID,
        },
      },
    ],
    [],
  );

  // get deployer to set it as original receiver of the minted tokens
  const [deployer] = await ethers.getSigners();

  // get LSP7Token contract address
  const lsp7ContractAddress = await lsp8TokenContract.mint.staticCall(
    lsp7TokenName,
    lsp7TokenSymbol,
    lsp7TokenType,
    lsp7TokenIsNonDivisible,
    lsp7TokenSupply,
    deployer.address,
    encodedMetadata.values[0],
  );

  // mint LSP7Token
  const tx = await lsp8TokenContract.mint(
    lsp7TokenName,
    lsp7TokenSymbol,
    lsp7TokenType,
    lsp7TokenIsNonDivisible,
    lsp7TokenSupply,
    deployer.address,
    encodedMetadata.values[0],
  );

  await tx.wait();

  console.log('LSP7Token deployed to:', lsp7ContractAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

</details>

#### Run the script

Let's run the script using `npx hardhat run scripts/mintLSP7Tokens.ts --network <nameOfNetwork>`.

#### Check the deployed contract

If you happen to have deployed the contract on one of our network (Testnet or Mainnet), you can check the contract on our [ERC725 Inspect tool](https://erc725-inspect.lukso.tech/inspector).
By pasting the address of the contract, you should see that it supports:

- [ERC725Y](../../standards/generic-standards/lsp2-json-schema.md)
- [LSP7DigitalAsset](../../standards/tokens/LSP7-Digital-Asset.md)

![Inspect tool](../../../static/img/learn/inspect-tool-lsp7.png)

## Conclusion

In this guide, we have seen how to create an LSP8 token that will be in charge of deploying LSP7 tokens and minting the initial supply.
This is one way of doing it and can be adapted to your needs.
