---
sidebar_label: "Adding control to your UP"
sidebar_position: 5.2
---

# Adding control to your UP via a KeyManager

In order to interact with the KeyManager, you will need to download its ABI from our npm package

```javascript
import KeyManager from "@lukso/universalprofile-smart-contracts/build/contracts/KeyManager/KeyManager.json";
```

## Using LSPFactory

when you create a Universal Profile using the LSP Factory tools, a Key Manager is automatically deployed and ownership of your UP is automatically transfered to it.

You can then easily get you KeyManager's address by querying the `owner()` of the UP, and create an instance of the KM from this address.

```javascript
let keyManagerAddress = await myUP.methods.owner().call();
let myKeyManager = new web3.eth.Contract(KeyManager.abi, keyManagerAddress);
```
