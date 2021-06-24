/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'LUKSO',
  tagline: 'Documentation',
  url: 'https://docs.lukso.tech/',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.png',
  organizationName: 'lukso-network', // Usually your GitHub org/user name.
  projectName: 'docs-website', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'LUKSO Documentation',
      logo: {
        alt: 'LUKSO Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
          position: 'left',
          label: 'Getting started',
        },
        {
          type: 'doc',
          docId: 'tools/getting-started',
          position: 'left',
          label: 'Tools',
        },
        {
          href: 'https://bit.ly/LUKSOWhitepaper',
          label: 'Whitepaper',
          position: 'right',
        },
        {
          href: 'https://github.com/lukso-network/',
          label: 'GitHub',
          position: 'right',
        },
      ],
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
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/E2rJPP4',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/lukso_io',
            },
            {
              label: 'Medium',
              href: 'https://medium.com/lukso',
            }
          ],
        },
      ],
      copyright: `Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: "/",
          editUrl:
            'https://github.com/lukso-network/docs-website/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
