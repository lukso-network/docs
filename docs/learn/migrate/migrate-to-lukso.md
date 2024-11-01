---
sidebar_label: '🔧 Integration Guide'
sidebar_position: 1
description: What to consider when building on LUKSO with LSPs (LUKSO Standard Proposals)?
---

# Migrate to LUKSO

:::info

This page gives an overview the differences between building on LUKSO vs other EVM chains.

For more information regarding the network and standards, see the [Introduction](../../standards/introduction.md) and [Concepts & Glossary](../concepts.md) pages.

:::

## Migrating from other EVM Chain

LUKSO is EVM-compatible. Any traditional web3 wallet (_e.g: Metamask_) can interact with LUKSO dApps.

1. Simply [add the LUKSO network in your wallet](../../networks/testnet/parameters.md) and switch to the LUKSO chain.
2. any Ethereum smart contract can be redeployed on LUKSO by connecting to a [LUKSO RPC endpoint](../../networks/mainnet/parameters).

You can start holding assets (LYX, tokens, and NFTs), transfer them, and deploy and interact with smart contracts.

Developers are encouraged to use LSP standards to enhance the experience using their projects. Some codebases may need adjustments to convert ERC interactions to LSP interactions. More details are provided below.

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
