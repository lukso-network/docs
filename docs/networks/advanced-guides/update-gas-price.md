---
sidebar_label: 'Update Gas Price'
sidebar_position: 6
description: Learn how to adjust the minimum gas price for validators on the LUKSO Network.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Gas Price

Within the network configuration files, validators can adjust the minimum gas price for transactions they accept to propose blocks to the network. The minimum gas price is an **individual client setting**. Validators can choose the value they desire for block approval depending on the current network occupation.

:::info Balancing Gas Fees

If most of the network accepts transactions with a small gas price, overall fees will remain lower. However, if the gas price is too high, the validator will propose empty blocks without transaction fees. As the network throughput rises, these values should be adjusted.

:::

:::tip Default Gas Price

The gas price mainly causes issues for Geth, as the execution client is using a strict default value that must be overwritten. The [LUKSO Network Configuration](https://github.com/lukso-network/network-configs) was recently updated to a base gas price of **1 Gwei** for **Geth Execution Clients**. This value is the default setting for the [latest supported Geth version](../mainnet/running-a-node.md). You can find further information within the related [Validator Substack Announcement](https://luksovalidators.substack.com/p/action-required-for-geth-operators).

:::

:::caution Recommended Gas Price

Due to many nodes still running older Geth clients and the network occupation remaining low, reducing the minimal gas price to a value between **0.1** and **1 Gwei** is _recommended_ to prevent validators from not receiving transaction rewards. Based on the [Network Explorer](https://explorer.lukso.network), the gas price currently levels off between 0.4 and 2.5 Gwei.

:::

## Adjusting the Gas Price

:::info

If you are running Geth and experience block reward issues, please adjust your Geth configuration file. The following examples set the gas price to **0.1 Gwei**. You can raise the value to **1 Gwei** by adding one zero.

:::

:::note

If you are using Erigon, you can set the gas price within the [`erigon.toml`](https://github.com/lukso-network/network-configs) file. However this is not mandatory nor recommended, as Erigon adjusts with the network's gas price dynamically.

:::

<Tabs>
<TabItem value="cli" label="📟 LUKSO CLI" default>

1. Move into the node working directory:

   ```sh
   cd <node-working-directory>
   ```

2. Stop your validator:

   ```sh
   lukso stop
   ```

3. Open the Geth configuration file:

   ```sh
   vim configs/<network>/geth/geth.toml
   ```

4. Adjust the gas price value:

   ```text
   GasPrice = 100000000 # 0.1 Gwei
   ```

5. Restart your validator:

   ```sh
   lukso start validator --transaction-fee-recipient "0x1234..."
   ```

</TabItem>
<TabItem value="dappnode" label="📦 Dappnode">

1. Stop your validator
2. Open the _LUKSO Stakers_ menu
3. Move into the _Lukso Geth Package_
4. Navigate to the _Configs_ window
5. Add the gas price flag in the `EXTRA_OPTS` field:

   ```text
   --miner.gasprice 100000000
   ```

6. Restart your validator

</TabItem>
<TabItem value="docker" label="🚢 Docker Image">

1. Stop your docker container

2. Open the `docker-compose.yml` file

3. Adjust the gas price value:

   ```text
   --miner.gasprice 100000000
   ```

4. Restart your container

</TabItem>
<TabItem value="custom" label="🔧 Custom Setup">

1. Stop your client services
2. Manually adjust the gas price by either:

   - adjusting the geth configuration file within your [network configuration](https://github.com/lukso-network/network-configs) files:

     ```text
        --miner.gasprice 100000000 # 0.1 Gwei
     ```

   - adding the gas price flag within the startup script:

     ```sh
        --miner.gasprice 100000000
     ```

3. Restart your client services

</TabItem>
</Tabs>
