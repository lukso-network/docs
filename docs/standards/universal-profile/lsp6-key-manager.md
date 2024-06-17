---
sidebar_label: 'LSP6 - Key Manager'
sidebar_position: 6
description: LUKSO's LSP6 - Key Manager for controlling a LUKSO LSP0ERC725Account.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LSP6 - Key Manager

:::info Standard Document

[LSP6 - Key Manager](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)

:::

> **Goals:**
>
> - Enables control via multiple permissioned addresses called “controllers”
> - Allows multiple controllers to interact with LSP 0 ERC 725 Account

LSP6 - Key Manager, acts as the brain behind Universal Profiles, enabling sophisticated access control and interactions. Imagine having a digital identity that can interact with other contracts, manage assets, or even delegate actions without exposing your main account. This is where the Key Manager shines, serving as a permissioned gateway.

Here's how it works: You have a Universal Profile, essentially a smart contract account on the blockchain. This account can hold assets, manage permissions, and interact with other contracts. However, by itself, it's like a locked treasure chest. The Key Manager is the key to this chest, allowing specific actions to be performed by those you trust.

For instance, you can set permissions for different addresses, allowing them to perform specific actions such as sending transactions, managing assets, or setting data within your Universal Profile. This flexibility means you can have secure, controlled interactions on the blockchain, paving the way for more complex and secure applications.

## Introduction

An [LSP0ERC725Account](./../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md) on its own comes with limited usability. Since it is an **owned contract**, only the account's owner can write data into it or use it to interact with other smart contracts.

Here comes the Key Manager. A smart contract that controls a LSP0ERC725Account, acting as its new owner. It functions as a gateway for the **account** contract and allows not only one main contract owner but multiple **controllers** to interact with the LSP0ERC725Account.

