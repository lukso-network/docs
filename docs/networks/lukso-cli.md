# LUKSO CLI

>⚠️ This page may change. Not everything is ready yet.

## System requirements

### Minimum specifications

These specifications must be met in order to successfully run the Vanguard, Pandora, and Orchestrator clients.

- Operating System: 64-bit Linux, Mac OS X 10.14+
- Processor: Intel Core i5–760 or AMD FX-8100 or better
- Memory: 8GB RAM
- Storage: 20GB available space SSD
- Internet: Broadband connection

### Recommended specifications

These hardware specifications are recommended, but not required to run the Vanguard, Pandora, and Orchestrator clients.

- Processor: Intel Core i7–4770 or AMD FX-8310 or better
- Memory: 16GB RAM
- Storage: 100GB available space SSD
- Internet: Broadband connection

>⚠️ Currently we do not support Apples new M1 chips and Windows yet. 

## Installation ( Linux/MacOS )

`curl https://install.l15.lukso.network | bash`

This shell script will:
1. Create directory under `/opt/lukso`
2. Download binary executables and config files required for node startup.
3. Place them in `/opt/lukso`
4. Create symbolic link in `/usr/local/bin`.


## Installation ( Windows )
>🛠️ Work In Progress, available soon.  
> Requires [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.1)

## Running
Enter `lukso start` to start an archive node  
Enter `lukso start --validate --coinbase <ETH1_Address>` to start a validator node (Read instructions on validating first) 

You may need to use `sudo` on `macos` devices.

## Config file
Enter `lukso config` in your shell to generate config file.

Example:
~~~yaml
COINBASE: "0x616e6f6e796d6f75730000000000000000000000"
WALLET_DIR: "/home/user/.lukso/l15-prod/vanguard-wallet"
DATADIR: "/home/user/.lukso/l15-prod/datadirs"
LOGSDIR: "/home/user/.lukso/l15-prod/logs"
NODE_NAME: "l15-johnsmith123"
~~~
After that, you can use `--config /path/to/config.yaml` insted of other flags:  



## Available parameters
`lukso <command> [argument] [--flags]`

| command   | description            | argument |
|-----------|------------------------|----------------------|
| start     | Starts up all or specific client(s) | [orchestrator, pandora, vanguard, validator, eth2stats-client, lukso-status, **all**] |
| stop      | Stops all or specific client(s)     | [orchestrator, pandora, vanguard, validator, eth2stats-client, lukso-status, **all**] |
| reset     | Clears client(s) datadirs (this also removes chain-data) | [orchestrator, pandora, vanguard, validator, all, **none**]
| config    | Interactive tool for creating config file | |
| keygen    | Runs `lukso-deposit-cli` | |
| wallet    | Imports `lukso-deposit-cli` keys into `lukso-validator` wallet| |
| logs      | Show logs | [orchestrator, pandora, vanguard, validator, eth2stats-client, lukso-status] |
| bind-binaries      | sets client(s) to desired version | 
| version      | Shows the LUKSO script version | 
> In **bold** is a behaviour when argument is skipped (default)

### start

