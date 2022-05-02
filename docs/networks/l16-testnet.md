---
sidebar_position: 2
---

# L16 Public Testnet

:::caution L16-Testnet Beta has ended.
This testnet will soon go live again. Get updates on our [Discord](https://discord.gg/lukso) server.
:::

The L16 Public Testnet will be the last stable test network before the mainnet launch and will likely stay online in parallel for experimental purposes.

# MetaMask

| Setting                      | Value                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| Network Name                 | L16 Beta                                                                                         |
| New RPC URL                  | https://rpc.beta.l16.lukso.network                                                               |
| Chain ID                     | 83748374 (0x4FDE616)                                                                             |
| Currency Symbol              | LYXt                                                                                             |
| Execution Block Explorer URL | [https://execution.stats.beta.l16.lukso.network](https://execution.stats.beta.l16.lukso.network) |
| Consensus Block Explorer URL | [https://consensus.stats.beta.l16.lukso.network](https://consensus.stats.beta.l16.lukso.network) |

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


1. [https://execution.stats.beta.l16.lukso.network](https://execution.stats.beta.l16.lukso.network)
2. [https://consensus.stats.beta.l16.lukso.network](https://consensus.stats.beta.l16.lukso.network)

## Become a Validator

### Request LYXt Tokens:

1. Make sure to install [MetaMask](https://metamask.io/).

2. Add the L16 Beta Testnet to [MetaMask](https://metamask.io/), by following [this tutorial](https://blog.suhailkakar.com/add-custom-networks-to-metamask).
3. Use the MetaMask parameters from above and select `L16 Beta` from the dropdown.
4. Copy your MetaMask address to the clipboard using the box icon.
5. Visit the [L16 Faucet](https://faucet.beta.l16.lukso.network), paste the copied address and request your test tokens.
6. Wait for the transaction to go through and check the balance in your MetaMask. You should have received 35 LYX.

### Create a Wallet

First, generate a validator mnemonic seed phrase. **This mnemonic seed phrase generates your validator's private key. Store it in a safe location.**

You will need this mnemonic to create your validator address and deposit data. If you want to generate a separate withdrawal mnemonic. Generate another mnemonic using the same command and copy both of the mnemonics in a safe place.

NOTE: The directory keystore must be empty.

```bash
./lukso network validator setup
``` 

This command will create a directory named `keystore`.

### Deposit the Validator Data

Generate a `deposit-data.json` using the following command. It will ask for the number of validators, validator mnemonic, and withdrawal mnemonic.

```bash
make create-deposit
```

You will find the `deposit-data.json` file inside your current directory.

### Submit the Deposit Transaction

#### Get your Address and Private Key from MetaMask

1. Open MetaMask and click on the three dots menu on the right side and select `Account details.`
2. Click on Export Private Key and copy it into the clipboard.

#### Update Secrets and submit Transaction

Update `secrets.env` using the public address and private key from MetaMask.

```bash
ETH1_FROM_ADDR=YOUR_WALLET_ADDRESS
ETH1_FROM_PRIV=YOUR_PRIVATE_KEY
```

#### Send the transaction.

```bash
# submit deposit
make submit-deposit

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

### Denied Permission

:::info Context
While running `./lukso network start` you are getting permission-related issues. You can have a log like this:

```
Permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json": dial unix /var/run/docker.sock: connect: permission denied "docker kill" requires at least 1 argument. See `docker kill --help`
```

:::

**Proposed Solution:** Try running the `make` command as super user by using `sudo make start`.

### Stalled Synchronization

:::info Context
You found your consensus (prysm) client has no peer and the execution engine (geth) stops syncing after a few blocks.
:::

**Proposed Solution:**

1. Open `.env` file using any text editor. For `vim` the command will be `vim .env`
2. Change `PRYSM_BOOTSTRAP_NODE` to this

```
PRYSM_BOOTSTRAP_NODE=enr:-MK4QACsMyCBqoH7E2xTFMyVKd0wbaOEoff6q_N1Vx_HVZuVYBk1JoB5Ava9h6eBlS5XzxM5LHFI1BG1IchMdI6JMhWGAX8tHtE1h2F0dG5ldHOIAAAAAAAAAACEZXRoMpC3QoawYgAAcf__________gmlkgnY0gmlwhCJbPjCJc2VjcDI1NmsxoQJp3RTwCXObnrJNuiJlLaM4LlhYOaWXhtj4Hz3PW9sfgYhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A
```

3. Restart the node by typing: `sudo make stop && sudo make start`

### Unmarshalling Error

:::info Context
Check your execution log by `sudo make log_execution`. For Ubuntu 20.04 LTS you may get an unmarshal-related issue like:

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
