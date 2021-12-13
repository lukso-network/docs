---
sidebar_label: 'Create a Universal Profile'
sidebar_position: 2.2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a Universal Profile

:::success Useful Tip

We recommend using our [lsp-factory.js](../tools/lsp-factoryjs/introduction/getting-started.md) tool. It is the easiest way to get started with Universal Profile.

:::

## Deploy your Universal Profile

> :arrow_right: &nbsp; [See our lsp-factory.js guide on how to deploy a Universal Profile](https://docs.lukso.tech/tools/lsp-factoryjs/introduction/getting-started#instantiation)

Our [lsp-factory.js tool](../tools/lsp-factoryjs/introduction/getting-started.md) let you easily deploy a Universal Profile (UP) with just few lines of code.

It will help you to get started quickly by:

1. deploying all the necessary contracts (UniversalProfile, LSP6KeyManager, LSP1UniversalReceiverDelegate).
2. setup everything for you (link your LSP1UniversalReceiverDelegate (URD) with your account + set all the permissions).

## Instantiate your contracts

After deploying with the lsp-factory.js, can obtain the address of each contract deployed as follow:

```javascript
const myContracts = await lspFactory.LSP3UniversalProfile.deploy(...)

// UniversalProfile -> UP
const myUPAddress = myContracts.ERC725Account.address;

// UniversalReceiverDelegate -> URD
const myURDAddress = myContracts.UniversalReceiverDelegate:.address;

// LSP6Keymanager -> KM
const myKMAddress = myContracts.KeyManager.address;
```

You can then create an instance of your Universal Profile, Key Manager and Universal Receiver Delegate ready to be interact with.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import UniversalProfile from '@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json';
import UniversalReceiverDelegate from '@lukso/universalprofile-smart-contracts/artifacts/LSP1UniversalReceiverDelegate";
import KeyManager from '@lukso/universalprofile-smart-contracts/artifacts/LSP6KeyManager.json';

const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);
const myURD = new web3.eth.Contract(UniversalReceiverDelegate.abi, myKMAddress)
const myKM = new web3.eth.Contract(KeyManager.abi, myURDAddress)
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
import UniversalProfile from '@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json';
import UniversalReceiverDelegate from '@lukso/universalprofile-smart-contracts/artifacts/LSP1UniversalReceiverDelegate';
import KeyManager from '@lukso/universalprofile-smart-contracts/artifacts/LSP6KeyManager.json';

const myUP = new ethers.Contract(myUPAddress, UniversalProfile.abi);
const myURD = new ethers.Contract(myKMAddress, UniversalReceiverDelegate.abi);
const myKM = new ethers.Contract(myURDAddress, KeyManager.abi);
```

  </TabItem>

</Tabs>

:::info Alternative way to create a KeyManager instance

When you create a UP using [lsp-factory.js](../tools/lsp-factoryjs/introduction/getting-started.md), ownership of your Universal Profile is automatically transferred to the Key Manager.

You can then easily get your KeyManager's address by querying the `owner()` of the UP, and create an instance of the KM from this address.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
let keyManagerAddress = await myUP.methods.owner().call();
let myKeyManager = new web3.eth.Contract(KeyManager.abi, keyManagerAddress);
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
let keyManagerAddress = await myUP.callStatic.owner();
let myKeyManager = new ethers.Contract(keyManagerAddress, KeyManager.abi);
```

  </TabItem>

</Tabs>

:::
