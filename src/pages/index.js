import React from 'react';
import Layout from '@theme/Layout';

// styles
import styles from './index.module.scss';
import SearchBarWrapper from '../theme/SearchBar';

// images
import IntegrationIcon from '../../static/img/icons/icon-integrations-gradient.png';
import NetworksIcon from '../../static/img/icons/icon-networks-gradient.png';
import ToolsIcon from '../../static/img/icons/icon-tools-gradient.png';

import LogoDappNode from '../../static/img/tools/dappnode_logo.png';
import LogoEnvio from '../../static/img/tools/envio_logo.png';
import LogoAPI3 from '../../static/img/tools/api3-logo.png';
import LogoDIA from '../../static/img/tools/dia_logo.png';
import LogoTransak from '../../static/img/tools/transak_logo.png';
import LogoRamp from '../../static/img/tools/ramp-network-logo.png';

// components
import Link from '@docusaurus/Link';
import IconsGallery from '../components/IconsGallery';
import TitleWithSeparator from '../components/TitleWithSeparator';
import Box from '../components/Box';
import CallToActionButton from '../components/CallToActionButton';
import Headline from '../components/Headline';
import CustomAccordion from '../components/Accordion';
import DappsSlider from '../components/Carousel';
import LinksList from '../components/LinksList';
import LinksBox from '../components/LinksBox';

// data
import QuestionsAnswers from './questions-answers.json';

