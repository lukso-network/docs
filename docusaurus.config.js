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
          // FAQ new Structure
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
            to: '/learn/dapp-developer/read-asset-data',
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
            from: '/learn/dapp-developer/web3-onboard',
            to: '/learn/dapp-developer/multi-provider',
          },
          {
            from: '/guides/browser-extension/install-browser-extension',
            to: '/install-up-browser-extension',
          },
          // Support section
          {
            from: '/faq/lukso/wallet-support',
            to: 'https://support.lukso.network/general/wallet-support',
          },
          {
            from: '/faq/onboarding/extension',
            to: 'https://support.lukso.network/extension/introduction',
          },
          {
            from: '/faq/help',
            to: 'https://support.lukso.network',
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
          href: 'https://support.lukso.network',
          label: 'Support',
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
