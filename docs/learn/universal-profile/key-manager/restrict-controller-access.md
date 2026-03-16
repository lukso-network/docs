---
sidebar_label: 'Restrict Controller Access'
sidebar_position: 4
description: Learn how to restrict what a controller can do on a Universal Profile using AllowedCalls in the LSP6 Key Manager — by specific address, call type, standard interface, or function selector.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Restrict What a Controller Can Do

By default, a controller with the [`CALL`](/standards/access-control/lsp6-key-manager.md#permissions) or [`TRANSFERVALUE`](/standards/access-control/lsp6-key-manager.md#permissions) permission can call **any** contract or transfer LYX to **any** address. The [`AllowedCalls`](/standards/access-control/lsp6-key-manager.md#allowed-calls) feature lets you tighten that: you can limit a controller to specific addresses, specific contract standards (like LSP7 tokens or LSP8 NFTs), or even specific function selectors.

This is useful for:

- Granting a dApp key access to **only one smart contract** it needs.
- Setting up a **spending policy** that only allows sending LYX to a designated address.
- Giving a **design or marketing role** permission to update token/NFT metadata — and nothing else.

:::tip AllowedCalls + Permissions work together

`AllowedCalls` is an _additional_ restriction on top of permissions like `CALL` or `TRANSFERVALUE`. The controller must have the relevant permission **and** its `AllowedCalls` must allow the specific interaction. A controller with `AllowedCalls` set but **no** `CALL` or `TRANSFERVALUE` permission will still be blocked.

See the [Grant Permissions](./grant-permissions.md) guide to learn how to set permissions.

:::

## How AllowedCalls works

`AllowedCalls` is stored as an ERC725Y data key on the Universal Profile:

```
AddressPermissions:AllowedCalls:<controller-address>
```

Each entry in the list is a 32-byte tuple: `(callType, address, standardInterfaceId, functionSelector)`

| Field                 | Type      | Description                                                                                                      |
| --------------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `callType`            | `bytes4`  | Bitmask: which operation types are allowed (`VALUE`, `CALL`, `STATICCALL`, `DELEGATECALL`)                       |
| `address`             | `address` | The target contract address. Use `0xffffffffffffffffffffffffffffffffffffffff` for **any** address.               |
| `standardInterfaceId` | `bytes4`  | The ERC165 interface ID of the required standard. Use `0xffffffff` for **any** standard.                         |
| `functionSelector`    | `bytes4`  | The 4-byte function selector. Use `0xffffffff` for **any** function.                                             |

:::info Call type constants

Import `CALLTYPE` from `@lukso/lsp6-contracts` to avoid hardcoding:

```ts
import { CALLTYPE } from '@lukso/lsp6-contracts';

CALLTYPE.VALUE      // '0x00000001' - transfer LYX
CALLTYPE.CALL       // '0x00000002' - call a function
CALLTYPE.STATICCALL // '0x00000004' - read-only call
CALLTYPE.DELEGATECALL // '0x00000008' - delegate call
```

:::

## Setup

Install the required packages:

<Tabs>

<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```bash
npm install viem @erc725/erc725.js @lukso/lsp-smart-contracts @lukso/lsp6-contracts @lukso/lsp0-contracts
```

</TabItem>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```bash
npm install ethers @erc725/erc725.js @lukso/lsp-smart-contracts @lukso/lsp6-contracts @lukso/lsp0-contracts
```

</TabItem>

<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

```bash
npm install @lukso/lsp-smart-contracts @lukso/lsp6-contracts
```

</TabItem>

</Tabs>

---

## Use Case 1: Allow a controller to interact with one specific asset

Restrict a controller so it can **only call functions on a single contract** — for example, a specific token or marketplace contract.

<Tabs>

<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
import { createWalletClient, createPublicClient, http, custom } from 'viem';
import { lukso } from 'viem/chains';
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import { CALLTYPE } from '@lukso/lsp6-contracts';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

// --- Configuration ---
const myUniversalProfileAddress = '0xYourUniversalProfileAddress';
const controllerAddress = '0xControllerAddressToRestrict';
const targetAssetAddress = '0xSpecificAssetContractAddress';

// --- Connect via UP Browser Extension ---
const walletClient = createWalletClient({
  chain: lukso,
  transport: custom(window.lukso),
});
const [account] = await walletClient.requestAddresses();

// --- Encode AllowedCalls using erc725.js ---
const allowedCallsSchema = [
  {
    name: 'AddressPermissions:AllowedCalls:<address>',
    key: '0x4b80742de2bf393a64c70000<address>',
    keyType: 'MappingWithGrouping',
    valueType: '(bytes4,address,bytes4,bytes4)[CompactBytesArray]',
    valueContent: '(BitArray,Address,Bytes4,Bytes4)',
  },
];

const encodedData = ERC725.encodeData(
  [
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: controllerAddress,
      value: [
        [
          CALLTYPE.CALL,        // allow function calls
          targetAssetAddress,   // only this contract
          '0xffffffff',         // any standard interface
          '0xffffffff',         // any function selector
        ],
      ],
    },
  ],
  allowedCallsSchema,
);