function Index() {
  return (
    <Layout description="Network, Standards, Tools and Guides for development on LUKSO and related standards.">
      <div className={styles.container}>
        <Headline />
        <div id="container-search" className={styles.containerSearch}>
          <SearchBarWrapper props={{ placeholder: 'Search anything...' }} />
        </div>

        <div className={styles.containerAccordion}>
          {QuestionsAnswers.map((item, index) => (
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
          <div className={styles.guideBox}>
            <Box
              icon={IntegrationIcon}
              link="./learn/migrate/migrate-to-lukso/"
              title="Integration Guide"
              className="integrations"
              content="Looking to migrate your project to LUKSO?"
              maxImageWidth="200px"
            />
            <LinksList
              links={[
                {
                  text: 'Discover the benefits of LSPs and Universal Profiles.',
                  link: '/learn/benefits-lukso-standards',
                },
                {
                  text: 'Integrate Universal Profile in your dApp.',
                  link: '/learn/universal-profile/connect-profile/connect-up',
                },
                {
                  text: 'Deploy Universal Profiles with the relayer API.',
                  link: '/tools/services/relayer-developer#1-deploy-universal-profiles',
                },
                {
                  text: 'Convert your ERC20 token to the LSP7 standard.',
                  link: '/learn/migrate/migrate-erc20-to-lsp7',
                },
                {
                  text: 'Convert your NFT Collection to the LSP8 standard.',
                  link: '/learn/migrate/migrate-erc721-to-lsp8',
                },
              ]}
            />
          </div>

          <div className={styles.guideBox}>
            <Box
              icon={IntegrationIcon}
              link="./learn/universal-profile/overview"
              title="Universal Profiles"
              className="universal-profiles"
              content="Discover Universal Profiles and new world of possibilities"
              maxImageWidth="200px"
            />
            <LinksList
              links={[
                {
                  text: "Customize your profile's pictures and infos.",
                  link: '/learn/universal-profile/metadata/edit-profile',
                },
                {
                  text: 'Learn how to transfer LYX, tokens or NFTs.',
                  link: '/learn/universal-profile/universal-receiver/create-receiver-forwarder',
                },
                {
                  text: 'Perform multiple actions with batch transactions.',
                  link: '/learn/universal-profile/universal-receiver/create-receiver-forwarder',
                },
                {
                  text: 'Control your Universal Profile from multiple addresses.',
                  link: '/learn/universal-profile/key-manager/grant-permissions',
                },
                {
                  text: 'Configure which assets to allow receiving.',
                  link: '/learn/universal-profile/universal-receiver/create-receiver-forwarder',
                },
              ]}
            />
          </div>

          <div className={styles.guideBox}>
            <Box
              icon={IntegrationIcon}
              link="./learn/digital-assets/getting-started"
              title="Digital Assets"
              className="networks"
              content="Build token and NFTs with flexible metadata and new features."
              maxImageWidth="200px"
            />
            <LinksList
              links={[
                {
                  text: 'Create a fungible token with the LSP7 standard.',
                  link: '/learn/digital-assets/token/create-lsp7-token',
                },
                {
                  text: 'Create an NFT collection using the LSP8 standard.',
                  link: '/learn/digital-assets/nft/create-nft-collection-lsp8',
                },
                {
                  text: 'Set the metadata of specific NFTs in a collection.',
                  link: '/learn/digital-assets/nft/set-nft-metadata',
                },
                {
                  text: 'Create complex collections of sub-collections.',
                  link: '/learn/digital-assets/nft/create-nft-collection-with-lsp7-tokenId',
                },
                {
                  text: 'Transfer tokens and NFTs in batches for airdrops.',
                  link: '/learn/digital-assets/transfer-batch',
                },
              ]}
            />
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
            <p style={{ paddingBottom: '3rem' }}>
              Providing the foundation to unify our digital lives.
            </p>
          </div>

          <div className={styles.subheader}>
            <Link to="/standards/introduction">
              <h1>What are the LUKSO LSP Standards?</h1>
            </Link>
            <p>
              A holistic set of new blockchain standards that are EVM
              compatible.
            </p>
            <p style={{ paddingBottom: '3rem' }}>
              To create protocols and applications social and user-centric.
            </p>
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
            <LinksBox
              links={[
                {
                  title: 'Add LUKSO Network to your wallet or dApp',
                  link: '/networks/mainnet/parameters#add-lukso-to-wallets',
                  showAsCode: false,
                  description:
                    'Connect to LUKSO Mainnet or Testnet in one click or see the available RPC endpoints.',
                },
                {
                  title: 'Block Explorer',
                  link: '/networks/mainnet/parameters',
                  showAsCode: false,
                  description:
                    'Browse transactions and interact with contracts on Blockscout.',
                },
                {
                  title: 'Running a Node',
                  link: '/networks/mainnet/running-a-node#starting-a-node',
                  showAsCode: false,
                  description:
                    'Be part in making the LUKSO Network secure and decentralized by running your own node.',
                },
                {
                  title: 'Become a Validator',
                  link: '/networks/mainnet/become-a-validator',
                  showAsCode: false,
                  description:
                    'Run your own validator node and start earning rewards! (available with DappNode!)',
                },
              ]}
            />
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
            <LinksBox
              links={[
                {
                  title: 'Relayer API',
                  link: '',
                  showAsCode: false,
                  description:
                    'Create Universal Profiles easily and get your users to benefit from gas less transactions.',
                },
                {
                  title: 'Smart Contracts Packages',
                  link: '',
                  showAsCode: false,
                  description:
                    'The smart contract implementation of the LSP standards in Solidity.',
                },
                {
                  title: 'erc725.js',
                  link: '',
                  showAsCode: true,
                  description:
                    'Set and retrieve data easily in Universal Profile and Digital Assets.',
                },
                {
                  title: 'eip191-signer.js',
                  link: '',
                  showAsCode: true,
                  description:
                    'Sign data easily to submit gas-less transactions via execute relay calls.',
                },
                {
                  title: 'lsp-utils.js',
                  link: '',
                  showAsCode: true,
                  description:
                    'Easy to use helper functions to interact with smart contracts powered by the LSPs.',
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className={styles.container} style={{ marginBottom: '3rem' }}>
        <TitleWithSeparator title="Integrations Partners" />
        <IconsGallery
          items={[
            {
              name: 'DappNode',
              image: LogoDappNode,
              url: 'https://universalswaps.io/',
              backgroundColor: 'white',
            },
            {
              name: 'Envio',
              image: LogoEnvio,
              url: 'https://stakingverse.io/',
              backgroundColor: 'white',
            },

            {
              name: 'API3',
              image: LogoAPI3,
              url: 'https://lsp8.app/',
              backgroundColor: 'white',
            },
            {
              name: 'DIA',
              image: LogoDIA,
              url: 'https://universal.page/',
              backgroundColor: 'white',
            },
            {
              name: 'Transak',
              image: LogoTransak,
              url: 'https://upturn.live/',
              backgroundColor: 'white',
            },
            {
              name: 'Ramp',
              image: LogoRamp,
              url: 'https://app.cg/',
              backgroundColor: 'white',
            },
          ]}
        />
      </div>

      <div className={styles.container}>
        <TitleWithSeparator title="Popular dApps built on LUKSO" />
      </div>
      <DappsSlider />
    </Layout>
  );
}

export default Index;
