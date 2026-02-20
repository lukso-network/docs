---
title: 'Complete Event Reference'
description: 'Technical reference of all Solidity events defined across LUKSO Standard Proposals (LSPs), with keccak256 topic0 hashes for building indexers and event-processing systems.'
sidebar_position: 4
---

# Complete Event Reference

Technical reference of all events defined across LUKSO Standard Proposals (LSPs). Each entry includes the event signature, topic0 hash (keccak256), and a brief description. Useful for building indexers, event-processing systems, and analytics on LUKSO.

:::tip

The **Topic0** is the `keccak256` hash of the event signature. It is the first topic in the event log and is used to identify the event type when filtering logs from LUKSO nodes or indexers.

:::

---

## [LSP0 — ERC725Account](./accounts/lsp0-erc725account.md)

The foundational smart contract account standard for Universal Profiles. Combines ERC725X (execution), ERC725Y (data storage), [LSP1 (universal receiver)](./accounts/lsp1-universal-receiver.md), and [LSP14 (2-step ownership)](./access-control/lsp14-ownable-2-step.md).

> 📄 **Specification:** [LSP-0-ERC725Account](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)

---

### Executed

```solidity
Executed(uint256 indexed operation, address indexed to, uint256 indexed value, bytes4 selector)
```

Emitted when the account executes a call, transferValue, staticCall, or delegateCall operation via `execute(..)`. The `selector` is the first 4 bytes of the calldata sent to the target, or `0x00000000` if no calldata.

**Topic0:** `0x4810874456b8e6487bd861375cf6abd8e1c8bb5858c8ce36a86a04dabfac199e`

---

### ContractCreated

```solidity
ContractCreated(uint256 indexed operation, address indexed contractAddress, uint256 indexed value, bytes32 salt)
```

Emitted when the account deploys a new contract via `execute(..)` using CREATE (operation type 1) or CREATE2 (operation type 2). The `salt` is `bytes32(0)` for CREATE operations.

**Topic0:** `0xa1fb700aaee2ae4a2ff6f91ce7eba292f89c2f5488b8ec4c5c5c8150692595c3`

---

### DataChanged

```solidity
DataChanged(bytes32 indexed dataKey, bytes dataValue)
```

Emitted when data is set or updated in the account's [ERC725Y](./erc725.md) key-value store via `setData(..)` or `setDataBatch(..)`. One event is emitted per data key changed.

**Topic0:** `0xece574603820d07bc9b91f2a932baadf4628aabcb8afba49776529c14a6104b2`

---

### UniversalReceiver

```solidity
UniversalReceiver(address indexed from, uint256 indexed value, bytes32 indexed typeId, bytes receivedData, bytes returnedValue)
```

Emitted when the account's `universalReceiver(..)` function is called. This notifies of incoming interactions — token transfers, vault transfers, follows, etc. The `typeId` identifies the type of interaction (see [Common TypeIds](#common-typeids-for-universalreceiver) below). Also emitted on plain LYX receive with typeId `keccak256("LSP0ValueReceived")`.

**Topic0:** `0x9c3ba68eb5742b8e3961aea0afc7371a71bf433c8a67a831803b64c064a178c2`

---

### OwnershipTransferStarted

```solidity
OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner)
```

Emitted when `transferOwnership(..)` is called, initiating the first step of the 2-step ownership transfer ([LSP14](./access-control/lsp14-ownable-2-step.md)). The `newOwner` becomes the pending owner.

**Topic0:** `0x38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700`

---

### OwnershipTransferred

```solidity
OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```

