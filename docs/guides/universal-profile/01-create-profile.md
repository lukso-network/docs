---
sidebar_label: 'Create a Universal Profile'
sidebar_position: 1.1
---

# Create a Universal Profile

In this guide, we will learn how to:

- create an Universal Profile.
- see our new Universal Profile on [universalprofile.cloud](https://universalprofile.cloud).

![My Universal Profile](./img/my-up.png)

We will be using our tool [lsp-factory.js](../../tools/lsp-factoryjs/deployment/universal-profile.md) to create a Universal Profile in **less than 50 lines of code!**.

## Introduction

A Universal Profile is a smart contract that implements the **Ownable** design pattern. This means it is a contract that has an owner. The Contract's owner is a blockchain `address` that can represent anything, such as:

- an Externally Owned Account (EOA), or many EOAs.
- a multi-sig wallet.
- an other smart contract that can represent anything (a DAO, a DEX, etc...).

![](./img/universal-profile-ownership.jpeg)

With this design pattern, the contract can be designed with _functionalities that can only be performed by the owner_. This gives the contract owner more control and privileges.

In the context of Universal Profiles, _reading data from the contract storage can be done by anyone_. But only the owner can:

- `setData` = add, edit or remove data from the ERC725Y storage.
- `execute` = calling other contracts, doing LYX transfers, create other contracts (see ERC725X executor)

In this guide, our Universal Profile's owner will be a contract called a Key Manager. The Key Manager is a smart contract that enables to give specific permissions (_eg: _ transferring LYX on behalf of the Universal Profile) to `address`es, so that they can interact on the Universal Profile.

![](./img/universal-profile-overview.jpeg)

We will use our [lsp-factory.js](../../tools/lsp-factoryjs/introduction/getting-started.md) tool to deploy + setup easily a Universal Profile, with just few lines of code.

Under the hood, the lsp-factory.js performs the following:

1. deploys all the necessary contracts:
   - [Universal Profile](../../standards/universal-profile/03-lsp3-universal-profile.md) (UP) - core smart contract that represents your Universal Profile.
   - [Universal Receiver Delegate](../../standards/universal-profile/02-lsp1-universal-receiver-delegate.md) (URD) - contract that react on events, such as tokens received or transferred.
   - [Key Manager](../../standards/universal-profile/04-lsp6-key-manager.md) (KM) - controller for your Universal Profile.
2. link your URD with your UP account + set its permissions
3. set all the permissions for an EOA address, so that it can acts as the UP admin.

> :arrow_right: &nbsp; [See our lsp-factory.js docs for more details](../../tools/lsp-factoryjs/introduction/getting-started)

:::info
The figure above is our default setup for Universal Profile.<br/>
However, using a Key Manager as an owner is optional. You can create a Universal Profile without a Key Manager (or a Universal Receiver Delegate linked to it).

Bear in mind that you can implement any complex ownership structure on top of Universal Profiles.
For more details, we recommend looking at [EIP-173: Contract Ownership Standard](https://eips.ethereum.org/EIPS/eip-173)
:::

## Setup our project

Before to get started, we are going to create a new folder that will contain all the code of our tutorial.
We will also install in project folder the dependencies that we will use.

First, open a terminal and create a new directory, and goes inside it.

```shell
mkdir myUP
cd myUP
```

Then, install the following dependencies that we will use in this tutorial.

```shell
npm install web3 @lukso/lsp-factory.js --save
```

## Step 1: Create an EOA

As describe before in our introduction, the first step before to create our Universal Profile is to create an EOA that will control it.

We can easily create an EOA with web3.js, with the [`web3.eth.accounts.create()`](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#create) function.

Create a **temporary file** and use the web3.js code snippet below to generate an EOA. It will generate an object that contains:

- a private key (32 bytes / 64 characters long).
- an address (20 bytes / 40 characters long).
- some singing methods like `sign`

```javascript title="create-wallet.js (temporary file)"
import Web3 from 'web3';
const web3 = new Web3();

const myEOA = web3.eth.accounts.create();
console.log(myEOA);
// output: {
//     address: "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01",
//     privateKey: "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709",
//     signTransaction: function(tx){...},
//     sign: function(data){...},
//     encrypt: function(password){...}
// }
```

> See the [Web3.js docs](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#) for more infos on creating an EOA

You can then load your EOA using the private key previously displayed via `console.log`.

```javascript
import Web3 from 'web3';

const web3 = new Web3();

const PRIVATE_KEY = '0x...'; // your EOA private key (previously created)
const wallet = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
```

## Step 2: Get some LYX

After we have created an EOA that will control your profile in **step 1**, we will need to fund our address with some test LYX (the native cryptocurrency of the LUKSO blockchain).

You can [request some test LYXt via the L14 faucet](http://faucet.l14.lukso.network/). Simply visit the faucet website, paste your generated address above in the field and click on **"REQUEST 5 LYX"**.

![L14 Faucet screenshot](./img/L14-faucet.png)

To ensure you have received some test LYX, [go to the L14 Explorer](https://blockscout.com/lukso/l14), and paste your address in the top right field _"Search by address..."_. You should see 5 LYX next to the field _"Balance"_.

![L14 Explorer](./img/l14-explorer.png)

## Step 3: Deploy your Universal Profile

Now that we have created our EOA, we are ready to create your first Universal Profile.

Create a **new main JS file** called `main.js`. It will contain all the main runtime script to create our Universal Profile.

**3.1 - Setup web3.js + import your wallet**

The first step is to setup web3.js to be connected to the [LUKSO L14 test network](https://blockscout.com/lukso/l14).

We will start by import our EOA, and use it to deploy our Universal Profile. To do so, import the private key previously created in **step 1**.

```javascript title="main.js"
import Web3 from 'web3';

const web3 = new Web3('https://rpc.l14.lukso.network');

const PRIVATE_KEY = '0x...'; // your EOA private key (previously created)
const wallet = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
```

:::danger Never expose your private key!
Your private key is what enables you to control your EOA. Therefore, it should NEVER be exposed.

For simplicity in this tutorial, we load the EOA by using a hardcoded private key (as a literal string).
However, your private key should never be hardcoded in your code.

**Conclusion: ALWAYS make sure that your private key is stored securely**, and never exposed.
:::

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

:arrow_right: Go to the next tutorial to learn **[How to add a profile picture to your Universal Profile + edit your profile infos.](./02-edit-profile.md)**

:arrow_down: Look a the full code snippet below to help you debugging.

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

[l14 faucet]:
