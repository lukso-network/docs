---
sidebar_label: '🕵🏽 Standard Detection'
description: Learn how to detect different smart contract interfaces and a set of metadata keys related to the LSP (LUKSO Standards Proposals) using ERC165 interface Ids and the 'SupportedStandards:{StandardName}' data key.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Standard Detection

:::caution

The **`interfaceId`** and the **`SupportedStandards:{StandardName}`** data key is not the most secure way to check for a standard, as they could be set manually.

:::

:::tip

Use the [🔎 ERC725 Inspect Tool](https://erc725-inspect.lukso.tech/?network=lukso+mainnet) to check standards interfaces and metadata of smart contract addresses easily.

:::

:::info

⌨️ The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/dapps/metadata-detection) repository.

:::

If you want to ensure that LSP standards are implemented and working correctly before letting your application interact with smart contracts, you can check their supported ERC725 storage keys and interfaces.

## Setup

The following code snippets require the following libraries to be installed:

```shell
npm install web3 @erc725/erc725.js @lukso/lsp-smart-contracts
```

## Metadata Detection

You can verify if a contract contains a specific set of [ERC725Y](/standards/erc725#erc725y-generic-data-keyvalue-store) keys by checking the value stored under the ERC725Y storage key `SupportedStandards:{StandardName}` using the [erc725.js](/tools/dapps/erc725js/getting-started.md) library.

:::note Example

**[LSP7DigitalAsset](/standards/tokens/LSP7-Digital-Asset.md)** is a contract that contains ERC725Y Data keys defined in **[LSP4 - Digital Asset Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md)**. Therefore, the contract **SHOULD** have the following ERC725Y Data keys set by default: `LSP4TokenName`, `LSP4TokenSymbol`, `LSP4Metadata`, `LSP4CreatorsMap:<address>` and `LSP4Creators[]`.

:::

Similar to the [Read Profile Data Guide](/learn/universal-profile/metadata/read-profile-data), you can use the [`getData()`](/tools/dapps/erc725js/methods.md#getdata) function to check if the contract has a specific metadata standard like [LSP3 Profile](/standards/metadata/lsp3-profile-metadata), [LSP4 Digital Asset](/standards/tokens/LSP4-Digital-Asset-Metadata) or a [LSP9 Vault](/standards/accounts/lsp9-vault).

### Example 1 - Detect LSP3 Profile data keys

  <Tabs groupId="web3-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```typescript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SupportedStandards } from '@lukso/lsp-smart-contracts';
import { ethers } from 'ethers';

// Connect to the LUKSO network
const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);

// Create an instance of the Universal Profile
const myUPContract = new ethers.Contract(
  '<myContractAddress>',
  UniversalProfile.abi,
  provider,
);

const result = await myUPContract.getData(SupportedStandards.LSP3Profile.key);

// Verify if the metadata standard is supported
const supportsLSP3Metadata =
  result.value == SupportedStandards.LSP3Profile.value;

console.log(supportsLSP3Metadata); // true or false
```

  </TabItem>
  <TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```js
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SupportedStandards } from '@lukso/lsp-smart-contracts';
import Web3 from 'web3';

// Connect to the LUKSO Testnet
const web3 = new Web3('https://rpc.testnet.lukso.network');

// Create an instance of the Universal Profile
const myUPContract = new web3.eth.Contract(
  '<myContractAddress>',
  UniversalProfile.abi,
);

const result = await myUPContract.methods
  .getData(SupportedStandards.LSP3Profile.key)
  .call();

// Verify if the metadata standard is supported
const supportsLSP3Metadata = result == SupportedStandards.LSP3Profile.value;

console.log(supportsLSP3Metadata); // true or false
```

  </TabItem>
  
  <TabItem value="erc725.js" label="erc725.js"  attributes={{className: "tab_erc725"}}>

```js
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import { SupportedStandards } from '@lukso/lsp-smart-contracts';
import { ERC725 } from '@erc725/erc725.js';

const erc725js = new ERC725(
  '<myContractAddress>', // Universal Profile contract address
  lsp3ProfileSchema,
  'https://rpc.testnet.lukso.network',
);

const result = await erc725js.getData('SupportedStandards:LSP3Profile');

// Verify if the metadata standard is supported
const supportsLSP3Metadata =
  result.value == SupportedStandards.LSP3Profile.value;

