---
sidebar_label: 'LSP0 - ERC725Account'
sidebar_position: 2
---

# LSP0 - ERC725Account

:::caution This section is a work in progress.
:::

Once deployed on a network, smart contracts cannot be changed: **they are set in stone**. This means that:

- you cannot add or remove state variables inside the contract.
- you cannot change the functionality or behaviours of the functions defined inside the contract.

An ERC725Account aims to make a smart contract act like a generic account. It can change, evolve and be edited over time. It is composed of two substandards: ERC725**X** and ERC725**Y**.

![](img/erc725.jpg)

## ERC725X - Generic Executor

This substandard enables a contract to execute any arbitrary function of another smart contract, transfer tokens, or deploy new contracts.

The operation types available are:

- `CALL`
- `CREATE`
- `CREATE2`
- `DELEGATECALL`
- `STATICCALL`

## ERC725Y - Generic Key-Value Store

This substandard enables a contract to hold arbitrary data through a generic key/value store.

It gives flexibility to the contract storage, by enabling to attach any type of information to the contract, and update it easily. The data can easily be changed, linked or unlinked.

## Features of ERC725Account

### Ownership

ERC725Account are owned account, meaning they can be controlled only by their account owner.
However, ownership is not restricted to a single owner. An ERC725Account can be managed by multiple private keys, including multi-signature wallets.

Finally, ownership of an ERC725Account can be transfered from one party to another. This øffers the possibility to use an ERC725Account to represent more than just user accounts. For instance, it can represent assets with specific data attached to them, that are transfered between owners during their lifetime.
