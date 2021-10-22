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
Run those commands in your terminal to become archive node
```sh
wget -O ./lukso.sh  https://install.l15.lukso.network --no-check-certificate
chmod +x ./lukso.sh
./lukso.sh --run_arch
```

Run this to get help: 
```
./lukso.sh --help
```
