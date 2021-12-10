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

&nbsp;

> :arrow_right: &nbsp; [See our lsp-factory.js guide on how to deploy a Universal Profile](https://docs.lukso.tech/tools/lsp-factoryjs/introduction/getting-started#instantiation)

Our [lsp-factory.js tool](../tools/lsp-factoryjs/introduction/getting-started.md) let you easily deploy a Universal Profile with just few lines of code.

It will help you to get started quickly by:

1. deploying all the necessary contracts (UniversalProfile, LSP6KeyManager, LSP1UniversalReceiverDelegate).
2. setup everything for you (link your LSP1UniversalReceiverDelegate (URD) with your account + set all the permissions).

You can obtain the address of each contract deployed as follow.

```javascript
const myContracts = await lspFactory.LSP3UniversalProfile.deploy(...)

// UniversalProfile -> UP
const myUPAddress = myContracts.ERC725Account.address;

// LSP6Keymanager -> KM
const myKMAddress = myContracts.KeyManager.address;

// UniversalReceiverDelegate -> URD
const myURDAddress = myContracts.UniversalReceiverDelegate:.address;
```

You can then create an instance of your UP ready to interact with.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import UniversalProfile from '@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json';

const myUP = new web3.eth.Contract(UniversalProfile.abi, myUPAddress);
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```javascript
import UniversalProfile from '@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json';

const myUP = new ethers.Contract(myUPAddress, UniversalProfile.abi);
```

  </TabItem>

</Tabs>

<br/>

## Interact with your UP

:::caution

If you have deployed your UP with [lsp-factory.js](../tools/lsp-factoryjs/introduction/getting-started.md), your UP is deployed with a KeyManager attached to it.
Please head over [_Interact via the Key Manager_](./02-add-key-manager.md) in the next page.

:::

### Add / Edit your `LSP3Profile` metadata

:::info

If you have deployed your UP with [lsp-factory.js](../tools/lsp-factoryjs/introduction/getting-started.md), you can skip this section. Your profile details were already setup on deployment :)

:::

You can add details to your Universal Profile (or edit existing details) by adding / updating the LSP3Profile metadata.

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
