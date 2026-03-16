---
sidebar_label: 'Restrict What a Controller Can Do'
sidebar_position: 3
description: Learn how to restrict a controller to only specific contracts, functions, or token standards using LSP6 Key Manager Allowed Calls on LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Restrict What a Controller Can Do

Granting a controller the `CALL` permission lets it execute calls on behalf of your Universal Profile — but by itself that permission is too broad. An automated bot with `CALL` permission can theoretically interact with any contract your UP can reach. **Allowed Calls** add a second layer of access control by restricting _which_ contracts, _which_ interface standards, and _which_ function selectors a controller is allowed to call.

Think of permissions as the doors a controller can open, and Allowed Calls as the specific keys they are allowed to use once inside.

:::info

Full code examples are available in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground) repository.

:::

## What you will learn

- How to restrict an automated staking bot to only call `deposit()` on a specific vault contract
- How to lock a controller so it can only send LYX to one specific address
- How to allow a DeFi bot to interact with any LSP7 token contract, but nothing else
- How to give a team member the ability to update NFT metadata without being able to transfer tokens or drain LYX

## Prerequisites

- A deployed Universal Profile (see [Deploy a Universal Profile](/learn/getting-started))
- A controller address already granted `CALL` permission (see [Grant Permissions](./grant-permissions.md))

## How Allowed Calls work

Each Allowed Calls entry is a **32-byte packed value** stored under the `AddressPermissions:AllowedCalls:<controllerAddress>` data key as a `CompactBytesArray`. The four fields are concatenated with no padding:

| Field | Size | Description |
| --- | --- | --- |
| Call type | 4 bytes | Type of call: `CALL` (`0x00000002`), `STATICCALL` (`0x00000001`), `DELEGATECALL` (`0x00000003`) |
| Address | 20 bytes | Target contract address, or `0xffffffffffffffffffffffffffffffffffffffff` for any |
| Standard | 4 bytes | Interface ID the target contract must support, or `0xffffffff` for any |
| Function | 4 bytes | Function selector the controller may call, or `0xffffffff` for any |

So a single 32-byte entry looks like:

```
0x 00000002 9F49a95b0c3c9e2A6c77a16C177928294c0F6F04 ffffffff d0e30db0
   ^-------  ^---------------------------------------  ^-------  ^-------
   calltype  address (20 bytes)                        standard  selector
```

When multiple entries are present they are encoded as a `CompactBytesArray` — erc725.js handles this automatically.

---

## Example 1: Staking-only controller

**Context:** You want an automated bot to stake LYX on [Stakingverse](https://stakingverse.io) without being able to drain your UP or interact with any other contract.

The bot is granted `CALL` permission (see [Grant Permissions](./grant-permissions.md)), and its Allowed Calls list is restricted to a single entry: `deposit()` on the Stakingverse vault.

<Tabs>
<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import { createWalletClient, http } from 'viem';
import { lukso } from 'viem/chains';
import UniversalProfileArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

const STAKING_VAULT = '0x9F49a95b0c3c9e2A6c77a16C177928294c0F6F04';
const STAKING_BOT_ADDRESS = '0xYourBotAddress'; // replace with your bot address

const erc725 = new ERC725(
  LSP6Schema,
  myUPAddress,
  'https://rpc.lukso.network',
);

// CALL type (0x00000002) + vault address (20 bytes) + any standard (0xffffffff) + deposit() selector
const depositEntry =
  `0x00000002` +
  STAKING_VAULT.slice(2) +
  `ffffffff` +
  `d0e30db0`; // deposit()

const encodedAllowedCalls = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [STAKING_BOT_ADDRESS],
    value: [depositEntry],
  },
]);

// Connect the UP Browser Extension and send the transaction
const [account] = await window.lukso.request({ method: 'eth_requestAccounts' });

const walletClient = createWalletClient({ account, chain: lukso, transport: http() });

