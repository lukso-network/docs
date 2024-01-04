import React from 'react';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import styles from './LegoGallery.module.scss';
import clsx from 'clsx';

const STANDARDS = [
  {
    title: 'LSP0',
    name: 'ERC725 Account',
    link: './universal-profile/lsp0-erc725account',
    lightImage: '/img/standards/legos/LSP0-lego.png',
    darkImage: '/img/standards/legos/LSP0-lego.png',
    text: 'Blockchain account for asset ownership and use by individuals or entities.',
  },
  {
    title: 'LSP1',
    name: 'Universal Receiver',
    link: './generic-standards/lsp1-universal-receiver',
    lightImage: '/img/standards/legos/LSP1-lego.png',
    darkImage: '/img/standards/legos/LSP1-lego.png',
    text: 'Notification receiver for incoming and outgoing transactions or information.',
  },
  {
    title: 'LSP2',
    name: 'ERC725Y JSON Schema',
    link: './generic-standards/lsp2-json-schema',
    lightImage: '/img/standards/legos/LSP2-lego.png',
    darkImage: '/img/standards/legos/LSP2-lego.png',
    text: 'Describes ERC725Y data key-value pairs interpretation including encoding and decoding.',
  },
  {
    title: 'LSP3',
    name: 'Profile Metadata',
    link: './universal-profile/lsp3-profile-metadata',
    lightImage: '/img/standards/legos/LSP3-lego.png',
    darkImage: '/img/standards/legos/LSP3-lego.png',
    text: 'Set of ERC725Y data keys to describe a smart contract based blockchain profile.',
  },
  {
    title: 'LSP4',
    name: 'Digital Asset Metadata',
    link: './tokens/LSP4-Digital-Asset-Metadata',
    lightImage: '/img/standards/legos/LSP4-lego.png',
    darkImage: '/img/standards/legos/LSP4-lego.png',
    text: 'Describes metadata of digital assets via a set of ERC725Y data keys.',
  },
  {
    title: 'LSP5',
    name: 'Received Assets',
    link: './universal-profile/lsp5-received-assets',
    lightImage: '/img/standards/legos/LSP5-lego.png',
    darkImage: '/img/standards/legos/LSP5-lego.png',
    text: 'Defines ERC725Y data keys storing addresses of received assets.',
  },
  {
    title: 'LSP6',
    name: 'Key Manager',
    link: './universal-profile/lsp6-key-manager',
    lightImage: '/img/standards/legos/LSP6-lego.png',
    darkImage: '/img/standards/legos/LSP6-lego.png',
    text: 'Contract with permissions controlled through multiple addresses.',
  },
  {
    title: 'LSP7',
    name: 'Digital Asset',
    link: './tokens/LSP7-Digital-Asset',
    lightImage: '/img/standards/legos/LSP7-lego.png',
    darkImage: '/img/standards/legos/LSP7-lego.png',
    text: 'Standard for fungible or non-fungible digital assets with a unified interface.',
  },
  {
    title: 'LSP8',
    name: 'Identifiable Digital Asset',
    link: './tokens/LSP8-Identifiable-Digital-Asset',
    lightImage: '/img/standards/legos/LSP8-lego.png',
    darkImage: '/img/standards/legos/LSP8-lego.png',
    text: 'Interface for uniquely identifiable digital assets with specific metadata.',
  },
  {
    title: 'LSP9',
    name: 'Vault',
    link: './universal-profile/lsp9-vault',
    lightImage: '/img/standards/legos/LSP9-lego.png',
    darkImage: '/img/standards/legos/LSP9-lego.png',
    text: 'ERC725 smart contract variant representing a blockchain vault.',
  },
  {
    title: 'LSP10',
    name: 'Received Vaults',
    link: './universal-profile/lsp10-received-vaults',
    lightImage: '/img/standards/legos/LSP10-lego.png',
    darkImage: '/img/standards/legos/LSP10-lego.png',
    text: 'ERC725Y keys to list owned LSP9 Vaults.',
  },
  {
    title: 'LSP12',
    name: 'Issued Assets',
    link: './universal-profile/lsp12-issued-assets',
    lightImage: '/img/standards/legos/LSP12-lego.png',
    darkImage: '/img/standards/legos/LSP12-lego.png',
    text: 'List of issued assets by an individual or entity via ERC725Y keys.',
  },
  {
    title: 'LSP14',
    name: 'Ownable 2 Steps',
    link: './generic-standards/lsp14-ownable-2-step',
    lightImage: '/img/standards/legos/LSP14-lego.png',
    darkImage: '/img/standards/legos/LSP14-lego.png',
    text: 'Module for secure two-step ownership management of smart contracts.',
  },
  {
    title: 'LSP17',
    name: 'Contract Extension',
    link: './generic-standards/lsp17-contract-extension',
    lightImage: '/img/standards/legos/LSP17-lego.png',
    darkImage: '/img/standards/legos/LSP17-lego.png',
    text: 'Extends smart contract functionalities with addable and removable plugins.',
  },
  {
    title: 'LSP20',
    name: 'Call Verification',
    link: './generic-standards/lsp20-call-verification',
    lightImage: '/img/standards/legos/LSP20-lego.png',
    darkImage: '/img/standards/legos/LSP20-lego.png',
    text: 'Facilitates smart contract interactions without resolving the owner first.',
  },
  {
    title: 'LSP23',
    name: 'Linked Contracts Factory',
    link: './generic-standards/lsp23-linked-contracts-factory',
    lightImage: '/img/standards/legos/LSP23-lego.png',
    darkImage: '/img/standards/legos/LSP23-lego.png',
    text: 'Factory pattern standard for deploying two linked contracts across chains.',
  },
];

function LegoCard({ link, title, name, text, lightImage, darkImage }) {
  return (
    <div className={`col col--3 margin-bottom--lg ${styles.legoCard}`}>
      <Link
        to={link}
        style={{
          borderWidth: '1px',
        }}
      >
        <ThemedImage
          sources={{
            light: lightImage,
            dark: darkImage,
          }}
          alt={title}
          className="mt-1 w-full"
        />
        <div>
          <h3 className="flex items-center font-jakarta">
            <div>{title}:</div>
          </h3>
          <h4 className="flex items-center font-jakarta">
            <div className={styles.standardName}>{name}</div>
          </h4>
          <p className="mb-0 text-sm text-zinc-400">{text}</p>
        </div>
      </Link>
    </div>
  );
}

export default function LegoGallery() {
  return (
    <div className="row flex flex-col items-center justify-between">
      {STANDARDS.map((standard) => (
        <LegoCard {...standard} key={standard.title} />
      ))}
    </div>
  );
}
