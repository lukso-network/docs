---
sidebar_label: 'UP Extension'
sidebar_position: 4
---

# Universal Profile Extension

### Why should I use Universal Profile Extension over other wallets?

The Universal Profile Extension offers several advantages over traditional wallet services like MetaMask or Rainbow. Regular wallets only manage the cryptographic key-pair, the blockchain account. The account is only secured by a static private seed phrase that can't **be changed or exposed**. If the phrase is leaked or lost, all your digital assets and reputation associated with the account **would be lost with it**. 

In addition, regular accounts lack some of the the functionality of UPs such as the ability to attach additional information to your profile, react on transfers, social recovery and transaction relay services.

Universal Profiles help bring **convenience** and **user-friendliness** into the blockchain space. They are **robust and flexible** smart contract-based accounts that support features like social recovery, relay transactions, rights management, upgradeable security, and attachable data right out of the box. Since they consist of programmable and modular smart contracts, they even allow upgrading these accounts with enhanced functionalities.

In essence, using UniversalProfile provides a **safer environment for managing your digital assets** and offers an array of features that make your day-to-day interactions with blockchains easier.

### Where can I download the Universal Profile Extension?

You can download the Universal Profile Extension from the [Extension Guide](../../guides/browser-extension/install-browser-extension) section of our technical documentation. There is an official release in the Chrome Store and other platforms coming during the mainnet launch process.

### Where can I find my controller keys for the Universal Profile?

If you created a Universal Profile from the [Universal Profile Creation Tool](https://my.universalprofile.cloud/) with the Universal Profile Extension, you can back up the controller directly as a JSON file, including its private key. You can also import a Universal Profile via QR code if you wish to use it across multiple devices.

If you created a Universal Profile using the [Universal Profile Explorer](https://universalprofile.cloud/) or [The Dematerialised Marketplace](https://thedematerialised.com/), a wallet is stored within your browser's local storage. You will also get a login link containing an encrypted private key emailed to you. The email backup is a temporary method to manage your keys for the L14 Testnet.

### Where can I find the assets within my Universal Profile Extension?

The Universal Profile Extension **does not directly manage token information**. Instead, it is designed to work with various decentralized applications (dApps) that can seamlessly integrate with your Universal Profile and interact with its information and controller keys. The modularity broadens the possibilities of blockchain technology and encourages external developers to **create diverse applications** on top of Universal Profiles.

### How to use your own funds while sending transactions from the Universal Profile?

To use your funds to send transactions from your Universal Profile, you must send LYX or LYXt to the extension's controller key. Sending it to the controller will ensure the transaction's Gas costs are funded. You can find the address of the extension's controller key within the permission section.
