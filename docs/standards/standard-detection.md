---
title: 'Standards Detection'
sidebar_position: 2
---

# Standards Detection

:::caution

The **`interfaceId`** and the **`SupportedStandards:{StandardName}`** key is not the most secure way to check for a standard, as they could be set manually.

:::

There are 2 types of standards at **LUKSO**:

- **Interface Standards**: Where we standardize a set of functions. i.e: [LSP0-ERC725Account](./universal-profile/01-lsp0-erc725account.md), [LSP6-KeyManager](./universal-profile/04-lsp6-key-manager.md), [LSP7-DigitalAsset](./nft-2.0/02-LSP7-Digital-Asset.md), etc ..

- **Metadata Standards**: Where we standardize a set of ERC725Y keys. i.e: [LSP3-UniversalProfile-Metadata](./universal-profile/03-lsp3-universal-profile-metadata.md), [LSP4-DigitalAsset-Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md), [LSP10ReceivedVaults](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-10-ReceivedVaults.md), etc ..

![Interface and metadata standards](../../static/img/standard-detection.jpeg)

These 2 types of standards are fundamental for interacting with smart contracts on the LUKSO blockchain.

**Interface Standard** enables us to know which functions (and their parameters) can be called on a smart contract. On the other hand, **Metadata Standard** gives information about the data set by default on the contract, and which keys can be queried to retrieve such data.

## Interface Detection

:::success Tip

For a full list of `interfaceId`s, see the section **[Contracts Implementation > Interface Ids](./smart-contracts/interface-ids)**

:::

> This covers how to detect if a contract implements a specific interface.

We can verify if a contract implements a specific set of functions (= an **interface**) using an [`interfaceId`](./smart-contracts/interface-ids).

This can be done using the function `supportsInterface(interfaceId)`, passing the `bytes4` `interfaceId` as a parameter.

Calling this function will return **TRUE** if the contract implements this specific `interfaceId`, **FALSE** otherwise.

### Example

A **UniversalProfile** is a contract based on **[ERC725Account](./universal-profile/01-lsp0-erc725account.md)** (LSP0). This means that the contract **SHOULD** implement the functions defined in the [ERC725Account interface](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#interface-cheat-sheet).

```javascript
const UniversalProfile = require("@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json");
const Web3 = require("web3");

// Connect to the LUKSO L14 network
const web3 = new Web3("https://rpc.l14.lukso.network");

// Create an instance of the Universal Profile
const myUPContract = new web3.eth.Contract(UniversalProfile.abi, "<contract-address>");

const ERC725AccountInterfaceId = '0x63cb749b'
await myUPContract.methods.supportsInterface(ERC725AccountInterfaceId).call()
> TRUE or FALSE
```

:::info

See [ERC165 - Standard Interface Detection](https://eips.ethereum.org/EIPS/eip-165) for more infos.

:::

## Metadata Detection

:::success Tip

All `SupportedStandards:{StandardName}` keys can be found under each ERC725Y JSON Schema on **[erc725.js](https://github.com/ERC725Alliance/erc725.js/tree/develop/src/schemas)**.

:::

> This covers how to detect if a contract contains a specific set of ERC725Y in its storage.

We can verify if a contract contains a certain set of ERC725 keys (= **metadata**) by checking value stored under the key `SupportedStandards:{StandardName}` in the contract storage.

This can be done by calling the function `getData([SupportedStandards:{StandardName}])`, passing as a parameter the `bytes32` key of the Metadata Standard.

Calling this function will return a specific `bytes4` value (defined in the Metadata Standard) if the contract has some metadata keys set by default. Otherwise, it will return an empty value.

### Example

An **LSP7DigitalAsset** is a contract that contains ERC725Y keys defined in **[LSP4 - Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md)**. This means that the contract **SHOULD** have the following ERC725Y keys set by default: `LSP4TokenName`, `LSP4TokenSymbol`, `LSP4Metadata`, `LSP4CreatorsMap:<address>` and `LSP4Creators[]`.

```javascript
const LSP7DigitalAsset = require('@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json');
const Web3 = require('web3');

// Connect to the LUKSO L14 network
const web3 = new Web3('https://rpc.l14.lukso.network');

// Create an instance of the LSP7 Token
const myTokenContract = new web3.eth.Contract(
  LSP7DigitalAsset.abi,
  '<contract-address>',
);

const SupportedStandards_LSP4DigitalAsset =
  '0xeafec4d89fa9619884b6b89135626455000000000000000000000000a4d96624';
(await myTokenContract.methods
  .getData([SupportedStandards_LSP4DigitalAsset])
  .call()) > 0xa4d96624; // valid result according to LSP4
```
