---
title: LSP25 - Execute Relay Call
sidebar_position: 9
description: Learn about meta transactions using the LSP25 Execute Relay Call standards and how to use multi-channel nonces to dispatch transactions that are order independent or not.
---

# LSP25 - Execute Relay Call

Any interactions on the blockchain, from a simple native token transfer to interact with dApps and smart contracts require users to pay for gas fees. This creates friction when onboarding new users to web3, as there is the need for the user to acquire native tokens from the start, which involves complex steps (finding an exchange, KYC, etc...).

The LSP25 standards resolve this problem through **relay calls**, enabling users to interact with smart contracts on the blockchain **without needing native tokens** to pay for transaction fees.

This allows a better onboarding experience for users new to cryptocurrencies and blockchain. It minimizes **UX friction** for dapps, including removing the need for users to worry about gas fee, or any complex steps needed when starting.

Dapps can then leverage the relay execution features to create their own business model around building their own **relay service**, smart contracts solution on top of the Key Manager to pay with their tokens, or agree with users on payment methods including subscriptions, ads, etc ..

## How to sign relay transactions?

:::tip

You can use our library [**eip191-signer.js**](https://github.com/lukso-network/tools-eip191-signer) to make it easier to sign an _EIP191 Execute Relay Call transaction_.

See also our [step by step Javascript guide](../../learn/universal-profile/key-manager/execute-relay-transactions.md) to sign and execute relay transactions via the Key Manager.

:::

To obtain a valid signature that can be used by anyone to execute a relayed transaction (= meta transaction) on behalf of someone else, we must do the following:

1. Gather 5 things:

   - 1. the **payload** (an abi-encoded function call) to be executed on the linked account.
   - 2. the **chain id** of the blockchain where the `payload` will be executed.
   - 3. the address of the smart contract implementing the [`ILSP25ExecuteRelayCall`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/packages/lsp25-contracts/contracts/ILSP25ExecuteRelayCall.sol) interface where the **payload** will be executed.
   - 4. the Key Manager **nonce** of the controller.
   - 5. the [`validityTimestamps`](#validity-timestamps), composed of 2 x `uint128` concatenated together, where:

        4.1. the left-side `uint128` corresponds to the timestamp from which the relay call is valid from.

        4.2. the right-side `uint128` corresponds to the timestamp from which the relay call is valid until.

2. Once you have gathered these 5 information, you must **concatenate them all together**.

3. Then you must get the `keccak256` hash of this data.

4. After that you can sign the data to obtain a valid signature ready to be used via [`executeRelayCall(...)`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#executerelaycall).

### Parameters to generate a LSP25 signature

The relay transactions are signed using the [**version 0 of EIP191**](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md#version-0x00). The relay call data that you want to sign **MUST** be the _keccak256 hash digest_ of the following elements _(bytes values)_ concatenated together.

```javascript
0x19 <0x00> <LSP25 Implementation address> <LSP25_VERSION> <chainId> <nonce> <validityTimestamps> <value> <payload>
```

| Message elements               | Details                                                                                                                                                                                                                                                              |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0x19`                         | Byte used to ensure that the _relay call signed data_ is not a valid RLP.                                                                                                                                                                                            |
| `0x00`                         | The [**version 0 of EIP191**](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md#version-0x00).                                                                                                                                                            |
| `LSP25 implementation address` | The address of the contract that implements the [`ILSP25ExecuteRelayCall`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/packages/lsp25-contracts/contracts/ILSP25ExecuteRelayCall.sol) standard interface and that will execute the relay call. |
| `LSP25_VERSION`                | The `uint256` number **25** that defines the current version of the LSP25 Execute Relay Call standard.                                                                                                                                                               |
| `chainId`                      | The chain id of the blockchain where the Key Manager is deployed, as `uint256`.                                                                                                                                                                                      |
| `nonce`                        | The unique [**nonce**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md#getnonce) for the payload.                                                                                                                                           |
| `validityTimestamps`           | Two `uint128` timestamps concatenated, the first timestamp determines from when the payload can be executed, the second timestamp delimits the end of the validity of the payload. If `validityTimestamps` is 0, the checks of the timestamps are skipped            |
| `value`                        | The amount of **native tokens** that will be transferred to the [**ERC725 Account**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) linked to the Key Manager that will execute the relay call.                                        |
| `payload`                      | The payload that will be executed.                                                                                                                                                                                                                                   |

## Sequential _vs_ Multi-Channel nonces

Since the LSP25 standard offers **relay execution** via signed message, it is important to provide security measurements to ensure that the signed message can't be repeated once executed. **[Nonces](https://www.techtarget.com/searchsecurity/definition/nonce#:~:text=A%20nonce%20is%20a%20random,to%20as%20a%20cryptographic%20nonce.)** exist to solve this problem.

Using nonces prevents [replay attacks], where old signed transactions can be re-executed again. A nonce is an arbitrary number that is used only once when signing a specific transaction.

The LSP25 standard introduces the concept of **channels**. **Multi-channel** nonces allow to execute signed relay calls **with**/**without** a specific order depending on the signer choice. It allows for relay calls to be executed:

- **sequentially**: by enforcing their order in the same channel.
- or independently from each other across multiple channels (**out of order execution**).

Signed relay calls with sequential nonces should be **executed in order**, meaning a signed message with nonce 4 can't be executed before the signed message with nonce 3 has been executed. Therefore, if a sequence of signed messages must be executed sequentially, they must be signed on the same channel.

Alternatively, it they should be executed independently, they should be signed across different channels.

> _Example:_
> A message signed with nonce 4 on channel 1:
>
> - ❌ can't be executed before the message signed with nonce 3 on channel 1.
> - ✅ can be executed before the message signed with nonce 3 on channel 2.

![LSP6 Key Manager Relay Service](/img/standards/lsp6/lsp6-multi-channel-nonce.jpeg)

### Ordered Transaction with Sequential Nonces.

With native transactions, nonces are strictly sequential, meaning that relay calls signed with incremental nonces on the same channel must be executed in order.

For instance, for message number 4 to be performed, it must wait for message number 3 to complete.

This is a critical problem which can limit the usage of relay execution.

### Out of order execution using Multi-Channel Nonces

:::info
The concept of multi channel nonce is inspired by the [Out of order execution implementation of Permit by Amx](https://github.com/amxx/permit#out-of-order-execution).
:::

**Sequential nonces come with the following limitation**:

Some users may want to sign multiple messages, allowing the transfer of different assets to different recipients. In that case, the recipient wants to be able to use or transfer their assets whenever they want and will certainly not want to wait on anyone before signing another transaction.

**Out-of-order execution** across multiple channels solve this.

By using multiple independent channels, each channel's nonce behaves as expected, but different channels are independent. Meaning that:

- relay calls 2, 3, and 4 of channel 0 must be executed sequentially,
- but message 3 of channel 1 is separate and only depends on message 2 of channel 1.

## How nonces are represented?

Since LSP25 allows out-of-order execution of relay calls using nonces through multiple channels, the nonce includes as part of its value the channel where it should be incremented on.

Nonces are represented as `uint256` from the concatenation of two `uint128` : the `channelId` and the `nonceId`.

- left most 128 bits : `channelId`
- right most 128 bits: `nonceId`

![multi-channel-nonce](/img/standards/faq/multi-channel-nonce.jpg)

<p align="center">
<i>Example of multi channel nonce, where <code>channelId == 5</code> and <code>nonceId == 1</code></i>
</p>

The current nonce can be queried using:

```solidity
function getNonce(address _address, uint256 _channel) public view returns (uint256)
```

Since the `channelId` represents the left-most 128 bits, a minimal value like `1` will return a huge `nonce` number: `2**128` equal to:

`340282366920938463463374607431768211456`.

After the signed transaction is executed the `nonceId` will be incremented by `1`, this will increment the `nonce` by `1` because the nonceId represents the first 128 bits of the nonce, so that it will be

`340282366920938463463374607431768211457`.

```solidity title="Solidity example"
_nonces[signer][nonce >> 128]++
```

The expression `nonce >> 128` represents the channel which the signer chose for executing the transaction. After looking up the nonce of the signer at that specific channel, it will be incremented by one using `++`.

For sequential messages, users could use channel `0`, and for out-of-order messages, they could use channel `n`.

**Important:** It's up to the user to choose the channel that he wants to sign multiple sequential orders on, not necessary `channel 0`.

## Validity Timestamps

:::info

Use this website to generate validity timestamps for specific date and time.

:::

An essential aspect to consider in relay execution is the **time validity of the signature**. In other words:

> _"for how low is my signature valid to be executed?"_.

Sometimes, it is beneficial to limit the duration for which the signature is valid and can be executed, or to allow it only during a specific time period (_e.g: the period during which votes can be casted_).

This can prevent potential security risks. For example, if a user signs a relay transaction and the signature is stolen or compromised, an attacker could use this signature indefinitely if there's no validity period set.

To mitigate such risks, an optional **validity timestamp** can be set when generating an LSP25 signature to mark the start date and expiry date of its effectiveness. Once the timestamp has passed, the signature is no longer valid, rendering the relay transaction unusable. This is done by constructing a **validity timestamp** that can be passed as the `uint256 validityTimestamp` parameter to `executeRelayCall` and `executeRelayCallBatch` functions.

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

## Security considerations for Gas Less Transaction

While gas-less transactions / relay-execution is a very convenient way of using your Universal Profile to surf the blockchain, it comes with its risks.

- A relay call does not enforce a gas price to execute a transaction, meaning a Relay Service can potentially send your transaction with a lower gas price in order to cut costs which might take a long time to execute.
- A Relay Service can also frontrun your transaction.

**Best practices:**

- Make sure to only use audited, transparent, community trusted Relay Services that have passed the test of time.
- Stay away from Relay Services that try to acquire users by offering cheaper prices. In the end any Relay Service must have a business model in order to work. If it does not profit from users it profits from other ways, might be shady or not.

[replay attacks]: https://www.quicknode.com/guides/ethereum-development/smart-contracts/what-are-replay-attacks-on-ethereum#what-are-replay-attacks