console.log(supportsLSP3Metadata); // true or false
```

  </TabItem>

  </Tabs>

### Example 2 - Detect LSP4 Digital Asset data keys

  <Tabs groupId="web3-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

    ```js
    import lsp4Schema from '@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json';
    import { SupportedStandards } from '@lukso/lsp-smart-contracts';
    import { ethers } from 'ethers';

    // Connect to the LUKSO Testnet
    const provider = new ethers.JsonRpcProvider(
      'https://rpc.testnet.lukso.network',
    );

    // Create an instance of the Universal Profile
    const myUPContract = new ethers.Contract(
      '<myContractAddress>',
      lsp4Schema.abi,
      provider,
    );

    const result = await myUPContract.getData(SupportedStandards.lSP4DigitalAsset.key);

    // Verify if the metadata standard is supported
    const supportsLSP4DigitalAsset = result == SupportedStandards.LSP4DigitalAsset.value;

    console.log(supportsLSP4DigitalAsset); // true or false
    ```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js
import lsp4Schema from '@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json';
import { SupportedStandards } from '@lukso/lsp-smart-contracts';
import Web3 from 'web3';

// Connect to the LUKSO network
const web3 = new Web3('https://rpc.testnet.lukso.network');

// Create an instance of the Universal Profile
const myUPContract = new web3.eth.Contract(
  '<myContractAddress>',
  lsp4Schema.abi,
);

const result = await myUPContract.methods
  .getData(SupportedStandards.lsp4DigitalAsset.key)
  .call();

// Verify if the metadata standard is supported
const supportsLSP4DigitalAsset =
  result == SupportedStandards.LSP4DigitalAsset.value;

console.log(supportsLSP4DigitalAsset); // true or false
```

  </TabItem>
  <TabItem value="erc725.js" label="erc725.js" attributes={{className: "tab_erc725"}}>

```js
import lsp4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import { SupportedStandards } from '@lukso/lsp-smart-contracts';
import { ERC725 } from '@erc725/erc725.js';

const erc725js = new ERC725(
  '<myContractAddress>', // Digital Asset contract address
  lsp4Schema,
  'https://rpc.testnet.lukso.network',
);

let result = await erc725js.getData('SupportedStandards:LSP4DigitalAsset');

// Verify if the metadata standard is supported
const supportsLSP4Metadata =
  result == SupportedStandards.LSP4DigitalAsset.value;

console.log(supportsLSP4Metadata); // true or false
```

</TabItem>

</Tabs>

<!--
Commenting temporarily until Vault Standard becomes more stable and is re-worked.
DO NOT REMOVE this code example please 🙏🏻🧉
-->

<!-- ### Example - Detect Vault data keys

```js
import { ERC725 } from '@erc725/erc725.js';
import lsp9VaultSchema from '@erc725/erc725.js/schemas/LSP9Vault.json';

const erc725js = new ERC725(
lsp9VaultSchema,
'0x9139def55c73c12bcda9c44f12326686e3948634',
'https://4201.rpc.thirdweb.com',
{
  ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
},
);

// Fetch the supported storage standard of LSP9
let isLSP9 = await erc725js.getData('SupportedStandards:LSP9Vault');

// Verify if the standard is supported (value !== null)
console.log(isLSP9);
``` -->

:::note

You can also check custom data on smart contract storage by loading your own JSON schemas.

:::

## Interface Identification

Every [LSP standard](/standards/introduction.md) has its own [interface ID](/contracts/interface-ids.md) (as defined by [ERC-165](https://eips.ethereum.org/EIPS/eip-165)). To verify their specific set of functions (= an **interface**) you can call the standardized `supportsInterface(interfaceId)` function, passing the bytes4 `interfaceId` as a parameter.

## Interface Detection

Calling this function will return `true` if the contract implements this specific interface ID.

:::note Example

A **[Universal Profile](/standards/metadata/lsp3-profile-metadata.md)** is a contract based on [LSP0 - ERC725Account](/standards/accounts/lsp0-erc725account.md). Therefore, the contract MUST implement the functions defined in the [ERC725Account interface](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#interface-cheat-sheet).

:::

<Tabs groupId="web3-lib">
<TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/constants';
import { ethers } from 'ethers';

// Connect to the LUKSO network
const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);

// Create an instance of the Universal Profile
const myUPContract = new ethers.Contract(
  '<myContractAddress>',
  UniversalProfile.abi,
  provider,
);

const LSP0_INTERFACE_ID = INTERFACE_IDS.LSP0ERC725Account;
console.log(
  // true or false
  await myUPContract.supportsInterface(LSP0_INTERFACE_ID),
);
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/constants';
import Web3 from 'web3';

// Connect to the LUKSO network
const web3 = new Web3('https://rpc.testnet.lukso.network');

// Create an instance of the Universal Profile
const myUPContract = new web3.eth.Contract(
  UniversalProfile.abi,
  '<myContractAddress>',
);

const LSP0_INTERFACE_ID = INTERFACE_IDS.LSP0ERC725Account;
console.log(
  // true or false
  await myUPContract.methods.supportsInterface(LSP0_INTERFACE_ID).call(),
);
```

  </TabItem>

</Tabs>

<details>
  <summary>
    Instead of using the interface ID from <code>LSP0ERC725Account</code>, you can use any of the supported IDs within the <code>lsp-smart-contracts</code> library to check <a href="/standards/introduction">all standards used by the LSP ecosystem</a>:
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