await walletClient.writeContract({
  address: myUPAddress,
  abi: UniversalProfileArtifact.abi,
  functionName: 'setData',
  args: [encodedAllowedCalls.keys[0], encodedAllowedCalls.values[0]],
});
```

</TabItem>
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
import { ERC725 } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import { ethers } from 'ethers';
import UniversalProfileArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

const STAKING_VAULT = '0x9F49a95b0c3c9e2A6c77a16C177928294c0F6F04';
const STAKING_BOT_ADDRESS = '0xYourBotAddress'; // replace with your bot address

const erc725 = new ERC725(
  LSP6Schema,
  myUPAddress,
  'https://rpc.lukso.network',
);

// CALL type (0x00000002) + vault address (20 bytes) + any standard (0xffffffff) + deposit() selector
const depositEntry =
  `0x00000002` +
  STAKING_VAULT.slice(2) +
  `ffffffff` +
  `d0e30db0`; // deposit()

const encodedAllowedCalls = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [STAKING_BOT_ADDRESS],
    value: [depositEntry],
  },
]);

// Connect the UP Browser Extension and send the transaction
const provider = new ethers.BrowserProvider(window.lukso);
const signer = await provider.getSigner();

const universalProfile = new ethers.Contract(
  myUPAddress,
  UniversalProfileArtifact.abi,
  signer,
);

await universalProfile.setData(
  encodedAllowedCalls.keys[0],
  encodedAllowedCalls.values[0],
);
```

</TabItem>
<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC725Y} from "@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol";

contract SetStakingBotAllowedCalls {
    // Stakingverse vault on LUKSO mainnet
    address constant STAKING_VAULT = 0x9F49a95b0c3c9e2A6c77a16C177928294c0F6F04;

    function restrictStakingBot(
        address universalProfile,
        address stakingBot
    ) external {
        // Data key: AddressPermissions:AllowedCalls:<controllerAddress>
        bytes32 dataKey = bytes32(
            abi.encodePacked(
                bytes12(0x4b80742de2bf393a64c70000), // AddressPermissions:AllowedCalls:<address> full prefix
                stakingBot
            )
        );

        // 32-byte packed entry: CALL + vault + any standard + deposit() selector
        bytes memory allowedCallEntry = abi.encodePacked(
            bytes4(0x00000002),    // CALL type
            STAKING_VAULT,         // target address (20 bytes)
            bytes4(0xffffffff),    // any interface standard
            bytes4(0xd0e30db0)     // deposit() selector
        );

        // CompactBytesArray encoding: 2-byte length prefix per element
        bytes memory compactEncoded = abi.encodePacked(
            uint16(allowedCallEntry.length), // 0x0020 (32 bytes)
            allowedCallEntry
        );

        IERC725Y(universalProfile).setData(dataKey, compactEncoded);
    }
}
```

</TabItem>
</Tabs>

### Two-tier split: separate staking and withdrawal controllers

For better security, split staking and withdrawal into two separate controllers. That way, a compromised staking bot cannot withdraw your funds.

<Tabs>
<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
const STAKING_BOT = '0xYourStakingBotAddress';
const WITHDRAWAL_BOT = '0xYourWithdrawalBotAddress';

// Staking controller: deposit() only
const depositEntry =
  `0x00000002` + STAKING_VAULT.slice(2) + `ffffffff` + `d0e30db0`;

// Withdrawal controller: withdraw(uint256,address) and claim(uint256,address)
const requestWithdrawalEntry =
  `0x00000002` + STAKING_VAULT.slice(2) + `ffffffff` + `fbbdb3ae`;

const claimWithdrawalEntry =
  `0x00000002` + STAKING_VAULT.slice(2) + `ffffffff` + `76657593`;

const encodedData = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [STAKING_BOT],
    value: [depositEntry],
  },
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [WITHDRAWAL_BOT],
    value: [requestWithdrawalEntry, claimWithdrawalEntry],
  },
]);

// setDataBatch to apply both in one transaction
await walletClient.writeContract({
  address: myUPAddress,
  abi: UniversalProfileArtifact.abi,
  functionName: 'setDataBatch',
  args: [encodedData.keys, encodedData.values],
});
```

