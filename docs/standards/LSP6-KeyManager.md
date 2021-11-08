---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LSP6-KeyManager

![Key Manager flow chart](https://user-images.githubusercontent.com/31145285/129574099-9eba52d4-4f82-4f11-8ac5-8bfa18ce97d6.jpeg)

An [ERC725Account](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) on its own comes with limited usability. Since it is an **owned contract**, only the Account's owner can write data into it, or use it to interact with other smart contracts.

Here comes the Key Manager. It is a smart contract that controls an ERC725Account, acting as its new owner. It then functions as a gateway for an ERC725Account.

The idea is to give [permissions](#types-of-permissions) to any `address`, like Externally Owned Accounts (EOA) or smart contracts. These can then interact with an **ERC725Account** through the Key Manager. On each interaction, the Key Manager will allow or restrict access, based on the permissions set for the calling `address`.

:x: &nbsp; **Without a Key Manager**, only the ERC725Account's owner can use its Account.

:white_check_mark: &nbsp; **With a Key Manager** attached to an ERC725Account, other addresses (EOAs or contracts) can use an Account on behalf of its owner.

Permissions for an `address` are stored inside the key-value store of the ERC725Account contract, under specific keys listed below.

| Permission Type                                                                                                                         | Key                                     |
| --------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| [Address Permissions](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#addresspermissionspermissionsaddress)    | `0x4b80742d0000000082ac0000<address>`   |
| [Allowed Addresses](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#addresspermissionsallowedaddressesaddress) | `0x4b80742d00000000c6dd0000**<address>` |
| [Allowed Functions](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#addresspermissionsallowedfunctionsaddress) | `0x4b80742d000000008efe0000<address>`   |

> [See LSP6 for more details](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#erc725y-keys)

<br/>
Since permissions are stored under the ERC725Account contract, they are not attached to the Key Manager itself. The Key Manager can then easily be upgraded without the need to set all the permissions again.

## <a name="types-of-permissions"></a> Types of permissions

There are 3 main types of permissions that can be set for addresses interacting with a Universal Profile.

- [**Address Permissions**](#permissions-value): defines a set of **permission values** for an `address`.

- [**Allowed Addresses:**](#allowed-addresses) defines which EOA or contract addresses an `address` is allowed to interact with.

- [**Allowed Functions:**](#allowed-functions) defines which function selectors an `address` is allowed to run on a specific contract.

### <a name="permissions-value"></a> Permission values

The following default permissions can be set for any address. They are listed according to their importance.

<details>
    <summary><code>CHANGEOWNER</code> - Allows changing the owner of the controlled contract</summary>
        <p>Enables to change the owner of the linked ERC725Account.</p>
        <p>Using this permission, you can easily upgrade the <code>KeyManager</code> attached to the Account by transferring ownership to a new <code>KeyManagerV2</code>.</p>
</details>

<details>
    <summary><code>CHANGEPERMISSIONS</code> - Allows changing of permissions of addresses</summary>
    <p>This permission allows an address to grant or revoke permissions for any specific address (including itself).</p>
</details>

<details>
    <summary><code>SETDATA</code> - Allows setting data on the controlled contract</summary>
    Allows an address to write any form of data in the <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y">ERC725Y</a> key-value store of the linked `ERC725Account` (except permissions, that requires the permissions <code>CHANGEPERMISSIONS</code> described above).
</details>

<details>
    <summary><code>CALL</code>, <code>STATICCALL</code> - Allows calling other contracts through the controlled contract</summary>
    <p>This permission enables anyone to use the ERC725Account linked to Key Manager to make external calls (to contracts or Externally Owned Accounts)</p>
    <p>The difference between <code>CALL</code> and <a href="https://eips.ethereum.org/EIPS/eip-214"><code>STATICCALL</code></a> is that <b>staticcall</b> disallows state change at the target contract.</p>
    <blockquote>If any state is changed at a target contract through a <code>STATICCALL</code>, the call will revert.</blockquote>
</details>

<details>
    <summary><code>DELEGATECALL</code> - Allows delegate calling other contracts through the controlled contract</summary>
    
    <blockquote>This call type is currently disallowed. See note below for more details.</blockquote>

</details>

<details>
    <summary><code>DEPLOY</code> - Allows deploying other contracts through the controlled contract</summary>
    <p>Enables the caller to deploy a smart contract, using the linked ERC725Account as a deployer. The bytecode of the contract to be deployed should be provided in the payload (abi-encoded) passed to the Key Manager.</p>
    <blockquote>Both the <code>CREATE</code> or <a href="https://eips.ethereum.org/EIPS/eip-1014"><code>CREATE2</code></a> opcode can be used to deploy the contract.</blockquote>
</details>

<details>
    <summary><code>TRANSFERVALUE</code> - Allows transfering value to other contracts from the controlled contract</summary>
    Enables to send native currency from the linked ERC725Account to any address.<br/><br/>
    <blockquote>
        NB: for a simple native token transfer, no data (<code>""</code>) should be passed to the fourth parameter of the <code>execute</code> function of the Account contract.<br/>
        For instance: <code>account.execute(operationCall, recipient, amount, "")</code>
    </blockquote>
</details>

<details>
    <summary><code>SIGN</code>: Allows signing on behalf of the controlled account, for example for login purposes</summary>
    The <code>SIGN</code> permission can be used for keys to sign login messages. It is mostly for web2.0 apps to know which key SHOULD sign.
</details>

:::note

When deployed with our [**lsp-factory** tool](https://docs.lukso.tech/tools/lsp-factoryjs/getting-started/), the Universal Profile owner will have all the permissions above set by default.

:::

:::danger

**`DELEGATECALL`** is currently disallowed (even if set on the KeyManager) because of its dangerous nature, as some malicious code can be executed in the context of the linked Account contract.

:::

### <a name="allowed-addresses"></a> Allowed addresses

You can restrict an address to interact only with specific contracts or EOAs.

To restrict an `<address>` to only talk to a specific contract at address `<target-contract-address>`, the key-value pair below can be set in the [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) contract storage.

- **key:** `0x4b80742d00000000c6dd0000<address>`
- **value:** `<target-contract-address>`

:::info Infos

**If no addresses are set, interacting with any address is allowed (= all addresses are whitelisted).**

:::

### <a name="allowed-functions"></a> Allowed functions

You can also restrict which functions a specific address can run, by providing a list of `bytes4` function selector.

To restrict an `<address>` to only execute the function `transfer(address,uint256)` (selector: `a9059cbb`), the following key-value pair can be set in the ERC725Y contract storage.

- **key:** `0x4b80742d000000008efe0000<address>`
- **value:** `0xa9059cbb`

:::info Infos

**If no bytes4 selectors are set, the caller address can execute any functions.**

:::

## Permission Keys

Below is a list of ERC725Y Permission Keys related to the Key Manager, stored as constants to be used in our code snippets.

```typescript
const PERMISSIONS_KEY_PREFIX = "0x4b80742d0000000082ac0000";
const ADDRESS_PERMISSIONS_ARRAY_KEY =
  "0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3";

// prettier-ignore
const enum KEYS {
  PERMISSIONS      = "0x4b80742d0000000082ac0000", // AddressPermissions:Permissions:<address> --> bytes32
  ALLOWEDADDRESSES = "0x4b80742d00000000c6dd0000", // AddressPermissions:AllowedAddresses:<address> --> address[]
  ALLOWEDFUNCTIONS = "0x4b80742d000000008efe0000", // AddressPermissions:AllowedFunctions:<address> --> bytes4[]
}

// prettier-ignore
const enum PERMISSIONS {
  CHANGEOWNER   = "0x0000000000000000000000000000000000000000000000000000000000000001", // .... 0000 0000 0001
  CHANGEKEYS    = "0x0000000000000000000000000000000000000000000000000000000000000002", // .... .... .... 0010
  SETDATA       = "0x0000000000000000000000000000000000000000000000000000000000000004", // .... .... .... 0100
  CALL          = "0x0000000000000000000000000000000000000000000000000000000000000008", // .... .... .... 1000
  STATICCALL    = "0x0000000000000000000000000000000000000000000000000000000000000010", // .... .... 0001 ....
  DELEGATECALL  = "0x0000000000000000000000000000000000000000000000000000000000000020", // .... .... 0010 ....
  DEPLOY        = "0x0000000000000000000000000000000000000000000000000000000000000040", // .... .... 0100 ....
  TRANSFERVALUE = "0x0000000000000000000000000000000000000000000000000000000000000080", // .... .... 1000 ....
  SIGN          = "0x0000000000000000000000000000000000000000000000000000000000000100", // .... 0001 .... ....
}
```

## Setting permissions

The code snippets below show how to set permissions for **Bob** on a Universal Profile owned by `yourEOA`.
It assumes that the profile has been deployed with our [lsp-factory.js](https://docs.lukso.tech/tools/lsp-factoryjs/getting-started) tool.

<Tabs>
  <TabItem value="web3js" label="web3.js" default>

```typescript
const GAS_LIMIT = 3_000_000;

let payload = await universalProfile.methods
  .setData(
    [
      PERMISSIONS_KEY_PREFIX + bobAddress.substr(2), // allow Bob to setData on your UP
      ADDRESS_PERMISSIONS_ARRAY_KEY, // length of AddressPermissions[]
      ADDRESS_PERMISSIONS_ARRAY_KEY.slice(0, 34) +
        "00000000000000000000000000000001", // add Bob's address into the list of permissions
    ],
    [
      PERMISSIONS.SETDATA,
      3, // 3 because UP owner + Universal Receiver Delegate permission have already been set by lsp-factory
      bobAddress,
    ]
  )
  .encodeABI();

keyManager.execute(payload).send({ from: yourEOA, gas: GAS_LIMIT });
```

  </TabItem>
  <TabItem value="etherjs" label="ether.js">

```typescript
let bobPermissions = ethers.utils.hexZeroPad(PERMISSIONS.SETDATA, 32);

let payload = universalProfile.interface.encodeFunctionData("setData", [
  [
    KEYS.PERMISSIONS + bobAddress.substr(2),
    ADDRESS_PERMISSIONS_ARRAY_KEY, // length of AddressPermissions[]
    ADDRESS_PERMISSIONS_ARRAY_KEY.slice(0, 34) +
      "00000000000000000000000000000001", // add Bob's address into the list of
  ],
  [
    bobPermissions,
    3, // 3 because UP owner + Universal Receiver Delegate permission have already been set by lsp-factory
    bobAddress,
  ],
]);

await keyManager.connect(yourEOA).execute(payload);
```

  </TabItem>
</Tabs>

## References

- <https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md>
- <https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP6-KeyManager>
