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

## Deploying using the Universal Profile browser extension

To deploy your smart contract using the Universal Profile browser extension:

- Click on the _Customize this list_ option in the Environment field
- Activate the option of Injected Provider - Universal Profile under the _Deploy using a Browser Extension_.

![Injected Provider Selection in Remix](/img/tools/Injected-Provider.png)

## Verifying the Contract

To verify your contract on the LUKSO Testnet:

1. **Enable Contract Verification**
   - Open the _Plugin Manager_ in Remix
   - Activate the _Contract Verification_ tool
   - The verification icon will appear in the left menu

2. **Configure Blockscout API**
   - Navigate to the Settings tab
   - Add the LUKSO Testnet Blockscout API:
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

After verification, your contract will be visible and verified on the LUKSO Testnet explorer.
