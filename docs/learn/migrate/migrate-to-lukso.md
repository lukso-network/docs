---
sidebar_label: '⛓ From other EVM Chains'
sidebar_position: 1
description: What to consider when building on LUKSO with LSPs (LUKSO Standard Proposals)?
---

# Migrate to LUKSO

:::info

This page gives an overview the differences between building on LUKSO vs other EVM chains.

For more information regarding the network and standards, see the [Introduction](../../standards/introduction.md) and [Concepts & Glossary](../concepts.md) pages.

:::

## Migrating from other EVM Chain

LUKSO is EVM-compatible, so any Ethereum smart contract can be redeployed on LUKSO by connecting to a [LUKSO RPC endpoint](../../networks/mainnet/parameters).

Developers are encouraged to use LSP standards to enhance the experience using their projects. Some codebases may need adjustments to convert ERC interactions to LSP interactions. More details are provided below.

## From Wallets to 🆙

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('../../../static/img/learn/profile-metadata-same-across-dapps.png').default}
    alt="`Examples of interacting with contracts, like minting tokens or refining burntpix."
    width="1200"
  />
<br/>
<i>3 x different dApps (UniversalProfile.cloud, Universal.Page and UniversalSwaps.io) using the same Universal Profile data.</i>
<br /><br />
</div>

Any traditional web3 wallet (_e.g: Metamask_) can interact with LUKSO dApps. Simply [add the LUKSO network in your wallet](../../networks/testnet/parameters.md) and switch to the LUKSO chain. You can start holding assets (LYX, tokens, and NFTs), transfer them, and deploy and interact with smart contracts.

However, the [Universal Profile Browser Extension](/install-up-browser-extension) provides more features and a better user experience when interacting with dApps. Universal Profiles (known as 🆙) are smart contract accounts that offer many benefits.

| Feature                                        | Benefits                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🗄️ Metadata in one place**                   | When using traditional web3 wallets, a user has to fill in its same infos again every time it creates a new account on a new dApp (_e.g: username, biography, social media accounts_) <br/> <br/>Universal Profile stores user data in one single place (the 🆙 contract storage). This allows any dApp to retrieve the same information, and makes dApp onboarding easier and faster.      |
| **⛽️ Gas-Less transactions**                  | Universal Profiles enable gas-less transactions. The relayer pay the gas fees and does not require the user to hold native tokens to pay for the transaction fee. <br/> <br/>Without a [Transaction Relay Service](../../standards/accounts/lsp15-transaction-relayer-api.md), the [controller](../concepts.md#controller) of the Universal Profile must be funded to execute transactions. |
| **🔑 Multi-Control through permissions**       | Universal Profiles can be controlled by multiple EOAs with various permission levels. Controllers can be on different devices or represent dApps, each with specific access rights, such as token transfers, playlist management, or account recovery.                                                                                                                                      |
| **📢 Notification and Reactivity**             | The 🆙 can be customized to react differently based on different events it receives. For instance, the default implementation automatically register new received assets.                                                                                                                                                                                                                   |
| **⚙️ Extendability with pluggable Extensions** | New features (like new function selectors not present by default in the smart contract code) can be added to a Universal Profile, using a system of extensions. <br/><br/>See our guide [**Extending Universal Profile functionalities**](../universal-profile/advanced-guides/extend-profile-functionalities.md) for more details.                                                         |

Universal Profiles can be controlled through multiple EOAs (and their associated private keys), where each private key can be allowed or restricted to specific actions via permissions.

These [**controllers**](../universal-profile/key-manager/get-controller-permissions.md) can be on multiple devices (laptop, desktop, mobile, hardware wallet like ledger) and represent:

- EOAs or other 🆙
- dapps protocols (defi trading app, gaming app), granted specific access to the Universal Profile.

Some real-life examples for a user's Universal Profile could be:

- A defi app can transfer only a specific token to a particular pool for trading.
- A music dApp can only update a list of music playlists in the Universal Profile's storage.
- A family member can be granted recovery access for trusted third-party recovery.

## From ERCs → to LSPs

:::info

For more details on the different functions and features between ERC20 and LSP7 or ERC721 and LSP8, check the [**Contracts > Token**](../../contracts/overview/Token/index.md)or [**Contracts > NFT**](../../contracts/overview/NFT/index.md) sections.

:::

Developers are encouraged to leverage the LSPs (**L**UKSO **S**tandards **P**roposals) to develop smart contracts, protocols and applications on LUKSO. The LSPs offer flexible functionalities that can:

- enable more complex and various features.
- be tailored to suit different use cases.
- bring a better experience to end dApp users.

To illustrate, builders can use the LSP7 and LSP8 Token standards instead of using ERC20/721 to develop Tokens or NFTs. The benefits offered by the LUKSO Token standards are summarized in the table below:

| Feature                                        | Benefits                                                                                                                                                                                                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **🔘 Similar function signatures**             | Both LSP7 and LSP8 use the same `transfer(...)` signature with the same parameter. The only exception is that LSP7 transfer a `uint256` amount while LSP8 transfer a `bytes32` token ID.                                                         |
| **🗄️ Dynamic Metadata**                        | Like Universal Profile, Digital Assets like LSP7 and LSP8 can hold as many metadata as they want, allowing to storing various information and create systems such as dynamic NFTs.                                                               |
| **📢 Notify on Transfer**                      | Sender & Receiver are notified on each token transfer, allowing them to react accordingly based on the type of token they sent / received.                                                                                                       |
| **⚙️ Extendability with pluggable Extensions** | New features (like new function selectors not present by default in the smart contract code) can be added to a Digital Asset, using a system of extensions.                                                                                      |
| **✋🏻 Safety to prevent accidental transfers**  | The `transfer(...)` function of LSP7 and LSP8 contain a [`bool force`](../../standards/tokens/LSP7-Digital-Asset#force-mint-and-transfer) parameter that can prevent accidental transfer to addresses that cannot hold or re-transfer the token. |

As developers interact with smart contracts with different or custom functionalities, verifying certain conditions and methods are set before interacting with them is always recommended. Such checks can be done by detecting interfaces and metadata of the given address
