---
sidebar_label: '🌄 Create an LSP7 Token'
sidebar_position: 2
description: Learn how to create a custom Digital Asset (token) on LUKSO using LSP7 standard.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an LSP7 Token

:::tip

You can learn about the project setup by checking the [Getting Started](./getting-started.md) page.

:::

:::note

For the following guide, we are using `hardhat v2.19.1`, `ethers v6` and `@lukso/lsp-smart-contracts`
.

:::

## Create a custom LSP7 Token

:::info

This guide will walk you through the process of deploying a contract in the context of Hardhat. For instructions on deploying a contract within a dApp using the UniversalProfile Browser extension, please refer to the [Deploy Contracts section](../dapp-developer/deploy-contracts.md) in the dApp developers section.

:::

In this guide you will create a custom [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) and pre-mint a certain amount of tokens to a specific address. To build your smart contract you will use the following LSP7 preset and extension:

- [`LSP7Mintable`](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md): allow creating new assets on the smart contract.
- [`LSP7Burnable`](../../contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.md): allow tokens to be removed from the supply.

You can modify the `mint()` function to adjust the amount of initially minted tokens and their receiver as described in the [LSP7 Mintable Documentation](../../contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.md#mint).

```solidity title="contracts/MyCustomToken.sol"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.sol";

contract CustomToken is LSP7Mintable, LSP7Burnable {
    // for more informations, check https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md
    constructor(
        string memory tokenName_,
        string memory tokenSymbol_,
        address tokenContractOwner_,
        uint256 lsp4TokenType_, // for details see: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md#lsp4tokentype
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
            mint(msg.sender, 20_000 * 10 ** decimals(), true, "0x"); // deployer gets 20k tokens
        }
    }
}
```

Compile your smart contract:

```bash
npx hardhat compile
```

<!-- ### 🍭 Bonus: create a MockContract to generate the UniversalProfile type

In order to deploy this Custom LSP7 contract, we will interact with a UniversalProfile. We can enhance the developer experience by generating the types for a `UniversalProfile` contract.
To do that, you can create a `MockContract.sol` file in the `contracts/` file with the following content:

```solidity title="contracts/MyCustomToken.sol"
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;
import {UniversalProfile} from '@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol';
```

We are now ready to build our contracts using the command:

```bash
npm run build
``` -->

## Deploy your LSP7 Token contract on the LUKSO Testnet

You are now ready to deploy your contract on the [**LUKSO Testnet network**](../../networks/testnet/parameters).

### Update hardhat config

```ts title="hardhat.config.ts"
import { HardhatUserConfig } from 'hardhat/config';
import { config as LoadEnv } from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';

LoadEnv();

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    luksoTestnet: {
      url: 'https://rpc.testnet.lukso.network',
      chainId: 4201,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
```

### Create a deployment script

Create a script to deploy the smart contract to the LUKSO Testnet network. You can either use a regular EOA (Externally Owned Account) or a Universal Profile.

#### Deploy using a Universal Profile (Recommended)

Deploy your contract using your Universal Profile. Make sure to have the [Universal Profile Browser Extension](/install-up-browser-extension) installed.

:::note

The `privateKey` coming from your UP extension is the private key of the EOA that controls your UP (more information about controllers can be found in the [Key Manager](../../standards/universal-profile/lsp6-key-manager.md) page). This address will need to be funded using the [Testnet Faucet](https://faucet.testnet.lukso.network/).

:::
Create the script that will deploy the contract as your Universal Profile.

1. Add your Universal Profile address to your `.env` file in `UP_ADDR`
2. Load the associated UP
3. Get the bytecode of your contract
4. Use `staticCall` method to get the address of the contract
5. Deploy the contract

```ts title="scripts/deployUP.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import UniversalProfileArtifact from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';
import { CustomToken__factory } from '../typechain-types';

// load env vars
dotenv.config();
const { UP_ADDR } = process.env;

async function main() {
  // load the associated UP
  const universalProfile = await ethers.getContractAtFromArtifact(
    UniversalProfileArtifact,
    UP_ADDR as string,
  );

  /**
   * Custom LSP7 Token
   */
  console.log('⏳ Deploying the custom Token');
  const CustomTokenBytecode = CustomToken__factory.bytecode; // bytecode of the custom token without the constructor params

  // custom token constructor params
  const tokenName = 'My Custom Token';
  const tokenSymbol = 'MCT';
  const tokenContractOwnerAddress = (await ethers.getSigners())[0].address;
  const tokenType = 0; // generic token
  const isNonDivisible = false;

  // encode constructor params
  const abiEncoder = new ethers.AbiCoder();
  const encodedConstructorParams = abiEncoder.encode(
    ['string', 'string', 'address', 'uint256', 'bool'],
    [
      tokenName,
      tokenSymbol,
      tokenContractOwnerAddress,
      tokenType,
      isNonDivisible,
    ],
  );

  // add the constructor params to the Custom Token bytecode
  const CustomTokenBytecodeWithConstructor =
    CustomTokenBytecode + encodedConstructorParams.slice(2);

  // get the address of the Custom Token contract that will be created
  const CustomTokenAddress = await universalProfile.staticCall(
    1, // Operation type: CREATE
    ethers.ZeroAddress,
    0, // Value is empty
    CustomTokenBytecodeWithConstructor,
  );

  // deploy the Custom Token contract
  const tx = await universalProfile.execute(
    1, // Operation type: CREATE
    ethers.ZeroAddress,
    0, // Value is empty
    CustomTokenBytecodeWithConstructor,
  );

  // wait for the tx to be mined
  await tx.wait();

  console.log(
    '✅ Custom Token successfully deployed at address: ',
    CustomTokenAddress,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Deploy the contract:

```bash
npx hardhat --network luksoTestnet run scripts/deployUP.ts
```

#### Deploy using an EOA

Deploying with an EOA is more straightforward, but you miss on the Universal Profile features. You will need:

- an EOA (MetaMask, Coinbase wallet, ...)
- the private key (to be copied in your `.env` file in `PRIVATE_KEY`)

```ts title="scripts/deployEOA.ts"
import { ethers } from 'hardhat';

async function main() {
  const customToken = await ethers.getContractFactory('CustomToken');

  // custom token constructor params
  const tokenName = 'My Custom Token';
  const tokenSymbol = 'MCT';
  const tokenContractOwnerAddress = (await ethers.getSigners())[0].address;
  const tokenType = 0; // generic token
  const isNonDivisible = false;

  const Token = await customToken.deploy(
    tokenName,
    tokenSymbol,
    tokenContractOwnerAddress,
    tokenType,
    isNonDivisible,
  );

  const token = await Token.waitForDeployment();
  const CustomTokenAddress = await token.getAddress();
  console.log(
    '✅ Custom Token successfully deployed at address: ',
    CustomTokenAddress,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Deploy the contract:

```bash
npx hardhat --network luksoTestnet run scripts/deployEOA.ts
```

You have deployed your first LSP7 token contract on the LUKSO Testnet. You can go and check out the token on the [Execution Block Explorer](https://explorer.execution.testnet.lukso.network/) using the address you just obtained.
