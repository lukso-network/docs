---
title: LSP1 Notification Type IDs
sidebar_label: LSP1 Notification Type IDs
---

# LSP1 Notification Type IDs

The **LSP1 Type IDs** listed below are unique identifiers used across the LSP standards for the [Universal Receiver](../standards/accounts/lsp1-universal-receiver.md) notification mechanism.

These Type IDs are sent as the `typeId` parameter when calling the `universalReceiver(bytes32 typeId, bytes data)` function on contracts implementing [LSP1](../standards/accounts/lsp1-universal-receiver.md). They allow contracts to identify what type of notification they are receiving and react accordingly.

For instance:

- Notify a sender that LSP7 tokens are being transferred from their balance
- Notify a recipient about receiving LSP7 tokens
- Notify a profile that they have a new follower

### How Type IDs are generated

Each Type ID is a `bytes32` value computed as the **keccak256 hash of the Type ID name string**. For example:

```
keccak256("LSP7Tokens_SenderNotification") = 0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea
```

You can verify any Type ID by hashing its name:

```solidity
bytes32 typeId = keccak256("LSP7Tokens_SenderNotification");
```

```js
import { keccak256, toUtf8Bytes } from 'ethers';

const typeId = keccak256(toUtf8Bytes('LSP7Tokens_SenderNotification'));
```

## Using Type IDs in JavaScript

The Type IDs are available as constants from the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) npm package:

```bash
npm install @lukso/lsp-smart-contracts
```

```js
import { LSP1_TYPE_IDS } from '@lukso/lsp-smart-contracts';

// Type ID for receiving native tokens (LYX)
LSP1_TYPE_IDS.LSP0ValueReceived;

// Type ID for receiving LSP7 tokens
LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification;

// Type ID for follow notifications
LSP1_TYPE_IDS.LSP26FollowerSystem_FollowNotification;
```

