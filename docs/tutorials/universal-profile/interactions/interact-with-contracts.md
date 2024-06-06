---
sidebar_label: 'Interact with Contracts'
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Interact with other contracts

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('../img/interact-with-contracts.png').default}
    alt="`Examples of interacting with contracts, like minting tokens or refining burntpix."
    width="1200"
  />
<br/>
<i>Examples of interacting with contracts, like minting tokens or refining burntpix.</i>
<br /><br />
</div>

In this guide, you will learn how to use your Universal Profile to interact with any other smart contract.

You will see from the examples below that **there is no difference with writing the code for interacting with regular EOA-based wallet _vs_ using Universal Profile**. The code is the same! Simply:

1. create an instance of the contract you want to interact with.
2. call the function you want on this contract.
3. use the 🆙 address as `{ from: "0x..." }` in the transaction options.

## Setup

To complete this guide, we will need some initial constants values and install some dependencies

- the address of the contract we want to interact with.
- the ABI of the contract we want to interact with.
- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

## Interactions Examples

Below you will find some examples to perform the following:

- Mint a free NFT and see it appear in your wallet on [_universalprofile.cloud_](https://my.universalprofile.cloud).
- Execute a swap on UniversalSwap.io
- Refine a BurntPix

### Example 1 - Mint some Tokens

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="mintTokens.ts"
import Web3 from 'web3';
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

const TOKEN_CONTRACT_ADDRESS = '0x...';

const web3 = new Web3(window.lukso);

await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();
const universalProfile = accounts[0];

const myToken = new web3.eth.Contract(LSP7Mintable.abi, TOKEN_CONTRACT_ADDRESS);

// mint 100 tokens
const amount = web3.utils.toWei('100', 'ether');

const mintTxn = await myToken.methods
  .mint(
    universalProfile, // recipient address
    amount, // token amount
    true, // force parameter
    '0x', // additional data
  )
  .send({ from: universalProfile });

console.log(mintTxn);

// Waiting 10sec to make sure the minting transaction has been processed

const balance = await myToken.methods.balanceOf(accounts[0]);
console.log('🏦 Balance: ', balance.toString());
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript title="mintTokens.ts"
import { ethers } from 'ethers';
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

const TOKEN_CONTRACT_ADDRESS = '0x...';

await ethers.provider.send('eth_requestAccounts', []);
const universalProfile = await ethers.getSigner();

const myToken = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, LSP7Mintable.abi);

// mint 100 tokens
const amount = ethers.parseUnits('100', 'ether');

const mintTxn = await myToken.mint(
  universalProfile.address, // recipient address
  amount, // token amount
  true, // force parameter
  '0x', // additional data
  {
    from: universalProfile,
  },
);
console.log(mintTxn);

// Waiting 10sec to make sure the minting transaction has been processed

const balance = await myToken.balanceOf(signer.address);
console.log('🏦 Balance: ', balance.toString());
```

  </TabItem>

</Tabs>

### Example 2 - Refine a BurntPix

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="refineBurntPix.ts"
import Web3 from 'web3';

// Constants:
//  - BurntPix Registry contract to interact with
const BURNT_PIX_REGISTRY_ADDRESS = "0x3983151E0442906000DAb83c8b1cF3f2D2535F82";

//  - bytes32 ID of the BurntPix to refine
const BURNT_PIX_ID "0x0000000000000000000000000a3c1ed77de72af03acfaeab282a06e6fbeed5a8";

// 1. Connect to UP Browser Extension
const provider = new Web3(window.lukso);

const accounts = await provider.eth.requestAccounts();
const universalProfile = accounts[0];

const refineFunctionABI = {
  "inputs": [
    {
      "internalType": "bytes32",
      "name": "tokenId",
      "type": "bytes32"
    },
    {
      "internalType": "uint256",
      "name": "iterations",
      "type": "uint256"
    }
  ],
  "name": "refine",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
// 2. Create an instance of the BurntPix Registry contract
const burntPixRegistry = new web3.eth.Contract(
  BURNT_PIX_REGISTRY_ADDRESS,
  [ refineFunctionABI ],
);

// Perform 500 iteration to refine a specific Burnt Pix
await contract.methods.refine(BURNT_PIX_ID, "500").send({
  from: universalProfile,
  gasPrice: web3.utils.fromWei("1000000000", 'gwei'),
  gasLimit: 15_000_000,
});
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript title="refineBurntPix.ts"
import { ethers } from 'ethers';

// Constants:
//  - BurntPix Registry contract to interact with
const BURNT_PIX_REGISTRY_ADDRESS = "0x3983151E0442906000DAb83c8b1cF3f2D2535F82";

//  - bytes32 ID of the BurntPix to refine
const BURNT_PIX_ID "0x0000000000000000000000000a3c1ed77de72af03acfaeab282a06e6fbeed5a8";

// 1. Connect to UP Browser Extension
const provider = new ethers.BrowserProvider(window.lukso);

const accounts = await provider.send('eth_requestAccounts', []);
const universalProfile = accounts[0];

// 2. Create an instance of the BurntPix Registry contract
const burntPixRegistry = new ethers.Contract(
  BURNT_PIX_REGISTRY_ADDRESS,
  ["function refine(bytes32 tokenId, uint256 iterations) external"]
);

// Perform 500 iteration to refine a specific Burnt Pix
await contract.refine(BURNT_PIX_ID, "500", {
  from: universalProfile,
  gasPrice: ethers.formatUnits("1", 'gwei'),
  gasLimit: 15_000_000,
});
```

  </TabItem>

</Tabs>
```
