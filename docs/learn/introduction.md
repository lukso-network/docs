---
sidebar_label: '🌏 Overview'
description: Overview of the benefits of using LUKSO Standard Proposals (LSPs)
---

# 🌏 Overview

This page highlights the benefits of using the LUKSO Standard Proposals (LSPs) and outlines the differences between building on LUKSO compared to other EVM chains.

## Why New Standards?

By integrating different LSPs in unique ways, LUKSO solves fundamental blockchain problems:

<table class="lsp-features">
    <tr>
        <td><h3>[👩‍🎤 Standardised On-Chain profile](/standards/metadata/lsp3-profile-metadata.md)</h3>Users can build their profiles on-chain, adding images, tags, descriptions and links to their accounts to shape their online persona. <br /> <br /> Standardizing accounts prevents delays in adoption caused by unpredictable changes. It ensures all developers follow a unified behavior, enabling consistent and reliable development on top of the account. </td>
         <td><h3>[📝 Updatable and flexible metadata](/standards/metadata/lsp2-json-schema.md)</h3>Metadata can be updated, enabling dynamic NFTs that can change certain properties over time, while other properties remain immutable.</td>
    </tr>
    <tr>
        <td><h3>[📢 Notifications and Reactability](/standards/accounts/lsp1-universal-receiver.md)</h3>The ability to be notified and react on different actions is essential for an account to become more interactive and social by emitting a unique event to the network with the action being informed about, which can be parsed by interfaces and off chain clients.</td>
        <td><h3>[⛽️ Gasless experience](./concepts.md#transaction-relay-service)</h3>Universal Profiles support Transaction Relay Services that cover the gas for users's transactions. Users won't have the burden of getting the native token of the chain to start interacting with your application.</td>
    </tr>
    <tr>
        <td><h3>[💫 Extend your account over time](/standards/accounts/lsp17-contract-extension.md)</h3>Users can extend their account over time seamlessly, with no need to alter code and redeploy the associated smart contract.</td>
        <td><h3>[🔓 Upgradeable security](/standards/access-control/lsp6-key-manager)</h3>Universal Profiles can be owned by any EOA or smart contract (_e.g: multisig_). And users can control their accounts through multiple devices and applications, each of them with different permissions.<br /><br /> This also allow the creation of services like social recovery, through family, friends or trustless dApps.</td>
    </tr>
    <tr>
        <td><h3>[🚦 Permission System](../learn/universal-profile/key-manager/grant-permissions.md)</h3>A robust permission system allows fine-grained control over who can perform certain actions on the contract.<br /> <br /> This is essential for managing access rights and maintaining security, especially in complex systems with multiple users or roles while having the permissions and restrictions stored within the profile.</td>
        <td><h3>[✍️ ✍️Multi Sig](../learn/universal-profile/key-manager/grant-permissions.md)</h3>The use of multisig provide an extra layer of security to manage the account.</td>
    </tr>
    <tr>
        <td><h3>[🪝 Pre and Post Execution Hooks](/standards/tokens/LSP7-Digital-Asset#lsp1-token-hooks)</h3>These hooks allow additional logic to be executed before and after the main function call. This feature, available through LSP20 in Universal Profiles, provides greater control over contract behavior and enables advanced use cases.</td>
        <td><h3>🇨🇭🔪 Multi-purpose</h3>The ability to serve various roles (like being a DAO, organization, Brands, AI, robot, etc.) showcases the versatility of the contract. This flexibility is important for supporting a wide range of applications and adapting to different use cases.</td>
    </tr>
</table>

## Key Benefits

The table below highlights the features of the LSPs and their benefits:

| Feature                                        | Benefits                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🗄️ Metadata in one place**                   | When using traditional web3 wallets, a user has to fill in its same infos again every time it creates a new account on a new dApp (_e.g: username, biography, social media accounts_) <br/> <br/>Universal Profile stores user data in one single place (the 🆙 contract storage). This allows any dApp to retrieve the same information, and makes dApp onboarding easier and faster.  |
| **⛽️ Gas-Less transactions**                  | Universal Profiles enable gas-less transactions. The relayer pay the gas fees and does not require the user to hold native tokens to pay for the transaction fee. <br/> <br/>Without a [Transaction Relay Service](../standards/accounts/lsp15-transaction-relayer-api.md), the [controller](./concepts.md#controller) of the Universal Profile must be funded to execute transactions. |
| **🔑 Multi-Control through permissions**       | Universal Profiles can be controlled by multiple EOAs with various permission levels. Controllers can be on different devices or represent dApps, each with specific access rights, such as token transfers, playlist management, or account recovery.                                                                                                                                  |
| **📢 Notification and Reactivity**             | The 🆙 can be customized to react differently based on different events it receives. For instance, the default implementation automatically register new received assets.                                                                                                                                                                                                               |
| **⚙️ Extendability with pluggable Extensions** | New features (like new function selectors not present by default in the smart contract code) can be added to a Universal Profile, using a system of extensions. <br/><br/>See our guide [**Extending Universal Profile functionalities**](./universal-profile/advanced-guides/extend-profile-functionalities.md) for more details.                                                      |

### Universal Profiles Compared to Other Smart Wallets

|                                | Gnosis SAFE                | Base Smart Contract Account | EIP 6900 Modular Smart Contract account | Universal Profiles                                                                                  |
| ------------------------------ | -------------------------- | --------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Profile like information       | ❌                         | ❌                          | ❌                                      | ✅ Through [LSP3](../standards/metadata/lsp3-profile-metadata)                                                                                                 |
| Generic Information Storage    | ❌                         | ❌                          | ❌                                      | ✅ Through [ERC725Y](../standards/accounts/lsp0-erc725account.md#erc725y---generic-key-value-store) |
| Notifications and Reactability | ❌                         | ❌                          | ❌                                      | ✅ Through [LSP1](../standards/accounts/lsp1-universal-receiver.md)                                 |
| Permission System              | ❌                         | ❌                          | ❌                                      | ✅ Through [LSP6](../standards/access-control/lsp6-key-manager.md)                                  |
| Multisig                       | ✅                         | ❌                          | ❌                                      | 🔶 Can be controlled by a multisig                                                                  |
| Multi purpose                  | 🔶 (With future extension) | 🔶 (With future extension)  | 🔶 (With future extension)              | ✅ Can be a DAO, Organisation, Brand, AI, Robot, etc through and permissions [LSP6]                 |
| Gasless Experience             | ✅                         | ✅                          | ✅                                      | ✅ via the [Transaction Relayer](../standards/accounts/lsp15-transaction-relayer-api.md)            |
| Extensible                     | ✅                         | ✅                          | ✅                                      | ✅ Through [LSP17](../standards/accounts/lsp17-contract-extension.md)                               |
| Upgradeable Security           | ✅                         | ✅                          | ✅                                      | ✅ Through [LSP14](../standards/access-control/lsp14-ownable-2-step.md)                             |
| Pre and Post Execution Hooks   | ✅                         | ✅                          | ✅                                      | ✅ Through [LSP20](../standards/accounts/lsp20-call-verification.md)                                |

### Features of LSP token standards over ERC20 and ERC721

The benefits offered by the LUKSO Token standards are summarized in the table below:

| Feature                                        | Benefits                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🔘 Similar function signatures**             | Both [LSP7](../standards/tokens/LSP7-Digital-Asset.md) and [LSP8](../standards/tokens/LSP8-Identifiable-Digital-Asset.md) use the same `transfer(...)` signature with the same parameter. The only exception is that LSP7 transfer a `uint256` amount while LSP8 transfer a `bytes32` token ID.                                                      |
| **🗄️ Dynamic Metadata**                        | Like Universal Profile, Digital Assets like LSP7 and LSP8 can hold as many metadata as they want, allowing to storing various information and create systems such as dynamic NFTs.                                                                                                                                                                   |
| **📢 Notify on Transfer**                      | Sender & Receiver are notified on each token transfer, allowing them to react accordingly based on the type of token they sent / received.                                                                                                                                                                                                           |
| **⚙️ Extendability with pluggable Extensions** | New features (like new function selectors not present by default in the smart contract code) can be added to a Digital Asset, using a system of extensions.                                                                                                                                                                                          |
| **✋🏻 Safety to prevent accidental transfers**  | The `transfer(...)` function of [LSP7](../standards/tokens/LSP7-Digital-Asset.md) and [LSP8](../standards/tokens/LSP8-Identifiable-Digital-Asset.md) contain a [`bool force`](../standards/tokens/LSP7-Digital-Asset#force-mint-and-transfer) parameter that can prevent accidental transfer to addresses that cannot hold or re-transfer the token. |

:::success
Interested to migrate? Visit our guides:

- [Migrate ERC20 to LSP7](./migrate/migrate-erc20-to-lsp7.md)
- [Migrate ERC721 to LSP8](./migrate/migrate-erc721-to-lsp8.md)
  :::

## Building on LUKSO

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/kJ5_6LN6mZc?si=7NWn-odkk8KmSDLz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

### Developer Resources

LUKSO is an L1 EVM-based Blockchain. All tools and tutorials for Ethereum also work for LUKSO by default.

Developers building on LUKSO can write smart contracts in any EVM-based smart contract languages (Solidity, Vyper, etc...), and use existing standards already developed for other Ethereum networks.

- [Awesome LUKSO, a comprehensive list of awesome LUKSO resources!](https://github.com/lukso-network/awesome-lukso)
- [What are the main features of LUKSO standards?](../faq/onboarding/lukso-standards.md#what-are-the-main-features-of-lsps)
- [Learning Tools of the Ethereum Foundation](https://ethereum.org/en/developers/learning-tools/)
