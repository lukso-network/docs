import TermTooltip from './components/TermTooltip';

const accordionData = [
  {
    summary: 'General',
    icon: 'material-symbols:counter-1',
    details: [
      {
        question: 'Why are there new standards on LUKSO?',
        answer: (
          <>
            LUKSO introduced new blockchain standards to address issues with
            existing <TermTooltip category="blockchain" term="ERC" />
            , such as token/NFT approval security, limited metadata, lack of
            interoperability (ERC677, ERC777 and ERC1155 use each different
            callback hook functions to notify on token transfer), and requiring
            users to acquire native token upfront to pay for transaction fees (
            <TermTooltip category="blockchain" term="gas" />
            ). LSP standards include features like{' '}
            <TermTooltip category="blockchain" term="universalReceiver" /> for
            notifications, flexible metadata, secure permissions management, and
            gasless transactions for easier user onboarding.
          </>
        ),
        link: '/learn/overview#why-new-standards',
        linkLabel: 'Learn more',
      },
      {
        question: 'Why is LUKSO a Layer 1 and not a Layer 2 network?',
        answer:
          "LUKSO was created as a Layer 1 network to establish its own ecosystem, communities, and applications, rather than building on Ethereum's congested standards. Being an EVM-based blockchain (same technology as Ethereum, unmodified), LUKSO supports any Ethereum tools, enabling developers to easily build and port applications between the two networks.",
        link: '/learn/overview',
        linkLabel: 'Learn more',
      },
      {
        question:
          'What are the advantages of the LUKSO Standard Proposals (LSP) compared to the Ethereum Request for Comments (ERC) Standards?',
        answer:
          'The LSP standards offer various advantages for various use cases. This includes storing various form of data on Universal Profiles (e.g: user settings from a dApp, list of received assets, list of creators of a digital asset, followers, etc), sending gas-less transactions, fine-grained permissions management. These allow to build user-centric web3 applications that offer a better experience to users.',
        link: '/learn/benefits-lukso-standards',
        linkLabel: 'Learn more',
      },
      {
        question: 'How do LUKSO LSP and Ethereum ERC Standards differ?',
        answer:
          'Compared to the Ethereum ERC Standards, the LUKSO LSP Standards are (1) more secure, (2) more flexible and interoperable, (3) more developer friendly, (4) focused on creating user-centric applications with an improved user experience for getting started interacting with web3.',
        link: '/learn/benefits-lukso-standards',
        linkLabel: 'Learn more',
      },
      {
        question: 'What can be built using the LUKSO LSP Standards?',
        answer:
          'Any form of dApps and protocols can be built using the LUKSO standards. From governance and DAO toolings to Tokens, Tickets, Real-World-Assets and complex evolving NFT collections as well as recovery services and multi-factor authorizations through detailed permissions.',
      },
    ],
  },
  {
    summary: 'Universal Profiles (UP)',
    icon: 'material-symbols:counter-1',
    details: [
      {
        question: 'How does a profile differ from a wallet?',
        answer: (
          <>
            A <TermTooltip category="profiles" term="universalProfile" /> is a
            smart account with all the features of a traditional wallet like
            MetaMask, but more user-friendly and designed for non-technical
            users. It eliminates the need for managing private keys, paying gas,
            or verifying opaque transactions before confirming them. It also
            offers advanced features like{' '}
            <TermTooltip category="profiles" term="permissions" /> for
            multi-device control.
          </>
        ),
        link: '/learn/benefits-lukso-standards#universal-profiles-vs-smart-wallets',
        linkLabel: 'Learn more',
      },
      {
        question: 'How do I connect my dApp to a profile?',
        answer:
          'Like any other web3 wallet using methods like EIP-6963, injected provider or multi-providers). Check our tutorial for details on how to connect a UP to a dApp or using Sign-in with Ethereum.',
        link: '/learn/universal-profile/connect-profile/connect-up',
        linkLabel: 'See tutorial',
      },
      {
        question: 'What kind of data can be stored on my profile?',
        answer:
          'A Universal Profile can store unlimited data of any type, such as assets, profile details (biography, profile and cover picture, website and social links), followers, permissions, dApp settings, favorite music, communities and more. You can customize it to store and retrieve anything you could potentially imagine.',
      },
      {
        question: 'How do I read the data from a profile?',
        answer:
          'You can fetch data from a Universal Profile using (a) the getData function on the Universal Profile smart contract and decode the value, or (b) the easier-to-use libraries like erc725.js or lsp-utils.js which will do all the decoding for you.',
        link: '/learn/universal-profile/metadata/read-profile-data',
        linkLabel: 'View guide',
      },
      {
        question: 'How do I change permissions on the Universal Profile?',
        answer:
          'Either via (a) the UP Browser extension, (b) a dApp with this functionality, or (c) programmatically via a script (see our guide below).',
        link: '/learn/universal-profile/key-manager/grant-permissions',
        linkLabel: 'View guide',
      },
      {
        question: 'How do I send a gasless transaction?',
        answer:
          'If you created your UP via universaleverything.io, the UP in your browser extension automatically allows you to send gas-free transactions. Otherwise, see our relayer API documentation to learn how to send transactions to our relayer who will dispatch the transaction and pay for the gas.',
        link: '/learn/universal-profile/key-manager/execute-relay-transactions',
        linkLabel: 'View guide',
      },
      {
        question: 'How can I deploy a Universal Profile?',
        answer:
          '3 ways: (1) via the UP Browser Extension (easy 🌶️), (2) via the relayer API (intermediate 🌶️🌶️), (3) or via the LSP23 Universal Factory (advanced 🌶️🌶️🌶️).',
        link: '/learn/getting-started#building-dapps-for-universal-profiles',
        linkLabel: 'Learn more',
      },
    ],
  },
  {
    summary: 'Tokens & NFTs',
    icon: 'material-symbols:counter-1',
    details: [
      {
        question: 'How do I transfer a token or NFT?',
        answer:
          'Users can transfer tokens or NFTs using a dApp like universaleverything.io. For developers, call the `transfer` function on the token or  NFT contract. Note that since LUKSO is fully EVM-compatible, transferring tokens / NFTs can be done by any wallet connected to the LUKSO network, by interacting with the token contract. It does not necessarily need to be done by a Universal Profile.',
        link: null,
      },
      {
        question: 'How do I read metadata from a Token or NFT?',
        answer:
          'Either by (1) using the `getData(bytes32)` function with the `LSP4Metadata` data key and decode the result, or (2) use the erc725.js for convenience (will do the decoding for you).',
        link: '/learn/digital-assets/metadata-management/read-asset-data',
        linkLabel: 'View guide',
      },
      {
        question: 'How can I edit the metadata of my token after deployment?',
        answer:
          'By calling the `setData(bytes32,bytes)` with `LSP4Metadata` as the data key and the JSON metadata as the hex-encoded value.',
        link: '/learn/digital-assets/metadata-management/edit-token-metadata',
        linkLabel: 'View guide',
      },
      {
        question: 'How does LSP7 token standard differ from ERC20?',
        answer:
          'LSP7 (1) supports ERC725Y storage for unlimited metadata, (2) notifies sender and recipient on token transfers, (3) uses a `force` parameter for more secure transfers, and (4) has a `transfer(...)` function signature similar to LSP8 which makes it easier for developer to reason (instead of learning multiple transfer function based on different standards, like ERC20, 721, 1155, etc...).',
        link: '/learn/benefits-lukso-standards#lsp78-token-standards-vs-erc20721',
        linkLabel: 'Learn more',
      },
      {
        question: 'How does LSP8 token standard differ from ERC721?',
        answer:
          'LSP8 (1) supports ERC725Y storage for unlimited metadata, (2) notifies sender and recipient on NFT transfers, (3) uses a `force` parameter for more secure transfers, and (4) has a `transfer(...)` function signature similar to LSP7 which makes it easier for developer to reason (instead of learning multiple transfer function based on different standards, like ERC20, 721, 1155, etc...)',
        link: '/learn/benefits-lukso-standards#lsp78-token-standards-vs-erc20721',
        linkLabel: 'Learn more',
      },
      {
        question:
          'What are the benefits of the LSP7 and LSP8 token standards over the ERC20 / ERC721 standards?',
        answer:
          'LSP7 and LSP8 offer improved features such as (1) unlimited metadata to store any type of information in the token contract, (2) transfer notifications via callback hooks, and (3) a simpler interface for developers. It also includes additional benefits over ERC20/721. See our dedicated page.',
        link: '/learn/benefits-lukso-standards#lsp78-token-standards-vs-erc20721',
        linkLabel: 'Learn more',
      },
    ],
  },
  {
    summary: 'Mini-Apps',
    icon: 'material-symbols:counter-1',
    details: [
      {
        question: 'What is a Mini-App?',
        answer:
          'Mini-App is a dApp that run in an iframe of a parent page that hosts them. You can then add them to your Grid on Universal Everything.',
        link: '/learn/mini-apps/connect-upprovider',
        linkLabel: 'Learn more',
      },
      {
        question: 'How does a Mini-App connect to a user?',
        answer:
          'The UP Provider empowers the Mini-Apps to connect to the user visiting the parent page with one-click.',
        link: '/learn/mini-apps/connect-upprovider#introducing-the-up-provider',
        linkLabel: 'Learn more about UP Provider',
      },
      {
        question: 'How do I test Mini-Apps locally?',
        answer:
          'To test Mini-Apps locally on Universal Everything, you need to expose your Mini-App to an URL. Check out our guide to learn how to do this with localtunnel.',
        link: '/learn/mini-apps/testing-miniapps',
        linkLabel: 'See guide',
      },
    ],
  },
  {
    summary: 'Network & Validators',
    icon: 'material-symbols:counter-1',
    details: [
      {
        question: 'What is the Remote Procedure Call (RPC) endpoint for LUKSO?',
        answer:
          'There are multiple RPC endpoints available to connect to the LUKSO network. See our dedicated page for more infos.',
        link: '/networks/mainnet/parameters',
        linkLabel: 'Learn more',
      },
      {
        question: 'How to run a LUKSO node?',
        answer: 'Visit our dedicated page to learn how to run your own node.',
        link: '/networks/mainnet/running-a-node',
        linkLabel: 'Learn more',
      },
      {
        question: 'How to run a validator on LUKSO?',
        answer:
          'Visit our dedicated page to learn how to become a validator on LUKSO and start earning staking rewards.',
        link: '/networks/mainnet/become-a-validator',
        linkLabel: 'Learn more',
      },
      {
        question: 'How to update your node for the Dencun hardfork?',
        answer:
          'Visit our dedicated page in the docs to learn how to update your node for the Dencun hardfork.',
        link: '/networks/advanced-guides/update-the-node',
        linkLabel: 'Learn more',
      },
    ],
  },
  {
    summary: 'Wallets & Controller dApps',
    icon: 'material-symbols:counter-1',
    details: [
      {
        question: 'How do I add LUKSO to my wallet like MetaMask?',
        answer:
          'Visit our Networks page and add one of the available LUKSO RPC endpoint, chain ID (42 for Mainnet, 4201 for Testnet) and the Blockscout explorer in your wallet. We also have a one click button to add the network to your wallet.',
        link: '/networks/mainnet/parameters#add-lukso-to-wallets',
        linkLabel: 'Learn more',
      },
      {
        question: 'How do I install the Universal Profile Browser Extension?',
        answer: 'Visit our page in the docs to download the 🆙 Browser.',
        link: '/install-up-browser-extension',
        linkLabel: 'Learn more',
      },
      {
        question: 'How do I install the Universal Profile Mobile App?',
        answer:
          'The UP Mobile app is currently in beta and under testing by our beta testers. It will soon be available on the App Store and Google Play Store for the public and will be available for the public to download.',
      },
    ],
  },
];

export default accordionData;
