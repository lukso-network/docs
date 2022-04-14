---
sidebar_label: 'Introduction'
sidebar_position: 1
---

# Universal Profiles

:::success Useful Tip

The [Guides Section](../../guides/universal-profile/create-profile) will take you through the process of creating a Universal Profile and deploying it on the [L14 testnet](../../networks/l14-testnet.md), check out [universalprofile.cloud](https://universalprofile.cloud/). It lets you easily browse the deployed profiles.

:::

## Introduction

Building an identity on top of keys is almost impossible because keys are likely to be leaked or lost forever. Holding assets and building a reputation on these keys makes it worse. A better representation of identity would be with blockchain-based accounts.

Blockchain-based accounts can change the way of interacting on-chain, allowing the usage of multiple components together. Used in combination with a Controller (see Key Manager), they could allow any entity to execute or set some data on your profile. Finally, developers could use contracts for social recovery if keys are lost. All these components together can enhance the blockchain experience.

## Universal Profiles

<table>
    <tr>
        <th>Standard</th>
        <th>Description</th>
    </tr>
    <tr>
        <td> <img src="/img/standards/lsp0-erc725account-contract.jpeg"></img></td>
        <td><a href="./lsp0-erc725account/">LSP0 - ERC725Account</a>: This standard represents the core account contract. It consists of <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725x">ERC725X</a>, allowing a contract to interact with any address or smart contract on the blockchain, and <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y">ERC725Y</a>. This generic key-value store that allows for storing an unlimited amount of data in the smart contract. It also contains <a href="https://eips.ethereum.org/EIPS/eip-1271">ERC1271</a> to verify if the ERC725Account's owner signed messages. If the owner is a Key Manager supporting ERC1271, it will delegate the call to the KeyManager. Lastly, it contains the <a href="../generic-standards/lsp1-universal-receiver/">LSP1-UniversalReceiver</a>, which allows this contract to be notified of any incoming asset. Using the <a href="./lsp1-universal-receiver-delegate/">LSP1-UniversalReceiverDelegate</a> logic, you can delegate the universal receiver call that an asset will do to an external contract, customizing the behavior you want towards the asset- more on that below.</td>
    </tr>
    <tr>
        <td> <img src="/img/standards/lsp6-key-manager-contract.jpeg"></img></td>
        <td><a href="./lsp6-key-manager/">LSP6 - KeyManager</a>: A standard representing a smart contract that can act as the owner of an <a href="./lsp0-erc725account/">LSP0ERC725Account</a>. It reads permissions of addresses from the ERC725Account's key-value store, and restricts access based on these permissions.</td>
    </tr>
    <tr>
        <td> <img src="/img/standards/lsp1-universal-receiver-delegate-contract.jpeg"></img></td>
        <td><a href="./lsp1-universal-receiver-delegate/">LSP1 - UniversalReceiverDelegate</a>: By setting the <a href="../generic-standards/lsp1-universal-receiver">LSP1UniversalReceiverDelegate</a> key in your ERC725Account to a contract address, you can delegate any call to the `universalReceiver(...)` function of the account to this contract, which allows you to revert on certain incoming assets or add other logic. The <a href="../smart-contracts/lsp1-universal-receiver-delegate-up/">standard LSP1-UniversalReceiverDelegate implementation</a> will write every <a href="../nft-2.0/introduction/">LSP7 and LSP8</a> asset you receive into your ERC725Account using the <a href="./lsp5-received-assets/">LSP5 - ReceivedAsset</a> standard. This allows any interface to list all token contracts that hold a balance of your account, right from the smart contract.</td>
    </tr>
</table>

:::note

An LSP0-ERC725Account can work standalone and doesn't require a Key Manager or a Universal Receiver Delegate, but this will limit the user experience.

:::

## Adding profile information

The **[LSP0-ERC725Account](./02-lsp0-erc725account.md)** standard represents a blockchain-based account that does not contain any metadata describing the account. It's important to standardize specific keys to give the account a unique character and look like a typical **Web2 profile**.

**[LSP3-UniversalProfile-Metadata](./04-lsp3-universal-profile-metadata.md)** is a standard used to add profile information by setting its defined keys in the account storage. The combination of these two standards forms a **Universal Profile**.

## References

- [LUKSO Standards Proposals: LSP0 - ERC725 Account (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)
- [LUKSO Standards Proposals: LSP3 - Universal Profile Metadata (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)
- [LUKSO Standards Proposals: LSP6 - Key Manager (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md)
- [LSP1 Universal Receiver: Solidity implementations (GitHub)](https://github.com/lukso-network/lsp-universalprofile-smart-contracts/tree/develop/contracts/LSP1UniversalReceiver)
