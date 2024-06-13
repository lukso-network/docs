---
sidebar_label: 'Read Profile Data'
sidebar_position: 5
description: Learn how to read profile data from your Universal Profile.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read Data from your Universal Profile

## Install [erc725.js](https://npmjs.com/package/@erc725/erc725.js) library

```shell
npm install @erc725/erc725.js
```

## Create erc725 instance

:::info How is data stored on a Universal Profile

Each data on a Universal Profile is stored into a generic key-value [ERC725Y](https://github.com/ethereum/ercs/blob/master/ERCS/erc-725.md#erc725y) store which allows storing an unlimited amount of data in the smart contract.

ERC725Y standardizes a mapping of data keys to data values in order to have the ability to add or remove data across time without the need of redeploying the contract. It gives flexibility to the contract storage. On the smart contract, data keys are represented as bytes32 values and data values under these keys are stored as bytes.

[LSP2 - ERC725YJSONSchema](../../../standards/generic-standards/lsp2-json-schema) is the standard used by the LSPs to organize how the data should be represented as bytes32/bytes pairs.
:::

The parameters to provide to the erc725 instance are:

- [Schema](https://github.com/ERC725Alliance/erc725.js/tree/develop/schemas): specifies which data keys will be used to retrieve data from the Universal Profile.
- Univeral Profile address: the address of the Universal Profile you want to retrieve data from.
- Optional only for retrieving decoded data: RPC provider (web3, ethereum, ethers) or plain RPC url of [mainnet](../../../networks/mainnet/parameters.md) or [testnet](../../../networks/testnet/parameters.md) networks.

The code for creating an erc725 instance to read data from a Universal Profile:

<Tabs>

  <TabItem value="javascript" label="JavaScript">

<!-- prettier-ignore-start -->

```js
import { ERC725 } from '@erc725/erc725.js';
import profileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(
  profileSchema,
  "0x03B2689E4843ca56B2A933e7eC1E1ee6C3e6982e", // Universal Profile address
  "https://rpc.testnet.lukso.network",
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);
```

<!-- prettier-ignore-end -->

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

<!-- prettier-ignore-start -->

```ts
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import profileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(
  profileSchema as ERC725JSONSchema[], 
  "0x03B2689E4843ca56B2A933e7eC1E1ee6C3e6982e", // Universal Profile address
  "https://rpc.testnet.lukso.network",
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);
```
<!-- prettier-ignore-end -->

  </TabItem>
</Tabs>

## Retrieve encoded data

#### Get all profile data

`await erc725js.getData()`

Code snippet to get the encoded profile data:

```js
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import profileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

const erc725js = new ERC725(
  profileSchema as ERC725JSONSchema[],
  "0x03B2689E4843ca56B2A933e7eC1E1ee6C3e6982e",
  "https://rpc.testnet.lukso.network",
  {
  ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  }
);

const encodedProfileData = await erc725js.getData();
```

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
      verification: [Object],
      url: 'ipfs://QmPNk4GXUDVSpkMYS9ySLj4r7WJYNBLG986GFPqfRJPL8E',
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
    value: [],
  },
  {
    key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
    name: 'LSP1UniversalReceiverDelegate',
    value: '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D',
  },
];
```

</details>

#### Get specific profile data

`await myErc725.getData(['LSP3Profile', 'LSP1UniversalReceiverDelegate'])`

Main data keys for retrieving specific data:

- `SupportedStandards:LSP3Profile` used to know if the contract contains some metadata to display as a profile. [More details found here](../../../standards/universal-profile/lsp3-profile-metadata#supportedstandardslsp3profile)
- `LSP3Profile` used to retrieve VerifiableURI encoded value. VerifiableURI is a reference to a JSON file that describes the Universal Profile meta data.
- `LSP12IssuedAssets[]` used to retrieve assets the Universal Profile issued.
- `LSP5ReceivedAssets[]` used to retrieve assets the Universal Profile received.
- `LSP1UniversalReceiverDelegate` used to retrieve the [Universal Receiver Delegate](../../../standards/generic-standards/lsp1-universal-receiver/) smart contract address set on the Universal Profile.

Find all data keys on the [ERC725Y Inspect](https://erc725-inspect.lukso.tech/data-fetcher) tool or in the [erc725 repo](https://github.com/ERC725Alliance/erc725.js/tree/develop/schemas).

In the above example, we retrieve encoded `LSP3Profile` and `LSP1UniversalReceiverDelegate` from a Universal Profile.

A code snippet to get data of the `LSP3Profile` and `LSP1UniversalReceiverDelegate` data keys:

```js
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import profileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