</TabItem>
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
const STAKING_BOT = '0xYourStakingBotAddress';
const WITHDRAWAL_BOT = '0xYourWithdrawalBotAddress';

// Staking controller: deposit() only
const depositEntry =
  `0x00000002` + STAKING_VAULT.slice(2) + `ffffffff` + `d0e30db0`;

// Withdrawal controller: withdraw(uint256,address) and claim(uint256,address)
const requestWithdrawalEntry =
  `0x00000002` + STAKING_VAULT.slice(2) + `ffffffff` + `fbbdb3ae`;

const claimWithdrawalEntry =
  `0x00000002` + STAKING_VAULT.slice(2) + `ffffffff` + `76657593`;

const encodedData = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [STAKING_BOT],
    value: [depositEntry],
  },
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [WITHDRAWAL_BOT],
    value: [requestWithdrawalEntry, claimWithdrawalEntry],
  },
]);

// setDataBatch to apply both in one transaction
await universalProfile.setDataBatch(encodedData.keys, encodedData.values);
```

</TabItem>
<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

```solidity
// For the withdrawal controller, allow both requestWithdrawal and claimWithdrawal
bytes memory requestEntry = abi.encodePacked(
    bytes4(0x00000002),   // CALL type
    STAKING_VAULT,         // target address
    bytes4(0xffffffff),    // any standard
    bytes4(0xfbbdb3ae)     // withdraw(uint256,address)
);

bytes memory claimEntry = abi.encodePacked(
    bytes4(0x00000002),   // CALL type
    STAKING_VAULT,         // target address
    bytes4(0xffffffff),    // any standard
    bytes4(0x76657593)     // claim(uint256,address)
);

// CompactBytesArray with two 32-byte entries
bytes memory compactEncoded = abi.encodePacked(
    uint16(32), requestEntry,
    uint16(32), claimEntry
);
```

</TabItem>
</Tabs>

### Liquid staking controller: convert stake to sLYX

**Context:** You want a controller that can call [`transferStake`](https://stakingverse.io) on the Stakingverse vault to convert your staked LYX into liquid **sLYX** tokens ([`0x8a3982f0a7d154d11a5f43eec7f50e52ebbc8f7d`](https://explorer.execution.mainnet.lukso.network/address/0x8a3982f0a7d154d11a5f43eec7f50e52ebbc8f7d)) — without being able to call any other function on the vault or any other contract.

`transferStake(address to, uint256 amount, bytes calldata data)` — selector: `0x1c892b5a`

<Tabs>
<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
import { createWalletClient, http } from 'viem';
import { lukso } from 'viem/chains';
import ERC725 from '@erc725/erc725.js';

const LIQUID_STAKING_CONTROLLER = '0xYourLiquidStakingControllerAddress';
const STAKING_VAULT = '0x9F49a95b0c3c9e2A6c77a16C177928294c0F6F04';
const SLYX_TOKEN   = '0x8a3982f0a7d154d11a5f43eec7f50e52ebbc8f7d';

// Restrict to transferStake(address,uint256,bytes) only on the Stakingverse vault
// When called, the `to` param should be set to the sLYX token address to receive liquid sLYX
const transferStakeEntry =
  `0x00000002` + STAKING_VAULT.slice(2) + `ffffffff` + `1c892b5a`;

const erc725 = new ERC725([]);
const encodedData = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [LIQUID_STAKING_CONTROLLER],
    value: [transferStakeEntry],
  },
]);

await walletClient.writeContract({
  address: myUPAddress,
  abi: UniversalProfileArtifact.abi,
  functionName: 'setDataBatch',
  args: [encodedData.keys, encodedData.values],
});
```

</TabItem>
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
import ERC725 from '@erc725/erc725.js';
import { ethers } from 'ethers';
import UniversalProfileArtifact from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

