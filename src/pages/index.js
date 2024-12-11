import React from 'react';
import Layout from '@theme/Layout';

// styles
import styles from './index.module.scss';
import SearchBarWrapper from '../theme/SearchBar';

// images
import IntegrationIcon from '../../static/img/icons/icon-integrations-gradient.png';
import NetworksIcon from '../../static/img/icons/icon-networks-gradient.png';
import ToolsIcon from '../../static/img/icons/icon-tools-gradient.png';

// components
import Link from '@docusaurus/Link';
import IconsGallery from '../components/IconsGallery';
import TitleWithSeparator from '../components/TitleWithSeparator';
import Box from '../components/Box';
import CallToActionButton from '../components/CallToActionButton';
import Headline from '../components/Headline';
import CustomAccordion from '../components/Accordion';
import Slider from '../components/Slider';
import LinksBox from '../components/LinksBox';
import LinkCards from '../components/LinkCards';

// data
import accordionData from './accordion.js';
import {
  migrateGuides,
  universalProfileGuides,
  digitalAssetsGuides,
  toolsLinks,
  networkLinks,
  integrationPartners,
  dappsSlider,
} from './links.js';

function Index() {
  return (
    <Layout description="Network, Standards, Tools and Guides for development on LUKSO and related standards.">
      <div className={styles.container}>
        <Headline />
        <div id="home-search" className={styles.containerSearch}>
          <SearchBarWrapper />
        </div>

        <div className={styles.containerAccordion}>
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
        <TitleWithSeparator title="Developer Quickstart" />
        <div className={styles.subheader}>
          <p>
            Quickest guides to get started building on LUKSO with the LSPs and
            Universal Profiles.
          </p>
        </div>

        <div className={styles.containerButtons}>
          <CallToActionButton
            icon="material-symbols:extension"
            text="Download UP Browser Extension"
            link="/install-up-browser-extension"
            color="white"
          />
          <CallToActionButton
            icon="material-symbols:flag-sharp"
            text="Start Building on LUKSO"
            link="/learn/getting-started"
            color="white"
          />
        </div>

        <div className={styles.containerBoxes}>
          <div>
            <Box
              icon={IntegrationIcon}
              link="./learn/migrate/migrate-to-lukso/"
              title="Integration Guide"
              className="integrations"
              content="Looking to migrate your project to LUKSO?"
              maxImageWidth="200px"
            />
            <LinksBox links={migrateGuides} />
          </div>

          <div>
            <Box
              icon={IntegrationIcon}
              link="./learn/universal-profile/overview"
              title="Universal Profiles"
              className="universal-profiles"
              content="Discover Universal Profiles and new world of possibilities"
              maxImageWidth="200px"
            />
            <LinksBox links={universalProfileGuides} />
          </div>

          <div>
            <Box
              icon={IntegrationIcon}
              link="./learn/digital-assets/getting-started"
              title="Digital Assets"
              className="networks"
              content="Build token and NFTs with flexible metadata and new features."
              maxImageWidth="200px"
            />
            <LinksBox links={digitalAssetsGuides} />
          </div>
        </div>
      </div>

      {/* margin: 0 to remove the default left-right margin for the background image to span full width */}
      <div className={styles.container} style={{ margin: 0 }}>
        <div className={styles.containerLukso}>
          <div className={styles.subheader}>
            <Link to="/learn/overview">
              <h1>What is LUKSO?</h1>
            </Link>
            <p>
              An EVM-based Blockchain built for social, culture and creators.
            </p>
            <p>Providing the foundation to unify our digital lives.</p>
          </div>

          <div className={styles.subheader}>
            <Link to="/standards/introduction">
              <h1>What are the LUKSO LSP Standards?</h1>
            </Link>
            <p>
              A holistic set of new blockchain standards that are EVM
              compatible.
            </p>
            <p>To create protocols and applications social and user-centric.</p>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.containerBoxes}>
          <div className={styles.guideBox}>
            <Box
              icon={NetworksIcon}
              link="./networks/mainnet/parameters/"
              title="LUKSO Network"
              className="networks"
              content="Running a node or integrate the LUKSO network in your dApp."
              maxImageWidth="200px"
            />
            <LinkCards links={networkLinks} />
          </div>
          <div className={styles.guideBox}>
            <Box
              icon={ToolsIcon}
              link="./tools"
              title="Tools"
              className="tools"
              content="To help you interact with Universal Profiles and Digital Assets."
              maxImageWidth="200px"
            />
            <LinkCards links={toolsLinks} />
          </div>
        </div>
      </div>

      <div className={styles.container} style={{ marginBottom: '3rem' }}>
        <TitleWithSeparator title="Integrations Partners" />
        <IconsGallery items={integrationPartners} />
      </div>

      <div className={styles.container}>
        <TitleWithSeparator title="Popular dApps built on LUKSO" />
      </div>

      <Slider items={dappsSlider} />
    </Layout>
  );
}

export default Index;
