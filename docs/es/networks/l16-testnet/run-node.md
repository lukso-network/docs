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

| Port  | Protocol | Client           | Description       |
| ----- | -------- | ---------------- | ----------------- |
| 30303 | TCP      | geth syncing     | port must be open |
| 30303 | UDP      | geth discovery   | port must be open |
| 13000 | TCP      | beacon syncing   | port must be open |
| 12000 | UDP      | beacon discovery | port must be open |

## Linux System Setup

_For instructions on setting up a Mac, proceed to the [MacOS System Setup](#macos-system-setup) section._

### Configure Firewall

Deny all incoming traffic by default

```sh
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Allow traffic for the ports listed above.

```sh
sudo ufw allow 30303/tcp
sudo ufw allow 30303/udp
sudo ufw allow 13000/tcp
sudo ufw allow 12000/udp
```

You can forward extra ports, by using the following command:

```sh
sudo ufw allow [replace_with_your_ssh_port]/tcp/udp
```

This can be useful for setting up you ssh connection or monitoring.

Enable firewall

```sh
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

This section is in the works

:::

### Install Dependencies

1. [Homebrew package manager](https://brew.sh)
2. [curl](https://macappstore.org/curl/)
3. [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)

#### Install Homebrew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Install Curl

```sh
brew install curl
```

#### Install Docker Desktop for Mac

Go to https://docs.docker.com/desktop/mac/install/ and install the application.
You do not have to install Docker Compose separately.

:::info
Open the Docker Desktop application after installing from the applications folder on your Mac
:::

## Install the LUKSO Command Line Interface (CLI)

Create a directory:

```sh
mkdir lukso-l16-testnet
```

and navigate to it in your terminal by using the `cd` command

```sh
cd lukso-l16-testnet
```

Then, install the [LUKSO CLI](https://github.com/lukso-network/lukso-cli) using the install script:

```sh
sudo curl https://install.l16.lukso.network | sudo bash
```

#### Check your LUKSO CLI version

```sh
lukso -v
```

The output has to be v.0.4.3 or higher.

## Initialize the network

```sh
sudo lukso network init --chain l16
```

The CLI will ask you to setup your node name.

## Start your node

You can start your node with:

```sh
sudo lukso network start
```

#### Check your node

Wait 1 hour and check if your node has synced on this stats page:

- [https://stats.execution.l16.lukso.network](https://stats.execution.l16.lukso.network)

Immediately after starting your node you can check the syncing process in your [logs](./logs-stats-monitoring.md).

## Stop your node

```sh
sudo lukso network stop
```

:::tip Want to run a validator node?

If you want, you are now ready to run validators on your node. Check the tutorial on the [validator](./become-validator.md) page.

:::

## Need help?

Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/u7cmyUyw8F).
