---
sidebar_label: '👋🏻 Getting Started'
sidebar_position: 1
description: Create a Hardhat project and start building your smart contracts for LUKSO.
---

# Getting started building contracts

The LUKSO ecosystem offers smart contract developers a lot of [new standards](../../standards/introduction.md) and [tools](../../tools/getting-started.md) to build **powerful, modular, and standardized** blockchain applications. As LUKSO is an EVM-based Blockchain, all tools and tutorials for Ethereum also work well for LUKSO.

The following tutorial will teach you how use LSP:

- set up a [HardHat](https://hardhat.org/) project using TypeScript
- configure the contract settings, [networks](../../networks/testnet/parameters) and Blockscout API
- utilize LSP smart contract presets using the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts)
- compile and deploy LSP-based smart contracts
- verify smart contracts on [Blockscout](https://explorer.execution.testnet.lukso.network/)

If you need more low level information about our contracts, you can check the dedicated [contracts](../../contracts/introduction.md) section.

### Playground Repository

Want to dive into the code directly? The [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository has a full HardHat setup, including ready-to-go network configurations, sample contracts, and scripts to deploy and verify LSP-based contracts on LUKSO networks using both EOAs or Universal Profiles.

<div style={{textAlign: 'center'}}>

<img
src="/img/guides/playground_hardhat.png"
alt="LUKSO Playground HardHat"
/>

</div>

## Set up a Hardhat project

First, create a new folder for the HardHat repository:

```bash
mkdir lukso-hardhat-repo
cd lukso-hardhat-repo
```

Afterward, [initialize the Hardhat project](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start) using TypeScript:

```bash
npx hardhat init
# Proceed installing the HardHat library
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

You can then go ahead to create a `.env` file within the root folder of the HardHat repository and the following contents:

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
      url: 'https://rpc.testnet.lukso.gateway.fm',
      chainId: 4201,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    luksoMainnet: {
      url: 'https://rpc.lukso.gateway.fm',
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

## Utilize LSP smart contract presets

To utilize LSP smart contracts within your HardHat project, you can install the latest version of the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package like the following:

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

```js title="deployMyCustomToken.ts"
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function deployContract() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const myCustomToken = await ethers.deployContract('MyCustomToken', [
    // your custom constructor parameters
  ]);

  console.log('Deployed contract address:', await myCustomToken.getAddress());
}

deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

You can then continue to run the deployment script:

```bash
npx hardhat --network luksoTestnet run scripts/deployMyCustomToken.ts
```

:::warning

Please remember to always be careful when deploying smart contracts. Do not forget to process a security audit before deploying your smart contracts on production.

:::

## Verify smart contracts

To verify a deployed contract, you can use the blockscout API properties set up within the `hardhat.config.ts`. You have to pass a file with all the constructor arguments that you've defined when deploying the smart contract, as well as the address of the deployed smart contract. The parameters and the compiled contract code are then used to verify the payload of the deployed contract on the address.

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
