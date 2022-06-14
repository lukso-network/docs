---
title: Multi-channel nonces
sidebar_position: 1
---

# Frequently Asked Questions

## What are multi-channel nonces?

:::note
Developers took this concept from [Out of order execution](https://github.com/amxx/permit#out-of-order-execution).
:::

Using nonces prevents old signed transactions from replaying again (replay attacks). A nonce is an arbitrary number that builders can use just once in a transaction.

### Problem of Sequential Nonces.

With native transactions, nonces are strictly sequential. Sequentialness means that message nonces must be executed in order. For instance, for message number 4 to be performed, it must wait for message number 3 to complete.

However, **sequential nonces come with the following limitation**:

Some users may want to sign multiple messages, allowing the transfer of different assets to different recipients. In that case, the recipient wants to be able to use or transfer their assets whenever they want and will certainly not want to wait on anyone before signing another transaction.

When facing this problem, **out-of-order execution** comes in handy.

### Multi-Channel Nonces

Out-of-order execution is achieved by using multiple independent channels. Each channel's nonce behaves as expected, but different channels are independent. The subdivision means that messages 2, 3, and 4 of channel 0 must be executed sequentially, but message 3 of `channel 1` is separate and only depends on message 2 of `channel 1`.

The benefit is that the signer key can determine which channel to sign the nonces. Relay services will have to understand the channel the signer chooses and execute each channel's transactions in the correct order to prevent failing transactions.

### Nonces in the Key Manager

The Key Manager allows out-of-order execution of messages by using nonces through multiple channels.

Nonces are represented as `uint256` from the concatenation of two `uint128` : the `channelId` and the `nonceId`.

- left most 128 bits : `channelId`
- right most 128 bits: `nonceId`

![multi-channel-nonce](/img/multi-channel-nonce.jpg)

<p align="center">
<i>Example of multi channel nonce, where channelId == 5 and nonceId == 1</i>
</p>

The current nonce can be queried using:

```solidity
function getNonce(address _address, uint256 _channel) public view returns (uint256)
```

Since the `channelId` represents the left-most 128 bits, a minimal value like `1` will return a huge `nonce` number: `2**128` equal to:

`340282366920938463463374607431768211456`.

After the signed transaction is executed the `nonceId` will be incremented by `1`, this will increment the `nonce` by `1` because the nonceId represents the first 128 bits of the nonce, so that it will be

`340282366920938463463374607431768211457`.

### Solidity Code Example

```solidity
_nonces[signer][nonce >> 128]++
```

The expression `nonce >> 128` represents the channel which the signer chose for executing the transaction. After looking up the nonce of the signer at that specific channel, it will be incremented by one using `++`.

For sequential messages, users could use channel `0`, and for out-of-order messages, they could use channel `n`.

**Important:** It's up to the user to choose the channel that he wants to sign multiple sequential orders on, not necessary `channel 0`.
