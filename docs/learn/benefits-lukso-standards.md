---
sidebar_label: '🌟 Benefits of LUKSO Standards'
description: 'Overview of the benefits of using LUKSO Standard Proposals (LSPs)'
---

# Benefits of the LUKSO Standards

Discover the features and benefits of the LUKSO Standards (LSPs) compared to over standards and existing solutions.

## Universal Profiles vs. Smart Wallets

Universal Profiles (known as 🆙) are smart accounts that come with many benefits because of their features.

The [🆙 Browser Extension](/install-up-browser-extension) offers a better user experience to interact with dApps compared to traditional web3 wallets.

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

| Feature                                        | Benefits                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🗄️ Metadata in one place**                   | Finished re-filling the same information again and again on each new app you register to!<br/>Your information is stored and fetched from the same place (your 🆙 storage) and displayed the same across all the dApps ecosystem!                                                                                                  |
| **🎨 Customizable metadata**                   | Make your Universal Profile stand out from others! Give it a profile and cover image, and add as many amount of information with its unlimited storage.                                                                                                                                                                            |
| **⛽️ Gas-Less transactions**                  | No more need to buy and hold native tokens to pay for the gas. Use the transaction relayer plugged to the Universal Profile from the start to get started.                                                                                                                                                                         |
| **🔑 Multi-Control through permissions**       | Universal Profiles can be controlled by multiple EOAs with various permission levels, held across different devices or representing dApps. <br/>Each can have specific access rights (token transfers, playlist management, or account recovery).                                                                                  |
| **📢 Notification and customized reactivity**  | The 🆙 can be customized to react differently based on different events it receives. For instance, the default implementation automatically register new received assets.                                                                                                                                                          |
| **⚙️ Extendability with pluggable Extensions** | New features (like new function selectors not present by default in the smart contract code) can be added to a Universal Profile, using a system of extensions. <br/><br/>See our guide [**Extending Universal Profile functionalities**](./universal-profile/advanced-guides/extend-profile-functionalities.md) for more details. |

### 🗄️ Metadata in one place

With traditional web3 wallets, a user has to fill the same infos every time it registers on a new dApp (_e.g: username, biography, social media accounts_). A Universal Profile stores user's data in one single place: the contract's storage. any dApp can then retrieve the same information from the same place, making dApp onboarding easier and faster.

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

### 🎨 Customizable Metadata

A Universal Profile can represent many personas or forms of identities:

- a user profile (personal or professional)
- a brand
- a DAO or an organisation
- an AI living on the internet
- a service like a wallet recovery
- a character in a video game (represented as an NFT with its own metadata)

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('/img/learn/different-universal-profiles.png').default}
    alt="`Examples of different types of Universal Profiles."
    width="1200"
  />
