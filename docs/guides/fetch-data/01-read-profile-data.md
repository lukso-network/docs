---
sidebar_label: 'Read Profile Data'
sidebar_position: 1
---

# Read Universal Profile Data

In this guide, we will learn how to:

- check the validity of the blockchain address.
- read data from a [Universal Profile](../../standards/universal-profile/01-introduction.md).

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('./img/example-up.png').default}
    alt="Universal Profile example on universalprofile.cloud"
  />
<br/>
<i>A <a href="https://universalprofile.cloud/0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e">Universal Profile</a> as seen on UniversalProfile.cloud</i>
</div>

We will use:

- [web3.js](https://web3js.readthedocs.io/en/v1.7.0/) for utility as well as connecting to the LUKSO L14 network.
- [erc725.js](../../tools/erc725js/getting-started/) library to check the interface of a profile.
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) to enable you to use `fetch()` in Node.js code.

## Setup

Open a terminal in the project's folder of your choice and install all required libraries.

```shell
npm install web3 @erc725/erc725.js isomorphic-fetch
```

## Step 1 - Check for valid Blockchain Address

:::success Recommendation
Complete "ready to use" JSON and JS files are available at the end in the [**Final Code**](#final-code) section.
:::

Within an application, the Universal Profile address is commonly used as input. We want to make sure that the address is valid in the first place. We can do a checkup by converting the value into a checksum address using the `web3.js` library.

To make the guide more understandable, we use a sample profile address. You will most likely change this static variable with a dynamic value from your app's input field or fetching process.

```javascript title="read_profile.js"
// Import and Network Setup
const Web3 = require('web3');
const web3 = new Web3('https://rpc.l14.lukso.network');

// Our static Universal Profile address
const SAMPLE_PROFILE_ADDRESS = '0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e';

/*
 * Check if input is a valid blockchain address
 *
 * @param address input
 * @return boolean result
 */
function isValidAddress(address) {
  const formattedAddress = web3.utils.toChecksumAddress(address);
  return web3.utils.checkAddressChecksum(formattedAddress);
}

console.log(isValidAddress(SAMPLE_PROFILE_ADDRESS));
// true
```

If the function `isValidAddress(...)` gives us back `true`, the address is valid and can be used.`

## Step 2 - Call the Universal Profile

To inspect the address and check if it has an ERC725 contract, we can call its interface through the `erc725.js` library. The instance of the contract will need the following information:

- [LSP2 - ERC725Y JSON Schema](../../standards/generic-standards/lsp2-json-schema/) describes the data in the contract storage, and which keys to use to retrieve it.

  - `SupportedStandards` will fetch the interface using a Metadata Standard with a key. In our case we use `SupportedStandards:LSP3UniversalProfile` to check if the contract is an Universal Profile.
  - `LSP3Profile` fetches the data of the Universal Profile.
  - `LSP1UniversalReceiverDelegate` will fetch received assets.

- `address`: the address of the contract
- `provider`: a [provider](../../tools/erc725js/providers) object. Usually used with the RPC endpoint URL
- `config`: used to configure the IPFS gateway

Besides the schema, we also use `isomorphic-fetch` to fetch the HTTP response from the profile while using `node` for execution. You may not need this library if you use browser environments like `ReactJS` or `VueJS`.

After importing the ERC725 object and the fetch functionality, we can declare all data needed to instantiate the ERC725 contract instance. While fetching, we can use the function from the previous step to handle errors that might occur.

<details>
    <summary>ERC725 JSON Schema</summary>

```json title="erc725schema.json"
[
  {
    "name": "SupportedStandards:ERC725Account",
    "key": "0xeafec4d89fa9619884b6b89135626455000000000000000000000000afdeb5d6",
    "keyType": "Mapping",
    "valueContent": "0xafdeb5d6",
    "valueType": "bytes"
  },
  {
    "name": "LSP3Profile",
    "key": "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
    "keyType": "Singleton",
    "valueContent": "JSONURL",
    "valueType": "bytes"
  },
  {
    "name": "LSP1UniversalReceiverDelegate",
    "key": "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
    "keyType": "Singleton",
    "valueContent": "Address",
    "valueType": "address"
  }
]
```

</details>

```javascript title="read_profile.js"
// ...
// Import and Setup
const { ERC725 } = require('@erc725/erc725.js');
require('isomorphic-fetch');

// Parameters for ERC725 Instance
const erc725schema = require('./erc725schema.json');

const RPC_ENDPOINT = 'https://rpc.l14.lukso.network';

const IPFS_GATEWAY = 'https://ipfs.lukso.network/ipfs/';

const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);

