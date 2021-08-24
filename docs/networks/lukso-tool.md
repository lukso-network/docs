# Lukso binary tool

>⚠️ This page may change and do not reflect current state of binary

## Installation
`curl https://install.l15.lukso.network | sh`
This shell script will: 
1. Create directory under `/opt/lukso`
2. Download zipped files required for node startup.
3. Unzip them (using `unzip` tool)


```yaml
DATADIR: "/mnt/persistent/l15-content"
ETHERBASE: "0x144a9533B3d759d647597762d33a1cD6f9Bf118c"
NODE_NAME: "l15-johnsmith123"
VALIDATOR: true
```

## Available parameters
`lukso-cli <command> [--flags]`

| command   | description            |
|-----------|------------------------|
| start     | Starts up all programs |
| stop      | Stops all programs     |
| config    | Interactive tool for creating config file |
| keygen    | Runs `eth2deposit-cli` |
| wallet    | Imports `eth2deposit-cli` keys |
| bind-binaries | Creates symlinks to binaries in `/opt/lukso/networks/l15/bin` |

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