// --- Write to the Universal Profile ---
await walletClient.writeContract({
  address: myUniversalProfileAddress,
  abi: lsp0Erc725AccountAbi,
  functionName: 'setDataBatch',
  args: [encodedData.keys, encodedData.values],
  account,
});

console.log(
  `✅ Controller ${controllerAddress} is now restricted to interact only with ${targetAssetAddress}`,
);
```

</TabItem>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import { CALLTYPE } from '@lukso/lsp6-contracts';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

// --- Configuration ---
const myUniversalProfileAddress = '0xYourUniversalProfileAddress';
const controllerAddress = '0xControllerAddressToRestrict';
const targetAssetAddress = '0xSpecificAssetContractAddress';

// --- Connect via UP Browser Extension ---
const provider = new ethers.BrowserProvider(window.lukso);
const signer = await provider.getSigner();

// --- Encode AllowedCalls using erc725.js ---
const allowedCallsSchema = [
  {
    name: 'AddressPermissions:AllowedCalls:<address>',
    key: '0x4b80742de2bf393a64c70000<address>',
    keyType: 'MappingWithGrouping',
    valueType: '(bytes4,address,bytes4,bytes4)[CompactBytesArray]',
    valueContent: '(BitArray,Address,Bytes4,Bytes4)',
  },
];

const encodedData = ERC725.encodeData(
  [
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: controllerAddress,
      value: [
        [
          CALLTYPE.CALL,        // allow function calls
          targetAssetAddress,   // only this contract
          '0xffffffff',         // any standard interface
          '0xffffffff',         // any function selector
        ],
      ],
    },
  ],
  allowedCallsSchema,
);

// --- Write to the Universal Profile ---
const universalProfile = new ethers.Contract(
  myUniversalProfileAddress,
  lsp0Erc725AccountAbi,
  signer,
);

await universalProfile.setDataBatch(encodedData.keys, encodedData.values);

console.log(
  `✅ Controller ${controllerAddress} is now restricted to interact only with ${targetAssetAddress}`,
);
```

</TabItem>

<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

Use this in a contract to read and verify a controller's AllowedCalls on a Universal Profile:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC725Y} from '@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol';
import {LSP6Utils} from '@lukso/lsp6-contracts/contracts/LSP6Utils.sol';

