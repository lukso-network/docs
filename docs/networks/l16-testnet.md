---
sidebar_position: 2
---

# L16 BETA Public Testnet
 

The L16 Public Testnet will be the last stable test network before the mainnet launch and will likely stay online in parallel for experimental purposes.

# MetaMask

| Setting                      | Value                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| Network Name                 | L16 Beta                                                                                         |
| New RPC URL                  | https://rpc.beta.l16.lukso.network                                                               |
| Chain ID                     | 83748374 (0x4FDE616)                                                                             |
| Currency Symbol              | LYXt                                                                                             |
| Execution Block Explorer URL | [https://explorer.execution.beta.l16.lukso.network/](https://explorer.execution.beta.l16.lukso.network/) |


And if you need it, [here is a tutorial on how to do it](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC).

# Bootnodes

| Bootnode                      | Client                                                                                            | Value |
| ---------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------ | 
|  0 | Beacon | ```enr:-MK4QB9Pb2N51TJu-TedIB39P0grbfuwfys5QW0kF9FQckJFOpKPjh6ZMvDhcveCUvTUyJo69nna5_5Tvj3UBBz1aP2GAYEfjuRyh2F0dG5ldHOIAAAAAAAAAACEZXRoMpCBQMXLYgAAcf__________gmlkgnY0gmlwhCJaVcaJc2VjcDI1NmsxoQP_B8QAGQYUE54VXvW8FgDQsMAywUaN_5prNKaCsyKy0YhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A``` |
|   | Geth | ```enode://c2bb19ce658cfdf1fecb45da599ee6c7bf36e5292efb3fb61303a0b2cd07f96c20ac9b376a464d687ac456675a2e4a44aec39a0509bcb4b6d8221eedec25aca2@34.90.85.198:30303``` |
|  1 | Beacon | ```enr:-MK4QJo42M9Bz7N1E1qs7qHoV9b-Njrlb4BFf1qhWb5UbXLbJ7wbP0Mnt4O3mPE5KL-fCvrIlquNX-gP1-Con9xzAHSGAYEfluVHh2F0dG5ldHOIAAAAAAAAAACEZXRoMpCBQMXLYgAAcf__________gmlkgnY0gmlwhCJbpv2Jc2VjcDI1NmsxoQIxp1iQzAfZwgbNFZIEbn5LaH6GiNXakLRt4dt-5QrE8YhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A``` |
|   | Geth | ```enode://88bbdfe4810bb1f6b9f6b9ed211c04a79ffcdc254ac408b3413188b914dbc4859bb635276453a1fe78c615492067433a63ccd71679e7bd43aa3b93c6fc6ac404@34.91.166.253:30303``` |
|  2 | Beacon | ```enr:-MK4QO-ukWyyudI388FtDcYvnV-MmD96-8j6AikYsvzGzXu3cs0n4tKivxDZv9LvMTSLqccGTRkNuSAGvUsTUkyEO-mGAYEfqfFoh2F0dG5ldHOIAAAAAAAAAACEZXRoMpCBQMXLYgAAcf__________gmlkgnY0gmlwhCJbMxaJc2VjcDI1NmsxoQP_S-793irD3QNuW8_UMwiFfj0Bu_TLAhk3UfqBJ2ZecYhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A``` |
|   | Geth | ```enode://c2bb19ce658cfdf1fecb45da599ee6c7bf36e5292efb3fb61303a0b2cd07f96c20ac9b376a464d687ac456675a2e4a44aec39a0509bcb4b6d8221eedec25aca2@34.91.51.22:30303``` |

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

## Running a Node
 
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

### Installing Dependencies

Prepare your environment. You need:

1. [Docker](https://docs.docker.com/get-docker/)
2. [Docker Compose](https://docs.docker.com/compose/)
3. [curl](https://macappstore.org/curl/) 

```bash title="Example script for installing docker"
# install dependencies
sudo apt-get -y update
sudo apt-get -y install curl

# install docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

### Installing the Node

```bash
mkdir lukso-l16-testnet && cd lukso-l16-testnet
curl https://raw.githubusercontent.com/lukso-network/lukso-cli/main/install.sh | sudo bash
```

The script will download the LUKSO cli into the folder. 
 
```bash
lukso network init --nodeName [NAME_HOW_IT_APPEARS_IN_THE_STATS]
```
 

### Starting the Node

```bash
# Start your nodes
lukso network init

# You can check logs with
lukso network logs consensus
lukso network logs execution

# Stop your nodes
lukso network stop

# If you selected a wrong chain, you could reset the setup. This will delete all related data except the keystores.
# NOTE: the network must be stopped
lukso network clear
```

### Check the Network Status

You can see your node on the following page:


1. [https://stats.execution.beta.l16.lukso.network](https://stats.execution.beta.l16.lukso.network)
2. [https://stats.consensus.beta.l16.lukso.network](https://stats.consensus.beta.l16.lukso.network)

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
Transfer **enough** (#validators x staking_amount + fees) funds to the transaction wallet public's address.
 

#### Submit the transaction.

Make a dry run first

```bash
lukso network validator deposit --dry
```

This will give you the possibility to peek in what is going to happen without executiing a transactions.

If you are sure you hit


```bash
lukso network validator deposit
```


You will need to wait for eight hours to activate your validator.

### Run the Validator Client

You can already start your validator.

**Make sure your _consensus_ and _execution_ clients are running (by typing `./lukso network start`).**

```bash
lukso network validator start

# You can check logs with
lukso network logs validator

# You can stop the validator using, this will also stop all other nodes
lukso network validator stop
```

Occasionally check the status of your validator by either typing

```bash
lukso network validator describe
```

or by visiting the [Explorer](https://explorer.consensus.beta.l16.lukso.network)

## Troubleshooting L16 Beta Testnet

### Bootnodes

You can update Bootnodes with


```bash
lukso network update
```

You need to restart the chain to make the changes effective.
 

### Stalled Synchronization

:::info Context
You found your consensus (prysm) client has no peer and the execution engine (geth) stops syncing after a few blocks.
:::

**Proposed Solution:**

1. Open `node_config.yaml` file using any text editor. For `vim` the command will be `vim node_config.yaml`
2. Change `bootnode` in the `consensus` section to a bootnode in the table on the top.
 

3. Restart the node by typing: `./lukso network stop && ./lukso network start`

### Unmarshalling Error

:::info Context
Check your execution log by `./lukso network log execution`. For Ubuntu 20.04 LTS you may get an unmarshal-related issue like:

```
log_execution: err="peer connected on snap without compatible eth support" log_consensus: level=error msg="Could not connect to powchain endpoint: could not dial eth1 nodes: json: cannot unmarshal string into Go struct field SyncProgress.CurrentBlock of type uint64" prefix=powchain
```

:::

**Proposed Solution:**

```sh
# stop docker container
./lukso network stop
# reset data directory
./lukso network clear
# remove previous images
docker system prune --all --force --volumes
# delete lukso testnet directory
cd .. && rm -rf ./lukso-l16-testnet
```

After trying out the proposed solution, re-run your node setup from the start.

 
