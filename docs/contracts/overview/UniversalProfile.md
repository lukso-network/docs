---
title: 🆙 Universal Profile
sidebar_position: 1
---

# Universal Profile

The `UniversalProfile.sol` smart contract is a combination of two LSP standards:

- **[LSP0-ERC725Account Standard](/standards/accounts/lsp0-erc725account)** that also contains some LSP3Profile metadata, giving a "face and uniqueness" to the smart contract based account.
- **[LSP3-UniversalProfile-Metadata Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)**

The LSP3 Profile Metadata enables to give a "face" to the smart contract based account, making it distinguishable and unique from others Universal Profiles.

A `UniversalProfile` as a smart contract can be used as a _blockchain-based account_ by humans, machines, organizations, or even other smart contracts.

## Functionalities & Behaviour

A `UniversalProfile` has all the basic functionalities of an _Externally Owned Account_ (EOA), as well as the following functions that give the contract additional features:

- [`execute(...)`](#execute) : enables to execute functions on other contracts, transfer value, or deploy new contracts.
- [`isValidSignature(...)`](#isvalidsignature): delivers verification of signatures and signed messages from EOAs.
- [`universalReceiver(...)`](#universalreceiver): brings notification of incoming calls and assets.
- [`setData(...)`](#setdata): offers to set information in the account storage.

All ownable functions such as [`execute(..)`](../contracts/UniversalProfile.md#execute), [`executeBatch(..)`](../contracts/UniversalProfile.md#executebatch), [`setData(..)`](../contracts/UniversalProfile.md#setdata), [`setDataBatch(..)`](../contracts/UniversalProfile.md#setdatabatch), [`transferOwnership(..)`](../contracts/UniversalProfile.md#transferownership), and [`renounceOwnership(..)`](../contracts/UniversalProfile.md#renounceownership) can be called by the owner

The contract also includes the [LSP20-CallVerification](/standards/accounts/lsp0-erc725account.md#lsp20---call-verification) at its core. Meaning if the contract is owned by another contract, LSP20 enables to interact with the contract directly without having to resolve through its owner first. This allows seamless integrations with other contracts, protocols and dApps, as the contract can be called directly, making the developer experience easier.

To illustrate, if another address than the owner calls the [`execute(..)`](../contracts/UniversalProfile.md#execute) function, the account contract will:

1. Forward the call to the owner.
2. The execution of the function will only continue if the owner returns the `LSP20 MAGIC VALUE`, indicating that the caller is allowed to execute the function.

The magic value can also determine if there should be any post-execution check on the owner. This same behavior applies to other ownable functions as well.

The structure allows the account to have a more dynamic and adaptable approach for managing function execution logic, using the **LSP20-CallVerification** standard.

## Extensions

An [`LSP0ERC725Account`](../contracts/LSP0ERC725Account/LSP0ERC725Account.md) has the functionalities of [`LSP17Extendable`](../contracts/LSP17ContractExtension/LSP17Extendable.md) built-in. This allows extending its behavior with functions it does not support natively in its interface.

However, calls to the `fallback` function will revert if no extension is registered for the function selector that was called.

:::tip

The only exception is the `0x00000000` function selector, which returns in order to allow the Universal Profile to act similarly to an EOA, and receive _"graffiti"_ data (when receiving native tokens or not) without executing anything else.

:::

:::caution

If your Universal Profile calls an extension to perform some security check, verification or validation, you should not rely on the extension to revert to ensure
the validation failed, but check the `bytes` returned by the extension through [`_fallbackLSP17Extendable`](../contracts/LSP17ContractExtension/LSP17Extendable.md#_fallbacklsp17extendable).

:::

:::caution

Be aware of [phantom functions](https://media.dedaub.com/phantom-functions-and-the-billion-dollar-no-op-c56f062ae49f) for functions in extensions with the `0x00000000` selector.

For example, a contract might perform some kind of validation in an extension (_e.g: checking for permissions_), and expect the function to revert if the user is not authorized.

However, since the function's selector is `0x00000000` and the LSP0 account doesn't have this extension registered, the `fallback` function will `return` instead of reverting, giving the contract the impression that the user is authorized.

> See [`_fallbackLSP17Extendable`](../contracts/LSP17ContractExtension/LSP17Extendable.md#_fallbacklsp17extendable) for more details.

In such case, make sure to double that an extension is registered first for the `0x00000000` selector via [`_getExtension`](../contracts/LSP17ContractExtension/LSP17Extendable.md#_getextension).

:::

## Adding metadata

Unlike private keys and EOAs that cannot hold any metadata, a UniversalProfile is a blockchain based account that can have any info attached to it.

You can do so using the [`setData(bytes32,bytes)`](../contracts/UniversalProfile.md#setdata) and [`setDataBatch(bytes32[],bytes[])`](../contracts/UniversalProfile.md#setdatabatch) functions to add, update or delete any metadata in your Universal Profile.

### Updating your `LSP3Profile` metadata.

The [`LSP3Profile`](/standards/metadata/lsp3-profile-metadata.md#lsp3profile) data key has a special meaning. It enables you to edit your profile details