contract CheckAllowedCalls {
    /**
     * @dev Returns the raw AllowedCalls bytes stored for `controller` on the given Universal Profile.
     *      Returns `0x` if no AllowedCalls are set (= unrestricted if controller has CALL permission).
     */
    function getAllowedCalls(
        address universalProfile,
        address controller
    ) external view returns (bytes memory) {
        return LSP6Utils.getAllowedCallsFor(
            IERC725Y(universalProfile),
            controller
        );
    }

    /**
     * @dev Check if the stored AllowedCalls bytes form a valid CompactBytesArray.
     */
    function isValidAllowedCalls(
        address universalProfile,
        address controller
    ) external view returns (bool) {
        bytes memory allowedCalls = LSP6Utils.getAllowedCallsFor(
            IERC725Y(universalProfile),
            controller
        );
        return LSP6Utils.isCompactBytesArrayOfAllowedCalls(allowedCalls);
    }
}
```

</TabItem>

</Tabs>

---

## Use Case 2: Allow a controller to transfer LYX to one address only

Lock down a controller so it can **only send LYX to a single recipient** — no contract calls, no other addresses.

<Tabs>

<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
import { createWalletClient, custom } from 'viem';
import { lukso } from 'viem/chains';
import { ERC725 } from '@erc725/erc725.js';
import { CALLTYPE } from '@lukso/lsp6-contracts';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

// --- Configuration ---
const myUniversalProfileAddress = '0xYourUniversalProfileAddress';
const controllerAddress = '0xControllerAddressToRestrict';
const allowedRecipient = '0xRecipientAddress'; // only this address can receive LYX

// --- Connect via UP Browser Extension ---
const walletClient = createWalletClient({
  chain: lukso,
  transport: custom(window.lukso),
});
const [account] = await walletClient.requestAddresses();

// --- Encode AllowedCalls ---
const allowedCallsSchema = [
  {
    name: 'AddressPermissions:AllowedCalls:<address>',
    key: '0x4b80742de2bf393a64c70000<address>',
    keyType: 'MappingWithGrouping',
    valueType: '(bytes4,address,bytes4,bytes4)[CompactBytesArray]',
    valueContent: '(BitArray,Address,Bytes4,Bytes4)',
  },
];

const encodedData = ERC725.encodeData(
  [
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: controllerAddress,
      value: [
        [
          CALLTYPE.VALUE,      // allow value transfer (LYX) only
          allowedRecipient,    // only to this address
          '0xffffffff',        // any standard interface
          '0xffffffff',        // any function
        ],
      ],
    },
  ],
  allowedCallsSchema,
);

// --- Write to the Universal Profile ---
await walletClient.writeContract({
  address: myUniversalProfileAddress,
  abi: lsp0Erc725AccountAbi,
  functionName: 'setDataBatch',
  args: [encodedData.keys, encodedData.values],
  account,
});

console.log(
  `✅ Controller ${controllerAddress} can now only send LYX to ${allowedRecipient}`,
);
```

</TabItem>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import { CALLTYPE } from '@lukso/lsp6-contracts';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

// --- Configuration ---
const myUniversalProfileAddress = '0xYourUniversalProfileAddress';
const controllerAddress = '0xControllerAddressToRestrict';
const allowedRecipient = '0xRecipientAddress'; // only this address can receive LYX

// --- Connect via UP Browser Extension ---
const provider = new ethers.BrowserProvider(window.lukso);
const signer = await provider.getSigner();

// --- Encode AllowedCalls ---
const allowedCallsSchema = [
  {
    name: 'AddressPermissions:AllowedCalls:<address>',
    key: '0x4b80742de2bf393a64c70000<address>',
    keyType: 'MappingWithGrouping',
    valueType: '(bytes4,address,bytes4,bytes4)[CompactBytesArray]',
    valueContent: '(BitArray,Address,Bytes4,Bytes4)',
  },
];

const encodedData = ERC725.encodeData(
  [
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: controllerAddress,
      value: [
        [
          CALLTYPE.VALUE,      // allow value transfer (LYX) only
          allowedRecipient,    // only to this address
          '0xffffffff',        // any standard interface
          '0xffffffff',        // any function
        ],
      ],
    },
  ],
  allowedCallsSchema,
);

// --- Write to the Universal Profile ---
const universalProfile = new ethers.Contract(
  myUniversalProfileAddress,
  lsp0Erc725AccountAbi,
  signer,
);

await universalProfile.setDataBatch(encodedData.keys, encodedData.values);

console.log(
  `✅ Controller ${controllerAddress} can now only send LYX to ${allowedRecipient}`,
);
```

</TabItem>

<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC725Y} from '@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol';
import {LSP6Utils} from '@lukso/lsp6-contracts/contracts/LSP6Utils.sol';

contract CheckAllowedCalls {
    /**
     * @dev Returns the raw AllowedCalls bytes stored for `controller` on the given Universal Profile.
     *
     *      To verify a LYX-only transfer restriction:
     *      - callType must have the VALUE bit set (0x00000001)
     *      - address must be the single allowed recipient
     *      - standardInterfaceId: 0xffffffff (any)
     *      - functionSelector: 0xffffffff (any)
     *
     *      The Key Manager automatically validates all of this at execution time.
     */
    function getAllowedCalls(
        address universalProfile,
        address controller
    ) external view returns (bytes memory) {
        return LSP6Utils.getAllowedCallsFor(
            IERC725Y(universalProfile),
            controller
        );
    }
}
```

