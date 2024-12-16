---
sidebar_label: '🌏 Overview'
description: 'Introduction to the LUKSO Ecosystem - why choose LUKSO? Who is LUKSO intended for?'
---

import CardWithImage from '@site/src/components/CardWithImage';
import Chip from '@site/src/components/Chip';

import discoverContent from './discover-content.json';

# 🌏 Overview

## What is LUKSO?

LUKSO is a Layer 1 EVM chain that uses an unmodified version of Ethereum. It can be bootstrapped by any Ethereum client [_configured to connect to the LUKSO network_](../networks/mainnet/running-a-node) and is fundamentally the same as Ethereum at the network level.

**BUT** it comes with [**a new set of smart contract standards**](../standards/introduction.md) called <strong style={{ color: "#FE005B" }}>L</strong>UKSO <strong style={{ color: "#FE005B" }}>S</strong>tandards <strong style={{ color: "#FE005B" }}>P</strong>roposals (<strong style={{ color: "#FE005B" }}>LSP</strong>s) and a [**set of tools**](../tools/libraries/getting-started.md) that can be used to create innovative protocols and dApps that can not be build using old standards.

<CardWithImage CardData={discoverContent} />

## What makes LUKSO unique?

<table>
  <thead>
    <tr>
      <th>🆙 **Universal Profiles** 🆙</th>
      <th>🪙 **Tokens** 🪙</th>
      <th>🌅 **NFTs** 🌅</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Smart contract based profiles are the essential foundation for a better
        web3 experience.
      </td>
      <td>
        Extensible Token that move us beyond DeFi. The future of blockchain is
        social.
      </td>
      <td>
        Flexible NFTs that are extensible and directly composable with Universal
        Profiles.
      </td>
    </tr>
    <tr>
      <td>
        <div className="chip-container">
          <Chip label="Visual" />
          <Chip label="Upgradeable" />
          <Chip label="Security" />
          <Chip label="Gas-less" />
          <Chip label="Smart" />
          <Chip label="Extensible" />
        </div>
      </td>
      <td>
        <div className="chip-container">
          <Chip label="Safer" />
          <Chip label="Token Icons" />
          <Chip label="Unlimited Metadata" />
          <Chip label="Updatable" />
          <Chip label="Extensible" />
          <Chip label="Notifying" />
          <Chip label="Unified" />
        </div>
      </td>
      <td>
        <div className="chip-container">
          <Chip label="Authentic" />
          <Chip label="Safer" />
          <Chip label="Unlimited Metadata" />
          <Chip label="Updatable" />
          <Chip label="Better IDs" />
          <Chip label="Iterable" />
          <Chip label="Batch Transfers" />
        </div>
      </td>
    </tr>
  </tbody>
</table>

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
