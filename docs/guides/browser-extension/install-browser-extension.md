---
sidebar_label: 'Install the UP Browser Extension'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install the UP Browser Extension

:::danger

The UP Browser Extenstion is a **ALPHA DEVELOPER PREVIEW**. This is not intended to be used by non developers. And DO NOT use this in production!
The current UP Browser Extenstion deploys profiles on the [Testnet](http://docs.lukso.tech/networks/testnet/parameters).

:::

:::note
If you have **MetaMask** installed, _right click on both_ MetaMask and UP Extension and select _"This Can Read and Change Site Data > When you Click the Extension"_. Then you you can select for every website which extension you use. By closing the tab you can reset this selection.

**It is important not to forget the previous step. Otherwise, it might conflict with the UP Browser Extension, and this might prevent you from finalising the setup process.**

<img width="400" src="https://user-images.githubusercontent.com/232662/192822200-392b19f1-321b-4a59-928a-f71876bec6f3.png" />
:::

This guide will teach you how to download and install the Universal Profile browser extension on Chrome, Edge, Opera, or Brave.

You can test the browser extension with the following example dApps (Or any other dApp, that runs on the [Testnet](http://docs.lukso.tech/networks/testnet/parameters)):

- [up-test-dapp.lukso.tech](https://up-test-dapp.lukso.tech)
- [examples.lukso.tech](https://examples.lukso.tech)

Projects built by the LUKSO community:

- [lookso.io](https://lookso.io/) - A decentralized social feed geared towards Universal Profiles and the LUKSO blockchain
- [universal.page](https://universal.page/) - Create a customizable website to showcase and sell digital assets on
  LUKSO.
- [relayer-frontend.vercel.app](https://relayer-frontend.vercel.app/) - A relayer that lets you used your staking rewards to pay for your transaction fees.
- [marble.cool](https://www.marble.cool/) - A LUKSO-native wallet.

## Download the extension

Click on link below to download the extension, based on the browser to which you want to install it.

### :inbox_tray: **[Download from Chrome Web Store](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) (Chrome / Brave)**

### :inbox_tray: **[Download Archive](https://storage.googleapis.com/up-browser-extension/universalprofile-extension-v1.4.0-mv2.zip) (All other browsers)**

## Unpack the archive

Open your download folder and unpack the ZIP archive by opening the file.

## Install the extension

<Tabs>
  <TabItem value="chrome" label="Chrome / Brave">

## 1. Simply download the extension from the [Chrome Store](https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn)

![Chrome Store view](/img/extension/chrome-store.png)

  </TabItem>
  <TabItem value="edge" label="Edge">

#### 1. Open the extension page in your browser.

<Tabs>
  <TabItem value="edge-settings" label="Using Settings">

![Step 1 - Edge: Extension Settings](/img/extension/edge1.png)

  </TabItem>
  <TabItem value="edge-menu" label="Using Menu Bar">

![Step 1 - Edge: Extension Menu Bar](/img/extension/edge2.png)

  </TabItem>
  <TabItem value="edge-url" label="Using URL">

Type `edge://extensions` into the searchbar to open the extension page.

  </TabItem>
</Tabs>

#### 2. Enable the browser's developer mode.

On the left side, turn the _Developer mode_ slider to the right side.

![Step 2 - Edge: Load Extension](/img/extension/edge3.png)

#### 3. Load the extension from the folder.

Click _Load unpacked_ pointing to the extracted ZIP archive of the extension.<br/>

![Step 3 - Edge: Load Extension](/img/extension/edge3.png)

#### 4. Launch the extension.

Click on the extension icon.

![Step 4 - Edge: Open Extension](/img/extension/edge4.png)

  </TabItem>
  <TabItem value="opera" label="Opera">

#### 1. Open the extension page in your browser.

<Tabs>
  <TabItem value="opera-shortcut" label="Using Shortcut">

Press and hold `cmd+shift+e` or `ctrl+shift+e` on your keyboard.

  </TabItem>
  <TabItem value="opera-menu" label="Using Menu Bar">

![Step 1 - Opera: Menu Bar](/img/extension/opera1.png)

  </TabItem>
  <TabItem value="opera-url" label="Using URL">

Type `opera://extensions` into the searchbar to open the extension page.

  </TabItem>
</Tabs>

#### 2. Enable the browser's developer mode.

![Step 2 - Opera: Enable Developer Mode](/img/extension/opera2.png)

#### 3. Load the extension from the folder.

Click _Load unpacked_ pointing to the extracted ZIP archive of the extension.<br/>

![Step 3 - Opera: Load Extension](/img/extension/opera3.png)

#### 4. Pin the extension.

Pin the extension through the extension icon.

![Step 4 - Opera: Pin Extension](/img/extension/opera4.png)

#### 5. Launch the extension.

Open the extension by clicking its icon from the menu bar.

![Step 5 - Opera: Open Extension](/img/extension/opera5.png)

  </TabItem>
   <TabItem value="firefox" label="Firefox">

:::note
This installation process is for **Firefox Developer Edition** (or **Firefox Nightly**) only, as the standard Firefox only allows the installation of temporary developer add-ons.
:::

#### 1. Disable requiring xpi signature

Type `about://config` into the searchbar to open the configuration page.

![Step 1a - Firefox: about:config](/img/extension/firefox1.png)

Click _Accept Risk and Continue_ when promped with _Proceed with Caution_ warning.

Next, set the `xpinstall.signatures.required` to false.

![Step 1b - Firefox: about:config](/img/extension/firefox2.png)

#### 2. Open the addons section

<Tabs>
  <TabItem value="firefox-menu" label="Using Menu Bar">

![Step 2 - Firefox: Menu Bar](/img/extension/firefox3.png)

  </TabItem>
  <TabItem value="firefox-url" label="Using URL">

Type `about://addons` into the searchbar to open the extension page.

  </TabItem>
</Tabs>

#### 3. Load the extension from the zip file

Click on the settings wheel and then click on _Install Add-on From File_ pointing to the ZIP archive of the extension.<br/>

![Step 3a - Firefox: Load Extension](/img/extension/firefox4.png)

Click _Add_ when prompted with a question to add the unverified extension.

![Step 3b - Firefox: Accept Extension](/img/extension/firefox5.png)

#### 4. Launch the extension

Open the extension by clicking its icon from the menu bar.

![Step 4 - Firefox: Open Extension](/img/extension/firefox6.png)

  </TabItem>
</Tabs>
