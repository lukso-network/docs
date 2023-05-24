---
title: LSP6KeyManager
sidebar_position: 8
---

# LSP6KeyManager

:::info Solidity contract

[`LSP6KeyManager.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP6KeyManager/LSP6KeyManager.sol)

:::

The **LSP6KeyManager** is a contract that controls a **[LSP0ERC725Account](./lsp0-erc725-account.md)** contract. It comes with pre-defined permissions for addresses that range from setting data to executing, changing owner, etc., as written in the [permissions](../universal-profile/lsp6-key-manager.md#-types-of-permissions) section of the [LSP6-KeyManager Standard](../universal-profile/lsp6-key-manager.md).

:::warning

Because of its potential malicious impact on the linked account, the current implementation of the Key Manager disallows the **[DELEGATECALL](../universal-profile/lsp6-key-manager.md#permissions-value)** operation via the `execute(...)` function of the linked ERC725Account.

:::

:::note
_LSP6KeyManager contract also contains the methods from the [ERC165 Standard](https://eips.ethereum.org/EIPS/eip-165):_

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

:::

## Functions

### constructor

```solidity
constructor(address target)
```

Links the LSP6KeyManager to the **ERC725** contract deployed at the `target` address.

#### Parameters:

| Name     | Type      | Description                                        |
| :------- | :-------- | :------------------------------------------------- |
| `target` | `address` | The address of the **ERC725** contract to control. |

### target

```solidity
function target() external view returns (address)
```

Returns the address of the account linked to this Key Manager.

This can be a contract that implements:

- [ERC725X](https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725x) only.
- [ERC725Y](https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725y) only.
- any ERC725 based contract (implementing both ERC725X and ERC725Y), like a [ERC725Account](../smart-contracts/lsp0-erc725-account.md).

#### Returns

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `target` | `address` | the address of the linked account |

### execute

```solidity
function execute(bytes memory payload) public payable returns (bytes memory result)
```

Executes a payload on the linked **LSP0ERC725Account**.

This payload must represent the abi-encoded function call of one of the functions on the linked **LSP0ERC725Account**:

- **[`setData(bytes32,bytes)`](./lsp0-erc725-account.md#setdata)**.
- **[`setDataBatch(bytes32[],bytes[])`](./lsp0-erc725-account.md#setdatabatch)**.
- **[`execute(uint256,address,uint256,bytes)`](./lsp0-erc725-account.md#execute)**.
- **[`transferOwnership(address)`](./lsp0-erc725-account.md#transferownership)**.
- **[`acceptOwnership()`](./lsp0-erc725-account.md#acceptownership)**.

_Triggers the **[VerifiedCall](#verifiedcall)** event when a call is successfully executed._

#### Parameters:

| Name      | Type    | Description                 |
| :-------- | :------ | :-------------------------- |
| `payload` | `bytes` | The payload to be executed. |

#### Return Values:

| Name     | Type    | Description                                                                  |
| :------- | :------ | :--------------------------------------------------------------------------- |
| `result` | `bytes` | The returned data as ABI-encoded bytes if the call on the account succeeded. |

### executeBatch

```solidity
function executeBatch(uint256[] calldata values, bytes[] calldata payloads) public payable returns (bytes memory result)
```

Same than [`execute(bytes)`](#execute) but executes a batch of payloads on the linked **LSP0ERC725Account**.

The payloads parameter must represent an array of abi-encoded function calls of one of the **LSP0ERC725Account** contract functions:

- **[`setData(bytes32,bytes)`](./lsp0-erc725-account.md#setdata)**.
- **[`setDataBatch(bytes32[],bytes[])`](./lsp0-erc725-account.md#setdatabatch)**.
- **[`execute(uint256,address,uint256,bytes)`](./lsp0-erc725-account.md#execute)**.
- **[`transferOwnership(address)`](./lsp0-erc725-account.md#transferownership)**.
- **[`acceptOwnership()`](./lsp0-erc725-account.md#acceptownership)**.

_Triggers the **[`VerifiedCall`](#verifiedcall)** event when a call is successfully executed._

#### Parameters:

| Name       | Type        | Description                                        |
| :--------- | :---------- | :------------------------------------------------- |
| `values`   | `uint256[]` | The `msg.value` to be sent for a specific payload. |
| `payloads` | `bytes[]`   | The payloads to be executed.                       |

#### Return Values:

| Name      | Type      | Description                                                                      |
| :-------- | :-------- | :------------------------------------------------------------------------------- |
| `results` | `bytes[]` | The returned datas as ABI-encoded bytes[] if the calls on the account succeeded. |

### getNonce

:::info
More info about **channel** can be found here: **[What are multi-channel nonces](../faq/channel-nonce.md)**\_
:::

```solidity
function getNonce(
    address signer,
    uint256 channel
) public view returns (uint256 nonce)
```

Returns the **nonce** that needs to be signed by an allowed controller to be passed into the **[`executeRelayCall(...)`](#executerelaycall)** function. A signer can choose his channel number arbitrarily.

#### Parameters:

| Name      | Type      | Description                                                              |
| :-------- | :-------- | :----------------------------------------------------------------------- |
| `signer`  | `address` | The address of the signer of the transaction.                            |
| `channel` | `uint256` | The channel which the signer wants to use for executing the transaction. |

#### Return Values:

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `nonce` | `uint256` | The current nonce. |

### executeRelayCall

:::tip

If you are looking to learn how to sign and execute relay transactions via the Key Manager, see our Javascript step by step guide [_"Execute Relay Transactions"_](../../guides/key-manager/execute-relay-transactions.md).

See the LSP6 Standard page for more details on how to [generate a valid signature for Execute Relay Call](../universal-profile/lsp6-key-manager.md#how-to-sign-relay-transactions).

:::

```solidity
function executeRelayCall(
    bytes memory signature,
    uint256 nonce,
    uint256 validityTimestamps,
    bytes memory _calldata
) public
```

Allows anybody to execute a payload on the linked **LSP0ERC725Account**, if they have a signed message from a controller with some permissions.

_Triggers the **[VerifiedCall](#verifiedcall)** event when a call is successfully executed._

#### Parameters:

| Name        | Type      | Description                                       |
| :---------- | :-------- | :------------------------------------------------ |
| `signature` | `bytes`   | The bytes65 EIP191 signature.                     |
| `nonce`     | `uint256` | The nonce of the address that signed the message. |
| `_calldata` | `bytes`   | The payload to be executed.                       |

#### Return Value:

| Name     | Type    | Description                                                                                                                      |
| :------- | :------ | :------------------------------------------------------------------------------------------------------------------------------- |
| `result` | `bytes` | If the payload on the linked **LSP0ERC725Account** was `ERC725X.execute(...)`, the data returned by the external made by the UP. |

### executeRelayCallBatch

```solidity
function executeRelayCallBatch(
    bytes[] calldata signatures,
    uint256[] calldata nonces,
    uint256[] calldata validityTimestamps,
    uint256[] calldata values,
    bytes[] calldata payloads
) public
```

Same as [`executeRelayCall(bytes,uint256,bytes)`](#executerelaycall), but allows anybody to execute a **batch of payloads** on the linked **LSP0ERC725Account** on behalf of other [controllers](../universal-profile/lsp6-key-manager.md), as long as these controllers that signed the `payloads` have some permissions.

#### Parameters:

| Name         | Type        | Description                                                   |
| :----------- | :---------- | :------------------------------------------------------------ |
| `signatures` | `bytes[]`   | An array of bytes65 EIP191 signatures.                        |
| `nonces`     | `uint256[]` | An array of nonces of the addresses that signed the messages. |
| `values`     | `uint256[]` | An array of values to be sent sent for each payload.          |
| `payloads`   | `bytes[]`   | An array of payloads to be executed.                          |

#### Return Values:

| Name      | Type      | Description                                                                                                                             |
| :-------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `results` | `bytes[]` | For each payload on the linked **LSP0ERC725Account** that was `ERC725X.execute(...)`, the data returned by the external made by the UP. |

### isValidSignature

```solidity
function isValidSignature(
    bytes32 hash,
    bytes memory signature
) public view returns (bytes4 magicValue)
```

Checks if a signature was signed by a controller having at least the **[SIGN](../universal-profile/lsp6-key-manager.md/#permission-values)** permission for this KeyManager, otherwise it will return the failure value.

#### Parameters:

| Name        | Type      | Description                                           |
| :---------- | :-------- | :---------------------------------------------------- |
| `hash`      | `bytes32` | The hash of the data signed on the behalf of address. |
| `signature` | `bytes`   | The Owner's signature(s) of the data.                 |

#### Return Values:

| Name         | Type     | Description                                                            |
| :----------- | :------- | :--------------------------------------------------------------------- |
| `magicValue` | `bytes4` | The magicValue either `0x1626ba7e` on success or `0xffffffff` failure. |

## Events

### VerifiedCall

```solidity
event VerifiedCall(
    address indexed signer,
    uint256 indexed value,
    bytes4 indexed selector
);
```

_Fired when a transaction was successfully executed from the **[execute](#execute)** or **[executeRelayCall](#executerelaycall)** function._

#### Values:

| Name       | Type      | Description                                                                                                                                                                     |
| :--------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `signer`   | `address` | The controller that executed the payload (either directly via [`execute(...)](#execute) or indirectly via meta transaction using [`executeRelayCall(...)`](#executerelaycall)). |
| `value`    | `uint256` | The amount to be sent with the payload.                                                                                                                                         |
| `selector` | `bytes4`  | The bytes4 selector of the function executed on the linked [`target()`](#target).                                                                                               |

## References

- [LUKSO Standards Proposals: LSP6 - Key Manager (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)
- [LSP6 KeyManager: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP6KeyManager)
