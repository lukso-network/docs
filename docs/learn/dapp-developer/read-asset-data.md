---
sidebar_label: '🎆 Read Asset Data'

sidebar_position: 7

description: Learn how to read Digital Asset (LSP7) and Identifiable Digital Assets (NFT/LSP8) data from their smart contracts.
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

# Read Digital Asset Data

<div style={{textAlign: 'center', color: 'grey'}}>

<img

src={require('/img/learn/asset_view.png').default}

alt="Universal Profile example on universalprofile.cloud"

width="800"

/>

<br/>

<i>A <a href="https://wallet.universalprofile.cloud/asset/0x0514A829C832639Afcc02D257154A9DaAD8fa21B?network=testnet">LSP7 Token</a> as seen on UniversalProfile.cloud</i>

<br /><br />

</div>

On the LUKSO network, [Digital Assets](../../standards/tokens/introduction.md) are created using the [LSP7 - Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) and [LSP8 - Identifiable Digital Asset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) standards. They come with their own [ERC-721Y](../../standards/lsp-background/erc725.md) storage and [unlock much more posibilities](../../standards/tokens/introduction.md) for your digital assets.

In this tutorial, you will learn how to:

- [Read Digital Asset Data](#read-digital-asset-data)
  - [Setup](#setup)
  - [Detect the Contract Interface](#detect-the-contract-interface)
  - [Detect the Metadata Standard](#detect-the-metadata-standard)
  - [Detect the Token Type](#detect-the-token-type)
  - [Fetch the Asset Metadata](#fetch-the-asset-metadata)
    - [Global Token Information](#global-token-information)
    - [Token ID Metadata](#token-id-metadata)
    - [Preparing the Token IDs](#preparing-the-token-ids)
    - [Get Data from Token ID](#get-data-from-token-id)
    - [Get Data from Base URI](#get-data-from-base-uri)
    - [Get the JSON Content](#get-the-json-content)
  - [Fetch Creators and Token Properties](#fetch-creators-and-token-properties)

## Setup

:::success Preparation

Before getting into the code, you need to be familiar with the token standards [LSP7 - Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) and [LSP8 - Digital Identifiable Asset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md), as well as knowing [how they differ based on their token types](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#types-of-digital-assets) defined by [LSP4 - Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md).

:::

:::info Get Asset Addresses

As every Universal Profile comes with a 📢 [Universal Receiver](../../standards/generic-standards/lsp1-universal-receiver.md), the owned assets can be fetched directly directly from it's contract. For more information, please check the 📒 [Read Profile Data](./read-profile-data.md#fetch-assets-and-universal-receiver) tutorial. Aditionally, 🔮 [UniversalProfile.cloud](https://universalprofile.cloud/) also shows all deployed profiles and assets as well.

:::

:::info Code Examples

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/digital-assets) repository.

:::

To easily interact with an asset you are encouraged to use the ⚒️ [erc725.js](../../tools/erc725js/getting-started.md) and 📃 [lsp-smart-contracts](../../tools/erc725js/getting-started.md) libraries. Those will not only help fetching and encoding contract data easily, but also provide all the necessary interface and metadata IDs, necessary for classifying the asset. You can install them in your project using the following command:

```shell

npm install @erc725/erc725.js @lukso/lsp-smart-contracts

```

## Detect the Contract Interface

Once you have the address of an asset, you need to check if the asset's contract is LSP7 or LSP8. To do so, check the contract's `interfaceId` like in the previous [Interface Detection Guide](./standard-detection.md#interface-detection). If you are using the 📃 [lsp-smart-contracts](../../tools/lsp-smart-contracts/getting-started) library, you can fetch the `interfaceId`'s directly from the package's [constants](../../tools/lsp-smart-contracts/constants),. Optionally, you can also find a full list of all `interfaceId`'s on the [Contracts](https://docs.lukso.tech/contracts/interface-ids/) page and input them manually.

The ⚒️ [erc725.js](https://npmjs.com/package/@erc725/erc725.js) library works with [ERC725Y JSON schemas](../../standards/generic-standards/lsp2-json-schema). These schemas are JSON structures that tell developers and programs how to decode and encode 🗂️ [ERC725Y data keys](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store). You need to load the required schemas of the data keys you want to fetch when initializing the `ERC725` class. The most common schemas are [available](../../tools/erc725js/schemas.md) in erc725.js. You can also create and load your own ERC725Y JSON schemas if you want to use custom data keys.

To start, instantiate the ⚒️ [erc725.js](https://www.npmjs.com/package/@erc725/erc725.js) library with your asset address, an RPC provider (`web3`, `ethereum`, `ethers`), and an IPFS gateway.

:::caution

Make sure to adjust `<myAssetAddress>` with the actual address of the asset. You can give it a try using the address of the testnet LSP7 asset shown above: [`0x0514A829C832639Afcc02D257154A9DaAD8fa21B`](https://wallet.universalprofile.cloud/asset/0x0514A829C832639Afcc02D257154A9DaAD8fa21B?network=testnet).

:::

<!-- prettier-ignore-start -->

```js

import { ERC725 } from '@erc725/erc725.js';

import lsp4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

const myAsset = new ERC725(lsp4Schema,'<myAssetAddress>', 'https://4201.rpc.thirdweb.com',

  {

    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',

  },

);

const isLSP7 = await myAsset.supportsInterface(

  INTERFACE_IDS.LSP7DigitalAsset);

const isLSP8 = await myAsset.supportsInterface(

  INTERFACE_IDS.LSP8IdentifiableDigitalAsset,

);

console.log(isLSP7, isLSP8); // each, true or false

```

<!-- prettier-ignore-end -->

## Detect the Metadata Standard

:::success Check Assets Online

You can use the 🔎 [ERC725 Inspect](https://erc725-inspect.lukso.tech/inspector) tool for inspecting assets within the browser.

:::

After you've approved the contract type, its recommended to check if the asset actually implemented the [LSP4 - Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) into it's storage.

<details>

<summary>

<a href="../../standards/tokens/LSP4-Digital-Asset-Metadata.md">LSP4 - Digital Asset Metadata</a> describes the data within <a href="../../standards/tokens/LSP7-Digital-Asset.md">LSP7</a> and <a href="../../standards/tokens/LSP8-Identifiable-Digital-Asset.md">LSP8</a> asset's <a href="../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store">ERC725Y data storage</a>. <br/>The following data keys can be fetched. 👇

</summary>

<div>

- `SupportedStandards:LSP4DigitalAsset` verifies that the ERC725Y contract contains [LSP4DigitalAsset](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) data keys

- `LSP4Metadata` contains the JSON file with asset descriptions and images

- `LSP4Creators[]` contains an array of all creators of the asset

- `LSP4CreatorsMap:<address>` contains a mapping of creator-specific information

- `LSP4TokenType` displays the asset's token type as number

- `LSP4TokenSymbol` displays the string of the asset's symbol

- `LSP4TokenName` displays the string of the asset's name

</div>

</details>

As shown in the previous [Metadata Detection Guide](./standard-detection.md#metadata-detection), you can get the content of the data keys directly using the `getData(...)` function of the ⚒️ [`erc725.js`](../../tools/erc725js/methods#getdata) library.

<!-- prettier-ignore-start -->

```js

// ...

// Verify if the standardized data key is supported

const supportsLSP4 = (await myAsset.getData(

  'SupportedStandards:LSP4DigitalAsset')).value !== null;

console.log(supportsLSP4);

```

<!-- prettier-ignore-end -->

:::note Get all data keys at once

Instead of providing a specific data key like `SupportedStandards:LSP4DigitalAsset`, you can get the full set of data keys by using the `getData()` function without parameters.

:::

## Detect the Token Type

If both, contract and metadata standard are aligned, we can continue to determine the [LSP4 Token Type](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#types-of-digital-assets) in order to interpret the metadata correctly.

<!-- prettier-ignore-start -->

```js

// ...

const tokenType = await myAsset.getData('LSP4TokenType');

console.log(tokenType);

// 0 = Token

// 1 = NFT

// 2 = Collection

```

<!-- prettier-ignore-end -->

At this point, you should be able to identify if the digital asset is a:

- LSP7 - Token

- LSP7 - NFT

- LSP8 - NFT

- LSP8 - Collection

## Fetch the Asset Metadata

Based on the [token type](#detect-the-token-type), the information of the [LSP4 Digital Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#types-of-digital-assets) can be interpreted differently:

- As [**global token information**](#global-token-information) of the contract (Token or LSP7 NFT)

- To each [**individual token ID**](#token-id-metadata) (LSP8 NFT or Collection)

:::tip Token ID Entries

- If your asset is a Token (`tokenType = 0`), individual metadata cant be set, due to the lack of token IDs.

- If your asset is an NFT (`tokenType = 1`), individual metadata may be set in addition to the global token information.

- If your asset is a Collection (`tokenType = 2`), the token ID-specific medatada is mandatory.

:::

### Global Token Information

To fetch the whole JSON file of the asset's metadata, you can use the following 2 functions of the [`erc725js`](../../tools/erc725js/getting-started.md) library:

- [`fetchData('LSP4Metadata')`](../../tools/erc725js/methods.md#fetchdata): This will download and decode the content of `VerifiableURI` as JSON.

- [`getData(LSP4Metadata)`](../../tools/erc725js/methods#getdata): This will retrieve the raw data value from the smart contract. You will then need to decode the `VerifiableURI` maunually using [`decodeData(...)`](../../tools/erc725js/methods.md#decodedata).

```js
// ...

// Download and verify the asset metadata JSON file

const assetMetadata = await myAsset.fetchData('LSP4Metadata');

console.log(assetMetadata);
```

<details>

<summary>Show result</summary>

```js

{

  "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",

  "name": "LSP4Metadata",

  "value": {

    "LSP4Metadata": {

      "description": "A MINT PASS enables 1x Token Deployment using the upturn protocol",

      "links": [

        {

          "title": "upturnOS",

          "url": "https://upturn.live"

        }

      ],

      "icon": [

        {

          "width": 1600,

          "height": 1584,

          "url": "ipfs://bafybeieyp4gvgprefvd6exm4sdbehkzlu2rmh57ferp3tmfb2oihfg6tp4",

          "verification": {

            "method": "keccak256(bytes)",

            "data": "0x996302e00ef0226f12d44c029fb2c82290f31e2209013cd5c0502840f8e57d0e"

          }

        }

      ],

      "backgroundImage": [

        {

          "width": 1920,

          "height": 1080,

          "url": "ipfs://bafybeiediqal3fvzlmu5c4kc2kei2irq5rggi5hkmqecvefcdiaeg2bgbu",

          "verification": {

            "method": "keccak256(bytes)",

            "data": "0xf80f3cfd9f905186fb30bcbd77c4111e4afe5fba75c678928e7fc2452f74cbc1"

          }

        }

      ],

      "assets": [

        {

          "url": "ipfs://bafkreibxq4lrx5s4q5lag5wsw7pivugcfkb4ync4y23wjgy4brbusi7tsy",

          "fileType": "image/png",

          "verification": {

            "method": "keccak256(bytes)",

            "data": "0x4ec65a52385593b134770e5612cfcb54c0a77aba2121964e0b27ba037cf4eea6"

          }

        }

      ],

      "images": [

        [

          {

            "width": 1440,

            "height": 1440,

            "url": "ipfs://bafkreibxq4lrx5s4q5lag5wsw7pivugcfkb4ync4y23wjgy4brbusi7tsy",

            "verification": {

              "method": "keccak256(bytes)",

              "data": "0x4ec65a52385593b134770e5612cfcb54c0a77aba2121964e0b27ba037cf4eea6"

            }

          }

        ]

      ]

    }

  }

}

```

</details>

### Token ID Metadata

If your token is an [LSP8](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) NFT or Collection, you can fetch the metadata of specific token IDs. However, there are different ways of retrieving token ID metadata based on the configuration of the contract. You can either:

- call [`getDataForTokenId(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.md#getdatafortokenid): By using this method, you retrieve the individual metadata directly on the contract. This is the default and recommended procedure, as it can be used regardless of if token IDs follow a numeral sequence, are created individually after contract creation, or if the metadata was updated for a certain subset.

- read [`LSP8TokenMetadataBaseURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenmetadatabaseuri): By using this method, you can dynamically generate the URL to individul metadata files. This is usually done when the token IDs of an NFT or Collection can be pre-determined by a sequence, are set up in advance, or if metadata is uploaded or updated in bulk.

:::info Order of Data Fetches

Due to different versions of setting and fetching token IDs based on the asset conditions, returned values might be empty. Therefore, it's recommended to first call the [`getDataForTokenId(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.md#getdatafortokenid) to check for specific metadata. If the metadata is not set on the token ID, continue to retrieve the [`LSP8TokenMetadataBaseURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenmetadatabaseuri) of the [LSP8](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) contract.

If neither Token ID Metadata nor Base URI are set, you should fall back and fetch the [Global Token Information](#global-token-information), potentially including a Base URI to [retrieve the JSON content](#get-the-json-content).

:::

To get token ID metadata, you will have to make direct contract calls.Therefore, install a provider library, set up the contract, and import the related contract ABIs. Its also recommended to use the [`erc725.js`](../../tools/erc725js/getting-started.md) and [`lsp-smart-contracts`](../../tools/lsp-smart-contracts/getting-started.md) libraries to easily get [ERC725Y](../../standards/lsp-background/erc725.md) data keys and decode their values.

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers">

```bash

npm install ethers @erc725/erc725.js @lukso/lsp-smart-contracts

```

```js
// Add the necessary imports to your JS file

import { ethers } from 'ethers';

import lsp8Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

import { INTERFACE_IDS, ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

const provider = new ethers.JsonRpcProvider('https://4201.rpc.thirdweb.com');

// Create contract instance

const myAssetContract = new ethers.Contract(
  '<myAssetAddress>',

  lsp8Artifact.abi,

  provider,
);
```

</TabItem>

<TabItem value="web3" label="web3">

```bash

npm install web3 @erc725/erc725.js @lukso/lsp-smart-contracts

```

```js
// Add the necessary imports to your JS file

import Web3 from 'web3';

import lsp8Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

import { INTERFACE_IDS, ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://4201.rpc.thirdweb.com'),
);

// Create contract instance

const myAssetContract = new web3.eth.Contract(
  lsp8Artifact.abi,

  '<myAssetAddress>',
);
```

</TabItem>

</Tabs>

:::caution

Make sure to adjust `<myAssetAddress>` with the actual address of the asset. You can give it a try using a sample LSP8 asset on the LUKSO Testnet: [`0x8734600968c7e7193BB9B1b005677B4edBaDcD18`](https://wallet.universalprofile.cloud/asset/0x8734600968c7e7193BB9B1b005677B4edBaDcD18?network=testnet).

:::

### Preparing the Token IDs

The [LSP8](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) allows for different [Token ID Formats](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat), meaning developers can specify their token IDs as `Number`, `String`, `Smart Contract Address`, `Byte Identifier` or `Hash Digest`.

To call the contract, you must first prepare your token IDs to match the standardized Byte32 Hex Strings based on the [`LSP8TokenIdFormat`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat) standardization. The global token ID format can be fetched from the [ERC725Y](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store) data storage using the [`getData()`](../../contracts/contracts/ERC725/ERC725.md#getdata) function:

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers">

```js
// ...

// Get the global token ID format

let tokenIdFormat = parseInt(
  await myAssetContract.getData(ERC725YDataKeys.LSP8['LSP8TokenIdFormat']),

  16,
);

console.log(tokenIdFormat);

// 0
```

</TabItem>

<TabItem value="web3" label="web3">

```js
// ...

// Get the global token ID format

let tokenIdFormat = parseInt(
  await myAssetContract.methods

    .getData(ERC725YDataKeys.LSP8['LSP8TokenIdFormat'])

    .call(),

  16,
);

console.log(tokenIdFormat);

// 0
```

</TabItem>

</Tabs>

Its value can indicate wheater the token ID format is [equal or mixed across all token IDs](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat)

If your token ID is not yet compatible to [`LSP8TokenIdFormat`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat), you have to convert it to the correct format first. Otherwise, you will be able to directly continue with fetching the metadata.

<details>

<summary>How to convert a <code>tokenID</code> to a <code>Byte32 Hex String</code> according to <code>LSP8TokenIdFormat</code></summary>

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers">

```js

// ...

// Sample Token ID of the contract

// Could be 1, my-token-id, 0x123, etc.

const myTokenId = '1';

// Convert a token ID according to LSP8TokenIdFormat

const convertTokenId = (tokenID: string, tokenIdFormat: number) => {

  switch (tokenIdFormat) {

    case 0:

    case 100:

      // uint256 - Number (Left padded)

      return ethers.zeroPadValue('0x0' + BigInt(tokenID).toString(16), 32);

    case 1:

    case 101:

      // string - String (Right padded)

      return ethers.encodeBytes32String(tokenID).padEnd(32, '0');

    case 2:

    case 102:

      // address - Smart Contract (Left padded)

      return ethers.zeroPadValue(tokenID, 32);

    case 3:

    case 103:

      // bytes32 - Unique Bytes (Right padded)

      return ethers

        .hexlify(ethers.getBytes(tokenID).slice(0, 32))

        .padEnd(66, '0');

    case 4:

    case 104:

      // bytes32 - Hash Digest (No padding)

      return tokenID;

  }

};

let byte32TokenId = convertTokenId(myTokenId, tokenIdFormat);

console.log(byte32TokenId);

// 0x0000000000000000000000000000000000000000000000000000000000000001

// If token ID format is mixed, retrieve it for the individual token ID

if (tokenIdFormat >= 100) {

  tokenIdFormat = parseInt(

    await myAssetContract.getDataForTokenId(

      byte32TokenId,

      ERC725YDataKeys.LSP8['LSP8TokenIdFormat'],

    ),

    16,

  );

  byte32TokenId = convertTokenId(myTokenId, tokenIdFormat);

  console.log(tokenIdFormat);

  // 0x0000000000000000000000000000000000000000000000000000000000000001

}

```

</TabItem>

<TabItem value="web3" label="web3">

```js

// ...

// Sample Token ID of the contract

// Could be 1, my-token-id, 0x123, etc.

const myTokenId = '1';

// Convert a token ID according to LSP8TokenIdFormat

const convertTokenId = (tokenID:string, tokenIdFormat: number) => {

  switch (tokenIdFormat) {

    case 0:

    case 100:

      // uint256 - Number (Left padded)

      return Web3.utils.padLeft(Web3.utils.toHex(myTokenId), 64);

    case 1:

    case 101:

      // string - String (Right padded)

      return Web3.utils.utf8ToHex(myTokenId).padEnd(66, '0');

    case 2:

    case 102:

      // address - Smart Contract (Left padded)

      return Web3.utils.padLeft(myTokenId, 64);

    case 3:

    case 103:

      // bytes32 - Unique Bytes (Right padded)

      return Web3.utils.toHex(myTokenId).padEnd(66, '0');

    case 4:

    case 104:

      // bytes32 - Hash Digest (No padding)

      return myTokenId;

  }

};

let byte32TokenId = convertTokenId(myTokenId, tokenIdFormat);

console.log(byte32TokenId);

// 0x0000000000000000000000000000000000000000000000000000000000000001

// If token ID format is mixed, retrieve it for the individual token ID

if (tokenIdFormat >= 100) {

  tokenIdFormat = parseInt(

    await myAssetContract.getDataForTokenId(

      byte32TokenId,

      ERC725YDataKeys.LSP8['LSP8TokenIdFormat'],

    ),

    16,

  );

  byte32TokenId = convertTokenId(myTokenId, tokenIdFormat);

  console.log(tokenIdFormat);

  // 0x0000000000000000000000000000000000000000000000000000000000000001

}

```

</TabItem>

</Tabs>

</details>

### Get Data from Token ID

After preparing the token ID, you can start to fetch the ID-specific metadata by calling [`getDataForTokenId()`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.md#getdatafortokenid):

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers">

```js

// ...

// Sample token ID (1) parsed according to LSP8TokenIDFormat

const byte32TokenId = '<myTokenID>';

async function fetchTokenIdMetadata(tokenID: string) {

  // Get the encoded asset metadata

  const tokenIdMetadata = await myAssetContract.getDataForTokenId(

    tokenID,

    ERC725YDataKeys.LSP4['LSP4Metadata'],

  );

  const erc725js = new ERC725(lsp4Schema);

  // Decode the metadata

  const decodedMetadata = erc725js.decodeData([

    {

      keyName: 'LSP4Metadata',

      value: tokenIdMetadata,

    },

  ]);

  console.log(decodedMetadata);

}

fetchTokenIdMetadata(byte32TokenId);

```

</TabItem>

<TabItem value="web3" label="web3">

```js

// ...

// Sample token ID (1) parsed according to LSP8TokenIDFormat

const byte32TokenId = '<myTokenID>';

async function fetchTokenIdMetadata(tokenID: string) {

  const isLSP8 = await myAssetContract.methods.supportsInterface(

    INTERFACE_IDS.LSP8IdentifiableDigitalAsset,

  );

  if (!isLSP8) {

    console.log('Asset is not an LSP8.');

    return;

  }

  // Get the encoded asset metadata

  const tokenIdMetadata = await myAssetContract.methods.getDataForTokenId(

    tokenID,

    ERC725YDataKeys.LSP4['LSP4Metadata'],

  );

  const erc725js = new ERC725(lsp4Schema);

  // Decode the metadata

  const decodedMetadata = erc725js.decodeData([

    {

      keyName: 'LSP4Metadata',

      value: tokenIdMetadata,

    },

  ]);

  console.log(decodedMetadata);

}

fetchTokenIdMetadata(byte32TokenId);

```

</TabItem>

</Tabs>

:::caution

Make sure to adjust `<myTokenID>` with the actual token ID as Byte32 Hex String according to [LSP8TokenFormat](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat). You can give it a try using a sample token ID: `0x0000000000000000000000000000000000000000000000000000000000000001` representing token ID `1` of the `Number` format.

:::

<details>

<summary>Show result</summary>

```js

{

    "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",

    "name": "LSP4Metadata",

    "value": {

      "verification": {

        "method": "keccak256(utf8)",

        "data": "0x9eefcdac3d60500619b075273c0371a6633d8f531179c882facd4f991281c658"

      },

      "url": "ipfs://QmeKNiTr4xfdHDUinGmYC4osu1ZHoFHDDj87WBSX5z4k7x"

    }

  }

```

</details>

After retrieving the metadata from the contract, you can continue to [retrieve the actual JSON content](#get-the-json-content). If the token ID data is empty, continue fetching the Base URI and retrieving the JSON using a file link.

### Get Data from Base URI

:::caution Version Support

Assets created with LSP versions below 🛠️ [`@lukso/lsp-smart-contracts`](../../tools/lsp-smart-contracts/getting-started.md) of `v0.14.0` lacks support for retrieving token ID metadata from a Base URI. For previous LSP8 assets, the Base URI may be retrieved by calling the [`fetchData`](../../tools/erc725js/methods.md#fetchdata) function as described in the [Global Token Information](#global-token-information) section.

:::

You can fetch the [`LSP8TokenMetadataBaseURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenmetadatabaseuri) and build the correct metadata link by concatinating the [formatted](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat) token ID. Based on the [`LSP8TokenIDFormat`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat), the Base URI can either be:

- equal across all token IDs: To fetch the global Base URI, use the [`getData(...)`](../../contracts/contracts/ERC725/ERC725.md#getdata) function of the asset to receive the [ERC725Y data storage](../../standards/lsp-background/erc725.md#erc725y-generic-data-keyvalue-store). This applies if the [`LSP8TokenIDFormat`](#preparing-the-token-ids) is `0, 1, 2, or 4`.

- mixed across all token IDs: To fetch the individual Base URI, use the [`getDataFromTokenID(...)`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#getdatafortokenid) function using a specific token ID. This has to be done if the [`LSP8TokenIDFormat`](#preparing-the-token-ids) is `100, 101, 102, or 104`.

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers">

```js

// ...

async function fetchBaseURI(tokenID: string, tokenIdFormat: number) {

  // Retrieve the global Base URI

  let tokenBaseURI = await myAssetContract.getData(

    ERC725YDataKeys.LSP8['LSP8TokenMetadataBaseURI'],

  );

  if (tokenBaseURI == '0x') {

    console.log('BaseURI not set.');

    return;

  }

  if (tokenIdFormat >= 100) {

    tokenBaseURI = await myAssetContract.getDataForTokenId(

      byte32TokenId,

      ERC725YDataKeys.LSP8['LSP8TokenIdFormat'],

    );

  }

  // Decode the baseURI

  const decodedBaseURI = erc725js.decodeData([

    {

      keyName: 'LSP8TokenMetadataBaseURI',

      value: tokenBaseURI,

    },

  ]);

  // Return Base URI

  return decodedBaseURI;

}

const baseURI = fetchBaseURI(byte32TokenId, tokenIdFormat);

console.log(baseURI);

// https://my.metadata-link.xyz/asset

```

</TabItem>

<TabItem value="web3" label="web3">

```js

/// ...

async function fetchBaseURI(tokenID: string, tokenIdFormat: number) {

  // Retrieve the global Base URI

  let tokenBaseURI = await myAssetContract.methods.getData(

    ERC725YDataKeys.LSP8['LSP8TokenMetadataBaseURI'],

  );

  if (tokenBaseURI == '0x') {

    console.log('BaseURI not set.');

    return;

  }

  if (tokenIdFormat >= 100) {

    tokenBaseURI = await myAssetContract.methods.getDataForTokenId(

      byte32TokenId,

      ERC725YDataKeys.LSP8['LSP8TokenIdFormat'],

    );

  }

  // Decode the baseURI

  const decodedBaseURI = erc725js.decodeData([

    {

      keyName: 'LSP8TokenMetadataBaseURI',

      value: tokenBaseURI,

    },

  ]);

  // Return Base URI

  return decodedBaseURI;

}

const baseURI = fetchBaseURI(byte32TokenId, tokenIdFormat);

console.log(baseURI);

// https://my.metadata-link.xyz/asset

```

</TabItem>

</Tabs>

### Get the JSON Content

After retrieving and decoding the [Token ID Metadata](#get-data-from-token-id) or [Base URI](#get-data-from-base-uri), you can fetch the metadata JSON.

<Tabs groupId="data-type">

<TabItem value="tokenid" label="Token ID Metadata">

If you retrieved the metadata using [`getDataFromTokenID(...)`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#getdatafortokenid), the URL will be nested within the `value` field of the metadata. However, this link might only be partial string or content ID, instead of a full link. Therefore, you may have to adjust the link before it can be fetched:

```js

// ...

const metadataURL = decodedMetadata[0].value.url;

function generateMetadataLink(link: string) {

  // If link is a regular Web2 Link, it can be passed back

  if (link.startsWith('https://') || link.startsWith('http://')) {

    // Use your default IPFS Gateway address

    return link;

  }

  // If link has custom protocol, adjust the link

  if (link.startsWith('ipfs://')) {

    // Use your default IPFS Gateway address

    return `https://api.universalprofile.cloud/ipfs/${link.slice(7)}`;

  }

  else{

    return null;

  }

  // Handle other cases if needed ...

}

// Build link to JSON metadata

const metadataJsonLink = generateMetadataLink(metadataURL);

// Fetch the URL

if (metadataJsonLink){

  const response = await fetch(metadataJsonLink);

  const jsonMetadata = await response.json();

  console.log('Metadata Contents: ', jsonMetadata);

} else {

    console.log('Could not generate metadata link based on value.url content.');

  }

```

</TabItem>

<TabItem value="baseuri" label="Base URI">

If you retrieved the metadata using [`LSP8TokenMetadataBaseURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenmetadatabaseuri), the URL will always be generated by combining the Base URL with previously prepared token ID as Byte32 Hex String. You can simply concatenate them to retrieve the full link. However, the token ID needs to be decoded first.

<details>

<summary>How to decode a <code>tokenID</code> from <code>Byte32 Hex String</code> according to <code>LSP8TokenIdFormat</code></summary>

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers">

```js

// ...

function decodeTokenId(encodedTokenId: string, tokenIdFormat: number) {

  switch (tokenIdFormat) {

    // Number

    case 0:

    case 100:

      return BigInt(encodedTokenId).toString();

    // String

    case 1:

    case 101:

      return ethers.toUtf8String(encodedTokenId).replace(/\0+$/, '');

    // Address

    case 2:

    case 102:

      return '0x' + encodedTokenId.slice(encodedTokenId.length - 40);

    // Byte Value

    case 3:

    case 103:

      // Extracts the non-zero portion (right padded)

      return encodedTokenId.replace(/0+$/, '');

    // Hash Digest

    case 4:

    case 104:

      // Hash digests are not modified during encoding, so return as is

      return encodedTokenId;

  }

}

// Decode the token ID based on the token ID format

const decodedTokenId = decodeTokenId(byte32TokenId, tokenIdFormat)

```

</TabItem>

<TabItem value="web3" label="web3">

```js

// ...

function decodeTokenId(encodedTokenId: string, tokenIdFormat: number) {

  switch (tokenIdFormat) {

    // Number

    case 0:

    case 100:

      return BigInt(encodedTokenId).toString();

    // String

    case 1:

    case 101:

      return web3.utils.hexToUtf8(encodedTokenId).replace(/\0+$/, '');

    // Address

    case 2:

    case 102:

      return '0x' + encodedTokenId.slice(encodedTokenId.length - 40);

    // Byte Value

    case 3:

    case 103:

      // Extracts the non-zero portion (right padded)

      return encodedTokenId.replace(/0+$/, '');

    // Hash Digest

    case 4:

    case 104:

      // Hash digests are not modified during encoding, so return as is

      return encodedTokenId;

  }

}

// Decode the token ID based on the token ID format

const decodedTokenId = decodeTokenId(byte32TokenId, tokenIdFormat)

```

</TabItem>

</Tabs>

</details>

```js
// ...

// Build link to JSON metadata

const baseURLlink = decodedBaseURI[0].value.url;

const metadataJsonLink = `${baseURLlink}${decodedTokenId}`;

// Fetch the URL

const response = await fetch(metadataJsonLink);

const jsonMetadata = await response.json();

console.log('Metadata Contents: ', jsonMetadata);
```

</TabItem>

</Tabs>

<details>

<summary>Show result</summary>

```js

{

    "LSP4Metadata": {

      "name": "My Token Name",

      "description": "Sample Description",

      "links": [{ "title": "", "url": "" }],

      "icon": [

        {

          "width": 1600,

          "height": 1600,

          "url": "ipfs://QmRHz3nbd2wQ4uNCJQS9JDnZRdD6aqueWRZ2h89dMkCLXf"

        }

      ],

      "images": [

        [

          {

            "width": 1000,

            "height": 1000,

            "url": "ipfs://QmRHz3nbd2wQ4uNCJQS9JDnZRdD6aqueWRZ2h89dMkCLXf",

            "verification": {

              "method": "keccak256(bytes)",

              "data": "0x7e89fc626703412916d27580af2bae16db479036f12d4d48f4efd24d70224dc2"

            }

          }

        ]

      ],

      "assets": [],

      "attributes": [

        {

          "key": "Standard type",

          "value": "LSP",

          "type": "string"

        },

        {

          "key": "Standard number",

          "value": 4,

          "type": "number"

        }

      ]

    }

  }

```

</details>

## Fetch Creators and Token Properties

Instead of using the [`LSP4Metadata`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) key to retrieve the [global token information](#global-token-information), you can also retrieve other data keys as described in the examples below. The full setup using [erc725.js](../../tools/erc725js/getting-started.md) can be found within the [setup section](#setup).

:::caution

Some of the 🗂️ [ERC725Y data keys](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store) feature dynamic inputs. Make sure to exchange `<myCreatorAddress>` with the actual address (without `0x`) of one of the asset's creators you want to retrieve. In case the asset does not feature any additional creator information, the returned value of `LSP4CreatorsMap:<myCreatorAddress>` will be `0`.

Optionally, you can [retrieve the profile data](./read-profile-data.md) of a creator in a separate step.

:::

<!-- prettier-ignore-start -->

```js

// ...

// Fetch the asset's token symbol

const tokenSymbol = await myAsset.fetchData('LSP4TokenSymbol');

console.log(tokenSymbol);

// Fetch the asset's token name

const tokenName = await myAsset.fetchData('LSP4TokenName');

console.log(tokenName);

// Fetch all creators of the asset

const assetCreatorsList = await myAsset.fetchData('LSP4Creators[]');

console.log(assetCreatorsList);

// Fetch creator-specific information

const creatorInformation = await myAsset.fetchData([

  /*

   * for dynamic keys, it is necessary

   * to provide any second data key

  */

  'LSP4TokenName',

  {

    keyName: 'LSP4CreatorsMap:<address>',

    // Sample creator address

    dynamicKeyParts: '0x9139def55c73c12bcda9c44f12326686e3948634',

  },

]);

console.log(creatorInformation);

```

<!-- prettier-ignore-end -->

<details>

```js

// Creator List (empty, no creators set)

{

  key: '0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7',

  name: 'LSP4Creators[]',

  value: []

}

// Token Symbol (UPT)

{

  key: '0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756',

  name: 'LSP4TokenSymbol',

  value: 'UPT'

}

// Token Name (upturn: MINT PASS [UPT0001])

{

  key: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',

  name: 'LSP4TokenName',

  value: 'upturn: MINT PASS [UPT0001]'

}

// Dynamic Creator Map Retrieval

[

  // Additional ERC725 data key

  {

    key: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',

    name: 'LSP4TokenName',

    value: 'upturn: MINT PASS [UPT0001]'

  },

  /*

   * Creator Map for 0x9..8634 (empty, no data set)

   * Key Format: '0x6de85eaf5d982b4e5da00000<myCreatorAddress>'

   * Name Format: 'LSP4CreatorsMap:<myCreatorAddress>'

  */

  {

    key: '0x6de85eaf5d982b4e5da000009139def55c73c12bcda9c44f12326686e3948634',

    name: 'LSP4CreatorsMap:9139def55c73c12bcda9c44f12326686e3948634',

    value: []

  }

]

```

</details>
