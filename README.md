# LUKSO Public Documentation Website

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.
It is the official Technical Documentation Website of LUKSO.

Live URL: <https://docs.lukso.tech/>

## Tool documentations

**When the docs pages are built, documentation of the following repositories will be pulled in from the respective repos and updated automatically:**

- [lsp-factory.js](https://github.com/lukso-network/tools-lsp-factory/tree/develop/docs)
- [erc725.js](https://github.com/ERC725Alliance/erc725.js/tree/develop/docs)

**NOTE:**
Make sure to edit these tools in their respective repos, otherwise changes in the docs here will be overwritten.

## Installation

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn build
```

## Update Libraries

```console
yarn upgrade-interactive
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### How to generate documentation for erc725.js

1. Run `docs:tools:sync` to pull documentation from tool repositories ([`erc725.js`](https://github.com/ERC725Alliance/erc725.js)).

```sh
npm run docs:tools:sync
```

2. Commit and push generated changes

### How to generate documentation for `@lukso/lsp-smart-contracts`

The contract ABI docs located under the `docs/contracts/contracts` folder are originally stored and updated in the [`lsp-smart-contracts` Github repository](https://github.com/lukso-network/lsp-smart-contracts), under the `docs/` folder.

The CI in [`contracts-sync.yml`](.github/workflows/contracts-sync.yml) runs every day at midnight to pull automatically any new changes from these files in the repo (from the `main` branch).

Any new release of the package will open a PR automatically in the repo to fetch the new docs changes.

You can also fetch the new contract ABI docs manually as follow:

1. Run `docs:contracts:sync` to pull documentation from the ([`lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts)).

```sh
npm run docs:contracts:sync
```

2. Commit and push generated changes
