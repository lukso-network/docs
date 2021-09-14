# Lukso setup/cli tool

>⚠️ This page may change and does not reflect current state of binary yet.

## Installation
`curl https://install.l15.lukso.network | bash`
This shell script will: 
1. Create directory under `/opt/lukso`
2. Download zipped files required for node startup.
3. Unzip them (using `unzip` tool)
4. Create symbolic link in `/usr/local/bin`.

## Config file

~~~yaml
COINBASE: "0x91b382af07767Bdab2569665AC30125E978a0688"
DATADIR: "/home/node/lukso_datadir"
LOGSDIR: "/home/node/lukso_datadir/logs"
NETWORK: "l15"
NODE_NAME: "l15-johnsmith123"
WALLET_DIR: "/home/node/.lukso/l15/vanguard_wallet"
~~~

## Available parameters
`lukso <command> [argument] [--flags]`

| command   | description            | argument |
|-----------|------------------------|----------------------|
| start     | Starts up all or specific client(s) | [orchestrator, pandora, vanguard, validator, eth2stats-client, **all**] |
| stop      | Stops all or specific client(s)     | [orchestrator, pandora, vanguard, validator, eth2stats-client, **all**] |
| reset     | Clears client(s) datadirs (this also removes chain-data) | [orchestrator, pandora, vanguard, validator, all, **none**]
| config    | Interactive tool for creating config file | |
| keygen    | Runs `eth2deposit-cli` | |
| wallet    | Imports `eth2deposit-cli` keys | |
| logs      | Show logs | [orchestrator, pandora, vanguard, validator, eth2stats-client] |
| bind-binaries | Creates symlinks to binaries in `/opt/lukso/networks/l15/bin` | |
> In **bold** is a behaviour when argument is skipped (default)

### start

| name      | description            | Argument  |
|-----------|------------------------|---|
| --network | Picks which setup to use | Name of network from list: `l15`
| --l15 | Shorthand alias for `--network l15` | <none\>
| --config | Path to config file     | Path ex. `config.yaml` |
| *Note* | ALL flags below are ignored if config file is provided **unless** it's absent in the file |
| --validate | Starts validator      | <none\>
| --etherbase | Sets pandora etherbase | ETH1 addres ex. `0x144a9533B3d759d647597762d33a1cD6f9Bf118c`
| --node-name  | Name of node that's shown on pandora stats and vanguard stats | String ex. `l15-johnsmith123` 

### stop

| name      | description            | Argument  |
|-----------|------------------------|---|
| --force   | Adds force option to kill commands (may result in corruption of node data)     | <none\> |


