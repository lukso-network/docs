---
sidebar_label: 'Edit your Universal Profile'
sidebar_position: 1.2
---

# Edit your Universal Profile

In this guide, you will learn how to **customize your Universal Profile**, displayed on [universalprofile.cloud](https://universalprofile.cloud). You will know how to:

- add a profile + cover picture to your profile.
- edit your profile infos (description, badges, links, etc...).

To achieve this mini-project, we will perform the following steps:

1. create a JSON file that contains your profile details (`LSP3Profile` metadata).
2. upload this JSON file to IPFS, using our [lsp-factory.js] tool.
3. encode + set your new [LSP3Profile](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp3profile) metadata key in your profile with our [erc725.js] library and web3.js.

![](./img/edit-profile.png)

## Introduction

Your profile infos (= profile metadata) are stored under the key [`LSP3Profile`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp3profile). This metadata takes the form of a JSON file stored on IPFS.

You can add (or edit) details to your UP by:

1. creating a new JSON file, with new / updated infos.
2. upload this file to IPFS.
3. change the reference of your [LSP3Profile](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp3profile) key to point to your newly uploaded JSON file.

## Setup

We will use a new tool in this guide, [erc725.js].

```shell
npm install @erc725/erc725.js
```

## Step 1: Create a new LSP3Profile JSON file

We will use the JSON template file to create your profile metadata.

Follow the steps below to fill the blank fields, indicated by the placeholders `...`

**1.1) add your name, description, links and tags**

Be as creative as you want here, to make your profile as unique as possible! :art:

```json title="YourProfileMetadata.json"
{
    "name": "...", // a self chosen username
    "description": "..." // A description, describing the person, company, organisation or creator of the profile.
    "links": [ // links related to the profile
        {
            "title": "...", // a title for the link.
            "url": "..." // the link itself
        }
    ],
    "tags": [ "Public Profile" ], // tags related to the profile
    "profileImage": [
        {
            "width": Number, // in pixels
            "height": Number, // in pixels
            "hashFunction": "keccak256(bytes)",
            "hash": "0x...", // bytes32 hex string of the image hash
            "url": "ipfs://..."
        },
    ],
    "backgroundImage": [
        {
            "width": Number, // in pixels
            "height": Number, // in pixels
            "hashFunction": 'keccak256(bytes)',
            "hash": "0x...", // bytes32 hex string of the image hash
            "url": "ipfs://..."
        },
    ]
}
```

**1.2) add your profile and background image**

For your `profileImage` and `backgroundImage`, you will need to add the following informations:

- **`width`** / **`height`**: replace the placeholder `Number` by the dimension of the image (in pixels).
- **`hash`**: use this [tool to generate the **keccak256 hash** of your image](https://emn178.github.io/online-tools/keccak_256_checksum.html).
- **`url`**: upload your images to the LUKSO IPFS Gateway.

Use this [IPFS file uploader tool](https://anarkrypto.github.io/upload-files-to-ipfs-from-browser-panel/public/#) with the settings shown below in green.

![](./img/ipfs-lukso-settings.jpg)

Drag & Drop your file and click on the **"Upload** button. Once done:

1. copy the ipfs file identifier (cid) shown in green below.
2. paste it in the `url` field in your JSON file, after `ipfs://`.

![](./img/ipfs-file-upload.jpg)

Save your JSON file after you have added all your details and images.

> **NB:** don't forget to delete the comments in the JSON file!

You are now ready apply these changes on your Universal Profile. We will see how in the next section :arrow_down:

## Step 2: upload your JSON file to IPFS

Our tool [lsp-factory.js] provides convenience to upload easily your profile Metadata to IPFS.

```typescript
import { LSP3UniversalProfile } from '@lukso/lsp-factory.js';

const uploadResult = await LSP3UniversalProfile.uploadProfileData(jsonFile);
const profileMetadataIPFSUrl = uploadResult.url;
```

## Step 3: encode data with erc725.js

The next step before to edit your Universal Profile is to prepare the data. "Prepare the data" means encoding it, so that it can be written on your Universal Profile.

To do so, we will use our [erc725.js] library. It will help us to encode the data easily.

You will need the address of your Universal Profile contract to do so. This is the address of your profile mentioned on the url after `/` on [universalprofile.cloud](https://universalprofile.cloud)

```typescript
import Web3 from 'web3';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';

const web3 = new Web3('https://rpc.l14.lukso.network');

// constants
const jsonFile = require('./YourProfileMetadata.json');
const profileAddress = '0x...';

// 3.1 setup erc725.js
const schema: ERC725JSONSchema[] = [
  {
    name: 'LSP3Profile',
    key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
    keyType: 'Singleton',
    valueContent: 'JSONURL',
    valueType: 'bytes',
  },
];

const erc725 = new ERC725(schema, profileAddress, web3.currentProvider, {
  ipfsGateway: 'https://ipfs.lukso.network/ipfs/',
});

// 3.2 encode data to be written on your UP
const encodedData = erc725.encodeData({
  LSP3Profile: {
    hashFunction: 'keccak256(utf8)',
    // hash the retrieved file
    hash: web3.utils.keccak256(JSON.stringify({ LSP3Profile: jsonFile })),
    url: profileMetadataIPFSUrl,
  },
});
```

## Step 4: set new data on your Universal Profile

Now that your updated data is encoded, you are ready to set it in your Universal Profile. To do so, you will interact with your Universal Profile smart contract via web3.js.

**4.1) Create instances of your contracts**

The first step is to create new instances of the Universal Profile and the Key Manager. You will need:

- the contracts abi (from our npm package `@llukso/universalprofile-smart-contracts`).
- the contracts addresses.

You can obtain the address of your KeyManager by calling the `owner()` function on your Universal Profile (if you have deployed your UP with our lsp-factory.js tool).

```typescript
const UniversalProfile = require('@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/universalprofile-smart-contracts/artifacts/LSP6KeyManager.json');

const myUP = new web3.eth.Contract(UniversalProfile.abi, profileAddress);

const keyManagerAddress = await myUP.methods.owner().call();
const myKM = new web3.eth.Contract(KeyManager.abi, keyManagerAddress);
```

**4.2) set Data on your Universal Profile**

The final step is to edit your `LSP3Profile` key on your Universal Profile with the updated value. You can easily access both the key and value from the encoded data obtained with erc725.js.

Since your Universal Profile is owned by your Key Manager, the call will have to go through the Key Manager first. You then need to **encoded the setData payload** and pass it to your Universal Profile to perform this last step.

```javascript
// encode the setData payload
const abiPayload = await myUP.methods
  .setData([encodedData.LSP3Profile.key], [encodedData.LSP3Profile.value])
  .encodeABI();

// execute via the KeyManager, passing the UP payload
await myKM.methods
  .execute(abiPayload)
  .send({ from: wallet.address, gasLimit: 3_000_000 });
```

## Final Code

Below is the complete code snippet of this guide, with all the steps compiled together.

```typescript
import Web3 from 'web3';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import { LSP3UniversalProfile } from '@lukso/lsp-factory.js';

const UniversalProfile = require('@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/universalprofile-smart-contracts/artifacts/LSP6KeyManager.json');

// constants
const profileAddress = '0x...';
// 1. create a new LSP3Profile JSON file
const jsonFile = require('./YourProfileMetadata.json');

const web3 = new Web3('https://rpc.l14.lukso.network');

// setup
const PRIVATE_KEY = '0x...';
const wallet = web3.eth.accounts.wallet.add(PRIVATE_KEY);

async function uploadMetadataToIPFS() {
  const uploadResult = await LSP3UniversalProfile.uploadProfileData(jsonFile);
  return uploadResult.url;
}

function setUpERC725JS() {
  const schema: ERC725JSONSchema[] = [
    {
      name: 'LSP3Profile',
      key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
      keyType: 'Singleton',
      valueContent: 'JSONURL',
      valueType: 'bytes',
    },
  ];

  return new ERC725(schema, profileAddress, web3.currentProvider, {
    ipfsGateway: 'https://ipfs.lukso.network/ipfs/',
  });
}

async function createContractsInstance() {
  const myUP = new web3.eth.Contract(UniversalProfile.abi, profileAddress);

  const keyManagerAddress = await myUP.methods.owner().call();
  const myKM = new web3.eth.Contract(KeyManager.abi, keyManagerAddress);

  return { myUP, myKM };
}

// Final code
async function editProfileInfos() {
  // 2. upload the JSON files to IPFS
  const lsp3ProfileIPFSUrl = await uploadMetadataToIPFS();

  // 3.1 setup erc725.js
  const erc725 = setUpERC725JS();
  // 3.2 encode data to be written on your UP
  const encodedData = erc725.encodeData({
    LSP3Profile: {
      hashFunction: 'keccak256(utf8)',
      // hash the retrieved file
      hash: web3.utils.keccak256(JSON.stringify({ LSP3Profile: jsonFile })),
      url: lsp3ProfileIPFSUrl,
    },
  });

  // 4. set new data on your Universal Profile
  // 4.1 create instances of your contracts
  const { myUP, myKM } = await createContractsInstance();

  // 4.2 encode the setData payload
  const abiPayload = await myUP.methods
    .setData([encodedData.LSP3Profile.key], [encodedData.LSP3Profile.value])
    .encodeABI();

  // 4.3 execute via the KeyManager, passing the UP payload
  await myKM.methods
    .execute(abiPayload)
    .send({ from: wallet.address, gasLimit: 3_000_000 });
}
editProfileInfos();
```

[lsp-factory.js]: (../tools/lsp-factoryjs/deployment/universal-profile.md#uploading-lsp3-metadata-to-ipfs)
[erc725.js]: (../tools/erc725js/writing-data.md#example)