const config = {
  ipfsGateway: IPFS_GATEWAY,
};

/*
 * Try fetching the @param's Universal Provile data
 *
 * @param address of Universal Profile
 * @return string JSON or custom error
 */
async function getProfile(address) {
  if (isValidAddress(address)) {
    try {
      const erc725 = new ERC725(erc725schema, address, provider, config);
      return await erc725.fetchData();
    } catch (error) {
      return console.log('This is not an ERC725 Contract');
    }
  } else {
    return console.log('This is not an blockchain address');
  }
}

// Debug
getProfile(SAMPLE_PROFILE_ADDRESS).then((profileData) =>
  console.log(JSON.stringify(profileData, undefined, 2)),
);
```

If everything went fine, we now have the profile's [LSP3 - Universal Profile Metadata](../../standards/universal-profile/lsp3-universal-profile-metadata) JSON. It should look like this JSON file:

<details>
    <summary>Show JSON response</summary>

```json
{
  "SupportedStandards:ERC725Account": "0xafdeb5d6",
  "LSP3Profile": {
    "LSP3Profile": {
      "name": "...",
      "links": [
        {
          "title": "... ",
          "url": "..."
        },
        ...
      ],
      "description": "...",
      "profileImage": [
        {
          "width": 1512,
          "height": 1998,
          "hashFunction": "keccak256(bytes)",
          "hash": "0x...",
          "url": "..."
        },
        ...
      ],
      "backgroundImage": [
        {
          "width": 1512,
          "height": 1998,
          "hashFunction": "keccak256(bytes)",
          "hash": "0x...",
          "url": "..."
        },
        ...
      ],
      "tags": ["sample profile"]
    }
  },
  "LSP1UniversalReceiverDelegate": "0x..."
}
```

</details>

## Step 3 - Read the Dataset

With the JSON response, we can fetch all sorts of data:

- Profile metadata
- Pictures and their properties
- Receiver address containing asset data

Just instantiate variables for the information you would like to process. All demo fetch functions provided with this guide will come with console logs to directly see results in your terminal.

<details>
    <summary>Fetch the profile's metadata</summary>

```javascript title="read_profile.js"
// ...
// Fetchable metadata information
let name;
let description;

let links = [];
let firstLinkTitle;
let firstLinkURL;

let tags = [];
let firstTag;

/*
 * Fetch metadata information from the JSON dataset of
 * an Universal Profile
 */
async function fetchProfileData() {
  profileData = await getProfile(SAMPLE_PROFILE_ADDRESS);
  name = profileData.LSP3Profile.LSP3Profile.name;
  description = profileData.LSP3Profile.LSP3Profile.description;

  links = profileData.LSP3Profile.LSP3Profile.links;
  firstLinkTitle = links[0].title;
  firstLinkURL = links[0].url;

  tags = profileData.LSP3Profile.LSP3Profile.tags;
  firstTag = tags[0];

  console.log('Name ' + name);
  console.log('Description: ' + description + '\n');
  console.log('Links: ' + JSON.stringify(links, undefined, 2) + '\n');
  console.log('Title of first Link: ' + firstLinkTitle);
  console.log('URL of first Link: ' + firstLinkURL + '\n');
  console.log('Tags: ' + JSON.stringify(tags, undefined, 2) + '\n');
  console.log('First tag: ' + firstTag + '\n');
}

// Debug
fetchProfileData();
```

</details>

<details>
    <summary>Fetch the profile's picture properties</summary>

```javascript title="read_profile.js"
// ...
// Fetchable picture information
let baseURL = 'https://ipfs.lukso.network/ipfs/';

