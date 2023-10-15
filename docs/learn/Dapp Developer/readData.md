---
sidebar_label: 'Read Profile Data'
sidebar_position: 1
---

# Read Universal Profile Data

In this guide, we will learn how to read data from a [Universal Profile](../../standards/universal-profile/introduction.md).

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('/img/learn/up_view.png').default}
    alt="Universal Profile example on universalprofile.cloud"
  />
<br/>
<i>A <a href="https://wallet.universalprofile.cloud/0x6979474Ecb890a8EFE37daB2b9b66b32127237f7">Universal Profile</a> as seen on UniversalProfile.cloud</i>
</div>

We will use:

- [erc725.js](../../tools/erc725js/getting-started/) library to check the interface of a profile.
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) to enable you to use `fetch()` in Node.js code.

## Setup

Open a terminal in the project's folder of your choice and install all required libraries.

```shell
npm install web3 @erc725/erc725.js isomorphic-fetch
```

## Step 1 - Call the Universal Profile

<details>
<summary>
To inspect the address and check if it has an ERC725 contract, we can call its interface through the `erc725.js` library. The instance of the contract will need the following information:</summary>

<div>

- [LSP3 - Profile Metadata](../../standards/universal-profile/lsp3-profile-metadata) describes the data in the Universal Profile contract storage, and which data keys to use to retrieve it. We can import the schema directly from the [erc725.js](../../tools/erc725js/schemas#standard-lsp-schemas) library.

  - `SupportedStandards` shows the interface using a Metadata Standard with a key. In our case we use `SupportedStandards:LSP3UniversalProfile` from to check if the contract is a Universal Profile.
  - `LSP3Profile` shows the data of the Universal Profile.
  - `LSP12IssuedAssets[]` shows assets the Universal Profile issued.
  - `LSP5ReceivedAssets[]` shows assets the Universal Profile received.
  - `LSP1UniversalReceiverDelegate` will point to the [Universal Receiver](../../standards/generic-standards/lsp1-universal-receiver/) of the Universal Profile.

- `address`: the address of the contract
- `provider`: a [provider](../../tools/erc725js/providers) object. Usually used with the RPC endpoint URL
- `config`: used to configure the IPFS gateway

Besides the schema, we also use `isomorphic-fetch` to fetch the HTTP response from the profile while using `node` for execution. You may not need this library if you use browser environments like `ReactJS` or `VueJS`.

</div>
</details>

After importing the ERC725 object, we can declare all data needed to instantiate the Universal Profile as ERC725 contract instance.

:::info
After initializing the ERC725 profile, we can choose between calling the `getData()` or `fetchData()` function on it.

- `getData()` will give the basic profile information with keys, names, and the values, including its hash and URL.
- `fetchData()` will also fetch the linked data from the storage URLs and include it within the response.

We will use the convenient `fetchData()` function since we only need one command to return the complete profile information list without separately grazing the storage files afterward.  
:::

```javascript title="read_profile.js"
import { ERC725 } from '@erc725/erc725.js'; // Library to check the interface of a profile
import 'isomorphic-fetch'; // Enables you to use 'fetch()' in Node.js code
import erc725schema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json' assert { type: 'json' };

// Parameters for ERC725 Instance
const config = { ipfsGateway: 'https://2eff.lukso.dev/ipfs/' };

/*
 * Try fetching the @param's Universal Profile
 *
 * @param address of Universal Profile
 * @return string JSON or custom error
 */
async function fetchProfile(address) {
  try {
    const profile = new ERC725(erc725schema, address, provider, config);
    return await profile.fetchData();
  } catch (error) {
    console.log(error);
    return console.log('This is not an ERC725 Contract');
  }
}

// Debug
fetchProfile(0x6979474ecb890a8efe37dab2b9b66b32127237f7).then((profileData) =>
  console.log(JSON.stringify(profileData, undefined, 2)),
);
```

If everything went fine, we now have the profile's [LSP3 - Universal Profile Metadata](../../standards/universal-profile/lsp3-profile-metadata) JSON. It should look like this JSON file:

<details>
    <summary>Show JSON response</summary>

```json
[
  {
    "key": "...",
    "name": "SupportedStandards:LSP3UniversalProfile",
    "value": null
  },
  {
    "key": "...",
    "name": "LSP3Profile",
    "value": {
      "LSP3Profile": {
        "name": "...",
        "links": [
          {
            "title": "...",
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
            "url": "ipfs://..."
          },
          ...
        ],
        "backgroundImage": [
          {
            "width": 1512,
            "height": 1998,
            "hashFunction": "keccak256(bytes)",
            "hash": "0x...",
            "url": "ipfs://..."
          },
          ...
        ],
        "tags": [
          "...",
          ...
        ]
      }
    }
  },
  {
    "key": "0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd",
    "name": "LSP12IssuedAssets[]",
    "value": []
  },
  {
    "key": "0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b",
    "name": "LSP5ReceivedAssets[]",
    "value": []
  },
  {
    "key": "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
    "name": "LSP1UniversalReceiverDelegate",
    "value": "0x..."
  }
]
```

</details>

## Step 2 - Get Specific Information

With the JSON response, we can fetch all sorts of data including:

- `SupportedStandards:LSP3UniversalProfile`: Check if the smart contract is an LSP3 Universal Profile
- `LSP3Profile`: The data of the Universal Profile (name, description, tags, links, pictures)
- `LSP12IssuedAssets[]`: Assets the Universal Profile issued
- `LSP5ReceivedAssets[]`: Assets the Universal Profile received
- `LSP1UniversalReceiverDelegate`: The Universal Receiver that belongs to the Universal Profile

:::info
To only get one specific part of information from the Universal Profile, you can define a specific name within the `fetchData()` function of the [erc725.js](../../tools/erc725js/getting-started/) library.
:::

In our case, to only read the profile's information, we can use `fetchData('LSP3Profile')`. Otherwise, you could just search trough the full JSON array from step before to extract the desired element.

```javascript title="read_profile.js"
// ...

/*
 * Fetch the @param's Universal Profile's
 * LSP3 data
 *
 * @param address of Universal Profile
 * @return string JSON or custom error
 */
async function fetchProfileData(address) {
  try {
    const profile = new ERC725(erc725schema, address, provider, config);
    return await profile.fetchData('LSP3Profile');
  } catch (error) {
    return console.log('This is not an ERC725 Contract');
  }
}

// Debug
fetchProfileData(SAMPLE_PROFILE_ADDRESS).then((profileData) =>
  console.log(JSON.stringify(profileData, undefined, 2)),
);
```
