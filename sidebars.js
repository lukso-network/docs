/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  networksSidebar: [{ type: 'autogenerated', dirName: 'networks' }],
  standardsSidebar: [{ type: 'autogenerated', dirName: 'standards' }],
  guidesSidebar: [{ type: 'autogenerated', dirName: 'guides' }],
  toolsSidebar: [
    'tools/getting-started',
    {
      type: 'category',
      label: '📜 erc725.js',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/erc725js',
        },
      ],
    },
    {
      type: 'category',
      label: '🏭 lsp-factory.js',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/lsp-factoryjs',
        },
      ],
    },
    {
      type: 'category',
      label: '🖋️ eip191-signer.js',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/eip191-signerjs',
        },
      ],
    },
    {
      type: 'category',
      label: '📬 Relayer API',
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/relayer-api',
        },
      ],
    },
    'tools/erc725-tools',
  ],
  faqSidebar: [{ type: 'autogenerated', dirName: 'faq' }],
};
