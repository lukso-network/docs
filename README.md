# LUKSO Public Documentation Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

Live URL: <https://docs.lukso.tech/>

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