</TabItem>

</Tabs>

:::note Required permission

For a controller to transfer LYX, it must have the `TRANSFERVALUE` permission set **in addition** to having `AllowedCalls` configured. See [Grant Permissions](./grant-permissions.md).

:::

---

## Use Case 3: Allow a controller to interact only with token or NFT contracts

Restrict a controller so it can **only call contracts that implement the LSP7 (token) or LSP8 (NFT) standard**. The Key Manager checks the target contract's `supportsInterface(bytes4)` at call time.

<Tabs>

<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
import { createWalletClient, custom } from 'viem';
import { lukso } from 'viem/chains';
import { ERC725 } from '@erc725/erc725.js';
import { CALLTYPE } from '@lukso/lsp6-contracts';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

// --- Configuration ---
const myUniversalProfileAddress = '0xYourUniversalProfileAddress';
const controllerAddress = '0xControllerAddressToRestrict';

// --- Connect via UP Browser Extension ---
const walletClient = createWalletClient({
  chain: lukso,
  transport: custom(window.lukso),
});
const [account] = await walletClient.requestAddresses();

// --- Encode AllowedCalls ---
// Allow CALL to any LSP7 token contract OR any LSP8 NFT contract
const allowedCallsSchema = [
  {
    name: 'AddressPermissions:AllowedCalls:<address>',
    key: '0x4b80742de2bf393a64c70000<address>',
    keyType: 'MappingWithGrouping',
    valueType: '(bytes4,address,bytes4,bytes4)[CompactBytesArray]',
    valueContent: '(BitArray,Address,Bytes4,Bytes4)',
  },
];

const encodedData = ERC725.encodeData(
  [
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: controllerAddress,
      value: [
        // Entry 1: allow calling any LSP7 token contract
        [
          CALLTYPE.CALL,
          '0xffffffffffffffffffffffffffffffffffffffff', // any address
          INTERFACE_IDS.LSP7DigitalAsset,              // must support LSP7
          '0xffffffff',                                // any function
        ],
        // Entry 2: allow calling any LSP8 NFT contract
        [
          CALLTYPE.CALL,
          '0xffffffffffffffffffffffffffffffffffffffff', // any address
          INTERFACE_IDS.LSP8IdentifiableDigitalAsset,  // must support LSP8
          '0xffffffff',                                // any function
        ],
      ],
    },
  ],
  allowedCallsSchema,
);

// --- Write to the Universal Profile ---
await walletClient.writeContract({
  address: myUniversalProfileAddress,
  abi: lsp0Erc725AccountAbi,
  functionName: 'setDataBatch',
  args: [encodedData.keys, encodedData.values],
  account,
});

console.log(
  `✅ Controller ${controllerAddress} can now only interact with LSP7 and LSP8 contracts`,
);
```

</TabItem>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import { CALLTYPE } from '@lukso/lsp6-contracts';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

// --- Configuration ---
const myUniversalProfileAddress = '0xYourUniversalProfileAddress';
const controllerAddress = '0xControllerAddressToRestrict';

// --- Connect via UP Browser Extension ---
const provider = new ethers.BrowserProvider(window.lukso);
const signer = await provider.getSigner();

// --- Encode AllowedCalls ---
// Allow CALL to any LSP7 token contract OR any LSP8 NFT contract
const allowedCallsSchema = [
  {
    name: 'AddressPermissions:AllowedCalls:<address>',
    key: '0x4b80742de2bf393a64c70000<address>',
    keyType: 'MappingWithGrouping',
    valueType: '(bytes4,address,bytes4,bytes4)[CompactBytesArray]',
    valueContent: '(BitArray,Address,Bytes4,Bytes4)',
  },
];

const encodedData = ERC725.encodeData(
  [
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: controllerAddress,
      value: [
        // Entry 1: allow calling any LSP7 token contract
        [
          CALLTYPE.CALL,
          '0xffffffffffffffffffffffffffffffffffffffff', // any address
          INTERFACE_IDS.LSP7DigitalAsset,              // must support LSP7
          '0xffffffff',                                // any function
        ],
        // Entry 2: allow calling any LSP8 NFT contract
        [
          CALLTYPE.CALL,
          '0xffffffffffffffffffffffffffffffffffffffff', // any address
          INTERFACE_IDS.LSP8IdentifiableDigitalAsset,  // must support LSP8
          '0xffffffff',                                // any function
        ],
      ],
    },
  ],
  allowedCallsSchema,
);

// --- Write to the Universal Profile ---
const universalProfile = new ethers.Contract(
  myUniversalProfileAddress,
  lsp0Erc725AccountAbi,
  signer,
);

await universalProfile.setDataBatch(encodedData.keys, encodedData.values);

console.log(
  `✅ Controller ${controllerAddress} can now only interact with LSP7 and LSP8 contracts`,
);
```

