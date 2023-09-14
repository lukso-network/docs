---
sidebar_label: Deploy our custom LSP7 contract
sidebar_position: 3
---

# Deploy your contract

Following the previous guide (["Create a custom LSP7 contract"](./create-custom-lsp7.md)), we are now ready to deploy our contract on the LUKSO Testnet network!

## Deploy the contract on LUKSO Testnet

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

In this chapter, we are going to deploy our contract using our Universal Profile. First thing is to [Install the UP browser extension](../../guides/browser-extension/install-browser-extension.md). Once installed, we will retrieve the information we need:

- Click on the extension
- Click on the cogwheel ⚙️ at the top right corner, then select "reveal private keys"
- Enter your password
- Scroll down and copy the `privateKey` field to your `.env` file in `PRIVATE_KEY`
- Copy the `address` field to your `.env` file in `UP_ADDR`

:::note

The `privateKey` coming from your UP extension is the private key of the EOA that controls your UP (more information about controllers can be found in the [Key Manager](../../standards/universal-profile/lsp6-key-manager.md) page). You can find the associated address in the extension if you click on the controller tab > UP Extension. This address will need to be funded using the [Testnet Faucet](https://faucet.testnet.lukso.network/).

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
  const customToken = await ethers.getContractFactory('CustomToken');

  const Token = await customToken.deploy();
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
