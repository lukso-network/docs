---
sidebar_position: 1.2
title: Token (LSP7)
---

# Deploying LSP7 Digital Asset

[LSP7](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md) is a standard for either fungible or non-fungible tokens based on the ERC20 token standard. 

To create an LSP7 Digital Asset
```javascript
import { LSP7 } from '@lukso/universalprofile-smart-contracts/build/artifacts/LSP7.json';

const myDigitalAsset = await lspFactory.DigitalAsset.deployLSP7DigitalAsset({
    name: "My token",
    symbol: "TKN",
    ownerAddress: "0x..", // Account which will own the Token Contract
    isNFT: true,
}) 

const myNFT = new web3.eth.Contract(
    LSP7.abi,
    myDigitalAsset.LSP7DigitalAsset.address
);

const totalSupply = myNFT.methods.totalSupply().call()
```
