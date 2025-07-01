---
title: Storing Custom Data
sidebar_label: Storing Custom Data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

While Universal Profiles are defined by a set of LUKSO Standard Proposals (LSPs), their underlying technology, **[ERC725Y](../../../standards/erc725.md#erc725y-data-representation)**, makes them generic key-value data stores. This means you are not limited to the data keys defined by standards like [LSP3 Profile Metadata](../../../standards/metadata/lsp3-profile-metadata.md). You can define and set your own, completely custom data keys.

This is incredibly powerful for dApps, allowing them to store application-specific information directly on a user's profile without needing a centralized database. For instance, a Web3 e-commerce dApp could store a user's preferred apparel sizes, or a gaming dApp could store a player's settings.

This guide will walk you through defining a custom data key, creating its associated data, and storing it on a Universal Profile. We will use the example of creating an `ApparelSize` key to store a JSON object with a user's clothing sizes.

## Goal

By the end of this guide, you will be able to:

1.  Define a custom ERC725Y JSON schema for your new data key.
2.  Create a JSON file with your custom data and upload it to IPFS.
3.  Encode the data according to your custom schema.
4.  Set the custom data on your Universal Profile by sending a transaction.

## Prerequisites

- You have a Universal Profile address and an Externally Owned Account (EOA) that has permission to modify the profile's data.
- You have access to a LUKSO RPC node. We'll use the [public LUKSO Testnet RPC](https://rpc.testnet.lukso.network).

## Step 1: Install Dependencies

We'll use `erc725.js` to handle schema encoding and a web3 library to interact with the blockchain.

<Tabs groupId="provider-lib">
<TabItem value="viem" label="viem" default>

```shell
npm install viem @erc725/erc725.js @lukso/lsp-smart-contracts
```

</TabItem>
<TabItem value="web3" label="web3.js">

```shell
npm install web3 @erc725/erc725.js @lukso/lsp-smart-contracts
```

</TabItem>
</Tabs>

## Step 2: Define a Custom Schema

The first step is to define your custom data key. According to the **[LSP2 ERC725YJSONSchema](../../../standards/metadata/lsp2-json-schema.md)** standard, schemas define the name, `bytes32` key, and value format for a piece of data.

Create a file named `MyCustomSchema.json`. For our example, we'll define a key named `ApparelSize`. Its `bytes32` representation is `keccak256('ApparelSize')`. We'll specify that its value will contain the JSON data directly (`JSON`), not a reference to an external file.

```json title="MyCustomSchema.json"
[
  {
    "name": "ApparelSize",
    "key": "0x66f6b3595283a81a38c4b693e43795679c6d5b4df15a1acbad668b556f875322",
    "keyType": "Singleton",
    "valueContent": "JSON",
    "valueType": "bytes"
  }
]
```

## Step 3: Prepare Your Data

Next, create the JSON object that contains the actual data for your custom key. Since we're storing the data directly on-chain, we don't need to upload it to IPFS.

```json title="apparel-sizes.json"
{
  "shoeSize": "US 10",
  "shirtSize": "M",
  "jacketSize": "L"
}
```

This JSON object will be encoded and stored directly in your Universal Profile's ERC725Y storage.

## Step 4: Encode and Set the Custom Data

Now, we'll write a script to put all the pieces together. It will:

1. Load your custom schema.
2. Define your JSON data object.
3. Encode the `ApparelSize` data key and value using the JSON directly.
4. Send a transaction to your Universal Profile to store the data.

Create a file named `set-custom-data.js`:

<Tabs groupId="provider-lib">
<TabItem value="viem" label="viem" default>

```javascript title="set-custom-data.js"
const {
  createWalletClient,
  createPublicClient,
  http,
  getContract,
  encodeFunctionData,
} = require('viem');
const { luksoTestnet } = require('viem/chains');
const { privateKeyToAccount } = require('viem/accounts');
const { ERC725 } = require('@erc725/erc725.js');
const MyCustomSchema = require('./MyCustomSchema.json');
const UniversalProfile = require('@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json');

// --- Configuration ---
const PRIVATE_KEY = '0x...'; // Your EOA private key with permissions
const UP_ADDRESS = '0x...'; // Your Universal Profile address
// ---------------------

const account = privateKeyToAccount(PRIVATE_KEY);

const publicClient = createPublicClient({
  chain: luksoTestnet,
  transport: http('https://rpc.testnet.lukso.network'),
});

const walletClient = createWalletClient({
  account,
  chain: luksoTestnet,
  transport: http('https://rpc.testnet.lukso.network'),
});

async function setCustomData() {
  // 1. Get the UP contract and Key Manager address
  const upContract = getContract({
    address: UP_ADDRESS,
    abi: UniversalProfile.abi,
    client: publicClient,
  });

  const keyManagerAddress = await upContract.read.owner();

  const keyManagerContract = getContract({
    address: keyManagerAddress,
    abi: KeyManager.abi,
    client: walletClient,
  });

  // 2. Define the JSON data to store
  const apparelData = {
    shoeSize: 'US 10',
    shirtSize: 'M',
    jacketSize: 'L',
  };

  // 3. Encode the custom data using your schema
  const erc725 = new ERC725(MyCustomSchema);
  const { key, value } = erc725.encodeData({
    keyName: 'ApparelSize',
    value: apparelData, // Pass the JSON object directly
  });

  // 4. Encode the `setData` call to be executed on the UP
  const setDataCalldata = encodeFunctionData({
    abi: UniversalProfile.abi,
    functionName: 'setData',
    args: [key, value],
  });

  // 5. Execute via the Key Manager
  console.log('Setting custom data on Universal Profile...');
  const txHash = await keyManagerContract.write.execute([setDataCalldata], {
    gas: 300_000n,
  });

  console.log('Transaction hash:', txHash);
  console.log(
    `Custom data set for profile: https://wallet.universalprofile.cloud/${UP_ADDRESS}`,
  );
}

