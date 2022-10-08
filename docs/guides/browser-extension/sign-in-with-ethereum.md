---
sidebar_label: 'Sign-In with Ethereum'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign-In with Ethereum

The [LUKSO Browser Extension](./install-browser-extension.md) is compatible with [EIP-4361: Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361).
Therefore, if the message you want to sign complies with this standard, the LUKSO Browser Extension will show a custom login screen.

<div style={{textAlign: 'center'}}>
<img
    src="/img/extension/lukso-extension-siwe.webp"
    alt="Example of Sign-In with Ethereum screen"
/>
</div>

## 1. Get the Universal Profile address

The browser extension injects the Universal Profile smart contract address into the page. We need this address to generate the message to sign.

<Tabs groupId="provider">
  <TabItem value="ethers" label="Ethers.js">

```js
import { ethers } from 'ethers';

const etherProvider = new ethers.providers.Web3Provider(window.ethereum);

const accountsRequest = await etherProvider.send('eth_requestAccounts', []);
const signer = etherProvider.getSigner();
const upAddress = await signer.getAddress();
```

  </TabItem>
  <TabItem value="web3" label="Web3.js">

```js
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

const accountsRequest = await web3.eth.requestAccounts();
const accounts = await web3.eth.getAccounts();
const upAddress = accounts[0];
```

  </TabItem>
</Tabs>

## 2. Prepare the message

To enable the Sign-In With Ethereum (SIWE) screen, you need to prepare a message with a specific format, as you can see on the [standard page](https://eips.ethereum.org/EIPS/eip-4361) or below.

<details>
<summary>SIWE Template</summary>

<!-- prettier-ignore-start -->

```
${domain} wants you to sign in with your Ethereum account:
${address}

${statement}

URI: ${uri}
Version: ${version}
Chain ID: ${chain-id}
Nonce: ${nonce}
Issued At: ${issued-at}
Expiration Time: ${expiration-time}
Not Before: ${not-before}
Request ID: ${request-id}
Resources:
- ${resources[0]}
- ${resources[1]}
  ...
- ${resources[n]}
```

<!-- prettier-ignore-end -->

</details>

In JavaScript, you can use the [`siwe`](https://www.npmjs.com/package/siwe) package.

<Tabs>
  <TabItem value="siwe" label="With siwe library">

```js
import { SiweMessage } from 'siwe';

// ...

const message = new SiweMessage({
  domain: window.location.host,
  address: upAddress,
  statement: 'Hello SIWE :)',
  uri: window.location.origin,
  version: '1',
  chainId: '2828', // For LUKSO L16
});

const siweMessage = message.prepareMessage();
```

  </TabItem>
   <TabItem value="plain" label="Without siwe library">

<!-- prettier-ignore-start -->

```js
// ...

const domain = window.location.host;
const origin = window.location.origin;
const LUKSO_L16_CHAIN_ID = '2828';
const nonce = 'm97bdsjo'; // a randomized token, at least 8 alphanumeric characters
const date = new Date();
const issuedAt = date.toISOString();

const siweMessage = `${domain} wants you to sign in with your Ethereum account:

${upAddress}

Hello SIWE :)

URI: ${origin}
Version: 1
Chain ID: ${LUKSO_L16_CHAIN_ID}
Nonce: ${nonce}
Issued At: ${issuedAt}
Resources:
- http://some-resource1.com`;
```
<!-- prettier-ignore-end -->

</TabItem>
</Tabs>

## 3. Sign the message

<Tabs groupId="provider">
  <TabItem value="ethers" label="Ethers.js">

```js
const signature = await signer.signMessage(siweMessage);

// 0x38c53...
```

  </TabItem>
   <TabItem value="web3" label="Web3.js">

```js
const signature = await web3.eth.sign(siweMessage, upAddress);

// 0x38c53...
```

</TabItem>
</Tabs>

🎉 You received the signed message. Now, you need to verify it.

## 4. Verify the signature

Your Dapp has now received a message signed by the controller address of the Universal Profile. To finalise the login, you need to verify if the message was signed by an address which has the `SIGN` permission for this UP.

To do so, you can use the [`isValidSignature(...)`](../../standards/smart-contracts/lsp0-erc725-account#isvalidsignature) function to check if the signature was signed ([EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)) by an EOA that has the [`SIGN` permission](../../standards/universal-profile/lsp6-key-manager#permissions) over the Universal Profile.

<Tabs groupId="provider">
  <TabItem value="ethers" label="Ethers.js">

```js
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// ...

const myUniversalProfileContract = new ethers.Contract(
  upAddress,
  UniversalProfileContract.abi,
  signer,
);

const hashedMessage = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(siweMessage),
);

const isValidSignature = await myUniversalProfileContract.isValidSignature(
  hashedMessage,
  signature,
);

const MAGIC_VALUE = '0x1626ba7e'; // https://eips.ethereum.org/EIPS/eip-1271

if (isValidSignature === MAGIC_VALUE) {
  console.log('🎉 Sign-In successful!');
} else {
  console.log(
    '😡 The EOA which signed the message has no SIGN permission over this UP.',
  );
}
```

  </TabItem>
  <TabItem value="web3" label="Web3.js">

```js
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// ...

const myUniversalProfileContract = new web3.eth.Contract(
  UniversalProfileContract.abi,
  upAddress,
);

const hashedMessage = web3.utils.keccak256(siweMessage);

const MAGIC_VALUE = '0x1626ba7e'; // https://eips.ethereum.org/EIPS/eip-1271

// if the signature is valid it should return the magic value 0x1626ba7e
const isValidSignature =
  await myUniversalProfileContract.methods.isValidSignature(
    hashedMessage,
    signature,
  );

if (isValidSignature === MAGIC_VALUE) {
  console.log('🎉 Sign-In successful!');
} else {
  console.log(
    '😡 The EOA which signed the message has no SIGN permission over this UP.',
  );
}
```

  </TabItem>
</Tabs>

If `isValidSignature` returns the magic value: `0x1626ba7e`, then, the message was signed by an EOA which has a `SIGN` permission for this Universal Profile.
