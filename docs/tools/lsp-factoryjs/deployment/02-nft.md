---
sidebar_position: 2
title: NFT2.0 (LSP7, LSP8)
---

# Deploying NFT 2.0

## LSP7 NFT

[LSP7](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md) is a standard for either fungible or non-fungible tokens based on the ERC20 token standard and allows one smart contract to have many indivisible NFTs, for example, an NFT collection.

:::info
To deploy an LSP7 NFT, call the `LSP7DigitalAsset.deploy()` function and set the `isNFT` parameter to true.
:::

### LSP7 Deployment Example

```javascript
import LSP7DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import { LSPFactory } from '@lukso/lsp-factory.js';

const lspFactory = new LSPFactory('https://rpc.l14.lukso.network', {
  '0x...',
  22,
});

const myDigitalAsset = await lspFactory.LSP7DigitalAsset.deploy({
    name: "My token",
    symbol: "TKN",
    ownerAddress: "0x..", // Account which will own the Token Contract
    isNFT: true,
})

const myNFT = new web3.eth.Contract(
    LSP7DigitalAsset.abi,
    myDigitalAsset.LSP7DigitalAsset.address
);

const totalSupply = myNFT.methods.totalSupply().call()
```

## LSP8 NFT

[LSP8](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md) is based on the ERC721 token standard in which digital assets are identifiable, non-fungible tokens that can be uniquely traded and given metadata using [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md).

:::info
LSP8 NFTs are smart contracts that relate to one identifiable token.
:::

### LSP8 Deployment Example

```javascript
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import { LSPFactory } from '@lukso/lsp-factory.js';

const lspFactory = new LSPFactory('https://rpc.l14.lukso.network', {
  '0x...',
  22,
});


const myDigitalAsset =
  lspFactory.LSP8IdentifiableDigitalAsset.deploy({
    name: "My token",
    symbol: "TKN",
    ownerAddress: "0x...", // Account which will own the Token Contract
  })

const myNFT = new web3.eth.Contract(
    LSP8IdentifiableDigitalAsset.abi,
    myDigitalAsset.LSP8IdentifiableDigitalAsset.address
);

const totalSupply = myNFT.methods.totalSupply().call()
```
