/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es'],
  },
  title: 'LUKSO Tech Documentation',
  tagline:
    'Network, Standards, Tools and Guides for development on LUKSO and related standards.',
  url: 'https://github.com',
  baseUrl: '/lukso-es/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'locodigo', // Usually your GitHub org/user name.
  projectName: 'lukso-es', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  plugins: [
    'docusaurus-plugin-sass',
    'plugin-image-zoom',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/contracts/erc725-account',
            to: '/es/standards/smart-contracts/lsp0-erc725-account',
          },
          {
            from: '/contracts/key-manager',
            to: '/es/standards/smart-contracts/lsp6-key-manager',
          },
          {
            from: '/contracts/digital-asset',
            to: '/es/standards/smart-contracts/lsp7-digital-asset',
          },
          {
            from: '/contracts/identifiable-digital-asset',
            to: '/es/standards/smart-contracts/lsp8-identifiable-digital-asset',
          },
          {
            from: '/contracts/interface-ids',
            to: '/es/standards/smart-contracts/interface-ids',
          },
          {
            from: '/networks/l16-testnet',
            to: '/es/networks/l16-testnet/parameters',
          },
          {
            from: '/guides/universal-profile/browser-extension/install-browser-extension',
            to: '/es/guides/browser-extension/install-browser-extension',
          },
          {
            from: '/standards/universal-profile/lsp1-universal-receiver-delegate',
            to: '/es/standards/generic-standards/lsp1-universal-receiver-delegate',
          },
          {
            from: '/tools/relayer-api/execute-transaction',
            to: '/es/standards/relayer-api',
          },
          {
            from: '/guides/key-manager/execute-relay-call',
            to: '/es/guides/key-manager/execute-relay-transactions',
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
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'es/guides/getting-started',
          position: 'left',
          label: 'Guides',
        },
        {
          type: 'doc',
          docId: 'es/tools/getting-started',
          position: 'left',
          label: 'Tools',
        },
        {
          type: 'doc',
          docId: 'es/standards/introduction',
          position: 'left',
          label: 'Standards',
        },
        {
          type: 'doc',
          docId: 'es/networks/mainnet',
          position: 'left',
          label: 'Networks',
        },
        {
          type: 'doc',
          docId: 'es/faq/lukso',
          position: 'left',
          label: 'FAQ',
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
              href: 'https://www.youtube.com/channel/UCG3TAT6pSpfafGihCMUcrjA',
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
      additionalLanguages: ['solidity'],
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
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
          ignorePatterns: ['/es/networks/l16-testnet/'],
          filename: 'sitemap.xml',
        },
      },
    ],
  ],
};
