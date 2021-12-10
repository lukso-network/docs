---
sidebar_label: 'Create Digital Assets'
sidebar_position: 2.4
---

# Create Digital Assets

We are now going to learn how to create Digital Assets (NFT 2.0) and transfer them between Universal Profiles.

## Deploy your own Token Contract

We will now deploy our custom token, formerly known as LSP7 Digital Asset. To do so, you can use our `LSP7Mintable` contract. This contract assign the contract deployer as the token owner, and new tokens can be minted by the token owner.

```javascript
import LSP7Mintable from '@lukso/universalprofile-smart-contracts/artifacts/LSP7Mintable.json';

const myEOA = '<address-of-up-owner>';
const tokenParams = [
  'My LSP7 Token', // token name
  'LSP7', // token symbol
  myEOA, // new owner
  false, // isNFT (make your token divisible or not)
];

// create an instance
const myToken = new web3.eth.Contract(LSP7Mintable.abi, {
  gas: 5_000_000,
  gasPrice: '1000000000',
});

// deploy the token contract
await myToken
  .deploy({ data: LSP7Mintable.bytecode, arguments: tokenParams })
  .send({ from: myEOA });
```

## Mint tokens for your UP

The code snippet below shows how to mint 100 tokens with your Universal Profile as a beneficiary.

```javascript
await myToken.methods
  .mint('<up-address>', 100, false, '0x')
  .send({ from: myEOA });
```

## Transfer tokens from your UP to another UP

The following code snippet show how to transfer 15 tokens from your UP to another UP `bobUP`.
To do so

```javascript
const bobUP = '<bob-up-address>';
const amount = 15;

// 1. generate the payload to transfer tokens
const tokenPayload = myToken.methods
  .transfer('<up-address>', bobUP, amount, false, '0x')
  .encodeABI();

// 2. instruct Universal Profile to execute the token transfer on the token contract
await myUniversalProfile.methods
  .execute(0, myToken._address, 0, tokenPayload)
  .send({
    from: myEOA.address,
  });
```
