# LUKSO Public Documentation Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

Live URL: <https://docs.lukso.tech/>

# How to generate documentation for erc725.js

1. Run typedoc command in erc725.js repo

```sh
npx typedoc --out docs src/index.ts --includeVersion --hideInPageTOC true --sort visibility
```

2. Replace content of tools/erc725js/technical-reference/ with content generated in docs/
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

