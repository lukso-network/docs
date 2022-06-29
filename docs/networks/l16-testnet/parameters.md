---
title: "Network parameters"
sidebar_position: 1
---

# L16 Public Testnet
 

:::info Network values DO NOT represent the final mainnet values
Values and configuration parameters for this network, as well as suggested hardware specs, DO NOT represent the final values for the LUKSO mainnet. Those will be announced shortly before mainnet launch.
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
You can find a community guide about how to setup your Grafana dashboard on Linux [here](https://luksoverse.io/2022/06/system-and-monitor-setup-guide-by-volodymyr-lykhonis/)
:::

## System Requirements

### Minimum System Requirements

| Settings            | Value          |
| ------------------- | -------------- |
| Operating System    | Linux or MacOS |
| Number of CPU cores | 2              |
| RAM                 | 16 GB          |
| SSD                 | 100 GB         |

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

## Setting up MetaMask

| Setting                      | Value                                           |
| ---------------------------- | ----------------------------------------------- |
| Network Name                 | L16                                             |
| New RPC URL                  | https://rpc.l16.lukso.network                   |
| Chain ID                     | 2828 (0xB0C)                                    |
| Currency Symbol              | LYXt                                            |
| Execution Block Explorer URL | <https://explorer.execution.l16.lukso.network>  |


**[here is a tutorial on how to add a network to MetaMask.](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC)**
 
## FAQ

You can find the FAQ about the L16 testnet [here](http://docs.lukso.tech/faq/network/).

