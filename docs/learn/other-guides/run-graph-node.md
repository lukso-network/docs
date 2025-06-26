---
sidebar_label: '🌐 Setup a Graph Node on LUKSO'
description: 'A step-by-step guide to setting up a Graph Node on LUKSO using Docker.'
sidebar_position: 12
---

# Run Graph Node on LUKSO

There are two ways to launch a [Graph Node](https://thegraph.com/): you can use Docker to run related images, or you can compile the [Graph Node source code](https://github.com/graphprotocol/graph-node). The steps described in this document will only be run through docker.

> The instructions provided have been verified on MacOS systems. Adjustments may be needed for other operating systems.
> The content of this guide is informational, based on third-party inputs. It's important to verify any information with the official Graph repositories (https://github.com/graphprotocol/graph-node/tree/master/docker).

## Prerequisites

Before diving into setting up a Graph Node, you need to have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [JQ](https://jqlang.github.io/jq/download/)

In this guide, you will learn how to run a Graph node against LUKSO. This guide can also be adapted for LUKSO Testnet.

## Prerequisites

The first step is to clone the [Graph Node repository](https://github.com/graphprotocol/graph-node/):

```bash
git clone https://github.com/graphprotocol/graph-node/ \
&& cd graph-node/docker
```

Next, execute the `setup.sh` file. This will pull all the necessary Docker images and write the necessary information in the `docker-compose.yml` file. Make sure to have docker running.

```bash
./setup.sh
```

Once everything is set up, you need to modify the "Ethereum environment" inside the `docker-compose.yml` file, so that it points to the endpoint of the node you are running this Graph Node against. Note that the `setup.sh` file detects the `Host IP` and writes its value, so you'll need to modify it accordingly. Check [Networks](../../networks/mainnet/parameters.md) section for different options of rpc providers.

```title="LUKSO"
ethereum: 'lukso-mainnet:https://42.rpc.thirdweb.com'
```

```title="LUKSO Testnet"
ethereum: 'lukso-testnet:https://rpc.testnet.lukso.network'
```

The entire `docker-compose.yml` file should look something similar to:

```docker
version: '3'
services:
  graph-node:
    image: graphprotocol/graph-node
    ports:
      - '8000:8000'
      - '8001:8001'
      - '8020:8020'
      - '8030:8030'
      - '8040:8040'
    depends_on:
      - ipfs
      - postgres
    extra_hosts:
      - host.docker.internal:host-gateway
    environment:
      postgres_host: postgres
      postgres_user: graph-node
      postgres_pass: let-me-in
      postgres_db: graph-node
      ipfs: 'ipfs:5001'
      ethereum: 'lukso-testnet:https://rpc.testnet.lukso.network'
      GRAPH_LOG: info
  ipfs:
    image: ipfs/kubo:v0.17.0
    ports:
      - '5001:5001'
    volumes:
      - ./data/ipfs:/data/ipfs
  postgres:
    image: postgres:14
    ports:
      - 127.0.0.1:5432:5432
    command:
      [
        "postgres",
        "-cshared_preload_libraries=pg_stat_statements",
        "-cmax_connections=200"
      ]
    environment:
      POSTGRES_USER: graph-node
      POSTGRES_PASSWORD: let-me-in
      POSTGRES_DB: graph-node
      # FIXME: remove this env. var. which we shouldn't need. Introduced by
      # <https://github.com/graphprotocol/graph-node/pull/3511>, maybe as a
      # workaround for https://github.com/docker/for-mac/issues/6270?
      PGDATA: "/var/lib/postgresql/data"
      POSTGRES_INITDB_ARGS: "-E UTF8 --locale=C"
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
```

Lastly, to run the Graph Node, just run the following command:

```bash
docker-compose up
```

You should see logs related to the Graph Node syncing with the latest available block in the network.
