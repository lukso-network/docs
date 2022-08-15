---
id: getting-started
title: Getting Started
sidebar_position: 1
---

Here you will find tutorials and tools that help you build on LUKSO. As LUKSO is an EVM-based Blockchain, all tools and tutorials for Ethereum also work well for LUKSO. If you need EVM and Smart Contract knowledge, we advise you to look at [these great resources from the Ethereum Foundation](https://ethereum.org/en/developers/learning-tools/).

Other than most EVM chains, you're encouraged on LUKSO to mainly use [Universal Profiles](../standards/universal-profile/introduction.md) as the account solution for dApps and as a gateway for your users to the LUKSO Blockchain. It is discouraged to use simple EOAs as accounts, as they are insecure, inflexible and don't track incoming assets. If you need a more general understanding of why we build our accounts on the smart contract level, we advise you to read about the [LUKSO Ecosystem](https://medium.com/lukso/lukso-ecosystem-part-1-4c3f5d67b081) concept.

## UP in 1-2-3

This little tutorial will show you how to deploy and interact with a Universal Profile.
To maximize your learning, you can:

- run this tutorial in the console of the [profile explorer](https://l16.universalprofile.cloud),
- clone the [`up-sample-react-app`](https://github.com/Hugoo/up-sample-react-app) repo and work in it,
- write your own JavaScript or TypeScript code snippets on top, and
- check the [demo app](https://hugoo.github.io/up-sample-react-app/) for some first impressions.

:::info
The [profile explorer](https://l16.universalprofile.cloud) has all necessary entities under the `contracts` object. Take a look at different profiles and assets you want to experiment with within your code.
:::

:::note
We will use the [`@erc725/erc725.js`](../tools/erc725js/getting-started) NPM package in order to get quick access to reading keys, values and ABIs.
:::

#### Generate a key that will control your Universal Profile.

```js title="Load web3"
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l16.lukso.network');

const myDummyPassword = 'mypassword';

// Here we try to load an already created key from the localstorage
web3.eth.accounts.wallet.load(myDummyPassword);

// If none exists we create a new key
if (!web3.eth.accounts.wallet.length) {
  web3.eth.accounts.wallet.create(1);
  web3.eth.accounts.wallet.save(myDummyPassword);

  // Then we log the address and send test LYX from the L16 faucet here: http://faucet.l16.lukso.network
  console.log('My new key address ', web3.eth.accounts.wallet[0].address);

  // If we already have a key created we display it, with its current balance
} else {
  const myKeyAddress = web3.eth.accounts.wallet[0].address;

  console.log('Loaded existing key address ', myKeyAddress);
  console.log(
    'Balance ',
    web3.utils.fromWei(await web3.eth.getBalance(myKeyAddress), 'ether'),
    'LYXt',
  );
}

// Stop here if our key is yet created and funded
if (!myKeyAddress) return;
```

#### Fund the Universal Profile by using the [L16 Faucet](http://faucet.l16.lukso.network).

#### Deploy your UP smart contracts using [`@lukso/lsp-factory.js`](../tools/lsp-factoryjs/getting-started).

```js title="Deploy and configure contracts with lsp-factory.js"
import { LSPFactory } from '@lukso/lsp-factory.js';

// We initialize the LSPFactory with the right chain RPC endpoint and a private key from which we will deploy the UPs
const lspFactory = new LSPFactory('https://rpc.l16.lukso.network', {
  chainId: 2828, // L16s chain Id
  deployKey: web3.eth.accounts.wallet[0].privateKey,
});

const deployedContracts = await lspFactory.LSP3UniversalProfile.deploy({
  controllerAddresses: [myKeyAddress], // our key will be controlling our UP in the beginning
  lsp3Profile: {
    name: 'My Universal Profile',
    description: 'My Cool Universal Profile',
    profileImage: [fileBlob], // got some Image uploaded?
    backgroundImage: [],
    tags: ['Public Profile'],
    links: [
      {
        title: 'My Website',
        url: 'http://my-website.com',
      },
    ],
  },
});

// Get the UP address
const myUPAddress = deployedContracts.ERC725Account.address;
// 0xB46BBD556589565730C06bB4B7454B1596c9E70A
```

#### Read the UP smart contract ERC725Y keys and values with [`@erc725/erc725.js`](../tools/erc725js/getting-started).

```js title="Read Universal Profile ERC725 keys/values with erc725.js"
import { ERC725 } from '@erc725/erc725.js';

// Part of LSP3-UniversalProfile Schema
// https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-3-UniversalProfile.md
const schema = [
  {
    name: 'SupportedStandards:LSP3UniversalProfile',
    key: '0xeafec4d89fa9619884b6b89135626455000000000000000000000000abe425d6',
    keyType: 'Mapping',
    valueContent: '0xabe425d6',
    valueType: 'bytes',
  },
  {
    name: 'LSP3Profile',
    key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
    keyType: 'Singleton',
    valueContent: 'JSONURL',
    valueType: 'bytes',
  },
  {
    name: 'LSP1UniversalReceiverDelegate',
    key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
    keyType: 'Singleton',
    valueContent: 'Address',
    valueType: 'address',
  },
];

const provider = new Web3.providers.HttpProvider(
  'https://rpc.l16.lukso.network',
);

const erc725 = new ERC725(schema, myUPAddress, provider);
const config = {
  ipfsGateway: 'https://ipfs.lukso.network/ipfs/',
};

const data = await erc725.fetchData();

console.log(data);
```

```json title="console.log(data)"
{
  "SupportedStandards:LSP3UniversalProfile": "0xabe425d6",
  "LSP3Profile": {
    "LSP3Profile": {
      "name": "My Universal Profile",
      "description": "My Cool Universal Profile",
      "backgroundImage": [],
      "tags": ["Public Profile"],
      "links": [
        {
          "title": "My Website",
          "url": "http://my-website.com"
        }
      ]
    }
  },
  "LSP1UniversalReceiverDelegate": "0x9A668677384CD4F5c49Cb057f0cEB2b783Ed670F"
}
```

#### Interact directly with any smart contract through your UP, by loading the ABIs from [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts).

```js title="Interact directly through your UP"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';

const myUP = new web3.eth.Contract(UniversalProfile.abi, erc725Address);

const keyManagerAddress = await myUP.methods.owner().call();

console.log(keyManagerAddress);
// e.g. 0x72662E4da74278430123cE51405c1e7A1B87C294

const myKeyManager = new web3.eth.Contract(KeyManager.abi, keyManagerAddress);

// Set data on your own UP, though the key manager
const abi = myUP.methods
  .setData(
    ['0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5'], // LSP3Profile
    [
      '0x6f357c6ad6c04598b25d41b96fb88a8c8ec4f4c3de2dc9bdaab7e71f40ed012b84d0c126697066733a2f2f516d6262447348577a4d4d724538594345766e3342633254706756793176535736414d3946376168595642573874',
    ], // encoded JSONURL: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#jsonurl
  )
  .encodeABI();

// send your tx to the blockchain, from the controlling key address, through the key manager
await myKeyManager.methods.execute(abi).send({
  from: web3.eth.accounts.wallet[0].address,
  gas: 200_000,
  gasPrice: web3.utils.toWei('20', 'gwei'),
});

// OR interact with another contract
let myOtherSC = new web3.eth.Contract(MyOtherSC.abi, myOtherSCAddress);

// get the ABI of the call on the other contract
let abi = myOtherSC.methods.myCoolfunction('dummyParameter').encodeABI();

// call the execute function on your UP (operation = 0 = CALL, to, value, calldata)
abi = myUP.methods.execute(0, myOtherSCAddress, 0, abi).encodeABI();

// send your tx to the blockchain, from the controlling key address, through the key manager
myKeyManager.methods.execute(abi).send({
  from: web3.eth.accounts.wallet[0].address,
  gas: 200_000,
  gasPrice: web3.utils.toWei(20, 'gwei'),
});
```
