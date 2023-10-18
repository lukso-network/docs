---
sidebar_label: '🦄 Log-in a Universal Profile'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Log-in a Universal Profile (SIWE)

<div style={{textAlign: 'center'}}>

<img
    src="/img/learn/siwe.png"
    alt="Example of Sign-In with Ethereum screen"
    width="300"
/>

</div>

The [Universal Profile Browser Extension](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) is compatible with [EIP-4361: Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361).
Therefore, if the message you want to sign complies with this standard, the LUKSO UP Browser Extension will show a custom login screen.

## Get the Universal Profile address

```js
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

// Request the user's Universal Profile address
await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();
```

## Sign the message

Once you have access to the Universal Profile address, you can request a signature. The UP Browser Extension will sign the message with the controller key used by the extension (a smart contract can't sign).
:::tip
If you need further explanation on the `SiWeMessage` properties, please have a look at the [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) specification.
:::

```js
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SiweMessage } from 'siwe';

const myUniversalProfileContract = new web3.eth.Contract(
  UniversalProfileContract.abi,
  accounts[0],
);
// To enable the Sign-In With Ethereum (SIWE) screen, you need to prepare a message with a specific format
const hashedMessage = web3.eth.accounts.hashMessage(
  new SiweMessage({
    domain: window.location.host, // domain requesting the signing
    address: upAddress,           // address performing the signing
    statement: 'By logging in you agree to the terms and conditions.', // a human-readable assertion user signs
    uri: window.location.origin,  // URI from the resource that is the subject of the signing
    version: '1',                 // current version of the SIWE Message
    chainId: '4201',              // Chain ID to which the session is bound, 4201 is LUKSO Testnet
    resources: ['https://terms.website.com'], // information the user wishes to have resolved as part of authentication by the relying party
  }).prepareMessage(),
);

// Request the user to sign the login message with his Universal Profile
// The UP Browser Extension will sign the message with the controller key used by the extension (a smart contract can't sign)
const signature = await web3.eth.sign(siweMessage, accounts[0]);
// 0x38c53...
```
<details>
    <summary>Raw SIWE message format</summary>

```js
const domain = window.location.host;       // explain
const uri = window.location.origin;        // explain
const LUKSO_TESTNET_CHAIN_ID = '4201';
const nonce = 'm97bdsjo';                  // a randomized token, at least 8 alphanumeric characters
const issuedAt = new Date().toISOString(); // explain

const siweMessage = 
`${domain} wants you to sign in with your Ethereum account:

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

## Verify the signature on the user's Universal Profile

Your Dapp has now received a message signed by the controller address of the Universal Profile. To finalise the login, you need to verify if the message was signed by an address which has the `SIGN` permission for this UP.

To do so, you can use the [`isValidSignature(...)`](../../contracts/contracts/UniversalProfile.md#isvalidsignature) function to check if the signature was signed ([EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)) by an EOA that has the [`SIGN` permission](../../standards/universal-profile/lsp6-key-manager#permissions) over the Universal Profile.

```js
// If the signature is valid it should return the succes value 0x1626ba7e, then, the message was signed by an EOA which has a SIGN permission for this Universal Profile.
// For additional details, check https://eips.ethereum.org/EIPS/eip-1271
const isValidSignature = await myUniversalProfileContract.methods
  .isValidSignature(hashedMessage, signature)
  .call();

if (isValidSignature === '0x1626ba7e') {
  console.log('Log In successful!');
} else {
  // The EOA which signed the message has no SIGN permission over this UP.
  console.log('Log In failed');
}
```
