// integration partner images
import LogoDappNode from '../static/img/tools/dappnode_logo.png';
import LogoEnvio from '../static/img/tools/envio_logo.png';
import LogoAPI3 from '../static/img/tools/api3-logo.png';
import LogoDIA from '../static/img/tools/dia_logo.png';
import LogoTransak from '../static/img/tools/transak_logo.png';
import LogoRamp from '../static/img/tools/ramp-network-logo.png';

// dApps images
import UniversalEverythingLogo from '@site/static/img/dapps/universaleverything-io-logo.png';
import UniversalSwapsLogo from '@site/static/img/dapps/universalswaps-logo.png';
import UniversalPageLogo from '@site/static/img/dapps/universalpage-logo.png';
import StakingverseLogo from '@site/static/img/dapps/stakingverse-logo.png';
import CommongroundLogo from '@site/static/img/dapps/common-ground-logo.png';
import DefolioLogo from '@site/static/img/dapps/defolio-logo.png';
import UFeedLogo from '@site/static/img/dapps/ufeed-logo.png';
import UpTurnLogo from '@site/static/img/dapps/upturn-logo-scaled.png';
import LSP8AppLogo from '@site/static/img/dapps/lsp8app-logo.png';
import FamilyLyxLogo from '@site/static/img/dapps/family-lyx-logo.png';
import TxCityLogo from '@site/static/img/dapps/txcity-io-logo.webp';
import TxsAppLogo from '@site/static/img/dapps/txs-app-logo.png';

export const migrateGuides = [
  {
    text: 'Discover the benefits of LSPs and Universal Profiles',
    link: '/learn/benefits-lukso-standards',
  },
  {
    text: 'Integrate Universal Profile in your dApp',
    link: '/learn/universal-profile/connect-profile/connect-up',
  },
  {
    text: 'Deploy Universal Profiles with the relayer API',
    link: '/tools/services/relayer-developer#1-deploy-universal-profiles',
  },
  {
    text: 'Convert your ERC20 token to the LSP7 standard',
    link: '/learn/migrate/migrate-erc20-to-lsp7',
  },
  {
    text: 'Convert your NFT Collection to the LSP8 standard',
    link: '/learn/migrate/migrate-erc721-to-lsp8',
  },
];

export const universalProfileGuides = [
  {
    text: "Customize your profile's pictures and infos",
    link: '/learn/universal-profile/metadata/edit-profile',
  },
  {
    text: 'Learn how to transfer LYX, tokens or NFTs',
    link: '/learn/universal-profile/universal-receiver/create-receiver-forwarder',
  },
  {
    text: 'Perform multiple actions with batch transactions',
    link: '/learn/universal-profile/universal-receiver/create-receiver-forwarder',
  },
  {
    text: 'Control your Universal Profile from multiple addresses',
    link: '/learn/universal-profile/key-manager/grant-permissions',
  },
  {
    text: 'Configure which assets to allow receiving',
    link: '/learn/universal-profile/universal-receiver/create-receiver-forwarder',
  },
];

export const digitalAssetsGuides = [
  {
    text: 'Create a fungible token with the LSP7 standard',
    link: '/learn/digital-assets/token/create-lsp7-token',
  },
  {
    text: 'Create an NFT collection using the LSP8 standard',
    link: '/learn/digital-assets/nft/create-nft-collection-lsp8',
  },
  {
    text: 'Set the metadata of specific NFTs in a collection',
    link: '/learn/digital-assets/nft/set-nft-metadata',
  },
  {
    text: 'Create complex collections of sub-collections',
    link: '/learn/digital-assets/nft/create-nft-collection-with-lsp7-tokenId',
  },
  {
    text: 'Transfer tokens and NFTs in batches for airdrops',
    link: '/learn/digital-assets/transfer-batch',
  },
];

export const networkLinks = [
  {
    title: 'Add LUKSO Network to your wallet or dApp',
    link: '/networks/mainnet/parameters#add-lukso-to-wallets',
    showAsCode: false,
    description:
      'One-click connect to LUKSO Mainnet or Testnet (see the available RPC endpoints).',
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
      'Run your own node to make the LUKSO Network secure and decentralized.',
  },
  {
    title: 'Become a Validator',
    link: '/networks/mainnet/become-a-validator',
    showAsCode: false,
    description:
      'Run your own validator node and start earning rewards. DappNode available!',
  },
];

