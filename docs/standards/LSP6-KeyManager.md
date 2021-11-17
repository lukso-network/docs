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

---

> [See LSP6 for more details](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#erc725y-keys)

<br/>
Since permissions are stored under the ERC725Account contract, they are not attached to the Key Manager itself. The Key Manager can then easily be upgraded without the need to set all the permissions again.

---

## <a name="types-of-permissions"></a> Types of permissions

There are 3 main types of permissions that can be set for addresses interacting with a Universal Profile.

- [**Address Permissions**](#permissions-value): defines a set of **permission values** for an `address`.

- [**Allowed Addresses:**](#allowed-addresses) defines which EOA or contract addresses an `address` is allowed to interact with.

- [**Allowed Functions:**](#allowed-functions) defines which function selectors an `address` is allowed to run on a specific contract.

### <a name="permissions-value"></a> Permission values

The following default permissions can be set for any address. They are listed in the table below, according to their importance.

You can find **more details about each permissions by clicking on the toggles below**.

<details>
    <summary><code>CHANGEOWNER</code> - Allows changing the owner of the controlled contract</summary>
        <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
            <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000001</code>
        </p>
        <p>Enables to change the owner of the linked ERC725Account.</p>
        <p>Using this permission, you can easily upgrade the <code>KeyManager</code> attached to the Account by transferring ownership to a new <code>KeyManagerV2</code>.</p>
</details>

<details>
    <summary><code>CHANGEPERMISSIONS</code> - Allows changing of permissions of addresses (adding + removing)</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000002</code>
    </p>
    <p>This permission allows an address to <b>grant + revoke</b> permissions for any specific address (including itself).</p>
</details>

<details>
    <summary><code>ADDPERMISSIONS</code> - Allows adding new permissions to addresses</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000004</code>
    </p>
    <p>This permission allows an address to <b>grant <span style={{ color: "red" }}>(but not revoke)</span></b> permissions for any specific address (including itself).</p>
</details>

<details>
    <summary><code>SETDATA</code> - Allows setting data on the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000008</code>
    </p>
    Allows an address to write any form of data in the <a href="https://**github**.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y">ERC725Y</a> key-value store of the linked `ERC725Account` (except permissions, that requires the permissions <code>CHANGEPERMISSIONS</code> described above).

</details>

<details>
    <summary><code>CALL</code>, <code>STATICCALL</code> - Allows calling other contracts through the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value for CALL = </b><code>0x0000000000000000000000000000000000000000000000000000000000000010</code><br/>
        <b>value for STATICCALL = </b><code>0x0000000000000000000000000000000000000000000000000000000000000020</code>
    </p>
    <p>This permission enables anyone to use the ERC725Account linked to Key Manager to make external calls (to contracts or Externally Owned Accounts)</p>
    <p>The difference between <code>CALL</code> and <a href="https://eips.ethereum.org/EIPS/eip-214"><code>STATICCALL</code></a> is that <b>staticcall</b> disallows state change at the target contract.</p>
    <blockquote>If any state is changed at a target contract through a <code>STATICCALL</code>, the call will revert.</blockquote>
</details>

<details>
    <summary><code>DELEGATECALL</code> - Allows delegate calling other contracts through the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000040</code>
    </p>
    <blockquote>This call type is currently disallowed. See note below for more details.</blockquote>
</details>

<details>
    <summary><code>DEPLOY</code> - Allows deploying other contracts through the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000080</code>
    </p>
    <p>Enables the caller to deploy a smart contract, using the linked ERC725Account as a deployer. The bytecode of the contract to be deployed should be provided in the payload (abi-encoded) passed to the Key Manager.</p>
    <blockquote>Both the <code>CREATE</code> or <a href="https://eips.ethereum.org/EIPS/eip-1014"><code>CREATE2</code></a> opcode can be used to deploy the contract.</blockquote>
</details>

<details>
    <summary><code>TRANSFERVALUE</code> - Allows transfering value to other contracts from the controlled contract</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000100</code>
    </p>
    Enables to send native currency from the linked ERC725Account to any address.<br/><br/>
    <blockquote>
        NB: for a simple native token transfer, no data (<code>""</code>) should be passed to the fourth parameter of the <code>execute</code> function of the Account contract.<br/>
        For instance: <code>account.execute(operationCall, recipient, amount, "")</code>
    </blockquote>
</details>

<details>
    <summary><code>SIGN</code>: Allows signing on behalf of the controlled account, for example for login purposes</summary>
    <p style={{marginBottom: '3%', marginTop: '2%', textAlign: 'center'}}>
        <b>value = </b><code>0x0000000000000000000000000000000000000000000000000000000000000200</code>
    </p>
    The <code>SIGN</code> permission can be used for keys to sign login messages. It is mostly for web2.0 apps to know which key SHOULD sign.
</details>

**Permissions can be combined together**, if an address needs to hold more than one permission.

Simply calculate the sum of their decimal value, and convert the result back into hexadecimal. For instance:

> [See LSP6 Specs for more details](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#permission-values-in-addresspermissionspermissionsaddress)

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

:::note

When deployed with our [**lsp-factory** tool](https://docs.lukso.tech/tools/lsp-factoryjs/introduction/getting-started/), the Universal Profile owner will have all the permissions above set by default.

:::

:::caution

Each permission MUST be:

- **exactly 32 bytes long**
- zero left-padded
  - So ✅ `0x0000000000000000000000000000000000000000000000000000000000000008`
  - Not ❌ `0x0800000000000000000000000000000000000000000000000000000000000000`

For instance, if you try to set the permission SETDATA for an address as `0x08`, this will be stored internally as `0x0800000000000000000000000000000000000000000000000000000000000000`, and will cause incorrect behaviour with odd revert messages.

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

---

## Permission Keys

Below is a list of ERC725Y Permission Keys related to the Key Manager.
We will store these values in a file `constants.js`, and reuse them through the next code snippets.

```javascript
// file: constants.js

// keccak256('AddressPermissions[]')
const PERMISSIONS_ARRAY = "0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3";

// prettier-ignore
const ADDRESSES = {
  PERMISSIONS:      "0x4b80742d0000000082ac0000", // AddressPermissions:Permissions:<address> --> bytes32
  ALLOWEDADDRESSES: "0x4b80742d00000000c6dd0000", // AddressPermissions:AllowedAddresses:<address> --> address[]
  ALLOWEDFUNCTIONS: "0x4b80742d000000008efe0000", // AddressPermissions:AllowedFunctions:<address> --> bytes4[]
}

// prettier-ignore
const PERMISSIONS = {
  CHANGEOWNER:      "0x0000000000000000000000000000000000000000000000000000000000000001", // 0000 0000 0000 0001
  CHANGEPERMISSIONS:"0x0000000000000000000000000000000000000000000000000000000000000002", // .... .... .... 0010
  ADDPERMISSIONS:   "0x0000000000000000000000000000000000000000000000000000000000000004", // .... .... .... 0100
  SETDATA:          "0x0000000000000000000000000000000000000000000000000000000000000008", // .... .... .... 1000
  CALL:             "0x0000000000000000000000000000000000000000000000000000000000000010", // .... .... 0001 ....
  STATICCALL:       "0x0000000000000000000000000000000000000000000000000000000000000020", // .... .... 0010 ....
  DELEGATECALL:     "0x0000000000000000000000000000000000000000000000000000000000000040", // .... .... 0100 ....
  DEPLOY:           "0x0000000000000000000000000000000000000000000000000000000000000080", // .... .... 1000 ....
  TRANSFERVALUE:    "0x0000000000000000000000000000000000000000000000000000000000000100", // .... 0001 .... ....
  SIGN:             "0x0000000000000000000000000000000000000000000000000000000000000200", // .... 0010 .... ....
}

module.exports = {
  ADDRESSES,
  PERMISSIONS,
  PERMISSIONS_ARRAY,
};
```

---

## Setting permissions

The code snippets below show how to set permissions for **Bob** on a Universal Profile owned by `yourEOA`.
It assumes that the profile has been deployed with our [lsp-factory.js](https://docs.lukso.tech/tools/lsp-factoryjs/introduction/getting-started) tool.

<Tabs>
  <TabItem value="web3js" label="web3.js" default>

```javascript
// see file above constants.js
const { ADDRESSES, PERMISSIONS, PERMISSIONS_ARRAY } = require("./constants");

const UniversalProfile = require("@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json");
const KeyManager = require("@lukso/universalprofile-smart-contracts/artifacts/LSP6KeyManager.json");

const universalProfile = new web3.eth.Contract(UniversalProfile.abi, "<your-UniversalProfile-address>");
const keyManager = new web3.eth.Contract(KeyManager.abi, "<your-KeyManager-Address>");

let bobAddress = "0xcafecafecafecafecafecafecafecafecafecafe";
let bobPermissions = PERMISSIONS.SETDATA;

// give the permission SETDATA to Bob
async function setBobPermission() {
  let payload = await universalProfile.methods
    .setData(
      [
        ADDRESSES.PERMISSIONS + bobAddress.substr(2), // allow Bob to setData on your UP
        PERMISSIONS_ARRAY, // length of AddressPermissions[]
        PERMISSIONS_ARRAY.slice(0, 34) + "00000000000000000000000000000001", // add Bob's address into the list of permissions
      ],
      [
        bobPermissions,
        3, // 3 because UP owner + Universal Receiver Delegate permission have already been set by lsp-factory
        bobAddress,
      ]
    )
    .encodeABI();

  keyManager.execute(payload).send({ from: "<your-eoa-address>", gas: 300_000 });
}

setBobPermission();
```

  </TabItem>
  <TabItem value="etherjs" label="ether.js">

```javascript
// see file above constants.js
const { ADDRESSES, PERMISSIONS, PERMISSIONS_ARRAY } = require("./constants");

const UniversalProfile = require("@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json");
const KeyManager = require("@lukso/universalprofile-smart-contracts/artifacts/LSP6KeyManager.json");

const universalProfile = new ethers.Contract("<your-UniversalProfile-address>", UniversalProfile.abi);
const keyManager = new ethers.Contract("<your-KeyManager-Address>", KeyManager.abi);

let bobAddress = "0xcafecafecafecafecafecafecafecafecafecafe";
let bobPermissions = ethers.utils.hexZeroPad(PERMISSIONS.SETDATA, 32);

// give the permission SETDATA to Bob
async function setBobPermission() {
  let payload = universalProfile.interface.encodeFunctionData("setData", [
    [
      ADDRESSES.PERMISSIONS + bobAddress.substr(2),
      PERMISSIONS_ARRAY, // length of AddressPermissions[]
      PERMISSIONS_ARRAY.slice(0, 34) + "00000000000000000000000000000001", // add Bob's address into the list of
    ],
    [
      bobPermissions,
      3, // 3 because UP owner + Universal Receiver Delegate permission have already been set by lsp-factory
      bobAddress,
    ],
  ]);

  await keyManager.connect(yourEOA).execute(payload); // yourEOA should be of type Signer
}

setBobPermission();
```

  </TabItem>
</Tabs>

## References

- [LUKSO Standards Proposals: LSP6 - Key Manager (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)
- [LSP6 KeyManager: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP6-KeyManager)
