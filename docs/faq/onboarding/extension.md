---
sidebar_label: 'UP Extension'
sidebar_position: 4
description: LUKSO Universal Profile Extension benefits and general information.
---

# Universal Profile Extension

## Why should I use Universal Profile Extension over other wallets?

The Universal Profile Extension offers several advantages over traditional wallet services like MetaMask or Rainbow. Regular wallets only manage the cryptographic key-pair, the blockchain account. The account is only secured by a static private seed phrase that can't **be changed or exposed**. If the phrase is leaked or lost, all your digital assets and reputation associated with the account **would be lost with it**.

In addition, regular accounts lack some of the the functionality of UPs such as the ability to attach additional information to your profile, react on transfers, social recovery and transaction relay services.

Universal Profiles help bring **convenience** and **user-friendliness** into the blockchain space. They are **robust and flexible** smart contract-based accounts that support features like social recovery, relay transactions, rights management, upgradeable security, and attachable data right out of the box. Since they consist of programmable and modular smart contracts, they even allow upgrading these accounts with enhanced functionalities.

In essence, using UniversalProfile provides a **safer environment for managing your digital assets** and offers an array of features that make your day-to-day interactions with blockchains easier.

## Where can I download the Universal Profile Extension?

You can download the Universal Profile Extension from the [Extension Guide](/install-up-browser-extension) section of our technical documentation. There is an official release in the Chrome Store and other platforms coming during the mainnet launch process.

## What are the controllers of the Universal Profile?

Each Universal Profile within an extension holds a separate private key to send transactions on behalf of the user's profile. Such controllers can be exported, added, or removed. The controllers can be found within the **Controllers** window of the extension:

![Controller Window](../../../static/img/faq/controller-window.png)

## How do I create a backup of my Universal Profile?

If you lost access to the Universal Profile Browser Extension, there are multiple ways to secure your Universal Profile :

- **2FA**: You can set up 2FA while creating the profile on [UniversalProfile.cloud](https://universalprofile.cloud/). 2FA is the recommended way of backing up a Universal Profile and will add a new recovery controller to the profile, secured on LUKSO's end. This controller has permission to add new controller keys if access to an old extension is lost. For security reasons, users must provide an authentication code from a mobile device and approve via email before a new controller can be added using LUKSO's recovery service.
- **Profile QR Import**: You can import any profile address into your extension. The import process will create a local controller key that needs to be signed off and added to the profile by one of your existing controllers with sufficient permissions. Within the new extension, you will receive a QR code of a transaction that can be scanned or copied. When received and executed by an existing extension, this new controller will gain permissions on the profile.
- **File Export**: You can export the profile directly as a text file, including its private key, and store it somewhere safe. This private key will allow you to regain access to the original controller key.

:::caution

The Universal Profile Browser Extension currently does not feature a way to import profiles using the plain private key described in _File Export_. Therefore, we recommend setting up 2FA during creation or importing the profile into another browser extension via a QR code. Optionally, the private key of a controller (EOA) could be imported into a regular wallet to send transactions manually.

:::

## How to check if 2FA is set up correctly?

You can check if the recovery is set up correctly using the Universal Profile Browser Extension. If you visit the Controller Menu, there need to be at least 3 Controllers:

![2FA Controller](../../../static/img/faq/2fa-controller.png)

- Your Universal Profile Browser Extension's Key (used for profile interactions)
- Your Universal Receiver (used to write asset updates on the profile)
- The Universal Recovery Key (used as a backup for the profile)

If you click on the recovery controller, it must have the **Add Controller** permission. If you ever want to recover your profile, a fresh controller key will be added to this profile from a new extension setup. 2FA was completed if you see the controller and said 2FA using your e-mail and authenticator app. Please ensure that the 2FA code can be accessed correctly.

## How to see and send assets from the Universal Profile?

The Universal Profile Extension **does not directly manage token information**. Instead, it is designed to work with various decentralized applications (dApps) that can seamlessly integrate with your Universal Profile and interact with its information and controller keys. To see all your tokens, you can visit your profile on [UniversalProfile.cloud](https://universalprofile.cloud/). If you are logged in, you will also be able to transfer assets.

![Asset Transfer](../../../static/img/faq/asset-transfer.png)

## How to use own LYX for Universal Profile transactions?

To use your funds to send transactions from your Universal Profile, you must send LYX or LYXt to the extension's controller key. Sending it to the controller will ensure the transaction's Gas costs are funded. You can find the address of the extension's controller key within the permission section.

## How to access my Universal Profile on L14?

If you created a Universal Profile using the [Universal Profile Explorer](https://universalprofile.cloud/) or [The Dematerialised Marketplace](https://thedematerialised.com/) on the L14 Testnet, the wallet is stored within your browser's local storage. You will receive a login link containing an encrypted private key via mail.

## Why can’t I use the private key yet to recover my Universal Profile?

At the moment, the option to recover an existing profile from a backup file is not available. The team is working on this feature and it will be made available soon. The idea behind this is to recover the profile from a backup file, and not directly from the private key.

Currently, the private key is displayed though in the LUKSO Browser Extension. However, this is not to be used as a recovery mechanism, but rather for users who want to do development and need the private key.

## “Universal Profile is not allowed by this Transaction Relay Service” Error

If a user deploys a Universal Profile through Universal Page, or another 3rd party that has their own relayer, when importing the profile into the LUKSO Browser Extension, the LUKSO Relayer will not be compatible. Therefore, users should use a separate controller key that they can fund with some LYX.
