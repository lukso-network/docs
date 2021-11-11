---
sidebar_label: "Creating a Universal Profile"
sidebar_position: 5.1
---

# Creating a Universal Profile

## Using LSP Factory

Our LSP Factory tool let you easily deploy a Universal Profile with just one line of code.

```javascript
let myUPAddress = await lspFactory.LSP3.deploy({});
```

You can then create an instance of your UP ready to interact with.

```javascript
import UniversalProfile from "@lukso/universalprofile-smart-contracts/build/contracts/UniversalProfile.json";

let myUPAddress = await lspFactory.LSP3.deploy({});

let myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);
```

## Interacting with your UP

### Setting some data

### Transfering LYX from your UP

### Interacting with other SC with your UP

```javascript
// do something on another SC
let otherSC_abi = myOtherSC.methods.myCoolfunction("dummyParameter").encodeABI();

// call the execute function on your UP (operation, to, value, calldata)
let abi = myUP.methods.execute(0, myOtherSCAddress, 0, otherSC_abi).encodeABI();
```
