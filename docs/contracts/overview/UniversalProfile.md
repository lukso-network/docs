---
sidebar_position: 1
---

# Universal Profile

The `UniversalProfile.sol` smart contract is a combination of two LSP standards:
- **[LSP0-ERC725Account Standard](../../standards/universal-profile/lsp0-erc725account)** that also contains some LSP3Profile metadata, giving a "face and uniqueness" to the smart contract based account.
- **[LSP3-UniversalProfile-Metadata Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)**

The LSP3 Profile Metadata enables to give a "face" to the smart contract based account, making it distinguishable and unique from others Universal Profiles. 

A `UniversalProfile` as a smart contract can be used as a _blockchain-based account_ by humans, machines, organizations, or even other smart contracts.

## Functionalities & Behaviour

A `UniversalProfile` has all the basic functionalities of an _Externally Owned Account_ (EOA), as well as the following functions that give the contract additional features:

- [`execute(...)`](#execute) : enables to execute functions on other contracts, transfer value, or deploy new contracts.
- [`isValidSignature(...)`](#isvalidsignature): delivers verification of signatures and signed messages from EOAs.
- [`universalReceiver(...)`](#universalreceiver): brings notification of incoming calls and assets.
- [`setData(...)`](#setdata): offers to set information in the account storage.

All ownable functions such as `execute(..)`, `setData(..)`, `transferOwnership(..)`, and `renounceOwnership(..)` can be called by the owner 

The contract also includes the [LSP20-CallVerification](../../standards/universal-profile/lsp0-erc725account.md#lsp20---call-verification) at its core. Meaning if the contract is owned by an other contract, LSP20 enables to interact with the contract directly without having to resolve through its owner first. This allows seamless integrations with other contracts, protocols and dApps, as the contract can be called directly, making the developer experience easier.

To illustrate, if an other address than the owner calls the `execute(..)` function, the account contract will:

1. Forward the call to the owner. 
2. The execution of the function will only continue if the owner returns the `LSP20 MAGIC VALUE`, indicating that the caller is allowed to execute the function. 

The magic value can also determine if there should be any post-execution check on the owner. This same behavior applies to other ownable functions as well.

The structure allows the account to have a more dynamic and adaptable approach for managing function execution logic, using the **LSP20-CallVerification** standard.

## Adding metadata 

Unlike private keys and EOAs that cannot hold any metadata, a UniversalProfile is a blockchain based account that can have any info attached to it.

You can do so using the `setData(bytes32,bytes)` and `setDataBatch(bytes32[],bytes[])` functions to add, update or delete any metadata in your Universal Profile.

### Updating your `LSP3Profile` metadata.

The [`LSP3Profile`](../../standards/universal-profile/lsp3-profile-metadata.md#lsp3profile) data key has a special meaning. It enables you to edit your profile details