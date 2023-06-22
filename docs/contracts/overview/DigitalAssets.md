# Digital Assets

:::caution Warning

`LSP7DigitalAsset.sol` and `LSP8IdentifiableDigitalAsset.sol` are `abstract` contracts that are not deployable as they are, because they do not contain any public functions by default to manage token supply (_e.g: no public `mint(...)` or `burn(...)` functions_). You can either:

- use `LSP7Mintable` or `LSP8Mintable`, a preset contract that contains a public `mint(...)` function callable only by the contract's owner.
- or extend the `LSP7DigitalAsset` / `LSP8IdentifiableDigitalAsset` contract and create your own supply mechanism by defining public methods that use the internal `_mint(...)` and `_burn(...)` functions.

:::

## LSP4 Digital Asset Metadata

The **LSP4DigitalAssetMetadata** is a contract that sets the **Token-Metadata** (name and symbol) for the **[LSP7DigitalAsset](./lsp7-digital-asset.md)** and **[LSP8IdentifiableDigitalAsset](./lsp8-identifiable-digital-asset.md)** token contracts.

Since it uses **[ERC725Y General Data Key/Value Store](https://eips.ethereum.org/EIPS/eip-725)** to set the metadata, any information can be added (_e.g: **list of creators, JSON files**, etc_).

## LSP7 Digital Asset

The **LSP7DigitalAsset** contract represents digital assets for either fungible or non-fungible tokens where minting and transferring are specified with an amount of tokens. It has some functions from **[ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)** and **[ERC777](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC777/ERC777.sol)** with more upgraded features.

This contract serves as a **Fungible Token Contract** when `isNonDivisible` bool is set to `false` in the [`constructor(...)`](#constructor) and otherwise serves as a **Non-Fungible Token Contract**.

### Create a Fungible Token

```solidity
// MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";

contract MyToken is LSP7DigitalAsset {
    // 4th argument (false) marks that this contract serves as a Fungible Token and not as a NFT.
    constructor() LSP7DigitalAsset("MyToken","MTKN",msg.sender,false) {
        // ..
    }

    function mint() public {
        _mint(...);
    }
}
```

## LSP8 Identifiable Digital Asset

The **LSP8IdentifiableDigitalAsset** contract represents identifiable digital assets (NFTs) that can be uniquely traded and given metadata using the **[ERC725Y Standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y)**.
Each NFT is identified with a tokenId, based on **[ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)**.

A **bytes32** value is used for tokenId to allow many uses of token identification, including numbers, contract addresses, and hashed values (i.e., serial numbers).
