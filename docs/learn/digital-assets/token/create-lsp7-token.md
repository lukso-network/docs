---
sidebar_label: 'Basic LSP7 Token'
sidebar_position: 2
description: Learn how to create your own basic fungible token on LUKSO using the LSP7 Digital Asset standard.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🪙 Create a LSP7 Token

This guide will walk you through the process of creating and deploying a custom [LSP7 Digital Asset](../../../standards/tokens/LSP7-Digital-Asset.md) and pre-mint a certain amount of tokens to the token owner. To build a smart contract using LSPs, you can **inherit functionality** from modular and standardized presets in the [`@lukso/lsp-smart-contracts`](/tools/lsp-smart-contracts/getting-started.md) library. To learn more about the contract standards itself, please refer to the [Contracts section](../../../contracts/introduction.md) of our documentation.

:::tip

You can learn about the project setup and Hardhat & Foundry workflow by checking the [Getting Started](../../../tools/#smart-contracts) section.

:::

## Create the Token

For our sample deployment of the LSP7 token, we will use the following presets:

- [`LSP7Mintable`](../../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md): allow the contract [`owner`](../../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#owner) to mint new tokens.
- [`LSP7Burnable`](../../../contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.md): allow any token holders to burn tokens.

You can then import them within your Solidity contract file:

```solidity title="MyCustomToken.sol"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.sol";

contract CustomToken is LSP7Mintable, LSP7Burnable {
  // your custom token logic ...
}
```

After inheriting, the contract **expects the mandatory parameters** related to the imported standards. In case of [`LSP7`](../../../standards/tokens/LSP7-Digital-Asset.md), you must define default token parameters in the constructor of the smart contract, that will be set during the deployment of the contract:

- the [token name and symbol](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md#lsp4tokenname) (inherited from [LSP4](../../../standards/tokens/LSP4-Digital-Asset-Metadata.md))
- the address of the initial token owner
- the [token type](../../../standards/tokens/LSP4-Digital-Asset-Metadata#with-lsp7-digital-asset-token) of the asset
- the [divisibility](../../../standards/tokens/LSP7-Digital-Asset#divisible-vs-non-divisible) of token units (specific to [LSP7](../../../standards/tokens/LSP7-Digital-Asset))

You can specify the parameters and the mint function as seen below.

```solidity title="MyCustomToken.sol"
// ...

contract CustomToken is LSP7Mintable, LSP7Burnable {
    constructor(
        string memory tokenName_,
        string memory tokenSymbol_,
        address tokenContractOwner_,
        uint256 lsp4TokenType_,
        bool isNonDivisible_
    )
        LSP7Mintable(
            tokenName_,
            tokenSymbol_,
            tokenContractOwner_,
            lsp4TokenType_,
            isNonDivisible_
        )
    {
        {
            // your custom smart contract logic ...

            mint(
              msg.sender, // deployer will receive initial tokens
              20_000 * 10 ** decimals(), // will mint 20k tokens
              true, // force parameter
              ""  // optional transaction data
            );
        }
    }
}
```

:::info

To adjust the parameters of the mint, please have a look at the related [LSP7 function documentation](../../../contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.md#mint). You can find the **full documentation** for [LSP7](../../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable#parameters-16) and other **presets** within the [Technical ABI Reference](https://docs.lukso.tech/contracts/contracts/ERC725/).

:::

## Deploy the Token

:::success

Want to deploy token contracts from your 🆙? Have a look at our [Deploy Contracts from UP](../../universal-profile/interactions/deploy-contracts.md) guide on how to deploy any contract using the Universal Profile Browser Extension!

:::

```ts title="scripts/deployLSP7AsEOA.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function deployToken() {
  // Signer used for deployment
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contract with EOA: ', deployer.address);

  // Deploy the contract with custom constructor parameters
  const customToken = await ethers.deployContract('MyCustomToken', [
    'My Custom Token', // token name
    'MCT', // token symbol
    deployer.address, // owner
    0, // token type = TOKEN
    false, // isNonDivisible?
  ]);

  // Wait for the transaction to be included in a block
  await customToken.waitForDeployment();
  const customTokenAddress = await customToken.getAddress();
  console.log('Token deployed at: ', customTokenAddress);
}

deployToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

If you have not yet setup the LUKSO networks and private keys in Hardhat, please check out the previous [Getting Started](../../../learn/getting-started.mdx) guide for smart contract developers. If you set up the Hardhat configuration, you can execute the deployment script using the following command:

```bash
npx hardhat --network luksoTestnet run scripts/deployLSP7AsUP.ts
```

:::tip

You can check the deployed token address on the [Testnet Execution Explorer](https://explorer.execution.testnet.lukso.network/).

:::

## Verify the Token

In order to verify a contract, you have to create a file with all the constructor arguments that you've set during deployment. The parameters and the compiled contract code are then compared with the payload of the deployed contract. First, create the file with all constructor parameters:

```ts title="verify/myCustomToken.ts"
module.exports = [
  'My Custom Token', // token name
  'MCT', // token symbol
  '0x...', // deployer address
  0, // token type
  false, // divisibility
];
```

To verify the deployed token, you can use the **blockscout API properties** set up within the [Getting Started](../../../learn/getting-started.mdx) section. If you configured the API, you will be able to run the verification by specifying the _token address_, _parameter file_, and _network_:

```bash
npx hardhat verify <myTokenAddress> --constructor-args ./verify/myCustomToken.ts --network luksoTestnet
```
