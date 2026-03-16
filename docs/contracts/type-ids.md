---
title: LSP1 Notification Type IDs
sidebar_label: LSP1 Notification Type IDs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LSP1 Notification Type IDs

The **LSP1 Type IDs** listed below are unique identifiers used across the LSP standards for the [Universal Receiver](../standards/accounts/lsp1-universal-receiver.md) notification mechanism.

These Type IDs are sent as the `typeId` parameter when calling the `universalReceiver(bytes32 typeId, bytes data)` function on contracts implementing [LSP1](../standards/accounts/lsp1-universal-receiver.md). They allow contracts to identify what type of notification they are receiving and react accordingly.

When a Universal Profile receives a notification, its Universal Receiver function ([LSP1](../standards/accounts/lsp1-universal-receiver.md)) is called with a `typeId` and `data`. A connected [LSP1 Delegate](../standards/accounts/lsp1-universal-receiver-delegate.md) inspects the `typeId` to decide how to react. For example:

- Auto-register a received token / NFT in your list of received assets
- Swap automatically a token received
- Send a tip or an NFT to a new follower
- Auto-split received LYX / LSP7 tokens between collaborators
- Save a new follower to a subscriber list for future airdrops (NFT music tracks, vouchers, newsletter, etc...)
- Any customisation you might want

## Notification Type IDs list

