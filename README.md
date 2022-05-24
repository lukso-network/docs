# LUKSO Public Documentation Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.
It is the official Technical Documentation Website of LUKSO.

Live URL: <https://docs.lukso.tech/>

## External Sources

When the webpage is built, it pulls the documentation of the following other repositories, that
show up within the Tools section:

- [lsp-factory.js](https://github.com/lukso-network/tools-lsp-factory/tree/develop/docs)
- [erc725.js](https://github.com/ERC725Alliance/erc725.js/tree/develop/docs)

> If you want to improve our documentation, make shure to open an PR on the right repository, otherwise, changes might get overwritten.

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

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### How to generate documentation for erc725.js

1. Run `docs:tools:sync` to pull documentation from tool repositories ([`erc725.js`](https://github.com/ERC725Alliance/erc725.js)).

```sh
npm run docs:tools:sync
```

2. Commit and push generated changes
