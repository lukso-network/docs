---
title: LSP15 - Transaction Relayer API
sidebar_position: 6
description: LUKSO's Transaction Relay Service API Standard.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LSP15 - Transaction Relay Service API

:::info Standard Specification

[LSP15 - Transaction Relayer API](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-15-TransactionRelayServiceAPI.md)

:::

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/cpoczP3Y7Hk?si=iiYiBDaMG0vn9i_r" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

:::success Relayer API

Want to easily deploy a Universal Profile using our Developer Relayer API? See the [**Relayer Developer Access**](../../tools/apis/relayer-api.md) page.

:::

This standard is the off-chain API that any transaction relay service can implement to be compatible with the [Universal Profile controller apps](/install-up-browser-extension). See [the `up_addTransactionRelayer` RPC endpoint](../../tools/apis/up-rpc-api#up_addTransactionRelayer) for more.

To learn how to sign a transaction relay message see [LSP25 Execute Relay Call](./lsp25-execute-relay-call.md).

## POST `/execute`

Executes a signed transaction on behalf of a Universal Profile using [`executeRelayCall()`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#executerelaycall).

- Use signed message provided in request for authentication.
- Calculate and return the transaction hash in response.

```json title="Request body"
{
  "address": "0xBB645D97B0c7D101ca0d73131e521fe89B463BFD", // Address of the Universal Profile
  "transaction": {
    "abi": "0x7f23690c5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000596f357c6aa5a21984a83b7eef4cb0720ac1fcf5a45e9d84c653d97b71bbe89b7a728c386a697066733a2f2f516d624b43744b4d7573376741524470617744687a32506a4e36616f64346b69794e436851726d3451437858454b00000000000000",
    "signature": "0x43c958b1729586749169599d7e776f18afc6223c7da21107161477d291d497973b4fc50a724b1b2ab98f3f8cf1d5cdbbbdf3512e4fbfbdc39732229a15beb14a1b",
    "nonce": 1 // KeyManager nonce
  }
}
```

```json title="Response"
{
  "transactionHash": "0xBB645D97B0c7D101ca0d73131e521fe89B463BFD"
}
```

## POST `/quota`

Returns the available quota left for a registered Universal Profile.

- `signature` is the message value signed by a controller key with the [`SIGN` permission](../access-control/lsp6-key-manager#permissions) of the Universal Profile. The hash to sign should be calculated as [EIP-712](https://eips.ethereum.org/EIPS/eip-712) hash where the message is `keccak256(address, timestamp)`. Make sure that no matter the language or platform timestamp is of type `int`, `int256`, `uint` or `uint256`. In the backend the message is reconstructed using [soliditysha3()](https://web3js.readthedocs.io/en/v1.7.4/web3-utils.html#soliditysha3) to verify the signature.

[Web3.js](https://web3js.readthedocs.io/en/v1.8.0/web3-eth-accounts.html?#sign) and [ethers.js](https://docs.ethers.io/v5/api/signer/#Signer-signMessage) both automatically hash when using their native sign functions. This may need to be done manually if using a different library.

- `timestamp` in **seconds**. Must be now +/- 5 seconds.

<details>
  <summary>How to generate and verify the signature.</summary>

<Tabs>
  <TabItem value="web3" label="Web3">

```js
import { soliditySha3 } from 'web3-utils';
import Web3 from 'web3';

const address = '0x1234...'; // The Universal Profile address
const timestamp = Math.round(Date.now() / 1000);

const message = soliditySha3(address, timestamp);

/**
 *  Generate the signature - client side
 */
const web3 = new Web3();
const privateKey = '0x123...'; // The private key of the EOA which has SIGN permission over the Universal Profile defined in address.
const signature = web3.eth.accounts.sign(message, privateKey).signature;
// 👉 This signature is used in the request payload.

/**
 * Verify the signature - relayer side
 */
const signer = web3.eth.accounts.recover(message, signature.signature); // Signer will be the EOA that has signed the message.
// You need to verify if this EOA has a SIGN permission on the Universal Profile defined in address.
```

  </TabItem>
  <TabItem value="ethers" label="Ethers">

```js
// ...

const address = '0x1234...'; // The Universal Profile address
const timestamp = Math.round(Date.now() / 1000);

const message = ethers.utils.solidityKeccak256(
  ['address', 'uint'],
  [address, timestamp],
);

/**
 *  Generate the signature - client side
 */
// [... ethers signer setup...]
const signature = await ethersSigner.signMessage(arrayify(message));
// 👉 This signature is used in the request payload.

/**
 * Verify the signature - relayer side
 */
const signer = ethers.utils.verifyMessage(arrayify(message), signature); // Signer will be the EOA that has signed the message.
// You need to verify if this EOA has a SIGN permission on the Universal Profile defined in address.
```

</TabItem>
</Tabs>

To verify if the signature was signed by an authorized EOA, please refer to the [Sign-In With Ethereum](../../learn/universal-profile/connect-profile/siwe.md) guide.

</details>

```json title="Request body"
{
  "address": "0xBB645D97B0c7D101ca0d73131e521fe89B463BFD",
  "timestamp": 1656408193,
  "signature": "0xf480c87a352d42e49112257cc6afab0ff8365bb769424bb42e79e78cd11debf24fd5665b03407d8c2ce994cf5d718031a51a657d4308f146740e17e15b9747ef1b"
}
```

```json title="Response"
{
  "quota": 1543091, // You have YYY left
  "unit": "gas", // could be "lyx", "transactionCount"
  "totalQuota": 5000000, // total gas for the month
  "resetDate": 1656408193
}
```

- `quota` shows available balance left in units defined by `unit`.
- `unit` could be `gas`, `lyx` or `transactionCount` depending on the business model.
- `totalQuota` reflects total limit. i.e. available + used quota since reset.
- `resetDate` gives date that available quota will reset, e.g. a monthly allowance.

Quota systems could also use a Pay As You Go model, in which case totalQuota and resetData can be omitted.

## Resources

- [Mock relayer repository (GitHub)](https://github.com/lukso-network/tools-mock-relayer)
