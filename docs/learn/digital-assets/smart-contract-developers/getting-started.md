---
sidebar_label: '👋🏻 Getting Started'
sidebar_position: 1
description: Create a Hardhat project and start building your smart contracts for LUKSO.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started building contracts

The LUKSO ecosystem offers smart contract developers a lot of [new standards](../../../standards/introduction.md) and [tools](../../../tools/getting-started.md) to build **powerful, modular, and standardized** blockchain applications. As LUKSO is an EVM-based Blockchain, all tools and tutorials for Ethereum also work well for LUKSO.

The following tutorial will teach you how to:

- set up a [Hardhat](https://hardhat.org/) project using TypeScript
- configure the contract settings, [networks](../../../networks/testnet/parameters) and [Blockscout API](https://explorer.execution.testnet.lukso.network/api-docs)
- utilize LSP smart contract presets using the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts)
- compile and deploy LSP-based smart contracts
- verify smart contracts on [Blockscout](https://explorer.execution.testnet.lukso.network/)

If you need more low level information about our contracts, you can check the dedicated [contracts](../../../contracts/introduction.md) section.

### Playground Repository

Want to dive into the code directly? The [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository has a full Hardhat setup, including ready-to-go network configurations, sample contracts, and scripts to deploy and verify LSP-based contracts on LUKSO networks using both EOAs or Universal Profiles.

<div style={{textAlign: 'center'}}>

<img
src="/img/guides/playground_hardhat.png"
alt="LUKSO Playground Hardhat"
/>

</div>

## Set up a Hardhat project

First, create a new folder for the Hardhat repository:

```bash
mkdir lukso-hardhat-repo
cd lukso-hardhat-repo
```

Afterward, [initialize the Hardhat project](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start) using TypeScript:

```bash
npx hardhat init
# Proceed installing the Hardhat library
# select 'Create a TypeScript project'
# use the default values for the rest of the setup
# This will install the toolbox for deployment and verification
# This will also add a gitignore file
```

Once finished, you have a working Hardhat setup. To use your private keys and Universal Profile address for deployment, please set up the `dotenv` environment, so those can be stored and fetched in a private file.

```bash
npm install -D dotenv
```

After installation, we will update the `.gitignore` file, so library installations and private keys from `dotenv` are never included in any code commits within your project. Especially `dotenv` files contain sensitive values such as the private key of a blockchain account.

```text title=".gitignore"
node_modules
.env
```

You can then go ahead to create a `.env` file within the root folder of the Hardhat repository and the following contents:

```text title=".env"
PRIVATE_KEY=0x...
UP_ADDR=0x...
```

The private key will be used to deploy the smart contracts to the network and can either be a **standalone Externally Owned Account** or a **controller of a Universal Profile**. If you want to deploy the smart contracts as a Universal Profile, you also have to provide the related address of the Universal Profile.

:::danger

Never share your private key that you will put into the `.env` file!

:::

:::success

To pay for the deployment fees of the accounts, you will need LYXt or LYX. For the testnet, you can request LYXt from the [LUKSO Testnet faucet](https://faucet.testnet.lukso.network/)

:::

We now have a base Hardhat setup that we can use to develop and deploy our smart contracts.

## Configure contracts and networks

By default, the deployment will be to your local network and default Solidity version. If you want to deploy and verify your smart contracts on LUKSO, you will have to

- specify `solidity` compiler settings, so LSP presets match your contract version and EVM requirements
- add the parameters of the `networks` and their related private keys
- define the `etherscan` APIs to verify contracts on the networks

```js title="hardhat.config.ts"
import { HardhatUserConfig } from 'hardhat/config';
import { config as LoadEnv } from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';

LoadEnv();

const config: HardhatUserConfig = {
  solidity: {
    // Default compiler version for all contracts
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    luksoTestnet: {
      url: 'https://4201.rpc.thirdweb.com',
      chainId: 4201,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    luksoMainnet: {
      url: 'https://42.rpc.thirdweb.com',
      chainId: 42,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: 'no-api-key-needed',
    customChains: [
      {
        network: 'luksoTestnet',
        chainId: 4201,
        urls: {
          apiURL: 'https://explorer.execution.testnet.lukso.network/api',
          browserURL: 'https://explorer.execution.testnet.lukso.network/',
        },
      },
      {
        network: 'luksoMainnet',
        chainId: 42,
        urls: {
          apiURL: 'https://explorer.execution.mainnet.lukso.network/api',
          browserURL: 'https://explorer.execution.mainnet.lukso.network/',
        },
      },
    ],
  },
};

export default config;
```

## Use LSP smart contract presets

To use LSP smart contracts within your Hardhat project, you can install the latest version of the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package like the following:

```bash
npm install @lukso/lsp-smart-contracts@latest
```

As the syntax of smart contracts works by **inheritance**, you can add underlying functionalities by importing predefined contracts. To create a new smart contract using LSPs, you can simply `import` the standardized and modular presets from the previously installed `@lukso/lsp-smart-contracts` library. These presets can then be combined to create complex contract deployments like Universal Profiles and Digital Assets.

As an example, you can import `LSP7Mintable` to create a LSP7 contract that enables the contract owner to mint these tokens:

```js title="MyCustomToken.sol"
import { LSP7Mintable } from '@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol';

// ...

contract MyToken is LSP7Mintable {
    // your custom smart contract logic ...
}
```

:::info

After inheriting from LSPs, the contract might expect mandatory parameters to fullfil the standardization. In case of `LSP7Mintable`, you must define a set of default parameters in the constructor of the smart contract, defined during the contracts deployment. You can find more information on the [Create LSP7 Token Guide](./create-lsp7-token.md).

:::

## Compile and deploy contracts

After setting up the contract, you can compile it using the following command:

```bash
npx hardhat compile
```

:::info Debugging

Add the `--verbose` and `--show-stack-traces` flags for further information.

:::

After the contract is compiled, you can create a deployment script to publish the contract on the blockchain.

<Tabs>
  <TabItem value="up" label="Deploy with Universal Profile">

If you are deploying a contract as Universal Profile, you will have to prepare the payload of the contract deployment:

1. Encode the constructor parameters
2. Generate the full bytecode for the contract deployment

:::info Address Generation

You can mimic calling the [`execute()`](../../../contracts/contracts/ERC725/ERC725.md#execute) function on the Universal Profile using `staticCall`. This address then matches the contract that will later be deployed using the same parameters.

:::

```ts title="deployContractAsUP.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

import LSP0Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';

// Load environment variables
dotenv.config();

async function deployContract() {
  // UP controller used for deployment
  const [deployer] = await ethers.getSigners();
  console.log(
    'Deploying contract with Universal Profile controller: ',
    deployer.address,
  );

  // Load the Universal Profile
  const universalProfile = await ethers.getContractAtFromArtifact(
    LSP0Artifact,
    process.env.UP_ADDR as string,
  );

  // Create custom bytecode for the contract deployment
  const contractBytecode = (await ethers.getContractFactory('MyCustomContract'))
    .bytecode;
  const abiEncoder = new ethers.AbiCoder();

  // Encode constructor parameters
  const encodedConstructorParams = abiEncoder.encode(
    [
      // your custom constructor types
    ],
    [
      // your custom constructor parameters
    ],
  );

  // Add the constructor parameters to the contract bytecode
  const contractBytecodeWithConstructor = ethers.concat([
    contractBytecode,
    encodedConstructorParams,
  ]);

  // Get the address of the custom contract that will be created
  const contractAddress = await universalProfile.execute.staticCall(
    1, // Operation type: CREATE
    ethers.ZeroAddress, // Target: 0x0 as contract will be initialized
    0, // Value is empty
    contractBytecodeWithConstructor, // Payload of the contract
  );

  // Deploy the contract by the Universal Profile
  const tx = await universalProfile.execute(
    1, // Operation type: CREATE
    ethers.ZeroAddress, // Target: 0x0 as contract will be initialized
    0, // Value is empty
    contractBytecodeWithConstructor, // Payload of the contract
  );

  // Wait for the transaction to be included in a block
  await tx.wait();
  console.log('Contract deployed at: ', contractAddress);
}

deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

  </TabItem>

  <TabItem value="eoa" label="Deploy with EOA">

```js title="deployContractAsEOA.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function deployContract() {
  // Signer used for deployment
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contract with EOA: ', deployer.address);

  // Deploy the contract with custom constructor parameters
  const myCustomContract = await ethers.deployContract('MyCustomContract', [
    // your custom constructor parameters
  ]);

  // Wait for the transaction to be included in a block
  await myCustomContract.waitForDeployment();
  const contractAddress = await myCustomContract.getAddress();
  console.log('Contract deployed at: ', contractAddress);
}

deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

  </TabItem>

</Tabs>

You can then continue to run the deployment script:

```bash
npx hardhat --network luksoTestnet run scripts/deployMyCustomToken.ts
```

:::success Contract Examples

You can find ready-to-go example contracts within the [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository.

:::

:::warning

Please remember to always be careful when deploying smart contracts. Do not forget to audit your code before deploying your smart contracts in production.

:::

## Verify smart contracts

To verify a deployed contract, you can use the [Blockscout API](https://explorer.execution.testnet.lukso.network/api-docs) properties set up within the `hardhat.config.ts`. You have to pass a file with all the constructor arguments that you've defined when deploying the smart contract, as well as the address of the deployed smart contract. The parameters and the compiled contract code are then used to verify the payload of the deployed contract on the address.

Create a new file that houses all the constructor parameters upon deployment:

```js title="myContractParameters.ts"
module.exports = [
  // your custom constructor parameters ...
];
```

You can run the verification script as on the network using the following command:

```bash
npx hardhat verify <MyContractAddress> --constructor-args ./verify/myContractParameters.ts --network luksoTestnet
```
