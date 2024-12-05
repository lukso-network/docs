---
title: Universal Receiver Type IDs
---

# Universal Receiver Type IDs

The **LSP1 type Ids** listed below correspond to unique identifiers used across the LSP standards.

They are used by various smart contracts to notify sender and recipients contracts implementing LSP1 about various incoming or outgoing information.
For instance, notify a sender that some LSP7 tokens are being transferred from its balance, or a recipient about receiving some LSP7 tokens.

The type Ids listed below can be exported and accessed from the `@lukso/lsp-smart-contracts` package as follow:

```js
import { LSP1_TYPE_IDS } from "@lukso/lsp-smart-contracts";

// access the typeId related to being notified when receiving LYX (= native tokens)
LSP1_TYPE_IDS.

// access the typeId related to being notified when receiving LSP7 tokens
LSP1_TYPE_IDS.


```

## LSP0 - ERC725 Account

### `LSP0ValueReceived`

|                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0ValueReceived"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Hash**                 | `0x9c4705229491d365fb5434052e12a386d6771d976bea61070a8c694e8affea3d`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Used in:**             | [`constructor(address)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#constructor), [`receive()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#receive), [`fallback(bytes)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#fallback), [`execute(uint256,address,uint256,bytes)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#execute), [`executeBatch(uint256[],address[],uint256[],bytes[])`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#executebatch), [`setData(bytes32,bytes)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#setdata), [`setDataBatch(bytes32[],bytes[])`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#setdatabatch) |
| **Solidity constant:**   | `_TYPEID_LSP0_VALUE_RECEIVED`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP0ValueReceived`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### `LSP0OwnershipTransferStarted`

|                          |                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0OwnershipTransferStarted"`                                                                     |
| **Hash**                 | `0xe17117c9d2665d1dbeb479ed8058bbebde3c50ac50e2e65619f60006caac6926`                                 |
| **Used in:**             | [`transferOwnership(address)`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#transferownership) |
| **Solidity constant:**   | `_TYPEID_LSP0_OwnershipTransferStarted`                                                              |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP0OwnershipTransferStarted`                                                         |

### `LSP0OwnershipTransferred_SenderNotification`

|                          |                                                                                                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0OwnershipTransferred_SenderNotification"`                                                                                                                                               |
| **Hash**                 | `0xa4e59c931d14f7c8a7a35027f92ee40b5f2886b9fdcdb78f30bc5ecce5a2f814`                                                                                                                          |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#acceptownership) <br/> [`renounceOwnership()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#renounceownership) |
| **Solidity constant:**   | `_TYPEID_LSP0_OwnershipTransferred_SenderNotification`                                                                                                                                        |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP0OwnershipTransferred_SenderNotification`                                                                                                                                   |

### `LSP0OwnershipTransferred_RecipientNotification`

|                          |                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP0OwnershipTransferred_RecipientNotification"`                                        |
| **Hash**                 | `0xceca317f109c43507871523e82dc2a3cc64dfa18f12da0b6db14f6e23f995538`                      |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP0ERC725Account/LSP0ERC725Account.md#acceptownership) |
| **Solidity constant:**   | `_TYPEID_LSP0_OwnershipTransferred_RecipientNotification`                                 |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP0OwnershipTransferred_RecipientNotification`                            |

## LSP7 - Digital Asset

### `LSP7Tokens_SenderNotification`

|                          |                                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP7Tokens_SenderNotification"`                                                                                                                                                                             |
| **Hash**                 | `0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea`                                                                                                                                          |
| **Used in:**             | [`_burn(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_burn), <br/> [`_transfer(address,address,uint256,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_transfer) |
| **Solidity constant:**   | `_TYPEID_LSP7_TOKENSSENDER`                                                                                                                                                                                   |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP7Tokens_SenderNotification`                                                                                                                                                                 |

### `LSP7Tokens_RecipientNotification`

|                          |                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**                 | `"LSP7Tokens_RecipientNotification"`                                                                                                                                                                               |
| **Hash**                 | `0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c`                                                                                                                                               |
| **Used in:**             | [`_mint(address,uint256,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_mint), <br/> [`_transfer(address,address,uint256,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#_transfer) |
| **Solidity constant:**   | `_TYPEID_LSP7_TOKENSRECIPIENT`                                                                                                                                                                                     |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification`                                                                                                                                                                   |

### `LSP7Tokens_OperatorNotification`

|                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP7Tokens_OperatorNotification"`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Hash**                 | `0x386072cc5a58e61263b434c722725f21031cd06e7c552cfaa06db5de8a320dbc`                                                                                                                                                                                                                                                                                                                                                                                          |
| **Used in:**             | [`authorizeOperator(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#authorizeoperator), [`revokeOperator(address,bool,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#revokeoperator), [`increaseAllowance(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#increaseallowance), [`decreaseAllowance(address,uint256,bytes)`](./contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#decreaseallowance) |
| **Solidity constant:**   | `_TYPEID_LSP7_TOKENOPERATOR`                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP7Tokens_OperatorNotification`                                                                                                                                                                                                                                                                                                                                                                                                               |

## LSP8 - Identifiable Digital Asset

### `LSP8Tokens_SenderNotification`

|                          |                                                                                                                                                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP8Tokens_SenderNotification"`                                                                                                                                                                                                                     |
| **Hash**                 | `0xb23eae7e6d1564b295b4c3e3be402d9a2f0776c57bdf365903496f6fa481ab00`                                                                                                                                                                                  |
| **Used in:**             | [`_burn(bytes32,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_burn), <br/> [`_transfer(address,address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_transfer) |
| **Solidity constant:**   | `_TYPEID_LSP8_TOKENSSENDER`                                                                                                                                                                                                                           |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP8Tokens_SenderNotification`                                                                                                                                                                                                         |

### `LSP8Tokens_RecipientNotification`

|                          |                                                                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**                 | `"LSP8Tokens_RecipientNotification"`                                                                                                                                                                                                                               |
| **Hash**                 | `0x0b084a55ebf70fd3c06fd755269dac2212c4d3f0f4d09079780bfa50c1b2984d`                                                                                                                                                                                               |
| **Used in:**             | [`_mint(address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_mint), <br/> [`_transfer(address,address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#_transfer) |
| **Solidity constant:**   | `_TYPEID_LSP8_TOKENSRECIPIENT`                                                                                                                                                                                                                                     |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP8Tokens_RecipientNotification`                                                                                                                                                                                                                   |

### `LSP8Tokens_OperatorNotification`

|                          |                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP8Tokens_OperatorNotification"`                                                                                                                                                                                                                                               |
| **Hash**                 | `0x468cd1581d7bc001c3b685513d2b929b55437be34700410383d58f3aa1ea0abc`                                                                                                                                                                                                              |
| **Used in:**             | [`authorizeOperator(address,bytes32,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#authorizeoperator), [`revokeOperator(address,bytes32,bool,bytes)`](./contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#revokeoperator) |
| **Solidity constant:**   | `_TYPEID_LSP8_TOKENOPERATOR`                                                                                                                                                                                                                                                      |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP8Tokens_OperatorNotification`                                                                                                                                                                                                                                   |

## LSP9 - Vault

### `LSP9ValueReceived`

|                          |                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP9ValueReceived"`                                                                                                                                                                                                                                                                                                                                                                                   |
| **Hash**                 | `0x468cd1581d7bc001c3b685513d2b929b55437be34700410383d58f3aa1ea0abc`                                                                                                                                                                                                                                                                                                                                    |
| **Used in:**             | [`constructor(address)`](./contracts/LSP9Vault/LSP9Vault.md#constructor), [`receive()`](./contracts/LSP9Vault/LSP9Vault.md#receive), [`fallback(bytes)`](./contracts/LSP9Vault/LSP9Vault.md#fallback), [`execute(uint256,address,uint256,bytes)`](./contracts/LSP9Vault/LSP9Vault.md#execute), [`executeBatch(uint256[],address[],uint256[],bytes[])`](./contracts/LSP9Vault/LSP9Vault.md#executebatch) |
| **Solidity constant:**   | `_TYPEID_LSP9_VALUE_RECEIVED`                                                                                                                                                                                                                                                                                                                                                                           |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP9ValueReceived`                                                                                                                                                                                                                                                                                                                                                                       |

### `LSP9OwnershipTransferStarted`

|                          |                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------ |
| **Name**                 | `"LSP9OwnershipTransferStarted"`                                                     |
| **Hash**                 | `0xaefd43f45fed1bcd8992f23c803b6f4ec45cf6b62b0d404d565f290a471e763f`                 |
| **Used in:**             | [`transferOwnership(address)`](./contracts/LSP9Vault/LSP9Vault.md#transferownership) |
| **Solidity constant:**   | `_TYPEID_LSP9_OwnershipTransferStarted`                                              |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP9OwnershipTransferStarted`                                         |

### `LSP9OwnershipTransferred_SenderNotification`

|                          |                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP9OwnershipTransferred_SenderNotification"`                                                                                                               |
| **Hash**                 | `0x0c622e58e6b7089ae35f1af1c86d997be92fcdd8c9509652022d41aa65169471`                                                                                          |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP9Vault/LSP9Vault.md#acceptownership) <br/> [`renounceOwnership()`](./contracts/LSP9Vault/LSP9Vault.md#renounceownership) |
| **Solidity constant:**   | `_TYPEID_LSP9_OwnershipTransferred_SenderNotification`                                                                                                        |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP9OwnershipTransferred_SenderNotification`                                                                                                   |

### `LSP9OwnershipTransferred_RecipientNotification`

|                          |                                                                           |
| ------------------------ | ------------------------------------------------------------------------- |
| **Name**                 | `"LSP9OwnershipTransferred_RecipientNotification"`                        |
| **Hash**                 | `0x79855c97dbc259ce395421d933d7bc0699b0f1561f988f09a9e8633fd542fe5c`      |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP9Vault/LSP9Vault.md#acceptownership) |
| **Solidity constant:**   | `_TYPEID_LSP9_OwnershipTransferred_RecipientNotification`                 |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP9OwnershipTransferred_RecipientNotification`            |

## LSP14 - Ownable 2-Step

### `LSP14OwnershipTransferStarted`

|                          |                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP14OwnershipTransferStarted"`                                                                    |
| **Hash**                 | `0xee9a7c0924f740a2ca33d59b7f0c2929821ea9837ce043ce91c1823e9c4e52c0`                                 |
| **Used in:**             | [`transferOwnership(address)`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#transferownership) |
| **Solidity constant:**   | `_TYPEID_LSP14_OwnershipTransferStarted`                                                             |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP14OwnershipTransferStarted`                                                        |

#### `LSP14OwnershipTransferred_SenderNotification`

|                          |                                                                                                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP14OwnershipTransferred_SenderNotification"`                                                                                                                                              |
| **Hash**                 | `0xa124442e1cc7b52d8e2ede2787d43527dc1f3ae0de87f50dd03e27a71834f74c`                                                                                                                          |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#acceptownership) <br/> [`renounceOwnership()`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#renounceownership) |
| **Solidity constant:**   | `_TYPEID_LSP14_OwnershipTransferred_SenderNotification`                                                                                                                                       |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP14OwnershipTransferred_SenderNotification`                                                                                                                                  |

#### `LSP14OwnershipTransferred_RecipientNotification`

|                          |                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Name**                 | `"LSP14OwnershipTransferred_RecipientNotification"`                                       |
| **Hash**                 | `0xe32c7debcb817925ba4883fdbfc52797187f28f73f860641dab1a68d9b32902c`                      |
| **Used in:**             | [`acceptOwnership()`](./contracts/LSP14Ownable2Step/LSP14Ownable2Step.md#acceptownership) |
| **Solidity constant:**   | `_TYPEID_LSP14_OwnershipTransferred_RecipientNotification`                                |
| **Javascript constant:** | `LSP1_TYPE_IDS.LSP14OwnershipTransferred_RecipientNotification`                           |
