---
sidebar_label: 'Node Setup'
sidebar_position: 4
description: 'LUKSO node setup and supported clients: Geth, Erigon, Nethermind, Besu, Prysm, Lighthouse, Teku.'
---

# Node Setup

## Which client should I run to power the LUKSO network?

Most validator nodes on the LUKSO mainnet are running with Geth and Prysm. However, node operators are responsible for **ensuring they split their client usage evenly** to the extent of officially supported clients and validators. Therefore, we suggest running Erigon and Lighthouse until they are evenly split. We will prepare a page to check client diversity and distribution during the migration process. You can read more about why client diversity is so important in the [Blockchain Architecture](./blockchain-architecture.md) section of the FAQ.

## How do the supported clients differ?

Currently, LUKSO officially supports Geth, Erigon, Lighthouse, and Prysm. All clients are known to be highly secure and reliable!

- **[Geth](https://github.com/ethereum/go-ethereum)** is the most popular and widely used Ethereum execution client. It's written in the Go programming language. Geth can be used for various tasks, including creating smart contracts, transferring tokens, mining ether, and exploring block history. It's developed and maintained by the Ethereum Foundation.

- **[Erigon](https://github.com/ledgerwatch/erigon)** is an Ethereum execution client that aims to offer a more efficient and faster alternative to Geth. It's written in Go and includes several optimizations to reduce the amount of data stored and improve processing speed. However, these optimizations can make Erigon more complex to maintain and update.

- **[Nethermind](https://github.com/NethermindEth/nethermind)** is an Ethereum execution client built on .NET framework and developed by Nethermind. Its plugin system makes it especially easy to configure and use it. Combining this with a very stable runtime, this makes it a great client to use on the network.

- **[Besu](https://github.com/hyperledger/besu)** is an Ethereum execution client written in Java and developed by Hyperledger. It supports both public and private networks, offering features like Proof of Authority and Proof of Work consensus, advanced privacy options, and robust monitoring tools.

- **[Prysm](https://github.com/prysmaticlabs/prysm)** is an Ethereum consensus client written in Go and developed by Prysmatic Labs. Validators widely use it. Performance-wise, Prysm leverages optimized processes and data structures, offering a smooth experience for validators. The client had rigorous testing and auditing processes to ensure the client was secure against potential threats. It also comes with an excellent user-friendly terminal interface.

- **[Lighthouse](https://github.com/sigp/lighthouse)** is an Ethereum consensus client written in Rust and developed by Sigma Prime. From a security perspective, Lighthouse leverages Rust's safety features and undergoes regular security audits to protect against potential vulnerabilities. Regarding efficiency, Lighthouse is designed to perform well even on low-spec hardware, making it accessible to a wide range of users with different skill levels.

- **[Teku](https://github.com/Consensys/teku)** is an Ethereum consensus client written in Java and developed by Consensys. It provides users with a similar experience of running a node as with using other clients, but with additional features, such as external key management (using tools like [Web3signer](https://github.com/Consensys/web3signer)).

## Should I run an archive or a full node?

A full node downloads the entire blockchain and validates all blocks and transactions against the network's consensus rules. It stores the **current state of the network, including account balances, contracts, storage, and other information**. However, it does not keep all historical states. If you need to check the balance of an account at a specific block height in the past, a full node cannot provide this information directly.

An archive node is a particular type of full node. It also downloads the entire blockchain and validates all blocks and transactions like a full node. In addition to the current state of the network, it **also stores all historical states since the genesis block**. Keeping the entire historical state makes an archive node much more storage extensive than a full node, but it allows you to query any historical state directly on the node.

If you are running a validator, it's the default and recommended option to go with a full node. Archive nodes should only be run by professional setups or data centers with lots of storage.

## Can the LUKSO CLI run as an archive node?

By default, the LUKSO CLI is running as a full node. However, you can modify the configuration files and pass any flags to the clients by adding the `--[client-name]-[parameter]` flags to the start command. For example:

```sh
--geth-http.addr=localhost # same as running: geth --http.addr=localhost
--erigon-ws.port=8080 # same as running: erigon --ws.port=8080
--lighthouse-target-peers=70 # same as running: lighthouse --target-peers=70
```

## How much storage does my node need?

The needed storage can be broken down into yearly growth based on other EVM networks and depends on whether you are running an archive node or a full node. We can make a rough estimate by analyzing QuickNode, Ledgerwatch, and YCharts. By default, the LUKSO CLI should store about `120 GB` per year using Geth and about `60 GB` per year using Erigon. If you pass down archive node flags, the storage will increase to about `1.8 TB` per year on Geth and about `320 GB` per year using Erigon.

## Will there be a GUI for running a node?

The [LUKSO Launchpad](https://deposit.mainnet.lukso.network/) will streamline the process of generating deposit data and transferring validator funds. However, the node setup and maintenance will require using the terminal for both [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) and [Docker](https://github.com/lukso-network/network-docker-containers).

## How can I check if my node is working fine?

If you are using the LUKSO CLI, you can use the **lukso status command** to see if every one of the clients is running. You can also run the **lukso logs** and **lukso status peers** commands to see the outputs of the specific clients or their number of peers. After syncing the node, you should see that the execution client's chain head is updated regularly within the execution log files.

If you are running Docker Images, you can run **docker ps** to check if all containers are running smoothly. The output should state when the blockchain client containers are up and running.

If you want to check if the validator is working properly, please have a look at the [validator section](./validators.md) of this FAQ.

## Is the LUKSO CLI automatically restarting?

The LUKSO CLI only acts as a management tool for the underlying blockchain clients and **does not have built-in automation** with version 0.8.0. However, if you want to use the LUKSO CLI with automation, you must configure a system service script.

You can further read about setting up automation within the [service guide](https://docs.luksoverse.io/docs/mainnet/complete-node-guide/blockchain-clients/automation) by the community. If you are looking for some advanced setups, we recommend looking into our [Docker Network Setups](https://docs.luksoverse.io/docs/mainnet/complete-node-guide/blockchain-clients/automation).

## Is it possible to run multiple nodes from the same home network?

Yes, running multiple nodes from the same home network is possible. What matters is the public IP of the node devices, which will be different. However, when you run multiple nodes in one network, you must modify and forward the ports they use, so they do not communicate over the same channel and block each other.

## Is there a way to save time on syncing during the node setup?

Yes. You can use the LUKSO checkpoint synchronization service to **dramatically speed up the process of synchronizing** the consensus client. If enabled, your node will begin syncing from a recently finalized consensus checkpoint instead of genesis. It will then download the rest of the blockchain data while your consensus runs. The shortcut is ideal for fresh installations, validator migration, or recovery.

After the synchronization is finalized, you will have **equal blockchain data**. If you are using the LUKSO CLI, you can use the `--checkpoint-sync` flag on every startup. However, it shows the most significant effect when synchronizing from scratch or after an extended downtime. The checkpoint URLs can also be [manually added](https://github.com/lukso-network/tools-lukso-cli/blob/main/README.md#using-checkpoint-syncing) to the clients.

## Does the performance of the node machine influence the rewards?

The node's performance does **not influence rewards** if the recommended hardware requirements are met. However, if your system is below the recommendations or runs additional software in parallel, your node may not be able to process incoming data correctly. The limitation may result in potential crashes or attestation delays. It is always recommended to exceed the minimum requirements to run additional monitoring and security tools.

## What are the minimum requirements to run a node?

Using a separate machine or server specifically for the node service is recommended. The minimum hardware can be found within the [Node Setup](../../networks/mainnet/running-a-node.md). The platform and processor support will depend on your software to run and monitor the blockchain clients.

## Which clients are better suited for nodes with lots of validators?

All consensus clients are suited for large validator numbers. The validator keys are affecting the overall node performance in a minor way. If you still want to optimize, Lighthouse has additional efficiency for nodes with lower hardware specs.

## What is the maximum validator number that should be run on one node?

We officially tested running up to 1000 validator keys on one node. However, we recommend not running vast amounts of validator keys on one single node in case of an outage. The more validators on one node when a network issue or outage happens, the higher the total balance loss.

## If I run multiple nodes, is it recommended to run different clients?

Yes, it is recommended to run various clients to support client diversity. Advanced users, or people with lots of validator keys, should run software clients of the minority to stabilize the networks and reduce the proneness to potential errors. Client diversity will ensure the network participation does not shrink too much in case there are errors with specific clients

## Which operating system should I use to run the LUKSO CLI?

We recommend running the node on server versions of Ubuntu or Debian. Ubuntu and Debian are built on similar foundations, but their philosophies and approaches can lead to different experiences when setting up and running a node. If you're a beginner or value ease of use and good support, Ubuntu might be the best choice. If you're an advanced user who values stability, security, and lower resource usage, Debian might be the better fit.

Either distributions will be **capable of running a node successfully.** Your personal preferences, familiarity with the distribution, and specific requirements will be the decisive factors. Please note to always run on the latest operating system versions to ensure the best security.

## What are the supported platforms for the LUKSO CLI?

The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) is officially supported on Mac, Ubuntu, and Debian for both `x86` & `x86_64` Intel or AMD processors, and `ARM` & `aarch64` single-board computers such as the M1 or Raspberry. The experience might differ with other setups or versions of these operating systems.

## What is a slasher?

A slasher actively **watches for offenses or misbehavior** on the network and broadcasts them. This might be due to running the same validators or multiple machines, faking proposals, etc.

Slasher is the name of the software that can detect slashable events from validators and report them to the protocol. You can think of a slasher as the network's police. The slasher records the attesting and proposing history for every validator on the network and then cross-references this history with what has been broadcasted to **find slashable messages** such as double blocks or surrounding votes. Running a slasher is optional.

In theory, all the network needs is one honest, properly functioning slasher to monitor the network because any slashings found are propagated to the entire network for it to be put into a block as soon as possible. Due to uptime, **multiple backups in different areas** of the network should exist. Network security is generally beneficial if a handful of nodes independently check for slashing conditions.

## How to enable the slasher within the LUKSO CLI?

The LUKSO CLI automatically runs the slasher software for all validators. To disable it, pass the `--no-slasher` flag at the end of the start command. If you are operating a regular node, pass the `--prysm-slasher` or `--lighthouse-slasher` flags to enable it based on your consensus client.
