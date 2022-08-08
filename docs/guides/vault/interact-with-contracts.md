---
sidebar_label: 'Interact With Contracts'
sidebar_position: 3
---

# Interact With Contracts

Similar to our **[previous guide](./edit-vault-data.md)** on setting data on the Vault, in this guide we will be learning how to **interact with other contracts** through the Vault's execute function.

## Interact with contracts

Check the **[edit Vault data guide](./edit-vault-data.md)** to know how to get the needed variables (myVault, myUP, myVaultAddress).

```typescript title="Interacting with other contracts through the vault"
// encode the payload of the function we want to call 
// could be a transfer function of a token, function on a Decentralized exchange, etc.
const targetPayload = targetContract.methods
  .myCoolfunction('dummyParameter')
  .encodeABI();

// encode executing the targetPayload on the Vault
const executePayloadVault = await myVault.methods.execute(
    0, // OPERATION CALL
    targetContract.address, // address of the contract we want to interact with
    0, // value to transfer
    targetPayload
    )
    .encodeABI();

// encode executing the executePayloadVault on the UP
const executePayloadUP = await myUP.methods.execute(
    0, // OPERATION CALL
    myVaultAddress,
    0, // value to transfer
    executePayloadVault
    )
    .encodeABI();

// getting the Key Manager address from UP
const myKeyManagerAddress = await myUP.methods.owner().call()

// create an instance of the KeyManager
let myKM = new web3.eth.Contract(LSP6KeyManager.abi, myKeyManagerAddress);

// executing the executePayloadUP on the KM
await myKM.methods.execute(executePayloadUP).send({
    from: myEOA.address,
    gasLimit: 600_000,
    });
```
