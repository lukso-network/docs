---
id: getting-started
title: Getting Started
sidebar_position: 1
---

Here you will find tutorials and tools that help you building on LUKSO. As LUKSO is an EVM based Blockchain, all tools tutorials for Ethereum work well for LUKSO to, if you need EVM and Smart Contract knowledge we advise you look at [these great resources from the Ethereum Foundation](https://ethereum.org/en/developers/learning-tools/).


Other than most EVM chains, you're encouraged on LUKSO to mainly use [Universal Profiles](../standards/Universal-Profiles.md) as the main account of your dApps and as a gateway for your users to the LUKSO Blockchain. It is discouraged to use simple EOAs as accounts, as they are insecure, inflexible and don't track incoming assets.

## UP in 1-2-3

This little tutorial will show you how to deploy and interact with a UniversalProfile.
You can run this tutorial in the console of <https://universalprofile.cloud>, which has all necessary contract objects available.

First generate a key, that will control your UP and fund it via the [L14 Faucet](http://faucet.l14.lukso.network):

```js
import Web3 from 'web3'

const web3 = new Web3('https://rpc.l14.lukso.network')

const myDummyPassword = 'mypassword'

// Here we try to load an already created key from the localstorage
web3.eth.accounts.wallet.load(myDummyPassword)

// If none exists we create a new key
if(!web3.eth.accounts.wallet.length) {
  
    web3.eth.accounts.wallet.create(1)
    web3.eth.accounts.wallet.save(myDummyPassword)

    // Then we log the address and send test LYX from the L14 faucet here: http://faucet.l14.lukso.network
    console.log('My new key address ', web3.eth.accounts.wallet[0].address)

// If we already have a key created we display it, with its current balance
} else {
    const myKeyAddress = web3.eth.accounts.wallet[0].address

    console.log('Loaded existing key address ', myKeyAddress)
    console.log('Balance ', web3.utils.fromWei(await web3.eth.getBalance(myKeyAddress), 'ether'), 'LYXt')
}

// Stop here if our key is yet created and funded
if(!myKeyAddress)
    return
```

Next we deploy your UP smart contracts using the [LSPFactory NPM package](./lsp-factoryjs/getting-started):

```js
import { LSPFactory } from '@lukso/lsp-factory.js'

// We initialize the LSPFactory with the right chain RPC endpoint and a privatekey from which we will deploy the UPs
const lspFactory = new LSPFactory("https://rpc.l14.lukso.network", {
   chainId: 22, // L14s chain Id
   deployKey: web3.eth.accounts.wallet[0].privateKey
});

const deployedContracts = await lspFactory.LSP3UniversalProfile.deploy({
  controllerAddresses: [myKeyAddress], // our key will be controlling our UP in the beginning
  lsp3Profile: {
    name: "My Universal Profile",
    description: "My Cool Universal Profile",
    profileImage: [fileBlob], // got some Image uploaded?
    backgroundImage: [],
    tags: ['Public Profile'],
    links: [
      {
        title: "My Website",
        url: "http://my-website.com",
      },
   ],
  }
});

// Get the UP address
const myUPAddress = deployedContracts.ERC725Account.address;

```


## 🛠 Tools

- [erc725.js](./erc725js/getting-started)
- [lsp-factory.js](./lsp-factoryjs/getting-started)

## 🔌 Services

- [Relayer](./relayer-api/execute-transaction)
- [ERC725 Inspect 📝🔍](./erc725-tools)
