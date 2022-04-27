---
sidebar_label: 'LSP6 - Key Manager'
sidebar_position: 6
---

# LSP6 Key Manager

:::info Standard Document

[LSP6 - Key Manager](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)

:::

## Introduction

An [ERC725Account](./lsp0-erc725account.md) on its own comes with limited usability. Since it is an **owned contract**, only the Account's owner can write data into it or use it to interact with other smart contracts.

Here comes the Key Manager. A smart contract that controls an ERC725Account, acting as its new owner. It then functions as a gateway for an ERC725Account.

The idea is to give [permissions](#types-of-permissions) to any `address`, like Externally Owned Accounts (EOA) or smart contracts. These can then interact with the ERC725Account **through the Key Manager**. The Key Manager will allow or restrict access based on the permissions set for the calling `address`.

:x: &nbsp; **Without a Key Manager**, only the ERC725Account's owner can use its Account.

:white_check_mark: &nbsp; **With a Key Manager** attached to an ERC725Account, other addresses (EOAs or contracts) can use an Account on behalf of its owner.

![LSP6 Key Manager overview allowed](/img/standards/lsp6-key-manager-overview-allowed.jpeg)

![LSP6 Key Manager overview not allowed](/img/standards/lsp6-key-manager-overview-not-allowed.jpeg)

Permissions for addresses are not stored on the Key Manager. Instead, they are **stored inside the key-value store of the ERC725Account** linked to the Key Manager. This way, it is possible to easily **upgrade** the Key Manager without resetting all the permissions again.

---

## Types of permissions

| Permission Type                                   | Description                                                                                                                                                                                                               | `bytes32` data key                    |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| [**Address Permissions**](#address-permissions)   | defines a set of [**permission values**](#permissions-value) for an `address`.                                                                                                                                            | `0x4b80742d0000000082ac0000<address>` |
| [**Allowed Addresses**](#allowed-addresses)       | defines which EOA or contract addresses an `address` is _allowed to_ interact with them.                                                                                                                                  | `0x4b80742d00000000c6dd0000<address>` |
| [**Allowed Functions**](#allowed-functions)       | defines which **[function selector(s)](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html?highlight=selector#function-selector)** an `address` is allowed to run on a specific contract.                              | `0x4b80742d000000008efe0000<address>` |
| [**Allowed Standards**](#allowed-standards)       | defines a list of interfaces standards an `address` is allowed to interact with when calling contracts (using [ERC165](https://eips.ethereum.org/EIPS/eip-165) and [interface ids](../smart-contracts/interface-ids.md)). | `0x4b80742d000000003efa0000<address>` |
| [**Allowed ERC725Y Keys**](#allowed-erc725y-keys) | defines a list of `bytes32` ERC725Y keys an `address` is only allowed to set when doing [`setData(...)`](../smart-contracts/lsp0-erc725-account.md#setdata) on the linked ERC725Account.                                  | `0x4b80742d0000000090b80000<address>` |

> [See LSP6 for more details](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#erc725y-keys)

## Permissions

Click on the toggles below to **learn more about the features enabled by each permission**.

<details id="changeowner">
    <summary><code>CHANGEOWNER</code> - Allows changing the owner of the controlled contract</summary>
        <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
            <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000001</code>
        </p>
        <p>The <code>CHANGEOWNER</code> permission enables the change of the owner of the linked ERC725Account.</p>
        <p>Using this permission, you can easily upgrade the <code>Key Manager</code> attached to the Account by transferring ownership to a new <code>Key ManagerV2</code>.</p>
</details>

<details>
    <summary><code>CHANGEPERMISSIONS</code> - Allows changing existing permissions of addresses</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000002</code>
    </p>
    <p>This permission allows for <b>editing permissions</b> of any address that already has some permissions set on the ERC725Account (including itself).</p>

![CHANGE Permissions](/img/standards/lsp6-change-permissions.jpeg)

<p>Bear in mind that the behavior of <code>CHANGEPERMISSIONS</code> slightly varies depending on the new permissions value being set (see figure below).</p>

![CHANGE Permissions](/img/standards/lsp6-change-permissions-variants.jpeg)

</details>

<details>
    <summary><code>ADDPERMISSIONS</code> - Allows giving permissions to new addresses.</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000004</code>
    </p>
    <p>This permission allows giving permissions to new addresses. This role-management enables the <b>authorization of new addresses</b> to interact with the ERC725Account.</p>

![ADD Permissions](/img/standards/lsp6-add-permissions.jpeg)

</details>

<details>
    <summary><code>SETDATA</code> - Allows setting data on the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000008</code>
    </p>
    Allows an address to write any form of data in the <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y">ERC725Y</a> key-value store of the linked <code>ERC725Account</code> (except permissions, which require the permissions <code>CHANGEPERMISSIONS</code> described above).

</details>

<details>
    <summary><code>CALL</code> - Allows calling other contracts through the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000010</code><br/>
    </p>
    <p>This permission enables anyone to use the ERC725Account linked to Key Manager to make external calls (to contracts or Externally Owned Accounts). Allowing state changes at the address being called.</p>
</details>

<details>
    <summary><code>STATICCALL</code> - Allows calling other contracts through the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000020</code><br/>
    </p>
    <p>This permission enables the ERC725Account linked to Key Manager to make external calls to contracts while disallowing state changes at the address being called.</p>
    <p>It uses the <a href="https://eips.ethereum.org/EIPS/eip-214"><code>STATICCALL</code></a> opcode when performing the external call.</p>
    <blockquote>If any state is changed at a target contract through a <code>STATICCALL</code>, the call will revert.</blockquote>
</details>

<details>
    <summary><code>DELEGATECALL</code> - Allows delegate calling other contracts through the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000040</code>
    </p>

This permission allows executing code and functions from other contracts in the UP context.

:::danger

**`DELEGATECALL`** is currently disallowed (even if set on the KeyManager) because of its dangerous nature, as vicious developers can execute some malicious code in the linked Account contract.

:::

</details>

<details>
    <summary><code>DEPLOY</code> - Allows deploying other contracts through the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000080</code>
    </p>
    <p>Enables the caller to deploy a smart contract, using the linked ERC725Account as a deployer. Developers should provide the contract's bytecode to be deployed in the payload (ABI-encoded) passed to the Key Manager.</p>
    <blockquote>Both the <code>CREATE</code> or <a href="https://eips.ethereum.org/EIPS/eip-1014"><code>CREATE2</code></a> opcode can be used to deploy the contract.</blockquote>
</details>

<details>
    <summary><code>TRANSFERVALUE</code> - Allows transfering value to other contracts from the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000100</code>
    </p>
    Enables sending native currency from the linked ERC725Account to any address.<br/>
    <blockquote>
        Note: For a simple native token transfer, no data (<code>""</code>) should be passed to the fourth parameter of the <code>execute</code> function of the Account contract. For instance: <code>account.execute(operationCall, recipient, amount, "")</code>
    </blockquote>
</details>

<details>
    <summary><code>SIGN</code>: Allows signing on behalf of the controlled account, for example for login purposes</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000200</code>
    </p>
    Developers can use the <code>SIGN</code> permission for keys to sign login messages. It is primarily for web2.0 apps to know which key SHOULD sign.
</details>

:::note

When deployed with our [**lsp-factory.js** tool](https://docs.lukso.tech/tools/lsp-factoryjs/introduction/getting-started/), the Universal Profile owner will have all the permissions above set by default.

:::

### Combining Permissions

Permissions can be combined if an `address` needs to hold more than one permission. To do so:

1. calculate the sum of the decimal value of each permission.
2. convert the result back into hexadecimal.

<details>
    <summary>Example</summary>

<Tabs>
<TabItem value="example1" label="Example 1" default>

```solidity
permissions: CALL + TRANSFERVALUE

  0x0000000000000000000000000000000000000000000000000000000000000010 (16 in decimal)
+ 0x0000000000000000000000000000000000000000000000000000000000000100 (256)
---------------------------------------------------------------------
= 0x0000000000000000000000000000000000000000000000000000000000000110 (= 272)
```

</TabItem>
<TabItem value="example2" label="Example 2">

```solidity
permissions: CHANGEPERMISSIONS + SETDATA

  0x0000000000000000000000000000000000000000000000000000000000000002 (2 in decimal)
+ 0x0000000000000000000000000000000000000000000000000000000000000008 (8)
---------------------------------------------------------------------
= 0x000000000000000000000000000000000000000000000000000000000000000a (= 10)
```

</TabItem>

</Tabs>

</details>

:::tip

You can use the [`encodePermissions(...)`](../../../../tools/erc725js/classes/ERC725#encodepermissions) and [`decodePermissions(...)`](../../../../tools/erc725js/classes/ERC725#decodepermissions) functions from the [**erc725.js**](../../../../tools/erc725js/getting-started) tool to easily combine and decode LSP6 permissions.

:::

---

## Details about permission types

:::caution

To **add / remove entries in the list of allowed addresses, functions, standards or ERC725Y keys**, the **whole array** should be ABI-encoded again and reset. Each update **overrides the entire previous state**.

Note that this process is expensive since the data being set is an ABI-encoded array.

The [erc725.js](../../tools/erc725js/getting-started) tool can help in [encoding the data keys and values](../../tools/erc725js/classes/ERC725.md#encodedata).

:::

### Address Permissions

An address can hold one (or more) permissions, enabling it to perform multiple _"actions"_ on an ERC725Account. Such _"actions"_ include **setting data** on the ERC725Account, **calling other contracts**, **transferring native tokens**, etc.

To grant permission(s) to an `<address>`, set the following key-value pair below in the [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) contract storage.

- **key:** `0x4b80742d0000000082ac0000<address>`
- **value:** one of the available options below.

```json
{
  "name": "AddressPermissions:Permissions:<address>",
  "key": "0x4b80742d0000000082ac0000<address>",
  "keyType": "Bytes20MappingWithGrouping",
  "valueType": "bytes32",
  "valueContent": "BitArray"
}
```

See the table below for each permission and their corresponding `bytes32` value.

| Permission Name                         | Value                                                                |
| --------------------------------------- | :------------------------------------------------------------------- |
| [CHANGEOWNER](#permission-values)       | `0x0000000000000000000000000000000000000000000000000000000000000001` |
| [CHANGEPERMISSIONS](#permission-values) | `0x0000000000000000000000000000000000000000000000000000000000000002` |
| [ADDPERMISSIONS](#permission-values)    | `0x0000000000000000000000000000000000000000000000000000000000000004` |
| [SETDATA](#permission-values)           | `0x0000000000000000000000000000000000000000000000000000000000000008` |
| [CALL](#permission-values)              | `0x0000000000000000000000000000000000000000000000000000000000000010` |
| [STATICCALL](#permission-values)        | `0x0000000000000000000000000000000000000000000000000000000000000020` |
| [DELEGATECALL](#permission-values)      | `0x0000000000000000000000000000000000000000000000000000000000000040` |
| [DEPLOY](#permission-values)            | `0x0000000000000000000000000000000000000000000000000000000000000080` |
| [TRANSFERVALUE](#permission-values)     | `0x0000000000000000000000000000000000000000000000000000000000000100` |
| [SIGN](#permission-values)              | `0x0000000000000000000000000000000000000000000000000000000000000200` |

:::danger

**Granting permissions to the linked ERC725Account itself is dangerous! **

A caller can craft a payload via `ERC725X.execute(...)` to be sent back to the KeyManager, leading to potential re-entrancy attacks.

Such transaction flow can lead an initial caller to use more permissions than allowed initially by using the permissions granted to the linked ERC725Account's address.

:::

:::caution

Each permission MUST be:

- **exactly 32 bytes long**
- zero left-padded
  - `0x0000000000000000000000000000000000000000000000000000000000000008` ✅
  - `0x0800000000000000000000000000000000000000000000000000000000000000` ❌

For instance, if you try to set the permission SETDATA for an address as `0x08`, this will be stored internally as `0x0800000000000000000000000000000000000000000000000000000000000000`, and will cause incorrect behaviour with odd revert messages.

:::

---

### Allowed addresses

You can restrict an address to interact only with specific contracts or EOAs.

To restrict an `<address>` to only talk to a specific contract at address `<target-contract-address>` (or additional addresses), the key-value pair below can be set in the ERC725Y contract storage.

- **key:** `0x4b80742d00000000c6dd0000<address>`
- **possible values:**
  - `[ <target-contract-address>, 0x.... ]`: an **ABI-encoded** array of `address[]` defining the allowed addresses.
  - `0x` (empty): if the value is an **empty byte** (= `0x`), the caller `<address>` is allowed to interact with any address (**= all addresses are whitelisted**).

```json
{
  "name": "AddressPermissions:AllowedAddresses:<address>",
  "key": "0x4b80742d00000000c6dd0000<address>",
  "keyType": "Bytes20MappingWithGrouping",
  "valueType": "address[]",
  "valueContent": "Address"
}
```

:::caution

The allowed addresses MUST be an **ABI-encoded array** of `address[]` to ensure the correct behavior of this functionality.

See the section [_Contract ABI Specification > Strict Encoding Mode_](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#strict-encoding-mode) in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#).

:::

---

### Allowed functions

:::caution

The allowed functions MUST be an **ABI-encoded array** of `bytes4[]` function selectors to ensure the correct behaviour of this functionality.

See the section [_Contract ABI Specification > Strict Encoding Mode_](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#strict-encoding-mode) in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#).

:::

You can also restrict which functions a specific address can run by providing a list of `bytes4` function selectors.

To restrict an `<address>` to only execute the function `transfer(address,uint256)` (selector: `a9059cbb`), the following key-value pair can be set in the ERC725Y contract storage.

- **key:** `0x4b80742d000000008efe0000<address>`
- **possible values:**
  - `[ 0xa9059cbb, 0x... ]`: an **ABI-encoded** array of `bytes4[]` values, definiting the function selectors allowed.
  - `0x` (empty): if the value is an **empty byte** (= `0x`), the caller `<address>` is allowed to execute any function (**= all `bytes4` function selectors are whitelisted**).

```json
{
  "name": "AddressPermissions:AllowedFunctions:<address>",
  "key": "0x4b80742d000000008efe0000<address>",
  "keyType": "Bytes20MappingWithGrouping",
  "valueType": "bytes4[]",
  "valueContent": "Bytes4"
}
```

---

### Allowed standards

:::warning

This type of permission does not offer security over the inner workings or the correctness of a smart contract. It should be used more as a "mistake prevention" mechanism than a security measure.

:::

It is possible to restrict an address to interact only with **contracts that implement specific interface standards**. These contracts MUST implement the [ERC165 standard](https://eips.ethereum.org/EIPS/eip-165) to be able to detect their interfaces.

![Key Manager Allowed Standards flow](/img/standards/lsp6-key-manager-allowed-standards.jpeg)

For example, to restrict an `<address>` to only be allowed to interact with ERC725Account contracts (interface ID = `0x63cb749b`), the following key-value pair can be set in the ERC725Y contract storage.

- **key:** `0x4b80742d000000003efa0000<address>`
- **possible values:**
  - `[ 0x63cb749b, 0x... ]`: an **ABI-encoded** array of `bytes4[]` ERC165 interface ids.
  - `0x` (empty): if the value is an **empty byte** (= `0x`), the caller `<address>` is allowed to interact with any contracts, whether they implement a specific standard interface or not.

:::caution

The allowed standards MUST be an **ABI-encoded array** of `bytes4[]` ERC165 interface ids to ensure the correct behavior of this functionality.

See the section [_Contract ABI Specification > Strict Encoding Mode_](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#strict-encoding-mode) in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#).

:::

---

### Allowed ERC725Y Keys

If an address is allowed to `SETDATA` on an ERC725Account, it is possible to restrict which keys this address can update.

To restrict an `<address>` to only be allowed to set the key `LSP3Profile` (`0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5`), the following key-value pair can be set in the ERC725Y contract storage.

- **key:** `0x4b80742d0000000090b80000<address>`
- **value(s):** `[ 0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5 ]`

The list (= array) of allowed `bytes32` keys **MUST be ABI-encoded** (See the section [_Contract ABI Specification > Strict Encoding Mode_](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#strict-encoding-mode)) in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#).

:::info

**If no bytes32 values are set, the caller address can set values for any keys.**

:::

---

## References

- [LUKSO Standards Proposals: LSP6 - Key Manager (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)
- [LSP6 KeyManager: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP6KeyManager)