let backgroundImageLinks = [];
let fullSizeBackgroundImg;

let profileImageLinks = [];
let fullSizeProfileImg;

/*
 * Fetch picture information from the JSON dataset of
 * a Universal Profile
 *
 * @return string Error
 */
async function fetchPictureData() {
  pictureData = await getProfile(SAMPLE_PROFILE_ADDRESS);
  let backgroundImagesIPFS =
    pictureData.LSP3Profile.LSP3Profile.backgroundImage;
  let profileImagesIPFS = pictureData.LSP3Profile.LSP3Profile.profileImage;

  try {
    for (let i in backgroundImagesIPFS) {
      backgroundImageLinks.push([
        i,
        baseURL + backgroundImagesIPFS[i].url.substring(7),
      ]);
    }

    for (let i in profileImagesIPFS) {
      profileImageLinks.push([
        i,
        baseURL + profileImagesIPFS[i].url.substring(7),
      ]);
    }

    fullSizeBackgroundImg = backgroundImageLinks[0][1];
    fullSizeProfileImg = profileImageLinks[0][1];

    console.log('Fullsize Background Image: ' + fullSizeBackgroundImg + '\n');
    console.log('Fullsize Background Image: ' + fullSizeProfileImg + '\n');

    console.log(
      'Background Image Links: ' +
        JSON.stringify(backgroundImageLinks, undefined, 2) +
        '\n',
    );

    console.log(
      'Background Image Links: ' +
        JSON.stringify(profileImageLinks, undefined, 2) +
        '\n',
    );
  } catch (error) {
    return console.log('Could not fetch images');
  }
}

fetchPictureData();
```

</details>

<details>
    <summary>Fetch the profile's universal receiver</summary>

```javascript title="read_profile.js"
// ...
/*
 * Fetch the address of the Universal Receiver from
 * the JSON dataset of an Universal Profile
 *
 * @return address of Universal Reveicer Delegate
 */
async function fetchReceiverData() {
  receiverData = await getProfile(SAMPLE_PROFILE_ADDRESS);
  return receiverData.LSP1UniversalReceiverDelegate;
}

fetchReceiverData().then((receiverAddress) => console.log(receiverAddress));
```

</details>

## Final Code

Below is the complete code snippet of this guide, with all the steps compiled together.

<details>
    <summary>ERC725 JSON Schema</summary>

```json title="erc725schema.json"
[
  {
    "name": "SupportedStandards:ERC725Account",
    "key": "0xeafec4d89fa9619884b6b89135626455000000000000000000000000afdeb5d6",
    "keyType": "Mapping",
    "valueContent": "0xafdeb5d6",
    "valueType": "bytes"
  },
  {
    "name": "LSP3Profile",
    "key": "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
    "keyType": "Singleton",
    "valueContent": "JSONURL",
    "valueType": "bytes"
  },
  {
    "name": "LSP1UniversalReceiverDelegate",
    "key": "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
    "keyType": "Singleton",
    "valueContent": "Address",
    "valueType": "address"
  }
]
```

</details>

```javascript title="read_profile.js"
// Import and Setup
const Web3 = require('web3');
const { ERC725 } = require('@erc725/erc725.js');
require('isomorphic-fetch');
// Parameters for ERC725 Instance
const erc725schema = require('./erc725schema.json');

// Our static Universal Profile address
const SAMPLE_PROFILE_ADDRESS = '0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e';

const RPC_ENDPOINT = 'https://rpc.l14.lukso.network';

const web3 = new Web3(RPC_ENDPOINT);
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);

const IPFS_GATEWAY = 'https://ipfs.lukso.network/ipfs/';

const config = {
  ipfsGateway: IPFS_GATEWAY,
};

// Fetchable metadata information
let name;
let description;

let links = [];
let firstLinkTitle;
let firstLinkURL;

let tags = [];
let firstTag;

// Fetchable picture information
let baseURL = IPFS_GATEWAY;

let backgroundImageLinks = [];
let fullSizeBackgroundImg;