</TabItem>

<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

The Key Manager automatically calls `supportsInterface` on the target contract at execution time to verify it matches the allowed `standardInterfaceId`. You can replicate this check in Solidity:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC165} from '@openzeppelin/contracts/utils/introspection/IERC165.sol';
import {IERC725Y} from '@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol';
import {LSP6Utils} from '@lukso/lsp6-contracts/contracts/LSP6Utils.sol';
import {_INTERFACEID_LSP7} from '@lukso/lsp7-contracts/contracts/LSP7Constants.sol';
import {_INTERFACEID_LSP8} from '@lukso/lsp8-contracts/contracts/LSP8Constants.sol';

contract CheckTokenOrNFTAccess {
    /**
     * @dev Returns true if `target` is an LSP7 or LSP8 contract
     *      — the same check the Key Manager performs when validating AllowedCalls.
     */
    function isTokenOrNFTContract(address target) external view returns (bool) {
        return
            IERC165(target).supportsInterface(_INTERFACEID_LSP7) ||
            IERC165(target).supportsInterface(_INTERFACEID_LSP8);
    }

    /**
     * @dev Read the raw AllowedCalls bytes for a controller on a UP.
     */
    function getAllowedCalls(
        address universalProfile,
        address controller
    ) external view returns (bytes memory) {
        return LSP6Utils.getAllowedCallsFor(
            IERC725Y(universalProfile),
            controller
        );
    }
}
```

</TabItem>

</Tabs>

---

## Use Case 4: Allow a controller to set metadata on token/NFT contracts only

This is the **Marketing or Design Manager** pattern: the controller can call `setData(bytes32,bytes)` on any LSP7 or LSP8 contract — updating metadata like name, description, or images — but cannot transfer tokens or call any other function.

The function selector for `setData(bytes32,bytes)` is `0x7f23690c`.

<Tabs>

<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
import { createWalletClient, custom } from 'viem';
import { lukso } from 'viem/chains';
import { ERC725 } from '@erc725/erc725.js';
import { CALLTYPE } from '@lukso/lsp6-contracts';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

// --- Configuration ---
const myUniversalProfileAddress = '0xYourUniversalProfileAddress';
const marketingManagerAddress = '0xMarketingOrDesignManagerAddress';

// setData(bytes32,bytes) function selector
const SET_DATA_SELECTOR = '0x7f23690c';

// --- Connect via UP Browser Extension ---
const walletClient = createWalletClient({
  chain: lukso,
  transport: custom(window.lukso),
});
const [account] = await walletClient.requestAddresses();

// --- Encode AllowedCalls ---
// Allow calling setData on any LSP7 token or LSP8 NFT contract
const allowedCallsSchema = [
  {
    name: 'AddressPermissions:AllowedCalls:<address>',
    key: '0x4b80742de2bf393a64c70000<address>',
    keyType: 'MappingWithGrouping',
    valueType: '(bytes4,address,bytes4,bytes4)[CompactBytesArray]',
    valueContent: '(BitArray,Address,Bytes4,Bytes4)',
  },
];

const encodedData = ERC725.encodeData(
  [
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: marketingManagerAddress,
      value: [
        // Allow setData on any LSP7 token contract
        [
          CALLTYPE.CALL,
          '0xffffffffffffffffffffffffffffffffffffffff', // any address
          INTERFACE_IDS.LSP7DigitalAsset,              // must support LSP7
          SET_DATA_SELECTOR,                           // only setData(bytes32,bytes)
        ],
        // Allow setData on any LSP8 NFT contract
        [
          CALLTYPE.CALL,
          '0xffffffffffffffffffffffffffffffffffffffff', // any address
          INTERFACE_IDS.LSP8IdentifiableDigitalAsset,  // must support LSP8
          SET_DATA_SELECTOR,                           // only setData(bytes32,bytes)
        ],
      ],
    },
  ],
  allowedCallsSchema,
);

// --- Write to the Universal Profile ---
await walletClient.writeContract({
  address: myUniversalProfileAddress,
  abi: lsp0Erc725AccountAbi,
  functionName: 'setDataBatch',
  args: [encodedData.keys, encodedData.values],
  account,
});

console.log(
  `✅ Marketing/Design manager ${marketingManagerAddress} can now only call setData on LSP7/LSP8 contracts`,
);
```

