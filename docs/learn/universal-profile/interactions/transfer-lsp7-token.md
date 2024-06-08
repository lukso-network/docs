---
sidebar_label: 'Transfer LSP7 Token'
sidebar_position: 10
description: Transfer LSP7 tokens from a Universal Profile.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer LSP7 Token

This guide will teach you how to tranfer an existing [LSP7 Digital Asset](../../../standards/tokens/LSP7-Digital-Asset.md) across [Universal Profiles](../../../standards/universal-profile/lsp0-erc725account.md).

:::info

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/digital-assets).

The 🆙 [Universal Profile Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) makes it easy to send token transactions without having to interact with the smart contract of the Universal Profile. If you are building a service or backend, you can also 👾 [execute transfers by directly calling the profile contract](https://github.com/lukso-network/lukso-playground/blob/main/transfer-token/backend-transaction.js) and preparing the calldata.

:::

## Setup

The following code snippets require to install a web3 provider like web3 or ethers, as well as using smart contract schemas. The 📃 [@lukso/lsp-smart-contracts](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) library is the most convenient way to interact with LSP-based smart contracts.

<Tabs groupId="web3-lib">
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>
  <TabItem value="ethersjs" label="ethers.js">

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>
</Tabs>

### Sending LSP7 Tokens from a Universal Profile

As the initial step, you have to set up the Universal Profile and LSP7 Token. Both require an ABI that can be imported from the `@lukso/lsp-smart-contracts` library. After setting up the contracts, you can set up the parameters for the [LSP7 token transfer](https://docs.lukso.tech/contracts/contracts/LSP7DigitalAsset/#transfer).

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
