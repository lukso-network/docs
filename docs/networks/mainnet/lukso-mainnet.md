# Running a LUKSO node

To be part of LUKSO's network as a validator one should understand the concept of staking.
Staking is the process of creating and maintaining one (or more) of these validators to help the network maintain the consistency and security of the LUKSO blockchain.

To earn staking rewards for the LUKSO network, the job is straightforward, but crucially important: run validators with the highest quality possible, and maximize staking rewards.

Node operators are responsible for:

- Setting up a computer (either physical or virtual)
- Configuring it correctly, including their home network if applicable
- Installing the LUKSO cli to perform validation
- Securing it, both from outside and inside threats
- Maintaining it for the life of their validators

It's a big responsibility, and not a simple set-it-and-forget-it kind of job; you need to care for your node for as long as it's staking.

## A Proof of Stake Chain

Staking 32LYXe in Proof of Stake is done via validators. A validator is essentially a single [Beacon Chain](https://ethereum.org/en/upgrades/beacon-chain/) address to which 32LYXe is deposited on the Execution layer. Validators are responsible for maintaining the consistency and security of the Beacon Chain. They do this by listening for transactions and new block proposals and attesting that the proposed block contains legal, valid transactions by doing some number crunching and verification behind the scenes. Occasionally, they get to propose new blocks themselves.

Validators are assigned attestations and block proposals on a randomized schedule. This is very different from the old Proof of Work system, where everyone was constantly trying to race each other and come up with the next block before everyone else. This means that unlike Proof of Work where miners weren't guaranteed to earn a block reward unless they found the next block, Proof of Stake validators are guaranteed to have slow, steady income as long as they perform their duties. If a validator is offline and misses an attestation or a block proposal, it will be slightly penalized. The penalties are quite small though; as a rule of thumb, if a validator is offline for X hours, it will make all of its lost LYXe back after the same X hours of being back online.

## LUKSO's Node Requirements

Here is what you will need to run a LUKSO node :

- A stable Internet connection. The longer you stay online, the better your rewards. A spotty Internet connection will hurt your returns, and by extension, the LYX ratio growth.
- At least 10Mbps of bandwidth both up and down. A LUKSO node usually takes around 8Mbps to 10Mbps up & down of network traffic, depending on your configuration and number of nodes you decide to run.
- No data cap imposed by your ISP. It is not suggest to run a node if your Internet plan comes with a monthly data cap.
- Stable electricity. For the same reason as needing a stable Internet connection, you also want to have reliable power. This can be mitigated with a large UPS (backup battery) to deal with short blackouts.
- A computer or Virtual Machine with sufficient specs. The computer can be a local machine, or it can be a Virtual Private Server (VPS) hosted in the cloud.

The following specifications are considered minimum requirements:

Linux or macOS Operating System

- Quad core CPU (or dual-core hyperthreaded); both `x64` and `arm64` are supported
- 8 GB of RAM (preferably DDR4); Typical configurations tend to use 16 or 32 GB of RAM
- 1 TB of free SSD Disk Space
- A spinning platter hard drive is generally not fast enough to handle the constant random reads and writes that blockchain activity requires; you MUST use a solid state drive.

## Installing the LUKSO CLI

The LUKSO CLI serves the following purposes:

- easy installation of all node types (All installations are done directly into `/bin/`, and you will not need any docker container)
- easy start and stopping of local nodes (Since LUKSO will run as a daemon)
- easy access to nodes logs

We abstracted all the complicated steps to onboard new validators as easy as possible. The process is fast and with only a few command lines you can get started.

Here are the steps:

### Install Dependencies

1. [curl](https://curl.se/)

#### Install curl

```sh
sudo apt-get -y update
sudo apt-get -y install curl
```

#### Install LUKSO

On a Linux or MacOS open the terminal and copy the following line of code to install the LUKSO client

```sh
curl https://install.lukso.network | sudo bash
```

![Step 1 - Download & Install](/img/network/01-validator-download.png)

Running this `sudo` command line will ask you to type in your User password.

```sh
lukso install
```

Will prompt you a message to agree with the LUKSO Terms & Conditions, Prysmatic Labs [Terms of Service](https://github.com/prysmaticlabs/prysm/blob/develop/TERMS_OF_SERVICE.md), simply press `Y` (as a capital "Y") to agree with the Terms.

This process will run all the binaries for you and install the Geth Client (your Execution client); the Prysm client (the beacon chain or consensus client) and also the Validator.

For a granular installation of specific clients, an advanced user can also run

```sh
lukso install prysm
```

To install ONLY the prysm client or

```sh
lukso install lighthouse
```

To install ONLY the lighthouse client

And this will prompt you to the following message:
...
You have already {clientName} {currentVersion} installed, LUKSO requires at least {requiredVersion},
Do you want to override your installation:
Y/n?

You can also install LUKSO approving any Terms & Conditions by default with this command line:

```sh
lukso install --agree-terms
```

Once you download and install the lukso network, please create a directory by typing:

```sh
mkdir myLUKSOFolder
```

and enter the directory:

```sh
cd ./myLUKSOFolder
```

And once you're inside your LUKSO Folder`./myLUKSOFolder/$` you can initiate the node by typing:

```sh
lukso init
```

Lukso init, as the name says, initiates your node. Under the hood it will be creating directories and storing the data accordingly. It will also download all the network configurations [from LUKSO's Github repo](https://github.com/lukso-network/network-configs) to your local "myLUKSOMainnetFolder/configs" folder.

We ask you to please NOT overwrite any of the existing config folders, data or keystore folders. ~~Unless you're an experienced node operator~~.

## Generating your Validator Keys

To become a validator you'll need to know about managing keys and protecting a mnemonic. Note that during this process you will not derive the keys needed to withdraw later, so store your mnemonic safely in order to be able to withdraw later.
We'll help you create a signing key for every validator you want to run.
Your mnemonic is the backup for your signing keys and will be the ONLY way to withdraw your LYX when the time comes and no one can help you recover your mnemonic if you lose it.

To generate your keys, we created this easy launchpad, please visit the following link and follow the instructions there:

<--! TODO: Link to the launchpad goes here-->

### Key Generation via CLI

We also provide a Command Line tool for you and strongly suggest that you do it in an air-gapped computer and store your keys safely.

The program generates a set of validator keys as .json files which you will then need to deposit to run your validator.

- Step 1: In this link: [https://github.com/lukso-network/tools-key-gen-cli/releases/](https://github.com/lukso-network/tools-key-gen-cli/releases/) please download the latest version of the Linux / macOS version of the LUKSO CLI to your computer

#### Linux-amd64

```sh
curl -O https://github.com/lukso-network/tools-key-gen-cli/releases/download/v2.4.7/lukso-key-gen-cli-v2.4.7-linux-amd64.tar.gz
```

#### macOS-amd64

```sh
curl -O https://github.com/lukso-network/tools-key-gen-cli/releases/download/v2.4.7/lukso-key-gen-cli-v2.4.7-macos-amd64.tar.gz
```

#### Windows-amd64

```sh
curl -O https://github.com/lukso-network/tools-key-gen-cli/releases/download/v2.4.7/lukso-key-gen-cli-v2.4.7-windows-amd64.tar.gz
```

<--! TODO: Get the proper link to the KeyGen deposit-->

This CLI is pretty straightforward and allows only 2 types of commands: an existing-mnemonic (in case you already have one and would only need to regenerate the .json file with your keys) or a new-mnemonic, which generates a brand new set of keys to your validator.

After downloading and installing the tool, you should be able to find it at:

```
/usr/local/bin/lukso-keygen
```

#### Generating a NEW mnemonic:

Simply type:

```sh
lukso-keygen new-mnemonic
```

and follow the instructions (for English, press the "ENTER" key twice):
chose the number of validators you want to run:
chose the network/chain name: 'lukso', 'l16', 'l2022'
[lukso]: l2022
create & retype a strong password

And finally you will have your mnemonic (12 keywords written in English, or any other language you selected before).

Please copy/paste them; write them down, store them on a safe place.

You will be asked to re-type each of those 12 words in order; until you see a Rhino ASCII art drawing.

#### Generating a key from an EXISTING mnemonic:

It might be that you already have a set of 12 words that you want to use to generate the Keys again.

In this case:

```sh
lukso-keygen existing-mnemonic --eth1_withdrawal_address <0xADDRESS_YOU_HAVE>
```

and follow the instructions.

Your keys will be stored in the directory:

```
/Users/username/validator_keys
```

### Key Generation CLI with Docker

Running the following command will allow you to install and generate a new set of keys using docker

```sh
 docker run -it -v $(pwd)/validator_keys:/app/validator_keys --rm europe-docker.pkg.dev/lks-lz-artifacts/docker-key-gen-cli/lukso-key-gen-cli new-mnemonic --help
```
