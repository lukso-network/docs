---
sidebar_label: 'UP Extension'
sidebar_position: 4
---

# Universal Profile Extension

### Why should I use Universal Profile Extension over other wallets?

The Universal Profile Extension offers several advantages over traditional wallet services like MetaMask or Rainbow. Regular wallets only manage the cryptographic key-pair, the blockchain account. The account is only secured by a static private seed phrase that can **never be changed but never exposed** to anyone else. Once the phrase is leaked or lost, all your digital assets and reputation associated with the account will be lost forever. Additionally, these regular accounts lack the functionality to attach information, react on transfers, support social recovery, or transaction relay services.

Universal Profiles help bring **more convenience** and **user-friendliness** into the blockchain space. They are robust and **flexible** smart contract-based accounts that support features like social recovery, relay transactions, rights management, upgradeable security, and attachable data right out of the box. Since they consist of programmable and modular smart contracts, they even allow upgrading accounts with enhanced functionalities.

In essence, using UniversalProfile provides a **safer environment for managing your digital assets** and offers an array of features to improve day-to-day blockchain interactions.

### Where can I download the Universal Profile Extension?

You can download the Universal Profile Extension from our [Extension Guide](https://docs.lukso.tech/guides/browser-extension/install-browser-extension) section on our technical documentation. There will be an official release within the Chrome Store and other platforms within the mainnet launch process.

### Where can I find my controller keys for the Universal Profile?

If you created a Universal Profile from the [Universal Profile Creation Tool](https://my.universalprofile.cloud/) from the Universal Profile Extension, you can back up the controller directly as a JSON file, including its private key. You can also import a Universal Profile via QR code if you want to use it on multiple devices.

If you created a Universal Profile using the [Universal Profile Explorer](https://universalprofile.cloud/) or [The Dematerialised Marketplace](https://thedematerialised.com/), a wallet is stored within your browser's local storage. You will also get a login link containing an encrypted private key emailed to you. The email backup is a temporary method to manage your keys for the L14 Testnet.

### Where can I find the assets within my Universal Profile Extension?

The Universal Profile Extension **does not directly manage token information**. Instead, it is designed to work with various decentralized applications (dApps) that can seamlessly dock onto your Universal Profile and interact with its information and controller keys. The modularity broadens the possibilities of blockchain technology and encourages external developers to **create diverse platforms** docking onto Universal Profiles.

### How to use own funds while sending transactions from the Universal Profile?

To use your funds to send transactions from your Universal Profile, you must send LYX or LYXt to the extension's controller key. Sending it to the controller will ensure the transaction's Gas costs can be funded. You can find the address of the extension's controller key within the permission section.
