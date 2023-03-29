---
title: 'Standard Detection'
sidebar_position: 3
---

# Standard Detection

:::caution

The **`interfaceId`** and the **`SupportedStandards:{StandardName}`** data key is not the most secure way to check for a standard, as they could be set manually.

:::

There are two types of **LSP** standards used to interact with smart contracts on the LUKSO blockchain.

| Standard Type           | Description                                                                                                                                                | Examples                                                                                                                                                                                                                                        |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Interface Standards** | **Standardize a set of functions**. <br/> Defines the functions that can be called on a smart contract and their expected parameters                       | [LSP0-ERC725Account](./universal-profile/lsp0-erc725account.md) <br/> [LSP6-KeyManager](./universal-profile/lsp6-key-manager.md) <br/> [LSP7-DigitalAsset](./nft-2.0/LSP7-Digital-Asset.md)                                                     |
| **Metadata Standards**  | **Standardize a set of ERC725Y data keys**. <br/> Informs about the data set by default on the contract and which data keys to query to retrieve such data | [LSP3-UniversalProfile-Metadata](./universal-profile/lsp3-universal-profile-metadata.md) <br/> [LSP4-DigitalAsset-Metadata](./nft-2.0/LSP4-Digital-Asset-Metadata.md) <br/> [LSP10ReceivedVaults](./universal-profile/lsp10-received-vaults.md) |

![Interface and metadata standards](/img/standards/standard-detection/standard-detection.jpeg)

## Interface Detection

:::success Tip

See the page **[Contracts Implementation > Interface IDs](./smart-contracts/interface-ids)** for a complete list of current `interfaceId` fields.

:::

> This section covers how to detect if a contract implements a specific interface.

We can verify if a contract implements a specific set of functions (= an **interface**) using the function `supportsInterface(interfaceId)`, passing the bytes4 `interfaceId` as a parameter.

Calling this function will return **TRUE** if the contract implements this specific interfaceId, **FALSE** otherwise.

### Interface Example

A **[Universal Profile](./universal-profile/lsp3-universal-profile-metadata.md)** is a contract based on [ERC725Account](./universal-profile/lsp0-erc725account.md)(LSP0). Therefore, the contract SHOULD implement the functions defined in the [ERC725Account interface](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#interface-cheat-sheet).

<!-- prettier-ignore-start -->

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import Web3 from 'web3';

// Connect to the LUKSO L14 network
const web3 = new Web3('https://rpc.l14.lukso.network');

// Create an instance of the Universal Profile
const myUPContract = new web3.eth.Contract(UniversalProfile.abi, '<contract-address>');

const ERC725AccountInterfaceId = '0x63cb749b';
await myUPContract.methods.supportsInterface(ERC725AccountInterfaceId).call();
// true or false
```

<!-- prettier-ignore-end -->

:::info

See [ERC165 - Standard Interface Detection](https://eips.ethereum.org/EIPS/eip-165) for more details.

:::

## Metadata Detection

:::success Tip

The **[erc725.js](https://github.com/ERC725Alliance/erc725.js/tree/develop/src/schemas)** GitHub repository lists all the `SupportedStandards:{StandardName}` data keys under each ERC725Y JSON Schema.

:::

> This section covers how to detect if a contract contains a specific set of ERC725Y in its storage.

We can verify if a contract contains a specific set of ERC725 keys (= **metadata**) by checking the value stored under the key `SupportedStandards:{StandardName}` in the contract storage, via the function `getData(SupportedStandards:{StandardName})`.

Calling this function will return a specific bytes4 value (defined in the Metadata Standard) if the contract has some metadata keys set by default. Otherwise, it will return an empty value.

### Metadata Example

An **[LSP7DigitalAsset](./nft-2.0/LSP7-Digital-Asset.md)** is a contract that contains ERC725Y Data keys defined in **[LSP4 - Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md)**. Therefore, the contract **SHOULD** have the following ERC725Y Data keys set by default: `LSP4TokenName`, `LSP4TokenSymbol`, `LSP4Metadata`, `LSP4CreatorsMap:<address>` and `LSP4Creators[]`.

<!-- prettier-ignore-start -->

```javascript
import LSP7DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import Web3 from 'web3';

// Connect to the LUKSO L14 network
const web3 = new Web3('https://rpc.l14.lukso.network');

// Create an instance of the LSP7 Token
const myTokenContract = new web3.eth.Contract(LSP7DigitalAsset.abi, '<contract-address>');

const SupportedStandards_LSP4 =
  '0xeafec4d89fa9619884b60000a4d96624a38f7ac2d8d9a604ecf07c12c77e480c';
await myTokenContract.methods['getData(bytes32[])']([SupportedStandards_LSP4,]).call();
// 0xa4d96624 -> valid result according to LSP4
```

<!-- prettier-ignore-end -->

## Further information

- [How to check if an address is a Universal Profile? - (LUKSO Docs)](../guides/universal-profile/check-if-address-is-universal-profile.md)
