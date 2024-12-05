import React from 'react';
import Link from '@docusaurus/Link';
import styles from './StandardsGallery.module.scss';

const STANDARDS = [
  {
    title: '👤 LSP0',
    name: 'ERC725 Account',
    link: '/standards/accounts/lsp0-erc725account',
    text: 'Blockchain account for asset ownership and use by individuals or entities.',
  },
  {
    title: '📢 LSP1',
    name: 'Universal Receiver',
    link: '/standards/accounts/lsp1-universal-receiver',
    text: 'Notification receiver for incoming and outgoing transactions or information.',
  },
  {
    title: '🗄️ LSP2',
    name: 'ERC725Y JSON Schema',
    link: '/standards/metadata/lsp2-json-schema',
    text: 'Describes ERC725Y data key-value pairs interpretation including encoding and decoding.',
  },
  {
    title: '🌐 LSP3',
    name: 'Profile Metadata',
    link: '/standards/metadata/lsp3-profile-metadata',
    text: 'Set of ERC725Y data keys describing a smart contract based blockchain profile.',
  },
  {
    title: '🔍 LSP4',
    name: 'Digital Asset Metadata',
    link: '/standards/tokens/LSP4-Digital-Asset-Metadata',
    text: 'Describes metadata of digital assets via a set of ERC725Y data keys.',
  },
  {
    title: '📒 LSP5',
    name: 'Received Assets',
    link: '/standards/metadata/lsp5-received-assets',
    text: 'Defines ERC725Y data keys storing addresses of received assets.',
  },
  {
    title: '🔐 LSP6',
    name: 'Key Manager',
    link: '/standards/access-control/lsp6-key-manager',
    text: 'Contract with permissions controlled through multiple addresses.',
  },
  {
    title: '🪙 LSP7',
    name: 'Digital Asset',
    link: '/standards/tokens/LSP7-Digital-Asset',
    text: 'Standard for fungible or non-fungible digital assets with a unified interface.',
  },
  {
    title: '🎨 LSP8',
    name: 'Identifiable Digital Asset',
    link: '/standards/tokens/LSP8-Identifiable-Digital-Asset',
    text: 'Interface for uniquely identifiable digital assets with specific metadata.',
  },
  {
    title: '🏦 LSP9',
    name: 'Vault',
    link: '/standards/accounts/lsp9-vault',
    text: 'ERC725 smart contract variant representing a blockchain vault.',
  },
  {
    title: '📘 LSP10',
    name: 'Received Vaults',
    link: '/standards/metadata/lsp10-received-vaults',
    text: 'ERC725Y keys to list owned LSP9 Vaults.',
  },
  {
    title: '🌱 LSP11',
    name: 'Basic Social Recovery',
    link: 'https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-11-BasicSocialRecovery.md',
    text: 'Contract that enables to recover access to any ERC725-based smart contract',
  },
  {
    title: '📗 LSP12',
    name: 'Issued Assets',
    link: '/standards/metadata/lsp12-issued-assets',
    text: 'List of issued assets by an individual or entity via ERC725Y keys.',
  },
  {
    title: '2️⃣ LSP14',
    name: 'Ownable 2 Steps',
    link: '/standards/access-control/lsp14-ownable-2-step',
    text: 'Module for secure two-step ownership management of smart contracts.',
  },
  {
    title: '📬 LSP15',
    name: 'Transaction Relayer API',
    link: '/standards/accounts/lsp15-transaction-relayer-api',
    text: 'A standard set of API methods to create a service that acts as a relayer and dispatch transactions on behalf of users.',
  },
  {
    title: '🏭 LSP16',
    name: 'Universal Factory',
    link: '/standards/factories/lsp16-universal-factory',
    text: 'Factory that facilitates the deployment of smart contracts at the same address across multiple chains.',
  },
  {
    title: '🧩 LSP17',
    name: 'Contract Extension',
    link: '/standards/accounts/lsp17-contract-extension',
    text: 'Extends smart contract functionalities with addable and removable plugins.',
  },
  {
    title: '💸 LSP18',
    name: 'Royalties',
    link: 'https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-18-Royalties.md',
    text: 'Set of data keys to store information about royalty recipient addresses and their claimable percentage.',
  },
  {
    title: '🔄 LSP20',
    name: 'Call Verification',
    link: '/standards/accounts/lsp20-call-verification',
    text: 'Facilitates smart contract interactions without resolving the owner first.',
  },
  {
    title: '🏭 LSP23',
    name: 'Linked Contracts Factory',
    link: '/standards/factories/lsp23-linked-contracts-factory',
    text: 'Factory pattern standard for deploying two linked contracts across chains.',
  },
  {
    title: '⛽ LSP25',
    name: 'Execute Relay Call',
    link: '/contracts/contracts/LSP25ExecuteRelayCall/LSP25MultiChannelNonce/',
    text: 'Generic interface for meta transactions, so that interactions and gas can be paid on behalf of users.',
  },
  {
    title: '🔍 LSP26',
    name: 'Follower System',
    link: '/standards/accounts/lsp26-follower-system',
    text: 'Contract that act as a registry that keep track of a list of addresses that follow each other for social interactions.',
  },
];

function StandardCard({ link, title, name, text }) {
  return (
    <Link
      className={`col col--4 margin-bottom--lg ${styles.legoCard}`}
      to={link}
      style={{
        borderWidth: '1px',
      }}
    >
      <h2
        className="flex items-center font-jakarta"
        style={{ margin: '1rem 0' }}
      >
        {title}
      </h2>
      <h3 className={`flex items-center font-jakarta`}>{name}</h3>
      <p className="mb-0 text-sm text-zinc-400">{text}</p>
    </Link>
  );
}

export default function StandardsGallery() {
  return (
    <div className="container">
      <div className="row flex flex-col items-center justify-between">
        {STANDARDS.map((standard) => (
          <StandardCard {...standard} key={standard.title} />
        ))}
      </div>
    </div>
  );
}
