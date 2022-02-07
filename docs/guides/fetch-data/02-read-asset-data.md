---
sidebar_label: 'Read Asset Data'
sidebar_position: 3.1
---

# Read Asset Data

In this guide, we will learn how to:

- call Universal Receiver address
- read data from the Universal Receiver
- get all ever received assets from a profile
- fetch the data of all owned assets

![Asset example on universalprofile.cloud](./img/example-asset.png)

We will use:

- [web3.js](https://web3js.readthedocs.io/en/v1.7.0/) for utility as well as connecting to the LUKSO L14 network
- [erc725.js](../../tools/erc725js/getting-started/) library to check the interface of a profile.
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) to enable you to use `fetch()` in Node.js code

## Table of Contents

1. [Get all ever received assets](#step-1---get-all-ever-received-assets)
2. [Check ownership of assets](#step-2---check-ownership-of-assets)
3. [Check the asset's interface](#step-3---check-the-assets-interface)
4. [Receive the encoded asset data](#step-4---receive-the-encoded-asset-data)
5. [Decode the asset data](#step-5---decode-the-asset-data)
6. [Create the storage link](#step-6---create-the-storage-link)
7. [Get the asset data](#step-7---get-the-asset-data)
8. [Fetch the asset's properties](#step-8---fetch-the-assets-properties)

## Step 1 - Get all ever received assets

After receiving all account-related data, we can search for the assets of the Universal Profile. In the [previous guide](./read-profile-data), we read the Universal Profile properties and gathered the address of the Universal Receiver. This smart contract keeps track of every asset that was ever received by a profile. We can trim out the asset address after we fetch all the raw values. To call the smart contracts, we will need the `web3.js` library.

First, open a terminal in the project's folder of your choice and install the web3.js library.

```shell
npm install web3
```

After installation, we can move on with the JavaScript file. During the process, we will always use the same file. To make the guide more understandable, we also use sample addresses for the receiver, profile and asset. You will most likely change these static variable with a dynamic value from an input field or fetching process within your app.

```javascript title="read_assets.js"
// Import and Setup
const Web3 = require('web3');
const web3 = new Web3('https://rpc.l14.lukso.network');

// Our static Universal Receiver address
const sampleUniversalReceiver = '0x50a02ef693ff6961a7f9178d1e53cc8bbe1dad68';

// ABI for the Universal Receiver
const lsp1MinimalInterface = [
  {
    inputs: [],
    name: 'getAllRawValues',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

/*
 * Return array of blockchain addresses of
 * assets, that were received by the
 * Univeral Profile holder.
 *
 * @returns: array of asset addresses
 */
async function getAssetAddressses() {
  const AddressStore = new web3.eth.Contract(
    lsp1MinimalInterface,
    sampleUniversalReceiver,
  );

  let rawValues = [];

  try {
    // Fetch all raw values
    rawValues = await AddressStore.methods.getAllRawValues().call();
  } catch (error) {
    return console.log('Data from universal receiver could not be loaded');
  }

  let digitalAssets = [];

  // Retrieve addresses
  for (let i = 0; i < rawValues.length; i++) {
    digitalAssets[i] = web3.utils.toChecksumAddress(rawValues[i].substr(26));
  }
  return digitalAssets;
}

// Debug
getAssetAddressses().then((digitalAssets) => console.log(digitalAssets));
```

## Step 2 - Check ownership of assets

After trimming out the asset addresses, we can check which assets are owned by the Universal Profile. We can do this by comparing the balances of the assets within the receiver contract. If the balance is greater than zero, the asset is still owned.

```javascript title="read_assets.js"
...
// Our static Universal Profile address
const sampleProfileAddress = '0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e';

// ABI for the asset
const lsp8MinimalInterface = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

/*
 * Return array of blockchain addresses
 * of assets that are owned by the
 * Univeral Profile.
 *
 * @returns: array of asset addresses
 */
async function getOwnedAddresses(owner) {
  let digitalAssets = await getAssetAddressses();
  let ownedAssets = [];

  for (let i = 0; i < digitalAssets.length; i++) {
    let isCurrentOwner;

    // Create instance of the asset to check owner balance
    const assetContract = new web3.eth.Contract(
      lsp8MinimalInterface,
      digitalAssets[i]
    );

    isCurrentOwner = await assetContract.methods.balanceOf(owner).call();
    if (isCurrentOwner > 0) {
      ownedAssets[ownedAssets.length] = digitalAssets[i];
    }
  }
  return ownedAssets;
}

// Debug
getOwnedAddresses(sampleProfileAddress).then((ownedAssets) => console.log(ownedAssets));
```

## Step 3 - Check the asset's interface

Now that all owned assets are in one place, we need to check which interface is behind those addresses before getting the data. The old way of storing data with the `ERC725YLagacy` only takes a single key, while the new `LSP725` interface will accept an array as input to fetch multiple properties at once. We have to assure the right interaction in order to bypass errors.

:::info
The profile explorer on [universalprofile.cloud](https://universalprofile.cloud/) is using ERC725Legacy interfaces.
:::

```javascript title="read_assets.js"
...
const sampleAssetAddress = '0xc444009d38d3046bb0cF81Fa2Cd295ce46A67C78';

const InterfaceID = [
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "supportsInterface",
    inputs: [
      {
        type: "bytes4",
        name: "interfaceId",
        internalType: "bytes4",
      },
    ],
  },
];

/*
 * Check the interface of an
 * asset's smart contract
 *
 * @returns: string of interface type
 */
async function checkAssetInterface(address) {

  // Create instance of the contract which has to be queried
  const AssetContract = new web3.eth.Contract(InterfaceID, address);

  // Storing type of interface standard
  let standard;

  // Old version's hash of ERC725Y
  const erc725YLegacy = "0x2bd57b73";
  let isERC725YLegacy = false;

  // Check if the contract is an old key-value store
  try {
    isERC725YLegacy = await AssetContract.methods
      .supportsInterface(erc725YLegacy)
      .call();
  } catch (error) {
    return console.log("Address could not be checked for lagacy interface");
  }

  // New version's hash of ERC725Y
  const erc725Y = "0x5a988c0f";
  let isERC725Y = false;

  // Check if the contract is an old key-value store
  try {
    isERC725Y = await AssetContract.methods.supportsInterface(erc725Y).call();
  } catch (error) {
    return console.log("Address could not be checked for interface");
  }

  // Update standard variable
  if (isERC725YLegacy) {
    standard = "old";
  }
  if (isERC725Y) {
    standard = "new";
  }

  return standard;
}

// Debug
checkAssetInterface(sampleAssetAddress).then((standard) =>
  console.log(standard)
);
```

## Step 4 - Receive the encoded asset data

Now we can safely call the data of the address. The [LSP4](../../standards/nft-2.0/LSP4-Digital-Asset-Metadata) data is saved in a 725Y key-value store, and we need to input the right key to fetch the associated value. There are multiple keys for different properties. To give a showcase, we will use the metadata key to receive the associated data.

```javascript title="read_assets.js"
...
// ABI's
const ERC725YLagacyMinimalInterface = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_keys',
        type: 'bytes32',
      },
    ],
    name: 'getData',
    outputs: [
      {
        internalType: 'bytes',
        name: 'values',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const ERC725MinimalInterface = [
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: '_keys',
        type: 'bytes32[]',
      },
    ],
    name: 'getData',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'values',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const LSP4schema = [
  {
    name: 'SupportedStandards:LSP4DigitalCertificate',
    key: '0xeafec4d89fa9619884b6b89135626455000000000000000000000000abf0613c',
    keyType: 'Mapping',
    valueContent: '0xabf0613c',
    valueType: 'bytes',
  },
  {
    name: 'LSP4TokenName',
    key: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',
    keyType: 'Singleton',
    valueContent: 'String',
    valueType: 'string',
  },
  {
    name: 'LSP4TokenSymbol',
    key: '0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756',
    keyType: 'Singleton',
    valueContent: 'String',
    valueType: 'string',
  },
  {
    name: 'LSP4Metadata',
    key: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',
    keyType: 'Singleton',
    valueContent: 'JSONURL',
    valueType: 'bytes',
  },
  {
    name: 'LSP4Creators[]',
    key: '0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7',
    keyType: 'Array',
    valueContent: 'Number',
    valueType: 'uint256',
    elementValueContent: 'Address',
    elementValueType: 'address',
  },
];

// Keys for properties
const TokenNameKey = LSP4schema[1].key;
const TokenSymbolKey = LSP4schema[2].key;
const MetaDataKey = LSP4schema[3].key;
const CreatorsKey = LSP4schema[4].key;

/*
 * Fetch the dataset of an asset
 * from the Universal Profile
 *
 * @returns: string of encoded data
 */
async function getAssetData(key) {
  // Check if asset is ERC725Lagacy or ERC725
  let assetInterfaceID = await checkAssetInterface(sampleAssetAddress);

  try {
    // Old interface
    if (assetInterfaceID === 'old') {
      // Instanciate ERC725Lagacy smart contract
      const digitalAsset = new web3.eth.Contract(
        ERC725YLagacyMinimalInterface,
        sampleAssetAddress,
      );

      // Fetch the encoded contract data
      return await digitalAsset.methods.getData(key).call();
    }
    // New interface
    if (assetInterfaceID === 'new') {
      // Instanciate ERC725 smart contract
      const digitalAsset = new web3.eth.Contract(
        ERC725MinimalInterface,
        sampleAssetAddress,
      );

      // Key for the metadata
      let keyArray = [key];

      // Fetch the encoded contract data
      return await digitalAsset.methods.getData(keyArray).call();
    }
  } catch (error) {
    return console.log('Data of assets address could not be loaded');
  }
}

// Debug
getAssetData(MetaDataKey).then((encodedData) => console.log(encodedData));
```

## Step 5 - Decode the asset data

We can now decode the encoded metadata to fetch readable information. We use the
`erc725.js` library with its decoding functionality. While using ERC725, we will have
to declare an config and provider like we did on [reading profile data](./read-profile-data).

```bash
npm install @erc725/erc725.js
```

```javascript title="read_assets.js"
...
// Import ERC725
const { ERC725 } = require('@erc725/erc725.js');

// ERC725 Properties
const provider = new Web3.providers.HttpProvider(
  'https://rpc.l14.lukso.network',
);

const config = {
  ipfsGateway: 'https://ipfs.lukso.network/ipfs/',
};

// Content Phrases
const decodeNamePhrase = LSP4schema[1].name;
const decodeTokenPhrase = LSP4schema[2].name;
const decodeMetaPhrase = LSP4schema[3].name;
const decodeCreatorPhrase = LSP4schema[4].name;

/*
 * Decode value from ERC725Y storage
 * based on it's key and phrase
 *
 * @returns: string of decoded data
 */
async function decodeData(key, decodePhrase) {
  try {
    let encodedData = await getAssetData(key);
    // Instance of the LSP4 with ERC725.js
    const erc725 = new ERC725(LSP4schema, sampleAssetAddress, provider, config);
    // Decode the assets data
    return erc725.decodeData({ [decodePhrase]: encodedData });
  } catch (error) {
    console.log('Data of an asset could not be decoded');
  }
}

// Debug
decodeData(MetaDataKey, decodeMetaPhrase).then((decodedData) =>
  console.log(decodedData),
);
```

The [LSP4 Digital Asset Metadata](../../standards/nft-2.0/LSP4-Digital-Asset-Metadata) will resolve in a following JSON structure:

<details>
    <summary>Show JSON response</summary>

```json
{
  "LSP4Metadata": {
    "hashFunction": "keccak256(utf8)",
    "hash": "0x...",
    "url": "..."
  }
}
```

</details>

## Step 6 - Create the storage link

To fetch the data for the previously decoded metadata, we can access the JSON file and change the URL to access its properties. If you use browser environments like `ReactJS` or `VueJS`, you may not need this library.

:::info
Profiles created on [universalprofile.cloud](https://universalprofile.cloud/) are currently using [IPFS](https://ipfs.io/). Therefore, we will use a static IPFS link for the guide. You can change it or even make distinctions, if there are several storage solutions.
:::

```javascript title="read_assets.js"
...
// Link to storage
const sampleStorageURL = "https://ipfs.lukso.network/ipfs/";

/*
 * Create a fetchable link for the asset data
 * that was embeded into the JSON metadata
 *
 * @returns: string of asset data URL
 */
async function getMetaDataLink() {
  let decodedData = await decodeData(MetaDataKey, decodeMetaPhrase);
  // Generate IPFS link from decoded metadata
  return (
    sampleStorageURL +
    decodedData.LSP4Metadata.url.substring(7)
  );
}

// Debug
getMetaDataLink().then((dataURL) => console.log(dataURL));
```

## Step 7 - Get the asset data

The created storage link can now be accessed trough a simple URL call. We use `isomorphic-fetch` to fetch the HTTP response from the asset URL while using `node`. You may not need this library if you use browser environments like `ReactJS` or `VueJS`.

```shell
npm install isomorphic-fetch
```

```javascript title="read_assets.js"
...
// Import
require('isomorphic-fetch');

/*
 * Fetch the asset data from a link
 *
 * @returns: string with asset data as JSON
 */
async function fetchAssetData() {
  let dataURL = await getMetaDataLink();
  try {
    const response = await fetch(dataURL);
    return await response.json();
  } catch (error) {
    console.log('JSON data of IPFS link could not be fetched');
  }
}
// Debug
fetchAssetData().then((assetJSON) => console.log(assetJSON));
```

For fetching metadata, the JSON file will have the following structure:

<details>
    <summary>Show JSON response</summary>

```json
{
  "LSP4Metadata": {
    "description": "...",
    "links": [],
    "images": [
      [
        {
          "width": 1512,
          "height": 1998,
          "hashFunction": "keccak256(bytes)",
          "hash": "0x...",
          "url": "..."
        },
        ...
      ]
    ],
    "assets": [
      {
        "hash": "0x...",
        "hashFunction": "keccak256(bytes)",
        "fileType": "...",
        "url": "..."
      }
    ]
  }
}
```

</details>

## Step 8 - Fetch the asset's properties

After receiving the asset data, we can fetch the JSON for its properties in the following way:

```javascript title="read_assets.js"
...
// Fetchable picture information
let baseURL = 'https://ipfs.lukso.network/ipfs/';

let assetImageLinks = [];
let fullSizeAssetImage;
let assetDescription;

/*
 * Read properties of an asset
 */
async function getAssetProperties() {
  let assetJSON = await fetchAssetData();
  let assetImageData = [];

  try {
    assetImageData = assetJSON.LSP4Metadata.images;
    for (let i in assetImageData[0]) {
      assetImageLinks.push([i, baseURL + assetImageData[0][i].url]);
    }
    fullSizeAssetImage = assetImageLinks[0][1];

    assetDescription = assetJSON.LSP4Metadata.description;

    console.log('Asset Description ' + assetDescription);
    console.log('Full Size Asset Image Link: ' + fullSizeAssetImage + '\n');
    console.log(
      'Asset Image Links: ' +
        JSON.stringify(assetImageLinks, undefined, 2) +
        '\n',
    );
  } catch (error) {
    console.log('Could not fetch all asset properties');
  }
}

// Debug
getAssetProperties();
```

## Final Code

Below is the complete code snippet of this guide, with all the steps compiled together.

```javascript title="read_assets.js"
// Import and Setup
const Web3 = require('web3');
const web3 = new Web3('https://rpc.l14.lukso.network');
const { ERC725 } = require('@erc725/erc725.js');
require('isomorphic-fetch');

// Our static sample addresses
const sampleUniversalReceiver = '0x50a02ef693ff6961a7f9178d1e53cc8bbe1dad68';
const sampleProfileAddress = '0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e';
const sampleAssetAddress = '0xc444009d38d3046bb0cF81Fa2Cd295ce46A67C78';
const sampleStorageURL = 'https://ipfs.lukso.network/ipfs/';

// ABIs
const lsp1MinimalInterface = [
  {
    inputs: [],
    name: 'getAllRawValues',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const lsp8MinimalInterface = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenOwner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const ERC725YLagacyMinimalInterface = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_keys',
        type: 'bytes32',
      },
    ],
    name: 'getData',
    outputs: [
      {
        internalType: 'bytes',
        name: 'values',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const ERC725MinimalInterface = [
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: '_keys',
        type: 'bytes32[]',
      },
    ],
    name: 'getData',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'values',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const LSP4schema = [
  {
    name: 'SupportedStandards:LSP4DigitalCertificate',
    key: '0xeafec4d89fa9619884b6b89135626455000000000000000000000000abf0613c',
    keyType: 'Mapping',
    valueContent: '0xabf0613c',
    valueType: 'bytes',
  },
  {
    name: 'LSP4TokenName',
    key: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',
    keyType: 'Singleton',
    valueContent: 'String',
    valueType: 'string',
  },
  {
    name: 'LSP4TokenSymbol',
    key: '0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756',
    keyType: 'Singleton',
    valueContent: 'String',
    valueType: 'string',
  },
  {
    name: 'LSP4Metadata',
    key: '0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e',
    keyType: 'Singleton',
    valueContent: 'JSONURL',
    valueType: 'bytes',
  },
  {
    name: 'LSP4Creators[]',
    key: '0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7',
    keyType: 'Array',
    valueContent: 'Number',
    valueType: 'uint256',
    elementValueContent: 'Address',
    elementValueType: 'address',
  },
];

const InterfaceID = [
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    name: 'supportsInterface',
    inputs: [
      {
        type: 'bytes4',
        name: 'interfaceId',
        internalType: 'bytes4',
      },
    ],
  },
];

// Keys for properties
const TokenNameKey = LSP4schema[1].key;
const TokenSymbolKey = LSP4schema[2].key;
const MetaDataKey = LSP4schema[3].key;
const CreatorsKey = LSP4schema[4].key;

// Content Phrases
const decodeNamePhrase = LSP4schema[1].name;
const decodeTokenPhrase = LSP4schema[2].name;
const decodeMetaPhrase = LSP4schema[3].name;
const decodeCreatorPhrase = LSP4schema[4].name;

// ERC725 Properties
const provider = new Web3.providers.HttpProvider(
  'https://rpc.l14.lukso.network',
);

const config = {
  ipfsGateway: 'https://ipfs.lukso.network/ipfs/',
};

// Fetchable picture information
let baseURL = 'https://ipfs.lukso.network/ipfs/';

let assetImageLinks = [];
let fullSizeAssetImage;
let assetDescription;

/*
 * Return array of blockchain addresses of
 * assets, that were received by the
 * Univeral Profile holder.
 *
 * @returns: array of asset addresses
 */
async function getAssetAddressses() {
  const AddressStore = new web3.eth.Contract(
    lsp1MinimalInterface,
    sampleUniversalReceiver,
  );

  let rawValues = [];

  try {
    // Fetch all raw values
    rawValues = await AddressStore.methods.getAllRawValues().call();
  } catch (error) {
    return console.log('Data from universal receiver could not be loaded');
  }

  let digitalAssets = [];

  // Retrieve addresses
  for (let i = 0; i < rawValues.length; i++) {
    digitalAssets[i] = web3.utils.toChecksumAddress(rawValues[i].substr(26));
  }
  return digitalAssets;
}

/*
 * Return array of blockchain addresses
 * of assets that are owned by the
 * Univeral Profile.
 *
 * @returns: array of asset addresses
 */
async function getOwnedAddresses(owner) {
  let digitalAssets = await getAssetAddressses();
  let ownedAssets = [];

  for (let i = 0; i < digitalAssets.length; i++) {
    let isCurrentOwner;

    // Create instance of the asset to check owner balance
    const assetContract = new web3.eth.Contract(
      lsp8MinimalInterface,
      digitalAssets[i],
    );

    isCurrentOwner = await assetContract.methods.balanceOf(owner).call();
    if (isCurrentOwner > 0) {
      ownedAssets[ownedAssets.length] = digitalAssets[i];
    }
  }
  return ownedAssets;
}

/*
 * Check the interface of an
 * asset's smart contract
 *
 * @returns: string of interface type
 */
async function checkAssetInterface(address) {
  // Create instance of the contract which has to be queried
  const AssetContract = new web3.eth.Contract(InterfaceID, address);

  // Storing type of interface standard
  let standard;

  // Old version's hash of ERC725Y
  const erc725YLegacy = '0x2bd57b73';
  let isERC725YLegacy = false;

  // Check if the contract is an old key-value store
  try {
    isERC725YLegacy = await AssetContract.methods
      .supportsInterface(erc725YLegacy)
      .call();
  } catch (error) {
    return console.log('Address could not be checked for lagacy interface');
  }

  // New version's hash of ERC725Y
  const erc725Y = '0x5a988c0f';
  let isERC725Y = false;

  // Check if the contract is an old key-value store
  try {
    isERC725Y = await AssetContract.methods.supportsInterface(erc725Y).call();
  } catch (error) {
    return console.log('Address could not be checked for interface');
  }

  // Update standard variable
  if (isERC725YLegacy) {
    standard = 'old';
  }
  if (isERC725Y) {
    standard = 'new';
  }

  return standard;
}

/*
 * Fetch the dataset of an asset
 * from the Universal Profile
 *
 * @returns: string of encoded data
 */
async function getAssetData(key) {
  // Check if asset is ERC725Lagacy or ERC725
  let assetInterfaceID = await checkAssetInterface(sampleAssetAddress);

  try {
    // Old interface
    if (assetInterfaceID === 'old') {
      // Instanciate ERC725Lagacy smart contract
      const digitalAsset = new web3.eth.Contract(
        ERC725YLagacyMinimalInterface,
        sampleAssetAddress,
      );

      // Fetch the encoded contract data
      return await digitalAsset.methods.getData(key).call();
    }
    // New interface
    if (assetInterfaceID === 'new') {
      // Instanciate ERC725 smart contract
      const digitalAsset = new web3.eth.Contract(
        ERC725MinimalInterface,
        sampleAssetAddress,
      );

      // Key for the metadata
      let keyArray = [key];

      // Fetch the encoded contract data
      return await digitalAsset.methods.getData(keyArray).call();
    }
  } catch (error) {
    return console.log('Data of assets address could not be loaded');
  }
}

/*
 * Decode value from ERC725Y storage
 * based on it's key and phrase
 *
 * @returns: string of decoded data
 */
async function decodeData(key, decodePhrase) {
  try {
    let encodedData = await getAssetData(key);
    // Instance of the LSP4 with ERC725.js
    const erc725 = new ERC725(LSP4schema, sampleAssetAddress, provider, config);
    // Decode the assets data
    return erc725.decodeData({ [decodePhrase]: encodedData });
  } catch (error) {
    console.log('Data of an asset could not be decoded');
  }
}

/*
 * Create a fetchable link for the asset data
 * that was embeded into the JSON metadata
 *
 * @returns: string of asset data URL
 */
async function getMetaDataLink() {
  let decodedData = await decodeData(MetaDataKey, decodeMetaPhrase);
  // Generate IPFS link from decoded metadata
  return sampleStorageURL + decodedData.LSP4Metadata.url.substring(7);
}

/*
 * Fetch the asset data from a link
 *
 * @returns: string with asset data as JSON
 */
async function fetchAssetData() {
  let dataURL = await getMetaDataLink();
  try {
    const response = await fetch(dataURL);
    return await response.json();
  } catch (error) {
    console.log('JSON data of IPFS link could not be fetched');
  }
}

/*
 * Read properties of an asset
 */
async function getAssetProperties() {
  let assetJSON = await fetchAssetData();
  let assetImageData = [];

  try {
    assetImageData = assetJSON.LSP4Metadata.images;
    for (let i in assetImageData[0]) {
      assetImageLinks.push([i, baseURL + assetImageData[0][i].url]);
    }
    fullSizeAssetImage = assetImageLinks[0][1];

    assetDescription = assetJSON.LSP4Metadata.description;

    console.log('Asset Description ' + assetDescription);
    console.log('Full Size Asset Image Link: ' + fullSizeAssetImage + '\n');
    console.log(
      'Asset Image Links: ' +
        JSON.stringify(assetImageLinks, undefined, 2) +
        '\n',
    );
  } catch (error) {
    console.log('Could not fetch all asset properties');
  }
}

// Debug Step 1
getAssetAddressses().then((digitalAssets) => console.log(digitalAssets));

// Debug Step 2
getOwnedAddresses(sampleProfileAddress).then((ownedAssets) =>
  console.log(ownedAssets),
);

// Debug Step 3
getAssetData(MetaDataKey).then((encodedData) => console.log(encodedData));

// Debug Step 4
checkAssetInterface(sampleAssetAddress).then((standard) =>
  console.log(standard),
);

// Debug Step 5
decodeData(MetaDataKey, decodeMetaPhrase).then((decodedData) =>
  console.log(decodedData),
);

// Debug Step 6
getMetaDataLink().then((dataURL) => console.log(dataURL));

// Debug Step 7
fetchAssetData().then((assetJSON) => console.log(assetJSON));

// Debug Step 8
getAssetProperties();
```
