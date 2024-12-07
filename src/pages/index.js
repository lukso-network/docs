import React from 'react';
import Layout from '@theme/Layout';

// styles
import styles from './index.module.scss';
import SearchBarWrapper from '../theme/SearchBar';

// images
import NetworksIcon from '../../static/img/icons/icon-networks-gradient.png';
import ToolsIcon from '../../static/img/icons/icon-tools-gradient.png';

// components
import Link from '@docusaurus/Link';
import DappsGallery from '../components/DappsGallery';
import TitleWithSeparator from '../components/TitleWithSeparator/index.tsx';
import Box from '../components/Box';
import CallToActionButton from '../components/CallToActionButton';
import Headline from '../components/Headline';
import CustomAccordion from '../components/Accordion';
import Example from '../components/Carousel/index.tsx';
import LinksList from '../components/LinksList';

// data
import QuestionsAnswers from './questions-answers.json';

const toolsData = [
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
];

const networksData = [
  {
    title: 'Add LUKSO Network to your wallet',
    link: '/networks/mainnet/parameters#add-lukso-to-wallets',
  },
  {
    title: 'Become a Validator',
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

        <div className={styles.containerBoxes}>
          <div className={styles.guideBox}>
            <Box
              icon={NetworksIcon}
              link="./networks/mainnet/parameters/"
              title="Integration Guide"
              className="networks"
              content="Looking to migrate your project to LUKSO?"
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
                  text: 'Deploy Universal Profiles with our relayer API.',
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
              icon={NetworksIcon}
              link="./networks/mainnet/parameters/"
              title="Universal Profiles"
              className="networks"
              content="Discover Universal Profiles and new world of possibilities"
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
              icon={NetworksIcon}
              link="./networks/mainnet/parameters/"
              title="Digital Assets"
              className="networks"
              content="Build token and NFTs with flexible metadata and new features."
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

      <div className={styles.container}>
        <div className={styles.containerCard}>
          {/* TODO: make a component for this? */}
          <div className={styles.subheader}>
            <Link to="/learn/overview">
              <h1>What is LUKSO?</h1>
            </Link>
            <p>
              An EVM-based Blockchain built for social, culture and creators.
            </p>
            {/* TODO: find a way to move `Box` in the div below without breaking the style font size + image size of the Box headers */}
            <p style={{ paddingBottom: '3rem' }}>
              Providing the foundation to unify our digital lives.
            </p>

            <Box
              icon={NetworksIcon}
              link="./networks/mainnet/parameters/"
              title="LUKSO Network"
              className="networks"
              content="Running a node or integrate the LUKSO network in your dApp."
            />
            <div className={styles.guideBox}>
              <ul>
                {networksData.map((item, index) => (
                  <li key={index}>
                    <h3>
                      <a href={item.link}>{item.title}</a>
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {/* TODO: re-use component `TitleWithSeparator` but pass `<p>` tags as children */}
            <div className={styles.subheader}>
              <Link to="/standards/introduction">
                <h1>What are the LUKSO Standard Proposals (LSPs)?</h1>
              </Link>
              <p>
                A holistic set of new blockchain standards that are EVM
                compatible.
              </p>
              <p style={{ paddingBottom: '3rem' }}>
                To create protocols and applications social and user-centric.
              </p>

              <Box
                icon={ToolsIcon}
                link="./networks/mainnet/parameters/"
                title="Tools"
                className="networks"
                content="To help you interact with Universal Profiles and Digital Assets easily."
              />
            </div>
            <div className={styles.guideBox}>
              {/**
               * TODO: create a component LinkItem with props (with the same style as Mustafa had created):
               * - title
               * - link
               * - description (optional)
               */}
              <ul>
                {toolsData.map((item, index) => (
                  <li key={index}>
                    <h3>
                      {item.showAsCode ? (
                        <code>
                          <a href={item.link}>{item.title}</a>
                        </code>
                      ) : (
                        <a href={item.link}>{item.title}</a>
                      )}
                    </h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container} style={{ marginBottom: '3rem' }}>
        <TitleWithSeparator title="Integrations Partners" />
        <DappsGallery />
      </div>

      <div className={styles.container}>
        <TitleWithSeparator title="Popular dApps built on LUKSO" />
      </div>
      <Example />
    </Layout>
  );
}

export default Index;
