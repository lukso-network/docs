---
sidebar_label: 'Execute Relay Transactions'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Execute Relay Transactions

The [LSP6 KeyManager](../../standards/universal-profile/lsp6-key-manager.md) standard enables anybody to execute a transaction on behalf of a Universal Profile, given they have a valid transaction which has been signed by a key that controls the Universal Profile.

Relayed execution enables use cases such as Transaction Relayer Services to be possible where users can send their transaction details to a third party to be executed, moving the gas cost burden away from the user who owns the Universal Profile.

For example, Alice can send an encoded transaction which updates the [LSP3Profile](../../standards/universal-profile/lsp3-profile-metadata.md) picture on her Universal Profile to a second user, Bob, who executes the transaction and pays the gas cost of the transaction on behalf of Alice.

To execute the transaction, Bob needs to know:

- the encoded ABI of the transaction that will get executed,
- the transaction signature,
- the nonce of the key that signed the transaction.

The transaction is then executed via the [LSP6KeyManager](../../standards/universal-profile/lsp6-key-manager.md) function `executeRelayCall`.

## Generate the signed transaction payload

This example shows how to prepare a transaction to be executed by a third party. This logic can be implemented client-side and then sent to a third-party application or service such as a Transaction Relay service to be executed.

Make sure you have the following dependencies installed before beginning this tutorial:

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)
- [`@lukso/eip191-signer.js`](https://github.com/lukso-network/tools-eip191-signer)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts @lukso/eip191-signer.js
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts @lukso/eip191-signer.js
```

  </TabItem>

</Tabs>

### Step 1 - Setup imports and constants

To encode a transaction, we need the address of the Universal Profile smart contract and the private key of a controller key with sufficient [LSP6 permissions](../../standards/universal-profile/lsp6-key-manager.md#permissions) to execute the transaction.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Imports & Constants"
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { EIP191Signer } from '@lukso/eip191-signer.js';
import Web3 from 'web3';

// This is the version relative to the LSP6 standard, defined as the number 6.
import { LSP6_VERSION } from '@lukso/lsp-smart-contracts/constants';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const universalProfileAddress = '0x...';
const msgValue = 0; // Amount of native tokens to be sent
const recipientAddress = '0x...';

// setup the Universal Profile controller account
const controllerPrivateKey = '0x...';
const controllerAccount = web3.eth.accounts.wallet.add(controllerPrivateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Imports & Constants"
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { EIP191Signer } from '@lukso/eip191-signer.js';
import { ethers } from 'ethers';

// This is the version relative to the LSP6 standard, defined as the number 6.
import { LSP6_VERSION } from '@lukso/lsp-smart-contracts/constants';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const universalProfileAddress = '0x...';
const msgValue = 0; // Amount of native tokens to be sent
const recipientAddress = '0x...';

// setup the Universal Profile controller account
const controllerPrivateKey = '0x...';
const controllerAccount = new ethers.Wallet(controllerPrivateKey).connect(
  provider,
);
```

  </TabItem>

</Tabs>

### Step 2 - Prepare the contact instances

We will get the contract instances for the [Universal Profile](../../standards/universal-profile/lsp0-erc725account.md) and [Key Manager](../../standards/universal-profile/lsp6-key-manager.md) for further use in the guide.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```typescript title="Contract instances"
const universalProfile = new web3.eth.Contract(
  UniversalProfileContract.abi,
  universalProfileAddress
);

const keyManagerAddress = await universalProfile.methods.owner().call();
const keyManager = new web3.eth.Contract(
  KeyManagerContract.abi,
  keyManagerAddress
);
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```typescript title="Contract instances"
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfileContract.abi,
  controllerAccount
);

const keyManagerAddress = await universalProfile.owner();
const keyManager = new ethers.Contract(
  keyManagerAddress,
  KeyManagerContract.abi,
  controllerAccount
);
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

### Step 3 - Prepare the relay call parameters