| name      | description            | Argument  |
|-----------|------------------------|---|
| --network | Picks which setup to use | Name of network from list: `mainnet, l15-prod, l15-staging, l15-dev`
| --l15-prod | Shorthand alias for `--network l15-prod` | <none\>
| --l15-staging | Shorthand alias for `--network l15-staging` | <none\>
| --l15-dev | Shorthand alias for `--network l15-dev` | <none\>
| --config | Path to config file     | Path ex. `config.yaml` |
| --validate | Starts validator      | <none\>
| --coinbase | Sets pandora coinbase. This is public address for block mining rewards (default = first account created) (default: "0") | ETH1 addres ex. `0x144a9533B3d759d647597762d33a1cD6f9Bf118c`
| --node-name  | Name of node that's shown on pandora stats and vanguard stats | String ex. `johnsmith123` 
| --logsdir  | Sets the logs path | String ex. `/mnt/external/lukso-logs` 
| --datadir  | Sets datadir path | String ex. `/mnt/external/lukso-datadir`
| --home  | Sets path for datadir and logs in a single location (--datadir and --logs take priority) | String ex. `/var/lukso` 
| --orchestrator-verbosity  | Sets orchestrator logging depth | String ex. `silent, error, warn, info, debug, trace` 
| --pandora-verbosity  | Sets pandora logging depth (note: pandora uses integers for that flag, script will convert those to proper values) | String ex. `silent, error, warn, info, debug, trace` 
| --pandora-bootnodes  | Sets pandora bootnodes | Strings of bootnodes separated by commas: `enode://72caa...,enode://b4a11a...`
| --pandora-http-port  | Sets pandora RPC (over http) port | Number between 1023-65535
| --pandora-metrics  | Enables pandora metrics server | <none\>
| --pandora-nodekey  | P2P node key file | Path to file (relative or absolute)
| --pandora-rpcvhosts  | Sets pandora rpc virtual hosts (use quotes if you want to set \* `'*'` otherwise shell will resolve it) | Comma-separated list of virtual hosts Ex. `localhost` or `*`
| --pandora-external-ip  | Sets external IP for pandora (overrides --external-ip if present) | String ex. `72.122.32.234`
| --pandora-universal-profile-expose  | Exposes "net,eth,txpool,web3" API's on Pandora RPC | <none\>
| --pandora-unsafe-expose  | Exposes ALL API's ("admin,net,eth,debug,miner,personal,txpool,web3") API's on Pandora RPC | <none\>
| --vanguard-verbosity  | Sets vanguard logging depth | String ex. `silent, error, warn, info, debug, trace`
| --vanguard-bootnodes  | Sets vanguard bootnodes | Strings of bootnodes separated by commas: `enr:-Ku4QAmY...,enr:-M23QLmY...`
| --vanguard-p2p-priv-key  | The file containing the private key to use in communications with other peers. | Path to file (relative or absolute)
| --vanguard-external-ip  | Sets external IP for vanguard (overrides --external-ip if present) | IP ex. `72.122.32.234`
| --vanguard-p2p-host-dns  | Sets host DNS vanguard (overrides --external-ip AND --vanguard-external-ip if present) | DNS name ex. `l15-nodes-1.nodes.l15.lukso.network`
| --vanguard-rpc-host  | Sets vanguard RPC listening interface | IP ex. `127.0.0.1`
| --vanguard-monitoring-host  | Sets vanguard monitoring listening interface | IP ex. `127.0.0.1`
| --validator-verbosity  | Sets validator logging depth | String ex. `silent, error, warn, info, debug, trace`
| --wallet-dir  | Sets directory of `lukso-validator` wallet  | Path to directory, relative or absolute
| --wallet-password-file  | Sets directory of `lukso-validator` wallet  | Path to directory, relative or absolute
| --cors-domain  | Sets CORS domain (note: if you want to set every origin you must type asterisk wrapped in quotes `'*'` otherwise shell may try to resolve it | CORS Domain ex. `localhost`, `*`
| --external-ip  | Sets external IP for pandora and vanguard | String ex. `72.122.32.234`
| --allow-respin  | Deletes all datadirs IF network config changed (based on genesis time) | <none\>
| --vanguard-http-web3provider  | An eth1 web3 provider string http endpoint or IPC socket path. (default: http://127.0.0.1:8545) | URL address, e.g. `http://127.0.0.1:8545`
| --vanguard-rpc-host  | Host on which the RPC server should listen. (default: 127.0.0.1) | IPv4 address, e.g. `127.0.0.1`
| --van-rpc-port  | Port on which the RPC server should listen. (default: 4000) | Port, e.g. `4000`
| --van-udp-port  | Vanguard beacon chain client UDP port. The port used by discv5. (default: 12000) | Port number, e.g. `12000`
| --van-tcp-port   | Vanguard beacon chain client TCP port. The port used by libp2p. (default: 13000) | Port number, e.g. `13000`
| --van-grpc-gateway-port   | Vanguard gRPC gateway port. The port on which the gateway server runs on (default: 3500) | Gateway port, e.g. `3500`
| --vanguard-orc-rpc-provider   | A orchestrator rpc endpoint. This is our orchestrator client http endpoint or socket path. (default: http://127.0.0.1:7877) | URL or IPC socket path, e.g. `http://127.0.0.1:7877`
| --validator-beacon-rpc-provider | Beacon node (vanguard) RPC provider endpoint. (default is: 127.0.0.1:4000) | IPv4 with port, e.g. `127.0.0.1:4000`
| --validator-pandora-http-provider | A pandora rpc endpoint. This is our pandora client http endpoint. (default is: http://127.0.0.1:8545) | URL or IPC socket path, e.g. `http://127.0.0.1:8545`
| --orchestrator-vanguard-rpc-endpoint | Enables Vanguard node RPC provider endpoint. (default is: 127.0.0.1:4000) | IPv4 with port, e.g. `127.0.0.1:4000`
| --orchestrator-pandora-rpc-endpoint | Pandora node RP provider endpoint. (default: ws://127.0.0.1:8546) | Websocket address with port, e.g. `ws://127.0.0.1:8546`
| --eth2stats-beacon-addr | Beacon node endpoint address for eth2stats-client. (default: 127.0.0.1:4000) | IPv4 with port, e.g. `127.0.0.1:4000`
| --orc-http-port | Orchestrator HTTP port exposed. Default is: 7877 | Port number, e.g. `7877`
| --orc-http-addr | Orchestrator HTTP address exposed. Default is: 127.0.0.1 | IPv4 address, e.g. `127.0.0.1`
| --orc-ws-port | Orchestrator websocket port exposed. Default is: 7878 | Port number, e.g. `7878`
| --orc-ws-addr | Orchestrator websocket address exposed. Default is: 127.0.0.1 | IPv4 address, e.g. `127.0.0.1`
| --pan-port | Pandora client TCP/UDP port exposed. Default is: 30405 | Port number, e.g. `30405`
| --pan-http-addr | Pandora client http address exposed. Default is: 127.0.0.1 | IPv4 address, e.g. `127.0.0.1`
| --pan-http-port | Pandora client http port exposed. Default is: 8545 | Port number, e.g. `8545`
| --pan-ws-addr  | Pandora client websocket address exposed. Default is: 127.0.0.1 | IPv4 address, e.g. `127.0.0.1`
| --pan-ws-port | Pandora client websocket port exposed. Default is: 8546 | Port number, e.g. `8546`
| --pan-http-miner-addr | Pandora HTTP URL to notify of new work packages. Default is: http://127.0.0.1:7877 | HTTP address, e.g. `http://127.0.0.1:7877`
| --pan-ws-miner-addr | Pandora Websocket URL to notify of new work packages. Default is: ws://127.0.0.1:7878 | WS address, e.g. `ws://127.0.0.1:7878`
| --pan-ethstats | Pandora flag to activate ethstats listing on remote dashboard. If enabled you should see your node by your node name provided via --node-name flag or lukso config. (default:  disabled) | Token and address like `token123@stats.example.com`
| --van-ethstats | Vanguard flag fo activate eth2stats listing on remote dashboard. If enabled you should see your node by your node name provided via --node-name flag or lukso config. (default:  disabled) | Address, e.g. `192.168.0.1:9090`
| --van-min-sync-peers | The required number of valid Vanguard peers to connect with before syncing. (default: 2) | Number of required peers, e.g. `1`
| --van-max-p2p-peers | The max number of Vanguard p2p peers to maintain. (default: 50) | Peers count, e.g. `70`
| --van-ethstats-metrics | The metrics address for Vanguard eth2stats-client service (default: http://127.0.0.1:8080/metrics) | HTTP address with port and `metrics` endpoint, e.g. `http://127.0.0.1:8080/metrics`

How to use flags with values? Provide a flag and value like: `lukso start --datadir /data/network-node`

### stop
| name      | description            | Argument  |
|-----------|------------------------|---|
| --force   | Adds force option to kill commands (may result in corruption of node data)     | <none\> |

### keygen
| name      | description            | Argument  |
|-----------|------------------------|---|
| --keys-dir  | Sets directory of `lukso-deposit-cli` keys | Path to directory, relative or absolute
| --keys-password-file  | Sets directory of `lukso-deposit-cli` keys | Path to directory, relative or absolute

### wallet
| name      | description            | Argument  |
|-----------|------------------------|---|
| --keys-dir  | Sets directory of `lukso-deposit-cli` keys | Path to directory, relative or absolute
| --keys-password-file  | Sets directory of `lukso-deposit-cli` keys | Path to directory, relative or absolute
| --wallet-dir  | Sets directory of `lukso-validator` wallet  | Path to directory, relative or absolute
| --wallet-password-file  | Sets directory of `lukso-validator` wallet  | Path to directory, relative or absolute


### bind-binaries 
| name      | description            | Argument  |
|-----------|------------------------|---|
| --orchestrator   | download and set `orchestrator` to given tag  | Tag, ex. `v0.1.0-rc.1` |
| --pandora   | download and set `pandora` to given tag  | Tag, ex. `v0.1.0-rc.1` |
| --vanguard   | download and set `vanguard` to given tag  | Tag, ex. `v0.1.0-rc.1` |
| --validator   | download and set `validator` to given tag  | Tag, ex. `v0.1.0-rc.1` |
| --deposit   | download and set `lukso-deposit-cli` to given tag  | Tag, ex. `v0.1.0-rc.1` |
| --eth2stats   | download and set `eth2stats` to given tag  | Tag, ex. `v0.1.0-rc.1` |
| --lukso-status   | download and set `lukso-status` to given tag  | Tag, ex. `v0.1.0-rc.1` |


