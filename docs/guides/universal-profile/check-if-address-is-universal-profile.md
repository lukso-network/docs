---
sidebar_label: 'Check if an address is a UP'
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to check if an address is a Universal Profile?

:::info

You may want to read the [Standard Detection](../../standards/standard-detection.md) page first.

:::

To check if an address is a [Universal Profile](../../standards/universal-profile/introduction.md) we need to perform 3 checks:

## Setup

Make sure you have the following dependencies installed before beginning this tutorial:

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

## Step 1 - Check address format

This first basic test can be performed via regular expression or 3rd party library function. For example this is how we can achieve this using Web3.js [`isAddress`](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#isaddress):

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import { isAddress } from 'web3-utils';

if (!isAddress(address)) {
  throw new Error('Invalid address');
}
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import { isAddress } from 'ethers';

if (!isAddress(address)) {
  throw new Error('Invalid address');
}
```

  </TabItem>

</Tabs>

## Step 2 - Check if the contract supports the `LSP0ERC725Account` interface using ERC165

This is next check that makes sure we deal with a smart contract that supports the `LSP0ERC725Account` interface ([EIP-165](https://eips.ethereum.org/EIPS/eip-165)). For this we need to create an `universalProfile` contract instance and call `supportsInterface(...)` method.

:::info

Universal Profiles inherit [ERC165](https://eips.ethereum.org/EIPS/eip-165), therefore by creating an instance of the Universal Profile contract you have access to the `supportsInterface(...)` method.

:::

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/constants';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

const universalProfileAddress = '0x...'; // The address of the contract that you are verifying
const universalProfile = new web3.eth.Contract(UniversalProfile.abi, universalProfileAddress);

const supportsLSP0Interface = await universalProfile.methods.supportsInterface(INTERFACE_IDS.LSP0ERC725Account).call();
// true or false -> if false, this address is not a Universal Profile.
if (!supportsLSP0Interface) {
  throw new Error('Contract does not support LSP0ERC725Account interface');
}
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/constants';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');

const universalProfileAddress = '0x...'; // The address of the contract that you are verifying
const universalProfile = new ethers.Contract(universalProfileAddress, UniversalProfile.abi, provider);

const supportsLSP0Interface = await universalProfile.supportsInterface(INTERFACE_IDS.LSP0ERC725Account);
// true or false -> if false, this address is not a Universal Profile.
if (!supportsLSP0Interface) {
  throw new Error('Contract does not support LSP0ERC725Account interface');
}
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

## Step 3 - Check supported standard

Last but not least we should perform a check over `LSP3Profile-Metadata` standard. For this we need to call `getData` with the `SupportedStandards:LSP3Profile` key.

:::info

Universal Profiles inherit [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y), therefore by creating an instance of the Universal Profile contract you have access to the `getData(..)` method.

:::

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SupportedStandards } from '@lukso/lsp-smart-contracts/constants';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

const universalProfileAddress = "0x..."; // The address of the contract that you are verifying
const universalProfile = new web3.eth.Contract(UniversalProfile.abi, universalProfileAddress);

const supportedStandard = await universalProfile.methods['getData(bytes32)'](SupportedStandards.LSP3Profile.key).call();

if (supportedStandard !== SupportedStandards.LSP3Profile.value) {
  throw new Error('Address does not support LSP3Profile-Metadata standard');
}
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SupportedStandards } from '@lukso/lsp-smart-contracts/constants';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');

const universalProfileAddress = '0x...'; // The address of the contract that you are verifying
const universalProfile = new ethers.Contract(universalProfileAddress, UniversalProfile.abi, provider);

const supportedStandard = await universalProfile['getData(bytes32)'](SupportedStandards.LSP3Profile.key);

if (supportedStandard !== SupportedStandards.LSP3Profile.value) {
  throw new Error('Address does not support LSP3Profile-Metadata standard');
}
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>

## Final Code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { INTERFACE_IDS, SupportedStandards } from '@lukso/lsp-smart-contracts/constants';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

if (!web3.utils.isAddress(address)) {
  throw new Error('Invalid address');
}

// We assume that the contract is a Universal Profile
const universalProfileAddress = '0x...'; // The address of the contract that you are verifying
const universalProfile = new web3.eth.Contract(UniversalProfile.abi, universalProfileAddress);

const supportsLSP0Interface = await universalProfile.methods.supportsInterface(INTERFACE_IDS.LSP0ERC725Account).call();
// true or false -> if false, this address is not a Universal Profile.
if (!supportsLSP0Interface) {
  throw new Error('Contract does not support LSP0ERC725Account interface');
}

const supportedStandard = await universalProfile.methods['getData(bytes32)'](SupportedStandards.LSP3Profile.key).call();

if (supportedStandard !== SupportedStandards.LSP3Profile.value) {
  throw new Error('Address does not support LSP3Profile-Metadata standard');
}
```

<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

<!-- prettier-ignore-start -->

```javascript
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { INTERFACE_IDS, SupportedStandards } from '@lukso/lsp-smart-contracts/constants';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.network');

if (!ethers.utils.isAddress(address)) {
  throw new Error('Invalid address');
}

// We assume that the contract is a Universal Profile
const universalProfileAddress = '0x...'; // The address of the contract that you are verifying
const universalProfile = new ethers.Contract(universalProfileAddress, UniversalProfile.abi, provider);

const supportsLSP0Interface = await universalProfile.supportsInterface(INTERFACE_IDS.LSP0ERC725Account);
// true or false -> if false, this address is not a Universal Profile.
if (!supportsLSP0Interface) {
  throw new Error('Contract does not support LSP0ERC725Account interface');
}

const supportedStandard = await universalProfile['getData(bytes32)'](SupportedStandards.LSP3Profile.key);

if (supportedStandard !== SupportedStandards.LSP3Profile.value) {
  throw new Error('Address does not support LSP3Profile-Metadata standard');
}
```

<!-- prettier-ignore-end -->

  </TabItem>

</Tabs>