let profileImageLinks = [];
let fullSizeProfileImg;

/*
 * Check if input is a valid blockchain address
 *
 * @param address input
 * @return boolean result
 */
function isValidAddress(address) {
  let formattedAddress = web3.utils.toChecksumAddress(address);
  return web3.utils.checkAddressChecksum(formattedAddress);
}

/*
 * Try fetching the @param's Universal Provile data
 *
 * @param address of Universal Profile
 * @return string JSON or custom error
 */
async function getProfile(address) {
  if (isValidAddress(address)) {
    try {
      const erc725 = new ERC725(erc725schema, address, provider, config);
      return await erc725.fetchData();
    } catch (error) {
      return console.log('This is not an ERC725 Contract');
    }
  } else {
    return console.log('This is not an blockchain address');
  }
}

/*
 * Fetch metadata information from the JSON dataset of
 * an Universal Profile
 */
async function fetchProfileData() {
  profileData = await getProfile(SAMPLE_PROFILE_ADDRESS);
  name = profileData.LSP3Profile.LSP3Profile.name;
  description = profileData.LSP3Profile.LSP3Profile.description;

  links = profileData.LSP3Profile.LSP3Profile.links;
  firstLinkTitle = links[0].title;
  firstLinkURL = links[0].url;

  tags = profileData.LSP3Profile.LSP3Profile.tags;
  firstTag = tags[0];

  console.log('Name ' + name);
  console.log('Description: ' + description + '\n');
  console.log('Links: ' + JSON.stringify(links, undefined, 2) + '\n');
  console.log('Title of first Link: ' + firstLinkTitle);
  console.log('URL of first Link: ' + firstLinkURL + '\n');
  console.log('Tags: ' + JSON.stringify(tags, undefined, 2) + '\n');
  console.log('First tag: ' + firstTag + '\n');
}

/*
 * Fetch picture information from the JSON dataset of
 * a Universal Profile
 *
 * @return string Error
 */
async function fetchPictureData() {
  pictureData = await getProfile(SAMPLE_PROFILE_ADDRESS);
  let backgroundImagesIPFS =
    pictureData.LSP3Profile.LSP3Profile.backgroundImage;
  let profileImagesIPFS = pictureData.LSP3Profile.LSP3Profile.profileImage;

  try {
    for (let i in backgroundImagesIPFS) {
      backgroundImageLinks.push([
        i,
        baseURL + backgroundImagesIPFS[i].url.substring(7),
      ]);
    }

    for (let i in profileImagesIPFS) {
      profileImageLinks.push([
        i,
        baseURL + profileImagesIPFS[i].url.substring(7),
      ]);
    }

    fullSizeBackgroundImg = backgroundImageLinks[0][1];
    fullSizeProfileImg = profileImageLinks[0][1];

    console.log('Fullsize Background Image: ' + fullSizeBackgroundImg + '\n');
    console.log('Fullsize Background Image: ' + fullSizeProfileImg + '\n');

    console.log(
      'Background Image Links: ' +
        JSON.stringify(backgroundImageLinks, undefined, 2) +
        '\n',
    );

    console.log(
      'Background Image Links: ' +
        JSON.stringify(profileImageLinks, undefined, 2) +
        '\n',
    );
  } catch (error) {
    return console.log('Could not fetch images');
  }
}

/*
 * Fetch the address of the Universal Receiver from
 * the JSON dataset of an Universal Profile
 *
 * @return address of Universal Reveicer Delegate
 */
async function fetchReceiverData() {
  receiverData = await getProfile(SAMPLE_PROFILE_ADDRESS);
  return receiverData.LSP1UniversalReceiverDelegate;
}

// Step 1
console.log(isValidAddress(SAMPLE_PROFILE_ADDRESS));

// Step 2
getProfile(SAMPLE_PROFILE_ADDRESS).then((profileData) =>
  console.log(JSON.stringify(profileData, undefined, 2)),
);

// Step 3
fetchProfileData();
fetchPictureData();
fetchReceiverData().then((receiverAddress) => console.log(receiverAddress));
```
