---
sidebar_label: 'Interact with other contracts'
sidebar_position: 1.4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Interact with other contracts

In this guide, we will learn how to use our Universal Profile to interact with any other smart contract (like if we were using a regular Externally Owned Account).

## Introduction

We have seen in the previous example how to send LYX from our UP via the [`execute(...)`](../../contracts/erc725-account.md#execute) function.

This function offers a fourth parameter: `_data`, that provides a lot of flexibility when interacting from our UP. The `_data` parameter is especially useful when the `_to` recipient is a smart contract.

To make our UP call a function on a specific contract deployed on the network, the parameters of the `execute(...)` function will be as follow:

- `_operation`: `0` (for `CALL`).
- `_to`: the `address` of the smart contract we want to interact with.
- `_value_`: empty (0).
- `_data`: the abi-encoded function name + arguments, to to be run at the `_to` contract address.
- Let's imagine a smart contract `targetContract` deployed on the network. We want our UP to call the function `myCoolFunction` on this contract. We will have to:

1. abi-encode the function call with the parameters we want to pass.
2. pass this payload as the fourth argument `_data` of the `.execute` function.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const OPERATION_CALL = 0;

// 1. encode the payload to be run at the targetContract
// assuming targetContract is a Contract instance
const targetPayload = targetContract.methods
  .myCoolfunction('dummyParameter')
  .encodeABI();

// 2. encode the payload to be run on the UP,
// passing the payload to be run at the targetContract as 4th parameter
let abiPayload = await myUp.methods
  .execute(OPERATION_CALL, targetContract.address, 0, targetPayload)
  .encodeABI();

// 3. execute via the KeyManager, passing the UP payload
await myKeyManager.execute(abiPayload, {
  from: '<address-of-up-owner>',
  gasLimit: 300_000,
});
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
const OPERATION_CALL = 0;

// 1. encode the payload to be run at the targetContract
// assuming targetContract is a Contract instance
const targetPayload = targetContract.interface.encodeFunctionData(
  'myCoolfunction',
  ['dummyParameter'],
);

// 2. encode the payload to be run on the UP,
// passing the payload to be run at the targetContract as 4th parameter
let abiPayload = myUp.interface.encodeFunctionData('execute', [
  OPERATION_CALL,
  targetContract.address,
  0,
  targetPayload,
]);

// 3. execute via the KeyManager, passing the UP payload
await myKeyManager.connect(upOwner).execute(abiPayload);
```

  </TabItem>

</Tabs>
