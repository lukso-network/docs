---
sidebar_label: 'Check if an address is a UP'
---

# How to check if an address is a Universal Profile?

:::info

You may want to read the [Standard Detection](../../standards/standard-detection.md) page first.

:::

To check if an address is a [Universal Profile](../../standards/universal-profile/introduction.md) we need to perform 3 checks:

## 1) Check address format

This first basic test can be performed via regular expression or 3rd party library function. For example this is how we can achieve this using Web3js [`isAddress`](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#isaddress):

```javascript
import { isAddress } from 'web3-utils';

if (!isAddress(address)) {
  throw new Error('Invalid address');
}
```

## 2) Check the contract supports the `LSP0ERC725Account` interface using ERC165

This is next check that makes sure we deal with a smart contract that supports the `LSP0ERC725Account` interface ([EIP-165](https://eips.ethereum.org/EIPS/eip-165)). For this we need to set `Contract` instance and call `supportsInterface` method.

<details>
<summary>EIP-165 supportsInterface ABI</summary>

```javascript
const eip165ABI = [
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    name: 'supportsInterface',
    inputs: [
      {
        type: 'bytes4',
        name: 'interfaceId',
        internalType: 'bytes4',
      },
    ],
  },
];
```

</details>

```javascript
const eip165Contract = new web3.Contract(eip165ABI, address);

const interfaceId = '0xeb6be62e'; // Can be found here: https://docs.lukso.tech/standards/smart-contracts/interface-ids

await eip165Contract.methods.supportsInterface(interfaceId).call();
// true or false -> if false, this address is not a Universal Profile.
```

## 3) Check supported standard

Last but not least we should perform a check over `LSP3UniversalProfile` standard. For this we need to call `getData` on the `SupportedStandards:LSP3UniversalProfile` key.

<details>
<summary>getData ABI</summary>

```javascript
// This ABI can also be imported from @lukso/lsp-smart-contracts npm package

const getDataABI = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'dataKey',
        type: 'bytes32',
      },
    ],
    name: 'getData',
    outputs: [
      {
        internalType: 'bytes',
        name: 'dataValue',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
```

</details>

<!-- prettier-ignore-start -->

```javascript
import {INTERFACE_IDS, SupportedStandards} from '@lukso/lsp-smart-contracts/constants';

const contract = new web3.Contract(getDataABI, address);

const supportedStandard = await contract.methods['getData(bytes32)'](SupportedStandards.LSP3UniversalProfile.key).call();

if (supportedStandard !== SupportedStandards.LSP3UniversalProfile.value) {
  throw new Error('Address does not support LSP3UniversalProfile standard');
}
```

<!-- prettier-ignore-end -->
