---
sidebar_label: 'Transfer LSP7 Token'
sidebar_position: 10
description: Transfer LSP7 tokens from a Universal Profile.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer LSP7 Token

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('../img/transfer-lsp7-tokens.png').default}
    alt="Transfering 1,000 CHILL tokens between two Universal Profiles"
    width="400"
  />
<br/>
<i>Transfering 1,000 CHILL tokens between two Universal Profiles.</i>
<br /><br />
</div>

:::info

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/digital-assets).

:::

This guide will teach you how to transfer an existing [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) across [Universal Profiles](../../standards/universal-profile/lsp0-erc725account.md).

## Setup Dependencies

The following code snippets require the installation of the following libraries:

- [`ethers.js`](https://github.com/ethers-io/ethers.js/) or [`web3.js`](https://www.npmjs.com/package/web3)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

```shell
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

```shell
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>
</Tabs>

## Code Examples

Create an instance of your Universal Profile and the LSP7 Token you want to transfer.

You will need:

- the `address` of the 🆙 obtained from the guide **Login to UP**) and LSP7 Token contract.
- use the `UniversalProfile` and `LSP7DigitalAsset` ABIs imported from the `@lukso/lsp-smart-contracts` library

After setting up the contracts, you can set up the parameters for the LSP7 token [`transfer(...)`](https://docs.lukso.tech/contracts/contracts/LSP7DigitalAsset/#transfer) function.

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```js
import Web3 from 'web3';

// Import schemas and ABI
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

const web3 = new Web3(window.lukso);

await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();

// Instantiate the token with an address
const myToken = new web3.eth.Contract(LSP7Mintable.abi, '0x...');

await myToken.methods
  .transfer(
    accounts[0], // sender address
    '0x...', // receiving address
    15, // token amount
    false, // force parameter
    '0x', // additional data
  )
  .send({ from: accounts[0] });
```

<!-- prettier-ignore-end -->

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```js
import { ethers } from 'ethers';

// Import smart contract ABI
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

const provider = new ethers.BrowserProvider(window.lukso);

await provider.send("eth_requestAccounts", []);

const signer = await provider.getSigner();

// Instanciate the token with an address
const myToken = new ethers.Contract('0x...', LSP7Mintable.abi);

await myToken.transfer(
  signer.getAddress(), // sender address
  '0x...', // recipient's address
  15, // amount of tokens
  false, // force flag
  '0x', // data
);
```

<!-- prettier-ignore-end -->

  </TabItem>
</Tabs>
