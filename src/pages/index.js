import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';

// styles
import styles from './index.module.scss';
import SearchBarWrapper from '../theme/SearchBar';

// images
import IntegrationGuidesIcon from '../../static/img/icons/icon-guides-integration.png';
import UniversalProfileGuidesIcon from '../../static/img/icons/icon-guides-universal-profile.png';
import DigitalAssetGuidesIcon from '../../static/img/icons/icon-guides-digital-asset.png';
import NetworksIcon from '../../static/img/icons/icon-networks-gradient.png';
import ToolsIcon from '../../static/img/icons/icon-tools-gradient.png';

// components
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
import accordionData from '../accordion.js';
import {
  migrateGuides,
  universalProfileGuides,
  digitalAssetsGuides,
  toolsLinks,
  networkLinks,
  integrationPartners,
  dappsSlider,
} from '../links.js';

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

        <div className={styles.containerBoxes3Columns}>
          <div>
            <Box
              icon={IntegrationGuidesIcon}
              link="./learn/migrate/migrate-to-lukso/"
              title="Integration Guides"
              content="Looking to migrate your project to LUKSO? Visit our integration guides."
            />
            <LinksBox links={migrateGuides} />
          </div>

          <div>
            <Box
              icon={UniversalProfileGuidesIcon}
              link="./learn/universal-profile/overview"
              title="Universal Profiles"
              content="Discover the new mart account social by default and its features."
            />
            <LinksBox links={universalProfileGuides} />
          </div>

          <div>
            <Box
              icon={DigitalAssetGuidesIcon}
              link="./learn/digital-assets/getting-started"
              title="Digital Assets"
              content="Build Tokens and NFTs with flexible metadata, transfer notifications, and more!"
            />
            <LinksBox links={digitalAssetsGuides} />
          </div>
        </div>
      </div>

      {/* margin: 0 to remove the default left-right margin for the background image to span full width */}
      <div className={clsx(styles.container, styles.containerLukso)}>
        <div className={styles.containerBoxes2Columns}>
          <div className={styles.headerHero}>
            <h1>What is LUKSO?</h1>
            <p>
              An EVM-based Blockchain built for social, culture and creators.
            </p>
            <p>Providing the foundation to unify our digital lives.</p>
            <div style={{ marginTop: '2rem' }}>
              <CallToActionButton
                icon="material-symbols:help"
                text="Learn more"
                link="/learn/overview"
                color="white"
              />
            </div>
          </div>

          <div className={styles.headerHero}>
            <h1>What are the LUKSO LSP Standards?</h1>
            <p>
              A holistic set of new blockchain standards that are EVM
              compatible.
            </p>
            <p>To create protocols and applications social and user-centric.</p>
            <div style={{ marginTop: '2rem' }}>
              <CallToActionButton
                icon="material-symbols:brick"
                text="Learn more"
                link="/standards/introduction"
                color="white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.containerBoxes2Columns}>
          <div>
            <Box
              icon={NetworksIcon}
              link="./networks/mainnet/parameters/"
              title="LUKSO Network"
              content="Learn how to run a node or integrate the LUKSO network in your dApp."
              maxImageWidth="300px"
              position="center"
            />
            <LinkCards links={networkLinks} />
          </div>
          <div>
            <Box
              icon={ToolsIcon}
              link="./tools"
              title="Tools"
              content="APIs and libraries to interact with Universal Profiles and Digital Assets."
              maxImageWidth="300px"
              position="center"
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
