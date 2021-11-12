---
sidebar_position: 1.3
title: NFT2.0 (LSP8) 
---

# Deploying NFT 2.0

[LSP8](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md) is based on the ERC721 token standard. LSP8 digital assets are identifiable, non-fungible tokens which can be uniquely traded and given metadata using [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md).


To create an LSP8 Identifiable Digital Asset
```javascript
import { LSP8 } from '@lukso/universalprofile-smart-contracts/build/artifacts/LSP8.json';

const myDigitalAsset =
  lspFactory.DigitalAsset.deployLSP8IdentifiableDigitalAsset({
    name: "My token",
    symbol: "TKN",
    ownerAddress: "0x...", // Account which will own the Token Contract
  })

const myNFT = new web3.eth.Contract(
    LSP8.abi,
    LSP8Contract.LSP8IdentifiableDigitalAsset.address
);

const totalSupply = myNFT.methods.totalSupply().call()
```