---
sidebar_label: Hardhat basic setup
sidebar_position: 1
---

# Setup your Hardhat project

In this article will guide you through the process of:

- setting up an [Hardhat](https://hardhat.org/) installation (using TypeScript)
- adding the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package (using version 0.11.0-rc.1)
- creating a basic LSP7 contract
- and deploying it on [LUKSO Testnet](../../networks/testnet/parameters).

## Create Hardhat project

The first thing to do is to create a new Hardhat project that will use TypeScript:

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

### Install dependencies

```bash
npm i -D dotenv
npm i -s @lukso/lsp-smart-contracts@0.11.0-rc.1
```

### Add a build script in your package.json

Update your `package.json` with the following:

```json title="package.json"
"scripts": {
  "build": "hardhat compile --force --show-stack-traces"
},
```

### Create a .env file

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
