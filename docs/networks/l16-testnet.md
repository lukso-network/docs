---
sidebar_position: 2
---

# L16 Public Testnet
 

The L16 Public Testnet will be the last stable test network before the mainnet launch and will likely stay online in parallel for experimental purposes.

# MetaMask

| Setting                      | Value                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| Network Name                 | L16 Beta                                                                                         |
| New RPC URL                  | https://rpc.beta.l16.lukso.network                                                               |
| Chain ID                     | 83748374 (0x4FDE616)                                                                             |
| Currency Symbol              | LYXt                                                                                             |
| Execution Block Explorer URL | [https://stats.execution.beta.l16.lukso.network](https://stats.execution.beta.l16.lukso.network) |
| Consensus Block Explorer URL | [https://stats.consensus.beta.l16.lukso.network](https://stats.consensus.beta.l16.lukso.network) |


# Bootnodes

| Bootnode                      | Client                                                                                            | Value |
| ---------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------ | 
|  0 | Beacon | ```enr:-MK4QD8FkG2sIP1TGscBlgHyscwDySAN8EoT4m5IKBFNY04nQOTZMvGpAqYhXrtT0wqhngnpkS2E1C_qO54JbdSajsSGAYC4KBLkh2F0dG5ldHOIAAAAAAAAAACEZXRoMpCBQMXLYgAAcf__________gmlkgnY0gmlwhCJaVcaJc2VjcDI1NmsxoQO_eYR-N9Z-Ad_ki-PLYAyUMQ-s1od8zUo59osUBEOwmIhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A``` |
|   | Geth | ```enode://8f2d010f18233b205609c8f2e78c56a1911e04f9113aa2dce5ccb61cfbb09956c7dbce47a93ca9c35b82f2493398447fdbae1db097bd26476220454b7cea392d@34.90.85.198:30303``` |
|  1 | Beacon |```enr:-MK4QJNG7HrFhqNTLZOOjNS_O4X2c6B4xjMG921TjtLsdHGfOLPaJBh-TKQCM-h_s6K3XEIdB_PEFDAHrriLxSDja92GAYCyCocIh2F0dG5ldHOIAAAAAAAAAACEZXRoMpCBQMXLYgAAcf__________gmlkgnY0gmlwhCJbpv2Jc2VjcDI1NmsxoQIxYwcPw9L7_25e53hmJssY53fAyr48vZCxzdgD5CgNqIhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A```|
|  | Geth | ```enode://e4dd2a73cd9d2c46d429e8205537f168c3a890e3b9ad073c45c40deb062bc738a5248c654d72c6a3115a9fa68b9140842de1dc6a8a269ece118fb954626ab104@34.91.166.253:30303```|
|  2 | Beacon |```enr:-MK4QP2gSGuSB1YtRLhNRdx9PT3ttKih6TtXPuKUILE79jN4Ti1-FT54KcHH3MrvF7KTfgzN0BG062RCKmlk9xkVa7WGAYC4I9iVh2F0dG5ldHOIAAAAAAAAAACEZXRoMpCBQMXLYgAAcf__________gmlkgnY0gmlwhCJbMxaJc2VjcDI1NmsxoQNiwNrzDkDeTLxEF36JAwE5icN5FCK0WrgFEitt1mBDmIhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A```|
|  | Geth | ```enode://5f894de652134f2cf4be259b6bb8d74352913e3854cd5b5efb326474f94b4c6366a402e9493e26922e5ffc53a7f6ff6e34e76e99161c2999c9e3e1eaa34751e6@34.91.51.22:30303```|


And if you need it, [here is a tutorial on how to do it](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC).

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
curl https://raw.githubusercontent.com/lukso-network/lukso-cli/main/cli_downloader.sh | bash
```

The script will download the LUKSO cli into the folder. You can put into your PATH var or execute it directly. Initialise the the network with
 
```bash
./lukso network init
```

### Naming the Node

**Optional:** If you want change your node's name, you need to edit the `name` variable in the `node_config.yaml` file to update your node name. You can find it under the top level key `node` and you can edit it with vim:

```bash
vim .env
```

If your node is already running, you will need to restart it to apply the changes.

### Starting the Node

```bash
# Start your nodes
./lukso network init

# You can check logs with
./lukso network logs consensus
./lukso network logs execution

# Stop your nodes
./lukso network stop

# If your nodes are stopped, you could reset them using
# Reset clears the database, which forces your node to sync again on start
./lukso network clear
```

### Check the Network Status

You can see your node on the following page:


1. [https://stats.execution.beta.l16.lukso.network](https://stats.execution.beta.l16.lukso.network)
2. [https://stats.consensus.beta.l16.lukso.network](https://stats.consensus.beta.l16.lukso.network)

## Become a Validator

### Request LYXt Tokens:

1. Make sure to install [MetaMask](https://metamask.io/).

2. Add the L16 Beta Testnet to [MetaMask](https://metamask.io/), by following [this tutorial](https://blog.suhailkakar.com/add-custom-networks-to-metamask).
3. Use the MetaMask parameters from above and select `L16 Beta` from the dropdown.
4. Copy your MetaMask address to the clipboard using the box icon.
5. Visit the [L16 Faucet](https://faucet.beta.l16.lukso.network), paste the copied address and request your test tokens.
6. Wait for the transaction to go through and check the balance in your MetaMask. You should have received 35 LYX.

### Create a Wallet

THIS SECTION IS BEING RE DONE 

### Submit the Deposit Transaction

#### Get your Address and Private Key from MetaMask

1. Open MetaMask and click on the three dots menu on the right side and select `Account details.`
2. Click on Export Private Key and copy it into the clipboard.

#### Update Secrets and submit Transaction

THIS SECTION IS BEING RE DONE 

#### Send the transaction.

```bash
# submit deposit
./lukso network validator deposit

# wait 8h till validator is activated
```

You will need to wait for eight hours to activate your validator.

### Run the Validator Client

Once your validator is activated, you spin up a validator client.

**Make sure your _consensus_ and _execution_ clients are running (by typing `./lukso network start`).**

```bash
./lukso network start validator

# You can check logs with
./lukso network logs validator

# You can stop the validator using, this will also stop all other nodes
./lukso network stop
```

## Troubleshooting L16 Beta Testnet
 

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
# stop docker containser
./lukso network stop
# reset data directory
./lukso network clear
# remove previous images
docker system prune --all --force --volumes
# delete lukso testnet directory
cd .. && rm -rf ./lukso-l16-testnet
```

After trying out the proposed solution, re-run your node setup from the start.

## FAQ

### What ports must be open on a node?

It would be best if you opened the following ports and protocols in the network to run your node correctly.

```
tcp:30303
tcp:8545
tcp:8598
tcp:8080
tcp:3500
tcp:4000
tcp:13000
udp:12000
udp:30303
```
