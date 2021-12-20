---
sidebar_label: 'Create a Universal Profile'
sidebar_position: 1.1
---

# Create a Universal Profile

In this guide, you will learn how to:

- create your first Universal Profile.
- see your created profile on [universalprofile.cloud](https://universalprofile.cloud).

![My Universal Profile](./img/my-up.png)

We will be using Typescript and our [lsp-factory.js](../../tools/lsp-factoryjs/deployment/universal-profile.md) tool to create your Universal Profile. And this with **less than 50 lines of code!**.

## Setup

We will need to install some dependencies to get started.
Open you terminal, create a new project directory.

```shell
mkdir myUP
cd myUP
npm init
```

Install the following dependencies that we will need to follow this tutorial

```shell
npm install web3 @lukso/lsp-factory.js
```

## Introduction

<!-- <div style="text-align:center"> -->

![](./img/universal-profile-ownership.jpeg)

<!-- </div> -->

A Universal Profile is owned an controlled by an Externally Owned Account (EOA). So the first step to create your profile is to create an EOA that will control it.

You will use this EOA in this tutorial to create and deploy your Universal Profile. In the next tutorials, you will use the same EOA to interact with your Universal Profile.

![](./img/universal-profile-overview.jpeg)

In this guide, we will use our tool [lsp-factory.js](../../tools/lsp-factoryjs/introduction/getting-started.md). It will help you to deploy + setup easily a Universal Profile, with just few lines of code.

Under the hood, the lsp-factory.js performs the following actions:

1. deploying all the necessary contracts:
   - [Universal Profile](../../standards/universal-profile/03-lsp3-universal-profile.md) (UP)
   - [Universal Receiver Delegate](../../standards/universal-profile/02-lsp1-universal-receiver-delegate.md) (URD)
   - [Key Manager](../../standards/universal-profile/04-lsp6-key-manager.md) (KM)
2. setup everything for you (link your URD with your UP account + set all the [permissions](../../standards/universal-profile/04-lsp6-key-manager.md#types-of-permissions)).

> :arrow_right: &nbsp; [See our lsp-factory.js docs for more ](../../tools/lsp-factoryjs/introduction/getting-started)

## Step 1: Create a wallet

You can easily create an EOA with web3.js.

```javascript title="1-create-wallet.js"
import Web3 from 'web3';
const web3 = new Web3();

const wallet = web3.eth.accounts.wallet.create(1)[0];

console.log('private key: ', wallet.privateKey);
// 0x......... (64 characters long)

console.log('address: ', wallet.address);
// 0x......... (40 characters long)
```

## Step 2: Get some LYX

Now that you have created an EOA that will control your profile, you will need to fund your address with some test LYXt (the native cryptocurrency of the LUKSO blockchain).

You can request some test LYXt via the [L14 faucet]. Simply visit the faucet website, paste your generated address above in the field and click on **"REQUEST 5 LYX"**.

![L14 Faucet screenshot](./img/L14-faucet.png)

To ensure you have received some test LYXt, go to the L14 Explorer, and paste your address in the top right field _"Search by address..."_. You should see 5 LYX next to the field _Balance_.

![L14 Explorer](./img/l14-explorer.png)

## Step 3: Deploy your Universal Profile

Now that your wallet has been created, you are ready to create your first Universal Profile.

**3.1) Setup web3.js + import your wallet**

The first step is to setup web3.js to be connected to the [LUKSO L14 test network](https://blockscout.com/lukso/l14).

You will then import your wallet, and use it to deploy your Universal Profile. To do so, import your private key previously created in step 1.

```javascript
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l14.lukso.network');

const PRIVATE_KEY = '0x...'; // your wallet private key (previously created)
const wallet = web3.eth.accounts.wallet.add(PRIVATE_KEY);
```

**3.2) Initiate the lsp-factory.js**

The next step is to setup the lsp-factory object, so that you can access the methods to deploy your Universal Profile.

```javascript
// Create an instance of lsp-factory.js
const lspFactory = new LSPFactory(
  // We initialize the LSPFactory with the L14 chain RPC endpoint
  'https://rpc.l14.lukso.network',
  {
    // L14 chain ID
    chainId: 22,
    // We use your wallet's private key, to specify the EOA address that:
    //   1) will deploy the UP
    //   2) will be the UP owner
    deployKey: wallet.privateKey,
  },
);
```

**3.3) Deploy your Universal Profile**

The final step is to deploy your UP via the `LSP3UniversalProfile.deploy(...)` method. It will take 2 arguments:

- `controllingAccounts`: the EOA address that you will use to control your UP.
- `lsp3Profile`: an object that represents your LSP3Profile Metadata.

We will keep your LSP3Profile Metadata simple in this tutorial. But you can easily add more infos and details related to your UP in this object (this will be our next tutorial).

```typescript
const deployedContracts = await lspFactory.LSP3UniversalProfile.deploy({
  controllingAccounts: [wallet.address], // our wallet will be controlling our UP
  lsp3Profile: {
    name: 'My Universal Profile',
    description: 'My Cool Universal Profile',
    tags: ['Public Profile'],
    links: [
      {
        title: 'My Website',
        url: 'http://my-website.com',
      },
    ],
  },
});
```

If the deployment of your UP went successfully, the address of your newly created Universal Profile can be accessed from the returned value, as shown below:

```javascript
const myUPAddress = deployedContracts?.ERC725Account?.address;
console.log('my Universal Profile address: ', myUPAddress);
```

** Your Universal Profile has been created!**

Congratulation, you have created your first Universal Profile !

You can also see on the L14 Block explorer the contracts that have been created by this transaction:

https://blockscout.com/lukso/l14/address/your-wallet-address/transactions

## Final code

```javascript
import Web3 from 'web3';
import { LSPFactory } from '@lukso/lsp-factory.js';

const web3 = new Web3('https://rpc.l14.lukso.network');

const PRIVATE_KEY = '0x...'; // your wallet private key (previously created)
const wallet = web3.eth.accounts.wallet.add(PRIVATE_KEY);

// Deploy your UP via lsp-factory.js
const lspFactory = new LSPFactory(
  // We initialize the LSPFactory with the L14 chain RPC endpoint
  'https://rpc.l14.lukso.network',
  {
    // L14s chain Id
    chainId: 22,
    // We use your wallet privatekey, to specify the EOA address that:
    //   1) will deploy the UP
    //   2) will be the UP owner
    deployKey: wallet.privateKey,
  },
);

async function createUniversalProfile() {
  const deployedContracts = await lspFactory.LSP3UniversalProfile.deploy({
    controllingAccounts: [wallet.address], // our wallet will be controlling our UP
    lsp3Profile: {
      name: 'My Universal Profile',
      description: 'My Cool Universal Profile',
      tags: ['Public Profile'],
      links: [
        {
          title: 'My Website',
          url: 'http://my-website.com',
        },
      ],
    },
  });

  const myUPAddress = deployedContracts?.ERC725Account?.address;
  console.log('my Universal Profile address: ', myUPAddress);

  return deployedContracts;
}

createUniversalProfile();
```

[l14 faucet]: http://faucet.l14.lukso.network/
