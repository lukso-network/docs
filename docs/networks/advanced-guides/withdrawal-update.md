---
sidebar_label: 'Update Validator Withdrawals'
sidebar_position: 4
description: Update the LUKSO Validator withdrawals to be able to withdraw staked LYX/ LYXt.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Validator Withdrawals

The following guide will teach you how to update your plain **BLS Validator Key** to reference an **ETH1 Address**, so your validator keys are able to withdraw staked LYX/LYXt and earnings. If an ETH1 Address is referenced to the BLS Key, the validator's stake can be exited to any wallet. When enabled, all validator earnings above 32 LYX/LYXt will be **periodically withdrawn to your ETH1 Address every few days**.

- **BLS Keys** are the backbone of the digital signature type to secure the **PoS Consensus Layer** of EVM blockchains. Every validator uses them to sign blocks and stake LYX/LYXt on the LUKSO networks.
- **ETH1 Addresses** are the traditional Ethereum addresses from _Externally Owned Accounts_ or _Smart Contracts_ on the **Execution Layer** which can receive tokens or coins on the network.

:::success Key Generation

The update is only necessary for [LUKSO KeyGen CLI](https://github.com/lukso-network/tools-key-gen-cli) users. If you used the [LUKSO KeyGen GUI](https://github.com/lukso-network/tools-wagyu-key-gen#lukso-wagyu-keygen) to generate your validator keys, it automatically asked for a withdrawal address during the setup.

:::

:::info Withdrawal Process

As LUKSO is an _EVM-based blockchain_, the withdrawal update is _similar to Ethereum_. In case you have questions about the process, please refer to the sources linked in [Further Reads](#further-reads).

:::

## Check the Withdrawals Status

:::tip Withdrawal Activation Time

If you've updated your ETH1 recently, its activation can take up to 48 hours.

:::

If you've never updated your validator withdrawals after the initial deposit, you can check the `deposit_data.json` file of the validator locally. To check if your withdrawals are executed on the network, you can check them using the consensus explorer.

<Tabs>
  <TabItem value="local-deposit-check" label="Local Deposit File Check">

<div>

1. Open the `deposit_data.json` file of the validator
2. Search for the `withdrawal_credentials` properties for every key
   - If the hexadecimal number starts with `01`, **withdrawals are already enabled**
   - If the hexadecimal number starts with `00`, withdrawals can be enabled using this guide

</div>

</TabItem>
<TabItem value="consensus-explorer-check" label="Consensus Explorer Check">

<div>

1. Open the deposit file of your validator and copy the `pubkey` element of the specific validator key
2. Search for your validator by entering its public key into the search bar of the related consensus explorer:
   - [LUKSO Mainnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/)
   - [LUKSO Testnet Consensus Explorer](https://explorer.consensus.testnet.lukso.network/)
3. View the validator’s details and open the **Withdrawals** section
   - If you see withdrawals, the withdrawal credentials are working correctly
   - If the withdrawal section is greyed out, you can enable them by following this guide

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
    - [LUKSO Testnet Consensus Explorer](https://explorer.consensus.testnet.lukso.network/)
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

## Download the LUKSO KeyGen CLI

:::caution

The LUKSO KeyGen CLI should only be used on a secure offline device.

You will need to input your **Validator Seed Phrase** again.

:::

1. Download the latest version of the [LUKSO KeyGen CLI](https://github.com/lukso-network/tools-key-gen-cli/releases)
2. Transfer the archive to a secure device.
3. Extract the archive to receive the executable binary file
4. Open the terminal and move into the generated folder

## Start the LUKSO KeyGen CLI

:::tip

If you want to have different withdrawal credentials, the following steps must be repeated multiple times.

:::

:::info

You will need the following information:

- Current **Validator Indices** (Previous Step)
- Old **Withdrawal Credentials** for each Validator Key (Deposit File)
- New ETH1 **Withdrawal Address** (Generated)

:::

Start the BLS to Execution process from the LUKSO KeyGen CLI

```bash
./lukso-key-gen generate-bls-to-execution-change
```

## Generate the Withdrawal Credential

:::info Index Position

During **Step 4**, you will have to define an index position of the validator keys, indicating the starting point of your credential generation.

- To generate the withdrawal credentials from the first key, set the index position to `0`.
- To generate the withdrawal credentials for the 11th key onwards, set the index position to `10`.

During **Step 6 and 7**, you will have to input hexadecimal values.

- Ensure to add `0x` in front of the copied withdrawal credential
- Verify that your EOA address has the `0x` prefix

:::

:::caution Error Handling

The LUKSO KeyGen CLI might show errors about given inputs no being hexadecimal or checksum values. If your inputs are correct and the JSON file is generated successfully, these errors can be ignored.

:::

1. Select your language
2. Select the network which your validators are running on
3. Enter your **Validator Seed Phrase** that you’ve used to generate your initial BSL keys
4. Enter the index position of the keys you want to create withdrawal credentials for
5. Enter all your validator indices to enable withdrawals for, separated with whitespaces or commas
6. Enter a list of the old BLS withdrawal credentials of your validator keys, separated with whitespaces or commas
7. Enter the ETH1 address that all earnings will be withdrawn to

The [LUKSO KeyGen CLI](https://github.com/lukso-network/tools-key-gen-cli/releases) will then generate a `bls_to_execution_change.json` file.

## Broadcast the Withdrawal Credential

:::warning

The withdrawal credential can only be set/published once for each validator key. Ensure to have ownership over the withdrawal address.

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

1. Print and copy the contents of the `bls_to_execution_change.json` file:

```bash
cat bls_to_execution_change.json
```

2. Input the contents into the broadcast command:

```bash
POST -H "Content-type: application/json" -d  '<MY_CONTENTS>'
```

3. Log into your node’s terminal and execute the broadcast command on it's local consensus interface:

```bash
curl -X POST -H "Content-type: application/json" -d  '<MY_CONTENTS>'
http://localhost:3500/eth/v1/beacon/pool/bls_to_execution_changes
```

<details>
    <summary>Show broadcast message example</summary>

```bash
curl -X POST -H “Content-type: application/json” -d '[{"message": {"validator_index": "7", "from_bls_pubkey": "0x89a6dc1e83570b99cfb2557f01c852ab2bf00957367d0c35a5aa0e3101c9aad33645064e5da8a1efcd5cd501eb123ad0", "to_execution_address": "0x3daee8cd2e3c18dafe13332de33972ac5cf558f3"}, "signature": "0x80e4c40a543ffb99b6fc4b66e0d37726c1739830d27c229091bf8e792ffb98cac0971274bdc815dcba1042e33a4087d809113a0293614f8533f911cb6726c2efb03cf46470bff3ecf00ed962964262470f502208f6cd50e93f56e1b71ee61fa7", "metadata": {"network_name": "lukso-devnet", "genesis_validators_root": "0xd7cc24d150c617450dfa8176ef45a01dadb885a75a1a4c32d4a6828f8f088760", "deposit_cli_version": "2.5.6"}}]' http://localhost:3500/eth/v1/beacon/pool/bls_to_execution_changes
```

</details>

  </TabItem>
</Tabs>

## Check your Withdrawal Progress

:::caution Execution Delay

A **maximum of 16 validator keys** can update their withdrawal credentials **per block**. It might take **several hours** for the change to be included in a block, depending on the number of address updates in the queue. If the update hasn't been done after several hours, consider re-submitting the JSON file or data.

:::

1. Open the Validator Withdrawal Page of the related network:
   - [LUKSO Mainnet Validator Withdrawals](https://explorer.consensus.mainnet.lukso.network/validators/withdrawals)
   - [LUKSO Testnet Validator Withdrawals](https://explorer.consensus.testnet.lukso.network/validators/withdrawals)
2. Scroll down to the list of **Address Changes**.
3. Your Validator indices should show up as some of the latest entries.

## Client Documentation

- [Prysm Withdrawal Guide](https://docs.prylabs.network/docs/wallet/withdraw-validator)
- [Lighthouse Exit Description](https://lighthouse-book.sigmaprime.io/voluntary-exit.html#withdrawal-of-exited-funds)
- [Updating Teku Credentials](https://docs.teku.consensys.io/how-to/update-withdrawal-keys)

## Further Reads

- [Official ETH2 Book Withdrawal Explanation](https://eth2book.info/capella/part2/deposits-withdrawals/withdrawal-processing/)
- [Official Ethereum Withdrawal FAQ](https://notes.ethereum.org/@launchpad/withdrawals-faq)
