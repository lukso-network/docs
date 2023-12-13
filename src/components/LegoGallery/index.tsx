import React from 'react';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import clsx from 'clsx';

const STANDARDS = [
  {
    title: 'LSP0 - ERC725 Account',
    link: './universal-profile/lsp0-erc725account',
    lightImage: '/img/standards/legos/LSP0-lego.png',
    darkImage: '/img/standards/legos/LSP0-lego.png',
    text: 'A blockchain based account that can own assets and be used by people, organizations, etc...',
  },
  {
    title: 'LSP1 - Universal Receiver',
    link: './generic-standards/lsp1-universal-receiver',
    lightImage: '/img/standards/legos/LSP1-lego.png',
    darkImage: '/img/standards/legos/LSP1-lego.png',
    text: 'Allows to receive notifications about incoming and outgoing transactions or informations.',
  },
  {
    title: 'LSP2 - ERC725Y JSON Schema',
    link: './generic-standards/lsp2-json-schema',
    lightImage: '/img/standards/legos/LSP2-lego.png',
    darkImage: '/img/standards/legos/LSP2-lego.png',
    text: 'A schema to describe how ERC725Y data key-value pairs can be interpreted and encoded/decoded.',
  },
  {
    title: 'LSP3 - Profile Metadata',
    link: './universal-profile/lsp3-profile-metadata',
    lightImage: '/img/standards/legos/LSP3-lego.png',
    darkImage: '/img/standards/legos/LSP3-lego.png',
    text: 'A set of ERC725Y data keys useful to describe a smart contract based profile.',
  },
  {
    title: 'LSP4 - Digital Asset Metadata',
    link: './tokens/LSP4-Digital-Asset-Metadata',
    lightImage: '/img/standards/legos/LSP4-lego.png',
    darkImage: '/img/standards/legos/LSP4-lego.png',
    text: 'A set of ERC725Y data keys useful to describe the metadata of a digital asset.',
  },
  {
    title: 'LSP5 - Received Assets',
    link: './universal-profile/lsp5-received-assets',
    lightImage: '/img/standards/legos/LSP5-lego.png',
    darkImage: '/img/standards/legos/LSP5-lego.png',
    text: 'Defines a set of ERC725Y data keys to store the addresses of assets received.',
  },
  {
    title: 'LSP6 - Key Manager',
    link: './universal-profile/lsp6-key-manager',
    lightImage: '/img/standards/legos/LSP6-lego.png',
    darkImage: '/img/standards/legos/LSP6-lego.png',
    text: 'A smart contract and a set of predefined permissions to control an account or any smart contract through multiple addresses.',
  },
  {
    title: 'LSP7 - Digital Asset',
    link: './tokens/LSP7-Digital-Asset',
    lightImage: '/img/standards/legos/LSP7-lego.png',
    darkImage: '/img/standards/legos/LSP7-lego.png',
    text: 'A standard interface for digital assets that can be either fungible or non-fungible tokens.',
  },
  {
    title: 'LSP8 - Identifiable Digital Asset',
    link: './tokens/LSP8-Identifiable-Digital-Asset',
    lightImage: '/img/standards/legos/LSP8-lego.png',
    darkImage: '/img/standards/legos/LSP8-lego.png',
    text: 'A standard interface to represent identifiable digital assets, allowing tokens and NFTs to be uniquely traded and given specific metadata.',
  },
  {
    title: 'LSP9 - Vault',
    link: './universal-profile/lsp9-vault',
    lightImage: '/img/standards/legos/LSP9-lego.png',
    darkImage: '/img/standards/legos/LSP9-lego.png',
    text: 'A version of an ERC725 smart contract that represents a blockchain vault.',
  },
  {
    title: 'LSP10 - Received Vaults',
    link: './universal-profile/lsp10-received-vaults',
    lightImage: '/img/standards/legos/LSP10-lego.png',
    darkImage: '/img/standards/legos/LSP10-lego.png',
    text: 'A set of ERC725Y data keys to store the list of owned LSP9 Vaults.',
  },
  {
    title: 'LSP12 - Issued Assets',
    link: './universal-profile/lsp12-issued-assets',
    lightImage: '/img/standards/legos/LSP12-lego.png',
    darkImage: '/img/standards/legos/LSP12-lego.png',
    text: 'A set of ERC725Y data keys to store the list of assets created or issued by a person, entity, organization, etc...',
  },
  {
    title: 'LSP14 - Ownable 2 Steps',
    link: './generic-standards/lsp14-ownable-2-step',
    lightImage: '/img/standards/legos/LSP14-lego.png',
    darkImage: '/img/standards/legos/LSP14-lego.png',
    text: 'A module to allow a safer and more secure ownership management of a smart contract.',
  },
  {
    title: 'LSP17 - Contract Extension',
    link: './generic-standards/lsp17-contract-extension',
    lightImage: '/img/standards/legos/LSP17-lego.png',
    darkImage: '/img/standards/legos/LSP17-lego.png',
    text: 'A module to extend functionalities of a smart contract by using other smart contract as "extension plugins", that can be added or removed overtime.',
  },
  {
    title: 'LSP20 - Call Verification',
    link: './generic-standards/lsp20-call-verification',
    lightImage: '/img/standards/legos/LSP20-lego.png',
    darkImage: '/img/standards/legos/LSP20-lego.png',
    text: 'A module to make interactions with smart contracts easier, without the need to resolve and go through their `owner()` first.',
  },
  {
    title: 'LSP23 - Linked Contracts Factory',
    link: './generic-standards/lsp23-linked-contracts-factory',
    lightImage: '/img/standards/legos/LSP23-lego.png',
    darkImage: '/img/standards/legos/LSP23-lego.png',
    text: 'Standard that define a factory pattern to deploy 2 contracts linked together at the pre-determined addresses, so that they can be redeployed across multiple chains.',
  },
];

function LegoCard({ link, title, text, lightImage, darkImage }) {
  return (
    <div className="lego-card col col--3 margin-bottom--lg">
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
          className="mt-1 w-full transition-transform group-hover:scale-110"
        />
        <div className="">
          <h3 className="mb-1.5 flex items-center gap-3 font-jakarta group-hover:text-primary">
            <div>{title}</div>
          </h3>
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
