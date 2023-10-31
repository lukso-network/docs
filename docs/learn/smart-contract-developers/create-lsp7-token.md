---
sidebar_label: '🌄 Create LSP7 Token'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create LSP7 Token

:::caution Disclaimer

This guide might contain outdated information and will be updated soon.

:::

## Create a custom LSP7 Token contract

:::tip

Please read the [Introduction](./getting-started.md) page to set up your project correctly.

:::

We will now create a custom [LSP7 Digital Asset contract](../../standards/tokens/LSP7-Digital-Asset.md). This contract will extend [`LSP7Mintable`](../../contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.md) & [LSP7Burnable](../../contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.md) (to allow burning tokens). We will also pre-mint 20k tokens to the owner of the contract (the deployer).
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

## Deploy our LSP7 Token contract on LUKSO Testnet

We are now ready to deploy our contract on the [**LUKSO Testnet network**](../../networks/testnet/parameters.md)!

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

In this chapter, we are going to deploy our contract using our Universal Profile. First thing is to [Install the UP browser extension](/install-up-browser-extension). Once installed, we will retrieve the information we need:

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
  // Hardhat has some issues with EIP 1559 settings, so we force it
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

You can deploy the contract using the command:

```bash
npx hardhat --network luksoTestnet run scripts/deployEOA.ts
```

## Congratulations 🥳

You have deployed your first LSP7 token contract on LUKSO testnet through your Universal Profile :)

---

This guide will teach you how to create an [LSP7 Digital Asset contract](../../standards/tokens/LSP7-Digital-Asset.md).

## Deploy an LSP7 Digital Asset contract

We will use a specific implementation of LSP7, called `LSP7Mintable`. It allows the contract deployer to mint new tokens.

Make sure you have the following dependencies installed:

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

### Step 1 - Setup imports and constants

At this point you will need a private key in order to deploy an `LSP7Mintable` contract.
We will import `LSP7Mintable` in order to get the _ABI_ and _bytecode_ of the contract that will be deployed.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

// initialize your EOA
const privateKey = '0x...';
const account = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);

// setup your EOA
const privateKey = '0x...';
const myEOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

### Step 2 - Instantiate contracts

At this point, the `LPS7Mintable` contract is being prepared for deployment.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
const myToken = new web3.eth.Contract(LSP7Mintable.abi, {
  gas: 5_000_000,
  gasPrice: '1000000000',
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
const lsp7Factory = new ethers.ContractFactory(
  LSP7Mintable.abi,
  LSP7Mintable.bytecode,
);
```

  </TabItem>

</Tabs>

### Step 3 - Send transaction

Finally, deploy the contract.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

<!-- prettier-ignore-start -->

```javascript title="Deploy the LSP7 Digital Asset contract"
await myToken.deploy({
    data: LSP7Mintable.bytecode,
    arguments: [
      'My LSP7 Token', // token name
      'LSP7', // token symbol
      account.address, // new owner, who will mint later
      false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
    ],
  })
  .send({ from: account.address });
```
<!-- prettier-ignore-end -->

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript title="Deploy the LSP7 Digital Asset contract"
const myToken = await lsp7Factory.connect(myEOA).deploy(
  'My LSP7 Token', // token name
  'LSP7', // token symbol
  myEOA.address, // new owner, who will mint later
  false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
);
```

  </TabItem>

</Tabs>

### Final code

<!-- prettier-ignore-start -->

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.testnet.lukso.network');

// initialize your EOA
const privateKey = '0x...';
const account = web3.eth.accounts.wallet.add(privateKey);

// create a contract instance
const myToken = new web3.eth.Contract(LSP7Mintable.abi, {
  gas: 5_000_000,
  gasPrice: '1000000000',
});

// deploy the token contract
await myToken.deploy({
    data: LSP7Mintable.bytecode,
    arguments: [
      'My LSP7 Token', // token name
      'LSP7', // token symbol
      account.address, // new owner, who will mint later
      false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
    ],
  })
  .send({ from: account.address });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```javascript
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.network');

// set up your EOA
const privateKey = '0x...';
const myEOA = new ethers.Wallet(privateKey).connect(provider);

// create an instance of the token contract
const lsp7Factory = new ethers.ContractFactory(
  LSP7Mintable.abi,
  LSP7Mintable.bytecode,
);

// deploy the token contract
const myToken = await lsp7Factory.connect(myEOA).deploy(
  'My LSP7 Token', // token name
  'LSP7', // token symbol
  myEOA.address, // new owner, who will mint later
  false, // isNonDivisible = TRUE, means NOT divisible, decimals = 0)
);
```

  </TabItem>

</Tabs>

<!-- prettier-ignore-end -->
