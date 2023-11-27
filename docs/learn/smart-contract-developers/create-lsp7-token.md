---
sidebar_label: '🌄 Create an LSP7 Token'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an LSP7 Token

:::tip

You can learn about the project setup by checking the [Getting Started](./getting-started.md) page.

:::

## Create a custom LSP7 Token

In this guide you will create a custom [LSP7 Digital Asset](../../standards/tokens/LSP7-Digital-Asset.md) and pre-mint a certain amount of tokens to a specific address. To build your smart contract you will use the following LSP7 preset and extension:

- [`LSP7Mintable`](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md): allow creating new assets on the smart contract.
- [`LSP7Burnable`](../../contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.md): allow tokens to be removed from the supply.

You can modify the `mint()` function to adjust the amount of initially minted tokens and their receiver as described in the [LSP7 Mintable Documentation](../../contracts/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.md#mint).

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

```solidity title="contracts/MyCustomToken.sol"
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

1. Create a `ethers.wallet` instance with your private key (the `signer`)
2. Load the associated UP
3. Get the bytecode of your contract
4. use `staticCall` method to get the address of the contract
5. deploy the contract

```ts title="scripts/deployUP.ts"
import hre from 'hardhat';
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';

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
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  // Hardhat has some issues with EIP 1559 settings, so you need to force it
  // See this issue for more info: https://github.com/NomicFoundation/hardhat/issues/3418
  const { maxFeePerGas, maxPriorityFeePerGas } =
    await ethers.provider.getFeeData();

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

Deploy the contract:

```bash
npx hardhat --network luksoTestnet run scripts/deployEOA.ts
```

You have deployed your first LSP7 token contract on the LUKSO Testnet. You can go and check out the token on the [Execution Block Explorer](https://explorer.execution.testnet.lukso.network/) using the address you just obtained.
