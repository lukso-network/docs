---
id: execute-transaction
title: Execute Transaction
sidebar_position: 1
---

:::note
This API is experimental for internal use, and is not the official Relayer API!
The current draft of the standardised Relayer API can be found [in Notion](https://lukso.notion.site/lukso/Transaction-Relay-Service-API-Standard-2bda58f4f47f4497bb3381654acda8c3)

:::

To execute a transaction on behalf of a Universal Profile:

![post](https://img.shields.io/badge/-POST-green) `https://relayer.l16.staging.lukso.dev/api/v1/execute`

Once your transaction has been sent to the relayer get the status of your transaction using:

![get](https://img.shields.io/badge/-GET-blue) `https://relayer.l16.staging.lukso.dev/api/v1/task/{taskId}`

### Payload

```json
{
  "keyManagerAddress": "0xBB645D97B0c7D101ca0d73131e521fe89B463BFD",
  "transaction": {
    "abi": "0x7f23690c5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000596f357c6aa5a21984a83b7eef4cb0720ac1fcf5a45e9d84c653d97b71bbe89b7a728c386a697066733a2f2f516d624b43744b4d7573376741524470617744687a32506a4e36616f64346b69794e436851726d3451437858454b00000000000000",
    "signature": "0x43c958b1729586749169599d7e776f18afc6223c7da21107161477d291d497973b4fc50a724b1b2ab98f3f8cf1d5cdbbbdf3512e4fbfbdc39732229a15beb14a1b",
    "nonce": 1
  }
}
```

#### Properties

| Name                | Description                                                                      |
| :------------------ | :------------------------------------------------------------------------------- |
| `keyManagerAddress` | The address of the [`KeyManager`] contract which controls the Universal Profile. |
| `abi`               | The encoded ABI of the transaction.                                              |
| `signature`         | The transaction signature.                                                       |
| `nonce`             | The nonce of the KeyManager contract.                                            |

### Response

```json
{
  "success": true,
  "taskId": "fb0a071d-c526-488d-9f17-b919507fddf2",
  "keyManagerAddress": "0xBB645D97B0c7D101ca0d73131e521fe89B463BFD",
  "transaction": {
    "abi": "0x7f23690c5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000596f357c6aa5a21984a83b7eef4cb0720ac1fcf5a45e9d84c653d97b71bbe89b7a728c386a697066733a2f2f516d624b43744b4d7573376741524470617744687a32506a4e36616f64346b69794e436851726d3451437858454b00000000000000",
    "signature": "0x43c958b1729586749169599d7e776f18afc6223c7da21107161477d291d497973b4fc50a724b1b2ab98f3f8cf1d5cdbbbdf3512e4fbfbdc39732229a15beb14a1b",
    "nonce": 1
  }
}
```

#### Properties

| Name                | Description                                                                      |
| :------------------ | :------------------------------------------------------------------------------- |
| `success`           | whether the transaction was successful                                           |
| `taskId`            | task id used to identify the transaction using the `/task/{taskId}` endpoint     |
| `keyManagerAddress` | The address of the [`KeyManager`] contract which controls the Universal Profile. |
| `abi`               | The encoded ABI of the transaction you sent.                                     |
| `signature`         | The transaction signature you sent.                                              |
| `nonce`             | The nonce of the KeyManager contract you sent.                                   |

## Example

This example shows how to prepare a transaction for the relayer. We can apply the same logic to any transaction.

You will need the address of the UP making the transaction and the private key of the account which controls the UP.

```typescript
const controllingAccountPrivateKey = '0x...';
const myUpAddress = '0x...';
```

Then, instantiate a Web3 `Contract` object for your UP and KeyManager using the **Contract ABIs** from the [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts) NPM package.

```typescript
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';

const myUniversalProfile = new web3.eth.Contract(
  UniversalProfileContract.abi,
  myUpAddress,
);

const keyManagerAddress = await myUniversalProfile.methods.owner().call();
const KeyManager = new web3.eth.Contract(
  KeyManagerContract.abi,
  keyManagerAddress,
);
```

Now we can get the nonce from the KeyManager for the next transaction.

```typescript
const controllerAccount =
  web3.eth.accounts.privateKeyToAccount(controllerPrivateKey);
const channelId = 0; // Can be any number that your app will use frequently.
// Channel IDs prevent nonce conflicts, when many apps send transactions to your keyManager at the same time.

const nonce = await KeyManager.methods
  .getNonce(controllerAccount.address, channelId)
  .call();
```

We need to encode the smart contract call through the execute function of your Universal Profile to be signed and passed to the relayer.

```typescript title="Encode transaction ABI"
const abiPayload = myUniversalProfile.methods.execute(
    0, // The OPERATION_CALL value. 0 for a LYX transaction
    '0x...', // Recipient address
    web3.utils.toWei('100'), // amount of LYX to send in wei
    '0xxxxxx...' // Call data, to be called on the recipient address, or '0x'
).encodeABI()) ;
```

Afterward, we sign the transaction from one of the controller keys of your Universal Profile.

The message is constructed by signing the `chainId`, `keyManagerAddress`, signer `nonce` and `abiPayload`

```typescript title="Sign the transaction"
const chainId = await web3.eth.getChainId(); // will be 2828 on l16

const message = web3.utils.soliditySha3(chainId, keyManagerAddress, nonce, {
  t: 'bytes',
  v: abiPayload,
});

const signatureObject = controllerAccount.sign(message);
const signature = signatureObject.signature;
```

Now you have everything you need to send your transaction to the relayer for execution.

```typescript
const payload = {
  keyManagerAddress,
  transaction: {
    nonce: nonce,
    abi: abiPayload,
    signature: signature,
  },
};

const response = await axios.post(
  `https://relayer.lukso.network/api/v1/execute`,
  payload,
);
```

Youn can check the status of your transaction using the returned `taskId` at `/task/{ taskId }`.

The transaction will receive the `status:` `COMPLETE` once it has been sent to the blockchain.

[`keymanager`]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md