Get the `nonce` of the controller key from the KeyManager by instantiating the KeyManager smart contract instance and calling the [`getNonce`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#getnonce) function.

The `channelId` is used to prevent nonce conflicts when multiple apps send transactions to the same KeyManager at the same time. Read more about [out of order execution here](../../standards/universal-profile/lsp6-key-manager.md#out-of-order-execution).

A `validityTimestamp` of `0` is used for simplicity in this guide.

Encode the ABI of the transaction you want to be executed. In this case, a LYX transfer to a recipient address.

:::tip

For more information about _validity timestamps_ check [**How to sign relay transactions?**](../../standards/universal-profile/lsp6-key-manager.md#how-to-sign-relay-transactions)

:::

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```typescript title="Prepare the relay call parameters"
const channelId = 0;
const nonce = await keyManager.methods.getNonce(controllerAccount.address, channelId).call();

const validityTimestamps = 0; // no validity timestamp set

const abiPayload = universalProfile.methods
  .execute(
    0, // Operation type: CALL
    recipientAddress,
    msgValue,
    '0x', // Data
  )
  .encodeABI();
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Prepare the relay call parameters"
const channelId = 0;
const nonce = await keyManager.getNonce(controllerAccount.address, channelId);

const validityTimestamps = 0; // no validity timestamp set

const abiPayload = universalProfile.interface.encodeFunctionData('execute', [
  0, // Operation type: CALL
  recipientAddress,
  msgValue,
  '0x', // Data
]);
```

  </TabItem>

</Tabs>

:::tip ERC725X execute

You can find more information about the [ERC725X `execute` call here](../../contracts/contracts/ERC725/ERC725.md#execute).

:::

### Step 4 - Sign the transaction

Afterward, sign the transaction message from the controller key of the Universal Profile.

The message is constructed by signing the `keyManagerAddress`, `keyManagerVersion`, `chainId`, signer `nonce`, `validityTimestamps`, `value` and `abiPayload`.

:::tip ERC725X execute

For more information check: [**How to sign relay transactions?**](../../standards/universal-profile/lsp6-key-manager.md#how-to-sign-relay-transactions)

:::

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Sign the transaction"
const chainId = await web3.eth.getChainId();

let encodedMessage = web3.utils.encodePacked(
  { value: LSP6_VERSION, type: 'uint256' },
  { value: chainId, type: 'uint256' },
  { value: nonce, type: 'uint256' },
  { value: validityTimestamps, type: 'uint256' },
  { value: msgValue, type: 'uint256' },
  { value: abiPayload, type: 'bytes' },
);

let eip191Signer = new EIP191Signer();

let { signature } = await eip191Signer.signDataWithIntendedValidator(
  keyManagerAddress,
  encodedMessage,
  controllerPrivateKey,
);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Sign the transaction"
const { chainId } = await provider.getNetwork();

let encodedMessage = ethers.utils.solidityPack(
  ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes'],
  [LSP6_VERSION, chainId, nonce, validityTimestamps, msgValue, abiPayload],
);

let eip191Signer = new EIP191Signer();

let { signature } = await eip191Signer.signDataWithIntendedValidator(
  keyManagerAddress,
  encodedMessage,
  controllerPrivateKey,
);
```

  </TabItem>

</Tabs>

Now the `signature`, `abiPayload`, `nonce`, `validityTimestamps` and `keyManagerAddress` can be sent to a third party to execute the transaction using [`executeRelayCall`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#executerelaycall).

## Execute via `executeRelayCall`

:::info

This example shows how a third party can execute a transaction on behalf of another user.

:::

:::tip

For more information about relay execution check [**How to sign relay transactions?**](../../standards/universal-profile/lsp6-key-manager.md#how-to-sign-relay-transactions)

:::

To execute a signed transaction, ABI payload requires:

- the **KeyManager contract address**
- the **transaction ABI payload**
- the **nonce** of the controller key which signed the transaction.
- the **validity timestamps** for the execution of the relay call.
- the **signed transaction payload**

:::note

To get the KeyManager address from the UniversalProfile address, call the `owner` function on the Universal Profile contract.

:::

<Tabs>

  <TabItem value="web3js" label="web3.js">

```javascript title="Send the transaction"
const executeRelayCallTransaction = await keyManager.methods
  .executeRelayCall(signature, nonce, validityTimestamps, abiPayload)
  .send({
    from: controllerAccount.address,
    gasLimit: 300_000,
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript title="Send the transaction"
const executeRelayCallTransaction = await keyManager
  .connect(controllerAccount)
  .executeRelayCall(signature, nonce, validityTimestamps, abiPayload);
```

  </TabItem>

</Tabs>

:::tip LSP6KeyManager executeRelayCall

You can find more information about the [LSP6KeyManager `executeRelayCall` here](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#executerelaycall).

:::

## Final code

<Tabs>

  <TabItem value="web3js" label="web3.js">

```javascript title="Final code"
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { EIP191Signer } from '@lukso/eip191-signer.js';
import Web3 from 'web3';

// This is the version relative to the LSP6 standard, defined as the number 6.
import { LSP6_VERSION } from '@lukso/lsp-smart-contracts/constants';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const universalProfileAddress = '0x...';
const msgValue = 0; // Amount of native tokens to be sent
const recipientAddress = '0x...';

// setup the Universal Profile controller account
const controllerPrivateKey = '0x...';
const controllerAccount = web3.eth.accounts.wallet.add(controllerPrivateKey);

const universalProfile = new web3.eth.Contract(
  UniversalProfileContract.abi,
  universalProfileAddress,
);

const keyManagerAddress = await universalProfile.methods.owner().call();
const keyManager = new web3.eth.Contract(
  KeyManagerContract.abi,
  keyManagerAddress,
);

const channelId = 0;
const nonce = await keyManager.methods
  .getNonce(controllerAccount.address, channelId)
  .call();

const validityTimestamps = 0; // no validity timestamp set

const abiPayload = universalProfile.methods
  .execute(
    0, // Operation type: CALL
    recipientAddress,
    msgValue,
    '0x', // Data
  )
  .encodeABI();

const chainId = await web3.eth.getChainId();

let encodedMessage = web3.utils.encodePacked(
  { value: LSP6_VERSION, type: 'uint256' },
  { value: chainId, type: 'uint256' },
  { value: nonce, type: 'uint256' },
  { value: validityTimestamps, type: 'uint256' },
  { value: msgValue, type: 'uint256' },
  { value: abiPayload, type: 'bytes' },
);

let eip191Signer = new EIP191Signer();

let { signature } = await eip191Signer.signDataWithIntendedValidator(
  keyManagerAddress,
  encodedMessage,
  controllerPrivateKey,
);

const executeRelayCallTransaction = await keyManager.methods
  .executeRelayCall(signature, nonce, validityTimestamps, abiPayload)
  .send({
    from: controllerAccount.address,
    gasLimit: 300_000,
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript title="Final code"
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { EIP191Signer } from '@lukso/eip191-signer.js';
import { ethers } from 'ethers';

// This is the version relative to the LSP6 standard, defined as the number 6.
import { LSP6_VERSION } from '@lukso/lsp-smart-contracts/constants';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const universalProfileAddress = '0x...';
const msgValue = 0; // Amount of native tokens to be sent
const recipientAddress = '0x...';

// setup the Universal Profile controller account
const controllerPrivateKey = '0x...';
const controllerAccount = new ethers.Wallet(controllerPrivateKey).connect(
  provider,
);

const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfileContract.abi,
  controllerAccount,
);

const keyManagerAddress = await universalProfile.owner();
const keyManager = new ethers.Contract(
  keyManagerAddress,
  KeyManagerContract.abi,
  controllerAccount,
);

const channelId = 0;
const nonce = await keyManager.getNonce(controllerAccount.address, channelId);

const validityTimestamps = 0; // no validity timestamp set

const abiPayload = universalProfile.interface.encodeFunctionData('execute', [
  0, // Operation type: CALL
  recipientAddress,
  msgValue,
  '0x', // Data
]);

const { chainId } = await provider.getNetwork();

let encodedMessage = ethers.utils.solidityPack(
  ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes'],
  [LSP6_VERSION, chainId, nonce, validityTimestamps, msgValue, abiPayload],
);

let eip191Signer = new EIP191Signer();

let { signature } = await eip191Signer.signDataWithIntendedValidator(
  keyManagerAddress,
  encodedMessage,
  controllerPrivateKey,
);

const executeRelayCallTransaction = await keyManager
  .connect(controllerAccount)
  .executeRelayCall(signature, nonce, validityTimestamps, abiPayload);
```

  </TabItem>

</Tabs>