| Notification Type                                                     | TypeId value                                                                                                                                                                       | Details                                               |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| When receiving native LYX (ERC725Account)                             | [`LSP0ValueReceived`](#lsp0valuereceived) <br/> ➡ `0x9c4705229491d365fb5434052e12a386d6771d976bea61070a8c694e8affea3d`                                                             | [↓](#lsp0valuereceived)                               |
| When ownership transfer starts (ERC725Account)                        | [`LSP0OwnershipTransferStarted`](#lsp0ownershiptransferstarted) <br/> ➡ `0xe17117c9d2665d1dbeb479ed8058bbebde3c50ac50e2e65619f60006caac6926`                                       | [↓](#lsp0ownershiptransferstarted)                    |
| When previous owner is notified of ownership transfer (ERC725Account) | [`LSP0OwnershipTransferred_SenderNotification`](#lsp0ownershiptransferred_sendernotification) <br/> ➡ `0xa4e59c931d14f7c8a7a35027f92ee40b5f2886b9fdcdb78f30bc5ecce5a2f814`         | [↓](#lsp0ownershiptransferred_sendernotification)     |
| When new owner is notified of ownership transfer (ERC725Account)      | [`LSP0OwnershipTransferred_RecipientNotification`](#lsp0ownershiptransferred_recipientnotification) <br/> ➡ `0xceca317f109c43507871523e82dc2a3cc64dfa18f12da0b6db14f6e23f995538`   | [↓](#lsp0ownershiptransferred_recipientnotification)  |
| When sending LSP7 tokens                                              | [`LSP7Tokens_SenderNotification`](#lsp7tokens_sendernotification) <br/> ➡ `0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea`                                     | [↓](#lsp7tokens_sendernotification)                   |
| When receiving LSP7 tokens                                            | [`LSP7Tokens_RecipientNotification`](#lsp7tokens_recipientnotification) <br/> ➡ `0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c`                               | [↓](#lsp7tokens_recipientnotification)                |
| When an LSP7 operator is authorized or revoked                        | [`LSP7Tokens_OperatorNotification`](#lsp7tokens_operatornotification) <br/> ➡ `0x386072cc5a58e61263b434c722725f21031cd06e7c552cfaa06db5de8a320dbc`                                 | [↓](#lsp7tokens_operatornotification)                 |
| When sending an LSP8 NFT                                              | [`LSP8Tokens_SenderNotification`](#lsp8tokens_sendernotification) <br/> ➡ `0xb23eae7e6d1564b295b4c3e3be402d9a2f0776c57bdf365903496f6fa481ab00`                                     | [↓](#lsp8tokens_sendernotification)                   |
| When receiving an LSP8 NFT                                            | [`LSP8Tokens_RecipientNotification`](#lsp8tokens_recipientnotification) <br/> ➡ `0x0b084a55ebf70fd3c06fd755269dac2212c4d3f0f4d09079780bfa50c1b2984d`                               | [↓](#lsp8tokens_recipientnotification)                |
| When an LSP8 operator is authorized or revoked                        | [`LSP8Tokens_OperatorNotification`](#lsp8tokens_operatornotification) <br/> ➡ `0x8a1c15a8799f71b547e08e2bcb2e85257e81b0a07eee2ce6712549eef1f00970`                                 | [↓](#lsp8tokens_operatornotification)                 |
| When receiving native LYX (Vault)                                     | [`LSP9ValueReceived`](#lsp9valuereceived) <br/> ➡ `0x468cd1581d7bc001c3b685513d2b929b55437be34700410383d58f3aa1ea0abc`                                                             | [↓](#lsp9valuereceived)                               |
| When ownership transfer starts (Vault)                                | [`LSP9OwnershipTransferStarted`](#lsp9ownershiptransferstarted) <br/> ➡ `0xaefd43f45fed1bcd8992f23c803b6f4ec45cf6b62b0d404d565f290a471e763f`                                       | [↓](#lsp9ownershiptransferstarted)                    |
| When previous owner is notified of Vault ownership transfer           | [`LSP9OwnershipTransferred_SenderNotification`](#lsp9ownershiptransferred_sendernotification) <br/> ➡ `0x0c622e58e6b7089ae35f1af1c86d997be92fcdd8c9509652022d41aa65169471`         | [↓](#lsp9ownershiptransferred_sendernotification)     |
| When new owner is notified of Vault ownership transfer                | [`LSP9OwnershipTransferred_RecipientNotification`](#lsp9ownershiptransferred_recipientnotification) <br/> ➡ `0x79855c97dbc259ce395421d933d7bc0699b0f1561f988f09a9e8633fd542fe5c`   | [↓](#lsp9ownershiptransferred_recipientnotification)  |
| When ownership transfer starts (Ownable2Step)                         | [`LSP14OwnershipTransferStarted`](#lsp14ownershiptransferstarted) <br/> ➡ `0xee9a7c0924f740a2ca33d59b7f0c2929821ea9837ce043ce91c1823e9c4e52c0`                                     | [↓](#lsp14ownershiptransferstarted)                   |
| When previous owner is notified of Ownable2Step transfer              | [`LSP14OwnershipTransferred_SenderNotification`](#lsp14ownershiptransferred_sendernotification) <br/> ➡ `0xa124442e1cc7b52d8e2ede2787d43527dc1f3ae0de87f50dd03e27a71834f74c`       | [↓](#lsp14ownershiptransferred_sendernotification)    |
| When new owner is notified of Ownable2Step transfer                   | [`LSP14OwnershipTransferred_RecipientNotification`](#lsp14ownershiptransferred_recipientnotification) <br/> ➡ `0xe32c7debcb817925ba4883fdbfc52797187f28f73f860641dab1a68d9b32902c` | [↓](#lsp14ownershiptransferred_recipientnotification) |
| When someone follows you                                              | [`LSP26FollowerSystem_FollowNotification`](#lsp26followersystem_follownotification) <br/> ➡ `0x71e02f9f05bcd5816ec4f3134aa2e5a916669537ec6c77fe66ea595fabc2d51a`                   | [↓](#lsp26followersystem_follownotification)          |
| When someone unfollows you                                            | [`LSP26FollowerSystem_UnfollowNotification`](#lsp26followersystem_unfollownotification) <br/> ➡ `0x9d3c0b4012b69658977b099bdaa51eff0f0460f421fba96d15669506c00d1c4f`               | [↓](#lsp26followersystem_unfollownotification)        |

## Using Type ID

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

The JavaScript constants are exported from the [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts) package.

```js
import { LSP1_TYPE_IDS } from '@lukso/lsp-smart-contracts';

// Type ID for receiving native tokens (LYX)
LSP1_TYPE_IDS.LSP0ValueReceived;

// Type ID for receiving LSP7 tokens
LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification;

// Type ID for follow notifications
LSP1_TYPE_IDS.LSP26FollowerSystem_FollowNotification;
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

The JavaScript constants are exported from the [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts) package.

```js
import { LSP1_TYPE_IDS } from '@lukso/lsp-smart-contracts';

// The constants are plain bytes32 hex strings
LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification;
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

The Solidity constants are defined in each LSP's contract constants file (e.g., `LSP7Constants.sol`, `LSP26Constants.sol`). It is recommended to import them from the [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts) package to ensure the correct Type IDs are used.

```solidity
import { _TYPEID_LSP7_TOKENSSENDER } from "@lukso/lsp7-contracts/contracts/LSP7Constants.sol";

function universalReceiverDelegate(
    address sender,
    uint256 value,
    bytes32 typeId,
    bytes memory data
) external returns (bytes memory) {
    if (typeId == _TYPEID_LSP7_TOKENSSENDER) {
        // handle LSP7 token sent notification
    }
}
```

  </TabItem>
</Tabs>

<details>
  <summary><strong>How Type IDs are generated</strong></summary>

Each Type ID is a `bytes32` value computed as the **keccak256 hash of the Type ID name string**. For example:

```
keccak256("LSP7Tokens_SenderNotification") = 0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea
```

You can verify any Type ID by hashing its name:

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { keccak256, toUtf8Bytes } from 'ethers'; // ethers v6
const typeId = keccak256(toUtf8Bytes('LSP7Tokens_SenderNotification'));
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { keccak256, toHex } from 'viem';
const typeId = keccak256(toHex('LSP7Tokens_SenderNotification'));
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
bytes32 typeId = keccak256("LSP7Tokens_SenderNotification");
```

  </TabItem>
</Tabs>

</details>

---

## LSP0 - ERC725 Account

### `LSP0ValueReceived`

|                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0ValueReceived"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **TypeID**               | `0x9c4705229491d365fb5434052e12a386d6771d976bea61070a8c694e8affea3d`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **TypeID generation**    | `keccak256("LSP0ValueReceived")`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Used in:**             | [`constructor(address)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#constructor), [`receive()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#receive), [`fallback(bytes)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#fallback), [`execute(uint256,address,uint256,bytes)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#execute), [`executeBatch(uint256[],address[],uint256[],bytes[])`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#executebatch), [`setData(bytes32,bytes)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#setdata), [`setDataBatch(bytes32[],bytes[])`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#setdatabatch) |
| **Solidity constant:**   | `_TYPEID_LSP0_VALUE_RECEIVED`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP0ValueReceived`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

No additional data is sent with this notification (empty bytes `""`).

### `LSP0OwnershipTransferStarted`

|                          |                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0OwnershipTransferStarted"`                                                                     |
| **TypeID**               | `0xe17117c9d2665d1dbeb479ed8058bbebde3c50ac50e2e65619f60006caac6926`                                 |
| **TypeID generation**    | `keccak256("LSP0OwnershipTransferStarted")`                                                          |
| **Used in:**             | [`transferOwnership(address)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#transferownership) |
| **Solidity constant:**   | `_TYPEID_LSP0_OwnershipTransferStarted`                                                              |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP0OwnershipTransferStarted`                                                         |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [currentOwner, pendingNewOwner] = abiCoder.decode(
  ['address', 'address'],
  data,
);
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [currentOwner, pendingNewOwner] = decodeAbiParameters(
  [{ type: 'address' }, { type: 'address' }],
  data,
);
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(address currentOwner, address pendingNewOwner) = abi.decode(data, (address, address));
```

  </TabItem>
</Tabs>

</details>

### `LSP0OwnershipTransferred_SenderNotification`

|                          |                                                                                                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0OwnershipTransferred_SenderNotification"`                                                                                                                                               |
| **TypeID**               | `0xa4e59c931d14f7c8a7a35027f92ee40b5f2886b9fdcdb78f30bc5ecce5a2f814`                                                                                                                          |
| **TypeID generation**    | `keccak256("LSP0OwnershipTransferred_SenderNotification")`                                                                                                                                    |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#acceptownership) <br/> [`renounceOwnership()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#renounceownership) |
| **Solidity constant:**   | `_TYPEID_LSP0_OwnershipTransferred_SenderNotification`                                                                                                                                        |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP0OwnershipTransferred_SenderNotification`                                                                                                                                   |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [previousOwner, newOwner] = abiCoder.decode(['address', 'address'], data);
// newOwner is address(0) on renounceOwnership
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [previousOwner, newOwner] = decodeAbiParameters(
  [{ type: 'address' }, { type: 'address' }],
  data,
);
// newOwner is address(0) on renounceOwnership
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(address previousOwner, address newOwner) = abi.decode(data, (address, address));
// newOwner is address(0) on renounceOwnership
```

  </TabItem>
</Tabs>

</details>

### `LSP0OwnershipTransferred_RecipientNotification`

|                          |                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0OwnershipTransferred_RecipientNotification"`                                        |
| **TypeID**               | `0xceca317f109c43507871523e82dc2a3cc64dfa18f12da0b6db14f6e23f995538`                      |
| **TypeID generation**    | `keccak256("LSP0OwnershipTransferred_RecipientNotification")`                             |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#acceptownership) |
| **Solidity constant:**   | `_TYPEID_LSP0_OwnershipTransferred_RecipientNotification`                                 |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP0OwnershipTransferred_RecipientNotification`                            |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [previousOwner, newOwner] = abiCoder.decode(['address', 'address'], data);
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [previousOwner, newOwner] = decodeAbiParameters(
  [{ type: 'address' }, { type: 'address' }],
  data,
);
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(address previousOwner, address newOwner) = abi.decode(data, (address, address));
```

  </TabItem>
</Tabs>

</details>

---

## LSP7 - Digital Asset

### `LSP7Tokens_SenderNotification`

|                          |                                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP7Tokens_SenderNotification"`                                                                                                                                                                             |
| **TypeID**               | `0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea`                                                                                                                                          |
| **TypeID generation**    | `keccak256("LSP7Tokens_SenderNotification")`                                                                                                                                                                  |
| **Used in:**             | [`_burn(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_burn), <br/> [`_transfer(address,address,uint256,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_transfer) |
| **Solidity constant:**   | `_TYPEID_LSP7_TOKENSSENDER`                                                                                                                                                                                   |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP7Tokens_SenderNotification`                                                                                                                                                                 |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [operator, from, to, amount, transferData] = abiCoder.decode(
  ['address', 'address', 'address', 'uint256', 'bytes'],
  data,
);
// `to` is address(0) when burning
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [operator, from, to, amount, transferData] = decodeAbiParameters(
  [
    { type: 'address' },
    { type: 'address' },
    { type: 'address' },
    { type: 'uint256' },
    { type: 'bytes' },
  ],
  data,
);
// `to` is address(0) when burning
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(
    address operator,
    address from,
    address to,
    uint256 amount,
    bytes memory transferData
) = abi.decode(data, (address, address, address, uint256, bytes));
// `to` is address(0) when burning
```

  </TabItem>
</Tabs>

</details>

### `LSP7Tokens_RecipientNotification`

|                          |                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**                 | `"LSP7Tokens_RecipientNotification"`                                                                                                                                                                               |
| **TypeID**               | `0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c`                                                                                                                                               |
| **TypeID generation**    | `keccak256("LSP7Tokens_RecipientNotification")`                                                                                                                                                                    |
| **Used in:**             | [`_mint(address,uint256,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_mint), <br/> [`_transfer(address,address,uint256,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_transfer) |
| **Solidity constant:**   | `_TYPEID_LSP7_TOKENSRECIPIENT`                                                                                                                                                                                     |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification`                                                                                                                                                                   |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [operator, from, to, amount, transferData] = abiCoder.decode(
  ['address', 'address', 'address', 'uint256', 'bytes'],
  data,
);
// `from` is address(0) when minting
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [operator, from, to, amount, transferData] = decodeAbiParameters(
  [
    { type: 'address' },
    { type: 'address' },
    { type: 'address' },
    { type: 'uint256' },
    { type: 'bytes' },
  ],
  data,
);
// `from` is address(0) when minting
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(
    address operator,
    address from,
    address to,
    uint256 amount,
    bytes memory transferData
) = abi.decode(data, (address, address, address, uint256, bytes));
// `from` is address(0) when minting
```

  </TabItem>
</Tabs>

</details>

### `LSP7Tokens_OperatorNotification`

|                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP7Tokens_OperatorNotification"`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **TypeID**               | `0x386072cc5a58e61263b434c722725f21031cd06e7c552cfaa06db5de8a320dbc`                                                                                                                                                                                                                                                                                                                                                                                          |
| **TypeID generation**    | `keccak256("LSP7Tokens_OperatorNotification")`                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Used in:**             | [`authorizeOperator(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#authorizeoperator), [`revokeOperator(address,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#revokeoperator), [`increaseAllowance(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#increaseallowance), [`decreaseAllowance(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#decreaseallowance) |
| **Solidity constant:**   | `_TYPEID_LSP7_TOKENOPERATOR`                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP7Tokens_OperatorNotification`                                                                                                                                                                                                                                                                                                                                                                                                               |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [tokenOwner, allowance, operatorNotificationData] = abiCoder.decode(
  ['address', 'uint256', 'bytes'],
  data,
);
// allowance is 0 on revokeOperator
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [tokenOwner, allowance, operatorNotificationData] = decodeAbiParameters(
  [{ type: 'address' }, { type: 'uint256' }, { type: 'bytes' }],
  data,
);
// allowance is 0 on revokeOperator
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(
    address tokenOwner,
    uint256 allowance,
    bytes memory operatorNotificationData
) = abi.decode(data, (address, uint256, bytes));
// allowance is 0 on revokeOperator
```

  </TabItem>
</Tabs>

</details>

---

## LSP8 - Identifiable Digital Asset

### `LSP8Tokens_SenderNotification`

|                          |                                                                                                                                                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP8Tokens_SenderNotification"`                                                                                                                                                                                                                     |
| **TypeID**               | `0xb23eae7e6d1564b295b4c3e3be402d9a2f0776c57bdf365903496f6fa481ab00`                                                                                                                                                                                  |
| **TypeID generation**    | `keccak256("LSP8Tokens_SenderNotification")`                                                                                                                                                                                                          |
| **Used in:**             | [`_burn(bytes32,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_burn), <br/> [`_transfer(address,address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_transfer) |
| **Solidity constant:**   | `_TYPEID_LSP8_TOKENSSENDER`                                                                                                                                                                                                                           |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP8Tokens_SenderNotification`                                                                                                                                                                                                         |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [operator, from, to, tokenId, transferData] = abiCoder.decode(
  ['address', 'address', 'address', 'bytes32', 'bytes'],
  data,
);
// `to` is address(0) when burning
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [operator, from, to, tokenId, transferData] = decodeAbiParameters(
  [
    { type: 'address' },
    { type: 'address' },
    { type: 'address' },
    { type: 'bytes32' },
    { type: 'bytes' },
  ],
  data,
);
// `to` is address(0) when burning
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(
    address operator,
    address from,
    address to,
    bytes32 tokenId,
    bytes memory transferData
) = abi.decode(data, (address, address, address, bytes32, bytes));
// `to` is address(0) when burning
```

  </TabItem>
</Tabs>

</details>

### `LSP8Tokens_RecipientNotification`

|                          |                                                                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**                 | `"LSP8Tokens_RecipientNotification"`                                                                                                                                                                                                                               |
| **TypeID**               | `0x0b084a55ebf70fd3c06fd755269dac2212c4d3f0f4d09079780bfa50c1b2984d`                                                                                                                                                                                               |
| **TypeID generation**    | `keccak256("LSP8Tokens_RecipientNotification")`                                                                                                                                                                                                                    |
| **Used in:**             | [`_mint(address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_mint), <br/> [`_transfer(address,address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_transfer) |
| **Solidity constant:**   | `_TYPEID_LSP8_TOKENSRECIPIENT`                                                                                                                                                                                                                                     |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP8Tokens_RecipientNotification`                                                                                                                                                                                                                   |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [operator, from, to, tokenId, transferData] = abiCoder.decode(
  ['address', 'address', 'address', 'bytes32', 'bytes'],
  data,
);
// `from` is address(0) when minting
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [operator, from, to, tokenId, transferData] = decodeAbiParameters(
  [
    { type: 'address' },
    { type: 'address' },
    { type: 'address' },
    { type: 'bytes32' },
    { type: 'bytes' },
  ],
  data,
);
// `from` is address(0) when minting
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(
    address operator,
    address from,
    address to,
    bytes32 tokenId,
    bytes memory transferData
) = abi.decode(data, (address, address, address, bytes32, bytes));
// `from` is address(0) when minting
```

  </TabItem>
</Tabs>

</details>

### `LSP8Tokens_OperatorNotification`

|                          |                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP8Tokens_OperatorNotification"`                                                                                                                                                                                                                                               |
| **TypeID**               | `0x8a1c15a8799f71b547e08e2bcb2e85257e81b0a07eee2ce6712549eef1f00970`                                                                                                                                                                                                              |
| **TypeID generation**    | `keccak256("LSP8Tokens_OperatorNotification")`                                                                                                                                                                                                                                    |
| **Used in:**             | [`authorizeOperator(address,bytes32,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#authorizeoperator), [`revokeOperator(address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#revokeoperator) |
| **Solidity constant:**   | `_TYPEID_LSP8_TOKENOPERATOR`                                                                                                                                                                                                                                                      |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP8Tokens_OperatorNotification`                                                                                                                                                                                                                                   |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [tokenOwner, tokenId, authorized, operatorNotificationData] =
  abiCoder.decode(['address', 'bytes32', 'bool', 'bytes'], data);
// authorized = true on authorizeOperator, false on revokeOperator
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [tokenOwner, tokenId, authorized, operatorNotificationData] =
  decodeAbiParameters(
    [
      { type: 'address' },
      { type: 'bytes32' },
      { type: 'bool' },
      { type: 'bytes' },
    ],
    data,
  );
// authorized = true on authorizeOperator, false on revokeOperator
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(
    address tokenOwner,
    bytes32 tokenId,
    bool authorized,
    bytes memory operatorNotificationData
) = abi.decode(data, (address, bytes32, bool, bytes));
// authorized = true on authorizeOperator, false on revokeOperator
```

  </TabItem>
</Tabs>

</details>

---

## LSP9 - Vault

### `LSP9ValueReceived`

|                          |                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP9ValueReceived"`                                                                                                                                                                                                                                                                                                                                                                                   |
| **TypeID**               | `0x468cd1581d7bc001c3b685513d2b929b55437be34700410383d58f3aa1ea0abc`                                                                                                                                                                                                                                                                                                                                    |
| **TypeID generation**    | `keccak256("LSP9ValueReceived")`                                                                                                                                                                                                                                                                                                                                                                        |
| **Used in:**             | [`constructor(address)`](./contracts/LSP9Vault/LSP9Vault.md#constructor), [`receive()`](./contracts/LSP9Vault/LSP9Vault.md#receive), [`fallback(bytes)`](./contracts/LSP9Vault/LSP9Vault.md#fallback), [`execute(uint256,address,uint256,bytes)`](./contracts/LSP9Vault/LSP9Vault.md#execute), [`executeBatch(uint256[],address[],uint256[],bytes[])`](./contracts/LSP9Vault/LSP9Vault.md#executebatch) |
| **Solidity constant:**   | `_TYPEID_LSP9_VALUE_RECEIVED`                                                                                                                                                                                                                                                                                                                                                                           |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP9ValueReceived`                                                                                                                                                                                                                                                                                                                                                                       |

No additional data is sent with this notification (empty bytes `""`).

### `LSP9OwnershipTransferStarted`

|                          |                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------ |
| **Name**                 | `"LSP9OwnershipTransferStarted"`                                                     |
| **TypeID**               | `0xaefd43f45fed1bcd8992f23c803b6f4ec45cf6b62b0d404d565f290a471e763f`                 |
| **TypeID generation**    | `keccak256("LSP9OwnershipTransferStarted")`                                          |
| **Used in:**             | [`transferOwnership(address)`](./contracts/LSP9Vault/LSP9Vault.md#transferownership) |
| **Solidity constant:**   | `_TYPEID_LSP9_OwnershipTransferStarted`                                              |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP9OwnershipTransferStarted`                                         |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [currentOwner, pendingNewOwner] = abiCoder.decode(
  ['address', 'address'],
  data,
);
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [currentOwner, pendingNewOwner] = decodeAbiParameters(
  [{ type: 'address' }, { type: 'address' }],
  data,
);
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(address currentOwner, address pendingNewOwner) = abi.decode(data, (address, address));
```

  </TabItem>
</Tabs>

</details>

### `LSP9OwnershipTransferred_SenderNotification`

|                          |                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP9OwnershipTransferred_SenderNotification"`                                                                                                               |
| **TypeID**               | `0x0c622e58e6b7089ae35f1af1c86d997be92fcdd8c9509652022d41aa65169471`                                                                                          |
| **TypeID generation**    | `keccak256("LSP9OwnershipTransferred_SenderNotification")`                                                                                                    |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP9Vault/LSP9Vault.md#acceptownership) <br/> [`renounceOwnership()`](./contracts/LSP9Vault/LSP9Vault.md#renounceownership) |
| **Solidity constant:**   | `_TYPEID_LSP9_OwnershipTransferred_SenderNotification`                                                                                                        |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP9OwnershipTransferred_SenderNotification`                                                                                                   |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [previousOwner, newOwner] = abiCoder.decode(['address', 'address'], data);
// newOwner is address(0) on renounceOwnership
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [previousOwner, newOwner] = decodeAbiParameters(
  [{ type: 'address' }, { type: 'address' }],
  data,
);
// newOwner is address(0) on renounceOwnership
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(address previousOwner, address newOwner) = abi.decode(data, (address, address));
// newOwner is address(0) on renounceOwnership
```

  </TabItem>
</Tabs>

</details>

### `LSP9OwnershipTransferred_RecipientNotification`

|                          |                                                                           |
| ------------------------ | ------------------------------------------------------------------------- |
| **Name**                 | `"LSP9OwnershipTransferred_RecipientNotification"`                        |
| **TypeID**               | `0x79855c97dbc259ce395421d933d7bc0699b0f1561f988f09a9e8633fd542fe5c`      |
| **TypeID generation**    | `keccak256("LSP9OwnershipTransferred_RecipientNotification")`             |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP9Vault/LSP9Vault.md#acceptownership) |
| **Solidity constant:**   | `_TYPEID_LSP9_OwnershipTransferred_RecipientNotification`                 |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP9OwnershipTransferred_RecipientNotification`            |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [previousOwner, newOwner] = abiCoder.decode(['address', 'address'], data);
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [previousOwner, newOwner] = decodeAbiParameters(
  [{ type: 'address' }, { type: 'address' }],
  data,
);
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(address previousOwner, address newOwner) = abi.decode(data, (address, address));
```

  </TabItem>
</Tabs>

</details>

---

## LSP14 - Ownable 2-Step

### `LSP14OwnershipTransferStarted`

|                          |                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP14OwnershipTransferStarted"`                                                                    |
| **TypeID**               | `0xee9a7c0924f740a2ca33d59b7f0c2929821ea9837ce043ce91c1823e9c4e52c0`                                 |
| **TypeID generation**    | `keccak256("LSP14OwnershipTransferStarted")`                                                         |
| **Used in:**             | [`transferOwnership(address)`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#transferownership) |
| **Solidity constant:**   | `_TYPEID_LSP14_OwnershipTransferStarted`                                                             |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP14OwnershipTransferStarted`                                                        |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [currentOwner, pendingNewOwner] = abiCoder.decode(
  ['address', 'address'],
  data,
);
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [currentOwner, pendingNewOwner] = decodeAbiParameters(
  [{ type: 'address' }, { type: 'address' }],
  data,
);
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(address currentOwner, address pendingNewOwner) = abi.decode(data, (address, address));
```

  </TabItem>
</Tabs>

</details>

#### `LSP14OwnershipTransferred_SenderNotification`

|                          |                                                                                                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP14OwnershipTransferred_SenderNotification"`                                                                                                                                              |
| **TypeID**               | `0xa124442e1cc7b52d8e2ede2787d43527dc1f3ae0de87f50dd03e27a71834f74c`                                                                                                                          |
| **TypeID generation**    | `keccak256("LSP14OwnershipTransferred_SenderNotification")`                                                                                                                                   |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#acceptownership) <br/> [`renounceOwnership()`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#renounceownership) |
| **Solidity constant:**   | `_TYPEID_LSP14_OwnershipTransferred_SenderNotification`                                                                                                                                       |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP14OwnershipTransferred_SenderNotification`                                                                                                                                  |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [previousOwner, newOwner] = abiCoder.decode(['address', 'address'], data);
// newOwner is address(0) on renounceOwnership
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [previousOwner, newOwner] = decodeAbiParameters(
  [{ type: 'address' }, { type: 'address' }],
  data,
);
// newOwner is address(0) on renounceOwnership
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(address previousOwner, address newOwner) = abi.decode(data, (address, address));
// newOwner is address(0) on renounceOwnership
```

  </TabItem>
</Tabs>

</details>

#### `LSP14OwnershipTransferred_RecipientNotification`

|                          |                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP14OwnershipTransferred_RecipientNotification"`                                       |
| **TypeID**               | `0xe32c7debcb817925ba4883fdbfc52797187f28f73f860641dab1a68d9b32902c`                      |
| **TypeID generation**    | `keccak256("LSP14OwnershipTransferred_RecipientNotification")`                            |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#acceptownership) |
| **Solidity constant:**   | `_TYPEID_LSP14_OwnershipTransferred_RecipientNotification`                                |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP14OwnershipTransferred_RecipientNotification`                           |

<details>
<summary>How to decode notification data?</summary>

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { AbiCoder } from 'ethers';

const abiCoder = new AbiCoder();
const [previousOwner, newOwner] = abiCoder.decode(['address', 'address'], data);
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { decodeAbiParameters } from 'viem';

const [previousOwner, newOwner] = decodeAbiParameters(
  [{ type: 'address' }, { type: 'address' }],
  data,
);
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
(address previousOwner, address newOwner) = abi.decode(data, (address, address));
```

  </TabItem>
</Tabs>

</details>

---

## LSP26 - Follower System

### `LSP26FollowerSystem_FollowNotification`

|                          |                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP26FollowerSystem_FollowNotification"`                                                                                        |
| **TypeID**               | `0x71e02f9f05bcd5816ec4f3134aa2e5a916669537ec6c77fe66ea595fabc2d51a`                                                              |
| **TypeID generation**    | `keccak256("LSP26FollowerSystem_FollowNotification")`                                                                             |
| **Used in:**             | [`follow(address)`](../standards/accounts/lsp26-follower-system.md) — notifies the followed address that they have a new follower |
| **Solidity constant:**   | `_TYPEID_LSP26_FOLLOW`                                                                                                            |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP26FollowerSystem_FollowNotification`                                                                            |

<details>
<summary>How to decode notification data?</summary>

> **Note:** LSP26 uses `abi.encodePacked` (not `abi.encode`), so the data is 20 bytes (the raw address) rather than 32 bytes (ABI-padded).

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { dataSlice, getAddress } from 'ethers';

// data is 20 bytes (not ABI-padded)
const follower = getAddress(dataSlice(data, 0, 20));
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { getAddress, slice } from 'viem';

// data is 20 bytes (not ABI-padded)
const follower = getAddress(slice(data, 0, 20));
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
address follower = address(bytes20(data));
```

  </TabItem>
</Tabs>

</details>

### `LSP26FollowerSystem_UnfollowNotification`

|                          |                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP26FollowerSystem_UnfollowNotification"`                                                                                      |
| **TypeID**               | `0x9d3c0b4012b69658977b099bdaa51eff0f0460f421fba96d15669506c00d1c4f`                                                              |
| **TypeID generation**    | `keccak256("LSP26FollowerSystem_UnfollowNotification")`                                                                           |
| **Used in:**             | [`unfollow(address)`](../standards/accounts/lsp26-follower-system.md) — notifies the unfollowed address that they lost a follower |
| **Solidity constant:**   | `_TYPEID_LSP26_UNFOLLOW`                                                                                                          |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP26FollowerSystem_UnfollowNotification`                                                                          |

<details>
<summary>How to decode notification data?</summary>

> **Note:** LSP26 uses `abi.encodePacked` (not `abi.encode`), so the data is 20 bytes (the raw address) rather than 32 bytes (ABI-padded).

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```js
import { dataSlice, getAddress } from 'ethers';

// data is 20 bytes (not ABI-padded)
const unfollower = getAddress(dataSlice(data, 0, 20));
```

  </TabItem>
  <TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```js
import { getAddress, slice } from 'viem';

// data is 20 bytes (not ABI-padded)
const unfollower = getAddress(slice(data, 0, 20));
```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

```solidity
address unfollower = address(bytes20(data));
```

  </TabItem>
</Tabs>

</details>

---

## See also

- [Build a Universal Receiver Delegate](../standards/accounts/lsp1-universal-receiver-delegate.md)
- [LSP1 Universal Receiver standard](../standards/accounts/lsp1-universal-receiver.md)
- [lsp-smart-contracts constants reference](https://github.com/lukso-network/lsp-smart-contracts)
