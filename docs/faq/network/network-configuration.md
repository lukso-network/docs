---
sidebar_label: 'Network Configuration'
sidebar_position: 2
---

# Network Configuration

## Will lower latency positively influence my rewards?

There are no extra rewards for being very quick. When the appointed time for a validator comes to propose a block, the validator has 12 seconds to vote. The validator will only miss the slot if the node is not synced up or offline during this time.

## Which ports must be open on a node machine?

The following ports will need to be opened to run the blockchain node correctly:

| CLIENT     | DESCRIPTION                               | PORT  | TCP | UDP |
| ---------- | ----------------------------------------- | ----- | --- | --- |
| GETH       | Execution Chain Data Channel              | 30303 | X   |     |
| GETH       | Execution Chain Discovery                 | 30303 |     | X   |
| ERIGON     | Execution Chain Data Channel              | 30303 | X   |     |
| ERIGON     | Execution Chain Discovery                 | 30303 |     | X   |
| LIGHTHOUSE | Beacon Communication and Data             | 9000  | X   | X   |
| PRYSM      | Beacon Gossip, Requests, and Responses    | 13000 | X   |     |
| PRYSM      | Beacon Discovery, Requests, Data Exchange | 12000 |     | X   |

You can find more information about firewall and port settings within the specifications of the supported blockchain clients:

- [Lighthouse Port Specification](https://lighthouse-book.sigmaprime.io/faq.html?highlight=9000#do-i-need-to-set-up-any-port-mappings)
- [Prysm Port Specification](https://docs.prylabs.network/docs/prysm-usage/p2p-host-ip#configure-your-firewall)
- [Geth Port Specification](https://github.com/ethereum/go-ethereum#configuration)
- [Erigon Port Specification](https://github.com/ledgerwatch/erigon#default-ports-and-firewalls)

## Do the LUKSO mainnet and testnet use different ports?

Mainnet and Testnet will run on the same client ports. If a validator wants to run two clients on the same machine, you must configure custom ports for the second machine.

## Do I need a stable internet connection to run a validator?

Yes. Running an EVM Proof of Stake validator node at home requires a stable and reliable internet connection with sufficient network speeds and low latency. A stable internet connection is crucial to ensure optimal performance and maintain the validator's active status within the network. Here's why speeds and latency are essential:

- **Blockchain Synchronization**: A fast and stable internet connection is required to synchronize the blockchain data with the Ethereum network efficiently. Slow download speeds can lead to longer sync times, which may prevent your validator from actively participating in the consensus process, causing missed opportunities for rewards.

- **Attestations and Proposals**: As a validator, your node creates attestations and proposes blocks. A low-latency connection ensures that your attestations and proposals reach the network promptly, increasing the likelihood of inclusion in the final chain and earning rewards.

- **Missed Events and Penalties**: In Ethereum PoS, validators can be penalized for failing to participate in the consensus process. If your network connection is slow or unstable, it could cause missed attestations or proposals, resulting in penalties and reduced rewards.
  Network Resilience: A reliable internet connection with low latency helps your validator node stay connected and recover quickly from temporary network outages. Strength reduces the risk of being isolated from the rest of the network and missing important consensus events.

## What are the minimal network speeds to run a node?

Sufficient network speeds and low latency are essential for running an Ethereum PoS validator node at home. It ensures optimal performance, maximizes reward potential, and minimizes the risk of penalties or missed attestations.

A minimum download speed of `10-15 Mbps` is recommended, with higher rates being more desirable for faster blockchain synchronization and data transfer. Upload speeds should be at least `2-4 Mbps` to ensure your attestations and proposals can be sent to the network quickly. Regarding latency, a connection below `30-100 ms` is ideal for guaranteeing timely participation in the consensus process and reducing the risk of missing attestations or proposals. While the block time of 12 seconds defines the average time for new block proposals, having good latency remains important for timely synchronization, data propagation, and network participation.

## How much data traffic does my node consume?

Based on research of several validators, the node will have a daily upload and download of around `40-45 GB` each, totaling approximately `80-90 GB` of internet traffic daily. Based on these metrics, your node will have average data traffic of around `600 GB` per week and around `2,7 TB` per month. Archive nodes will get similar numbers but store data more consistently and in more detail.
