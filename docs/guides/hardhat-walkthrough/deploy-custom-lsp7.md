---
sidebar_label: Deploy our custom LSP7 contract
sidebar_position: 3
---

# Deploy your contract

Following the previous guide ("Create a custom LSP7 contract"), we are now ready to deploy it on the LUKSO Testnet network!

## Deploy the contract on LUKSO Testnet

In order to deploy the contract, we will have to update the `hardhat.config.ts` and create a deploy script. Let's go!

### Update hardhat config

Jump in the `hardhat.config.ts` and update the file with this:

```ts title="Update hardhat config"
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

#### Deploy using an Universal Profile (Recommended)

In this chapter, we are going to deploy our contract using our Universal Profile. First thing is to [Install the UP browser extension](https://docs.lukso.tech/guides/browser-extension/install-browser-extension). Once installed, we will retrieved the needed information:

- Click on the extension
- Click on the cogwheel ⚙️ at the top right corner, then select "reveal private keys"
- Enter your password
- Scroll down and copy the `privateKey` field to your `.env` file in `PRIVATE_KEY`
- Copy the `address` field to your `.env` file in `UP_ADDR`

:::note

The `privateKey` coming from your UP extension is the private key of the EOA that controls your UP. You can find the associated address in the extension if you click on the controller tab > UP Extension. This address will need to be funded using the [Testnet Faucet](https://faucet.testnet.lukso.network/).

:::

Now that we are all set up, we will create the script that will deploy the contract as your UniversalProfile. In order to do so, we will:

- Create a wallet instance with our private key (the `signer`)
- Load the associated UP
- Get the bytecode of our contract
- use `staticCall` method to get the address of the contract
- deploy the contract

Go in the `scripts/` folder and create a file named `deployUP.ts` with the following content:

```ts title="Deploy contract with UP"
import hre from 'hardhat';
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import * as LSP0ABI from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';

// load env vars
dotenv.config();

async function main() {
  // setup provider
  const provider = new ethers.JsonRpcProvider(
    'https://rpc.testnet.lukso.network',
  );
  // setup signer (the browser extension controller)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
  console.log('Deploying contracts with EOA: ', signer.address);

  // load the associated UP
  const UP = new ethers.Contract(
    process.env.UP_ADDR as string,
    LSP0ABI.abi,
    signer,
  );

  /**
   * Custom LSP7 Token
   */
  const CustomTokenBytecode =
    hre.artifacts.readArtifactSync('CustomToken').bytecode;

  // get the address of the contract that will be created
  const CustomTokenAddress = await UP.connect(signer)
    .getFunction('execute')
    .staticCall(1, ethers.ZeroAddress, 0, CustomTokenBytecode);

  // deploy CustomLSP7 as the UP (signed by the browser extension controller)
  const tx1 = await UP.connect(signer).getFunction('execute')(
    1,
    ethers.ZeroAddress,
    0,
    CustomTokenBytecode,
  );

  await tx1.wait();

  console.log('Custom token address: ', CustomTokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Now, you can deploy the contract using the command `npx hardhat --network luksoTestnet run scripts/deployUP.ts`

#### Deploy using an EOA

Deploying with an EOA is definitively more intuitive and straight forward, but you miss on the UniversalProfile features. To do so, we will need:

- an EOA (Metamask, Coinbase wallet, ...)
- the private key (to be copied in your `.env` file in `PRIVATE_KEY`)

Then, create a file named `deployEOA.ts` in the `scripts/` folder with this:

```ts title="Deploy contract with EOA"
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

You can deploy the contract using the command `npx hardhat --network luksoTestnet run scripts/deployEOA.ts`
