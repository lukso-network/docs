---
sidebar_label: 'UP Log-in & SIWE'
sidebar_position: 2
description: Learn how to log-in a Universal Profile using SIWE (Sign-In With Ethereum).
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Log-in a Universal Profile (SIWE)

<div style={{textAlign: 'center'}}>

<img
    src="/img/learn/up_extension_login.png"
    alt="Example of Sign-In with Ethereum screen"
    width="400"
/>

</div>

The [Universal Profile Browser Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) supports [EIP-4361: Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361) to sign custom messages and prove ownership of the connected account. In order to show the log-in screen in the extension and verify the signature of the controller, you have to ensure that the message complies with this standard.

## Setup

To implement Sign In With Ethereum for Universal Profiles (smart accounts), you will have to install:

- a **provider library** to connect to the account
- the **SIWE library** to prepare and manage the custom messages
- the **LSP smart contracts library** to verify the signature of the profile's controller.

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```shell
npm install ethers @lukso/lsp-smart-contracts siwe
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```shell
npm install web3 @lukso/lsp-smart-contracts siwe
```

  </TabItem>
</Tabs>

## Get the Universal Profile address

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
import { ethers } from 'ethers';
const provider = new ethers.BrowserProvider(window.lukso);

const accounts = await provider.send('eth_requestAccounts', []);
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js
import Web3 from 'web3';
const provider = new Web3(window.lukso);

const accounts = await provider.eth.requestAccounts();
```

  </TabItem>
</Tabs>

## Sign the message

Once you have access to the Universal Profile address, you can request a signature. As a smart contract can't sign by itself, the Universal Profile Browser Extension will automatically redirect the request to **sign the message with the related controller key** of the extension.

:::tip SIWE Specification

If you need further explanation on the `SiweMessage` properties, please have a look at the [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) specification.

:::

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

<!-- prettier-ignore-start -->
```js
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SiweMessage } from 'siwe';

const { chainId } = await provider.getNetwork()

// Prepare a message with the SIWE-specific format
const siweMessage = new SiweMessage({
    domain: window.location.host,   // Domain requesting the signing
    address: accounts[0],           // Address performing the signing
    statement: 'By logging in you agree to the terms and conditions.', // Human-readable assertion the user signs
    uri: window.location.origin,    // URI from the resource that is the subject of the signature
    version: '1',                   // Current version of the SIWE Message
    chainId: chainId,               // Chain ID to which the session is bound to
    resources: ['https://terms.website.com'], // Authentication resource as part of authentication by the relying party
}).prepareMessage();

// Get the signer of the Universal Profile 
const signer = await provider.getSigner(accounts[0]);

// Request the extension to sign the message
const signature = await signer.signMessage(siweMessage);
// 0x38c53...

// Create a contract instance to verify the signature on
const universalProfileContract = new ethers.Contract(
  accounts[0],
  UniversalProfileContract.abi,
  provider
);

// Create the message's hash for verification purposes
const hashedMessage = ethers.hashMessage(siweMessage);
```
<!-- prettier-ignore-end -->

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

<!-- prettier-ignore-start -->
```js
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SiweMessage } from 'siwe';

const { chainId } = await provider.getNetwork()

// Prepare a message with the SIWE-specific format
const siweMessage = new SiweMessage({
    domain: window.location.host,   // Domain requesting the signing
    address: accounts[0],           // Address performing the signing
    statement: 'By logging in you agree to the terms and conditions.', // Human-readable assertion the user signs
    uri: window.location.origin,    // URI from the resource that is the subject of the signature
    version: '1',                   // Current version of the SIWE Message
    chainId: chainId,               // Chain ID to which the session is bound to
    resources: ['https://terms.website.com'], // Authentication resource as part of authentication by the relying party
}).prepareMessage();

// Request the extension to sign the message
const signature = await web3.eth.sign(siweMessage, accounts[0]);
// 0x38c53...

// Create a contract instance to verify the signature on
const universalProfileContract = new web3.eth.Contract(
  UniversalProfileContract.abi,
  accounts[0],
);

// Create the message's hash for verification purposes
const hashedMessage = web3.eth.accounts.hashMessage(siweMessage);
```
<!-- prettier-ignore-end -->

  </TabItem>
</Tabs>

## Verify the signature

Your dApp has now received a message signed by the controller address of the Universal Profile. To finalise the login, you need to verify if the message was signed by an address which has the [`SIGN`](../../../standards/universal-profile/lsp6-key-manager.md#permissions) permission for this Universal Profile.

To check the signature, you can use the [`isValidSignature(...)`](../../../contracts/contracts/UniversalProfile.md#isvalidsignature) method of the [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) standardization. If the signature is valid, the method will return the magic value `0x1626ba7e`, indicating a successful verification.

<Tabs groupId="provider-lib">
  <TabItem value="ethers" label="ethers"  attributes={{className: "tab_ethers"}}>

```js
// Execute the contract verification call
const isValidSignature = await myUniversalProfileContract
  .isValidSignature(hashedMessage, signature)
  .call();

// Check if the response is equal to the magic value
if (isValidSignature === '0x1626ba7e') {
  console.log('Log In successful!');
} else {
  // The signing EOA has no SIGN permission on this UP.
  console.log('Log In failed');
}
```

  </TabItem>
  <TabItem value="web3" label="web3"  attributes={{className: "tab_web3"}}>

```js
// Execute the contract verification call
const isValidSignature = await myUniversalProfileContract.methods
  .isValidSignature(hashedMessage, signature)
  .call();

// Check if the response is equal to the magic value
if (isValidSignature === '0x1626ba7e') {
  console.log('Log In successful!');
} else {
  // The signing EOA has no SIGN permission on this UP.
  console.log('Log In failed');
}
```

  </TabItem>
</Tabs>

## Further authentication

To apply security measures on the server side of your application, you can use the **raw message format** below to authenticate users based on their Ethereum wallet signatures. The standardized format enables a non-custodial authentication mechanism where users prove ownership of their Ethereum address without revealing any sensitive information:

<details>
    <summary>Raw SIWE message format</summary>

```js
const domain = window.location.host; // Domain requesting the signing
const uri = window.location.origin; // URI from the resource that is the subject of the signature
const LUKSO_TESTNET_CHAIN_ID = '4201'; // The Chain ID to which the session is bound to
const nonce = 'm97bdsjo'; // A randomized token, at least 8 alphanumeric characters
const issuedAt = new Date().toISOString(); // The time when the message was generated

const siweMessage = `${domain} wants you to sign in with your Ethereum account:

${usersUPaddress}

By logging in you agree to the terms and conditions.

URI: ${uri}
Version: 1
Chain ID: ${LUKSO_TESTNET_CHAIN_ID}
Nonce: ${nonce}
Issued At: ${issuedAt}
Resources:
- https://terms.website.com`;
```

</details>

One practical application of the raw SIWI message is to generate _JSON Web Tokens_ after verifying the user's signature. This approach ensures that only the rightful owner of an Ethereum address can obtain a session token, enhancing the security and privacy of your Web3-based application. You can get additional guidance on the following resources:

- [🎥 BuildUP #2 | Web3 Auth: Using Universal Profile and SIWE for Login (YouTube)](https://www.youtube.com/watch?v=lY18lBu3_XA)
- [🛠️ LUKSO SIWE Demo Repository | Generating JWT's using Universal Profiles (GitHub)](https://github.com/richtera/lukso-siwe-demo)
