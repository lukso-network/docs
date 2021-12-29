---
sidebar_label: 'Create a Universal Profile'
sidebar_position: 1.1
---

# Create a Universal Profile

In this guide, we will learn how to:

- create an Universal Profile.
- see our new Universal Profile on [universalprofile.cloud](https://universalprofile.cloud).

![My Universal Profile](./img/my-up.png)

We will use our tool [lsp-factory.js](../../tools/lsp-factoryjs/deployment/universal-profile.md) to create a Universal Profile in **less than 50 lines of code!**

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

As describe before in the introduction, our first step is to create an EOA that will be used to control our Universal Profile.

We can easily create an EOA using the [`web3.eth.accounts.create()`](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#create) method from web3.js.

Create a **temporary file** and add the code snippet below. It will generate an object that contains:

- a private key (32 bytes / 64 characters long).
- an address (20 bytes / 40 characters long).
- some singing methods like `sign`

```javascript title="create-eoa.js (temporary file)"
const Web3 = require('web3');
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

Run the script above with node.js to generate + display your EOA private key + address.

```bash
node create-eoa.js # or <name-of-your-temporary-file>.js
```

> See the [Web3.js docs](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#) for more infos on creating an EOA

You can then load your EOA using the private key previously displayed via `console.log`.

```javascript
const Web3 = require('web3');
const web3 = new Web3();

const PRIVATE_KEY = '0x...'; // your EOA private key (previously created)
const myEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
```

## Step 2: Get some LYX

After we have created an EOA that will control your profile in **step 1**, we will need to fund our address with some test LYX (the native cryptocurrency of the LUKSO blockchain).

You can request some test LYX via the **[L14 Faucet](http://faucet.l14.lukso.network/)**. Simply visit the faucet website, paste your generated address above in the field and click on **"REQUEST 5 LYX"**.

:arrow_right: **[LUKSO L14 Faucet Website](http://faucet.l14.lukso.network/)**

![L14 Faucet screenshot](./img/L14-faucet.png)

To ensure you have received some test LYX, go to the **[LUKSO L14 Block Explorer](https://blockscout.com/lukso/l14)**, and paste your address in the top right field _"Search by address..."_. You should see 5 LYX next to the field _"Balance"_.

:arrow_right: **[LUSKO L14 Block Explorer](https://blockscout.com/lukso/l14)**

![L14 Explorer](./img/l14-explorer.png)

## Step 3: Create our Universal Profile

Now that we have created our EOA, we are ready to create our first Universal Profile.

Create a **new file**: `main.js`.

It will contain all the main runtime script to create our Universal Profile.

### 3.1 - Import the wallet

We will start by importing our EOA in our main JS file, so that we can use it to deploy our Universal Profile.

To do so, import the private key previously created in **step 1**.

```javascript title="main.js"
const Web3 = require('web3');
const web3 = new Web3();

const PRIVATE_KEY = '0x...'; // your EOA private key (previously created)
const myEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
// myEOA = {
//     address: "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01",
//     privateKey: "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709",
//     signTransaction: function(tx){...},
//     sign: function(data){...},
//     encrypt: function(password){...}
// }
```

:::danger Never expose your private key!
Your private key is what enables you to control your EOA. Therefore, it should NEVER be exposed.

For simplicity in this tutorial, we load the EOA by using a hardcoded private key (as a literal string).
However, your private key should never be hardcoded in your code.

**Conclusion: ALWAYS make sure that your private key is stored securely**, and never exposed.
:::

### 3.2 - Setup the lsp-factory.js

The next step is to import + setup our lsp-factory.js tool. It will give us access to a `.deploy(...)` method that we will use to create our Universal Profile.

```javascript
const { LSPFactory } = require('@lukso/lsp-factory.js');

// Create an instance of lsp-factory.js
const lspFactory = new LSPFactory(
  // We initialize the LSPFactory with the L14 chain RPC endpoint
  'https://rpc.l14.lukso.network',
  {
    // L14 chain ID
    chainId: 22,
    // We use your EOA's private key, to specify the EOA address that:
    //   1) will deploy the UP
    //   2) will be the UP owner
    deployKey: myEOA.privateKey,
  },
);
```

### 3.3 - Deploy the Universal Profile

The final step is to deploy our UP via the `LSP3UniversalProfile.deploy(...)` method.

The `deploy` function from the lsp-factory.js will take an object as argument, that must contain 2 elements:

- `controllingAccounts`: the EOA address(es) that we will use to control our UP.
- `lsp3Profile`: an object that represents your `LSP3Profile` Metadata.

> We keep our `LSP3Profile` metadata simple in this tutorial. But you can easily add more details about your UP in this object, like an original `name`, `description`, or some custom tags in the `tags` array.

```javascript
// Put this in an `async` function
// so you can run the `deploy` method
const deployedContracts = await lspFactory.LSP3UniversalProfile.deploy({
  controllingAccounts: [myEOA.address], // our EOA will be controlling our UP
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

:::info Learn more
**The Universal Profile can be controlled by multiple addresses.** The key `controllingAccounts` accepts an array of addresses.

**Adding more details** to our Universal Profile (_e.g.: links, profile images, background images..._) will be **our next tutorial!** :art:
:::

### 3.4 - Visualise your Universal Profile

If the deployment of our UP went successfully, the address of our newly created Universal Profile can be accessed from the returned value, as shown below:

```javascript
const myUPAddress = deployedContracts.ERC725Account.address;
console.log('my Universal Profile address: ', myUPAddress);
// output: 0x...
```

You can now visualize your UP on the universalprofile.cloud website, by pasting the returned address after the `/` (slash) as follow:

*https://universalprofile.cloud/your-up-address*

You can also see on the LUKSO L14 Block explorer the contracts that have been created by the lsp-factory.js:

*https://blockscout.com/lukso/l14/address/your-eoa-address/transactions*

_picture of transaction on L14 + explanation of each contract created, linked to the picture shown above._

## Congratulation!

** Your Universal Profile has been created!**

Congratulation! You have created your first Universal Profile!

:arrow_right: Go to the next tutorial to learn **[How to add a profile picture to your Universal Profile + edit your profile infos.](./02-edit-profile.md)**

:arrow_down: Look a the full code snippet below to help you debugging.

## Final code

```javascript
const Web3 = require('web3');
const { LSPFactory } = require('@lukso/lsp-factory.js');

const web3 = new Web3();

const PRIVATE_KEY = '0x...'; // your EOA private key (previously created)
const myEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);

// Deploy your UP via lsp-factory.js
const lspFactory = new LSPFactory(
  // We initialize the LSPFactory with the L14 chain RPC endpoint
  'https://rpc.l14.lukso.network',
  {
    // L14s chain Id
    chainId: 22,
    // We use our EOA privatekey, to specify the EOA address that:
    //   1) will deploy the UP
    //   2) will be the UP owner
    deployKey: myEOA.privateKey,
  },
);

async function createUniversalProfile() {
  const deployedContracts = await lspFactory.LSP3UniversalProfile.deploy({
    controllingAccounts: [myEOA.address], // our wallet will be controlling our UP
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

  const myUPAddress = deployedContracts.ERC725Account.address;
  console.log('my Universal Profile address: ', myUPAddress);

  return deployedContracts;
}

createUniversalProfile();
```
