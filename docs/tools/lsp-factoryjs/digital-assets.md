---
sidebar_position: 1.4
---

# Deploying Digital Assets

LSP Factory allows easy deployment of both LSP7 and LSP8 Digital Assets. 

[LSP7](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md) is a standard for either fungible or non-fungible tokens based on the ERC20 token standard. 

[LSP8](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md) is based on the ERC721 token standard. LSP8 digital assets are identifiable, non-fungible tokens which can be uniquely traded and given metadata using [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md).


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

myNFT.methods.totalSupply().totalSupply()
```

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

myNFT.methods.totalSupply().totalSupply()
```