> **What is a _"controller"_?**
>
> in the LSP6 Key Manager, the term _"controller"_ refers to a **permissioned address**. These addresses **have [permissions](#permissions) that allow them to perform certain actions on the LSP0ERC725Account** linked with the Key Manager (e.g., setting data or transferring LYX from the account).
>
> Controllers can be Externally Owned Accounts (EOA) or smart contracts. The Key Manager will allow or restrict access based on the permissions set for the calling `address`.

Controllers can interact directly with the Key Manager or [sign messages that can then be executed by any other parties](#relay-execution) (such as users or relay services).

:x: &nbsp; **Without a Key Manager**, only the LSP0ERC725Account's owner can use its Account.

:white_check_mark: &nbsp; **With a Key Manager** attached to an LSP0ERC725Account, other addresses (EOAs or contracts) can use an Account on behalf of its owner.

![LSP6 Key Manager overview allowed](/img/standards/lsp6/lsp6-key-manager-overview-allowed.jpeg)

![LSP6 Key Manager overview not allowed](/img/standards/lsp6/lsp6-key-manager-overview-not-allowed.jpeg)

Permissions for addresses are not stored on the Key Manager. Instead, they are **stored inside the data key-value store of the LSP0ERC725Account** linked to the Key Manager. This way, it is possible to easily **upgrade** the Key Manager without resetting all the permissions again.

---

## Permissions

:::tip

You can use the [`encodePermissions(...)`](../../../../tools/erc725js/methods#encodepermissions) and [`decodePermissions(...)`](../../../../tools/erc725js/methods#decodepermissions) functions from the [_erc725.js_](../../../../tools/erc725js/getting-started) tool to easily **encode and decode permissions values** or **combine multiple permissions together**.

:::

:::info Best Practices

While the Key Manager allows for a very fine-grained control over the Universal Profile (_eg: `CALL` permission combined with [`AllowedCalls`](#allowed-calls), `SETDATA` permission combined with [`AllowedERC725YDataKeys`](#allowed-erc725y-data-keys)_), it also allows for a very coarse-grained control over the Universal Profile, due to the [`SUPER`](#super-permissions) permissions. This makes the Key Manager very flexible, but that flexibility comes with a slightly higher responsibility from the users.

**Good practices:**

1. Split the permissions over the Universal Profile accross different devices, hardware wallets or a combination of both.
2. Make sure to double or triple check when granting permissions to 3rd parties (other Universal Profiles, DApps, etc.).

:::

![LSP6 permissions](/img/standards/lsp6/lsp6-permissions.jpg)

Click on the toggles below to **learn more about the features enabled by each permission**.

<details>
    <summary><code>CHANGEOWNER</code> - Allows changing the owner of the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000001</code>
    </p>

The `CHANGEOWNER` permission enables to change the owner of the linked ERC725Account.
Using this permission, you can easily upgrade the [`LSP6KeyManager`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md) attached to the Account by transferring ownership to a new Key Manager.

</details>

<details>
    <summary><code>ADDCONTROLLER</code> - Allows giving permissions to new controller addresses.</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000002</code>
    </p>

The `ADDCONTROLLER` permission enables to grant permissions to new addresses that did not have any permissions before. This allows to add new permissioned addresses (controllers) that can then interact with or use the linked ERC725Account.

The `ADDCONTROLLER` permission is needed to:

- Give a new address some permission(s) by setting its permissions under `AddressPermissions:Permissions:<controller-address>` (this is also refered to _"adding a new controller"_)
- Add a new controller address in the list of `AddressPermissions[index]` at a specific `index`.
- Increase the length of the `AddressPermissions[]` Array length (to describe that a new controller has been added).

![ADD Permissions](/img/standards/lsp6/lsp6-add-permissions.jpeg)

</details>

<details>
    <summary><code>EDITPERMISSIONS</code> - Allows changing existing permissions of controllers.</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000004</code>
    </p>

:::caution Caution:
Be aware that a controller with `EDITPERMISSIONS` can also edit its own permissions!
:::

This permission allows for **editing permissions** of any controller (permissioned address) that has some permissions already set on the ERC725Account (including itself, see warning above).

The `EDITPERMISSIONS` is also needed to:

- 🗑️ **Remove** a controller from the list of `AddressPermissions[]`, meaning:
  - removing the controller `address` at a specific index in `AddressPermissions[index]`
  - decreasing the `AddressPermissions[]` Array length (to describe that a controller has been removed).
- 🖊️ **Edit** an entry in the `AddressPermissions[index]` Array, meaning changing the address stored at a specific index.

![EDIT Permissions](/img/standards/lsp6/lsp6-change-permissions.jpeg)

Bear in mind that the behavior of `EDITPERMISSIONS` slightly varies depending on the new permissions value being set (see figure below).

![EDIT Permissions](/img/standards/lsp6/lsp6-change-permissions-variants.jpeg)

</details>

<details>
    <summary><code>ADDEXTENSIONS</code> - Allows adding new extension contracts on the linked ERC725Account.</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000008</code>
    </p>

The `ADDEXTENSIONS` permission enables the addition of new LSP17 extension contracts for specific function selectors to be called when the account is called with a function that does not exist natively in its public interface. The `fallback` function of the linked ERC725Account will handle the call to the extension set for the function selector being called.

</details>

<details>
    <summary><code>CHANGEEXTENSIONS</code> - Allows editing the address for an extension contract on the linked ERC725Account.</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000010</code>
    </p>

The `CHANGEEXTENSIONS` permission enables editing LSP17 extension contract addresses for function selectors already set in the account. The LSP17 extension will be called when the account is called with a function that does not exist natively in its public interface. The `fallback` function of the linked ERC725Account will handle the call to the extension set for the function selector being called.

</details>

<details>
    <summary><code>ADDUNIVERSALRECEIVERDELEGATE</code> - Allows adding new LSP1UniversalReceiverDelegate contracts addresses.</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000020</code>
    </p>

The `ADDUNIVERSALRECEIVERDELEGATE` permission enables to add new LSP1UniversalReceiverDelegate extension contracts for specific [Type IDs](../generic-standards/lsp1-universal-receiver.md#what-does-this-standard-represent) when no contracts extension was initially set up for a specific Type ID.

See [**LSP1 Universal Receiver > extension**](../generic-standards/lsp1-universal-receiver.md#extension) for more details.

> **NB** this permission also enables to set the address of the default LSP1UniversalReceiverDelegate contract under the `LSP1UniversalReceiverDelegate` data key if no address was set in the first place.

</details>

<details>
    <summary><code>CHANGEUNIVERSALRECEIVERDELEGATE</code> - Allows editing LSP1UniversalReceiverDelegate contracts addresses.</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000040</code>
    </p>

The `CHANGEUNIVERSALRECEIVERDELEGATE` permission enables two things:

1. edit the address of the default LSP1UniversalReceiverDelegate contract (linked under the `LSP1UniversalReceiverDelegate` data key).
2. edit the addresses of the LSP1UniversalReceiverDelegate extension contracts linked to specific Type IDs.

See [**LSP1 Universal Receiver > extension**](../generic-standards/lsp1-universal-receiver.md#extension) for more details.

</details>

<details>
    <summary><code>REENTRANCY</code> - Allows reentering during an execution</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000080</code>
    </p>

The permission `REENTRANCY` enables a controller to execute a payload during the execution of another payload.

Depending on if the controller is an EOA or a contract:

- A contract would reenter by using `execute(..)`
- an EOA would do that through `executeRelayCall(..)`.

_Example:_

One of the best uses for this permission is the following scenario:

1. The ERC725Acccount linked to the Key Manager makes an external call to a _contract A_.
2. _Contract A_ will make some internal updates using the received data.
3. The _contract A_ will then call back the ERC725Account **(via the Key Manager)** with another payload that will update the account storage.

![REENTRANCY Permission 1](/img/standards/lsp6/lsp6-reentrancy-example-1.jpeg)
![REENTRANCY Permission 2](/img/standards/lsp6/lsp6-reentrancy-example-2.jpeg)

In order for that interaction to happen the contract A must have the `REENTRANCY` permission.

</details>

<details>
    <summary><code>TRANSFERVALUE</code> - Allows to transfer native tokens from the linked ERC725Account's balance <strong>with restrictions</strong>.</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000200</code>
    </p>

The `TRANSFERVALUE` permission enables to transfer the native tokens from the linked ERC725Account's balance **with restrictions**.

1. to specific addresses (EOAs or contracts).
2. to contracts implementing specific type of _interfaces standards_, that can be detected using ERC165 interfaces IDs.

Such restrictions can be applied using the LSP6 data `AddressPermissions:AllowedCalls:<address>`, where `<address>` is the address of the controller that has the `TRANSFERVALUE` permission.

<br/>

> **Note:** For simple native token transfers, no data (`""`) should be passed to the fourth parameter of the [`execute`](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#execute) function of the Account contract. For instance: `account.execute(operationCall, recipient, amount, "")`
>
> The caller will need the permission `CALL` to send any data along the LYX transfer.

</details>

<details>
    <summary><code>CALL</code> - Allows to use the linked ERC725Account to interact with contracts <strong>with restrictions</strong>.</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000800</code><br/>
    </p>

The `CALL` permission enables to use the linked ERC725Account to call functions on contracts deployed on the network **with restrictions**.

1. to specific contract addresses (contracts).
2. to contracts implementing specific type of _interfaces standards_, that can be detected using ERC165 interfaces IDs.

It uses the `CALL` opcode, which allows to change states on the called contract.

</details>

<details>
    <summary><code>STATICCALL</code> - Allows calling other contracts through the controlled contract <strong>with restrictions</strong></summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000002000</code><br/>
    </p>

This permission enables the ERC725Account linked to Key Manager to make external calls to contracts while disallowing state changes at the address being called.

It uses the [STATICCALL](https://eips.ethereum.org/EIPS/eip-214) opcode when performing the external call.

> **NB:** If any state is changed at a target contract through a `STATICCALL`, the call will **revert silently**.

</details>

<details>
    <summary><code>DELEGATECALL</code> - Allows delegate calling other contracts through the controlled contract <strong>with restrictions</strong></summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000008000</code>
    </p>

This permission allows executing code and functions from other contracts in the UP context.

:::danger

**`DELEGATECALL`** is currently disallowed (even if set on the KeyManager) because of its dangerous nature, as vicious developers can execute some malicious code in the linked Account contract.

:::

</details>

<details>
    <summary><code>DEPLOY</code> - Allows deploying other contracts through the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000010000</code>
    </p>

The permission `DEPLOY` enables the controller to use the linked ERC725Account to deploy new smart contracts (the linked account will act as the deployer of the new contract).

Developers should provide the contract's bytecode to be deployed in the payload (ABI-encoded) passed to the Key Manager.

> Both the `CREATE` or [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) opcodes can be used to deploy a contract.

</details>

<details>
    <summary><code>SETDATA</code> - Allows setting data on the controlled contract <strong>with restrictions</strong></summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000040000</code>
    </p>

The permission `SETDATA` allows a controller to write any form of data in the [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) data key-value store of the linked `ERC725Account`.

However, this permission restricts the controller to set data for only specific data keys set via **[allowed ERC725Y Data Keys](#allowed-erc725y-keys)**

:::info

A controller with permission `SETDATA` cannot set or edit data keys related to:

- permissions: requires the permission of `ADDCONTROLLER` or `EDITPERMISSIONS`.
- LSP1 data keys: requires the permission of `ADDUNIVERSALRECEIVERDELEGATE` or `CHANGEUNIVERSALRECEIVERDELEGATE`.
- LSP17 data keys: requires the permission of `ADDEXTENSIONS` or `CHANGEEXTENSIONS`.

:::

</details>

<details>
    <summary><code>ENCRYPT</code>: Allows encrypting data or messages on behalf of the controlled account</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000080000</code>
    </p>

Developers can use the `ENCRYPT` permission to encrypt data or messages, for instance for private messaging.

</details>

<details>
    <summary><code>DECRYPT</code>: Allows decrypting data or messages on behalf of the controlled account</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000100000</code>
    </p>

Developers can use the `DECRYPT` permission to decrypt data or messages, for instance for private messaging.

</details>

<details>
    <summary><code>SIGN</code>: Allows signing on behalf of the controlled account, for example for login purposes</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000200000</code>
    </p>

The permission `SIGN` enables a controller to authenticate on behalf of the UP. It can be used primarily in Web 2.0 apps to [sign login messages](../../learn/universal-profile/connect-profile/siwe.md).

</details>

<details>
    <summary><code>EXECUTE_RELAY_CALL</code>: Enables a controller's signed relay calls to be executable</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000400000</code>
    </p>

The permission `EXECUTE_RELAY_CALL` enables a controller's signed relay calls to be executable. This permission will be checked against the controller that signed the relay call.

</details>

### SUPER Permissions

The super permissions grant the same permissions as their non-super counterparts, with the difference being that the checks on restrictions for [**Allowed Calls**](#allowed-calls) and [**Allowed ERC725Y Data Keys**](#allowed-erc725y-data-keys) are _skipped_.

The skip allows for cheaper transactions, whether these restrictions are set or not.

<details>
    <summary><code>SUPER_TRANSFERVALUE</code></summary>
     <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000100</code>
    </p>

Same as `TRANSFERVALUE`, but allowing to send native tokens to any `address` (EOA or contract). This will also not check for [**Allowed Calls**](#allowed-calls) when transferring value to contracts.

</details>

<details>
    <summary><code>SUPER_CALL</code></summary>
     <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000400</code>
    </p>

Same as `CALL`, but it allows interacting with any contract. This will not check if the controller has any [**Allowed Calls**](#allowed-calls) restrictions set.

</details>

<details>
    <summary><code>SUPER_STATICCALL</code></summary>
     <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000001000</code>
    </p>

Same as `STATICCALL`, but it allows interacting with any contract. This will not check if the controller has any [**Allowed Calls**](#allowed-calls) restrictions set.

</details>

<details>
    <summary><code>SUPER_DELEGATECALL</code></summary>
     <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000004000</code>
    </p>

Same as `DELEGATECALL`, but allows interacting with any contract. This will not check if the controller has any [**Allowed Calls**](#allowed-calls) restrictions set.

</details>

<details>
    <summary><code>SUPER_SETDATA</code></summary>
     <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000020000</code>
    </p>

Same as `SETDATA`, but allowing to set any ERC725Y data keys. This will not check for [**Allowed ERC725Y Data Keys**](#allowed-erc725y-data-keys) if caller has any restrictions.

</details>

:::caution

Use with caution: If the controller address has [**Allowed Calls**](#allowed-calls) or [**Allowed ERC725Y Data Keys**](#allowed-erc725y-data-keys) restrictions set, they will be ignored.

:::

### Combining Permissions

Permissions can be combined if a controller needs more than one permission. To do so:

1. calculate the sum of the decimal value of each permission.
2. convert the result back into hexadecimal.

<details>
    <summary>Example</summary>

<Tabs>
<TabItem value="example1" label="Example 1" default>

```solidity
permissions: CALL + TRANSFERVALUE

  0x0000000000000000000000000000000000000000000000000000000000000800 (2048 in decimal)
+ 0x0000000000000000000000000000000000000000000000000000000000000200 (512)
---------------------------------------------------------------------
= 0x0000000000000000000000000000000000000000000000000000000000000a00 (= 2560)
```

</TabItem>
<TabItem value="example2" label="Example 2">

```solidity
permissions: EDITPERMISSIONS + SETDATA

  0x0000000000000000000000000000000000000000000000000000000000000004 (4 in decimal)
+ 0x0000000000000000000000000000000000000000000000000000000000040000 (262144)
---------------------------------------------------------------------
= 0x0000000000000000000000000000000000000000000000000000000000040004 (= 262148)
```

</TabItem>

</Tabs>

</details>

---

### Retrieving list of controllers

:::tip

The convenience function [`getData(...)`](../../tools/erc725js/methods.md#getdata) from [_erc725.js_](../../../../tools/erc725js/getting-started) will return you the whole list of controllers when providing the `AddressPermission[]` array data key as a parameter.

:::

You can obtain the list of controllers that have some permissions on the linked ERC725Account by reading the `AddressPermission[]` data key via [`getData(...)`](../../contracts/contracts/ERC725/ERC725.md#getdata).

- **key:** `0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3`
- **value return:** the total number of address that have some permissions set (= array length)

Each controller can be retrieved by accessing each index in the array (see [LSP2 > Array docs](../generic-standards/lsp2-json-schema.md#array) and [LSP2 > Array Standard specs](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#array) for more detailed instructions).

```json
{
  "name": "AddressPermissions[]",
  "key": "0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3",
  "keyType": "Array",
  "valueType": "address",
  "valueContent": "Address"
}
```

![AddressPermissions array - list of addresses with permissions](/img/standards/lsp6/lsp6-address-permissions-array.jpeg)

_example:_

_if the `AddressPermission[]` array data key returns `0x0000000000000000000000000000000000000000000000000000000000000004` (array length = 4), each controller can be obtained by reading the value under the following data keys:_

- _`0xdf30dba06db6a30e65354d9a64c6098600000000000000000000000000000000`: 1st controller (array index 0 = `AddressPermissions[0]`)_
- _`0xdf30dba06db6a30e65354d9a64c6098600000000000000000000000000000001`: 2nd controller (array index 1 = `AddressPermissions[1]`)_
- _`0xdf30dba06db6a30e65354d9a64c6098600000000000000000000000000000002`: 3rd controller (array index 2 = `AddressPermissions[2]`)_
- _`0xdf30dba06db6a30e65354d9a64c6098600000000000000000000000000000003`: 4th controller (array index 3 = `AddressPermissions[3]`)_

## Types of permissions

| Permission Type                                        | Description                                                                                                                                                                                               | `bytes32` data key                    |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| [**Address Permissions**](#address-permissions)        | defines a set of [**permissions**](#permissions) for a controller.                                                                                                                                        | `0x4b80742de2bf82acb3630000<address>` |
| [**Allowed Calls**](#allowed-calls)                    | defines a set of interactions (action + address + function + standard) allowed for a controller.                                                                                                          | `0x4b80742de2bf393a64c70000<address>` |
| [**Allowed ERC725Y Data Keys**](#allowed-erc725y-keys) | defines a list of ERC725Y Data Keys a controller is only allowed to set via [`setData(...)`](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#setdata-array) on the linked ERC725Account. | `0x4b80742de2bf866c29110000<address>` |

> [See LSP6 for more details](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#erc725y-data-keys)

The values set under these permission data keys **MUST be of the following format** to ensure correct behavior of these functionalities.

- **Address Permissions**: a `bytes32` value.
- **Allowed Calls**: a [CompactBytesArray](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#bytescompactbytesarray) of the tuple `(bytes4,address,bytes4,bytes4)`.
- **Allowed ERC725Y Data Keys**: a [CompactBytesArray](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#bytescompactbytesarray) of bytes, containing values from `bytes1` to `bytes32`.

:::caution

To **add or remove entries in the list of allowed calls or ERC725Y Data Keys**, the **whole compact bytes array** should be encoded again and reset. Each update **overrides the entire previous state**. Note that this process can be expensive in gas, depending on the total number of allowed calls.

:::

### Address Permissions

A controller can hold one (or more) permissions, enabling it to perform multiple _"actions"_ on an ERC725Account. Such _"actions"_ include **setting data**, **calling other contracts**, **transferring native tokens**, etc.

To grant permission(s) to a controller, set the following data key-value pair in the [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) storage of the ERC725Account linked to the Key Manager.

- **key:** `0x4b80742de2bf82acb3630000<address>`
- **value:** one of the available permission below. To give multiple permission, see the Combining permissions section.

> **NB:** remember to remove the `0x` prefix in the `<address>` field above.

```json
{
  "name": "AddressPermissions:Permissions:<address>",
  "key": "0x4b80742de2bf82acb3630000<address>",
  "keyType": "MappingWithGrouping",
  "valueType": "bytes32",
  "valueContent": "BitArray"
}
```

![Address Permissions range](/img/standards/lsp6/lsp6-address-permissions.jpg)

:::danger

**Granting permissions to the linked ERC725Account itself is dangerous! **

A caller can craft a payload via `ERC725X.execute(...)` to be sent back to the KeyManager, leading to potential re-entrancy attacks.

Such transaction flow can lead an initial caller to use more permissions than allowed initially by re-using the permissions granted to the linked ERC725Account's address.

:::

:::caution

Each permission MUST be **exactly 32 bytes long** and **zero left-padded**:

- `0x0000000000000000000000000000000000000000000000000000000000000008` ✅
- `0x0800000000000000000000000000000000000000000000000000000000000000` ❌

For instance, if you try to set the permission TRANSFERVALUE for an address as `0x08`, this will be stored internally as `0x0800000000000000000000000000000000000000000000000000000000000000`.

Ensure the `bytes32` value set under the permissions are correct according to these rules, to prevent incorrect or unexpected behaviour and errors.

:::

---

### Allowed Calls

You can restrict a controller permission (`CALL`/`TRANSFERVALUE`/etc..) to be valid with specific:

<details>
    <summary>Call Types</summary>

Below is the list of Call Types and their possible combination.

| call type       | value        |
| --------------- | ------------ |
| `TRANSFERVALUE` | `0x00000001` |
| `CALL`          | `0x00000002` |
| `STATICCALL`    | `0x00000004` |
| `DELEGATECALL`  | `0x00000008` |

</details>

<details>
    <summary>Addresses</summary>

|                   Address                    |                     Meaning                     |
| :------------------------------------------: | :---------------------------------------------: |
| `0xffffffffffffffffffffffffffffffffffffffff` |    Interaction with any address is allowed.     |
|               Other addresses                | Interaction with a specific address is allowed. |

</details>

<details>
    <summary>Standards</summary>

These contracts MUST implement the [ERC165](https://eips.ethereum.org/EIPS/eip-165) standard to be able to detect their interfaces.

|    Interface ID     |                     Meaning                      |
| :-----------------: | :----------------------------------------------: |
|    `0xffffffff`     |    Interaction with any standard is allowed.     |
| Specific interfaces | Interaction with a specific standard is allowed. |

</details>

<details>
    <summary>Functions</summary>

|    Function Selector     |                     Meaning                      |
| :----------------------: | :----------------------------------------------: |
|       `0xffffffff`       |    Interaction with any function is allowed.     |
| Other function selectors | Interaction with a specific function is allowed. |

</details>

To restrict a controller to a specific set of calls, set the following data key-value pair in the [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) storage of the ERC725Account linked to the Key Manager.

- **key:** `0x4b80742de2bf393a64c70000<controller-address>`
  - where `<address>` is the controller `address`
- **possible values:**
  - `(bytes4,address,bytes4,bytes4)[CompactBytesArray]`: a [**CompactBytesArray**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#bytescompactbytesarray) of tuple which described the allowed call (_call type_ + _address_ + _standard_ + _function_). **See details below for each element of the tuple**.
  - `0x` (empty): if the value is an **empty byte** (= `0x`), the controller is not allowed to interact with any functions, address or standards (**= all calls are disallowed**).

Each entry in the CompactBytesArray is an **Allowed Call**. An Allowed Call is represented by a tuple of `(bytes4,address,bytes4,bytes4)`, where each value in the tuple corresponds to the following:

1. `bytes4` (**call type**) = the call type(s) allowed for this allowed call (`TRANSFERVALUE`, `CALL`, `STATICCALL` and `DELEGATECALL`).
2. `address` (**address**) = the address of an EOA or a contract. Can be used to restrict only to interact with a specific address.
3. `bytes4` (**standard**) = the ERC165 interface ID of a standard interface. Can be used to specify the _"type of contract"_ allowed to interact with.
4. `bytes4` (**function**) = a bytes4 function selector. Can be used to restrict a controller to call only a specific function on a contract.

If you want to have multiple different interactions, you MUST add each of the desired interaction in the [**CompactBytesArray**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#bytescompactbytesarray) of AllowedCalls. Keep in mind that the length for each element in the [**CompactBytesArray**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#bytescompactbytesarray) must be **32** = **`0x0020`**, because the tuple `(bytes4,address,bytes4,bytes4)` makes up 32 bytes in total.

<details>
    <summary><strong>Example 1:</strong> allow only to <code>CALL</code> a specific LSP0 at a specific address</summary>

To allow a controller to only do `CALL` to any function on a LSP0ERC725Account (interface ID `0x3e89ad98`) deployed at address `0xCA41e4ea94c8fA99889c8EA2c8948768cBaf4bc0`, the following value for the CompactBYytesArray of allowed calls will be used:

`0x002000000002CA41e4ea94c8fA99889c8EA2c8948768cBaf4bc03e89ad98ffffffff`

Where:

- _element length_: `0x0020` (= 32 bytes)
- _Permission_: **CALL**, **0x00000002**;
- _Standard_: **LSP0 interface ID = `0x3e89ad98`**;
- _Address_: **`0xCA41e4ea94c8fA99889c8EA2c8948768cBaf4bc0`**;
- _Function_: **any**;

</details>

<details>
    <summary><strong>Example 2:</strong> allow multiple interactions of different types</summary>

Consider the scenario where you want to give the following permissions to a controller:

- allow to `CALL` any functions (as well as transferring value `TRANSFERVALUE`) to a LSP0 contract deployed at address `0xCA41e4ea94c8fA99889c8EA2c8948768cBaf4bc0`.
- allow to `CALL` only the `transfer(address,address,uint256,bool,bytes)` function on the contract deployed at address `0xF70Ce3b58f275A4c28d06C98615760dDe774DE57`.
- allow to do `STATICCALL`s to any functions on the contract deployed at address `0xd3236aa1B8A4dDe5eA375fd1F2Fb5c354e686c9f`.

The CompactBytesArray of allowed calls for this controller will be composed of the following entries:

- `AllowedCalls[0]` = the 1st value in the CompactBytesArray will be **`0x002000000002CA41e4ea94c8fA99889c8EA2c8948768cBaf4bc03e89ad98ffffffff`**.

  - _Permission_: **CALL and TRANSFERVALUE**, **0x00000003**;
  - _Standard_: **LSP0 interface ID = `0x3e89ad98`**;
  - _Address_: **`0xCA41e4ea94c8fA99889c8EA2c8948768cBaf4bc0`**;
  - _Function_: **any**;

- AllowedCalls[1] = the 2nd value in the CompactBytesArray will be **`0x002000000003F70Ce3b58f275A4c28d06C98615760dDe774DE57ffffffff760d9bba`**.

  - _Permission_: **CALL**, **0x00000002**;
  - _Standard_: **any**;
  - _Address_: **`0xF70Ce3b58f275A4c28d06C98615760dDe774DE57`**;
  - _Function_: **transfer(address,address,uint256,bool,bytes), `0x760d9bba`**;

- AllowedCalls[2] = the 3rd value in the CompactBytesArray will be **`0x002000000004d3236aa1B8A4dDe5eA375fd1F2Fb5c354e686c9fffffffffffffffff`**
  - _Permission_: **STATICCALL**, **0x00000004**;
  - _Standard_: **any**;
  - _Address_: **`0xd3236aa1B8A4dDe5eA375fd1F2Fb5c354e686c9f`**;
  - _Function_: **any**;

A _CompactBytesArray_ for these 3 interactions would look like this:
`0x`**`0020`**`00000003CA41e4ea94c8fA99889c8EA2c8948768cBaf4bc03e89ad98ffffffff`**`0020`**`00000002F70Ce3b58f275A4c28d06C98615760dDe774DE57ffffffff760d9bba`**`0020`**`00000004d3236aa1B8A4dDe5eA375fd1F2Fb5c354e686c9fffffffffffffffff`

</details>

```json
{
  "name": "AddressPermissions:AllowedCalls:<address>",
  "key": "0x4b80742de2bf393a64c70000<address>",
  "keyType": "MappingWithGrouping",
  "valueType": "(bytes4,address,bytes4,bytes4)[CompactBytesArray]",
  "valueContent": "(BitArray,Address,Bytes4,Bytes4)"
}
```

![LSP6 Allowed Calls Overview](/img/standards/lsp6/lsp6_allowed_calls_example.jpg)

:::warning

Allowing a specific standard does not offer security over the inner workings or the correctness of a smart contract. It should be used more as a "mistake prevention" mechanism than a security measure.

:::

:::info

**If no Allowed Calls are set (`0x`), a controller cannot interact with any address nor transfer any value (Contract or EOA).**

:::

---

### Allowed ERC725Y Data Keys

If a controller is allowed to [`SETDATA`](#permissions) on an ERC725Account, it is possible to restrict which data keys this address can set or update.

To restrict a controller to only be allowed to set the key `LSP3Profile` (`0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5`), the following data key-value pair can be set in the ERC725Y contract storage. Encode data as a [**CompactBytesArray**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#bytescompactbytesarray).

- **key:** `0x4b80742de2bf866c29110000<address>`
- **value(s):** `0x00205ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5`

<details>
    <summary>ERC725Y Data Keys: fixed-size vs dynamic-size</summary>

Introduction (summary)
You can set 2 types of **ERC725Y Data Keys**:

- _Fixed-size Data Keys_

A **fixed-size Data Key** is a data key with a fixed length of 32 bytes. If a _controller address_ has a fixed-size allowed ERC725Y data key set, then that _controller_ can only change the value of that specific fixed-size data key.

- _Dynamic-size Data Keys_

A **dynamic-size Data Key** is a data key with a variable length from 1 byte up to 31 bytes. If a _controller_ has a dynamic-size allowed ERC725Y data key set, then that _controller_ can change any data key that starts with the _dynamic-size data key_.

_**Examples:**_

- _Fixed-size Data Keys_

Let's imagine the following situation, you set an **Allowed ERC725Y fixed-size Data Key** (e.g. `0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5`) for a controller (e.g. Alice).
With that setup you allowed Alice to update only the value of the **Allowed ERC725Y Data Key**.

![LSP6 Allowed ERC725Y Data Keys, Fixed-Size Key](/img/standards/lsp6/lsp6_allowed_erc725y_data_keys_fixed_key.jpeg)

- _Dynamic-size Data Keys_

Let's imagine the following situation: You set an **Allowed ERC725Y dynamic-size Data Key** (e.g., `0xbeefbeefbeefbeef`) for a controller (e.g., Bob).
With that setup you allowed Bob to set any **Data Key** that starts with `0xbeefbeefbeefbeef`.

E.g:

- `0xbeefbeefbeefbeefcafecafecafecafecafecafecafecafecafecafecafecafe`
- `0xbeefbeefbeefbeef0000000000000000000000000000000000000000c629dfa8`
- `0xbeefbeefbeefbeef000000000000000000000000000000000000000000001253`

![LSP6 Allowed ERC725Y Data Keys, Dynamic-Size Key](/img/standards/lsp6/lsp6_allowed_erc725y_data_keys_dynamic_key.jpeg)

</details>

<details>
    <summary>Combining multiple ERC725Y Data Keys</summary>

If you want to have multiple different ERC725Y data keys allowed, you MUST add each of the desired data keys to a [**CompactBytesArray**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#bytescompactbytesarray).

E.g.:

- `0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5` (**length: 32 bytes** = `0x0020`)
- `0x5ef83ad9559033e6e941db7d7c495acd` (**length: 16 bytes** = `0x0010`)
- `0xbeefbeef` (**length: 4 bytes** = `0x0004`)

A CompactBytesArray for these 3 different ERC725Y Data Keys would look like this: `0x`**`0020`**`5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5`**`0010`**`5ef83ad9559033e6e941db7d7c495acd`**`0004`**`beefbeef`

</details>

```json
{
  "name": "AddressPermissions:AllowedERC725YDataKeys:<address>",
  "key": "0x4b80742de2bf866c29110000<address>",
  "keyType": "MappingWithGrouping",
  "valueType": "bytes32[CompactBytesArray]",
  "valueContent": "Bytes32"
}
```

Below is an example use case. An ERC725Account can allow some applications to add/edit informations on its storage via `setData(...)`. The account can restrict such Dapps and protocols to edit the data keys that are only relevant to the logic of their applications.

![LSP6 Allowed ERC725YDataKeys overview](/img/standards/lsp6/lsp6-allowed-erc725ydatakeys-overview.jpeg)

As a result, this provide context for the Dapp on which data they can operate on the account, while preventing them to edit other information, such as the account metadata, or data relevant to other dapps.

![LSP6 Allowed ERC725YDataKeys overview](/img/standards/lsp6/lsp6-allowed-erc725ydatakeys-example-allowed.jpeg)

![LSP6 Allowed ERC725YDataKeys overview](/img/standards/lsp6/lsp6-allowed-erc725ydatakeys-example-denied-1.jpeg)

![LSP6 Allowed ERC725YDataKeys overview](/img/standards/lsp6/lsp6-allowed-erc725ydatakeys-example-denied-2.jpeg)

:::info

**If no Allowed ERC725Y Data Keys are set, the controller cannot set any value for any key.**

:::

---

## Types of Execution

There are 3 ways to interact with the ERC725Account linked with the Key Manager.

- **direct execution**: the controller is the caller (`msg.sender`) and sends a **payload** to the Key Manager directly (= abi-encoded function call on the linked ERC725Account) to the KeyManager via [`execute(...)`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#execute).
- **relay execution**: a controller **A** signs a payload and an executor `address` **B** (_e.g. a relay service_) executes the payload on behalf of the signer via [`executeRelayCall(...)`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#executerelaycall).
- **LSP20-CallVerification execution**: Interaction with the ERC725Account can be done directly, in accordance with the LSP20-CallVerification standard. The LSP6 Key Manager supports this standard, allowing anyone to call the LSP0ERC725Account. If the caller is not the owner of the ERC725Account, the call will be forwarded to the LSP20 functions of the Key Manager. These functions will verify the necessary permissions and emit the relevant event.

The main difference between direct vs relay vs LSP20-CallVerification execution is that with direct execution, the controller address is the actual address making the request + paying the gas cost of the execution. With relay execution, a signer address (a controller) can interact with the ERC725Account without paying a gas fee. And with LSP20-CallVerification execution, calls can be made directly to the ERC725Account, with permissions verified by the LSP20 functions of the Key Manager.

![Direct vs Relay Execution](/img/standards/lsp6/lsp6-direct-vs-relay-execution.jpeg)

### Gas-Less Transactions

:::info Best Practices

While gas-less transactions / relay-execution is a very convenient way of using your Universal Profile to surf the blockchain, it comes with its risks.

- A relay call does not enforce a gas price to execute a transaction, meaning a Relay Service can potentially send your transaction with a lower gas price in order to cut costs which might take a long time to execute.
- A Relay Service can also frontrun your transaction.

**Best practices:**

- Make sure to only use audited, transparent, community trusted Relay Services that have passed the test of time.
- Stay away from Relay Services that try to acquire users by offering cheaper prices. In the end any Relay Service must have a business model in order to work. If it does not profit from users it profits from other ways, might be shady or not.

:::

Relay execution enables users to interact with smart contracts on the blockchain **without needing native tokens** to pay for transaction fees. This allows a better onboarding experience for users new to cryptocurrencies and blockchain.

Relay execution minimizes **UX friction** for dapps, including removing the need for users to worry about gas fee, or any complex steps needed to operate on blockchains (KYC, seedphrases, gas).

Dapps can then leverage the relay execution features to create their own business model around building their own **relay service**, smart contracts solution on top of the Key Manager to pay with their tokens, or agree with users on payment methods including subscriptions, ads, etc ..

![LSP6 Key Manager Relay Service](/img/standards/lsp6/lsp6-relay-execution.jpeg)

An essential aspect to consider in relay execution is the time validity of the execution signature. It's sometimes beneficial to limit the execution to be valid within a specific time frame to prevent potential security risks. For example, if a user signs a relay transaction and the signature is stolen or compromised, the attacker could potentially use this signature indefinitely if there's no validity period set.

To mitigate such risks, adding an optional validity timestamp to the signature could mark the start date and expiry date of its effectiveness. Once the timestamp has passed, the signature is no longer valid, rendering the relay transaction unusable.

### How to sign relay transactions?

:::tip

You can use our library [**eip191-signer.js**](https://github.com/lukso-network/tools-eip191-signer) to make it easier to sign an _EIP191 Execute Relay Call transaction_.

See also our [step by step Javascript guide](../../learn/key-manager/execute-relay-transactions.md) to sign and execute relay transactions via the Key Manager.

:::

#### Overview

To obtain a valid signature that can be used by anyone to execute a relayed transaction (= meta transaction) on behalf of someone else, we must do the following:

1. Gather 5 things:

   - 1. the **payload** (an abi-encoded function call) to be executed on the linked account.
   - 2. the **chain id** of the blockchain where the `payload` will be executed.
   - 3. the address of the [`LSP6KeyManager`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md) smart contract where the **payload** will be executed.
   - 4. the Key Manager **nonce** of the controller.
   - 5. the `validityTimestamps`, composed of 2 x `uint128` concatenated together, where:

        4.1. the left-side `uint128` corresponds to the timestamp from which the relay call is valid from.

        4.2. the right-side `uint128` corresponds to the timestamp from which the relay call is valid until.

2. Once you have gathered these 5 information, you must **concatenate them all together**.

3. Then you must get the `keccak256` hash of this data.

4. After that you can sign the data to obtain a valid signature ready to be used via [`executeRelayCall(...)`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#executerelaycall).

#### Details

The relay transactions are signed using the [**version 0 of EIP191**](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md#version-0x00). The relay call data that you want to sign **MUST** be the _keccak256 hash digest_ of the following elements _(bytes values)_ concatenated together.

```javascript
0x19 <0x00> <KeyManager address> <LSP25_VERSION> <chainId> <nonce> <validityTimestamps> <value> <payload>
```

| Message elements     | Details                                                                                                                                                                                                                                                   |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0x19`               | Byte used to ensure that the _relay call signed data_ is not a valid RLP.                                                                                                                                                                                 |
| `0x00`               | The [**version 0 of EIP191**](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md#version-0x00).                                                                                                                                                 |
| `KeyManager address` | The address of the Key Manager that will execute the relay call.                                                                                                                                                                                          |
| `LSP25_VERSION`      | The `uint256` number **25** that defines the current version of the LSP25 Execute Relay Call standard.                                                                                                                                                    |
| `chainId`            | The chain id of the blockchain where the Key Manager is deployed, as `uint256`.                                                                                                                                                                           |
| `nonce`              | The unique [**nonce**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#getnonce) for the payload.                                                                                                                                |
| `validityTimestamps` | Two `uint128` timestamps concatenated, the first timestamp determines from when the payload can be executed, the second timestamp delimits the end of the validity of the payload. If `validityTimestamps` is 0, the checks of the timestamps are skipped |
| `value`              | The amount of **native tokens** that will be transferred to the [**ERC725 Account**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) linked to the Key Manager that will execute the relay call.                             |
| `payload`            | The payload that will be exeuted.                                                                                                                                                                                                                         |

### Out of order execution

Since the Key Manager offers **relay execution** via signed message, it's important to provide security measurements to ensure that the signed message can't be repeated once executed. **[Nonces](https://www.techtarget.com/searchsecurity/definition/nonce#:~:text=A%20nonce%20is%20a%20random,to%20as%20a%20cryptographic%20nonce.)** exist to solve this problem, but with the following drawback:

- Signed messages with sequential nonces should be **executed in order**, meaning a signed message with nonce 4 can't be executed before the signed message with nonce 3. This is a critical problem which can limit the usage of relay execution.

Here comes the **Multi-channel** nonces which provide the ability to execute signed message **with**/**without** a specific order depending on the signer choice.

Signed messages should be executed sequentially if signed on the same channel and should be executed independently if signed on different channel.

- Message signed with nonce 4 on channel 1 can't be executed before the message signed with nonce 3 on channel 1 but can be executed before the message signed with nonce 3 on channel 2.

![LSP6 Key Manager Relay Service](/img/standards/lsp6/lsp6-multi-channel-nonce.jpeg)

Learn more about **[Multi-channel nonces](../faq/channel-nonce.md)** usecases and its internal construction.

## References

- [LUKSO Standards Proposals: LSP6 - Key Manager (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)
- [LSP6 KeyManager: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP6KeyManager)