setCustomData().catch(console.error);
```

</TabItem>
<TabItem value="web3" label="web3.js">

```javascript title="set-custom-data.js"
const { Web3 } = require('web3');
const { ERC725 } = require('@erc725/erc725.js');
const MyCustomSchema = require('./MyCustomSchema.json');
const UniversalProfile = require('@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json');
const KeyManager = require('@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json');

// --- Configuration ---
const RPC_ENDPOINT = 'https://rpc.testnet.lukso.network';
const PRIVATE_KEY = '0x...'; // Your EOA private key with permissions
const UP_ADDRESS = '0x...'; // Your Universal Profile address
// ---------------------

const web3 = new Web3(RPC_ENDPOINT);
const myAccount = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(myAccount);
web3.eth.defaultAccount = myAccount.address;

async function setCustomData() {
  // 1. Fetch the UP's Key Manager address
  const upContract = new web3.eth.Contract(UniversalProfile.abi, UP_ADDRESS);
  const keyManagerAddress = await upContract.methods.owner().call();
  const keyManager = new web3.eth.Contract(KeyManager.abi, keyManagerAddress);

  // 2. Define the JSON data to store
  const apparelData = {
    shoeSize: 'US 10',
    shirtSize: 'M',
    jacketSize: 'L',
  };

  // 3. Encode the custom data using your schema
  const erc725 = new ERC725(MyCustomSchema);
  const { key, value } = erc725.encodeData({
    keyName: 'ApparelSize',
    value: apparelData, // Pass the JSON object directly
  });

  // 4. Construct the `setData` call to be executed on the UP
  const setDataPayload = upContract.methods.setData(key, value).encodeABI();

  // 5. Execute via the Key Manager
  console.log('Setting custom data on Universal Profile...');
  const receipt = await keyManager.methods.execute(setDataPayload).send({
    from: myAccount.address,
    gas: 300_000,
  });

  console.log('Transaction successful! Receipt:', receipt);
  console.log(
    `Custom data set for profile: https://wallet.universalprofile.cloud/${UP_ADDRESS}`,
  );
}