</TabItem>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import { CALLTYPE } from '@lukso/lsp6-contracts';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

// --- Configuration ---
const myUniversalProfileAddress = '0xYourUniversalProfileAddress';
const marketingManagerAddress = '0xMarketingOrDesignManagerAddress';

// setData(bytes32,bytes) function selector
const SET_DATA_SELECTOR = '0x7f23690c';

// --- Connect via UP Browser Extension ---
const provider = new ethers.BrowserProvider(window.lukso);
const signer = await provider.getSigner();

// --- Encode AllowedCalls ---
// Allow calling setData on any LSP7 token or LSP8 NFT contract
const allowedCallsSchema = [
  {
    name: 'AddressPermissions:AllowedCalls:<address>',
    key: '0x4b80742de2bf393a64c70000<address>',
    keyType: 'MappingWithGrouping',
    valueType: '(bytes4,address,bytes4,bytes4)[CompactBytesArray]',
    valueContent: '(BitArray,Address,Bytes4,Bytes4)',
  },
];

const encodedData = ERC725.encodeData(
  [
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: marketingManagerAddress,
      value: [
        // Allow setData on any LSP7 token contract
        [
          CALLTYPE.CALL,
          '0xffffffffffffffffffffffffffffffffffffffff', // any address
          INTERFACE_IDS.LSP7DigitalAsset,              // must support LSP7
          SET_DATA_SELECTOR,                           // only setData(bytes32,bytes)
        ],
        // Allow setData on any LSP8 NFT contract
        [
          CALLTYPE.CALL,
          '0xffffffffffffffffffffffffffffffffffffffff', // any address
          INTERFACE_IDS.LSP8IdentifiableDigitalAsset,  // must support LSP8
          SET_DATA_SELECTOR,                           // only setData(bytes32,bytes)
        ],
      ],
    },
  ],
  allowedCallsSchema,
);

// --- Write to the Universal Profile ---
const universalProfile = new ethers.Contract(
  myUniversalProfileAddress,
  lsp0Erc725AccountAbi,
  signer,
);

await universalProfile.setDataBatch(encodedData.keys, encodedData.values);

console.log(
  `✅ Marketing/Design manager ${marketingManagerAddress} can now only call setData on LSP7/LSP8 contracts`,
);
```

</TabItem>

<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC165} from '@openzeppelin/contracts/utils/introspection/IERC165.sol';
import {IERC725Y} from '@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol';
import {LSP6Utils} from '@lukso/lsp6-contracts/contracts/LSP6Utils.sol';
import {_INTERFACEID_LSP7} from '@lukso/lsp7-contracts/contracts/LSP7Constants.sol';
import {_INTERFACEID_LSP8} from '@lukso/lsp8-contracts/contracts/LSP8Constants.sol';

contract CheckMetadataManagerAccess {
    // setData(bytes32,bytes) selector
    bytes4 private constant _SET_DATA_SELECTOR = 0x7f23690c;

    /**
     * @dev Returns true if `target` is an LSP7 or LSP8 contract that supports `setData`.
     *      A controller with only this selector allowed can update metadata
     *      but cannot transfer tokens or call any other function.
     */
    function canSetMetadata(address target) external view returns (bool) {
        return
            IERC165(target).supportsInterface(_INTERFACEID_LSP7) ||
            IERC165(target).supportsInterface(_INTERFACEID_LSP8);
    }

    /**
     * @dev Read the raw AllowedCalls bytes for a controller on a UP.
     *      Decode the result off-chain to verify the function selector is restricted to 0x7f23690c.
     */
    function getAllowedCalls(
        address universalProfile,
        address controller
    ) external view returns (bytes memory) {
        return LSP6Utils.getAllowedCallsFor(
            IERC725Y(universalProfile),
            controller
        );
    }
}
```

