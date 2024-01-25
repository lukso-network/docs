---
sidebar_label: '👮 Standard Detection'
sidebar_position: 5
description: Check supported ERC725 storage keys and interfaces of LSPs (LUKSO Standard Proposals) smart contracts.
---

# Standard Detection

If you want to ensure that LSP standards are implemented and working correctly before letting your application interact with smart contracts, you can check their supported ERC725 storage keys and interfaces.

:::tip

You can also use the [🔎 ERC725 Inspect Tool](https://erc725-inspect.lukso.tech/) to fetch and check standards of smart contract addresses within the browser.

:::

:::info

⌨️ The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/metadata-detection) repository and ⚡️ [StackBlitz](https://stackblitz.com/github/lukso-network/lukso-playground?file=metadata-detection%2Fdigital-asset-check.js).

:::

## Setup

The following code snippets require to install a few libraries.

```shell
npm install web3 @erc725/erc725.js @lukso/lsp-smart-contracts
```

## Metadata Detection

You can verify if a contract contains a specific set of ERC725Y keys (= **metadata**) by checking the value stored under the ERC725Y storage key `SupportedStandards:{StandardName}` using the [erc725.js](../../tools/erc725js/getting-started.md) library.

:::note Example

**[LSP7DigitalAsset](../../standards/tokens/LSP7-Digital-Asset.md)** is a contract that contains ERC725Y Data keys defined in **[LSP4 - Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md)**. Therefore, the contract **SHOULD** have the following ERC725Y Data keys set by default: `LSP4TokenName`, `LSP4TokenSymbol`, `LSP4Metadata`, `LSP4CreatorsMap:<address>` and `LSP4Creators[]`.

:::

Similar to the [Read Profile Data Guide](./read-profile-data.md), you can use the [`getData()`](../../tools/erc725js/classes/ERC725.md#getdata) function to check if the contract has a specific metadata standard like [LSP3 Profile](../../standards/universal-profile/lsp3-profile-metadata), [LSP4 Digital Asset](../../standards/tokens/LSP4-Digital-Asset-Metadata) or a [LSP9 Vault](../../standards/universal-profile/lsp9-vault).

<!-- prettier-ignore-start -->

```js
import { ERC725 } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725js = new ERC725(lsp3ProfileSchema, '<myProfileAddress>', 'https://rpc.testnet.lukso.gateway.fm',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);

// Fetch the supported storage standard of LSP3
const isLSP3 = await erc725js.getData('SupportedStandards:LSP3Profile');

// Verify if the standard is supported (value !== null)
console.log(isLSP3);
```

<!-- prettier-ignore-end -->

<details>
    <summary>Example for detecting LSP9Vault data keys</summary>

```js
import { ERC725 } from '@erc725/erc725.js';
import lsp9VaultSchema from '@erc725/erc725.js/schemas/LSP9Vault.json';

const erc725js = new ERC725(
  lsp9VaultSchema,
  '0x9139def55c73c12bcda9c44f12326686e3948634',
  'https://rpc.testnet.lukso.gateway.fm',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);

// Fetch the supported storage standard of LSP9
let isLSP9 = await erc725js.getData('SupportedStandards:LSP9Vault');

// Verify if the standard is supported (value !== null)
console.log(isLSP9);
```

</details>

<details>
    <summary>Example for detecting LSP4DigitalAsset metadata data keys</summary>

```js
import { ERC725 } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

const erc725js = new ERC725(
  lsp3ProfileSchema,
  '0x6395b330F063F96579aA8F7b59f2584fb9b6c3a5',
  'https://rpc.testnet.lukso.gateway.fm',
  {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  },
);

// Fetch the supported storage standard of LSP4
let isLSP4 = await erc725js.getData('SupportedStandards:LSP4DigitalAsset');

// Verify if the standard is supported (value !== null)
console.log(isLSP4);
```

</details>

:::note

You can also check custom data on smart contract storage by loading your own JSON schemas.

:::

## Interface Identification

Every [LSP standard](../../standards/introduction.md) has its own [interface ID](../../contracts/interface-ids.md) (as defined by [ERC-165](https://eips.ethereum.org/EIPS/eip-165)). To verify their specific set of functions (= an **interface**) you can call the standardized `supportsInterface(interfaceId)` function, passing the bytes4 `interfaceId` as a parameter.

## Interface Detection

Calling this function will return `true` if the contract implements this specific interface ID.

:::note Example

A **[Universal Profile](../../standards/universal-profile/lsp3-profile-metadata.md)** is a contract based on [LSP0 - ERC725Account](../../standards/universal-profile/lsp0-erc725account.md). Therefore, the contract MUST implement the functions defined in the [ERC725Account interface](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#interface-cheat-sheet).

:::

<!--prettier-ignore-start-->

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/dist/constants.cjs.js';
import Web3 from 'web3';

// Connect to the LUKSO network
const web3 = new Web3('https://rpc.testnet.lukso.network');

// Create an instance of the Universal Profile
const myUPContract = new web3.eth.Contract(UniversalProfile.abi, '<myContractAddress>');

const LSP0_INTERFACE_ID = INTERFACE_IDS.LSP0ERC725Account;
console.log(
  // true or false
  await myUPContract.methods.supportsInterface(LSP0_INTERFACE_ID).call(),
);
```

<!--prettier-ignore-end-->

<details>
  <summary>
    Instead of using the interface ID from <code>LSP0ERC725Account</code>, you can use any of the supported IDs within the <code>lsp-smart-contracts</code> library to check <a href="../../standards/introduction">all standards used by the LSP ecosystem</a>:
  </summary>

```text
ERC165                        ERC20
ERC223                        ERC721
ERC721Metadata                ERC725X
ERC725Y                       ERC777
ERC1155

LSP0ERC725Account             LSP1UniversalReceiver
LSP6KeyManager                LSP7DigitalAsset
LSP8IdentifiableDigitalAsset  LSP9Vault
LSP11BasicSocialRecovery      LSP14Ownable2Step
LSP17Extendable               LSP17Extension
LSP20CallVerification         LSP20CallVerifier
LSP25ExecuteRelayCall
```

</details>

:::info Further Information

See [ERC165 - Standard Interface Detection](https://eips.ethereum.org/EIPS/eip-165) for more details.

:::
