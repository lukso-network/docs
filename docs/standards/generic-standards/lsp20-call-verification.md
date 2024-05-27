---
sidebar_label: 'LSP20 - Call Verification'
sidebar_position: 6
description: LUKSO's LSP20 - Call Verification for delegating the the verification of a function call to another smart contract.
---

# LSP20 - Call Verification

:::info Standard Document

[LSP20 - Call Verification](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-20-CallVerification.md)

:::

> **Goal:** Enhances usability when interacting with smart contracts

LSP20, known as Call Verification, introduces a smart way to delegate the verification of function calls to a separate contract. This setup allows a primary contract to consult a verifier contract before and after executing a call, ensuring that specific conditions or requirements are met. It's like having a security checkpoint for your contract's functions, where the verifier acts as the gatekeeper, deciding which calls are allowed based on predefined rules.

This approach is particularly useful for managing complex or evolving requirements for function calls without needing to update the main contract (through upgradability for instance). It's akin to having a dynamic rulebook that can be changed or updated easily without touching the core logic of your application. For developers, it offers a flexible and modular way to build and maintain smart contracts, providing a scalable solution for managing access and permissions within decentralized applications.

## Introduction

Smart contracts often have complex requirements that need to be checked before executing a function. These requirements might change over time, adding to the complexity of managing them within the same contract.

In order to maintain the integrity and security of smart contracts, while enhancing their ability to respond to change, a mechanism that enables a contract to delegate the verification of a function call to another contract can be extremely useful. This mechanism would not only ensure the fulfillment of varying requirements but also allow these requirements to be modified, updated, or enhanced without disrupting the primary contract's functionality.

## What does this standard represent ?

The LSP20 standard addresses this issue by introducing a mechanism for delegating the verification of a function call to another contract. This enables the smart contract to update, modify, or enhance the requirements without affecting the primary contract's functionality, making the smart contract more versatile and adaptable.

![LSP20Verification](/img/standards/lsp20/LSP20-Verification.jpeg)

## Specification

The LSP20 standard defines two sections, detailing the expected behavior in both the delegating contract and the verification-receiving contract.

### Delegating Contract

The behavior of the delegating contract is defined in the LSP20 standard. When a function in this contract is called, it should forward the call to the `lsp20VerifyCall` function implemented on the verification-receiving contract, passing the necessary arguments for verification. These arguments include:

1. Caller information
2. Amount of native tokens sent (`msg.value`)
3. Calldata provided by the caller (the function called and its arguments)

The logic verifier contract uses these arguments to perform the verification. For example, it may have logic that checks how much LYX is sent and authorizes the call based on a minimum amount sent. Alternatively, it could verify solely based on the address of the caller, irrespective of the amount of LYX sent.

Once the `lsp20VerifyCall` verifies and authorizes the call, an optional post-execution check can be performed through the `lsp20VerifyCallResult` function. The result of the executed function gets passed to the logic verifier, which allows for checks such as balance changes or other aspects of the contract.

### Verification-receiving Contract (Logic Verifier)

The logic verifier contract, which receives the delegation for verification, is required to implement the `lsp20VerifyCall` function, and `lsp20VerifyCallResult` function if it is to be used for post-execution checks.

There is no standardized logic for these functions; it is up to the implementer to decide how to use them and integrate any required logic. The parameters provide context about the call's different aspects (caller, value sent, data sent), and it's up to the implementer to decide whether to allow it or not. As mentioned, the return value of the `lsp20VerifyCall` function determines whether the `lsp20VerifyCallResult` should be invoked.

### Example Usage

**Online marketplace**

Imagine a smart contract that governs an online marketplace where users can buy and sell goods. Each transaction in this marketplace might require specific verification checks like verifying the availability of goods from the seller, confirming the buyer's payment ability, and potentially even checking the reputation score of both parties.

By leveraging the LSP20 standard, the marketplace contract can delegate these complex verification tasks to a separate logic verifier contract. In case the marketplace wants to introduce new checks in the future such as KYC status, dispute history, etc., they simply update the logic verifier contract. This decoupling of verification logic from the primary contract ensures that the marketplace contract remains agile, adaptable, and easy to manage.

**Universal Profiles with Key Manager**

When a Universal Profile is owned by a Key Manager, multiple controllers can use the Universal Profile according to the permissions they are granted. However this setup creates the following problem: since the `owner()` of the Universal Profile is the Key Manager, every single interactions must be done through the Key Manager.

This creates development complexity, as interactions must be crafted, encoded and send to the Key Manager instead. Calling the Universal Profile directly is not possible.

LSP20 being embedded in LSP0 (the smart contract based account under a Universal Profile) simplify this complexity, allowing anyone to interact directly with the Universal Profile without having to go through the Key Manager first. The LSP20 module embedded in the Universal Profile will see that the request does not come from the Key Manager directly, and will instead forward the request and the calldata back to the Key Manager to verify the permissions of the caller first.

![LSP20 with LSP6 Key Manager](/img/standards/lsp20/LSP20-example-LSP6.jpeg)