</TabItem>

</Tabs>

:::note Required permissions

The metadata manager controller needs the `CALL` permission (to call `setData` on the token contract) **and** optionally `SUPER_SETDATA` or `SETDATA` on the Universal Profile itself if it also needs to update the UP's own metadata.

Since `AllowedCalls` restricts **external calls** (calls the controller makes via `UP.execute(...)`), and not `setData` directly on the UP, make sure to combine this with [`AllowedERC725YDataKeys`](/standards/access-control/lsp6-key-manager.md#allowed-erc725y-data-keys) if you also want to restrict which data keys the controller can write on the UP.

:::

---

## Combining AllowedCalls with Permissions

`AllowedCalls` only restricts calls made through the Key Manager. You still need to grant the appropriate permission for the call type:

| Use Case                            | Required Permission   | AllowedCalls callType |
| ----------------------------------- | --------------------- | --------------------- |
| Interact with a specific asset      | `CALL`                | `CALLTYPE.CALL`       |
| Transfer LYX to one address         | `TRANSFERVALUE`       | `CALLTYPE.VALUE`      |
| Interact with LSP7/LSP8 contracts   | `CALL`                | `CALLTYPE.CALL`       |
| Set metadata on LSP7/LSP8 contracts | `CALL`                | `CALLTYPE.CALL`       |

To set both permissions and `AllowedCalls` in a **single transaction**, include all three data keys in the `setDataBatch` call: the permission key, the `AddressPermissions[]` array update, and the `AllowedCalls` key.

<Tabs>

<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
import { createWalletClient, custom } from 'viem';
import { lukso } from 'viem/chains';
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import { CALLTYPE } from '@lukso/lsp6-contracts';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

const myUniversalProfileAddress = '0xYourUniversalProfileAddress';
const controllerAddress = '0xControllerAddress';
const targetAssetAddress = '0xSpecificAssetContractAddress';

const walletClient = createWalletClient({ chain: lukso, transport: custom(window.lukso) });
const [account] = await walletClient.requestAddresses();

// Initialize erc725.js for permissions encoding
const erc725 = new ERC725(LSP6Schema, myUniversalProfileAddress, 'https://rpc.lukso.network');

// Retrieve current controller count to know the array index
const addressPermissions = await erc725.getData('AddressPermissions[]');
const currentLength = (addressPermissions.value as string[]).length;

// Encode permissions (CALL permission)
const permissionsData = erc725.encodeData([
  {
    keyName: 'AddressPermissions:Permissions:<address>',
    dynamicKeyParts: controllerAddress,
    value: erc725.encodePermissions({ CALL: true }),
  },
  {
    keyName: 'AddressPermissions[]',
    value: [controllerAddress],
    startingIndex: currentLength,
    totalArrayLength: currentLength + 1,
  },
]);

// Encode AllowedCalls separately
const allowedCallsSchema = [
  {
    name: 'AddressPermissions:AllowedCalls:<address>',
    key: '0x4b80742de2bf393a64c70000<address>',
    keyType: 'MappingWithGrouping',
    valueType: '(bytes4,address,bytes4,bytes4)[CompactBytesArray]',
    valueContent: '(BitArray,Address,Bytes4,Bytes4)',
  },
];

const allowedCallsData = ERC725.encodeData(
  [
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: controllerAddress,
      value: [
        [
          CALLTYPE.CALL,
          targetAssetAddress,
          '0xffffffff',
          '0xffffffff',
        ],
      ],
    },
  ],
  allowedCallsSchema,
);

// Merge and send in one transaction
const allKeys = [...permissionsData.keys, ...allowedCallsData.keys];
const allValues = [...permissionsData.values, ...allowedCallsData.values];

await walletClient.writeContract({
  address: myUniversalProfileAddress,
  abi: lsp0Erc725AccountAbi,
  functionName: 'setDataBatch',
  args: [allKeys, allValues],
  account,
});

