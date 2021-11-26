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

### Running
Enter `lukso start` to start an archive node  
Enter `lukso start --validate --coinbase <ETH1_Address>` to start a validator node (Read instructions on validating first)

You may need to use `sudo` on `macos` devices.


## Installation ( Windows )
>🛠️ Work In Progress, available soon.  
> Requires [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.1) 5.1+ (may work on earlier versions but not tested)

### Install `powershell-yaml` module
Powershell does not support `.yaml` files out-of-the-box  
and because the script is using config files it is necessary to install third-party module.  
https://www.powershellgallery.com/packages/powershell-yaml/0.4.2
1. Run `PowerShell` as an Administrator
2. Enter `Install-Module -Name powershell-yaml` into the shell
3. Verify installation by running `ConvertFrom-Yaml`  it shouldn't give any output but also not throw any error.

### Enable coloring for powershell
This step is optional but recomended
`Set-ItemProperty HKCU:\Console VirtualTerminalLevel -Type DWORD 1`

### Install Setup
1. Run `PowerShell` as an Administrator
2. `cd $HOME` (by default when running as an Admin you're in the `C:\Windows\System32` directory and this may cause problems)
3. `Invoke-WebRequest -Uri https://install.l15.lukso.network/windows -OutFile ./install-lukso.ps1`
4. `./install-lukso.ps1`



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
| start     | Starts up all or specific client(s) | [orchestrator, pandora, vanguard, validator, eth2stats-client, **all**] |
| stop      | Stops all or specific client(s)     | [orchestrator, pandora, vanguard, validator, eth2stats-client, **all**] |
| reset     | Clears client(s) datadirs (this also removes chain-data) | [orchestrator, pandora, vanguard, validator, all, **none**]
| config    | Interactive tool for creating config file | |
| keygen    | Runs `lukso-deposit-cli` | |
| wallet    | Imports `lukso-deposit-cli` keys into `lukso-validator` wallet| |
| logs      | Show logs | [orchestrator, pandora, vanguard, validator, eth2stats-client] |
| bind-binaries      | sets client(s) to desired version | 
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


