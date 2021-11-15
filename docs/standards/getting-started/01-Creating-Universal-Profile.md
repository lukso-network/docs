---
sidebar_label: "Create a Universal Profile"
sidebar_position: 2.2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::success

Our tool [lsp-factory.js](../../tools/lsp-factoryjs/getting-started.md) is the easiest way to get started with Universal Profile. It will deploy your UP + make all the setup for you.

If you do not want to use our tool, we provide docs for deploying from scratch via ethers.js or web3.js. Click on the relevant tabs below for the code snippet

:::

# Create a Universal Profile

## Deploy your Universal Profile

Our LSP Factory tool let you easily deploy a Universal Profile with just one line of code.
Alternatively, you can create your Universal Profile from scratch, via either web3.js or ethers.

<Tabs>

  <TabItem value="lsp-factory" label="lsp-factory.js" default>

```javascript
let myUPAddress = await lspFactory.LSP3.deploy({});
```

You can then create an instance of your UP ready to interact with.

```javascript
import UniversalProfile from "@lukso/universalprofile-smart-contracts/build/contracts/UniversalProfile.json";

let myUPAddress = await lspFactory.LSP3.deploy({});

let myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);
```

  </TabItem>
  
  <TabItem value="web3js" label="web3.js">

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

  </TabItem>

</Tabs>

## Add infos with a LSP3Profile JSON file

:::info

If you have deployed your UP via the lsp-factory, you can skip this section. Your profile details were already provided on deployment :)

:::

You can add the standard barebone infos to your Universal Profile by adding a LSP3Profile.

This occur in two steps:

1. upload the JSON file to IPFS (via lsp-factory, or manually)
2. encode the JSON file (our `erc725.js` tool provide convenience for this)
3. set data in your profile

You can either upload the JSON file to IPFS and get the link, or pass the details of your UP as a Javascript object.

<Tabs>

  <TabItem value="lsp-factory" label="lsp-factory.js" default>

  </TabItem>
  
  <TabItem value="web3js" label="web3.js">

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

  </TabItem>

</Tabs>

## Interact with your UP

:::info

If you have deployed your UP via the lsp-factory, your UP is deployed with a KeyManager attached to it.
Please head over _Interact via the Key Manager_ in the next page.

:::

### Setting some data

```
My first Key
Hello Lukso :)
```

### Transfering LYX from your UP

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

### Interacting with other SC with your UP

If the recipient is a smart contract where you want to run some function (for instance myFunction(...)), then the data field should be the abi encoded function myFunction with the parameters you want to pass.

```javascript
// do something on another SC
let otherSC_abi = myOtherSC.methods.myCoolfunction("dummyParameter").encodeABI();

// call the execute function on your UP (operation, to, value, calldata)
let abi = myUP.methods.execute(0, myOtherSCAddress, 0, otherSC_abi).encodeABI();
```
