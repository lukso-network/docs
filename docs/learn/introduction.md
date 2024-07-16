---
sidebar_label: '👷🏽 Building on LUKSO'
description: Introduction to the LUKSO Ecosystem - why choose LUKSO? Who is LUKSO intended for?
---

# Building on LUKSO

### Overview of LUKSO for Devs

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/kJ5_6LN6mZc?si=7NWn-odkk8KmSDLz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

### Comparing Universal Profiles to other Wallets

|                                | Gnosis SAFE | Base Smart Contract Account | EIP 6900 Modular Smart Contract account | Universal Profiles                                    |
| ------------------------------ | ----------- | --------------------------- | --------------------------------------- | ----------------------------------------------------- |
| Standardised Profiles          | 🔶          | ❌                          | ✅                                      | ✅                                                    |
| Generic Information Storage    | ❌          | ❌                          | ❌                                      | ✅ Through ERC725Y                                    |
| Notifications and Reactability | ❌          | ❌                          | ❌                                      | ✅ Through LSP1                                       |
| Gasless Experience             | ✅          | ✅                          | ✅                                      | ✅ via the Transaction Relayer                        |
| Extensible                     | ✅          | ✅                          | ✅                                      | ✅ Through LSP17                                      |
| Upgradeable Security           | ✅          | ✅                          | ✅                                      | ✅ Through LSP14                                      |
| Permission System              | ❌          | ❌                          | ❌                                      | ✅ Through LSP6                                       |
| Multisig                       | ✅          | ❌                          | ❌                                      | 🔶 Can behave as multisig if controlled by a multisig |
| Pre and Post Execution Hooks   | ✅          | ✅                          | ✅                                      | ✅ Through LSP20                                      |
| Multi purpose                  | ❌          | ❌                          | ❌                                      | ✅ Can be a DAO, Organisation, Brand, AI, Robot, etc  |

## Key Benefits of LUKSO

By integrating different LSPs in unique ways, LUKSO solves fundamental blockchain problems:

<table class="lsp-features">
    <tr>
        <td><h3>[👩‍🎤 Standardised On-Chain profile](../standards/universal-profile/lsp3-profile-metadata.md)</h3>Users can build their profiles on-chain, adding images, tags, descriptions and links to their accounts to shape their online persona. <br /> <br /> Standardizing accounts prevents delays in adoption caused by unpredictable changes. It ensures all developers follow a unified behavior, enabling consistent and reliable development on top of the account. </td>
         <td><h3>[📝 Updatable and flexible metadata](../standards/generic-standards/lsp2-json-schema.md)</h3>Metadata can be updated, enabling dynamic NFTs that can change certain properties over time, while other properties remain immutable.</td>
    </tr>
    <tr>
        <td><h3>[📢 Notifications and Reactability](../standards/generic-standards/lsp1-universal-receiver.md)</h3>The ability to be notified and react on different actions is essential for an account to become more interactive and social by emitting a unique event to the network with the action being informed about, which can be parsed by interfaces and off chain clients.</td>
        <td><h3>[⛽️ Gasless experience](./concepts.md#transaction-relay-service)</h3>Universal Profiles support Transaction Relay Services that cover the gas for users's transactions. Users won't have the burden of getting the native token of the chain to start interacting with your application.</td>
    </tr>
    <tr>
        <td><h3>[💫 Extend your account over time](../standards/generic-standards/lsp17-contract-extension.md)</h3>Users can extend their account over time seamlessly, with no need to alter code and redeploy the associated smart contract.</td>
        <td><h3>[🔓 Upgradeable security](../standards/universal-profile/lsp6-key-manager)</h3>Universal Profiles can be owned by any EOA or smart contract (_e.g: multisig_). And users can control their accounts through multiple devices and applications, each of them with different permissions.<br /><br /> This also allow the creation of services like social recovery, through family, friends or trustless dApps.</td>
    </tr>
    <tr>
        <td><h3>[🚦 Permission System](../learn/universal-profile/key-manager/grant-permissions.md)</h3>A robust permission system allows fine-grained control over who can perform certain actions on the contract.<br /> <br /> This is essential for managing access rights and maintaining security, especially in complex systems with multiple users or roles while having the permissions and restrictions stored within the profile.</td>
        <td><h3>[✍️ ✍️Multi Sig](../learn/universal-profile/key-manager/grant-permissions.md)</h3>The use of multisig provide an extra layer of security to manage the account.</td>
    </tr>
    <tr>
        <td><h3>[🪝 Pre and Post Execution Hooks](../standards/tokens/LSP7-Digital-Asset#lsp1-token-hooks)</h3>These hooks allow additional logic to be executed before and after the main function call. This feature, available through LSP20 in Universal Profiles, provides greater control over contract behavior and enables advanced use cases.</td>
        <td><h3>🇨🇭🔪 Multi-purpose</h3>The ability to serve various roles (like being a DAO, organization, Brands, AI, robot, etc.) showcases the versatility of the contract. This flexibility is important for supporting a wide range of applications and adapting to different use cases.</td>
    </tr>
</table>

## Developer Resources

LUKSO is an L1 EVM-based Blockchain. All tools and tutorials for Ethereum also work for LUKSO by default.

Developers building on LUKSO can write smart contracts in any EVM-based smart contract languages (Solidity, Vyper, etc...), and use existing standards already developed for other Ethereum networks.

- [Awesome LUKSO, a comprehensive list of awesome LUKSO resources!](https://github.com/lukso-network/awesome-lukso)
- [What are the main features of LUKSO standards?](../faq/onboarding/lukso-standards.md#what-are-the-main-features-of-lsps)
- [Learning Tools of the Ethereum Foundation](https://ethereum.org/en/developers/learning-tools/)
