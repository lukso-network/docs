---
sidebar_label: 'Peer Connections'
sidebar_position: 3
---

# Peer Connections

## What can I do if my peer connections are low?

You can maximize the peer count for both the execution and consensus clients **within the configuration files** of your node clients. For the LUKSO CLI, these config files are stored within the configs folder of the node's working directory.

If you just started your node, it might take multiple hours to synchronize with the network and build stable connections. If the number stays low, make sure you **open the ports** that are needed for the blockchain clients to transfer data. Often, the issues stem from the firewall or hosting provider settings.

Another issue could be that your **Public IP** was not set within the node configuration. The IP address should be exposed so other peers can find and connect to your node. The LUKSO CLI automatically asks to put the public IP during the initialization. However, your public IP might change over time, resulting in your node dropping peers. Therefore, keep your public IP updated or configure a Dynamic DNS address for your node. You can find further information about the topic within the [Extended Node Guide](https://docs.luksoverse.io/docs/) written by community members.

## What is the ideal peer count for my node?

More peers increase bandwidth and do not necessarily lead to benefits. The default value of 50 execution peers was chosen wisely by the network team, as you might run into router bandwidth issues above. Make sure your router is capable of handling higher loads and requests. It's not recommended to set your execution peer limit any higher than 100 in grown-out networks. **Ideally, you want an evenly spread network that favors decentralization** while being energy and data efficient.

## Are there drawbacks to setting my peer count too high?

Setting your peer count too high can have adverse side effects:

- **Resource Usage**: Each peer connection requires computational and network resources for managing the connection and processing transactions and blocks. If the maximum peer count is set too high, it may overwhelm your system resources like CPU, memory, and bandwidth, affecting the performance of your node and possibly your entire system. It affects bandwidth usage because your peer nodes are downloading the blockchain data from you if you are one of their peers. The connections would mean that your upload bandwidth is sending out a lot of data which will add to your outbound network usage.

- **Network Topology Impact**: LUKSO is a P2P network designed with a certain degree of decentralization and distribution. If individual nodes have too many connections, it could lead to more centralized network topology, negatively affecting the network's resilience to specific attacks or failures. Too high counts can defeat the distributed nature of blockchain networks. Ideally, the network **consists of smaller circles of discovered nodes** with a decentralized topology, extensive network growth, and no large population centers. When some node is down in a minor process of connected nodes, most of the blockchain does not notice the outage and goes on as if nothing happened. However, if every node is connected to most of the network, having outages would mean dropping the peer count of everyone and bringing fluctuations onto the table.

- **Wasted Connections**: There's a point beyond which additional connections don't provide a meaningful increase in data propagation speed or network resilience, for instance, if you are already connected to 33% or more percent for smaller networks or more than 100 active peers for bigger ones. Peers beyond this point are just wasting connections, harming the topology, and consuming resources without providing additional benefits.

## Why do my execution and consensus peers differ?

The execution and consensus peers are not the same. Both the execution and consensus clients gather independent communication channels to other nodes. There is no mechanism where the clients exchange their peer count.

## Is it essential to have many consensus peers?

The consensus client follows the chain and will synchronize only to the final epoch. Once finality is reached, it is not necessarily important how many peers the execution node has. A few peers would already be enough.
