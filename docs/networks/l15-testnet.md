---
sidebar_position: 3
---

# L15 Public Testnet

This testnet is ephemeral, meaning it is not meant to be fully stable and usable yet for more persistent test smart contracts. Assume the network could be reset at any time. The [L16 Public Testnet](l16-testnet.md) is meant as a more stable persistent testnet before mainnet (Not yet running).

## How to participate

:::caution Please Read carefully

Since we are resetting the network, please make sure to delete the currently existing datadirs by running the following command:

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
lukso stop
lukso reset all
```

</TabItem>
<TabItem value="macos" label="MacOS">

```bash
sudo lukso stop
sudo lukso reset all
```

</TabItem>
</Tabs>

This is a one-time operation and it's nescessary to be able to join the fun.

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### How to run an archive node

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
curl https://install.l15.lukso.network | bash
lukso start --node-name "REPLACE-WITH-NODE-NAME"
```

</TabItem>
<TabItem value="macos" label="MacOS">

```bash
curl https://install.l15.lukso.network | bash
sudo lukso start --node-name "REPLACE-WITH-NODE-NAME"
```

</TabItem>
</Tabs>

This starts your node as an archive node, and your node will then show up as "REPLACE-WITH-NODE-NAME" on the [pandora](https://stats.pandora.l15.lukso.network) and [vanguard](https://stats.vanguard.l15.lukso.network) stats pages.

For all options and Windows please look at our [LUKSO CLI documentation](lukso-cli.md).

<div style={{textAlign: 'center'}}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/G2DSFqYwteI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### How to become a validator

:::info

In case you are currently running an archive node, please run `lukso stop` (`sudo lukso stop` for MacOS) before continuing.

:::

**Step 1:**
Go to the [LUKSO Launchpad](https://launchpad.l15.lukso.network) and follow the steps to become a validator.

**Step 2:**
Execute the following commands:

<Tabs groupId="operating-systems">
<TabItem value="linux" label="Linux">

```bash
curl https://install.l15.lukso.network | bash
lukso start --validate --node-name "REPLACE-WITH-NODE-NAME" --wallet-password-file /path/to/wallet/password-file.txt`
```

</TabItem>
<TabItem value="macos" label="MacOS">

```bash
curl https://install.l15.lukso.network | bash
sudo lukso start --validate --node-name "REPLACE-WITH-NODE-NAME" --wallet-password-file /Users/YOUR_USER_NAME/Library/LUKSO/l15-prod/vanguard_wallet/password`
```

</TabItem>
</Tabs>

You can check your validator status in the [Vanguard Block Explorer](https://explorer.vanguard.l15.lukso.network). You can find your validator via its public key.

## Links:

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

- `Vanguard`: <https://github.com/lukso-network/vanguard-consensus-engine/>
- `Pandora`: <https://github.com/lukso-network/pandora-execution-engine/>
- `Orchestrator`: <https://github.com/lukso-network/lukso-orchestrator>
