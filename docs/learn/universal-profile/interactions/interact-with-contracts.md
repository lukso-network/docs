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

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('../img/mint-tokens.png').default}
    alt="`Examples of minting tokens."
    width="400"
  />
<br/>
</div>

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="mintTokens.ts"
import Web3 from 'web3';
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

const web3 = new Web3(window.lukso);

await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();
const universalProfile = accounts[0];

const myToken = new web3.eth.Contract(
  LSP7Mintable.abi,
  '0x6E872Eb9942db637cd82ad7C33C2206eACB81181', // Token contract address
);

const mintTxn = await myToken.methods
  .mint(
    universalProfile, // recipient address
    web3.utils.toWei('100', 'ether'), // token amount (mint 100 tokens)
    true, // force parameter
    '0x', // additional data
  )
  .send({ from: universalProfile });

console.log(mintTxn);

const balance = await myToken.methods.balanceOf(accounts[0]);
console.log('🏦 Balance: ', balance.toString());
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript title="mintTokens.ts"
import { ethers } from 'ethers';
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

await ethers.provider.send('eth_requestAccounts', []);
const universalProfile = await ethers.getSigner();

const myToken = new ethers.Contract(
  '0x6E872Eb9942db637cd82ad7C33C2206eACB81181', // Token contract address
  LSP7Mintable.abi,
);

const mintTxn = await myToken.mint(
  universalProfile.address, // recipient address
  ethers.parseUnits('100', 'ether'), // token amount (mint 100 tokens)
  true, // force parameter
  '0x', // additional data
  {
    from: universalProfile,
  },
);
console.log(mintTxn);

const balance = await myToken.balanceOf(signer.address);
console.log('🏦 Balance: ', balance.toString());
```

  </TabItem>

</Tabs>

### Example 2 - Refine a BurntPix

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('../img/refine-burntpix.png').default}
    alt="`Examples of refining a burntpix NFT."
    width="400"
  />
<br/>
</div>

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="refineBurntPix.ts"
import Web3 from 'web3';

// 1. Connect to UP Browser Extension
const provider = new Web3(window.lukso);

const accounts = await provider.eth.requestAccounts();
const universalProfile = accounts[0];

// 2. Create an instance of the BurntPix Registry contract
const burntPixRegistry = new web3.eth.Contract(
  '0x3983151E0442906000DAb83c8b1cF3f2D2535F82', // BurntPix Registry contract address
  [
    // ABI of the `refine(bytes32,uint256)` function
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'tokenId',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'iterations',
          type: 'uint256',
        },
      ],
      name: 'refine',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
);

await contract.methods
  .refine(
    '0x0000000000000000000000000a3c1ed77de72af03acfaeab282a06e6fbeed5a8', // bytes32 tokenId of the BurntPix to refine
    '500', // Perform 500 iteration to refine
  )
  .send({
    from: universalProfile,
    gasPrice: web3.utils.fromWei('10000000000', 'gwei'),
    gasLimit: 15_000_000,
  });
```

  </TabItem>
  
  <TabItem value="ethersjs" label="ethers.js">

```typescript title="refineBurntPix.ts"
import { ethers } from 'ethers';

// 1. Connect to UP Browser Extension
const provider = new ethers.BrowserProvider(window.lukso);

const accounts = await provider.send('eth_requestAccounts', []);
const universalProfile = accounts[0];

// 2. Create an instance of the BurntPix Registry contract
const burntPixRegistry = new ethers.Contract(
  '0x3983151E0442906000DAb83c8b1cF3f2D2535F82', // BurntPix Registry contract address
  ['function refine(bytes32 tokenId, uint256 iterations) external'],
);

// Perform 500 iteration to refine a specific Burnt Pix
await contract.refine(
  '0x0000000000000000000000000a3c1ed77de72af03acfaeab282a06e6fbeed5a8', // bytes32 tokenId of the BurntPix to refine
  '500', // Perform 500 iteration to refine
  {
    from: universalProfile,
    gasPrice: ethers.formatUnits('10', 'gwei'),
    gasLimit: 15_000_000,
  },
);
```

  </TabItem>

</Tabs>
