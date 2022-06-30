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
| Chain ID  / Network ID       | 2828 (0xB0C)                                  |
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

| Settings            | Value          |
| ------------------- | -------------- |
| Operating System    | Linux or MacOS |
| Number of CPU cores | 2              |
| RAM                 | 16 GB          |
| SSD                 | 100 GB         |

:::info
Apple's new M1 chips are not supported natively by our node client. However, you can follow [this guide](https://medium.com/@luki3k5/running-lukso-node-on-m1-mac-acf92d433a38) to run it by using Rosetta, Apple's built-in emulation software.
:::
 
## Ports


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

## MetaMask Setup

| Setting                      | Value                                           |
| ---------------------------- | ----------------------------------------------- |
| Network Name                 | L16                                             |
| New RPC URL                  | https://rpc.l16.lukso.network                   |
| Chain ID                     | 2828 (0xB0C)                                    |
| Currency Symbol              | LYXt                                            |
| Execution Block Explorer URL | <https://explorer.execution.l16.lukso.network>  |

**[here is a tutorial on how to add a network to MetaMask.](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC)**

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



## Install Dependencies

1. [curl](https://macappstore.org/curl/) 
2. [Docker](https://docs.docker.com/get-docker/)
3. [Docker Compose](https://docs.docker.com/compose/)

### Install curl
```
sudo apt-get -y update
sudo apt-get -y install curl
```

## Install Docker
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Install Docker Compose
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

## Mac System Setup
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

### Install Homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Install Curl
```
sudo brew install curl
```

## Install Docker Desktop for Mac

Go to https://docs.docker.com/desktop/mac/install/ and install the application. 
You do not have to install Docker Compose separately.
