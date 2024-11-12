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
import GuidesIcon from '../../static/img/icons/icon-guides-gradient.png';
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
              <CallToActionButton
                text="🏁 Getting Started 🏁"
                link="/learn/getting-started"
                color="white"
                icon="material-symbols:keyboard-double-arrow-right"
              />

              <div style={{ marginTop: '3em' }}>
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
            <div className={styles.guideBoxes}>
              <a href="/guides/smart-contracts" className={styles.guideBox}>
                <h3>Smart Contract Development</h3>
                <p>Learn how to build and deploy smart contracts on LUKSO</p>
              </a>
              <a href="/guides/universal-profiles" className={styles.guideBox}>
                <h3>Universal Profiles</h3>
                <p>
                  Create and manage blockchain identities with LSP standards
                </p>
              </a>
              <a href="/guides/digital-assets" className={styles.guideBox}>
                <h3>Digital Assets</h3>
                <p>
                  Build and interact with tokens and NFTs using LSP7 and LSP8
                </p>
              </a>
              <a href="/guides/dapp-integration" className={styles.guideBox}>
                <h3>Migrate to LUKSO</h3>
                <p>
                  The overview of the differences between building on LUKSO vs
                  other EVM chains.
                </p>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.cardContainer}>
          <Box
            icon={GuidesIcon}
            link="./learn/getting-started"
            title="LEARN"
            className="learn"
            content="Learn about integrating standards within contracts and dApps."
          />
          <Box
            icon={StandardsIcon}
            link="./standards/introduction"
            title="STANDARDS"
            className="standards"
            content="Discover new smart contract standards that will change the way we interact with Blockchain."
          />
          <Box
            icon={ToolsIcon}
            link="./tools/libraries/getting-started"
            title="TOOLS"
            className="tools"
            content="Explore tools that help you to interact with Universal Profiles and NFT2.0."
          />
        </div>
        <div className={styles.cardContainer}>
          <Box
            icon={NetworksIcon}
            link="./networks/mainnet/parameters/"
            title="NETWORKS"
            className="networks"
            content="Participate as node operator or interact on LUKSO's networks."
          />
          <Box
            icon={FAQIcon}
            link="./faq/lukso/general-information"
            title="FAQ"
            className="faq"
            content="Read frequently asked questions about the project and network."
          />
          <Box
            icon={PartnersIcon}
            link="./tools/integrations"
            title="INTEGRATIONS"
            className="partners"
            content="Check out LUKSO ecosystem tools and services."
          />
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
        <SeparatorWithTitle title={'Projects building on LUKSO'} />
        <DappsGallery />
      </div>
    </Layout>
  );
}

export default Index;
