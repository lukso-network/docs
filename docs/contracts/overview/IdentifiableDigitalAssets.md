---
title: 🖼️ Identifiable Digital Asset (NFT)
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## LSP8 Identifiable Digital Asset

The **LSP8IdentifiableDigitalAsset** contract represents identifiable digital assets (NFTs) that can be uniquely traded and given metadata using the **[ERC725Y Standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y)**.
Each NFT is identified with a tokenId, based on **[ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)**.

A **bytes32** value is used for tokenId to allow many uses of token identification, including numbers, contract addresses, and hashed values (i.e., serial numbers).

### Setting metadata for one or multiple tokenIds

The function [`setDataBatchForTokenIds(...)`](../../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#setdatabatchfortokenids) can be used to set multiple data key-value pairs at once for one or multiple tokenIds.

This function is flexible enough to enable to set one or multiple [data key-value](/standards/erc725).md#erc725y-generic-data-keyvalue-store) pairs for:

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

Since LSP8 uses [ERC725Y](/standards/erc725#erc725y-generic-data-keyvalue-store) under the hood, the URI pointing to the metadata of a specific tokenId can be changed inside the ERC725Y storage of the LSP8 contract.

We have seen in the previous section [**how to set metadata for one or multiple tokenIds**](#setting-metadata-for-one-or-multiple-tokenids).

The two functions `setDataForTokenId(...)` and `setDataBatchForTokenIds(...)` emit a [`TokenIdDataChanged`](../contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#tokeniddatachanged) event. You can listen for this event in the LSP8 contract from your dApp, filtering for the `LSP4Metadata` data key to check if the metadata of a tokenId has been changed. You can do so by filtering the first parameter with the `tokenId` and the second parameter with the [bytes32 value of the `LSP4Metadata` data key](../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4metadata).
