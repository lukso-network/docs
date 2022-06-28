---
sidebar_position: 2
---

# L16 Public Testnet

:::info Network values DO NOT represent the final mainnet values
Values and configuration parameters for this network and suggested hardware specs DO NOT represent the final values for the LUKSO mainnet. Expect announcements shortly before mainnet launch.
:::

The L16 Public Testnet will be the last stable test network before the mainnet launch and will likely stay online in parallel for experimental purposes.

## Network Parameters

| Setting                      | Value                                                 |
| ---------------------------- | ----------------------------------------------------- |
| Network Name                 | L16                                              |
| New RPC URL                  | <https://rpc.l16.lukso.network>                  |
| Chain ID  / Network ID       | 2828 (0x0B0C)                                  |
| Currency Symbol              | LYXt                                                  |
| Execution Block Explorer     | <https://explorer.execution.l16.lukso.network>   |
| Execution Node list          | <https://stats.execution.l16.lukso.network>      |
| Consensus Block Explorer     | <https://explorer.consensus.l16.lukso.network>   |
| Consensus Node list          | <https://stats.consensus.l16.lukso.network>      |
| Faucet                       | <https://faucet.l16.lukso.network>               |

:::info
You can find a community guide for setting up a Grafana dashboard on Linux [here](https://luksoverse.io/2022/06/system-and-monitor-setup-guide-by-volodymyr-lykhonis/)
:::

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
 

## Setting up Metamask

| Setting                      | Value                                                |
| ---------------------------- | ---------------------------------------------------- |
| Network Name                 | L16                                             |
| New RPC URL                  | https://rpc.l16.lukso.network                   |
| Chain ID                     | 2828 (0x0B0C)                                 |
| Currency Symbol              | LYXt                                                 |
| Execution Block Explorer URL | <https://explorer.execution.l16.lukso.network>  |


**[Here is a tutorial on how to add a network to Metamask.](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC)**

## Ports

| Port                         | Protocol                      | Client                            | Ingress                           |  Comment |
| ---------------------------- | ---------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- | 
|  30303 | TCP | geth syncing | port must be open | ... |
|  30303 | UDP | geth discovery| port must be open | ... |
|  13000 | TCP | beacon syncing| port must be open | ... |
|  12000 | UDP | beacon discovery| port must be open | ... |
|  8545 | TCP | geth api| port should be closed | provides valuable information but should not be open on a validator node |
|  8080 | UDP | beacon metrics| port should be closed | ... |
|  3500 | UDP | beacon api| port should be closed | provides valuable information but should not be open on a validator node |
|  4000 | UDP | beacon rpc| port should be closed | ... |

## LINUX System Setup
*For instructions on setting up a Mac, proceed to the [Mac System Setup](#mac-system-setup) section.*

### Configure Firewall
Deny all incoming traffic by default
```
sudo ufw default deny incoming
sudo ufw default allow outgoing 
```
Allow traffic for the ports listed above.
```
sudo ufw allow 30303/tcp
sudo ufw allow 30303/udp
sudo ufw allow 13000/tcp
sudo ufw allow 12000/udp
```


Enable firewall
```
sudo ufw enable
```
:::info
NOTE: Make sure also to configure your router to forward these ports.
:::
You may follow this community-authored [Port Forwarding](https://github.com/KEEZ-RobG/node-guide/blob/main/PortForward.md) guide.



### Install Dependencies

1. [curl](https://macappstore.org/curl/) 
2. [Docker](https://docs.docker.com/get-docker/)
3. [Docker Compose](https://docs.docker.com/compose/)

#### Install Curl
```
sudo apt-get -y update
sudo apt-get -y install curl
```

#### Install Docker
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

#### Install Docker Compose
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

## Mac System Setup
*If setting up a LINUX system, proceed to the [Running A Node](#running-a-node) section.*
### Configure Firewall
This section is in the works


:::info
NOTE: Make sure also to configure your router to forward these ports.  
:::
You may follow this community-authored [Port Forwarding](https://github.com/KEEZ-RobG/node-guide/blob/main/PortForward.md) guide.

### Installing Dependencies




1. [Homebrew package manager](https://brew.sh)
2. [curl](https://macappstore.org/curl/)
3. [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)


#### Install Homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Install Curl
```
sudo brew install curl
```

#### Install Docker Desktop for Mac

Go to https://docs.docker.com/desktop/mac/install/ and install the application. 
You do not have to install Docker Compose separately.




## Running a Node

### Install CLI

 Create a folder for the LUKSO CLI.
```
mkdir lukso-l16-testnet && cd lukso-l16-testnet
```

Download the CLI.
```
sudo curl https://install.l16.lukso.network | sudo bash
```

### Setup Node

Initialize and name the node.
```
lukso network init --chain l16
```

### Start Node

Start the node client.
```
lukso network start
```

You can view the status of your node on the [Execution Stats](https://stats.execution.l16.lukso.network) page.

### Common Node Commands
#### Start and Stop
Spin up consensus, execution and eth2-stats docker container
```
lukso network start
```

Stops running docker containers
````
lukso network stop
````
Restart all running docker containers. (Same as start and stop)
````
lukso network restart
````
#### Update
Updates the node with the latest params
````
lukso network update
````
#### Logs
Consensus Logs
```
lukso network log consensus -f
````
Execution Logs
````
lukso network log execution -f
````

Press `ctrl+c` to exit log


## Running a Validator

### Validator Setup

This command will create a key store and a transaction wallet. In this step, you will be prompted to
1. Choose a keystore password
2. Input the number of validators you will run (1 validator = 220 LYXt)
3. Decide if you want a separate withdrawal mnemonic
```
lukso network validator setup
```

### Fund Transaction Wallet

The purpose of the transaction wallet is to call and pay for the deposit
transaction.

Find the public key and balance of the transaction wallet.
```
lukso network validator describe
```
::::warning
Be sure to copy the address of the **transaction wallet**, not the contract address.
::::

### Create Backup
Create a **node_recovery.json** file in your node directory.
```
lukso network validator backup
```
Store the file **node_recovery.json** somewhere safe.

### Send LYXt to the Transaction Wallet
Visit the [Faucet](https://faucet.l16.lukso.network)
Paste the transaction wallet public key into the input field.

Transfer **enough** to cover gas fees  
(Number of Validators **X** 220 LYXt) + **Extra** LYXt to Pay Deposit Fees

 

### Submit Deposit

Make a dry run first. It allows you to preview what will happen without executing a transaction.
```
lukso network validator deposit --dry
```

If you are **sure** everything is correct, execute the deposit transaction.
```
lukso network validator deposit
```



### Start Validator Client

After depositing, it can take up to eight hours before your validator becomes active, but you can start your validator in the meantime.

Start the validator client
````
lukso network validator start
````

You can view the status of your validator on the [Validator Stats](https://explorer.consensus.l16.lukso.network) page.

### Common Validator Commands

#### Start and Stop
Start the validator client
````
lukso network validator start
````
Stop the validator client
```
lukso network validator stop
```

#### Validator Status
Show detailed status of the validators
```
lukso network validator describe
```

#### Logs
Validator Logs
````
sudo lukso network log validator -f
````
Press `ctrl+c` to close the logs.









## Troubleshooting L16 Testnet

### Permission denied

If you get an error that the permission is denied, use `sudo` in front of your command.

### Bootnodes

You can update Bootnodes with


```
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

stop docker container
```
lukso network stop
```

Reset data directory
```
lukso network clear
```

Remove previous images
```
docker system prune --all --force --volumes
```
Delete lukso testnet directory
```
cd .. && rm -rf ./lukso-l16-testnet
```

After trying out the proposed solution, re-run your node setup from the start.

 
## FAQ

You can find the FAQ about the L16 testnet [here](http://docs.lukso.tech/faq/network/).

