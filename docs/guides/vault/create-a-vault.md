---
sidebar_label: 'Create a Vault'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a Vault

This guide will teach you how to deploy an **[LSP9Vault](../../contracts/contracts/LSP9Vault/LSP9Vault.md)** contract. This contract can be used to **hold assets** such as tokens and NFTs. Also can be used with a [UniversalProfile](../../standards/universal-profile/introduction.md) and a [KeyManager](../../standards/universal-profile/lsp6-key-manager.md) to **restrict some addresses** (protocols, friends, etc..) to execute and setData on it, instead of setting or executing directly on the profile.

![Guide - How to create an LSP9Vault](/img/guides/lsp9/LSP9VaultGuide.jpeg)

## Deploy an LSP9Vault contract

To start with this guide you will need the following things:

- The _private key_ of your account, in order to send the transaction.
- The address of a [**Universal Profile**](../../standards/universal-profile/lsp0-erc725account.md)

Make sure you have the following dependencies installed before beginning this tutorial:

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>
  
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

## Step 1 - Setup imports and constants​

For the imports, we will need the `LSP9vault` contract **ABI** and **bytecode** in order to deploy a LSP9 Vault.  
For the constants we will need the _private key_ and _the address of the vault receiver_.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Imports & Constants"
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const vaultOwner = '0x...'; // The address that will be the vault owner

// initialize your EOA
const privateKey = '0x...';
const myEOA = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Imports & Constants"
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const vaultOwner = '0x...'; // The address that will be the vault owner

// setup your EOA
const privateKey = '0x...';
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

## Step 2 - Instantiate contracts

Create instance for `LSP9Vault`, that is needed in order to deploy the contract.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Contract instance"
// create an instance of the LSP9Vault contract
let myVault = new web3.eth.Contract(LSP9Vault.abi);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Contract instance"
// create an factory for the LSP9Vault contract
let vaultFactory = new ethers.ContractFactory(
  LSP9Vault.abi,
  LSP9Vault.bytecode,
);
```

  </TabItem>

</Tabs>

## Step 3 - Send transaction

Finally send the **contract deployment** transaction.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Sending contract deployment transaction"
// deploy the vault contract
await myVault
  .deploy({
    data: LSP9Vault.bytecode,
    arguments: [vaultOwner],
  })
  .send({
    from: myEOA.address,
    gas: 5_000_000,
    gasPrice: '1000000000',
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Sending contract deployment transaction"
// deploy the vault contract
const myVault = await vaultFactory.connect(myEOA).deploy(vaultOwner);
```

  </TabItem>

</Tabs>

## Final Code

:::caution

You need to have LYXt in your EOA in order to pay for the transaction fees. Visit the :arrow_right: **[LUKSO Testnet Faucet Website](https://faucet.testnet.lukso.network/)** to get some LYXt.

:::

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Deploying the vault"
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const vaultOwner = '0x...'; // The address that will be the vault owner

// initialize your EOA
const privateKey = '0x...';
const myEOA = web3.eth.accounts.wallet.add(privateKey);

// create an instance of the LSP9Vault contract
let myVault = new web3.eth.Contract(LSP9Vault.abi);

// deploy the vault contract
await myVault
  .deploy({
    data: LSP9Vault.bytecode,
    arguments: [vaultOwner],
  })
  .send({
    from: myEOA.address,
    gas: 5_000_000,
    gasPrice: '1000000000',
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Deploying the vault"
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const vaultOwner = '0x...'; // The address that will be the vault owner

// setup your EOA
const privateKey = '0x...';
const myEOA = new ethers.Wallet(privateKey).connect(provider);

// create an factory for the LSP9Vault contract
let vaultFactory = new ethers.ContractFactory(
  LSP9Vault.abi,
  LSP9Vault.bytecode,
);

// deploy the vault contract
const myVault = await vaultFactory.connect(myEOA).deploy(vaultOwner);
```

  </TabItem>

</Tabs>
