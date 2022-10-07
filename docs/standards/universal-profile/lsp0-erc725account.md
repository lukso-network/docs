---
sidebar_label: 'LSP0 - ERC725 Account'
sidebar_position: 2
---

# LSP0 - ERC725 Account

:::info Standard Document

[LSP0 - ERC725Account](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)

:::

## Introduction

Once deployed on a network, smart contracts cannot be changed. Their storage and logic **are set in stone**. If a smart contract is deployed with specific state variables and functions, these data and functionalities are there forever and cannot be altered.

The **[ERC725 Standard](https://github.com/ERC725Alliance/erc725/blob/main/docs/ERC-725.md)** proposed in 2017 describes a generic key-value store and generic execution function that could be used as the basis for an account. A blockchain-based account can then be created by combining ERC725 with the interactivity and signature verification mechanism from the **[LSP1-UniversalReceiver Standard](../generic-standards/lsp1-universal-receiver.md)** and **[ERC1271 Standard](https://eips.ethereum.org/EIPS/eip-1271)**.

![LSP0 ERC725 Account overview](/img/standards/lsp0/lsp0-erc725account-overview.jpeg)

## What does this standard represent ?

An **ERC725Account** defines a blockchain account system that could be used by humans, machines, or other smart contracts. It is composed of multiple standards, as shown in the figure below.

- **[ERC725X](https://github.com/ERC725Alliance/erc725/blob/main/docs/ERC-725.md#erc725x)** is a generic executor that enables calling external contracts, deploying new contracts, or transferring value to any `address` (EOA or smart contracts).
- **[ERC725Y](https://github.com/ERC725Alliance/erc725/blob/main/docs/ERC-725.md#erc725y)** is a generic key-value store that enables it to attach any information to the smart contract.
- **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** enables notifications about incoming or outgoing transactions and adds custom handling and behavior based on these transactions.
- **[ERC1271](https://eips.ethereum.org/EIPS/eip-1271)** helps to verify that a signed message has a valid signature.
- **[ERC165](https://eips.ethereum.org/EIPS/eip-165)** allows to register and detect the standard interfaces the contract implements.

![ERC725Account contract architecture](/img/standards/lsp0/lsp0-erc725account-architecture.jpeg)

This standard also uses the **[ERC173](https://eips.ethereum.org/EIPS/eip-173)** standard to provide ownership functions for owning and controlling the implementation contract.

### ERC725X - Generic Executor

:::note

See the section **["Members of address types"](https://docs.soliditylang.org/en/v0.8.11/units-and-global-variables.html?highlight=staticcall#members-of-address-types)** in the Solidity documentation for more information about the different types of calls available.

:::

This substandard enables the account to execute generic calls on any other smart contracts, including transferring native tokens along with the call. External actions are possible via a smart contract's generic [`execute(...)`](../smart-contracts/lsp0-erc725-account.md#execute) function in the smart contract. **Only the owner can perform** the operations below.

The ERC725X standard also enables deploying new smart contracts by providing the bytecode of the new contract to deploy as an argument to the `execute(...)` function. Contracts can be deployed using either CREATE or [CREATE2](https://eips.ethereum.org/EIPS/eip-1014).

The following types of calls (= operation types) are available:

| Operation number |                     Operation type                     | Description                                                                                                                             |
| :--------------: | :----------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------- |
|        0         |          [`CALL`](https://www.evm.codes/#f1)           | call another smart contract                                                                                                             |
|        1         |         [`CREATE`](https://www.evm.codes/#f0)          | create a new smart contract with the associated bytecode passed as `_data`                                                              |
|        2         |  [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014)  | create a new smart contract with a **salt **(for pre-computed contract addresses)                                                       |
|        3         | [`STATICCALL`](https://eips.ethereum.org/EIPS/eip-214) | call another smart contract while disallowing any modification to the state during the call                                             |
|        4         | [`DELEGATECALL`](https://eips.ethereum.org/EIPS/eip-7) | run the function from another contract, but use and update the storage of the current contract (= persist `msg.sender` and `msg.value`) |

# ![ERC725X operation type CALL](/img/standards/lsp0/erc725x-operation-type-call.jpeg)

# ![ERC725X operation type CREATE](/img/standards/lsp0/erc725x-operation-type-create.jpeg)

# ![ERC725X operation type CREATE2](/img/standards/lsp0/erc725x-operation-type-create2.jpeg)

# ![ERC725X operation type DELEGATECALL](/img/standards/lsp0/erc725x-operation-type-delegatecall.jpeg)

# ![ERC725X operation type STATICCALL](/img/standards/lsp0/erc725x-operation-type-staticcall.jpeg)

### ERC725Y - Generic Key-Value Store

:::note

See the section **["Layout of State Variables in Storage"](https://docs.soliditylang.org/en/v0.8.11/internals/layout_in_storage.html)** in the Solidity documentation for more information about the structure of smart contract storage.

:::

This substandard enables the account to hold arbitrary data through a generic data key-value store. It gives flexibility to the contract storage. Developers can access the data stored in the contract via data keys instead of referencing the storage slot where the data resides.

- **Keys** are represented as `bytes32` values.
- **Values** under these keys are stored as `bytes`.

As a result, this substandard enables attaching any information to the contract and updating or removing it quickly.

![ERC725Y key-value store vs standard contract storage](/img/standards/lsp0/erc725y-vs-standard-contract-storage.jpeg)

Thanks to ERC725Y, contracts become more interoperable, as their storage is represented in the same way. Contracts and interfaces can then read and write data from or to the storage in the same manner via the functions [`getData(...)`](../smart-contracts/lsp0-erc725-account.md#getdata) and [`setData(...)`](../smart-contracts/lsp0-erc725-account.md#setdata).

### LSP1 - UniversalReceiver

:::info

See the **[LSP1-UniversalReceiver](../generic-standards/lsp1-universal-receiver.md)** standard for more information.

:::

This standard enables the account to be notified of incoming transactions such as token transfer, vault transfer, information transfer, etc. Notifications are handy for situations where users want to customize how their account contract reacts to certain tokens by either rejecting them or operating a specific call on each token received.

### ERC1271

:::info

See the **[ERC1271](https://eips.ethereum.org/EIPS/eip-1271)** standard for more information.

:::

Unlike Externally Owned Accounts (EOAs), smart contracts cannot sign messages since they do not have private keys. This standard defines a way for contracts to verify if a signature provided by an EOA is valid. There will be many contracts that want to utilize signed messages to validate rights-to-move assets or other purposes.

### LSP14 - Ownable2Step

:::info

See the **[LSP14 - Ownable2Step](../generic-standards/lsp14-ownable-2-step.md)** standard for more information.

:::

This standard allows for the **LSP0 - ERC725Account** contract's ownership to be controlled by an EOA or by another contract, by implementing **3 essential methods**:

- [`transferOwnership()`](../smart-contracts/lsp14-ownable-2-step.md#transferownership)
- [`acceptOwnership()`](../smart-contracts/lsp14-ownable-2-step.md#acceptownership)
- [`renounceOwnership()`](../smart-contracts/lsp14-ownable-2-step.md#renounceownership)

## Extension

### Ownership

Developers can extend the account ownership by setting a smart contract as an owner with different permissions granted to users in the smart contract. Expandable role-management allows multiple interactions through your account based on the permissions set for the calling address.

**[LSP6-KeyManager](./lsp6-key-manager.md)** is a standard that defines a smart contract that acts as a controller for this account.

### Interactivity

Events can notify the account of incoming assets or information via the [`universalReceiver(...)`](../smart-contracts/lsp0-erc725-account.md#universalreceiver) function. Developers could add an extension to increase the autonomy of the contract by handling and reacting to transactions that the account receives.

Builders can introduce additional functionality by linking an external contract to your account that would handle these functionalities: an **[LSP1-UniversalReceiverDelegate](./lsp1-universal-receiver-delegate.md)**.
