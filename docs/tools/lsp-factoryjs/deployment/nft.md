---
sidebar_position: 1.2
title: NFT2.0 (LSP7, LSP8) 
---

# Deploying NFT 2.0


### LSP7 NFT

[LSP7](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md) is a standard for either fungible or non-fungible tokens based on the ERC20 token standard. 

LSP7 allows one smart contract to have many indivisible NFTs, for example an NFT collection. 

To deploy a LSP7 NFT call `DigitalAsset.deployLSP7DigitalAsset()` and set `isNFT` to true.

```javascript
import LSP7DigitalAsset from '@lukso/universalprofile-smart-contracts/artifacts/LSP7DigitalAsset.json';

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

### LSP8 NFT

[LSP8](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md) is based on the ERC721 token standard. LSP8 digital assets are identifiable, non-fungible tokens which can be uniquely traded and given metadata using [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md).

LSP8 NFTs are smart contracts which relate to one identifiable token.

To deploy LSP8 NFT

```javascript
import LSP8IdentifiableDigitalAsset from '@lukso/universalprofile-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

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