---
sidebar_position: 2
---

# Start your L16 node

## Create a directory

 ```
 mkdir lukso-l16-testnet 
 ```
 ### navigate to it in your terminal by using the `cd` command
 ```bash
 cd lukso-l16-testnet
 ```

 ## Install the LUKSO Command Line Interface (CLI)
 ```
 sudo curl https://raw.githubusercontent.com/lukso-network/lukso-cli/main/install.sh | sudo bash
 ```

 The script will download the LUKSO CLI into the directory.

 ### Check your LUKSO CLI version

 ```
 lukso -v
 ```

 The output has to be v.0.4.0 or higher.

 ## Initialize the network

 ```
 lukso network init --chain l16
 ```

 The CLI will ask you to setup your node name.

 ### Change your node name

 If you want to change your node name you can do this in the file `node_config.yaml`

 ```
 sudo nano node_config.yaml
 ```

 Change your node name close it with `ctrl+X` and save it.

 ## Start your node

 You can start your node with

 ```
 lukso network start
 ```

 ### Check your node

 Wait 10 minutes and check if your node is syncing on this stats page:

 - [https://stats.execution.l16.lukso.network](https://stats.execution.l16.lukso.network)

 You can also check your [logs](./l16-logs.md).

 ## Need help?

 Ask your question in the validators channel on the [official LUKSO Discord server](https://discord.gg/u7cmyUyw8F)