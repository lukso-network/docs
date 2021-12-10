---
sidebar_label: 'Interact with Universal Receiver'
sidebar_position: 2.3
---

# Interact with a Universal Receiver

:::info Coming Soon
:::

A Universal Receiver Delegate enables you to delegate the `universalReceiver` functionality to another smart contract.

## Deploy your Universal Receiver Delegate

Deploy the contract with web3.js / ethers.js

## Link your URD to your UP

In order to enable your URD on your Universal profile, you need to set the address of your UniversalReceiverDelegate contract in the following key on your Universal Profile.

- **key:** `0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47` (`keccak256('LSP1UniversalReceiverDelegate')`)
- **value:** `<urd-contract-address>`

As a result, your Universal Profile contract will know at which contract address the functionality is handled.

_add code snippets for web3.js / ethers.js_
