---
sidebar_label: 'Read LSP8 NFT Metadata'
sidebar_position: 4
description: Learn how to read the metadata specific to a LSP8 NFT.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read LSP8 NFT Metadata

If your digital asset contract is an [LSP8](/standards/tokens/LSP8-Identifiable-Digital-Asset.md) NFT or Collection, you can fetch the metadata of specific token IDs.

There are two different ways to retrieve the metadata of a `tokenId` based on the configuration of the contract.

| Method 1 - Call [`getDataForTokenId(...)`](../../../contracts/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.md#getdatafortokenid) **(recommended)**                                                                         | Method 2 - Read [`LSP8TokenMetadataBaseURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenmetadatabaseuri)                                                                                                   |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| This method retrieves individual metadata directly from the contract. Suitable for any token ID formats, including non-sequential token IDs, token IDs created after contract deployment, or if the metadata was updated for a certain subset. | With this method, you can dynamically generate the URL to individual metadata files. This is usually done when the token IDs of an NFT or Collection can be pre-determined by a sequence, are set up in advance, or if metadata is uploaded or updated in bulk. |

:::info Order of Data Fetches

Due to different versions of setting and fetching token IDs based on the asset conditions, returned values might be empty. Therefore, it's **recommended to first call** the [`getDataForTokenId(...)`](../../../contracts/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.md#getdatafortokenid) to check for specific metadata. If the metadata is not set on the token ID, **continue to retrieve** the [`LSP8TokenMetadataBaseURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenmetadatabaseuri) of the [LSP8](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) contract.

If neither _Token ID Metadata_ nor _Base URI_ are set, you should fall back and fetch the [Global Token Information](#global-token-information), potentially including a Base URI to [retrieve the JSON content](#get-the-json-content).

:::

## Setup

We will need the following dependencies to follow this guide:

- [`lsp-smart-contracts`](../../../tools/libraries/lsp-smart-contracts/getting-started.md) to import the LSP8 contract ABI.
- [`erc725.js`](../../../tools/libraries/erc725js/getting-started.md) to easily get [ERC725Y](/standards/erc725.md) data keys and decode their values.

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```bash
npm i ethers @erc725/erc725.js @lukso/lsp-smart-contracts
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```bash
npm i web3 @erc725/erc725.js @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

## Create instance of the LSP8 Contract

Create an instance of the LSP8 NFT contract, replacing the `<myAssetAddress>` with the actual contract address. You can give it a try using a sample LSP8 asset on the LUKSO Testnet: [`0x8734600968c7e7193BB9B1b005677B4edBaDcD18`](https://wallet.universalprofile.cloud/asset/0x8734600968c7e7193BB9B1b005677B4edBaDcD18?network=testnet).

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
// Add the necessary imports to your JS file
import { ethers } from 'ethers';
import lsp8Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

const provider = new ethers.JsonRpcProvider('https://4201.rpc.thirdweb.com');

// Create contract instance
const myAssetContract = new ethers.Contract(
  '<myAssetAddress>',
  lsp8Artifact.abi,
  provider,
);
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```bash
npm install web3 @erc725/erc725.js @lukso/lsp-smart-contracts
```

```js
// Add the necessary imports to your JS file
import Web3 from 'web3';
import lsp8Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://4201.rpc.thirdweb.com'),
);
// Create contract instance
const myAssetContract = new web3.eth.Contract(
  lsp8Artifact.abi,
  '<myAssetAddress>',
);
```

  </TabItem>

</Tabs>

## Preparing the Token IDs Format

The [LSP8](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) allows for different [Token ID Formats](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat), meaning developers can specify their token IDs as `Number`, `String`, `Smart Contract Address`, `Byte Identifier` or `Hash Digest`.

To call the contract, you **must first prepare your token IDs** to match the standardized **Byte32 Hex Strings** based on the [`LSP8TokenIdFormat`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat) standardization. The **global token ID format** can be fetched from the [ERC725Y](/standards/erc725.md#erc725y-generic-data-keyvalue-store) data storage using the [`getData()`](../../../contracts/contracts/ERC725/ERC725.md#getdata) function:

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
// ...

// Get the global token ID format
let tokenIdFormat = parseInt(
  await myAssetContract.getData(ERC725YDataKeys.LSP8['LSP8TokenIdFormat']),
  16,
);

console.log(tokenIdFormat);
// 0
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```js
// ...

// Get the global token ID format
let tokenIdFormat = parseInt(
  await myAssetContract.methods
    .getData(ERC725YDataKeys.LSP8['LSP8TokenIdFormat'])
    .call(),
  16,
);

console.log(tokenIdFormat);
// 0
```

  </TabItem>

</Tabs>

Its value can indicate whether the token ID format is [equal or mixed across all token IDs](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat)

If your token ID is not yet compatible to [`LSP8TokenIdFormat`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat), you have to convert it to the correct format first. Otherwise, you will be able to directly continue with fetching the metadata.

<details>
    <summary>How to convert a <code>tokenID</code> to a <code>Byte32 Hex String</code> according to <code>LSP8TokenIdFormat</code></summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
// ...

// Sample Token ID of the contract
// Could be 1, my-token-id, 0x123, etc.
const myTokenId = '1';

// Convert a token ID according to LSP8TokenIdFormat
const convertTokenId = (tokenID: string, tokenIdFormat: number) => {
  switch (tokenIdFormat) {
    case 0:
    case 100:
      // uint256 - Number (Left padded)
      return ethers.zeroPadValue('0x0' + BigInt(tokenID).toString(16), 32);
    case 1:
    case 101:
      // string - String (Right padded)
      return ethers.encodeBytes32String(tokenID).padEnd(32, '0');
    case 2:
    case 102:
      // address - Smart Contract (Left padded)
      return ethers.zeroPadValue(tokenID, 32);
    case 3:
    case 103:
      // bytes32 - Unique Bytes (Right padded)
      return ethers
        .hexlify(ethers.getBytes(tokenID).slice(0, 32))
        .padEnd(66, '0');
    case 4:
    case 104:
      // bytes32 - Hash Digest (No padding)
      return tokenID;
  }
};

let byte32TokenId = convertTokenId(myTokenId, tokenIdFormat);
console.log(byte32TokenId);
// 0x0000000000000000000000000000000000000000000000000000000000000001

// If token ID format is mixed, retrieve it for the individual token ID
if (tokenIdFormat >= 100) {
  tokenIdFormat = parseInt(
    await myAssetContract.getDataForTokenId(
      byte32TokenId,
      ERC725YDataKeys.LSP8['LSP8TokenIdFormat'],
    ),
    16,
  );
  byte32TokenId = convertTokenId(myTokenId, tokenIdFormat);
  console.log(tokenIdFormat);
  // 0x0000000000000000000000000000000000000000000000000000000000000001
}
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```js
// ...

// Sample Token ID of the contract
// Could be 1, my-token-id, 0x123, etc.
const myTokenId = '1';

// Convert a token ID according to LSP8TokenIdFormat
const convertTokenId = (tokenID: string, tokenIdFormat: number) => {
  switch (tokenIdFormat) {
    case 0:
    case 100:
      // uint256 - Number (Left padded)
      return Web3.utils.padLeft(Web3.utils.toHex(myTokenId), 64);
    case 1:
    case 101:
      // string - String (Right padded)
      return Web3.utils.utf8ToHex(myTokenId).padEnd(66, '0');
    case 2:
    case 102:
      // address - Smart Contract (Left padded)
      return Web3.utils.padLeft(myTokenId, 64);
    case 3:
    case 103:
      // bytes32 - Unique Bytes (Right padded)
      return Web3.utils.toHex(myTokenId).padEnd(66, '0');
    case 4:
    case 104:
      // bytes32 - Hash Digest (No padding)
      return myTokenId;
  }
};

let byte32TokenId = convertTokenId(myTokenId, tokenIdFormat);
console.log(byte32TokenId);
// 0x0000000000000000000000000000000000000000000000000000000000000001

// If token ID format is mixed, retrieve it for the individual token ID
if (tokenIdFormat >= 100) {
  tokenIdFormat = parseInt(
    await myAssetContract.getDataForTokenId(
      byte32TokenId,
      ERC725YDataKeys.LSP8['LSP8TokenIdFormat'],
    ),
    16,
  );
  byte32TokenId = convertTokenId(myTokenId, tokenIdFormat);
  console.log(tokenIdFormat);
  // 0x0000000000000000000000000000000000000000000000000000000000000001
}
```

  </TabItem>

</Tabs>

</details>

## Get Data from Token ID

After preparing the token ID, you can start to fetch the ID-specific metadata.

To get token ID metadata, you will have to make a direct contract call by calling [`getDataForTokenId()`](../../../contracts/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.md#getdatafortokenid):

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
// ...

// Sample token ID (1) parsed according to LSP8TokenIDFormat
const byte32TokenId = '<myTokenID>';

async function fetchTokenIdMetadata(tokenID: string) {
  // Get the encoded asset metadata
  const tokenIdMetadata = await myAssetContract.getDataForTokenId(
    tokenID,
    ERC725YDataKeys.LSP4['LSP4Metadata'],
  );

  const erc725js = new ERC725(lsp4Schema);

  // Decode the metadata
  const decodedMetadata = erc725js.decodeData([
    {
      keyName: 'LSP4Metadata',
      value: tokenIdMetadata,
    },
  ]);
  console.log(decodedMetadata);
}

fetchTokenIdMetadata(byte32TokenId);
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```js
// ...

// Sample token ID (1) parsed according to LSP8TokenIDFormat
const byte32TokenId = '<myTokenID>';

async function fetchTokenIdMetadata(tokenID: string) {
  const isLSP8 = await myAssetContract.methods.supportsInterface(
    INTERFACE_IDS.LSP8IdentifiableDigitalAsset,
  );

  if (!isLSP8) {
    console.log('Asset is not an LSP8.');
    return;
  }

  // Get the encoded asset metadata
  const tokenIdMetadata = await myAssetContract.methods.getDataForTokenId(
    tokenID,
    ERC725YDataKeys.LSP4['LSP4Metadata'],
  );

  const erc725js = new ERC725(lsp4Schema);

  // Decode the metadata
  const decodedMetadata = erc725js.decodeData([
    {
      keyName: 'LSP4Metadata',
      value: tokenIdMetadata,
    },
  ]);

  console.log(decodedMetadata);
}

fetchTokenIdMetadata(byte32TokenId);
```

  </TabItem>

</Tabs>

:::info

Make sure to adjust `<myTokenID>` with the actual token ID as Byte32 Hex String according to [LSP8TokenFormat](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat). You can give it a try using a sample token ID: `0x0000000000000000000000000000000000000000000000000000000000000001` representing token ID `1` of the `Number` format.

:::

<details>
<summary>Show result</summary>

```js
{
    "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
    "name": "LSP4Metadata",
    "value": {
      "verification": {
        "method": "keccak256(utf8)",
        "data": "0x9eefcdac3d60500619b075273c0371a6633d8f531179c882facd4f991281c658"
      },
      "url": "ipfs://QmeKNiTr4xfdHDUinGmYC4osu1ZHoFHDDj87WBSX5z4k7x"
    }
  }
```

</details>

After retrieving the metadata from the contract, you can continue to [retrieve the actual JSON content](#get-the-json-content). If the token ID data is empty, continue fetching the Base URI and retrieving the JSON using a file link.

## Get Data from Base URI

:::caution Version Support

Assets created with LSP versions below 🛠️ [`@lukso/lsp-smart-contracts`](../../../tools/libraries/lsp-smart-contracts/getting-started.md) of `v0.14.0` lack support for retrieving token ID metadata from a Base URI. For previous LSP8 assets, the Base URI may be retrievable by calling the [`fetchData`](../../../tools/libraries/erc725js/methods.md#fetchdata) function as described in the [Global Token Information](#global-token-information) section.

:::

You can fetch the [`LSP8TokenMetadataBaseURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenmetadatabaseuri) and build the correct metadata link by concatenating the [formatted](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat) token ID. Based on the [`LSP8TokenIDFormat`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenidformat), the Base URI can either be:

- **equal across all token IDs**: To fetch the global Base URI, use the [`getData(...)`](../../../contracts/contracts/ERC725/ERC725.md#getdata) function of the asset to receive the [ERC725Y data storage](/standards/erc725.md#erc725y-generic-data-keyvalue-store). This applies if the [`LSP8TokenIDFormat`](#preparing-the-token-ids) is `0, 1, 2, or 4`.
- **mixed across all token IDs**: To fetch the individual Base URI, use the [`getDataFromTokenID(...)`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#getdatafortokenid) function using a specific token ID. This has to be done if the [`LSP8TokenIDFormat`](#preparing-the-token-ids) is `100, 101, 102, or 104`.

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
// ...

async function fetchBaseURI(tokenID: string, tokenIdFormat: number) {
  // Retrieve the global Base URI
  let tokenBaseURI = await myAssetContract.getData(
    ERC725YDataKeys.LSP8['LSP8TokenMetadataBaseURI'],
  );

  if (tokenBaseURI == '0x') {
    console.log('BaseURI not set.');
    return;
  }

  if (tokenIdFormat >= 100) {
    tokenBaseURI = await myAssetContract.getDataForTokenId(
      byte32TokenId,
      ERC725YDataKeys.LSP8['LSP8TokenIdFormat'],
    );
  }

  // Decode the baseURI
  const decodedBaseURI = erc725js.decodeData([
    {
      keyName: 'LSP8TokenMetadataBaseURI',
      value: tokenBaseURI,
    },
  ]);

  // Return Base URI
  return decodedBaseURI;
}

const baseURI = fetchBaseURI(byte32TokenId, tokenIdFormat);
console.log(baseURI);
// https://my.metadata-link.xyz/asset
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```js
/// ...

async function fetchBaseURI(tokenID: string, tokenIdFormat: number) {
  // Retrieve the global Base URI
  let tokenBaseURI = await myAssetContract.methods.getData(
    ERC725YDataKeys.LSP8['LSP8TokenMetadataBaseURI'],
  );

  if (tokenBaseURI == '0x') {
    console.log('BaseURI not set.');
    return;
  }

  if (tokenIdFormat >= 100) {
    tokenBaseURI = await myAssetContract.methods.getDataForTokenId(
      byte32TokenId,
      ERC725YDataKeys.LSP8['LSP8TokenIdFormat'],
    );
  }

  // Decode the baseURI
  const decodedBaseURI = erc725js.decodeData([
    {
      keyName: 'LSP8TokenMetadataBaseURI',
      value: tokenBaseURI,
    },
  ]);

  // Return Base URI
  return decodedBaseURI;
}

const baseURI = fetchBaseURI(byte32TokenId, tokenIdFormat);
console.log(baseURI);
// https://my.metadata-link.xyz/asset
```

  </TabItem>

</Tabs>

## Get the JSON Content

After **retrieving and decoding** the [Token ID Metadata](#get-data-from-token-id) or [Base URI](#get-data-from-base-uri), you can fetch the metadata JSON.

<Tabs groupId="data-type">
  <TabItem value="tokenid" label="Token ID Metadata">

If you retrieved the metadata using [`getDataFromTokenID(...)`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#getdatafortokenid), the URL will be nested within the `value` field of the metadata. However, this link might only be partial string or content ID, instead of a full link. Therefore, you may have to adjust the link before it can be fetched:

```js
// ...

const metadataURL = decodedMetadata[0].value.url;

function generateMetadataLink(link: string) {
  // If link is a regular Web2 Link, it can be passed back
  if (link.startsWith('https://') || link.startsWith('http://')) {
    // Use your default IPFS Gateway address
    return link;
  }
  // If link has custom protocol, adjust the link
  if (link.startsWith('ipfs://')) {
    // Use your default IPFS Gateway address
    return `https://api.universalprofile.cloud/ipfs/${link.slice(7)}`;
  } else {
    return null;
  }

  // Handle other cases if needed ...
}

// Build link to JSON metadata
const metadataJsonLink = generateMetadataLink(metadataURL);

// Fetch the URL
if (metadataJsonLink) {
  const response = await fetch(metadataJsonLink);
  const jsonMetadata = await response.json();
  console.log('Metadata Contents: ', jsonMetadata);
} else {
  console.log('Could not generate metadata link based on value.url content.');
}
```

  </TabItem>

  <TabItem value="baseuri" label="Base URI">

If you retrieved the metadata using [`LSP8TokenMetadataBaseURI`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md#lsp8tokenmetadatabaseuri), the URL will always be generated by combining the Base URL with previously prepared token ID as Byte32 Hex String. You can simply concatenate them to retrieve the full link. However, the token ID needs to be decoded first.

<details>
    <summary>How to decode a <code>tokenID</code> from <code>Byte32 Hex String</code> according to <code>LSP8TokenIdFormat</code></summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
// ...

function decodeTokenId(encodedTokenId: string, tokenIdFormat: number) {
  switch (tokenIdFormat) {
    // Number
    case 0:
    case 100:
      return BigInt(encodedTokenId).toString();
    // String
    case 1:
    case 101:
      return ethers.toUtf8String(encodedTokenId).replace(/\0+$/, '');
    // Address
    case 2:
    case 102:
      return '0x' + encodedTokenId.slice(encodedTokenId.length - 40);
    // Byte Value
    case 3:
    case 103:
      // Extracts the non-zero portion (right padded)
      return encodedTokenId.replace(/0+$/, '');
    // Hash Digest
    case 4:
    case 104:
      // Hash digests are not modified during encoding, so return as is
      return encodedTokenId;
  }
}

// Decode the token ID based on the token ID format
const decodedTokenId = decodeTokenId(byte32TokenId, tokenIdFormat);
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```js
// ...

function decodeTokenId(encodedTokenId: string, tokenIdFormat: number) {
  switch (tokenIdFormat) {
    // Number
    case 0:
    case 100:
      return BigInt(encodedTokenId).toString();
    // String
    case 1:
    case 101:
      return web3.utils.hexToUtf8(encodedTokenId).replace(/\0+$/, '');
    // Address
    case 2:
    case 102:
      return '0x' + encodedTokenId.slice(encodedTokenId.length - 40);
    // Byte Value
    case 3:
    case 103:
      // Extracts the non-zero portion (right padded)
      return encodedTokenId.replace(/0+$/, '');
    // Hash Digest
    case 4:
    case 104:
      // Hash digests are not modified during encoding, so return as is
      return encodedTokenId;
  }
}

// Decode the token ID based on the token ID format
const decodedTokenId = decodeTokenId(byte32TokenId, tokenIdFormat);
```

  </TabItem>

</Tabs>

</details>

```js
// ...

// Build link to JSON metadata
const baseURLlink = decodedBaseURI[0].value.url;
const metadataJsonLink = `${baseURLlink}${decodedTokenId}`;

// Fetch the URL
const response = await fetch(metadataJsonLink);
const jsonMetadata = await response.json();
console.log('Metadata Contents: ', jsonMetadata);
```

  </TabItem>

</Tabs>

<details>
<summary>Show result</summary>

```js
{
    "LSP4Metadata": {
      "name": "My Token Name",
      "description": "Sample Description",
      "links": [{ "title": "", "url": "" }],
      "icon": [
        {
          "width": 1600,
          "height": 1600,
          "url": "ipfs://QmRHz3nbd2wQ4uNCJQS9JDnZRdD6aqueWRZ2h89dMkCLXf"
        }
      ],
      "images": [
        [
          {
            "width": 1000,
            "height": 1000,
            "url": "ipfs://QmRHz3nbd2wQ4uNCJQS9JDnZRdD6aqueWRZ2h89dMkCLXf",
            "verification": {
              "method": "keccak256(bytes)",
              "data": "0x7e89fc626703412916d27580af2bae16db479036f12d4d48f4efd24d70224dc2"
            }

          }
        ]
      ],
      "assets": [],
      "attributes": [
        {
          "key": "Standard type",
          "value": "LSP",
          "type": "string"
        },
        {
          "key": "Standard number",
          "value": 4,
          "type": "number"
        }
      ]
    }
  }
```

</details>
