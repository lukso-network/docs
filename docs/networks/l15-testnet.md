---
sidebar_position: 3
---


# L15 Public Testnet

This testnet is ephemeral, meaning it is not meant to be fully stable and usable yet for more persistent test smart contracts. Assume the network could be reset at any time. The [L16 Public Testnet](l16-testnet.md) is meant as a more stable persistent testnet before mainnet (Not yet running).

:::note
The L15 Testnet was superseeded by [L16 Public Testnet](l16-testnet.md), please check these L16 docs
:::

## MetaMask

To add the L15 Network to MetaMask, these are the settings:

| Setting            | Value                                      |
| ------------------ | ------------------------------------------ |
| Network Name       | L15                                        |
| New RPC URL        | https://rpc.l15.lukso.network              |
| Chain ID           | 23 (0x17)                                  |
| Currency Symbol    | LYXt                                       |
| Block Explorer URL | https://explorer.pandora.l15.lukso.network |

And if you need it, [here is a tutorial on how to do it](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC).

## How to participate


<!-- Since we are resetting the network, please make sure to run `$ lukso reset all` and re-install the `lukso` binary:

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
$ lukso stop
$ lukso reset all
$ curl https://install.l15.lukso.network | bash
$ lukso start --node-name "REPLACE-WITH-NODE-NAME"
```

</TabItem>
<TabItem value="macos" label="MacOS">

```bash
$ sudo lukso stop
$ lukso reset all
$ sudo curl https://install.l15.lukso.network | bash
$ sudo lukso start --node-name "REPLACE-WITH-NODE-NAME"
```

</TabItem>
</Tabs>

This is a one-time operation and it's nescessary to be able to join the fun. -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### How to run an archive node

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
$ curl https://install.l15.lukso.network | bash
$ lukso start --node-name "REPLACE-WITH-NODE-NAME"
```

</TabItem>
<TabItem value="macos" label="MacOS">

```bash
$ sudo curl https://install.l15.lukso.network | bash
$ sudo lukso start --node-name "REPLACE-WITH-NODE-NAME"
```

</TabItem>
</Tabs>

This starts your node as an archive node.

<!-- :::info

Please note that currently we do not attach your node to the [pandora](https://stats.pandora.l15.lukso.network) and [vanguard](https://stats.vanguard.l15.lukso.network) stats pages. This is because these pages are not able to monitor 100+ nodes and start freezing the browser. Right now we are working on a local status page for Pandora and Vanguard.

::: -->

For all options and Windows please look at our [LUKSO CLI documentation](lukso-cli.md).

<div style={{textAlign: 'center'}}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/G2DSFqYwteI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### How to become a validator

:::caution

In case you are currently running a node, please run `lukso stop` (`sudo lukso stop` for MacOS) before continuing.

:::

**Step 1:**
Go to the [LUKSO Launchpad](https://launchpad.l15.lukso.network) and follow the steps to become a validator.

**Step 2:**
You can check your validator status in the [Vanguard Block Explorer](https://explorer.vanguard.l15.lukso.network). You can find your validator via its public key.

## Links

- https://faucet.l15.lukso.network To get some LYXt (test LYX)
- https://launchpad.l15.lukso.network The Launchpad to participate as a validator

---

- https://stats.vanguard.l15.lukso.network Statistic page for the vanguard consensus chain
- https://explorer.vanguard.l15.lukso.network Block Explorer page for the vanguard consensus chain

---

- https://stats.pandora.l15.lukso.network Statistic page for the pandora shard chain
- https://explorer.pandora.l15.lukso.network Block Explorer page for the pandora shard chain
- https://rpc.l15.lukso.network Public RPC endpoint for the pandora shard chain

## Repositories

The network configuration files:

- <https://github.com/lukso-network/network-configs>

Clients:

- `Vanguard`: <https://github.com/lukso-network/vanguard-consensus-engine>
- `Pandora`: <https://github.com/lukso-network/pandora-execution-engine>
- `Orchestrator`: <https://github.com/lukso-network/lukso-orchestrator>
