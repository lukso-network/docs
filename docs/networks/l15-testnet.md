---
sidebar_position: 3
---

# L15 Public Testnet

This testnet is ephemeral, which is smooth gateway to [L16 Public Testnet](l16-testnet.md).

Current state of development can be found at https://github.com/lukso-network/l16-multinet/issues/10

You can track chain progression under those domains:
- https://launchpad.l15.lukso.network/
- https://stats.pandora.l15.lukso.network/
- https://explorer.pandora.l15.lukso.network/
- https://stats.vanguard.l15.lukso.network/
- https://explorer.vanguard.l15.lukso.network/
- https://rpc.l15.lukso.network/

## Repositories

Our network configs repository:
- <https://github.com/lukso-network/network-configs>

`lukso` script repository:
- <https://github.com/lukso-network/lukso-orchestrator/tree/feature/l15-setup>

We keep track of `l15` clients on branch `develop` within these repositories:
- `Vanguard`: <https://github.com/lukso-network/vanguard-consensus-engine/>
- `Pandora`: <https://github.com/lukso-network/pandora-execution-engine/>
- `Orchestrator`: <https://github.com/lukso-network/lukso-orchestrator>

## How to participate

You need to have our node setup on your local machine first. Check out this page to get all informations about our `lukso` install script: 
- <https://docs.lukso.tech/networks/lukso-cli>

### How to become an ETH2.0 LUKSO Validator

Step 1:
Go to LUKSO Launchpad and click `BECOME A VALIDATOR` and follow instructions there. Website is:
- <https://launchpad.l15.lukso.network>

Step 2:
When you generate your keys start importing them into `lukso-validator` by typing: `lukso wallet`. You will be instructed by `lukso` interactive inteface.

Step 3:
Just run your validator by `lukso start --validator`!

You can check your `lukso-validator` status here: <https://explorer.vanguard.l15.lukso.network/>. You can find your `lukso-validator` page by `publicKey`. Search for your validator by providing `publicKey`.
