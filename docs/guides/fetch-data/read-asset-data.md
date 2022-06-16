---
sidebar_label: 'Read Asset Data'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read Asset Data

In this guide, we will learn how to:

- get all assets ever received by a profile.
- get all assets ever issued by a profile.
- fetch the data of all owned assets.

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('./img/example-asset.png').default}
    alt="Asset example on universalprofile.cloud"
  />
<br/>
<i>The <a href="https://universalprofile.cloud/asset/0xbD14F48DDDe851b812D95431906E629fb9514Db4">Lambada Dyed Red White Blue</a> asset as seen on UniversalProfile.cloud</i>
</div>

We will use:

- [web3.js](https://web3js.readthedocs.io/en/v1.7.0/) for utility as well as connecting to the LUKSO L14 network.
- [erc725.js](../../tools/erc725js/getting-started/) library to check the interface of a profile.
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) to enable you to use `fetch()` in Node.js code.
- [lsp-smart-contracts](https://github.com/lukso-network/lsp-smart-contracts) to integrate the ABIs for the LUKSO Standards.

## Setup

Open a terminal in the project's folder of your choice and install all required libraries.

```shell
npm install web3 @erc725/erc725.js isomorphic-fetch @lukso/lsp-smart-contracts
```
:::success Recommendation
Complete "ready to use" JSON and JS files are available at the end in the [**Final Code**](#final-code) section.
:::

## Step 1 - Get all assets ever received

<Tabs>
  <TabItem value="Current Standard" label="Current Standard">

In the [previous guide](./read-profile-data), we learned how to read the Universal Profile properties and use the key names within the `fetchData()` function of the [erc725.js](../../tools/erc725js/getting-started/) library.  In the same way, we can now fetch all ever received assets using `fetchData('LSP5ReceivedAssets[]')`.

```javascript title="read_assets.js"
// Import and Network Setup
const Web3 = require("web3");
const { ERC725 } = require("@erc725/erc725.js");
require("isomorphic-fetch");

// Our static variables
const SAMPLE_PROFILE_ADDRESS = "0x0Ac71c67Fa5E4c9d4af4f99d7Ad6132936C2d6A3";
const RPC_ENDPOINT = "https://rpc.l14.lukso.network";
const IPFS_GATEWAY = "https://cloudflare-ipfs.com/ipfs/";

// Parameters for ERC725 Instance
const erc725schema = require("@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json");
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = { ipfsGateway: IPFS_GATEWAY };
/*
 * Fetch the @param's Universal Profile's
 * LSP5 data
 *
 * @param address of Universal Profile
 * @return string JSON or custom error
 */
async function fetchReceivedAssets(address) {
  try {
    const profile = new ERC725(erc725schema, address, provider, config);
    return await (
      await profile.fetchData("LSP5ReceivedAssets[]")
    ).value;
  } catch (error) {
    return console.log("This is not an ERC725 Contract");
  }
}

// Debug
fetchReceivedAssets(SAMPLE_PROFILE_ADDRESS).then((profileData) =>
  console.log(JSON.stringify(profileData, undefined, 2))
);
```

  </TabItem>

  <TabItem value="Legacy Standard" label="Legacy Standard">

In the [previous guide](./read-profile-data), we learned how to read the Universal Profile properties and use the key names within the `fetchData()` function of the [erc725.js](../../tools/erc725js/getting-started/) library. In the same way, we can now fetch the address of the [Universal Receiver](../../standards/generic-standards/lsp1-universal-receiver/) by using `fetchData("LSP1UniversalReceiverDelegate")`.

```javascript title="read_assets.js"
// Import and Network Setup
const Web3 = require("web3");
const { ERC725 } = require("@erc725/erc725.js");
require("isomorphic-fetch");

// Our static variables
const SAMPLE_PROFILE_ADDRESS = "0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e";
const RPC_ENDPOINT = "https://rpc.l14.lukso.network";
const IPFS_GATEWAY = "https://cloudflare-ipfs.com/ipfs/";

// Parameters for ERC725 Instance
const erc725schema = require("@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json");
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = { ipfsGateway: IPFS_GATEWAY };
/*
 * Fetch the @param's Universal Profile's
 * LSP5 data
 *
 * @param address of Universal Profile
 * @return Universal Receiver address or custom error
 */
async function fetchUniversalReceiver(address) {
  try {
    const profile = new ERC725(erc725schema, address, provider, config);
    return await (
      await profile.fetchData("LSP1UniversalReceiverDelegate")
    ).value;
  } catch (error) {
    return console.log("This is not an ERC725 Contract");
  }
}

// Debug
fetchUniversalReceiver(SAMPLE_PROFILE_ADDRESS).then((profileData) =>
  console.log(JSON.stringify(profileData, undefined, 2))
);
```

After we got the Universal Receiver address, we can now receive an array of assets from it by calling the `getAllRawValues()` function.

<details>
    <summary>LSP1 Minimal JSON Interface</summary>

```json title="legacy_lsp1_interface.min.json"
[
  {
    "inputs": [],
    "name": "getAllRawValues",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
```

</details>

```javascript title="read_assets.js"
// ...

// ABI for the Universal Receiver
const LSP1MinimalInterface = require("./lsp1_minimal_interface.json");
const web3 = new Web3("https://rpc.l14.lukso.network");

/*
 * Return array of blockchain addresses of
 * assets, that were received by the
 * Univeral Profile holder.
 *
 * @return address[] of assets
 */
async function fetchReceivedAssets() {
  const receiverAddress = new web3.eth.Contract(
    LSP1MinimalInterface,
    await fetchUniversalReceiver(SAMPLE_PROFILE_ADDRESS)
  );

  let rawValues = [];

  try {
    // Fetch all raw values
    rawValues = await receiverAddress.methods.getAllRawValues().call();
  } catch (error) {
    return console.log("Data from universal receiver could not be loaded");
  }

  const receivedAssets = [];

  // Retrieve addresses
  for (let i = 0; i < rawValues.length; i++) {
    receivedAssets[i] = web3.utils.toChecksumAddress(rawValues[i].substr(26));
  }
  return receivedAssets;
}

// Debug
fetchReceivedAssets().then((receivedAssets) => console.log(receivedAssets));
```
  </TabItem>
</Tabs>

## Step 2 - Check ownership of assets

After trimming out the asset addresses, we can check which assets are owned by the Universal Profile. We can do this by comparing the balances of the assets within the receiver contract. If the `balance` is greater than zero, the asset is still owned by the address.

:::info Difference between Token Ownership

- For [LSP7](../../standards/nft-2.0/LSP7-Digital-Asset.md), you will get back the amount of tokens you own.
- For [LSP8](../../standards/nft-2.0/LSP8-Identifiable-Digital-Asset.md), you will get back the number of NFTs you own (without knowing which specific tokenId you own).

:::

<Tabs>
  <TabItem value="Current Standard" label="Current Standard">

```javascript title="read_assets.js"
// ...

// ABI for the asset
const LSP8 = require("@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json");
const web3 = new Web3("https://rpc.l14.lukso.network");

/*
 * Return array of blockchain addresses
 * of assets that are owned by the
 * Univeral Profile.
 *
 * @param owner Universal Profile address
 * @return address[] of owned assets
 */
async function fetchOwnedAssets(owner) {
  const digitalAssets = await fetchReceivedAssets(SAMPLE_PROFILE_ADDRESS);
  const ownedAssets = [];

  for (let i = 0; i < digitalAssets.length; i++) {
    // Create instance of the asset to check owner balance
    const LSP8Contract = new web3.eth.Contract(LSP8.abi, digitalAssets[i]);

    const isCurrentOwner = await LSP8Contract.methods.balanceOf(owner).call();
    if (isCurrentOwner > 0) {
      ownedAssets[ownedAssets.length] = digitalAssets[i];
    }
  }
  return ownedAssets;
}

// Debug
fetchOwnedAssets(SAMPLE_PROFILE_ADDRESS).then((ownedAssets) =>
  console.log(ownedAssets)
);
```

</TabItem>
<TabItem value="Legacy Standard" label="Legacy Standard">

```javascript title="read_assets.js"
// ...

// ABI for the asset
const LSP8 = require("@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json");

/*
 * Return array of blockchain addresses
 * of assets that are owned by the
 * Univeral Profile.
 *
 * @param owner Universal Profile address
 * @return address[] of owned assets
 */
async function fetchOwnedAssets(owner) {
  const digitalAssets = await fetchReceivedAssets(SAMPLE_PROFILE_ADDRESS);
  const ownedAssets = [];

  for (let i = 0; i < digitalAssets.length; i++) {
    // Create instance of the asset to check owner balance
    const LSP8Contract = new web3.eth.Contract(LSP8.abi, digitalAssets[i]);

    const isCurrentOwner = await LSP8Contract.methods.balanceOf(owner).call();
    if (isCurrentOwner > 0) {
      ownedAssets[ownedAssets.length] = digitalAssets[i];
    }
  }
  return ownedAssets;
}

// Debug
fetchOwnedAssets(SAMPLE_PROFILE_ADDRESS).then((ownedAssets) =>
  console.log(ownedAssets)
);
```

</TabItem>
</Tabs>

## Step 3 - Check the type of an asset

Now that we have retrieved all the owned assets, we need to check which interface is behind these smart contract addresses, to get their data.

UniversalProfile contracts on the [profile explorer](https://universalprofile.cloud/) on the LUKSO L14 test network have been deployed using different `ERC725Y` interfaces. We have to know which interface to use, to assure the right interaction and bypass errors.

<Tabs>
  
  <TabItem value="Current Standards" label="Current Standards">

:::info

By using [function overloading], the `ERC725Y` interface function `getData(...)` can accept:

- either one key: `getData(key)` to fetch a single value.
- or an array of keys: `getData(keys[])` to fetch multiple values at once.

:::

<details>
  <summary>Asset JSON Interface</summary>

```json title="asset_interface.json"
[
  {
    "type": "function",
    "stateMutability": "view",
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "name": "supportsInterface",
    "inputs": [
      {
        "type": "bytes4",
        "name": "interfaceId",
        "internalType": "bytes4"
      }
    ]
  }
]
```

</details>

```javascript title="read_assets.js"
// ...
const SAMPLE_ASSET_ADDRESS = '0xc444009d38d3046bb0cF81Fa2Cd295ce46A67C78';

const AssetInterface = require('./asset_interface.json');

/*
 * Check the interface of an asset's smart contract
 *
 * @param address of asset
 * @return boolean - if the address supports ERC725Y or false if it doesn't
 */
async function checkErc725YInterfaceId(address) {
  // Create instance of the contract which has to be queried
  const Contract = new web3.eth.Contract(AssetInterface, address);

  const ERC725Y_INTERFACE_ID = '0x714df77c';

  let interfaceCheck = false;

  // Check if the contract has a key-value store
  try {
    interfaceChecks.isERC725 = await Contract.methods
      .supportsInterface(ERC725Y_INTERFACE_ID)
      .call();
  } catch (error) {
    console.log(error.message);
    console.log('Address could not be checked for ERC725 interface');
    return;
  }

  return interfaceCheck;
}

// Debug
checkErc725YInterfaceId(SAMPLE_ASSET_ADDRESS).then((standard) =>
  console.log(standard),
);
```

  </TabItem>

  <TabItem value="Current & Legacy Standards" label="Current & Legacy Standards">

:::info Depending on the interface, the function accepts different parameters.

- in the **legacy** `ERC725Y` interface, `getData(...)` only takes a single key: `getData(key)`.
- in the **current** `ERC725Y` interface, `getData(...)` uses [function overloading] and can accept:
  - either one key: `getData(key)` to fetch a single value,
  - or an array of keys: `getData(keys[])` to fetch multiple values at once.

:::

<details>
  <summary>Asset JSON Interface</summary>

```json title="asset_interface.json"
[
  {
    "type": "function",
    "stateMutability": "view",
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "name": "supportsInterface",
    "inputs": [
      {
        "type": "bytes4",
        "name": "interfaceId",
        "internalType": "bytes4"
      }
    ]
  }
]
```

</details>

```javascript title="read_assets.js"
// ...
const SAMPLE_ASSET_ADDRESS = '0xc444009d38d3046bb0cF81Fa2Cd295ce46A67C78';

const AssetInterface = require('./asset_interface.json');

/*
 * Check the interface of an
 * asset's smart contract
 *
 * @param address of asset
 * @return object of interface types
 */
async function checkErc725YInterfaceId(address) {
  // Create instance of the contract which has to be queried
  const Contract = new web3.eth.Contract(AssetInterface, address);

  const interfaceIds = {
    erc725Legacy: '0x2bd57b73',
    erc725: '0x714df77c',
  };

  let interfaceChecks = {
    isERC725Legacy: false,
    isERC725: false,
  };

  // Check if the contract is a legacy key-value store interface
  try {
    interfaceChecks.isERC725Legacy = await Contract.methods
      .supportsInterface(interfaceIds.erc725Legacy)
      .call();
  } catch (error) {
    return console.log('Address could not be checked for legacy interface');
  }

  // Check if the contract is a current key-value store interface
  try {
    interfaceChecks.isERC725 = await Contract.methods
      .supportsInterface(interfaceIds.erc725)
      .call();
  } catch (error) {
    return console.log('Address could not be checked for interface');
  }

  return interfaceChecks;
}

checkErc725YInterfaceId(SAMPLE_ASSET_ADDRESS).then((standard) =>
  console.log(standard),
);
```

  </TabItem>
</Tabs>

## Step 4 - Receive the encoded asset data


Now we can safely call the data of the address. The [LSP4](../../standards/nft-2.0/LSP4-Digital-Asset-Metadata) data is saved in a ERC725Y key-value store, and we need to input the right key to fetch the associated value. There are multiple keys for different properties. To give a showcase, we will use the metadata key to receive the associated data.

<Tabs>

  <TabItem value="Current Standards" label="Current Standards">

<details>
    <summary>LSP4 JSON Schema</summary>

```json title="lsp4_schema.json"
[
  {
    "name": "SupportedStandards:LSP4DigitalCertificate",
    "key": "0xeafec4d89fa9619884b6b89135626455000000000000000000000000abf0613c",
    "keyType": "Mapping",
    "valueContent": "0xabf0613c",
    "valueType": "bytes"
  },
  {
    "name": "LSP4TokenName",
    "key": "0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1",
    "keyType": "Singleton",
    "valueContent": "String",
    "valueType": "string"
  },
  {
    "name": "LSP4TokenSymbol",
    "key": "0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756",
    "keyType": "Singleton",
    "valueContent": "String",
    "valueType": "string"
  },
  {
    "name": "LSP4Metadata",
    "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
    "keyType": "Singleton",
    "valueContent": "JSONURL",
    "valueType": "bytes"
  },
  {
    "name": "LSP4Creators[]",
    "key": "0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7",
    "keyType": "Array",
    "valueContent": "Number",
    "valueType": "uint256",
    "elementValueContent": "Address",
    "elementValueType": "address"
  }
]
```

</details>

```javascript title="read_assets.js"
// ...
// ABI's
const ERC725ABI = require('@erc725/smart-contracts/artifacts/ERC725.json');
const LSP4schema = require('./lsp4_schema.json');

// Keys for properties
const TokenNameKey = LSP4schema[1].key;
const TokenSymbolKey = LSP4schema[2].key;
const MetaDataKey = LSP4schema[3].key;
const CreatorsKey = LSP4schema[4].key;

/*
 * Fetch the dataset of an asset
 * from the Universal Profile
 *
 * @param key of asset property
 * @return string of encoded data
 */
async function getAssetData(key) {
  // Check if asset is ERC725Legacy or ERC725
  let assetInterfaceID = await checkErc725YInterfaceId(SAMPLE_ASSET_ADDRESS);

  try {
    if (assetInterfaceID === true) {
      // Instanciate ERC725 smart contract
      const digitalAsset = new web3.eth.Contract(
        ERC725ABI,
        SAMPLE_ASSET_ADDRESS,
      );

      // Fetch the encoded contract data
      return await digitalAsset.methods['getData(bytes32)'](key).call();
    }
  } catch (error) {
    return console.log('Data of assets address could not be loaded');
  }
}

// Debug
getAssetData(MetaDataKey).then((encodedData) => console.log(encodedData));
```

  </TabItem>
  
  <TabItem value="Current & Legacy Standards" label="Current & Legacy Standards">

<details>
    <summary>ERC725 Legacy JSON Interface</summary>

```json title="erc725_legacy_interface.json"
[
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_keys",
        "type": "bytes32"
      }
    ],
    "name": "getData",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "values",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
```

</details>

<details>
    <summary>LSP4 JSON Schema</summary>

```json title="lsp4_schema.json"
[
  {
    "name": "SupportedStandards:LSP4DigitalCertificate",
    "key": "0xeafec4d89fa9619884b6b89135626455000000000000000000000000abf0613c",
    "keyType": "Mapping",
    "valueContent": "0xabf0613c",
    "valueType": "bytes"
  },
  {
    "name": "LSP4TokenName",
    "key": "0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1",
    "keyType": "Singleton",
    "valueContent": "String",
    "valueType": "string"
  },
  {
    "name": "LSP4TokenSymbol",
    "key": "0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756",
    "keyType": "Singleton",
    "valueContent": "String",
    "valueType": "string"
  },
  {
    "name": "LSP4Metadata",
    "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
    "keyType": "Singleton",
    "valueContent": "JSONURL",
    "valueType": "bytes"
  },
  {
    "name": "LSP4Creators[]",
    "key": "0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7",
    "keyType": "Array",
    "valueContent": "Number",
    "valueType": "uint256",
    "elementValueContent": "Address",
    "elementValueType": "address"
  }
]
```

</details>

```javascript title="read_assets.js"
// ...
// ABI's
const ERC725LegacyInterface = require('./erc725_legacy_interface.json');
const ERC725ABI = require('@erc725/smart-contracts/artifacts/ERC725.json');
const LSP4schema = require('./lsp4_schema.json');

// Keys for properties
const TokenNameKey = LSP4schema[1].key;
const TokenSymbolKey = LSP4schema[2].key;
const MetaDataKey = LSP4schema[3].key;
const CreatorsKey = LSP4schema[4].key;

/*
 * Fetch the dataset of an asset
 * from the Universal Profile
 *
 * @param key of asset property
 * @return string of encoded data
 */
async function getAssetData(key) {
  // Check if asset is ERC725Legacy or ERC725
  let assetInterfaceIDs = await checkErc725YInterfaceId(SAMPLE_ASSET_ADDRESS);

  try {
    // Legacy interface
    if (assetInterfaceIDs.isERC725Legacy === true) {
      // Instanciate ERC725Legacy smart contract
      const digitalAsset = new web3.eth.Contract(
        ERC725LegacyInterface,
        SAMPLE_ASSET_ADDRESS,
      );

      // Fetch the encoded contract data
      return await digitalAsset.methods.getData(key).call();
    }
    // Current interface
    if (assetInterfaceIDs.isERC725 === true) {
      // Instanciate ERC725 smart contract
      const digitalAsset = new web3.eth.Contract(
        ERC725ABI,
        SAMPLE_ASSET_ADDRESS,
      );

      // Fetch the encoded contract data
      return await digitalAsset.methods['getData(bytes32)'](key).call();
    }
  } catch (error) {
    return console.log('Data of assets address could not be loaded');
  }
}

// Debug
getAssetData(MetaDataKey).then((encodedData) => console.log(encodedData));
```

  </TabItem>

</Tabs>

## Step 5 - Decode the asset data

We can now decode the encoded metadata to fetch readable information. We use
`decodeData()` from the `erc725.js` library. While using ERC725, we will have
to declare a config and provider as we did while [reading profile data](./read-profile-data).

```javascript title="read_assets.js"
// ...
// Import ERC725
const { ERC725 } = require('@erc725/erc725.js');

// Link to storage
const IPFS_GATEWAY_URL = 'https://ipfs.lukso.network/ipfs/';

// ERC725 Properties
const provider = new Web3.providers.HttpProvider(
  'https://rpc.l14.lukso.network',
);

const config = {
  ipfsGateway: IPFS_GATEWAY_URL,
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
 * @param key of asset property
 * @param decodePhrase string of fetchable content
 * @return string of decoded data
 */
async function decodeData(key, decodePhrase) {
  try {
    let encodedData = await getAssetData(key);
    // Instance of the LSP4 with ERC725.js
    const erc725 = new ERC725(
      LSP4schema,
      SAMPLE_ASSET_ADDRESS,
      provider,
      config,
    );
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

To fetch the data for the previously decoded metadata, we can access the JSON file and change the URL to access its properties. You may not need this library if you use browser environments like `ReactJS` or `VueJS`.

:::info
Profiles created on the [profile explorer](https://universalprofile.cloud/) currently use IPFS. Therefore, we will use a static IPFS link for the guide. If there are several storage solutions, you can change them or make distinctions.
:::

```javascript title="read_assets.js"
// ...

/*
 * Create a fetchable link for the asset data
 * that was embeded into the JSON metadata
 *
 * @return string of asset data URL
 */
async function getMetaDataLink() {
  try {
    let decodedData = await decodeData(MetaDataKey, decodeMetaPhrase);
    // Generate IPFS link from decoded metadata
    return IPFS_GATEWAY_URL + decodedData.LSP4Metadata.url.substring(7);
  } catch (error) {
    console.log('URL could not be fetched');
  }
}

// Debug
getMetaDataLink().then((dataURL) => console.log(dataURL));
```

## Step 7 - Get the asset data

We can now access the created storage link through a simple URL call and are using `isomorphic-fetch` to read the HTTP response from the asset URL in our `node` environment.

:::note
You may not need the `isomorphic-fetch` library if you use browser environments like `ReactJS` or `VueJS`.
:::

```javascript title="read_assets.js"
// ...
// Import
require('isomorphic-fetch');

/*
 * Fetch the asset data from a link
 *
 * @return string with asset data as JSON
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
// ...

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
      assetImageLinks.push([i, IPFS_GATEWAY_URL + assetImageData[0][i].url]);
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

<Tabs>
  
  <TabItem value="Current Standards" label="Current Standards">

<details>
    <summary>LSP1 Minimal JSON Interface</summary>

```json title="lsp1_minimal_interface.json"
[
  {
    "inputs": [],
    "name": "getAllRawValues",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
```

</details>

<details>
    <summary>Asset JSON Interface</summary>

```json title="asset_interface.json"
[
  {
    "type": "function",
    "stateMutability": "view",
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "name": "supportsInterface",
    "inputs": [
      {
        "type": "bytes4",
        "name": "interfaceId",
        "internalType": "bytes4"
      }
    ]
  }
]
```

</details>

<details>
    <summary>LSP4 JSON Schema</summary>

```json title="lsp4_schema.json"
[
  {
    "name": "SupportedStandards:LSP4DigitalCertificate",
    "key": "0xeafec4d89fa9619884b6b89135626455000000000000000000000000abf0613c",
    "keyType": "Mapping",
    "valueContent": "0xabf0613c",
    "valueType": "bytes"
  },
  {
    "name": "LSP4TokenName",
    "key": "0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1",
    "keyType": "Singleton",
    "valueContent": "String",
    "valueType": "string"
  },
  {
    "name": "LSP4TokenSymbol",
    "key": "0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756",
    "keyType": "Singleton",
    "valueContent": "String",
    "valueType": "string"
  },
  {
    "name": "LSP4Metadata",
    "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
    "keyType": "Singleton",
    "valueContent": "JSONURL",
    "valueType": "bytes"
  },
  {
    "name": "LSP4Creators[]",
    "key": "0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7",
    "keyType": "Array",
    "valueContent": "Number",
    "valueType": "uint256",
    "elementValueContent": "Address",
    "elementValueType": "address"
  }
]
```

</details>

```javascript title="read_assets.js"
// Import and Setup
const Web3 = require('web3');
const web3 = new Web3('https://rpc.l14.lukso.network');
const { ERC725 } = require('@erc725/erc725.js');
require('isomorphic-fetch');

// Our static sample addresses
const SAMPLE_UNIVERSAL_RECEIVER = '0x50a02ef693ff6961a7f9178d1e53cc8bbe1dad68';
const SAMPLE_PROFILE_ADDRESS = '0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e';
const SAMPLE_ASSET_ADDRESS = '0xc444009d38d3046bb0cF81Fa2Cd295ce46A67C78';
const IPFS_GATEWAY_URL = 'https://ipfs.lukso.network/ipfs/';

// ABIs
const ERC725ABI = require('@erc725/smart-contracts/artifacts/ERC725.json');
const LSP8 = require('@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json');

const LSP1MinimalInterface = require('./lsp1_minimal_interface.json');
const LSP4schema = require('./lsp4_schema.json');
const AssetInterface = require('./asset_interface.json');

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
  ipfsGateway: IPFS_GATEWAY_URL,
};

let assetImageLinks = [];
let fullSizeAssetImage;
let assetDescription;

/*
 * Return array of blockchain addresses of
 * assets, that were received by the
 * Univeral Profile holder.
 *
 * @return address[] of assets
 */
async function getAssetAddressses() {
  const AddressStore = new web3.eth.Contract(
    LSP1MinimalInterface,
    SAMPLE_UNIVERSAL_RECEIVER,
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
 * @param owner Universal Profile address
 * @return address[] of owned assets
 */
async function getOwnedAddresses(owner) {
  let digitalAssets = await getAssetAddressses();
  let ownedAssets = [];

  for (let i = 0; i < digitalAssets.length; i++) {
    let isCurrentOwner;

    // Create instance of the asset to check owner balance
    const LSP8Contract = new web3.eth.Contract(LSP8.abi, digitalAssets[i]);

    isCurrentOwner = await LSP8Contract.methods.balanceOf(owner).call();
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
 * @param address of asset
 * @return object of interface types
 */
async function checkErc725YInterfaceId(address) {
  // Create instance of the contract which has to be queried
  const Contract = new web3.eth.Contract(AssetInterface, address);

  const ERC725Y_INTERFACE_ID = '0x714df77c';

  let interfaceCheck = false;

  // Check if the contract has a key-value store
  try {
    interfaceChecks.isERC725 = await Contract.methods
      .supportsInterface(ERC725Y_INTERFACE_ID)
      .call();
  } catch (error) {
    return console.log('Address could not be checked for interface');
  }

  return interfaceCheck;
}

/*
 * Fetch the dataset of an asset
 * from the Universal Profile
 *
 * @param key of asset property
 * @return string of encoded data
 */
async function getAssetData(key) {
  // Check if asset is ERC725Legacy or ERC725
  let assetInterfaceID = await checkErc725YInterfaceId(SAMPLE_ASSET_ADDRESS);

  try {
    if (assetInterfaceID === true) {
      // Instanciate ERC725 smart contract
      const digitalAsset = new web3.eth.Contract(
        ERC725ABI,
        SAMPLE_ASSET_ADDRESS,
      );

      // Fetch the encoded contract data
      return await digitalAsset.methods['getData(bytes32)'](key).call();
    }
  } catch (error) {
    return console.log('Data of assets address could not be loaded');
  }
}

/*
 * Decode value from ERC725Y storage
 * based on it's key and phrase
 *
 * @param key of asset property
 * @param decodePhrase string of fetchable content
 * @return string of decoded data
 */
async function decodeData(key, decodePhrase) {
  try {
    let encodedData = await getAssetData(key);
    // Instance of the LSP4 with ERC725.js
    const erc725 = new ERC725(
      LSP4schema,
      SAMPLE_ASSET_ADDRESS,
      provider,
      config,
    );
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
 * @return string of asset data URL
 */
async function getMetaDataLink() {
  let decodedData = await decodeData(MetaDataKey, decodeMetaPhrase);
  // Generate IPFS link from decoded metadata
  return IPFS_GATEWAY_URL + decodedData.LSP4Metadata.url.substring(7);
}

/*
 * Fetch the asset data from a link
 *
 * @return string with asset data as JSON
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
      assetImageLinks.push([i, IPFS_GATEWAY_URL + assetImageData[0][i].url]);
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
getOwnedAddresses(SAMPLE_PROFILE_ADDRESS).then((ownedAssets) =>
  console.log(ownedAssets),
);

// Debug Step 3
getAssetData(MetaDataKey).then((encodedData) => console.log(encodedData));

// Debug Step 4
checkErc725YInterfaceId(SAMPLE_ASSET_ADDRESS).then((standard) =>
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

  </TabItem>

  <TabItem value="Current & Legacy Standards" label="Current & Legacy Standards">

<details>
    <summary>LSP1 Minimal JSON Interface</summary>

```json title="lsp1_minimal_interface.json"
[
  {
    "inputs": [],
    "name": "getAllRawValues",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
```

</details>

<details>
    <summary>Asset JSON Interface</summary>

```json title="asset_interface.json"
[
  {
    "type": "function",
    "stateMutability": "view",
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "name": "supportsInterface",
    "inputs": [
      {
        "type": "bytes4",
        "name": "interfaceId",
        "internalType": "bytes4"
      }
    ]
  }
]
```

</details>

<details>
    <summary>LSP4 JSON Schema</summary>

```json title="lsp4_schema.json"
[
  {
    "name": "SupportedStandards:LSP4DigitalCertificate",
    "key": "0xeafec4d89fa9619884b6b89135626455000000000000000000000000abf0613c",
    "keyType": "Mapping",
    "valueContent": "0xabf0613c",
    "valueType": "bytes"
  },
  {
    "name": "LSP4TokenName",
    "key": "0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1",
    "keyType": "Singleton",
    "valueContent": "String",
    "valueType": "string"
  },
  {
    "name": "LSP4TokenSymbol",
    "key": "0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756",
    "keyType": "Singleton",
    "valueContent": "String",
    "valueType": "string"
  },
  {
    "name": "LSP4Metadata",
    "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
    "keyType": "Singleton",
    "valueContent": "JSONURL",
    "valueType": "bytes"
  },
  {
    "name": "LSP4Creators[]",
    "key": "0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7",
    "keyType": "Array",
    "valueContent": "Number",
    "valueType": "uint256",
    "elementValueContent": "Address",
    "elementValueType": "address"
  }
]
```

</details>

<details>
    <summary>ERC725 Legacy JSON Interface</summary>

```json title="erc725_legacy_interface.json"
[
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_keys",
        "type": "bytes32"
      }
    ],
    "name": "getData",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "values",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
```

</details>

```javascript title="read_assets.js"
// Import and Setup
const Web3 = require('web3');
const web3 = new Web3('https://rpc.l14.lukso.network');
const { ERC725 } = require('@erc725/erc725.js');
require('isomorphic-fetch');

// ABIs
const LSP8 = require('@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json');
const ERC725ABI = require('@erc725/smart-contracts/artifacts/ERC725.json');

const ERC725LegacyInterface = require('./erc725_legacy_interface.json');
const LSP1MinimalInterface = require('./lsp1_minimal_interface.json');
const LSP4schema = require('./lsp4_schema.json');
const AssetInterface = require('./asset_interface.json');

// Our static sample addresses
const SAMPLE_UNIVERSAL_RECEIVER = '0x50a02ef693ff6961a7f9178d1e53cc8bbe1dad68';
const SAMPLE_PROFILE_ADDRESS = '0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e';
const SAMPLE_ASSET_ADDRESS = '0xc444009d38d3046bb0cF81Fa2Cd295ce46A67C78';
const IPFS_GATEWAY_URL = 'https://ipfs.lukso.network/ipfs/';

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
  ipfsGateway: IPFS_GATEWAY_URL,
};

let assetImageLinks = [];
let fullSizeAssetImage;
let assetDescription;

/*
 * Return array of blockchain addresses of
 * assets, that were received by the
 * Univeral Profile holder.
 *
 * @return address[] of assets
 */
async function getAssetAddressses() {
  const AddressStore = new web3.eth.Contract(
    LSP1MinimalInterface,
    SAMPLE_UNIVERSAL_RECEIVER,
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
 * @param owner Universal Profile address
 * @return address[] of owned assets
 */
async function getOwnedAddresses(owner) {
  let digitalAssets = await getAssetAddressses();
  let ownedAssets = [];

  for (let i = 0; i < digitalAssets.length; i++) {
    let isCurrentOwner;

    // Create instance of the asset to check owner balance
    const LSP8Contract = new web3.eth.Contract(LSP8.abi, digitalAssets[i]);

    isCurrentOwner = await LSP8Contract.methods.balanceOf(owner).call();
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
 * @param address of asset
 * @return object of interface types
 */
async function checkErc725YInterfaceId(address) {
  // Create instance of the contract which has to be queried
  const Contract = new web3.eth.Contract(AssetInterface, address);

  const interfaceIds = {
    erc725Legacy: '0x2bd57b73',
    erc725: '0x714df77c',
  };

  let interfaceChecks = {
    isERC725Legacy: false,
    isERC725: false,
  };

  // Check if the contract is a legacy key-value store interface
  try {
    interfaceChecks.isERC725Legacy = await Contract.methods
      .supportsInterface(interfaceIds.erc725Legacy)
      .call();
  } catch (error) {
    console.log('Address could not be checked for legacy ERC725Y interface');
    console.log(error.message);
    return;
  }

  // Check if the contract is a current key-value store interface
  try {..
    interfaceChecks.isERC725 = await Contract.methods
      .supportsInterface(interfaceIds.erc725)
      .call();
  } catch (error) {
    console.log('Address could not be checked for ERC725 interface');
    console.log(error.message);
    return;
  }

  return interfaceChecks;
}

/*
 * Fetch the dataset of an asset
 * from the Universal Profile
 *
 * @param key of asset property
 * @return string of encoded data
 */
async function getAssetData(key) {
  // Check if asset is ERC725Legacy or ERC725
  let assetInterfaceIDs = await checkErc725YInterfaceId(SAMPLE_ASSET_ADDRESS);

  try {
    // Legacy interface
    if (assetInterfaceIDs.isERC725Legacy === true) {
      // Instanciate ERC725Legacy smart contract
      const digitalAsset = new web3.eth.Contract(
        ERC725LegacyInterface,
        SAMPLE_ASSET_ADDRESS,
      );

      // Fetch the encoded contract data
      return await digitalAsset.methods.getData(key).call();
    }
    // Current interface
    if (assetInterfaceIDs.isERC725 === true) {
      // Instanciate ERC725 smart contract
      const digitalAsset = new web3.eth.Contract(
        ERC725ABI,
        SAMPLE_ASSET_ADDRESS,
      );

      // Fetch the encoded contract data
      return await digitalAsset.methods["getData(bytes32)"](key).call();
    }
  } catch (error) {
    return console.log('Data of assets address could not be loaded');
  }
}

/*
 * Decode value from ERC725Y storage
 * based on it's key and phrase
 *
 * @param key of asset property
 * @param decodePhrase string of fetchable content
 * @return string of decoded data
 */
async function decodeData(key, decodePhrase) {
  try {
    let encodedData = await getAssetData(key);
    // Instance of the LSP4 with ERC725.js
    const erc725 = new ERC725(
      LSP4schema,
      SAMPLE_ASSET_ADDRESS,
      provider,
      config,
    );
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
 * @return string of asset data URL
 */
async function getMetaDataLink() {
  try {
    let decodedData = await decodeData(MetaDataKey, decodeMetaPhrase);
    // Generate IPFS link from decoded metadata
    return IPFS_GATEWAY_URL + decodedData.LSP4Metadata.url.substring(7);
  } catch (error) {
    console.log('URL could not be fetched');
  }
}

/*
 * Fetch the asset data from a link
 *
 * @return string with asset data as JSON
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
      assetImageLinks.push([i, IPFS_GATEWAY_URL + assetImageData[0][i].url]);
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

// Step 1
getAssetAddressses().then((digitalAssets) => console.log(digitalAssets));

// Step 2
getOwnedAddresses(SAMPLE_PROFILE_ADDRESS).then((ownedAssets) =>
  console.log(
    `Addresses of assets owned by: ${SAMPLE_ASSET_ADDRESS}:`,
    ownedAssets,
  ),
);

// Step 3
getAssetData(MetaDataKey).then((encodedData) => console.log(encodedData));

// Step 4
checkErc725YInterfaceId(SAMPLE_ASSET_ADDRESS).then((standard) =>
  console.log(standard),
);

// Step 5
decodeData(MetaDataKey, decodeMetaPhrase).then((decodedData) =>
  console.log(decodedData),
);

// Step 6
getMetaDataLink().then((dataURL) => console.log(dataURL));

// Step 7
fetchAssetData().then((assetJSON) => console.log(assetJSON));

// Step 8
getAssetProperties();
```

  </TabItem>

</Tabs>

<!-- Links and References -->

[function overloading]: https://docs.soliditylang.org/en/v0.8.13/contracts.html?highlight=function%20overloading#function-overloading