export const toolsLinks = [
  {
    title: 'Relayer API',
    link: '/tools/apis/relayer-api',
    showAsCode: false,
    description:
      'Create Universal Profiles easily and get users to benefit from gas less transactions.',
  },
  {
    title: 'Smart Contracts Packages',
    link: '/contracts',
    showAsCode: false,
    description:
      'The smart contract implementation of the LSP standards in Solidity.',
  },
  {
    title: 'erc725.js',
    link: '/tools/dapps/erc725js/getting-started',
    showAsCode: true,
    description:
      'Set and retrieve data easily in Universal Profile and Digital Assets.',
  },
  {
    title: 'lsp-utils.js',
    link: '/tools/dapps/lsp-utils/getting-started',
    showAsCode: true,
    description:
      'Easy to use helper functions to interact with smart contracts powered by the LSPs.',
  },
  {
    title: 'eip191-signer.js',
    link: '/tools/dapps/eip191-signerjs/getting-started',
    showAsCode: true,
    description:
      'Sign data easily to submit gas-less transactions via execute relay calls.',
  },
];

export const integrationPartners = [
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
];

// image placeholder (uncomment to use)
// import ImagePlaceholder from '@site/static/img/image-placeholder.jpeg';

// // template (uncomment to use and add it in the list below)
// {
//   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
//   image: ImagePlaceholder,
//   backgroundColor: '#fcfcfc',
//   link: 'https://...',
// },
export const dappsSlider = [
  // banner 1 ----------------
  {
    name: 'Universal Everything',
    description: 'Explorer and wallet for Universal Profiles.',
    image: UniversalEverythingLogo,
    backgroundColor: '#fcfcfc',
    link: 'https://universaleverything.io/',
  },
  {
    name: 'Universal Swaps',
    description: 'Defi made social for swaps and tokens liquidity.',
    image: UniversalSwapsLogo,
    backgroundColor: '#fddce7',
    link: 'https://universalswaps.io/',
  },
  {
    name: 'Universal Page',
    description: 'NFT marketplace and staking solution on LUKSO.',
    image: UniversalPageLogo,
    backgroundColor: '#5049df',
    link: 'https://universal.page/',
  },
  {
    name: 'Stakingverse',
    description: 'Stake your LYX and start earning staking rewards.',
    image: StakingverseLogo,
    backgroundColor: '#1E1E1E',
    link: 'https://stakingverse.io/',
  },
  // banner 2 ----------------
  {
    name: 'Common Ground',
    description: 'The social app for all web3 communities.',
    image: CommongroundLogo,
    backgroundColor: '#404bbb',
    link: 'https://app.cg/',
  },
  {
    name: 'DeFolio',
    description: 'Universal Profiles management platform.',
    image: DefolioLogo,
    backgroundColor: '#fcfcfc',
    link: 'https://www.de-folio.com/',
  },
  {
    name: 'UFeed',
    description: 'Social network and feed on LUKSO',
    image: UFeedLogo,
    backgroundColor: '#fcfcfc',
    link: 'https://ufeed.io/',
  },
  {
    name: 'UP Turn',
    description: 'Token generator app for digital assets on LUKSO.',
    image: UpTurnLogo,
    backgroundColor: 'white',
    link: 'https://upturn.live/',
  },
  // banner 3 ----------------
  {
    name: 'LSP8.APP',
    description: 'Track and analyze LSP8 NFT rarity and value.',
    image: LSP8AppLogo,
    backgroundColor: '#2d1b46',
    link: 'https://lsp8.app/',
  },
  {
    name: 'Family LYX',
    description: 'Phygital garments powered by LUKSO standards.',
    image: FamilyLyxLogo,
    backgroundColor: '#31353A',
    link: 'https://www.familylyx.com/',
  },
  {
    name: 'Txs.app',
    description: 'User friendly transaction explorer for LUKSO.',
    image: TxsAppLogo,
    backgroundColor: '#fcfcfc',
    link: 'https://txs.app/',
  },

  {
    name: 'TxCity.io',
    description: 'LUKSO live Blockchain transaction visualizer.',
    image: TxCityLogo,
    backgroundColor: '#fcfcfc',
    link: 'https://txcity.io/v/eth-lukso',
  },
  // banner 4 ----------------
  // TODO: define if we add some popular NFT collections or not. If yes add these import below at the top of the file
  // import ChillwhaleLogo from '@site/static/img/dapps/chillwhale-logo.jpg';
  // import CupCoLogo from '@site/static/img/dapps/cupco-logo.webp';
  // {
  //   name: 'Chillwhale',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
  //   image: ChillwhaleLogo,
  //   backgroundColor: '#9F9596',
  //   link: 'https://chillwhales.com/',
  // },
  // {
  //   name: 'CupCo',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
  //   image: CupCoLogo,
  //   backgroundColor: '#262626',
  //   link: 'https://...',
  // },
];
