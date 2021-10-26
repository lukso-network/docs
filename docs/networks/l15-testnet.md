---
sidebar_position: 3
---

# L15 Public Testnet

This testnet is ephemeral, meaning it is not meant to be fully stable and usable yet for more persistent test smart contracts. Assume the network could be reset at any time. The [L16 Public Testnet](l16-testnet.md) is meant as a more stable persistent testnet before mainnet (Not yet running).

## How to participate

Run this command on a unix machine:
```bash
curl https://install.l15.lukso.network | bash
lukso start --node-name "REPLACE-WITH-NODE-NAME"
```

This starts your node as an archive node, and your node will then show up as "REPLACE-WITH-NODE-NAME" on the [pandora](https://stats.pandora.l15.lukso.network) and [vanguard](https://stats.vanguard.l15.lukso.network) stats pages.

For all options and windows `Windows` please look at our [lukso cli documentation](https://docs.lukso.tech/networks/lukso-cli)

<iframe width="560" height="315" src="https://www.youtube.com/embed/G2DSFqYwteI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### How to become a LUKSO Validator

**Step 1:**
Go to the [LUKSO Launchpad](https://launchpad.l15.lukso.network) and follow the steps to become a validator.

**Step 2:**
When you have generated your keys, you can import them into the `lukso-validator` by typing: `$ lukso wallet`. You will then be instructed by the interactive interface.

**Step 3:**
Now run your node as a validator with `$ lukso start --validate --node-name "REPLACE-WITH-NODE-NAME" --wallet-password-file /path/to/wallet/password-file.txt`

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

The network configuration files
- <https://github.com/lukso-network/network-configs>

Clients:
- `Vanguard`: <https://github.com/lukso-network/vanguard-consensus-engine/>
- `Pandora`: <https://github.com/lukso-network/pandora-execution-engine/>
- `Orchestrator`: <https://github.com/lukso-network/lukso-orchestrator>
