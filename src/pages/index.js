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

const accordionData = [
  { summary: 'General', details: 'some answers' },
  {
    summary: 'Universal Profiles',
    details: 'some answers',
  },
  {
    summary: 'Tokens & NFTs',
    details: 'some answers',
  },
  {
    summary: 'Network & Validators',
    details: 'some answers',
  },
  {
    summary: 'Wallets & Controller dApps',
    details: 'some answers',
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

// const accordionData = [
//   { summary: 'Why is there new standards on LUKSO?', details: 'some answers' },
//   {
//     summary: 'Why is LUKSO a Layer 1 and not a Layer 2?',
//     details: 'some answers',
//   },
//   {
//     summary:
//       'What are the advantages offered by the LUKSO LSP Standards compared to the ERC Standards?',
//     details: 'some answers',
//   },
//   {
//     summary:
//       'What are the key differences between the LUKSO LSP Standards and the Ethereum ERC Standards?',
//     details: 'some answers',
//   },
//   {
//     summary: 'What can be built using the LUKSO Standards?',
//     details: 'some answers',
//   },
// ];

function Index() {
  return (
    <Layout description="Network, Standards, Tools and Guides for development on LUKSO and related standards.">
      <div className={styles.container}>
        <div className={styles.twoColumnSection}>
          <div className={styles.leftColumn}>
            <Headline />
            <div className={styles.ctaButtons}>
              <div style={{ display: 'inline-block' }}>
                <CallToActionButton
                  text="🏁 Getting Started 🏁"
                  link="/learn/getting-started"
                  color="white"
                  icon="material-symbols:keyboard-double-arrow-right"
                />
              </div>

              <div style={{ display: 'inline-block', marginLeft: '1rem' }}>
                <CallToActionButton
                  text="Download 🆙 Browser Extension"
                  link="install-up-browser-extension"
                  color="white"
                  icon="material-symbols:extension"
                />
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            {/* <div className={styles.cardContainer}>
              <Box
                icon={StandardsIcon}
                link="./learn/getting-started"
                title="Useful Guides"
                // className="standards"
                content="Our quickest guides to get your started building on LUKSO."
              />
            </div> */}
            <div className={styles.guideBoxes}>
              <div className={styles.guideBox}>
                <h3>Quickstart integrations</h3>
                <p style={{ margin: '1rem 0' }}>
                  Looking to migrate your project to LUKSO? Or starting from
                  scratch?
                </p>
                <ul>
                  <li>
                    <a href="/learn/universal-profile/connect-profile/connect-up">
                      Integrate the 🆙 Browser Extension easily in your dApp.
                    </a>
                  </li>
                  <li>
                    <a href="/tools/services/relayer-developer#1-deploy-universal-profiles">
                      Create a Universal Profile easily with the relayer API
                    </a>
                  </li>
                  <li>
                    <a href="/tools/integrations">
                      Integrate our various toolings, such as oracles, RPC
                      providers or data indexers.
                    </a>
                  </li>
                </ul>
              </div>
              <div className={styles.guideBox}>
                <h3>Universal Profiles</h3>
                <p style={{ margin: '1rem 0' }}>
                  Discover the world of Universal Profiles 🆙 and what you can
                  do with them.
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
                      Allow 3rd party addresses to control your Universal
                      Profile.
                    </a>
                  </li>
                  <li>
                    <a href="/learn/universal-profile/universal-receiver/create-receiver-forwarder">
                      Automate forwarding a % of tokens received by your
                      Universal Profile.
                    </a>
                  </li>
                </ul>
              </div>
              <div className={styles.guideBox}>
                <h3>Digital Assets</h3>
                <p style={{ margin: '1rem 0' }}>
                  Create Build and interact with tokens and NFTs using LSP7 and
                  LSP8
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
        </div>
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
            <div style={{ margin: '0 2rem' }}>
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
        <div></div>
        <SeparatorWithTitle title={'Popular dApps built on LUKSO'} />
        <DappsGallery />
      </div>
    </Layout>
  );
}

export default Index;
