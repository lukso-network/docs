---
sidebar_label: Hardhat basic setup
sidebar_position: 1
---

# Setup your Hardhat project

In this article, we will guide you through the process of seting up an Hardhat project (using TypeScript), adding the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package (using version 0.11.0-rc.1), creating a basic LSP7 contract, and deploying it on [LUKSO Testnet](http://docs.lukso.tech/networks/testnet/parameters).

## Create Hardhat project

The first thing to do is to create a new Hardhat project that will use TypeScript:

```bash title="Setup new hardhat project"
mkdir lukso-app
cd lukso-app
npx hardhat # select 'Create a TypeScript project' and use the default value for the rest of the setup
```

Once finished, you have a working hardhat setup!

## Install packages & setup tools

To work in the best condition possible, we will install libraries that includes tools, helpers and the [`@lukso/lsp-smart-contracts`](https://www.npmjs.com/package/@lukso/lsp-smart-contracts) package.

### Install dependencies

```js title="Install dependencies"
npm i -D dotenv prettier
npm i -s @lukso/lsp-smart-contracts@0.11.0-rc.1
```

### Add a build script in your package.json

Update your package.json with the following:

```json title="Add a build script"
"scripts": {
  "build": "hardhat compile --force --show-stack-traces"
},
```

### Create the prettier config

Create a new file at the root of your project called `.prettierrc` with the following content:

```json title="Create the prettier config"
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "printWidth": 110
}
```

### Create a .env file

Create a new file at the root of your project called `.env` with the following content:

:::warning

The `.env` file contains sensitive values, such as API_KEY or PRIVATE_KEY. Do not commit it to your source code repository!!

:::

:::note

We will populate the values of the `.env` file later

:::

```text title="Create the .env file"
PRIVATE_KEY=
UP_ADDR=
```

We now have a base hardhat setup that we can use to develop and deploy our smart contracts!
