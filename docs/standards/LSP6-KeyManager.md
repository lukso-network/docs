---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LSP6-KeyManager

The Key Manager is a smart contract that functions as a gateway for an ERC725Account, sitting between an Account and other smart contracts or EOA that want to interact with it.

The idea of the Key Manager is not only about restricting, but also giving permissions to others, so that they can act on behalf of your ERC725 Account, based on the permissions you have granted to them.

:x: **Without a Key Manager**, only the ERC725Account's owner can use its Account.

:white_check_mark: **With a Key Manager** attached to an ERC725Account, you can enable contracts or EOAs to use your Account on your behalf.

The Key Manager can act as the owner of an ERC725Account. It can reads permissions of addresses from the key value store of the ERC725Account contract, and restricts access based on these permissions.

Permissions for a specific `<address>` are stored inside the ERC725Account contract storage, under specific keys listed in the table below. ([See LSP6 for more details](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#addresspermissionspermissionsaddress))

| Permission Type     | Key |
| ------------------- | :----------- |
| Address Permissions | `0x4b80742d0000000082ac0000<address>`       |
| Allowed Addresses   | `0x4b80742d00000000c6dd0000<address>`        |
| Allowed Functions   | `0x4b80742d000000008efe0000<address>`        |

Since permissions are stored under the ERC725Account contract, they are not attached to the Key Manager itself. The Key Manager can then easily be upgraded without the need to set all the permissions again.

## Types of permissions

There are 3 main types of permissions that can be set for addresses interacting with a Universal Profile.

- [**Address Permissions:**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#addresspermissionspermissionsaddress) defines a set of **permission values** for an `address`.

- [**Allowed Addresses:**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#addresspermissionsallowedaddressesaddress) defines which EOA or contract addresses an `address` is allowed to interact with.

- [**Allowed Functions:**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#addresspermissionsallowedfunctionsaddress) defines which function selectors an `address` is allowed to run on a specific contract.
### Permission values

The following default permissions can be set for any address. They are listed according to their importance.

<details>
    <summary><code>CHANGEOWNER</code>: Allows changing the owner of the controlled contract</summary>
        <p>Enables to change the owner of the Universal Profile.</p>
        <p>Using this permission, you can upgrade your KeyManager to a new one and transfer ownership to the new KeyManager.</p>
</details>

<details>
    <summary><code>CHANGEPERMISSIONS</code>: Allows changing of permissions of addresses</summary>
    <p>This permission allows an address to grant or revoke permissions for any specific address (including itself).</p>
</details>


<details>
    <summary><code>SETDATA</code>: Allows setting data on the controlled contract</summary>
    Allows an address to write any form of data in the <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#setdata">ERC725Y</a> key-value store of the linked `ERC725Account`.
</details>

<details>
    <summary><code>CALL</code>, <code>STATICCALL</code>: Allows calling other contracts through the controlled contract</summary>
    <p>This permission enables anyone to use the Universal Profile linked to Key Manager to make external calls (to contracts or Externally Owned Accounts)</p>
    <p>The difference between <code>CALL</code> and <code>STATICCALL</code> is that <code>STATICCALL</code> disallow state change at the target contract being called. If any state is changed, it will revert.
</p>
</details>

<details>
    <summary><code>DELEGATECALL</code>: Allows delegate calling other contracts through the controlled contract</summary>
    
    NB: the current KeyManager disallows the use of DELEGATECALL as this type of call can be harmful for the Universal Profile, as malicious code is run in the context of the Universal Profile.

</details>


<details>
    <summary><code>DEPLOY</code>: Allows deploying other contracts through the controlled contract</summary>
    <p>The <code>DEPLOY</code> permissions enables to create contracts either via the CREATE or CREATE2 opcode.</p>
</details>


<details>
    <summary><code>TRANSFERVALUE</code>: Allows transfering value to other contracts from the controlled contract</summary>
    Enables to send LYX from the linked Universal Profile to an address.<br/>
    If you are looking to do a simple native token transfer from the UP, it should call the <code>execute</code> function in the UP without passing any data, such as <code>up.execute(operationCall, recepient, amount, 0)</code>
</details>

<details>
    <summary><code>SIGN</code>: Allows signing on behalf of the controlled account, for example for login purposes</summary>
</details>

:::note

When deployed with the **lsp-factory**, the Universal Profile owner will have all the permissions below set by default.

:::

:::danger

Even if set, the permission **`DELEGATECALL`** is currently disallowed on the KeyManager because of its dangerous nature, as some malicious code could be executed in the context of the Universal Profile..

:::

### Allowed addresses

You can also set an address to interact only with specific addresses like contracts.
Let's say you want Bob to interact only with the contract at address `<target-contract-address>`
You can do so by setting up the following key:

key = `0x4b80742d00000000c6dd0000<bob-address>`
value = `<target-contract-address>`

:::info Infos

**If no addresses are set, interacting with any addresses is allowed.**

:::

### Allowed functions




## How to set permissions

We will start with an initial setup.

```typescript
const PERMISSIONS_KEY_PREFIX = "0x4b80742d0000000082ac0000";
const ADDRESS_PERMISSIONS_ARRAY_KEY = "0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3";

const enum KEYS {
  PERMISSIONS      = "0x4b80742d0000000082ac0000", // AddressPermissions:Permissions:<address> --> bytes32
  ALLOWEDADDRESSES = "0x4b80742d00000000c6dd0000", // AddressPermissions:AllowedAddresses:<address> --> address[]
  ALLOWEDFUNCTIONS = "0x4b80742d000000008efe0000", // AddressPermissions:AllowedFunctions:<address> --> bytes4[]
}

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

The code snippets below show how to set permissions for **Bob** on your Universal Profile, owned by `yourEOA`.
It assumes that your profile has been deployed using lsp-factory.js tool.

<Tabs>
  <TabItem value="web3js" label="web3.js" default>

````typescript
const GAS_LIMIT = 3_000_000;

let payload = await universalProfile.methods.setData(
    [
        PERMISSIONS_KEY_PREFIX + bobAddress.substr(2), // allow Bob to setData on your UP
        ADDRESS_PERMISSIONS_ARRAY_KEY, // length of AddressPermissions[]
        ADDRESS_PERMISSIONS_ARRAY_KEY.slice(0, 34) + "00000000000000000000000000000001" // add Bob's address into the list of permissions
    ],
    [
        PERMISSIONS.SETDATA,
        3, // 3 because UP owner + Universal Receiver Delegate permission have already been set by lsp-factory
        bobAddress
    ]
).encodeABI();

keyManager.execute(payload).send({ from: yourEOA, gas: GAS_LIMIT });
````

  </TabItem>
  <TabItem value="etherjs" label="ether.js">

````typescript
let bobPermissions = ethers.utils.hexZeroPad(PERMISSIONS.SETDATA, 32);

let payload = universalProfile.interface.encodeFunctionData("setData", [
    [
        KEYS.PERMISSIONS + bobAddress.substr(2),
        ADDRESS_PERMISSIONS_ARRAY_KEY, // length of AddressPermissions[]
        ADDRESS_PERMISSIONS_ARRAY_KEY.slice(0, 34) + "00000000000000000000000000000001" // add Bob's address into the list of 
    ],
    [
        bobPermissions,
        3, // 3 because UP owner + Universal Receiver Delegate permission have already been set by lsp-factory
        bobAddress
    ]
]);

await keyManager.connect(yourEOA).execute(payload)
````

  </TabItem>
</Tabs>


## Listing addresses with permissions

The key `AddressPermissions[]` key will contain all the addresses that have a permission set on the ERC725Account.

## References

- <https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md>
- <https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP6-KeyManager>
