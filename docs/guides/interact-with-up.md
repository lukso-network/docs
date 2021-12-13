---
sidebar_label: 'Using your Universal Profile'
sidebar_position: 2.2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using your Universal Profile

### Edit your `LSP3Profile` metadata

You can add details to your Universal Profile (or edit existing ones) by adding / updating the LSP3Profile metadata.

This take the form of a JSON file on stored on ipfs, where your Universal Profile refers to.

You can do so in 3 steps:

1. upload the JSON file to IPFS (via lsp-factory, or manually)
2. encode the JSON file (our `erc725.js` tool provide convenience for this)
3. set your new `LSP3Profile` metadata in your profile.

### Set data in the key-value store

Below is a basic example of how to set any key-value pair in the storage of your Universal Profile.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const key = web3.utils.keccak256('MyFirstKey');
const value = web3.utils.stringToHex('Hello LUKSO!');

await myUp.methods.setData([key], [value], { from: '<address-of-up-owner>' });
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
const key = ethers.utils.keccak256('MyFirstKey');
const value = ethers.utils.hexlify(ethers.utils.toUtf8Bytes('Hello LUKSO!'));

// upOwner should be of type SignerWithAddress
await myUp.connect(upOwner).setData([key], [value]);
```

  </TabItem>

</Tabs>

### Transfer LYX

You can transfer LYX from your Universal Profile to any `address` via the `.execute(...)` function.

The parameters of the function will be as follow:

- `_operation`: `0` (for `CALL`).
- `_to`: the `address` you want to send LYX to (Externally Owned Account or contract address).
- `_value`: the amount of LYX you want to transfer (in Wei)
- `_data`: empty payload (`0x`)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const OPERATION_CALL = 0;
const recipient = '0xcafecafecafecafecafecafecafecafecafecafe';
const amount = web3.utils.toWei('3');
// payload executed at the target. Here nothing (just a plain LYX transfer)
const data = '0x';

await myUp.methods.execute(OPERATION_CALL, recipient, amount, data, {
  from: '<address-of-up-owner>',
});
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
const OPERATION_CALL = 0;
const recipient = '0xcafecafecafecafecafecafecafecafecafecafe';
const amount = web3.utils.toWei('3');
// payload executed at the target. Here nothing (just a plain LYX transfer)
const data = '0x';

await myUp.connect(upOwner).execute(OPERATION_CALL, recipient, amount, data);
```

  </TabItem>

</Tabs>

As you can see from the code snippet above, transferring LYX from a Universal Profile is as simple as making a standard contract `CALL`, with some `_value` attached to the contract call. Since we are just making a simple LYX transfer, the fourth parameter `_data` should be empty.

### Interact with other contracts

We have seen in the previous example how to send LYX from your UP via the `.execute` function.

This function offers a fourth parameter: `_data`, that provides a lot of flexibility when interacting from your UP. The `_data` parameter is especially useful when the `_to` recipient is a smart contract.

To make your UP call a function on a specific contract deployed on the network, the parameters of the `.execute` function will be as follow:

- `_operation`: `0` (for `CALL`).
- `_to`: the `address` of the smart contract you want to interact with.
- `_value_`: empty (0).
- `_data`: the abi-encoded function name + arguments, to to be run at the `_to` contract address.
- Let's imagine a smart contract `targetContract` deployed on the network. You want your UP to call the function `myCoolFunction` on this contract. You will have to:

1. abi-encode the function call with the parameters you want to pass.
2. pass this payload as the fourth argument `_data` of the `.execute` function.

The code snippets below show you how to do this.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const OPERATION_CALL = 0;

// assuming targetContract is a Contract instance
const abi = targetContract.methods.myCoolfunction('dummyParameter').encodeABI();

// do something on another Smart Contract
await myUp.methods.execute(
  OPERATION_CALL,
  targetContract.address,
  0,
  abi
  {
    from: '<address-of-up-owner>',
  },
);
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
const OPERATION_CALL = 0;

// assuming targetContract is a Contract instance
const abi = targetContract.methods.myCoolfunction('dummyParameter').encodeABI();

// do something on another Smart Contract
await myUp
  .connect(upOwner)
  .execute(OPERATION_CALL, targetContract.address, 0, abi);
```

  </TabItem>

</Tabs>

:::info

See the [Solidity docs](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html#function-selector-and-argument-encoding) for more infos on function + arguments encoding.

:::
