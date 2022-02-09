---
sidebar_label: 'Introduction'
sidebar_position: 1
---

# Universal Profiles

:::success Useful Tip

The [Guides Section](../../guides/universal-profile/create-profile) will take you through the process of creating a Universal Profile and deploying it on the [L14 testnet](../../networks/l14-testnet.md), check out [universalprofile.cloud](https://universalprofile.cloud/). It lets you easily browse the deployed profiles.

:::

## Introduction

Building an identity on top of keys is almost impossible because at some point, they are very likely to be leaked or lost forever. Holding assets and building reputation on these keys makes it worse. A better representation of identity would be with blockchain based accounts.

Blockchain based accounts can change the way of interacting on-chain, they allow the usage of multiple component together. They could be used with a Key Manager where you could allow any entity to execute or set some data on your profile. A social recovery contract could be used in case of keys-loss and many more component that enhance the blockchain experience.

## Universal Profiles

- **[LSP0 - ERC725Account](./01-lsp0-erc725account.md)**: This standard represents the core account contract, it consists of [ERC725X](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725x) that allows you to interact with any address or smart contract on the blockchain, and [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) that allows you to store unlimited key value pairs at your account. It also contains [ERC1271](https://eips.ethereum.org/EIPS/eip-1271) to verify of messages where signed by the owner of the ERC725Account, if the owner is a KeyManager supporting ERC1271 it will delegate the call to the KeyManager. And lastly it contains the [LSP1-UniversalReceiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md), which allows this contract to be notified of any incoming asset. Using the UniversalReceiver Delegate logic, you can delegate the universal receiver call that an asset will do to an external contract, customizing the behaviour you want towards the asset. More on that below.  
  A LSP0-ERC725Account can work standalone and doesn't require a KeyManager, or a UniversalReceiverDelegate to work, but that will limit the user experience.

- **[LSP6-KeyManager](./04-lsp6-key-manager.md)**: A standard representing a smart contract that can act as the owner of an [ERC725Account](./01-lsp0-erc725account.md). It reads permissions of addresses from the key value store of the ERC725Account contract, and restricts access based on these permissions.

- **[LSP1-UniversalReceiverDelegate](./02-lsp1-universal-receiver-delegate.md)**: By setting the [LSP1UniversalReceiver](../generic-standards/lsp1-universal-receiver#extension) key in your ERC725Account to a contract address, you can delegate any call to the universalReceiver function of the account to this contract, which allows you to revert on certain incoming assets, or add other logic. The [standard UniversalReceiverDelegate implementation](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/main/contracts/LSP1-UniversalReceiver) will write every [LSP7 and LSP8](../nft-2.0/01-introduction.md) asset you receive into your ERC725Account using the [LSP5-ReceivedAsset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md) standard. This allows any interface to list all token contracts that hold a balance of your account, right from the smart contract.

## Adding profile information

The **[LSP0-ERC725Account](./01-lsp0-erc725account.md)** standard represents a blockchain based account that does not contain any metadata describing the account. It's important to standardize specific keys to give the account a unique character and to look like a normal **web2 profile**.

**[LSP3-UniversalProfile-Metadata](./03-lsp3-universal-profile-metadata.md)** is a standard used to add profile information, by setting its defined keys in the account storage. The combination of these 2 standards forms a **UniversalProfile**.

## References

- [LUKSO Standards Proposals: LSP0 - ERC725 Account (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)
- [LUKSO Standards Proposals: LSP3 - Universal Profile Metadata (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)
- [LUKSO Standards Proposals: LSP6 - Key Manager (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP1UniversalReceiver)
