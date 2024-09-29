import { themes as prismThemes } from 'prism-react-renderer';

export default {
  title: 'LUKSO Tech Documentation',
  tagline:
    'Network, Standards, Tools and Guides for development on LUKSO and related standards.',
  url: 'https://docs.lukso.tech',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'lukso-network', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  scripts: [
    {
      src: 'https://plausible.io/js/script.js',
      defer: true,
      'data-domain': 'docs.lukso.tech',
    },
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    'docusaurus-plugin-sass',
    'plugin-image-zoom',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Learn home
          {
            from: '/learn/what-is-lukso',
            to: '/learn/getting-started',
          },
          {
            from: '/standards/universal-profile/lsp0-erc725account',
            to: '/standards/accounts/introduction',
          },
          {
            from: '/standards/universal-profile/lsp6-key-manager',
            to: '/standards/access-control/lsp6-key-manager',
          },
          {
            from: '/standards/generic-standards/lsp1-universal-receiver',
            to: '/standards/accounts/lsp1-universal-receiver',
          },
          {
            from: '/standards/universal-profile/introduction',
            to: '/standards/accounts/introduction',
          },
          {
            from: '/standards/generic-standards/lsp1-universal-receiver-delegate',
            to: '/standards/accounts/lsp1-universal-receiver-delegate',
          },
          {
            from: '/standards/nft-2.0/LSP8-Identifiable-Digital-Asset',
            to: '/standards/tokens/LSP8-Identifiable-Digital-Asset',
          },
          {
            from: '/standards/nft-2.0/LSP7-Digital-Asset',
            to: '/standards/tokens/LSP7-Digital-Asset',
          },
          {
            from: '/standards/lsp-background/erc725',
            to: '/standards/erc725',
          },
          // Learn/Smart Contract Developer
          {
            from: '/learn/smart-contract-developers/getting-started',
            to: '/learn/digital-assets/getting-started',
          },
          {
            from: '/learn/smart-contract-developers/create-lsp7-token',
            to: '/learn/digital-assets/token/create-lsp7-token',
          },
          {
            from: '/learn/smart-contract-developers/retrieve-token-type',
            to: '/learn/digital-assets/retrieve-token-type',
          },
          // Learn/Expert guides
          {
            from: '/learn/expert-guides/key-manager/execute-relay-transactions',
            to: '/learn/universal-profile/key-manager/execute-relay-transactions',
          },
          {
            from: '/learn/expert-guides/key-manager/upgrade-key-manager',
            to: '/learn/universal-profile/advanced-guides/upgrade-key-manager',
          },
          {
            from: '/learn/expert-guides/universal-receiver/deploy-universal-receiver',
            to: '/learn/universal-profile/universal-receiver/deploy-universal-receiver',
          },
          {
            from: '/learn/expert-guides/universal-receiver/create-receiver-forwarder',
            to: '/learn/universal-profile/universal-receiver/create-receiver-forwarder',
          },
          {
            from: '/learn/expert-guides/vault/create-a-vault',
            to: '/learn/vault/create-a-vault',
          },
          {
            from: '/learn/expert-guides/vault/edit-vault-data',
            to: '/learn/vault/edit-vault-data',
          },
          {
            from: '/learn/expert-guides/accept-reject-assets',
            to: '/learn/universal-profile/universal-receiver/accept-reject-assets',
          },
          {
            from: '/learn/expert-guides/vault/grant-vault-permissions',
            to: '/learn/vault/grant-vault-permissions',
          },
          {
            from: '/learn/expert-guides/key-manager/get-controller-permissions',
            to: '/learn/universal-profile/key-manager/get-controller-permissions',
          },
          {
            from: '/learn/expert-guides/key-manager/grant-permissions',
            to: '/learn/universal-profile/key-manager/grant-permissions',
          },
          {
            from: '/learn/expert-guides/vault/interact-with-contracts',
            to: '/learn/vault/interact-with-contracts',
          },
          // Learn/Universal Profile
          {
            from: '/learn/universal-profile/interactions/transfer-lsp7-token',
            to: '/learn/universal-profile/interactions/transfer-tokens-and-nfts',
          },
          {
            from: '/learn/universal-profile/transfer-lyx',
            to: '/learn/universal-profile/interactions/transfer-lyx',
          },
          {
            from: '/learn/universal-profile/interact-with-contracts',
            to: '/learn/universal-profile/interactions/interact-with-contracts',
          },
          {
            from: '/learn/universal-profile/connect-profile/multi-provider',
            to: '/learn/universal-profile/connect-profile/connect-up',
          },
          {
            from: '/learn/universal-profile/interactions/deploy-token-with-metadata',
            to: '/learn/universal-profile/interactions/batch-transactions',
          },
          // Learn/dApp Developer
          {
            from: '/learn/dapp-developer/standard-detection',
            to: '/learn/standard-detection',
          },

          {
            from: '/learn/dapp-developer/connect-profile',
            to: '/learn/universal-profile/connect-profile/connect-up',
          },
          {
            from: '/learn/dapp-developer/read-asset-data',
            to: '/learn/digital-assets/metadata-management/read-asset-data',
          },
          // Learn/Digital Assets
          {
            from: '/learn/digital-assets/mint-lsp7-token',
            to: '/learn/universal-profile/interactions/interact-with-contracts',
          },
          {
            from: '/learn/digital-assets/create-lsp7-token',
            to: '/learn/digital-assets/token/create-lsp7-token',
          },
          {
            from: '/learn/assets',
            to: '/learn/digital-assets/metadata-management/metadata-preparation',
          },
          // Learn/Universal Receiver
          {
            from: '/learn/universal-receiver/deploy-receiver-forwarder',
            to: '/learn/universal-profile/universal-receiver/create-receiver-forwarder',
          },
          // Learn/Expert Guides
          {
            from: '/learn/expert-guides/deploy-multichain-contracts',
            to: '/learn/other-guides/deploy-multichain-contracts',
          },
          {
            from: '/learn/expert-guides/NFC-NFT',
            to: '/learn/other-guides/NFC-NFT',
          },
          {
            from: '/learn/expert-guides/run-graph-node',
            to: '/learn/other-guides/run-graph-node',
          },
          {
            from: '/learn/expert-guides/utilize-ipfs-storage',
            to: '/learn/other-guides/utilize-ipfs-storage',
          },
          // Tools
          {
            from: '/tools/partners',
            to: '/tools/integrations',
          },
          {
            from: '/tools/eip191-signerjs/getting-started',
            to: '/tools/libraries/eip191-signerjs/getting-started',
          },
          {
            from: '/tools/erc725js/getting-started',
            to: '/tools/libraries/erc725js/getting-started',
          },
          {
            from: '/tools/erc725js/methods',
            to: '/tools/libraries/erc725js/methods',
          },
          {
            from: '/tools/erc725js/providers',
            to: '/tools/libraries/erc725js/providers',
          },
          {
            from: '/tools/erc725js/schemas',
            to: '/tools/libraries/erc725js/schemas',
          },
          {
            from: '/tools/lsp-smart-contracts/constants',
            to: '/tools/libraries/lsp-smart-contracts/constants',
          },
          {
            from: '/tools/lsp-smart-contracts/contracts-abi',
            to: '/tools/libraries/lsp-smart-contracts/contracts-abi',
          },
          {
            from: '/tools/lsp-smart-contracts/getting-started',
            to: '/tools/libraries/lsp-smart-contracts/getting-started',
          },
          {
            from: '/tools/lsp-smart-contracts/solidity-contracts',
            to: '/tools/libraries/lsp-smart-contracts/solidity-contracts',
          },
          {
            from: '/tools/lsp-utils/getting-started',
            to: '/tools/libraries/lsp-utils/getting-started',
          },
          {
            from: '/tools/lsp-utils/IPFS',
            to: '/tools/libraries/lsp-utils/IPFS',
          },
          {
            from: '/tools/lsp-utils/LSP3ProfileMetadata',
            to: '/tools/libraries/lsp-utils/LSP3ProfileMetadata',
          },
          {
            from: '/tools/lsp-utils/LSP4DigitalAssetMetadata',
            to: '/tools/libraries/lsp-utils/LSP4DigitalAssetMetadata',
          },
          {
            from: '/tools/lsp-utils/LSP5ReceivedAssets',
            to: '/tools/libraries/lsp-utils/LSP5ReceivedAssets',
          },
          {
            from: '/tools/lsp-utils/LSP6KeyManager',
            to: '/tools/libraries/lsp-utils/LSP6KeyManager',
          },
          {
            from: '/tools/lsp-utils/LSP12IssuedAssets',
            to: '/tools/libraries/lsp-utils/LSP12IssuedAssets',
          },
          {
            from: '/tools/lsp-utils/LSP23LinkedContractsFactory',
            to: '/tools/libraries/lsp-utils/LSP23LinkedContractsFactory',
          },
          {
            from: '/tools/docker-factory',
            to: '/tools/services/docker-factory',
          },
          {
            from: '/tools/getting-started',
            to: '/tools/libraries/getting-started',
          },
          {
            from: '/tools/indexer',
            to: '/tools/services/indexer',
          },
          {
            from: '/tools/relayer-developer',
            to: '/tools/services/relayer-developer',
          },

          // lsp-factory deprecation
          {
            from: '/tools/lsp-factoryjs/deployment/universal-profile',
            to: '/learn/universal-profile/advanced-guides/deploy-up-with-lsp23',
          },
          {
            from: '/tools/lsp-factoryjs/deployment/digital-asset',
            to: '/learn/digital-assets/getting-started',
          },
          {
            from: '/tools/lsp-factoryjs/getting-started',
            to: '/tools/libraries/lsp-factoryjs/getting-started',
          },
          {
            from: '/tools/lsp-factoryjs/classes/universal-profile',
            to: '/tools/libraries/lsp-factoryjs/getting-started',
          },
          {
            from: '/tools/lsp-factoryjs/classes/lsp4-digital-asset-metadata',
            to: '/tools/libraries/lsp-factoryjs/getting-started',
          },
          {
            from: '/tools/lsp-factoryjs/classes/lsp7-digital-asset',
            to: '/tools/libraries/lsp-factoryjs/getting-started',
          },
          {
            from: '/tools/lsp-factoryjs/classes/lsp8-identifiable-digital-asset',
            to: '/tools/libraries/lsp-factoryjs/getting-started',
          },
          {
            from: '/learn/expert-guides/universal-profile/deploy-universal-profile',
            to: '/learn/universal-profile/advanced-guides/deploy-up-with-lsp23',
          },
          {
            from: '/learn/expert-guides/universal-profile/create-profile',
            to: '/learn/universal-profile/advanced-guides/deploy-up-with-lsp23',
          },
          {
            from: '/learn/expert-guides/deploy-up-with-lsp23',
            to: '/learn/universal-profile/advanced-guides/deploy-up-with-lsp23',
          },
          // Standards
          {
            from: '/standards/standard-detection',
            to: '/standards/standard-types',
          },
          {
            from: '/standards/erc725',
            to: '/standards/erc725',
          },
          {
            from: '/standards/metadata/lsp2-json-schema',
            to: '/standards/metadata/lsp2-json-schema',
          },
          {
            from: '/standards/generic-standards/lsp3-profile-metadata',
            to: '/standards/metadata/lsp3-profile-metadata',
          },
          {
            from: '/standards/generic-standards/lsp5-received-assets',
            to: '/standards/metadata/lsp5-received-assets',
          },
          {
            from: '/standards/generic-standards/lsp10-received-vaults',
            to: '/standards/metadata/lsp10-received-vaults',
          },
          {
            from: '/standards/generic-standards/lsp12-issued-assets',
            to: '/standards/metadata/lsp12-issued-assets',
          },
          {
            from: '/standards/nft-2.0/introduction',
            to: '/standards/tokens/introduction',
          },
          {
            from: '/standards/access-control/lsp6-key-manager',
            to: '/standards/access-control/lsp6-key-manager',
          },
          {
            from: '/standards/access-control/lsp14-ownable-2-step',
            to: '/standards/access-control/lsp14-ownable-2-step',
          },
          {
            from: '/standards/accounts/introduction',
            to: '/standards/accounts/introduction',
          },
          {
            from: '/standards/accounts/lsp0-erc725account',
            to: '/standards/accounts/lsp0-erc725account',
          },
          {
            from: '/standards/accounts/lsp1-universal-receiver',
            to: '/standards/accounts/lsp1-universal-receiver',
          },
          {
            from: '/standards/accounts/lsp1-universal-receiver-delegate',
            to: '/standards/accounts/lsp1-universal-receiver-delegate',
          },
          {
            from: '/standards/accounts/lsp9-vault',
            to: '/standards/accounts/lsp9-vault',
          },
          {
            from: '/standards/accounts/lsp17-contract-extension',
            to: '/standards/accounts/lsp17-contract-extension',
          },
          {
            from: '/standards/accounts/lsp20-call-verification',
            to: '/standards/accounts/lsp20-call-verification',
          },
          {
            from: '/standards/faq/channel-nonce',
            to: '/standards/accounts/lsp25-execute-relay-call',
          },
          {
            from: '/standards/generic-standards/lsp26-follower-system',
            to: '/standards/accounts/lsp26-follower-system',
          },
          {
            from: '/standards/accounts/lsp15-transaction-relayer-api',
            to: '/standards/accounts/lsp15-transaction-relayer-api',
          },
          {
            from: '/standards/factories/lsp16-universal-factory',
            to: '/standards/factories/lsp16-universal-factory',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    image: 'img/lukso-docs-opengraph.jpg',
    announcementBar: {
      id: 'testnet_hardfork',
      content:
        ' <a target="_blank" rel="noopener noreferrer" href="https://luksovalidators.substack.com/p/lukso-dencun-hard-fork-testnet">Hard Fork on LUKSO Testnet</a>: We ask all Testnet node operators and validators to implement the Dencun hard fork on their LUKSO Testnet nodes.',
      backgroundColor: '#84A2E2',
      textColor: '#1C1E21',
      isCloseable: false,
    },
    navbar: {
      title: 'LUKSO',
      logo: {
        alt: 'LUKSO Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'learn/getting-started',
          position: 'left',
          label: 'Learn',
        },
        {
          type: 'doc',
          docId: 'tools/libraries/getting-started',
          position: 'left',
          label: 'Tools',
        },
        {
          type: 'doc',
          docId: 'standards/introduction',
          position: 'left',
          label: 'Standards',
        },
        {
          type: 'doc',
          docId: 'contracts/introduction',
          position: 'left',
          label: 'Contracts',
          collapsible: true,
        },
        {
          type: 'doc',
          docId: 'networks/mainnet/parameters',
          position: 'left',
          label: 'Networks',
        },
        {
          type: 'doc',
          docId: 'faq/lukso/general-information',
          position: 'left',
          label: 'FAQ',
        },
        {
          to: '/install-up-browser-extension',
          position: 'right',
          label: '🆙 Extension',
        },
        {
          href: 'https://support.lukso.network/contact-us',
          label: 'Contact Us',
          position: 'right',
        },
        {
          href: 'https://github.com/lukso-network/',
          className: 'header-github-link',
          position: 'right',
        },
      ],
    },
    algolia: {
      appId: '2C4F8KVKCI',
      apiKey: '27e4c8037f1e5b053cf1bf1d4d60c408',
      indexName: 'lukso_docs',
      contextualSearch: true,
      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'docs\\.lukso\\.tech',
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Developers',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/lukso-network',
            },
            {
              label: 'Playground',
              href: 'https://github.com/lukso-network/lukso-playground',
            },
            {
              label: 'StackOverflow',
              href: 'https://stackoverflow.com/questions/tagged/lukso',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/lukso',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/lukso_io',
            },
            {
              label: 'Medium',
              href: 'https://medium.com/lukso',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@LUKSOBlockchain',
            },
            {
              label: 'Common Ground',
              href: 'https://app.cg/c/LUKSO/',
            },
          ],
        },
        {
          title: 'About',
          items: [
            { label: 'LUKSO', href: 'https://lukso.network/' },
            { label: 'Team', href: 'https://lukso.network/people' },
            { label: 'Careers', href: 'https://jobs.lukso.network/jobs' },
            {
              label: 'Privacy Policy',
              href: 'https://lukso.network/privacy',
            },
            {
              label: 'LUKSO Grants Program',
              href: 'https://lukso.network/grants',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LUKSO Blockchain GmbH &mdash; hello@lukso.network`,
    },
    prism: {
      additionalLanguages: ['solidity', 'json'],
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    zoom: {
      selector: '.markdown img:not(.shield-badge)',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          showLastUpdateTime: true,
          editUrl: 'https://github.com/lukso-network/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-2XGVSVVVD4',
          anonymizeIP: true,
        },

        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
      },
    ],
  ],
};
