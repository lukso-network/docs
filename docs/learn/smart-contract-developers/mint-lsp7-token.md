---
sidebar_label: '💽 Mint LSP7 Token'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mint LSP7 Token

In this guide you will mint some [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) tokens to the EOA owner of your token.

## Setup

The following code snippets require to install a few libraries.

- [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

```shell
npm install ethers @lukso/lsp-smart-contracts
```

### Imports and constants

At this point you will need a private key in order to mint some tokens as well as the `LSP7Mintable` _token contract address_.
You will import `LSP7Mintable` in order to get the _ABI_ of the contract that you will interact with.

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import { ethers } from 'ethers';

const privateKey = '0x...';
const myTokenAddress = '0x...';
const universalProfileAddress = '0x...';

const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');

// setup signer
const signer = new ethers.Wallet(privateKey as string, provider);
console.log('🔑 EOA: ', signer.address);
```

### Instantiate the contracts

At this point, the `LPS7Mintable` contract is being prepared for the following intercation. you construct an instance of a contract, using _contract ABI_ and _contract address_.

```javascript
let myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi, signer);
```

### Send transaction

Finally, you send the transaction and mint some tokens.

:::warning

The example contract here allows minting Digital Assets **only to the owner** of the contract. There might be contracts that don't have this _requirement_.

:::

```javascript
let mintTxn = await myToken.mint(signer.address, 1, true, '0x', {
  gasLimit: 400_000,
});
```

### Final code

```javascript
import { ethers } from 'hardhat';
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

const privateKey = '0x..';
const myTokenAddress = '0x..';

async function main() {

  const provider = new ethers.JsonRpcProvider(
    'https://rpc.testnet.lukso.network',
  );

  const signer = new ethers.Wallet(privateKey as string, provider);
  console.log('🔑 EOA: ', signer.address);

  let myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi, signer);

  let mintTxn = await myToken.mint(signer.address, 1, true, '0x', { gasLimit: 400_000 })
  console.log(mintTxn)
  await new Promise(r => setTimeout(r, 10000));

  const balance = await myToken.balanceOf(signer.address)
  console.log('🏦 Balance: ', balance.toString())
}

main();
```
