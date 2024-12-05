---
sidebar_label: 'LSP0 - ERC725 Account'
sidebar_position: 2
description: LUKSO's LSP0 - ERC725 Account.
---

# LSP0 - ERC725 Account

:::info Standard Document

[LSP0 - ERC725Account](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)

:::

LSP0, the ERC725 Account standard, is at the heart of creating digital identities on the LUKSO blockchain. Think of it as a digital passport that represents you, your organization, or even your smart devices in the digital world. It is built on a combination of LUKSO standards, allowing for a wide array of functionalities — from executing transactions and storing diverse data to verifying digital signatures.

An ERC725 Account overcomes the limitations of traditional blockchain accounts by enabling more secure, flexible, and user-friendly identities. Whether it is about holding assets, interacting with decentralized apps, or participating in digital governance, LSP 0 empowers users to do it all under one roof, with full control and enhanced security. It is not just an account; it is a comprehensive digital identity system designed for the future of Web3.

## Introduction

[Externally Owned Accounts (EOAs)](https://ethereum.org/en/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) are the primary type of **account** in Ethereum, controlled by a private key. If the private key is **compromised**, anyone can execute transactions from the account and access any assets it holds. EOAs have no built-in mechanism for attaching any information or data, making identifying the person or entity using the account challenging. They can only perform simple interactions using the **[CALL](https://www.evm.codes/#f1)** opcode and create contracts using the **[CREATE](https://www.evm.codes/#f0)** opcode.

These issues can be addressed by the **[ERC725](../erc725.md)** standard, which provides more operations to execute and a flexible way to attach data for the contract even after it has been deployed.

However, for a smart contract-based account to be viable in the long term, it should have much more functionalities than the ability to execute and to attach data. The features that makes a smart contract an account are:

- the ability to **verify signed messages**
- be **notified of incoming tokens**, followers, and other types of transactions,
- be able to be **extended after deployment** to support functions and standards that will be adopted in the future.

Additionally, it should have a **secure ownership management** system to ensure the protection of valuable assets.

## What does this standard represent ?

An **ERC725Account** is a blockchain account system that can be utilized by individuals, machines, or other smart contracts. It is made up of various standards that enable the functionalities mentioned above. It is formed from:

- **[ERC165](https://eips.ethereum.org/EIPS/eip-165)** allows to register and detect the standard interfaces and standards that the contract implements, or will implement in the future.

- **[ERC725X](../erc725.md#erc725x---generic-executor)** is a generic executor that enables calling external contracts with different operations such as [**CALL**](https://www.evm.codes/#f1), [**STATICCALL**](https://eips.ethereum.org/EIPS/eip-214) and [**DELEGATECALL**](https://eips.ethereum.org/EIPS/eip-7). It also allows deploying new contracts with [**CREATE**](https://www.evm.codes/#f0) or [**CREATE2**](https://eips.ethereum.org/EIPS/eip-1014), or transferring value to any address (EOA or smart contracts).

- **[ERC725Y](../erc725.md#erc725y---generic-data-keyvalue-store)** is a generic key-value store that enables it to **attach any information** to the smart contract even after it's been deployed.

- **[ERC1271](https://eips.ethereum.org/EIPS/eip-1271)** helps to **verify the validity** of a message and signature.

- **[LSP1-UniversalReceiver](../accounts/lsp1-universal-receiver.md)** enables **notifications about incoming or outgoing transactions** and adds custom handling and behavior based on these transactions.

- **[LSP14-Ownable2Step](../access-control/lsp14-ownable-2-step.md)** enables a **secure ownership management** system.

- **[LSP17-ContractExtension](../accounts/lsp17-contract-extension.md)** enables the contract to be **extended after deployment** to support new standard and functionalities.

- **[LSP20-CallVerification](../../standards/accounts/lsp20-call-verification.md)** provides a unified and standard way for all addresses to **interact directly with the account**. This streamlines the interaction process considering the ownership setup, and enhancing accessibility and developer experience.

![LSP0 modules diagram](/img/standards/lsp0/LSP0-modules-diagram.jpeg)

### ERC725X - Generic Executor

:::tip

See the **[ERC725](../erc725.md)** standard for more information.

Check the [**execute functions**](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#execute) provided by **ERC725X** that allows the contract to execute multiple operations.

Check the **javascript** guides to know [**How to Send native tokens**](../../learn/universal-profile/interactions/transfer-lyx.md) or [**How to Call other contract's function**](../../learn/universal-profile/interactions/interact-with-contracts.md) using the execute function.

:::

The **ERC725X** standard enables the account to perform generic calls on other smart contracts, including transferring native tokens. External actions can be executed using the smart contract's generic `execute(...)` function and multi-calls can be done with the `execute(..)` **batch** function, but only the account owner can perform these operations.

Additionally, it also allows for the deployment of new smart contracts by providing the bytecode of the new contract to deploy as an argument to the `execute(...)` function. Contracts can be deployed using either the **CREATE** or **CREATE2** opcodes.

The following types of calls (operation types) are available:

| Operation number |                     Operation type                     | Description                                                                                                         |
| :--------------: | :----------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------ |
|        0         |          [`CALL`](https://www.evm.codes/#f1)           | Transfer native tokens or calls smart contract functions.                                                           |
|        1         |         [`CREATE`](https://www.evm.codes/#f0)          | Create a new smart contract based on the contract address and nonce.                                                |
|        2         |  [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014)  | Create a new smart contract based on the contract address, bytecode and the salt. The address can be predetermined. |
|        3         | [`STATICCALL`](https://eips.ethereum.org/EIPS/eip-214) | Calls another smart contract while disallowing any modification to the state during the call.                       |
|        4         | [`DELEGATECALL`](https://eips.ethereum.org/EIPS/eip-7) | Runs the function from another contract, but use the context of the current contract.                               |

#### Operation 0 - CALL

# ![ERC725X operation type CALL](/img/standards/lsp0/LSP0-CALL.jpeg)

#### Operation 1 - CREATE

# ![ERC725X operation type CREATE](/img/standards/lsp0/LSP0-CREATE.jpeg)

#### Operation 2 - CREATE2

# ![ERC725X operation type CREATE2](/img/standards/lsp0/LSP0-CREATE2.jpeg)

#### Operation 3 - STATICCALL

# ![ERC725X operation type STATICCALL](/img/standards/lsp0/LSP0-STATICCALL.jpeg)

#### Operation 4 - DELEGATECALL

# ![ERC725X operation type DELEGATECALL](/img/standards/lsp0/LSP0-DELEGATECALL.jpeg)

### ERC725Y - Generic Key-Value Store

:::tip

See the **[ERC725](../erc725.md)** standard for more information.

Check the [**setData functions**](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#setdata) provided by **ERC725Y** that allows attaching data to the contract.

Check the **javascript** guides to know [**How to Edit a Profile (setData)**](../../learn/universal-profile/metadata/edit-profile.md) or [**How to Read from a Profile (getData)**](../../learn/universal-profile/metadata/read-profile-data).

:::

Once a smart contract is deployed with a specific set of variables containing data, it cannot be modified to include new variables. This can be a problem for smart contract based accounts that need to store more and more data in the future.

ERC725Y standardizes a mapping of data keys to data values to store data dynamically, and to have the ability to add or remove data across time without the need of redeploying the contract. It gives flexibility to the contract storage.

- **Data Keys** are represented as `bytes32` values.
- **Data Values** under these keys are stored as `bytes`.

![ERC725Y key-value store vs standard contract storage](/img/standards/lsp0/LSP0-Storage.jpeg)

Developers can access the data stored in the contract via data keys instead of referencing the storage slot where the data resides.

Thanks to ERC725Y, contracts become more interoperable, as their storage is represented in the same way. Contracts and interfaces can then read and write data from or to the storage in the same manner via the functions [`getData(...)`](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#getdata) and [`setData(...)`](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#setdata).

### ERC1271

:::tip

See the **[ERC1271](https://eips.ethereum.org/EIPS/eip-1271)** standard for more information.

Check the [**isValidSignature**](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#isvalidsignature) function documentation.

:::

Unlike Externally Owned Accounts (EOAs), **smart contracts cannot sign messages** since they do not have private keys. This standard defines a way for contracts to verify if a signature and a message provided are valid according to the contract's logic. There will be many contracts that want to utilize signed messages to validate rights-to-move assets or other purposes.

The **LSP0-ERC725Account** implements the **ERC1271** standard in a flexible way that allows for future upgradeability when different type of owners are set.

When the owner of the account is an EOA, the **ECDSA algorithm** is used to recover the address of the signer from the provided signature and message, and the function `isValidSignature(..)` will return **valid** if the recovered signer address matches the address of the owner.

When the owner is a smart contract, the `isValidSignature(..)` function will be called on the owner and return whether the signature and the message are **valid** according to the logic in `isValidSignature(..)` on the owner contract.

### LSP1 - UniversalReceiver

:::tip

See the **[LSP1-UniversalReceiver](../accounts/lsp1-universal-receiver.md)** standard for more information.

Check the [**universalReceiver functions**](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver) provided by **LSP1** that allows notifying about incoming/ outgoing transactions.

Check the **javascript** guides to know [**How to set a UniversalReceiverDelegate built by LUKSO**](../../learn/universal-profile/universal-receiver/deploy-universal-receiver.md) or [**How to set your own UniversalReceiverDelegate**](../../learn/universal-profile/universal-receiver/accept-reject-assets.md).

:::

This standard enables the account to be notified of incoming transactions such as token transfer, vault transfer, information transfer, etc. Notifications are handy for situations where users want to customize how their account contract reacts to certain tokens by either rejecting them or operating a specific call on each token received.

The **[LSP0-ERC725Account](../../standards/accounts/lsp0-erc725account.md)** implements the `universalReceiver(..)` function that:

Emits an [`UniversalReceiver`](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver-1) event with the `typeId` and `data`, as well as additional parameters such as the amount sent to the function, the caller of the function, and the return value of the delegate contracts.

The `typeId` is a **bytes32** value that represents the type of action being notified about. For instance, if you want to notify an account about a specific type of token, you could hash the word **"TOKENXX"** which would result in a `bytes32`, and then use it as a `typeId`.

The `data` field can contain relevant information related to the `typeId` used when the `universalReceiver(...)` function was called. In the case of token transfers, it could be any encoded information such as the recipient balance, time, royalties, etc.

The typeId provides a unique identifier for the type of notification, while the data field provides the specific information related to the notification. This allows for efficient and effective communication of information related to the token, without the need for extensive parsing or decoding of data.

The `universalReceiver(...)` function and its `UniversalReceiver` event are the mechanisms through which an **LSP0-ERC725Account** can receive notifications. Websites can monitor and listen to the event and previous events to understand what the account has been notified about.

# ![LSP0 being notified](/img/standards/lsp0/LSP0-Notification.jpeg)

This innovation is particularly beneficial for all type of contracts that have a connection with the account, especially token standards, as it streamlines the blockchain user experience by allowing the recipient of a token to be notified directly.

Currently, determining which tokens an address owns requires going through all events of all token contracts on the blockchain network and filtering out the tokens that the address owns based on the events of those contracts.

However, with the **UniversalReceiver** event, contracts can call the `universalReceiver(..)` function and emit the event on the account itself. This way, to determine which tokens an account holds, one would simply listen to the UniversalReceiver event emitted on that account. This method is much simpler and more efficient.

# ![LSP0 being notified](/img/standards/lsp0/LSP-Notification-Token.jpeg)

In addition to the **UniversalReceiver** event, the account owner has the ability to set in the storage of the account the addresses of contracts labeled as **UniversalReceiverDelegates** (URD). These contracts can be chosen to run on each call to the `universalReceiver(..)` function or on a specific `typeId` passed to the function.

This provides a way to react to calls, not just to be informed. For example, if the account receives any type of token, regardless of the typeId, it could specify in the main **UniversalReceiverDelegate** that the transfer should be automatically reverted.

Or, for a specific type of token represented by a specific `typeId`, account could specify in the **MappedUniversalReceiverDelegate** (Mapped to a specific typeId) that the token should be automatically forwarded to a vault that the account own.

# ![LSP0 reacting](/img/standards/lsp0/LSP0-Token-Reacting.jpeg)

The **UniversalReceiverDelegate** contracts **provides optional interactions** that allows the account to go beyond simply being informed and provides a way to actively respond to different types of notifications as they occur.

### LSP14 - Ownable2Step

:::tip

See the **[LSP14 - Ownable2Step](../access-control/lsp14-ownable-2-step.md)** standard for more information.

Check the [**LSP14 functions**](../../contracts/contracts/LSP14Ownable2Step/LSP14Ownable2Step.md) allowing 2 step ownership transfers.

:::

An account that holds valuable assets and represents your digital identity should be secure to prevent mistakes that may result in losing it. Therefore, a safe and secure ownership management system should be in place for this account.

**LSP14-Ownable2Step** is a standard that allows for the ownership of an account to be transferred or renounced through a 2-step process, making it more resistant to phishing attacks. This standard allows for any address, such as an EOA or smart contract, to be the owner of the account. The owner can be a **voting contract**, or a **multisig**, or a **KeyManager** that allow for permission-based access control. (Check **[LSP6-KeyManager](../access-control/lsp6-key-manager.md)**)

![ERC725Y key-value store vs standard contract storage](/img/standards/lsp0/LSP0-Owner.jpeg)

The transfer of ownership is conducted in two stages, where a pending owner is designated and then in another transaction the pending owner must confirm their acceptance of ownership. In the process of ownership transfer, the 2 parties are notified using **[LSP1-UniversalReceiver](#lsp1---universalreceiver)** standard.

#### Initiate the transfer

![ERC725Y key-value store vs standard contract storage](/img/standards/lsp0/LSP0-Transfer1.jpeg)

#### Accept ownership

![ERC725Y key-value store vs standard contract storage](/img/standards/lsp0/LSP0-Transfer2.jpeg)

#### Transfer Finalized

![ERC725Y key-value store vs standard contract storage](/img/standards/lsp0/LSP0-Transfer3.jpeg)

The process for renouncing ownership follows a similar structure, where an initial call is made, followed by a waiting period and a specific timeframe during which the ownership can be renounced before the process is reset.

![Renounce Ownership](/img/standards/lsp0/LSP0-Renounce.jpeg)

### LSP17 - Contract Extension

:::tip

See the **[LSP17 - ContractExtension](./lsp17-contract-extension.md)** standard for more information.

Check the **JavaScript** guides to know [**How to extend the functionalities and interfaceIds of an account**](../../learn/universal-profile/advanced-guides/extend-profile-functionalities.md)

Check the [**fallback function**](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#fallback) that allows calls for the extensions.

:::

Once a smart contract based account is deployed on the blockchain, it is not possible to modify the contract to add new native functions or change the behavior of existing ones. This can be a limitation for these accounts, that may need to support new use cases, functions, and standards that may be adopted in the future.

**[LSP17-ContractExtension](./lsp17-contract-extension.md)** defines a mechanism for extending a contract to support new standard and functions through the use of **extensions**.

#### Support New Functions

The **LSP0-ERC725Account** contains basic functionality for interacting with other addresses, storing and retrieving data, verifying signatures, handling transactions, managing ownership, and checking interface support with the functions listed below.

![LSP0 base functions](/img/standards/lsp0/LSP0-Functions.jpeg)

To ensure the longevity and continued evolution of the LSP0 as a blockchain account, it is important for it to support new functions that will become standardized in the future. This can be accomplished through the use of extension contracts, which allow the account owner to add new functionality not natively supported by the LSP0.

![LSP0 extended with onERC721Received and validateUserOp functions](/img/standards/lsp0/LSP0-Extended.jpeg)

For example, in the figure above, the LSP0 was extended with the `onERC721Received(..)` function which will allow the contract to receive safe ERC721 transfers.

By utilizing these extensions, the account can be updated with new features and remain adaptable to changes in the blockchain ecosystem.

#### Support New Standards

The ability to add new functions to the LSP0 is crucial for its extendibility post-deployment, but it is also important for the LSP0 to be able to support the new interface IDs of any standards that are added through extensions. Initially, the LSP0 supports a set of interfaces at the time of deployment:

![LSP0 base interfaceIds](/img/standards/lsp0/LSP0-SupportedInterface.jpeg)

However, the account can declare support for new interface IDs after it has been extended. This is especially beneficial for contracts that check if a contract supports a specific interface ID before interacting with it.

![LSP0 Extended interfaceIds](/img/standards/lsp0/LSP0-Extended-Interfaces.jpeg)

### LSP20 - Call Verification

:::tip

See the **[LSP20 - CallVerification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-20-CallVerification.md)** standard for more information.

Check the **[LSP0 functions](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md)** to see how verification of allowed calls to the account happens.

:::

The **LSP0ERC725Account** is an ownable contract that can be owned by different types of addresses, including EOAs, contracts like multi-sig wallets, KeyManagers, etc. These owner contracts may have various functions and behaviors, which can create challenges in figuring out how the interaction with the account works.

Previously, when a Key Manager owns the account, only addresses allowed by the Key Manager should interact with the account via the Key Manager. However, they cannot directly interact with the account functions because only the Key Manager can call them as the owner. A similar issue arises when a voting contract owns the account, as voters must interact with the voting contract rather than the account directly.

To ensure a unified and standard way to interact with the account, the **LSP20-CallVerification** standard was proposed. This standard aims to streamline the interaction with the account, considering the ownership setup.

![LSP0 Old interaction](/img/standards/lsp0/LSP0-OldInteraction.jpeg)

Currently, when the owner calls a function on the account contract, they are allowed to execute it directly. However, if a different address calls a function on the LSP0, the function will forward the call to the account owner for verification. The owner must then determine if the caller is allowed to execute the specific function.

If the caller is allowed, the owner should return a specific value. If the caller is not allowed, the owner can either revert the transaction or return an invalid value. This verification process occurs before and possibly after the execution of the function.

![LSP0 Old interaction](/img/standards/lsp0/LSP0-LSP20Interaction.jpeg)

The primary benefit of this approach is that it ensures a unified way for all addresses to interact directly with the account functions, even if they are not the owner but are allowed by the owner's logic.

By implementing the **LSP20-CallVerification** standard, the account becomes more accessible and versatile, accommodating various ownership structures and simplifying the user experience for those interacting with it.
