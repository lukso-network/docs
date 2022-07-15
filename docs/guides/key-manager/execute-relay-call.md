---
sidebar_label: 'Execute Relay Call'
sidebar_position: 2
---

# Execute Relay Call

The [LSP6 KeyManager standard](../../standards/universal-profile/lsp6-key-manager.md) enables anybody to execute a transation on behalf of a Universal Profile, given they have a valid transaction which has been signed by a key which controls the Universal Profile.

This enables use cases such as Transaction Relayer Services to be possible where users can send their transaction details to a third party to be executed, moving the gas cost burden away from the user who owns the Universal Profile.

For example, Alice who owns a Universal Profile can send an encoded transaction which updates her [LSP3Profile](../../standards/universal-profile/lsp3-universal-profile-metadata.md) picture to a second user Bob, who executes the transaction and pays the gas cost of the transaction on behalf of Alice.

For this, Bob needs to know the encoded transaction ABI to be executed, the signature and the nonce of the key which signed the transaction.

The transaction is then executed via the [LSP6KeyManager](../../standards/universal-profile/lsp6-key-manager.md) function `executeRelayCall`.

## Generate the Signed Transaction Payload

:::info
This example shows how to prepare a transaction to be executed by a third party. This logic can be implemented client side and then sent to a third party application or service such as a Transaction Relay service to be executed.
:::

To encode a transaction we need the address of the Universal Profile smart contract and the private key of a controller key which has sufficient [LSP6 permissions](../../standards/universal-profile/lsp6-key-manager.md#permissions) to execute the transaction.

```typescript
const controllingAccountPrivateKey = '0x...';
const myUpAddress = '0x...';
```

Get the `nonce` of the controller key from the KeyManager by instantiating the KeyManager Contract instance and calling `getNonce`.

The `channelId` is used to prevent nonce conflicts when multiple apps send transactions to the same KeyManager at the same time. Read more about [out of order execution here](../../standards/universal-profile/lsp6-key-manager.md#out-of-order-execution).

```typescript title="Get the controller key nonce"
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

const controllerAccount =
  web3.eth.accounts.privateKeyToAccount(controllerPrivateKey);
const channelId = 0;

const nonce = await KeyManager.methods
  .getNonce(controllerAccount.address, channelId)
  .call();
```

Encode the ABI of the transaction you want to be executed. In this case a LYX transfer to a recipient address.

```typescript title="Encode transaction ABI"
const abiPayload = myUniversalProfile.methods.execute(
    0,
    '0x...', // Recipient address
    web3.utils.toWei('1'),
    '0x'
).encodeABI()) ;
```

Afterward, sign the transaction message from the controller key of the Universal Profile.

The message is constructed by signing the `chainId`, `keyManagerAddress`, signer `nonce` and `abiPayload`.

```typescript title="Sign the transaction"
const chainId = await web3.eth.getChainId(); // will be 2828 on l16

const message = web3.utils.soliditySha3(chainId, keyManagerAddress, nonce, {
  t: 'bytes',
  v: abiPayload,
});

const signatureObject = controllerAccount.sign(message);
const signature = signatureObject.signature;
```

Now the `signature`, `abiPayload`, `nonce` and `keyManagerAddress` can be sent to a third party to execute the transaction using `executeRelayCall`.

## Execute via `executeRelayCall`

:::info
This example shows how a third party can execute a transaction on behalf of another user.
:::

To execute a signed transaction ABI payload requires the **KeyManager contract address**, the **transaction abi payload**, **signed transaction payload** and **nonce** of the controller key which signed the transaction.

:::note
To get the KeyManager address from the UniversalProfile address call the `owner` function on the Universal Profile contract.
:::

```javascript
import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';

const KeyManager = new web3.eth.Contract(
  KeyManagerContract.abi,
  keyManagerAddress,
);

const executeRelayCallTransaction = await keyManager.methods
  .executeRelayCall(signature, signerNonce, transactionPayloadAbi)
  .send();
```
