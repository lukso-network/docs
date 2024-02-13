import React from 'react';
import Link from '@docusaurus/Link';
import styles from './StandardsGallery.module.scss';

const STANDARDS = [
  {
    title: '👤 LSP0',
    name: 'ERC725 Account',
    link: './universal-profile/lsp0-erc725account',

    text: 'Blockchain account for asset ownership and use by individuals or entities.',
  },
  {
    title: '📢 LSP1',
    name: 'Universal Receiver',
    link: '/standards/generic-standards/lsp1-universal-receiver',

    text: 'Notification receiver for incoming and outgoing transactions or information.',
  },
  {
    title: '🗄️ LSP2',
    name: 'ERC725Y JSON Schema',
    link: '/standards/generic-standards/lsp2-json-schema',

    text: 'Describes ERC725Y data key-value pairs interpretation including encoding and decoding.',
  },
  {
    title: '🌐 LSP3',
    name: 'Profile Metadata',
    link: '/standards/universal-profile/lsp3-profile-metadata',

    text: 'Set of ERC725Y data keys to describe a smart contract based blockchain profile.',
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
    link: '/standards/universal-profile/lsp5-received-assets',

    text: 'Defines ERC725Y data keys storing addresses of received assets.',
  },
  {
    title: '🔐 LSP6',
    name: 'Key Manager',
    link: '/standards/universal-profile/lsp6-key-manager',

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
    link: '/standards/universal-profile/lsp9-vault',

    text: 'ERC725 smart contract variant representing a blockchain vault.',
  },
  {
    title: '📘 LSP10',
    name: 'Received Vaults',
    link: '/standards/universal-profile/lsp10-received-vaults',

    text: 'ERC725Y keys to list owned LSP9 Vaults.',
  },
  {
    title: '📗 LSP12',
    name: 'Issued Assets',
    link: '/standards/universal-profile/lsp12-issued-assets',

    text: 'List of issued assets by an individual or entity via ERC725Y keys.',
  },
  {
    title: '2️⃣ LSP14',
    name: 'Ownable 2 Steps',
    link: '/standards/generic-standards/lsp14-ownable-2-step',

    text: 'Module for secure two-step ownership management of smart contracts.',
  },
  {
    title: '🏭 LSP16',
    name: 'Universal Factory',
    link: '/standards/generic-standards/lsp16-universal-factory',

    text: 'Factory that facilitates the deployment of smart contracts at the same address across multiple chains.',
  },
  {
    title: '🧩 LSP17',
    name: 'Contract Extension',
    link: '/standards/generic-standards/lsp17-contract-extension',

    text: 'Extends smart contract functionalities with addable and removable plugins.',
  },
  {
    title: '🔄 LSP20',
    name: 'Call Verification',
    link: '/standards/generic-standards/lsp20-call-verification',

    text: 'Facilitates smart contract interactions without resolving the owner first.',
  },
  {
    title: '🏭 LSP23',
    name: 'Linked Contracts Factory',
    link: '/standards/generic-standards/lsp23-linked-contracts-factory',

    text: 'Factory pattern standard for deploying two linked contracts across chains.',
  },
  {
    title: '⛽ LSP25',
    name: 'Execute Relay Call',
    link: '#',

    text: 'Factory pattern standard for deploying two linked contracts across chains.',
  },
];

function StandardCard({ link, title, name, text }) {
  return (
    <div className={`col col--3 margin-bottom--lg ${styles.legoCard}`}>
      <div>
        <Link
          to={link}
          style={{
            borderWidth: '1px',
          }}
        >
          <h3 className="flex items-center font-jakarta">
            <div>{title}</div>
          </h3>
          <h4 className="flex items-center font-jakarta">
            <div className={styles.standardName}>{name}</div>
          </h4>
        </Link>
        <p className="mb-0 text-sm text-zinc-400">{text}</p>
      </div>
    </div>
  );
}

export default function StandardsGallery() {
  return (
    <div className="row flex flex-col items-center justify-between">
      {STANDARDS.map((standard) => (
        <StandardCard {...standard} key={standard.title} />
      ))}
    </div>
  );
}
