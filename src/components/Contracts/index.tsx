/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

const LSPs_AccountsInteraction = [
  {
    name: '👤 LSP0 ERC725 Account',
    url: 'https://docusaurus.new/codesandbox',
    urlABI: 'https://docs.lukso.tech/contracts/contracts/LSP6KeyManager',
    description: (
      <Translate id="playground.codesandbox.description">
        A smart contract based account that can be used to represent an identity
        on-chain.
      </Translate>
    ),
  },
  {
    name: '📢 LSP1 Universal Receiver',
    url: 'https://docusaurus.new/codesandbox',
    urlABI: 'https://docs.lukso.tech/contracts/contracts/LSP6KeyManager',
    description: (
      <Translate id="playground.codesandbox.description">
        Allows to react on transfers and informations received (token transfers,
        notifications, etc...)
      </Translate>
    ),
  },
  {
    name: '🌐 LSP3 Profile Metadata',
    url: 'https://docusaurus.new/codesandbox',
    urlABI: 'https://docs.lukso.tech/contracts/contracts/LSP6KeyManager',
    description: (
      <Translate id="playground.codesandbox.description">
        Add information to an account or a vault, such as a profile/cover image,
        external links, attributes, etc...
      </Translate>
    ),
  },
  {
    name: '🏦 LSP9 Vault',
    url: '',
    urlABI: 'https://docs.lukso.tech/contracts/contracts/LSP6KeyManager',
    description: (
      <Translate id="playground.codesandbox.description">
        A digital vault that can hold and transfer any assets, for storing funds
        separate from your main account.
      </Translate>
    ),
  },
  {
    name: '🧩 LSP17 Extendable Contract',
    url: '',
    urlABI: 'https://docs.lukso.tech/contracts/contracts/LSP6KeyManager',
    description: (
      <Translate id="playground.codesandbox.description">
        Uses this to add more functionality to your contract, so that it can be
        flexible and extended overtime.
      </Translate>
    ),
  },
  {
    name: '🔄 LSP20 Call Verification',
    url: '',
    urlABI: 'https://docs.lukso.tech/contracts/contracts/LSP6KeyManager',
    description: (
      <Translate id="playground.codesandbox.description">
        Module to make interacting with a smart contract easier, without having
        to resolve through its owner first.
      </Translate>
    ),
  },
  {
    name: '⛽ LSP25 Execute Relay Call',
    url: '',
    urlABI: 'https://docs.lukso.tech/contracts/contracts/LSP6KeyManager',
    description: (
      <Translate id="playground.codesandbox.description">
        Add Meta Transactions on your contract to enable gas-less transactions
        and more easily onboard new users.
      </Translate>
    ),
  },
];

const LSPs_DigitalAssets = [
  {
    name: '🔍 LSP4 Digital Asset Metadata',
    url: 'https://docusaurus.new/codesandbox',
    urlABI: 'https://docs.lukso.tech/contracts/contracts/LSP6KeyManager',
    description: (
      <Translate id="playground.codesandbox.description">
        Enables to add metadata to any digital asset contract (token or NFT).
      </Translate>
    ),
  },
  {
    name: '🪙 LSP7 Digital Asset',
    url: 'https://docusaurus.new/codesandbox',
    urlABI:
      'https://docs.lukso.tech/contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md',
    description: (
      <Translate id="playground.codesandbox.description">
        Creates your own fungible token with the possibility to make it
        divisible or not.
      </Translate>
    ),
  },
  {
    name: '🎨 LSP8 Identifiable Digital Asset',
    url: 'https://docusaurus.new/codesandbox',
    urlABI: '#',
    description: (
      <Translate id="playground.codesandbox.description">
        Creates your non-fungible token (NFT) using various types of tokenId to
        identify each NFT (numbers, serial numbers, a contract for each
        individual NFT...).
      </Translate>
    ),
  },
];

const LSPs_OwnershipAccessControl = [
  {
    name: '🔐 LSP6 Key Manager',
    url: 'https://docusaurus.new/codesandbox',
    urlABI: '#',
    description: (
      <Translate id="playground.codesandbox.description">
        Allows multi-control over the account using different permissions.
      </Translate>
    ),
  },
  {
    name: '🌱 LSP11 Basic Social Recovery',
    url: '',
    urlABI: 'https://docusaurus.new/stackblitz-ts',
    description: (
      <Translate>
        A contract to recover access to your Blockchain based account if you are
        locked using a social recovery mechanism.
      </Translate>
    ),
  },
  {
    name: '2️⃣ LSP14 Ownable 2 Steps',
    url: '',
    urlABI: 'https://docusaurus.new/stackblitz-ts',
    description: (
      <Translate>
        A module to allow secure owner management and transfer of a smart
        contract using a 2-steps process.
      </Translate>
    ),
  },
];

interface Props {
  name: string;
  image: string;
  url: string;
  urlABI: string;
  description: JSX.Element;
}

function ContractCard({ name, url, urlABI, description }: Props) {
  return (
    <div className={clsx('card')}>
      <div className="card__body">
        <Heading as="h3">{name}</Heading>
        <p>{description}</p>
      </div>
      <div className="card__footer">
        <div className="button-group button-group--block">
          {url !== '' && (
            <Link className="button button--secondary" to={url}>
              Overview
            </Link>
          )}
          {urlABI !== '' && (
            <Link className="button button--secondary" to={urlABI}>
              ABI Reference
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function ContractCardsRow(): JSX.Element {
  return (
    <>
      <div className="row">
        <div className="col col--6 margin-bottom--lg">
          <h2>Ownership & Access Control</h2>
          {LSPs_OwnershipAccessControl.map((playground) => (
            <ContractCard key={playground.name} {...playground} />
          ))}
        </div>
        <div className="col col--6 margin-bottom--lg">
          <h2>Digital Assets</h2>
          {LSPs_DigitalAssets.map((playground) => (
            <ContractCard key={playground.name} {...playground} />
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col col--12 margin-bottom--lg">
          <h2>Accounts & Interactions</h2>
        </div>
        {LSPs_AccountsInteraction.map((playground) => (
          <div className="col col--6 margin-bottom--lg">
            <ContractCard key={playground.name} {...playground} />
          </div>
        ))}
      </div>
    </>
  );
}
