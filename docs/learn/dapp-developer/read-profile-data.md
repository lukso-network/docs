---
sidebar_label: '📒 Read Profile Data'
sidebar_position: 3
description: Learn how to read profile data from your Universal Profile.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read Universal Profile Data

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('/img/learn/up_view.png').default}
    alt="Universal Profile example on universalprofile.cloud"
    width="800"
  />
<br/>
<i>A <a href="https://wallet.universalprofile.cloud/0x6979474Ecb890a8EFE37daB2b9b66b32127237f7">Universal Profile</a> as seen on UniversalProfile.cloud</i>
<br /><br />
</div>

:::info

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/blob/main/get-profile-data) repository and ⚡️ [StackBlitz](https://stackblitz.com/github/lukso-network/lukso-playground?file=get-profile-data%2Fget-data-keys.js).

:::

:::tip Universal Profile Explorer

The explorer on 🔮 [universalprofile.cloud](https://universalprofile.cloud/) indexes all deployed Universal Profiles on the LUKSO network. You can try out the following examples with any Universal Profile address.

:::

## Setup

To easily interact with a profile you should use the ⚒️ [erc725.js](https://npmjs.com/package/@erc725/erc725.js). It is able to fetch and encode profile and contract data easily. You can install it in your project using:

```shell
npm install @erc725/erc725.js
```

## Get all profile data keys

:::tip

🔍 You can inspect a profile smart contract (or any ERC725 contract) using 🔎 [ERC725 Inspect](https://erc725-inspect.lukso.tech/inspector) to see all its 🗂️ [ERC725Y data keys](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store).

:::

<details>
<summary>
<a href="../../standards/universal-profile/lsp3-profile-metadata">LSP3 - Profile Metadata</a> describes the data in the Universal Profile contract <a href="../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store">ERC725Y data storage</a>. You can get the content of these data keys directly using the ⚒️ <a href="../../tools/erc725js/classes/ERC725#getdata"> erc725.js</a>  library. 👇
</summary>

<div>

- `SupportedStandards:LSP3Profile` Verifies that the ERC725Y contract contains [LSP3Profile](../../standards/universal-profile/lsp3-profile-metadata#supportedstandardslsp3profile) data keys
- `LSP3Profile` contains the JSON file with profile descriptions and images
- `LSP12IssuedAssets[]` contains assets the profile issued
- `LSP5ReceivedAssets[]` contains assets the profile received
- `LSP1UniversalReceiverDelegate` contains the address of the [Universal Receiver Delegate](../../standards/generic-standards/lsp1-universal-receiver/) smart contract

</div>
</details>

To read the profile data you simply instantiate the ⚒️ [erc725.js](https://www.npmjs.com/package/@erc725/erc725.js) library with your profile address, an RPC provider (`web3`, `ethereum`, `ethers`) or plain RPC URL, and an IPFS gateway. You can find RPC URLs for LUKSO networks on the network pages: [mainnet](../../networks/mainnet/parameters.md) / [testnet](../../networks/testnet/parameters.md).

The [`getData()`](../../tools/erc725js/classes/ERC725.md#getdata) function allows you to get all data keys that are stored on the profile smart contract and in your provided JSON schema.

<Tabs>  
  <TabItem value="javascript" label="JavaScript">

<!-- prettier-ignore-start -->

```js
import { ERC725 } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(lsp3ProfileSchema, '<myProfileAddress>', 'https://rpc.testnet.lukso.gateway.fm',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);

// Get all profile data keys of the smart contract
const profileData = await erc725js.getData();
console.log(profileData);
```

<!-- prettier-ignore-end -->

  </TabItem>
    <TabItem value="typescript" label="TypeScript">

<!-- prettier-ignore-start -->

```js
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(lsp3ProfileSchema as ERC725JSONSchema[], '<myProfileAddress>', 'https://rpc.testnet.lukso.gateway.fm',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);

// Get all profile data keys of the smart contract
const profileData = await erc725js.getData();
console.log(profileData);
```

<!-- prettier-ignore-end -->

  </TabItem>
</Tabs>

You can give it a try with this profile address: [`<myProfileAddress> = 0xE1F684655e4e688CCF72d88F028c62EC3B1046CC`](https://wallet.universalprofile.cloud/0xE1F684655e4e688CCF72d88F028c62EC3B1046CC).

<details>
    <summary>Show result</summary>

```js
[
  {
    key: '0xeafec4d89fa9619884b600005ef83ad9559033e6e941db7d7c495acdce616347',
    name: 'SupportedStandards:LSP3Profile',
    value: '0x5ef83ad9',
  },
  {
    key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
    name: 'LSP3Profile',
    value: {
      hashFunction: 'keccak256(utf8)',
      hash: '0x9b54d921f8365353667cabc331aa0c1dd42f173a6b7d871f7d94ac2cf226eafa',
      url: 'ipfs://QmaXQSZFoUPM43kND6EUPSnJF7NjpkW9LwW6J9vRki5QDh',
    },
  },
  {
    key: '0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd',
    name: 'LSP12IssuedAssets[]',
    value: [],
  },
  {
    key: '0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b',
    name: 'LSP5ReceivedAssets[]',
    value: [
      '0x5a44c7c0E47d1BeCEF166874Cd0b1be8f4090f64',
      '0x303aE9B19ee9B6FDa8c710b7F74b0582bbCC7b81',
      '0x2Bc3bfFf67094B4416623bDe626fd5f904b590d1',
      '0x48e37a167A3eE426389dc6E1Dc2d440E86C3737F',
      '0xDB9183ddA773285d5A4C5b1067A78c9F64Fb26E6',
      '0x778b47Bd998A5D0cc645Ff0c548096ea50628C83',
    ],
  },
  {
    key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
    name: 'LSP1UniversalReceiverDelegate',
    value: '0x0000000000F49F9818D746b4b999A9E449F675bb',
  },
];
```

</details>

:::note ERC725Y JSON schemas

erc725.js works with [ERC725Y JSON schemas](../../standards/generic-standards/lsp2-json-schema). These schemas are JSON structures that tell developers and programs how to decode and encode 🗂️ [ERC725Y data keys](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store). You need to load the required schemas of the data keys you want to fetch when initializing the `ERC725` class. The most common schemas are [available](../../tools/erc725js/schemas.md) in erc725.js.

You can also create and load your own ERC725Y JSON schemas if you want to add custom data keys to the profile.

:::

## Fetch the Profile Metadata

If you only need the contents of the profile data JSON file you can use [`fetchData('LSP3Profile')`](../../tools/erc725js/classes/ERC725.md#fetchdata). This will download the JSON file and verify its hash automatically.

```js
// ...

// Download and verify the profile metadata JSON file
const profileMetaData = await erc725js.fetchData('LSP3Profile');
console.log(profileMetaData);
```

<details>
    <summary>Show result</summary>

```js
{
  "key": "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
  "name": "LSP3Profile",
  "value": {
    "LSP3Profile": {
      "name": "johann",
      "description": "I'm a 40 y-old dad of 3. Technology enthusiast, skater, guitarist but mostly curious.",
      "tags": [
        "profile"
      ],
      "links": [
        {
          "title": "...",
          "url": "..."
        },
        ...
      ],
      "profileImage": [
        {
          "width": 1512,
          "height": 1998,
          "hashFunction": "keccak256(bytes)",
          "hash": "0x...",
          "url": "ipfs://..."
        },
        ...
      ],
      "backgroundImage": [
        {
          "width": 1512,
          "height": 1998,
          "hashFunction": "keccak256(bytes)",
          "hash": "0x...",
          "url": "ipfs://..."
        },
        ...
      ]
    }
  }
}
```

</details>

:::note get and fetch

The [`getData(...)`](../../tools/erc725js/classes/ERC725#getdata) function only retrieves the data keys values from the smart contract. In comparison, [`fetchData(...)`](../../tools/erc725js/classes/ERC725#fetchdata) will download and decode the content of a `VerifiableURI`, `JSONURL` and `AssetURL`.

:::

## Fetch Assets and Universal Receiver

Instead of using the [`LSP3Profile`](../../standards/universal-profile/lsp3-profile-metadata) key, you can also use other data keys like [`LSP12IssuedAssets[]`](../../standards/universal-profile/lsp12-issued-assets), [`LSP5ReceivedAssets[]`](../../standards/universal-profile/lsp5-received-assets), or [`LSP1UniversalReceiverDelegate`](../../standards/generic-standards/lsp1-universal-receiver-delegate), like in the following example:

<!-- prettier-ignore-start -->

```js
// ...

// Fetch all of the profile's issued assets
const issuedAssetsDataKey = await erc725js.fetchData('LSP12IssuedAssets[]');
console.log(issuedAssetsDataKey);

// Fetch all owned assets of the profile
const receivedAssetsDataKey = await erc725js.fetchData('LSP5ReceivedAssets[]');
console.log(receivedAssetsDataKey);

// Fetch the profile's universal receiver
const universalReceiverDataKey = await erc725js.fetchData('LSP1UniversalReceiverDelegate');
console.log(universalReceiverDataKey);
```

<!-- prettier-ignore-end -->

<details>
    <summary>Show result</summary>

```js
// Issued Assets (empty, no current assets)
{
  key: '0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd',
  name: 'LSP12IssuedAssets[]',
  value: []
}

// Owned Assets (six individual assets)
{
  key: '0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b',
  name: 'LSP5ReceivedAssets[]',
  value: [
    '0x5a44c7c0E47d1BeCEF166874Cd0b1be8f4090f64',
    '0x303aE9B19ee9B6FDa8c710b7F74b0582bbCC7b81',
    '0x2Bc3bfFf67094B4416623bDe626fd5f904b590d1',
    '0x48e37a167A3eE426389dc6E1Dc2d440E86C3737F',
    '0xDB9183ddA773285d5A4C5b1067A78c9F64Fb26E6',
    '0x778b47Bd998A5D0cc645Ff0c548096ea50628C83'
  ]
}

// Universal Receiver Delegate Address 0x0...75bb
{
  key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
  name: 'LSP1UniversalReceiverDelegate',
  value: '0x0000000000F49F9818D746b4b999A9E449F675bb'
}
```

</details>
