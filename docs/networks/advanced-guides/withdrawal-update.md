import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Validator Withdrawals

The following guide will teach you how to update your plain **BLS Validator Key** to reference an **ETH1 Address** to allow your validator keys to withdraw staked LYX/LYXt and earnings. If an ETH1 Address is referenced to the BLS Key, the validator's stake can be exited to any wallet. The earnings of your validators will be automatically withdrawn regularly.

:::info Key Generation

The [LUKSO KeyGen GUI](https://github.com/lukso-network/tools-wagyu-key-gen#lukso-wagyu-keygen) automatically adds a withdrawal address during setup.

:::

- **BLS Keys** are the backbone of the digital signature type to secure the **PoS Consensus Layer** of EVM blockchains. Every validator uses them to sign blocks and stake LYX/LYXt on the LUKSO networks.
- **ETH1 Addresses** are the traditional Ethereum addresses from _Externally Owned Accounts_ or _Smart Contracts_ on the **Execution Layer** which can receive tokens or coins on the network.

## How to check withdrawals?

If you've never updated your validator withdrawals after the initial deposit, you can check the `deposit_data.json` file of the validator locally. To check if your withdrawals are executed on the network, you can check them using the consensus explorer.

:::tip Withdrawal Activation Time

If you've updated your ETH1 recently, its activation can take up to 48 hours.

:::

<Tabs>
  <TabItem value="local-deposit-check" label="Local Deposit File Check">

<div>

1. Open the `deposit_data.json` file of the validator
2. Search for the `withdrawal_credentials` properties for every key
   - If the hexadecimal number starts with `01`, withdrawals are already enabled
   - If the hexadecimal number starts with `00`, withdrawals are disabled

If your withdrawals are disabled, follow this guide to set a withdrawal address.

</div>

</TabItem>
<TabItem value="consensus-explorer-check" label="Consensus Explorer Check">

<div>

1. Open the deposit file of your validator and copy the `pubkey` element of the specific validator key
2. Search for your validator by entering its public key into the search bar of the related consensus explorer:
   - [LUKSO Mainnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/)
   - [LUKSO Testnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/)
3. View the validator’s details and open the **Withdrawals** section
   - If you see withdrawals, the withdrawal credentials are working correctly
   - If there are no withdrawals, they are still disabled

If you don't see any withdrawals, follow this guide to set a withdrawal address.

</div>

  </TabItem>
</Tabs>

## Prepare Validator Indices

To update your withdrawals, you have to specify the on-chain indices for each of the deposited validator keys. You can get them directly from the node machine or manually check your public keys on the consensus explorer.

<Tabs>
  <TabItem value="index-from-explorer" label="Get Indices Numbers from Explorer">

<div>

1.  Open the deposit file of your validator and copy the `pubkey` element of a validator key.
2.  Search for your validator by entering its public key into the search bar of the related consensus explorer:
    - [LUKSO Mainnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/)
    - [LUKSO Testnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/)
3.  Copy the validator index property

The steps need to be repeated for every validator key.

</div>

  </TabItem>
  <TabItem value="index-from-node" label="Get Indices Numbers from Node">

:::caution

The following properties need to be exchanged:

- `<node-working-directory>` with the actual folder name
- `<network-type>` with `mainnet`, `devnet`, or `testnet`
- `<latest-validator-logs.log>` with the latest validator log file

:::

1. Log into your node’s terminal
2. Move into the logging folder of the node’s working directory.

```bash
cd <node-working-directory>/<network-type>-logs/
```

3. Search and print out all validator indices of the active validator

```bash
cat <latest-validator-logs.log> | grep -o 'index=[0-9]* ' | awk -F'=' '{printf "%s,", $2}' | sed 's/,$//' | tr -d ' '
```

  </TabItem>
</Tabs>
 
Copy the validator indices so they can be used to generate the withdrawal credential later on.

## Start the LUKSO KeyGen CLI

:::caution

The LUKSO KeyGen CLI should only be used on a secure offline device.

You will need to input your **Validator Seed Phrase** again.

:::

1. Download the latest version of the [LUKSO KeyGen CLI](https://github.com/lukso-network/tools-key-gen-cli/releases)
2. Transfer the archive to a secure device.
3. Extract the archive to receive the executable binary file
4. Open the terminal and move into the generated folder

## Generate the Withdrawal Credential

:::tip

If you want to have different withdrawal credentials, the following steps must be repeated multiple times.

:::

:::info

You will need the following information:

- Validator Indices (Previous Step)
- Old Withdrawal Credentials for each Key (Deposit File)
- New ETH1 Withdrawal Address (Generated)

:::

Start the BLS to Execution process from the LUKSO KeyGen CLI

```bash
./lukso-key-gen generate-bls-to-execution-change
```

:::info Index Position

During the setup, you will have to define an index position of the validator keys, indicating the starting point of your credential generation.

- To generate the withdrawal credentials from the first key, set the index position to `0`.
- To generate the withdrawal credentials for the 11th key onwards, set the index position to `10`.

:::

1. Select your language
2. Select the network which your validators are running on
3. Enter your **Validator Seed Phrase** that you’ve used to generate your initial BSL keys
4. Enter the index position of the keys you want to create withdrawal credentials for
5. Enter all your validator indices to enable withdrawals for, separated with whitespaces or commas
6. Enter a list of the old BLS withdrawal credentials of your validator keys, separated with whitespaces or commas
7. Enter the ETH1 address that all earnings will be withdrawn to

The [LUKSO KeyGen CLI](https://github.com/lukso-network/tools-key-gen-cli/releases) will then generate a `bls_to_execution_change.json` file.

You can proceed to the next step once the withdrawal credential is generated successfully.

## Broadcast the Withdrawal Credential

:::warning

The withdrawal credential can only be set once. Ensure to have ownership over the withdrawal address.

:::

The **Withdrawal Credential** can be shared directly from your node or the public consensus explorer of the related network.

<Tabs>
  <TabItem value="broadcast-from-explorer" label="Broadcast Message from Explorer">

<div>

1. Open the broadcast window of the consensus explorer of the related network:
   - [LUKSO Mainnet Consensus Explorer Broadcast Tool](https://explorer.consensus.mainnet.lukso.network/tools/broadcast)
   - [LUKSO Testnet Consensus Explorer Broadcast Tool](https://explorer.consensus.testnet.lukso.network/tools/broadcast)
2. Upload the `bls_to_execution_change.json` file
3. Broadcast the withdrawal credential

</div>

  </TabItem>
  <TabItem value="broadcast-from-node" label="Broadcast Message from Node">

:::caution

Within the following section, `<PATH_TO_JSON_FILE>` has to be exchanged with the path of the `bls_to_execution_change.json` file.

:::

<div>

1. Log into your node’s terminal
2. Copy the `bls_to_execution_change.json` file to your node
3. Send the JSON file to the local consensus instance using the following code:

</div>

```bash
curl -X POST -H "Content-type: application/json" -d @<PATH_TO_JSON_FILE> \
http://localhost:3500/eth/v1/beacon/pool/bls_to_execution_changes
```

  </TabItem>
</Tabs>
