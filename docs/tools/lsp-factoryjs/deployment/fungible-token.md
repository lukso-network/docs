---
sidebar_position: 1.3
title: Fungible Token (LSP7)
---

# Deploying LSP7 Digital Asset

[LSP7](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md) is a standard for either fungible or non-fungible tokens based on the ERC20 token standard. 

To create a LSP7 Fungible token use `DigitalAsset.deployLSP7DigitalAsset()` method and set `isNFT` parameter to false. 

```javascript
import LSP7 from '@lukso/universalprofile-smart-contracts/artifacts/LSP7DigitalAsset.json';

const myDigitalAsset = await lspFactory.DigitalAsset.deployLSP7DigitalAsset({
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

This will deploy an LSP7 smart contract which can have many tokens which can be fractionalised.