Emitted when ownership transfer is completed — either via `acceptOwnership()` by the pending owner, or after successful renouncement. This is the [EIP-173](https://eips.ethereum.org/EIPS/eip-173) standard event.

**Topic0:** `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0`

---

### RenounceOwnershipInitiated

```solidity
RenounceOwnershipInitiated()
```

Emitted on the first call to `renounceOwnership()`, starting a confirmation period. A second call within the confirmation window finalizes renouncement.

**Topic0:** `0x56272768d104766ae5e663c58927d0a9e47effb40b9a8f6644ac5dfbc9e56f84`

---

### OwnershipRenounced

```solidity
OwnershipRenounced()
```

Emitted when ownership is successfully renounced after the 2-step confirmation. The account becomes permanently ownerless.

**Topic0:** `0xd1f66c3d2bc1993a86be5e3d33709d98f0442381befcedd29f578b9b2506b1ce`

---

## [LSP1 — UniversalReceiver](./accounts/lsp1-universal-receiver.md)

A generic notification mechanism that allows contracts to react to incoming transactions and information.

> 📄 **Specification:** [LSP-1-UniversalReceiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)

---

### UniversalReceiver

```solidity
UniversalReceiver(address indexed from, uint256 indexed value, bytes32 indexed typeId, bytes receivedData, bytes returnedValue)
```

Emitted when the `universalReceiver(..)` function is successfully executed. The `typeId` categorizes the notification type, `receivedData` contains the notification payload, and `returnedValue` is the response from the receiver logic or [delegate](./accounts/lsp1-universal-receiver-delegate.md). Same event as defined in [LSP0](#lsp0--erc725account).

**Topic0:** `0x9c3ba68eb5742b8e3961aea0afc7371a71bf433c8a67a831803b64c064a178c2`

---

## [LSP6 — KeyManager](./access-control/lsp6-key-manager.md)

Access control module for [LSP0](./accounts/lsp0-erc725account.md) accounts. Manages permissions for multiple controller addresses.

> 📄 **Specification:** [LSP-6-KeyManager](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)

---

### PermissionsVerified

```solidity
PermissionsVerified(address indexed signer, uint256 indexed value, bytes4 indexed selector)
```

Emitted after the KeyManager successfully verifies that a signer has the required permissions to execute an operation. The `selector` is the function selector being called on the linked account. Emitted for every successful permission check in `execute(..)`, `executeBatch(..)`, `executeRelayCall(..)`, and `executeRelayCallBatch(..)`.

**Topic0:** `0xc0a62328f6bf5e3172bb1fcb2019f54b2c523b6a48e3513a2298fbf0150b781e`

---

## [LSP7 — Digital Asset](./tokens/LSP7-Digital-Asset.md) (Fungible Token)

Standard for fungible tokens on LUKSO, replacing ERC20 with improved features including force parameter, operator notifications, and universal receiver hooks.

> 📄 **Specification:** [LSP-7-DigitalAsset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md)

---

### Transfer

```solidity
Transfer(address indexed operator, address indexed from, address indexed to, uint256 amount, bool force, bytes data)
```

Emitted on every token transfer, including mints (from = `address(0)`) and burns (to = `address(0)`). The `operator` is the address that initiated the transfer (may differ from `from` if an authorized operator). The `force` flag indicates whether the transfer should bypass [LSP1](./accounts/lsp1-universal-receiver.md) receiver checks. The `data` field can carry arbitrary bytes (e.g., comments).

**Topic0:** `0x3997e418d2cef0b3b0e907b1e39605c3f7d32dbd061e82ea5b4a770d46a160a6`

---

### OperatorAuthorizationChanged

```solidity
OperatorAuthorizationChanged(address indexed operator, address indexed tokenOwner, uint256 indexed amount, bytes operatorNotificationData)
```

Emitted when a token owner authorizes an operator to spend tokens on their behalf via `authorizeOperator(..)`. The `amount` is the authorized allowance. The `operatorNotificationData` is forwarded to the operator's [LSP1](./accounts/lsp1-universal-receiver.md) universalReceiver if it's a contract.

**Topic0:** `0xf772a43bfdf4729b196e3fb54a818b91a2ca6c49d10b2e16278752f9f515c25d`

---

### OperatorRevoked

```solidity
OperatorRevoked(address indexed operator, address indexed tokenOwner, bool indexed notified, bytes operatorNotificationData)
```

Emitted when an operator's authorization is revoked via `revokeOperator(..)`. The `notified` flag indicates whether the operator's [LSP1](./accounts/lsp1-universal-receiver.md) universalReceiver was successfully called.

**Topic0:** `0x0ebf5762d8855cbe012d2ca42fb33a81175e17c8a8751f8859931ba453bd4167`

---

### DataChanged _(inherited from [ERC725Y](./erc725.md))_

```solidity
DataChanged(bytes32 indexed dataKey, bytes dataValue)
```

Emitted when token metadata or other key-value data is updated (e.g., [LSP4](./tokens/LSP4-Digital-Asset-Metadata.md) metadata changes).

**Topic0:** `0xece574603820d07bc9b91f2a932baadf4628aabcb8afba49776529c14a6104b2`

---

### OwnershipTransferred _(inherited from [EIP-173](https://eips.ethereum.org/EIPS/eip-173))_

```solidity
OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```

Emitted when the token contract's ownership is transferred.

**Topic0:** `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0`

---

## [LSP8 — Identifiable Digital Asset](./tokens/LSP8-Identifiable-Digital-Asset.md) (Non-Fungible Token)

Standard for non-fungible and identifiable tokens on LUKSO, replacing ERC721 with tokenId as `bytes32` for flexible ID formats.

> 📄 **Specification:** [LSP-8-IdentifiableDigitalAsset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-8-IdentifiableDigitalAsset.md)

---

### Transfer

```solidity
Transfer(address operator, address indexed from, address indexed to, bytes32 indexed tokenId, bool force, bytes data)
```

Emitted on every token transfer, including mints (from = `address(0)`) and burns (to = `address(0)`). Note: `operator` is **NOT indexed** in LSP8 (unlike [LSP7](#lsp7--digital-asset-fungible-token)). The `tokenId` is a `bytes32` value whose format is defined by `LSP8TokenIdFormat` (number, string, address, unique hash, etc.).

**Topic0:** `0xb333c813a7426a7a11e2b190cad52c44119421594b47f6f32ace6d8c7207b2bf`

---

### OperatorAuthorizationChanged

```solidity
OperatorAuthorizationChanged(address indexed operator, address indexed tokenOwner, bytes32 indexed tokenId, bytes operatorNotificationData)
```

Emitted when a token owner authorizes an operator for a specific tokenId via `authorizeOperator(..)`. In LSP8, operator authorization is per-tokenId, not per-amount.

**Topic0:** `0x1b1b58aa2ec0cec2228b2d37124556d41f5a1f7b12f089171f896cc236671215`

---

### OperatorRevoked

```solidity
OperatorRevoked(address indexed operator, address indexed tokenOwner, bytes32 indexed tokenId, bool notified, bytes operatorNotificationData)
```

Emitted when an operator's authorization for a specific tokenId is revoked. The `notified` flag indicates whether the operator's [LSP1](./accounts/lsp1-universal-receiver.md) universalReceiver was called.

**Topic0:** `0xc78cd419d6136f9f1c1c6aec1d3fae098cffaf8bc86314a8f2685e32fe574e3c`

---

### TokenIdDataChanged

```solidity
TokenIdDataChanged(bytes32 indexed tokenId, bytes32 indexed dataKey, bytes dataValue)
```

Emitted when per-token metadata is updated via `setDataForTokenId(..)` or `setDataBatchForTokenId(..)`. Allows each individual NFT to carry its own key-value data store.

**Topic0:** `0xa6e4251f855f750545fe414f120db91c76b88def14d120969e5bb2d3f05debbb`

---

### DataChanged _(inherited from [ERC725Y](./erc725.md))_

```solidity
DataChanged(bytes32 indexed dataKey, bytes dataValue)
```

Emitted when collection-level metadata or other key-value data is updated (e.g., [LSP4](./tokens/LSP4-Digital-Asset-Metadata.md) metadata at the contract level).

**Topic0:** `0xece574603820d07bc9b91f2a932baadf4628aabcb8afba49776529c14a6104b2`

---

### OwnershipTransferred _(inherited from [EIP-173](https://eips.ethereum.org/EIPS/eip-173))_

```solidity
OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```

Emitted when the token contract's ownership is transferred.

**Topic0:** `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0`

---

## [LSP9 — Vault](./accounts/lsp9-vault.md)

A lighter version of [LSP0](./accounts/lsp0-erc725account.md) designed to hold assets and data, controlled by an owner. Used for organizing assets into separate containers.

> 📄 **Specification:** [LSP-9-Vault](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-9-Vault.md)

---

### Executed

```solidity
Executed(uint256 indexed operation, address indexed to, uint256 indexed value, bytes4 selector)
```

Emitted when the vault executes an operation. Same event as [LSP0](#executed).

**Topic0:** `0x4810874456b8e6487bd861375cf6abd8e1c8bb5858c8ce36a86a04dabfac199e`

---

### ContractCreated

```solidity
ContractCreated(uint256 indexed operation, address indexed contractAddress, uint256 indexed value)
```

Emitted when the vault deploys a new contract. Note: LSP9's version does **NOT** include the `bytes32 salt` parameter (unlike [LSP0](#contractcreated)).

**Topic0:** `0x01c42bd7e97a66166063b02fce6924e6656b6c2c61966630165095c4fb0b7b2f`

---

### DataChanged

```solidity
DataChanged(bytes32 indexed dataKey, bytes dataValue)
```

Emitted when data is set in the vault's key-value store.

**Topic0:** `0xece574603820d07bc9b91f2a932baadf4628aabcb8afba49776529c14a6104b2`

---

### ValueReceived

```solidity
ValueReceived(address indexed sender, uint256 indexed value)
```

Emitted when the vault receives native tokens (LYX). Fired on receive/fallback and before execution functions that include value.

**Topic0:** `0x7e71433ddf847725166244795048ecf3e3f9f35628254ecbf736056664233493`

---

### UniversalReceiver

```solidity
UniversalReceiver(address indexed from, uint256 indexed value, bytes32 indexed typeId, bytes receivedData, bytes returnedValue)
```

Emitted when the vault's `universalReceiver(..)` is called. Same event as [LSP0](#universalreceiver)/[LSP1](#lsp1--universalreceiver).

**Topic0:** `0x9c3ba68eb5742b8e3961aea0afc7371a71bf433c8a67a831803b64c064a178c2`

---

### OwnershipTransferStarted

```solidity
OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner)
```

Emitted when vault ownership transfer is initiated (2-step, [LSP14](./access-control/lsp14-ownable-2-step.md)).

**Topic0:** `0x38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700`

---

### OwnershipTransferred

```solidity
OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```

Emitted when vault ownership is transferred or renounced.

**Topic0:** `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0`

---

### RenounceOwnershipInitiated

```solidity
RenounceOwnershipInitiated()
```

Emitted on the first call to renounce vault ownership.

**Topic0:** `0x56272768d104766ae5e663c58927d0a9e47effb40b9a8f6644ac5dfbc9e56f84`

---

### OwnershipRenounced

```solidity
OwnershipRenounced()
```

Emitted when vault ownership is permanently renounced.

**Topic0:** `0xd1f66c3d2bc1993a86be5e3d33709d98f0442381befcedd29f578b9b2506b1ce`

---

## [LSP11 — Basic Social Recovery](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-11-BasicSocialRecovery.md)

Social recovery mechanism for Universal Profiles, allowing designated guardians to recover ownership.

> 📄 **Specification:** [LSP-11-BasicSocialRecovery](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-11-BasicSocialRecovery.md)

---

### GuardianAdded

```solidity
GuardianAdded(address indexed newGuardian)
```

Emitted when a new guardian is added to the social recovery system.

**Topic0:** `0x038596bb31e2e7d3d9f184d4c98b310103f6d7f5830e5eec32bffe6f1728f969`

---

### GuardianRemoved

```solidity
GuardianRemoved(address indexed removedGuardian)
```

Emitted when a guardian is removed from the social recovery system.

**Topic0:** `0xb8107d0c6b40be480ce3172ee66ba6d64b71f6b1685a851340036e6e2e3e3c52`

---

### GuardiansThresholdChanged

```solidity
GuardiansThresholdChanged(uint256 indexed guardianThreshold)
```

Emitted when the minimum number of guardian votes required for recovery is changed.

**Topic0:** `0x7146d20a2c7b7c75c203774c9f241b61698fac43a4a81ccd828f0d8162392790`

---

### SecretHashChanged

```solidity
SecretHashChanged(bytes32 indexed secretHash)
```

Emitted when the secret hash (used to verify recovery requests) is changed.

**Topic0:** `0x2e8c5419a62207ade549fe0b66c1c85c16f5e1ed654815dee3a3f3ac41770df3`

---

### SelectedNewController

```solidity
SelectedNewController(uint256 indexed currentRecoveryCounter, address indexed guardian, address indexed addressSelected)
```

Emitted when a guardian votes for a new controller address during the recovery process.

**Topic0:** `0xe43f3c1093c69ab76b2cf6246090acb2f8eab7f19ba9942dfc8b8ec446e3a3de`

---

### RecoveryProcessSuccessful

```solidity
RecoveryProcessSuccessful(uint256 indexed recoveryCounter, address indexed newController, bytes32 indexed newSecretHash, address[] guardians)
```

Emitted when a recovery process completes successfully — the guardian threshold was reached, the correct secret was provided, and the new controller's permissions have been set.

**Topic0:** `0xf4ff8803d6b43af46d48c200977209829c2f42f19f27eda1c89dbf26a28009cd`

---

## [LSP14 — Ownable2Step](./access-control/lsp14-ownable-2-step.md)

Two-step ownership transfer mechanism to prevent accidental ownership transfers. Used by [LSP0](./accounts/lsp0-erc725account.md), [LSP9](./accounts/lsp9-vault.md), and other ownable contracts.

> 📄 **Specification:** [LSP-14-Ownable2Step](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-14-Ownable2Step.md)

---

### OwnershipTransferStarted

```solidity
OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner)
```

Emitted when `transferOwnership(..)` is called, setting the new pending owner. The transfer is not complete until the pending owner calls `acceptOwnership()`.

**Topic0:** `0x38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700`

---

### OwnershipTransferred

```solidity
OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```

Emitted when the pending owner accepts ownership or when ownership is renounced. Standard [EIP-173](https://eips.ethereum.org/EIPS/eip-173) event.

**Topic0:** `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0`

---

### RenounceOwnershipStarted

```solidity
RenounceOwnershipStarted()
```

Emitted on the first call to `renounceOwnership()`.

:::caution Different Topic0 from LSP0/LSP9

The LSP14 spec names this event `RenounceOwnershipStarted` while the [LSP0](./accounts/lsp0-erc725account.md)/[LSP9](./accounts/lsp9-vault.md) interface uses `RenounceOwnershipInitiated`. These have **different** topic0 hashes despite identical behavior. Indexers should listen for both.

:::

**Topic0:** `0x81b7f830f1f0084db6497c486cbe6974c86488dcc4e3738eab94ab6d6b1653e7`

---

### OwnershipRenounced

```solidity
OwnershipRenounced()
```

Emitted when ownership is permanently renounced after the 2-step confirmation.

**Topic0:** `0xd1f66c3d2bc1993a86be5e3d33709d98f0442381befcedd29f578b9b2506b1ce`

---

## [LSP16 — Universal Factory](./factories/lsp16-universal-factory.md)

Factory contract for deploying smart contracts with deterministic addresses using CREATE2.

> 📄 **Specification:** [LSP-16-UniversalFactory](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-16-UniversalFactory.md)

---

### ContractCreated

```solidity
ContractCreated(address indexed contractCreated, bytes32 indexed providedSalt, bytes32 generatedSalt, bool indexed initializable, bytes initializeCalldata)
```

Emitted when a contract is deployed via the factory. The `providedSalt` is user-supplied, while `generatedSalt` is the derived salt used for CREATE2 (incorporating initialization data to prevent address squatting). The `initializable` flag indicates whether the contract was initialized post-deployment.

**Topic0:** `0x8872a323d65599f01bf90dc61c94b4e0cc8e2347d6af4122fccc3e112ee34a84`

---

## [LSP23 — Linked Contracts Factory](./factories/lsp23-linked-contracts-factory.md)

Factory for deploying pairs of linked contracts (primary + secondary) in a single transaction with post-deployment configuration.

> 📄 **Specification:** [LSP-23-LinkedContractsFactory](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md)

---

### DeployedContracts

```solidity
DeployedContracts(
    address indexed primaryContract,
    address indexed secondaryContract,
    (bytes32, uint256, bytes) primaryContractDeployment,
    (uint256, bytes, bool, bytes) secondaryContractDeployment,
    address postDeploymentModule,
    bytes postDeploymentModuleCalldata
)
```

Emitted when a primary and secondary contract are deployed together via CREATE/CREATE2. The tuple parameters represent `PrimaryContractDeployment(salt, fundingAmount, creationBytecode)` and `SecondaryContractDeployment(fundingAmount, creationBytecode, addPrimaryContractAddress, extraConstructorParams)`.

**Topic0:** `0x0e20ea3d6273aab49a7dabafc15cc94971c12dd63a07185ca810e497e4e87aa6`

---

### DeployedERC1167Proxies

```solidity
DeployedERC1167Proxies(
    address indexed primaryContract,
    address indexed secondaryContract,
    (bytes32, uint256, address, bytes) primaryContractDeploymentInit,
    (uint256, address, bytes, bool, bytes) secondaryContractDeploymentInit,
    address postDeploymentModule,
    bytes postDeploymentModuleCalldata
)
```

Emitted when ERC1167 minimal proxy pairs are deployed. Similar to `DeployedContracts` but for proxy-based deployments. Tuple parameters represent `PrimaryContractDeploymentInit(salt, fundingAmount, implementationContract, initializationCalldata)` and `SecondaryContractDeploymentInit(fundingAmount, implementationContract, initializationCalldata, addPrimaryContractAddress, extraInitializationParams)`.

**Topic0:** `0xe20570ed9bda3b93eea277b4e5d975c8933fd5f85f2c824d0845ae96c55a54fe`

---

## [LSP26 — Follower System](./accounts/lsp26-follower-system.md)

On-chain social graph for following/unfollowing addresses.

> 📄 **Specification:** [LSP-26-FollowerSystem](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-26-FollowerSystem.md)

---

### Follow

```solidity
Follow(address follower, address addr)
```

Emitted when an address follows another address. Neither parameter is indexed.

**Topic0:** `0xbccc71dc7842b86291138666aa18e133ee6d41aa71e6d7c650debad1a0576635`

---

### Unfollow

```solidity
Unfollow(address unfollower, address addr)
```

Emitted when an address unfollows another address. Neither parameter is indexed.

**Topic0:** `0x083700fd0d85112c9d8c5823585c7542e8fadb693c9902e5bc590ab367f7a15e`

---

## Standards Without Events

The following LSP standards define data schemas, metadata formats, or API specifications and do **not** define any Solidity events:

| Standard | Name | Why No Events |
| :--- | :--- | :--- |
| [**LSP2**](./metadata/lsp2-json-schema.md) | ERC725Y JSON Schema | Data encoding standard for key-value stores — no contract logic |
| [**LSP3**](./metadata/lsp3-profile-metadata.md) | Profile Metadata | Metadata schema for Universal Profiles — stored via `DataChanged` events from [LSP0](#lsp0--erc725account) |
| [**LSP4**](./tokens/LSP4-Digital-Asset-Metadata.md) | Digital Asset Metadata | Metadata schema for tokens/NFTs — stored via `DataChanged` events from [LSP7](#lsp7--digital-asset-fungible-token)/[LSP8](#lsp8--identifiable-digital-asset-non-fungible-token) |
| [**LSP5**](./metadata/lsp5-received-assets.md) | Received Assets | Data key schema for tracking received assets — managed by [LSP1](./accounts/lsp1-universal-receiver-delegate.md) delegate |
| [**LSP10**](./metadata/lsp10-received-vaults.md) | Received Vaults | Data key schema for tracking received vaults — managed by [LSP1](./accounts/lsp1-universal-receiver-delegate.md) delegate |
| [**LSP12**](./metadata/lsp12-issued-assets.md) | Issued Assets | Data key schema for tracking issued assets — no contract logic |
| [**LSP15**](./accounts/lsp15-transaction-relayer-api.md) | Transaction Relay Service API | HTTP API specification for relay services — no on-chain events |
| [**LSP17**](./accounts/lsp17-contract-extension.md) | Contract Extension | Fallback extension mechanism — extensions emit their own events |
| **LSP18** | Royalties | Royalty standard — no events defined in current spec |
| [**LSP20**](./accounts/lsp20-call-verification.md) | Call Verification | Verification hook standard — no events defined |
| [**LSP25**](./accounts/lsp25-execute-relay-call.md) | Execute Relay Call | Meta-transaction standard — uses [LSP6](#lsp6--keymanager) `PermissionsVerified` event |
| **LSP28** | The Grid | Layout/presentation metadata — stored via `DataChanged` events |

---

## Quick Reference — All Event Topic0 Hashes

| Topic0 | Event | Standards |
| :--- | :--- | :--- |
| `0x4810874456b8e6487bd861375cf6abd8e1c8bb5858c8ce36a86a04dabfac199e` | `Executed` | LSP0, LSP9 |
| `0xa1fb700aaee2ae4a2ff6f91ce7eba292f89c2f5488b8ec4c5c5c8150692595c3` | `ContractCreated` (with salt) | LSP0 |
| `0x01c42bd7e97a66166063b02fce6924e6656b6c2c61966630165095c4fb0b7b2f` | `ContractCreated` (no salt) | LSP9 |
| `0xece574603820d07bc9b91f2a932baadf4628aabcb8afba49776529c14a6104b2` | `DataChanged` | LSP0, LSP7, LSP8, LSP9 |
| `0x9c3ba68eb5742b8e3961aea0afc7371a71bf433c8a67a831803b64c064a178c2` | `UniversalReceiver` | LSP0, LSP1, LSP9 |
| `0x38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700` | `OwnershipTransferStarted` | LSP0, LSP9, LSP14 |
| `0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0` | `OwnershipTransferred` | LSP0, LSP7, LSP8, LSP9, LSP14 |
| `0x56272768d104766ae5e663c58927d0a9e47effb40b9a8f6644ac5dfbc9e56f84` | `RenounceOwnershipInitiated` | LSP0, LSP9 |
| `0x81b7f830f1f0084db6497c486cbe6974c86488dcc4e3738eab94ab6d6b1653e7` | `RenounceOwnershipStarted` | LSP14 |
| `0xd1f66c3d2bc1993a86be5e3d33709d98f0442381befcedd29f578b9b2506b1ce` | `OwnershipRenounced` | LSP0, LSP9, LSP14 |
| `0xc0a62328f6bf5e3172bb1fcb2019f54b2c523b6a48e3513a2298fbf0150b781e` | `PermissionsVerified` | LSP6 |
| `0x3997e418d2cef0b3b0e907b1e39605c3f7d32dbd061e82ea5b4a770d46a160a6` | `Transfer` (LSP7) | LSP7 |
| `0xf772a43bfdf4729b196e3fb54a818b91a2ca6c49d10b2e16278752f9f515c25d` | `OperatorAuthorizationChanged` (LSP7) | LSP7 |
| `0x0ebf5762d8855cbe012d2ca42fb33a81175e17c8a8751f8859931ba453bd4167` | `OperatorRevoked` (LSP7) | LSP7 |
| `0xb333c813a7426a7a11e2b190cad52c44119421594b47f6f32ace6d8c7207b2bf` | `Transfer` (LSP8) | LSP8 |
| `0x1b1b58aa2ec0cec2228b2d37124556d41f5a1f7b12f089171f896cc236671215` | `OperatorAuthorizationChanged` (LSP8) | LSP8 |
| `0xc78cd419d6136f9f1c1c6aec1d3fae098cffaf8bc86314a8f2685e32fe574e3c` | `OperatorRevoked` (LSP8) | LSP8 |
| `0xa6e4251f855f750545fe414f120db91c76b88def14d120969e5bb2d3f05debbb` | `TokenIdDataChanged` | LSP8 |
| `0x7e71433ddf847725166244795048ecf3e3f9f35628254ecbf736056664233493` | `ValueReceived` | LSP9 |
| `0x038596bb31e2e7d3d9f184d4c98b310103f6d7f5830e5eec32bffe6f1728f969` | `GuardianAdded` | LSP11 |
| `0xb8107d0c6b40be480ce3172ee66ba6d64b71f6b1685a851340036e6e2e3e3c52` | `GuardianRemoved` | LSP11 |
| `0x7146d20a2c7b7c75c203774c9f241b61698fac43a4a81ccd828f0d8162392790` | `GuardiansThresholdChanged` | LSP11 |
| `0x2e8c5419a62207ade549fe0b66c1c85c16f5e1ed654815dee3a3f3ac41770df3` | `SecretHashChanged` | LSP11 |
| `0xe43f3c1093c69ab76b2cf6246090acb2f8eab7f19ba9942dfc8b8ec446e3a3de` | `SelectedNewController` | LSP11 |
| `0xf4ff8803d6b43af46d48c200977209829c2f42f19f27eda1c89dbf26a28009cd` | `RecoveryProcessSuccessful` | LSP11 |
| `0x8872a323d65599f01bf90dc61c94b4e0cc8e2347d6af4122fccc3e112ee34a84` | `ContractCreated` (factory) | LSP16 |
| `0x0e20ea3d6273aab49a7dabafc15cc94971c12dd63a07185ca810e497e4e87aa6` | `DeployedContracts` | LSP23 |
| `0xe20570ed9bda3b93eea277b4e5d975c8933fd5f85f2c824d0845ae96c55a54fe` | `DeployedERC1167Proxies` | LSP23 |
| `0xbccc71dc7842b86291138666aa18e133ee6d41aa71e6d7c650debad1a0576635` | `Follow` | LSP26 |
| `0x083700fd0d85112c9d8c5823585c7542e8fadb693c9902e5bc590ab367f7a15e` | `Unfollow` | LSP26 |

---

## Common TypeIds for UniversalReceiver

These are not events themselves, but the `typeId` values used in [`UniversalReceiver`](#universalreceiver) events to categorize notifications:

| TypeId | Value | Description |
| :--- | :--- | :--- |
| `LSP0ValueReceived` | `0x9c4705229491d365fb5434052e12a386d6771d976bea61070a8c694e8affea3d` | Native token (LYX) received by account |
| `LSP7Tokens_SenderNotification` | `0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea` | Notifies sender of [LSP7](./tokens/LSP7-Digital-Asset.md) token transfer |
| `LSP7Tokens_RecipientNotification` | `0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c` | Notifies recipient of [LSP7](./tokens/LSP7-Digital-Asset.md) token transfer |
| `LSP8Tokens_SenderNotification` | `0xb23eae7e6d1564b295b4c3e3be402d9a2f0776c57bdf365903496f6fa481ab00` | Notifies sender of [LSP8](./tokens/LSP8-Identifiable-Digital-Asset.md) token transfer |
| `LSP8Tokens_RecipientNotification` | `0x0b084a55ebf70fd3c06fd755269dac2212c4d3f0f4d09079780bfa50c1b2984d` | Notifies recipient of [LSP8](./tokens/LSP8-Identifiable-Digital-Asset.md) token transfer |
| `LSP7Tokens_OperatorNotification` | `0x386072cc5a58e61263b434c722725f21031cd06e7c552cfaa06db5de8a320dbc` | Notifies operator of [LSP7](./tokens/LSP7-Digital-Asset.md) authorization change |
| `LSP8Tokens_OperatorNotification` | `0x8a1c15a8799f71b547e08e2bcb2e85257e81b0a07eee2ce6712549eef1f00970` | Notifies operator of [LSP8](./tokens/LSP8-Identifiable-Digital-Asset.md) authorization change |
| `LSP9ValueReceived` | `0x468cd1581d7bc001c3b685513d2b929b55437be34700410383d58f3aa1ea0abc` | Native token received by [vault](./accounts/lsp9-vault.md) |
| `LSP26FollowNotification` | `0x8c6d5eb7e02ce4593cfc9d38d86efc080dc07fa95b82e0f8baaebad315bd2724` | Notifies of new follower ([LSP26](./accounts/lsp26-follower-system.md)) |
| `LSP26UnfollowNotification` | `0x7a01f86c5b3c32e70e61951aa00e7ece6dcc720c5e591d3b0e514d0de8357df6` | Notifies of unfollower ([LSP26](./accounts/lsp26-follower-system.md)) |
