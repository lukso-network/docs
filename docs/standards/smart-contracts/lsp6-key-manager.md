---
title: LSP6KeyManager
sidebar_position: 5
---

# LSP6KeyManager

:::info Solidity contract

[`LSP6KeyManager.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/main/contracts/LSP6KeyManager/LSP6KeyManager.sol)

:::

The **LSP6KeyManager** is a contract that controls the **[LSP0ERC725Account](./lsp0-erc725-account.md)** contract. It comes with pre-defined permissions for addresses that could range from setting data, executing, changing owner, etc., as written in the [Permissions Section](../universal-profile/lsp6-key-manager.md#-types-of-permissions)\*\* of the [LSP6-KeyManager Standard](../universal-profile/lsp6-key-manager.md).

:::warning

The current implementation of the Key Manager disallows the **[DELEGATECALL](../universal-profile/lsp6-key-manager.md#permissions-value)** operation on the `execute(...)` function of the linked ERC725Account, because of its potential malicious impact on the account contract.

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

Links the KeyManager to the address of an **ERC725** contract.

#### Parameters:

| Name     | Type    | Description                                        |
| :------- | :------ | :------------------------------------------------- |
| `target` | address | The address of the **ERC725** contract to control. |

### target

```solidity
function target() external view returns (address)
```

Returns the address of the account linked to this KeyManager.

This can be a contract that implements:

- [ERC725X](https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725x) only.
- [ERC725Y](https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725y) only.
- any ERC725 based contract (implementing both ERC725X and ERC725Y), like a [ERC725Account](../smart-contracts/lsp0-erc725-account.md).

#### Returns

| Name     | Type    | Description                       |
| -------- | ------- | --------------------------------- |
| `target` | address | the address of the linked account |

### execute

```solidity
function execute(bytes memory payload) public payable returns (bytes memory result)
```

Executes a payload on the linked **LSP0ERC725Account**.

This payload must represent the abi-encoded function call of one of the functions on the linked **LSP0ERC725Account**:

- **[`setData(bytes32,bytes)`](./lsp0-erc725-account.md#setdata)**.
- **[`setData(bytes32[],bytes[])`](./lsp0-erc725-account.md#setdata-array)**.
- **[`execute(uint256,address,uint256,bytes)`](./lsp0-erc725-account.md#execute)**.
- **[`transferOwnership(address)`](./lsp0-erc725-account.md#transferownership)**.
- **[`acceptOwnership()`](./lsp0-erc725-account.md#acceptownership)**.

_Triggers the **[Executed](#executed)** event when a call is successfully executed._

#### Parameters:

| Name      | Type  | Description                 |
| :-------- | :---- | :-------------------------- |
| `payload` | bytes | The payload to be executed. |

#### Return Values:

| Name     | Type  | Description                                                                  |
| :------- | :---- | :--------------------------------------------------------------------------- |
| `result` | bytes | The returned data as ABI-encoded bytes if the call on the account succeeded. |

### execute (Array)

```solidity
function execute(uint256[] calldata values, bytes[] calldata payloads) public payable returns (bytes memory result)
```

Same than `execute(bytes)` but executes a batch of payloads on the linked **LSP0ERC725Account**.

The payloads must represent the abi-encoded function calls of one of the **LSP0ERC725Account** contract functions:

- **[`setData(bytes32,bytes)`](./lsp0-erc725-account.md#setdata)**.
- **[`setData(bytes32[],bytes[])`](./lsp0-erc725-account.md#setdata-array)**.
- **[`execute(uint256,address,uint256,bytes)`](./lsp0-erc725-account.md#execute)**.
- **[`transferOwnership(address)`](./lsp0-erc725-account.md#transferownership)**.
- **[`acceptOwnership()`](./lsp0-erc725-account.md#acceptownership)**.

_Triggers the **[Executed](#executed)** event when a call is successfully executed._

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

```solidity
function getNonce(
    address signer,
    uint128 channel
) public view returns (uint256 nonce)
```

Returns the **nonce** that needs to be signed by an allowed key to be passed into the **[`executeRelayCall(...)`](#executerelaycall)** function. A signer can choose his channel number arbitrarily.

:::note
More info about **channel** can be found here: **[What are multi-channel nonces](../faq/channel-nonce.md)**\_
:::

#### Parameters:

| Name      | Type    | Description                                                              |
| :-------- | :------ | :----------------------------------------------------------------------- |
| `signer`  | address | The address of the signer of the transaction.                            |
| `channel` | uint128 | The channel which the signer wants to use for executing the transaction. |

#### Return Values:

| Name    | Type    | Description        |
| :------ | :------ | :----------------- |
| `nonce` | uint256 | The current nonce. |

### executeRelayCall

```solidity
function executeRelayCall(
    bytes memory signature,
    uint256 nonce,
    bytes memory _calldata
) public
```

Allows anybody to execute a payload on the linked **LSP0ERC725Account**, if they have a signed message from an address with some permissions.

To obtain a valid signature you must do the following:

1. Gather 4 things:

```solidity
bytes memory payload = abi.encodeWithSignature(
    "<Signature of the method that will be executed, e.g. 'setData(bytes32[],bytes[])'>",
    ...[<A comma-separated list of parameters that will be passed to the methods>]
);

// version number for EIP191
uint256 LSP6_VERSION = 6;

// The chain id of the blockchain where the `payload` will be executed
uint256 chainId = block.chainid; // or <The chain id of the blockchain where you will interact with the key manager>

// The address of the key manager (the smart contract where the `payload` will be executed)
address keyManagerAddress = '0x...';

uint256 nonce = ILSP6KeyManager(keyManagerAddress).getNonce(...);
```

2. Once you have gathered these 4 informations, you must encode them using `abi.encodePacked(...)`:

```solidity
bytes memory encodedMessage = abi.encodePacked(
    LSP6_VERSION,
    chainId,
    nonce,
    msg.value,
    payload
);
```

3. After that you can sign the encodedMessage using EIP191, providing the address of the Key Manager (`keyManagerAddress`) as the validator address.

:::info

You can use our tool [eip191-signer.js](../../tools/eip191-signerjs/Classes/EIP191Signer.md#signdatawithintendedvalidator) to do this. It provides convenience functions to do this.

:::

5. To execute the `payload` you would have to do the following:

```solidity
ILSP6KeyManager(keyManagerAddress).executeRelayCall(
    <The signature that you got from step 4.>,
    nonce, // We got it in step 1.
    payload //We got it in step 1.
);
```

_Triggers the **[Executed](#executed)** event when a call is successfully executed._

:::caution

If the `payload` related to the `signature` fails when being executed, `executeRelayCall(...)` will revert the whole transaction and bubble up the error. **The nonce of the signer will not be incremented!**

This might potentially block any future transactions/payloads signed with an incremented nonce in the same channel. If you want to have non-blocking transactions independant from each others, consider signing payloads across multiple channels using **multi channel nonces**.

For more details, see:

- [**LSP6 - Key Manager > Out of order execution**](../universal-profile/lsp6-key-manager.md#out-of-order-execution)
- [**FAQ > What are multi-channel nonces?**](../faq/channel-nonce.md)

:::

#### Parameters:

| Name        | Type    | Description                                       |
| :---------- | :------ | :------------------------------------------------ |
| `signature` | bytes   | The bytes65 EIP191 signature.                     |
| `nonce`     | uint256 | The nonce of the address that signed the message. |
| `_calldata` | bytes   | The payload to be executed.                       |

#### Return Value:

| Name     | Type    | Description                                                                                                                      |
| :------- | :------ | :------------------------------------------------------------------------------------------------------------------------------- |
| `result` | `bytes` | If the payload on the linked **LSP0ERC725Account** was `ERC725X.execute(...)`, the data returned by the external made by the UP. |

### executeRelayCall (Array)

```solidity
function executeRelayCall(
    bytes[] calldata signatures,
    uint256[] calldata nonces,
    uint256[] calldata values,
    bytes[] calldata payloads
) public
```

Same as [`executeRelayCall(bytes,uint256,bytes)`](#executerelaycall), but allows anybody to execute a **batch of payloads** on the linked **LSP0ERC725Account** on behalf of other addresses, as long as the addresses that signed the `payloads` have some permissions.

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

Checks if a signature was signed by an address having at least the **[SIGN](../universal-profile/lsp6-key-manager.md/#permission-values)** permission for this KeyManager, otherwise it will return the failure value.

#### Parameters:

| Name        | Type    | Description                                           |
| :---------- | :------ | :---------------------------------------------------- |
| `hash`      | bytes32 | The hash of the data signed on the behalf of address. |
| `signature` | bytes   | The Owner's signature(s) of the data.                 |

#### Return Values:

| Name         | Type   | Description                                                            |
| :----------- | :----- | :--------------------------------------------------------------------- |
| `magicValue` | bytes4 | The magicValue either `0x1626ba7e` on success or `0xffffffff` failure. |

## Events

### Executed

```solidity
event Executed(
    bytes4 indexed selector,
    uint256 indexed value,
)
```

_**MUST** be fired when a transaction was successfully executed from the **[execute](#execute)** or **[executeRelayCall](#executerelaycall)** function._

#### Values:

| Name       | Type      | Description                                                                         |
| :--------- | :-------- | :---------------------------------------------------------------------------------- |
| `selector` | `bytes4`  | The selector of the function executed on the linked [`target()`](#target) contract. |
| `value`    | `uint256` | The amount to be sent with the payload.                                             |

## References

- [LUKSO Standards Proposals: LSP6 - Key Manager (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)
- [LSP6 KeyManager: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/contracts/LSP6KeyManager)
