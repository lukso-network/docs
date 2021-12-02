---
sidebar_label: 'Introduction'
sidebar_position: 4.1
---

# Introduction

:::caution This section is a work in progress.
:::

> To see Universal Profiles (🆙 ) live on the [L14 testnet](../../networks/l14-testnet.md), check out [universalprofile.cloud](https://universalprofile.cloud/). It lets you easily browse the deployed profiles.

Universal Profiles are smart contract accounts, that should be used instead of simple EOAs (simple generated keys), as they have the following advantages:

- Security is upgradeable, controlling keys or smart contracts can be changed over time, and even the whole key manager logic
- Accounts can attach information though [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y), meaning things from [profile information](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md) to protocols and other data, can be attached to your account.
- Accounts can react to incoming assets, due to the an upgradeable [Universal Receiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md).

A smart contract account can consist of 1 to 3 pieces:

- [ERC725Account](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md) (LSP0): This is your core account contract, it consists of [ERC725X](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725x) that allows you to interact with any address or smart contract on the blockchain, and [ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y) that allows you to store unlimited key value pairs at your account. It also contains [ERC1271](https://eips.ethereum.org/EIPS/eip-1271) to verify of messages where signed by the owner of the ERC725Account, if the owner is a KeyManager supporting ERC1271 it will delegate the call to the KeyManager. And lastly it contains the [LSP1-UniversalReceiver](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md), which allows this contract to be notified of any incoming asset. Using the UniversalReceiver Delegate logic, you can delegate the universal receiver call that an asset will do to an external contract, customizing the behaviour you want towards the asset. More on that below. _An ERC725Account can work standalone and doesn't require a KeyManager, or Universal Receiver Delegate to work, but that will limit the user experience._
- [LSP6-KeyManager](./lsp6-key-manager.md): This is a smart contract that can act as the owner of an [ERC725Account](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md). It reads permissions of addresses from the key value store of the ERC725Account contract, and restricts access based on these permissions.
- [LSP1-UniversalReceiverDelegate](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md): By setting the key `0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47` in your ERC725Account to a contract address, you can delegate any call to `universalReceiver(typeId, data)` to this contract, which allows you to revert on certain incoming assets, or add other logic. The [standard UniversalReceiverDelegate implementation](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/main/contracts/LSP1-UniversalReceiver) will on every received [LSP7 and LSP8](../nft-2.0/introduction.md) asset write those into your ERC725Account using the [LSP5-ReceivedAsset](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md) standard. This allows any interface to list all token contracts that hold a balance of your account, right from the smart contract.

## Adding profile information

To add profile information you can add the keys of [LSP3-UniversalProfile-Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md) to you ERC725Account.

## References

- [LUKSO Standards Proposals: LSP0 - ERC725 Account (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)
- [LUKSO Standards Proposals: LSP3 - Universal Profile Metadata (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)
- [LUKSO Standards Proposals: LSP6 - Key Manager (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP1UniversalReceiver)
