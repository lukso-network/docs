---
sidebar_label: 'Execute Relay Transactions'
sidebar_position: 3
---

# Execute Relay Transactions

The [LSP6 KeyManager](../../standards/universal-profile/lsp6-key-manager.md) standard enables anybody to execute a transaction on behalf of a Universal Profile, given they have a valid transaction which has been signed by a key that controls the Universal Profile.

Relayed execution enables use cases such as Transaction Relayer Services to be possible where users can send their transaction details to a third party to be executed, moving the gas cost burden away from the user who owns the Universal Profile.

For example, Alice can send an encoded transaction which updates the [LSP3Profile](../../standards/universal-profile/lsp3-universal-profile-metadata.md) picture on her Universal Profile to a second user, Bob, who executes the transaction and pays the gas cost of the transaction on behalf of Alice.

To execute the transaction, Bob needs to know:

- the encoded ABI of the transaction that will get executed,
- the transaction signature,
- the nonce of the key that signed the transaction.

The transaction is then executed via the [LSP6KeyManager](../../standards/universal-profile/lsp6-key-manager.md) function `executeRelayCall`.

You will need the [`@lukso/lsp-smart-contracts`](../../standards/smart-contracts/introduction) package.

## Generate the signed transaction payload

:::info
This example shows how to prepare a transaction to be executed by a third party. This logic can be implemented client-side and then sent to a third-party application or service such as a Transaction Relay service to be executed.
:::

To encode a transaction, we need the address of the Universal Profile smart contract and the private key of a controller key with sufficient [LSP6 permissions](../../standards/universal-profile/lsp6-key-manager.md#permissions) to execute the transaction.

```typescript
const controllingAccountPrivateKey = '0x...';
const myUpAddress = '0x...';
```

Get the `nonce` of the controller key from the KeyManager by instantiating the KeyManager smart contract instance and calling the `getNonce` function.

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
  web3.eth.accounts.wallet.add(controllerPrivateKey);
const channelId = 0;

const nonce = await KeyManager.methods
  .getNonce(controllerAccount.address, channelId)
  .call();
```

Encode the ABI of the transaction you want to be executed. In this case, a LYX transfer to a recipient address.

```typescript title="Encode transaction ABI"
const abiPayload = myUniversalProfile.methods.execute(
    0, // Operation type: CALL
    '0x...', // Recipient address
    web3.utils.toWei('1'), // Value
    '0x' // Data
).encodeABI()) ;
```

:::tip ERC725X execute

You can find more information about the [ERC725X `execute` call here](../../standards/smart-contracts/erc725-contract#execute---erc725x).

:::

Afterward, sign the transaction message from the controller key of the Universal Profile.

The message is constructed by signing the `chainId`, `keyManagerAddress`, signer `nonce` and `abiPayload`.

```typescript title="Sign the transaction"
const chainId = await web3.eth.getChainId(); // will be 2828 on L16

const message = web3.utils.soliditySha3(chainId, keyManagerAddress, nonce, {
  t: 'bytes',
  v: abiPayload,
});

const signatureObject = controllerAccount.sign(message);
const signature = signatureObject.signature;
```

Now the `signature`, `abiPayload`, `nonce` and `keyManagerAddress` can be sent to a third party to execute the transaction using [`executeRelayCall`](../../standards/smart-contracts/lsp6-key-manager#executerelaycall).

## Execute via `executeRelayCall`

:::info
This example shows how a third party can execute a transaction on behalf of another user.
:::

To execute a signed transaction ABI payload requires:

- the **KeyManager contract address**
- the **transaction ABI payload**
- **signed transaction payload**
- **nonce** of the controller key which signed the transaction.

:::note
To get the KeyManager address from the UniversalProfile address, call the `owner` function on the Universal Profile contract.
:::

```javascript title='Send the transaction'
const executeRelayCallTransaction = await KeyManager.methods
  .executeRelayCall(signature, nonce, abiPayload)
  .send({from: controllerAccount.address, gasLimit: 300_000});
```

:::tip LSP6KeyManager executeRelayCall

You can find more information about the [LSP6KeyManager `executeRelayCall` here](../../standards/smart-contracts/lsp6-key-manager#executerelaycall).

:::
