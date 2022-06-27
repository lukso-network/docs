---
sidebar_label: 'LSP6 - Key Manager'
sidebar_position: 6
---

# LSP6 - Key Manager

:::info Standard Document

[LSP6 - Key Manager](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)

:::

## Introduction

An [LSP0ERC725Account](./../smart-contracts/lsp0-erc725-account.md) on its own comes with limited usability. Since it is an **owned contract**, only the account's owner can write data into it or use it to interact with other smart contracts.

Here comes the Key Manager. A smart contract that controls an LSP0ERC725Account, acting as its new owner. It then functions as a gateway for the **account** contract.

The idea is to give [permissions](#permissions) to any `address`, like Externally Owned Accounts (EOA) or smart contracts. These can then interact with the LSP0ERC725Account **through the Key Manager**. The Key Manager will allow or restrict access based on the permissions set for the calling `address`.

Permissioned addresses can interact directly with the Key Manager or can sign a message to be executed by any other parties (users, relay services).

:x: &nbsp; **Without a Key Manager**, only the LSP0ERC725Account's owner can use its Account.

:white_check_mark: &nbsp; **With a Key Manager** attached to an LSP0ERC725Account, other addresses (EOAs or contracts) can use an Account on behalf of its owner.

![LSP6 Key Manager overview allowed](/img/standards/lsp6-key-manager-overview-allowed.jpeg)

![LSP6 Key Manager overview not allowed](/img/standards/lsp6-key-manager-overview-not-allowed.jpeg)

Permissions for addresses are not stored on the Key Manager. Instead, they are **stored inside the data key-value store of the LSP0ERC725Account** linked to the Key Manager. This way, it is possible to easily **upgrade** the Key Manager without resetting all the permissions again.

---


## Relay Execution

Relay execution minimize onboarding & **UX friction** for dapps. In this way users can interact on the blockchain **without needing Native tokens** for transaction fees. This will allow users without prior crypto experience to be comfortable using the blockchain without the need to worry about gas or any complex steps needed to operate on blockchains (KYC, seedphrases, gas).

Dapps can leverage the relay execuyion feature to build their own business model on top that can function in different ways including building their own **relay service** or building smart contracts solution on top of the Key Manager to pay with their tokens.

Others can build relay services and agree with the users on payment methods including subscriptions, ads, etc ..

![LSP6 Key Manager Relay Service](/img/standards/lsp6-relay-execution.jpeg)


## Out of order execution

Since the Key Manager offers **relay execution** via signed message, it's important to provide security measurements to ensure that the signed message can't be repeated once executed. **[Nonces](https://www.techtarget.com/searchsecurity/definition/nonce#:~:text=A%20nonce%20is%20a%20random,to%20as%20a%20cryptographic%20nonce.)** existed to solve this problem, but with the following drawback:

- Signed messages with sequentiel nonces should be **executed in order**, meaning a signed message with nonce 4 can't be executed before the signed message with nonce 3. This is a critical problem which can limit the usage of relay execution.

Here comes the **Multi-channel** nonces which provide the ability to execute signed message **with**/**without** a specific order depending on the signer choice.

Signed messages should be executed sequentielially if signed on the same channel and should be executed independently if signed on different channel.

- Message signed with nonce 4 on channel 1 can't be executed before the message signed with nonce 3 on channel 1 but can be executed before the message signed with nonce 3 on channel 2.

![LSP6 Key Manager Relay Service](/img/standards/lsp6-multi-channel-nonce.jpeg)

Learn more about **[Multi-channel nonces](../faq/channel-nonce.md)** usecases and its internal construction.
## Types of permissions

| Permission Type                                   | Description                                                                                                                                                                                                               | `bytes32` data key                    |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| [**Address Permissions**](#address-permissions)   | defines a set of [**permissions**](#permissions) for an `address`.                                                                                                                                                        | `0x4b80742de2bf82acb3630000<address>` |
| [**Allowed Addresses**](#allowed-addresses)       | defines which EOA or contract addresses an `address` is _allowed to_ interact with them.                                                                                                                                  | `0x4b80742de2bfc6dd6b3c0000<address>` |
| [**Allowed Functions**](#allowed-functions)       | defines which **[function selector(s)](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html?highlight=selector#function-selector)** an `address` is allowed to run on a specific contract.                              | `0x4b80742de2bf8efea1e80000<address>` |
| [**Allowed Standards**](#allowed-standards)       | defines a list of interfaces standards an `address` is allowed to interact with when calling contracts (using [ERC165](https://eips.ethereum.org/EIPS/eip-165) and [interface ids](../smart-contracts/interface-ids.md)). | `0x4b80742de2bf3efa94a30000<address>` |
| [**Allowed ERC725Y Keys**](#allowed-erc725y-keys) | defines a list of `bytes32` ERC725Y keys an `address` is only allowed to set when doing [`setData(...)`](../smart-contracts/lsp0-erc725-account.md#setdata-array) on the linked ERC725Account.                            | `0x4b80742de2bf90b8b4850000<address>` |

> [See LSP6 for more details](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#erc725y-data-keys)

## Permissions

Click on the toggles below to **learn more about the features enabled by each permission**.

<details id="changeowner">
    <summary><code>CHANGEOWNER</code> - Allows changing the owner of the controlled contract</summary>
        <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
            <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000001</code>
        </p>

The `CHANGEOWNER` permission enables the change of the owner of the linked ERC725Account.
Using this permission, you can easily upgrade the [`LSP6KeyManager`](../smart-contracts/lsp6-key-manager.md) attached to the Account by transferring ownership to a new Key Manager.

</details>

<details>
    <summary><code>CHANGEPERMISSIONS</code> - Allows changing existing permissions of addresses</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000002</code>
    </p>

This permission allows for **editing permissions** of any address that already has some permissions set on the ERC725Account (including itself).

![CHANGE Permissions](/img/standards/lsp6-change-permissions.jpeg)

Bear in mind that the behavior of `CHANGEPERMISSIONS` slightly varies depending on the new permissions value being set (see figure below).

![CHANGE Permissions](/img/standards/lsp6-change-permissions-variants.jpeg)

</details>

<details>
    <summary><code>ADDPERMISSIONS</code> - Allows giving permissions to new addresses.</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000004</code>
    </p>

This permission allows giving permissions to new addresses. This role-management enables the **authorization of new addresses** to interact with the ERC725Account.

![ADD Permissions](/img/standards/lsp6-add-permissions.jpeg)

</details>

<details>
    <summary><code>SETDATA</code> - Allows setting data on the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000008</code>
    </p>

Allows an address to write any form of data in the [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) data key-value store of the linked `ERC725Account` (except permissions, which require the permissions `CHANGEPERMISSIONS`).

> **NB:** an `address` can be restricted to set only specific data keys via **[allowed ERC725Y keys](#allowed-erc725y-keys)**

</details>

<details>
    <summary><code>CALL</code> - Allows calling other contracts through the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000010</code><br/>
    </p>

This permission enables anyone to use the ERC725Account linked to Key Manager to make external calls (to contracts or Externally Owned Accounts). Allowing state changes at the address being called.

</details>

<details>
    <summary><code>STATICCALL</code> - Allows calling other contracts through the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000020</code><br/>
    </p>

This permission enables the ERC725Account linked to Key Manager to make external calls to contracts while disallowing state changes at the address being called.
It uses the [STATICCALL](https://eips.ethereum.org/EIPS/eip-214) opcode when performing the external call.

> **NB:** If any state is changed at a target contract through a `STATICCALL`, the call will **revert silently**.

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

Enables the caller to deploy a smart contract, using the linked ERC725Account as a deployer. Developers should provide the contract's bytecode to be deployed in the payload (ABI-encoded) passed to the Key Manager.

> Both the `CREATE` or [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) opcodes can be used to deploy a contract.

</details>

<details>
    <summary><code>TRANSFERVALUE</code> - Allows transfering value to other contracts from the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000100</code>
    </p>

Enables sending native tokens from the linked ERC725Account to any address.<br/>

> **Note:** For a simple native token transfer, no data (`""`) should be passed to the fourth parameter of the [`execute`](../smart-contracts/lsp0-erc725-account.md#execute) function of the Account contract. For instance: `account.execute(operationCall, recipient, amount, "")`
>
> The caller will need the permission `CALL` to send any data along the LYX transfer.

</details>

<details>
    <summary><code>SIGN</code>: Allows signing on behalf of the controlled account, for example for login purposes</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000200</code>
    </p>

Developers can use the `SIGN` permission for keys to sign login messages. It is primarily for web2.0 apps to know which key SHOULD sign.

</details>

:::note

When deployed with our [**lsp-factory.js** tool](https://docs.lukso.tech/tools/lsp-factoryjs/introduction/getting-started/), the Universal Profile owner will have all the permissions above set by default.

:::

### SUPER Permissions

The super permissions granting the same permissions as they non-super counter parts, with the difference that checks on restrictions for `addresses`, `standards`, or `functions` are _skipped_. This allows for cheaper transactions where, these restrictions aren't set anyway.

:::caution

Use with caution, as even if restrictions to certain `addresses`, `standards`, or `functions` are set for an controller address, they will be ignored.

:::

<details>
    <summary><code>SUPER_SETDATA</code></summary>
     <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000400</code>
    </p>

Same as `SETDATA`, but allowing to set any ERC725Y data keys.

</details>

<details>
    <summary><code>SUPER_TRANSFERVALUE</code></summary>
     <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000800</code>
    </p>

Same as `TRANSFERVALUE`, but allowing to send native tokens to any `address` (EOA or contract). This will also not check for allowed standards or allowed functions when transferring value to contracts.

</details>

<details>
    <summary><code>SUPER_CALL</code></summary>
     <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000001000</code>
    </p>

Same as `CALL`, but allowing to interact with any contract. This will not check for allowed `address`, standard or functions if the caller has any of these restrictions set.

</details>

<details>
    <summary><code>SUPER_STATICCALL</code></summary>
     <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000002000</code>
    </p>

Same as `STATICCALL`, but allowing to interact with any contract. This will not check for allowed `address`, standard or functions if the caller has any of these restrictions set.

</details>

<details>
    <summary><code>SUPER_DELEGATECALL</code></summary>
     <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000004000</code>
    </p>

Same as `DELEGATECALL`, but allowing to interact with any contract. This will not check for allowed `address`, standard or functions if the caller has any of these restrictions set.

</details>

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

:::

### Address Permissions

An address can hold one (or more) permissions, enabling it to perform multiple _"actions"_ on an ERC725Account. Such _"actions"_ include **setting data** on the ERC725Account, **calling other contracts**, **transferring native tokens**, etc.

To grant permission(s) to an `<address>`, set the following key-value pair below in the [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) contract storage (**NB:** remember to remove the `0x` prefix in the `<address>` field below).

- **key:** `0x4b80742de2bf82acb3630000<address>`
- **value:** one of the available options below.

```json
{
  "name": "AddressPermissions:Permissions:<address>",
  "key": "0x4b80742de2bf82acb3630000<address>",
  "keyType": "MappingWithGrouping",
  "valueType": "bytes32",
  "valueContent": "BitArray"
}
```

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

- **key:** `0x4b80742de2bfc6dd6b3c0000<address>`
- **possible values:**
  - `[ <target-contract-address>, 0x.... ]`: an **ABI-encoded** array of `address[]` defining the allowed addresses.
  - `0x` (empty): if the value is an **empty byte** (= `0x`), the caller `<address>` is allowed to interact with any address (**= all addresses are whitelisted**).

```json
{
  "name": "AddressPermissions:AllowedAddresses:<address>",
  "key": "0x4b80742de2bfc6dd6b3c0000<address>",
  "keyType": "MappingWithGrouping",
  "valueType": "address[]",
  "valueContent": "Address"
}
```

![LSP6 Allowed Addresses explained](/img/standards/lsp6/lsp6-allowed-addresses.jpeg)

:::caution

The allowed addresses MUST be an **ABI-encoded array** of `address[]` to ensure the correct behavior of this functionality.

See the section [_Contract ABI Specification > Strict Encoding Mode_](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#strict-encoding-mode) in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#).

:::

---

### Allowed functions

You can also restrict which functions a specific address can run by providing a list of `bytes4` function selectors.

To restrict an `<address>` to only execute the function `transfer(address,uint256)` (selector: `a9059cbb`), the following key-value pair can be set in the ERC725Y contract storage.

- **key:** `0x4b80742de2bf8efea1e80000<address>`
- **possible values:**
  - `[ 0xa9059cbb, 0x... ]`: an **ABI-encoded** array of `bytes4[]` values, definiting the function selectors allowed.
  - `0x` (empty): if the value is an **empty byte** (= `0x`), the caller `<address>` is allowed to execute any function (**= all `bytes4` function selectors are whitelisted**).

```json
{
  "name": "AddressPermissions:AllowedFunctions:<address>",
  "key": "0x4b80742de2bf8efea1e80000<address>",
  "keyType": "0MappingWithGrouping",
  "valueType": "bytes4[]",
  "valueContent": "Bytes4"
}
```

:::info

The `receive()` and `fallback()` functions can always be called on a target contract if no calldata is passed, even if you restrict an `<address>` to call a certain set of functions.

:::

:::caution

The allowed functions MUST be an **ABI-encoded array** of `bytes4[]` function selectors to ensure the correct behaviour of this functionality.

See the section [_Contract ABI Specification > Strict Encoding Mode_](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#strict-encoding-mode) in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#).

:::

---

### Allowed standards

It is possible to restrict an address to interact only with **contracts that implement specific interface standards**. These contracts MUST implement the [ERC165](https://eips.ethereum.org/EIPS/eip-165) standard to be able to detect their interfaces.

For example, to restrict an `<address>` to only be allowed to interact with ERC725Account contracts (interface ID = `0x63cb749b`), the following key-value pair can be set in the ERC725Y contract storage.

- **key:** `0x4b80742de2bf3efa94a30000<address>`
- **possible values:**
  - `[ 0x63cb749b, 0x... ]`: an **ABI-encoded** array of `bytes4[]` ERC165 interface ids.
  - `0x` (empty): if the value is an **empty byte** (= `0x`), the caller `<address>` is allowed to interact with any contracts, whether they implement a specific standard interface or not.

```json
{
  "name": "AddressPermissions:AllowedStandards:<address>",
  "key": "0x4b80742de2bf3efa94a30000<address>",
  "keyType": "MappingWithGrouping",
  "valueType": "bytes4[]",
  "valueContent": "Bytes4"
}
```

![Key Manager Allowed Standards flow](/img/standards/lsp6-key-manager-allowed-standards.jpeg)

Below is an example use case. With this permission key, an `<address>` can be allowed to use the linked ERC725Account to interact with [**LSP7 contracts**](../nft-2.0/LSP7-Digital-Asset.md) **(= token contracts only :white_check_mark:)**, but not with [**LSP8 contracts**](../nft-2.0/LSP8-Identifiable-Digital-Asset.md) **(= NFT contracts :x:)**.

![Key Manager Allowed Standards allowed example](/img/standards/lsp6/lsp6-allowed-standard-accepted.jpeg)

![Key Manager Allowed Standards denied example](/img/standards/lsp6/lsp6-allowed-standards-denied.jpeg)

:::warning

This type of permission does not offer security over the inner workings or the correctness of a smart contract. It should be used more as a "mistake prevention" mechanism than a security measure.

:::

:::caution

The allowed standards MUST be an **ABI-encoded array** of `bytes4[]` ERC165 interface ids to ensure the correct behavior of this functionality.

See the section [_Contract ABI Specification > Strict Encoding Mode_](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#strict-encoding-mode) in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#).

:::

---

### Allowed ERC725Y Keys

If an address is allowed to [`SETDATA`](#permissions) on an ERC725Account, it is possible to restrict which keys this address can update.

To restrict an `<address>` to only be allowed to set the key `LSP3Profile` (`0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5`), the following key-value pair can be set in the ERC725Y contract storage.

- **key:** `0x4b80742de2bf90b8b4850000<address>`
- **value(s):** `[ 0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5 ]`

```json
{
  "name": "AddressPermissions:AllowedERC725YKeys:<address>",
  "key": "0x4b80742de2bf90b8b4850000<address>",
  "keyType": "MappingWithGrouping",
  "valueType": "bytes32[]",
  "valueContent": "Bytes32"
}
```

Below is an example use case. An ERC725Account can allow some applications to add/edit informations on its storage via `setData(...)`. The account can restrict such Dapps and protocols to edit the data keys that are only relevant to the logic of their applications.

![LSP6 Allowed ERC725YKeys overview](/img/standards/lsp6/lsp6-allowed-erc725ykeys-overview.jpeg)

As a result, this provide context for the Dapp on which data they can operate on the account, while preventing them to edit other information, such as the account metadata, or data relevant to other dapps.

![LSP6 Allowed ERC725YKeys overview](/img/standards/lsp6/lsp6-allowed-erc725ykeys-example-allowed.jpeg)

![LSP6 Allowed ERC725YKeys overview](/img/standards/lsp6/lsp6-allowed-erc725ykeys-example-denied-1.jpeg)

![LSP6 Allowed ERC725YKeys overview](/img/standards/lsp6/lsp6-allowed-erc725ykeys-example-denied-2.jpeg)

:::info

**If no bytes32 values are set, the caller address can set values for any keys.**

:::

:::caution

The list of allowed ERC725Y data keys **MUST be an ABI-encoded** array of `bytes32[]` values to ensure the correc behaviour of this functionality.

See the section [_Contract ABI Specification > Strict Encoding Mode_](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#strict-encoding-mode)) in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html#).

:::

---

## References

- [LUKSO Standards Proposals: LSP6 - Key Manager (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)
- [LSP6 KeyManager: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP6KeyManager)
