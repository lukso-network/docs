---
sidebar_label: '🎆 Read Asset Data'
sidebar_position: 5
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

- [Detect the Contract Interface](#detect-the-contract-interface)
- [Detect the Metadata Standard](#detect-the-metadata-standard)
- [Detect the Token Type](#detect-the-token-type)
- [Fetch the Asset Data](#fetch-the-asset-metadata)

## Setup

:::success Preparation

Before getting into the code, you need to be familiar with the token standards [LSP7 - Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) and [LSP8 - Digital Identifiable Asset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md), as well as knowing [how they differ based on their token types](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#types-of-digital-assets) defined by [LSP4 - Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md).
:::

:::info Get Asset Addresses

As every Universal Profile comes with a 📢 [Universal Receiver](../../standards/generic-standards/lsp1-universal-receiver.md), the owned assets can be fetched directly directly from it's contract. For more information, please check the 📒 [Read Profile Data](./read-profile-data.md#fetch-assets-and-universal-receiver) tutorial. Aditionally, 🔮 [UniversalProfile.cloud](https://universalprofile.cloud/) also shows all deployed profiles and assets as well.

:::

:::info Code Examples

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/blob/main/fetch-asset) repository and ⚡️ [StackBlitz](https://stackblitz.com/github/lukso-network/lukso-playground?file=fetch-asset%2Fget-data-keys.js).

:::

To easily interact with an asset you are encouraged to use the ⚒️ [erc725.js](../../tools/erc725js/getting-started.md) and 📃 [lsp-smart-contracts](../../tools/erc725js/getting-started.md) libraries. Those will not only help fetching and encoding contract data easily, but also provide all the necessary interface and metadata IDs, necessary for classifying the asset. You can install them in your project using the following command:

```shell
npm install @erc725/erc725.js @lukso/lsp-smart-contracts
```

## Detect the Contract Interface

Once you have the address of an asset, you need to check if the asset's contract is LSP7 or LSP8. To do so, check the contract's `interfaceId` like in the previous [Interface Detection Guide](./standard-detection.md#interface-detection). If you are using the 📃 [lsp-smart-contracts](../../tools/lsp-smart-contracts/getting-started) library, you can fetch the `interfaceId`'s directly from the package's [constants](../../tools/lsp-smart-contracts/constants),. Optionally, you can also find a full list of all `interfaceId`'s on the [Contracts](https://docs.lukso.tech/contracts/interface-ids/) page and input them manually.

The ⚒️ [erc725.js](https://npmjs.com/package/@erc725/erc725.js) library works with [ERC725Y JSON schemas](../../standards/generic-standards/lsp2-json-schema). These schemas are JSON structures that tell developers and programs how to decode and encode 🗂️ [ERC725Y data keys](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store). You need to load the required schemas of the data keys you want to fetch when initializing the `ERC725` class. The most common schemas are [available](../../tools/erc725js/schemas.md) in erc725.js. You can also create and load your own ERC725Y JSON schemas if you want to use custom data keys.

To start, instantiate the ⚒️ [erc725.js](https://www.npmjs.com/package/@erc725/erc725.js) library with your asset address, an RPC provider (`web3`, `ethereum`, `ethers`, `RPC_URL`), and an IPFS gateway.

:::caution

Make sure to adjust `<myAssetAddress>` with the actual address of the asset. You can give it a try using the address of the testnet LSP7 asset shown above: [`0x0514A829C832639Afcc02D257154A9DaAD8fa21B`](https://wallet.universalprofile.cloud/asset/0x0514A829C832639Afcc02D257154A9DaAD8fa21B?network=testnet).

:::

<!-- prettier-ignore-start -->

```js
import { ERC725 } from '@erc725/erc725.js';
import lsp4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/dist/constants.cjs.js';

const myAsset = new ERC725(lsp4Schema,'<myAssetAddress>', 'https://rpc.testnet.lukso.gateway.fm',
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

As shown in the previous [Metadata Detection Guide](./standard-detection.md#metadata-detection), you can get the content of the data keys directly using the `getData(...)` function of the ⚒️ [`erc725.js`](../../tools/erc725js/classes/ERC725#getdata) library.

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

Instead of providing a specific data key like `SupportedStandards:LSP4DigitalAsset`, you can get the **full set of data keys** by using the `getData()` function without parameters.

:::

## Detect the Token Type

If both, contract and metadata standard are aligned, we can continue to determine the [LSP4 Token Type](../../standards/tokens/LSP4-Digital-Asset-Metadata/#types-of-digital-assets) in order to interpret the metadata correctly.

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

Based on this token type, the information of the [LSP4 Digital Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) can be interpreted differently: it can either:

- represent the token information of a whole contract
- or the information of a single NFT, that has multiple ownable amounts or IDs.

<!-- TODO: the wording is a bit weird below, i think it can be written in a betetr way -->

In case your asset is an NFT (`tokenType = 1`), the individual information of an ID can be set. If your asset is a collection (`tokenType = 2`) however, this individual medatada is mandatory.

At this point, you should be able to identify if the digital asset is a:

- LSP7 - Token
- LSP7 - NFT
- LSP8 - NFT
- LSP8 - Collection

Based on this information, the asset metadata is fetched in different ways.

## Fetch the Asset Metadata

To fetch the whole contracts JSON file, you can use the [`fetchData('LSP4Metadata')`](../../tools/erc725js/classes/ERC725.md#fetchdata) directly on the asset address. Please check on the [LSP4 Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata/#types-of-digital-assets) page where to fetch the metadata. In the case of a collection, you will have to fetch the `LSP4Metadata` for each token address within the collection.

<!-- We might need to make it more clear for each token type how to fetch the data and get the tokenId etc. -->

:::info differece between get and fetch

The [`getData(...)`](../../tools/erc725js/classes/ERC725#getdata) function only retrieves the data keys values from the smart contract. In comparison, [`fetchData(...)`](../../tools/erc725js/classes/ERC725#fetchdata) will download and decode the content of `VerifiableURI` referenced within the smart contract.

:::

```js
// ...

// Download and verify the asset metadata JSON file
const assetMetadata = await erc725js.fetchData('LSP4Metadata');
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

## Fetch Creators and Token Properties

Instead of using the [`LSP4Metadata`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) key, you can also retrieve other data keys as described in the following examples:

:::caution

Some of the 🗂️ [ERC725Y data keys](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store) feature dynamic inputs. Make sure to exchange `<myCreatorAddress>` with the actual address (without `0x`) of one of the asset's creators you want to retrieve. In case the asset does not feature any additional creator information, the returned value of `LSP4CreatorsMap:<myCreatorAddress>` will be `0`.

Optionally, you can [retrieve the profile data](./read-profile-data.md) of a creator in a separate step.
:::

<!-- prettier-ignore-start -->

```js
// ...

// Fetch the asset's token symbol
const tokenSymbol = await erc725js.fetchData('LSP4TokenSymbol');
console.log(tokenSymbol);

// Fetch the asset's token name
const tokenName = await erc725js.fetchData('LSP4TokenName');
console.log(tokenName);

// Fetch all creators of the asset
const assetCreatorsList = await erc725js.fetchData('LSP4Creators[]');
console.log(assetCreatorsList);

// Fetch creator-specific information
const creatorInformation = await erc725js.fetchData([
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
    <summary>Show result</summary>

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
