---
sidebar_label: '🌟 Benefits of LUKSO Standards'
description: 'Overview of the benefits of using LUKSO Standard Proposals (LSPs)'
---

# Benefits of the LUKSO Standards

This page highlights the benefits of using the LUKSO Standard Proposals (LSPs). The tables below summarize the LSP features:

## Universal Profiles vs. Smart Wallets

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

| Feature                                        | Benefits                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🗄️ Metadata in one place**                   | When using traditional web3 wallets, a user has to fill in its same infos again every time it creates a new account on a new dApp (_e.g: username, biography, social media accounts_) <br/> <br/>Universal Profile stores user data in one single place (the 🆙 contract storage). This allows any dApp to retrieve the same information, and makes dApp onboarding easier and faster.  |
| **⛽️ Gas-Less transactions**                  | Universal Profiles enable gas-less transactions. The relayer pay the gas fees and does not require the user to hold native tokens to pay for the transaction fee. <br/> <br/>Without a [Transaction Relay Service](../standards/accounts/lsp15-transaction-relayer-api.md), the [controller](./concepts.md#controller) of the Universal Profile must be funded to execute transactions. |
| **🔑 Multi-Control through permissions**       | Universal Profiles can be controlled by multiple EOAs with various permission levels. Controllers can be on different devices or represent dApps, each with specific access rights, such as token transfers, playlist management, or account recovery.                                                                                                                                  |
| **📢 Notification and customized Reactivity**  | The 🆙 can be customized to react differently based on different events it receives. For instance, the default implementation automatically register new received assets.                                                                                                                                                                                                               |
| **⚙️ Extendability with pluggable Extensions** | New features (like new function selectors not present by default in the smart contract code) can be added to a Universal Profile, using a system of extensions. <br/><br/>See our guide [**Extending Universal Profile functionalities**](./universal-profile/advanced-guides/extend-profile-functionalities.md) for more details.                                                      |

Universal Profiles can be controlled through multiple EOAs (and their associated private keys), where each private key can be allowed or restricted to specific actions via permissions.

These [**controllers**](./universal-profile/key-manager/get-controller-permissions.md) can be on multiple devices (laptop, desktop, mobile, hardware wallet like ledger) and represent:

- EOAs or other 🆙
- dapps protocols (defi trading app, gaming app), granted specific access to the Universal Profile.

Some real-life examples for a user's Universal Profile could be:

- A defi app can transfer only a specific token to a particular pool for trading.
- A music dApp can only update a list of music playlists in the Universal Profile's storage.
- A family member can be granted recovery access for trusted third-party recovery.

## LSP7/8 Token standards vs. ERC20/721

:::success Useful guides

Interested to migrate your token or NFT collection? See our hands-on developer guides:

- [Migrate from ERC20 to LSP7](./migrate/migrate-erc20-to-lsp7.md)
- [Migrate from ERC721 to LSP8](./migrate/migrate-erc721-to-lsp8.md)

:::

Below are the benefits offered by the LUKSO Token standards [**LSP7 Digital Asset**](../standards/tokens/LSP7-Digital-Asset.md) and [**LSP8 Identifiable Digital Asset**](../standards/tokens/LSP8-Identifiable-Digital-Asset.md).

| Feature                                                           | Benefits                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🔘 Easier functions for developers**                            | Stop learning different functions based on different token standards as a developer (). <br/> LSP7 and LSP8 use the **same function names** for transfer and operator approvals with only one different parameter type depending if you are transferring a token or NFT.                                                                       |
| **🗄️ Unlimited & Dynamic Metadata for Tokens & NFTs**             | Your NFT is not an image anymore. It can hold as many information as imagined (custom traits, attributes, ...) and you can make this information evolve overtime.                                                                                                                                                                              |
| **䷓ Flexible Batching functionalities**                           | Distibute multiple tokens or NFTs easily to users using `transferBatch(...)` or perform multiple actions at once in a single transaction with `batchCalls(...)`. <br/> _e.g: authorize multiple oerators, transfer an NFT and update its metadata, etc..._.                                                                                    |
| **📢 Notify sender & recipient(s) on transfer and new operators** | Sender is notified as _"I have sent tokens"_, recipient is notified as _"I have received tokens"_ and both can implement custom logic to react on these notifications. <br/><br/>**Finished the old _"approve me then transfer as an operator"_ flow!**. The new way is using the Universal Receiver and automatic reactions on notifications! |
| **⚙️ Extendability with pluggable Extensions**                    | New features (like new function selectors not present by default in the smart contract code) can be added to a Digital Asset, using a system of extensions.                                                                                                                                                                                    |
| **✋🏻 Safety to prevent accidental transfers**                     | Prevent by default from creating new bad internet stories on Google like _"I have transferred tokens to the wrong wallet address. How can I recover them?"_.                                                                                                                                                                                   |

### 🔘 Similar function signatures

Both [LSP7](../standards/tokens/LSP7-Digital-Asset.md) and [LSP8](../standards/tokens/LSP8-Identifiable-Digital-Asset.md) use the same function to transfer tokens, with almost the same parameters.

- LSP7 [`transfer(address,address,uint256,bool,bytes)`](../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#transfer) function uses a **`uint256`** parameter to transfer an **amount**.
- LSP8 [`transfer(address,address,bytes32,bool,bytes)`](../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#transfer) function uses a **`bytes32`** parameter to transfer a [**token ID**](../standards/tokens/LSP8-Identifiable-Digital-Asset.md#format-of-tokenids).

Similarly, they both use the same function `authorizeOperator(address,[uint256/bytes32],bytes)` to approve new operators for a token allowance or specific token Ids.

### 🗄️ Unlimited & Dynamic Metadata

Like Universal Profile, digital assets based on the LSP7 and LSP8 standards can hold an **unlimited quantity of metadata** for any various type of information considered relevant to the token or NFT collection. This can include:

- Icons and image.
- The creators of the tokens / NFT collection.
- The list of exchanges where this token can be found.

LSP8 also allows to create more complex and rich NFT collections where **each NFT can have its own custom metadata**. Setting metadata specific to each NFT is done using the standardized functions [`setDataForTokenId(...)` and `setDataBatchForTokenIds(...)`](../contracts/overview/NFT/set-nft-metadata.md). This is useful for instance for:

- NFTs that need to hold specific items like digital clothing items for avatars, or weapons / body armors in a video game.
- dynamic NFTs, where any information, traits or attributes of a NFT could be programmed to change or evolve overtime according to certain conditions, logics or triggers.

### 📢 Notify on Transfer

On each token transfers, bother sender & recipient are notified that a token transfer happened. This notification includes a specific notification ID (_e.g: "I have sent / received some tokens / NFTs"_. See typeIds for more infos).

In addition, it is possible to program and _"plug-in"_ custom logic contracts called [**Universal Receiver Delegate**](../standards/accounts/lsp1-universal-receiver-delegate.md) to the sender and recipient, so that they can automatically react based on these different type of notifications. For example:

- Registering / Removing tokens from your list of received assets.
- Block receiving spam tokens that can contain malicious logic to steal user's funds if interacting with such token contracts, by filtering them against a spam or blacklist registry.
- Forward automatically a certain percentage of the tokens received to a specific address (_e.g: a Vault to implement "save the change" schemes, a wallet for savings, a family member)_.
- Implement automated mechanisms to re-distribute equally and proportionally the tokens received in a trustless manner (_e.g: distribute dividends to shareholders, or bonuses to employees._)

In the web3 ecosystem, many contracts can hold, send and receive assets (_e.g: 🆙, Vaults, Marketplaces, Liquidity pools, etc..._). The [LSP1 Universal Receiver standard](../standards/accounts/lsp1-universal-receiver-delegate.md#how-delegation-works) offers many ways to build innovative automation systems on top of those, so that users can enjoy a better and safer experience interacting with digital assets on the blockchain.

### ✋🏻 Safety to prevent accidental transfers

The `transfer(...)` function of [LSP7](../standards/tokens/LSP7-Digital-Asset.md) and [LSP8](../standards/tokens/LSP8-Identifiable-Digital-Asset.md) contains a [`bool force`](../standards/tokens/LSP7-Digital-Asset#force-mint-and-transfer) parameter that can prevent accidental transfers like:

- when an incorrect address was pasted in an input field on a dApp or blockchain explorer.
- when an incorrect `address` parameter was passed within an internal transaction of a complex interaction.
- when a smart contract does not have any functionality to transfer tokens, preventing the tokens from being stuck.
- when transferring tokens to an EOA address, which should be for advanced users who use private keys / seed phrases and could loose access to funds in the future.

The `bool force` parameter ensures that users and smart contracts are not transferring tokens to addresses that could potentially not hold or re-transfer the token.
