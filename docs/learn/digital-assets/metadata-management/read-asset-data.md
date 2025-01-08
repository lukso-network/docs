---
sidebar_label: 'Fetch Asset Metadata'
sidebar_position: 1
description: Learn how to read Digital Asset (LSP7) and Identifiable Digital Assets (NFT/LSP8) data from their smart contracts.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 📑 Read Digital Asset Data

:::info Code Examples

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/digital-assets) repository.

:::

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

On LUKSO, [Digital Assets](/standards/tokens/introduction.md) are created using the [LSP7 - Digital Asset](/standards/tokens/LSP7-Digital-Asset.md) and [LSP8 - Identifiable Digital Asset](/standards/tokens/LSP8-Identifiable-Digital-Asset.md) standards. The data of each digital asset lives in its own [ERC725Y](/standards/erc725.md#erc725y-generic-data-keyvalue-store) storage. This tutorial teaches you how to fetch and read this data.

:::info Preparation

Before following this guide, it is recommended to be a bit familiar with the token standards:

- [LSP4 - Digital Asset Metadata](/standards/tokens/LSP4-Digital-Asset-Metadata.md).
- [LSP7 - Digital Asset](/standards/tokens/LSP7-Digital-Asset.md).
- [LSP8 - Digital Identifiable Asset](/standards/tokens/LSP8-Identifiable-Digital-Asset.md).
- [How digital assets differ based on their LSP4 Token Type](/standards/tokens/LSP4-Digital-Asset-Metadata.md#types-of-digital-assets).

:::

:::success Check Assets Online

You can use the 🔎 [ERC725 Inspect](https://erc725-inspect.lukso.tech/inspector) tool for inspecting assets within the browser.

:::

## Setup

You will need the following to follow this tutorial:

- Address of a digital asset (_Example asset address on testnet: [`0x0514A829C832639Afcc02D257154A9DaAD8fa21B`](https://wallet.universalprofile.cloud/asset/0x0514A829C832639Afcc02D257154A9DaAD8fa21B?network=testnet)_).
- `@lukso/lsp-smart-contracts` package
- `erc725.js`

```bash
npm i @lukso/lsp-smart-contracts @erc725/erc725.js
```

## Check if the contract is a Digital Asset

:::info

If you are using the 📃 [lsp-smart-contracts](../../../tools/lsp-smart-contracts/getting-started) library, you can fetch the list of `interfaceId` directly from the package's [constants](../../../tools/lsp-smart-contracts/constants) called `INTERFACE_IDS`.

Optionally, you can also find a full list of interface IDs on the [Contracts > Interface ID](https://docs.lukso.tech/contracts/interface-ids/) page and input them manually.

:::

First, we need to check if the contract is a digital asset, as either an LSP7 or an LSP8 smart contract. To do so, we will do the same way as shown in the [**Interface Detection**](../../standard-detection.md#interface-detection) guide: call the `supportsInterface(bytes4)` function in the smart contract, checking for various interface IDs.

<Tabs groupId="web3-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}} default>

```ts
import { ethers } from 'ethers';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);

const myAsset = new ethers.Contract('<myAssetAddress>', [
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  provider,
]);

const isLSP7 = await myAsset.supportsInterface(INTERFACE_IDS.LSP7DigitalAsset);

const isLSP8 = await myAsset.supportsInterface(
  INTERFACE_IDS.LSP8IdentifiableDigitalAsset,
);

console.log(isLSP7, isLSP8); // each, true or false
```

  </TabItem>
    <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```ts
import Web3 from 'web3';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

const web3 = new Web3('https://rpc.testnet.lukso.network');

const myAsset = new web3.eth.Contract(
  [
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: '_interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  '<myAssetAddress>',
);

const isLSP7 = await myAsset.methods
  .supportsInterface(INTERFACE_IDS.LSP7DigitalAsset)
  .call();

const isLSP8 = await myAsset.methods
  .supportsInterface(INTERFACE_IDS.LSP8IdentifiableDigitalAsset)
  .call();

console.log(isLSP7, isLSP8); // each, true or false
```

  </TabItem>
</Tabs>

## Fetch the Asset Metadata

[LSP4 - Digital Asset Metadata](/standards/tokens/LSP4-Digital-Asset-Metadata.md) describes the data within [LSP7](/standards/tokens/LSP7-Digital-Asset.md) and [LSP8](/standards/tokens/LSP8-Identifiable-Digital-Asset.md) asset's [ERC725Y data storage](/standards/erc725#erc725y-generic-data-keyvalue-store).

The following data keys can be fetched 👇

| 🗄️ Data Key                           | Value contained inside this data key                                                                                                                              |
| :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SupportedStandards:LSP4DigitalAsset` | A hex literal value confirming the ERC725Y contract contains metadata keys for the [LSP4DigitalAsset](/standards/tokens/LSP4-Digital-Asset-Metadata.md) standard. |
| `LSP4Metadata`                        | The JSON file with asset descriptions and images.                                                                                                                 |
| `LSP4Creators[]`                      | An array of all creators of the asset.                                                                                                                            |
| `LSP4CreatorsMap:<address>`           | A mapping of creator-specific information.                                                                                                                        |
| `LSP4TokenType`                       | The asset's token type (encoded as a `uint256` number).                                                                                                           |
| `LSP4TokenSymbol`                     | The utf8 hex characters of the string representing the asset's symbol.                                                                                            |
| `LSP4TokenName`                       | The utf8 hex characters of the string representing the asset's name.                                                                                              |

To retrieve and decode the value stored under this data keys, we will use [erc725.js](../../../tools/dapps/erc725js/getting-started.md) and instantiate the class with:

1. the LSP4 Schema that defines the data keys above and how to decode them
2. the address of your digital asset
3. an RPC URL
4. an IPFS gateway to fetch any off-chain data linked to the contract storage

```ts title="Instantiate erc725.js"
import { ERC725 } from '@erc725/erc725.js';
import lsp4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

const erc725js = new ERC725(
  lsp4Schema,
  '0x0514A829C832639Afcc02D257154A9DaAD8fa21B', // address of the digital asset contract
  'https://4201.rpc.thirdweb.com',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);
```

We can fetch the digital asset data in three ways:

1. using [`getData()`](../../../tools/dapps/erc725js/methods#getdata) without parameters. This will fetch the value of all data keys at once.
2. using `getData("DataKeyName")` to fetch the value of a specific data key. For instance `getData("LSP4Metadata")`.
3. using [`fetchData('LSP4Metadata')`](../../../tools/dapps/erc725js/methods.md#fetchdata) which decodes the `VerifiableURI` to extract the JSON metadata file link and fetch its content from IPFS (or another storage service).

### Asset Name and Symbol

```ts
// Fetch the asset's name
const tokenName = await erc725js.fetchData('LSP4TokenName');
console.log(tokenName);
/**
{
  key: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',
  name: 'LSP4TokenName',
  value: 'upturn: MINT PASS [UPT0001]',
}
*/

// Fetch the asset's symbol
const tokenSymbol = await erc725js.fetchData('LSP4TokenSymbol');
console.log(tokenSymbol);
/**
{
  key: '0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756',
  name: 'LSP4TokenSymbol',
  value: 'UPT',
}
*/
```

### Global Token Information

To fetch the whole JSON file of the asset's metadata, you can use the following 2 functions of the [`erc725js`](../../../tools/dapps/erc725js/getting-started.md) library:

- [`fetchData('LSP4Metadata')`](../../../tools/dapps/erc725js/methods.md#fetchdata): This will download and decode the content of `VerifiableURI` as JSON.
- [`getData(LSP4Metadata)`](../../../tools/dapps/erc725js/methods#getdata): This will retrieve the raw data value from the smart contract. You will then need to decode the `VerifiableURI` manually using [`decodeData(...)`](../../../tools/dapps/erc725js/methods.md#decodedata).

```ts
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

### List of Creators

```ts
// Fetch all creators of the asset
const assetCreatorsList = await erc725js.fetchData('LSP4Creators[]');
console.log(assetCreatorsList);
/**
// Creator List (empty, no creators set)
{
  key: '0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7',
  name: 'LSP4Creators[]',
  value: []
}
*/
```

### Get Creator basic infos

:::success Advice

If one of the creator contains the `LSP0ERC725Account` interface ID (`0x...`), it is likely to be a Universal Profile! 🆙

Follow the guide [**Read Profile Data**](../../universal-profile/metadata/read-profile-data.md) to retrieve the profile infos!

:::

The `LSP4CreatorsMap:<address>` is a Mapping data key that requires a dynamic input. To fetch its info, use the function below, providing the creator address as input to the `dynamicKeyParts` property of the object parameter.

```js
// Fetch creator-specific information
const creatorInformation = await erc725js.fetchData([
  {
    keyName: 'LSP4CreatorsMap:<address>',
    // Sample creator address
    dynamicKeyParts: '0x9139def55c73c12bcda9c44f12326686e3948634',
  },
]);
console.log(creatorInformation);
// Dynamic Creator Map Retrieval
/*
 * Creator Map for 0x9..8634 (empty, no data set)
 * Key Format: '0x6de85eaf5d982b4e5da00000<myCreatorAddress>'
 * Name Format: 'LSP4CreatorsMap:<myCreatorAddress>'

[
  
  {
    key: '0x6de85eaf5d982b4e5da000009139def55c73c12bcda9c44f12326686e3948634',
    name: 'LSP4CreatorsMap:9139def55c73c12bcda9c44f12326686e3948634',
    value: [],
  },
];
*/
```

## Interpret Data based on Token Type

If both, contract and metadata standard are aligned, Finally we need to determine the [LSP4 Token Type](/standards/tokens/LSP4-Digital-Asset-Metadata.md#types-of-digital-assets) in order to interpret the metadata correctly.

At this point, you should be able to identify if the digital asset is a:

- LSP7 - Token
- LSP7 - NFT
- LSP8 - NFT
- LSP8 - Collection

Based on the [token type](#detect-the-token-type), the information of the [LSP4 Digital Metadata](/standards/tokens/LSP4-Digital-Asset-Metadata.md#types-of-digital-assets) can be interpreted differently:

- As [**global token information**](#global-token-information) of the contract (Token or LSP7 NFT)
- To each [**individual token ID**](#token-id-metadata) (LSP8 NFT or Collection)

:::tip Token ID Entries

- If your asset is a Token (`tokenType = 0`), individual metadata **can't be set**, due to the lack of token IDs.
- If your asset is an NFT (`tokenType = 1`), individual metadata **may be set in addition** to the global token information.
- If your asset is a Collection (`tokenType = 2`), the token ID-specific metadata is **mandatory**.
