import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.scss';

import Box from '../components/Box';
import CallToActionButton from '../components/CallToActionButton';
import Headline from '../components/Headline';

import CustomAccordion from '../components/Accordion';

import NetworksIcon from '../../static/img/icons/icon-networks-gradient.png';
import StandardsIcon from '../../static/img/icons/icon-standards-gradient.png';
import ToolsIcon from '../../static/img/icons/icon-tools-gradient.png';
import PartnersIcon from '../../static/img/icons/icon-partners-gradient.png';
import FAQIcon from '../../static/img/icons/icon-faq-gradient.png';
import DappsGallery from '../components/DappsGallery';
import SeparatorWithTitle from '../components/SeperatorWithTitle';

import SearchBarWrapper from '../theme/SearchBar';

const accordionData = [
  {
    summary: 'General',
    icon: 'material-symbols:counter-1',
    details: [
      {
        question: 'Why is there new standards on LUKSO?',
        answer: 'some answers',
      },
      {
        question: 'Why is LUKSO a Layer 1 and not a Layer 2?',
        answer: 'some answers',
      },
      {
        question:
          'What are the advantages offered by the LUKSO LSP Standards compared to the ERC Standards?',
        answer: 'some answers',
      },
      {
        question:
          'What are the key differences between the LUKSO LSP Standards and the Ethereum ERC Standards?',
        answer: 'some answers',
      },
      {
        question: 'What can be built using the LUKSO Standards?',
        answer: 'some answers',
      },
    ],
  },
  {
    summary: 'Universal Profiles',
    icon: 'material-symbols:counter-1',
    details: [],
  },
  {
    summary: 'Tokens & NFTs',
    icon: 'material-symbols:counter-1',
    details: [],
  },
  {
    summary: 'Network & Validators',
    icon: 'material-symbols:counter-1',
    details: [],
  },
  {
    summary: 'Wallets & Controller dApps',
    icon: 'material-symbols:counter-1',
    details: [],
  },
];

const toolsData = [
  { title: 'LSP Smart Contracts Packages', link: '' },
  { title: 'ERC725.JS', link: '' },
  { title: 'LUKSO Relayer API', link: '' },
  { title: 'EIP191-Signer.JS', link: '' },
  { title: 'LSP-Utils.JS', link: '' },
];

const networksData = [
  {
    title: 'Add LUKSO Network to your wallet',
    link: '/networks/mainnet/parameters#add-lukso-to-wallets',
  },
  {
    title: 'Becoming a Validator',
    link: '/networks/mainnet/become-a-validator',
  },
  { title: 'Block Explorers', link: '/networks/mainnet/parameters' },
  {
    title: 'Running a Node',
    link: '/networks/mainnet/running-a-node#starting-a-node',
  },
];

function Index() {
  return (
    <Layout description="Network, Standards, Tools and Guides for development on LUKSO and related standards.">
      <div className={styles.container}>
        <Headline />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchBarWrapper />
        </div>

        <div>
          {accordionData.map((item, index) => (
            <CustomAccordion
              key={index}
              summary={item.summary}
              details={item.details}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <h2>DEVELOPER QUICKSTART</h2>
        <p>Our quickest guides to get you building</p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          <CallToActionButton
            text="Download UP Browser Extension"
            link="/install-up-browser-extension"
            color="white"
            icon="material-symbols:extension"
          />
          <CallToActionButton
            text="Start Building on LUKSO"
            link="/learn/getting-started"
            color="white"
            icon="material-symbols:flag-sharp"
          />
        </div>

        <div
          className={styles.cardContainer}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          <div className={styles.guideBox} style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#ddd',
                }}
              >
                {/* Placeholder for Integration Guide icon */}
              </div>
              <h3>Integration Guide</h3>
            </div>
            <p style={{ marginBottom: '2rem' }}>
              Looking to migrate your project to LUKSO?
            </p>
            <ul>
              <li>
                <a href="/learn/universal-profile/connect-profile/connect-up">
                  Integrate Universal Profile in your dApp
                </a>
              </li>
              <li>
                <a href="/tools/services/relayer-developer#1-deploy-universal-profiles">
                  Create a Universal Profile with the relayer API
                </a>
              </li>
              <li>
                <a href="/tools/integrations">
                  Integrate our various toolings, such as oracles, RPC providers
                  or data indexers.
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.guideBox} style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#ddd',
                }}
              >
                {/* Placeholder for Universal Profiles icon */}
              </div>
              <h3>Universal Profiles</h3>
            </div>
            <p style={{ marginBottom: '2rem' }}>
              Discover Universal Profiles and a new world of possibilities
            </p>
            <ul>
              <li>
                <a href="/learn/universal-profile/metadata/edit-profile">
                  Customize your Universal Profile to your own image or
                  branding.
                </a>
              </li>
              <li>
                <a href="/learn/universal-profile/key-manager/grant-permissions">
                  Allow 3rd party addresses to control your Universal Profile.
                </a>
              </li>
              <li>
                <a href="/learn/universal-profile/universal-receiver/create-receiver-forwarder">
                  Automate forwarding a % of tokens received by your Universal
                  Profile.
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.guideBox} style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#ddd',
                }}
              >
                {/* Placeholder for Digital Assets icon */}
              </div>
              <h3>Digital Assets</h3>
            </div>
            <p style={{ marginBottom: '2rem' }}>
              Create, Build and interact with our evolved tokens and NFTs with
              LSP7 and LSP8
            </p>
            <ul>
              <li>
                <a href="/learn/digital-assets/token/create-lsp7-token">
                  Create a fungible token based on the LSP7 standard.
                </a>
              </li>
              <li>
                <a href="/learn/digital-assets/nft/create-nft-collection-lsp8">
                  Create an NFT collection based on the LSP8 standard.
                </a>
              </li>
              <li>
                <a href="/learn/digital-assets/nft/set-nft-metadata">
                  Set the metadata of specific NFTs in a collection.
                </a>
              </li>
              <li>
                <a href="/learn/digital-assets/nft/create-nft-collection-with-lsp7-tokenId">
                  Create complex collections of sub-collections.
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <SeparatorWithTitle title={'Popular dApps built on LUKSO'} /> */}
      <h2 style={{ textAlign: 'center' }}>Popular dApps built on LUKSO</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DappsGallery />
      </div>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div>
            <Box
              icon={FAQIcon}
              link="./faq/lukso/general-information"
              title="What is LUKSO?"
              className="faq"
              content="Discover the features and benefits of the LUKSO Standards (LSPs)."
            />
          </div>

          <div>
            <Box
              icon={ToolsIcon}
              link="./tools/libraries/getting-started"
              title="TOOLS"
              className="tools"
              content="Explore tools that help you to interact with Universal Profiles and Digital Assets."
            />
            <div style={{ margin: '0 2rem' }}>
              {toolsData.map((item, index) => (
                <CustomAccordion
                  key={index}
                  summary={item.title}
                  details={item.link}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div>
            <Box
              icon={NetworksIcon}
              link="./networks/mainnet/parameters/"
              title="NETWORKS"
              className="networks"
              content="Participate as node operator or interact on LUKSO's networks."
            />
            <div style={{ margin: '0 1rem' }}>
              {networksData.map((item, index) => (
                <ul key={index}>
                  <li className={styles.guideBox}>
                    <a href={item.link}>{item.title}</a>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
