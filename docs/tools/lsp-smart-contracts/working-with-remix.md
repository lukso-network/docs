---
sidebar_position: 5
---

# Working with LSPs on Remix IDE

This guide will walk you through the process of building and deploying LSP smart contracts using [Remix IDE](https://remix.ethereum.org/).

## Setting Up Dependencies

First, create a `package.json` file with the required LSP smart contract dependencies to the root of your project:

```json
{
  "dependencies": {
    "@erc725/smart-contracts-v8": "npm:@erc725/smart-contracts@8.0.0",
    "@erc725/smart-contracts": "^7.0.0",
    "@openzeppelin/contracts": "^4.9.3",
    "@lukso/lsp1-contracts": "~0.15.0",
    "@lukso/lsp2-contracts": "~0.15.0",
    "@lukso/lsp14-contracts": "~0.15.0",
    "@lukso/lsp17contractextension-contracts": "~0.15.0",
    "@lukso/lsp20-contracts": "~0.15.0"
  }
}
```

## Creating an LSP7 Token Contract

Here's an example of a simple LSP7 token contract that includes minting and burning capabilities:

```solidity
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import {
    LSP7Mintable
} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol";
import {
    LSP7Burnable
} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.sol";

import {
    _LSP4_TOKEN_TYPE_TOKEN
} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";

contract LSP7Mint is LSP7Mintable, LSP7Burnable {
    constructor(
        string memory name,
        string memory symbol,
        address contractOwner,
        uint256 lsp4TokenType,
        bool isNonDivisible
    ) LSP7Mintable(name, symbol, contractOwner, lsp4TokenType, isNonDivisible) {
    }
}
```

## Deploying the Contract

When deploying the contract, you'll need to provide the following constructor parameters:

| Parameter        | Value              | Description                                     |
| ---------------- | ------------------ | ----------------------------------------------- |
| `name`           | "My Awesome Token" | The name of your token                          |
| `symbol`         | "MAT"              | The token symbol                                |
| `contractOwner`  | Your UP address    | The address that will own the contract          |
| `lsp4TokenType`  | 0                  | Token type (0 = token, 1 = NFT, 2 = collection) |
| `isNonDivisible` | false              | If true, decimals = 0; if false, decimals = 18  |

### Deploying using the Universal Profile browser extension

To deploy your smart contract using the Universal Profile browser extension:

- Click on the _Customize this list_ option in the Environment field
- Activate the option of Injected Provider - Universal Profile under the _Deploy using a Browser Extension_.

![Injected Provider Selection in Remix](/img/tools/Injected-Provider.png)

## Verifying the Contract

To verify your contract on the LUKSO testnet:

1. **Enable Contract Verification**

   - Open the Plugin Manager in Remix
   - Activate the Contract Verification tool
   - The verification icon will appear in the left menu

2. **Configure Blockscout API**

   - Navigate to the Settings tab
   - Add the LUKSO testnet Blockscout API:
     ```
     https://explorer.execution.testnet.lukso.network/api
     ```

3. **Verify Contract**
   - Go to the Verify tab
   - Fill in the following details:
     - Chain: LUKSO Testnet (4201)
     - Contract Address: _Your deployed contract address_
     - Contract Name: _Select your contract's Solidity file_
   - Enter the same constructor parameters used during deployment
   - Ensure Blockscout is selected
   - Click the "Verify" button

After verification, your contract will be visible and verified on the LUKSO testnet explorer.