const erc725js = new ERC725(
  profileSchema as ERC725JSONSchema[],
  "0x03B2689E4843ca56B2A933e7eC1E1ee6C3e6982e",
  "https://rpc.testnet.lukso.network",
  {
  ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  }
);

  const specificProfileData = await erc725js.getData([
    "LSP3Profile",
    "LSP1UniversalReceiverDelegate",
  ]);
```

<details>
    <summary>Show result</summary>

```js
[
  {
    key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
    name: 'LSP3Profile',
    value: {
      verification: {
        method: 'keccak256(utf8)',
        data: '0x598c2707d6bd256489e5de43f60f532f6541c6785c94f85a348e9bcbd7bdf4d6',
      },
      url: 'ipfs://QmPNk4GXUDVSpkMYS9ySLj4r7WJYNBLG986GFPqfRJPL8E',
    },
  },
  {
    key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
    name: 'LSP1UniversalReceiverDelegate',
    value: '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D',
  },
];
```

</details>

## Retrieve decoded data

#### Get all profile metadata (name, photos...)

Example to retrieve the content of the JSON file from the verifiable URI stored on the smart contract. It will download the JSON file and verify its hash automatically.

```js
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import profileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

const erc725js = new ERC725(
  profileSchema as ERC725JSONSchema[],
  "0x03B2689E4843ca56B2A933e7eC1E1ee6C3e6982e",
  "https://rpc.testnet.lukso.network",
  {
  ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  }
);

  const decodedProfileMetadata = await erc725js.fetchData([
    "LSP3Profile",
  ]);
```

<details>
    <summary>Show result</summary>

```js
[
  {
    key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
    name: 'LSP3Profile',
    value: {
      LSP3Profile: {
        name: 'testname',
        description: '',
        tags: ['profile'],
        links: [],
        profileImage: [[Object], [Object], [Object], [Object], [Object]],
        backgroundImage: [],
      },
    },
  },
];
```

</details>

 #### Get issued and received assets:

```js
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import profileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

const erc725js = new ERC725(
  profileSchema as ERC725JSONSchema[],
  "0xFF7E89acaBce3ed97Ed528288D3b8F113557A8c8",
  "https://rpc.testnet.lukso.network",
  {
  ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  }
);

  const decodedIssuedAndRetrievedAssetAddresses = await erc725js.fetchData([
    "LSP12IssuedAssets[]","LSP5ReceivedAssets[]"
  ]);

```

<details>
    <summary>Show result</summary>

```js
[
  {
    key: '0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd',
    name: 'LSP12IssuedAssets[]',
    value: [],
  },
  {
    key: '0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b',
    name: 'LSP5ReceivedAssets[]',
    value: [
      '0xc3B1c63b598Ee41a4BfCE56ecCA802dCD5D5241F',
      '0xFc4D463F888D0097f596aac83cBe70F5C2F5641d',
      '0x74770d4568DBb5E466c45D128cB3A535EB7291eC',
      '0x6dA30e7a8064eAbcA9220AB088514Fc8a131E719',
      '0x85134C7bb2Aa2ee019e64d654B289F738344B2ee',
      '0xB9dE32D8CaAcf5D2d1f30e3006553e25D46b569F',
      '0xD1FBFC22B2424be1E32d3Ee1dCB5306439F0f2A9',
      '0x8b08eeb9183081De7e2D4ae49fAD4afb56E31Ab4',
      '0x0428AFd3F122a65D023A6863F691e49fcc7B0f44',
      '0x50875607ca35c840Bc55ac6D0ce1c3C9c61D65a5',
    ],
  },
];
```

</details>

## Take advantage of our ERC725 inspect tool

🔍 You can retrieve encoded Universal Profile data easily with our [ERC725 Inspect](https://erc725-inspect.lukso.tech/data-fetcher) tool. You only have to paste your Universal Profile address and choose the data key to retrieve data from.
