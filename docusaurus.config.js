import { themes as prismThemes } from 'prism-react-renderer';
import path from 'path';
import fs from 'fs';

export default {
  title: 'LUKSO Tech Documentation',
  tagline:
    'Network, Standards, Tools and Guides for development on LUKSO and related standards.',
  url: 'https://docs.lukso.tech',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: true,
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
            from: '/learn/introduction',
            to: '/learn/overview',
          },
          {
            from: '/learn/universal-profile/getting-started',
            to: '/learn/getting-started',
          },
          // Learn/Universal Profile
          {
            from: '/learn/universal-profile/interactions/transfer-lsp7-token',
            to: '/learn/universal-profile/interactions/transfer-tokens-and-nfts',
          },
          // Tools
          {
            from: '/tools/getting-started',
            to: '/tools',
          },
          {
            from: '/tools/eip191-signerjs/getting-started',
            to: '/tools/dapps/eip191-signerjs/getting-started',
          },
          {
            from: '/tools/erc725js/getting-started',
            to: '/tools/dapps/erc725js/getting-started',
          },
          {
            from: '/tools/erc725js/methods',
            to: '/tools/dapps/erc725js/methods',
          },
          {
            from: '/tools/erc725js/providers',
            to: '/tools/dapps/erc725js/providers',
          },
          {
            from: '/tools/erc725js/schemas',
            to: '/tools/dapps/erc725js/schemas',
          },
          {
            from: '/tools/lsp-utils/getting-started',
            to: '/tools/dapps/lsp-utils/getting-started',
          },
          {
            from: '/tools/lsp-utils/IPFS',
            to: '/tools/dapps/lsp-utils/IPFS',
          },
          {
            from: '/tools/lsp-utils/LSP3ProfileMetadata',
            to: '/tools/dapps/lsp-utils/LSP3ProfileMetadata',
          },
          {
            from: '/tools/lsp-utils/LSP4DigitalAssetMetadata',
            to: '/tools/dapps/lsp-utils/LSP4DigitalAssetMetadata',
          },
          {
            from: '/tools/lsp-utils/LSP5ReceivedAssets',
            to: '/tools/dapps/lsp-utils/LSP5ReceivedAssets',
          },
          {
            from: '/tools/lsp-utils/LSP6KeyManager',
            to: '/tools/dapps/lsp-utils/LSP6KeyManager',
          },
          {
            from: '/tools/lsp-utils/LSP12IssuedAssets',
            to: '/tools/dapps/lsp-utils/LSP12IssuedAssets',
          },
          {
            from: '/tools/lsp-utils/LSP23LinkedContractsFactory',
            to: '/tools/dapps/lsp-utils/LSP23LinkedContractsFactory',
          },
          {
            from: '/tools/rpc-api',
            to: '/tools/apis/up-rpc-api',
          },
          {
            from: '/tools/libraries/getting-started', // tools path before re-branding
            to: '/tools',
          },
          {
            from: '/tools/indexer',
            to: '/tools/apis/indexer-api',
          },
          {
            from: '/tools/relayer-developer',
            to: '/tools/apis/relayer-api',
          },

          // Standards
          {
            from: '/standards/universal-profile/lsp0-erc725account',
            to: '/standards/accounts/lsp0-erc725account',
          },
          {
            from: '/standards/generic-standards/lsp2-json-schema',
            to: '/standards/metadata/lsp2-json-schema',
          },
          {
            from: '/standards/universal-profile/lsp9-vault',
            to: '/standards/accounts/lsp9-vault',
          },
          {
            from: '/standards/universal-profile/lsp1-universal-receiver-delegate',
            to: '/standards/accounts/lsp1-universal-receiver-delegate',
          },
          {
            from: '/standards/generic-standards/lsp1-universal-receiver',
            to: '/standards/accounts/lsp1-universal-receiver',
          },
          {
            from: '/standards/universal-profile/lsp6-key-manager',
            to: '/standards/access-control/lsp6-key-manager',
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
          {
            from: '/standards/standard-detection',
            to: '/standards/standard-types',
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
            from: '/standards/faq/channel-nonce',
            to: '/standards/accounts/lsp25-execute-relay-call',
          },
          {
            from: '/standards/generic-standards/lsp26-follower-system',
            to: '/standards/accounts/lsp26-follower-system',
          },
          // Add redirect for moved benefits-lukso-standards page
          {
            from: '/learn/overview/benefits-lukso-standards/',
            to: '/learn/benefits-lukso-standards',
          },
        ],
      },
    ],
    pluginLlmsTxt,
  ],
  themeConfig: {
    image: 'img/lukso-docs-og.png',

    metadata: [
      {
        name: 'google-site-verification',
        content: 'eTTwR-Xukq1jGJm8UhSlRW0cl-WqbAH8Mp47v6fEb7Q',
      },
      {
        name: 'title',
        content: 'LUKSO Developer Documentation',
      },
      {
        name: 'description',
        content:
          'Network, Standards, Tools and Guides for development on LUKSO and LSP smart contracts.',
      },
    ],
    // announcementBar: {
    //   id: 'mainnet_hardfork',
    //   content:
    //     '🔊 <a target="_blank" rel="noopener noreferrer" href="https://luksovalidators.substack.com/p/lukso-dencun-hard-fork-mainnet"> Hard Fork on LUKSO Mainnet</a>: We ask all Mainnet node operators and validators to implement the Dencun hard fork on their LUKSO Mainnet nodes.',
    //   backgroundColor: '#84A2E2',
    //   textColor: '#1C1E21',
    //   isCloseable: false,
    // },
    navbar: {
      title: 'LUKSO',
      logo: {
        alt: 'LUKSO Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'learn/overview',
          position: 'left',
          label: 'Learn',
        },
        {
          type: 'doc',
          docId: 'tools/tools',
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
          label: '🆙 Browser Extension',
        },
        {
          href: 'https://support.lukso.network/contact-us',
          label: 'Help Center',
          position: 'right',
        },
        {
          href: 'https://github.com/lukso-network/',
          className: 'header-github-link',
          position: 'right',
        },
        {
          href: 'https://discord.com/invite/lukso',
          className: 'header-discord-link',
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
              href: 'https://lukso.network/legal/privacy-policy',
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

//Custom plugin for llms.txt file from the Prisma documentation
//Check later if there's an official Docusaurus plugin for this
async function pluginLlmsTxt(context) {
  return {
    name: 'llms-txt-plugin',
    loadContent: async () => {
      const { siteDir } = context;
      const contentDir = path.join(siteDir, 'docs');
      const allMdx = [];
      const excludedDirs = ['faq', 'networks']; // Directories to exclude

      const getMdxFiles = async (dir) => {
        const entries = await fs.promises.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            const relativePath = path.relative(contentDir, fullPath);
            if (excludedDirs.some((exDir) => relativePath.startsWith(exDir))) {
              continue;
            }
            await getMdxFiles(fullPath);
          } else if (
            entry.isFile() &&
            (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))
          ) {
            let content = await fs.promises.readFile(fullPath, 'utf8');

            // --- Content Cleaning Start ---

            // Remove Markdown image links: ![alt text](path/to/image.png)
            content = content.replace(/!\[.*?\]\(.*?\)/g, '');

            // Remove HTML img tags: <img src="..." alt="...">
            content = content.replace(/<img[^>]*>/g, '');

            // Remove HTML comments: <!-- ... -->
            content = content.replace(/<!--[\s\S]*?-->/g, '');

            // Attempt to remove potential JSX Component tags (opening/self-closing and closing)
            // Targets tags starting with an uppercase letter. May need refinement.
            content = content.replace(/<\/?([A-Z][^>\s]*)[^>]*>/g, '');

            // --- Content Cleaning End ---

            allMdx.push(content);
          }
        }
      };

      await getMdxFiles(contentDir);
      return { allMdx };
    },
    postBuild: async ({ content, routes, outDir }) => {
      // Access allMdx without type assertion
      const { allMdx } = content;

      // Write concatenated MDX content
      const concatenatedPath = path.join(outDir, 'llms-full.txt');
      await fs.promises.writeFile(concatenatedPath, allMdx.join('\n\n---\n\n'));

      // we need to dig down several layers:
      // find PluginRouteConfig marked by plugin.name === "docusaurus-plugin-content-docs"
      const docsPluginRouteConfig = routes.filter(
        (route) => route.plugin.name === 'docusaurus-plugin-content-docs',
      )[0];

      // docsPluginRouteConfig has a routes property has a record with the path "/" that contains all docs routes.
      const allDocsRouteConfig = docsPluginRouteConfig.routes?.filter(
        (route) => route.path === '/',
      )[0];

      // A little type checking first
      if (!allDocsRouteConfig?.props?.version) {
        return;
      }

      // this route config has a `props` property that contains the current documentation.
      const currentVersionDocsRoutes = allDocsRouteConfig.props.version.docs;

      // for every single docs route we now parse a path (which is the key) and a title
      const docsRecords = Object.entries(currentVersionDocsRoutes).map(
        ([path, record]) => {
          return `- [${record.title}](${path}): ${record.description}`;
        },
      );

      // Build up llms.txt file
      const llmsTxt = `# ${context.siteConfig.title}\n\n## Docs\n\n${docsRecords.join('\n')}`;

      // Write llms.txt file
      const llmsTxtPath = path.join(outDir, 'llms.txt');
      try {
        fs.writeFileSync(llmsTxtPath, llmsTxt);
      } catch (err) {
        throw err;
      }
    },
  };
}
