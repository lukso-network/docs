---
title: LSP6 Key Manager
sidebar_position: 4
---

# LSP6KeyManager

The **LSP6KeyManager** is a contract that controls the **[LSP0ERC725Account](./lsp0-erc725-account.md)** contract. It comes with a set of pre-defined permissions for addresses that could range from setting data, executing, changing owner and more as written in the [Permissions Section](../universal-profile/04-lsp6-key-manager.md#-types-of-permissions)\*\* in [LSP6-KeyManager Standard](../universal-profile/04-lsp6-key-manager.md).

:::warning

The current implementation of the Key Manager disallows the **[DELEGATECALL](../universal-profile/04-lsp6-key-manager.md#permissions-value)** operation on the execute function of the linked ERC725Account, because of its potential malicious impact on the account contract.

:::

:::note
**_LSP6KeyManager contract also contains the methods from_ [_ERC165_](https://eips.ethereum.org/EIPS/eip-165) :**

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

:::

## Functions

### constructor

```solidity
constructor(address account)
```

Link the Key Manager to the address of an **LSP0ERC725Account** contract and register **[LSP6KeyManager InterfaceId](./interface-ids.md)** on deployment.

#### Parameters:

| Name      | Type    | Description                                                  |
| :-------- | :------ | :----------------------------------------------------------- |
| `account` | address | The address of the **LSP0ER725Account** contract to control. |

### execute

```solidity
function execute(bytes memory data) public payable returns (bytes memory result)
```

Executes a payload on the **LSP0ERC725Account** contract.

This payload must represent the abi-encoded function call of one of the **LSP0ERC725Account** contract functions: **[`setData(...)`](./lsp0-erc725-account.md#setdata)**, **[`execute(...)`](./lsp0-erc725-account.md#execute)**, or **[`transferOwnership(...)`](./lsp0-erc725-account.md#transferownership)**.

_Triggers the **[Executed](#executed)** event when a call is successfully executed._

#### Parameters:

| Name   | Type  | Description                 |
| :----- | :---- | :-------------------------- |
| `data` | bytes | The payload to be executed. |

#### Return Values:

| Name     | Type  | Description                                                                  |
| :------- | :---- | :--------------------------------------------------------------------------- |
| `result` | bytes | The returned data as ABI-encoded bytes if the call on the account succeeded. |

### getNonce

```solidity
function getNonce(
    address signer,
    uint256 channel
) public view returns (uint256 nonce)
```

Returns the **nonce** that needs to be signed by an allowed key to be passed into the **[`executeRelayCall(...)`](#executerelaycall)** function. A signer can choose his channel number arbitrarily.

_More info about **channel** can be found here: **[What are multi-channel nonces](../faq/channel-nonce.md)**_

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

Allows anybody to execute a payload on the **LSP0ERC725Account**, given they have a signed message from an executor.

_Triggers the **[Executed](#executed)** event when a call is successfully executed._

#### Parameters:

| Name        | Type    | Description                                       |
| :---------- | :------ | :------------------------------------------------ |
| `signedFor` | address | The KeyManager contract address.                  |
| `nonce`     | uint256 | The nonce of the address that signed the message. |
| `data`      | bytes   | The payload to be executed.                       |
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

| Name    | Type    | Description                             |
| :------ | :------ | :-------------------------------------- |
| `value` | uint256 | The amount to be sent with the payload. |
| `data`  | bytes   | The payload to be executed.             |

## References

- [LUKSO Standards Proposals: LSP6 - Key Manager (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)
- [LSP6 KeyManager: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP6KeyManager)
