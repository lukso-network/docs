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
            from: '/learn/smart-contract-developers/getting-started',
            to: '/learn/digital-assets/smart-contract-developers/getting-started',
          },
          {
            from: '/learn/smart-contract-developers/getting-started',
            to: '/learn/digital-assets/smart-contract-developers/getting-started',
          },
          {
            from: '/learn/smart-contract-developers/getting-started',
            to: '/learn/digital-assets/smart-contract-developers/getting-started',
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
            from: '/learn/expert-guides/key-manager/execute-relay-transactions',
            to: '/learn/key-manager/execute-relay-transactions',
          },
          {
            from: '/learn/expert-guides/key-manager/upgrade-key-manager',
            to: '/learn/key-manager/upgrade-key-manager',
          },
          {
            from: '/learn/expert-guides/universal-receiver/deploy-universal-receiver',
            to: '/learn/universal-receiver/deploy-universal-receiver',
          },
          {
            from: '/learn/expert-guides/universal-receiver/create-receiver-forwarder',
            to: '/learn/universal-receiver/create-receiver-forwarder',
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
            to: '/learn/universal-receiver/accept-reject-assets',
          },
          {
            from: '/learn/expert-guides/vault/grant-vault-permissions',
            to: '/learn/vault/grant-vault-permissions',
          },
          {
            from: '/learn/digital-assets/mint-lsp7-token',
            to: '/learn/universal-profile/interactions/interact-with-contracts',
          },
          {
            from: '/learn/smart-contract-developerss/create-lsp7-token',
            to: '/learn/digital-assets/smart-contract-developers/create-lsp7-token',
          },
          {
            from: '/learn/expert-guides/key-manager/get-controller-permissions',
            to: '/learn/key-manager/get-controller-permissions',
          },
          {
            from: '/learn/universal-profile/transfer-lyx',
            to: '/learn/universal-profile/interactions/transfer-lyx',
          },
          {
            from: '/learn/expert-guides/key-manager/grant-permissions',
            to: '/learn/key-manager/grant-permissions',
          },
          {
            from: '/learn/dapp-developer/read-asset-data',
            to: '/learn/digital-assets/read-asset-data',
          },
          {
            from: '/learn/expert-guides/vault/interact-with-contracts',
            to: '/learn/vault/interact-with-contracts',
          },
          {
            from: '/learn/universal-profile/transfer-lsp7-token',
            to: '/learn/universal-profile/interactions/transfer-lsp7-token',
          },
          {
            from: '/guides/universal-profile/edit-profile',
            to: '/learn/expert-guides/universal-profile/edit-profile',
          },
          {
            from: '/learn/dapp-developer/standard-detection',
            to: '/learn/standard-detection',
          },
          {
            from: '/contracts/getting-started',
            to: '/learn/digital-assets/smart-contract-developers/getting-started',
          },
          {
            from: '/guides/getting-started',
            to: '/learn/introduction',
          },
          {
            from: '/learn/expert-guides/universal-receiver/deploy-universal-receiver',
            to: '/learn/universal-receiver/deploy-universal-receiver',
          },
          {
            from: '/guides/universal-profile/create-profile',
            to: '/learn/expert-guides/universal-profile/create-profile',
          },
          {
            from: '/learn/universal-profile/interact-with-contracts',
            to: '/learn/universal-profile/interactions/interact-with-contracts',
          },
          {
            from: '/learn/dapp-developer/connect-profile',
            to: '/learn/universal-profile/connect-profile',
          },
          {
            from: '/learn/universal-profile/multi-provider',
            to: '/learn/universal-profile/connect-profile/multi-provider',
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
          // Learn: Working with Assets Section
          {
            from: '/learn/smart-contract-developerss/retrieve-token-type',
            to: '/learn/assets/retrieve-token-type',
          },
          {
            from: '/learn/assets',
            to: '/learn/assets/metadata-preparation',
          },
          {
            from: '/learn/expert-guides/deploy-token-with-metadata',
            to: '/learn/assets/deploy-token-with-metadata',
          },
          // Tools
          {
            from: '/tools/partners',
            to: '/tools/integrations',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    image: 'img/lukso-docs-opengraph.jpg',
    announcementBar: {
      id: 'hackathon',
      content:
        ' <a target="_blank" rel="noopener noreferrer" href="https://lukso.network/grants">LUKSO Grants Program</a>: Empowering the next wave of Web3 innovators. Applications now open!',
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
          href: '/install-up-browser-extension',
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