console.log('✅ Permissions + AllowedCalls set in a single transaction');
```

</TabItem>

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import { CALLTYPE } from '@lukso/lsp6-contracts';
import { lsp0Erc725AccountAbi } from '@lukso/lsp0-contracts/abi';

const myUniversalProfileAddress = '0xYourUniversalProfileAddress';
const controllerAddress = '0xControllerAddress';
const targetAssetAddress = '0xSpecificAssetContractAddress';

const provider = new ethers.BrowserProvider(window.lukso);
const signer = await provider.getSigner();

// Initialize erc725.js for permissions encoding
const erc725 = new ERC725(LSP6Schema, myUniversalProfileAddress, 'https://rpc.lukso.network');

// Retrieve current controller count
const addressPermissions = await erc725.getData('AddressPermissions[]');
const currentLength = (addressPermissions.value as string[]).length;

// Encode permissions (CALL permission)
const permissionsData = erc725.encodeData([
  {
    keyName: 'AddressPermissions:Permissions:<address>',
    dynamicKeyParts: controllerAddress,
    value: erc725.encodePermissions({ CALL: true }),
  },
  {
    keyName: 'AddressPermissions[]',
    value: [controllerAddress],
    startingIndex: currentLength,
    totalArrayLength: currentLength + 1,
  },
]);

// Encode AllowedCalls
const allowedCallsSchema = [
  {
    name: 'AddressPermissions:AllowedCalls:<address>',
    key: '0x4b80742de2bf393a64c70000<address>',
    keyType: 'MappingWithGrouping',
    valueType: '(bytes4,address,bytes4,bytes4)[CompactBytesArray]',
    valueContent: '(BitArray,Address,Bytes4,Bytes4)',
  },
];

const allowedCallsData = ERC725.encodeData(
  [
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: controllerAddress,
      value: [
        [
          CALLTYPE.CALL,
          targetAssetAddress,
          '0xffffffff',
          '0xffffffff',
        ],
      ],
    },
  ],
  allowedCallsSchema,
);

// Merge and send in one transaction
const allKeys = [...permissionsData.keys, ...allowedCallsData.keys];
const allValues = [...permissionsData.values, ...allowedCallsData.values];

const universalProfile = new ethers.Contract(myUniversalProfileAddress, lsp0Erc725AccountAbi, signer);
await universalProfile.setDataBatch(allKeys, allValues);

console.log('✅ Permissions + AllowedCalls set in a single transaction');
```

</TabItem>

<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC725Y} from '@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol';

/**
 * @dev Minimal example of reading both the permissions bitmap and the AllowedCalls
 *      for a controller on a Universal Profile.
 *
 * Data keys (LSP6 ERC725Y schema):
 *   Permissions: 0x4b80742de2bf82acb3630000<controller>
 *   AllowedCalls: 0x4b80742de2bf393a64c70000<controller>
 */
contract ReadControllerData {
    bytes12 private constant _PERMISSIONS_PREFIX = 0x4b80742de2bf82acb3630000;
    bytes12 private constant _ALLOWED_CALLS_PREFIX = 0x4b80742de2bf393a64c70000;

    function getPermissions(
        address universalProfile,
        address controller
    ) external view returns (bytes32) {
        bytes32 key = bytes32(abi.encodePacked(_PERMISSIONS_PREFIX, controller));
        bytes memory value = IERC725Y(universalProfile).getData(key);
        return value.length == 32 ? bytes32(value) : bytes32(0);
    }

    function getAllowedCalls(
        address universalProfile,
        address controller
    ) external view returns (bytes memory) {
        bytes32 key = bytes32(abi.encodePacked(_ALLOWED_CALLS_PREFIX, controller));
        return IERC725Y(universalProfile).getData(key);
    }
}
```

</TabItem>

</Tabs>

---

## Further reading

- [LSP6 Key Manager — AllowedCalls specification](/standards/access-control/lsp6-key-manager.md#allowed-calls)
- [Grant Permissions](./grant-permissions.md)
- [erc725.js — `encodeData` reference](/tools/dapps/erc725js/methods.md#encodedata)
- [LSP6 LIP specification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#addresspermissionsallowedcallsaddress)
