---
sidebar_label: 'LSP2 - Storage Layout'
sidebar_position: 3.3
---

# The Storage Layout - LSP2 (JSON Schema)

:::caution This section is a work in progress.
:::

:::success Useful Tip

Our [javascript library `erc725.js`](../../tools/erc725js/getting-started.md) makes it easy to read + write data encoded according to the LSP2 Schema, without going through all the encoding complexity manually.

:::

Smart contracts understand only two things: **bytes** and **numbers**. For a smart contract, there is no such concept as a variable. Everything is stored under the smart contract storage as bytes at specific storage slots.

Data in a smart contract is organised between slots. Each data is storaged at a slot number. Let's take this smart contract as an example.

```solidity
contract Example {

    string name;    // storage slot 1
    uint256 age;    // storage slot 2
    string description; // storage slot 3

}
```

For humans, it is difficult to remember the slot number. The more data you attach to a smart contract, the more impractical it becomes.

Finally, everyone can store information differently on an ERC725Account, depending on individual use cases and needs. There is no standardized schema of how the data looks like. This make it very hard for ERC725 Account to interact with each other, and for external services to interact with ERC725Accounts.

## How does LSP2 work?

LSP2 introduces a schema that enables to represent the storage of a smart contract in more understandble keys. Coming back to our previous example, it is easier to remember that your `age` is stored at the key `MyAge`, instead of at slot number 1.

LSP2 enables to store information on an ERC725Account in an organized and unified way.

By introducing a new storage schema for smart contracts, ERC725Accounts become interroperable between each other, as their storage is represented in the same way. Contract and interfaces can then all read and write to the storage in the same manner. Data can be easily parsed, so that any smart contract or interface can interact with them and fetch data.

## Key Types

LSP2 introduces new way to encode data, depending on its type. From a single entry, to multiple entires (like arrays or maps).
Under the hood:

- keys are represented as `bytes32`.
- variables are stored as `bytes` with an undefined length.
