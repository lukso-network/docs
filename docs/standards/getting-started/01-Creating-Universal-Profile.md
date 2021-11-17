---
sidebar_label: "Create a Universal Profile"
sidebar_position: 2.2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::success

We recommend using our [lsp-factory.js](../../tools/lsp-factoryjs/getting-started.md) tool. It is the easiest way to get started with Universal Profile. It will deploy your UP + make all the setup for you.

These docs also include code snippets to deploy from scratch using ethers.js or web3.js.

:::

## Deploy your Universal Profile

### Using LSP Factory

Our [LSP Factory tool](../../tools/lsp-factoryjs/getting-started.md) let you easily deploy a Universal Profile with just few lines of code.

```javascript
const { LSPFactory } = require("@lukso/lsp-factory.js");

const lspFactory = new LSPFactory(
  provider.connection.url, // https://rpc.l14.lukso.network
  {
    deployKey: '0x...'; // Private key of the account which will deploy the UP,
    chainId: 22, // chain Id of the L14 network
  }
);

// Deploy UniversalProfile + KeyManager + UniversalReceiverDelegate
const myContracts = await lspFactory.LSP3UniversalProfile.deploy({
    controllingAccounts: ["0x..."], // Address which will controll the UP
    lsp3Profile: {
        name: "My Universal Profile",
        description: "My cool Universal Profile",
        links: [{ title: "My Website", url: "www.my-website.com" }],
    },
});

const myUPAddress = myContracts.ERC725Account.address;
```

You can then create an instance of your UP ready to interact with.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import UniversalProfile from "@lukso/universalprofile-smart-contracts/build/contracts/UniversalProfile.json";

const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
import UniversalProfile from "@lukso/universalprofile-smart-contracts/build/contracts/UniversalProfile.json";

const myUP = new ethers.Contract(myUPAddress, UniversalProfile.abi);
```

  </TabItem>

</Tabs>

<br/>

### Manually with web3.js / ethers.js

<details>
    <summary><b>NB:</b> Alternatively, you can create your Universal Profile from scratch, via web3.js or ethers.js.</summary>

<Tabs>

  <TabItem value="web3js" label="web3.js">

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

  </TabItem>

</Tabs>

</details>

<br/>

---

## Interact with your UP

:::caution

If you have deployed your UP via the lsp-factory, your UP is deployed with a KeyManager attached to it.
Please head over _Interact via the Key Manager_ in the next page.

:::

### Add / Edit your `LSP3Profile` metadata

:::info

If you have deployed your UP via the lsp-factory, you can skip this section. Your profile details were already setup on deployment :)

:::

You can add details to your Universal Profile (or edit existing details) by adding / updating the LSP3Profile metadata.

This take the form of a JSON file on stored on ipfs, where your Universal Profile refers to.

You can do so in 3 steps:

1. upload the JSON file to IPFS (via lsp-factory, or manually)
2. encode the JSON file (our `erc725.js` tool provide convenience for this)
3. set your new `LSP3Profile` metadata in your profile.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

  </TabItem>

</Tabs>

### Set data in the key-value store

```
My first Key
Hello Lukso :)
```

### Transfer LYX

To transfer LYX from your UP, simply make a `CALL` (operation 0) and do not set any data for the last fourth parameter `data`.

But if you just want to send LYX from your UP, the data field should be empty.

```javascript
execute(
  0, // operation CALL
  recipient, // address of the recipient to send LYX to (an externally owned account, or a contract address)
  amount, // amount of LYX to transfer
  "" // empty payload
);
```

### Interact with other smart contracts

If the recipient is a smart contract where you want to run some function (for instance myFunction(...)), then the data field should be the abi encoded function myFunction with the parameters you want to pass.

```javascript
// do something on another SC
let otherSC_abi = myOtherSC.methods.myCoolfunction("dummyParameter").encodeABI();

// call the execute function on your UP (operation, to, value, calldata)
let abi = myUP.methods.execute(0, myOtherSCAddress, 0, otherSC_abi).encodeABI();
```
