---
sidebar_label: '💽 Mint LSP7 Token'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mint LSP7 Token

In this guide you will mint some [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) tokens as an EOA contract owner.

## Setup

The following code snippets require the installation of the following libraries:

- [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

```shell
npm install ethers @lukso/lsp-smart-contracts
```

### Imports and constants

At this point, the `LPS7Mintable` contract is being prepared for the following interaction. You construct an instance of a contract, using its _ABI_ and the _contract address_.

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

After defining the core parameters of the [`LPS7 Mintable`](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md) contract, you are able to create an instance using its _ABI_ and the _contract address_.

```javascript
let myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi, signer);
```

### Send the transaction

Finally, you can send the transaction to mint some tokens.

:::warning

The sample contract of this guide only allows the smart contract owner to mint assets. Custom [LSP7](../../standards/tokens/LSP7-Digital-Asset.md) implementations might implement different permission sets.

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

  const myToken = new ethers.Contract(myTokenAddress, LSP7Mintable.abi, signer);

  const mintTxn = await myToken.mint(signer.address, 1, true, '0x', { gasLimit: 400_000 })
  console.log(mintTxn)
  await new Promise(r => setTimeout(r, 10000));

  const balance = await myToken.balanceOf(signer.address)
  console.log('🏦 Balance: ', balance.toString())
}

main();
```
