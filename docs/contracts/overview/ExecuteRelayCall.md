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
