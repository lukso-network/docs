---
sidebar_position: 2
---

# L16 Public Testnet

| Setting                      | Value                                                                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Network Name                 | L16 Beta                                                                                                                                                                  |
| New RPC URL                  | https://rpc.beta.l16.lukso.network                                                                                                                                        |
| Chain ID                     | 19051978 (0x122B5CA)                                                                                                                                                      |
| Currency Symbol              | LYXt                                                                                                                                                                      |
| Execution Block Explorer URL | [https://ethstats.l16.d.lukso.dev](https://ethstats.l16.d.lukso.dev) |
| Consensus Block Explorer URL | [https://consensus.stats.beta.l16.lukso.network](https://consensus.stats.beta.l16.lukso.network)                                                                          |

## Running the nodes

### Installing dependencies

Prepare your environment. You need:

1. Docker ([How to install docker](https://docs.docker.com/get-docker/))
2. [Docker Compose](https://docs.docker.com/compose/)
3. [curl](https://macappstore.org/curl/)
4. wget (linux users only)
5. Make
6. [jq](https://stedolan.github.io/jq/)

```bash title="Example script for installing docker"
# install dependencies
sudo apt-get -y update
sudo apt-get -y install make curl wget jq

# install docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

### Installing the nodes

```bash
mkdir lukso-l16-testnet && cd lukso-l16-testnet
curl https://raw.githubusercontent.com/lukso-network/network-configs/l16-dev/l16/network_setup_kit/install.sh | bash
```

This will download `docker-compose.yaml`, `Makefile`, `configs` and `.env` files.

### Change node name (Optional)
1. open docker file using any text editor. for example vim
```bash
vim .env
```
2. Change `NODE_NAME` to your expected string

# change 
```

### Starting the nodes

```bash
# Start your nodes
make start

# You can check logs with
make log_execution
make log_consensus

# Stop your nodes
make stop

# If your nodes are stopped, you could reset them using
# Reset clears the database, which forces your node to sync again on start
make reset
```

### Check the network status

You can see you node in the following page:

1. [https://ethstats.l16.d.lukso.dev/](https://ethstats.l16.d.lukso.dev/)
2. [https://consensus.stats.beta.l16.lukso.network](https://consensus.stats.beta.l16.lukso.network)

## How to become A Validator

### Request some test tokens: LYXt

Make sure to install [MetaMask](https://metamask.io/).

To add the L16 Beta Network to [MetaMask](https://metamask.io/) you can follow this tutorial: [https://blog.suhailkakar.com/add-custom-networks-to-metamask](https://blog.suhailkakar.com/add-custom-networks-to-metamask)

**Use the following parameters:**

| Setting            | Value                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| Network Name       | L16 Beta                                                                                              |
| New RPC URL        | [https://rpc.beta.l16.lukso.network](https://rpc.beta.l16.lukso.network)                              |
| Chain ID           | 19051978 (0x122B5CA)                                                                                  |
| Currency Symbol    | LYXt                                                                                                  |
| Block Explorer URL | [https://consensus.stats.beta.l16.lukso.network](https://consensus.stats.beta.l16.lukso.network)      |

Then select `L16 Beta` from the dropdown

![Screenshot_2022-03-10_at_18.44.25.png](./static/l16/Screenshot_2022-03-10_at_18.44.25.png)

Copy address to the clipboard using the box icon

![Screenshot_2022-03-10_at_18.55.26.png](./static/l16/Screenshot_2022-03-10_at_18.55.26.png)

Go to [https://faucet.beta.l16.lukso.network](https://faucet.beta.l16.lukso.network)

Paste the copied address to the box and press “Request 35 LYX”

![Screenshot 2022-03-10 at 7.50.10 PM.png](./static/l16/Screenshot_2022-03-10_at_7.50.10_PM.png)

Wait for 1 minute and check balance in your MetaMask. You should have received 35 LYX.

### Create Wallet and Deposit data

First generate a validator mnemonic seed phrase. **This mnemonic seed generates your validator private key, store it in a safe location.**

You will need this mnemonic to create your validator address and deposit data. If you want to generate a separate withdrawal mnemonic then generate another mnemonic using the same command and copy both of the mnemonics in a safe place.

```bash
make mnemonic
```

Generate a wallet using the following command. It will ask for the number of validators, validator-mnemonic (generated using above command) and a keystore password.

```bash
make create-wallet

# a directory named keystore will be created
```

Generate a `deposit-data.json` using the following command. It will ask for the number of validators, validator mnemonic and withdrawal mnemonic.

```bash
make create-deposit
```

You will find `deposit-data.json` file inside your current directory.

### Submitting your deposit transaction

#### Get your address and private key from MetaMask

Open MetaMask and click on the 3 dot menu on the right side and select `Account details`

![Screenshot_2022-03-10_at_18.55.45.png](./static/l16/Screenshot_2022-03-10_at_18.55.45.png)

Click on Export Private Key and copy it into the clipboard

![Screenshot_2022-03-10_at_18.55.58.png](./static/l16/Screenshot_2022-03-10_at_18.55.58.png)

#### Update secrects.env and submit transactions

Update `secrets.env` using the public address and private key from MetaMask

```bash
ETH1_FROM_ADDR=YOUR_PUBLIC_KEY
ETH1_FROM_PRIV=YOUR_PRIVATE_KEY
```

Submit transactions, this will send the transaction.

```bash
# submit deposit
make submit-deposit

# wait 8h till validator is activated
```

You will need to wait for 8 hours to activate your validator

### Run the validator client

Once your validator is activated you spin up a validator client. **Make sure your _consensus_ and _execution_ clients are running (running `make start`).**

```bash
make start-validator

# You can check logs with
make log_validator

# You can stop the validator using, this will also stop all other nodes
make stop
```

# Troubleshooting in LUKSO Beta Testnet

### 1. Permission denied while spinning up the node
**Context**: While running `make start` you are getting permission related issues. You can have log like this:
```
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json": dial unix /var/run/docker.sock: connect: permission denied "docker kill" requires at least 1 argument. See 'docker kill --hel
```
**Proposed Solution:** try running make command as `super user`. For example: `sudo make start`

### 2. Consensus (prysm) not syncing and Execution (geth) stops syncing after a few blocks
**Context**: You found your consensus client has no peer and execution engine stops syncing after a few blocks
**Proposed Solution:**
1. Open `.env` file using any text editor. For `vim` the command will be `vim .env`
2. Change `PRYSM_BOOTSTRAP_NODE` to this `PRYSM_BOOTSTRAP_NODE=enr:-MK4QACsMyCBqoH7E2xTFMyVKd0wbaOEoff6q_N1Vx_HVZuVYBk1JoB5Ava9h6eBlS5XzxM5LHFI1BG1IchMdI6JMhWGAX8tHtE1h2F0dG5ldHOIAAAAAAAAAACEZXRoMpC3QoawYgAAcf__________gmlkgnY0gmlwhCJbPjCJc2VjcDI1NmsxoQJp3RTwCXObnrJNuiJlLaM4LlhYOaWXhtj4Hz3PW9sfgYhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A`
3. restart the node using: `sudo make stop && sudo make start`

### 3. For Ubuntu 20.04 LTS you get unmarshal related issue:
**Context:**  Check your execution log by `sudo make log_execution`. If you find this:
```
log_execution: err="peer connected on snap without compatible eth support" log_consensus: level=error msg="Could not connect to powchain endpoint: could not dial eth1 nodes: json: cannot unmarshal string into Go struct field SyncProgress.CurrentBlock of type uint64" prefix=powchain
```
**Proposed solution**:
```
# stop docker containser
sudo make stop
# reset data directory
sudo make reset
# remove previous images
docker system prune --all --force --volumes
# delete lukso testnet directory
cd .. && rm -rf ./lukso-l16-testnet
```
Then follow the doc and re-run everything from the start.


# FAQ:
### 1. What ports are needed for LUKSO Beta testnet?
The following ports and protocols are needed to be opened for the outside world.
```
tcp:30303
tcp:8545 
tcp:8598 
tcp:8080 
tcp:3500 
tcp:4000 
tcp:13000 
udp:12000
```

