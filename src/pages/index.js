import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.scss';

import Box from '../components/Box';
import CallToActionButton from '../components/CallToActionButton';
import Headline from '../components/Headline';

import NetworksIcon from '../../static/img/icons/icon-networks-gradient.png';
import StandardsIcon from '../../static/img/icons/icon-standards-gradient.png';
import ToolsIcon from '../../static/img/icons/icon-tools-gradient.png';
import PartnersIcon from '../../static/img/icons/icon-partners-gradient.png';
import GuidesIcon from '../../static/img/icons/icon-guides-gradient.png';
import FAQIcon from '../../static/img/icons/icon-faq-gradient.png';

function Index() {
  return (
    <Layout description="Network, Standards, Tools and Guides for development on LUKSO and related standards.">
      <div className={styles.container}>
        <Headline />
        <CallToActionButton
          bgColor="#6270A4"
          color="#ffffff"
          link="./learn/introduction"
          text="START BUILDING WITH LUKSO STANDARDS"
        />
        <br />
        <div className={styles.cardContainer}>
          <Box
            icon={NetworksIcon}
            link="./networks/mainnet/parameters/"
            title="NETWORKS"
            className="networks"
            content="Participate as node operator or interact on LUKSO's networks."
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
            link="./tools/getting-started"
            title="TOOLS"
            className="tools"
            content="Explore tools that help you to interact with Universal Profiles and NFT2.0."
          />
        </div>
        <div className={styles.cardContainer}>
          <Box
            icon={GuidesIcon}
            link="./learn/introduction"
            title="LEARN"
            className="learn"
            content="Learn about integrating standards within contracts and dApps."
          />
          <Box
            icon={PartnersIcon}
            link="./tools/partners"
            title="PARTNERS"
            className="partners"
            content="Check out partnered ecosystem tools and services."
          />
          <Box
            icon={FAQIcon}
            link="./faq/lukso/general-information"
            title="FAQ"
            className="faq"
            content="Read frequently asked questions about the project and network."
          />
        </div>
      </div>
    </Layout>
  );
}

export default Index;
