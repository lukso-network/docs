# LUKSO CLI

>⚠️ This page may change. Not everything is ready yet.

## Installation ( Linux/MacOS )
`curl https://install.l15.lukso.network | bash`

## Installation ( Windows )
`curl https://install.l15.lukso.network/windows | bash` 


This shell script will: 
1. Create directory under `/opt/lukso`
2. Download zipped files required for node startup.
3. Unzip them (using `unzip` tool)
4. Create symbolic link in `/usr/local/bin`.

## Running
Enter `lukso config` in your shell to generate config file.

Example:
~~~yaml
COINBASE: "0x616e6f6e796d6f75730000000000000000000000"
WALLET_DIR: "/home/user/.lukso/l15/vanguard-wallet"
DATADIR: "/home/user/.lukso/l15/datadirs"
LOGSDIR: "/home/user/.lukso/l15/logs"
NODE_NAME: "l15-60F08373"
~~~
After that, simply run:  
`lukso start` to start an archive node  
`lukso start --validate` to start a validator node


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
> In **bold** is a behaviour when argument is skipped (default)

### start

| name      | description            | Argument  |
|-----------|------------------------|---|
| --network | Picks which setup to use | Name of network from list: `mainnet, l15, l15-staging, l15-dev`
| --l15 | Shorthand alias for `--network l15` | <none\>
| --l15-staging | Shorthand alias for `--network l15-staging` | <none\>
| --l15-dev | Shorthand alias for `--network l15-dev` | <none\>
| --config | Path to config file     | Path ex. `config.yaml` |
| --validate | Starts validator      | <none\>
| *Note* | ALL flags below are ignored if config file is provided **unless** it's absent in the file |
| --etherbase | Sets pandora etherbase | ETH1 addres ex. `0x144a9533B3d759d647597762d33a1cD6f9Bf118c`
| --node-name  | Name of node that's shown on pandora stats and vanguard stats | String ex. `l15-johnsmith123` 

### stop
| name      | description            | Argument  |
|-----------|------------------------|---|
| --force   | Adds force option to kill commands (may result in corruption of node data)     | <none\> |


