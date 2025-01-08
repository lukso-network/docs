---
sidebar_label: 'Transfer Tokens & NFTs'
sidebar_position: 2
description: Learn how to transfer LSP7 tokens and LSP8 individual NFT tokenIds from a Universal Profile to any address on the LUKSO Blockchain, using the UP Browser Extension.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer Tokens & NFTs

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('../img/transfer-tokens-and-nfts.png').default}
    alt="Transferring 1,000 CHILL tokens or a Chillwhale NFT between two Universal Profiles"
  />
<br/>
<i>Transferring 1,000 CHILL tokens between two Universal Profiles.</i>
<br /><br />
</div>

:::info

The full code of this example can be found in the 👾 [lukso-playground](https://github.com/lukso-network/lukso-playground/tree/main/digital-assets).

:::

This guide will teach you how to transfer [LSP7 tokens](../../../standards/tokens/LSP7-Digital-Asset.md) or [LSP8 NFTs](../../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) from a [Universal Profile](../../../standards/accounts/lsp0-erc725account.md) to any address.

## Setup Dependencies

You will need the following libraries to do this tutorial:

- [`ethers.js`](https://github.com/ethers-io/ethers.js/) or [`web3.js`](https://www.npmjs.com/package/web3)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs groupId="web3-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```shell
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```shell
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>
</Tabs>

## Examples

First, create an instance of the LSP7 or LSP8 contract. You will need:

- the `address` of the LSP7 or LSP8 Token contract you want to transfer tokens / NFT from.
- one of the following smart contract ABI from the `@lukso/lsp-smart-contracts` package:
  - `LSP7DigitalAsset` if you want to transfer tokens.
  - `LSP8IdentifiableDigitalAsset` if you want to transfer an NFT from the collection.

### Transfer LSP7 tokens

Call the [LSP7 `transfer(address,address,uint256,bool,bytes)`](../../../contracts/contracts/LSP7DigitalAsset/#transfer) function and pass the amount as 3rd parameter.

> Since most tokens have 18 [`decimals()`](../../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#decimals), make sure to specify the `amount` with 18 decimals place. For instance, if you want to transfer 8 tokens the `amount` parameter will be: `8_000_000_000_000_000_000` ✅, not `8` ❌.

> Otherwise, the transfer might have occurred but you might not see the balance of the recipient updated, since you transferred only a tiny small amount (`8` for a token with 18 decimals is basically 1 / 1e18). To do so easily, use one of number utility function from _ethers.js_ or _web3.js_.

<Tabs groupId="web3-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
import { ethers } from 'ethers';

// Import the LSP7 ABI
import LSP7DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';

// Connect to the UP Browser extension
const provider = new ethers.BrowserProvider(window.lukso);
await provider.send('eth_requestAccounts', []);
const signer = await provider.getSigner();

// Create instance of the CHILL token contract
const chillToken = new ethers.Contract(
  '0x5b8b0e44d4719f8a328470dccd3746bfc73d6b14', // Chillwhale Token contract address
  LSP7DigitalAsset.abi,
);

await chillToken.transfer(
  signer.getAddress(), // (from) sender address (= our Universal Profile)
  '0x02e655F92f01BC7880807ec409F134b91bb28381', // (to) recipient's address
  ethers.parseUnits('15', 18), // (amount) of tokens to transfer (CHILL have 18 decimals)
  true, // (force) flag, false to only allow contract with a Universal Receiver, true for any address (EOA or any contract)
  '0x', // (data) any additional data to send alongside the transfer
);
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js
import Web3 from 'web3';

// Import the LSP7 ABI
import LSP7DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';

// Connect to the UP Browser extension
const web3 = new Web3(window.lukso);
await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();

// Create instance of the CHILL token contract
const chillToken = new web3.eth.Contract(
  LSP7DigitalAsset.abi,
  '0x5b8b0e44d4719f8a328470dccd3746bfc73d6b14', // Chillwhale Token contract address
);

await chillToken.methods
  .transfer(
    accounts[0], // (from) sender address (= our Universal Profile)
    '0x02e655F92f01BC7880807ec409F134b91bb28381', // (to) recipient's address
    web3.utils.toWei('15'), // (amount) of tokens to transfer (CHILL have 18 decimals)
    false, // (force) flag, false to only allow contract with a Universal Receiver, true for any address (EOA or any contract)
    '0x', // (data) any additional data to send alongside the transfer
  )
  .send({ from: accounts[0] });
```

  </TabItem>

</Tabs>

:::info Notes on decimals

If you are transferring LSP7 tokens with `0` as [`decimals()`](../../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#decimals) or NFTs represented as LSP7 with [TokenType 1](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokentype), just pass the amount as a number without using the number formatting function.

Here is an example to transfer 2 x digital trading cards from the **LUKSO Family Game** (series LFG03):

```ts
// Create instance of the LUKSO Family Game (LFG03) token contract
const luksoFamilyGameSeries03 = new ethers.Contract(
  '0x6a58a1f2cbb5b39d90618736a7730bff0fa72801', // LUKSO Family Game (LFG03) contract address
  LSP7DigitalAsset.abi,
);

await luksoFamilyGameSeries03.transfer(
  signer.getAddress(), // (from) sender address (= our Universal Profile)
  '0x02e655F92f01BC7880807ec409F134b91bb28381', // (to) recipient's address
  2, // (amount) of tokens to transfer (LFG03 token contract has 0 decimals)
  true, // (force) flag, false to only allow contract with a Universal Receiver, true for any address (EOA or any contract)
  '0x', // (data) any additional data to send alongside the transfer
);
```

:::

### Transfer LSP8 NFTs

Call the [LSP8 `transfer(address,address,bytes32,bool,bytes)`](../../../contracts/contracts/LSP8IdentifiableDigitalAsset/#transfer) function and pass the `tokenId` of the NFT from the collection you want to transfer as 3rd parameter.

Make sure you specify the **_tokenId_ as a 32 bytes long value**, as shown in the code snippet below.

<Tabs groupId="web3-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
import { ethers } from 'ethers';

// Import the LSP8 ABI
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

// Connect to the UP Browser extension
const provider = new ethers.BrowserProvider(window.lukso);
await provider.send('eth_requestAccounts', []);
const signer = await provider.getSigner();

// Create instance of the Chillwhale NFT collection contract
const chillwhaleNft = new ethers.Contract(
  '0x86e817172b5c07f7036bf8aa46e2db9063743a83', // Chillwhale NFT collection contract address
  LSP8IdentifiableDigitalAsset.abi,
);

// Create the bytes32 representation of the tokenId number 319 (2nd param right pad to 32 bytes)
const tokenId = ethers.toBeHex(319, 32);

await chillwhaleNft.transfer(
  signer.getAddress(), // (from) sender address (= our Universal Profile)
  '0x02e655F92f01BC7880807ec409F134b91bb28381', // (to) recipient's address
  tokenId, // (tokenId) of the NFT to transfer
  true, // (force) flag, false to only allow contract with a Universal Receiver, true for any address (EOA or any contract)
  '0x', // (data) any additional data to send alongside the transfer
);
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js
import Web3 from 'web3';

// Import the LSP8 ABI
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

// Connect to the UP Browser extension
const web3 = new Web3(window.lukso);
await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();

// Create instance of the Chillwhale NFT collection contract
const chillwhaleNft = new web3.eth.Contract(
  LSP8IdentifiableDigitalAsset.abi,
  '0x86e817172b5c07f7036bf8aa46e2db9063743a83', // Chillwhale NFT collection contract address
);

// Create the bytes32 representation of the tokenId number 319 (2nd param right pad to 32 bytes - web3.js expect to specify in character counts, not bytes)
const tokenId = web3.utils.padLeft(319, 64);

await chillwhaleNft.methods
  .transfer(
    accounts[0], // (from) sender address (= our Universal Profile)
    '0x02e655F92f01BC7880807ec409F134b91bb28381', // (to) recipient's address
    tokenId, // (tokenId) of the NFT to transfer
    false, // (force) flag, false to only allow contract with a Universal Receiver, true for any address (EOA or any contract)
    '0x', // (data) any additional data to send alongside the transfer
  )
  .send({ from: accounts[0] });
```

  </TabItem>

</Tabs>
