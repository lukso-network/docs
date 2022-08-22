---
sidebar_label: 'Create a Vault'
sidebar_position: 1
---

# Create a Vault

This guide will teach you how to deploy an **[LSP9Vault](../../standards/smart-contracts/lsp9-vault.md)** contract. This contract can be used to **hold assets** such as tokens and NFTs. Also can be used with a [UniversalProfile](../../standards/universal-profile/introduction.md) and a [KeyManager](../../standards/universal-profile/lsp6-key-manager.md) to **restrict some addresses** (protocols, friends, etc..) to execute and setData on it, instead of setting or executing directly on the profile.

![Guide - How to create an LSP9Vault](/img/guides/lsp9/LSP9VaultGuide.jpeg)

## Deploy an LSP9Vault contract

Check **[previous guides](../universal-profile/create-profile#step-1---create-an-eoa)** to learn how to connect to LUKSO's L16 network and load your EOA.

```typescript title="Deploying the vault"
import Web3 from 'web3';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';

const web3 = new Web3('https://rpc.l16.lukso.network');

const PRIVATE_KEY = '0x...'; // your EOA private key
const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);

// create an instance
let myVault = new web3.eth.Contract(LSP9Vault.abi);

// deploy the vault contract
await myVault
  .deploy({
    data: LSP9Vault.bytecode,
    arguments: ["0x.."] // address of the UniversalProfile 
  })
  .send({
    from: myEOA.address,
    gas: 5_000_000,
    gasPrice: '1000000000',
  });
```
