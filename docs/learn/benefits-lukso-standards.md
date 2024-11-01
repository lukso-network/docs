---
sidebar_label: '🌟 Benefits of LUKSO Standards'
description: 'Overview of the benefits of using LUKSO Standard Proposals (LSPs)'
---

# Benefits of the LUKSO Standards

This page highlights the benefits of using the LUKSO Standard Proposals (LSPs) and outlines the differences between building on LUKSO compared to other EVM chains.

## Key Benefits

The table below highlights the features of the LSPs and their benefits:

| Feature                                        | Benefits                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🗄️ Metadata in one place**                   | When using traditional web3 wallets, a user has to fill in its same infos again every time it creates a new account on a new dApp (_e.g: username, biography, social media accounts_) <br/> <br/>Universal Profile stores user data in one single place (the 🆙 contract storage). This allows any dApp to retrieve the same information, and makes dApp onboarding easier and faster.  |
| **⛽️ Gas-Less transactions**                  | Universal Profiles enable gas-less transactions. The relayer pay the gas fees and does not require the user to hold native tokens to pay for the transaction fee. <br/> <br/>Without a [Transaction Relay Service](../standards/accounts/lsp15-transaction-relayer-api.md), the [controller](./concepts.md#controller) of the Universal Profile must be funded to execute transactions. |
| **🔑 Multi-Control through permissions**       | Universal Profiles can be controlled by multiple EOAs with various permission levels. Controllers can be on different devices or represent dApps, each with specific access rights, such as token transfers, playlist management, or account recovery.                                                                                                                                  |
| **📢 Notification and Reactivity**             | The 🆙 can be customized to react differently based on different events it receives. For instance, the default implementation automatically register new received assets.                                                                                                                                                                                                               |
| **⚙️ Extendability with pluggable Extensions** | New features (like new function selectors not present by default in the smart contract code) can be added to a Universal Profile, using a system of extensions. <br/><br/>See our guide [**Extending Universal Profile functionalities**](./universal-profile/advanced-guides/extend-profile-functionalities.md) for more details.                                                      |

## Universal Profiles Compared to Other Smart Wallets

|                                | Gnosis SAFE                | Base Smart Contract Account | EIP 6900 Modular Smart Contract account | Universal Profiles                                                                                  |
| ------------------------------ | -------------------------- | --------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Profile like information       | ❌                         | ❌                          | ❌                                      | ✅ Through [LSP3](../standards/metadata/lsp3-profile-metadata)                                      |
| Generic Information Storage    | ❌                         | ❌                          | ❌                                      | ✅ Through [ERC725Y](../standards/accounts/lsp0-erc725account.md#erc725y---generic-key-value-store) |
| Notifications and Reactability | ❌                         | ❌                          | ❌                                      | ✅ Through [LSP1](../standards/accounts/lsp1-universal-receiver.md)                                 |
| Permission System              | ❌                         | ❌                          | ❌                                      | ✅ Through [LSP6](../standards/access-control/lsp6-key-manager.md)                                  |
| Multisig                       | ✅                         | ❌                          | ❌                                      | 🔶 Can be controlled by a multisig                                                                  |
| Multi purpose                  | 🔶 (With future extension) | 🔶 (With future extension)  | 🔶 (With future extension)              | ✅ Can be a DAO, Organisation, Brand, AI, Robot, etc through and permissions [LSP6]                 |
| Gasless Experience             | ✅                         | ✅                          | ✅                                      | ✅ via the [Transaction Relayer](../standards/accounts/lsp15-transaction-relayer-api.md)            |
| Extensible                     | ✅                         | ✅                          | ✅                                      | ✅ Through [LSP17](../standards/accounts/lsp17-contract-extension.md)                               |
| Upgradeable Security           | ✅                         | ✅                          | ✅                                      | ✅ Through [LSP14](../standards/access-control/lsp14-ownable-2-step.md)                             |
| Pre and Post Execution Hooks   | ✅                         | ✅                          | ✅                                      | ✅ Through [LSP20](../standards/accounts/lsp20-call-verification.md)                                |

As shown from the table above, the [Universal Profile Browser Extension](/install-up-browser-extension) provides more features and a better user experience when interacting with dApps. Universal Profiles (known as 🆙) are smart contract accounts that offer many benefits.

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('/img/learn/profile-metadata-same-across-dapps.png').default}
    alt="`Examples of interacting with contracts, like minting tokens or refining burntpix."
    width="1200"
  />
<br/>
<i>3 x different dApps (UniversalProfile.cloud, Universal.Page and UniversalSwaps.io) using the same Universal Profile data.</i>
<br /><br />
</div>

<!-- TODO: define if duplicate -->
<!-- | Feature                                        | Benefits                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🗄️ Metadata in one place**                   | When using traditional web3 wallets, a user has to fill in its same infos again every time it creates a new account on a new dApp (_e.g: username, biography, social media accounts_) <br/> <br/>Universal Profile stores user data in one single place (the 🆙 contract storage). This allows any dApp to retrieve the same information, and makes dApp onboarding easier and faster.      |
| **⛽️ Gas-Less transactions**                  | Universal Profiles enable gas-less transactions. The relayer pay the gas fees and does not require the user to hold native tokens to pay for the transaction fee. <br/> <br/>Without a [Transaction Relay Service](../../standards/accounts/lsp15-transaction-relayer-api.md), the [controller](../concepts.md#controller) of the Universal Profile must be funded to execute transactions. |
| **🔑 Multi-Control through permissions**       | Universal Profiles can be controlled by multiple EOAs with various permission levels. Controllers can be on different devices or represent dApps, each with specific access rights, such as token transfers, playlist management, or account recovery.                                                                                                                                      |
| **📢 Notification and Reactivity**             | The 🆙 can be customized to react differently based on different events it receives. For instance, the default implementation automatically register new received assets.                                                                                                                                                                                                                   |
| **⚙️ Extendability with pluggable Extensions** | New features (like new function selectors not present by default in the smart contract code) can be added to a Universal Profile, using a system of extensions. <br/><br/>See our guide [**Extending Universal Profile functionalities**](../universal-profile/advanced-guides/extend-profile-functionalities.md) for more details.                                                         | -->

Universal Profiles can be controlled through multiple EOAs (and their associated private keys), where each private key can be allowed or restricted to specific actions via permissions.

These [**controllers**](../universal-profile/key-manager/get-controller-permissions.md) can be on multiple devices (laptop, desktop, mobile, hardware wallet like ledger) and represent:

- EOAs or other 🆙
- dapps protocols (defi trading app, gaming app), granted specific access to the Universal Profile.

Some real-life examples for a user's Universal Profile could be:

- A defi app can transfer only a specific token to a particular pool for trading.
- A music dApp can only update a list of music playlists in the Universal Profile's storage.
- A family member can be granted recovery access for trusted third-party recovery.

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
  j
