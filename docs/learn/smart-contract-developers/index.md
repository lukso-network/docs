# Getting started

Smart contract developer, welcome to the LUKSO documentation! The LUKSO ecosystem offers you a lot of [new standards](../../standards/introduction.md) and tools to build more powerful blockchain applications which are - _very important_ - standardised.

As LUKSO is an EVM-based Blockchain, all tools and tutorials for Ethereum also work well for LUKSO. The following tutorial will teach you how to:

- set up a [Hardhat](https://hardhat.org/) installation (using TypeScript)
- install the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package (using version 0.11.0-rc.1)
- create a basic [`LSP7DigitalAsset` (token)](../../standards/tokens/LSP7-Digital-Asset.md) contract
- deploy it on [LUKSO Testnet](../../networks/testnet/parameters).

If you need more low level information about our contracts, you can check the dedicated [contracts](../../contracts/introduction.md) section.

Happy coding 🧙

## Create Hardhat project

The first thing to do is to [create a new Hardhat project](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start) that will use TypeScript:

```bash title="Setup new hardhat project"
mkdir lukso-app
cd lukso-app
npx hardhat
# select 'Create a TypeScript project' and
# use the default value for the rest of the setup
```

Once finished, you have a working Hardhat setup!

## Install packages &amp; setup tools

To work in the best condition possible, we will install libraries that includes tools, helpers and the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package.

```bash
npm i -D dotenv
npm i -s @lukso/lsp-smart-contracts@0.11.0-rc.1
```

Update your `package.json` with the following:

```json title="package.json"
"scripts": {
  "build": "hardhat compile --force --show-stack-traces"
},
```

## Create a .env file

Create a new file at the root of your project called `.env` with the following content:

:::warning

The `.env` file contains sensitive values such as PRIVATE_KEY. Do not commit it to your source code repository!

:::

:::note

We will populate the values of the `.env` file later.

:::

```text title=".env"
PRIVATE_KEY=0x....
UP_ADDR=0x...
```

We now have a base Hardhat setup that we can use to develop and deploy our smart contracts.
