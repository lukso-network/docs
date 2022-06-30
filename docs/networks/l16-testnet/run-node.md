---
title: Run a node
sidebar_position: 2
---

# Run a node

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

| Port  | Protocol | Client           | Ingress               | Comment                                                                                       |
| ----- | -------- | ---------------- | --------------------- | --------------------------------------------------------------------------------------------- |
| 30303 | TCP      | geth syncing     | port must be open     | -                                                                                             |
| 30303 | UDP      | geth discovery   | port must be open     | -                                                                                             |
| 13000 | TCP      | beacon syncing   | port must be open     | -                                                                                             |
| 12000 | UDP      | beacon discovery | port must be open     | -                                                                                             |
| 8545  | TCP      | geth api         | port should be closed | Valuable information are provided but for a validator it is recommended to not open the port. |
| 8080  | UDP      | beacon metrics   | port should be closed | -                                                                                             |
| 3500  | UDP      | beacon api       | port should be closed | Valuable information are provided but for a validator it is recommended to not open the port. |
| 4000  | UDP      | beacon rpc       | port should be closed | -                                                                                             |

## Linux System Setup

_For instructions on setting up a Mac, proceed to the [MacOS System Setup](#macos-system-setup) section._

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

1. [curl](https://curl.se/)
2. [Docker](https://docs.docker.com/get-docker/)
3. [Docker Compose](https://docs.docker.com/compose/)

#### Install curl

```sh
sudo apt-get -y update
sudo apt-get -y install curl
```

#### Install Docker

```sh
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

#### Install Docker Compose

```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

## MacOS System Setup

### Configure Firewall

This section is in the works

:::info
NOTE: Make sure also to configure your router to forward these ports.  
:::
You may follow this community-authored [Port Forwarding](https://github.com/KEEZ-RobG/node-guide/blob/main/PortForward.md) guide.

### Install Dependencies

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

## Install the LUKSO Command Line Interface (CLI)

Create a directory:

```
mkdir lukso-l16-testnet
```

and navigate to it in your terminal by using the `cd` command

```bash
cd lukso-l16-testnet
```

Then, install the [LUKSO CLI](https://github.com/lukso-network/lukso-cli) using the install script:

```sh
sudo curl https://raw.githubusercontent.com/lukso-network/lukso-cli/main/install.sh | sudo bash
```

#### Check your LUKSO CLI version

```
lukso -v
```

The output has to be v.0.4.0 or higher.

## Initialize the network

```sh
lukso network init --chain l16
```

The CLI will ask you to setup your node name.

#### Change your node name

If you want to change your node name you can do this in the file `node_config.yaml`

```sh
sudo nano node_config.yaml
```

Change your node name close it with `ctrl+X` and save it.

## Start your node

You can start your node with:

```sh
lukso network start
```

#### Check your node

Wait 10 minutes and check if your node is syncing on this stats page:

- [https://stats.execution.l16.lukso.network](https://stats.execution.l16.lukso.network)

You can also check your [logs](./l16-logs.md).

## Stop your node

```sh
lukso network stop
```

:::tip Want to run a validator node?
If you want, you are now ready to run validators on your node. Check the tutorial on the [validator](./validator) page.
:::

## Need help?

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/u7cmyUyw8F).
