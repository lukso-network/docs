---
title: 'Standards Detection'
sidebar_position: 2
---

# Standard Detection

:::caution

The **`interfaceId`** and the **`SupportedStandards:{StandardName}`** key is not the most secure way to check for a standard, as they could be set manually.

:::

There are two types of **LSP** standards:

- **Interface Standards**: Where we standardize a set of functions. i.e:

  [LSP0-ERC725Account](./universal-profile/lsp0-erc725account.md), [LSP6-KeyManager](./universal-profile/lsp6-key-manager.md), [LSP7-DigitalAsset](./nft-2.0/LSP7-Digital-Asset.md), etc.

- **Metadata Standards**: Where we standardize a set of ERC725Y keys. i.e:

  [LSP3-UniversalProfile-Metadata](./universal-profile/lsp3-universal-profile-metadata.md), [LSP4-DigitalAsset-Metadata](./nft-2.0/LSP4-Digital-Asset-Metadata.md), [LSP10ReceivedVaults](./universal-profile/lsp10-received-vaults.md), etc.

![Interface and metadata standards](/img/standard-detection.jpeg)

These two standards types are fundamental for interacting with smart contracts on the LUKSO blockchain.

The **Interface Standard** defines the functions that can be called on a smart contract and their expected parameters. On the other hand, **Metadata Standard** informs about the data set by default on the contract and which keys to query to retrieve such data.

## Interface Detection

:::success Tip

See the page **[Contracts Implementation > Interface IDs](./smart-contracts/interface-ids)** for a complete list of current `interfaceId` fields.

:::

> This section covers how to detect if a contract implements a specific interface.

We can verify if a contract implements a specific set of functions (= an **interface**) using the function `supportsInterface(interfaceId)`, passing the bytes4 `interfaceId` as a parameter.

Calling this function will return **TRUE** if the contract implements this specific interfaceId, **FALSE** otherwise.

### Interface Example

A **[Universal Profile](./universal-profile/lsp3-universal-profile-metadata.md)** is a contract based on [ERC725Account](./universal-profile/lsp0-erc725account.md)(LSP0). Therefore, the contract SHOULD implement the functions defined in the [ERC725Account interface](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#interface-cheat-sheet).

```javascript
const UniversalProfile = require("@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json");
const Web3 = require("web3");

// Connect to the LUKSO L14 network
const web3 = new Web3("https://rpc.l14.lukso.network");

// Create an instance of the Universal Profile
const myUPContract = new web3.eth.Contract(UniversalProfile.abi, "<contract-address>");

const ERC725AccountInterfaceId = '0x63cb749b';
await myUPContract.methods.supportsInterface(ERC725AccountInterfaceId).call();
> TRUE or FALSE
```

:::info

See [ERC165 - Standard Interface Detection](https://eips.ethereum.org/EIPS/eip-165) for more details.

:::

## Metadata Detection

:::success Tip

The **[erc725.js](https://github.com/ERC725Alliance/erc725.js/tree/develop/src/schemas)** GitHub repository lists all the `SupportedStandards:{StandardName}` keys under each ERC725Y JSON Schema.

:::

> This section covers how to detect if a contract contains a specific set of ERC725Y in its storage.

We can verify if a contract contains a specific set of ERC725 keys (= **metadata**) by checking the value stored under the key `SupportedStandards:{StandardName}` in the contract storage, via the function `getData([SupportedStandards:{StandardName}])`.

Calling this function will return a specific bytes4 value (defined in the Metadata Standard) if the contract has some metadata keys set by default. Otherwise, it will return an empty value.

### Metadata Example

An **[LSP7DigitalAsset](./nft-2.0/LSP7-Digital-Asset.md)** is a contract that contains ERC725Y keys defined in **[LSP4 - Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md)**. Therefore, the contract **SHOULD** have the following ERC725Y keys set by default: `LSP4TokenName`, `LSP4TokenSymbol`, `LSP4Metadata`, `LSP4CreatorsMap:<address>` and `LSP4Creators[]`.

```javascript
const LSP7DigitalAsset = require('@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json');
const Web3 = require('web3');

// Connect to the LUKSO L14 network
const web3 = new Web3('https://rpc.l14.lukso.network');

// Create an instance of the LSP7 Token
const myTokenContract = new web3.eth.Contract(LSP7DigitalAsset.abi, '<contract-address>');

const SupportedStandards_LSP4 = '0xeafec4d89fa9619884b6b89135626455000000000000000000000000a4d96624';
await myTokenContract.methods.getData([SupportedStandards_LSP4DigitalAsset]).call();
> 0xa4d96624; // valid result according to LSP4
```
