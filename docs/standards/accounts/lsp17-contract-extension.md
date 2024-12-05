---
sidebar_label: 'LSP17 - Contract Extension'
sidebar_position: 7
description: LUKSO's LSP17 - Contract Extension for enabling smart contracts to support new functions through extensions.
---

# LSP17 - Contract Extension

:::info Standard Document

[LSP17 - Contract Extension](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md)

:::

> **Goal:** Flexible way to enhance and evolve smart contracts over time // System of extensions

LSP17 revolutionizes smart contract flexibility and upgradeability on the LUKSO blockchain. At its core, LSP 17 introduces a dynamic mechanism for enhancing existing contracts post-deployment, utilizing two key components: Extendable Contracts and Extension Contracts. Extendable Contracts serve as the base, open to new functionalities, while Extension Contracts hold the additional features ready to be integrated.

The capability of LSP 17 lies in its forwarding strategy. Should an Extendable Contract receive a call for an undefined function, it smartly reroutes this to the appropriate Extension Contract. This routing is made possible through a specialized fallback function, ensuring that Extension Contracts can access the original call details, including the initiator and the transaction value, seamlessly appended to the calldata.

This standard not only boosts a contract's capability over time but also emphasizes modularity and reusability. By avoiding the redundant deployment of similar logic across multiple contracts, LSP 17 aims to reduce network congestion and optimize gas costs. It's a testament to LUKSO's commitment to sustainable and scalable blockchain development, ensuring that smart contracts can evolve alongside the ever-changing landscape of blockchain technology and user needs.

## Introduction

Once a contract is deployed on the blockchain, it is not possible to modify the contract to add new native functions or change the behavior of existing ones. This can be a limitation for smart contracts, particularly those that may need to adapt to new use cases and standards over time.

What is required is a method to extend the functionalities of a smart contract even after it has been deployed, allowing it to continue to support new features over time.

A possible solution to this problem is to establish a system of extensions that can be added to a smart contract, enabling it to **acquire new functionalities** without the need for redeployment.

## What does this standard represent ?

This standard defines a mechanism for extending a contract to support new functions through the use of **extensions**.

![Normal contract Vs contract implementing LSP17](/img/standards/lsp17/TwoContracts.jpeg)

The **_smart contract A_** implements 4 functions natively. Once this smart contract is deployed, no new functions can be added or changes made to the existing ones.

In contrast, the **_smart contract B_**, which supports the **[LSP17 standard](../../contracts/contracts/LSP17Extensions/Extension4337.md)**, does not implement any native functions but rather relies on extensions for the functionality that is needed and can add more extensions in the future.

Thus, smart contract B has the ability **to support an unlimited number of functionalities** and can add new functions in the future if desired.

![Normal contract Vs contract implementing LSP17](/img/standards/lsp17/OneContract.jpeg)

As shown in the figure above, smart contract B **changed the extension** of the `execute(..)` function to a newer version, removed the `depositToken(..)` extension, and added new extension for `socialRecover(..)` function.

This system of extensions allows for a smart contract to evolve and adapt to changes that may arise in the future. By implementing this system, smart contracts can become more versatile and capable of supporting a broader range of functionalities, even after deployment.

### Specification

This standard defines two types of contracts:

- The **extendable contract**, which is the contract whose functionality we want to extend.

- The **extension contract**, which is the contract providing the functionality to be added to the extendable contract.

When the extendable contract is called with a function that is not natively implemented, it checks the address of the extension mapped to that function.

If no extension is set for the function being called, the call **MUST revert**.

But if an extension is set, the extendable contract will make a call to that extension using the **CALL** opcode, along with an additional calldata of 52 bytes containing the address of the caller (20 bytes) and the value sent along calling the function by the caller (32 bytes).

![Calling An LSP17 Extension](/img/standards/lsp17/CallingAnLSP17Extension.jpeg)

The 52 bytes of additional calldata appended to the call to the extension contract provides context about the caller and the value sent in the call, allowing the extension to validate the call based on these factors if desired.

> This standard does not dictate a specific method for mapping function selectors to extensions or for setting or changing these extensions in the extendable contract, developers can choose their preferred approach.

### Extension Re-usability

While contracts can deploy and customize their own extensions, many smart contracts **share almost the same logic** for certain functions. In this case, the same extensions can be re-used by different contracts supporting LSP17.

For example, **_smart contract A & B_** are two independent contracts that implement different functions but share the same logic for verifying signatures. Therefore, they can use the same extension for signature validation for the `isValidSignature(..)` function.

![Two contracts sharing the same LSP17 Extension](/img/standards/lsp17/ShareExtension.jpeg)

This approach leads to fewer contracts being deployed on the blockchain with the same logic, resulting in less chain congestion and simplifying the development process by reusing already deployed and verified extension contracts.

### Security Considerations

As the extensions are called using the **CALL** opcode not **DELEGATECALL**, it' safe to assume that there is no risk of destroying the extendable smart contract through `selfdestruct`.

However, it is important to be aware that **adding random contracts as extensions carelessly** can be problematic as the extensions will have the extendable contract as their caller (`msg.sender`), which can lead to impersonating the extendable contract in certain situations.

### Example

A decentralized exchange cannot accept safe ERC721 or ERC1155 transfers unless it implements specific functions with specific return values. This ensures that the contract knows how to handle these tokens, thus making the transfer safe.

![Exchange receiving ERC721 and ERC1155 Tokens](/img/standards/lsp17/ExchangeAcceptingERCTokens.jpeg)

The decentralized exchange or any other type of contract can receive tokens of these types, but what happens if another token standard emerges that people start building on and that has the same validation system where it requires the function `onERCXXXReceived(..)` ? This will make the DEX unable to receive these kinds of tokens because it did not implement this function simply because it did not exist at the time.

![Exchange cannot receive ERCXXX Tokens](/img/standards/lsp17/ExchangeCannotAcceptERCTokens.jpeg)

So the only way for this DEX to support new types of tokens is to redeploy the contract with this new function, which can be problematic as many protocols depend and interact with this DEX on a specific address.

This problem can be resolved by utilizing **LSP17** in the decentralized exchange (DEX). With this standard, the contract can be deployed with only the `onERC721Received(..)` or `onERC1155Received(..)` functions implemented, but additional functions such as `onERCXXXReceived(..)` can be **added as extensions** later. LSP17 also allows for the potential addition of extensions for any future standard-required functions that may arise.

![Exchange adding ERCXXX Token Extension](/img/standards/lsp17/ExchangeAddingERCTokenExtension.jpeg)
