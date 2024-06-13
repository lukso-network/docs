---
title: Digital Assets (Token & NFT)
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Digital Assets

The **Digital Asset (Token and NFT 2.0)** contracts are the newest advanced version of the existing token standards. They come with many features that enhance the security and the overall user experience and compatibility with [ERC725Accounts](../../standards/universal-profile/lsp0-erc725account.md) and [Universal Receivers](../../standards/generic-standards/lsp1-universal-receiver.md).

## Comparisons with ERC20 / ERC721

:::danger beware

The LSP7 compatible with ERC20 contracts and LSP8 compatible with ERC721 contracts are being deprecated and will be deleted from [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts) repository. However if you want to still use/maintain them, they will remain available in the version [`0.14.0`](https://github.com/lukso-network/lsp-smart-contracts/releases/tag/lsp-smart-contracts-v0.14.0).

:::

The interfaces of LSP7 and LSP8 have some differences compared to ERC20 and ERC721. Their functions are simpler, more straight forward and unified.

**Similar function names**

Both functions in LSP7 and LSP8 have the same name (`transfer`) to transfer assets. This is easier compared to ERC20 and ERC721 that use different naming (`transfer` for ERC20 vs `transferFrom` in ERC721 to transfer tokens as the token owner).

The table below highlights these differences:

<table>
  <tr>
    <th>Description</th>
    <th>ERC20</th>
    <th>LSP7</th>
  </tr>
  <tr>
    <td>Transferring tokens as an owner.</td>
    <td><code>transfer(address,uint256)</code></td>
    <td rowspan="2"><code>transfer(address,address,uint256,bool,bytes)</code></td>
  </tr>
  <tr>
    <td>Transferring tokens as an operator.</td>
    <td><code>transferFrom(address,address,uint256)</code></td>
  </tr>
  <tr>
    <td>Approving an operator to spend tokens on behalf of the owner.</td>
    <td><code>approve(address,uint256)</code></td>
    <td><code>authorizeOperator(address,uint256)</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <th>ERC721</th>
    <th>LSP8</th>
  </tr>
  <tr>
    <td>Transferring tokens as an owner.</td>
    <td rowspan="2">
        <code>transferFrom(address,address,uint256)</code><br/>
        <code>safeTransferFrom(address,address,uint256)</code><br/>
        <code>safeTransferFrom(address,address,uint256,bytes)</code>
    </td>
    <td rowspan="2"><code>transfer(address,address,bytes32,bool,bytes)</code></td>
  </tr>
  <tr>
    <td>Transferring tokens as an operator.</td>
  </tr>
  <tr>
    <td>Approving an operator to spend tokens on behalf of the owner.</td>
    <td><code>approve(address,uint256)</code></td>
    <td><code>authorizeOperator(address,bytes32)</code></td>
  </tr>
</table>

In ERC20 the function `transfer(address,uint256)` is used to transfer ERC20 tokens from the caller, this can only be used by the holder of the ERC20 tokens. There is also `transferFrom(address,address,uint256)` which can also be used by the ERC20 tokens operator.

In comparison ERC721 has:

- `safeTransferFrom(address,address,uint256,bytes)`
- `safeTransferFrom(address,address,uint256)`
- `transferFrom(address,address,uint256)`

All of the above functions can be used by both the owner of the token id or by the operator of the token id in order to transfer the ERC721 token. To be mentioned, both functions `safeTransferFrom(...)` have a hook that calls the recipient contract.

Looking at LSP7 & LSP8 we have unified `transfer(...)` & `transferBatch(...)` functions in both contracts. Those functions contain a hook which is executed conditionally and can be used in any of the above cases.

## LSP4 Digital Asset Metadata

The **LSP4DigitalAssetMetadata** is a contract that sets the **Token-Metadata** (name and symbol) for the **LSP7DigitalAsset** and **LSP8IdentifiableDigitalAsset** token contracts.

Since it uses **[ERC725Y General Data Key/Value Store](https://eips.ethereum.org/EIPS/eip-725)** to set the metadata, any information can be added (_e.g: **list of creators, JSON files**, etc_).

## LSP7 Digital Asset

The **LSP7DigitalAsset** contract represents digital assets for fungible tokens where minting and transferring are specified with an amount of tokens. Their functions were inspired from **[ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)** and **[ERC1155](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol)** with more upgraded features.

An LSP7 can serves as:

- a **Divisible Token Contract** when `isNonDivisible` bool is set to `false` in the [`constructor(...)`](#constructor)
- otherwise serves as a **Non-Divisible Token Contract**.

This can be useful to set `isNonDivisible` to `true`, rather than deploying a LSP8 contract to achieve the same goal.

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

### Setting metadata for one or multiple tokenIds

The function [`setDataBatchForTokenIds(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#setdatabatchfortokenids) can be used to set multiple data key-value pairs at once for one or multiple tokenIds.

This function is flexible enough to enable to set one or multiple [data key-value](../../standards/lsp-background/erc725).md#erc725y-generic-data-keyvalue-store) pairs for:

#### case 1: a single tokenId

To set for instance 3 x data key-value pairs for the same `tokenId`, the parameters of `setDataBatchForTokenIds(bytes32[],bytes32[],bytes[])` will be as follow:

<Tabs>
  
  <TabItem value="solidity" label="solidity">

```solidity
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.12;

import {
    ILSP8IdentifiableDigitalAsset as ILSP8
} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/ILSP8IdentifiableDigitalAsset.sol";
import {
    _LSP4_METADATA_KEY
} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";

bytes32 constant _NFT_ICON_DATA_KEY = keccak256("NFTIcon");
bytes32 constant _NFT_MARKET_PLACE_URLS__DATA_KEY = keccak256("NFTMarketplaceURLs");

bytes32 constant _TOKEN_ID_TO_SET = 0xcafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe;

function setMultipleDataForSingleTokenId(
    ILSP8 lsp8Contract,
    bytes memory lsp4MetadataValue,
    bytes memory nftIconValue,
    bytes memory nftMarketPlaceURLsValue
) {
    bytes32[] memory tokenIdsToUpdate = new bytes32[](3);
    bytes32[] memory dataKeysToSet = new bytes32[](3);
    bytes[] memory dataValuesToSet = new bytes[](3);

    // we are setting 3 x data key-value pairs for the same tokenid
    tokenIdsToUpdate[0] = _TOKEN_ID_TO_SET;
    tokenIdsToUpdate[1] = _TOKEN_ID_TO_SET;
    tokenIdsToUpdate[2] = _TOKEN_ID_TO_SET;

    dataKeysToSet[0] = _LSP4_METADATA_KEY;
    dataKeysToSet[1] = _NFT_ICON_DATA_KEY;
    dataKeysToSet[2] = _NFT_MARKET_PLACE_URLS__DATA_KEY;

    dataValuesToSet[0] = lsp4MetadataValue;
    dataValuesToSet[1] = nftIconValue;
    dataValuesToSet[2] = nftMarketPlaceURLsValue;

    lsp8Contract.setDataBatchForTokenIds(
        tokenIdsToUpdate,
        dataKeysToSet,
        dataValuesToSet
    );
}
```

  </TabItem>

  <TabItem value="ethers-v6" label="ethers v6">

```js
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

const _NFT_ICON_DATA_KEY = keccak256('NFTIcon');
const _NFT_MARKET_PLACE_URLS__DATA_KEY = keccak256('NFTMarketplaceURLs');

const _TOKEN_ID_TO_SET =
  '0xcafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe';

async function setMultipleDataForSingleTokenId(
  lsp8Contract,
  lsp4MetadataValue,
  nftIconValue,
  nftMarketPlaceURLsValue,
) {
  const tokenIdsToUpdate = [
    _TOKEN_ID_TO_SET,
    _TOKEN_ID_TO_SET,
    _TOKEN_ID_TO_SET,
  ];

  const dataKeysToSet = [
    ERC725YDataKeys.LSP4.LSP4Metadata,
    _NFT_ICON_DATA_KEY,
    _NFT_MARKET_PLACE_URLS__DATA_KEY,
  ];

  const dataValuesToSet = [
    lsp4MetadataValue,
    nftIconValue,
    nftMarketPlaceURLsValue,
  ];

  await lsp8Contract.setDataBatchForTokenIds(
    tokenIdsToUpdate,
    dataKeysToSet,
    dataValuesToSet,
  );
}
```

  </TabItem>

</Tabs>

#### Case 2: different tokenIds

To set for instance the same data key-value pair (_e.g: `LSP4Metadata`_) for 3 x different `tokenId`s, the parameters of `setDataBatchForTokenIds(bytes32[],bytes32[],bytes[])` will be as follow:

<Tabs>
  
  <TabItem value="solidity" label="solidity">

```solidity
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.12;

import {
    ILSP8IdentifiableDigitalAsset as ILSP8
} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/ILSP8IdentifiableDigitalAsset.sol";
import {
    _LSP4_METADATA_KEY
} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";

bytes32 constant _FIRST_TOKEN_ID_TO_SET = 0xcafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe;
bytes32 constant _SECOND_TOKEN_ID_TO_SET = 0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef;
bytes32 constant _THIRD_TOKEN_ID_TO_SET = 0xf00df00df00df00df00df00df00df00df00df00df00df00df00df00df00df00d;

function setMultipleDataForSingleTokenId(
    ILSP8 lsp8Contract,
    bytes memory firstTokenIdLsp4MetadataValue,
    bytes memory secondTokenIdLsp4MetadataValue,
    bytes memory thirdTokenIdLsp4MetadataValue
) {
    bytes32[] memory tokenIdsToUpdate = new bytes32[](3);
    bytes32[] memory dataKeysToSet = new bytes32[](3);
    bytes[] memory dataValuesToSet = new bytes[](3);

    tokenIdsToUpdate[0] = _FIRST_TOKEN_ID_TO_SET;
    tokenIdsToUpdate[1] = _SECOND_TOKEN_ID_TO_SET;
    tokenIdsToUpdate[2] = _THIRD_TOKEN_ID_TO_SET;

    // we are setting the metadata for 3 x different tokenIds
    dataKeysToSet[0] = _LSP4_METADATA_KEY;
    dataKeysToSet[1] = _LSP4_METADATA_KEY;
    dataKeysToSet[2] = _LSP4_METADATA_KEY;

    dataValuesToSet[0] = firstTokenIdLsp4MetadataValue;
    dataValuesToSet[1] = secondTokenIdLsp4MetadataValue;
    dataValuesToSet[2] = thirdTokenIdLsp4MetadataValue;

    lsp8Contract.setDataBatchForTokenIds(
        tokenIdsToUpdate,
        dataKeysToSet,
        dataValuesToSet
    );
}
```

  </TabItem>

  <TabItem value="ethers-v6" label="ethers v6">

```js
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

const _FIRST_TOKEN_ID_TO_SET =
  '0xcafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe';
const _SECOND_TOKEN_ID_TO_SET =
  '0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef';
const _THIRD_TOKEN_ID_TO_SET =
  '0xf00df00df00df00df00df00df00df00df00df00df00df00df00df00df00df00d';

async function setMultipleDataForSingleTokenId(
  lsp8Contract,
  firstTokenIdLsp4MetadataValue,
  secondTokenIdLsp4MetadataValue,
  thirdTokenIdLsp4MetadataValue,
) {
  const tokenIdsToUpdate = [
    _FIRST_TOKEN_ID_TO_SET,
    _SECOND_TOKEN_ID_TO_SET,
    _THIRD_TOKEN_ID_TO_SET,
  ];

  const dataKeysToSet = [
    ERC725YDataKeys.LSP4.LSP4Metadata,
    ERC725YDataKeys.LSP4.LSP4Metadata,
    ERC725YDataKeys.LSP4.LSP4Metadata,
  ];

  const dataValuesToSet = [
    firstTokenIdLsp4MetadataValue,
    secondTokenIdLsp4MetadataValue,
    thirdTokenIdLsp4MetadataValue,
  ];

  await lsp8Contract.setDataBatchForTokenIds(
    tokenIdsToUpdate,
    dataKeysToSet,
    dataValuesToSet,
  );
}
```

  </TabItem>

</Tabs>

### Checking if the Metadata of a tokenId changed

Since LSP8 uses [ERC725Y](../../standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store) under the hood, the URI pointing to the metadata of a specific tokenId can be changed inside the ERC725Y storage of the LSP8 contract.

We have seen in the previous section [**how to set metadata for one or multiple tokenIds**](#setting-metadata-for-one-or-multiple-tokenids).

The two functions `setDataForTokenId(...)` and `setDataBatchForTokenIds(...)` emit a [`TokenIdDataChanged`](../contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#tokeniddatachanged) event. You can listen for this event in the LSP8 contract from your dApp, filtering for the `LSP4Metadata` data key to check if the metadata of a tokenId has been changed. You can do so by filtering the first parameter with the `tokenId` and the second parameter with the [bytes32 value of the `LSP4Metadata` data key](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4metadata).

## Note on LSP7 and LSP8 implementations

`LSP7DigitalAsset.sol` and `LSP8IdentifiableDigitalAsset.sol` are `abstract` contracts that are not deployable as they are, because they do not contain any public functions by default to manage token supply (_e.g: no public `mint(...)` or `burn(...)` functions_). You can either:

- use `LSP7Mintable` or `LSP8Mintable`, a preset contract that contains a public `mint(...)` function callable only by the contract's owner.
- or extend the `LSP7DigitalAsset` / `LSP8IdentifiableDigitalAsset` contract and create your own supply mechanism by defining public methods that use the internal `_mint(...)` and `_burn(...)` functions.
