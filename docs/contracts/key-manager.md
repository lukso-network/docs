---
title: LSP6 Key Manager
sidebar_position: 4
---

# LSP6 Key Manager

The **KeyManager** is a contract that controls the **[ERC725Account](./erc725-account.md)**. It comes with a set of pre-defined permissions for addresses.
The permissions could range from setting data, executing, changing owner and more as written in the **[Permissions Section](../standards/universal-profile/03-lsp6-key-manager.md#-types-of-permissions)** in **[LSP6-KeyManager Standard](../standards/universal-profile/03-lsp6-key-manager.md)**.

Currently the **`DelegateCall`** operation to execute is unavailable for the users since it have malicious impact on their accounts.

:::note
**_KeyManager implementation also contains the methods from [ERC165](https://eips.ethereum.org/EIPS/eip-165)._**
:::

## Functions

### execute

```solidity
  function execute(
    bytes memory data
  ) public payable returns (bytes memory result)
```

Execute a payload on the **ERC725Account**. This payload could represent the ABI of any function on the account ; **[setData](./erc725-account.md#setdata)** or **[execute](./erc725-account.md#execute)**, etc ..

_Triggers the **[Executed](#executed)** event when a call is successfully executed._

#### Parameters:

| Name   | Type  | Description                   |
| :----- | :---- | :---------------------------- |
| `data` | bytes | The call data to be executed. |

#### Return Values:

| Name     | Type  | Description                                                                                                         |
| :------- | :---- | :------------------------------------------------------------------------------------------------------------------ |
| `result` | bytes | The returned data as ABI-encoded bytes if the call on the account succeeded, otherwise revert with a reason-string. |

### getNonce

```solidity
  function getNonce(
    address signer,
    uint256 channel
  ) public view returns (uint256 nonce)
```

Returns the **nonce** that needs to be signed by an allowed key to be passed into the **[executeRelayCall](#executerelaycall)** function. A signer can choose his channel number arbitrarily.

_More info about `channel` could be found here: **[What are multi-channel nonces](../standards/faq/channel-nonce.md)**_

#### Parameters:

| Name      | Type    | Description                                                              |
| :-------- | :------ | :----------------------------------------------------------------------- |
| `signer`  | address | The address of the signer of the transaction.                            |
| `channel` | uint256 | The channel which the signer wants to use for executing the transaction. |

#### Return Values:

| Name    | Type    | Description        |
| :------ | :------ | :----------------- |
| `nonce` | uint256 | The current nonce. |

### executeRelayCall

```solidity
  function executeRelayCall(
    address signedFor,
    uint256 nonce,
    bytes memory data,
    bytes memory signature
  ) public
```

Allows anybody to execute data payload on the **ERC725Account**, given they have a signed message from an executor.

_Triggers the **[Executed](#executed)** event when a call is successfully executed._

#### Parameters:

| Name        | Type    | Description                                       |
| :---------- | :------ | :------------------------------------------------ |
| `signedFor` | address | The KeyManager contract address.                  |
| `nonce`     | uint256 | The nonce of the address that signed the message. |
| `data`      | bytes   | The call data to be executed.                     |
| `signature` | bytes   | The bytes32 ethereum signature.                   |

## Events

### Executed

```solidity
  event Executed(
    uint256 value,
    bytes data
  )
```

_**MUST** be fired when a transaction was successfully executed in **[execute](#execute)** or **[executeRelayCall](#executerelaycall)**._

#### Values:

| Name    | Type    | Description                           |
| :------ | :------ | :------------------------------------ |
| `value` | uint256 | The amount to be sent with call data. |
| `data`  | bytes   | The call data to be executed.         |
