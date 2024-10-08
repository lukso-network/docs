---
title: ⛽️ Execute Relay Call (Meta Transactions)
sidebar_position: 7
---

# Execute Relay Call

## Sequential relay calls in the same channel

When executing 3 sequential relay calls with sequential nonces in a single channel (= nonces from the KeyManager retrieved via [`getNonce`](../contracts/LSP6KeyManager/LSP6KeyManager.md#getnonce), keep in mind that **if the first transaction does revert, the next 2 will revert in turns**. That happens because a Key Manager nonce is assigned to each relay call.

E.g.:

- First relay call - nonce is 4
- Second relay call - nonce is 5
- Third relay call - nonce is 6

One of the requirements for executing a relay call is that **the latest nonce (for a specific signer) stored on-chain in the Key Manager contract must be the same as the one used when signing the executed relay call**. After each successful execution, the on-chain nonce is incremented.

Given the example above, the on-chain nonce is 4 and we are executing the relay calls.

**If the first relay call pass ✅**

- First relay call: nonce was 4 -> incremented to 5
- Second relay call: nonce was 5 -> incremented to 6
- Third relay call: nonce was 6 -> incremented to 7

**If the first relay call fails ❌**

- **First relay call reverts ❌** nonce was 4 -> nonce remains 4
- Second relay call: nonce on-chain is 4 -> nonce used to sign was 5 = reverts ❌ with [`InvalidRelayNonce`](../contracts//LSP6KeyManager/LSP6KeyManager.md#invalidrelaynonce)
- Third relay call: nonce on-chain is 5 -> nonce used to sign was 6 = reverts ❌ with [`InvalidRelayNonce`](../contracts//LSP6KeyManager/LSP6KeyManager.md#invalidrelaynonce)

## Validity timestamps

:::info

Use this website to generate validity timestamps for specific date and time.

:::

It is possible to make signatures for relay executions valid for specific time periods. This is done by constructing a **validity timestamp** that can be passed as the `uint256 validityTimestamp` parameter to `executeRelayCall` and `executeRelayCallBatch` functions.

Below are examples of constructing different **validity timestamps**:

### Example 1: from a specific date / time

Valid only from the 1st June 2024 (midnight).

Timestamp for _1st June 2024_ = `1717200000` (decimal) = `0x665A6480` (hex)

```
   valid from timestamp 1717200000
  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
0x000000000000000000000000665A648000000000000000000000000000000000
                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                      valid until indefinitely
```

### Example 2: set an expiry date

Valid until 31st January 2025, 5pm CET.

Timestamp for _31st January 2025 (5pm CET)_ = `1738339200` (decimal) = `0x679CF380` (hex)

```
         valid from anytime
  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
0x00000000000000000000000000000000000000000000000000000000679CF380
                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                valid until 31st January 2025 (5pm CET)
```

### Example 3: valid during a specific period

Valid from 1st January 2024 (midnight CET) to 1st April 2024 (midnight CET)

- Timestamp for _1st January 2024 (midnight)_ = `1704063600` (decimal) = `0x6591F270` (hex)
- Timestamp for _1st April 2024 (midnight)_ = `1711926000` (decimal) = `0x6609EAF0` (hex)

```
            valid from
  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
0x0000000000000000000000006591F2700000000000000000000000006609EAF0
                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                             valid until
```
