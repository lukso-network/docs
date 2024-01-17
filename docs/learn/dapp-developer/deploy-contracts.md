---
sidebar_label: '🏭 Deploy contracts'
sidebar_position: 10
description: Learn how to deploy a contract from your Universal Profile.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy Contracts

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('./img/deploy-contract.png').default}
    alt="Deploying a contract from the Universa lProfile using the Browser Extension"
    width="400"
  />
<br/>
<i>Deploying a contract from a Universal Profile using the Browser Extension</i>
<br /><br />
</div>

## Setup

```shell
npm install ethers
```

## Deploy a contract from a Universal Profile

The Universal Profile browser extension will magically wrap all the calls internally so you don't have to worry about crafting custom transactions. Simply use [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) as you always did while working with EOA.

<!-- prettier-ignore-start -->

```js
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.lukso);

await provider.send("eth_requestAccounts", []);

const signer = provider.getSigner();
const account = await signer.getAddress();

// Send transaction
const tx = await signer.sendTransaction({
    from: account,                        // The Universal Profile address
    value: 0                              // optional, in case constructor is payable
    data: "0x0x608060405234801561001.."   // Full bytecode of the contract to deploy + constructor args
});

const receipt = await tx.wait();
```

You can utilize the ethers.js contract factory to deploy a contract by supplying its ABI and bytecode. For instance, if you're deploying an LSP7Mintable contract, you can obtain its ABI and bytecode from the `@lukso/lsp-smart-contracts` package.



```shell
npm install @lukso/lsp-smart-contracts
```



<!-- prettier-ignore-start -->

```js

import LSP7Mintable from "@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json"

// Prepare the factory with the abi and bytecode
const lsp7Factory = new ethers.ContractFactory(
      LSP7Mintable.abi,
      LSP7Mintable.bytecode,
      signer
    );

// send the transaction of deployment
const transaction = await lsp7Factory.deploy(
    'Yamen token',
    'no desc',
    "0x0000000000000000000000000000000000000011",
    0,
    false
  );
          
const receipt = await transaction.deployTransaction.wait();
```
<!-- prettier-ignore-end -->

## Retreiving Contract Deployment Information

There will be no `contractAddress` field in the transaction receipt unlike normal transactions happening with Metamask, as the browser extension wraps the transaction of deployment with a normal contract execution transaction. The contract address can be calculated using the **nonce** and the **address** of the profile, or retreived using the logs:

<!-- prettier-ignore-start -->

```js
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.lukso);

await provider.send("eth_requestAccounts", []);

const signer = provider.getSigner();
const account = await signer.getAddress();

// Send transaction
const tx = await signer.sendTransaction({
    from: account,                        // The Universal Profile address
    value: 0                              // optional, in case constructor is payable
    data: "0x0x608060405234801561001.."   // Full bytecode of the contract to deploy + constructor args
});

const receipt = await tx.wait();

// The signature of the ContractCreated event emitted by the profile
 /**
  * event ContractCreated(
  *  uint256 indexed operationType,
  *  address indexed contractAddress,
  *  uint256 value,
  *  bytes32 indexed salt
  * )
  *
  * 0xa1fb700aaee2ae4a2ff6f91ce7eba292f89c2f5488b8ec4c5c5c8150692595c3 = keccak256('ContractCreated(uint256,address,uint256,bytes32)')
*/
const targetTopic0 = '0xa1fb700aaee2ae4a2ff6f91ce7eba292f89c2f5488b8ec4c5c5c8150692595c3';

for (const log of receipt.logs) {
  // Check if the first topic matches the target topic
  if (log.topics[0] === targetTopic0) {

      // Decode the operation type from bytes32 to number
      const operationType = parseInt(log.topics[1], 16);

      // Decode the contract address from bytes32 to Ethereum address
      const contractAddress = `0x${log.topics[2].slice(-40)}`;

      // Keep the salt as is
      const salt = log.topics[3];

      console.log('Found target event:');
      console.log('Operation Type:', operationType);
      console.log('Contract Address:', contractAddress);
      console.log('Salt:', salt);
  }
}
```
<!-- prettier-ignore-end -->