<br/>
<i>4 x different Universal Profiles used for different purposes (a brand, a DAO, a user's profile, a wallet recovery service).</i>
<br /><br />
</div>

### ⛽️ Gas-Less transactions

:::info Opting out of the relayer

**Using the relayer and always gas less transactions is not mandatory!**

Users can also choose to not rely on the [Transaction Relay Service](../standards/accounts/lsp15-transaction-relayer-api.md) and the pay the gas fees of the transaction themselves by funding the [controller](./concepts.md#controller) of their Universal Profile with native LYX.

:::

Universal Profiles enable gas-less transactions. The **relayer pay the gas fees and does not require the user to hold native tokens** to pay for the transaction fee. Users do not need to go through the whole cumbersome process of:

1. downloading a wallet
2. creating a new address
3. registering to a crypto exchange or a service to buy crypto
4. performing KYC
5. buying native crypto by card or bank transfer
6. _in some cases,_ requesting the bank to authorize the transaction to buy crypto (some user banks restrict from buying crypto online)
7. finally start using dApps!

This improves onboarding experiences in the following ways:

- most new web3 users does not get their head around the concept of "gas" and having to pay fees every time they interact with a dApp (compared to interacting with other applications on the internet).
- native and experienced web3 users need to acquire more native currency from various chains just to _"play around with dApps"_ and explore, increasing the costs even more for users present across many chains.
- users can also bridge native currency from one chain to another (_e.g: having to bridge ethers from Ethereum to Base to use dApps on Base_), but this require giving up some funds on one chain as a result.
- developers looking to build dApps on new chains neex to acquire test LYX from testnet faucets, but most of them now require to hold a minimum amount of native currency on the main network to avoid spam and over-usage of the faucet.

As Universal Profile support gas-less transactions, it is possible to add multiple relayers and switch between their preferred one at the time of the transaction.

### 🔑 Multi-Control with permissions

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

| Feature                                                               | Benefits                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🔘 Easier functions for developers**                                | You are a developer? Stop learning different functions for each new ERC token standard! (ERC20, ERC721, ERC1155, etc...).<br/>LSP7 and LSP8 use the **same function names** for transfer and operator approvals, whether it is a token or NFT transfer.                                                                             |
| **🗄️ Unlimited & Dynamic Metadata for Tokens & NFTs**                 | Your NFT is not only an image. It can now hold as many information as imagined (custom traits, attributes, ...). This information can evolve overtime.                                                                                                                                                                              |
| **䷓ Flexible Batching functionalities**                               | Distibute multiple tokens or NFTs easily to users with `transferBatch(...)` or perform multiple actions in a single transaction with `batchCalls(...)`. <br/> _(e.g: authorize multiple operators, transfer an NFT and update its metadata)_.                                                                                       |
| **📢 Notify sender & recipient(s) on transfer and new operators**     | Sender is notified _"I have sent tokens"_, recipient is notified _"I have received tokens"_ and both can have custom logic to react on these notifications. <br/><br/>**Finished the old _"`approve(...)` then `transferFrom(...)`"_ flow!**. Using the Universal Receiver and automatic reactions on notifications is the new way! |
| **⚙️ Extendability with pluggable Extensions**                        | New features (like new function selectors not present by default in the smart contract code) can be added to a Digital Asset, using a system of extensions.                                                                                                                                                                         |
| **✋🏻 Safety parameter (by default!) to prevent accidental transfers** | Prevent bad web3 user stories and reduce the number of Google searches for:<br/> _"Transferred tokens to the wrong wallet address. How can I recover them?"_.                                                                                                                                                                       |

### 🔘 Easier functions for developers

Both [LSP7](../standards/tokens/LSP7-Digital-Asset.md) and [LSP8](../standards/tokens/LSP8-Identifiable-Digital-Asset.md) use the same function to transfer tokens, with only one different parameter type.

- LSP7 [`transfer(address,address,uint256,bool,bytes)`](../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#transfer) function uses a **`uint256`** to transfer an **amount**.
- LSP8 [`transfer(address,address,bytes32,bool,bytes)`](../contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.md#transfer) function uses a **`bytes32`** to transfer a [**token ID**](../standards/tokens/LSP8-Identifiable-Digital-Asset.md#format-of-tokenids).

Similarly, they both use the same function `authorizeOperator(address,[uint256/bytes32],bytes)` to approve new operators for a token allowance or specific token Ids.

### 🗄️ Unlimited & Dynamic Metadata

<div style={{textAlign: 'center', color: 'grey'}}>
  <img
    src={require('/img/learn/token-nft-metadata-examples.png').default}
    alt="`Examples of metadata for different NFTs."
    width="1200"
  />
<br/>
<i>3 x different NFT collections with their unique traits and characteristics.</i>
<br /><br />
</div>

Like Universal Profile, digital assets based on the LSP7 and LSP8 standards can hold an **unlimited quantity of metadata** for any various type of information considered relevant to the token or NFT collection. This can include:

- Icons and image.
- The creators of the tokens / NFT collection.
- The list of exchanges where this token can be found.

LSP8 also allows to create more complex and rich NFT collections where **each NFT can have its own custom metadata**. Setting metadata specific to each NFT is done using the standardized functions [`setDataForTokenId(...)` and `setDataBatchForTokenIds(...)`](../contracts/overview/NFT/set-nft-metadata.md). This is useful for instance for:

- NFTs that need to hold specific items like digital clothing items for avatars, or weapons / body armors in a video game.
- dynamic NFTs, where any information, traits or attributes of a NFT could be programmed to change or evolve overtime according to certain conditions, logics or triggers.

### 📢 Notify on transfers

On each token transfers, bother sender & recipient are notified that a token transfer happened. This notification includes a specific notification ID (_e.g: "I have sent / received some tokens / NFTs"_. See typeIds for more infos).

In addition, it is possible to program and _"plug-in"_ custom logic contracts called [**Universal Receiver Delegate**](../standards/accounts/lsp1-universal-receiver-delegate.md) to the sender and recipient, so that they can automatically react based on these different type of notifications. For example:

- Registering / Removing tokens from your list of received assets.
- Block receiving spam tokens that can contain malicious logic to steal user's funds if interacting with such token contracts, by filtering them against a spam or blacklist registry.
- Forward automatically a certain percentage of the tokens received to a specific address (_e.g: a Vault to implement "save the change" schemes, a wallet for savings, a family member)_.
- Implement automated mechanisms to re-distribute equally and proportionally the tokens received in a trustless manner (_e.g: distribute dividends to shareholders, or bonuses to employees._)

In the web3 ecosystem, many contracts can hold, send and receive assets (_e.g: 🆙, Vaults, Marketplaces, Liquidity pools, etc..._). The [LSP1 Universal Receiver standard](../standards/accounts/lsp1-universal-receiver-delegate.md#how-delegation-works) offers many ways to build innovative automation systems on top of those, so that users can enjoy a better and safer experience interacting with digital assets on the blockchain.

### ✋🏻 Safety to prevent accidental transfers

The `transfer(...)` function of [LSP7](../standards/tokens/LSP7-Digital-Asset.md) and [LSP8](../standards/tokens/LSP8-Identifiable-Digital-Asset.md) contains a [`bool force`](../standards/tokens/LSP7-Digital-Asset#force-mint-and-transfer) parameter to prevent accidental transfers like:

- when an incorrect address was pasted in an input field on a dApp or blockchain explorer.
- when an incorrect `address` parameter was passed within an internal transaction of a complex interaction.
- when a smart contract does not have any functionality to transfer tokens, preventing the tokens from being stuck.
- when transferring tokens to an EOA address, which should be for advanced users who use private keys / seed phrases and could loose access to funds in the future.

The `bool force` parameter ensures that users and smart contracts are not transferring tokens to addresses that could potentially not hold or re-transfer the token.
