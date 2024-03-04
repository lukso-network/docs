---
sidebar_label: 'Register LSP12 Issued Assets'
sidebar_position: 13
description: Learn how to register Issued Assets under an Universal Profile.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set LSP12 Issued Assets

:::info Code Examples

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/blob/main/universal-profile/register-asset-backend.ts) repository.

:::

:::warning

Currently, `erc725.js` does not support the option of adding issued assets on top of the already existing issued assets. This example shows how to add all the issued assets from scratch.

:::

In this guide you will learn how to add a Digital Asset (either [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) or [LSP8 Identifiable Digital Asset](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md)) inside the list of LSP12 Issued Assets of a Universal Profile.

## Setup

You will need the address of an existing LSP7 or LSP8 Digital Asset in order to follow this tutorial. E.g:

- LSP7 Digital Asset [`0xf7056bdE90f494F55967858F1e9E4AFB1026C5C8`](https://explorer.execution.testnet.lukso.network/address/0xf7056bdE90f494F55967858F1e9E4AFB1026C5C8?tab=read_contract).
- LSP8 Digital Asset [`0xf651b88925C0B6C81Ad6f658a2F104226d837F60`](https://explorer.execution.testnet.lukso.network/address/0xf651b88925C0B6C81Ad6f658a2F104226d837F60?tab=read_contract).

The following code snippets require the installation of the following libraries:

- [`ethers.js`](https://github.com/ethers-io/ethers.js/) or [`web3.js`](https://www.npmjs.com/package/web3)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)
- [`@erc725/erc725.js`](https://github.com/ERC725Alliance/erc725.js/)

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

```shell
npm install web3 @lukso/lsp-smart-contracts @erc725/erc725.js
```

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

```shell
npm install ethers @lukso/lsp-smart-contracts @erc725/erc725.js
```

  </TabItem>
</Tabs>

## Imports and constants

Import `web3.js`/`ethers`, the [`UniversalProfile`](../../contracts/contracts/UniversalProfile.md) ABI from [`@lukso/lsp-smart-contracts`](../../contracts/introduction.md) and create an instance of this contract with the `UNIVERSAL_PROFILE_ADDRESS`.

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

```javascript
import Web3 from 'web3';
import { ERC725 } from '@erc725/erc725.js';
import LSP12Schema from '@erc725/erc725.js/schemas/LSP12IssuedAssets.json';

import UniversalProfileArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

// We will register the issued assets by setting the following LSP12 data keys
// - LSP12IssuedAssets[]
// - LSP12IssuedAssetsMap:<asset-address>

// add the type of asset (LSP7 or LSP8) and their address in the object list below
const issuedAssets = [
  {
    interfaceId: INTERFACE_IDS.LSP7DigitalAsset,
    address: '0xf7056bdE90f494F55967858F1e9E4AFB1026C5C8',
  },
  {
    interfaceId: INTERFACE_IDS.LSP8IdentifiableDigitalAsset,
    address: '0xf651b88925C0B6C81Ad6f658a2F104226d837F60',
  },
  //   {
  //     interfaceId: LSP7 or LSP8 interface ID (or other),
  //     address: '0xasset-address',
  //   },
];

const web3 = new Web3(window.lukso);
await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();
```

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

```javascript
import { ethers } from 'ethers';

import { ERC725 } from '@erc725/erc725.js';
import LSP12Schema from '@erc725/erc725.js/schemas/LSP12IssuedAssets.json';

import UniversalProfileArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

// We will register the issued assets by setting the following LSP12 data keys
// - LSP12IssuedAssets[]
// - LSP12IssuedAssetsMap:<asset-address>

// add the type of asset (LSP7 or LSP8) and their address in the object list below
const issuedAssets = [
  {
    interfaceId: INTERFACE_IDS.LSP7DigitalAsset,
    address: '0xf7056bdE90f494F55967858F1e9E4AFB1026C5C8',
  },
  {
    interfaceId: INTERFACE_IDS.LSP8IdentifiableDigitalAsset,
    address: '0xf651b88925C0B6C81Ad6f658a2F104226d837F60',
  },
  //   {
  //     interfaceId: LSP7 or LSP8 interface ID (or other),
  //     address: '0xasset-address',
  //   },
];

const provider = new ethers.BrowserProvider(window.lukso);
await provider.send('eth_requestAccounts', []);
const myWallet = await provider.getSigner();
```

  </TabItem>
</Tabs>

## Encode the data keys

Next, you can use the `erc725.js` library and [LSP12](../../standards/universal-profile/lsp12-issued-assets/) JSON schema to encode the data keys related to `LSP12IssuedAssets[]`.

```javascript
const erc725 = new ERC725(
  LSP12Schema,
  UNIVERSAL_PROFILE_ADDRESS,
  RPC_ENDPOINT,
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);

const allAssetAddresses = issuedAssets.map((asset) => asset.address);

const issuedAssetsMap = issuedAssets.map((asset, index) => {
  return {
    keyName: 'LSP12IssuedAssetsMap:<address>',
    dynamicKeyParts: asset.address,
    value: [
      asset.interfaceId,
      // index of the issued asset as uint128
      // 1 => 0x00000000000000000000000000000001
      ERC725.encodeValueType('uint128', index),
    ],
  };
});

const { keys: lsp12DataKeys, values: lsp12Values } = erc725.encodeData([
  { keyName: 'LSP12IssuedAssets[]', value: allAssetAddresses },
  ...issuedAssetsMap,
]);
```

## Instantiate the Universal Profile contract

Create an instance of the Universal Profile contract as shown below:

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

```javascript
const myUPContract = new web3.eth.Contract(
  UniversalProfileArtifact.abi,
  UNIVERSAL_PROFILE_ADDRESS,
);
```

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

```javascript
const myUPContract = new ethers.Contract(
  UNIVERSAL_PROFILE_ADDRESS,
  UniversalProfileArtifact.abi,
  myWallet,
);
```

  </TabItem>
</Tabs>

## Set data batch

Next, use the `setDataBatch(...)` function of the Universal Profile to update multiple data keys.

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

```javascript
await myUPContract.methods
  .setDataBatch(lsp12DataKeys, lsp12Values)
  .send({ from: myWallet.address, gas: 1_000_000 });
```

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

```javascript
await myUPContract.setDataBatch(lsp12DataKeys, lsp12Values);
```

  </TabItem>
</Tabs>
