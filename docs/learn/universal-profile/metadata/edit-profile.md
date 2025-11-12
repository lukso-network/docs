---
sidebar_label: 'Edit Profile Data'
sidebar_position: 2
description: Learn how to edit the LSP3Profile Metadata of a Universal Profile using web3.js or ethers.js.
---

import ERC725 from '@site/static/img/tools/erc725-tools.png';

# Edit a Universal Profile

This guide will teach you how to **customize our Universal Profile** programmatically in JavaScript and includes:

- adding a profile and cover picture to our Universal Profile,
- editing our Universal Profile infos (e.g., description, badges, links),
- see the updated profile details and images of our Universal Profile on the [wallet.universalprofile.cloud](https://wallet.universalprofile.cloud/) website.

To achieve this goal, we will perform the following steps:

1. Create a JSON file that contains your profile details (`LSP3Profile` metadata).
2. Upload this JSON file to [IPFS] using our [tools-data-providers](https://github.com/lukso-network/tools-data-providers) library.
3. Set your new [profile metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md#lsp3profile) key to your Universal Profile with our [erc725.js](/tools/dapps/erc725js/getting-started.md) library and `web3.js`.

![Universal Profile with pictures and infos on wallet.universalprofile.cloud](../img/edit-profile.png)

## Install the dependencies

For this guide, we will use the [tools-data-providers], [erc725.js] and [lsp-smart-contracts] libraries:

```shell
npm install web3 @lukso/lsp-smart-contracts @erc725/erc725.js @lukso/data-provider-ipfs-http-client
```

## Create a new LSP3Profile JSON file

<details>
    <summary><code>LSP3ProfileMetadata.json</code> (example) - Complete "ready to use" JSON file</summary>

```json
{
  "LSP3Profile": {
    "name": "Universal Profile - Edit Profile Data",
    "description": "Congratulations! You have successfully edited your profile!",
    "links": [
      {
        "title": "Website",
        "url": "https://mywebsite.me"
      }
    ],
    "tags": ["Public Profile"],
    "profileImage": [
      {
        "width": 640,
        "height": 609,
        "hashFunction": "keccak256(bytes)",
        "hash": "0xe459e5769af85b09fb43bb8eaac561e196d58c0f5da3c5e150b6695898089402",
        "url": "ipfs://QmPCz896rcZmq8F3FuUkJinRUmPgnZGjPvZL71nAaL7Fsx"
      }
    ],
    "backgroundImage": [
      {
        "width": 1024,
        "height": 576,
        "hashFunction": "keccak256(bytes)",
        "hash": "0x1c19780d377a7b01f7dcf16e0ebffd225e29d2235625009f67cf9d86a32a79e1",
        "url": "ipfs://QmPMmEpKnmgACsWjhDUheF8TEKpspzQhAkjbY4EBbR4jgP"
      }
    ]
  }
}
```

</details>

We will start by creating a **new JSON file** that will contain our [`LSP3Profile`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md#lsp3profile) metadata.

```json title="LSP3ProfileMetadata.json"
{
  "LSP3Profile": {
    "name": "...", // a self chosen username
    "description": "...", // A description, describing the person, company, organisation or creator of the profile.
    "links": [
      // links related to the profile
      {
        "title": "...", // a title for the link.
        "url": "..." // the link itself
      }
      // add more links...
    ],
    "tags": ["...", "..."], // tags related to the profile
    "profileImage": [
      {
        "width": 640, // in pixels
        "height": 609, // in pixels
        "hashFunction": "keccak256(bytes)", // do not change!
        "hash": "0x...", // add the keccak256 hash of the image here
        "url": "ipfs://..." // IPFS image identifier (CID)
      }
    ],
    "backgroundImage": [
      {
        "width": 1024, // in pixels
        "height": 576, // in pixels
        "hashFunction": "keccak256(bytes)", // do not change!
        "hash": "0x...", // add the keccak256 hash of the image here
        "url": "ipfs://..." // IPFS image identifier (CID)
      }
    ]
  }
}
```

**Add more details to your profile:**

Add more details about the Universal Profile for the entity's name, description, links, and tags. The properties `links` and `tags` accept an array of objects or strings, so you can add as many as you need!

Be as creative as you want to make your Universal Profile as unique as possible! :art:

:::info Recommendation
The JSON file for [`LSP3Profile`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md#lsp3profile) accepts an array of images so that you have pictures of different sizes and dimensions. This way, client interfaces can know which files to pick based on the container size in their interface.
:::

## Upload data to IPFS

:::note Notice
In this guide, we will use [local IPFS Node provider](https://github.com/lukso-network/tools-data-providers?tab=readme-ov-file#apps-and-packages) from our [IPFS Provider Tool](https://github.com/lukso-network/tools-data-providers). [Other providers](https://github.com/lukso-network/tools-data-providers?tab=readme-ov-file#apps-and-packages) supported by this tool including Pinata, Infura, Cascade and Sense.
:::

:::info Learn More
**IPFS is just one place among many** where you can store your Universal Profile metadata.<br/>
You can use other file storage options (_e.g., [Swarm](https://www.ethswarm.org/), [Storj](https://www.storj.io/index.html), Google Drive, or a private FTP server_).
:::

This guide will store our Universal Profile metadata on [IPFS]. We can add edit our UP metadata by:

1. Creating a new JSON file with new or updated info (**☑️ done in the previous step**).
2. Uploading the file to IPFS.
3. Change the reference of our [LSP3Profile](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md#lsp3profile) key to point to our uploaded JSON file.

![LSP3Profile Metadata as JSON file on IPFS (diagram)](../img/profile-metadata-ipfs-explained.jpeg)

### Upload image to IPFS

For the properties `profileImage` and `backgroundImage`, we will need to add the following information:

- `hash`: the keccak hash of the image file
- `url`: the url of the image uploaded to IPFS.

Both `hash` and `url` values can be obtained from using our IPFS library.

```js
import { createReadStream } from 'fs';
import { IPFSHttpClientUploader } from '@lukso/data-provider-ipfs-http-client';

const provider = new IPFSHttpClientUploader('http://127.0.0.1:5001/api/v0/add');

const file = createReadStream('./test-image.png');

const { url, hash } = await provider.upload(file);
```

:::caution
Image sizes should be written as numbers, not as strings. The **max image widths** supported by [universalprofile.cloud](https://universalprofile.cloud) are:
`profileImage <= 800px`, `backgroundImage <= 1800px`
:::

### Upload JSON Metadata to IPFS

Same as the image, we need to gather the `hash` and `url` values of the uploaded JSON Metadata.

```javascript
import { IPFSHttpClientUploader } from '@lukso/data-provider-ipfs-http-client';
// reference to the previously created JSON file (LSP3Profile metadata)
import jsonFile from './LSP3Metadata.json';

const ipfsProvider = new IPFSHttpClientUploader(
  'http://127.0.0.1:5001/api/v0/add',
);

const provider = 'https://4201.rpc.thirdweb.com'; // RPC provider url

async function editProfileInfo() {
  // Upload our JSON file to IPFS and retrieve url and hash values
  const { lsp3ProfileIPFSUrl, lsp3ProfileIPFSHash } = await ipfsProvider.upload(
    jsonFile.LSP3Profile,
  );
}
```

We are now ready to apply these changes to our Universal Profile. We will see how in the next section. :arrow_down:

## Encode the LSP3Profile Metadata

The next step is to **prepare the data** used to edit our Universal Profile. _Preparing the data_ means **encoding it** to write in on our Universal Profile ERC725Y smart contract.

To do so, we will use our [erc725.js] library, which helps us encode the data easily. We will need the following:

- The address of our Universal Profile contract mentioned in the URL on the [**universalprofile.cloud** ](https://universalprofile.cloud/)explorer
- An ERC725Y JSON Schema: a set of ERC725Y key-value pairs ([LSP2 - ERC725Y JSON Schema](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md))
- A RPC provider: `https://4201.rpc.thirdweb.com`

Once our erc725.js is initialized, we can encode the `LSP3Profile` data to generate a key and a value.

To do so, we use the [`encodeData()`](/tools/dapps/erc725js/methods.md#encodeData) function. We call it with an object containing the `keyName` and the `value`:

- `keyName`: `LSP3Profile`, the name of the key we want to encode.
- `value`: an object with:
  - `hashFunction`: we use `keccak256` (standard hash function). Since we are hashing a JSON file that contains strings, we also specify the data type as `utf8`.
  - `hash:` obtained after hashing the JSON file with `keccak256`. (as _lsp3ProfileIPFSHash_)
  - `url` of the file: this is the IPFS URL of the file obtained in the previous step. (as _lsp3ProfileIPFSUrl_)

```javascript
import Web3 from 'web3';
// import ERC725
import { ERC725 } from '@erc725/erc725.js';
// ...

const web3 = new Web3('https://4201.rpc.thirdweb.com');

// Create a new LSP3Profile JSON file
// ...

async function editProfileInfo() {
  // Upload our JSON file to IPFS
  // ...

  // Setup erc725.js
  const schema = [
    {
      name: 'LSP3Profile',
      key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
      keyType: 'Singleton',
      valueType: 'bytes',
      valueContent: 'VerifiableURI',
    },
  ];

  const erc725 = new ERC725(schema, profileAddress, web3.currentProvider, {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  });

  // Encode the LSP3Profile data
  const encodedData = erc725.encodeData({
    keyName: 'LSP3Profile',
    value: {
      hashFunction: 'keccak256(utf8)',
      hash: lsp3ProfileIPFSHash,
      url: lsp3ProfileIPFSUrl,
    },
  });
  /**
  { example keys & values
    keys: ['0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5'],
    values: ['0x6f357c6aabbbf0d07b125d2c53c1ca19672e31ad768d8fd2ca55fbf0a6e94a39488a52c5697066733a2f2f516d59435154653572355a6556546274705a4d5a58535150324e785864674a46565a623631446b33674650355658']
  }
  */
}
```

## Edit the Universal Profile

Now that our updated data is encoded, we are ready to set it in our Universal Profile smart contract.

### Create instance of UP

The first step is to create an instance of the Universal Profile smart contract. We will need:

- the contract ABI (from our npm package [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts)).
- the address of the Universal Profile contract.

```javascript title="Create contracts instances and get the Key Manager address"
import Web3 from 'web3';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

const web3 = new Web3('https://4201.rpc.thirdweb.com');
const myUP = (await web3.eth.getAccounts())[0];

// Create instance of our UP
const universalProfileContract = new web3.eth.Contract(
  UniversalProfile.abi,
  profileAddress,
);
```

### Set data on the Universal Profile

The final step is to edit our `LSP3Profile` key on our Universal Profile with the new value obtained in **Step 3**. We can easily access the key-value pair from the encoded data obtained with erc725.js.

<!-- prettier-ignore-start -->

```javascript title="Preparing and executing the setData transaction"
// Update LSP3Profile metadata on our Universal Profile
await universalProfileContract.methods.setData(
  encodedData.keys[0],
  encodedData.values[0],
).send({ from: myEOA.address });
```

<!-- prettier-ignore-end -->

:::tip ERC725 Inspect
You can also validate your LSP3Profile metadata of your Universal Profile using the [ERC725 Inspect Tool](https://erc725-inspect.lukso.tech/?network=lukso+mainnet).
<img style={{ verticalAlign: 'right' }} src={ERC725} />
:::

## Visualize our updated Universal Profile

You can now check your UP on the [profile explorer](https://universalprofile.cloud/) website (make sure you are on the correct network - there is a network switch in the footer):

`https://wallet.universalprofile.cloud/[UP ADDRESS]?network=testnet`

[erc725.js]: /tools/dapps/erc725js/getting-started
[ipfs]: https://ipfs.io/
[lsp-smart-contracts]: /tools/lsp-smart-contracts/getting-started.md
[tools-data-providers]: https://github.com/lukso-network/tools-data-providers
