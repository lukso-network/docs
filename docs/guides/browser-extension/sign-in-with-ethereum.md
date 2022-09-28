---
sidebar_label: 'Sign-in With Ethereum'
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign arbitrary messages

### 1. Initialize a blockchain provider

<Tabs>
  <TabItem value="web3" label="web3">

```js
import Web3 from 'web3';
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

const web3 = new Web3(window.ethereum);
```

  </TabItem>
  <TabItem value="ethers" label="ethers">

```js
import { ethers } from 'ethers';
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
```

  </TabItem>
</Tabs>

### 2. Get access to the profile address in use

A call to `requestAccounts` will open an extension popup to authorize an account.

<Tabs>
  <TabItem value="web3" label="web3">

```js
const accountsRequest: string[] = await web3.eth.requestAccounts();
const accounts: string[] = await web3.eth.getAccounts(); //should also return the same addresses
```

  </TabItem>
  <TabItem value="ethers" label="ethers">

```js
const accountsRequest: string[] = await etherProvider.send(
  'eth_requestAccounts',
  [],
);
const signer = etherProvider.getSigner();
await signer.getAddress(); //should also yield the same address
```

  </TabItem>
  <TabItem value="raw" label="raw">

```js
const accountsRequest: string[] = await window.ethereum.request({
  method: 'eth_requestAccounts',
  params: [],
});
const accounts: string[] = await window.ethereum.request({
  method: 'eth_accounts',
  params: [],
}); //should also yield the same address
```

  </TabItem>
</Tabs>

### 3. Sign message

<Tabs>
  <TabItem value="web3" label="web3">

```js
const message = 'Hello World';
const address = web3.currentProvider.selectedAddress;
const signature = await web3.eth.sign(message, address);
```

  </TabItem>
  <TabItem value="ethers" label="ethers">

```js
const message = 'Hello World';
const signature = await signer.signMessage(message);
```

  </TabItem>
</Tabs>

## Verify the signature on the Universal Profile

Because the UP is a smart contract, and the messages are usually signed by a controller account (EOA), Universal Profile has the [`isValidSignature(...)`](https://docs.lukso.tech/standards/smart-contracts/lsp0-erc725-account#isvalidsignature) function implemented to check if the signature was signed ([EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)) by an EOA that has the [`SIGN` permission](https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager#permissions) over the Universal Profile.

<Tabs>
  <TabItem value="web3" label="web3">

```js
const myUpAddress = '0x......';

const myUniversalProfile = new web3.eth.Contract(
  UniversalProfileContract.abi,
  myUpAddress,
);

const hashedMessage = web3.utils.keccak256(message);

// if the signature is valid it should return the magic value 0x1626ba7e
const isValidSignature = myUniversalProfile.methods.isValidSignature(
  hashedMessage,
  signature,
);
```

  </TabItem>
  <TabItem value="ethers" label="ethers">

```js
const myUpAddress = '0x......';

const myUniversalProfile = new ethers.Contract(
  myUpAddress,
  UniversalProfileContract.abi,
  signer,
);

const hashedMessage = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(message));

// if the signature is valid it should return the magic value 0x1626ba7e
const isValidSignature = myUniversalProfile.isValidSignature(
  hashedMessage,
  signature,
);
```

  </TabItem>
</Tabs>

If `isValidSignature` returns the magic value: `0x1626ba7e`, then, the message was signed by an EOA which has a `SIGN` permission for this Universal Profile.
