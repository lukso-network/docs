---
sidebar_label: 'Read Profile Data'
sidebar_position: 1
description: Learn how to read profile data from your Universal Profile.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read Data from your Universal Profile

:::success 💡 Tips

Use our [ERC725 inspect](https://erc725-inspect.lukso.tech) tool to easily retrieve data from your 🆙 with the [🔍 Data Fetcher](https://erc725-inspect.lukso.tech/data-fetcher) or [🔎 Inspector](https://erc725-inspect.lukso.tech/data-fetcher).

Simply paste your Universal Profile address in the search field and choose the data key from which to retrieve data. The value stored will be returned both as encoded and decoded.

:::

A Universal Profile is a smart contract that uses a generic key-value store (ERC725Y) as a storage design. This structure enables to attach any information to the Universal Profile by setting any **value** to any specific **data key**.

ERC725Y data keys are defined by their **ERC725Y JSON schema**. The schema is an object describing the information (= value) stored under this data key. Therefore, a list of schemas let us know which ERC725Y data keys we can set and **which information we can retrieve and edit from the Universal Profile**.

![Universal Profile + ERC725Y JSON schema (diagram)](/img/standards/lsp2/ERC725Y-JSON-Schema-explained.jpeg)

:::info

For more details, see: [LSP2 - ERC725Y JSON Schema](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#specification)

:::

## Install [erc725.js](https://npmjs.com/package/@erc725/erc725.js) library

```shell
npm install @erc725/erc725.js
```

## Create erc725 instance

The parameters to provide to the erc725 instance are:

- [Schema](https://github.com/ERC725Alliance/erc725.js/tree/develop/schemas): specifies which data keys will be used to retrieve data from the Universal Profile.
- Universal Profile address: the address of the Universal Profile you want to retrieve data from.
- Optional only for retrieving decoded data: RPC provider (web3, ethereum, ethers) or plain RPC url of [mainnet](../../../networks/mainnet/parameters.md) or [testnet](../../../networks/testnet/parameters.md) networks.

```js title="Creating an erc725 instance to read data from a Universal Profile"
import { ERC725 } from '@erc725/erc725.js';
import profileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(
  profileSchema,
  '0x03B2689E4843ca56B2A933e7eC1E1ee6C3e6982e', // Universal Profile address
  'https://rpc.testnet.lukso.network',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs/',
  },
);
```

## Get all profile data

Use the `await erc725js.getData()` function from _erc725.js_ without passing any parameter.

```js title="Get all profile data"
import { ERC725 } from '@erc725/erc725.js';
import profileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(
  profileSchema,
  '0x03B2689E4843ca56B2A933e7eC1E1ee6C3e6982e',
  'https://rpc.testnet.lukso.network',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs/',
  },
);

const encodedProfileData = await erc725js.getData();
console.log(encodedProfileData);
// [
//   {
//     key: '0xeafec4d89fa9619884b600005ef83ad9559033e6e941db7d7c495acdce616347',
//     name: 'SupportedStandards:LSP3Profile',
//     value: '0x5ef83ad9',
//   },
//   {
//     key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
//     name: 'LSP3Profile',
//     value: {
//       verification: [Object],
//       url: 'ipfs://QmPNk4GXUDVSpkMYS9ySLj4r7WJYNBLG986GFPqfRJPL8E',
//     },
//   },
//   {
//     key: '0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd',
//     name: 'LSP12IssuedAssets[]',
//     value: [],
//   },
//   {
//     key: '0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b',
//     name: 'LSP5ReceivedAssets[]',
//     value: [],
//   },
//   {
//     key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
//     name: 'LSP1UniversalReceiverDelegate',
//     value: '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D',
//   },
// ];
```

## Get specific profile data

:::success Tips

You can find all data keys on the [ERC725Y Inspect](https://erc725-inspect.lukso.tech/data-fetcher) tool or in the [erc725 repo](https://github.com/ERC725Alliance/erc725.js/tree/develop/schemas).

:::

We can also retrieve any of the specific data keys below:

- `SupportedStandards:LSP3Profile` used to know if the contract contains some metadata to display as a profile. [More details found here](../../../standards/metadata/lsp3-profile-metadata#supportedstandardslsp3profile)
- `LSP3Profile` used to retrieve VerifiableURI encoded value. VerifiableURI is a reference to a JSON file that describes the Universal Profile meta data.
- `LSP12IssuedAssets[]` used to retrieve assets the Universal Profile issued.
- `LSP5ReceivedAssets[]` used to retrieve assets the Universal Profile received.
- `LSP1UniversalReceiverDelegate` used to retrieve the [Universal Receiver Delegate](../../../standards/accounts/lsp1-universal-receiver/) smart contract address set on the Universal Profile.

### Get the `LSP3Profile` Metadata

One of the main ERC725Y data keys of the Universal Profile is the [`LSP3Profile`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp3profile) key. It is a standardized key that refers to the **metadata of the Universal Profile**.

This metadata takes the form of a reference to a JSON file. To retrieve the content of the JSON file (stored on IPFS, or in any other storage service), we need to use the `fetchData(...)` function from _erc725.js_. This will download the JSON file and verify its hash automatically.

```js title="Get all profile metadata"
import { ERC725 } from '@erc725/erc725.js';
import profileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(
  profileSchema,
  '0x03B2689E4843ca56B2A933e7eC1E1ee6C3e6982e',
  'https://rpc.testnet.lukso.network',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs/',
  },
);

const decodedProfileMetadata = await erc725js.fetchData('LSP3Profile');
console.log(decodedProfileMetadata);
//   {
//     key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
//     name: 'LSP3Profile',
//     value: {
//       LSP3Profile: {
//         name: 'testname',
//         description: '',
//         tags: ['profile'],
//         links: [],
//         profileImage: [[Object], [Object], [Object], [Object], [Object]],
//         backgroundImage: [],
//       },
//     },
//   },
```

### Get List of owned assets

```js title="Get received assets"
import { ERC725 } from '@erc725/erc725.js';
import profileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(
  profileSchema,
  '0xFF7E89acaBce3ed97Ed528288D3b8F113557A8c8',
  'https://rpc.testnet.lukso.network',
);

const receivedAssetsValue = await erc725js.getData('LSP5ReceivedAssets[]');
console.log(receivedAssetsValue);
//   {
//     key: '0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b',
//     name: 'LSP5ReceivedAssets[]',
//     value: [
//       '0xc3B1c63b598Ee41a4BfCE56ecCA802dCD5D5241F',
//       '0xFc4D463F888D0097f596aac83cBe70F5C2F5641d',
//       '0x74770d4568DBb5E466c45D128cB3A535EB7291eC',
//       '0x6dA30e7a8064eAbcA9220AB088514Fc8a131E719',
//       '0x85134C7bb2Aa2ee019e64d654B289F738344B2ee',
//       '0xB9dE32D8CaAcf5D2d1f30e3006553e25D46b569F',
//       '0xD1FBFC22B2424be1E32d3Ee1dCB5306439F0f2A9',
//       '0x8b08eeb9183081De7e2D4ae49fAD4afb56E31Ab4',
//       '0x0428AFd3F122a65D023A6863F691e49fcc7B0f44',
//       '0x50875607ca35c840Bc55ac6D0ce1c3C9c61D65a5',
//     ],
//   },
```

### Get List of Issued Assets

```js title="Get issued and received assets"
import { ERC725 } from '@erc725/erc725.js';
import profileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(
  profileSchema,
  '0xFF7E89acaBce3ed97Ed528288D3b8F113557A8c8',
  'https://rpc.testnet.lukso.network',
);

const issuedAssetsValue = await erc725js.getData('LSP12IssuedAssets[]');
console.log(issuedAssetsValue);
//   {
//     key: '0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd',
//     name: 'LSP12IssuedAssets[]',
//     value: [],
//   },
```

### Get Universal Receiver address

```js title="Get issued and received assets"
import { ERC725 } from '@erc725/erc725.js';
import profileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(
  profileSchema,
  '0xFF7E89acaBce3ed97Ed528288D3b8F113557A8c8',
  'https://rpc.testnet.lukso.network',
);

const universalReceiverDelegateValue = await erc725js.getData(
  'LSP1UniversalReceiverDelegate',
);
console.log(universalReceiverDelegateValue);
// [
//   {
//     key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
//     name: 'LSP1UniversalReceiverDelegate',
//     value: '0x7870c5b8bc9572a8001c3f96f7ff59961b23500d',
//   },
// ];
```