> **Note:** The JavaScript constants are exported from the `@lukso/lsp-smart-contracts` package. The corresponding Solidity constants are defined in each LSP's contract constants file (e.g., `LSP7Constants.sol`, `LSP26Constants.sol`).
>
> See the [lsp-smart-contracts repository](https://github.com/lukso-network/lsp-smart-contracts) for the full source code.

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

**Data encoding:** Empty bytes (`""`) — no additional data is sent with this notification.

### `LSP0OwnershipTransferStarted`

|                          |                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0OwnershipTransferStarted"`                                                                     |
| **TypeID**               | `0xe17117c9d2665d1dbeb479ed8058bbebde3c50ac50e2e65619f60006caac6926`                                 |
| **TypeID generation**    | `keccak256("LSP0OwnershipTransferStarted")`                                                          |
| **Used in:**             | [`transferOwnership(address)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#transferownership) |
| **Solidity constant:**   | `_TYPEID_LSP0_OwnershipTransferStarted`                                                              |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP0OwnershipTransferStarted`                                                         |

**Data encoding:**

```solidity
abi.encode(address currentOwner, address pendingNewOwner)
```

### `LSP0OwnershipTransferred_SenderNotification`

|                          |                                                                                                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0OwnershipTransferred_SenderNotification"`                                                                                                                                               |
| **TypeID**               | `0xa4e59c931d14f7c8a7a35027f92ee40b5f2886b9fdcdb78f30bc5ecce5a2f814`                                                                                                                          |
| **TypeID generation**    | `keccak256("LSP0OwnershipTransferred_SenderNotification")`                                                                                                                                    |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#acceptownership) <br/> [`renounceOwnership()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#renounceownership) |
| **Solidity constant:**   | `_TYPEID_LSP0_OwnershipTransferred_SenderNotification`                                                                                                                                        |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP0OwnershipTransferred_SenderNotification`                                                                                                                                   |

**Data encoding:**

```solidity
// On acceptOwnership():
abi.encode(address previousOwner, address newOwner)

// On renounceOwnership():
abi.encode(address previousOwner, address(0))
```

### `LSP0OwnershipTransferred_RecipientNotification`

|                          |                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0OwnershipTransferred_RecipientNotification"`                                        |
| **TypeID**               | `0xceca317f109c43507871523e82dc2a3cc64dfa18f12da0b6db14f6e23f995538`                      |
| **TypeID generation**    | `keccak256("LSP0OwnershipTransferred_RecipientNotification")`                             |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#acceptownership) |
| **Solidity constant:**   | `_TYPEID_LSP0_OwnershipTransferred_RecipientNotification`                                 |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP0OwnershipTransferred_RecipientNotification`                            |

**Data encoding:**

```solidity
abi.encode(address previousOwner, address newOwner)
```

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

**Data encoding:**

```solidity
abi.encode(address operator, address from, address to, uint256 amount, bytes data)
// `to` is address(0) when burning
```

### `LSP7Tokens_RecipientNotification`

|                          |                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**                 | `"LSP7Tokens_RecipientNotification"`                                                                                                                                                                               |
| **TypeID**               | `0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c`                                                                                                                                               |
| **TypeID generation**    | `keccak256("LSP7Tokens_RecipientNotification")`                                                                                                                                                                    |
| **Used in:**             | [`_mint(address,uint256,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_mint), <br/> [`_transfer(address,address,uint256,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_transfer) |
| **Solidity constant:**   | `_TYPEID_LSP7_TOKENSRECIPIENT`                                                                                                                                                                                     |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification`                                                                                                                                                                   |

**Data encoding:**

```solidity
abi.encode(address operator, address from, address to, uint256 amount, bytes data)
// `from` is address(0) when minting
```

### `LSP7Tokens_OperatorNotification`

|                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP7Tokens_OperatorNotification"`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **TypeID**               | `0x386072cc5a58e61263b434c722725f21031cd06e7c552cfaa06db5de8a320dbc`                                                                                                                                                                                                                                                                                                                                                                                          |
| **TypeID generation**    | `keccak256("LSP7Tokens_OperatorNotification")`                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Used in:**             | [`authorizeOperator(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#authorizeoperator), [`revokeOperator(address,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#revokeoperator), [`increaseAllowance(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#increaseallowance), [`decreaseAllowance(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#decreaseallowance) |
| **Solidity constant:**   | `_TYPEID_LSP7_TOKENOPERATOR`                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP7Tokens_OperatorNotification`                                                                                                                                                                                                                                                                                                                                                                                                               |

**Data encoding:**

```solidity
// On authorizeOperator / increaseAllowance / decreaseAllowance:
abi.encode(address tokenOwner, uint256 allowance, bytes operatorNotificationData)

// On revokeOperator:
abi.encode(address tokenOwner, uint256 0, bytes operatorNotificationData)
```

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

**Data encoding:**

```solidity
abi.encode(address operator, address from, address to, bytes32 tokenId, bytes data)
// `to` is address(0) when burning
```

### `LSP8Tokens_RecipientNotification`

|                          |                                                                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**                 | `"LSP8Tokens_RecipientNotification"`                                                                                                                                                                                                                               |
| **TypeID**               | `0x0b084a55ebf70fd3c06fd755269dac2212c4d3f0f4d09079780bfa50c1b2984d`                                                                                                                                                                                               |
| **TypeID generation**    | `keccak256("LSP8Tokens_RecipientNotification")`                                                                                                                                                                                                                    |
| **Used in:**             | [`_mint(address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_mint), <br/> [`_transfer(address,address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_transfer) |
| **Solidity constant:**   | `_TYPEID_LSP8_TOKENSRECIPIENT`                                                                                                                                                                                                                                     |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP8Tokens_RecipientNotification`                                                                                                                                                                                                                   |

**Data encoding:**

```solidity
abi.encode(address operator, address from, address to, bytes32 tokenId, bytes data)
// `from` is address(0) when minting
```

### `LSP8Tokens_OperatorNotification`

|                          |                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP8Tokens_OperatorNotification"`                                                                                                                                                                                                                                               |
| **TypeID**               | `0x468cd1581d7bc001c3b685513d2b929b55437be34700410383d58f3aa1ea0abc`                                                                                                                                                                                                              |
| **TypeID generation**    | `keccak256("LSP8Tokens_OperatorNotification")`                                                                                                                                                                                                                                    |
| **Used in:**             | [`authorizeOperator(address,bytes32,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#authorizeoperator), [`revokeOperator(address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#revokeoperator) |
| **Solidity constant:**   | `_TYPEID_LSP8_TOKENOPERATOR`                                                                                                                                                                                                                                                      |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP8Tokens_OperatorNotification`                                                                                                                                                                                                                                   |

**Data encoding:**

```solidity
// On authorizeOperator:
abi.encode(address tokenOwner, bytes32 tokenId, bool true, bytes operatorNotificationData)

// On revokeOperator:
abi.encode(address tokenOwner, bytes32 tokenId, bool false, bytes operatorNotificationData)
```

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

**Data encoding:** Empty bytes (`""`) — no additional data is sent with this notification.

### `LSP9OwnershipTransferStarted`

|                          |                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------ |
| **Name**                 | `"LSP9OwnershipTransferStarted"`                                                     |
| **TypeID**               | `0xaefd43f45fed1bcd8992f23c803b6f4ec45cf6b62b0d404d565f290a471e763f`                 |
| **TypeID generation**    | `keccak256("LSP9OwnershipTransferStarted")`                                          |
| **Used in:**             | [`transferOwnership(address)`](./contracts/LSP9Vault/LSP9Vault.md#transferownership) |
| **Solidity constant:**   | `_TYPEID_LSP9_OwnershipTransferStarted`                                              |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP9OwnershipTransferStarted`                                         |

**Data encoding:**

```solidity
abi.encode(address currentOwner, address pendingNewOwner)
```

### `LSP9OwnershipTransferred_SenderNotification`

|                          |                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP9OwnershipTransferred_SenderNotification"`                                                                                                               |
| **TypeID**               | `0x0c622e58e6b7089ae35f1af1c86d997be92fcdd8c9509652022d41aa65169471`                                                                                          |
| **TypeID generation**    | `keccak256("LSP9OwnershipTransferred_SenderNotification")`                                                                                                    |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP9Vault/LSP9Vault.md#acceptownership) <br/> [`renounceOwnership()`](./contracts/LSP9Vault/LSP9Vault.md#renounceownership) |
| **Solidity constant:**   | `_TYPEID_LSP9_OwnershipTransferred_SenderNotification`                                                                                                        |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP9OwnershipTransferred_SenderNotification`                                                                                                   |

**Data encoding:**

```solidity
// On acceptOwnership():
abi.encode(address previousOwner, address newOwner)

// On renounceOwnership():
abi.encode(address previousOwner, address(0))
```

### `LSP9OwnershipTransferred_RecipientNotification`

|                          |                                                                           |
| ------------------------ | ------------------------------------------------------------------------- |
| **Name**                 | `"LSP9OwnershipTransferred_RecipientNotification"`                        |
| **TypeID**               | `0x79855c97dbc259ce395421d933d7bc0699b0f1561f988f09a9e8633fd542fe5c`      |
| **TypeID generation**    | `keccak256("LSP9OwnershipTransferred_RecipientNotification")`             |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP9Vault/LSP9Vault.md#acceptownership) |
| **Solidity constant:**   | `_TYPEID_LSP9_OwnershipTransferred_RecipientNotification`                 |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP9OwnershipTransferred_RecipientNotification`            |

**Data encoding:**

```solidity
abi.encode(address previousOwner, address newOwner)
```

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

**Data encoding:**

```solidity
abi.encode(address currentOwner, address pendingNewOwner)
```

#### `LSP14OwnershipTransferred_SenderNotification`

|                          |                                                                                                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP14OwnershipTransferred_SenderNotification"`                                                                                                                                              |
| **TypeID**               | `0xa124442e1cc7b52d8e2ede2787d43527dc1f3ae0de87f50dd03e27a71834f74c`                                                                                                                          |
| **TypeID generation**    | `keccak256("LSP14OwnershipTransferred_SenderNotification")`                                                                                                                                   |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#acceptownership) <br/> [`renounceOwnership()`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#renounceownership) |
| **Solidity constant:**   | `_TYPEID_LSP14_OwnershipTransferred_SenderNotification`                                                                                                                                       |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP14OwnershipTransferred_SenderNotification`                                                                                                                                  |

**Data encoding:**

```solidity
// On acceptOwnership():
abi.encode(address previousOwner, address newOwner)

// On renounceOwnership():
abi.encode(address previousOwner, address(0))
```

#### `LSP14OwnershipTransferred_RecipientNotification`

|                          |                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP14OwnershipTransferred_RecipientNotification"`                                       |
| **TypeID**               | `0xe32c7debcb817925ba4883fdbfc52797187f28f73f860641dab1a68d9b32902c`                      |
| **TypeID generation**    | `keccak256("LSP14OwnershipTransferred_RecipientNotification")`                            |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#acceptownership) |
| **Solidity constant:**   | `_TYPEID_LSP14_OwnershipTransferred_RecipientNotification`                                |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP14OwnershipTransferred_RecipientNotification`                           |

**Data encoding:**

```solidity
abi.encode(address previousOwner, address newOwner)
```

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

**Data encoding:**

```solidity
abi.encodePacked(address follower)
```

> **Note:** LSP26 uses `abi.encodePacked` (not `abi.encode`), so the data is 20 bytes (the raw address) rather than 32 bytes (ABI-padded).

### `LSP26FollowerSystem_UnfollowNotification`

|                          |                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP26FollowerSystem_UnfollowNotification"`                                                                                      |
| **TypeID**               | `0x9d3c0b4012b69658977b099bdaa51eff0f0460f421fba96d15669506c00d1c4f`                                                              |
| **TypeID generation**    | `keccak256("LSP26FollowerSystem_UnfollowNotification")`                                                                           |
| **Used in:**             | [`unfollow(address)`](../standards/accounts/lsp26-follower-system.md) — notifies the unfollowed address that they lost a follower |
| **Solidity constant:**   | `_TYPEID_LSP26_UNFOLLOW`                                                                                                          |
| **JavaScript constant:** | `LSP1_TYPE_IDS.LSP26FollowerSystem_UnfollowNotification`                                                                          |

**Data encoding:**

```solidity
abi.encodePacked(address unfollower)
```

> **Note:** LSP26 uses `abi.encodePacked` (not `abi.encode`), so the data is 20 bytes (the raw address) rather than 32 bytes (ABI-padded).