setCustomData().catch(console.error);
```

</TabItem>
</Tabs>

Before running, replace the placeholder values for `PRIVATE_KEY` and `UP_ADDRESS`.

:::info Chain Configuration
Note that Viem requires explicit chain definitions. We use `luksoTestnet` from `viem/chains`. For mainnet, you would use `lukso` instead.
:::

Then, run the script:

```shell
node set-custom-data.js
```

## Step 5: Verify the Custom Data

You can verify that your custom data has been set by reading it directly from your Universal Profile. This script requires your custom schema to decode the on-chain data correctly.

Create `get-custom-data.js`:

<Tabs groupId="provider-lib">
<TabItem value="viem" label="viem" default>

```javascript title="get-custom-data.js"
const { createPublicClient, http } = require('viem');
const { luksoTestnet } = require('viem/chains');
const { ERC725 } = require('@erc725/erc725.js');
const MyCustomSchema = require('./MyCustomSchema.json');

const UP_ADDRESS = '0x...'; // Your Universal Profile address

const publicClient = createPublicClient({
  chain: luksoTestnet,
  transport: http('https://rpc.testnet.lukso.network'),
});

const erc725 = new ERC725(MyCustomSchema, UP_ADDRESS, publicClient, {});

async function getCustomData() {
  const customData = await erc725.getData('ApparelSize');
  console.log('Custom "ApparelSize" data:', customData.value);

  // The value is already the decoded JSON object
  console.log('Decoded JSON Content:', customData.value);
}

getCustomData().catch(console.error);
```

</TabItem>
<TabItem value="web3" label="web3.js">

```javascript title="get-custom-data.js"
const { ERC725 } = require('@erc725/erc725.js');
const MyCustomSchema = require('./MyCustomSchema.json');

const RPC_ENDPOINT = 'https://rpc.testnet.lukso.network';
const UP_ADDRESS = '0x...'; // Your Universal Profile address

const erc725 = new ERC725(MyCustomSchema, UP_ADDRESS, RPC_ENDPOINT, {});

async function getCustomData() {
  const customData = await erc725.getData('ApparelSize');
  console.log('Custom "ApparelSize" data:', customData.value);

  // The value is already the decoded JSON object
  console.log('Decoded JSON Content:', customData.value);
}

getCustomData().catch(console.error);
```

</TabItem>
</Tabs>

Run this script to see the decoded `ApparelSize` JSON data directly from your Universal Profile. Since we're storing the data directly on-chain, `erc725.js` automatically decodes it back to the original JSON object.

## Use Cases

Storing custom data on Universal Profiles opens up numerous possibilities for dApps:

- **E-commerce**: Store customer preferences, sizes, purchase history
- **Gaming**: Store player stats, achievements, game preferences
- **Social**: Store custom profile themes, privacy settings, social connections
- **Healthcare**: Store patient preferences, medical alert information (with proper privacy considerations)
- **Education**: Store certifications, course progress, learning preferences

Your custom data keys can be as simple or complex as needed, and you can define multiple schemas for different types of data within the same Universal Profile. The key is to design your schema thoughtfully and consistently so that your dApp and others can reliably read and interact with the data.

## Benefits of On-Chain Storage

By storing JSON data directly on-chain instead of using IPFS references, you gain several advantages:

- **Immediate availability**: No dependency on external storage networks
- **Guaranteed persistence**: Data lives as long as the blockchain exists
- **No broken links**: No risk of IPFS content becoming unavailable
- **Atomic updates**: Data changes happen in the same transaction as other contract interactions
- **Lower complexity**: No need to manage IPFS uploads and hash calculations

However, keep in mind that storing large amounts of data on-chain can be more expensive in terms of gas costs. This approach works best for smaller JSON objects like user preferences, settings, or metadata that needs to be highly available and persistent.
