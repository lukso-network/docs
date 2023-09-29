---
sidebar_label: Getting Started
title: Getting Started
sidebar_position: 2
---

This page will guide you through the process of:

- setting up an [Hardhat](https://hardhat.org/) installation (using TypeScript)
- adding the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package (using version 0.11.0-rc.1)
- creating a basic `LSP7DigitalAsset` contract
- and deploying it on [LUKSO Testnet](../../networks/testnet/parameters).

### Create Hardhat project

The first thing to do is to [create a new Hardhat project](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start) that will use TypeScript:

```bash title="Setup new hardhat project"
mkdir lukso-app
cd lukso-app
npx hardhat
# select 'Create a TypeScript project' and
# use the default value for the rest of the setup
```

Once finished, you have a working Hardhat setup!

### Install packages &amp; setup tools

To work in the best condition possible, we will install libraries that includes tools, helpers and the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package.

#### Install dependencies

```bash
npm i -D dotenv
npm i -s @lukso/lsp-smart-contracts@0.11.0-rc.1
```

#### Add a build script in your package.json

Update your `package.json` with the following:

```json title="package.json"
"scripts": {
  "build": "hardhat compile --force --show-stack-traces"
},
```

#### Create a .env file

Create a new file at the root of your project called `.env` with the following content:

:::warning

The `.env` file contains sensitive values such as PRIVATE_KEY. Do not commit it to your source code repository!

:::

:::note

We will populate the values of the `.env` file later.

:::

```text title=".env"
PRIVATE_KEY=
UP_ADDR=
```

We now have a base Hardhat setup that we can use to develop and deploy our smart contracts.


## Create a custom LSP7 Token contract

We will now create a custom [LSP7 Digital Asset contract](../standards/nft-2.0/LSP7-Digital-Asset.md). This contract will extend [`LSP7Mintable`](./contracts/LSP7DigitalAsset/presets/LSP7Mintable.md) & [LSP7Burnable](./contracts/LSP7DigitalAsset/extensions/LSP7Burnable.md) (to allow burning tokens). We will also pre-mint 20k tokens to the owner of the contract (the deployer).
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

### 🍭 Bonus: create a MockContract to generate the UniversalProfile type

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
```

## Deploy our LSP7 Token contract on LUKSO Testnet

We are now ready to deploy our contract on the [**LUKSO Testnet network**](../networks/testnet/parameters.md)!

In order to deploy the contract, we will have to update the `hardhat.config.ts` and create a deploy script. Let's go!

### Update hardhat config

Jump in the `hardhat.config.ts` and update the file with this:

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

### Create a deploy script

We will create a script to deploy the smart contract to the LUKSO Testnet network. You can either use a regular EOA (Externally Owned Account) or a Universal Profile. Let's see those 2 possibilities below.

#### Deploy using a Universal Profile (Recommended)

In this chapter, we are going to deploy our contract using our Universal Profile. First thing is to [Install the UP browser extension](../guides/browser-extension/install-browser-extension.md). Once installed, we will retrieve the information we need:

- Click on the extension
- Click on the cogwheel ⚙️ at the top right corner, then select "reveal private keys"
- Enter your password
- Scroll down and copy the `privateKey` field to your `.env` file in `PRIVATE_KEY`
- Copy the `address` field to your `.env` file in `UP_ADDR`

:::note

The `privateKey` coming from your UP extension is the private key of the EOA that controls your UP (more information about controllers can be found in the [Key Manager](../standards/universal-profile/lsp6-key-manager.md) page). You can find the associated address in the extension if you click on the controller tab > UP Extension. This address will need to be funded using the [Testnet Faucet](https://faucet.testnet.lukso.network/).

:::

Now that we are all set up, we will create the script that will deploy the contract as your Universal Profile. In order to do so, we will:

1. Create a `ethers.wallet` instance with our private key (the `signer`)
2. Load the associated UP
3. Get the bytecode of our contract
4. use `staticCall` method to get the address of the contract
5. deploy the contract

Go in the `scripts/` folder and create a file named `deployUP.ts` with the following content:

```ts title="scripts/deployUP.ts"
import hre from 'hardhat';
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

// load env vars
dotenv.config();
const { UP_ADDR, PRIVATE_KEY } = process.env;

async function main() {
  // setup provider
  const provider = new ethers.JsonRpcProvider(
    'https://rpc.testnet.lukso.network',
  );
  // setup signer (the browser extension controller)
  const signer = new ethers.Wallet(PRIVATE_KEY as string, provider);
  // load the associated UP
  const UP = await ethers.getContractAt('UniversalProfile', UP_ADDR as string);
  console.log('🔑 EOA: ', signer.address);
  console.log('🆙 Universal Profile: ', await UP.getAddress());

  /**
   * Custom LSP7 Token
   */
  console.log('⏳ Deploying the custom Token');
  const CustomTokenBytecode =
    hre.artifacts.readArtifactSync('CustomToken').bytecode;

  // get the address of the contract that will be created
  const CustomTokenAddress = await UP.connect(signer)
    .getFunction('execute')
    .staticCall(1, ethers.ZeroAddress, 0, CustomTokenBytecode);

  // deploy CustomLSP7 as the UP (signed by the browser extension controller)
  const tx1 = await UP.connect(signer).execute(
    1,
    ethers.ZeroAddress,
    0,
    CustomTokenBytecode,
  );

  await tx1.wait();
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

Now, you can deploy the contract using:

```bash
npx hardhat --network luksoTestnet run scripts/deployUP.ts
```

#### Deploy using an EOA

Deploying with an EOA is definitively more intuitive and straight forward, but you miss on the Universal Profile features. To do so, we will need:

- an EOA (MetaMask, Coinbase wallet, ...)
- the private key (to be copied in your `.env` file in `PRIVATE_KEY`)

Then, create a file named `deployEOA.ts` in the `scripts/` folder with this:

```ts title="scripts/deployEOA.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  // Hardhat has some issues with EIP 1559 settings, so we force it
  // See this issue for more info: https://github.com/NomicFoundation/hardhat/issues/3418
  const { maxFeePerGas, maxPriorityFeePerGas } = await ethers.provider.getFeeData();

  const customToken = await ethers.getContractFactory('CustomToken');

  const Token = await customToken.deploy({
    maxFeePerGas,
    maxPriorityFeePerGas,
    type: 2,
  });
  const token = await Token.waitForDeployment();
  const CustomTokenAddress = await token.getAddress();
  console.log(`Token address: ${CustomTokenAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

You can deploy the contract using the command:

```bash
npx hardhat --network luksoTestnet run scripts/deployEOA.ts
```

## Congratulations 🥳

You have deployed your first LSP7 token contract on LUKSO testnet through your Universal Profile :)
