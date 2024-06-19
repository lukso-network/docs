---
sidebar_label: '🔀 Migrate to LUKSO'
sidebar_position: 6
description: What to consider when building on LUKSO with LSPs (LUKSO Standard Proposals)?
---

# Migrate to LUKSO

:::info

This page gives an overview the differences between building on LUKSO vs other EVM chains.

For more information regarding the network and standards, see the [Introduction](./introduction.md) and [Concepts & Glossary](./concepts.md) pages.

:::

## Migrating from other EVM Chains

As LUKSO is an EVM-compatible chain ("Ethereum twin"), any smart contract written for Ethereum (compiling to EVM bytecode) can be re-deployed on LUKSO. You only need to set up your application to connect to a [LUKSO RPC endpoint](../networks/mainnet/parameters) to deploy it on the LUKSO chain.

Developers are encouraged to use the LSP standards to leverage their features and improve the features and overall experience of their protocols. Therefore, some codebases might require to be adjusted to convert ERC interactions to LSP interactions. The section below provides more details.

## From Wallets → to 🆙

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('../../static/img/learn/profile-metadata-same-across-dapps.png').default}
    alt="`Examples of interacting with contracts, like minting tokens or refining burntpix."
    width="1200"
  />
<br/>
<i>3 x different dApps (UniversalProfile.cloud, Universal.Page and UniversalSwaps.io), that same Universal Profile's information shared across each dApp.</i>
<br /><br />
</div>

Any traditional web3 wallet (Metamask, etc.) can interact with dApps on LUKSO. [Add LUKSO the list of networks](../networks/testnet/parameters.md) in your wallet and switch to the LUKSO chain. You can start holding assets (LYX, tokens, and NFTs), transfer them, and deploy and interact with smart contracts.

However, the [Universal Profile Browser Extension](/install-up-browser-extension) provides a richer user experience for interacting with dApps and additional features. [Universal Profiles](../standards/universal-profile/introduction.md) (known as 🆙) are smart contract accounts that come with many benefits for users.

| Feature                                        | Benefits                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🗄️ Metadata in one place**                   | When using traditional web3 wallets, a user has to fill in its same infos again every time it creates a new account on a new dApp (_e.g: username, biography, social media accounts_) <br/> <br/>Universal Profile stores user data in one single place (the 🆙 contract storage). This allows any dApp to retrieve the same information, and makes dApp onboarding easier and faster. |
| **⛽️ Gas-Less transactions**                  | Universal Profiles enable gas-less transactions. The relayer pay the gas fees and does not require the user to hold native tokens to pay for the transaction fee. <br/> <br/>Without a [Transaction Relay Service](../standards/relayer-api.md), the [controller](./concepts.md#controller) of the Universal Profile must be funded to execute transactions.                           |
| **🔑 Multi-Control through permissions**       | Universal Profiles can be controlled by multiple EOAs with various permission levels. Controllers can be on different devices or represent dApps, each with specific access rights, such as token transfers, playlist management, or account recovery.                                                                                                                                 |
| **📢 Notification and Reactivity**             | The 🆙 can be customized to react differently based on different events it receives. For instance, the default implementation automatically register new received assets.                                                                                                                                                                                                              |
| **⚙️ Extendability with pluggable Extensions** | New features (like new function selectors not present by default in the smart contract code) can be added to a Universal Profile, using a system of extensions. <br/><br/>See our guide [**Extending Universal Profile functionalities**](./expert-guides/universal-profile/extend-profile-functionalities.md) for more details.                                                       |

Universal Profiles can be controlled through multiple EOAs (and their associated private keys), where each private keys can granted multiple level of [permissions](../standards/universal-profile/lsp6-key-manager#types-of-permissions) to allow or restrict to do specific actions.

These private keys (named [**controllers**](../learn/key-manager/get-controller-permissions.md)) can live on multiple devices (laptop, desktop, mobile, hardware wallet like ledger). They can also represent EOAs that are other 🆙, or dapps protocols (defi trading app, gaming app), that is granted specific access on the Universal Profile. For instance, dApps could be permissioned as follow:

- a defi app can transfer only a specific token to a specific pool for trading.
- a music dApp can only specific the list of music playlist in the Universal Profile's storage.
- a family member can be granted recovery access for trusted third party recovery.

## From ERCs → to LSPs

When building smart contracts and protocols on LUKSO, developers are encouraged to leverage the LSPs (**L**UKSO **S**tandards **P**roposals) to build applications and protocols that offer more flexible use cases and a better experience.

For instance, instead of using ERC20/721 to build Tokens or NFT contracts, builders are encourage to use the LSP7 and LSP8 Token standards. These provide features such as customizable and dynamic metadata, automatic notification on token transfers and pluggable extensions.

For more details on the different functions and features between ERC20 and LSP7, or ERC721 and LSP8, check the [**Contracts > Digital Assets**](../contracts/overview/DigitalAssets.md) section.

As developers interact with smart contracts with different or custom functionalities, verifying that certain conditions and methods are set before interacting with them is always recommended. Such checks can be done by detecting interfaces and metadata of the given address
