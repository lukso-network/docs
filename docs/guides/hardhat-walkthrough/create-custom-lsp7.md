---
sidebar_label: Create a custom LSP7 contract
sidebar_position: 2
---

# Create a custom LSP7 contract

Following the previous guide on ["How to setup a hardhat base setup"](./hardhat-base-setup.md), we will now create a custom [LSP7 contract](../../standards/nft-2.0/LSP7-Digital-Asset.md).

This contract will extend LSP7Mintable & [LSP7Burnable](../../contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.md) (to allow burning tokens). We will also premint 20k tokens to the owner of the contract (the deployer).
To do that, delete the `Lock.sol` contract in the `contracts/` folder, then create a new file named `MyCustomToken.sol` with the following content:

```solidity title="contracts/MyCustomToken.sol"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.sol";

contract CustomToken is LSP7Mintable, LSP7Burnable {
  // parameters for LSP7Mintable constructor are:
  // token name,
  // token symbol,
  // token owner,
  // boolean isNonDivisible
  // for more informations, check https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md
  constructor() LSP7Mintable("My Custom Token", "MCT", msg.sender, false) {
    mint(msg.sender, 20000 * 10**decimals(), true, '0x' );
  }
}
```

We are now ready to build it using the command:

```bash
npm run build
```
