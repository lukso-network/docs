---
sidebar_label: 'Edit Vault Data'
sidebar_position: 2
---

# Edit Vault Data

This guide will teach you how to setData to an **[LSP9Vault](../../standards/smart-contracts/lsp9-vault.md)** contract. Any data can be attached to the vault and since it supports **[LSP1-UniversalReceiver](../../standards/generic-standards/lsp1-universal-receiver.md)** standard, we will be setting the [**Universal Receiver Delegate**](../../standards/smart-contracts/lsp1-universal-receiver-delegate-vault.md) address inside the storage.

## Setting Data (Universal Receiver Delegate)

The default implementation of the **Universal Receiver Delegate** of the Vault, that we are going to deploy will register the assets received to the storage and removes them on a balance equal 0.

### Deploying Universal Receiver Delegate (URD)

:::info

The **Universal Profile** and the **Vault** don't use the same implementation of the Universal Receiver Delegate.
:::


```typescript title="Deploying the universal receiver delegate of the vault"
import LSP1UniversalReceiverDelegateVault from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateVault.json';

// create an instance
let myURDVault = new web3.eth.Contract(LSP1UniversalReceiverDelegateVault.abi, {
  gas: 5_000_000,
  gasPrice: '1000000000',
});

// deploy the universal receiver delegate Vault contract
await myURDVault
  .deploy({
    data: LSP1UniversalReceiverDelegateVault.bytecode
  })
  .send({
    from: myEOA.address,
  });
```


### Setting the URD address in the storage

The owner of the Vault could be an **EOA**, or any **other contract**. In our case we will suppose that the owner of the Vault is a Universal Profile that is controlled by a Key Manager.

```typescript title="Setting the URD address in the storage"
import constants from "@lukso/lsp-smart-contracts/constants.js";
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';

const URD_DATA_KEY = constants.ERC725YKeys.LSP0.LSP1UniversalReceiverDelegate;
const myUniversalProfileAddress = "0x.." // address of the UP
const myVaultAddress = "0x.." // address of the Vault
const myURDAddress = "0x.." // address of the URD of the Vault 

// create an instance of the Vault
let myVault = new web3.eth.Contract(LSP9Vault.abi, myVaultAddress);

// create an instance of the UP
let myUP = new web3.eth.Contract(UniversalProfile.abi, myUniversalProfileAddress);

// encode setData Payload on the Vault
const setDataPayload = await myLSP9Vault.methods[
    "setData(bytes32,bytes)"
  ](URD_DATA_KEY, myURDAddress).encodeABI();  // Any other information can be stored here

// encode execute Payload on the UP
const executePayload = await myUP.methods.execute(
    0, // OPERATION CALL
    myVaultAddress,
    0, // value to transfer
    setDataPayload
    )
    .encodeABI();

// getting the Key Manager address from UP
const myKeyManagerAddress = await myUP.methods.owner().call();

// create an instance of the KeyManager
let myKM = new web3.eth.Contract(LSP6KeyManager.abi, myKeyManagerAddress);

// execute the executePayload on the KM
await myKM.methods.execute(executePayload).send({
    from: myEOA.address,
    gasLimit: 600_000,
    });
```

## Reading Data

The **LSP9Vault** contract is an **ERC725** alike contract, it shares the same way to read data with Universal Profiles and other types of ERC725 contracts through **[erc725.js](../../tools/erc725js/getting-started.md)**.

You can refer to this **[previous guide](../universal-profile/read-profile-data.md)** to learn how to **fetch data** (received assets, issued assets, etc ..), you will need to replace the address of the **Universal Profile** with the address of the **Vault**.
