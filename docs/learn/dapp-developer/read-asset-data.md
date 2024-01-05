---
sidebar_label: '🎆 Read Asset Data'
sidebar_position: 4
description: Learn how to read Digital Asset (LSP7) and Identifiable Digital Assets (NFT/LSP8) data from their smart contracts.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read Digital Asset Data

On the LUKSO network, [Digital Assets](../../standards/tokens/introduction.md) are made using the [LSP7](../../standards/tokens/LSP7-Digital-Asset.md) and [LSP8](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) standards. It is kind of like [ERC-721](https://eips.ethereum.org/EIPS/eip-721) but on steroids 🚀, they unlock much more posibilities for your digital assets.

In this tutorial, you will learn how to classify the Digital Asset and then, how to fetch and read their metadata. You'll see, it is not so different from what you might already be used to do.

Before getting into the code, you need to be familiar with how LSP7 and 8 contracts can be used along with `LSP4TokenType` to create different digital assets. You can find all the different combinations on the [LSP4 - Digital Asset Metadata](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#types-of-digital-assets).

Once you know what are the different options, you can learn how to:

- Detect the contract type of the asset (LSP7 or LSP8)
- Read the token type of the asset (`LSP4TokenType`)
- Read the metadata of the token(s)

Let's go 🫡

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

:::info

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/blob/main/fetch-asset) repository and ⚡️ [StackBlitz](https://stackblitz.com/github/lukso-network/lukso-playground?file=fetch-asset%2Fget-data-keys.js).

:::

:::tip Universal Profile Explorer

The explorer on 🔮 [universalprofile.cloud](https://universalprofile.cloud/) indexes all deployed Universal Profiles and their owned assets on the LUKSO network. You can try out the following examples with any Universal Profile address.

:::

## Setup

To easily interact with an asset you should use the ⚒️ [erc725.js](../../tools/erc725js/getting-started.md) library. It is able to fetch and encode profile and contract data easily. You can install it in your project using:

```shell
npm install @erc725/erc725.js
```

## Read issued/owned assets

Thanks to Universal Profiles and the [Universal Receiver](../../standards/generic-standards/lsp1-universal-receiver.md), assets addresses can be found directly on the users' Universal Profile.

There, you can read the issued and received assets. For more information, check the previous [Read Profile Data](./read-profile-data.md#fetch-assets-and-universal-receiver) tutorial.

## Classify the Digital Asset

### Find asset type: LSP7 or LSP8

Once you have an asset address, you need to check if the asset's contract is LSP7 or LSP8.
To do so, check the contract's interfaceId.

TODO:

- explain how to do erc165 standard detection / link to an article that explains how
- explain where to find the interfaceId for lsp7 and lsp8
- add a script that shows how, at the end, it should show smtgh like "contractType: LSP7 or LSP8"

### Find LSP4TokenType: Token, NFT, Collection

TODO: show erc725js code to get `LSP4TokenType`

At this stage, you should know the digital asset type:

- LSP7 - Token
- LSP7 - NFT
- LSP8 - NFT
- LSP8 - Collection

## Fetch Creators and Token Properties

Instead of using the [`LSP4Metadata`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md) key, you can also use other data keys like [`LSP4Creators[]`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4creators), [`LSP4CreatorsMap:<address>`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4creators), [`LSP4TokenName`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokenname), [`LSP4TokenSymbol`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokensymbol) or [`LSP4TokenType`](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokentype) as described in the following example:

:::caution

Some of the 🗂️ [ERC725Y data keys](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store) feature dynamic inputs. Make sure to exchange `<myCreatorAddress>` with the actual address (without `0x`) of one of the asset's creators you want to retrieve. In case the asset does not feature any additional creator information, the returned value of `LSP4CreatorsMap:<myCreatorAddress>` will be `0`.

Optionally, you can [retrieve the profile data](./read-profile-data.md) of a creator in a separate step.
:::

<!-- prettier-ignore-start -->

```js
// ...

// Fetch all creators of the asset
let assetCreatorsList = await erc725js.fetchData('LSP4Creators[]');
console.log(assetCreatorsList);

// Fetch the asset's token type
let tokenType = await erc725js.fetchData('LSP4TokenType');
console.log(tokenType);

// Fetch the asset's token symbol
let tokenSymbol = await erc725js.fetchData('LSP4TokenSymbol');
console.log(tokenSymbol);

// Fetch the asset's token name
let tokenName = await erc725js.fetchData('LSP4TokenName');
console.log(tokenName);

// Fetch creator-specific information
let creatorInformation = await erc725js.fetchData([
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

// Token Type (not defined)
{
  key: '0xe0261fa95db2eb3b5439bd033cda66d56b96f92f243a8228fd87550ed7bdfdb3',
  name: 'LSP4TokenType',
  value: null
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

## Get the asset data

:::tip

🔍 You can inspect an asset smart contract (or any ERC725 contract) using 🔎 [ERC725 Inspect](https://erc725-inspect.lukso.tech/inspector) to see all its 🗂️ [ERC725Y data keys](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store).

:::

<details>
  <summary>
    <a href="../../standards/tokens/LSP4-Digital-Asset-Metadata.md">LSP4 - Digital Asset Metadata</a> describes the data within <a href="../../standards/tokens/LSP7-Digital-Asset.md">LSP7</a> and <a href="../../standards/tokens/LSP8-Identifiable-Digital-Asset.md">LSP8</a> asset's <a href="../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store">ERC725Y data storage</a>. You can get the content of these data keys directly using the ⚒️ <a href="../../tools/erc725js/classes/ERC725#getdata"> erc725.js</a>  library. 👇
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

To read the asset data you simply instantiate the ⚒️ [erc725.js](https://www.npmjs.com/package/@erc725/erc725.js) library with your asset address, an RPC provider (`web3`, `ethereum`, `ethers`) or plain RPC URL, and an IPFS gateway. You can find RPC URLs for LUKSO networks on the network pages: [mainnet](../../networks/mainnet/parameters.md) / [testnet](../../networks/testnet/parameters.md).

The [`getData()`](../../tools/erc725js/classes/ERC725.md#getdata) function allows you to get all data keys that are stored on the asset smart contract and in your provided JSON schema.

<Tabs>  
  <TabItem value="javascript" label="JavaScript">

<!-- prettier-ignore-start -->

```js
import { ERC725 } from '@erc725/erc725.js';
import lsp4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

const erc725js = new ERC725(lsp4Schema,'<myAssetAddress>', 'https://rpc.testnet.lukso.gateway.fm',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);

// Get all data keys from the asset smart contract
let assetData = await erc725js.getData();
console.log(assetData);
```

<!-- prettier-ignore-end -->

  </TabItem>
    <TabItem value="typescript" label="TypeScript">

<!-- prettier-ignore-start -->

```js
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import lsp4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

const erc725js = new ERC725(lsp4Schema as ERC725JSONSchema[],'<myAssetAddress>', 'https://rpc.testnet.lukso.gateway.fm',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);

// Get all data keys from the asset smart contract
let assetData = await erc725js.getData();
console.log(assetData);
```

<!-- prettier-ignore-end -->

  </TabItem>
</Tabs>

You can give it a try with this asset address: [`<myAssetAddress> = 0x0514A829C832639Afcc02D257154A9DaAD8fa21B`](https://wallet.universalprofile.cloud/asset/0x0514A829C832639Afcc02D257154A9DaAD8fa21B?network=testnet).

<details>
    <summary>Show result</summary>

```js
[
  {
    key: '0xeafec4d89fa9619884b60000a4d96624a38f7ac2d8d9a604ecf07c12c77e480c',
    name: 'SupportedStandards:LSP4DigitalAsset',
    value: '0xa4d96624',
  },
  {
    key: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',
    name: 'LSP4TokenName',
    value: 'upturn: MINT PASS [UPT0001]',
  },
  {
    key: '0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756',
    name: 'LSP4TokenSymbol',
    value: 'UPT',
  },
  {
    key: '0xe0261fa95db2eb3b5439bd033cda66d56b96f92f243a8228fd87550ed7bdfdb3',
    name: 'LSP4TokenType',
    value: null,
  },
  {
    key: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',
    name: 'LSP4Metadata',
    value: {
      verification: [Object],
      url: 'ipfs://bafkreib6caqoas2x7m2phq2kyknhxncxrbz76t2gjhltefldmkynlupdzy',
    },
  },
  {
    key: '0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7',
    name: 'LSP4Creators[]',
    value: [],
  },
];
```

</details>

:::note ERC725Y JSON schemas

The ⚒️ [erc725.js](https://npmjs.com/package/@erc725/erc725.js) library works with [ERC725Y JSON schemas](../../standards/generic-standards/lsp2-json-schema). These schemas are JSON structures that tell developers and programs how to decode and encode 🗂️ [ERC725Y data keys](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store). You need to load the required schemas of the data keys you want to fetch when initializing the `ERC725` class. The most common schemas are [available](../../tools/erc725js/schemas.md) in erc725.js.

You can also create and load your own ERC725Y JSON schemas if you want to add custom data keys to the profile.

:::

### Fetch the Asset Metadata

If you only need the contents of the profile data JSON file, you can use [`fetchData('LSP4Metadata')`](../../tools/erc725js/classes/ERC725.md#fetchdata). This will download the JSON file and verify its hash automatically.

```js
// ...

// Download and verify the asset metadata JSON file
let assetMetadata = await erc725js.fetchData('LSP4Metadata');
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

:::note get and fetch

The [`getData(...)`](../../tools/erc725js/classes/ERC725#getdata) function only retrieves the data keys values from the smart contract. In comparison, [`fetchData(...)`](../../tools/erc725js/classes/ERC725#fetchdata) will download and decode the content of a `VerifiableURI`, `JSONURL` and `AssetURL`.

:::

### TODO: LSP8TokenIdType

In the case of LSP8, explain where to get this info and what it represents.

- LSP8 NFT
- LSP8 Collection