const LIQUID_STAKING_CONTROLLER = '0xYourLiquidStakingControllerAddress';
const STAKING_VAULT = '0x9F49a95b0c3c9e2A6c77a16C177928294c0F6F04';

// Restrict to transferStake(address,uint256,bytes) — selector 0x1c892b5a
const transferStakeEntry =
  `0x00000002` + STAKING_VAULT.slice(2) + `ffffffff` + `1c892b5a`;

const erc725 = new ERC725([]);
const encodedData = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [LIQUID_STAKING_CONTROLLER],
    value: [transferStakeEntry],
  },
]);

const universalProfile = new ethers.Contract(
  myUPAddress,
  UniversalProfileArtifact.abi,
  signer,
);
await universalProfile.setDataBatch(encodedData.keys, encodedData.values);
```

</TabItem>
<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

```solidity
address constant STAKING_VAULT = 0x9F49a95b0c3c9e2A6c77a16C177928294c0F6F04;
address constant SLYX_TOKEN    = 0x8a3982f0a7d154d11a5f43eec7f50e52ebbc8f7d;

// transferStake(address,uint256,bytes) selector = 0x1c892b5a
bytes memory transferStakeEntry = abi.encodePacked(
    bytes4(0x00000002),   // CALL type
    STAKING_VAULT,         // target: Stakingverse vault only
    bytes4(0xffffffff),    // any ERC165 standard
    bytes4(0x1c892b5a)     // transferStake(address,uint256,bytes)
);

bytes memory compactEncoded = abi.encodePacked(uint16(32), transferStakeEntry);

// Full key: 0x4b80742de2bf393a64c70000<controllerAddress>
// MappingWithGrouping: bytes6 hash + bytes4 hash + bytes2(0x0000) + address
bytes32 allowedCallsKey = bytes32(
    abi.encodePacked(
        bytes12(0x4b80742de2bf393a64c70000), // AddressPermissions:AllowedCalls:<address> full prefix
        LIQUID_STAKING_CONTROLLER
    )
);

IERC725Y(myUPAddress).setData(allowedCallsKey, compactEncoded);
```

</TabItem>
</Tabs>

:::tip Calling transferStake
When the restricted controller calls `transferStake`, it passes the **sLYX token address** (`0x8a3982f0a7d154d11a5f43eec7f50e52ebbc8f7d`) as the `to` param and the desired amount. If the recipient implements `IVaultStakeRecipient`, the vault will call `onVaultStakeReceived` — enabling automated liquid staking flows directly from your Universal Profile.
:::

---

## Example 2: Send LYX to one address only

**Context:** A payroll or savings controller that can only send LYX to your cold wallet — nothing else. Even if the controller key is compromised, the attacker can only forward funds to your own cold address.

<Tabs>
<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
const CONTROLLER_ADDRESS = '0xYourPayrollController';
const COLD_WALLET = '0xYourColdWalletAddress'; // the only permitted recipient

// CALL type + cold wallet (20 bytes) + any standard + any selector
const coldWalletEntry =
  `0x00000002` + COLD_WALLET.slice(2) + `ffffffff` + `ffffffff`;

const encodedAllowedCalls = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [CONTROLLER_ADDRESS],
    value: [coldWalletEntry],
  },
]);

await walletClient.writeContract({
  address: myUPAddress,
  abi: UniversalProfileArtifact.abi,
  functionName: 'setData',
  args: [encodedAllowedCalls.keys[0], encodedAllowedCalls.values[0]],
});
```

</TabItem>
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
const CONTROLLER_ADDRESS = '0xYourPayrollController';
const COLD_WALLET = '0xYourColdWalletAddress'; // the only permitted recipient

// CALL type + cold wallet (20 bytes) + any standard + any selector
const coldWalletEntry =
  `0x00000002` + COLD_WALLET.slice(2) + `ffffffff` + `ffffffff`;

const encodedAllowedCalls = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [CONTROLLER_ADDRESS],
    value: [coldWalletEntry],
  },
]);

