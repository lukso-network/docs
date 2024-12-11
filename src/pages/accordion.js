const accordionData = [
  {
    summary: 'General',
    icon: 'material-symbols:counter-1',
    details: [
      {
        question: 'Why is there new standards on LUKSO?',
        answer:
          'LUKSO created a new set of Blockchain standard to solve the existing issues with other standards like ERCs. Such issues include security around tokens / NFTs approvals, limited metadata, lack of interoperability due to various token standards implementing different functions for notifications (or none), or the requirements for users to have to pay for gas. The LSP standards provide a better approach to these issues, such as a `universalReceiver` function (from the LSP1 Universal Receiver standard) to notify and react on these notifications, a flexible and extended metadata structure using ERC725Y, a more secure to manage permissions and approvals using the LSP6 Key Manager, and gas-less transactions to onboard users easily without requiring them to learn upfront the concept of gas and require them to acquire native tokens upfront.',
        link: '/learn/overview#why-new-standards',
        linkLabel: 'Learn more',
      },
      {
        question: 'Why is LUKSO a Layer 1 and not a Layer 2?',
        answer:
          'LUKSO was created as a Layer 1 and not a Layer 2 to start as its own ecosystem. This allows it to have its own community and set of applications from the start, compared to building new standards and applications on Ethereum where user base and different applications standards are used and congested. However, since LUKSO is an EVM-based network (the same tech stack as Ethereum), any tools and technology from Ethereum can be used to build on LUKSO as well. This allows developers to easily build with tools that they know and port their applications from Ethereum to LUKSO, and vice versa.',
        link: '/learn/overview',
        linkLabel: 'Learn more',
      },
      {
        question:
          'What are the advantages offered by the LUKSO LSP Standards compared to the ERC Standards?',
        answer:
          'The LSP standards offer various advantages for various use cases. This includes storing various form of data on Universal Profiles (e.g: user settings from a dApp, list of received assets, list of creators of a digital asset, followers, etc), sending gas-less transactions, fine-grained permissions management, in a secure way, and building applications that are more user centric and offer a better user experience in web3.',
        link: '/learn/benefits-lukso-standards',
        linkLabel: 'Learn more',
      },
      {
        question:
          'What are the key differences between the LUKSO LSP Standards and the Ethereum ERC Standards?',
        answer:
          'The main differences between the LUKSO LSP Standards and the Ethereum ERC Standards are the following: \n 1. LUKSO LSP Standards are designed to be more secure and flexible. \n 2. LUKSO LSP Standards are designed to be more interoperable. \n 3. LUKSO LSP Standards are designed to be more developer friendly. \n 4. LUKSO LSP Standards are designed to be able to build applications that are more user centric, and offer a better user experience getting started with web3.',
        link: '/learn/benefits-lukso-standards',
        linkLabel: 'Learn more',
      },
      {
        question: 'What can be built using the LUKSO Standards?',
        answer:
          'Any form of dApps and protocols can be built using the LUKSO standards! From governance and DAO toolings to Tokens and complex NFT collections as well as recovery services.',
      },
    ],
  },
  {
    summary: 'Universal Profiles',
    icon: 'material-symbols:counter-1',
    details: [
      {
        question: 'How does a profile differ from a wallet?',
        answer:
          'A Universal Profile has all the features of a traditional web3 wallet like Metamask, except that it is a smart account (powered by a smart contract). Overall, a Universal Profile (and the Universal Profile Browser Extension) is more user-friendly and more oriented for non-technical users, compared to wallet users who need to be familiar with safeguarding private keys, having to pay for gas, verifying opaque transactions in the wallet before confirming themIn addition, it offers more features than a smart account, such as fine-grained permissioning to allow you to control your profile from multiple devices',
        link: '/learn/benefits-lukso-standards#universal-profiles-vs-smart-wallets',
        linkLabel: 'Learn more',
      },
      {
        question: 'How do I connect my dApp to a profile?',
        answer:
          'The same way as you connect any wallet to a dApp. There is no difference. You can use any of the methods that you would use with other wallets (EIP-6963 Injected Provider Discovery, injected provider or Multi provider). See our dedicated page for a tutorial on how to connect your UP to your dApp and use Sign-in with Ethereum.',
        link: '/learn/universal-profile/connect-profile/connect-up',
        linkLabel: 'see Tutorial',
      },
      {
        question: 'What kind of data can be stored on my profile?',
        answer:
          "A Universal Profile can store (virtually) an unlimited amount of data. The data can be anything of any type. Examples of data that can be stored in a UP includes: list of issued and received assets, profile details (biography, profile and cover picture, website and social links), followers, permissions and dApps settings, your favourite musics, the list of community you are engaging with, etc... It's up to your imagination to invent what you want to store and fetch from your Universal Profile.",
      },
      {
        question: 'How do I read the data from a profile?',
        answer:
          'There are various ways to read and fetch data from a Universal Profile. At the core level, it is done by calling the `getData` function on the Universal Profile smart contract with any web3 library, passing the data key you want to read information from. However, this is a very low-level and technical way to do so, and we provide various Javascript library such as _erc725.js_ or _lsp-utils.js_ which make it easier for you to fetch any data from a Universal Profile.',
        link: '/learn/universal-profile/metadata/read-profile-data',
        linkLabel: 'Learn more',
      },
      {
        question: 'How do I change permissions on the Universal Profile?',
        answer:
          'You can change permissions from a Universal Profile either from the UP Browser extension, or from a dApp. See our following guide to learn how to set permissions for any address.',
        link: '/learn/universal-profile/key-manager/grant-permissions',
        linkLabel: 'Learn more',
      },
      {
        question: 'How do I send a gasless transaction?',
        answer:
          "The Universal Profile browser extension automatically uses the relayer when a transaction screen appears. Alternatively, you can use our relayer API. See our documentation for more infos and guides. Otherwise, if you want an address to submit a transaction on behalf of another address and pay for the gas, you can follow our guide 'How to send relay transactions' to prepare the transaction data, sign it and dispatch it using any private key that holds funds to pay for the gas.",
        link: '/learn/universal-profile/key-manager/execute-relay-transactions',
        linkLabel: 'Learn more',
      },
      {
        question: 'How can I deploy a Universal Profile?',
        answer:
          'There are 3 ways to deploy a Universal Profile (from the easiest to the hardest way): \n 1. create a Universal Profile using the UP Browser Extension \n 2. Use our relayer API to deploy a Universal Profile for your users and get them to benefit from gas-less transactions (up to a certain monthly quota) . \n 3. Using the LSP23 Universal Factory by interacting with the smart contract.',
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
        question: 'How do I transfer a token or NFT',
        answer:
          'Depending if you are a user or developer, you can transfer a token or NFT by: \n - For users: using any dApp that allow this functionality (such as universaleverything.io). \n 2. For developers: by creating a script in your dApp that calls the `transfer(...)` function on the Token or NFT contract. \n Note that transferring a token or NFT does not necessarily need to be done by a Universal Profile. Since LUKSO is fully EVM-compatible, any wallet connected to the LUKSO network can trigger a transaction.',
      },
      {
        question: 'How do I read metadata from a Token or NFT',
        answer:
          'You can read the metadata of the Token or NFT collection by calling the `getData(bytes32)` function with the parameter `LSP4Metadata` data key. We recommend using erc725.js to do this easily.',
        link: '/learn/digital-assets/metadata-management/read-asset-data',
        linkLabel: 'Learn more',
      },
      {
        question: 'How can I edit the metadata of my token, after deployment?',
        answer:
          'You can edit the metadata of your token by calling the `setData(bytes32,bytes)` function with the parameters `LSP4Metadata` for the data key and the second parameter data value as the hex encoded `VerifiableURI` of the JSON metadata. Use our guide to learn how to edit the token metadata.',
        link: '/learn/digital-assets/metadata-management/edit-token-metadata',
        linkLabel: 'Learn more',
      },
      {
        question: 'How does LSP7 token standard differ from ERC20',
        answer:
          'LSP7 differ from ERC20 in multiple ways. First the token contract can hold any metadata thanks to its ERC725Y storage. Second, the token contract notifies the sender and recipient on transfer, mint and burn via the `universalReceiver(...)` callback function. Third, the function `transfer` function of LSP7 includes a boolean `force` parameter that only allow to transfer tokens to contracts that implement a `universalReceiver(...)` function, so to ensure that can handle receiving the token and therefore hold it and re-transfer it. Finally the transfer function signature of LSP7 is similar to LSP8, which makes it easier for developer to reason about when building applications that deal with tokens and NFTs (compared to ERC20 and ERC721 which have two different functions `transfer(...)` and `safeTransferFrom(...)`.',
        link: '/learn/benefits-lukso-standards#lsp78-token-standards-vs-erc20721',
        linkLabel: 'Learn more',
      },
      {
        question: 'How does LSP8 token standard differ from ERC721',
        answer:
          'LSP8 differ from ERC721 in multiple ways. First the NFT collection contract can hold any metadata thanks to its ERC725Y storage. Second, the NFT contract notifies the sender and recipient on transfer, mint and burn via the `universalReceiver(...)` callback function. Third, the function `transfer` function of LSP8 includes a boolean `force` parameter that only allow to transfer tokens to contracts that implement a `universalReceiver(...)` function, so to ensure that can handle receiving the token and therefore hold it and re-transfer it. Finally the transfer function signature of LSP8 is similar to LSP7, which makes it easier for developer to reason about when building applications that deal with tokens and NFTs (compared to ERC721 and ERC20 which have two different functions `safeTransferFrom(...)` and `transfer(...)`.',
        link: '/learn/benefits-lukso-standards#lsp78-token-standards-vs-erc20721',
        linkLabel: 'Learn more',
      },
      {
        question:
          'What are the benefits of the LSP7 and LSP8 token standards over the ERC20 / ERC721 standards?',
        answer:
          "There are many that the LSP7 and LSP8 standards offer compared to ERC20 and ERC721. This include the ability for the token contract to contain as many customizable information as wanted (called 'metadata'), notifying the sender and recipient on token transfer (via callback hook functions) as well as easier to reason interface and set of functions for developers.",
        link: '/learn/benefits-lukso-standards#lsp78-token-standards-vs-erc20721',
        linkLabel: 'Learn more',
      },
    ],
  },
  {
    summary: 'Network & Validators',
    icon: 'material-symbols:counter-1',
    details: [
      {
        question: 'What is the RPC endpoint for LUKSO',
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
        question: 'How do I add LUKSO to my wallet like MetaMask',
        answer:
          'Visit our Networks page and add one of the available LUKSO RPC endpoint, chain ID (42 for Mainnet, 4201 for Testnet) and the Blockscout explorer in your wallet. We also have a one click button to add the network to your wallet.',
        link: '/networks/mainnet/parameters#add-lukso-to-wallets',
        linkLabel: 'Learn more',
      },
      {
        question: 'How do I install the Universal Profile Browser Extension',
        answer: 'Visit our page in the docs to download the 🆙 Browser.',
        link: '/install-up-browser-extension',
        linkLabel: 'Learn more',
      },
      {
        question: 'How do I install the Universal Profile Mobile App',
        answer:
          'The UP Mobile app is currently in beta and under testing by our beta testers. It will soon be available on the App Store and Google Play Store for the public and will be available for the public to download.',
      },
    ],
  },
];

export default accordionData;
