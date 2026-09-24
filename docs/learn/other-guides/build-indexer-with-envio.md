---
sidebar_label: '🔎 Build an indexer with Envio'
description: 'A step-by-step guide to building, running and querying your own LUKSO indexer with Envio HyperIndex.'
sidebar_position: 13
---

# Build an indexer with Envio

The [LUKSO Indexer API](../../tools/apis/indexer-api.md) is powered by [Envio](https://envio.dev/) and covers Universal Profiles, assets and their metadata. If your dApp needs its own data model or custom logic, you can build your own indexer with [Envio HyperIndex](https://docs.envio.dev/docs/HyperIndex/overview) and run it on your machine.

In this guide, you will index [Burnt Pix](https://explorer.execution.mainnet.lukso.network/token/0x3983151E0442906000DAb83c8b1cF3f2D2535F82), an [LSP8](../../standards/tokens/LSP8-Identifiable-Digital-Asset.md) NFT collection on LUKSO mainnet (chain ID `42`), track the current owner of every token and query the results with GraphQL. The same steps work for any verified contract on LUKSO, such as an LSP7 token or another LSP8 collection.

> The instructions provided have been verified on MacOS systems. Adjustments may be needed for other operating systems.

## Prerequisites

Before you start, install the following tools.

- [Node.js](https://nodejs.org/en/download) version 22 or newer
- [pnpm](https://pnpm.io/installation)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/), which runs the local database and GraphQL server

You also need an Envio API token to fetch LUKSO data through HyperSync. Create one at [envio.dev/app/api-tokens](https://envio.dev/app/api-tokens).

## Create the indexer

Set your API token as an environment variable.

```bash
export ENVIO_API_TOKEN=<your-api-token>
```

Next, run `envio init` with contract import. It fetches the verified ABI of the contract from the LUKSO block explorer and generates a ready-to-run indexer for all of its events.

```bash
pnpx envio init contract-import explorer \
  --name burnt-pix-indexer \
  --directory burnt-pix-indexer \
  --blockchain lukso \
  --contract-address 0x3983151E0442906000DAb83c8b1cF3f2D2535F82 \
  --single-contract \
  --all-events \
  --language typescript
```

Once the dependencies are installed, the CLI prints the next steps.

```text
Your indexer is ready! Pick how you'd like to run it:

  1. cd burnt-pix-indexer && pnpm test    # run the tests (recommended for AI)
  2. cd burnt-pix-indexer && pnpm dev     # run locally
  3. cd burnt-pix-indexer && pnpm start   # run in production
```

Move into the project folder. All the following commands run from there.

```bash
cd burnt-pix-indexer
```

:::tip Interactive mode

If you leave out the flags and run `pnpx envio init`, the CLI asks for each option step by step.

:::

## Explore the generated files

The project contains three files that define your indexer.

### `config.yaml`

The configuration lists the chain, the contract address and the events to index. Chain ID `42` is LUKSO mainnet.

<!-- prettier-ignore-start -->

```yaml title="config.yaml"
# yaml-language-server: $schema=./node_modules/envio/evm.schema.json
name: burnt-pix-indexer
disable_default_cross_chain: true
chains:
- id: 42
  start_block: 0
  contracts:
  - name: Registry
    address:
    - "0x3983151E0442906000DAb83c8b1cF3f2D2535F82"
    events:
    - event: DataChanged(bytes32 indexed dataKey, bytes dataValue)
    - event: OperatorAuthorizationChanged(address indexed operator, address indexed tokenOwner, bytes32 indexed tokenId, bytes operatorNotificationData)
    - event: OperatorRevoked(address indexed operator, address indexed tokenOwner, bytes32 indexed tokenId, bool notified, bytes operatorNotificationData)
    - event: OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
    - event: TokenIdDataChanged(bytes32 indexed tokenId, bytes32 indexed dataKey, bytes dataValue)
    - event: Transfer(address operator, address indexed from, address indexed to, bytes32 indexed tokenId, bool force, bytes data)
```

<!-- prettier-ignore-end -->

The contract is named `Registry` because that is the contract name in its verified source code. The events come from its verified ABI and include the LSP8 `Transfer` and `TokenIdDataChanged` events. The [event reference](../../standards/event-reference.md) describes the events of every LSP standard.

### `schema.graphql`

The schema defines the entities stored in the database. Contract import creates one entity per event, such as `Registry_Transfer`.

```graphql title="schema.graphql"
type Registry_Transfer {
  id: ID!
  operator: String!
  from: String!
  to: String!
  tokenId: String!
  force: Boolean!
  data: String!
}
```

### `src/handlers/Registry.ts`

The handlers run for every event and save the entities. The generated `Transfer` handler stores each transfer.

<!-- prettier-ignore-start -->

```ts title="src/handlers/Registry.ts"
indexer.onEvent({ contract: "Registry", event: "Transfer" }, async ({ event, context }) => {
  const entity: Registry_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    operator: event.params.operator,
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.tokenId,
    force: event.params.force,
    data: event.params.data,
  };

  context.Registry_Transfer.set(entity);
});
```

<!-- prettier-ignore-end -->

## Track the owner of each token

The generated indexer stores raw events. To answer questions like "who owns this token right now?", add your own entity.

Add a `Token` entity at the end of `schema.graphql`.

```graphql title="schema.graphql"
type Token {
  id: ID!
  owner: String!
  transferCount: Int!
}
```

In `src/handlers/Registry.ts`, add `Token` to the type imports.

<!-- prettier-ignore-start -->

```ts title="src/handlers/Registry.ts"
import type {
  Registry_DataChanged,
  Registry_OperatorAuthorizationChanged,
  Registry_OperatorRevoked,
  Registry_OwnershipTransferred,
  Registry_TokenIdDataChanged,
  Registry_Transfer,
  Token,
} from "envio";
```

<!-- prettier-ignore-end -->

Then update the `Transfer` handler so it also creates or updates the `Token` entity. The token ID is used as the entity ID, and the receiver of the latest transfer becomes the owner.

<!-- prettier-ignore-start -->

```ts title="src/handlers/Registry.ts"
indexer.onEvent({ contract: "Registry", event: "Transfer" }, async ({ event, context }) => {
  const entity: Registry_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    operator: event.params.operator,
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.tokenId,
    force: event.params.force,
    data: event.params.data,
  };

  context.Registry_Transfer.set(entity);

  // highlight-start
  const token = await context.Token.get(event.params.tokenId);
  const updatedToken: Token = {
    id: event.params.tokenId,
    owner: event.params.to,
    transferCount: (token?.transferCount ?? 0) + 1,
  };

  context.Token.set(updatedToken);
  // highlight-end
});
```

<!-- prettier-ignore-end -->

Regenerate the types and run the tests that came with the project.

```bash
pnpm codegen
pnpm test
```

```text
 Test Files  1 passed (1)
      Tests  2 passed (2)
```

## Run the indexer

Make sure Docker is running, then start the indexer.

```bash
pnpm dev
```

This starts a Postgres database and a Hasura GraphQL server in Docker and begins indexing LUKSO mainnet. The logs show when the indexer has caught up with the chain.

```text
[17:16:31.975] INFO: The indexer storage is ready. Starting indexing!
[17:16:33.282] INFO: All events have been fetched
    chainId: 42
[17:16:33.686] INFO: The indexer is ready. Switching to realtime indexing.
```

After that, the indexer keeps running and processes new blocks as they are produced.

## Query your data

The GraphQL endpoint is available at `http://localhost:8080/v1/graphql`. You can also open the Hasura console at [http://localhost:8080](http://localhost:8080) in your browser to explore the schema. The console asks for an admin secret, which is `testing` for local development.

Fetch the first three Burnt Pix transfers. The responses in this guide are formatted for readability.

```bash
curl -s -X POST http://localhost:8080/v1/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ Registry_Transfer(limit: 3, order_by: {id: asc}) { id from to tokenId } }"}'
```

```json
{
  "data": {
    "Registry_Transfer": [
      {
        "id": "42_1645931_1",
        "from": "0x0000000000000000000000000000000000000000",
        "to": "0x7beE28FE575331Ef370233e0ab575A70868c2D18",
        "tokenId": "0x0000000000000000000000004c93e7c39ae5c55da3791276b236ef6c98dfc342"
      },
      {
        "id": "42_1645946_0",
        "from": "0x0000000000000000000000000000000000000000",
        "to": "0x7beE28FE575331Ef370233e0ab575A70868c2D18",
        "tokenId": "0x00000000000000000000000061a42708121a9730b20ef0d1eb4e48c1d5d4da3a"
      },
      {
        "id": "42_1645953_0",
        "from": "0x0000000000000000000000000000000000000000",
        "to": "0x7beE28FE575331Ef370233e0ab575A70868c2D18",
        "tokenId": "0x00000000000000000000000054bb1fbb31ae3f8c71d35c00a8af0af8e2f1d4bd"
      }
    ]
  }
}
```

The entity ID combines the chain ID, block number and log index, so `42_1645931_1` is the first mint of the collection in block `1645931`. A `from` address of `0x0000000000000000000000000000000000000000` means the token was minted.

Fetch the tokens that changed hands most often, with their current owner.

```bash
curl -s -X POST http://localhost:8080/v1/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ Token(limit: 3, order_by: [{transferCount: desc}, {id: asc}]) { id owner transferCount } }"}'
```

```json
{
  "data": {
    "Token": [
      {
        "id": "0x000000000000000000000000fbf3b0d870847ac9dcfcda1160fd8c0aba5239a5",
        "owner": "0xca98D2e6F514De3812aA9Aaf5AaBD67Fdc9C57BD",
        "transferCount": 18
      },
      {
        "id": "0x0000000000000000000000000688a8ff5fd651d68e1e021c2d9c892b3c1bea07",
        "owner": "0xf3696Fe16f3d7c1932CEAf1D3c33A32aEf3037B8",
        "transferCount": 10
      },
      {
        "id": "0x0000000000000000000000003324d665b4f673a7dddd63eef3403cddf8bc28da",
        "owner": "0xa5118f0524c14EF9BFB7CeEC73D5CBDC2838DFe0",
        "transferCount": 10
      }
    ]
  }
}
```

Your results can differ from the ones above as new transfers happen on LUKSO.

## Stop the indexer

Press `Ctrl+C` to stop the indexer. To also remove the Docker containers and delete the local database, run `envio stop`.

```bash
pnpm envio stop
```

## Next steps

- Add more logic to your handlers, such as reading `TokenIdDataChanged` events to track token metadata. See the [event handlers](https://docs.envio.dev/docs/HyperIndex/event-handlers) and [schema](https://docs.envio.dev/docs/HyperIndex/schema) documentation.
- Index more contracts or events by editing `config.yaml`. See the [configuration file](https://docs.envio.dev/docs/HyperIndex/configuration-file) documentation.
- Write tests for your handlers. See the [testing](https://docs.envio.dev/docs/HyperIndex/testing) documentation.
- Deploy your indexer to [Envio Cloud](https://docs.envio.dev/docs/HyperIndex/hosted-service) to get a hosted GraphQL endpoint.
