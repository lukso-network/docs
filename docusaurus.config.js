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
  plugins: [
    'docusaurus-plugin-sass',
    'plugin-image-zoom',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/guides/network/update-the-node',
            to: '/networks/advanced-guides/update-the-node',
          },
          {
            from: '/guides/network/switch-consensus-clients',
            to: '/networks/advanced-guides/switch-consensus-clients',
          },
          // Smart Contracts new structure
          {
            from: '/standards/smart-contracts/introduction',
            to: '/contracts/introduction',
          },
          {
            from: '/standards/smart-contracts/interface-ids',
            to: '/contracts/interface-ids',
          },
          {
            from: '/standards/smart-contracts/lsp0-erc725-account',
            to: '/contracts/contracts/LSP0ERC725Account',
          },
          {
            from: '/standards/smart-contracts/lsp1-universal-receiver-delegate-up',
            to: '/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP',
          },
          {
            from: '/standards/smart-contracts/lsp1-universal-receiver-delegate-vault',
            to: '/contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateVault',
          },
          {
            from: '/standards/smart-contracts/lsp4-digital-asset-metadata',
            to: '/contracts/contracts/LSP4DigitalAssetMetadata',
          },
          {
            from: '/contracts/smart-contracts/lsp6-key-manager',
            to: '/contracts/contracts/LSP6KeyManager',
          },
          {
            from: '/standards/smart-contracts/lsp7-digital-assets',
            to: '/contracts/contracts/LSP7DigitalAsset',
          },
          {
            from: '/standards/smart-contracts/lsp8-identifiable-digital-asset',
            to: '/contracts/contracts/LSP8IdentifiableDigitalAsset',
          },
          {
            from: '/standards/smart-contracts/lsp9-vault',
            to: '/contracts/contracts/LSP9Vault',
          },
          {
            from: '/standards/smart-contracts/lsp14-ownable-2-step',
            to: '/contracts/contracts/LSP14Ownable2Step',
          },
          {
            from: '/standards/smart-contracts/lsp16-universal-factory',
            to: '/contracts/contracts/LSP16UniversalFactory',
          },
          // FAQ new Structure
          {
            from: '/faq/network/network',
            to: '/faq/network/blockchain-architecture',
          },
          {
            from: '/networks/faq/validator',
            to: '/faq/network/validators',
          },
          {
            from: '/faq/lukso',
            to: '/faq/lukso/general-information',
          },
          {
            from: '/faq/lukso-standard-proposal',
            to: '/faq/onboarding/lukso-standards',
          },
          {
            from: '/faq/universal-profile',
            to: '/faq/onboarding/universal-profiles',
          },
          {
            from: '/standards/standards-roadmap',
            to: '/standards/introduction',
          },
          {
            from: '/guides/hardhat-walkthrough/hardhat-base-setup',
            to: '/learn/smart-contract-developers/getting-started',
          },
          {
            from: '/guides/hardhat-walkthrough/create-custom-lsp7',
            to: '/learn/smart-contract-developers/getting-started',
          },
          {
            from: '/guides/hardhat-walkthrough/deploy-custom-lsp7',
            to: '/learn/smart-contract-developers/getting-started',
          },
          {
            from: '/standards/nft-2.0/LSP4-Digital-Asset-Metadata',
            to: '/standards/tokens/LSP4-Digital-Asset-Metadata',
          },
          {
            from: '/standards/nft-2.0/LSP7-Digital-Asset',
            to: '/standards/tokens/LSP7-Digital-Asset',
          },
          {
            from: '/standards/nft-2.0/LSP8-Identifiable-Digital-Asset',
            to: '/standards/tokens/LSP8-Identifiable-Digital-Asset',
          },
          {
            from: '/standards/nft-2.0/introduction',
            to: '/standards/tokens/introduction',
          },
          {
            from: '/guides/key-manager/execute-relay-transactions',
            to: '/learn/expert-guides/key-manager/execute-relay-transactions',
          },
          {
            from: '/guides/key-manager/upgrade-lsp6',
            to: '/learn/expert-guides/key-manager/upgrade-key-manager',
          },
          {
            from: '/guides/universal-receiver-delegate/create-custom-urd-1',
            to: '/learn/expert-guides/universal-receiver/create-universal-receiver',
          },
          {
            from: '/guides/universal-receiver-delegate/create-custom-urd-2',
            to: '/learn/expert-guides/universal-receiver/create-receiver-forwarder',
          },
          {
            from: '/guides/vault/create-a-vault',
            to: '/learn/expert-guides/vault/create-a-vault',
          },
          {
            from: '/guides/vault/edit-vault-data',
            to: '/learn/expert-guides/vault/edit-vault-data',
          },
          {
            from: '/guides/universal-receiver-delegate/accept-reject-assets',
            to: '/learn/expert-guides/accept-reject-assets',
          },
          {
            from: '/guides/vault/restrict-addresses-to-vaults',
            to: '/learn/expert-guides/vault/grant-vault-permissions',
          },
          {
            from: '/guides/digital-assets/mint-lsp7-digital-asset',
            to: '/learn/dapp-developer/mint-lsp7-token',
          },
          {
            from: '/guides/digital-assets/create-lsp7-digital-asset',
            to: '/learn/smart-contract-developers/create-lsp7-token',
          },
          {
            from: '/guides/key-manager/get-controllers',
            to: '/learn/expert-guides/key-manager/get-controller-permissions',
          },
          {
            from: '/guides/universal-profile/transfer-lyx',
            to: '/learn/dapp-developer/transfer-lyx',
          },
          {
            from: '/guides/key-manager/give-permissions',
            to: '/learn/expert-guides/key-manager/grant-permissions',
          },
          {
            from: '/guides/digital-assets/read-asset-data',
            to: '/learn/expert-guides/read-asset-data',
          },
          {
            from: '/guides/vault/interact-with-contracts',
            to: '/learn/expert-guides/vault/interact-with-contracts',
          },
          {
            from: '/guides/digital-assets/transfer-lsp7-digital-asset',
            to: '/learn/dapp-developer/transfer-lsp7-token',
          },
          {
            from: '/guides/universal-profile/edit-profile',
            to: '/learn/expert-guides/universal-profile/edit-profile',
          },
          {
            from: '/guides/universal-profile/check-if-address-is-universal-profile',
            to: '/learn/dapp-developer/standard-detection',
          },
          {
            from: '/contracts/getting-started',
            to: '/learn/smart-contract-developers/getting-started',
          },
          {
            from: '/guides/getting-started',
            to: '/learn/introduction',
          },
          {
            from: '/guides/universal-receiver-delegate/set-default-implementation',
            to: '/learn/expert-guides/universal-receiver/deploy-universal-receiver',
          },
          {
            from: '/guides/universal-profile/create-profile',
            to: '/learn/expert-guides/universal-profile/create-profile',
          },
          {
            from: '/guides/universal-profile/interact-with-contracts',
            to: '/learn/expert-guides/interact-with-contracts',
          },
          {
            from: '/guides/browser-extension/interact-with-dapp',
            to: '/learn/dapp-developer/connect-profile',
          },
          {
            from: '/guides/browser-extension/web3-onboard',
            to: '/learn/dapp-developer/web3-onboard',
          },
          {
            from: '/guides/browser-extension/install-browser-extension',
            to: '/install-up-browser-extension',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    image: 'img/lukso-docs-opengraph.jpg',
    navbar: {
      title: 'LUKSO',
      logo: {
        alt: 'LUKSO Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'learn/introduction',
          position: 'left',
          label: 'Learn',
        },
        {
          type: 'doc',
          docId: 'tools/getting-started',
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
          label: 'UP Browser Extension',
          position: 'right',
        },
        {
          href: 'https://github.com/lukso-network/LIPs/tree/main/LSPs',
          label: 'LSPs',
          position: 'right',
          target: '_blank',
        },
        {
          href: 'https://uploads-ssl.webflow.com/629f44560745074760731ba4/62b200bfe0af12186845519a_LUKSO_Whitepaper_V1-1.pdf',
          label: 'Whitepaper',
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
