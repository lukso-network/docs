---
sidebar_label: 'Execute Relay Transactions'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Execute Relay Transactions

The [LSP6 KeyManager](../../standards/universal-profile/lsp6-key-manager.md) standard enables anybody to execute a transaction on behalf of a [Universal Profile](../../standards/universal-profile/introduction.md), given they have a valid transaction which has been signed by a key that controls the Universal Profile.

Relayed execution enables use cases such as [Transaction Relayer Services](../../standards/relayer-api.md) to be possible where users can send their transaction details to a third party to be executed, moving the gas cost burden away from the user who owns the Universal Profile. This is automatically done by creating a Universal Profile on [universalprofile.cloud](https://universalprofile.cloud/), where LUKSO subsidizes the onboarding and transactions based on a monthly quota.

Another example would be Alice sending an encoded transaction that updates the [LSP3Profile](../../standards/universal-profile/lsp3-profile-metadata.md) picture of her [Universal Profile](../../standards/universal-profile/introduction.md) or brand to a second user, Bob, who executes the transaction and pays the gas cost of the transaction on behalf of Alice.

To execute the transaction, the executing party needs to know:

- the encoded ABI of the transaction that will get executed,
- the transaction signature,
- the nonce of the key that signed the transaction.

The transaction is then executed via the [`executeRelayCall`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#executerelaycall) function of the [LSP6 Key Manager](../../standards/universal-profile/lsp6-key-manager.md).

## Setup

First, the transaction to be executed by a third party has to be prepared. We will prepare an [`executeRelayCall`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#executerelaycall) transaction to be executed by a third party. This logic can be implemented _client-side_ and then sent to a _third-party_ application or service, such as a _Transaction Relay Service_.

You will need the following dependencies installed:

- a blockchain provider library like [`ethers`](https://github.com/ethers-io/ethers.js/) or [`web3`](https://github.com/web3/web3.js)
- the [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/) package to get the artifacts of the [LSP contracts](../../standards/introduction.md)
- the [`@lukso/eip191-signer.js`](https://github.com/lukso-network/tools-eip191-signer) library to sign the relay transaction

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```shell
npm install ethers @lukso/lsp-smart-contracts @lukso/eip191-signer.js
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```shell
npm install web3 @lukso/lsp-smart-contracts @lukso/eip191-signer.js
```

  </TabItem>

</Tabs>

:::info Execution Rights

To successfully execute a relay call, the address [signing the relay transaction](https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager#how-to-sign-relay-transactions) will need the [`EXECUTE_RELAY_CALL`](https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#permissions) permission.

:::

To encode a transaction, we need the address of the Universal Profile smart contract and the private key of a controller key with sufficient [LSP6 permissions](../../standards/universal-profile/lsp6-key-manager.md#permissions) to execute the transaction.

First, create an instance of the [Universal Profile](../../standards/universal-profile/lsp0-erc725account.md) contract and its [Key Manager](../../standards/universal-profile/lsp6-key-manager.md).

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}} default>

```typescript
import { ethers } from 'ethers';

import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { EIP191Signer } from '@lukso/eip191-signer.js';

// This is the version relative to the LSP25 standard, defined as 25.
import { LSP25_VERSION } from '@lukso/lsp-smart-contracts/constants';

const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const universalProfileAddress = '0x...';
const recipientAddress = '0x...';

// Setup the Universal Profile controller account
const controllerPrivateKey = '0x...';
const controllerAccount = new ethers.Wallet(controllerPrivateKey).connect(
  provider,
);

// Setup the contract instance of the Universal Profile
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfileContract.abi,
  controllerAccount,
);

// Call the Universal Profile contract to get the Key Manager
const keyManagerAddress = await universalProfile.owner();

// Setup the contract instance of the Key Manager
const keyManager = new ethers.Contract(
  keyManagerAddress,
  KeyManagerContract.abi,
  controllerAccount,
);
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```typescript
import Web3 from 'web3';

import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { EIP191Signer } from '@lukso/eip191-signer.js';

// This version is relative to the LSP25 standard, defined as 25.
import { LSP25_VERSION } from '@lukso/lsp-smart-contracts/constants';

const web3 = new Web3('https://rpc.testnet.lukso.network');
const universalProfileAddress = '0x...';
const recipientAddress = '0x...';

// Setup the Universal Profile controller account
const controllerPrivateKey = '0x...';
const controllerAccount = web3.eth.accounts.wallet.add(controllerPrivateKey);

// Setup the contract instance of the Universal Profile
const universalProfile = new web3.eth.Contract(
  UniversalProfileContract.abi,
  universalProfileAddress,
);

// Call the Universal Profile contract to get the Key Manager
const keyManagerAddress = await universalProfile.methods.owner().call();

// Setup the contract instance of the Key Manager
const keyManager = new web3.eth.Contract(
  KeyManagerContract.abi,
  keyManagerAddress,
);
```

  </TabItem>

</Tabs>

:::danger Caution when using your controller's private key

Never share your private controller key or upload it to public repositories. Anyone who possesses it can access your funds and assets and gain control over your Universal Profile in case the controller has administrative rights!

:::

## Prepare the Relay Call

After setting up both the [Universal Profile](../../standards/universal-profile/introduction.md) and [Key Manager](../../standards/universal-profile/lsp6-key-manager.md) of the signing person, we can continue to prepare all the relay call parameters. These are crucial for ensuring secure and authenticated transactions. Here is what you will need:

- **`nonce` of the controller**: Can be retrieved via the [`getNonce`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#getnonce) function on the [Key Manager](../../standards/universal-profile/lsp6-key-manager.md) associated with the Universal Profile.
- **`channelId` of the controller**: This parameter is essential to avoid `nonce` conflicts when multiple applications simultaneously send transactions to the same Key Manager. It allows for transactions to be processed in parallel without relying on the order of their arrival. Essentially, the `channelId` enables a form of transaction queuing and prioritization within the Ke yManager's operation.
- **a `validityTimestamp` for the transaction**: This timestamp indicates the time until the transaction is valid. Using a timestamp prevents the execution of outdated transactions that might no longer reflect the user's intent. For simplicity, a value of `0` can be used, indicating that the transaction does not have a specific expiration time. However, setting an appropriate `validityTimestamp` for relay transactions with crucial timing brings more security and trust.
- **the `payload` of the transaction**: Before a transaction can be signed, you must define the actual contents and actions that should be operated from the Universal Profile. To get the payload, you must encode the ABI of the transaction. In this example, the transaction payload will be a basic LYX transfer.

:::tip Additional Resources

The _channel ID_, _validity timestamp_, and _transaction payload_ can have various forms. For more information, refer to:

- [LSP6 Out Of Order Execution](../../standards/universal-profile/lsp6-key-manager.md#out-of-order-execution)
- [ERC725X Execute Function](../../contracts/contracts/ERC725/ERC725.md#execute)
- [LSP0 ERC725 Account Methods](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md)
- [Validity Timestamps for Execute Relay Calls](../../contracts/overview/ExecuteRelayCall.md#validity-timestamps)

:::

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```typescript
// ...

const channelId = 0;

// Retrieve the nonce of the EOA controller
const nonce = await keyManager.getNonce(controllerAccount.address, channelId);

const validityTimestamps = 0; // No validity timestamp set
const msgValue = 0; // Amount of native tokens to fund the UP with while calling

// Generate the payload of the transaction
const abiPayload = universalProfile.interface.encodeFunctionData('execute', [
  0, // Operation type: CALL
  recipientAddress, // Recipient
  ethers.parseEther('3'), // transfer 3 LYX to recipient
  '0x', // Optional transaction data
]);
```

  </TabItem>

    <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```typescript
// ...

const channelId = 0;

// Retrieve the nonce of the EOA controller
const nonce = await keyManager.methods
  .getNonce(controllerAccount.address, channelId)
  .call();

const validityTimestamps = 0; // No validity timestamp set
const msgValue = 0; // Amount of native tokens to fund the UP with while calling

// Generate the payload of the transaction
const abiPayload = universalProfile.methods
  .execute(
    0, // Operation type: CALL
    recipientAddress, // Recipient
    web3.utils.toWei(3), // Transfer 3 LYX to recipient
    '0x', // Optional transaction data
  )
  .encodeABI();
```

  </TabItem>

</Tabs>

## Sign the Transaction

After all transaction parameters have been defined, you can continue to sign the transaction message from the controller key of the Universal Profile.

:::tip Additional Resources

For more information regarding signatures, check out our [Signing Relay Transactions](../../standards/universal-profile/lsp6-key-manager.md#how-to-sign-relay-transactions) guide.

:::

The transaction message is constructed by signing the:

- Version and Address of the Key Manager (`keyManagerAddress` and `keyManagerVersion`)
- Identifier of the blockchain network (`chainId`)
- Current nonce of the signing EOA controller (`nonce`)
- The transaction validity timestamp (`validityTimestamps`)
- Amount of native tokens to fund the UP with while calling (`msgValue`)
- The ABI Payload of operations that will be executed (`abiPayload`)

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```typescript
//...

// Get the network ID
const { chainId } = await provider.getNetwork();

// Encode the Message
const encodedMessage = ethers.solidityPacked(
  // Types of the parameters that will be encoded
  ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes'],
  [
    // MUST be number `25`
    // Encoded value: `0x0000000000000000000000000000000000000000000000000000000000000019`
    LSP25_VERSION,

    // e.g: `4201` for LUKSO Testnet
    // Encoded value: `0x0000000000000000000000000000000000000000000000000000000000001069`
    chainId,

    // e.g: nonce number 5 of the signing controller that wants to execute the payload
    // Encoded value: `0x0000000000000000000000000000000000000000000000000000000000000005`
    nonce,

    // e.g: valid until 1st January 2025 at midnight (GMT).
    // Timestamp = 1735689600
    // Encoded value: `0x0000000000000000000000000000000000000000000000000000000067748580`
    validityTimestamps,

    // e.g: not funding the contract with any LYX (0)
    // Encoded value: `0x0000000000000000000000000000000000000000000000000000000000000000`
    msgValue,

    // e.g: send 3 LYX to address 0xcafecafecafecafecafecafecafecafecafecafe
    // by calling execute(uint256,address,uint256,bytes)
    // Encoded value: `0x44c028fe00000000000000000000000000000000000000000000000000000000
    //                 00000000000000000000000000000000cafecafecafecafecafecafecafecafeca
    //                 fecafecafecafe00000000000000000000000000000000000000000000000029a2
    //                 241af62c0000000000000000000000000000000000000000000000000000000000
    //                 000000008000000000000000000000000000000000000000000000000000000000
    //                 00000000`
    abiPayload,
  ],
);

// Instantiate EIP191 Signer
const eip191Signer = new EIP191Signer();

const { signature } = await eip191Signer.signDataWithIntendedValidator(
  keyManagerAddress,
  encodedMessage,
  controllerPrivateKey,
);
```

  </TabItem>
  
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```typescript
// ...

// Get the network ID
const chainId = await web3.eth.getChainId();

// Encode the Message
const encodedMessage = web3.utils.encodePacked(
  // MUST be number `25`
  // Encoded value: `0x0000000000000000000000000000000000000000000000000000000000000019`
  { value: LSP25_VERSION, type: 'uint256' },

  // e.g: `4201` for LUKSO Testnet
  // Encoded value: `0x0000000000000000000000000000000000000000000000000000000000001069`
  { value: chainId, type: 'uint256' },

  // e.g: nonce number 5 of the signing controller that wants to execute the payload
  // Encoded value: `0x0000000000000000000000000000000000000000000000000000000000000005`
  { value: nonce, type: 'uint256' },

  // e.g: not funding the contract with any LYX (0)
  // Encoded value: `0x0000000000000000000000000000000000000000000000000000000000000000`
  { value: validityTimestamps, type: 'uint256' },

  // e.g: not funding the contract with any LYX (0)
  // Encoded value: `0x0000000000000000000000000000000000000000000000000000000000000000`
  { value: msgValue, type: 'uint256' },

  // e.g: send 3 LYX to address 0xcafecafecafecafecafecafecafecafecafecafe
  // by calling execute(uint256,address,uint256,bytes)
  // Encoded value: `0x44c028fe00000000000000000000000000000000000000000000000000000000
  //                 00000000000000000000000000000000cafecafecafecafecafecafecafecafeca
  //                 fecafecafecafe00000000000000000000000000000000000000000000000029a2
  //                 241af62c0000000000000000000000000000000000000000000000000000000000
  //                 000000008000000000000000000000000000000000000000000000000000000000
  //                 00000000`
  { value: abiPayload, type: 'bytes' },
);

// Instantiate EIP191 Signer
const eip191Signer = new EIP191Signer();

const { signature } = await eip191Signer.signDataWithIntendedValidator(
  keyManagerAddress,
  encodedMessage,
  controllerPrivateKey,
);
```

  </TabItem>

</Tabs>

After the signature has been generated, it can be sent to the third party to execute the transaction using [`executeRelayCall`](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#executerelaycall) on the Key Manager of the profile. To verify all transaction parts, the third-party will need the following parameters:

- `signature` of the transaction payload
- `abiPayload` including the operations
- `nonce` of the signing controller
- `validityTimestamps` of the transaction
- `keyManagerAddress` of the signing profile

## Execute the Relay Call

:::info

The following section shows how a third party can execute a transaction on behalf of another user.

:::

To execute a previously signed transaction, the ABI payload requires the:

- **signed transaction payload** of the original Universal Profile
- **ABI payload** of the transaction
- **nonce** of the signing signing controller
- **validity timestamps** for the execution of the relay call.
- **Key Manager address** of the original Universal Profile

:::tip Additional Resources

For more information regarding signatures, check out our [Signing Relay Transactions](../../standards/universal-profile/lsp6-key-manager.md#how-to-sign-relay-transactions) guide.

:::

:::info Additional Safety measures

In case the user **does not provide** the _Key Manager address_ or _nonce_ or you want to proceed with **additional safety checks**, you can retrieve or cross-check the values by using the _Universal Profile address_ and the _EOA controller_ that was used to signed into the service:

```js
// Call the Universal Profile contract to get the Key Manager
const keyManagerAddress = await universalProfile.owner();

// Retrieve the nonce of the EOA controller
const nonce = await keyManager.getNonce(controllerAccount.address, channelId);
```

The full code setup can be found in the [Prepare Relay Call](#prepare-the-relay-call) section and is similar for both, signer and execution service.

:::

After receiving all necessary parameters and performing optional security checks, you can execute the transaction:

<Tabs groupId="provider-lib">

<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```javascript
import { ethers } from 'ethers';

import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';

const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);

/**
 * Prepare received parameters:
 * keyManagerAddress, signature, nonce
 * validityTimestamps, abiPayload
 */

// Setup the Universal Profile controller account
const relayControllerPrivateKey = '0x...';
const relayControllerAccount = new ethers.Wallet(controllerPrivateKey).connect(
  provider,
);

// Setup the contract instance of the Key Manager
const keyManager = new ethers.Contract(
  keyManagerAddress,
  KeyManagerContract.abi,
  relayControllerAccount,
);

const executeRelayCallTransaction = await keyManager
  .connect(relayControllerAccount)
  .executeRelayCall(signature, nonce, validityTimestamps, abiPayload);

const receipt = await executeRelayCallTransaction.wait();
console.log('Transaction receipt:', receipt);
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```javascript
import Web3 from 'web3';

import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';

const web3 = new Web3('https://rpc.testnet.lukso.network');

/**
 * Prepare received parameters:
 * keyManagerAddress, signature, nonce
 * validityTimestamps, abiPayload
 */

// Setup your controller account executing the transaction
const relayControllerPrivateKey = '0x...';
const relayControllerAccount =
  web3.eth.accounts.wallet.add(controllerPrivateKey);

// Setup the contract instance of the Key Manager
const keyManager = new web3.eth.Contract(
  KeyManagerContract.abi,
  keyManagerAddress,
);

const executeRelayCallTransaction = await keyManager.methods
  .executeRelayCall(signature, nonce, validityTimestamps, abiPayload)
  .send({
    from: relayControllerAccount.address,
    gasLimit: 300_000,
  });

const receipt = await executeRelayCallTransaction.wait();
console.log('Transaction receipt:', receipt);
```

  </TabItem>

</Tabs>

:::tip Additional Resources

You can find more information about `executeRelayCall` within the [LSP6 Contract Documentation](../../contracts/contracts/LSP6KeyManager/LSP6KeyManager.md#executerelaycall) .

:::
