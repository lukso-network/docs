---
sidebar_label: '💰 Transfer LYX'
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer LYX

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('./img/transfer-lyx.png').default}
    alt="Transfering 0.5 LYXt between two Universal Profiles"
    width="400"
  />
<br/>
<i>Transfering 0.5 LYXt between two Universal Profiles.</i>
<br /><br />
</div>

:::tip Generic Transaction Handling

This guide can be used to **transfer LYX** from controller keys and profiles. As LUKSO is EVM-compatible, all regular Ethereum providers can be used to execute transfers or contract calls.

:::

## Setup

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell
npm install web3@v1
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell
npm install ethers
```

  </TabItem>

</Tabs>

# Transfer LYX from Profile Controller Keys

:::tip Recommendation

Sending LYX across EOAs is needed if you want to fund your own transactions instead of using an relay service. For regular value transfers, its recommended to store funds on the 👩‍🎤 [Universal Profiles](#transfer-between-universal-profiles) to improve overall security with exchangable keys and updatable permissions.

:::

If you want to send LYX directly from the controller key of a Univeral Profile, you can create regular blockchain transactions as described by the specifications of blockchain libraries as [web3](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction) and [ethers](https://docs.ethers.org/v5/api/providers/provider/#Provider-sendTransaction).

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```js
const Web3 = require('web3');

// Connect to the mainnet or testnet
const provider = new Web3('https://rpc.testnet.lukso.gateway.fm');

// Get the controller address of the Universal Profile
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

await provider.eth.sendTransaction({
    from: accoutns[0],                        // active controller key
    to: '0x...',                              // receiving address
    value: web3.utils.toWei('0.001', 'ether') // amount in LYX
})
```
<!-- prettier-ignore-end -->
  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```js
const { ethers } = require('ethers');

// Connect to the mainnet or testnet
const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.gateway.fm');

// Get the controller address of the Universal Profile
const signer = provider.getSigner();

await signer.sendTransaction({
    to: '0x...',                            // receiving address
    value: ethers.utils.parseEther('0.001') // amount in LYX
});
```
<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

## Transfer between Universal Profiles

:::tip Built-in security

When acting on the Universal Profile, the 🔐 [Key Manager](../../standards/universal-profile/lsp6-key-manager.md) will automatically check if the calling controller key is authorized.

:::

You can send LYX from Universal Profiles by executing a call operation on the Universal Profile's smart contract. The controller key of the Universal Profile Extension will be used to sign the transaction.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```js
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
const Web3 = require('web3');

// Connect to the mainnet or testnet
const provider = new Web3('https://rpc.testnet.lukso.gateway.fm');

// Instanciate Universal Profile
const myUniversalProfile = new provider.eth.Contract(
  UniversalProfile.abi, // contract ABI of Universal Profiles
  '0x...',              // address of the user's profile
);

// Transaction Data
const operation_type = 0;   // operation of type CALL
const recipient = '0x...';  // address including profiles and vaults
const data = '0x';          // executed payload, empty for regular transfer
const amount = provider.utils.toWei('3'); // amount in LYX

// Get the controller address of the Universal Profile
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

// Call the execute function of the profile to send the LYX transaction
await myUniversalProfile.methods
  .execute(operation_type, recipient, amount, data)
  .send({
      from: accounts[0],  // address of the active controller key
      gasLimit: 300_000,  // gas limit of the transaction
    });
```
<!-- prettier-ignore-end -->
  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```js
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
const { ethers } = require('ethers');

// Connect to the mainnet or testnet
const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.gateway.fm');

// Get the controller address of the Universal Profile
const signer = provider.getSigner();

// Instantiate Universal Profile
const myUniversalProfile = new ethers.Contract(
  '0x...', // address of the user's profile
  UniversalProfile.abi, // contract ABI of Universal Profiles
  signer, // address of the executing controller key
);

// Transaction Data
const operation_type = 0;   // operation of type CALL
const recipient = '0x...';  // address including profiles and vaults
const data = '0x';          // executed payload, empty for regular transfer
const amount = ethers.utils.parseEther('3'); // amount in LYX

// Call the execute function of the profile to send the LYX transaction
await myUniversalProfile
  .execute(operation_type, recipient, amount, data,
      { gasLimit: 300_000 } // gas limit of the transaction
    );
```
<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>
