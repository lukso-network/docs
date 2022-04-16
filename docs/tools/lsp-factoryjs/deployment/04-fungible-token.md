---
sidebar_position: 4
title: Fungible Token (LSP7)
---

# Fungible Token (LSP7)

[LSP7](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md) is a standard for either fungible or non-fungible tokens based on the ERC20 token standard.

## Deploying an LSP7 Digital Asset

To create an LSP7 Fungible token, use the `LSP7DigitalAsset.deploy()` method and set the `isNFT` parameter to `false`. The code sequence will deploy an LSP7 smart contract with many tokens that can be fractionalized.

```javascript
import LSP7 from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import { LSPFactory } from '@lukso/lsp-factory.js';

const lspFactory = new LSPFactory('https://rpc.l14.lukso.network', {
  '0x...',
  22,
});


const myDigitalAsset = await lspFactory.LSP7DigitalAsset.deploy({
    name: "My token",
    symbol: "TKN",
    ownerAddress: "0x..", // Account which will own the Token Contract
    isNFT: false,
})

const myNFT = new web3.eth.Contract(
    LSP7.abi,
    myDigitalAsset.LSP7DigitalAsset.address
);

const totalSupply = myNFT.methods.totalSupply().call()
```