await universalProfile.setData(
  encodedAllowedCalls.keys[0],
  encodedAllowedCalls.values[0],
);
```

</TabItem>
<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

```solidity
address constant COLD_WALLET = 0xYourColdWalletAddress;

// CALL type + cold wallet address + any standard + any selector
bytes memory allowedCallEntry = abi.encodePacked(
    bytes4(0x00000002),  // CALL type
    COLD_WALLET,          // target address (20 bytes)
    bytes4(0xffffffff),   // any interface standard
    bytes4(0xffffffff)    // any function selector
);

bytes memory compactEncoded = abi.encodePacked(
    uint16(allowedCallEntry.length),
    allowedCallEntry
);
```

</TabItem>
</Tabs>

---

## Example 3: Interact with any LSP7 token

**Context:** A DeFi bot that can call `transfer` on any LSP7 fungible token contract — but cannot touch your UP metadata, NFTs, or LYX balance. The Standard field is set to the LSP7 interface ID (`0xc52d6008`), so the Key Manager will verify the target contract supports LSP7 before allowing the call.

<Tabs>
<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
const DEFI_BOT = '0xYourDeFiBotAddress';

// CALL type + any address + LSP7 interface ID + transfer() selector
// transfer(address,address,uint256,bool,bytes) = 0x760d9bba
const lsp7TransferEntry =
  `0x00000002` +
  `ffffffffffffffffffffffffffffffffffffffff` + // any address
  `c52d6008` + // INTERFACE_ID_LSP7
  `760d9bba`; // transfer(address,address,uint256,bool,bytes)

const encodedAllowedCalls = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [DEFI_BOT],
    value: [lsp7TransferEntry],
  },
]);

await walletClient.writeContract({
  address: myUPAddress,
  abi: UniversalProfileArtifact.abi,
  functionName: 'setData',
  args: [encodedAllowedCalls.keys[0], encodedAllowedCalls.values[0]],
});
```

</TabItem>
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
const DEFI_BOT = '0xYourDeFiBotAddress';

// CALL type + any address + LSP7 interface ID + transfer() selector
// transfer(address,address,uint256,bool,bytes) = 0x760d9bba
const lsp7TransferEntry =
  `0x00000002` +
  `ffffffffffffffffffffffffffffffffffffffff` + // any address
  `c52d6008` + // INTERFACE_ID_LSP7
  `760d9bba`; // transfer(address,address,uint256,bool,bytes)

const encodedAllowedCalls = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [DEFI_BOT],
    value: [lsp7TransferEntry],
  },
]);

await universalProfile.setData(
  encodedAllowedCalls.keys[0],
  encodedAllowedCalls.values[0],
);
```

</TabItem>
<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

```solidity
bytes4 constant INTERFACE_ID_LSP7 = 0xc52d6008;
bytes4 constant LSP7_TRANSFER_SELECTOR = 0x760d9bba; // transfer(address,address,uint256,bool,bytes)

// CALL type + any address + LSP7 standard + transfer() selector
bytes memory allowedCallEntry = abi.encodePacked(
    bytes4(0x00000002),               // CALL type
    address(0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF), // any address
    INTERFACE_ID_LSP7,                 // only LSP7-compliant contracts
    LSP7_TRANSFER_SELECTOR             // transfer(address,address,uint256,bool,bytes)
);

bytes memory compactEncoded = abi.encodePacked(
    uint16(allowedCallEntry.length),
    allowedCallEntry
);
```

</TabItem>
</Tabs>

---

## Example 4: Update NFT metadata only (Marketing manager)

**Context:** You give a team member the ability to call `setDataForTokenId` on your LSP8 NFT contract to update token metadata — without being able to transfer tokens or drain LYX. The Standard field is set to the LSP8 interface ID (`0x3a271706`) and the selector is locked to `setDataForTokenId`.

<Tabs>
<TabItem value="viem" label="viem" attributes={{className: "tab_viem"}}>

```ts
const MARKETING_MANAGER = '0xTeamMemberAddress';
const NFT_CONTRACT = '0xYourLSP8ContractAddress'; // your specific NFT contract

