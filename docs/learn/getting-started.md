---
sidebar_label: '🏎️ Quick Start'
description: Introduction to the LUKSO Ecosystem - why choose LUKSO? Who is LUKSO intended for?
title: 'Quick Start'
---

import CallToActionButton from '@site/src/components/CallToActionButton';
import CardWithImage from '@site/src/components/CardWithImage';
import Chip from '@site/src/components/Chip';

import discoverContent from './discover-content.json';
import developerContent from './developer-content.json';

# Quick Start

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
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        Smart contract based profiles are the essential foundation for a better
        web3 experience.
      </td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        Extensible Token that move us beyond DeFi. The future of blockchain is
        social.
      </td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        Flexible NFTs that are extensible and directly composable with Universal
        Profiles.
      </td>
    </tr>
    <tr>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
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
          <Chip label="Iteratable" />
          <Chip label="Batch Transfers" />
        </div>
      </td>
    </tr>
  </tbody>
</table>

## Where to start?

### Play around with Universal Profile

<div>
  <CallToActionButton
    icon="material-symbols:counter-1"
    color="white"
    target="_blank"
    link="https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn"
    text="Install the Universal Profile Browser Extension 🧩"
  />

{' '}

<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    fontSize: '3em',
  }}
>
  <p>⬇</p>
</div>

{' '}

<CallToActionButton
  icon="material-symbols:counter-2"
  color="white"
  target="_blank"
  link="https://my.universalprofile.cloud"
  text="Create your Universal Profile 🆙"
/>

  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      fontSize: '3em',
    }}
  >
    <p>⬇</p>
  </div>
</div>

<CallToActionButton
  icon="material-symbols:counter-3"
  color="white"
  target="_blank"
  link="https://www.lukso.network/ecosystem"
  text="Explore the dApps Ecosystem 🌐"
/>

### Start building on LUKSO

<CardWithImage CardData={developerContent} />
