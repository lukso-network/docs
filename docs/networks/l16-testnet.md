---
sidebar_position: 2
---

# L16 BETA Testnet
 

The L16 Public Testnet will be the last stable test network before the mainnet launch and will likely stay online in parallel for experimental purposes.

## System Requirements

### Minimum System Requirements

| Settings            | Value          |
| ------------------- | -------------- |
| Operating System    | Linux or MacOS |
| Number of CPU cores | 2              |
| RAM                 | 16 GB          |
| SSD                 | 100 GB         |

### Recommended System Requirements

| Settings            | Value          |
| ------------------- | -------------- |
| Operating System    | Linux or MacOS |
| Number of CPU cores | 8              |
| RAM                 | 32 GB          |
| SSD                 | 512 GB         |

:::info
Apple's new M1 chips are not supported natively by our node client. However, you can follow [this guide](https://medium.com/@luki3k5/running-lukso-node-on-m1-mac-acf92d433a38) to run it by using Rosetta, Apple's built-in emulation software.
:::
 
### Ports


| Port                         | Protocol                      | Client                            | Ingress                           |  Comment |
| ---------------------------- | ---------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- | 
|  30303 | TCP | geth syncing | port must be open | ... |
|  30303 | UDP | geth discovery| port must be open | ... |
|  13000 | TCP | beacon syncing| port must be open | ... |
|  12000 | UDP | beacon discovery| port must be open | ... |
|  8545 | TCP | geth api| port should be closed | valuable information are provided but for a validator it is recommended to not open the port |
|  8080 | UDP | beacon metrics| port should be closed | ... |
|  3500 | UDP | beacon api| port should be closed | valuable information are provided but for a validator it is recommended to not open the port |
|  4000 | UDP | beacon rpc| port should be closed | ... |

### Configure your firewall
**LINUX**

Using the lukso-cli will open the ports for you automatically.  If you have a firewall configured, please allow traffic for the above mentioned ports, you can use the following commands to configure your firewall correctly:

```
sudo ufw default deny incoming
sudo ufw default allow outgoing 
```
```
sudo ufw allow 30303/tcp
sudo ufw allow 30303/udp
sudo ufw allow 13000/tcp
sudo ufw allow 12000/udp
```
```
sudo ufw enable
```
The firewall will be active after restarting your system.

**MAC**

```
This section is in the works
```

:::info
NOTE: Make sure you also forward those ports in your router.
:::

### Installing Dependencies

Prepare your **Linux** environment. You need:

1. [Docker](https://docs.docker.com/get-docker/)
2. [Docker Compose](https://docs.docker.com/compose/)
3. [curl](https://macappstore.org/curl/) 

```bash title="Example script for installing docker"
# Install dependencies
sudo apt-get -y update
sudo apt-get -y install curl

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

To prepare your **Mac** environment. You need:
1. [Homebrew package manager](https://brew.sh)
2. [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)
3. [curl](https://macappstore.org/curl/)

```bash title="Example script for installing docker"
# Install Homebrew 
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Curl
sudo brew install curl

# Install Docker Desktop for Mac
Go to https://docs.docker.com/desktop/mac/install/ and install the application. 
You do not have to install Docker Compose separately
```

## Setting up Metamask

| Setting                      | Value                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| Network Name                 | L16 Beta                                                                                         |
| New RPC URL                  | https://rpc.beta.l16.lukso.network                                                               |
| Chain ID                     | 83748374 (0x4FDE616)                                                                             |
| Currency Symbol              | LYXt                                                                                             |
| Execution Block Explorer URL | [https://explorer.execution.beta.l16.lukso.network/](https://explorer.execution.beta.l16.lukso.network/) |


**[here is a tutorial on how to add a network to Metamask.](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC)**

### Installing the Node

```bash
mkdir lukso-l16-testnet && cd lukso-l16-testnet
curl https://raw.githubusercontent.com/lukso-network/lukso-cli/main/install.sh | sudo bash
```

The script will download the LUKSO cli into the folder. 
 
#### Setting up your node and node name
```bash
lukso network init --nodeName [NAME_HOW_IT_APPEARS_IN_THE_STATS] 
```
 

## Starting the Node

```bash
# Start your nodes
lukso network start
```

## Become a Validator

### Setup Validator

```
lukso network validator setup
```

This will create a key store and a transaction wallet. The purpose of the transaction wallet is to call and pay for the deposit
transaction. You can check if the wallet has enough funds by calling

```
lukso network validator describe
```

Visit the [Faucet](https://faucet.beta.l16.lukso.network) and paste the transaction wallet public key into the input field.

Transfer **enough** (#validators x staking_amount **+ extra LYXt to pay deposit fees**) funds to the transaction wallet public's address.

 

#### Submit the transaction.

Make a dry run first

```bash
lukso network validator deposit --dry
```

This will give you the possibility to peek in what is going to happen without executing a transaction.

If you are sure that everything is correct you run the command


```bash
lukso network validator deposit
```


It can take up to eight hours before your validator becomes active, but you can already start your validator in the meantime.

### Start the Validator Client

```bash
# Make sure your _consensus_ and _execution_ clients are running
lukso network validator start

# You can check logs with
lukso network log validator -f

You can close your logs by pressing ctrl+c

# You can stop the validator using, this will also stop all other nodes
lukso network validator stop
```

Occasionally check the status of your validator by either typing

```bash
lukso network validator describe
```

Or by visiting the [Explorer](https://explorer.consensus.beta.l16.lukso.network)

## Check your logs
```
lukso network log consensus -f
lukso network log execution -f
```

You can close your logs by pressing ctrl+c

## Stop your node
```
lukso network stop
```


##### If you selected a wrong chain, you could reset the setup. This will delete all related data except the keystores.
##### NOTE: the network must be stopped
```
lukso network clear
```

### Check the Network Status

You can see your node on the following pages:

1. [https://stats.execution.beta.l16.lukso.network](https://stats.execution.beta.l16.lukso.network)
2. [https://stats.consensus.beta.l16.lukso.network](https://stats.consensus.beta.l16.lukso.network)



## Troubleshooting L16 Beta Testnet

### Permission denied

If you get an error that the permission is denied use `sudo` in front of your command.

### Bootnodes

You can update Bootnodes with


```bash
lukso network update
```

You need to restart the chain to make the changes effective

```
lukso network restart
```
 
### Unmarshalling Error

:::info Context
Check your execution log by `lukso network log execution`. For Ubuntu 20.04 LTS you may get an unmarshal-related issue like:

```
log_execution: err="peer connected on snap without compatible eth support" log_consensus: level=error msg="Could not connect to powchain endpoint: could not dial eth1 nodes: json: cannot unmarshal string into Go struct field SyncProgress.CurrentBlock of type uint64" prefix=powchain
```

:::

**Proposed Solution:**

```sh
# stop docker container
lukso network stop
# reset data directory
lukso network clear
# remove previous images
docker system prune --all --force --volumes
# delete lukso testnet directory
cd .. && rm -rf ./lukso-l16-testnet
```

After trying out the proposed solution, re-run your node setup from the start.

## All L16 Beta links

**Request LYXt**
[Faucet](https://faucet.beta.l16.lukso.network)

**Execution info**
[Execution explorer](https://explorer.execution.beta.l16.lukso.network)
[Execution stats](https://stats.execution.beta.l16.lukso.network)

**Validator info**
[Consensus explorer](https://explorer.consensus.beta.l16.lukso.network)
[Consensus stats](https://stats.consensus.beta.l16.lukso.network)

:::info
You can find a community guide about how to setup your Grafana dashboard on Linux [here](https://luksoverse.io/2022/06/system-and-monitor-setup-guide-by-volodymyr-lykhonis/)
:::

 
## FAQ

```
Will be added soon.
```