// CALL type + NFT contract + LSP8 interface ID + setDataForTokenId() selector
// setDataForTokenId(bytes32,bytes32,bytes) = 0xd6c1407c
const nftMetadataEntry =
  `0x00000002` +
  NFT_CONTRACT.slice(2) +
  `3a271706` + // INTERFACE_ID_LSP8
  `d6c1407c`; // setDataForTokenId(bytes32,bytes32,bytes)

const encodedAllowedCalls = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [MARKETING_MANAGER],
    value: [nftMetadataEntry],
  },
]);

await walletClient.writeContract({
  address: myUPAddress,
  abi: UniversalProfileArtifact.abi,
  functionName: 'setData',
  args: [encodedAllowedCalls.keys[0], encodedAllowedCalls.values[0]],
});
```

</TabItem>
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
const MARKETING_MANAGER = '0xTeamMemberAddress';
const NFT_CONTRACT = '0xYourLSP8ContractAddress'; // your specific NFT contract

// CALL type + NFT contract + LSP8 interface ID + setDataForTokenId() selector
// setDataForTokenId(bytes32,bytes32,bytes) = 0xd6c1407c
const nftMetadataEntry =
  `0x00000002` +
  NFT_CONTRACT.slice(2) +
  `3a271706` + // INTERFACE_ID_LSP8
  `d6c1407c`; // setDataForTokenId(bytes32,bytes32,bytes)

const encodedAllowedCalls = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: [MARKETING_MANAGER],
    value: [nftMetadataEntry],
  },
]);

await universalProfile.setData(
  encodedAllowedCalls.keys[0],
  encodedAllowedCalls.values[0],
);
```

</TabItem>
<TabItem value="solidity" label="Solidity" attributes={{className: "tab_solidity"}}>

```solidity
bytes4 constant INTERFACE_ID_LSP8 = 0x3a271706;
bytes4 constant SET_DATA_FOR_TOKEN_ID_SELECTOR = 0xd6c1407c; // setDataForTokenId(bytes32,bytes32,bytes)

address constant NFT_CONTRACT = 0xYourLSP8ContractAddress;

// CALL type + specific NFT contract + LSP8 standard + setDataForTokenId() selector
bytes memory allowedCallEntry = abi.encodePacked(
    bytes4(0x00000002),           // CALL type
    NFT_CONTRACT,                  // specific NFT contract (20 bytes)
    INTERFACE_ID_LSP8,             // only LSP8-compliant contracts
    SET_DATA_FOR_TOKEN_ID_SELECTOR // setDataForTokenId(bytes32,bytes32,bytes)
);

bytes memory compactEncoded = abi.encodePacked(
    uint16(allowedCallEntry.length),
    allowedCallEntry
);
```

</TabItem>
</Tabs>

---

## Common Mistakes

:::warning SUPER_CALL bypasses Allowed Calls

If you grant a controller the `SUPER_CALL` permission instead of `CALL`, **all Allowed Calls restrictions are completely ignored**. The controller can call any contract without restriction. Always use `CALL` (not `SUPER_CALL`) for controllers you want to restrict.

:::

:::caution Allowed Calls cannot cap LYX amounts

Allowed Calls restrict _which_ contracts a controller can interact with, not _how much_ LYX it can send per transaction. If you need to cap deposit amounts, implement that guard in the target contract's logic.

:::

:::note Encoding gotcha

The calltype + address + standard + selector fields must be packed **contiguously with no padding** between them. The resulting entry is exactly 32 bytes. One wrong byte offset causes the permission check to silently fail at runtime. Always test your encoding on testnet before going to mainnet.

:::

:::note LSP7 transfer selector

The correct selector for LSP7 `transfer` is `0x760d9bba`. The **full** function signature is `transfer(address,address,uint256,bool,bytes)`. Omitting the `force` flag or the `data` parameter produces a different selector and every call will revert with a permission error that is hard to debug.

:::
