---
sidebar_label: 'Read Asset Data'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read Asset Data

:::success Recommendation
Complete _"ready to use"_ JSON and JS files are available at the end in the [**Final Code**](#final-code) section.
:::

In this guide, we will learn how to:

- Get all assets owned by a Universal Profile.
- Fetch the metadata of all owned assets.

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('./img/example-asset.png').default}
    alt="Asset example on universalprofile.cloud"
  />
<br/>
<i>The <a href="https://universalprofile.cloud/asset/0xbD14F48DDDe851b812D95431906E629fb9514Db4">Lambada Dyed Red White Blue</a> asset as seen on UniversalProfile.cloud</i>
</div>

We will use:

- [web3.js](https://web3js.readthedocs.io/en/v1.7.0/) for utility as well as connecting to the LUKSO L14 or L16 network.
- [erc725.js](../../tools/erc725js/getting-started/) library to check the interface of a profile.
- [lsp-smart-contracts](https://github.com/lukso-network/lsp-smart-contracts) to integrate the ABIs for the LUKSO Standards.

## Setup

Open a terminal in the project's folder of your choice and install all required libraries.

```shell
npm install web3 @erc725/erc725.js @lukso/lsp-smart-contracts
```

## Step 1 - Get all owned assets

<Tabs>
  <TabItem value="Current Standard" label="Current Standard">

In the [**Read Profile Data** guide](../universal-profile/read-profile-data), we learned how to read the Universal Profile properties and use the data key names with the `fetchData()` function of the [erc725.js](../../tools/erc725js/getting-started/) library. In the same way, we can now fetch all the assets owned by the Universal Profile by fetching using the `LSP5ReceivedAssets[]` key.

:::info
This same method can also be used to fetch all assets a Universal Profile has ever issued by using the `LSP12IssuedAssets[]` key.

:::

:::caution
If using erc725.js in a NodeJS environment you may need to install and import [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) to use the `fetchData()` method.

:::

```javascript title="read_assets.js"
// Import and network setup
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfileSchema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import Web3 from 'web3';

// Static variables
const SAMPLE_PROFILE_ADDRESS = '0xa907c1904c22DFd37FF56c1f3c3d795682539196';
const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';
const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';

// Parameters for the ERC725 instance
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = { ipfsGateway: IPFS_GATEWAY };

// Fetch the LSP5 data of the Universal Profile to get its owned assets
const profile = new ERC725(
  UniversalProfileSchema,
  SAMPLE_PROFILE_ADDRESS,
  provider,
  config,
);

const result = await profile.fetchData('LSP5ReceivedAssets[]');
const ownedAssets = result.value;

console.log(ownedAssets);
```

  </TabItem>

  <TabItem value="Legacy Standard" label="Legacy Standard">

In the [previous guide](../universal-profile/read-profile-data), we learned how to read the Universal Profile properties and use the data key names with the `fetchData()` function of the [erc725.js](../../tools/erc725js/getting-started/) library. In the same way, we can now fetch the address of the [Universal Receiver](../../standards/generic-standards/lsp1-universal-receiver/) by using `fetchData("LSP1UniversalReceiverDelegate")`.

```javascript title="read_assets.js"
// Import and network setup
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfileSchema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import Web3 from 'web3';

// Static variables
const SAMPLE_PROFILE_ADDRESS = '0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e';
const RPC_ENDPOINT = 'https://rpc.l14.lukso.network';
const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';

// Parameters for the ERC725 instance
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = { ipfsGateway: IPFS_GATEWAY };

// Fetch the LSP1 data of the Universal Profile to get its Universal Receiver
const profile = new ERC725(
  UniversalProfileSchema,
  SAMPLE_PROFILE_ADDRESS,
  provider,
  config,
);

const result = await profile.fetchData('LSP1UniversalReceiverDelegate');
const universalReceiverAddress = result.value;
```

Using the Universal Receiver address, we can now call the `getAllRawValues()` function on this contract to retrieve an array of received assets.

<details>
    <summary>LSP1 Legacy ABI</summary>

```json title="lsp1_legacy_minimal_abi.json"
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
// ABI for the Universal Receiver
import LSP1MinimalABI from './lsp1_legacy_minimal_abi.json';

// ...

const web3 = new Web3('https://rpc.l14.lukso.network');

// Get all received assets from the Universal Receiver of the Universal Profile.
const universalReceiver = new web3.eth.Contract(
  LSP1MinimalABI,
  receiverAddress,
);


// Fetch all raw values
const rawValues = await universalReceiver.methods.getAllRawValues().call();

// Convert raw values to addresses
const receivedAssets = rawValues.map((returnedRawValue) => {
  return web3.utils.toChecksumAddress(returnedRawValue.substr(26));
});

console.log(receivedAssets),

```

  </TabItem>
</Tabs>

## Step 2 - Fetch the asset metadata

Now we can safely retrieve the metadata for the asset address. The [LSP4](../../standards/nft-2.0/LSP4-Digital-Asset-Metadata) metadata is saved under the ERC725Y key-value store of the digital asset. We need to input the correct data key to fetch the associated value. There are multiple [LSP4 keys](../../standards/nft-2.0/LSP4-Digital-Asset-Metadata) for different properties.

- `LSP4TokenName`
- `LSP4TokenSymbol`
- `LSP4Metadata`
- `LSP4Creators[]`

In this guide, we will use the `LSP4Metadata` key to read the asset metadata.

```javascript title="read_assets.js"
// ABIs
import LSP4schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

// ...

// Instantiate the asset
const digitalAsset = new ERC725(
  LSP4Schema,
  SAMPLE_ASSET_ADDRESS,
  provider,
  config,
);

// Get the encoded data
const decodedAssetMetadata = await digitalAsset.fetchData('LSP4Metadata');
```

## Final Code

Below is the complete code snippet of this guide, with all the steps compiled together.

<Tabs>
  
  <TabItem value="Current Standards" label="Current Standards">

```javascript title="read_assets.js"
// Imports
import Web3 from "web3";
import { ERC725 } from "@erc725/erc725.js";
import "isomorphic-fetch";
import erc725schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import LSP4schema from "@erc725/erc725.js/schemas/LSP4DigitalAsset.json";
import LSP8 from "@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json";
import LSP4 from "@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json";
import { ERC725Y_INTERFACE_IDS } from "@erc725/erc725.js/build/main/src/lib/constants";

// Sample addresses
const SAMPLE_PROFILE_ADDRESS = '0xa907c1904c22DFd37FF56c1f3c3d795682539196';
const SAMPLE_ASSET_ADDRESS = '0x923F49Bac508E4Ec063ac097E00b4a3cAc68a353';

// Network and storage
const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';
const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';

// Parameters for the ERC725 instance
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = { ipfsGateway: IPFS_GATEWAY };

// Setup Web3
const web3 = new Web3('https://rpc.l16.lukso.network');

// Data keys for asset properties
const TokenNameKey = LSP4schema[1].key;
const TokenSymbolKey = LSP4schema[2].key;
const MetaDataKey = LSP4schema[3].key;
const CreatorsKey = LSP4schema[4].key;

/*
 * Fetch the LSP5 data of the Universal Profile
 * to get its ever received assets
 *
 * @param address of the Universal Profile
 * @return address[] of received assets or custom error
 */
async function fetchReceivedAssets(address) {
  try {
    const profile = new ERC725(erc725schema, address, provider, config);
    const result = await profile.fetchData('LSP5ReceivedAssets[]');
    return result.value;
  } catch (error) {
    return console.log('This is not an ERC725 Contract');
  }
}

/*
 * Fetch the ever issued assets from
 * the Universal Profile
 *
 * @param address of the Universal Profile
 * @return address[] of the issued assets or custom error
 */
async function fetchIssuedAssets(address) {
  try {
    const profile = new ERC725(erc725schema, address, provider, config);
    const result = await profile.fetchData('LSP12IssuedAssets[]');
    return result.value;
  } catch (error) {
    return console.log('This is not an ERC725 Contract');
  }
}

/*
 * Return an array of assets
 * that are owned by the
 * Universal Profile.
 *
 * @param owner of the Universal Profile
 * @return address[] of owned assets
 */
async function fetchOwnedAssets(owner) {
  const digitalAssets = await fetchReceivedAssets(owner);
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

/*
 * Check the ERC725Y interface of an asset
 *
 * @param assetAddress of the smart contract
 * @return boolean isERC725Y
 */
async function checkErc725YInterfaceId(assetAddress) {
  // Create an instance of the asset
  const asset = new web3.eth.Contract(LSP4.abi, assetAddress);

  let isERC725Y = false;

  // Check if the contract has a key-value store
  try {
    isERC725Y = await asset.methods
      .supportsInterface(ERC725Y_INTERFACE_IDS['3.0'])
      .call();
  } catch (error) {
    console.log('Address could not be checked for ERC725Y interface');
  }

  return isERC725Y;
}

/*
 * Get the dataset of an asset
 *
 * @param data key of the property to fetch
 * @return string of the encoded data
 */
async function getAssetData(key, address) {
  try {
    // Instantiate the asset
    const digitalAsset = new web3.eth.Contract(LSP4.abi, address);

    // Get the encoded data
    return await digitalAsset.methods['getData(bytes32)'](key).call();
  } catch (error) {
    return console.error('Data of assets address could not be loaded');
  }
}

/*
 * Decode the value from ERC725Y storage
 * based on its data key and phrase
 *
 * @param data key of the asset property to fetch
 * @param encodedData as string
 * @return JSON of the decoded data
 */
async function decodeAssetData(keyName, encodedData) {
  try {
    // Instanciate the asset
    const digitalAsset = new ERC725(
      LSP4schema,
      SAMPLE_ASSET_ADDRESS,
      provider,
      config,
    );

    // Decode the assets data
    return digitalAsset.decodeData({
      keyName: keyName,
      value: encodedData,
    });
  } catch (error) {
    console.log('Data of an asset could not be decoded');
  }
}

/*
 * Create a fetchable storage link that
 * was embeded into the decoded asset data
 *
 * @param decodedAssetMetadata as JSON
 * @return string of asset data URL
 */
async function getMetaDataLink(decodedAssetMetadata) {
  try {
    // Generate IPFS link from decoded metadata
    return decodedAssetMetadata.value.url.replace('ipfs://', IPFS_GATEWAY);
  } catch (error) {
    console.log('URL could not be fetched');
  }
}

/*
 * Fetch the asset data from the provided
 * storage link
 *
 * @param dataURL as string
 * @return string with asset data as JSON
 */
async function fetchAssetData(dataURL) {
  try {
    const response = await fetch(dataURL);
    return await response.json();
  } catch (error) {
    console.log('JSON data of IPFS link could not be fetched');
  }
}

// Step 1
fetchReceivedAssets(SAMPLE_PROFILE_ADDRESS).then((profileData) =>
  console.log(JSON.stringify(profileData, undefined, 2)),
);

// Step 2
fetchIssuedAssets(SAMPLE_PROFILE_ADDRESS).then((profileData) =>
  console.log(JSON.stringify(profileData, undefined, 2)),
);

// Step 2
fetchOwnedAssets(SAMPLE_PROFILE_ADDRESS).then((ownedAssets) =>
  console.log(ownedAssets),
);

// Step 4
checkErc725YInterfaceId(SAMPLE_ASSET_ADDRESS).then((isERC725Y) =>
  console.log(isERC725Y),
);

// Step 5
getAssetData(MetaDataKey, SAMPLE_ASSET_ADDRESS).then((encodedData) =>
  console.log(encodedData),
);

// Step 6
getAssetData(MetaDataKey, SAMPLE_ASSET_ADDRESS).then((encodedData) => {
  decodeAssetData(MetaDataKey, encodedData).then((decodedData) =>
    console.log(decodedData),
  );
});

// Step 7
getAssetData(MetaDataKey, SAMPLE_ASSET_ADDRESS).then((encodedData) => {
  decodeAssetData(MetaDataKey, encodedData).then((decodedData) => {
    getMetaDataLink(decodedData).then((dataURL) => console.log(dataURL));
  });
});

// Step 8
getAssetData(MetaDataKey, SAMPLE_ASSET_ADDRESS).then((encodedData) => {
  decodeAssetData(MetaDataKey, encodedData).then((decodedData) => {
    getMetaDataLink(decodedData).then((dataURL) => {
      fetchAssetData(dataURL).then((assetJSON) => console.log(assetJSON));
    });
  });
});
```

  </TabItem>

  <TabItem value="Legacy Standards" label="Legacy Standards">

<details>
    <summary>LSP1 Legacy ABI</summary>

```json title="lsp1_legacy_minimal_abi.json"
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
<summary>ERC725 Legacy Schema</summary>

```json title="erc725_legacy_minimal_schema.json"
[
  {
    "name": "LSP3IssuedAssets[]",
    "key": "0x3a47ab5bd3a594c3a8995f8fa58d0876c96819ca4516bd76100c92462f2f9dc0",
    "keyType": "Array",
    "valueContent": "Address",
    "valueType": "address"
  }
]
```

</details>

<details>
  <summary>LSP4 Legacy ABI</summary>

```json title="lsp4_legacy_minimal_abi.json"
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
    <summary>ERC725 Legacy ABI</summary>

```json title="erc725_legacy_minimal_abi.json"
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
// Imports
import Web3 from "web3";
import { ERC725 } from "@erc725/erc725.js";
import "isomorphic-fetch";
import erc725schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import LSP8 from "@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json";
import LSP4schema from "@erc725/erc725.js/schemas/LSP4DigitalAsset.json";

// Legacy ABIs and schemas
import LSP1MinimalABI from "./lsp1_legacy_minimal_abi.json";
import LSP4MinimalABI from "./lsp4_legacy_minimal_abi.json";
import ERC725MinimalABI from "./erc725_legacy_minimal_abi.json";
import ERC725LegacySchema from "./erc725_legacy_minimal_schema.json";

// Sample addresses
const SAMPLE_ASSET_ADDRESS = '0xc444009d38d3046bb0cF81Fa2Cd295ce46A67C78';
const SAMPLE_PROFILE_ADDRESS = '0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e';

// Network and storage
const RPC_ENDPOINT = 'https://rpc.l14.lukso.network';
const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';


// Parameters for the ERC725 instance
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = { ipfsGateway: IPFS_GATEWAY };

// Setup Web3
const web3 = new Web3('https://rpc.l14.lukso.network');

// Data keys for asset properties
const TokenNameKey = LSP4schema[1].key;
const TokenSymbolKey = LSP4schema[2].key;
const MetaDataKey = LSP4schema[3].key;
const CreatorsKey = LSP4schema[4].key;

/*
 * Fetch the LSP5 data of the Universal Profile
 * to get its ever received assets
 *
 * @param address of the Universal Profile
 * @return address[] of received assets or custom error
 */
async function fetchUniversalReceiverAddress(address) {
  try {
    const profile = new ERC725(erc725schema, address, provider, config);
    const result = await profile.fetchData('LSP1UniversalReceiverDelegate');
    return result.value;
  } catch (error) {
    return console.log('This is not an ERC725 Contract');
  }
}

/*
 * Get all received assets from the
 * Universal Receiver of the
 * Universal Profile.
 *
 * @param address of the Universal Receiver
 * @return address[] of the received assets
 */
async function fetchReceivedAssets(receiverAddress) {
  const universalReceiver = new web3.eth.Contract(
    LSP1MinimalABI,
    receiverAddress,
  );

  let rawValues = [];

  try {
    // Fetch all raw values
    rawValues = await universalReceiver.methods.getAllRawValues().call();
  } catch (error) {
    return console.log('Data from universal receiver could not be loaded');
  }

  const receivedAssets = [];

  // Retrieve addresses
  for (let i = 0; i < rawValues.length; i++) {
    receivedAssets[i] = web3.utils.toChecksumAddress(rawValues[i].substr(26));
  }
  return receivedAssets;
}

/*
 * Fetch the ever issued assets from
 * the Universal Profile
 *
 * @param address of the Universal Profile
 * @return address[] of the issued assets or custom error
 */
async function fetchIssuedAssets(address) {
  try {
    const profile = new ERC725(ERC725LegacySchema, address, provider, config);
    const result = await profile.getData('LSP3IssuedAssets[]');
    return result.value;
  } catch (error) {
    return console.log('Issued assets could not be fetched');
  }
}

/*
 * Return an array of assets
 * that are owned by the
 * Universal Profile.
 *
 * @param owner of the Universal Profile
 * @return address[] of owned assets
 */
async function fetchOwnedAssets(owner) {
  const receiverAddress = await fetchUniversalReceiverAddress(owner);
  const digitalAssets = await fetchReceivedAssets(receiverAddress);
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

/*
 * Check the ERC725Y interface of an asset
 *
 * @param assetAddress of the smart contract
 * @return boolean isERC725YLegacy
 */

async function checkErc725YInterfaceId(address) {
  // Create an instance of the asset
  const asset = new web3.eth.Contract(LSP4MinimalABI, address);

  const erc725YLegacyInterfaceId = '0x2bd57b73';
  let isERC725YLegacy = false;

  // Check if the contract is a legacy key-value store interface
  try {
    isERC725YLegacy = await asset.methods
      .supportsInterface(erc725YLegacyInterfaceId)
      .call();
    return isERC725YLegacy;
  } catch (error) {
    console.log('Address could not be checked for ERC725YLegacy interface');
  }
  return isERC725YLegacy;
}

/*
 * Get the dataset of an asset
 *
 * @param data key of the property to fetch
 * @return string of the encoded data
 */
async function getAssetData(key, address) {
  try {
    // Instanciate asset
    const digitalAsset = new web3.eth.Contract(ERC725MinimalABI, address);

    // Fetch the encoded data
    return await digitalAsset.methods.getData(key).call();
  } catch (error) {
    return console.log('Data of assets address could not be loaded');
  }
}

/*
 * Decode the value from ERC725Y storage
 * based on its data key and phrase
 *
 * @param data key of the asset property to fetch
 * @param encodedData as string
 * @return JSON of the decoded data
 */
async function decodeAssetData(keyName, encodedData) {
  try {
    // Instanciate the asset
    const digitalAsset = new ERC725(
      LSP4schema,
      SAMPLE_ASSET_ADDRESS,
      provider,
      config,
    );

    // Decode the assets data
    return digitalAsset.decodeData({
      keyName: keyName,
      value: encodedData,
    });
  } catch (error) {
    console.log('Data of an asset could not be decoded');
  }
}

/*
 * Create a fetchable storage link that
 * was embeded into the decoded asset data
 *
 * @param decodedAssetMetadata as JSON
 * @return string of asset data URL
 */
async function getMetaDataLink(decodedAssetMetadata) {
  try {
    // Generate IPFS link from decoded metadata
    return decodedAssetMetadata.value.url.replace('ipfs://', IPFS_GATEWAY);
  } catch (error) {
    console.log('URL could not be fetched');
  }
}

/*
 * Fetch the asset data from the provided
 * storage link
 *
 * @param dataURL as string
 * @return string with asset data as JSON
 */
async function fetchAssetData(dataURL) {
  try {
    const response = await fetch(dataURL);
    return await response.json();
  } catch (error) {
    console.log('JSON data of IPFS link could not be fetched');
  }
}

// Step 1.1
fetchUniversalReceiverAddress(SAMPLE_PROFILE_ADDRESS).then((receiverAddress) =>
  console.log(receiverAddress),
);

// Step 1.2
fetchUniversalReceiverAddress(SAMPLE_PROFILE_ADDRESS).then(
  (receiverAddress) => {
    fetchReceivedAssets(receiverAddress).then((receivedAssets) =>
      console.log(receivedAssets),
    );
  },
);

// Step 2
fetchIssuedAssets(SAMPLE_PROFILE_ADDRESS).then((issuedAssets) =>
  console.log(issuedAssets),
);

// Step 2
checkErc725YInterfaceId(SAMPLE_ASSET_ADDRESS).then((isLegacy) =>
  console.log(isLegacy),
);

// Step 4
getAssetData(MetaDataKey, SAMPLE_ASSET_ADDRESS).then((encodedData) =>
  console.log(encodedData),
);

// Step 5
getAssetData(MetaDataKey, SAMPLE_ASSET_ADDRESS).then((encodedData) => {
  decodeAssetData(MetaDataKey, encodedData).then((decodedData) =>
    console.log(decodedData),
  );
});

// Step 6
getAssetData(MetaDataKey, SAMPLE_ASSET_ADDRESS).then((encodedData) => {
  decodeAssetData(MetaDataKey, encodedData).then((decodedData) => {
    getMetaDataLink(decodedData).then((dataURL) => console.log(dataURL));
  });
});

// Step 7
getAssetData(MetaDataKey, SAMPLE_ASSET_ADDRESS).then((encodedData) => {
  decodeAssetData(MetaDataKey, encodedData).then((decodedData) => {
    getMetaDataLink(decodedData).then((dataURL) => {
      fetchAssetData(dataURL).then((assetJSON) => console.log(assetJSON));
    });
  });
});
```

  </TabItem>

</Tabs>

<!-- Links and References -->

[function overloading]: https://docs.soliditylang.org/en/v0.8.13/contracts.html?highlight=function%20overloading#function-overloading
