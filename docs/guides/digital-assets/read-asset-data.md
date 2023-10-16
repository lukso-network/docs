---
sidebar_label: 'Read Asset Data'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read Asset Data

In this guide, we will learn how to:

- Get all assets owned by a Universal Profile.
- Fetch the metadata of all owned assets.

:::tip
A complete _"ready to use"_ JS file is available at the end in the [**Final Code**](#final-code) section. If you want to run the code as standalone JavaScript files within the terminal or the browser, you can open the [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository or use the correlated [StackBlitz](https://stackblitz.com/github/lukso-network/lukso-playground) page.
:::

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
- [erc725.js](../../tools/erc725js/getting-started/) library to fetch the asset metadata.
- [lsp-smart-contracts](https://github.com/lukso-network/lsp-smart-contracts) to integrate the ABIs for the LUKSO Standards.

## Setup

Open a terminal in the project's folder of your choice and install all required libraries.

```shell
npm install web3 @erc725/erc725.js @lukso/lsp-smart-contracts
```

## Step 1 - Get all owned assets

<Tabs>
  <TabItem value="Current Standard" label="Current Standard">

In this [guide](../../learn/dapp-developer/readData), we learned how to read the Universal Profile properties and use the data key names with the `fetchData()` function of the [erc725.js](../../tools/erc725js/getting-started/) library. In the same way, we can now fetch all the assets owned by the Universal Profile by calling `fetchData` and passing the `LSP5ReceivedAssets[]` key.

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

In [this guide](../../learn/dapp-developer/readData), we learned how to read the Universal Profile properties and use the data key names with the `fetchData()` function of the [erc725.js](../../tools/erc725js/getting-started/) library. In the same way, we can now fetch the address of the [Universal Receiver](../../standards/generic-standards/lsp1-universal-receiver/) by using `fetchData("LSP1UniversalReceiverDelegate")`.

:::caution
If using erc725.js in a NodeJS environment you may need to install and import [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) to use the `fetchData()` method.

:::

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

Now we can retrieve the metadata for the asset address. The [LSP4](../../standards/nft-2.0/LSP4-Digital-Asset-Metadata) metadata is saved under the ERC725Y key-value store of the digital asset. We need to input the correct data key to fetch the associated value. There are multiple [LSP4 keys](../../standards/nft-2.0/LSP4-Digital-Asset-Metadata) for different properties.

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
const digitalAsset = new ERC725(LSP4Schema, ownedAssets[0], provider, config);

// Get the encoded data
const decodedAssetMetadata = await digitalAsset.fetchData('LSP4Metadata');
```

To get the metadata of all owned assets we can iterate through the `ownedAssets` array.

```javascript
const ownedAssetsMetadata = await ownedAssets.map(async (ownedAsset) => {
  const digitalAsset = new ERC725(LSP4Schema, ownedAsset, provider, config);

  return await digitalAsset.fetchData('LSP4Metadata');
});
```

## Final Code

Below is the complete code snippet of this guide, with all the steps compiled together.

<Tabs>
  
  <TabItem value="Current Standards" label="Current Standards">

```javascript title="read_assets.js"
// Import and network setup
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfileSchema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import LSP4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
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

const ownedAssetsMetadata = await ownedAssets.map(async (ownedAsset) => {
  // Instantiate the asset
  const digitalAsset = new ERC725(LSP4Schema, ownedAsset, provider, config);

  // Get the encoded data
  return await digitalAsset.fetchData('LSP4Metadata');
});

console.log(ownedAssetsMetadata);
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

```javascript title="read_assets.js"
// Import and network setup
import { ERC725 } from '@erc725/erc725.js';
import UniversalProfileSchema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import LSP4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import Web3 from 'web3';
import LSP1MinimalABI from './lsp1_legacy_minimal_abi.json';

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

const web3 = new Web3(RPC_ENDPOINT);

// Get all received assets from the Universal Receiver of the Universal Profile.
const universalReceiver = new web3.eth.Contract(
  LSP1MinimalABI,
  receiverAddress,
);

// Fetch all raw values
const rawValues = await universalReceiver.methods.getAllRawValues().call();

// Convert raw values to addresses
const ownedAssets = rawValues.map((returnedRawValue) => {
  return web3.utils.toChecksumAddress(returnedRawValue.substr(26));
});

const ownedAssetsMetadata = await ownedAssets.map(async (ownedAsset) => {
  // Instantiate the asset
  const digitalAsset = new ERC725(LSP4Schema, ownedAsset, provider, config);

  // Get the encoded data
  return await digitalAsset.fetchData('LSP4Metadata');
});

console.log(ownedAssetsMetadata);
```

  </TabItem>

</Tabs>
